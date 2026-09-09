import * as THREE from '../../cave-river-quest/vendor/three.module.js';
import type { HeroMotion } from './hero';
import { ACTOR_ATLAS, WEAPON_RECTS, UPGRADE_RECTS, WEAPON_SOCKETS, type ActorAtlasRow, type PixelRect } from './image-actor-atlas';

type Pose = 'ready' | 'firing' | 'guard' | 'hit';
type Anchor = 'muzzle' | 'fist' | 'shield';
type Point = [number, number];
interface Frame {
  map: THREE.Texture; width: number; height: number; pivot: number;
  alphaPixels: number; crop: { x:number; y:number; width:number; height:number };
  anchors: Record<Anchor, Point>;
}
interface Sheet { texture: THREE.Texture; pixels: ImageData; labels:Int32Array; }
interface Overlay { map:THREE.Texture; aspect:number; grip:Point; muzzle:Point; }
const overlays=new Map<string,Overlay>();
const POSES: Pose[] = ['ready','firing','guard','hit'];
const SHEETS = {
  'roster-a.png':['relay','helio','volt'],
  'roster-b.png':['bastion','zephyr','glacier'],
  'roster-c.png':['ember','tidal','atlas'],
  'roster-d.png':['nova','echo','prism'],
};
// Normalised opaque-frame coordinates; calibrated against the final generated art.
const ANCHORS: Record<Pose,Record<Anchor,Point>> = {
  ready:{muzzle:[.83,.45],fist:[.76,.51],shield:[.7,.48]},
  firing:{muzzle:[.98,.39],fist:[.91,.44],shield:[.69,.48]},
  guard:{muzzle:[.87,.45],fist:[.79,.48],shield:[.85,.4]},
  hit:{muzzle:[.79,.49],fist:[.72,.53],shield:[.68,.46]},
};
let users=0;
let pending: Promise<Map<string,Frame[]>> | null=null;
let settled=false;
const sources: THREE.Texture[]=[];
const maps: THREE.Texture[]=[];
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const ease=(x:number)=>{x=clamp(x);return x*x*(3-2*x);};

async function readSheet(file: string): Promise<Sheet> {
  const base=new URL('./assets/heroes/generated/',new URL('.',document.baseURI));
  const texture=await new THREE.TextureLoader().loadAsync(new URL(file,base).href);
  sources.push(texture);texture.colorSpace=THREE.SRGBColorSpace;
  texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=false;
  const canvas=document.createElement('canvas');canvas.width=texture.image.width;canvas.height=texture.image.height;
  const context=canvas.getContext('2d',{willReadFrequently:true})!;context.drawImage(texture.image,0,0);
  const pixels=context.getImageData(0,0,canvas.width,canvas.height),labels=new Int32Array(canvas.width*canvas.height),queue=new Int32Array(labels.length);
  let label=0;
  for(let seed=0;seed<labels.length;seed++){
    if(labels[seed]||pixels.data[seed*4+3]<100)continue;
    label++;let head=0,tail=1;queue[0]=seed;labels[seed]=label;
    while(head<tail){
      const p=queue[head++],x=p%canvas.width,y=Math.floor(p/canvas.width);
      for(const dy of [-1,0,1])for(const dx of [-1,0,1]){
        const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=canvas.width||ny>=canvas.height)continue;
        const q=ny*canvas.width+nx;if(!labels[q]&&pixels.data[q*4+3]>=100){labels[q]=label;queue[tail++]=q;}
      }
    }
  }
  return {texture,pixels,labels};
}

function extractFrames(sheet: Sheet,definition: ActorAtlasRow): Frame[] {
  const {width,height,data}=sheet.pixels;
  const crops=[];
  for(let column=0;column<4;column++){
    const rect=definition.rects[column],ratio=width/1254;
    const left=Math.max(0,Math.round(rect[0]*ratio)-3),right=Math.min(width,Math.round((rect[0]+rect[2])*ratio)+3);
    const top=Math.max(0,Math.round(rect[1]*ratio)-3),bottom=Math.min(height,Math.round((rect[1]+rect[3])*ratio)+3);
    const counts=new Map<number,number>();
    for(let y=top;y<bottom;y++)for(let x=left;x<right;x++){const label=sheet.labels[y*width+x];if(label)counts.set(label,(counts.get(label)||0)+1);}
    const owner=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0];
    let minX=right,minY=bottom,maxX=left,maxY=top,count=0;
    for(let y=top;y<bottom;y++)for(let x=left;x<right;x++)if(sheet.labels[y*width+x]===owner){
      minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);count++;
    }
    const coverage=count/((right-left)*(bottom-top));
    if(coverage<.025||coverage>.88)throw new Error(`Generated actor ${definition.file}:${column} needs a nonblank transparent background (coverage ${coverage.toFixed(3)})`);
    let footSum=0,footCount=0;
    for(let y=Math.max(minY,maxY-Math.round((maxY-minY)*.07));y<=maxY;y++)for(let x=minX;x<=maxX;x++)if(sheet.labels[y*width+x]===owner){footSum+=x;footCount++;}
    // Pixel-preserving component crop: route only this pose, never neighbouring feet.
    const cropCanvas=document.createElement('canvas');cropCanvas.width=right-left;cropCanvas.height=bottom-top;
    const context=cropCanvas.getContext('2d')!,cropPixels=context.createImageData(cropCanvas.width,cropCanvas.height);
    for(let y=top;y<bottom;y++)for(let x=left;x<right;x++){
      let belongs=sheet.labels[y*width+x]===owner;
      if(!belongs&&data[(y*width+x)*4+3]>0)for(let dy=-2;dy<=2&&!belongs;dy++)for(let dx=-2;dx<=2&&!belongs;dx++){
        const nx=x+dx,ny=y+dy;if(nx>=0&&ny>=0&&nx<width&&ny<height&&sheet.labels[ny*width+nx]===owner)belongs=true;
      }
      if(belongs){const p=(y*width+x)*4,q=((y-top)*cropCanvas.width+x-left)*4;cropPixels.data.set(data.subarray(p,p+4),q);}
    }
    context.putImageData(cropPixels,0,0);const map=new THREE.CanvasTexture(cropCanvas);map.colorSpace=THREE.SRGBColorSpace;map.minFilter=THREE.LinearFilter;map.generateMipmaps=false;maps.push(map);
    crops.push({x:left,y:top,width:right-left,height:bottom-top,foot:footCount?footSum/footCount:(minX+maxX)/2,count,map});
  }
  const scale=4.4/Math.max(...crops.map(c=>c.height));
  return crops.map((crop,index)=>{
    const hand=definition.hands[index],point:Point=[(hand[0]*width/1254-crop.x)/crop.width,(hand[1]*height/1254-crop.y)/crop.height];
    return {map:crop.map,width:crop.width*scale,height:crop.height*scale,pivot:(crop.foot-crop.x)/crop.width,alphaPixels:crop.count,crop:{x:crop.x,y:crop.y,width:crop.width,height:crop.height},anchors:{...ANCHORS[POSES[index]],muzzle:point,fist:point,shield:index===2?point:ANCHORS[POSES[index]].shield}};
  });
}

function acquire() {
  users++;
  const created=!pending;
  if(!pending&&!new URLSearchParams(location.search).has('prepareArt'))pending=loadPrepared();
  if(!pending)pending=(async()=>{
    const frames=new Map<string,Frame[]>();
    for(const [file,ids] of Object.entries(SHEETS)){
      const sheet=await readSheet(file);
      ids.forEach(id=>frames.set(id,extractFrames(sheet,ACTOR_ATLAS[id])));
    }
    for(const [file,rects] of [['weapons.png',WEAPON_RECTS],['upgrades.png',UPGRADE_RECTS]] as const){
      const sheet=await readSheet(file);
      for(const [name,rect] of Object.entries(rects))overlays.set(name,extractOverlay(sheet,rect,name));
    }
    return frames;
  })();
  if(created){settled=false;const batch=pending;const mark=()=>{if(pending===batch)settled=true;};void batch.then(mark,mark);}
  return pending;
}

async function loadPrepared() {
  const base=new URL('./assets/heroes/generated/packed/',new URL('.',document.baseURI));
  const response=await fetch(new URL('manifest.json',base));
  if(!response.ok)throw new Error(`Generated actor manifest unavailable (${response.status})`);
  const manifest=await response.json();if(manifest.version!==1)throw new Error('Unsupported generated actor manifest');
  const textures=new Map<string,THREE.Texture>();
  const results=await Promise.allSettled(manifest.files.map(async(file:string)=>{
    const texture=await new THREE.TextureLoader().loadAsync(new URL(file,base).href);texture.colorSpace=THREE.SRGBColorSpace;texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;texture.generateMipmaps=false;
    sources.push(texture);textures.set(file,texture);
  }));
  const failed=results.find(result=>result.status==='rejected');if(failed?.status==='rejected')throw failed.reason;
  const map=(item:any)=>{
    const source=textures.get(item.file)!;const texture=source.clone();texture.needsUpdate=true;
    texture.repeat.set(item.rect[2]/source.image.width,item.rect[3]/source.image.height);texture.offset.set(item.rect[0]/source.image.width,1-(item.rect[1]+item.rect[3])/source.image.height);maps.push(texture);return texture;
  };
  const frames=new Map<string,Frame[]>();
  for(const [id,items] of Object.entries(manifest.actors))frames.set(id,(items as any[]).map(item=>({...item,map:map(item)})));
  for(const [name,item] of Object.entries(manifest.overlays))overlays.set(name,{...(item as Overlay),map:map(item)});
  return frames;
}

/** Offline preparation only; preserves generated pixels and alpha while packing routed crops. */
export async function exportPreparedArt() {
  const frames=await pending!;const files:{name:string;data:string}[]=[];
  const manifest:any={version:1,files:[],actors:{},overlays:{}};
  const pack=(name:string,items:{id:string;frame?:Frame;overlay?:Overlay}[],columns:number)=>{
    const sizes=items.map(item=>{const map=item.frame?.map||item.overlay!.map;return {w:Math.round(map.image.width*map.repeat.x),h:Math.round(map.image.height*map.repeat.y),map};});
    const cellW=Math.max(...sizes.map(s=>s.w))+8,cellH=Math.max(...sizes.map(s=>s.h))+8;
    const canvas=document.createElement('canvas');canvas.width=columns*cellW;canvas.height=Math.ceil(items.length/columns)*cellH;const ctx=canvas.getContext('2d')!;
    items.forEach((item,i)=>{
      const {w,h,map}=sizes[i],x=i%columns*cellW+4,y=Math.floor(i/columns)*cellH+4;
      const sx=Math.round(map.offset.x*map.image.width),sy=Math.round((1-map.offset.y-map.repeat.y)*map.image.height);
      ctx.drawImage(map.image,sx,sy,w,h,x,y,w,h);
      const routing={file:name,rect:[x,y,w,h]};
      if(item.frame){const {map:unused,...metadata}=item.frame;(manifest.actors[item.id]??=[]).push({...metadata,...routing});}
      else manifest.overlays[item.id]={...routing,aspect:item.overlay!.aspect,grip:item.overlay!.grip,muzzle:item.overlay!.muzzle};
    });
    manifest.files.push(name);files.push({name,data:canvas.toDataURL('image/webp',.94)});
  };
  for(const [file,ids] of Object.entries(SHEETS))pack(file.replace('.png','.webp'),ids.flatMap(id=>frames.get(id)!.map(frame=>({id,frame}))),4);
  pack('weapons.webp',Object.keys(WEAPON_RECTS).map(id=>({id,overlay:overlays.get(id)!})),4);
  pack('upgrades.webp',Object.keys(UPGRADE_RECTS).map(id=>({id,overlay:overlays.get(id)!})),3);
  const effect=await readSheet('combat-effects.png'),canvas=document.createElement('canvas');canvas.width=effect.texture.image.width;canvas.height=effect.texture.image.height;canvas.getContext('2d')!.drawImage(effect.texture.image,0,0);
  files.push({name:'combat-effects.webp',data:canvas.toDataURL('image/webp',.94)});
  return {manifest,files};
}
function extractOverlay(sheet: Sheet,rect: PixelRect,name:string): Overlay {
  const [x,y,w,h]=rect,map=sheet.texture.clone();map.needsUpdate=true;
  map.repeat.set(w/sheet.pixels.width,h/sheet.pixels.height);map.offset.set(x/sheet.pixels.width,1-(y+h)/sheet.pixels.height);maps.push(map);
  const sockets=WEAPON_SOCKETS[name];
  return {map,aspect:w/h,grip:sockets?[(sockets.grip[0]-x)/w,(sockets.grip[1]-y)/h]:[.5,.5],muzzle:sockets?[(sockets.muzzle[0]-x)/w,(sockets.muzzle[1]-y)/h]:[.95,.5]};
}
function release() {
  users=Math.max(0,users-1);if(users)return;
  const retiring=pending;
  const clear=()=>{
    if(users||pending!==retiring)return;
    for(const map of maps)map.dispose();for(const texture of sources)texture.dispose();
    maps.length=0;sources.length=0;overlays.clear();pending=null;settled=false;
  };
  // A reacquiring actor joins the in-flight batch. Never clear it while loaders can still append.
  if(retiring&&!settled)void retiring.then(clear,clear);else clear();
}
export const imageActorResources=()=>({users,maps:maps.length,sources:sources.length,pending:!!pending,settled});

/** Generated artwork is the visible actor. The GLB owns event timing, not these sockets. */
export class ImageActor {
  readonly root=new THREE.Group();
  readonly ready: Promise<void>;
  active=false;
  private disposed=false;
  private frames=new Map<string,Frame[]>();
  private id='relay';
  private pose: Pose='ready';
  private previous: Pose='ready';
  private motion: HeroMotion='idle';
  private elapsed=0;
  private clock=0;
  private transition=1;
  private duration=1;
  private stage=0;
  private reduced=false;
  private flip=1;
  private facing=new THREE.Group();
  private layers: THREE.Mesh[]=[];
  private bind: Float32Array[]=[];
  private shadow: THREE.Mesh;
  private charge: THREE.Sprite;
  private chargeAmount=0;
  private recoil=10;
  private camera: THREE.Camera | null=null;
  private gear: Map<string,THREE.Mesh>[]=[];
  private weaponMuzzle=new THREE.Vector3();
  private thruster: THREE.Sprite;

  constructor(private host: THREE.Group,prism=false) {
    this.flip=prism?-1:1;this.id=prism?'prism':'relay';
    this.root.name='generated-image-actor';this.root.visible=false;this.root.add(this.facing);host.add(this.root);
    for(let i=0;i<2;i++){
      const geometry=new THREE.PlaneGeometry(1,1,12,16);geometry.translate(.5,.5,0);
      this.bind.push(new Float32Array(geometry.attributes.position.array));
      const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,alphaTest:.012,toneMapped:false,side:THREE.DoubleSide}));
      mesh.frustumCulled=false;mesh.renderOrder=4+i;this.layers.push(mesh);this.facing.add(mesh);
      const parts=new Map<string,THREE.Mesh>();this.gear.push(parts);
      for(const name of ['weapon','cells','rockets','rail','reactor','shield']){
        const part=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,alphaTest:.015,toneMapped:false,side:THREE.DoubleSide}));
        part.name=`generated-${name}-${i}`;part.visible=false;part.frustumCulled=false;part.renderOrder=name==='rockets'||name==='rail'||name==='reactor'?2:6;
        parts.set(name,part);this.facing.add(part);
      }
    }
    const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;
    const ctx=canvas.getContext('2d')!,gradient=ctx.createRadialGradient(32,32,0,32,32,31);
    gradient.addColorStop(0,'rgba(255,255,255,.8)');gradient.addColorStop(.4,'rgba(255,255,255,.45)');gradient.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);
    const texture=new THREE.CanvasTexture(canvas);
    this.shadow=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.3),new THREE.MeshBasicMaterial({map:texture,color:0x152126,transparent:true,opacity:.45,depthWrite:false}));
    this.shadow.rotation.x=-Math.PI/2;this.shadow.position.y=.025;this.root.add(this.shadow);
    this.charge=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:0x9ff5ff,transparent:true,depthWrite:false,opacity:0,blending:THREE.AdditiveBlending,toneMapped:false}));
    this.charge.renderOrder=7;this.facing.add(this.charge);
    this.thruster=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,color:0x69dfff,transparent:true,depthWrite:false,opacity:0,blending:THREE.AdditiveBlending,toneMapped:false}));
    this.thruster.renderOrder=3;this.facing.add(this.thruster);
    this.ready=acquire().then(frames=>{
      if(this.disposed)return;
      this.frames=frames;this.active=true;this.root.visible=true;this.select(this.id);this.applyFrames();
    });
  }

  select(id: string) {this.id=id;this.applyFrames();}
  setStage(stage: number) {this.stage=stage;this.root.userData.stage=stage;this.deform();}
  setCamera(camera: THREE.Camera) {this.camera=camera;this.faceCamera();}
  setCharge(amount: number) {this.chargeAmount=amount;}
  fire() {this.recoil=0;}
  play(motion: HeroMotion,duration: number,start=0,reduced=false) {
    this.motion=motion;this.elapsed=start;this.duration=duration;this.reduced=reduced;
    if(reduced)this.transition=1;
    const next: Pose=motion==='guard'?'guard':motion==='hit'?'hit':['charge','strike','break','special'].includes(motion)?'firing':'ready';
    if(next!==this.pose){this.previous=this.pose;this.pose=next;this.transition=reduced?1:0;this.applyFrames();}
  }

  private applyFrames() {
    const frames=this.frames.get(this.id);if(!frames)return;
    for(let i=0;i<2;i++){
      const frame=frames[POSES.indexOf(i===0?this.previous:this.pose)];
      const mesh=this.layers[i];(mesh.material as THREE.MeshBasicMaterial).map=frame.map;
      mesh.userData.frame=frame;mesh.userData.pose=i===0?this.previous:this.pose;
      (mesh.material as THREE.MeshBasicMaterial).needsUpdate=true;
    }
    this.root.userData.art={id:this.id,pose:this.pose,source:'generated-atlas',alphaPixels:frames.map(f=>f.alphaPixels),crops:frames.map(f=>f.crop)};
    this.deform();
  }

  faceCamera() {
    if(!this.camera)return;
    this.host.updateWorldMatrix(true,false);
    this.root.quaternion.copy(this.host.getWorldQuaternion(new THREE.Quaternion()).invert());
    this.facing.quaternion.copy(this.camera.getWorldQuaternion(new THREE.Quaternion()));
    this.root.updateWorldMatrix(true,true);
  }

  update(dt: number,reduced: boolean) {
    this.reduced=reduced;this.clock+=dt;this.elapsed+=dt;this.recoil+=dt;this.transition=reduced?1:Math.min(1,this.transition+dt/.11);
    if(!this.active)return;
    this.deform();this.faceCamera();
    const local=this.localAnchor('muzzle');this.charge.position.copy(local).z=.035;
    this.charge.scale.setScalar(.15+.55*this.chargeAmount);
    (this.charge.material as THREE.SpriteMaterial).opacity=this.chargeAmount*.6;
    this.thruster.position.set(-.65*this.flip,.24,.015);this.thruster.scale.set(1.05,.24,1);
    (this.thruster.material as THREE.SpriteMaterial).opacity=this.motion==='walk'&&!this.reduced?.65:0;
    this.root.userData.charge=this.chargeAmount;
  }

  private warp(x: number,y: number): Point {
    if(this.reduced)return [x,y];
    const upper=ease((y-.18)/.64);
    let lean=Math.sin(this.clock*1.6)*.008,compression=Math.sin(this.clock*1.6)*.006;
    if(this.motion==='walk'){
      const thrust=Math.sin(clamp(this.elapsed/Math.max(.35,this.duration))*Math.PI);
      lean=.075*thrust;compression=-.045*thrust;
    }else if(this.motion==='charge'){lean=-.045*this.chargeAmount;compression=-.025*this.chargeAmount;}
    else if(this.motion==='hit'){const beat=Math.sin(clamp(this.elapsed/.55)*Math.PI);lean=-.075*beat;compression=-.035*beat;}
    else if(this.motion==='guard'){lean=-.025;compression=-.02;}
    else if(this.motion==='strike'){lean=.065*Math.sin(clamp(this.elapsed/this.duration)*Math.PI);}
    const kick=Math.exp(-this.recoil*14)*Math.sin(Math.min(1,this.recoil/.075)*Math.PI/2);
    return [x+upper*(lean-kick*.045),y+upper*compression];
  }

  private deform() {
    for(let i=0;i<2;i++){
      const mesh=this.layers[i],frame=mesh.userData.frame as Frame;if(!frame)continue;
      const position=mesh.geometry.attributes.position,bind=this.bind[i];
      for(let v=0;v<position.count;v++){
        const [x,y]=this.warp(bind[v*3],bind[v*3+1]);
        position.setXYZ(v,(x-frame.pivot)*frame.width*this.flip,y*frame.height,.002*i);
      }
      position.needsUpdate=true;mesh.geometry.computeBoundingBox();
      const opacity=i===0?1-ease(this.transition):ease(this.transition);
      (mesh.material as THREE.MeshBasicMaterial).opacity=opacity;mesh.visible=opacity>.005;
      this.placeEquipment(i,frame,opacity);
    }
  }

  private placeEquipment(layer: number,frame: Frame,opacity: number) {
    const parts=this.gear[layer],pose=POSES.indexOf(this.layers[layer].userData.pose);
    const hand=frame.anchors.fist;
    const point=(x:number,y:number)=>{const p=this.warp(x,y);return new THREE.Vector3((p[0]-frame.pivot)*frame.width*this.flip,p[1]*frame.height,.025);};
    const attach=(name:string,key:string,position:THREE.Vector3,width:number,rotation=0)=>{
      const part=parts.get(name)!,art=overlays.get(key);if(!art)return part;
      const material=part.material as THREE.MeshBasicMaterial;
      if(material.map!==art.map){material.map=art.map;material.needsUpdate=true;}
      material.opacity=opacity;part.position.copy(position);part.rotation.z=rotation*this.flip;
      part.scale.set(width*this.flip,width/art.aspect,1);part.visible=opacity>.005;return part;
    };
    for(const part of parts.values())part.visible=false;
    if(this.stage===0)return;
    const weaponKey=this.stage===5?'siege':this.id,weaponWidth=this.stage===5?1.8:1.45;
    const angle=pose===0?-.65:pose===2?-1.05:pose===3?-.1:0;
    const grip=pose===2?point(.16,.42):point(hand[0],1-hand[1]),art=overlays.get(weaponKey);if(!art)return;
    const centre=new THREE.Vector3((.5-art.grip[0])*weaponWidth,(art.grip[1]-.5)*weaponWidth/art.aspect,0).applyAxisAngle(new THREE.Vector3(0,0,1),angle);
    centre.x*=this.flip;centre.add(grip);
    const weapon=attach('weapon',weaponKey,centre,weaponWidth,angle);
    weapon.renderOrder=pose===2?2:6;weapon.position.z=pose===2?-.03:.025;
    if(layer===1){weapon.updateMatrix();this.weaponMuzzle.set(art.muzzle[0]-.5,.5-art.muzzle[1],.025).applyMatrix4(weapon.matrix);}
    if(this.stage>=2){
      const cell=centre.clone();cell.y+=.32;cell.z+=.008;const cells=attach('cells','cells',cell,.72,angle);cells.renderOrder=pose===2?2:6;
    }
    if(this.stage>=3)attach('rockets','rockets',point(.12,.84),.88);
    if(this.stage>=4){attach('rail','rail',point(.24,.86),1.22);attach('reactor','reactor',point(.11,.6),.9);}
    if(this.stage>=5||this.id==='prism'&&this.stage>=1){const shield=point(.37,.48);shield.z=.055;attach('shield','shield',shield,.78,-.14);}
  }

  private localAnchor(name: Anchor,pose=this.pose) {
    if(name==='muzzle'&&this.stage>0&&pose===this.pose)return this.weaponMuzzle.clone();
    if(name==='shield'&&pose===this.pose){const shield=this.gear[1].get('shield');if(shield?.visible){shield.updateMatrix();return new THREE.Vector3(.2,0,.03).applyMatrix4(shield.matrix);}}
    const frame=this.frames.get(this.id)?.[POSES.indexOf(pose)];if(!frame)return new THREE.Vector3();
    const a=frame.anchors[name],[x,y]=this.warp(a[0],1-a[1]);
    const point=new THREE.Vector3((x-frame.pivot)*frame.width*this.flip,y*frame.height,.03);
    if(name==='muzzle'&&this.stage>0){const width=this.stage===5?1.8:1.45,art=overlays.get(this.stage===5?'siege':this.id);if(art){point.x+=width*(art.muzzle[0]-art.grip[0])*this.flip;point.y+=width/art.aspect*(art.grip[1]-art.muzzle[1]);}}
    return point;
  }
  socket(name: Anchor,pose=this.pose) {this.faceCamera();return this.facing.localToWorld(this.localAnchor(name,pose));}
  bounds() {
    this.faceCamera();const bounds=new THREE.Box3();
    for(const mesh of this.layers)if(mesh.visible&&mesh.geometry.boundingBox)bounds.union(mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld));
    for(const parts of this.gear)for(const mesh of parts.values())if(mesh.visible){mesh.geometry.computeBoundingBox();bounds.union(mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld));}
    return bounds;
  }
  dispose() {
    if(this.disposed)return;this.disposed=true;this.active=false;
    for(const mesh of this.layers){mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();}
    for(const parts of this.gear)for(const mesh of parts.values()){mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();}
    this.shadow.geometry.dispose();(this.shadow.material as THREE.MeshBasicMaterial).map?.dispose();(this.shadow.material as THREE.Material).dispose();(this.charge.material as THREE.Material).dispose();(this.thruster.material as THREE.Material).dispose();
    this.root.removeFromParent();release();
  }
}
