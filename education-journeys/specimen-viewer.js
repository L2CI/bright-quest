import * as THREE from '../cave-river-quest/vendor/three.module.js';
import {GLTFLoader} from '../cave-river-quest/vendor/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from './assets/vendor/DRACOLoader.js';

export class SpecimenViewer {
 constructor(canvas,exhibit,{onReady=()=>{},onError=()=>{}}={}){this.canvas=canvas;this.exhibit=exhibit;this.onReady=onReady;this.onError=onError;this.disposed=false;this.ready=false;this.zoom=1;this.yaw=.4;this.pitch=exhibit.id==='whale'?1.05:.12;this.drag=null;this.active=false;this.listeners=[];this.frame=0;}
 listen(el,name,fn,options){el.addEventListener(name,fn,options);this.listeners.push(()=>el.removeEventListener(name,fn,options));}
 async init(){
  try{
   this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65));this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.1;
   this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(34,1,.01,100);this.scene.add(new THREE.HemisphereLight(0xe7f6ff,0x6f5e4a,2.4));
   const key=new THREE.DirectionalLight(0xffead1,3.5);key.position.set(-3,5,4);this.scene.add(key);const rim=new THREE.DirectionalLight(0xb1d8ed,2.2);rim.position.set(3,3,-4);this.scene.add(rim);
   this.draco=new DRACOLoader();this.draco.setDecoderPath(new URL('./assets/vendor/',import.meta.url).href);this.draco.setWorkerLimit(1);
   const loader=new GLTFLoader();loader.setDRACOLoader(this.draco);
   const gltf=await loader.loadAsync(new URL(this.exhibit.model,import.meta.url).href);
   if(this.disposed){this.release(gltf.scene);return;}
   this.model=gltf.scene;this.model.rotation.x+=this.exhibit.rotationX||0;this.model.updateMatrixWorld(true);
   const box=new THREE.Box3().setFromObject(this.model),size=box.getSize(new THREE.Vector3()),centre=box.getCenter(new THREE.Vector3());const scale=3.2/Math.max(size.x,size.y,size.z);
   this.model.scale.multiplyScalar(scale);this.model.position.sub(centre.multiplyScalar(scale));this.model.traverse(o=>{if(o.isMesh){o.material.side=THREE.DoubleSide;o.material.needsUpdate=true;}});
   this.scene.add(this.model);this.ready=true;
   this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this.canvas.parentElement);this.resize();
   this.listen(this.canvas,'pointerdown',e=>{if(!this.active||e.button!==0)return;this.drag={x:e.clientX,y:e.clientY};this.canvas.setPointerCapture(e.pointerId);});
   this.listen(this.canvas,'pointermove',e=>{if(!this.drag)return;this.turn(-(e.clientX-this.drag.x)*.008,(e.clientY-this.drag.y)*.008);this.drag={x:e.clientX,y:e.clientY};});
   const end=()=>{this.drag=null;};this.listen(this.canvas,'pointerup',end);this.listen(this.canvas,'pointercancel',end);this.listen(this.canvas,'lostpointercapture',end);
   this.listen(this.canvas,'keydown',e=>{const keys={ArrowLeft:[-.18,0],ArrowRight:[.18,0],ArrowUp:[0,.12],ArrowDown:[0,-.12]};if(keys[e.key]){e.preventDefault();this.turn(...keys[e.key]);}else if(['+','=','-','0'].includes(e.key)){e.preventDefault();e.key==='0'?this.reset():this.changeZoom(e.key==='-'?-.2:.2);}});
   this.listen(this.canvas,'webglcontextlost',e=>{e.preventDefault();this.ready=false;this.onError(new Error('3D graphics were interrupted. Retry or read the fossil notes.'));});
   this.onReady(this);this.render();
  }catch(error){if(!this.disposed)this.onError(error);}
 }
 activate(active){this.active=Boolean(active);this.canvas.style.touchAction=this.active?'none':'pan-y';this.canvas.classList.toggle('interacting',this.active);this.drag=null;}
 resize(){if(!this.ready||this.disposed)return;const r=this.canvas.parentElement.getBoundingClientRect();this.renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);this.camera.aspect=r.width/Math.max(1,r.height);this.camera.updateProjectionMatrix();this.render();}
 turn(yaw=0,pitch=0){this.yaw+=yaw;this.pitch=Math.max(-1.35,Math.min(1.35,this.pitch+pitch));this.render();}
 changeZoom(delta){this.zoom=Math.max(.7,Math.min(2.4,this.zoom+delta));this.render();}
 reset(){this.yaw=.4;this.pitch=this.exhibit.id==='whale'?1.05:.12;this.zoom=1;this.render();}
 render(){if(!this.ready||this.disposed)return;const fit=Math.max(1,1/this.camera.aspect),radius=6.5*fit/this.zoom;this.camera.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*radius,Math.sin(this.pitch)*radius,Math.cos(this.yaw)*Math.cos(this.pitch)*radius);this.camera.lookAt(0,0,0);this.renderer.render(this.scene,this.camera);this.frame++;}
 diagnostics(){return {ready:this.ready,model:this.exhibit.id,yaw:this.yaw,pitch:this.pitch,zoom:this.zoom,frames:this.frame,triangles:this.renderer?.info.render.triangles||0,geometries:this.renderer?.info.memory.geometries||0,textures:this.renderer?.info.memory.textures||0,bounds:this.model?new THREE.Box3().setFromObject(this.model).getSize(new THREE.Vector3()).toArray():[]};}
 release(object){object?.traverse(o=>{if(o.geometry)o.geometry.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){for(const value of Object.values(m))if(value?.isTexture){value.source?.data?.close?.();value.dispose();}m.dispose();}});}
 dispose(){this.disposed=true;this.ready=false;this.listeners.forEach(fn=>fn());this.observer?.disconnect();this.draco?.dispose();this.release(this.model);this.renderer?.dispose();this.renderer?.forceContextLoss();}
}
