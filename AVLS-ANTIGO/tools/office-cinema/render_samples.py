import sys,runpy
from pathlib import Path
script=Path(__file__).with_name('render_preview.py')
for options in [
 ['--frames',','.join(map(str,range(21,33))),'--width','480','--height','270','--samples','8','--device','CUDA','--output','motion'],
 ['--frames','1','--width','360','--height','640','--samples','16','--device','CUDA','--output','mobile']
]:
 sys.argv=['blender','--']+options
 runpy.run_path(str(script),run_name='__main__')
