import {DragonWorld} from '../world.js?v=20261011-trials';
import {TRIALS,POWERS,TICK_MS,DURATION_MS,createSimulation,stepSimulation,checkpoint,availablePowers} from './trial-simulation.js';
export {TRIALS};
const ASSETS=new URL('./assets/',import.meta.url);
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const COLOURS={fire:'#ffbd72',storm:'#b7ecff',nature:'#c9f7a2',astral:'#dfc1ff'};
const SPRITES=[3,0,2,1,4]; // simulation kind -> six-cell authored atlas
const loadImage=url=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('A flight illustration could not load. Please try again.'));im.src=url;});

/** Layered real 3D dragon + illustrated flight world. No account or storage access. */
export class DragonTrial {
  constructor({container,trial=1,seed=1,runId,stage=10,paths={},saved=null,reducedMotion=false,onUpdate,onTick,onCheckpoint,onComplete,onPause,onPower,onError}={}){
    if(!container)throw new Error('A flight needs a scene container.');
    Object.assign(this,{container,runId,stage,paths:{...paths},reducedMotion:!!reducedMotion,onUpdate:onUpdate||onTick||(()=>{}),onCheckpoint,onComplete:onComplete||(()=>{}),onPause:onPause||(()=>{}),onPower:onPower||(()=>{}),onError:onError||(()=>{})});
    this.sim=createSimulation({trial,seed,paths,saved});this.info=TRIALS[this.sim.trial-1];this.powers=availablePowers(this.sim);this.selectedPower=this.powers[0]||null;
    this.running=false;this.disposed=false;this.initialised=false;this.keys=new Set();this.effects=[];this.accumulator=0;this.lastTime=0;this.lastDraw=0;this.lastNotify=-1;this.lastCheckpointTick=this.sim.snapshot.tick;this.saveChain=Promise.resolve();this.input={};this.completed=this.sim.snapshot.tick>=6000;
    this._loop=this._loop.bind(this);this._visibility=()=>{if(document.hidden)this.pause('hidden');};
  }

  async init(){
    if(this.initialised)return this;if(this.disposed)throw new Error('This flight is closed.');
    this.container.style.position='relative';this.container.style.overflow='hidden';this.container.style.touchAction='none';
    this.back=this._canvas('Flight landscape',false);this.dragonCanvas=this._canvas('Your grown dragon in flight',false);this.front=this._canvas('Steer your dragon with arrow keys or drag. Press Space to use the selected power.',true);
    this.front.tabIndex=0;this.front.setAttribute('role','application');this.front.style.outlineOffset='-4px';
    this.bg=this.back.getContext('2d');this.ctx=this.front.getContext('2d');
    this.world=new DragonWorld({canvas:this.dragonCanvas,reducedMotion:this.reducedMotion,onError:e=>this._error(e)});
    try{
      const [background,atlas,flame]=await Promise.all([loadImage(new URL(this.info.background,ASSETS)),loadImage(new URL('trial-sprites.webp',ASSETS)),loadImage(new URL('../assets/textures/dragon-fire.webp',import.meta.url)),this.world.init()]);
      if(this.disposed)return this;
      Object.assign(this,{background,atlas,flame});this.world.setGrowth({stage:this.stage,paths:this.paths});this.world.setTrialMode(true);this.world.setTrialPosition(...this.sim.snapshot.player);this.world.setTrialPaused(true);
      this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this.container);this._installControls();this.initialised=true;this.resize();this._draw();this._notify();this.raf=requestAnimationFrame(this._loop);return this;
    }catch(e){this._error(e);throw e;}
  }

  _canvas(label,interactive){const c=document.createElement('canvas');c.setAttribute('aria-label',label);if(!interactive)c.setAttribute('aria-hidden','true');Object.assign(c.style,{position:'absolute',inset:'0',width:'100%',height:'100%',display:'block',pointerEvents:interactive?'auto':'none',touchAction:'none'});this.container.append(c);return c;}
  resize(){if(!this.back)return;this.width=Math.max(1,this.container.clientWidth);this.height=Math.max(1,this.container.clientHeight);const dpr=Math.min(devicePixelRatio||1,1.5);for(const c of [this.back,this.front]){c.width=Math.round(this.width*dpr);c.height=Math.round(this.height*dpr);c.getContext('2d').setTransform(dpr,0,0,dpr,0,0);}this.world?.resize();this._draw();}

  start(){return this.resume();}
  resume(){if(!this.initialised||this.disposed||this.completed||document.hidden)return false;this.running=true;this.lastTime=performance.now();this.accumulator=0;this.world.setTrialPaused(false);this.front.focus({preventScroll:true});this._notify();return true;}
  pause(reason='paused'){
    const wasRunning=this.running;this.running=false;this.accumulator=0;this.keys.clear();this.input={};this.world?.setTrialPaused(true);this._notify();
    if(wasRunning){this.onPause(reason);return this._queueCheckpoint(true);}return this.saveChain;
  }
  selectPower(path){if(!this.powers.includes(path))return false;this.selectedPower=path;if(this.running)this.front.focus({preventScroll:true});this._notify();return true;}
  usePower(path=this.selectedPower){if(!this.running||!this.selectPower(path))return false;this.input.power=path;return true;}
  resetCamera(){this.world?.resetView();this.world?.setTrialPosition(...this.sim.snapshot.player);if(this.running)this.front.focus({preventScroll:true});}
  setReducedMotion(value){this.reducedMotion=!!value;this.world?.setReducedMotion(value);this._draw();}
  snapshot(){return {...checkpoint(this.sim),runId:this.runId,trial:this.sim.trial,seed:this.sim.seed,paused:!this.running};}
  diagnostics(){return {running:this.running,ready:this.initialised,completed:this.completed,tick:this.sim.snapshot.tick,entities:this.sim.snapshot.entities.length,projectiles:this.sim.snapshot.projectiles.length,world:this.world?.diagnostics()};}

  _notify(){this.onUpdate({...this.snapshot(),remainingMs:DURATION_MS-this.sim.snapshot.tick*TICK_MS,powers:[...this.powers],selectedPower:this.selectedPower,trialInfo:this.info,cooldowns:Object.fromEntries(POWERS.map((p,i)=>[p,this.sim.snapshot.cooldowns[i]*TICK_MS]))});}
  _queueCheckpoint(paused=false){
    if(!this.onCheckpoint)return Promise.resolve();const payload={...this.snapshot(),paused};
    this.saveChain=this.saveChain.catch(()=>{}).then(()=>this.onCheckpoint(payload));
    this.saveChain.catch(error=>{this.running=false;this.keys.clear();this.world?.setTrialPaused(true);this.onPause('save-error');this._notify();this._error(error);});return this.saveChain;
  }
  _error(error){this.running=false;this.world?.setTrialPaused(true);this.onError(error instanceof Error?error:new Error(String(error)));}

  _installControls(){
    this._down=e=>{if(e.target?.matches?.('input,textarea,select'))return;const key=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d',' ','p','escape','1','2','3','4'].includes(key)){e.preventDefault();if(key==='p'||key==='escape'){if(this.running)this.pause('keyboard');return;}if('1234'.includes(key)&&key.length===1){this.selectPower(POWERS[Number(key)-1]);return;}if(key!==' ')delete this.input.target;this.keys.add(key);}};
    this._up=e=>this.keys.delete(e.key.toLowerCase());
    this._pointer=e=>{if(!this.running)return;const r=this.front.getBoundingClientRect();this.input.target=[clamp((e.clientX-r.left)/r.width,.08,.82),clamp((e.clientY-r.top)/r.height,.15,.85)];};
    this._pointerDown=e=>{if(!this.running)return;this.dragId=e.pointerId;this.front.setPointerCapture(e.pointerId);this._pointer(e);};
    this._pointerMove=e=>{if(e.pointerId===this.dragId)this._pointer(e);};
    this._pointerUp=e=>{if(e.pointerId===this.dragId){this.dragId=null;if(this.front.hasPointerCapture(e.pointerId))this.front.releasePointerCapture(e.pointerId);}};
    this.front.addEventListener('keydown',this._down);this.front.addEventListener('keyup',this._up);this.front.addEventListener('blur',this._blur=()=>this.keys.clear());
    this.front.addEventListener('pointerdown',this._pointerDown);this.front.addEventListener('pointermove',this._pointerMove);this.front.addEventListener('pointerup',this._pointerUp);this.front.addEventListener('pointercancel',this._pointerUp);document.addEventListener('visibilitychange',this._visibility);
  }

  _loop(now){
    if(this.disposed)return;this.raf=requestAnimationFrame(this._loop);
    if(!this.running){this.lastTime=now;return;}
    const delta=Math.min(100,Math.max(0,now-this.lastTime));this.lastTime=now;this.accumulator+=delta;
    while(this.accumulator>=TICK_MS&&this.running){
      this.accumulator-=TICK_MS;const left=this.keys.has('arrowleft')||this.keys.has('a'),right=this.keys.has('arrowright')||this.keys.has('d'),up=this.keys.has('arrowup')||this.keys.has('w'),down=this.keys.has('arrowdown')||this.keys.has('s');
      const events=stepSimulation(this.sim,{...this.input,dx:Number(right)-Number(left),dy:Number(down)-Number(up),power:this.input.power||(this.keys.has(' ')?this.selectedPower:null)});delete this.input.power;
      for(const event of events){
        if(event.type==='power'){this.world.playPower(event.path);this.onPower(event.path);this.effects.push({...event,age:0,life:900});}
        else if(event.type==='hit'||event.type==='bump'||event.type==='escaped')this.effects.push({...event,age:0,life:event.type==='hit'?1100:500});
        else if(event.type==='complete'){this.running=false;this.completed=true;this.world.setTrialPaused(true);this._notify();this.onComplete(this.snapshot());}
      }
      this.world.setTrialPosition(...this.sim.snapshot.player);
      if(this.running&&this.sim.snapshot.tick-this.lastCheckpointTick>=200){this.lastCheckpointTick=this.sim.snapshot.tick;this._queueCheckpoint(false);}
      if(this.sim.snapshot.tick-this.lastNotify>=2){this.lastNotify=this.sim.snapshot.tick;this._notify();}
    }
    for(const e of this.effects)e.age+=delta;this.effects=this.effects.filter(e=>e.age<e.life).slice(-40);
    if(now-this.lastDraw>=1000/30){this.lastDraw=now;this._draw();}
  }

  _sprite(ctx,cell,x,y,size,rotation=0,alpha=1){const cellW=this.atlas.width/3,cellH=this.atlas.height/2;ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.globalAlpha=alpha;ctx.drawImage(this.atlas,(cell%3)*cellW,Math.floor(cell/3)*cellH,cellW,cellH,-size/2,-size/2,size,size);ctx.restore();}
  _draw(){
    if(!this.background||!this.width)return;const w=this.width,h=this.height,t=this.sim.snapshot.tick*TICK_MS/1000,c=this.bg,f=this.ctx,s=this.sim.snapshot;
    c.clearRect(0,0,w,h);const scale=Math.max(w/this.background.width,h/this.background.height)*1.14,iw=this.background.width*scale,ih=this.background.height*scale;
    const drift=this.reducedMotion?0:Math.sin(t*.035)*(iw-w)*.30;const sy=this.reducedMotion?0:Math.sin(t*.06)*Math.min(12,(ih-h)*.15);
    c.drawImage(this.background,(w-iw)/2+drift,(h-ih)/2+sy,iw,ih);
    const shade=c.createLinearGradient(0,0,0,h);shade.addColorStop(0,'rgba(5,19,30,.10)');shade.addColorStop(.55,'rgba(7,25,22,0)');shade.addColorStop(1,'rgba(4,16,19,.35)');c.fillStyle=shade;c.fillRect(0,0,w,h);
    if(this.sim.trial===5){this._sprite(c,5,w*.055,h*.81,Math.min(w,h)*.25);}
    f.clearRect(0,0,w,h);const unit=Math.min(w,h);
    for(const e of s.entities){const bob=this.reducedMotion?0:Math.sin(e[5]*.085+e[0])*unit*(e[1]===2?.014:.006),size=unit*[.13,.17,.16,.19,.17][e[1]];
      this._sprite(f,SPRITES[e[1]],e[2]*w,e[3]*h+bob,size,this.reducedMotion?0:e[1]===1?Math.sin(e[0]+e[5]*.015)*.16:Math.sin(e[5]*.045)*.035);
      if(e[4]>1){f.save();f.font=`600 ${Math.max(12,unit*.025)}px system-ui`;f.textAlign='center';f.fillStyle='#fff7df';f.shadowColor='#142b21';f.shadowBlur=6;f.fillText('2',e[2]*w,e[3]*h-size*.29);f.restore();}
    }
    for(const p of s.projectiles){const path=POWERS[p[1]],x=p[2]*w,y=p[3]*h;
      f.save();f.globalCompositeOperation='screen';f.globalAlpha=.88;const glow=f.createRadialGradient(x,y,0,x,y,unit*.055);glow.addColorStop(0,COLOURS[path]);glow.addColorStop(.3,COLOURS[path]+'99');glow.addColorStop(1,COLOURS[path]+'00');f.fillStyle=glow;f.fillRect(x-unit*.06,y-unit*.06,unit*.12,unit*.12);
      if(path==='fire'){f.translate(x,y);f.rotate(Math.atan2(p[5]*h,p[4]*w));f.drawImage(this.flame,-unit*.10,-unit*.035,unit*.15,unit*.07);}else if(path==='nature'){this._sprite(f,3,x,y,unit*.08,Math.sin(t)*.2);}else{f.strokeStyle=COLOURS[path];f.lineWidth=path==='storm'?2.5:4;f.beginPath();for(let i=0;i<9;i++){const px=x-unit*.07+i*unit*.009,py=y+Math.sin(i*2.3+p[0])*unit*.008;(i?f.lineTo(px,py):f.moveTo(px,py));}f.stroke();}f.restore();
    }
    for(const e of this.effects){const a=e.age/e.life,x=e.x*w,y=e.y*h;
      if(e.type==='hit'){f.save();f.globalAlpha=1-a;f.textAlign='center';f.font=`700 ${Math.max(16,unit*.04)}px Georgia`;f.fillStyle='#fff1b8';f.shadowColor='#16392a';f.shadowBlur=7;f.fillText('+'+e.points,x,y-a*unit*.085);if(e.kind===2)this._sprite(f,2,x+a*unit*.14,y-a*unit*.13,unit*.1,0,1-a);f.restore();}
      else if(e.type==='bump'){f.save();f.globalAlpha=(1-a)*.3;const glow=f.createRadialGradient(x,y,0,x,y,unit*.09);glow.addColorStop(0,'#fff4cf');glow.addColorStop(1,'#fff4cf00');f.fillStyle=glow;f.fillRect(x-unit*.09,y-unit*.09,unit*.18,unit*.18);f.restore();}
    }
  }

  dispose(){if(this.disposed)return;this.running=false;this.disposed=true;cancelAnimationFrame(this.raf);this.observer?.disconnect();document.removeEventListener('visibilitychange',this._visibility);this.world?.dispose();for(const c of [this.front,this.back,this.dragonCanvas])c?.remove();this.effects.length=0;this.keys.clear();}
}
