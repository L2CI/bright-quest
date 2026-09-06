import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const root=fileURLToPath(new URL('../',import.meta.url));
const output=resolve(root,'../outputs/sparkbound-build/launcher-qa');
await mkdir(output,{recursive:true});
const hash=async()=>createHash('sha256').update(await readFile(resolve(root,'sparkbound/game.js'))).digest('hex');
const beforeHash=await hash();
const bundle=await build({stdin:{contents:`import { SparkWorld } from './sparkbound/src/world.ts';
window.world=new SparkWorld(document.querySelector('canvas'));await world.ready;world.paused=true;`,resolveDir:root},bundle:true,write:false,format:'esm',target:'es2022',tsconfigRaw:{}});
const html=`<!doctype html><html><head><title>Muted launcher QA</title><link rel="icon" href="data:,"><style>
body{margin:0;font:16px Arial}canvas{width:100vw;height:100vh;display:block}#topbar{position:fixed;top:0;height:55px;color:#183333;padding:12px;box-sizing:border-box}
.battle-console{position:fixed;bottom:0;height:110px;left:0;right:0;background:#f1f5f7;color:#183333;padding:18px;box-sizing:border-box}
#scene-caption{position:fixed;left:15px;right:15px;top:60px;font-size:20px}.scene-title{margin:0;font-size:20px}</style></head><body><div id="game" data-phase="battle"><canvas></canvas><div id="topbar">SPARKBOUND / MUTED VISUAL QA</div><div id="scene-caption"></div><div class="battle-console">SIMULATED SHIELD COMBAT</div></div><script type="module" src="/qa.js"></script></body></html>`;
const server=createServer(async(req,res)=>{
  try{
    const pathname=new URL(req.url,'http://localhost').pathname;
    if(pathname==='/sparkbound/'){res.setHeader('Content-Type','text/html');res.end(html);return;}
    if(pathname==='/qa.js'){res.setHeader('Content-Type','text/javascript');res.end(bundle.outputFiles[0].text);return;}
    const path=resolve(root,'.'+decodeURIComponent(pathname));
    if(!path.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403).end();return;}
    res.setHeader('Content-Type',({'.js':'text/javascript','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg'})[extname(path)]||'application/octet-stream');
    res.end(await readFile(path));
  }catch{res.writeHead(404).end();}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser;const errors=[],report=[];
try{
  browser=await chromium.launch({executablePath:process.env.BQ_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']});
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(origin+'/sparkbound/');
  await page.waitForFunction(()=>window.world?.paused&&world.relay.ready&&world.prism.ready);
  await page.evaluate(()=>{
    const w=world;
    window.qa={
      time:0,hits:[],cues:[],
      sync(staff=false,pad=false,intent='open'){
        w.stopAnimation();w.trainingPreview(null);w.syncKey='';
        this.match={id:'guided-demo',round:1,phase:'battle',staff,pad,intent,playerHP:30,rivalHP:30,energy:4};
        w.sync(this.match,1);this.step(80);this.render();
      },
      step(n=1){for(let i=0;i<n;i++){this.time+=1/120;w.elapsed+=1/120;w.animateAction(1/120);w.relay.update(1/120,w.elapsed);w.prism.update(1/120,w.elapsed);if(i%6===0)w.fitHeroes();}},
      render(){w.fitHeroes();w.camera.position.copy(w.cameraGoal);w.look.copy(w.target);w.camera.lookAt(w.target);w.renderer.render(w.scene,w.camera);},
      begin(move,intent='open',rivalDamage=0){
        this.sync(true,true,intent);this.hits=[];this.cues=[];this.time=0;
        const event={kind:'exchange',move,intent,damage:8,rivalDamage,guardBroken:move==='break'&&intent==='guard'};
        w.onCue=name=>this.cues.push({name,time:this.time});
        w.onImpact=(event,part)=>{
          const attacker=part==='player'?w.relay:w.prism;
          this.hits.push({part,time:this.time,phase:w.animation.phase,bolt:w.bolt.visible,arrivalError:w.animation.target?w.bolt.position.distanceTo(w.animation.target):null,cue:this.cues.at(-1),clip:attacker.currentTiming.clip,contactError:w.animation.attackMotion==='strike'?attacker.contactPoint.distanceTo(attacker.root.localToWorld(attacker.contactLocal('strike'))):null});
        };
        this.promise=w.playEvent(event,{...this.match});
      },
      until(phase){for(let i=0;i<1800&&w.animation?.phase!==phase;i++)this.step();if(w.animation?.phase!==phase)throw Error(`No phase ${phase}`);this.render();},
      finish(){for(let i=0;i<2400&&w.animation;i++)this.step();this.render();return{finished:!w.animation,hits:this.hits,cues:this.cues};},
      pixels(){this.render();const gl=w.renderer.getContext(),x=gl.drawingBufferWidth,y=gl.drawingBufferHeight,p=new Uint8Array(x*y*4);gl.readPixels(0,0,x,y,gl.RGBA,gl.UNSIGNED_BYTE,p);const s=new Set();for(let i=0;i<p.length;i+=160)s.add(`${p[i]>>3},${p[i+1]>>3},${p[i+2]>>3}`);return s.size;},
      bounds(){this.render();return [w.relay,w.prism].map(r=>{const b=r.visualBounds(),p=[];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])p.push(r.root.position.clone().set(x,y,z).project(w.camera));return {left:Math.min(...p.map(v=>v.x)),right:Math.max(...p.map(v=>v.x)),top:Math.max(...p.map(v=>v.y)),bottom:Math.min(...p.map(v=>v.y))};});}
    };
  });
  for(const viewport of [{name:'desktop',width:1440,height:900},{name:'tablet',width:1024,height:768},{name:'mobile',width:390,height:844}]){
    await page.setViewportSize({width:viewport.width,height:viewport.height});await page.waitForTimeout(100);
    for(const [name,staff,pad] of [['base',false,false],['launcher',true,false],['armour',true,true]]){
      await page.evaluate(([staff,pad])=>qa.sync(staff,pad),[staff,pad]);
      const data=await page.evaluate(()=>({pixels:qa.pixels(),bounds:qa.bounds(),kit:world.relay.root.userData.kit,parts:world.relay.root.getObjectByName('shoulder-power-cell-1').visible}));
      assert(data.pixels>30,`${viewport.name} nonblank`);assert.equal(data.parts,pad);
      for(const b of data.bounds){assert(b.left>=-1&&b.right<=1&&b.top<=1&&b.bottom>=-1,JSON.stringify(b));}
      report.push({viewport:viewport.name,kit:name,...data});
      await page.screenshot({path:resolve(output,`${viewport.name}-${name}.png`)});
    }
    for(const step of ['relay','prism','charge','opening']){
      const data=await page.evaluate(step=>{const before=JSON.stringify(world.match),kit=JSON.stringify(world.prism.root.userData.kit);world.trainingPreview(step);qa.step(150);qa.render();return {unchanged:JSON.stringify(world.match)===before&&JSON.stringify(world.prism.root.userData.kit)===kit,charge:world.prism.root.userData.charge};},step);
      assert(data.unchanged);if(step==='charge')assert(data.charge>.6);
      await page.screenshot({path:resolve(output,`${viewport.name}-preview-${step}.png`)});
    }
    for(const move of ['break','special']){
      await page.evaluate(move=>{qa.begin(move,'guard');qa.until('emit');},move);
      await page.screenshot({path:resolve(output,`${viewport.name}-${move}-aim.png`)});
      await page.evaluate(()=>{qa.until('flight');qa.step(6);qa.render();});
      const flight=await page.evaluate(()=>({phase:world.animation.phase,hits:qa.hits.length,clip:world.relay.currentTiming.clip,travel:world.bolt.position.distanceTo(world.animation.origin),flash:world.relay.root.getObjectByName('pulse-muzzle-flash').visible}));
      assert.equal(flight.phase,'flight');assert.equal(flight.hits,0);assert.equal(flight.clip,'Shoot');assert(flight.travel>0);assert(flight.flash);
      await page.screenshot({path:resolve(output,`${viewport.name}-${move}-flight.png`)});
      await page.evaluate(()=>{qa.until('strike');qa.render();});
      await page.screenshot({path:resolve(output,`${viewport.name}-${move}-impact.png`)});
      const result=await page.evaluate(()=>qa.finish());
      assert(result.finished);assert.equal(result.hits.length,1);assert.equal(result.hits[0].arrivalError,0);assert(result.hits[0].bolt);assert.equal(result.hits[0].time,result.hits[0].cue.time);
      assert.equal(result.cues.filter(c=>c.name==='launch').length,1);assert(result.cues.find(c=>c.name==='launch').time<result.hits[0].time);assert.notEqual(result.hits[0].cue.name,'launch');
      report.push({viewport:viewport.name,move,flight,...result});
    }
  }
  for(const [move,intent,damage] of [['guard','heavy',3],['strike','open',0],['break','heavy',3],['special','strike',3],['guard','open',0]]){
    const result=await page.evaluate(([move,intent,damage])=>{qa.begin(move,intent,damage);return qa.finish();},[move,intent,damage]);
    assert(result.finished);assert.equal(result.hits.length,move==='guard'?(intent==='open'?0:1):(damage?2:1));
    for(const hit of result.hits)if(hit.contactError!==null)assert(hit.contactError<.08,JSON.stringify(hit));
    report.push({move,intent,...result});
  }
  const long=await page.evaluate(()=>{qa.sync(true,true);const start=world.cameraGoal.distanceTo(world.target);for(let i=0;i<20;i++){qa.begin(i%2?'break':'special','heavy',2);qa.finish();qa.step(40);}return {start,end:world.cameraGoal.distanceTo(world.target)};});
  assert(long.end<=long.start*1.04,JSON.stringify(long));report.push({long});
  const reduced=await page.evaluate(()=>{qa.begin('special','guard');world.reduced=true;return qa.finish();});
  assert(reduced.finished);assert.equal(reduced.hits[0].arrivalError,0);report.push({reduced});
  assert.deepEqual(errors,[]);assert.equal(await hash(),beforeHash,'shared game.js unchanged');
  await writeFile(resolve(output,'report.json'),JSON.stringify({passed:true,errors,report},null,2));
  console.log(JSON.stringify({passed:true,checks:report.length,output}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
