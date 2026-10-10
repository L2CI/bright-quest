import * as THREE from '../cave-river-quest/vendor/three.module.js';
import { GLTFLoader } from '../sparkbound/assets/mechs/vendor/GLTFLoader.js';

const V = (x=0,y=0,z=0) => new THREE.Vector3(x,y,z);
const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
const lerp = (a,b,t) => a+(b-a)*t;
const smooth = t => {t=clamp(t);return t*t*(3-2*t);};
const X = V(1,0,0), Y = V(0,1,0), Z = V(0,0,1);
const ASSETS = new URL('./assets/',import.meta.url);

// These states alter the existing organically sculpted, skinned creature.
// The absolute stature and the body proportions are independent of camera fit.
export const GROWTH_STAGES = [
  {stage:0,name:'Newborn',stature:.37,head:1.72,wing:.27,wingFan:.72,wingOpen:0,neck:.90,chest:1.24,limb:.72,paw:1.08,tail:.915,crown:1,crest:.02,frame:.36},
  {stage:1,name:'Hatchling',stature:.46,head:1.58,wing:.36,wingFan:.79,wingOpen:.015,neck:.925,chest:1.18,limb:.79,paw:1.10,tail:.93,crown:.93,crest:.05,frame:.405},
  {stage:2,name:'Nest explorer',stature:.55,head:1.45,wing:.46,wingFan:.86,wingOpen:.03,neck:.95,chest:1.10,limb:.87,paw:1.12,tail:.945,crown:.80,crest:.09,frame:.455},
  {stage:3,name:'Young drake',stature:.65,head:1.33,wing:.57,wingFan:.92,wingOpen:.05,neck:.975,chest:1.08,limb:.94,paw:1.16,tail:.96,crown:.62,crest:.15,frame:.515},
  {stage:4,name:'Glider',stature:.77,head:1.23,wing:.70,wingFan:.97,wingOpen:.075,neck:.99,chest:1.15,limb:1.0,paw:1.20,tail:.975,crown:.36,crest:.25,frame:.585},
  {stage:5,name:'Adolescent',stature:.90,head:1.17,wing:.86,wingFan:1.08,wingOpen:.17,neck:1.015,chest:1.34,limb:1.06,paw:1.31,tail:.99,crown:-.08,crest:.52,frame:.67},
  {stage:6,name:'Sky guardian',stature:1.03,head:1.12,wing:1.02,wingFan:1.20,wingOpen:.29,neck:1.035,chest:1.53,limb:1.13,paw:1.43,tail:1.005,crown:-.50,crest:.76,frame:.765},
  {stage:7,name:'Elder aspirant',stature:1.16,head:1.09,wing:1.10,wingFan:1.235,wingOpen:.315,neck:1.045,chest:1.66,limb:1.18,paw:1.52,tail:1.012,crown:-.68,crest:.84,frame:.835,viewTurn:.1375},
  {stage:8,name:'Great guardian',stature:1.31,head:1.06,wing:1.18,wingFan:1.255,wingOpen:.33,neck:1.055,chest:1.80,limb:1.23,paw:1.62,tail:1.019,crown:-.87,crest:.91,frame:.895,viewTurn:.275},
  {stage:9,name:'Ancient guardian',stature:1.46,head:1.035,wing:1.26,wingFan:1.277,wingOpen:.345,neck:1.065,chest:1.94,limb:1.28,paw:1.72,tail:1.026,crown:-1.05,crest:.97,frame:.95,viewTurn:.4125},
  {stage:10,name:'Emberwild sovereign',stature:1.62,head:1.02,wing:1.34,wingFan:1.30,wingOpen:.36,neck:1.075,chest:2.08,limb:1.34,paw:1.82,tail:1.033,crown:-1.24,crest:1,frame:1,viewTurn:.55},
];

function pathCounts(paths) {
  const counts={fire:0,storm:0,nature:0,astral:0};
  if(Array.isArray(paths)) for(const p of paths){const key=typeof p==='string'?p:p?.path||p?.id;if(key in counts)counts[key]++;}
  else if(paths && typeof paths==='object') for(const key of Object.keys(counts)) counts[key]=Math.max(0,Number(paths[key])||0);
  return counts;
}

async function loadDragon(signal) {
  const compressed=typeof DecompressionStream!=='undefined';
  const url=new URL(`models/european-dragon.glb${compressed?'.gz':''}`,ASSETS);
  const response=await fetch(url,{signal});
  if(!response.ok)throw new Error(`The dragon model could not load (${response.status}).`);
  let bytes=await response.arrayBuffer();
  const signature=new Uint8Array(bytes,0,Math.min(bytes.byteLength,2));
  if(compressed && signature[0]===31 && signature[1]===139)
    bytes=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  return new GLTFLoader().parseAsync(bytes,new URL('models/',ASSETS).href);
}

/** Detailed licensed glTF dragon, authored animation, staged growth and elemental VFX. */
export class DragonWorld {
  constructor({canvas,onReady=()=>{},onError=()=>{},reducedMotion=false}={}) {
    if(!canvas)throw new Error('DragonWorld needs a canvas.');
    this.canvas=canvas;this.onReady=onReady;this.onError=onError;this.reducedMotion=!!reducedMotion;
    this.stage=0;this.paths={fire:0,storm:0,nature:0,astral:0};this.level=1;
    this.disposed=false;this.ready=false;this.errors=[];this.elapsed=0;this.frameCount=0;
    this.bones=new Map();this.binds=new Map();this.sampledScales=new Map();this.poseOverlay=new Map();this.actions=new Map();this.materials=[];this.particles=[];
    this.stageScale=.37;this.growth=GROWTH_STAGES[0];this.yaw=0;this.elevation=.28;
    this.controller=new AbortController();this.effect=null;this.growthReveal=0;
    this._frame=this._frame.bind(this);
    this._contextLost=e=>{e.preventDefault();this.contextLost=true;this._finishPower();this._error(new Error('The 3D view paused. Your progress is safe; reload to restore the dragon.'));};
    this._contextRestored=()=>{this.contextLost=false;this.resize();};
    this._visibility=()=>{this.lastTime=performance.now();if(document.hidden)this._finishPower();};
  }

  init() {
    if(this._initialising)return this._initialising;
    this._initialising=this._init().catch(error=>{if(!this.disposed)this._error(error);throw error;});
    return this._initialising;
  }

  async _init() {
    if(this.disposed)throw new Error('This dragon view has been closed.');
    this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
    this.renderer.setClearColor(0x000000,0);this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.25;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(35,1,.05,120);
    this.camera.position.set(-7,4.1,10);this.look=V(0,1.45,0);
    this.hemi=new THREE.HemisphereLight(0xeafaff,0x68784f,2.3);this.scene.add(this.hemi);
    this.key=new THREE.DirectionalLight(0xffecc7,4.6);this.key.position.set(-3,9,7);this.key.castShadow=true;
    this.key.shadow.mapSize.set(1024,1024);Object.assign(this.key.shadow.camera,{left:-8,right:8,top:8,bottom:-8,near:.1,far:30});
    this.key.shadow.normalBias=.035;this.key.shadow.bias=-.0002;this.scene.add(this.key);
    this.rim=new THREE.DirectionalLight(0x95dded,2.5);this.rim.position.set(5,5,-6);this.scene.add(this.rim);
    this.fill=new THREE.DirectionalLight(0xf7ebcf,1.5);this.fill.position.set(-6,3,6);this.scene.add(this.fill);
    this.breathLight=new THREE.PointLight(0xff9e31,0,7,2);this.scene.add(this.breathLight);
    this.shadow=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({color:0x172716,opacity:.28,depthWrite:false}));
    this.shadow.rotation.x=-Math.PI/2;this.shadow.position.y=-.025;this.shadow.receiveShadow=true;this.scene.add(this.shadow);
    this.dragon=new THREE.Group();this.dragon.name='Emberwild living dragon';this.scene.add(this.dragon);
    const [gltf,fireTexture]=await Promise.all([loadDragon(this.controller.signal),new THREE.TextureLoader().loadAsync(new URL('textures/dragon-fire.webp',ASSETS).href)]);
    if(this.disposed){this._disposeObject(gltf.scene);fireTexture.dispose();throw new Error('This dragon view has been closed.');}
    this.model=gltf.scene;this.dragon.add(this.model);this.fireTexture=fireTexture;
    this.fireTexture.colorSpace=THREE.SRGBColorSpace;
    for(const clip of gltf.animations)if(!clip.tracks.length)throw new Error(`The dragon animation ${clip.name} is empty.`);
    this.mixer=new THREE.AnimationMixer(this.model);
    for(const clip of gltf.animations)this.actions.set(clip.name,this.mixer.clipAction(clip));
    if(!this.actions.has('Idle Stand')||!this.actions.has('Fly'))throw new Error('The dragon is missing an authored movement.');
    this._playClip('Idle Stand',0);this.mixer.update(.15);
    this.model.traverse(o=>{
      if(o.isBone){this.bones.set(o.name,o);this.binds.set(o.name,{position:o.position.clone(),scale:o.scale.clone(),quaternion:o.quaternion.clone()});}
      if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;
        const mats=Array.isArray(o.material)?o.material:[o.material];
        for(const material of mats){material.side=THREE.DoubleSide;material.metalness=0;material.roughness=Math.max(material.roughness||.7,.48);material.normalScale?.set(.95,.95);this.materials.push(material);}
        if(o.isSkinnedMesh && mats.some(m=>m.name==='Low_Poly_Bake')){this._addElementMaterial(o,mats[0]);this._addJuvenileMorph(o);}
        for(const material of mats)if(material.name==='Material.001'){material.color.setHex(0xffcc78);material.roughness=.26;material.emissive.setHex(0x8a4009);material.emissiveIntensity=.18;}
      }
    });
    this.wingSpreadPose=new Map();
    for(const track of gltf.animations.find(clip=>clip.name==='Fly').tracks){
      const name=track.name.replace(/\.quaternion$/,'');
      if(track.name.endsWith('.quaternion')&&/DEF-Wing_/.test(name))this.wingSpreadPose.set(name,new THREE.Quaternion().fromArray(track.createInterpolant().evaluate(.32)));
    }
    this.model.updateMatrixWorld(true);
    const sourceBounds=this._bounds();
    this.normalise=3.8/Math.max(sourceBounds.getSize(V()).y,.001);
    this.model.scale.multiplyScalar(this.normalise);this.model.updateMatrixWorld(true);
    const box=this._bounds();this.model.position.y-=box.min.y;this.model.position.x-=box.getCenter(V()).x;
    this.model.position.z-=box.getCenter(V()).z;this.model.updateMatrixWorld(true);
    this.baseBounds=this._bounds();this.baseSpan=this.baseBounds.getSize(V());
    this._buildEffects();this._installControls();
    this.canvas.addEventListener('webglcontextlost',this._contextLost);
    this.canvas.addEventListener('webglcontextrestored',this._contextRestored);
    document.addEventListener('visibilitychange',this._visibility);
    this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this.canvas);
    this.ready=true;this.setGrowth({stage:this.stage,paths:this.paths});this.setEnvironment(this.level);this.resize();
    this.lastTime=performance.now();this.raf=requestAnimationFrame(this._frame);this.onReady(this);return this;
  }

  _error(error){const text=error?.message||String(error);this.errors.push(text);this.onError(error instanceof Error?error:new Error(text));}

  _addJuvenileMorph(mesh) {
    // Reshape the original head topology in its bind space. The baby's crown is
    // a rounded set of buds that lengthen as it grows; no replacement primitives.
    const head=mesh.skeleton.bones.findIndex(b=>/^DEF-neck\.?004_012$/.test(b.name));
    if(head<0)return;
    const toHead=mesh.skeleton.boneInverses[head].clone().multiply(mesh.bindMatrix),fromHead=toHead.clone().invert();
    const position=mesh.geometry.attributes.position,weights=mesh.geometry.attributes.skinWeight,indices=mesh.geometry.attributes.skinIndex;
    const delta=new Float32Array(position.count*3),crownMask=new Float32Array(position.count);
    for(let i=0;i<position.count;i++){
      let weight=0;for(let j=0;j<4;j++)if(/^DEF-neck\.?00[34]_/.test(mesh.skeleton.bones[indices.getComponent(i,j)]?.name||''))weight+=weights.getComponent(i,j);
      if(weight<.05)continue;
      const original=V().fromBufferAttribute(position,i),p=original.clone().applyMatrix4(toHead);
      const crown=smooth((.08-p.z)/.3)*(1-smooth((p.y-.14)/.4))*clamp(weight*2);
      crownMask[i]=crown;
      p.x=lerp(p.x,p.x*.38,crown);
      p.z=lerp(p.z,.04+(p.z-.04)*.18,crown);
      if(p.y<.1)p.y=lerp(p.y,.1+(p.y-.1)*.22,crown);
      p.applyMatrix4(fromHead).sub(original);delta[i*3]=p.x;delta[i*3+1]=p.y;delta[i*3+2]=p.z;
    }
    mesh.geometry.morphTargetsRelative=true;
    mesh.geometry.morphAttributes.position=[new THREE.BufferAttribute(delta,3)];
    mesh.geometry.morphAttributes.position[0].name='Juvenile crown';mesh.updateMorphTargets();
    mesh.geometry.setAttribute('aCrownMask',new THREE.BufferAttribute(crownMask,1));
    this.juvenileMesh=mesh;
  }

  _addElementMaterial(mesh,material) {
    const weights=mesh.geometry.attributes.skinWeight,indices=mesh.geometry.attributes.skinIndex;
    const mask=new Float32Array(mesh.geometry.attributes.position.count*3);
    for(let i=0;i<weights.count;i++)for(let j=0;j<4;j++){
      const bone=mesh.skeleton.bones[indices.getComponent(i,j)]?.name||'',w=weights.getComponent(i,j);
      if(/Wing_/i.test(bone))mask[i*3]+=w;
      if(/neck|Spine\.00[345]/i.test(bone))mask[i*3+1]+=w;
      if(/Spine|tail/i.test(bone))mask[i*3+2]+=w;
    }
    mesh.geometry.setAttribute('aElementMask',new THREE.BufferAttribute(mask,3));
    this.elementUniforms={uElements:{value:V()},uAstral:{value:0},uAge:{value:0},uCrest:{value:0},uPulse:{value:0}};
    material.onBeforeCompile=shader=>{
      Object.assign(shader.uniforms,this.elementUniforms);
      shader.vertexShader='attribute vec3 aElementMask; attribute float aCrownMask; varying vec3 vElementMask; varying float vCrownMask;\n'+shader.vertexShader;
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvElementMask=aElementMask;vCrownMask=aCrownMask;');
      shader.fragmentShader='varying vec3 vElementMask; varying float vCrownMask; uniform vec3 uElements; uniform float uAstral; uniform float uAge; uniform float uCrest; uniform float uPulse;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
        float skinLight=dot(diffuseColor.rgb,vec3(.299,.587,.114));
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.50,.73,.42)*(pow(skinLight,.68)*1.7),.64);
        vec3 warm=vec3(1.38,.69,.34), storm=vec3(.51,.95,1.30), forest=vec3(.54,1.2,.61);
        float wing=clamp(vElementMask.x,0.,1.), crest=clamp(vElementMask.y,0.,1.), body=clamp(vElementMask.z,0.,1.);
        vec3 tint=vec3(1.);
        tint+=uElements.x*(warm-1.)*(.24+.55*crest+.18*body);
        tint+=uElements.y*(storm-1.)*(.13+.74*wing+.25*crest);
        tint+=uElements.z*(forest-1.)*(.16+.45*body+.25*wing);
        tint+=uAstral*(vec3(1.13,.62,1.38)-1.)*(.12+.5*wing+.45*crest);
        diffuseColor.rgb*=clamp(tint,vec3(.35),vec3(1.7));
        diffuseColor.rgb*=mix(vec3(1.18,1.05,.87),vec3(.92,1.02,1.04),uAge);
        // The original scale texture drives maturing markings, preserving its
        // irregular organic detail as the crown and wing edges gain contrast.
        float raisedScale=smoothstep(.055,.25,skinLight);
        diffuseColor.rgb*=1.+uCrest*raisedScale*(.26*body+.16*crest);
        vec3 hornColour=mix(vec3(.68,.83,.40),vec3(1.12,.72,.27),uCrest);
        diffuseColor.rgb=mix(diffuseColor.rgb,hornColour*(.25+pow(skinLight,.58)*1.6),vCrownMask*(.22+.70*uCrest));
        diffuseColor.rgb*=mix(vec3(1.),vec3(.76,.92,1.03),uCrest*wing*.6);
      `);
      shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
        totalEmissiveRadiance+=vec3(1.,.20,.035)*uElements.x*vElementMask.y*(.012+uPulse*.10);
        totalEmissiveRadiance+=vec3(.10,.45,.65)*uElements.y*vElementMask.x*.013;
        totalEmissiveRadiance+=vec3(.18,.48,.08)*uElements.z*vElementMask.z*.009;
        totalEmissiveRadiance+=vec3(.45,.12,.62)*uAstral*vElementMask.x*.025;
      `);
    };
    material.customProgramCacheKey=()=> 'emberwild-elements-v2';
    material.needsUpdate=true;
  }

  _bounds(){this.model.updateMatrixWorld(true);return new THREE.Box3().setFromObject(this.model,true);}

  _playClip(name,fade=.5) {
    if(this.clipName===name)return;
    const next=this.actions.get(name);if(!next)return;
    for(const [key,action] of this.actions)if(key!==name)action.fadeOut(fade);
    next.reset().setEffectiveTimeScale(name==='Idle Stand'?.7:1).setEffectiveWeight(1).play();if(fade>0)next.fadeIn(fade);this.clipName=name;
  }

  setGrowth({stage=0,paths=this.paths,growth}={}) {
    const nextStage=clamp(Math.floor(Number(stage)||0),0,10),nextPaths=pathCounts(paths);
    const signature=[nextStage,...Object.values(nextPaths)].join(':');
    if(this.ready&&this._growthSignature===signature&&this.framingPoints?.length)return;
    const previous=this.stage;
    this.stage=nextStage;this.paths=nextPaths;
    this.growth={...GROWTH_STAGES[this.stage]};
    if(!this.ready)return;
    const counts=this.paths;
    // Each inherited affinity also changes the existing anatomy. They combine
    // independently, so choosing another path never removes an earlier trait.
    this.growth.wing*=1+.11*clamp(counts.storm/6)+.05*clamp(counts.astral/6);
    this.growth.chest*=1+.08*clamp(counts.fire/6);
    this.growth.tail*=1+.007*clamp(counts.nature/6);
    if(this.juvenileMesh)this.juvenileMesh.morphTargetInfluences[0]=this.growth.crown-.08*clamp(counts.nature/6);
    const affinity=n=>1-Math.exp(-n*.38);
    this.elementUniforms?.uElements.value.set(affinity(counts.fire),affinity(counts.storm),affinity(counts.nature));
    if(this.elementUniforms){this.elementUniforms.uAge.value=this.stage/10;this.elementUniforms.uCrest.value=this.growth.crest;this.elementUniforms.uAstral.value=affinity(counts.astral);}
    if(previous!==this.stage)this.growthReveal=this.reducedMotion?0:1;
    this.stageScale=this.growth.stature;
    this._playClip(this.stage<2?'Idle Sit':'Idle Stand',0);
    this._updatePose(.001);this._groundAndFrame();this._growthSignature=signature;
  }

  setEnvironment(level=1) {
    this.level=clamp(Number(level)||1,1,10);
    if(!this.ready)return;
    const phase=(this.level-1)/9;
    this.key.color.copy(new THREE.Color(0xffe7bc).lerp(new THREE.Color(0xffd099),phase*.5));
    this.rim.color.copy(new THREE.Color(0x95dded).lerp(new THREE.Color(0xb1eac5),phase*.45));
  }

  setReducedMotion(value){this.reducedMotion=!!value;this.growthReveal=0;this._finishPower();}

  _updatePose(dt) {
    // Animation always samples before growth, preventing cumulative bone scaling.
    // Scale tracks overwrite every affected joint on each mixer update; explicitly
    // restore the bind scale for joints absent from an active clip as well.
    for(const [bone,rotation] of this.poseOverlay)bone.quaternion.copy(rotation);this.poseOverlay.clear();
    for(const [name,bone] of this.bones)bone.scale.copy(this.sampledScales.get(name)||this.binds.get(name).scale);
    this.mixer?.update(this.reducedMotion?0:dt);
    const g=this.growth;
    for(const [name,bone] of this.bones){
      if(!this.sampledScales.has(name))this.sampledScales.set(name,bone.scale.clone());else this.sampledScales.get(name).copy(bone.scale);
      if(name==='DEF-neck004_012'||name==='DEF-neck.004_012')bone.scale.multiply(V(g.head,g.head*.96,g.head));
      else if(/^DEF-eye_master/.test(name))bone.scale.multiplyScalar(1+.24*(1-smooth(this.stage/7)));
      else if(/^DEF-neck/.test(name))bone.scale.multiply(V(1,g.neck,1));
      else if(/DEF-Wing_Base/.test(name))bone.scale.multiplyScalar(g.wing);
      else if(/DEF-Wing_Fold_[34][LR]_/.test(name))bone.scale.y*=g.wingFan;
      else if(name==='DEF-Spine_02')bone.scale.multiply(V(g.chest,1,g.chest));
      else if(/^DEF-thigh\.?[LR]_/.test(name)||/^DEF-upper_arm\.?[LR]_/.test(name))bone.scale.multiply(V(1,g.limb,1));
      else if(/^DEF-(?:foot|hand|palm)/.test(name))bone.scale.multiply(V(g.paw,1,g.paw));
      else if(/^DEF-tail/.test(name))bone.scale.y*=g.tail;
      if(this.wingSpreadPose?.has(name)){this.poseOverlay.set(bone,bone.quaternion.clone());bone.quaternion.slerp(this.wingSpreadPose.get(name),g.wingOpen);}
    }
    this.dragon.scale.setScalar(this.stageScale);
    // A small authored jaw/neck pose supplements the source idle during abilities.
    if(this.effect){
      const age=this.effect.age,opening=smooth((age-.15)/.45)*(1-smooth((age-2.1)/.55));
      const jaw=this.bones.get('DEF-Bone_014');
      if(jaw){this.poseOverlay.set(jaw,jaw.quaternion.clone());jaw.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(X,.29*opening));}
      const head=this.bones.get('DEF-neck004_012')||this.bones.get('DEF-neck.004_012');
      if(head){this.poseOverlay.set(head,head.quaternion.clone());head.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(X,-.60*opening));head.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(Z,(this.effect.targetIndex-1)*.12*opening));}
      this.elementUniforms.uPulse.value=opening;
    }else if(this.elementUniforms)this.elementUniforms.uPulse.value=0;
    this.model?.updateMatrixWorld(true);
  }

  _groundAndFrame() {
    if(!this.ready)return;
    this.dragon.position.y=0;this.dragon.updateMatrixWorld(true);
    const bounds=this._bounds();this.dragon.position.y=-bounds.min.y;
    this.dragon.updateMatrixWorld(true);this.currentBounds=this._bounds();
    this.framingPoints=[];this.model.traverse(mesh=>{if(mesh.isMesh)for(let i=0;i<mesh.geometry.attributes.position.count;i++)this.framingPoints.push(mesh.getVertexPosition(i,V()).applyMatrix4(mesh.matrixWorld));});
    this._fitCamera();
  }

  _fitCamera() {
    if(!this.ready)return;
    const size=this.currentBounds.getSize(V()),centre=this.currentBounds.getCenter(V());
    const aspect=this.camera.aspect,inset=this.canvas.clientHeight<=450;
    const heightBudget=inset?.66:.56,widthBudget=.82;
    const targetHeight=heightBudget*this.growth.frame,targetWidth=widthBudget*this.growth.frame;
    const fov=THREE.MathUtils.degToRad(this.camera.fov);
    // A growing screen-size budget prevents auto-fit from making every age the
    // same size. Frame the actual sculpted surface, keeping the ground fixed.
    let distance=Math.max(size.y/(2*Math.tan(fov/2)*targetHeight),size.x/(2*Math.tan(fov/2)*aspect*targetWidth));
    // Mature guardians gradually present their chest between the growing wings.
    const azimuth=-1.04+(this.growth.viewTurn||0)+this.yaw;
    this.look.copy(centre);
    this.camera.near=.05;this.camera.far=Math.max(90,distance*5);this.camera.updateProjectionMatrix();
    let left,right,bottom,top;const projected=V();
    for(let iteration=0;iteration<10;iteration++){
      this.camera.position.set(centre.x+Math.sin(azimuth)*distance,centre.y+distance*this.elevation,centre.z+Math.cos(azimuth)*distance);
      this.camera.lookAt(this.look);this.camera.updateMatrixWorld(true);
      left=bottom=Infinity;right=top=-Infinity;
      for(const point of this.framingPoints){const p=projected.copy(point).project(this.camera);left=Math.min(left,p.x);right=Math.max(right,p.x);bottom=Math.min(bottom,p.y);top=Math.max(top,p.y);}
      const fit=Math.max((top-bottom)/(targetHeight*2),(right-left)/(targetWidth*2));
      if(Math.abs(fit-1)<.002)break;distance*=fit;
    }
    this.camera.projectionMatrix.elements[8]+=(left+right)/2;
    this.camera.projectionMatrix.elements[9]+=bottom-(inset?-.60:-.56);
    this.camera.projectionMatrixInverse.copy(this.camera.projectionMatrix).invert();
    this.projectedFrame={height:(top-bottom)/2,width:(right-left)/2,ground:inset?.80:.78};
  }

  resize() {
    if(!this.renderer||this.disposed)return;
    const width=Math.max(1,this.canvas.clientWidth),height=Math.max(1,this.canvas.clientHeight);
    this.renderer.setSize(width,height,false);this.camera.aspect=width/height;this._fitCamera();
  }

  resetView(){this.yaw=0;this.elevation=.28;this._fitCamera();}

  _installControls() {
    this.canvas.style.touchAction='pan-y';
    this._pointerDown=e=>{if(e.button!==0||this.effect)return;this.drag={id:e.pointerId,x:e.clientX,y:e.clientY,yaw:this.yaw,elevation:this.elevation};this.canvas.setPointerCapture(e.pointerId);};
    this._pointerMove=e=>{if(this.drag?.id!==e.pointerId)return;this.yaw=clamp(this.drag.yaw+(e.clientX-this.drag.x)*.007,-1.3,1.3);this.elevation=clamp(this.drag.elevation+(e.clientY-this.drag.y)*.002,.12,.6);this._fitCamera();};
    this._pointerUp=e=>{if(this.drag?.id!==e.pointerId)return;this.drag=null;if(this.canvas.hasPointerCapture(e.pointerId))this.canvas.releasePointerCapture(e.pointerId);};
    this.canvas.addEventListener('pointerdown',this._pointerDown);this.canvas.addEventListener('pointermove',this._pointerMove);
    this.canvas.addEventListener('pointerup',this._pointerUp);this.canvas.addEventListener('pointercancel',this._pointerUp);
  }

  _buildEffects() {
    this.effectRoot=new THREE.Group();this.effectRoot.name='Elemental breath';this.scene.add(this.effectRoot);
    this.fire=new THREE.Group();this.effectRoot.add(this.fire);
    const geo=new THREE.PlaneGeometry(1,.34,24,8);geo.translate(.47,0,0);
    for(let i=0;i<3;i++){
      const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,toneMapped:false,
        uniforms:{map:{value:this.fireTexture},time:{value:0},opacity:{value:0},phase:{value:i*2.1}},
        vertexShader:`varying vec2 texUv;uniform float time;uniform float phase;void main(){texUv=uv;vec3 p=position;p.y+=sin(uv.x*17.-time*13.+phase)*.018*uv.x;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
        fragmentShader:`varying vec2 texUv;uniform sampler2D map;uniform float time;uniform float phase;uniform float opacity;void main(){vec2 uv=texUv;uv.y+=sin(uv.x*20.-time*12.+phase)*.025*sin(uv.y*3.14159);vec4 f=texture2D(map,uv);float edge=smoothstep(0.,.04,uv.x)*(1.-smoothstep(.93,1.,uv.x));float flicker=.88+.12*sin(time*29.+uv.x*30.+phase);gl_FragColor=vec4(f.rgb*flicker,f.a*opacity*edge);#include <colorspace_fragment>}`.replace(';#include',';\n#include'),
      });
      const mesh=new THREE.Mesh(geo,material);mesh.rotation.x=i*Math.PI/3;mesh.renderOrder=3+i;this.fire.add(mesh);
    }
    this.storm=new THREE.Group();this.effectRoot.add(this.storm);
    for(let strand=0;strand<4;strand++){
      const pts=[];for(let i=0;i<15;i++){const t=i/14;pts.push(V(t,Math.sin(i*3.7+strand)*.1*Math.sin(t*Math.PI),Math.cos(i*2.3+strand)*.07*Math.sin(t*Math.PI)));}
      const curve=new THREE.CatmullRomCurve3(pts);const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,35,strand===0?.008:.0035,5,false),new THREE.MeshBasicMaterial({color:strand===0?0xe7fbff:0x72c9ff,transparent:true,opacity:0,toneMapped:false}));this.storm.add(mesh);
    }
    this.nature=new THREE.Group();this.effectRoot.add(this.nature);
    for(let i=0;i<3;i++){
      const pts=[];for(let j=0;j<24;j++){const t=j/23;pts.push(V(t,Math.sin(t*7+i*2.1)*.07*t,Math.cos(t*7+i*2.1)*.07*t));}
      const mesh=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.012,6,false),new THREE.MeshStandardMaterial({color:i===0?0xb9f79b:0x78b857,emissive:0x4b961f,emissiveIntensity:.5,transparent:true,opacity:0,roughness:.7}));this.nature.add(mesh);
    }
    this.astral=new THREE.Group();this.effectRoot.add(this.astral);
    for(let i=0;i<5;i++){
      const points=[];for(let j=0;j<36;j++){const t=j/35,a=t*9+i*1.256;points.push(V(t,Math.sin(a)*.075*Math.sin(t*Math.PI),Math.cos(a)*.075*Math.sin(t*Math.PI)));}
      const mesh=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),45,.006,5,false),new THREE.MeshBasicMaterial({color:i%2?0xeccfff:0xa8bcff,transparent:true,opacity:0,toneMapped:false}));this.astral.add(mesh);
    }
    const canvas=document.createElement('canvas');canvas.width=canvas.height=64;const ctx=canvas.getContext('2d');
    const gradient=ctx.createRadialGradient(32,32,0,32,32,30);gradient.addColorStop(0,'rgba(255,255,255,1)');gradient.addColorStop(.18,'rgba(255,244,212,.8)');gradient.addColorStop(.55,'rgba(255,223,153,.15)');gradient.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);
    this.moteTexture=new THREE.CanvasTexture(canvas);this.moteTexture.colorSpace=THREE.SRGBColorSpace;
    this.ambient=new THREE.Group();this.scene.add(this.ambient);
    for(let i=0;i<28;i++){
      const mote=new THREE.Sprite(new THREE.SpriteMaterial({map:this.moteTexture,color:i%3===0?0xffce82:0xe4f9bd,transparent:true,opacity:.22,depthWrite:false,blending:THREE.AdditiveBlending}));
      mote.userData={phase:i*2.399,base:V(Math.sin(i*2.399)*5,.5+i%7*.45,Math.cos(i*2.399)*3)};mote.scale.setScalar(.055+(i%3)*.02);this.ambient.add(mote);
    }
    this.effectRoot.visible=false;
  }

  playPower(path='fire',{targetIndex=0}={}) {
    if(!this.ready||this.disposed)return Promise.resolve(false);
    if(!['fire','storm','nature','astral'].includes(path))return Promise.resolve(false);
    this._finishPower();
    const duration=this.reducedMotion?1.0:3.15;
    return new Promise(resolve=>{
      this.effect={path,age:0,duration,targetIndex:clamp(Number(targetIndex)||0,0,2),resolve};
      this.effectRoot.visible=true;this.resetView();
      // Finishes even when requestAnimationFrame is suspended by the browser.
      this.effectTimeout=setTimeout(()=>this._finishPower(),duration*1000+250);
    });
  }

  _mouth() {
    const upper=this.bones.get('DEF-Teeth_Top_013'),lower=this.bones.get('DEF-Teeth_Bottom_016');
    const head=this.bones.get('DEF-neck004_012')||this.bones.get('DEF-neck.004_012');
    const tip=upper?.getWorldPosition(V())||this.currentBounds.getCenter(V());
    if(lower)tip.lerp(lower.getWorldPosition(V()),.35);
    const origin=head?.getWorldPosition(V())||tip.clone().add(V(0,0,-1));
    const direction=tip.clone().sub(origin).normalize();
    if(direction.lengthSq()<.1)direction.set(0,0,1);
    return {position:tip.addScaledVector(direction,.06*this.stageScale),direction};
  }

  _updateEffect(dt) {
    if(!this.effect)return;
    const e=this.effect;e.age+=dt;
    if(e.age>=e.duration){this._finishPower();return;}
    const age=this.reducedMotion?e.age*3:e.age;
    const envelope=smooth((age-.42)/.35)*(1-smooth((age-2.0)/.65));
    const {position,direction}=this._mouth();
    this.effectRoot.position.copy(position);this.effectRoot.quaternion.setFromUnitVectors(X,direction);
    const length=lerp(1.15,3.4,this.stage/10)*smooth((age-.32)/.35);
    this.effectRoot.scale.set(length,length,length);
    this.fire.visible=e.path==='fire';this.storm.visible=e.path==='storm';this.nature.visible=e.path==='nature';this.astral.visible=e.path==='astral';
    for(const [i,mesh] of this.fire.children.entries()){
      mesh.material.uniforms.time.value=this.elapsed;mesh.material.uniforms.opacity.value=envelope*(this.reducedMotion?.3:.56);
      mesh.rotation.x=i*Math.PI/3+Math.sin(this.elapsed*2+i)*.11;
    }
    for(const [i,mesh] of this.storm.children.entries()){mesh.material.opacity=envelope*(this.reducedMotion?.35:.7+.15*Math.sin(e.age*15+i));mesh.rotation.x=i*1.7+Math.sin(e.age*11+i)*.15;}
    for(const [i,mesh] of this.nature.children.entries()){mesh.material.opacity=envelope*.8;mesh.rotation.x=e.age*.5+i*1.7;}
    for(const [i,mesh] of this.astral.children.entries()){mesh.material.opacity=envelope*.85;mesh.rotation.x=e.age*(this.reducedMotion?0:.75)+i*1.25;}
    this.breathLight.position.copy(position).addScaledVector(direction,length*.36);
    this.breathLight.color.setHex(e.path==='storm'?0x8ccaff:e.path==='nature'?0xadf584:e.path==='astral'?0xd3a3ff:0xffa334);
    this.breathLight.intensity=envelope*(this.reducedMotion?2:6)*(1+this.stage*.08);
    if(!this.reducedMotion && envelope>.2 && this.frameCount%2===0)this._emitMote(position,direction,length,e.path);
  }

  _emitMote(position,direction,length,path) {
    if(this.particles.length>=44)return;
    const colour=path==='fire'?0xffb35b:path==='storm'?0xbfefff:path==='astral'?0xe3c4ff:0xc2f483;
    const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:this.moteTexture,color:colour,transparent:true,opacity:.8,depthWrite:false,blending:THREE.AdditiveBlending}));
    sprite.position.copy(position).addScaledVector(direction,length*(.3+Math.random()*.5));sprite.scale.setScalar(path==='fire'?.06:.08);
    this.scene.add(sprite);this.particles.push({sprite,age:0,life:.7+Math.random()*.7,velocity:direction.clone().multiplyScalar(.3).add(V((Math.random()-.5)*.45,.4+Math.random()*.6,(Math.random()-.5)*.45))});
  }

  _finishPower() {
    clearTimeout(this.effectTimeout);this.effectTimeout=null;
    const pending=this.effect;this.effect=null;
    if(this.effectRoot)this.effectRoot.visible=false;if(this.breathLight)this.breathLight.intensity=0;
    pending?.resolve(true);
  }

  _frame(now) {
    if(this.disposed)return;
    this.raf=requestAnimationFrame(this._frame);
    if(now-this.lastTime<(this.reducedMotion&&!this.effect?100:1000/30))return;
    const dt=Math.min(.05,Math.max(0,(now-this.lastTime)/1000));this.lastTime=now;
    if(document.hidden||this.contextLost)return;
    this.elapsed+=dt;this.frameCount++;
    this._updatePose(dt);this._updateEffect(dt);
    if(this.growthReveal>0){this.growthReveal=Math.max(0,this.growthReveal-dt*.4);this.rim.intensity=2.5+Math.sin(this.growthReveal*Math.PI)*1.6;}
    for(const mote of this.ambient.children){const {phase,base}=mote.userData;mote.position.copy(base);if(!this.reducedMotion){mote.position.y+=Math.sin(this.elapsed*.3+phase)*.4;mote.position.x+=Math.sin(this.elapsed*.12+phase)*.25;}mote.material.opacity=this.reducedMotion?.18:.15+Math.sin(this.elapsed*.45+phase)*.075;}
    for(let i=this.particles.length-1;i>=0;i--){const p=this.particles[i];p.age+=dt;if(p.age>=p.life){p.sprite.removeFromParent();p.sprite.material.dispose();this.particles.splice(i,1);}else{p.sprite.position.addScaledVector(p.velocity,dt);p.sprite.material.opacity=(1-p.age/p.life)*.8;}}
    this.renderer.render(this.scene,this.camera);
  }

  diagnostics() {
    const bounds=this.currentBounds;
    return {ready:this.ready,stage:this.stage,paths:{...this.paths},stature:this.stageScale,growth:{...this.growth},frame:this.projectedFrame?{...this.projectedFrame}:null,clips:[...this.actions.keys()],bones:this.bones.size,
      effect:this.effect?.path||null,renderer:this.renderer?{calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,textures:this.renderer.info.memory.textures}:null,
      bounds:bounds?{min:bounds.min.toArray(),max:bounds.max.toArray()}:null,errors:[...this.errors]};
  }

  _disposeObject(object) {
    const geometries=new Set(),materials=new Set(),textures=new Set();
    object?.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of (Array.isArray(o.material)?o.material:o.material?[o.material]:[])){materials.add(m);for(const value of Object.values(m))if(value?.isTexture)textures.add(value);}});
    for(const t of textures){t.source?.data?.close?.();t.dispose();}for(const g of geometries)g.dispose();for(const m of materials)m.dispose();
  }

  dispose() {
    if(this.disposed)return;this.disposed=true;this.ready=false;this.controller.abort();cancelAnimationFrame(this.raf);this._finishPower();
    this.observer?.disconnect();this.mixer?.stopAllAction();if(this.model)this.mixer?.uncacheRoot(this.model);
    this.canvas.removeEventListener('webglcontextlost',this._contextLost);this.canvas.removeEventListener('webglcontextrestored',this._contextRestored);
    document.removeEventListener('visibilitychange',this._visibility);
    this.canvas.removeEventListener('pointerdown',this._pointerDown);this.canvas.removeEventListener('pointermove',this._pointerMove);
    this.canvas.removeEventListener('pointerup',this._pointerUp);this.canvas.removeEventListener('pointercancel',this._pointerUp);
    this._disposeObject(this.scene);this.fireTexture?.dispose();this.moteTexture?.dispose();this.scene?.clear();this.renderer?.renderLists.dispose();this.renderer?.dispose();
    this.particles.length=0;this.framingPoints=[];this.wingSpreadPose?.clear();this.bones.clear();this.binds.clear();this.sampledScales.clear();this.poseOverlay.clear();this.actions.clear();
  }
}
