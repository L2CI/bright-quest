import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { transform } from 'esbuild';
const require=createRequire(import.meta.url);
const {chromium}=require(require.resolve('playwright',{paths:[process.env.BQ_NODE_MODULES||process.cwd()]}));
const root=fileURLToPath(new URL('../',import.meta.url));
const output=resolve(root,'../outputs/sparkbound-build/rich-graphics-qa');
await mkdir(output,{recursive:true});
const html=`<!doctype html><html><head><link rel="icon" href="data:,"><style>
body{margin:0}canvas{display:block;width:100vw;height:100vh}#topbar{position:fixed;top:0;height:50px}.battle-console{position:fixed;bottom:0;height:105px}</style></head>
<body><div id="game"><canvas></canvas><div id="topbar"></div><div class="battle-console"></div></div>
<script type="module">import {SparkWorld} from './src/world';import {HEROES} from './roster.js';window.heroes=HEROES;window.world=new SparkWorld(document.querySelector('canvas'));await world.ready;world.paused=true;</script></body></html>`;
// Serve independent transformed source modules. Never write or build game.js.
const server=createServer(async(req,res)=>{try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/sparkbound/'){res.setHeader('content-type','text/html');return res.end(html);}
  let path=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(!path.startsWith(root.endsWith(sep)?root:root+sep))return res.writeHead(403).end();
  if(!extname(path))path+='.ts';
  let body=await readFile(path);
  if(extname(path)==='.ts')body=(await transform(body.toString(),{loader:'ts',format:'esm',target:'es2022'})).code;
  res.setHeader('content-type',['.js','.ts'].includes(extname(path))?'text/javascript':extname(path)==='.glb'?'model/gltf-binary':'application/octet-stream');res.end(body);
}catch(error){console.error(error.message);res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;const errors=[],report=[];
try{
  browser=await chromium.launch({executablePath:process.env.BQ_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']});
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(`http://127.0.0.1:${server.address().port}/sparkbound/`);
  await page.waitForFunction(()=>window.world?.paused&&world.relay.ready&&world.prism.ready,{},{timeout:60000});
  await page.evaluate(()=>{
    const w=world;cancelAnimationFrame(w.raf);
    window.qa={
      hits:[],cues:[],time:0,
      step(n=1){for(let i=0;i<n;i++){const dt=1/120;this.time+=dt;w.animateAction(dt);w.relay.update(dt);w.prism.update(dt);w.updateImpact(dt);}},
      render(){w.fitHeroes();w.camera.position.copy(w.cameraGoal);w.camera.lookAt(w.target);w.renderer.render(w.scene,w.camera);},
      sync(id='ember',stage=5,round=6,version=3){w.stopAnimation();w.syncKey='';w.sync({id:'graphics-qa',heroId:id,phase:'battle',round,rulesVersion:version,upgradeStage:stage,staff:stage>=1,pad:stage>=2,intent:'guard',questions:[],questionIndex:0});this.step(100);this.render();},
      begin(id,round=1,rival=false){this.sync(id,5,round);this.hits=[];this.cues=[];w.onCue=name=>this.cues.push({name,time:this.time});w.onImpact=(e,part)=>this.hits.push({part,error:w.bolt.position.distanceTo(w.animation.target),time:this.time});w.playEvent({move:rival?'guard':'special',intent:rival?'heavy':'guard',rivalDamage:rival?3:0,guardBroken:!rival},w.match);},
      until(phase){for(let i=0;i<2400&&w.animation?.phase!==phase;i++)this.step();if(w.animation?.phase!==phase)throw Error(`Missing phase ${phase}`);this.render();},
      finish(){for(let i=0;i<2400&&w.animation;i++)this.step();this.step(100);this.render();return {finished:!w.animation,hits:this.hits,cues:this.cues};},
      pixels(){this.render();const gl=w.renderer.getContext(),p=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,p);let hash=2166136261;const colours=new Set();for(let i=0;i<p.length;i+=80){hash=Math.imul(hash^p[i],16777619);colours.add(`${p[i]>>3}:${p[i+1]>>3}:${p[i+2]>>3}`);}return {hash,colours:colours.size};},
      bounds(){this.render();return [w.relay,w.prism].map(r=>{const b=r.visualBounds(),points=[];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])points.push(r.root.position.clone().set(x,y,z).project(w.camera));return {left:Math.min(...points.map(v=>v.x)),right:Math.max(...points.map(v=>v.x)),top:Math.max(...points.map(v=>v.y)),bottom:Math.min(...points.map(v=>v.y))};});},
      visible(rig){const names=[];rig.root.traverseVisible(o=>{if(o.name.includes('equipment-stage')||o.name.includes('prism-loadout'))names.push(o.name);});return names;}
    };
  });
  const count=await page.evaluate(()=>heroes.length);assert.equal(count,11);
  for(const viewport of [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}]){
    await page.setViewportSize(viewport);await page.waitForTimeout(100);
    const stages=await page.evaluate(()=>{
      const results=[];
      for(const hero of heroes)for(let stage=0;stage<=5;stage++){
        qa.sync(hero.id,stage,stage+1);results.push({id:hero.id,stage,kit:world.relay.root.userData.kit,names:qa.visible(world.relay),prism:qa.visible(world.prism),bounds:qa.bounds(),pixels:qa.pixels()});
      }
      return results;
    });
    for(const row of stages){assert.equal(row.kit.stage,row.stage);assert(row.pixels.colours>30);assert(row.prism.includes(`prism-loadout-${row.stage}`)||row.stage===0);for(const b of row.bounds)assert(b.left>=-1&&b.right<=1&&b.top<=1&&b.bottom>=-1,JSON.stringify({viewport:viewport.name,...row}));if(row.stage>=3)assert(row.names.includes(`${row.id}-equipment-stage-${row.stage}`));}
    report.push({viewport:viewport.name,stages});
    for(const id of ['bastion','glacier','tidal'])for(const stage of [2,3]){
      await page.evaluate(([id,stage])=>{qa.sync(id,stage,1);world.relay.root.rotation.y=0;world.prism.root.visible=false;qa.render();},[id,stage]);
      await page.screenshot({path:resolve(output,`${viewport.name}-${id}-stage-${stage}-front-qa.png`)});
    }
    for(const id of ['ember','tidal','atlas','nova','echo']){
      await page.evaluate(id=>qa.begin(id),id);
      await page.evaluate(()=>{qa.step(60);qa.render();});
      assert(await page.evaluate(()=>world.relay.root.userData.charge>0));
      await page.screenshot({path:resolve(output,`${viewport.name}-${id}-early-charge.png`)});
      await page.evaluate(()=>qa.until('flight'));
      const launch=await page.evaluate(()=>({error:world.bolt.position.distanceTo(world.relay.weaponTip),gap:world.animation.target.x-world.animation.origin.x,pixels:qa.pixels()}));assert(launch.error<.01);assert(launch.gap>.5,'Player muzzle must be in front of, not through, the defender');
      await page.evaluate(()=>{qa.step(20);qa.render();});
      const middle=await page.evaluate(()=>({phase:world.animation.phase,pixels:qa.pixels(),hits:qa.hits.length}));assert.equal(middle.phase,'flight');assert.equal(middle.hits,0);assert.notEqual(middle.pixels.hash,launch.pixels.hash);
      await page.screenshot({path:resolve(output,`${viewport.name}-${id}-mid-flight.png`)});
      await page.evaluate(()=>qa.until('strike'));assert(await page.evaluate(()=>world.impactShell.visible));
      await page.screenshot({path:resolve(output,`${viewport.name}-${id}-impact.png`)});
      const result=await page.evaluate(()=>qa.finish());assert(result.finished);assert.equal(result.hits.length,1);assert.equal(result.hits[0].error,0);
      await page.screenshot({path:resolve(output,`${viewport.name}-${id}-final.png`)});report.push({viewport:viewport.name,id,result});
    }
    for(let round=2;round<=6;round++){
      await page.evaluate(round=>{qa.begin('relay',round,true);qa.until('flight');qa.step(15);qa.render();},round);
      assert(await page.evaluate(()=>world.animation.origin.x-world.animation.target.x>.5),'Prism muzzle must leave a flight gap');
      await page.screenshot({path:resolve(output,`${viewport.name}-prism-${round-1}-flight.png`)});
      const result=await page.evaluate(()=>qa.finish());assert(result.finished);assert.equal(result.hits[0].part,'rival');assert.equal(result.hits[0].error,0);report.push({viewport:viewport.name,prismStage:round-1,result});
    }
  }
  const contracts=await page.evaluate(()=>{
    const results=[];
    for(const version of [1,2,3])for(const phase of ['battle','rival_upgrade','training','player_upgrade']){
      qa.sync('ember',5,3,version);world.sync({...world.match,phase});qa.step(150);results.push({version,phase,player:world.relay.root.userData.kit.stage,prism:world.prism.root.userData.kit.stage});
    }
    world.sync(null);world.previewHero('nova',5);const preview=world.relay.root.userData.kit.stage;
    qa.sync('echo',5,6);world.reduced=true;world.relay.reduced=true;world.prism.reduced=true;qa.begin('echo',6,true);const reduced=qa.finish();const shake=world.shake;
    world.reduced=false;world.relay.reduced=false;world.prism.reduced=false;qa.sync('relay',0,1,1);
    const melee=[];world.onImpact=(event,part)=>{const rig=part==='player'?world.relay:world.prism;melee.push({part,error:rig.contactPoint.distanceTo(rig.root.localToWorld(rig.contactLocal('strike'))),clip:rig.currentTiming.clip});};
    world.playEvent({move:'strike',intent:'strike',rivalDamage:3},world.match);qa.finish();
    world.sync({id:'synthetic-preview',heroId:'nova',rulesVersion:3,phase:'welcome',upgradeStage:3});const synthetic3=world.relay.root.userData.kit.stage;
    world.sync({...world.match,upgradeStage:5});const synthetic5=world.relay.root.userData.kit.stage;
    const stageEffects=[];world.onImpact=()=>{};
    for(const [id,stage] of [['relay',3],['relay',4],['zephyr',3]]){
      qa.sync(id,stage,2);world.playEvent({move:'special',intent:'guard',rivalDamage:0},world.match);qa.until('flight');stageEffects.push({id,stage,effect:world.animation.effect});qa.finish();
    }
    return {results,preview,reduced,shake,melee,synthetic3,synthetic5,stageEffects};
  });
  for(const r of contracts.results){assert.equal(r.player,r.version===3?5:2);assert.equal(r.prism,r.version===3&&r.phase!=='battle'?3:2);}assert.equal(contracts.preview,5);assert(contracts.reduced.finished);assert.equal(contracts.shake,0);assert.equal(contracts.melee.length,2);for(const hit of contracts.melee){assert.equal(hit.clip,'Punch');assert(hit.error<.08);}assert.equal(contracts.synthetic3,3);assert.equal(contracts.synthetic5,5);assert.deepEqual(contracts.stageEffects.map(x=>x.effect),['rocket','laser','rocket']);report.push({contracts});
  const leak=await page.evaluate(()=>{
    world.reduced=false;qa.sync();for(const h of heroes){qa.begin(h.id,6,true);qa.finish();}
    const before={...world.renderer.info.memory};
    for(let i=0;i<30;i++){qa.begin(heroes[i%heroes.length].id,2+i%5,i%2===0);qa.finish();}
    const after={...world.renderer.info.memory};world.dispose();return {before,after,disposed:{...world.renderer.info.memory},particles:world.particleData.length};
  });
  console.log(JSON.stringify({leak}));assert.deepEqual(leak.after,leak.before);assert.equal(leak.disposed.geometries,0);assert.equal(leak.disposed.textures,0);assert.equal(leak.particles,0);assert.deepEqual(errors,[]);
  await writeFile(resolve(output,'report.json'),JSON.stringify({passed:true,errors,leak,report},null,2));console.log(JSON.stringify({passed:true,output,records:report.length,leak}));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
