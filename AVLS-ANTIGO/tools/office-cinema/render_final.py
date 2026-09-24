"""Resumable local render. One Blender process per frame; no active Codex session needed."""
from pathlib import Path
import argparse, hashlib, json, os, shutil, subprocess, sys, time
from PIL import Image
ROOT = Path(__file__).resolve().parents[2]
WORK = ROOT / 'working/office-cinema'
PUBLIC = ROOT / 'apps/web/public/office-sequence'
SCENE = WORK / 'avls-office-preview.blend'
RENDER = Path(__file__).with_name('render_preview.py')
PROFILES = {'desktop': (640, 360, 32), 'mobile': (360, 640, 16)}

def atomic_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(data, indent=2), encoding='utf-8')
    os.replace(temporary, path)

def valid_image(path, size):
    try:
        with Image.open(path) as image:
            if image.size != size: return False
            image.verify()
        return True
    except (OSError, ValueError): return False

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--blender')
    parser.add_argument('--device', choices=['CUDA', 'CPU'], default='CUDA')
    parser.add_argument('--check', action='store_true', help='Validate configuration without rendering')
    parser.add_argument('--reuse-only', action='store_true', help='Import approved previews; never start Blender')
    parser.add_argument('--no-build', action='store_true')
    args = parser.parse_args()
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    candidates = sorted(Path('C:/Program Files/Blender Foundation').glob('Blender */blender.exe'))
    blender = args.blender or os.environ.get('BLENDER_EXE') or (str(candidates[-1]) if candidates else '')
    if not Path(blender).is_file(): raise RuntimeError('Blender not found. Use --blender PATH.')
    if not SCENE.is_file(): raise RuntimeError('Missing approved .blend: ' + str(SCENE))
    settings = {'profiles': PROFILES, 'frames': 121, 'quality': 82, 'scene': hashlib.sha256(SCENE.read_bytes()).hexdigest(), 'renderer': hashlib.sha256(RENDER.read_bytes()).hexdigest()}
    job = hashlib.sha256(json.dumps(settings, sort_keys=True).encode()).hexdigest()[:12]
    folder = WORK / 'final' / job
    state_path = folder / 'progress.json'
    state = {'job': job, 'settings': settings, 'completed': [], 'status': 'pending'}
    print('Blender:', blender, '\nScene:', SCENE, '\nProgress:', state_path, flush=True)
    if args.check: return
    folder.mkdir(parents=True, exist_ok=True)
    # OS releases the exclusive lock even if the terminal/process is interrupted.
    lock = (WORK / 'final/render.lock').open('a+b')
    lock.seek(0); lock.write(b'0'); lock.flush(); lock.seek(0)
    if os.name == 'nt':
        import msvcrt
        try: msvcrt.locking(lock.fileno(), msvcrt.LK_NBLCK, 1)
        except OSError: raise RuntimeError('Another final render is running.')
    manifest = {'version': 'final-' + job}
    try:
        for profile, (width, height, samples) in PROFILES.items():
            dest = PUBLIC / 'final' / job / profile
            raw = folder / 'raw' / profile
            dest.mkdir(parents=True, exist_ok=True); raw.mkdir(parents=True, exist_ok=True)
            entries = []
            for frame in range(1, 122):
                output = dest / f'frame-{frame:04d}.webp'
                png = raw / f'frame-{frame:04d}.png'
                marker = png.with_suffix('.done.json')
                key = f'{profile}/{frame:04d}'
                if not valid_image(output, (width, height)):
                    # Only full-quality approved previews can seed the final render.
                    seed = WORK / ('previews' if profile == 'desktop' else 'mobile') / f'frame-{frame:04d}.png'
                    approved = json.loads(Path(__file__).with_name('approved-preview.json').read_text())
                    allowed = approved['sceneSha256'] == settings['scene'] and frame in ([1, 41, 81, 121] if profile == 'desktop' else [1])
                    if allowed and valid_image(seed, (width, height)):
                        shutil.copyfile(seed, png); atomic_json(marker, {'source': 'approved-preview'})
                    if not (marker.exists() and valid_image(png, (width, height))):
                        if args.reuse_only: continue
                        command = [blender, '-b', str(SCENE), '--threads', '4', '--python-exit-code', '1', '--python', str(RENDER), '--', '--frames', str(frame), '--width', str(width), '--height', str(height), '--samples', str(samples), '--device', args.device, '--output', str(raw)]
                        print(f'Rendering {key} ({len(state["completed"])}/242)', flush=True)
                        log_path = raw / f'frame-{frame:04d}.log'
                        with log_path.open('w', encoding='utf-8') as log:
                            result = subprocess.run(command, stdout=log, stderr=subprocess.STDOUT, creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0)
                        log_text = log_path.read_text(encoding='utf-8', errors='replace')
                        if result.returncode or any(x in log_text for x in ['OIDN error:', 'ERROR', 'Traceback']) or not valid_image(png, (width, height)):
                            raise RuntimeError('Render failed; resume with the same command. Details: ' + str(log_path))
                        atomic_json(marker, {'completed_at': time.time()})
                    temporary = output.with_suffix('.tmp')
                    with Image.open(png) as image: image.convert('RGB').save(temporary, format='WEBP', quality=82, method=6)
                    os.replace(temporary, output)
                state['completed'].append(key)
                state['status'] = 'rendering'
                atomic_json(state_path, state)
                entries.append({'frame': frame, 'url': '/office-sequence/final/' + job + '/' + profile + '/' + output.name})
            manifest[profile] = {'width': width, 'height': height, 'frames': entries}
        complete = all(len(manifest[p]['frames']) == 121 for p in PROFILES)
        state['status'] = 'complete' if complete else 'preview-seeded'
        atomic_json(state_path, state)
        if complete:
            # The site switches from previews only after BOTH sequences are complete.
            atomic_json(PUBLIC / 'manifest.json', manifest)
            print('All 242 frames exist. Manifest published:', PUBLIC / 'manifest.json', flush=True)
            if not args.no_build:
                result = subprocess.run([os.environ.get('COMSPEC', 'cmd.exe'), '/d', '/c', 'npm run build'], cwd=ROOT)
                if result.returncode: raise RuntimeError('Frames ready; build failed. Run the same command to retry the build.')
        else: print(f'Reused {len(state["completed"])}/242 frames. Final sequence is NOT complete.', flush=True)
    except BaseException as error:
        state['status'] = 'interrupted'; state['error'] = str(error)
        atomic_json(state_path, state)
        raise
    finally: lock.close()

if __name__ == '__main__':
    try: main()
    except KeyboardInterrupt: print('Stopped. Run the same command to resume.'); sys.exit(130)
    except Exception as error: print(str(error), file=sys.stderr); sys.exit(1)
