import bpy, json, os, platform, sys
from mathutils import Vector
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../..'))
OUT=os.path.join(ROOT,'working','office-cinema');os.makedirs(OUT,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
prefs=bpy.context.preferences.addons['cycles'].preferences
hardware={'blender':bpy.app.version_string,'platform':platform.platform(),'cycles':bpy.app.build_options.cycles,'devices':{}}
for backend in ['OPTIX','CUDA','HIP','ONEAPI']:
 try:
  prefs.compute_device_type=backend;prefs.refresh_devices()
  hardware['devices'][backend]=[{'name':d.name,'type':d.type,'id':d.id} for d in prefs.devices]
 except Exception as e: hardware['devices'][backend]=str(e)
bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT,'apps/web/public/models/modern-office.glb'))
objects=[]
for o in bpy.context.scene.objects:
 if o.type=='MESH':
  pts=[o.matrix_world@Vector(p) for p in o.bound_box]
  objects.append({'name':o.name,'verts':len(o.data.vertices),'bounds':[[min(p[i] for p in pts) for i in range(3)],[max(p[i] for p in pts) for i in range(3)]],'materials':[m.name for m in o.data.materials]})
materials=[]
for m in bpy.data.materials:
 nodes=[]
 if m.use_nodes:
  for n in m.node_tree.nodes:
   nodes.append({'name':n.name,'type':n.type,'image':n.image.name if n.type=='TEX_IMAGE' and n.image else None})
 materials.append({'name':m.name,'nodes':nodes})
report={'hardware':hardware,'objects':objects,'materials':materials,'images':[{'name':i.name,'size':list(i.size)} for i in bpy.data.images]}
with open(os.path.join(OUT,'inspection.json'),'w',encoding='utf8') as f:json.dump(report,f,indent=2)
print('INSPECTION',json.dumps(report))
