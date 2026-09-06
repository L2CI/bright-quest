import * as THREE from '../../cave-river-quest/vendor/three.module.js';
import { GLTFLoader } from '../assets/mechs/vendor/GLTFLoader.js';

export type HeroKind = 'relay' | 'prism';
export type HeroMotion = 'idle' | 'walk' | 'strike' | 'guard' | 'charge' | 'break' | 'hit' | 'special' | 'upgrade' | 'victory';
export interface HeroKit { staff?: boolean; pad?: boolean; tier?: number }
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
};

function plateGeometry(w: number, h: number, d: number) {
  const c = Math.min(w, h) * 0.16;
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + c, -h / 2);
  shape.lineTo(w / 2 - c, -h / 2); shape.lineTo(w / 2, -h / 2 + c);
  shape.lineTo(w / 2, h / 2 - c); shape.lineTo(w / 2 - c, h / 2);
  shape.lineTo(-w / 2 + c, h / 2); shape.lineTo(-w / 2, h / 2 - c);
  shape.lineTo(-w / 2, -h / 2 + c); shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.018, bevelThickness: 0.018 });
  geometry.translate(0, 0, -d / 2);
  return geometry;
}

export class HeroRig {
  readonly root = new THREE.Group();
  readonly readyPromise: Promise<this>;
  readonly kind: HeroKind;
  readonly height = 4.4;
  readonly animations = HERO_MOTIONS;
  ready = false;
  error: Error | null = null;
  motion: HeroMotion = 'idle';
  mixer: THREE.AnimationMixer | null = null;
  private model: THREE.Group | null = null;
  private body = new THREE.Group();
  private clips = new Map<string, THREE.AnimationClip>();
  private action: THREE.AnimationAction | null = null;
  private kit: Required<HeroKit> = { staff: false, pad: false, tier: 1 };
  private staff = new THREE.Group();
  private pad = new THREE.Group();
  private tierParts: THREE.Object3D[] = [];
  private equipmentReveals = new Map<THREE.Object3D, { scale: THREE.Vector3; elapsed: number }>();
  private tip = new THREE.Object3D();
  private fist: THREE.Object3D | null = null;
  private launcherSlide = new THREE.Group();
  private muzzleFlash = new THREE.Group();
  private heavyParts: THREE.Object3D[] = [];
  private chargeRing!: THREE.Mesh;
  private chargeGlow!: THREE.Mesh;
  private chargeAmount = 0;
  private aimTarget: THREE.Vector3 | null = null;
  private recoilTime = 10;
  private launcherBind = new THREE.Quaternion();
  private disposed = false;
  private elapsed = 0;
  private duration = Infinity;
  private impactFired = false;
  private completeFired = false;
  private options: PlayOptions = {};
  private looping = true;
  private startTime = 0;
  private contactProfiles = new Map<string, THREE.Vector3>();
  private pending: {name: HeroMotion; options: PlayOptions} | null = null;
  private materials: Record<string, THREE.MeshPhysicalMaterial> = {};
  private meshes: THREE.Mesh[] = [];
  private gripPose: {bone: THREE.Object3D; position: THREE.Vector3; quaternion: THREE.Quaternion}[] = [];

  constructor(kind: HeroKind) {
    this.kind = kind;
    this.root.name = `sparkbound-${kind}`;
    this.root.add(this.body);
    this.readyPromise = this.load().catch(error => {
      this.error = error instanceof Error ? error : new Error(String(error));
      this.root.userData.loadError = this.error.message;
      throw this.error;
    });
  }

  private async load() {
    // Main may position/yaw root before the async model finishes. Build sockets
    // in an isolated identity frame so that transform cannot corrupt bind offsets.
    this.body.removeFromParent();
    // Stable relative to the document, including when esbuild bundles this module
    // into the arena's application bundle in sparkbound/.
    const base = new URL('./assets/mechs/', new URL('.', document.baseURI));
    const gltf = await new GLTFLoader().loadAsync(new URL(this.kind === 'relay' ? 'stan.glb' : 'mike.glb', base).href);
    this.model = gltf.scene;
    this.body.add(this.model);
    for (const clip of gltf.animations) this.clips.set(clip.name, clip);
    for (const motion of Object.values(HERO_MOTIONS)) {
      if (!this.clips.has(motion.clip)) throw new Error(`Missing authored clip: ${motion.clip}`);
    }
    this.mixer = new THREE.AnimationMixer(this.model);
    this.mixer.clipAction(this.clips.get('Idle')!).play();
    this.mixer.update(0);
    this.body.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(this.model);
    const scale = 4.4 / (bounds.max.y - bounds.min.y);
    this.model.scale.setScalar(scale);
    this.model.position.y = -bounds.min.y * scale;
    this.body.updateMatrixWorld(true);
    this.makeMaterials();
    this.model.traverse(object => {
      if (!(object as THREE.Mesh).isMesh) return;
      const mesh = object as THREE.Mesh;
      const source = mesh.material as THREE.Material;
      mesh.material = this.materials[source.name] || this.materials.Grey;
      source.dispose();
      mesh.castShadow = true; mesh.receiveShadow = true;
      // The authored animation can leave the bind-pose bounds substantially.
      mesh.frustumCulled = false;
      this.meshes.push(mesh);
    });
    this.addArmour();
    this.body.updateMatrixWorld(true);
    const dressedBounds = new THREE.Box3().setFromObject(this.body);
    const correction = 4.4 / (dressedBounds.max.y - dressedBounds.min.y);
    this.body.scale.setScalar(correction);
    this.body.position.y = -dressedBounds.min.y * correction;
    this.addEquipment();
    this.setKit(this.kit);
    this.root.add(this.body);
    this.ready = true;
    this.root.userData.model = this.kind === 'relay' ? 'Quaternius Stan' : 'Quaternius Mike';
    this.root.userData.authoredClips = gltf.animations.map(a => ({name: a.name, duration: a.duration}));
    this.root.userData.height = 4.4;
    this.mixer.stopAllAction();
    if (this.disposed) { this.dispose(); return this; }
    const pending = this.pending;
    this.pending = null;
    for(const name of ['strike','break','special'] as HeroMotion[]) {
      this.play(name,{fade:0,restart:true});
      this.action!.time=this.clips.get(HERO_MOTIONS[name].clip)!.duration*HERO_MOTIONS[name].impactFraction!;
      this.mixer.update(0);this.applyGrip();this.root.updateWorldMatrix(true,true);
      const socket=name==='strike'?this.fist!:this.tip;
      this.contactProfiles.set(name,this.root.worldToLocal(socket.getWorldPosition(new THREE.Vector3())));
    }
    this.play(pending?.name || 'idle', pending?.options || {fade:0});
    return this;
  }

  private makeMaterials() {
    const p = PALETTES[this.kind];
    const make = (color: number, metalness: number, roughness: number, extra = {}) => new THREE.MeshPhysicalMaterial({color, metalness, roughness, ...extra});
    this.materials = {
      Main: make(p.main, .68, .29, {clearcoat:.7,clearcoatRoughness:.24}),
      Accent: make(p.accent, .42, .3, {clearcoat:.6}),
      Grey: make(p.metal, .92, .27),
      LightGrey: make(p.light, .83, .21),
      Black: make(p.dark, .12, .8),
      Eye: make(p.glow, .35, .18, {emissive:p.glow,emissiveIntensity:1.5,clearcoat:1}),
      Glass: make(0x102f38, .55, .11, {clearcoat:1,clearcoatRoughness:.08}),
    };
  }

  private bone(name: string): THREE.Object3D {
    const bone = this.model!.getObjectByName(name);
    if (!bone) throw new Error(`Required mech bone missing: ${name}`);
    return bone;
  }

  private mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: string, x=0, y=0, z=0) {
    const mesh = new THREE.Mesh(geometry, this.materials[material]);
    mesh.position.set(x,y,z); mesh.castShadow = true; mesh.receiveShadow = true;
    parent.add(mesh); this.meshes.push(mesh); return mesh;
  }

  private plate(parent: THREE.Object3D, material: string, w: number, h: number, d: number, x=0, y=0, z=0) {
    return this.mesh(parent, plateGeometry(w,h,d),material,x,y,z);
  }

  // Build in the hero's own bind-pose frame, then preserve the relative transform
  // under the authored bone. Arena root transforms never enter this calculation.
  private mount(name: string, offset: THREE.Vector3 = new THREE.Vector3()) {
    const bone = this.bone(name);
    const mount = new THREE.Group();
    this.body.updateMatrixWorld(true);
    mount.position.copy(bone.getWorldPosition(new THREE.Vector3())).add(offset);
    this.body.add(mount);
    mount.updateMatrixWorld(true);
    bone.attach(mount);
    return mount;
  }

  private addArmour() {
    const bulky = this.kind === 'prism';
    const chest = this.mount('Chest', new THREE.Vector3(0,bulky?.18:.12,bulky?.57:.46));
    this.plate(chest,'Black',bulky?1.53:1.27,.63,.13);
    for (const side of [-1,1]) {
      const plate = this.plate(chest, 'Accent', bulky?.61:.51, .49,.13,side*(bulky?.38:.32),.08,.1);
      plate.rotation.z = side * -.13;
      this.plate(chest,'Main',.43,.065,.06,side*.32,.12,.19);
      for(let i=0;i<3;i++) this.plate(chest,'Black',.055,.17,.024,side*(.24+i*.08),-.1,.2);
    }
    const reactor = this.mesh(chest,new THREE.CylinderGeometry(.14,.14,.07,12),'Grey',0,-.09,.21); reactor.rotation.x=Math.PI/2;
    const core = this.mesh(chest,new THREE.CylinderGeometry(.092,.092,.08,12),'Eye',0,-.09,.25); core.rotation.x=Math.PI/2;
    this.chargeRing=this.mesh(chest,new THREE.TorusGeometry(.4,.05,8,48),'Eye',0,-.09,.31);
    // Sweep complete tube sections around the circle, rather than drawing long strips.
    const indices=Array.from(this.chargeRing.geometry.index!.array),sweep:number[]=[];
    for(let arc=0;arc<48;arc++)for(let tube=0;tube<8;tube++)sweep.push(...indices.slice((tube*48+arc)*6,(tube*48+arc+1)*6));
    this.chargeRing.geometry.setIndex(sweep);this.chargeRing.rotation.z=Math.PI/2;
    this.chargeRing.name='chest-charge-ring';this.chargeRing.visible=false;
    this.chargeGlow=this.mesh(chest,new THREE.SphereGeometry(.18,12,8),'Eye',0,-.09,.32);
    this.chargeGlow.visible=false;
    const abdomen=this.mount('Torso',new THREE.Vector3(0,.23,.39));
    for(let i=0;i<3;i++) this.plate(abdomen,i%2?'Black':'Grey',.46-i*.03,.12,.17,0,i*.14,0);
    const collar=this.mount('Neck',new THREE.Vector3(0,-.18,bulky?.59:.38));
    for(const side of [-1,1]) {
      const wing=this.plate(collar,'Main',bulky?.6:.5,.22,.14,side*.32,0,0);wing.rotation.z=side*.15;
      this.plate(collar,'LightGrey',.4,.035,.032,side*.32,-.025,.1);
      for(let i=0;i<4;i++)this.plate(collar,'Black',.035,.09,.026,side*(.2+i*.065),.035,.1);
    }
    const helmet=this.mount('Head',new THREE.Vector3(0,.22,.25));
    this.plate(helmet,'Main',bulky?.69:.63,.48,.43,0,.01,-.08);
    this.plate(helmet,'Glass',.56,.22,.08,0,.025,.17);
    this.plate(helmet,'Eye',.43,.035,.03,0,.015,.223);
    this.plate(helmet,'Grey',.29,.15,.11,0,-.18,.17);
    for(const side of [-1,1]) {
      this.plate(helmet,'Accent',.11,.39,.23,side*.34,.01,0);
      const s=side===1?'L':'R';
      const shoulder=this.mount(`UpperArm${s}`,new THREE.Vector3(side*.17,0,.02));
      this.plate(shoulder,'Black',bulky?.82:.7,.57,.69);
      this.plate(shoulder,'Main',bulky?.88:.75,.47,.55,side*.04,.12,.03);
      this.plate(shoulder,'Accent',.47,.12,.57,side*.02,.33,.04);
      for(let i=0;i<3;i++)this.plate(shoulder,'Grey',.37,.045,.045,0,.16-i*.09,.33);
      for(const x of [-.21,.21]) { const bolt=this.mesh(shoulder,new THREE.CylinderGeometry(.038,.038,.036,6),'LightGrey',x,-.11,.36); bolt.rotation.x=Math.PI/2; }
      const forearm=this.mount(`LowerArm${s}`,new THREE.Vector3(side*.13,-.25,.07));
      this.plate(forearm,'Main',.41,.48,.31);
      this.plate(forearm,'Accent',.25,.31,.07,0,0,.19);
      this.plate(forearm,'Eye',.15,.028,.026,0,.08,.235);
      for(let i=0;i<3;i++)this.plate(forearm,'Black',.2,.035,.03,0,-.04-i*.065,.235);
      const hip=this.mount(`UpperLeg${s}`,new THREE.Vector3(0,-.23,.12));
      this.plate(hip,'Main',.45,.58,.31);
      this.plate(hip,'Accent',.19,.42,.075,side*.09,0,.19);
      const piston=this.mount(`UpperLeg${s}`,new THREE.Vector3(side*.19,-.48,-.07));
      this.mesh(piston,new THREE.CylinderGeometry(.053,.053,.48,8),'Grey');
      this.mesh(piston,new THREE.CylinderGeometry(.081,.081,.2,8),'Black',0,.16,0);
      const shin=this.mount(`LowerLeg${s}`,new THREE.Vector3(0,-.31,.13));
      this.plate(shin,'Main',.4,.65,.32);
      this.plate(shin,'Grey',.23,.46,.08,0,-.02,.2);
      this.plate(shin,'Accent',.34,.14,.14,0,.35,.1);
      const knee=this.mesh(shin,new THREE.CylinderGeometry(.115,.115,.48,12),'Grey',0,.34,0);knee.rotation.z=Math.PI/2;
      for(let i=0;i<3;i++)this.plate(shin,'Black',.15,.045,.03,0,-.12+i*.09,.25);
      const foot=this.mount(`Foot${s}`);
      // Unlike the source's thin blade feet, these have a broad contact sole.
      this.plate(foot,'Black',.5,.16,.82,0,.015,.23);
      this.plate(foot,'Accent',.46,.2,.62,0,.16,.25);
      this.plate(foot,'Main',.44,.11,.31,0,.19,.49);
      for(let i=0;i<3;i++)this.plate(foot,'Grey',.045,.1,.12,-.13+i*.13,.19,.68);
      const back=this.mount('Chest',new THREE.Vector3(side*.43,.08,-.49));
      this.plate(back,'Black',.32,.67,.28);
      this.plate(back,'Grey',.25,.61,.29);
      for(let i=0;i<5;i++)this.plate(back,'Black',.2,.055,.035,0,-.2+i*.1,-.17);
      const tier=this.mount(`UpperArm${s}`,new THREE.Vector3(side*.25,.18,-.3));
      const fin=this.plate(tier,'Accent',.23,.74,.13);fin.rotation.z=-side*.28;
      this.plate(tier,'Eye',.06,.31,.035,0,.1,.085);
      this.tierParts.push(tier);
    }
  }

  private addEquipment() {
    // Calibrate the forearm socket in the authored Shoot aim, facing local +Z.
    // All dimensions are fictional visual proportions, not weapon engineering.
    this.mixer!.stopAllAction();
    const shoot=this.mixer!.clipAction(this.clips.get('Shoot')!);
    shoot.reset().play();shoot.time=.13;this.mixer!.update(0);
    this.body.updateMatrixWorld(true);
    const arm=this.bone('LowerArmR');
    const grip = new THREE.Vector3();
    for(const name of ['Index2R','Ring2R','Thumb2R']) grip.add(this.bone(name).getWorldPosition(new THREE.Vector3()));
    grip.multiplyScalar(1/3);
    this.model!.traverse(bone=>{if((bone as THREE.Bone).isBone&&/^(Palm|Index|Ring|Pinky|Thumb).*R$/.test(bone.name))this.gripPose.push({bone,position:bone.position.clone(),quaternion:bone.quaternion.clone()});});
    // Local bind coordinates make this socket independent of the arena's yaw.
    this.staff.position.copy(grip).add(new THREE.Vector3(-.42,-.6,-.18));
    this.body.add(this.staff); this.staff.updateMatrixWorld(true); arm.attach(this.staff);
    this.launcherBind.copy(this.staff.quaternion);
    this.staff.name='forearm-pulse-launcher';
    this.plate(this.staff,'Black',.52,.24,.65,0,-.29,-.25);
    this.plate(this.staff,'Grey',.16,.34,.24,0,-.48,-.12);
    this.staff.add(this.launcherSlide);this.launcherSlide.name='launcher-recoil-carriage';
    const housing=this.launcherSlide;
    this.plate(housing,'Black',.72,.66,1.3,0,0,-.18);
    this.plate(housing,'Main',.8,.49,1.07,0,.06,-.23);
    for(const side of [-1,1]){
      this.plate(housing,'Accent',.08,.3,.8,side*.43,.05,-.23);
      for(let i=0;i<4;i++)this.plate(housing,'Black',.035,.19,.075,side*.48,.07,-.49+i*.18);
      this.plate(housing,'Grey',.07,.075,.91,side*.31,-.27,-.12);
    }
    const tube=(radius:number,length:number,z:number,material:string)=>{
      const mesh=this.mesh(housing,new THREE.CylinderGeometry(radius,radius,length,16),material,0,0,z);
      mesh.rotation.x=Math.PI/2;return mesh;
    };
    tube(.27,1.12,.62,'Grey');tube(.32,.19,.4,'Black');tube(.36,.26,1.17,'Accent');
    // Recessed dark aperture and concentric energy lens make a readable muzzle.
    tube(.282,.022,1.306,'Black');tube(.16,.024,1.322,'Eye');
    this.mesh(housing,new THREE.TorusGeometry(.26,.025,6,24),'Eye',0,0,1.329);
    for(const z of [.56,.79,.99])this.mesh(housing,new THREE.TorusGeometry(.275,.028,6,16),'Black',0,0,z);
    this.plate(housing,'Black',.13,.19,.35,0,.4,-.2);
    this.plate(housing,'Grey',.24,.15,.43,0,.54,-.14);
    this.plate(housing,'Eye',.15,.07,.025,0,.54,.09);
    this.plate(housing,'Grey',.35,.52,.42,.13,-.48,-.52);
    this.plate(housing,'Eye',.25,.3,.035,.13,-.49,-.29);
    for(let i=0;i<3;i++)this.plate(housing,'Black',.3,.04,.04,.13,-.6+i*.11,-.26);
    this.tip.position.set(0,0,1.36);housing.add(this.tip);
    this.tip.add(this.muzzleFlash);this.muzzleFlash.name='pulse-muzzle-flash';
    this.mesh(this.muzzleFlash,new THREE.SphereGeometry(.29,12,8),'Eye',0,0,.08).scale.set(1,1,1.8);
    this.mesh(this.muzzleFlash,new THREE.TorusGeometry(.39,.04,6,20),'Eye',0,0,.14);
    this.muzzleFlash.visible=false;
    this.fist=this.bone('Index1R');
    this.mixer!.stopAllAction();this.mixer!.clipAction(this.clips.get('Idle')!).reset().play();this.mixer!.update(0);
    this.pad=this.mount('LowerArmL',new THREE.Vector3(.12,-.13,.23));
    this.pad.name='left-forearm-guard';
    this.plate(this.pad,'Grey',1.02,1.2,.3);
    this.plate(this.pad,'Main',.92,1.08,.3,0,0,.12);
    this.plate(this.pad,'Accent',.57,.7,.07,0,0,.22);
    this.plate(this.pad,'Eye',.05,.5,.024,0,0,.275);
    for(const side of [-1,1])this.plate(this.pad,'Black',.13,.4,.035,side*.17,0,.272);
    for(const side of [-1,1]){
      const pack=this.mount('Chest',new THREE.Vector3(side*.94,.8,-.52));
      pack.name=`shoulder-power-cell-${side}`;
      this.plate(pack,'Black',.58,1.02,.72);
      this.plate(pack,'Accent',.63,.35,.8,0,.42,0);
      this.plate(pack,'Main',.59,.52,.74,0,-.08,0);
      const cell=this.mesh(pack,new THREE.CylinderGeometry(.21,.21,.98,12),'Grey',0,.12,.43);
      cell.rotation.x=Math.PI/2;
      const lens=this.mesh(pack,new THREE.CylinderGeometry(.14,.14,.05,12),'Eye',0,.12,.94);lens.rotation.x=Math.PI/2;
      for(let i=0;i<3;i++)this.plate(pack,'Black',.44,.055,.04,0,-.24+i*.16,-.4);
      this.heavyParts.push(pack);
      const armour=this.mount(`UpperLeg${side===1?'L':'R'}`,new THREE.Vector3(side*.15,-.13,.33));
      this.plate(armour,'Accent',.61,.7,.25);this.plate(armour,'Grey',.41,.5,.11,0,0,.19);
      this.heavyParts.push(armour);
    }
  }

  setKit(kit: HeroKit) {
    if (typeof kit.staff === 'boolean') this.kit.staff=kit.staff;
    if (typeof kit.pad === 'boolean') this.kit.pad=kit.pad;
    if (Number.isFinite(kit.tier)) this.kit.tier=Math.max(1,Math.min(3,Math.floor(kit.tier!)));
    this.revealEquipment(this.staff,this.kit.staff,this.motion==='upgrade');
    this.revealEquipment(this.pad,this.kit.pad,this.motion==='upgrade');
    for(const part of this.heavyParts)this.revealEquipment(part,this.kit.pad,this.motion==='upgrade');
    for(const part of this.tierParts) this.revealEquipment(part,this.kit.tier>=2,true);
    this.root.userData.kit={...this.kit};
    this.applyGrip();
  }

  private revealEquipment(part: THREE.Object3D, visible: boolean, animate: boolean) {
    if (!visible && this.equipmentReveals.has(part)) {
      part.scale.copy(this.equipmentReveals.get(part)!.scale); this.equipmentReveals.delete(part);
    }
    if (visible && !part.visible && animate && this.ready) {
      this.equipmentReveals.set(part,{scale:part.scale.clone(),elapsed:0});
      part.scale.y*=.08;
    }
    part.visible=visible;
  }

  private applyGrip() { if(this.kit.staff&&this.motion!=='strike')for(const pose of this.gripPose){pose.bone.position.copy(pose.position);pose.bone.quaternion.copy(pose.quaternion);} }

  /** Presentation only: null releases aiming; charge never modifies the saved kit. */
  setAim(target: THREE.Vector3 | null) { this.aimTarget=target?.clone()??null; }
  setCharge(amount: number) { this.chargeAmount=Math.max(0,Math.min(1,amount)); }
  firePulse() { this.recoilTime=0; }

  private updateLauncher(dt: number) {
    this.recoilTime+=dt;
    const ranged=this.motion==='break'||this.motion==='special';
    this.staff.visible=this.kit.staff||ranged;
    this.staff.quaternion.copy(this.launcherBind);
    if(this.aimTarget&&(ranged||this.motion==='charge')){
      this.root.updateWorldMatrix(true,true);
      const origin=this.staff.getWorldPosition(new THREE.Vector3());
      const direction=this.aimTarget.clone().sub(origin).normalize();
      const desired=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),direction);
      this.staff.quaternion.copy(this.staff.parent!.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(desired));
    }
    this.launcherSlide.position.z=-.2*Math.exp(-this.recoilTime*13)*Math.sin(Math.min(1,this.recoilTime/.08)*Math.PI/2);
    this.muzzleFlash.visible=this.recoilTime<.13;
    this.muzzleFlash.scale.setScalar(1+this.recoilTime*5);
    this.chargeRing.visible=this.chargeAmount>0;
    this.chargeGlow.visible=this.chargeAmount>0;
    const count=this.chargeRing.geometry.index!.count;
    this.chargeRing.geometry.setDrawRange(0,Math.floor(count*this.chargeAmount/3)*3);
    this.chargeGlow.scale.setScalar(.4+this.chargeAmount*1.3);
    this.root.userData.charge=this.chargeAmount;
  }

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
    return this.currentTiming;
  }

  get currentTiming() {
    const spec=HERO_MOTIONS[this.motion];
    const duration=this.duration-this.startTime;
    const impactTime=spec.impactFraction===null?null:Math.max(0,this.duration*spec.impactFraction-this.startTime);
    return {clip:spec.clip,nativeDuration:spec.nativeDuration,duration,impactFraction:impactTime===null?null:impactTime/duration,impactTime};
  }

  update(dt: number, _time?: number) {
    if(!this.ready||this.disposed||!Number.isFinite(dt)||dt<=0)return;
    if(!this.options.hold)this.elapsed+=dt;
    this.mixer!.update(dt);
    if(this.motion==='charge'){
      this.action!.time=.13*Math.min(1,this.elapsed/.55);
      this.mixer!.update(0);
    }
    // Hold the authored aim through emission/flight; recoil is a separate carriage.
    if(this.motion==='break'||this.motion==='special'){
      this.action!.time=Math.min(.13,this.elapsed/this.duration*.625);
      this.action!.paused=true;this.mixer!.update(0);
    }
    for (const [part,reveal] of this.equipmentReveals) {
      reveal.elapsed+=dt; const t=Math.min(1,reveal.elapsed/.65), eased=t*t*(3-2*t);
      part.scale.copy(reveal.scale); part.scale.y*=.08+.92*eased;
      if(t===1)this.equipmentReveals.delete(part);
    }
    this.applyGrip();
    this.updateLauncher(dt);
    this.root.updateWorldMatrix(true,true);
    if(this.options.hold)return;
    const spec=HERO_MOTIONS[this.motion];
    const active=this.action;
    if(!this.impactFired&&spec.impactFraction!==null&&this.elapsed>=this.duration*spec.impactFraction){this.impactFired=true;this.options.onImpact?.();}
    if(this.action!==active)return;
    if(!this.looping&&!this.completeFired&&this.elapsed>=this.duration){this.completeFired=true;this.options.onComplete?.();}
  }

  get weaponTip(): THREE.Vector3 {
    this.root.updateWorldMatrix(true,true);
    const socket=this.kit.staff||this.motion==='break'||this.motion==='special'?this.tip:this.fist;
    return socket?socket.getWorldPosition(new THREE.Vector3()):this.root.getWorldPosition(new THREE.Vector3());
  }

  get contactPoint(): THREE.Vector3 {
    if(this.motion==='strike'&&this.fist){this.root.updateWorldMatrix(true,true);return this.fist.getWorldPosition(new THREE.Vector3());}
    return this.weaponTip;
  }

  contactLocal(name: 'strike'|'break'|'special'): THREE.Vector3 {
    const point=this.contactProfiles.get(name);
    if(!point)throw new Error('Await HeroRig.readyPromise before querying contact reach');
    return point.clone();
  }

  visualBounds(): THREE.Box3 {
    this.root.updateWorldMatrix(true,true);
    const bounds=new THREE.Box3();
    this.root.traverseVisible(object=>{
      const mesh=object as THREE.Mesh;
      if(!mesh.isMesh)return;
      if((mesh as THREE.SkinnedMesh).isSkinnedMesh){const skin=mesh as THREE.SkinnedMesh;skin.computeBoundingBox();bounds.union(skin.boundingBox!.clone().applyMatrix4(mesh.matrixWorld));}
      else {if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();bounds.union(mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld));}
    });
    return bounds;
  }

  setFacing(yaw: number) { if(Number.isFinite(yaw))this.root.rotation.y=yaw; }

  dispose() {
    this.disposed=true;
    this.mixer?.stopAllAction();
    if(this.model)this.mixer?.uncacheRoot(this.model);
    const geometries=new Set(this.meshes.map(m=>m.geometry));
    for(const geometry of geometries)geometry.dispose();
    for(const material of Object.values(this.materials))material.dispose();
    this.root.removeFromParent();
  }
}
