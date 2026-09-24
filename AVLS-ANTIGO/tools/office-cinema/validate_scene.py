import bpy,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'working/office-cinema'
scene=bpy.context.scene;issues=[];samples=0;previous=None
for frame in range(1,122):
 scene.frame_set(frame);deps=bpy.context.evaluated_depsgraph_get();pos=scene.camera.matrix_world.translation.copy()
 if not (-2.2<pos.x<3.25 and abs(pos.y)<2.05 and 1.12<pos.z<2.2):issues.append([frame,'outside safe room bounds'])
 for x in [-1,0,1]:
  for y in [-1,0,1]:
   for z in [-1,0,1]:
    if x==y==z==0:continue
    direction=Vector((x,y,z)).normalized();hit=scene.ray_cast(deps,pos,direction,distance=.12)
    if hit[0]:issues.append([frame,'near surface',hit[4].name])
 if previous is not None:
  travel=pos-previous
  if travel.length>0:
   hit=scene.ray_cast(deps,previous,travel.normalized(),distance=travel.length)
   if hit[0]:issues.append([frame,'path intersection',hit[4].name])
 previous=pos;samples+=1
report={'frames_checked':samples,'margin_metres':.12,'issues':issues,'status':'PASS' if not issues else 'FAIL'}
(OUT/'camera-validation.json').write_text(json.dumps(report,indent=2));print(report)
if issues:raise RuntimeError('Camera validation failed')
