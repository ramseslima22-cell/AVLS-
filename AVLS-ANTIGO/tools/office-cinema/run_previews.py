"""Reproduce the preview stage only. Never renders the full sequence or modifies the website."""
from pathlib import Path
import argparse,os,subprocess,sys,json
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[1];WORK=ROOT/'working/office-cinema'
p=argparse.ArgumentParser();p.add_argument('--blender');p.add_argument('--device',default='CUDA',choices=['CUDA','CPU']);p.add_argument('--skip-prepare',action='store_true');p.add_argument('--motion',action='store_true');p.add_argument('--mobile',action='store_true');a=p.parse_args()
candidates=list(Path('C:/Program Files/Blender Foundation').glob('Blender */blender.exe'))
blender=a.blender or os.environ.get('BLENDER_EXE') or str(sorted(candidates)[-1] if candidates else '')
if not Path(blender).is_file():raise SystemExit('Blender not found: use --blender PATH')
sys.stdout.reconfigure(encoding='utf-8',errors='replace')
sys.stderr.reconfigure(encoding='utf-8',errors='replace')
def run(*args):
 proc=subprocess.Popen([str(x) for x in args],cwd=ROOT,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,text=True,encoding='utf-8',errors='replace',creationflags=subprocess.CREATE_NO_WINDOW if os.name=='nt' else 0)
 render_error=False
 for line in proc.stdout:
  print(line,end='',flush=True)
  if any(marker in line for marker in ['OIDN error:', 'System is out of GPU', 'ERROR out of memory']):render_error=True
 code=proc.wait()
 if code or render_error:raise RuntimeError(f'Command failed (exit={code}, render_error={render_error}): {args[0]}')
if not a.skip_prepare:
 run(sys.executable,HERE/'make_assets.py')
 run(blender,'-b','--threads','4','--python-exit-code','1','--python',HERE/'prepare_scene.py','--python',HERE/'validate_scene.py')
base=[blender,'-b',WORK/'avls-office-preview.blend','--threads','4','--python-exit-code','1','--python',HERE/'render_preview.py','--','--device',a.device]
stills=[]
for frame in [1,41,81,121]:
 run(*base,'--frames',str(frame),'--width','640','--height','360','--samples','32','--output','previews')
 timing=json.loads((WORK/'previews/timings.json').read_text());stills.extend(timing['frames'])
timing['frames']=stills;(WORK/'previews/timings.json').write_text(json.dumps(timing,indent=2))
if a.mobile:run(*base,'--frames','1','--width','360','--height','640','--samples','16','--output','mobile')
if a.motion:run(*base,'--frames',','.join(map(str,range(21,33))),'--width','480','--height','270','--samples','8','--output','motion')
run(sys.executable,HERE/'package_previews.py')
