import { createRequire } from 'node:module';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const runtime=process.env.BQ_NODE_MODULES||process.cwd();
const {PNG}=require(require.resolve('pngjs',{paths:[runtime]}));

// Read-only alpha connectivity diagnostic. Does not alter the generated artwork.
for(const file of process.argv.slice(2).filter(x=>!x.startsWith('--'))){
  const png=PNG.sync.read(await readFile(resolve(file))),{width,height,data}=png;
  const seen=new Uint8Array(width*height),queue=new Int32Array(width*height),components=[];
  for(let seed=0;seed<seen.length;seed++){
    if(seen[seed]||data[seed*4+3]<160)continue;
    let head=0,tail=1,minX=width,minY=height,maxX=0,maxY=0;queue[0]=seed;seen[seed]=1;
    while(head<tail){
      const p=queue[head++],x=p%width,y=Math.floor(p/width);minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
      for(const dy of [-1,0,1])for(const dx of [-1,0,1]){
        const nx=x+dx,ny=y+dy;if(nx<0||nx>=width||ny<0||ny>=height)continue;
        const q=ny*width+nx;if(!seen[q]&&data[q*4+3]>=160){seen[q]=1;queue[tail++]=q;}
      }
    }
    if(tail>3000)components.push({pixels:tail,rect:[minX,minY,maxX-minX+1,maxY-minY+1]});
  }
  console.log(JSON.stringify({file,width,height,components:components.sort((a,b)=>Math.floor(a.rect[1]/(height/3))-Math.floor(b.rect[1]/(height/3))||a.rect[0]-b.rect[0])},null,2));
}
if(process.argv.length===2||process.argv.includes('--prepare')||process.argv.includes('--charge'))await browserQa();

async function browserQa(){
  const {chromium}=require(require.resolve('playwright',{paths:[runtime]}));
  const root=fileURLToPath(new URL('../',import.meta.url)),output=resolve(root,'../outputs/sparkbound-build/generated-actors-qa');await mkdir(output,{recursive:true});
  const html=`<!doctype html><html><head><link rel="icon" href="data:,"><style>body{margin:0}canvas{width:100vw;height:100vh;display:block}</style></head><body><canvas></canvas><script type="module">import {SparkWorld} from './src/world';window.longTasks=[];new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>e.duration))).observe({type:'longtask',buffered:true});window.started=performance.now();window.world=new SparkWorld(document.querySelector('canvas'));await world.ready;world.paused=true;cancelAnimationFrame(world.raf);window.loadMs=performance.now()-started;window.loaded=true;</script></body></html>`;
  const server=createServer(async(req,res)=>{try{
    const url=new URL(req.url,'http://localhost');if(url.pathname==='/sparkbound/'){res.setHeader('content-type','text/html');return res.end(html);}
    let path=resolve(root,'.'+decodeURIComponent(url.pathname));if(!path.startsWith(root.endsWith(sep)?root:root+sep))return res.writeHead(403).end();if(!extname(path))path+='.ts';
    let body=await readFile(path);if(extname(path)==='.ts')body=(await transform(body.toString(),{loader:'ts',format:'esm'})).code;
    res.setHeader('content-type',['.js','.ts'].includes(extname(path))?'text/javascript':extname(path)==='.png'?'image/png':extname(path)==='.webp'?'image/webp':'application/octet-stream');res.end(body);
  }catch(e){console.error(e.message);res.writeHead(404).end();}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  const errors=[],report=[];
  const focused=process.argv.includes('--charge');
  const ids=focused?['relay']:['relay','helio','volt','bastion','zephyr','glacier','ember','tidal','atlas','nova','echo'];
  try{
    browser=await chromium.launch({executablePath:process.env.BQ_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']});
    const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
    await page.goto(`http://127.0.0.1:${server.address().port}/sparkbound/${process.argv.includes('--prepare')?'?prepareArt=1':''}`);await page.waitForFunction(()=>window.loaded,{},{timeout:120000});
    report.push(await page.evaluate(()=>({coldLoad4x:loadMs,longTasks,model:world.relay.root.userData.model})));await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
    if(process.argv.includes('--prepare')){
      const packed=await page.evaluate(async()=>{const {exportPreparedArt}=await import('./src/image-actor');return exportPreparedArt();});
      const destination=resolve(root,'sparkbound/assets/heroes/generated/packed');await mkdir(destination,{recursive:true});
      for(const file of packed.files)await writeFile(resolve(destination,file.name),Buffer.from(file.data.split(',')[1],'base64'));
      await writeFile(resolve(destination,'manifest.json'),JSON.stringify(packed.manifest));
      console.log(JSON.stringify({prepared:packed.files.length,destination,cold:report[0]}));return;
    }
    await page.evaluate(()=>{
      window.qa={hits:[],step(n=1){for(let i=0;i<n;i++){world.animateAction(1/120);world.relay.update(1/120);world.prism.update(1/120);world.updateImpact(1/120);}},
        render(){world.fitHeroes();world.camera.position.copy(world.cameraGoal);world.camera.lookAt(world.target);world.relay.setCamera(world.camera);world.prism.setCamera(world.camera);world.renderer.render(world.scene,world.camera);},
        sync(id='relay',stage=5,round=6){world.stopAnimation();world.syncKey='';world.sync({id:'generated-qa',heroId:id,phase:'battle',rulesVersion:3,round,upgradeStage:stage,staff:stage>0,pad:stage>1,intent:'guard',questions:[],questionIndex:0});this.step(100);this.render();},
        begin(id='relay',round=6,rival=false){this.sync(id,5,round);this.hits=[];world.onImpact=(e,part)=>this.hits.push({part,error:world.bolt.position.distanceTo(world.animation.target)});world.playEvent({move:rival?'guard':'special',intent:rival?'heavy':'guard',rivalDamage:rival?2:0},world.match);},
        until(phase){for(let i=0;i<2000&&world.animation?.phase!==phase;i++)this.step();if(world.animation?.phase!==phase)throw Error('Missing '+phase);this.render();},
        finish(){for(let i=0;i<2500&&world.animation;i++)this.step();this.step(100);this.render();return {finished:!world.animation,hits:this.hits};},
        pixels(){this.render();const gl=world.renderer.getContext(),p=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,p);let hash=2166136261;for(let i=0;i<p.length;i+=24)hash=Math.imul(hash^p[i],16777619);return hash;}
      };
    });
    for(const viewport of [{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}]){
      await page.setViewportSize(viewport);await page.waitForTimeout(100);
      for(const stage of [0,1,2,3,4,5]){
        const waiting=await page.evaluate(stage=>{
          qa.sync('relay',stage,stage+1);const cues=[];world.onCue=cue=>cues.push(cue);
          world.syncKey='';world.sync({...world.match,intent:'heavy'});qa.step(600);qa.render();
          const actor=world.prism.imageActor,weapon=actor.gear[1].get('weapon');
          let direction=null;
          if(stage>0){const origin=weapon.localToWorld(weapon.position.clone().set(0,0,0)).project(world.camera),tip=weapon.localToWorld(weapon.position.clone().set(1,0,0)).project(world.camera);direction=tip.x-origin.x;}
          return {pose:actor.root.userData.art.pose,motion:actor.motion,bolt:world.bolt.visible,animation:!!world.animation,cues,direction,opacity:actor.layers[1].material.opacity};
        },stage);
        assert.equal(waiting.pose,'firing');assert.equal(waiting.motion,'charge');assert.equal(waiting.opacity,1);assert(!waiting.bolt);assert(!waiting.animation);assert(!waiting.cues.some(c=>c==='launch'||c.startsWith('weapon-')));if(stage>0)assert(waiting.direction<0);
        await page.screenshot({path:resolve(output,`${viewport.name}-prism-charge-${stage}.png`)});
        const guard=await page.evaluate(()=>{world.syncKey='';world.sync({...world.match,intent:'guard'});qa.step(30);return world.prism.imageActor.root.userData.art.pose;});assert.equal(guard,'guard');
        report.push({viewport:viewport.name,prismChargeStage:stage,waiting,guard});
      }
      for(const id of ids)for(const stage of [0,1,2,3,4,5]){
        await page.evaluate(([id,stage])=>qa.sync(id,stage,stage+1),[id,stage]);
        if(id==='relay')await page.screenshot({path:resolve(output,`${viewport.name}-stage-${stage}.png`)});
        const result=await page.evaluate(()=>{
          const rigs=[world.relay,world.prism];return rigs.map(r=>({active:r.imageActive,legacyVisible:r.body.visible,art:r.imageActor.root.userData.art,bounds:(()=>{const b=r.visualBounds(),points=[];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])points.push(r.root.position.clone().set(x,y,z).project(world.camera));return points.map(p=>p.toArray());})()}));
        });
        for(const r of result){assert(r.active);assert(!r.legacyVisible);for(const p of r.bounds)assert(Math.abs(p[0])<1&&Math.abs(p[1])<1);}
        report.push({viewport:viewport.name,id,stage,result});
      }
      for(const id of ids){
        await page.evaluate(id=>qa.begin(id),id);await page.evaluate(()=>{qa.step(55);qa.render();});await page.screenshot({path:resolve(output,`${viewport.name}-${id}-charge.png`)});
        await page.evaluate(()=>qa.until('flight'));const launch=await page.evaluate(()=>({distance:world.bolt.position.distanceTo(world.relay.weaponTip),hash:qa.pixels()}));assert(launch.distance<.06);
        await page.evaluate(()=>{qa.step(18);qa.render();});await page.screenshot({path:resolve(output,`${viewport.name}-${id}-flight.png`)});
        assert.notEqual(await page.evaluate(()=>qa.pixels()),launch.hash);await page.evaluate(()=>qa.until('strike'));await page.screenshot({path:resolve(output,`${viewport.name}-${id}-impact.png`)});
        const finished=await page.evaluate(()=>qa.finish());assert(finished.finished);assert.equal(finished.hits[0].error,0);report.push({viewport:viewport.name,id,finished});
      }
      await page.evaluate(()=>qa.begin('relay',6,true));
      await page.evaluate(()=>{qa.until('charge');qa.step(20);qa.render();});
      const prelaunch=await page.evaluate(()=>({pose:world.prism.imageActor.root.userData.art.pose,bolt:world.bolt.visible,launched:world.animation.launched,hits:qa.hits.length}));
      assert.equal(prelaunch.pose,'firing');assert(!prelaunch.bolt);assert(!prelaunch.launched);assert.equal(prelaunch.hits,0);
      await page.evaluate(()=>qa.until('flight'));
      const launched=await page.evaluate(()=>({bolt:world.bolt.visible,distance:world.bolt.position.distanceTo(world.prism.weaponTip)}));assert(launched.bolt);assert(launched.distance<.06);
      const finished=await page.evaluate(()=>qa.finish());assert(finished.finished);assert.equal(finished.hits[0].error,0);report.push({viewport:viewport.name,prismLaunch:{prelaunch,launched,finished}});
    }
    const bodyMotion=await page.evaluate(()=>{
      qa.sync('relay',0,1);world.stage.root.visible=false;world.prism.root.visible=false;
      const actor=world.relay.imageActor;actor.charge.visible=false;actor.thruster.visible=false;
      const hash=()=>{world.renderer.render(world.scene,world.camera);const gl=world.renderer.getContext(),pixels=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,pixels);let h=0;for(let i=0;i<pixels.length;i+=16)h=Math.imul(h^pixels[i],16777619);return h;};
      const before=hash(),root=world.relay.root.position.toArray(),vertices=Array.from(actor.layers[1].geometry.attributes.position.array);
      world.relay.play('charge',{restart:true});world.relay.setCharge(.85);world.relay.update(.2);
      const after=hash(),changed=vertices.filter((v,i)=>Math.abs(v-actor.layers[1].geometry.attributes.position.array[i])>.005).length;
      world.relay.play('hit',{restart:true});world.relay.update(.025);world.relay.reduced=true;world.relay.update(.001);
      const snapped=actor.layers.map(layer=>({visible:layer.visible,opacity:layer.material.opacity}));
      return {before,after,changed,root,afterRoot:world.relay.root.position.toArray(),snapped};
    });
    assert.notEqual(bodyMotion.before,bodyMotion.after);assert(bodyMotion.changed>20);assert.deepEqual(bodyMotion.root,bodyMotion.afterRoot);assert.equal(bodyMotion.snapped.filter(x=>x.visible).length,1);assert.equal(bodyMotion.snapped[1].opacity,1);report.push({bodyMotion});
    const lifecycle=await page.evaluate(async()=>{
      const {HeroRig}=await import('./src/hero');const {imageActorResources}=await import('./src/image-actor');
      world.dispose();await Promise.resolve();const disposed=imageActorResources();
      const first=new HeroRig('relay');first.dispose();const second=new HeroRig('prism');
      await Promise.all([first.readyPromise,second.readyPromise]);second.setCamera(world.camera);second.update(.2);
      const reacquired={...imageActorResources(),active:second.imageActive};second.dispose();await Promise.resolve();
      return {disposed,reacquired,final:imageActorResources(),gpu:{...world.renderer.info.memory}};
    });
    assert.equal(lifecycle.disposed.users,0);assert.equal(lifecycle.disposed.maps,0);assert.equal(lifecycle.reacquired.users,1);assert(lifecycle.reacquired.active);assert.equal(lifecycle.final.users,0);assert.equal(lifecycle.final.maps,0);assert.equal(lifecycle.final.sources,0);assert.equal(lifecycle.gpu.geometries,0);assert.equal(lifecycle.gpu.textures,0);report.push({lifecycle});
    assert.deepEqual(errors,[]);await writeFile(resolve(output,focused?'charge-report.json':'report.json'),JSON.stringify({passed:true,errors,report},null,2));console.log(JSON.stringify({passed:true,output,cold:report[0]}));
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
