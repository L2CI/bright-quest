import * as T from '../cave-river-quest/vendor/three.module.js';
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
const palette=[{sky:0x90bdd0,fog:0x9bc7d5,ground:0x738d65,rock:0x6b7f88,leaf:0x24776c,glow:0x58ecf3},{sky:0x769ebf,fog:0xa6c9de,ground:0xc4dfeb,rock:0x657991,leaf:0x486f88,glow:0x94dcff},{sky:0x75576f,fog:0xb48481,ground:0x504f66,rock:0x464657,leaf:0x86604f,glow:0xffad57}];
export class SkyWorld {
 constructor(canvas,{reduced=false,onError=()=>{}}={}){
  this.canvas=canvas;this.reduced=reduced;this.elapsed=0;this.effects=[];this.anim=null;this.mode='briefing';this.mission=-1;this.kitKey='';this.onError=onError;
  this.renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=T.PCFSoftShadowMap;this.renderer.outputColorSpace=T.SRGBColorSpace;this.renderer.toneMapping=T.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.3;
  this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(37,1,.1,220);this.camera.position.set(12,8,15);this.target=V(0,1.6,0);
  this.scene.add(new T.HemisphereLight(0xdbf4ff,0x4d536e,2.1));const sun=new T.DirectionalLight(0xffedca,3.8);sun.position.set(-9,17,8);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);Object.assign(sun.shadow.camera,{left:-13,right:13,top:12,bottom:-12,near:.5,far:50});sun.shadow.normalBias=.035;sun.shadow.bias=-.0002;this.scene.add(sun);const rim=new T.DirectionalLight(0x58cfff,2.4);rim.position.set(4,4,-8);this.scene.add(rim);
  this.skyMaterial=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color(0x3b7dba)},bottom:{value:new T.Color(0xeadac0)}},vertexShader:'varying vec3 vPos; void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vPos;uniform vec3 top;uniform vec3 bottom;void main(){float h=clamp(normalize(vPos).y*.8+.15,0.,1.);gl_FragColor=vec4(mix(bottom,top,pow(h,.6)),1.);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'});const sky=new T.Mesh(new T.SphereGeometry(95,24,16),this.skyMaterial);this.scene.add(sky);
  this.land=new T.Group();this.scene.add(this.land);this.hero=this.mech(false);this.enemy=this.mech(true);this.scene.add(this.hero.root,this.enemy.root);this.hero.root.position.x=-3.2;this.enemy.root.position.x=3.5;this.hero.root.rotation.y=.65;this.enemy.root.rotation.y=-.7;
  this.drone=new T.Group();const dm=this.material(0xf1d8a0,.6);this.part(this.drone,new T.SphereGeometry(.22,16,12),dm,0,0,0);this.part(this.drone,new T.TorusGeometry(.34,.055,8,24),this.material(0x80f5ff,.4,0x49dfff),0,0,0).rotation.x=Math.PI/2;this.scene.add(this.drone);
  this.resize=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;if(w&&h){this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.snapCamera=true;}};this.observer=new ResizeObserver(this.resize);this.observer.observe(canvas);this.setRegion(0);this.resize();this.last=performance.now();this.frame=this.frame.bind(this);this.raf=requestAnimationFrame(this.frame);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();onError('The 3D view paused. Reload to restore it; your progress is saved.');});
 }
 material(color,metal=.25,emissive=0){this.materials??=new Map();const key=`${color}:${metal}:${emissive}`;if(!this.materials.has(key))this.materials.set(key,new T.MeshStandardMaterial({color,metalness:metal*.7,roughness:.47,emissive,emissiveIntensity:emissive?.65:0}));return this.materials.get(key);}
 part(parent,geo,mat,x=0,y=0,z=0){const mesh=new T.Mesh(geo,mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 plate(parent,size,mat,x,y,z,angle=0){const shape=new T.Shape();const w=size[0],h=size[1],r=Math.min(w,h)*.18;shape.moveTo(-w/2+r,-h/2);shape.lineTo(w/2-r,-h/2);shape.lineTo(w/2,-h/2+r);shape.lineTo(w/2,h/2-r);shape.lineTo(w/2-r,h/2);shape.lineTo(-w/2+r,h/2);shape.lineTo(-w/2,h/2-r);shape.lineTo(-w/2,-h/2+r);shape.closePath();const g=new T.ExtrudeGeometry(shape,{depth:size[2],bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:1,steps:1});g.translate(0,0,-size[2]/2);const m=this.part(parent,g,mat,x,y,z);m.rotation.z=angle;return m;}
 mech(rival){
  const root=new T.Group();root.name=rival?'Rogue colossus':'Aegis guardian';const body=new T.Group();root.add(body);const blue=this.material(rival?0x8d4552:0x2359a3,.72),white=this.material(rival?0x423e50:0xe1e5de,.6),gold=this.material(rival?0xa68476:0xd5ac63,.78),dark=this.material(0x202c3b,.8),glow=this.material(rival?0xff8257:0x66eafa,.45,rival?0xff5023:0x33caff);
  const joint=(p,x,y,z,r=.17)=>this.part(p,new T.SphereGeometry(r,12,10),dark,x,y,z);
  const pelvis=this.plate(body,[.85,.42,.5],dark,0,1.55,0);
  const torso=new T.Group();torso.position.y=2.1;body.add(torso);this.plate(torso,[1.12,.85,.55],blue,0,0,0);this.plate(torso,[.9,.26,.16],white,0,.28,.34);this.plate(torso,[.62,.3,.18],gold,0,-.31,.32);
  this.part(torso,new T.CylinderGeometry(.23,.23,.17,24),gold,0,.01,.37).rotation.x=Math.PI/2;
  const core=this.part(torso,new T.CylinderGeometry(.15,.15,.19,24),glow,0,.01,.4);core.rotation.x=Math.PI/2;
  for(const side of [-1,1]){for(let i=0;i<3;i++)this.plate(torso,[.12,.05,.09],gold,side*.4,-.12-i*.1,.32);this.plate(torso,[.23,.7,.22],white,side*.62,.2,-.22,side*-.3);this.plate(torso,[.2,.67,.18],blue,side*.75,.51,-.23,side*-.42);}
  const head=new T.Group();head.position.y=2.83;body.add(head);this.plate(head,[.55,.53,.45],white,0,0,0);this.plate(head,[.49,.22,.09],dark,0,.02,.27);this.plate(head,[.39,.065,.1],glow,0,.04,.3);this.plate(head,[.3,.19,.12],blue,0,-.2,.26);this.plate(head,[.12,.34,.15],gold,0,.25,0);for(const side of [-1,1])this.part(head,new T.CylinderGeometry(.13,.13,.12,16),gold,side*.31,0,0).rotation.z=Math.PI/2;
  const arms=[],legs=[];for(const side of [-1,1]){
   const arm=new T.Group();arm.position.set(side*.78,2.34,0);torso.parent.add(arm);joint(arm,0,0,0,.21);this.plate(arm,[.55,.47,.57],white,side*.06,.04,0,side*-.15);this.plate(arm,[.56,.13,.63],blue,side*.06,.23,0);this.part(arm,new T.CylinderGeometry(.14,.13,.5,12),dark,0,-.41,0);joint(arm,0,-.66,0,.16);this.plate(arm,[.4,.57,.47],blue,0,-.92,.06);this.plate(arm,[.3,.42,.12],white,0,-.88,.34);this.plate(arm,[.37,.23,.35],dark,0,-1.3,.14);for(let f=0;f<3;f++)this.plate(arm,[.08,.18,.12],gold,-.11+f*.11,-1.31,.36);arms.push(arm);
   const leg=new T.Group();leg.position.set(side*.29,1.43,0);body.add(leg);joint(leg,0,0,0,.19);this.plate(leg,[.39,.6,.4],white,0,-.31,0);this.plate(leg,[.27,.39,.1],blue,0,-.29,.25);joint(leg,0,-.63,0,.17);this.part(leg,new T.CylinderGeometry(.16,.16,.1,16),gold,0,-.65,.22).rotation.x=Math.PI/2;this.plate(leg,[.43,.62,.48],blue,0,-.96,0);this.plate(leg,[.25,.52,.12],white,0,-.91,.3);this.plate(leg,[.46,.2,.75],white,0,-1.34,.17);this.plate(leg,[.43,.09,.37],gold,0,-1.32,.4);legs.push(leg);
  }
  const equipment=new T.Group();body.add(equipment);const handEquipment=arms.map(arm=>{const g=new T.Group();arm.add(g);return g;});return {root,body,torso,head,arms,legs,equipment,handEquipment,core,mats:{blue,white,gold,dark,glow}};
 }
 kit(actor,k,level){this.clear(actor.equipment);actor.handEquipment.forEach(g=>this.clear(g));const {blue,white,gold,dark,glow}=actor.mats;const g=actor.equipment;
  for(let i=0;i<=k.cannon;i++){const barrel=this.part(actor.handEquipment[1],new T.CylinderGeometry(.12,.16,.68+i*.12,12),dark,.17+(i%2)*.17,-.56+Math.floor(i/2)*.2,.49);barrel.rotation.x=Math.PI/2;const rim=this.part(actor.handEquipment[1],new T.TorusGeometry(.12,.035,8,16),gold,.17+(i%2)*.17,-.56+Math.floor(i/2)*.2,.86+i*.06);}
  if(k.armour){this.plate(actor.handEquipment[0],[.7+k.armour*.08,.93,.2],blue,-.16,-.67,.42);this.plate(actor.handEquipment[0],[.46,.65,.12],glow,-.16,-.67,.56);}
  for(let i=0;i<k.reactor;i++){this.part(g,new T.CylinderGeometry(.14,.14,.63,12),gold,-.3+i*.3,2.3,-.43);this.part(g,new T.CylinderGeometry(.1,.1,.55,12),glow,-.3+i*.3,2.35,-.44);}
  if(level>=4){for(const side of [-1,1])this.plate(g,[.27,.9,.13],gold,side*.58,2.68,-.4,side*-.45);}
  if(level>=8){this.plate(g,[.52,.3,.7],white,.76,2.76,-.12);for(let i=0;i<3;i++)this.part(g,new T.CylinderGeometry(.065,.065,.6,8),glow,.62+i*.14,2.76,.23).rotation.x=Math.PI/2;}
 }
 islandGeometry(radius){const g=new T.DodecahedronGeometry(radius,1),p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,Math.min(p.getY(i),radius*.5));g.computeVertexNormals();return g;}
 clear(group){while(group.children.length){const obj=group.children[0];group.remove(obj);obj.traverse(n=>n.geometry?.dispose());}}
 setRegion(mission){if(this.mission===mission)return;this.mission=mission;this.clear(this.land);const p=palette[Math.floor(mission/4)];this.scene.background=new T.Color(p.sky);this.scene.fog=new T.Fog(p.fog,28,90);this.skyMaterial.uniforms.top.value.setHex([0x467fb7,0x385c92,0x392f60][Math.floor(mission/4)]);this.skyMaterial.uniforms.bottom.value.setHex([0xc4e8f0,0xd3e5ec,0xdda77b][Math.floor(mission/4)]);
  const rock=this.material(p.rock,.1),ground=this.material(p.ground,.12),stone=this.material(0xc0bcb0,.22),trim=this.material(0x4e6474,.5),energy=this.material(p.glow,.25,p.glow),leaf=this.material(p.leaf,.08);
  const platform=this.part(this.land,new T.CylinderGeometry(8.8,7.2,1.25,12),rock,0,-.8,0);this.part(this.land,new T.CylinderGeometry(8.65,8.65,.15,12),ground,0,-.13,0);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;const x=Math.cos(a)*7,z=Math.sin(a)*7;this.part(this.land,new T.DodecahedronGeometry(.65+(i%3)*.4,0),rock,x,-1.4,z).scale.y=2.5;}
  const disc=this.part(this.land,new T.CylinderGeometry(5.7,5.7,.11,64),stone,0,-.03,0);for(let r of [5.25,5.5]){const ring=this.part(this.land,new T.TorusGeometry(r,.035,6,80),energy,0,.035,0);ring.rotation.x=Math.PI/2;}
  for(let i=0;i<8;i++){const a=i*Math.PI/4;this.plate(this.land,[.65,.08,1.9],trim,Math.sin(a)*4.6,.05,Math.cos(a)*4.6).rotation.y=a;}
  for(let i=0;i<7;i++){const a=i*.7+2.3,x=Math.cos(a)*7.4,z=Math.sin(a)*7.4;const h=2.6+(i%3)*.9;this.part(this.land,new T.CylinderGeometry(.32,.46,h,8),stone,x,h/2,z);this.part(this.land,new T.CylinderGeometry(.65,.65,.23,8),trim,x,h,z);if(i%2===0)this.part(this.land,new T.OctahedronGeometry(.34),energy,x,h+.45,z);}
  // An architectural relay tower, layered roofs and halo; a tangible destination in each world.
  this.part(this.land,new T.CylinderGeometry(.6,1.2,8,6),stone,0,3.5,-7);for(let y of [1.2,3.2,5.4,7.2])this.part(this.land,new T.CylinderGeometry(1.3,.7,.4,6),trim,0,y,-7);
  this.part(this.land,new T.CylinderGeometry(.16,.3,9,12),energy,0,4.6,-7);const halo=this.part(this.land,new T.TorusGeometry(1.6,.07,8,48),energy,0,6.8,-7);halo.rotation.x=Math.PI/2;this.halo=halo;
  let seed=582+mission*43;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let i=0;i<24;i++){const x=(rand()-.5)*90,z=-13-rand()*55,y=-9+rand()*11;const radius=2+rand()*6;this.part(this.land,this.islandGeometry(radius),rock,x,y-radius*.8,z).scale.set(1,1.35,1);this.part(this.land,new T.CylinderGeometry(radius*.94,radius,.45,6),ground,x,y,z);if(i%2===0){this.part(this.land,new T.CylinderGeometry(.14,.25,3,7),stone,x,y+1.6,z);this.part(this.land,new T.ConeGeometry(1.6,3,7),leaf,x,y+3.3,z);}}
  const cloudMat=this.cloudMaterial??=new T.MeshStandardMaterial({color:0xf2eee4,roughness:1,transparent:true,opacity:.55,depthWrite:false});for(let i=0;i<12;i++){const cloud=this.part(this.land,new T.SphereGeometry(1,10,7),cloudMat,(rand()-.5)*65,-5-rand()*4,-12-rand()*40);cloud.scale.set(5+rand()*7,.6+rand(),2+rand()*3);cloud.castShadow=false;}
  // Canopy trees / ice spires / basalt formations are real meshes with depth and shadows.
  for(let i=0;i<7;i++){const x=(i%2===0?-1:1)*(6.3+rand()),z=2.3-i*1.5;this.part(this.land,new T.CylinderGeometry(.12,.22,2,7),stone,x,.7,z);const crown=this.part(this.land,Math.floor(mission/4)===1?new T.ConeGeometry(.7,2.3,5):new T.IcosahedronGeometry(.85,1),leaf,x,2.1,z);crown.scale.y=Math.floor(mission/4)===2?1.6:.9;}
  const waterfall=this.waterMaterial??=new T.MeshStandardMaterial({color:0x9de5ed,transparent:true,opacity:.48,metalness:.1,roughness:.25,emissive:0x3a8099,emissiveIntensity:.4});for(let i=0;i<3;i++)this.part(this.land,new T.CylinderGeometry(.24,.48,10,12),waterfall,-6.5+i*.45,-5,2.4);
 }
 sync(state,kit=state.kit){this.mode=state.phase;this.setRegion(state.mission);this.snapCamera=true;const key=JSON.stringify([kit,state.mission]);if(key!==this.kitKey){this.kitKey=key;this.kit(this.hero,kit,state.mission);this.kit(this.enemy,{cannon:1+Math.floor(state.mission/5),armour:state.mission%4===1?2:1,reactor:Math.floor(state.mission/4)},state.mission);}
  this.enemy.root.visible=['battle','won','lost','complete'].includes(state.phase);this.enemy.root.scale.setScalar(state.mission%4===3?1.23:1.02);this.hero.root.visible=true;this.intent=state.intent;
 }
 async action(event,sound=()=>{}){
  if(!event||event.type!=='combat')return;this.anim={start:performance.now(),event,sound,shot:false,enemyShot:false};await new Promise(resolve=>{this.anim.resolve=resolve;setTimeout(()=>{if(this.anim?.resolve===resolve){this.anim=null;resolve();}},this.reduced?900:1900);});
 }
 bolt(from,to,color){const orb=this.part(this.scene,new T.SphereGeometry(.13,10,8),this.material(color,.1,color),from.x,from.y,from.z);const tail=this.part(orb,new T.ConeGeometry(.14,.85,8),orb.material,0,0,-.37);tail.rotation.x=Math.PI/2;orb.lookAt(to);this.effects.push({obj:orb,from,to,age:0,duration:.22});}
 burst(at,color){for(let i=0;i<(this.reduced?5:16);i++){const obj=this.part(this.scene,new T.OctahedronGeometry(.055+(i%3)*.018),this.material(color,.4,color),at.x,at.y,at.z);this.effects.push({obj,vel:V(Math.sin(i*2.4)*2,.7+i%4,Math.cos(i*2.4)*2),age:0,duration:.5+i%4*.07});}}
 frame(now){this.raf=requestAnimationFrame(this.frame);const dt=Math.min((now-this.last)/1000,.05);this.last=now;if(document.hidden)return;this.elapsed+=dt;const t=this.elapsed,battle=['battle','won','lost','complete'].includes(this.mode),mobile=this.camera.aspect<.8;
  const camera=battle?(mobile?V(7,7,25):V(10.7,6.8,16)):mobile?V(5.5,5.5,13):V(7.5,5.5,12);
  const target=battle?V(0,1.15,0):V(-2,1.8,0);if(this.snapCamera){this.camera.position.copy(camera);this.target.copy(target);this.snapCamera=false;}else{this.camera.position.lerp(camera,1-Math.exp(-dt*5));this.target.lerp(target,1-Math.exp(-dt*5));}this.camera.lookAt(this.target);
  this.hero.root.position.x=battle?(mobile?-2.2:-3.2):-2.2;this.hero.root.rotation.y=battle?.85:.32;this.enemy.root.position.x=mobile?2.2:3.35;this.enemy.root.rotation.y=-.85;
  for(const [i,a] of [this.hero,this.enemy].entries()){a.body.position.y=this.reduced?0:Math.sin(t*1.8+i)*.024;a.head.rotation.y=this.reduced?0:Math.sin(t*.6+i)*.035;a.arms[0].rotation.x=0;a.arms[1].rotation.x=0;a.torso.rotation.z=0;a.root.rotation.z=0;}
  this.drone.position.set(this.hero.root.position.x-1.25,2.7+(this.reduced?0:Math.sin(t*2)*.14),.6);this.drone.rotation.y=t*.5;this.halo.rotation.z=t*.08;
  if(this.intent==='charge')this.enemy.core.material.emissiveIntensity=1.2+Math.sin(t*4)*.3;else this.enemy.core.material.emissiveIntensity=.65;
  if(this.anim){const a=this.anim,u=(now-a.start)/1000,k=this.reduced?.45:1;const aim=Math.sin(Math.min(1,u/.4)*Math.PI/2);this.hero.arms[1].rotation.x=-aim*.85;
   if(u>.28*k&&!a.shot){a.shot=true;if(a.event.damage){this.bolt(V(this.hero.root.position.x+.4,1.9,.4),V(this.enemy.root.position.x,2,.1),0x78eeff);a.sound(a.event.move==='breaker'?'breaker':'shot');}else{this.burst(V(this.hero.root.position.x,1.4,0),a.event.healing?0x81ffd0:0x7fdcff);a.sound('shield');}}
   if(u>.53*k&&u<.82*k&&a.event.damage)this.enemy.root.rotation.z=Math.sin((u-.53*k)*12)*-.07;
   if(u>1*k&&!a.enemyShot){a.enemyShot=true;if(a.event.incoming){this.bolt(V(this.enemy.root.position.x-.4,2,.3),V(this.hero.root.position.x,1.8,0),0xff9863);a.sound('enemy');}}
   if(u>1.24*k&&u<1.5*k&&a.event.incoming)this.hero.root.rotation.z=Math.sin((u-1.24*k)*12)*.05;
   if(u>1.7*k){a.resolve();this.anim=null;}
  }
  for(let i=this.effects.length-1;i>=0;i--){const e=this.effects[i];e.age+=dt;if(e.age>=e.duration){if(e.to)this.burst(e.to,e.obj.material.color.getHex());this.scene.remove(e.obj);e.obj.traverse(o=>{o.geometry?.dispose();});this.effects.splice(i,1);continue;}if(e.to)e.obj.position.lerpVectors(e.from,e.to,e.age/e.duration);else{e.obj.position.addScaledVector(e.vel,dt);e.vel.y-=dt*7;e.obj.scale.setScalar(1-e.age/e.duration);}}
  this.renderer.render(this.scene,this.camera);
 }
 dispose(){cancelAnimationFrame(this.raf);this.observer.disconnect();this.materials?.forEach(m=>m.dispose());this.waterMaterial?.dispose();this.cloudMaterial?.dispose();this.skyMaterial?.dispose();this.renderer.dispose();}
}
