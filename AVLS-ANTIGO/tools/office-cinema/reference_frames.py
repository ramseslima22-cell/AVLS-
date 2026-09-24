from pathlib import Path
import cv2,json
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'working/office-cinema/reference';OUT.mkdir(parents=True,exist_ok=True)
video=Path('C:/Users/Ramsés/Pictures/Camera Roll/11.09.2026_20.41.37_REC.mp4')
c=cv2.VideoCapture(str(video));fps=c.get(cv2.CAP_PROP_FPS);count=c.get(cv2.CAP_PROP_FRAME_COUNT)
info={'fps':fps,'frames':count,'duration':count/fps,'width':c.get(3),'height':c.get(4)}
frames=[]
for i,t in enumerate([0.05,0.22,0.4,0.6,0.78,0.95]):
 c.set(cv2.CAP_PROP_POS_FRAMES,int(count*t));ok,bgr=c.read()
 if ok:
  image=Image.fromarray(cv2.cvtColor(bgr,cv2.COLOR_BGR2RGB));image.save(OUT/f'reference-{i+1}.jpg',quality=92)
  image.thumbnail((480,320));frames.append((image,round(count/fps*t,1)))
sheet=Image.new('RGB',(1440,720),'#222222');draw=ImageDraw.Draw(sheet)
for i,(im,t) in enumerate(frames):
 x=(i%3)*480;y=(i//3)*360;sheet.paste(im,(x,y));draw.text((x+12,y+328),str(t)+' s',fill='white')
sheet.save(OUT/'contact-sheet.jpg',quality=92)
(OUT/'metadata.json').write_text(json.dumps(info,indent=2));print(info)
