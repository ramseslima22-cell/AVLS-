import bpy,sys,time,json,argparse
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--frames',default='1,41,81,121');p.add_argument('--width',type=int,default=960);p.add_argument('--height',type=int,default=540);p.add_argument('--samples',type=int,default=32);p.add_argument('--device',default='CPU');p.add_argument('--engine',default='CYCLES');p.add_argument('--output',default='previews');args=p.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'working/office-cinema';dest=OUT/args.output;dest.mkdir(parents=True,exist_ok=True)
scene=bpy.context.scene;scene.camera.data.sensor_fit='HORIZONTAL' if args.height>args.width else 'AUTO';scene.render.engine=args.engine;scene.render.resolution_x=args.width;scene.render.resolution_y=args.height;scene.render.resolution_percentage=100
if args.engine=='CYCLES':
 scene.cycles.samples=args.samples;scene.cycles.use_denoising=True;scene.cycles.denoising_use_gpu=False
 if args.device!='CPU':
  prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type=args.device;prefs.refresh_devices()
  for d in prefs.devices:d.use=d.type==args.device
  scene.cycles.device='GPU'
 else:scene.cycles.device='CPU'
print('TEXTURES',[(im.name,list(im.size)) for im in bpy.data.images])
results=[]
for frame in map(int,args.frames.split(',')):
 scene.frame_set(frame);scene.render.filepath=str(dest/f'frame-{frame:04d}.png');start=time.perf_counter();bpy.ops.render.render(write_still=True)
 results.append({'frame':frame,'seconds':time.perf_counter()-start,'bytes':Path(scene.render.filepath).stat().st_size})
 (dest/'timings.json').write_text(json.dumps({'engine':args.engine,'device':args.device,'width':args.width,'height':args.height,'samples':args.samples,'frames':results},indent=2))
print('RENDER_RESULT',json.dumps(results))
