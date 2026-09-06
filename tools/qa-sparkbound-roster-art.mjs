import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import { HEROES } from '../sparkbound/roster.js';

export const root=fileURLToPath(new URL('../',import.meta.url));
export const output=resolve(root,'../outputs/sparkbound-build/roster-art-qa');
export const chromium=createRequire(import.meta.url)('playwright').chromium;
export const chromeOptions={executablePath:process.env.BQ_QA_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']};
export const bundleHash=async()=>createHash('sha256').update(await readFile(resolve(root,'sparkbound/game.js'))).digest('hex');

// Deliberately isolated presentation fixture: no app, domain, auth or saved-state writes.
export async function startRosterHarness() {
  const result=await build({absWorkingDir:root,stdin:{resolveDir:root,contents:`
    import * as THREE from './cave-river-quest/vendor/three.module.js';
    import { HeroRig } from './sparkbound/src/hero.ts';
    import { SparkWorld } from './sparkbound/src/world.ts';
    window.THREE=THREE;window.HeroRig=HeroRig;
    window.world=new SparkWorld(document.querySelector('canvas'));
    world.previewHero('helio',1);world.previewHero('volt',2);world.previewHero('glacier',0);
    await world.ready;world.paused=true;window.loaded=true;
  `},bundle:true,write:false,format:'esm',target:'es2022',tsconfigRaw:{}});
  const html=`<!doctype html><html><head><title>Roster render QA</title><link rel="icon" href="data:,"><style>
    body{margin:0;font:16px Arial;color:#173c42}canvas{display:block;width:100vw;height:100vh}
    #topbar{position:fixed;left:18px;top:12px;height:44px;font-weight:bold}
    .hangar-panel{position:fixed;right:20px;top:90px;bottom:20px;width:min(440px,43vw);box-sizing:border-box;background:#f5f8f9;padding:24px}
    .battle-console{display:none;position:fixed;bottom:0;left:0;right:0;height:150px;background:#f5f8f9;padding:18px;box-sizing:border-box}
    #scene-caption{display:none;position:fixed;left:15px;right:15px;top:76px}.scene-title{margin:0;font-size:20px}
    [data-view=battle] .hangar-panel{display:none}[data-view=battle] .battle-console,[data-view=battle] #scene-caption{display:block}
    @media(max-width:600px){.hangar-panel{top:auto;bottom:12px;right:12px;width:calc(100% - 24px);height:420px}}
  </style></head><body><div id="game" data-view="hangar"><canvas></canvas><div id="topbar">SPARKBOUND</div><aside class="hangar-panel"><h2>Equipment inspection</h2></aside><div id="scene-caption"><h2 class="scene-title">Prism is ready to strike</h2></div><section class="battle-console">Shield exchange</section></div><script type="module" src="/qa.js"></script></body></html>`;
  const server=createServer(async(req,res)=>{
    try {
      const pathname=new URL(req.url,'http://localhost').pathname;
      if(pathname==='/sparkbound/'){res.setHeader('Content-Type','text/html');res.end(html);return;}
      if(pathname==='/qa.js'){res.setHeader('Content-Type','text/javascript');res.end(result.outputFiles[0].text);return;}
      const path=resolve(root,'.'+decodeURIComponent(pathname));
      if(!path.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403).end();return;}
      res.setHeader('Content-Type',({'.js':'text/javascript','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.css':'text/css'})[extname(path)]||'application/octet-stream');
      res.end(await readFile(path));
    }catch{res.writeHead(404).end();}
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  return {origin:`http://127.0.0.1:${server.address().port}`,close:()=>new Promise(r=>server.close(r))};
}

export async function installQa(page) {
  await page.evaluate(()=>{
    const w=world;
    window.qa={time:0,hits:[],cues:[],
      step(n=1){for(let i=0;i<n;i++){this.time+=1/120;w.elapsed+=1/120;w.relay.reduced=w.reduced;w.prism.reduced=w.reduced;w.animateAction(1/120);w.relay.update(1/120);w.prism.update(1/120);if(i%6===0)w.fitHeroes();}},
      render(){w.fitHeroes();w.camera.position.copy(w.cameraGoal);w.look.copy(w.target);w.camera.lookAt(w.target);w.renderer.render(w.scene,w.camera);},
      sync(id,stage,intent='open'){
        w.stopAnimation();w.trainingPreview(null);document.querySelector('#game').dataset.view='battle';
        this.match={id:'roster-qa',heroId:id,round:stage+1,phase:'battle',staff:stage>0,pad:stage>1,intent,playerHP:30,rivalHP:30,energy:4};
        w.sync(this.match,1);this.step(80);this.render();
      },
      inspect(id,stage){document.querySelector('#game').dataset.view='hangar';w.sync(null,1);w.previewHero(id,stage);this.step(45);this.render();},
      begin(id,stage,move,intent='guard',rivalDamage=0){
        this.sync(id,stage,intent);this.hits=[];this.cues=[];this.time=0;
        w.onCue=name=>this.cues.push({name,time:this.time});
        w.onImpact=(event,part)=>this.hits.push({part,time:this.time,phase:w.animation.phase,arrivalError:part==='player'&&w.animation.target?w.bolt.position.distanceTo(w.animation.target):null,visible:w.bolt.visible,cue:this.cues.at(-1),flightDuration:w.animation.flightDuration});
        const event={kind:'move',move,intent,damage:8,rivalDamage,guardBroken:intent==='guard'&&move!=='strike'};
        this.promise=w.playEvent(event,{...this.match});
      },
      until(phase){for(let i=0;i<1800&&w.animation?.phase!==phase;i++)this.step();if(w.animation?.phase!==phase)throw Error('Missing phase '+phase);this.render();},
      finish(){for(let i=0;i<2400&&w.animation;i++)this.step();this.render();return{finished:!w.animation,hits:this.hits,cues:this.cues};},
      pixels(){this.render();const gl=w.renderer.getContext(),x=gl.drawingBufferWidth,y=gl.drawingBufferHeight,p=new Uint8Array(x*y*4);gl.readPixels(0,0,x,y,gl.RGBA,gl.UNSIGNED_BYTE,p);const s=new Set();let hash=2166136261;for(let i=0;i<p.length;i+=160){s.add(p[i]+','+p[i+1]+','+p[i+2]);hash=Math.imul(hash^p[i],16777619)>>>0;}return{colours:s.size,hash};},
      bounds(){this.render();return [w.relay,w.prism].filter(r=>r.root.visible).map(r=>{const b=r.visualBounds(),p=[];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])p.push(b.min.clone().set(x,y,z).project(w.camera));return {left:(1+Math.min(...p.map(v=>v.x)))*innerWidth/2,right:(1+Math.max(...p.map(v=>v.x)))*innerWidth/2,top:(1-Math.max(...p.map(v=>v.y)))*innerHeight/2,bottom:(1-Math.min(...p.map(v=>v.y)))*innerHeight/2};});},
      layout(){const bounds=this.bounds(),hangar=document.querySelector('#game').dataset.view==='hangar',panel=document.querySelector(hangar?'.hangar-panel':'.battle-console').getBoundingClientRect();return{bounds,panel:{left:panel.left,right:panel.right,top:panel.top,bottom:panel.bottom},pixels:this.pixels()};}
    };
  });
}

async function run() {
  await mkdir(output,{recursive:true});
  const hash=await bundleHash(),harness=await startRosterHarness(),report={checks:[],errors:[],screenshots:[]};let browser;
  const check=(label,condition,detail)=>{report.checks.push({label,passed:!!condition,detail});assert(condition,label+' '+JSON.stringify(detail??''));};
  try {
    browser=await chromium.launch(chromeOptions);
    const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
    page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
    page.on('response',r=>{if(r.status()>=400)report.errors.push(`${r.status()} ${r.url()}`);});
    page.on('requestfailed',r=>report.errors.push(r.failure()?.errorText));
    await page.goto(harness.origin+'/sparkbound/');await page.waitForFunction(()=>window.loaded);
    check('last pre-ready selection wins',await page.evaluate(()=>world.relay.heroId==='glacier'&&!world.prism.root.visible));
    await installQa(page);
    const shot=async name=>{const path=resolve(output,name+'.png');await page.screenshot({path});report.screenshots.push(path);};
    const layout=async(name,hangar,viewport)=>{
      const d=await page.evaluate(()=>qa.layout());
      check(name+' nonblank',d.pixels.colours>100,d.pixels);
      check(name+' correct actor count',d.bounds.length===(hangar?1:2));
      for(const b of d.bounds){
        const p=d.panel,overlap=Math.min(b.right,p.right)>Math.max(b.left,p.left)&&Math.min(b.bottom,p.bottom)>Math.max(b.top,p.top);
        check(name+' no clipping/panel overlap',b.left>=0&&b.right<=viewport.width&&b.top>=60&&b.bottom<=viewport.height&&!overlap,b);
        if(hangar&&viewport.width<=600)check(name+' 110px mobile inspection',b.bottom-b.top>=110,b);
        if(!hangar&&viewport.name==='tablet')check(name+' 130px tablet hero',b.bottom-b.top>=130,b);
      }
      await shot(name);
    };
    for(const viewport of [{name:'desktop',width:1440,height:900},{name:'tablet',width:1024,height:768},{name:'mobile',width:390,height:844}]){
      await page.setViewportSize({width:viewport.width,height:viewport.height});await page.waitForTimeout(100);
      for(const hero of HEROES){
        const hashes=[];
        for(let stage=0;stage<3;stage++){
          await page.evaluate(({id,stage})=>qa.inspect(id,stage),{id:hero.id,stage});
          await layout(`${viewport.name}-${hero.id}-${stage}-hangar`,true,viewport);
          hashes.push(await page.evaluate(()=>qa.pixels().hash));
          const restore=await page.evaluate(({id,stage})=>{
            qa.sync(id,stage);const original=JSON.stringify(world.match),actor=world.relay;
            document.querySelector('#game').dataset.view='hangar';world.previewHero('helio',2);
            document.querySelector('#game').dataset.view='battle';world.sync(qa.match,1);qa.step(45);qa.render();
            return original===JSON.stringify(world.match)&&world.relay===actor&&world.relay.heroId===id&&world.prism.root.visible&&world.relay.root.userData.kit.staff===(stage>0)&&world.relay.root.userData.kit.pad===(stage>1);
          },{id:hero.id,stage});
          check(`${hero.id}-${stage} preview restores unchanged sync`,restore);
          await layout(`${viewport.name}-${hero.id}-${stage}-battle`,false,viewport);
        }
        check(`${hero.id} three physically changing stage frames`,new Set(hashes).size===3);
        for(const [stage,move] of [[1,'break'],[2,'special']]){
          await page.evaluate(({id,stage,move})=>{qa.begin(id,stage,move);qa.until('flight');qa.step(Math.floor(world.animation.flightDuration*60));qa.render();},{id:hero.id,stage,move});
          const launch=await page.evaluate(()=>({hits:qa.hits.length,clip:world.relay.currentTiming.clip,effect:world.bolt.userData.effect,travel:world.bolt.position.distanceTo(world.animation.origin)}));
          check(`${hero.id} ${move} travelling native Shoot`,launch.hits===0&&launch.clip==='Shoot'&&launch.effect===hero.effect&&launch.travel>0,launch);
          await shot(`${viewport.name}-${hero.id}-${move}-flight`);
          const result=await page.evaluate(()=>qa.finish()),hit=result.hits[0],cue=hero.effect==='pulse'?'launch':`weapon-${hero.effect}`,launchCue=result.cues.find(c=>c.name===cue);
          check(`${hero.id} ${move} one exact arrival and contact cue`,result.finished&&result.hits.length===1&&hit.arrivalError===0&&hit.visible&&hit.cue.name==='break'&&hit.cue.time===hit.time,result);
          check(`${hero.id} ${move} launch precedes HP by flight duration`,!!launchCue&&Math.abs(hit.time-launchCue.time-hit.flightDuration)<1/120+.0001&&result.cues.filter(c=>c.name===cue).length===1,result);
        }
      }
    }
    for(const hero of HEROES){
      const long=await page.evaluate(id=>{qa.sync(id,2);const start=world.cameraGoal.distanceTo(world.target);for(let i=0;i<20;i++){qa.begin(id,2,i%3===0?'strike':i%3===1?'break':'special','heavy',2);const r=qa.finish();if(!r.finished||r.hits.length!==2)throw Error('Exchange failed');qa.step(45);}return{start,end:world.cameraGoal.distanceTo(world.target)};},hero.id);
      check(hero.id+' 20 exchanges no cumulative camera shrink',long.end<=long.start*1.04,long);
      const reduced=await page.evaluate(id=>{world.reduced=true;qa.begin(id,2,'special');const result=qa.finish();world.reduced=false;return result;},hero.id);
      check(hero.id+' reduced motion retains one arrival',reduced.finished&&reduced.hits.length===1&&reduced.hits[0].arrivalError===0);
      await page.evaluate(id=>{qa.begin(id,2,'special');qa.until('flight');qa.step(8);qa.render();},hero.id);
      const paused=await page.evaluate(()=>({time:world.animation.phaseTime,bolt:world.bolt.position.toArray(),frame:world.frame,pixels:qa.pixels()}));
      await page.waitForTimeout(150);
      const still=await page.evaluate(()=>({time:world.animation.phaseTime,bolt:world.bolt.position.toArray(),frame:world.frame,pixels:qa.pixels()}));
      check(hero.id+' pause freezes geometry clock and pixels',JSON.stringify(paused)===JSON.stringify(still));
      await page.evaluate(()=>qa.finish());
      for(const stage of [1,2]){
        const upgrade=await page.evaluate(({id,stage})=>{qa.sync(id,stage-1);const cues=[];world.onCue=name=>cues.push(name);world.playEvent({kind:'upgrade'},{...qa.match,staff:true,pad:stage===2});const result=qa.finish();return{finished:result.finished,cues,kit:world.relay.root.userData.kit};},{id:hero.id,stage});
        check(`${hero.id} stage ${stage} assembly cue and earned kit`,upgrade.finished&&upgrade.cues.includes(stage===2?'upgrade-stage2':'upgrade-assembly')&&upgrade.kit.staff&&upgrade.kit.pad===(stage===2),upgrade);
      }
    }
    const intro=await page.evaluate(()=>{qa.sync('glacier',2);world.trainingPreview('relay');const selected=world.relay.heroId;world.trainingPreview(null);return{selected,restored:world.relay.heroId};});
    check('training intro Relay only, restores selected hero',intro.selected==='relay'&&intro.restored==='glacier',intro);
    const forge=await page.evaluate(()=>{let progress;const set=world.stage.setForgeProgress;world.stage.setForgeProgress=n=>progress=n;world.sync({phase:'training',heroId:'volt',questionIndex:2,questions:Array(6).fill({})});world.stage.setForgeProgress=set;return progress;});
    check('six-question forge progresses in thirds',forge===2/3,forge);
    check('no browser/network errors',!report.errors.length,report.errors);
    check('game.js never overwritten',hash===await bundleHash());
  }catch(error){report.failure=error.stack;process.exitCode=1;console.error(error);}
  finally{await browser?.close();await harness.close();await writeFile(resolve(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:!report.failure,checks:report.checks.length,output}));}
}
async function runGuide() {
  const hangar=process.argv.includes('--hangar');
  const {startSparkboundQa}=await import('./serve-sparkbound-qa.mjs');
  const app=await build({absWorkingDir:root,entryPoints:['sparkbound/src/app.ts'],bundle:true,write:false,format:'esm',target:'es2022',tsconfigRaw:{}});
  const css=await readFile(resolve(root,'sparkbound/sparkbound.css'));
  const hash=await bundleHash(),harness=await startSparkboundQa({port:0}),f=harness.fixture;
  let browser;const report={frames:[],errors:[]};await mkdir(output,{recursive:true});
  try{
    browser=await chromium.launch(chromeOptions);
    const context=await browser.newContext({viewport:{width:1024,height:768},deviceScaleFactor:1});
    await context.addCookies([{name:'bq_session',value:f.cookie.value,url:harness.origin}]);
    await context.addInitScript(cap=>{sessionStorage.setItem('brightQuestChildCapability',cap);localStorage.setItem('bqSparkSettings',JSON.stringify({sound:false,volume:0}));},f.childCapability);
    await context.route('**/sparkbound/game.js*',r=>r.fulfill({body:app.outputFiles[0].text,contentType:'text/javascript'}));
    await context.route('**/sparkbound/sparkbound.css*',r=>r.fulfill({body:css,contentType:'text/css'}));
    const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
    await page.goto(harness.origin+'/sparkbound/');
    const settled=()=>page.waitForFunction(()=>window.__SPARK_QA__&&!window.__SPARK_QA__.acting&&document.querySelector('#game').getAttribute('aria-busy')==='false');
    await settled();
    if(hangar){
      const before=await page.evaluate(()=>JSON.stringify(window.__SPARK_QA__.state));
      for(const viewport of [{name:'desktop',width:1440,height:900},{name:'tablet',width:1024,height:768},{name:'mobile',width:390,height:844}]){
        await page.setViewportSize({width:viewport.width,height:viewport.height});
        for(const hero of HEROES)for(let stage=0;stage<3;stage++){
          await page.locator(`[data-action="select-hero"][data-hero="${hero.id}"]`).click();
          await page.locator(`[data-action="preview-kit"][data-stage="${stage}"]`).click();
          await page.waitForTimeout(180);
          const data=await page.evaluate(()=>{
            const w=window.__SPARK_QA__.world,b=w.relay.visualBounds(),p=[];
            for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])p.push(b.min.clone().set(x,y,z).project(w.camera));
            const bounds={left:(1+Math.min(...p.map(v=>v.x)))*innerWidth/2,right:(1+Math.max(...p.map(v=>v.x)))*innerWidth/2,top:(1-Math.max(...p.map(v=>v.y)))*innerHeight/2,bottom:(1-Math.min(...p.map(v=>v.y)))*innerHeight/2};
            const rect=document.querySelector('.hangar-panel').getBoundingClientRect();
            const gl=w.renderer.getContext();w.renderer.render(w.scene,w.camera);const pixels=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4),colours=new Set();gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,pixels);for(let i=0;i<pixels.length;i+=128)colours.add(pixels[i]+','+pixels[i+1]+','+pixels[i+2]);
            return{bounds,panel:{left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom},colours:colours.size,heroId:w.relay.heroId,prism:w.prism.root.visible,kit:w.relay.root.userData.kit};
          });
          report.frames.push({viewport:viewport.name,hero:hero.id,stage,...data});
          await page.screenshot({path:resolve(output,`actual-hangar-${viewport.name}-${hero.id}-${stage}.png`)});
          const b=data.bounds,p=data.panel;
          assert.equal(data.heroId,hero.id);assert.equal(data.prism,false);assert.equal(data.kit.staff,stage>0);assert.equal(data.kit.pad,stage>1);assert(data.colours>100);
          assert(b.left>=0&&b.right<=viewport.width&&b.top>=60&&b.bottom<=viewport.height,JSON.stringify(data));
          assert(!(Math.min(b.right,p.right)>Math.max(b.left,p.left)&&Math.min(b.bottom,p.bottom)>Math.max(b.top,p.top)),JSON.stringify(data));
          if(viewport.name==='mobile')assert(b.bottom-b.top>=110,JSON.stringify(data));
        }
        await page.locator('[data-action="path"]').click();await page.waitForTimeout(100);
        assert(await page.evaluate(()=>window.__SPARK_QA__.world.paused));
        assert(await page.locator('.stage-image img').evaluateAll(images=>images.length===3&&images.every(i=>i.complete&&i.naturalWidth===640)));
        await page.screenshot({path:resolve(output,`actual-path-${viewport.name}.png`)});
        await page.locator('[data-action="path-back"]').click();await page.waitForTimeout(150);
        assert(await page.evaluate(()=>!window.__SPARK_QA__.world.paused&&!window.__SPARK_QA__.world.prism.root.visible));
      }
      assert.equal(await page.evaluate(()=>JSON.stringify(window.__SPARK_QA__.state)),before,'Inspection/path never unlock or equip saved kit');
      assert.deepEqual(report.errors,[]);assert.equal(await bundleHash(),hash);return;
    }
    await page.evaluate(()=>document.querySelector('[data-action=start]').click());await settled();
    for(const step of ['relay','prism','charge','blocked','opening','complete']){
      assert.equal(await page.evaluate(()=>window.__SPARK_QA__.guide?.step),step);
      for(const viewport of [{name:'tablet',width:1024,height:768},{name:'desktop',width:1440,height:900},{name:'mobile',width:390,height:844}]){
        await page.setViewportSize({width:viewport.width,height:viewport.height});await page.waitForTimeout(600);
        const data=await page.evaluate(()=>{
          const w=window.__SPARK_QA__.world;w.fitHeroes();w.camera.position.copy(w.cameraGoal);w.camera.lookAt(w.target);w.renderer.render(w.scene,w.camera);
          const panel=document.querySelector('.guide-console').getBoundingClientRect(),head=document.querySelector('.guide-signal').getBoundingClientRect();
          const bounds=[w.relay,w.prism].map(r=>{const b=r.visualBounds(),p=[];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])p.push(b.min.clone().set(x,y,z).project(w.camera));return{height:(Math.max(...p.map(v=>v.y))-Math.min(...p.map(v=>v.y)))*innerHeight/2,top:(1-Math.max(...p.map(v=>v.y)))*innerHeight/2,bottom:(1-Math.min(...p.map(v=>v.y)))*innerHeight/2};});
          return {bounds,panelTop:panel.top,headBottom:head.bottom,heroId:w.relay.heroId};
        });
        report.frames.push({step,viewport:viewport.name,...data});
        await page.screenshot({path:resolve(output,`actual-guide-${viewport.name}-${step}.png`)});
        assert.equal(data.heroId,'relay');
        for(const b of data.bounds){assert(b.top>=data.headBottom&&b.bottom<=data.panelTop,JSON.stringify(data));if(viewport.name!=='mobile')assert(b.height>=130,JSON.stringify(data));}
      }
      if(step!=='complete'){
        const action=step==='charge'?'guide-guard':step==='opening'?'guide-attack':'guide-next';
        await page.evaluate(action=>document.querySelector(`[data-action="${action}"]`).click(),action);await settled();
      }
    }
    assert.deepEqual(report.errors,[]);assert.equal(await bundleHash(),hash);
  }catch(error){report.failure=error.stack;process.exitCode=1;console.error(error);}
  finally{await browser?.close();await harness.close();await writeFile(resolve(output,hangar?'actual-hangar-report.json':'actual-guide-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:!report.failure,frames:report.frames.length,output}));}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))await (process.argv.includes('--guide')||process.argv.includes('--hangar')?runGuide():run());
