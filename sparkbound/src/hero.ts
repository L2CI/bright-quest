import * as THREE from '../../cave-river-quest/vendor/three.module.js';
import { GLTFLoader } from '../assets/mechs/vendor/GLTFLoader.js';
import { mergeGeometries } from '../assets/mechs/vendor/BufferGeometryUtils.js';
import { HEROES, getHero } from '../roster.js';

export type HeroKind = 'relay' | 'prism';
export type HeroMotion = 'idle' | 'walk' | 'strike' | 'guard' | 'charge' | 'break' | 'hit' | 'special' | 'upgrade' | 'victory';
export interface HeroKit { staff?: boolean; pad?: boolean; tier?: number; stage?: number }
export interface PlayOptions {
  duration?: number;
  timeScale?: number;
  fade?: number;
  restart?: boolean;
  loop?: boolean;
  startFraction?: number;
  hold?: boolean;
  onImpact?: () => void;
  onComplete?: () => void;
}

// Durations are seconds. Impact fractions are measured from the authored clips,
// not collision events: the arena remains responsible for distance and contact.
export const HERO_MOTIONS = {
  idle: { clip: 'Idle', nativeDuration: 4.166666507720947, duration: 4.8, impactFraction: null },
  walk: { clip: 'Walk', nativeDuration: 1.0416666269302368, duration: 1.2, impactFraction: null },
  strike: { clip: 'Punch', nativeDuration: 0.7083333134651184, duration: 1.02, impactFraction: 15 / 24 },
  guard: { clip: 'Shoot', nativeDuration: 0.625, duration: 0.625, impactFraction: null },
  charge: { clip: 'Shoot', nativeDuration: 0.625, duration: 1.8, impactFraction: null },
  break: { clip: 'Shoot', nativeDuration: 0.625, duration: 1.15, impactFraction: .32 },
  hit: { clip: 'HitRecieve_1', nativeDuration: 0.5833333134651184, duration: 0.72, impactFraction: null },
  special: { clip: 'Shoot', nativeDuration: 0.625, duration: 1.45, impactFraction: .32 },
  upgrade: { clip: 'Pickup', nativeDuration: 1.75, duration: 2.1, impactFraction: null },
  victory: { clip: 'Hello', nativeDuration: 1.875, duration: 2.3, impactFraction: null },
} as const;

const PALETTES = {
  relay: { main: 0xeca62c, accent: 0xe6ebe6, metal: 0x647178, dark: 0x171c20, light: 0xa6bdc5, glow: 0x52e3f6 },
  prism: { main: 0x782a40, accent: 0x2b3035, metal: 0x788186, dark: 0x121618, light: 0xd3bba0, glow: 0xffbc68 },
  helio: { main: 0xf0dfb0, accent: 0xfffcf1, metal: 0x928361, dark: 0x252c30, light: 0xdedbc6, glow: 0xfff18a },
  volt: { main: 0x338b6b, accent: 0xbeeacb, metal: 0x708580, dark: 0x192824, light: 0xbde2ce, glow: 0x73ffba },
  bastion: { main: 0x78929e, accent: 0xc8d0cc, metal: 0x68747b, dark: 0x24282c, light: 0xdce4df, glow: 0xd39aff },
  zephyr: { main: 0x269fce, accent: 0xe3edf1, metal: 0x657e87, dark: 0x142830, light: 0xc3e6ed, glow: 0x79ddff },
  glacier: { main: 0xb1d2ed, accent: 0xf5fbff, metal: 0x7297a8, dark: 0x1d3540, light: 0xd5f3ff, glow: 0x9bfaff },
  ember: { main: 0xc74030, accent: 0xffcf72, metal: 0x827871, dark: 0x252524, light: 0xe9d9be, glow: 0xffa43c },
  tidal: { main: 0x168caa, accent: 0xd3fff1, metal: 0x77999d, dark: 0x153033, light: 0xb8ede8, glow: 0x62f4ff },
  atlas: { main: 0x61724e, accent: 0xf0cc62, metal: 0x858a7e, dark: 0x242820, light: 0xd5ddc5, glow: 0xe8f69b },
  nova: { main: 0xb03771, accent: 0xf1d2ef, metal: 0x92899b, dark: 0x28212d, light: 0xe9d8ed, glow: 0xff91df },
  echo: { main: 0x6355ac, accent: 0xbff2ca, metal: 0x8d929c, dark: 0x24232f, light: 0xddddea, glow: 0x99ffc9 },
};


let libraryPromise: Promise<THREE.Group> | null = null;
async function readGlb(file: string) {
  const base = new URL('./assets/mechs/', new URL('.', document.baseURI));
  const packed = file === 'guardian-library.glb' && typeof DecompressionStream !== 'undefined';
  const url = new URL(packed ? file + '.gz' : file, base);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load 3D asset ${file}: HTTP ${response.status}`);
  let buffer = await response.arrayBuffer();
  // Handle either raw gzip or transparent HTTP decompression without decoding twice.
  const header = new Uint8Array(buffer,0,Math.min(2,buffer.byteLength));
  if(packed && header[0] === 31 && header[1] === 139)
    buffer = await new Response(new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  return new GLTFLoader().parseAsync(buffer, base.href);
}
function library() {
  if (!libraryPromise) libraryPromise = readGlb('guardian-library.glb').then(g => g.scene).catch(e => { libraryPromise = null; throw e; });
  return libraryPromise;
}

export class HeroRig {
  readonly root = new THREE.Group();
  readonly readyPromise: Promise<this>;
  readonly height = 4.4;
  readonly animations = HERO_MOTIONS;
  heroId = 'relay';
  ready = false;
  reduced = false;
  error: Error | null = null;
  motion: HeroMotion = 'idle';
  mixer: THREE.AnimationMixer | null = null;
  private body = new THREE.Group();
  private model: THREE.Group | null = null;
  private clips = new Map<string, THREE.AnimationClip>();
  private action: THREE.AnimationAction | null = null;
  private kit: Required<HeroKit> = { staff: false, pad: false, tier: 1, stage: 0 };
  private materials: Record<string, THREE.MeshPhysicalMaterial> = {};
  private parts = new Map<string, Map<string, THREE.Object3D>>();
  private mounts: THREE.Object3D[] = [];
  private joints: {a:THREE.Object3D;b:THREE.Object3D;group:THREE.Group}[]=[];
  private jointGeometry=new Set<THREE.BufferGeometry>();
  private staff = new THREE.Group();
  private launcherSlide = new THREE.Group();
  private launcherBind = new THREE.Quaternion();
  private tip = new THREE.Object3D();
  private fist = new THREE.Object3D();
  private shieldSocket = new THREE.Object3D();
  private chargeLight = new THREE.PointLight(0x6ee9ff, 0, 2.5);
  private chargeAmount = 0;
  private recoilTime = 10;
  private aimTarget: THREE.Vector3 | null = null;
  private elapsed = 0;
  private duration = Infinity;
  private startTime = 0;
  private impactFired = false;
  private completeFired = false;
  private options: PlayOptions = {};
  private looping = true;
  private disposed = false;
  private pending: { name: HeroMotion; options: PlayOptions } | null = null;
  private gripPose: { bone: THREE.Object3D; position: THREE.Vector3; quaternion: THREE.Quaternion }[] = [];
  private contactProfiles = new Map<string, THREE.Vector3>();
  private revealTime = 1;
  private lastStage = -1;
  private groundOffsets = new Map<string,number>();

  constructor(readonly kind: HeroKind) {
    this.root.name = `sparkbound-${kind}`;
    this.root.add(this.body);
    this.readyPromise = this.load().catch(error => {
      this.error = error instanceof Error ? error : new Error(String(error));
      this.root.userData.loadError = this.error.message;
      throw this.error;
    });
  }

  private async load() {
    const [gltf, templates] = await Promise.all([readGlb(this.kind === 'relay' ? 'stan.glb' : 'mike.glb'), library()]);
    this.body.removeFromParent();
    this.model = gltf.scene;
    this.body.add(this.model);
    for (const clip of gltf.animations) this.clips.set(clip.name, clip);
    for (const spec of Object.values(HERO_MOTIONS)) if (!this.clips.has(spec.clip)) throw new Error(`Missing clip ${spec.clip}`);
    this.mixer = new THREE.AnimationMixer(this.model);
    this.mixer.clipAction(this.clips.get('Idle')!).play();
    this.mixer.update(0);
    this.body.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(this.model);
    const scale = this.height / (bounds.max.y - bounds.min.y);
    this.model.scale.setScalar(scale);
    this.model.position.y = -bounds.min.y * scale;
    this.body.updateMatrixWorld(true);
    // Preserve the authored skeleton, not the old low-detail surface.
    this.model.traverse(object => { if ((object as THREE.Mesh).isMesh) object.visible = false; });
    const make = (color: number, metalness: number, roughness: number, extra = {}) =>
      new THREE.MeshPhysicalMaterial({ color, metalness, roughness, ...extra });
    this.materials = {
      Main: make(0xeca62c,.65,.32,{clearcoat:.45}),
      Accent: make(0xe6ebe6,.45,.29,{clearcoat:.35}),
      Grey: make(0x647178,.85,.3), LightGrey: make(0xa6bdc5,.8,.25),
      Black: make(0x171c20,.25,.62),
      Eye: make(0x52e3f6,.4,.22,{emissive:0x52e3f6,emissiveIntensity:1.1}),
      Glass: make(0x102f38,.65,.16,{clearcoat:1})
    };
    const socketBones: Record<string,string> = { HandL:'Index1L', HandR:'Index1R' };
    const ids = this.kind === 'prism' ? ['prism'] : HEROES.map(h => h.id);
    for (const id of ids) {
      const selected = new Map<string, THREE.Object3D>(); this.parts.set(id, selected);
      for (const name of ['Head','Chest','Torso','UpperArmL','UpperArmR','LowerArmL','LowerArmR','UpperLegL','UpperLegR','LowerLegL','LowerLegR','FootL','FootR','HandL','HandR','Shield','Back3','Back4','Back5','Weapon1','Weapon2','Weapon3','Weapon4','Weapon5']) {
        const original = templates.getObjectByName(`${id}__${name}`);
        if (!original) { if (name === 'Shield') continue; throw new Error(`Missing 3D assembly ${id}__${name}`); }
        const part = original.clone(true);
        part.traverse(object => {
          const mesh = object as THREE.Mesh;
          if (!mesh.isMesh) return;
          const remap = (m: THREE.Material) => this.materials[m.name.replace(/\.\d+$/,'')] || this.materials.Grey;
          mesh.material = Array.isArray(mesh.material) ? mesh.material.map(remap) : remap(mesh.material);
          mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled = false;
        });
        selected.set(name, part);
        if (name.startsWith('Weapon')) this.launcherSlide.add(part);
        else {
          const bone = name.startsWith('Back') ? 'Chest' : name === 'Shield' ? 'LowerArmL' : socketBones[name] || name;
          const mount = this.mount(bone);
          const chain=/^(UpperArm|LowerArm|UpperLeg|LowerLeg)(L|R)$/.exec(name);
          if(chain){
            const next={UpperArm:'LowerArm',LowerArm:'Index1',UpperLeg:'LowerLeg',LowerLeg:'Foot'}[chain[1]]+chain[2];
            const start=this.bone(bone).getWorldPosition(new THREE.Vector3()),end=this.bone(next).getWorldPosition(new THREE.Vector3());
            const direction=end.sub(start),length=direction.length();
            part.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),direction.normalize());
            const coverage={UpperArm:.5,LowerArm:.64,UpperLeg:.71,LowerLeg:.8}[chain[1]];
            part.scale.y=length/coverage;
          }
          if (name === 'Shield') part.position.add(new THREE.Vector3(.1,-.3,.25));
          mount.add(part);
          this.mounts.push(mount);
        }
        part.visible = false;
      }
    }
    const fistMount = this.mount('Index1R'); fistMount.add(this.fist); this.fist.position.z = .13;
    const shieldMount = this.mount('LowerArmL'); shieldMount.add(this.shieldSocket); this.shieldSocket.position.set(0,-.2,.35);
    this.buildJoints();
    // Calibrate a forearm-mounted weapon in the same authored pose used to fire.
    this.mixer.stopAllAction();
    const shoot = this.mixer.clipAction(this.clips.get('Shoot')!);
    shoot.reset().play(); shoot.time = .13; this.mixer.update(0); this.body.updateMatrixWorld(true);
    const grip = new THREE.Vector3();
    for (const name of ['Index2R','Ring2R','Thumb2R']) grip.add(this.bone(name).getWorldPosition(new THREE.Vector3()));
    grip.multiplyScalar(1/3);
    this.model.traverse(bone => { if ((bone as THREE.Bone).isBone && /^(Palm|Index|Ring|Pinky|Thumb).*R$/.test(bone.name))
      this.gripPose.push({ bone, position: bone.position.clone(), quaternion: bone.quaternion.clone() }); });
    this.staff.position.copy(grip).add(new THREE.Vector3(0,.05,-.12));
    this.body.add(this.staff); this.staff.updateMatrixWorld(true); this.bone('LowerArmR').attach(this.staff);
    this.launcherBind.copy(this.staff.quaternion);
    this.staff.name = 'articulated-weapon-socket';
    this.staff.add(this.launcherSlide); this.launcherSlide.add(this.tip); this.tip.add(this.chargeLight);
    this.root.add(this.body);
    this.ready = true;
    this.root.userData.model = 'Blender articulated guardian';
    this.root.userData.authoredClips = gltf.animations.map(a => ({ name:a.name, duration:a.duration }));
    this.root.userData.height = this.height;
    this.setHero(this.heroId); this.setKit(this.kit);
    this.mixer.stopAllAction();
    const pending = this.pending; this.pending = null;
    for (const name of ['strike','break','special'] as HeroMotion[]) {
      this.play(name,{fade:0,restart:true});
      this.action!.time = this.clips.get(HERO_MOTIONS[name].clip)!.duration * HERO_MOTIONS[name].impactFraction!;
      this.mixer.update(0); this.applyGrip(); this.root.updateWorldMatrix(true,true);
      const socket = name === 'strike' ? this.fist : this.tip;
      this.contactProfiles.set(name,this.root.worldToLocal(socket.getWorldPosition(new THREE.Vector3())));
    }
    this.play(pending?.name || 'idle',pending?.options || {fade:0});
    // Calibrate the new soles to the authored idle floor, once per suit.
    // Do not chase animated feet every frame: walking must retain its lift.
    this.play('idle',{fade:0,restart:true});this.mixer.update(0);this.root.updateWorldMatrix(true,true);
    for(const [id,parts] of this.parts){
      const feet=new THREE.Box3();
      for(const name of ['FootL','FootR'])parts.get(name)!.traverse(object=>{
        const mesh=object as THREE.Mesh;if(!mesh.isMesh)return;
        if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
        feet.union(mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld));
      });
      this.groundOffsets.set(id,this.root.position.y-feet.min.y+.008);
    }
    this.play(pending?.name || 'idle',pending?.options || {fade:0,restart:true});this.applyIdentity();this.updateJoints();
    if (this.disposed) this.dispose();
    return this;
  }

  private bone(name: string) {
    const bone = this.model!.getObjectByName(name);
    if (!bone) throw new Error(`Missing animation bone: ${name}`);
    return bone;
  }
  private mount(name: string) {
    const bone = this.bone(name), mount = new THREE.Group();
    this.body.updateMatrixWorld(true);
    mount.position.copy(bone.getWorldPosition(new THREE.Vector3()));
    this.body.add(mount); mount.updateMatrixWorld(true); bone.attach(mount);
    return mount;
  }

  private buildJoints() {
    const pairs:[string,string,number][]=[['Torso','Chest',.21],['Chest','Neck',.19],['Neck','Head',.12]];
    for(const side of ['L','R'])pairs.push(['Chest',`UpperArm${side}`,.15],['Torso',`UpperLeg${side}`,.18],
      [`UpperArm${side}`,`LowerArm${side}`,.14],[`LowerArm${side}`,`Index1${side}`,.12],
      [`UpperLeg${side}`,`LowerLeg${side}`,.17],[`LowerLeg${side}`,`Foot${side}`,.14]);
    for(const [from,to,radius] of pairs){
      const group=new THREE.Group();group.name=`mechanical-link-${from}-${to}`;
      const pieces=new Map<string,THREE.BufferGeometry[]>();
      const tube=(r:number,length:number,y:number,material:string)=>{
        const geometry=new THREE.CylinderGeometry(r,r,length,16);geometry.translate(0,y,0);
        if(!pieces.has(material))pieces.set(material,[]);pieces.get(material)!.push(geometry);
      };
      tube(radius,.94,0,'Black');tube(radius*.76,.6,.16,'LightGrey');tube(radius*1.12,.4,-.22,'Grey');
      for(const y of [-.4,-.3,-.2,.34,.44])tube(radius*1.18,.04,y,'Black');
      for(const [material,parts] of pieces){
        const geometry=mergeGeometries(parts);this.jointGeometry.add(geometry);
        for(const part of parts)part.dispose();
        const mesh=new THREE.Mesh(geometry,this.materials[material]);mesh.receiveShadow=true;group.add(mesh);
      }
      this.body.add(group);this.joints.push({a:this.bone(from),b:this.bone(to),group});
    }
  }
  private updateJoints() {
    this.body.updateWorldMatrix(true,true);
    for(const {a,b,group} of this.joints){
      const start=this.body.worldToLocal(a.getWorldPosition(new THREE.Vector3())),end=this.body.worldToLocal(b.getWorldPosition(new THREE.Vector3()));
      const direction=end.clone().sub(start);
      group.position.copy(start).add(end).multiplyScalar(.5);
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.clone().normalize());
      group.scale.y=direction.length();
    }
  }

  setHero(id: string) {
    if (this.kind !== 'relay' || this.disposed) return;
    this.heroId = getHero(id).id; this.root.userData.heroId = this.heroId;
    this.applyIdentity();
  }
  private applyIdentity() {
    if (!this.ready) return;
    const id = this.kind === 'prism' ? 'prism' : this.heroId;
    this.body.position.y=this.groundOffsets.get(id)||0;
    const p = PALETTES[id] || PALETTES.relay;
    for (const [key,value] of Object.entries({Main:p.main,Accent:p.accent,Grey:p.metal,LightGrey:p.light,Black:p.dark,Eye:p.glow}))
      this.materials[key].color.setHex(value);
    this.materials.Eye.emissive.setHex(p.glow); this.chargeLight.color.setHex(p.glow);
    const stage = this.kit.stage, ranged = this.kit.staff || this.motion === 'break' || this.motion === 'special';
    for (const [hero,parts] of this.parts) for (const [name,part] of parts) {
      let shown = hero === id;
      if (name.startsWith('Weapon')) shown &&= Number(name.slice(6)) === Math.max(1,stage);
      if (name.startsWith('Back')) shown &&= Number(name.slice(4)) === stage;
      if (name === 'Shield') shown &&= this.motion === 'guard' || stage >= 2;
      part.visible = shown;
    }
    this.staff.visible = ranged;
    const weapon = this.parts.get(id)?.get(`Weapon${Math.max(1,stage)}`);
    const marker = weapon?.getObjectByName(`${id}__Muzzle${Math.max(1,stage)}`);
    if (marker && weapon) {
      weapon.updateWorldMatrix(true,true);
      this.tip.position.copy(this.launcherSlide.worldToLocal(marker.getWorldPosition(new THREE.Vector3())));
    } else this.tip.position.set(0,0,stage >= 4 ? 1.95 : stage >= 2 ? 1.7 : 1.4);
    this.root.userData.heroId = id; this.root.userData.equipmentStage = stage;
    this.root.userData.weapon = this.kind === 'prism' ? ['Training Gauntlets','Breach Blaster','Flame Projector','Rocket Battery','Arc Rail Cannon','Solar Siege Array'][stage] : getHero(id).weapons[stage].name;
  }
  setKit(kit: HeroKit) {
    if (typeof kit.staff === 'boolean') this.kit.staff = kit.staff;
    if (typeof kit.pad === 'boolean') this.kit.pad = kit.pad;
    this.kit.stage = Number.isFinite(kit.stage) ? Math.max(0,Math.min(5,Math.floor(kit.stage!))) : this.kit.pad ? 2 : this.kit.staff ? 1 : 0;
    if (Number.isFinite(kit.stage)) { this.kit.staff = this.kit.stage >= 1; this.kit.pad = this.kit.stage >= 2; }
    if (Number.isFinite(kit.tier)) this.kit.tier = Math.max(1,Math.min(3,Math.floor(kit.tier!)));
    if (this.lastStage !== this.kit.stage) { this.revealTime = this.motion === 'upgrade' && !this.reduced ? 0 : 1; this.lastStage = this.kit.stage; }
    this.root.userData.kit = {...this.kit}; this.applyIdentity(); this.applyGrip();
  }
  private applyGrip() {
    if (this.kit.staff && this.motion !== 'strike') for (const pose of this.gripPose) {
      pose.bone.position.copy(pose.position); pose.bone.quaternion.copy(pose.quaternion);
    }
  }
  setAim(target: THREE.Vector3 | null) { this.aimTarget = target?.clone() ?? null; }
  setCharge(amount: number) { this.chargeAmount = Math.max(0,Math.min(1,amount)); }
  firePulse() { this.recoilTime = 0; }
  setCamera(_camera: THREE.Camera) {}
  get imageActive() { return false; }
  play(name: HeroMotion, options: PlayOptions = {}) {
    if (!HERO_MOTIONS[name]) throw new Error(`Unknown hero motion: ${name}`);
    if (!this.ready) { this.pending={name,options}; return {...HERO_MOTIONS[name]}; }
    if (this.disposed) return {...HERO_MOTIONS[name]};
    if (this.motion===name && !options.restart && (name==='idle'||name==='walk'||name==='guard') && this.action) return this.currentTiming;
    const spec=HERO_MOTIONS[name];
    const clipName=name==='walk' && this.kit.staff?'Walk_Holding':spec.clip;
    const clip=this.clips.get(clipName)!;
    const action=this.mixer!.clipAction(clip);
    const previous=this.action;
    const fade=Math.max(0,options.fade??.12);
    if(fade===0)this.mixer!.stopAllAction();
    this.motion=name;this.options=options;this.elapsed=0;this.impactFired=false;this.completeFired=false;
    this.looping=options.loop??(name==='idle'||name==='walk'||name==='guard');
    this.duration=Number.isFinite(options.duration)&&options.duration!>0?options.duration!:spec.duration;
    const speed=Number.isFinite(options.timeScale)&&options.timeScale!>0?options.timeScale!:clip.duration/this.duration;
    this.duration=clip.duration/speed;
    const startFraction=Math.max(0,Math.min(.95,options.startFraction??0));
    this.startTime=this.duration*startFraction;this.elapsed=this.startTime;
    action.reset().setEffectiveWeight(1).setEffectiveTimeScale(speed);
    action.time=clip.duration*startFraction;
    action.setLoop(this.looping?THREE.LoopRepeat:THREE.LoopOnce,this.looping?Infinity:1);
    action.clampWhenFinished=true;
    action.play();
    if(previous&&previous!==action) { previous.fadeOut(fade); action.fadeIn(fade); }
    if(name==='guard') {
      // Hold the actual braced forearm pose from Shoot; no invented skeleton loop.
      action.time=.13;action.paused=true;
    }
    if(name==='charge')action.paused=true;
    if(options.hold)action.paused=true;
    this.action=action;
    if(name!=='charge')this.chargeAmount=0;
    this.mixer!.update(0);
    this.applyGrip();
    this.updateJoints();
    this.applyIdentity();
    return this.currentTiming;
  }

  get currentTiming() {
    const spec=HERO_MOTIONS[this.motion];
    const duration=this.duration-this.startTime;
    const impactTime=spec.impactFraction===null?null:Math.max(0,this.duration*spec.impactFraction-this.startTime);
    return {clip:spec.clip,nativeDuration:spec.nativeDuration,duration,impactFraction:impactTime===null?null:impactTime/duration,impactTime};
  }


  update(dt: number, _time?: number) {
    if (!this.ready || this.disposed || !Number.isFinite(dt) || dt <= 0) return;
    if (!this.options.hold) this.elapsed += dt;
    this.mixer!.update(dt);
    if (this.motion === 'charge') { this.action!.time=.13*Math.min(1,this.elapsed/.55); this.mixer!.update(0); }
    if (this.motion === 'break' || this.motion === 'special') {
      this.action!.time = Math.min(.13,this.elapsed/this.duration*.625); this.action!.paused=true; this.mixer!.update(0);
    }
    this.applyGrip();
    this.recoilTime += dt; this.revealTime = Math.min(1,this.revealTime+dt/.8);
    this.updateJoints();
    const ranged = this.motion === 'break' || this.motion === 'special';
    this.staff.visible = this.kit.staff || ranged;
    this.staff.quaternion.copy(this.launcherBind);
    if (this.aimTarget && (ranged || this.motion === 'charge')) {
      // The bore sits above the grip. Aim the bore line, not the hand origin.
      for(let i=0;i<3;i++){
        this.root.updateWorldMatrix(true,true);
        const bore=this.staff.localToWorld(new THREE.Vector3(this.tip.position.x,this.tip.position.y,0));
        const direction=this.aimTarget.clone().sub(bore).normalize();
        const aim=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),direction);
        this.staff.quaternion.copy(this.staff.parent!.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(aim));
      }
    }
    this.launcherSlide.position.z = this.reduced ? 0 : -.18*Math.exp(-this.recoilTime*13)*Math.sin(Math.min(1,this.recoilTime/.08)*Math.PI/2);
    this.chargeLight.intensity = this.reduced ? 0 : this.chargeAmount*2 + (this.recoilTime < .12 ? 5*(1-this.recoilTime/.12) : 0);
    this.materials.Eye.emissiveIntensity = 1.1 + this.chargeAmount * 1.5;
    const active = this.parts.get(this.kind === 'prism' ? 'prism' : this.heroId);
    if (active) for (const [name,part] of active) {
      if (name.startsWith('Back') || name.startsWith('Weapon')) {
        const t=this.reduced?1:this.revealTime, eased=t*t*(3-2*t);
        part.scale.setScalar(.1+.9*eased);
      }
    }
    this.root.userData.charge = this.chargeAmount;
    this.root.updateWorldMatrix(true,true);
    if (this.options.hold) return;
    const spec=HERO_MOTIONS[this.motion], action=this.action;
    if (!this.impactFired && spec.impactFraction !== null && this.elapsed >= this.duration*spec.impactFraction) { this.impactFired=true; this.options.onImpact?.(); }
    if (this.action !== action) return;
    if (!this.looping && !this.completeFired && this.elapsed >= this.duration) { this.completeFired=true; this.options.onComplete?.(); }
  }
  get weaponTip(): THREE.Vector3 {
    this.root.updateWorldMatrix(true,true);
    return (this.kit.staff || this.motion === 'break' || this.motion === 'special' ? this.tip : this.fist).getWorldPosition(new THREE.Vector3());
  }
  get contactPoint(): THREE.Vector3 {
    this.root.updateWorldMatrix(true,true);
    return this.motion === 'strike' ? this.fist.getWorldPosition(new THREE.Vector3()) : this.weaponTip;
  }
  contactLocal(name: 'strike'|'break'|'special'): THREE.Vector3 {
    const point=this.contactProfiles.get(name);
    if (!point) throw new Error('Await HeroRig.readyPromise before querying contact reach');
    const grounded=point.clone();grounded.y+=this.groundOffsets.get(this.kind==='prism'?'prism':this.heroId)||0;
    return grounded;
  }
  visualBounds(): THREE.Box3 {
    this.root.updateWorldMatrix(true,true);
    const bounds = new THREE.Box3();
    this.root.traverseVisible(object => {
      const mesh = object as THREE.Mesh; if (!mesh.isMesh) return;
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      bounds.union(mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld));
    });
    return bounds;
  }
  setFacing(yaw: number) { if (Number.isFinite(yaw)) this.root.rotation.y=yaw; }
  get shieldPoint(): THREE.Vector3 {
    // An impact target on the front armour stays readable when the guard arm moves.
    return this.root.localToWorld(new THREE.Vector3(0,2.35,.58));
  }
  dispose() {
    this.disposed=true; this.mixer?.stopAllAction();
    if (this.model) {
      this.mixer?.uncacheRoot(this.model);
      const skeletons=new Set<THREE.Skeleton>(), geometries=new Set<THREE.BufferGeometry>(), materials=new Set<THREE.Material>();
      this.model.traverse(object => {
        const mesh=object as THREE.SkinnedMesh;
        if (mesh.isSkinnedMesh) { skeletons.add(mesh.skeleton); geometries.add(mesh.geometry); for (const m of Array.isArray(mesh.material)?mesh.material:[mesh.material]) materials.add(m); }
      });
      for (const skeleton of skeletons) skeleton.dispose();
      for (const geometry of geometries) geometry.dispose();
      for (const material of materials) material.dispose();
    }
    for (const material of Object.values(this.materials)) material.dispose();
    for(const geometry of this.jointGeometry)geometry.dispose();
    // Library geometry is shared by hero previews for the page lifetime.
    this.root.removeFromParent();
  }
}
