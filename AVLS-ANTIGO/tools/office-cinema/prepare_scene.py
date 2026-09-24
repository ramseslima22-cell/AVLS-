import bpy, bmesh, math, os, json
from mathutils import Vector, Matrix
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'working/office-cinema'; ASSETS=OUT/'assets'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(ROOT/'apps/web/public/models/modern-office.glb'))
scene=bpy.context.scene
# Retain imported geometry, UVs and original image textures; normalize Blender Z-up floor.
for o in list(scene.objects):
 if o.type=='MESH':
  m=o.matrix_world.copy();o.parent=None;o.matrix_world=m;o.location.z+=1.53958583
for o in list(scene.objects):
 if o.type=='EMPTY':bpy.data.objects.remove(o,do_unlink=True)

def rgba(hex):
 h=hex.lstrip('#');c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
 return tuple(((v+0.055)/1.055)**2.4 if v>0.04045 else v/12.92 for v in c)+(1,)
def mat(name,color,metal=0,rough=.5):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF')
 p.inputs['Base Color'].default_value=rgba(color);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 return m
# All original materials used the same baked atlas as albedo AND emission. Remove only emission.
for m in list(bpy.data.materials):
 if not m.use_nodes:continue
 p=m.node_tree.nodes.get('Principled BSDF')
 if not p:continue
 for l in list(p.inputs['Emission Color'].links):m.node_tree.links.remove(l)
 p.inputs['Emission Color'].default_value=(0,0,0,1);p.inputs['Emission Strength'].default_value=0
 for l in list(p.inputs['Roughness'].links):m.node_tree.links.remove(l)
 p.inputs['Roughness'].default_value=.7
 if m.name=='Chair':p.inputs['Roughness'].default_value=.46
 if m.name=='Plant':
  p.inputs['Roughness'].default_value=.64
  l=m.node_tree.links;n=m.node_tree.nodes;old=p.inputs['Base Color'].links[0].from_socket;mix=n.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1;mix.inputs[2].default_value=rgba('#a5b48f');l.new(old,mix.inputs[1]);l.new(mix.outputs[0],p.inputs['Base Color'])
 if m.name=='Lights':p.inputs['Roughness'].default_value=.32;p.inputs['Metallic'].default_value=.45
 if m.name in ['Carpet','Structure','Table']:
  n=m.node_tree.nodes;l=m.node_tree.links;tex=n.new('ShaderNodeTexNoise');tex.inputs['Scale'].default_value=170 if m.name=='Carpet' else 90
  bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.18;bump.inputs['Distance'].default_value=.0005
  l.new(tex.outputs['Fac'],bump.inputs['Height']);l.new(bump.outputs['Normal'],p.inputs['Normal'])
 if m.name=='Table':
  n=m.node_tree.nodes;l=m.node_tree.links;old=p.inputs['Base Color'].links[0].from_socket
  coord=n.new('ShaderNodeTexCoord');mapping=n.new('ShaderNodeVectorMath');mapping.operation='MULTIPLY';mapping.inputs[1].default_value=(12,.10,1);l.new(coord.outputs['Generated'],mapping.inputs[0])
  grain=n.new('ShaderNodeTexNoise');grain.inputs['Scale'].default_value=5;grain.inputs['Detail'].default_value=3;l.new(mapping.outputs[0],grain.inputs['Vector'])
  ramp=n.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.18;ramp.color_ramp.elements[0].color=rgba('#bd9b71');ramp.color_ramp.elements[1].position=.84;ramp.color_ramp.elements[1].color=rgba('#d4b68c');l.new(grain.outputs['Fac'],ramp.inputs[0])
  mix=n.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=1;l.new(old,mix.inputs[1]);l.new(ramp.outputs[0],mix.inputs[2]);l.new(mix.outputs[0],p.inputs['Base Color'])
  l.new(grain.outputs['Fac'],bump.inputs['Height']);bump.inputs['Distance'].default_value=.00008
  p.inputs['Roughness'].default_value=.42
# Original framed mesh, new original AVLS artwork, no third-party typography.
m=bpy.data.materials['Painting'];p=m.node_tree.nodes.get('Principled BSDF');tex=m.node_tree.nodes.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(ASSETS/'studio-artwork.png'));m.node_tree.links.new(tex.outputs['Color'],p.inputs['Base Color'])
# Original glass geometry becomes clear glass; no hazy white atlas across the window.
m=bpy.data.materials['Window'];m.node_tree.nodes.clear();n=m.node_tree.nodes;l=m.node_tree.links
out=n.new('ShaderNodeOutputMaterial');glass=n.new('ShaderNodeBsdfGlass');glass.inputs['Roughness'].default_value=.025;glass.inputs['IOR'].default_value=1.45
trans=n.new('ShaderNodeBsdfTransparent');mix=n.new('ShaderNodeMixShader');mix.inputs[0].default_value=.015;l.new(trans.outputs[0],mix.inputs[1]);l.new(glass.outputs[0],mix.inputs[2]);l.new(mix.outputs[0],out.inputs[0])
bpy.data.objects['Window_Window_0'].hide_render=True  # Single imported pane causes reflection artifacts; frame remains.
back=bpy.data.objects['Window_Backdrop_0'];back.visible_shadow=False;back.hide_render=True
m=bpy.data.materials['Backdrop'];m.node_tree.nodes.clear();n=m.node_tree.nodes;l=m.node_tree.links;out=n.new('ShaderNodeOutputMaterial');em=n.new('ShaderNodeEmission');em.inputs['Color'].default_value=rgba('#cad9df');em.inputs['Strength'].default_value=.8;l.new(em.outputs[0],out.inputs[0])
# A single detailed laptop, sized to the measured 67 cm deep desk.
graphite=mat('AVLS / anodized graphite','#373b42',.7,.3);keys=mat('AVLS / keycaps','#181b20',.15,.43)
def bevel_box(name,location,dimensions,material,radius=.005):
 bpy.ops.mesh.primitive_cube_add(size=1,location=location);o=bpy.context.object;o.name=name;o.dimensions=dimensions;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 o.data.materials.append(material);b=o.modifiers.new('Machined rounded edges','BEVEL');b.width=radius;b.segments=4
 o.modifiers.new('Weighted normals','WEIGHTED_NORMAL');return o
base=bevel_box('AVLS Laptop / base',(0,-.04,.732),(.28,.42,.015),graphite,.006)
# Lid leans away from the seated viewer (negative X). Plane U horizontal = -Y, V vertical = +Z.
lid=bevel_box('AVLS Laptop / lid',(.125,-.04,.864),(.008,.42,.255),graphite,.004);lid.rotation_euler[1]=.13

def image_plane(name,center,u,v,width,height,image,emission=False):
 c=Vector(center);u=Vector(u)*width/2;v=Vector(v)*height/2
 mesh=bpy.data.meshes.new(name);mesh.from_pydata([c-u-v,c+u-v,c+u+v,c-u+v],[],[(0,1,2,3)]);mesh.update();o=bpy.data.objects.new(name,mesh);scene.collection.objects.link(o)
 uv=mesh.uv_layers.new();coords=[(0,0),(1,0),(1,1),(0,1)]
 for i in range(4):uv.data[i].uv=coords[i]
 m=mat(name+' material','#ffffff',0,.45);p=m.node_tree.nodes.get('Principled BSDF');t=m.node_tree.nodes.new('ShaderNodeTexImage');t.image=bpy.data.images.load(str(image));m.node_tree.links.new(t.outputs['Color'],p.inputs['Base Color'])
 if emission:m.node_tree.links.new(t.outputs['Color'],p.inputs['Emission Color']);p.inputs['Emission Strength'].default_value=.6
 o.data.materials.append(m);return o
image_plane('AVLS Laptop / screen',(.120,-.04,.864),(0,-1,0),(math.sin(.13),0,math.cos(.13)),.39,.238,ASSETS/'avls-screen.png',True)
image_plane('AVLS Laptop / keyboard',(-.005,-.04,.740),(0,-1,0),(1,0,0),.39,.25,ASSETS/'keyboard.png')
# Ceramic cup: revolved hollow profile, not a solid cylinder. Existing books/plants remain.
ceramic=mat('AVLS / warm ceramic','#ded0ba',0,.24);coffee=mat('Coffee','#22160f',0,.16)
profile=[(.022,0),(.030,.002),(.034,.008),(.038,.055),(.04,.070),(.04,.077),(.036,.078),(.034,.072),(.032,.014),(.024,.008),(0,.008)]
verts=[];faces=[];N=64
for r,z in profile:
 for i in range(N):a=i*2*math.pi/N;verts.append((r*math.cos(a),r*math.sin(a),z))
for j in range(len(profile)-1):
 for i in range(N):faces.append((j*N+i,j*N+(i+1)%N,(j+1)*N+(i+1)%N,(j+1)*N+i))
mesh=bpy.data.meshes.new('Ceramic profile');mesh.from_pydata(verts,[],faces);mesh.update();cup=bpy.data.objects.new('AVLS / coffee cup',mesh);scene.collection.objects.link(cup);cup.location=(-.10,-.46,.720);cup.data.materials.append(ceramic)
for p in mesh.polygons:p.use_smooth=True
bpy.ops.mesh.primitive_torus_add(major_radius=.022,minor_radius=.006,major_segments=40,minor_segments=12,location=(-.054,-.46,.763),rotation=(math.pi/2,0,0));bpy.context.object.name='AVLS / cup handle';bpy.context.object.data.materials.append(ceramic)
for p in bpy.context.object.data.polygons:p.use_smooth=True
bpy.ops.mesh.primitive_circle_add(vertices=64,radius=.034,fill_type='NGON',location=(-.10,-.46,.789));bpy.context.object.name='Coffee surface';bpy.context.object.data.materials.append(coffee)
# Face the existing workstation toward the window; avoid filming the open rear of this asset.
rotation=Matrix.Rotation(math.pi,4,'Z')
chair=bpy.data.objects['Window_Chair_0'];chair.matrix_world=rotation@chair.matrix_world
for o in list(scene.objects):
 if o.name.startswith('AVLS Laptop /'):o.matrix_world=rotation@o.matrix_world
# Reuse detailed foliage from the supplied model outside the real window opening.
# No replacement architecture or generic tree primitives.
plant=bpy.data.objects['Window_Plant_0']
for i,(x,y,s) in enumerate([(-5.5,-1.8,2.8),(-6.0,1.6,3.2)]):
 o=plant.copy();o.data=plant.data.copy();scene.collection.objects.link(o);o.name='Exterior foliage '+str(i)
 o.data.transform(plant.matrix_world);o.matrix_world=Matrix.Identity(4)
 bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.delete(bm,geom=[v for v in bm.verts if v.co.z<.48],context='VERTS');bm.to_mesh(o.data);bm.free()
 center=Vector((-1.85,-1.75,.92))
 o.matrix_world=Matrix.Translation(Vector((x,y,.25)))@Matrix.Scale(s,4)@Matrix.Translation(-center)
# Soften actual imported furniture edges without rebuilding the furniture.
bpy.ops.object.select_all(action='DESELECT')
for name in ['Window_Table_0','Window_Chair_0']:
 o=bpy.data.objects[name];bpy.context.view_layer.objects.active=o;o.select_set(True)
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.select_set(False)
 b=o.modifiers.new('Subtle edge highlights','BEVEL');b.width=.0025;b.segments=3
 o.modifiers.new('Furniture normals','WEIGHTED_NORMAL')
# Natural window illumination. No fog, bloom or white overlay.
world=bpy.data.worlds.new('Daylight');world.use_nodes=True;world.node_tree.nodes.get('Background').inputs['Color'].default_value=rgba('#c5d4e2');world.node_tree.nodes.get('Background').inputs['Strength'].default_value=.18;scene.world=world
sky=world.node_tree.nodes.new('ShaderNodeTexSky');sky.sky_type='MULTIPLE_SCATTERING' if 'MULTIPLE_SCATTERING' in sky.bl_rna.properties['sky_type'].enum_items.keys() else 'NISHITA';sky.sun_disc=False;sky.sun_elevation=math.radians(25);sky.sun_rotation=math.radians(200);world.node_tree.links.new(sky.outputs['Color'],world.node_tree.nodes.get('Background').inputs['Color'])

def light(name,kind,location,target,energy,size):
 data=bpy.data.lights.new(name,kind);data.energy=energy;data.color=(1,.88,.70)
 if kind=='AREA':data.shape='RECTANGLE';data.size=size;data.size_y=2.1
 if kind=='SUN':data.angle=size
 o=bpy.data.objects.new(name,data);scene.collection.objects.link(o);o.location=location;o.visible_glossy=False;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler();return o
light('Window / large soft source','AREA',(-2.25,0,1.9),(0,0,.65),120,3.6)
light('Late morning sun','SUN',(-8,-3,4),(0,0,.7),6.0,.07)
fill=light('Interior bounce','AREA',(2,0,2.7),(0,0,.8),22,3);fill.data.color=(.86,.91,1)
# Shot positions are derived from the imported bounds; Blender uses Z-up.
shots=[
 {'frame':1,'name':'01-desk','position':[1.08,-.30,1.28],'target':[0,-.30,.94],'lens':37},
 {'frame':41,'name':'02-workstation','position':[2.35,-.8,1.65],'target':[-.3,-.1,1.05],'lens':30},
 {'frame':81,'name':'03-lateral','position':[1.65,1.45,1.55],'target':[-.65,-.15,1.15],'lens':29},
 {'frame':121,'name':'04-window','position':[2.75,-1.4,1.85],'target':[-.9,.3,1.22],'lens':24},
]
# An intermediate route point avoids a direct swing through desk/lights.
waypoints=shots
bpy.ops.object.camera_add();cam=bpy.context.object;cam.name='AVLS / cinematic camera';scene.camera=cam;cam.data.clip_start=.035;cam.data.clip_end=50;cam.data.sensor_width=36
cam.data.dof.use_dof=False
# Sampled smoothstep path: no Bezier overshoot outside the walls.
for f in range(1,122):
 idx=next((i for i in range(len(waypoints)-1) if f<=waypoints[i+1]['frame']),len(waypoints)-2);a=waypoints[idx];b=waypoints[idx+1]
 t=(f-a['frame'])/(b['frame']-a['frame']);t=max(0,min(1,t));t=t*t*(3-2*t)
 pos=Vector(a['position']).lerp(Vector(b['position']),t);target=Vector(a['target']).lerp(Vector(b['target']),t)
 cam.location=pos;cam.rotation_euler=(target-pos).to_track_quat('-Z','Y').to_euler();cam.data.lens=a['lens']+(b['lens']-a['lens'])*t
 cam.keyframe_insert(data_path='location',frame=f);cam.keyframe_insert(data_path='rotation_euler',frame=f);cam.data.keyframe_insert(data_path='lens',frame=f)
scene.frame_start=1;scene.frame_end=121;scene.render.fps=24;scene.render.resolution_x=640;scene.render.resolution_y=360;scene.render.resolution_percentage=100
scene.render.engine='CYCLES';scene.cycles.samples=32;scene.cycles.use_denoising=True;scene.cycles.max_bounces=6;scene.cycles.diffuse_bounces=3;scene.cycles.glossy_bounces=3;scene.cycles.transmission_bounces=4
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGB';scene.render.film_transparent=False
scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast';scene.view_settings.exposure=0
scene.render.threads_mode='FIXED';scene.render.threads=4
source_raw=(ROOT/'apps/web/public/models/modern-office.glb').read_bytes()
scene['source_asset_metadata']=json.dumps(json.loads(source_raw[20:20+int.from_bytes(source_raw[12:16],'little')])['asset'])
scene['attribution']='Modern Office by dylanheyes — CC BY 4.0. https://skfb.ly/oDPCS ; https://creativecommons.org/licenses/by/4.0/ ; adapted materials, lighting, AVLS laptop and artwork, cup, camera path.'
# Bound texture memory on the 8 GB workstation; preserve original GLB and UVs.
for im in bpy.data.images:
 if max(im.size[:])>1024:
  ratio=1024/max(im.size[:]);im.scale(max(1,round(im.size[0]*ratio)),max(1,round(im.size[1]*ratio)));im.pack()
scene.cycles.denoising_use_gpu=False
scene.frame_set(1);bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'avls-office-preview.blend'))
(OUT/'shots.json').write_text(json.dumps(shots,indent=2),encoding='utf8')
print('SCENE_READY',OUT/'avls-office-preview.blend')
