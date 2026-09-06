import * as THREE from '../../cave-river-quest/vendor/three.module.js';
import { HeroRig, HERO_MOTIONS } from './hero';
import { ArenaStage } from './stage';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const smooth = (x: number) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
export class SparkWorld {
  scene = new THREE.Scene(); camera: any; renderer: any; stage: any; relay: any; prism: any;
  ready: Promise<any>; paused = false; reduced = false; frame = 0; elapsed = 0;
  errors: string[] = []; onCue: (name: string) => void = () => {};
  onImpact: (event: any, part: 'player'|'rival') => void = () => {};
  onBeat: (text: string) => void = () => {}; phase = 'welcome'; match: any;
  animation: any = null; private lastTime = 0; private raf = 0; private width = 1; private height = 1;
  private target = V(0, 2, 0); private cameraGoal = V(8, 6.5, 15); private look = V(0, 2, 0);
  private shield: any; private shieldLines: any; private particles: any; private particleData: any[] = [];
  private particleDummy = new THREE.Object3D(); private hitLight: any; private clock = 0;
  private heroHome = -3.4; private rivalHome = 3.4; private disposed = false; private resizeObserver: ResizeObserver;
  private shake = 0; private lastIntent = ''; private syncKey = ''; private demoTime = 0;
  private currentTier = 1; private upgradeReveal = false;
  constructor(public canvas: HTMLCanvasElement) {
    this.scene.background = new THREE.Color(0x9bb2b6); this.scene.fog = new THREE.FogExp2(0xabc0c1, .0035);
    this.camera = new THREE.PerspectiveCamera(38, 1, .1, 350); this.camera.position.copy(this.cameraGoal);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7)); this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene.add(new THREE.HemisphereLight(0xd9edf4, 0x546056, 2.3));
    const sun = new THREE.DirectionalLight(0xffefce, 3.5); sun.position.set(-12, 24, 14); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 15, bottom: -15, near: 1, far: 60 }); sun.shadow.bias = -.0004; sun.shadow.normalBias = .045; this.scene.add(sun);
    const rim = new THREE.DirectionalLight(0xa4dcea, 2.1); rim.position.set(4, 10, -10); this.scene.add(rim);
    this.hitLight = new THREE.PointLight(0xffd99a, 0, 10); this.hitLight.position.set(0, 2.5, 0); this.scene.add(this.hitLight);
    this.stage = new ArenaStage(this.scene); this.relay = new HeroRig('relay'); this.prism = new HeroRig('prism');
    this.scene.add(this.relay.root, this.prism.root); this.relay.root.position.set(this.heroHome, 0, 0); this.prism.root.position.set(this.rivalHome, 0, 0);
    this.relay.root.rotation.y = Math.PI / 2; this.prism.root.rotation.y = -Math.PI / 2;
    const shieldShape = new THREE.Shape(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + Math.PI / 6; i ? shieldShape.lineTo(Math.cos(a) * 1.2, Math.sin(a) * 1.5) : shieldShape.moveTo(Math.cos(a) * 1.2, Math.sin(a) * 1.5); } shieldShape.closePath();
    this.shield = new THREE.Mesh(new THREE.ShapeGeometry(shieldShape), new THREE.MeshPhysicalMaterial({ color: 0x6ce3e1, emissive: 0x217781, emissiveIntensity: .7, transparent: true, opacity: .24, roughness: .2, metalness: .35, side: THREE.DoubleSide, depthWrite: false }));
    this.shield.rotation.y = Math.PI / 2; this.scene.add(this.shield);
    this.shieldLines = new THREE.LineSegments(new THREE.EdgesGeometry(this.shield.geometry), new THREE.LineBasicMaterial({ color: 0xb2ffff, transparent: true, opacity: .8 })); this.shield.add(this.shieldLines); this.shield.visible = false;
    this.particles = new THREE.InstancedMesh(new THREE.BoxGeometry(.07, .045, .16), new THREE.MeshBasicMaterial({ color: 0xffd68b, transparent: true }), 110); this.particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.particles.frustumCulled = false; this.scene.add(this.particles);
    for (let i = 0; i < 110; i++) { this.particleDummy.scale.setScalar(0); this.particleDummy.updateMatrix(); this.particles.setMatrixAt(i, this.particleDummy.matrix); }
    this.ready = Promise.all([this.relay.readyPromise || this.relay.ready, this.prism.readyPromise || this.prism.ready]).then(() => { this.relay.play('idle'); this.prism.play('idle'); this.resize(); });
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(canvas); this.resize();
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); this.paused = true; this.errors.push('WebGL context lost'); this.onBeat('Graphics paused. Reload to resume your saved match.'); });
    canvas.addEventListener('webglcontextrestored', () => location.reload());
    this.raf = requestAnimationFrame(t => this.tick(t));
  }
  private resize() {
    this.width=Math.max(1,this.canvas.clientWidth);this.height=Math.max(1,this.canvas.clientHeight);
    this.camera.aspect=this.width/this.height;this.camera.updateProjectionMatrix();this.renderer.setSize(this.width,this.height,false);this.setCamera();
    if(!this.animation&&this.phase!=='training'){
      this.relay.root.position.set(this.heroHome,0,0);this.prism.root.position.set(this.rivalHome,0,0);
    }else if(this.animation?.phase==='retreat'){
      this.animation.source=[this.relay.root.position.clone(),this.prism.root.position.clone()];
      this.animation.destination=[V(this.heroHome,0,0),V(this.rivalHome,0,0)];this.animation.phaseTime=0;
    }
    this.fitHeroes();this.camera.position.copy(this.cameraGoal);this.look.copy(this.target);this.camera.lookAt(this.look);
  }

  private fitHeroes() {
    if(!this.relay.ready||!this.prism.ready)return;
    if(this.phase==='training'){this.fitForge();return;}
    const bounds=this.relay.visualBounds().union(this.prism.visualBounds());if(bounds.isEmpty())return;
    const back=this.cameraGoal.clone().sub(this.target).normalize();
    const right=V().crossVectors(V(0,1,0),back).normalize();const up=V().crossVectors(back,right).normalize();
    const tan=Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2));
    const portrait=this.width/this.height<.85;
    const xMargin=.84,yMargin=portrait?.44:.65;
    let distance=this.cameraGoal.distanceTo(this.target);
    for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
      const p=V(x,y,z).sub(this.target);const depth=p.dot(back);
      distance=Math.max(distance,depth+Math.abs(p.dot(right))/(tan*this.camera.aspect*xMargin),depth+Math.abs(p.dot(up))/(tan*yMargin));
    }
    this.cameraGoal.copy(this.target).addScaledVector(back,distance);
  }

  private fitForge() {
    if(this.width/this.height>=.85)return;
    this.stage.forge.updateWorldMatrix(true,true);
    const bounds=new THREE.Box3().setFromObject(this.stage.forge).union(this.relay.visualBounds());
    const centre=bounds.getCenter(V());const back=V(3.3,8.1,21.5).normalize();
    const right=V().crossVectors(V(0,1,0),back).normalize();const up=V().crossVectors(back,right).normalize();
    const tan=Math.tan(THREE.MathUtils.degToRad(this.camera.fov/2));
    // NDC .36..72 is screen y=14%..32%, clear of the title and 34% forge panel.
    const low=.36,high=.72,mid=.54;let distance=15;
    for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
      const p=V(x,y,z).sub(centre);const depth=p.dot(back),vertical=p.dot(up);
      distance=Math.max(distance,depth+Math.abs(p.dot(right))/(tan*this.camera.aspect*.85),(vertical/tan+high*depth)/(high-mid),(-vertical/tan-low*depth)/(mid-low));
    }
    this.target.copy(centre).addScaledVector(up,-mid*tan*distance);
    this.cameraGoal.copy(this.target).addScaledVector(back,distance);
  }
  private setCamera() {
    const portrait = this.width / this.height < .85; this.heroHome = portrait ? -2.25 : -3.4; this.rivalHome = -this.heroHome;
    if (this.phase === 'training') {
      this.target.set(portrait?-5.3:-4.3, 1.9, -1.5); this.cameraGoal.set(portrait ? -2 : 2, portrait ? 7 : 5.3, portrait ? 20 : 12.5);
      if (portrait) this.target.y = -1.1;
    } else {
      this.target.set(0, portrait ? 1.8 : 2.1, 0); this.cameraGoal.set(portrait ? 2.5 : 6.2, portrait ? 7 : 5.8, portrait ? 22.2 : 15.3);
      if (this.width / this.height > 2) { this.cameraGoal.set(4.5, 5.3, 17); this.target.y = 2.2; }
      if (this.phase === 'welcome') { this.target.set(0, 2.2, 0); this.cameraGoal.set(portrait ? 2 : 5.5, 5.4, portrait ? 22 : 14.5); }
    }
  }
  sync(match: any, tier = 1) {
    this.match = match; this.currentTier=tier; this.phase = match?.phase || 'welcome'; this.setCamera();
    const key = `${match?.id}:${match?.round}:${match?.phase}:${match?.staff}:${match?.pad}:${tier}`;
    if (this.animation) return;
    if (key !== this.syncKey) {
      this.syncKey = key;
      this.onBeat('');
      this.relay.setKit({ staff: !!match?.staff, pad: !!match?.pad, tier });
      this.prism.setKit({ staff: false, pad: !!match && match.round > 1, tier:Math.max(tier,match?.round||1) });
      if (this.phase === 'training') { this.relay.root.position.set(-4.1, 0, -2); this.relay.root.rotation.y = -.3; this.prism.root.position.set(4.2, 0, 0); this.prism.root.rotation.y = -.75; }
      else { this.relay.root.position.set(this.heroHome, 0, 0); this.prism.root.position.set(this.rivalHome, 0, 0); this.relay.root.rotation.y = Math.PI / 2; this.prism.root.rotation.y = -Math.PI / 2; }
      this.relay.play(this.phase === 'victory' ? 'victory' : 'idle');
      this.prism.play(this.phase === 'victory' ? 'victory' : 'idle');
      this.demoTime=0;this.upgradeReveal=this.phase==='rival_upgrade';this.prism.root.userData.revealApplied=false;
      if(this.upgradeReveal){this.prism.play('upgrade',{restart:true,fade:.12});this.onBeat('PRISM: ARMOUR RECONFIGURING');}
    }
    this.shield.visible = (this.phase === 'rival_upgrade' && this.demoTime>=.9) || (this.phase === 'battle' && match?.intent === 'guard');
    this.shield.position.set(this.prism.root.position.x - 1.25, 2.2, 0); this.shield.scale.setScalar(1);
    if (this.phase === 'battle' && (this.lastIntent !== match?.intent || this.prism.motion==='upgrade')) {
      const attacks=match.intent==='strike'||match.intent==='heavy';
      this.prism.play(match.intent==='guard'?'guard':attacks?'strike':'idle',{startFraction:match.intent==='heavy'?.3:attacks?.15:0,hold:attacks,restart:true});this.lastIntent=match.intent;
    }
    this.stage.setForgeProgress(this.phase === 'training' ? (match.questionIndex % 2) / 2 : match?.staff ? 1 : 0);
  }
  playEvent(event: any, after: any): Promise<void> {
    if (!event) return Promise.resolve();
    if (this.animation) this.finishAnimation();
    const move = event.move || 'upgrade'; const isMove = event.kind === 'move' || !!event.move;
    this.animation = { event, after, move, duration:2.2, elapsed: 0, isMove, phase:'approach', phaseTime:0, hit:false, reply:false, resolve:null, source:[],destination:[], attackMotion:move };
    if (isMove) {
      this.relay.root.position.set(this.heroHome, 0, 0); this.prism.root.position.set(this.rivalHome, 0, 0); this.relay.root.rotation.y = Math.PI / 2; this.prism.root.rotation.y = -Math.PI / 2;
      this.relay.play(move === 'guard' ? 'guard' : 'walk'); this.prism.play(move==='guard'?'walk':event.intent === 'guard' ? 'guard' : 'idle');
      this.shield.visible = event.intent === 'guard';
      this.setApproach(move==='guard'?'rival':'player',move==='guard'?'strike':move);
      if(move==='guard'&&event.intent==='open'){
        this.animation.phase='holdGuard';this.prism.play(event.intent==='guard'?'guard':'idle',{restart:true});
      }
      this.onBeat(move === 'guard' ? 'Hold the line' : move === 'break' ? 'Breach staff' : move === 'special' ? 'Overdrive' : 'Kinetic strike');
    } else { this.animation.duration=this.relay.play('upgrade',{restart:true}).duration; this.onCue('upgrade'); this.onBeat(after?.staff && !after?.pad ? 'ASSEMBLING BREACH STAFF' : after?.pad ? 'FITTING AEGIS MODULE' : 'POWER RISING'); }
    return new Promise(resolve => { this.animation.resolve = resolve; });
  }
  private finishAnimation() { const a = this.animation; if (!a) return; this.animation = null; this.syncKey = ''; this.lastIntent='';this.onBeat('');this.sync(a.after, this.currentTier); a.resolve?.(); }
  stopAnimation() { this.finishAnimation(); }
  burst(position: any, colour = 0xffd082, amount = 50) {
    this.particles.material.color.setHex(colour); this.hitLight.color.setHex(colour); this.hitLight.position.copy(position); this.hitLight.intensity = this.reduced ? 0 : 11; this.shake = this.reduced ? 0 : .07;
    const count = this.reduced ? 9 : amount;
    for (let i = 0; i < count; i++) this.particleData.push({ p: position.clone(), v: V(Math.sin(i * 2.399) * (2 + i % 4), .5 + i % 5, Math.cos(i * 2.399) * (2 + i % 3)), life: 0, max: .45 + (i % 5) * .09, spin: i * 1.17 });
    this.particleData = this.particleData.slice(-110);
  }
  private setApproach(part:'player'|'rival', motion:'strike'|'break'|'special') {
    const a=this.animation;const attacker=part==='player'?this.relay:this.prism;
    const contact=attacker.contactLocal(motion);
    // Root separation is native contact reach plus the defender's front armour.
    // Lateral offset puts the real right hand/foot onto the defender's centreline.
    const separation=contact.z+.58;
    a.part=part;a.attackMotion=motion;a.phase='approach';a.phaseTime=0;
    a.source=[this.relay.root.position.clone(),this.prism.root.position.clone()];
    a.destination=[V(-separation/2,0,part==='player'?contact.x:0),V(separation/2,0,part==='rival'?-contact.x:0)];
  }

  private startWindup() {
    const a=this.animation;a.phase='windup';a.phaseTime=0;
    const attacker=a.part==='player'?this.relay:this.prism;
    const defender=a.part==='player'?this.prism:this.relay;
    const guarded=a.part==='player'?a.event.intent==='guard':a.move==='guard';
    a.startFraction=a.attackMotion==='break'?.2:a.attackMotion==='special'?.18:a.part==='rival'&&a.event.intent==='heavy'?.3:.15;
    attacker.play(a.attackMotion,{startFraction:a.startFraction,hold:true,restart:true,fade:.1});
    defender.play(guarded?'guard':'idle',{restart:true,fade:.1});
    this.onBeat(a.part==='rival'?(a.event.intent==='guard'?'PRISM: SHIELD PRESSURE':'PRISM: COUNTER WIND-UP'):a.attackMotion==='special'?'OVERDRIVE CHARGED':a.attackMotion==='break'?'BREACH: LOAD THE STRIKE':'KINETIC WIND-UP');
  }

  private startStrike() {
    const a=this.animation;a.phase='strike';a.phaseTime=0;
    const attacker=a.part==='player'?this.relay:this.prism;
    const duration=HERO_MOTIONS[a.attackMotion as 'strike'|'break'|'special'].duration*(a.part==='rival'&&a.event.intent==='heavy'?1.25:1);
    const timing=attacker.play(a.attackMotion,{duration,startFraction:a.startFraction,restart:true,fade:0,onImpact:()=>this.makeContact(a,a.part)});
    a.strikeDuration=timing.duration;a.contactTime=timing.impactTime;
    this.onCue(a.attackMotion==='special'?'charge':'strike');
  }

  private makeContact(a:any,part:'player'|'rival') {
    if(this.animation!==a||(part==='player'?a.hit:a.reply))return;
    if(part==='player')a.hit=true;else a.reply=true;
    const attacker=part==='player'?this.relay:this.prism;const defender=part==='player'?this.prism:this.relay;
    const blocked=part==='player'?a.event.intent==='guard'&&!a.event.guardBroken:a.move==='guard';
    const point=attacker.contactPoint;
    this.burst(point,blocked?0x8ee9e6:a.attackMotion==='special'?0xf5e5ae:0xffd082,a.attackMotion==='special'?100:45);
    defender.play(blocked?'guard':'hit',{restart:true,fade:.035});
    this.onCue(blocked?'guard':a.attackMotion==='break'||a.attackMotion==='special'?'break':'impact');
    if(part==='player'&&a.event.guardBroken){this.shield.visible=false;this.onBeat('GUARD BROKEN');}
    else if(blocked)this.onBeat('GUARD ABSORBED THE STRIKE');
    else this.onBeat(part==='player'?'CONTACT':'PRISM: CONTACT');
    this.onImpact(a.event,part);
  }

  private retreat() {
    const a=this.animation;a.phase='retreat';a.phaseTime=0;
    a.source=[this.relay.root.position.clone(),this.prism.root.position.clone()];
    a.destination=[V(this.heroHome,0,0),V(this.rivalHome,0,0)];
    this.relay.play('walk');this.prism.play('walk');
  }

  private animateAction(dt: number) {
    const a=this.animation;
    if(!a){
      if(this.upgradeReveal&&this.phase==='rival_upgrade'){
        this.demoTime+=dt;
        if(this.demoTime>=.9&&!this.prism.root.userData.revealApplied){
          this.prism.root.userData.revealApplied=true;
          this.prism.setKit({staff:false,pad:true,tier:Math.max(this.currentTier,(this.match?.round||1)+1)});
          this.burst(this.prism.root.position.clone().add(V(0,2.6,0)),0x9de5e3,65);
          this.shield.visible=true;this.onBeat('PRISM: GUARD MODULE ONLINE');
        }
        if(this.demoTime>=HERO_MOTIONS.upgrade.duration){this.prism.play('guard');this.upgradeReveal=false;}
      }
      return;
    }
    a.elapsed+=dt;a.phaseTime+=dt;
    if(!a.isMove){
      if(!a.hit&&a.elapsed>=a.duration*.43){a.hit=true;this.burst(this.relay.root.position.clone().add(V(0,2.5,0)),0xefd09a,70);this.relay.setKit({staff:!!a.after?.staff,pad:!!a.after?.pad,tier:this.currentTier});}
      if(a.hit&&!a.revealed&&a.elapsed>=a.duration*.43+.65){a.revealed=true;this.onBeat(a.after?.pad?'AEGIS MODULE ONLINE':'BREACH STAFF ONLINE');}
      if(a.elapsed>=a.duration)this.finishAnimation();return;
    }
    this.shield.position.set(this.prism.root.position.x-.58,2.2,this.prism.root.position.z);
    if(a.phase==='holdGuard'){if(a.phaseTime>=1.05)this.finishAnimation();}
    else if(a.phase==='approach'||a.phase==='retreat'){
      const duration=a.phase==='retreat'?.68:this.reduced?.42:.72;
      const t=smooth(a.phaseTime/duration);
      this.relay.root.position.lerpVectors(a.source[0],a.destination[0],t);this.prism.root.position.lerpVectors(a.source[1],a.destination[1],t);
      if(t>=1){if(a.phase==='retreat')this.finishAnimation();else this.startWindup();}
    }else if(a.phase==='windup'){
      const hold=this.reduced?.12:a.attackMotion==='strike'&&!(a.part==='rival'&&a.event.intent==='heavy')?.28:.5;
      if(a.phaseTime>=hold)this.startStrike();
    }else if(a.phase==='strike'&&a.phaseTime>=a.strikeDuration+.12){
      if(a.part==='player'&&a.event.rivalDamage>0){this.relay.play('idle');this.prism.play('walk');this.setApproach('rival','strike');}
      else this.retreat();
    }
  }
  private tick(ms: number) {
    if (this.disposed) return; const dt = Math.min(.045, Math.max(0, (ms - (this.lastTime || ms)) / 1000)); this.lastTime = ms;
    if (!this.paused && !document.hidden) {
      this.elapsed += dt; this.clock += dt; this.animateAction(dt); this.relay.update(dt, this.elapsed); this.prism.update(dt, this.elapsed); this.stage.update(dt, this.elapsed);
      if(this.frame%6===0)this.fitHeroes();
      this.particleData = this.particleData.filter(p => p.life < p.max);
      for (let i = 0; i < 110; i++) { const p = this.particleData[i]; if (p) { p.life += dt; p.v.y -= dt * 9; p.p.addScaledVector(p.v, dt); this.particleDummy.position.copy(p.p); this.particleDummy.rotation.set(p.spin + p.life * 7, p.life * 9, p.spin); this.particleDummy.scale.setScalar(Math.max(0, 1 - p.life / p.max) * 1.1); } else this.particleDummy.scale.setScalar(0); this.particleDummy.updateMatrix(); this.particles.setMatrixAt(i, this.particleDummy.matrix); }
      this.particles.instanceMatrix.needsUpdate = true; this.hitLight.intensity *= Math.exp(-dt * 12); this.shake *= Math.exp(-dt * 15);
      const k = this.reduced ? 1 : 1 - Math.exp(-dt * 5); this.camera.position.lerp(this.cameraGoal, k); this.look.lerp(this.target, k); this.camera.lookAt(this.look.clone().add(V(Math.sin(this.clock * 80) * this.shake, Math.cos(this.clock * 95) * this.shake, 0)));
      this.renderer.render(this.scene, this.camera); this.frame++;
    }
    this.raf = requestAnimationFrame(t => this.tick(t));
  }
  dispose() { this.disposed = true; cancelAnimationFrame(this.raf); this.stopAnimation(); this.resizeObserver.disconnect(); this.stage.dispose(); this.relay.dispose?.(); this.prism.dispose?.(); this.renderer.dispose(); }
}
