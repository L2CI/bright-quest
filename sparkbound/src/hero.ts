import * as THREE from '../../cave-river-quest/vendor/three.module.js';
import { GLTFLoader } from '../assets/mechs/vendor/GLTFLoader.js';
import { HEROES, getHero } from '../roster.js';
import { ImageActor } from './image-actor';

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
  heroId = 'relay';
  reduced = false;
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
  private kit: Required<HeroKit> = { staff: false, pad: false, tier: 1, stage: 0 };
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
  private identityParts = new Map<string, THREE.Object3D[]>();
  private gauntlets = new Map<string, THREE.Object3D[]>();
  private weapons = new Map<string, THREE.Group>();
  private weaponUpgrades = new Map<string, THREE.Group>();
  private pulseHousing = new THREE.Group();
  private advancedParts = new Map<string, THREE.Group[]>();
  private prismLoadouts: THREE.Group[] = [];
  private muzzleCharge = new THREE.Group();
  private imageActor: ImageActor;

  constructor(kind: HeroKind) {
    this.kind = kind;
    this.root.name = `sparkbound-${kind}`;
    this.body.visible=false;
    this.root.add(this.body);
    this.imageActor=new ImageActor(this.root,kind==='prism');
    this.readyPromise = Promise.all([this.load(),this.imageActor.ready]).then(()=>{
      this.body.visible=false;this.root.userData.model='Generated 2.5D mech artwork';
      this.imageActor.select(this.kind==='prism'?'prism':this.heroId);this.imageActor.setStage(this.kit.stage);
      return this;
    }).catch(error => {
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
    const url = new URL(this.kind === 'relay' ? 'stan.glb' : 'mike.glb', base);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load authored rig ${url.pathname}: HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    const gltf = await new GLTFLoader().parseAsync(buffer, base.href);
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
    // Retain the authored skeleton and its clock without building hidden block armour.
    this.fist=this.bone('Index1R');this.fist.add(this.staff);this.staff.add(this.launcherSlide);this.launcherSlide.add(this.tip);
    this.tip.position.z=.5;this.staff.add(this.muzzleFlash,this.muzzleCharge);
    this.chargeRing=this.mesh(this.body,new THREE.TorusGeometry(.1,.01,3,12),'Eye');
    this.chargeGlow=this.mesh(this.body,new THREE.SphereGeometry(.05,4,3),'Eye');
    this.setHero(this.heroId);
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
    const p = PALETTES[this.kind==='prism'?'prism':this.heroId];
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
    const housing=this.pulseHousing;this.launcherSlide.add(housing);
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
    this.tip.position.set(0,0,1.36);this.launcherSlide.add(this.tip);
    this.tip.add(this.muzzleFlash);this.muzzleFlash.name='pulse-muzzle-flash';
    this.mesh(this.muzzleFlash,new THREE.SphereGeometry(.29,12,8),'Eye',0,0,.08).scale.set(1,1,1.8);
    this.mesh(this.muzzleFlash,new THREE.TorusGeometry(.39,.04,6,20),'Eye',0,0,.14);
    this.muzzleFlash.visible=false;
    this.tip.add(this.muzzleCharge);this.muzzleCharge.name='muzzle-charge-cue';
    this.mesh(this.muzzleCharge,new THREE.TorusGeometry(.3,.035,6,24),'Eye');
    this.mesh(this.muzzleCharge,new THREE.SphereGeometry(.1,12,8),'Eye');
    this.muzzleCharge.visible=false;
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
    if(this.kind==='relay'){this.addRosterWeapons();this.addAdvancedEquipment();}
    else this.addPrismLoadouts();
  }

  private tube(parent: THREE.Object3D, material: string, radius: number, length: number, x=0, y=0, z=0) {
    const tube=this.mesh(parent,new THREE.CylinderGeometry(radius,radius,length,16),material,x,y,z);
    tube.rotation.x=Math.PI/2;return tube;
  }

  private addIdentityArmour() {
    for(const {id} of HEROES){
      const parts:THREE.Object3D[]=[], fists:THREE.Object3D[]=[];
      this.identityParts.set(id,parts);this.gauntlets.set(id,fists);
      const mount=(bone:string,x:number,y:number,z:number)=>{const p=this.mount(bone,new THREE.Vector3(x,y,z));p.name=`${id}-silhouette-${parts.length}`;parts.push(p);return p;};
      for(const side of [-1,1]){
        const arm=side===1?'L':'R';
        const fist=this.mount(`LowerArm${arm}`,new THREE.Vector3(side*.13,-.47,.12));
        fist.name=`${id}-gauntlet-${arm}`;fists.push(fist);
        const heavy=id==='bastion'||id==='atlas';
        this.plate(fist,'Grey',heavy?.65:.46,heavy?.52:.35,.43);
        this.plate(fist,'Main',heavy?.69:.5,.23,.45,0,.08,.04);
        if(id==='helio'){
          this.tube(fist,'Eye',.16,.12,0,0,.3);
        }else if(id==='volt'){
          for(const y of [-.08,.08])this.mesh(fist,new THREE.TorusGeometry(.24,.045,6,12),'Eye',0,y,.03).rotation.x=Math.PI/2;
        }else if(id==='bastion'||id==='atlas'){
          for(const x of [-.22,.22])this.mesh(fist,new THREE.CylinderGeometry(.075,.075,.46,8),'LightGrey',x,0,.23);
        }else if(id==='zephyr'){
          const fin=this.plate(fist,'Accent',.12,.58,.34,side*.24,.1,0);fin.rotation.z=-side*.35;
        }else if(id==='glacier'){
          for(const x of [-.15,0,.15])this.mesh(fist,new THREE.OctahedronGeometry(.13),'Eye',x,-.05,.3);
        }else for(const x of [-.15,0,.15])this.plate(fist,'Accent',.09,.14,.12,x,-.08,.28);

        if(id==='ember'){
          const vent=mount('Chest',side*.88,.67,-.36);
          this.plate(vent,'Grey',.4,1.18,.5);this.plate(vent,'Main',.49,.22,.57,0,.57,0);
          for(let n=0;n<5;n++){this.plate(vent,'Black',.34,.1,.06,0,-.34+n*.2,.29);this.plate(vent,'Eye',.26,.035,.04,0,-.31+n*.2,.33);}
        }else if(id==='tidal'){
          const tank=mount('Chest',side*.92,.65,-.5);
          this.mesh(tank,new THREE.CapsuleGeometry(.29,.85,4,12),'Main');
          for(const y of [-.35,.35])this.mesh(tank,new THREE.TorusGeometry(.3,.06,6,16),'Accent',0,y,0).rotation.x=Math.PI/2;
          this.tube(tank,'Grey',.2,.45,0,-.5,.28);this.tube(tank,'Eye',.13,.04,0,-.5,.52);
          this.plate(tank,'Eye',.13,.65,.07,0,0,.3);
        }else if(id==='atlas'){
          const piston=mount(`UpperArm${arm}`,side*.3,.12,.08);
          this.plate(piston,'Main',1,.9,.8);
          for(const x of [-.3,.3]){this.mesh(piston,new THREE.CylinderGeometry(.1,.1,1.08,10),'Grey',x,-.15,.44);this.mesh(piston,new THREE.CylinderGeometry(.16,.16,.42,10),'Accent',x,.12,.44);}
          const brace=mount(`LowerLeg${arm}`,side*.12,-.2,.24);this.plate(brace,'Accent',.63,.9,.35);
        }else if(id==='echo'){
          const dish=mount('Chest',side*.94,.75,-.15);
          this.mesh(dish,new THREE.CylinderGeometry(.46,.2,.23,20),'Grey').rotation.x=Math.PI/2;
          this.mesh(dish,new THREE.TorusGeometry(.39,.055,8,24),'Accent',0,0,.14);
          this.tube(dish,'Black',.29,.04,0,0,.13);this.tube(dish,'Eye',.14,.06,0,0,.18);
        }else if(id==='volt'){
          const coil=mount('Chest',side*.8,1.02,-.32);
          this.mesh(coil,new THREE.CylinderGeometry(.12,.17,1.1,12),'Grey');
          for(let n=0;n<6;n++)this.mesh(coil,new THREE.TorusGeometry(.24,.05,6,16),'Eye',0,-.4+n*.16,0).rotation.x=Math.PI/2;
          this.mesh(coil,new THREE.SphereGeometry(.19,12,8),'LightGrey',0,.62,0);
        }else if(id==='bastion'){
          const shoulder=mount(`UpperArm${arm}`,side*.3,.2,0);
          this.plate(shoulder,'Main',1.12,.8,.86);
          this.plate(shoulder,'Accent',1.16,.2,.92,0,.41,0);
          for(let n=0;n<3;n++)this.plate(shoulder,'Grey',.85,.12,.12,0,-.23+n*.19,.49);
        }else if(id==='zephyr'){
          const jet=mount('Chest',side*1.16,.48,-.42);jet.rotation.x=-.28;
          this.mesh(jet,new THREE.CylinderGeometry(.19,.3,1.03,12),'Grey');
          this.mesh(jet,new THREE.CylinderGeometry(.31,.25,.3,12),'Main',0,.38,0);
          this.mesh(jet,new THREE.ConeGeometry(.17,.45,12),'Eye',0,-.64,0).rotation.z=Math.PI;
          const wing=this.plate(jet,'Accent',.23,1.45,.43,side*.36,.42,0);wing.rotation.z=-side*.5;
        }else if(id==='glacier'){
          const tank=mount('Chest',side*.87,.94,-.4);
          this.mesh(tank,new THREE.CylinderGeometry(.28,.28,1.22,16),'Accent');
          for(const y of [-.43,.43])this.mesh(tank,new THREE.CylinderGeometry(.31,.31,.12,16),'Grey',0,y,0);
          this.mesh(tank,new THREE.SphereGeometry(.27,12,8),'Main',0,.61,0);
          this.plate(tank,'Eye',.12,.63,.07,side*.24,0,.22);
          const hose=this.mesh(tank,new THREE.TorusGeometry(.35,.07,6,16,Math.PI),'Grey',0,-.55,.12);hose.rotation.z=side*Math.PI/2;
        }
      }
      if(id==='nova'){
        const ring=mount('Chest',0,.72,-.66);
        this.mesh(ring,new THREE.TorusGeometry(1.05,.13,8,40),'Grey');
        this.mesh(ring,new THREE.TorusGeometry(.93,.05,8,40),'Eye');
        for(const side of [-1,1])this.plate(ring,'Accent',.36,.56,.28,side*.98,0,0);
      }else if(id==='helio'){
        const optic=mount('Head',0,.27,.47);
        this.tube(optic,'Grey',.34,.17);this.tube(optic,'Eye',.255,.18,0,0,.07);
        this.mesh(optic,new THREE.TorusGeometry(.29,.06,8,24),'Accent',0,0,.16);
        const fin=this.plate(optic,'Main',.12,.83,.49,0,.49,-.29);fin.rotation.x=-.25;
        this.plate(fin,'Eye',.14,.42,.045,0,.1,.25);
      }else if(id==='bastion'){
        const chest=mount('Chest',0,0,.58);this.plate(chest,'Grey',1.44,.8,.27);
        this.plate(chest,'Main',1.26,.52,.19,0,.06,.18);
      }
      for(const part of parts)part.userData.baseScale=part.scale.clone();
    }
  }

  private addRosterWeapons() {
    for(const {id} of HEROES){
      const gun=new THREE.Group(),upgrade=new THREE.Group();
      gun.name=`${id}-weapon`;upgrade.name=`${id}-weapon-stage-2`;
      this.weapons.set(id,gun);this.weaponUpgrades.set(id,upgrade);this.launcherSlide.add(gun,upgrade);
      if(id!=='relay'){
        this.plate(gun,'Black',.62,.51,1.14,0,0,-.23);
        this.plate(gun,'Main',.65,.38,.77,0,.09,-.33);
        this.plate(upgrade,'Accent',.79,.18,1.2,0,.37,-.15);
      }
      if(id==='relay'){
        // Replace the single front barrel with a true paired muzzle on the same carriage.
        this.plate(upgrade,'Main',.97,.55,.85,0,0,.78);
        for(const x of [-.28,.28]){
          this.tube(upgrade,'Grey',.22,1.25,x,0,.91);
          this.tube(upgrade,'Black',.235,.12,x,0,1.5);
          this.tube(upgrade,'Eye',.15,.02,x,0,1.575);
          this.mesh(upgrade,new THREE.TorusGeometry(.205,.035,6,16),'Accent',x,0,1.59);
        }
      }else if(id==='helio'){
        for(const x of [-.24,.24])this.plate(gun,'Accent',.12,.23,1.73,x,0,.43);
        this.tube(gun,'Grey',.3,.26,0,0,1.18);this.tube(gun,'Eye',.24,.03,0,0,1.325);
        this.tube(upgrade,'Main',.49,.44,0,0,1.36);this.tube(upgrade,'Eye',.38,.03,0,0,1.595);
        this.mesh(upgrade,new THREE.TorusGeometry(.43,.055,8,24),'Accent',0,0,1.61);
        for(const x of [-.39,.39])this.plate(upgrade,'Grey',.1,.65,.8,x,0,.47);
      }else if(id==='volt'){
        for(const x of [-.27,.27]){
          this.tube(gun,'Grey',.11,1.5,x,0,.45);
          for(let n=0;n<5;n++)this.mesh(gun,new THREE.TorusGeometry(.2,.045,6,12),'Eye',x,0,.25+n*.2);
        }
        for(const x of [-.46,.46]){
          this.plate(upgrade,'Grey',.12,.23,1.4,x,.04,.7);
          this.mesh(upgrade,new THREE.ConeGeometry(.15,.5,8),'Eye',x,.04,1.43).rotation.x=Math.PI/2;
          for(const z of [.3,.65,1])this.mesh(upgrade,new THREE.TorusGeometry(.2,.045,6,12),'Accent',x,.04,z);
        }
      }else if(id==='bastion'){
        this.tube(gun,'Grey',.43,1.6,0,0,.5);this.tube(gun,'Main',.51,.55,0,0,.28);
        this.tube(gun,'Black',.35,.03,0,0,1.315);this.tube(gun,'Eye',.2,.035,0,0,1.335);
        this.tube(upgrade,'Accent',.61,.8,0,0,1.18);this.tube(upgrade,'Black',.5,.03,0,0,1.595);
        this.tube(upgrade,'Eye',.34,.035,0,0,1.62);
        for(const x of [-.56,.56])this.plate(upgrade,'Grey',.18,.57,1.7,x,0,.35);
      }else if(id==='zephyr'){
        this.tube(gun,'Grey',.16,1.8,0,0,.4);this.tube(gun,'Eye',.11,.035,0,0,1.32);
        for(let n=0;n<3;n++){
          const a=n*Math.PI*2/3,x=Math.cos(a)*.31,y=Math.sin(a)*.31;
          this.tube(upgrade,'Grey',.15,1.9,x,y,.62);this.tube(upgrade,'Eye',.1,.03,x,y,1.59);
        }
        this.mesh(upgrade,new THREE.TorusGeometry(.47,.07,6,20),'Main',0,0,1.22);
      }else if(id==='glacier'){
        this.tube(gun,'Accent',.29,1.35,0,0,.51);
        const nozzle=this.mesh(gun,new THREE.CylinderGeometry(.4,.23,.38,12),'Grey',0,0,1.12);nozzle.rotation.x=Math.PI/2;
        this.tube(gun,'Eye',.28,.025,0,0,1.325);
        for(const x of [-.4,.4]){
          this.tube(upgrade,'Main',.2,1.2,x,0,.19);
          for(const z of [-.2,.5])this.mesh(upgrade,new THREE.TorusGeometry(.22,.05,6,16),'Accent',x,0,z);
        }
        this.tube(upgrade,'Grey',.48,.47,0,0,1.36);this.tube(upgrade,'Eye',.37,.03,0,0,1.61);
        for(let n=0;n<8;n++){const a=n*Math.PI/4;this.plate(upgrade,'Accent',.07,.16,.61,Math.cos(a)*.42,Math.sin(a)*.42,1.17).rotation.z=a;}
      }else if(['ember','tidal','atlas','nova','echo'].includes(id)){
        this.buildElementWeapon(gun,id,1.32);
        this.buildElementWeapon(upgrade,id,1.62);
      }
    }
  }

  private buildElementWeapon(parent: THREE.Group, id: string, muzzle: number) {
    const collar=muzzle-.2;
    if(id==='ember'){
      this.tube(parent,'Grey',.3,1.12,0,0,collar-.5);
      this.tube(parent,'Black',.32,.18,0,0,collar);
      this.tube(parent,'Eye',.19,.035,0,0,muzzle);
      for(const x of [-.36,.36]){this.tube(parent,'Main',.13,.85,x,-.05,.4);for(let n=0;n<4;n++)this.plate(parent,'Accent',.08,.29,.08,x,0,.35+n*.2);}
    }else if(id==='tidal'){
      this.tube(parent,'Accent',.22,1.15,0,0,collar-.5);
      this.mesh(parent,new THREE.CylinderGeometry(.37,.2,.4,16),'Grey',0,0,collar).rotation.x=Math.PI/2;
      this.tube(parent,'Eye',.25,.025,0,0,muzzle);
      for(const x of [-.34,.34])this.tube(parent,'Main',.21,.9,x,0,.3);
    }else if(id==='atlas'){
      this.plate(parent,'Grey',.66,.58,1.4,0,0,collar-.6);
      this.plate(parent,'Accent',.9,.72,.26,0,0,muzzle-.12);
      this.tube(parent,'Eye',.16,.04,0,0,muzzle+.03);
      for(const x of [-.41,.41])this.tube(parent,'LightGrey',.085,1.1,x,0,.47);
    }else if(id==='nova'){
      this.tube(parent,'Black',.23,1.18,0,0,collar-.45);
      for(const z of [.45,.85,collar]){this.mesh(parent,new THREE.TorusGeometry(.4,.07,8,24),'Accent',0,0,z);this.mesh(parent,new THREE.TorusGeometry(.29,.035,6,24),'Eye',0,0,z+.03);}
      this.tube(parent,'Eye',.19,.045,0,0,muzzle);
    }else{
      this.tube(parent,'Grey',.19,1.1,0,0,collar-.4);
      this.mesh(parent,new THREE.CylinderGeometry(.5,.19,.45,20),'Accent',0,0,muzzle-.22).rotation.x=Math.PI/2;
      this.tube(parent,'Black',.39,.03,0,0,muzzle);this.tube(parent,'Eye',.19,.04,0,0,muzzle+.02);
      this.mesh(parent,new THREE.TorusGeometry(.44,.045,6,24),'Grey',0,0,muzzle+.02);
    }
  }

  private addAdvancedEquipment() {
    // Three distinct assemblies: auxiliary rails, deployable vanes, then a reactor crown.
    // The original stage-1/2 weapon remains recognisable inside each earned assembly.
    for(const {id} of HEROES){
      const levels:THREE.Group[]=[];this.advancedParts.set(id,levels);
      for(let stage=3;stage<=5;stage++){
        const group=new THREE.Group();group.name=`${id}-equipment-stage-${stage}`;
        this.launcherSlide.add(group);levels.push(group);group.visible=false;
        if(stage===3){
          const battery=this.mount('Chest',new THREE.Vector3(0,.65,.02));
          battery.name=`${id}-stage-3-battery`;group.userData.companion=battery;battery.visible=false;
          for(const side of [-1,1]){
            this.plate(battery,'Grey',.55,.86,.65,side*1.52,.43,0);
            this.plate(battery,'Main',.61,.54,.68,side*1.52,.42,0);
            this.plate(battery,'Accent',.63,.17,.71,side*1.52,.86,0);
            for(const y of [.25,.54]){
              this.tube(battery,'Black',.17,.07,side*1.52,y,.38);
              this.tube(battery,'Eye',.11,.035,side*1.52,y,.43);
            }
          }
          for(const side of [-1,1]){
            const rail=this.plate(group,'Grey',.14,.22,1.5,side*.58,-.06,.72);
            rail.rotation.z=side*.12;
            if(id==='echo')this.mesh(group,new THREE.TorusGeometry(.24,.06,6,20),'Accent',side*.58,0,1.39);
            else if(id==='atlas')this.plate(group,'Accent',.29,.52,.29,side*.58,0,1.32);
            else this.tube(group,'Accent',.17,.49,side*.58,0,1.18);
            this.tube(group,'Eye',.1,.04,side*.58,0,1.45);
          }
        }else if(stage===4){
          const rails=this.mount('Chest',new THREE.Vector3(0,.63,-.85));
          rails.name=`${id}-stage-4-rail-array`;group.userData.companion=rails;rails.visible=false;
          for(const side of [-1,1]){
            const rail=this.plate(rails,'Grey',.18,1.3,.27,side*1.06,.36,0);rail.rotation.z=-side*.26;
            this.plate(rail,'Accent',.24,.43,.36,0,.42,0);this.plate(rail,'Eye',.06,.72,.03,0,.09,.2);
          }
          for(let n=0;n<4;n++){
            const angle=n*Math.PI/2+Math.PI/4;
            const vane=this.plate(group,'Main',.24,.58,.65,Math.cos(angle)*.65,Math.sin(angle)*.65,.63);vane.rotation.z=angle-Math.PI/2;
            this.plate(vane,'Accent',.15,.4,.045,0,0,.36);
            this.plate(vane,'Eye',.045,.28,.03,0,0,.39);
          }
          this.mesh(group,new THREE.TorusGeometry(.58,.075,8,24),'Grey',0,0,.42);
        }else{
          this.mesh(group,new THREE.TorusGeometry(.71,.11,8,32),'Accent',0,0,1.35);
          for(let n=0;n<3;n++){
            const angle=n*Math.PI*2/3;
            this.tube(group,'Grey',.15,.8,Math.cos(angle)*.7,Math.sin(angle)*.7,.9);
            this.tube(group,'Eye',.095,.045,Math.cos(angle)*.7,Math.sin(angle)*.7,1.32);
          }
          this.tube(group,'Black',.26,.35,0,0,1.62);this.tube(group,'Eye',.18,.04,0,0,1.8);
          const crown=this.mount('Chest',new THREE.Vector3(0,.78,-.83));
          crown.name=`${id}-stage-5-reactor-crown`;
          this.mesh(crown,new THREE.TorusGeometry(.8,.11,8,32),'Grey');
          for(const side of [-1,1]){const fin=this.plate(crown,'Accent',.27,.9,.19,side*.84,.48,0);fin.rotation.z=-side*.4;this.plate(fin,'Eye',.08,.64,.03,0,0,.12);}
          // Keep independent bone sockets in the same visibility set.
          group.userData.companion=crown;crown.visible=false;
        }
      }
    }
  }

  private addPrismLoadouts() {
    for(let stage=0;stage<=5;stage++){
      const gun=new THREE.Group();gun.name=`prism-loadout-${stage}`;gun.visible=false;
      this.prismLoadouts.push(gun);this.launcherSlide.add(gun);
      if(stage===0)continue;
      this.plate(gun,'Main',.72,.55,.91,0,0,-.16);
      if(stage===1){this.tube(gun,'Grey',.27,1.32,0,0,.63);this.tube(gun,'Eye',.17,.04,0,0,1.32);}
      else if(stage===2)this.buildElementWeapon(gun,'ember',1.62);
      else if(stage===3){
        const pods=this.mount('Chest',new THREE.Vector3(0,.88,-.52));
        pods.name='prism-shoulder-rocket-battery';gun.userData.companion=pods;pods.visible=false;
        for(const side of [-1,1]){
          this.plate(pods,'Main',.69,.69,.8,side*.99,.12,0);
          for(const x of [-.16,.16])for(const y of [-.15,.15]){this.tube(pods,'Black',.125,.1,side*.99+x,.12+y,.44);this.tube(pods,'Accent',.08,.05,side*.99+x,.12+y,.5);}
        }
        for(const x of [-.29,.29])for(const y of [-.22,.22]){
          this.tube(gun,'Grey',.23,1.52,x,y,.63);this.tube(gun,'Black',.19,.04,x,y,1.41);
          this.mesh(gun,new THREE.ConeGeometry(.14,.27,12),'Accent',x,y,1.43).rotation.x=Math.PI/2;
        }
      }else if(stage===4){
        const rails=this.mount('Chest',new THREE.Vector3(0,.89,-.53));
        rails.name='prism-arc-rail-capacitors';gun.userData.companion=rails;rails.visible=false;
        for(const side of [-1,1]){this.plate(rails,'Grey',.19,1.42,.34,side*.98,.12,0);for(let n=0;n<4;n++)this.plate(rails,'Eye',.36,.07,.4,side*.98,-.4+n*.28,0);}
        for(const x of [-.42,.42]){this.tube(gun,'Grey',.12,1.8,x,0,.65);for(let n=0;n<5;n++)this.mesh(gun,new THREE.TorusGeometry(.23,.055,6,16),'Eye',x,0,.2+n*.27);}
        this.tube(gun,'Eye',.18,.06,0,0,1.65);
      }else{
        const array=this.mount('Chest',new THREE.Vector3(0,.88,-.69));
        array.name='prism-solar-siege-array';gun.userData.companion=array;array.visible=false;
        this.mesh(array,new THREE.TorusGeometry(1.13,.11,8,32),'Eye');
        for(const side of [-1,1]){
          const panel=this.plate(array,'Main',.52,1.28,.25,side*1.19,.13,0);panel.rotation.z=-side*.22;
          for(let n=0;n<4;n++)this.plate(panel,'Accent',.4,.19,.04,0,-.43+n*.28,.15);
        }
        this.buildElementWeapon(gun,'nova',1.82);
        for(let n=0;n<4;n++){
          const angle=n*Math.PI/2+Math.PI/4;
          const panel=this.plate(gun,'Accent',.37,.72,.18,Math.cos(angle)*.72,Math.sin(angle)*.72,.65);panel.rotation.z=angle;
          this.plate(panel,'Eye',.2,.5,.04,0,0,.12);
        }
      }
    }
  }

  /** Selects only the player skin. One Stan load; the last pre-ready selection wins. */
  setHero(id: string) {
    if(this.kind!=='relay'||this.disposed)return;
    this.heroId=getHero(id).id;
    this.imageActor.select(this.heroId);
    this.root.userData.heroId=this.heroId;
    const p=PALETTES[this.heroId]||PALETTES.relay;
    if(this.materials.Main){
      for(const [key,value] of Object.entries({Main:p.main,Accent:p.accent,Grey:p.metal,LightGrey:p.light,Black:p.dark,Eye:p.glow}))this.materials[key].color.setHex(value);
      this.materials.Eye.emissive.setHex(p.glow);
    }
    this.applyIdentity();
  }

  private applyIdentity() {
    const stage=this.kit.stage;
    this.root.userData.equipmentStage=stage;
    if(this.kind==='prism'){
      this.pulseHousing.visible=false;
      for(const [i,part] of this.prismLoadouts.entries()){
        this.revealEquipment(part,i===stage,this.motion==='upgrade');
        if(part.userData.companion)this.revealEquipment(part.userData.companion,i===stage,this.motion==='upgrade');
      }
      this.tip.position.z=stage===5?1.86:stage>=2?1.68:1.36;
      this.root.userData.weapon=['Kinetic Gauntlets','Shield + Bolt','Flame Projector','Rocket Pods','Arc Cannon','Solar Siege Array'][stage];
      return;
    }
    const ranged=this.kit.staff||this.motion==='break'||this.motion==='special';
    for(const [id,parts] of this.identityParts)for(const part of parts){
      part.visible=id===this.heroId;
      part.scale.copy(part.userData.baseScale).multiplyScalar(this.kit.pad?1.15:1);
    }
    for(const part of this.heavyParts)if(part.name.startsWith('shoulder-power-cell'))part.visible=this.kit.pad&&this.heroId==='relay';
    for(const [id,parts] of this.gauntlets)for(const part of parts)part.visible=id===this.heroId&&!ranged;
    this.pulseHousing.visible=this.heroId==='relay';
    for(const [id,part] of this.weapons)part.visible=id===this.heroId;
    for(const [id,part] of this.weaponUpgrades)this.revealEquipment(part,id===this.heroId&&this.kit.pad,this.motion==='upgrade'&&!this.reduced);
    for(const [id,parts] of this.advancedParts)for(const [index,part] of parts.entries()){
      const visible=id===this.heroId&&stage>=index+3;
      this.revealEquipment(part,visible,this.motion==='upgrade');
      if(part.userData.companion)this.revealEquipment(part.userData.companion,visible,this.motion==='upgrade');
    }
    this.tip.position.z=stage===5?1.84:this.kit.pad?1.68:1.36;
    const weapons=getHero(this.heroId).weapons;
    this.root.userData.weapon=weapons[Math.min(stage,weapons.length-1)].name;
  }

  setKit(kit: HeroKit) {
    if (typeof kit.staff === 'boolean') this.kit.staff=kit.staff;
    if (typeof kit.pad === 'boolean') this.kit.pad=kit.pad;
    this.kit.stage=Number.isFinite(kit.stage)?Math.max(0,Math.min(5,Math.floor(kit.stage!))):this.kit.pad?2:this.kit.staff?1:0;
    if(Number.isFinite(kit.stage)){this.kit.staff=this.kit.stage>=1;this.kit.pad=this.kit.stage>=2||(this.kind==='prism'&&this.kit.stage>=1);}
    if (Number.isFinite(kit.tier)) this.kit.tier=Math.max(1,Math.min(3,Math.floor(kit.tier!)));
    this.revealEquipment(this.staff,this.kit.staff,this.motion==='upgrade');
    this.revealEquipment(this.pad,this.kit.pad,this.motion==='upgrade');
    for(const part of this.heavyParts)this.revealEquipment(part,this.kit.pad,this.motion==='upgrade');
    for(const part of this.tierParts) this.revealEquipment(part,this.kit.tier>=2,true);
    this.root.userData.kit={...this.kit};
    this.imageActor.setStage(this.kit.stage);
    this.applyIdentity();
    this.applyGrip();
  }

  private revealEquipment(part: THREE.Object3D, visible: boolean, animate: boolean) {
    if (!visible && this.equipmentReveals.has(part)) {
      part.scale.copy(this.equipmentReveals.get(part)!.scale); this.equipmentReveals.delete(part);
    }
    if (visible && !part.visible && animate && this.ready && !this.reduced) {
      this.equipmentReveals.set(part,{scale:part.scale.clone(),elapsed:0});
      part.scale.y*=.08;
    }
    part.visible=visible;
  }

  private applyGrip() { if(this.kit.staff&&this.motion!=='strike')for(const pose of this.gripPose){pose.bone.position.copy(pose.position);pose.bone.quaternion.copy(pose.quaternion);} }

  /** Presentation only: null releases aiming; charge never modifies the saved kit. */
  setAim(target: THREE.Vector3 | null) { this.aimTarget=target?.clone()??null; }
  setCharge(amount: number) { this.chargeAmount=Math.max(0,Math.min(1,amount));this.imageActor.setCharge(this.chargeAmount); }
  firePulse() { this.recoilTime=0;this.imageActor.fire(); }
  setCamera(camera: THREE.Camera) {this.imageActor.setCamera(camera);}
  get imageActive() {return this.imageActor.active;}

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
    this.launcherSlide.position.z=this.reduced?0:-.2*Math.exp(-this.recoilTime*13)*Math.sin(Math.min(1,this.recoilTime/.08)*Math.PI/2);
    this.muzzleFlash.visible=!this.reduced&&this.recoilTime<.13;
    this.muzzleFlash.scale.setScalar(1+this.recoilTime*5);
    this.muzzleCharge.visible=this.chargeAmount>0&&this.staff.visible;
    this.muzzleCharge.scale.setScalar(.35+.65*this.chargeAmount);
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
    this.applyIdentity();
    this.imageActor.play(name,this.duration,this.startTime,this.reduced);
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
    this.imageActor.setCharge(this.chargeAmount);this.imageActor.update(dt,this.reduced);
    this.root.updateWorldMatrix(true,true);
    if(this.options.hold)return;
    const spec=HERO_MOTIONS[this.motion];
    const active=this.action;
    if(!this.impactFired&&spec.impactFraction!==null&&this.elapsed>=this.duration*spec.impactFraction){this.impactFired=true;this.options.onImpact?.();}
    if(this.action!==active)return;
    if(!this.looping&&!this.completeFired&&this.elapsed>=this.duration){this.completeFired=true;this.options.onComplete?.();}
  }

  get weaponTip(): THREE.Vector3 {
    if(this.imageActor.active)return this.imageActor.socket('muzzle');
    this.root.updateWorldMatrix(true,true);
    const socket=this.kit.staff||this.motion==='break'||this.motion==='special'?this.tip:this.fist;
    return socket?socket.getWorldPosition(new THREE.Vector3()):this.root.getWorldPosition(new THREE.Vector3());
  }

  get contactPoint(): THREE.Vector3 {
    if(this.imageActor.active)return this.imageActor.socket(this.motion==='strike'?'fist':'muzzle');
    if(this.motion==='strike'&&this.fist){this.root.updateWorldMatrix(true,true);return this.fist.getWorldPosition(new THREE.Vector3());}
    return this.weaponTip;
  }

  contactLocal(name: 'strike'|'break'|'special'): THREE.Vector3 {
    if(this.imageActor.active)return this.root.worldToLocal(this.imageActor.socket(name==='strike'?'fist':'muzzle','firing'));
    const point=this.contactProfiles.get(name);
    if(!point)throw new Error('Await HeroRig.readyPromise before querying contact reach');
    return point.clone();
  }

  visualBounds(): THREE.Box3 {
    if(this.imageActor.active)return this.imageActor.bounds();
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
  get shieldPoint(): THREE.Vector3 {
    return this.imageActor.active?this.imageActor.socket('shield'):this.root.position.clone().add(new THREE.Vector3(this.kind==='prism'?-.58:.58,2.35,0));
  }

  dispose() {
    this.disposed=true;
    this.imageActor.dispose();
    this.mixer?.stopAllAction();
    if(this.model)this.mixer?.uncacheRoot(this.model);
    const skeletons=new Set<THREE.Skeleton>();
    this.model?.traverse(object=>{if((object as THREE.SkinnedMesh).isSkinnedMesh)skeletons.add((object as THREE.SkinnedMesh).skeleton);});
    for(const skeleton of skeletons)skeleton.dispose();
    const geometries=new Set(this.meshes.map(m=>m.geometry));
    for(const geometry of geometries)geometry.dispose();
    for(const material of Object.values(this.materials))material.dispose();
    this.root.removeFromParent();
  }
}
