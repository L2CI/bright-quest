import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?`${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/playwright`:'C:/Users/gupta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=resolve('.'),out=resolve('../outputs/dragon-evolution-planning-2026-10-09/renderer-qa');await mkdir(out,{recursive:true});
const html=`<!doctype html><html><head><meta charset="utf-8"><link rel="icon" href="data:,"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;background:#14231c;color:#fff;font:16px system-ui;height:100%}.scene{position:relative;width:100%;height:100%;background:linear-gradient(0deg,#12271a22,#13211908),url('/dragon-grove/assets/emberwild.webp') center/cover}canvas{width:100%;height:100%;display:block}.label{position:absolute;left:20px;top:20px;background:#13291dcc;padding:12px 18px;border-radius:10px;pointer-events:none}</style></head><body><div class="scene"><canvas id="dragon"></canvas><div class="label">Dragon Grove • renderer proof</div></div><script type="module">import {DragonWorld} from '/dragon-grove/world.js';window.world=new DragonWorld({canvas:document.querySelector('canvas'),onError:e=>{window.worldError=e.message;console.error(e);}});await world.init();window.worldReady=true;</script></body></html>`;
const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/proof'){res.setHeader('Content-Type','text/html');res.end(html);return;}const file=resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+sep)){res.writeHead(403).end();return;}const types={'.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.html':'text/html','.json':'application/json'};res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.writeHead(404).end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({executablePath:process.env.BQ_CHROMIUM_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--mute-audio','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],snapshots=[],stages=[];let result;
try{
 const page=await browser.newPage({viewport:{width:1100,height:900},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto(origin+'/proof');await page.waitForFunction(()=>window.worldReady||window.worldError,{timeout:45000});
 const failure=await page.evaluate(()=>window.worldError);if(failure)throw new Error(failure);
 await page.waitForTimeout(250);
 if(process.env.DRAGON_PROBE){
   await page.evaluate(()=>{world.reducedMotion=true;world.setGrowth({stage:0});const head=world.bones.get('DEF-neck004_012').getWorldPosition(world.look.clone());world.camera.position.copy(head).add(world.look.clone().set(-1.4,.45,1.5));world.camera.lookAt(head);});
   for(const weight of [0,1]){await page.evaluate(w=>world.juvenileMesh.morphTargetInfluences[0]=w,weight);await page.waitForTimeout(100);await page.screenshot({path:resolve(out,`crown-${weight}.png`)});}
   await page.evaluate(()=>{world.reducedMotion=false;world.resetView();});
   for(const clip of ['Idle Sit','Fly']){await page.evaluate(c=>{world.setGrowth({stage:8});world._playClip(c,0);world._updatePose(.45);world._groundAndFrame();world.reducedMotion=true;},clip);await page.waitForTimeout(100);await page.screenshot({path:resolve(out,`clip-${clip.replace(' ','-')}.png`)});}
   await page.evaluate(()=>{world._playClip('Idle Stand',0);world.reducedMotion=false;world.resetView();});
 }
 for(const stage of Array.from({length:11},(_,i)=>i)){
  await page.evaluate(s=>world.setGrowth({stage:s,paths:{fire:Math.floor((s+3)/4),storm:Math.floor((s+2)/4),nature:Math.floor((s+1)/4),astral:Math.floor(s/4)}}),stage);await page.waitForTimeout(150);
  const file=`stage-${stage}.png`;await page.screenshot({path:resolve(out,file)});snapshots.push(file);
  const check=await page.evaluate(()=>{const b=world.currentBounds,ys=[];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])ys.push(b.min.clone().set(x,y,z).project(world.camera).y);return {...world.diagnostics(),crown:world.juvenileMesh.morphTargetInfluences[0],projectedY:[Math.min(...ys),Math.max(...ys)]};});assert.equal(check.stage,stage);assert.ok(check.bounds.min.every(Number.isFinite));assert.ok(check.bounds.max.every(Number.isFinite));assert.equal(Object.values(check.paths).reduce((a,b)=>a+b),stage);assert.ok(check.projectedY[0]>-.98&&check.projectedY[1]<.98,`Stage ${stage} stays in frame`);stages.push(check);
 }
 assert.ok(stages[10].stature>stages[0].stature*4);assert.equal(stages[0].crown,1);assert.equal(stages[10].crown,0);
 await page.setViewportSize({width:1000,height:625});
 await page.evaluate(()=>{world.setGrowth({stage:7,paths:{fire:2,storm:2,nature:2,astral:1}});document.querySelector('.label').hidden=true;});
 await page.waitForTimeout(200);await page.screenshot({path:resolve(out,'module-preview.png')});
 await page.setViewportSize({width:1100,height:900});
 await page.evaluate(()=>{world.setGrowth({stage:10,paths:{fire:3,storm:3,nature:2,astral:2}});document.querySelector('.label').hidden=false;});
 for(const path of ['fire','storm','nature','astral']){
  await page.evaluate(p=>{world.playPower(p);},path);await page.waitForTimeout(1000);
  const file=`power-${path}.png`;await page.screenshot({path:resolve(out,file)});snapshots.push(file);
  await page.evaluate(()=>world._finishPower());
 }
 await page.setViewportSize({width:390,height:380});await page.waitForTimeout(150);await page.screenshot({path:resolve(out,'phone-stage-10.png')});
 await page.evaluate(()=>world.setGrowth({stage:0,paths:{}}));await page.waitForTimeout(150);await page.screenshot({path:resolve(out,'phone-stage-0.png')});
 // Match the actual phone scene: 500px backdrop with an inset 290px canvas.
 await page.setViewportSize({width:390,height:500});
 await page.evaluate(()=>{document.querySelector('.label').hidden=true;document.querySelector('.scene').style.backgroundPosition='35% 58%';Object.assign(world.canvas.style,{position:'absolute',top:'80px',height:'290px'});world.resize();});
 for(const stage of [0,1,2,3,4,10]){await page.evaluate(s=>world.setGrowth({stage:s,paths:{}}),stage);await page.waitForTimeout(150);await page.screenshot({path:resolve(out,`phone-grounding-stage-${stage}.png`)});}
 await page.evaluate(()=>{Object.assign(world.canvas.style,{position:'',top:'',height:''});document.querySelector('.scene').style.backgroundPosition='';document.querySelector('.label').hidden=false;world.resize();});
 await page.setViewportSize({width:390,height:380});
 await page.evaluate(()=>world.setGrowth({stage:10,paths:{fire:3,storm:3,nature:2,astral:2}}));
 result=await page.evaluate(()=>({diagnostics:world.diagnostics(),boneNames:[...world.bones.keys()].slice(0,28),mouth:world._mouth().position.toArray(),camera:world.camera.position.toArray(),size:world.baseSpan.toArray()}));
 result.probe=await page.evaluate(async()=>{
   const THREE=await import('/cave-river-quest/vendor/three.module.js');
   const head=world.bones.get('DEF-neck004_012');const inv=head.matrixWorld.clone().invert(),bins={};
   world.model.traverse(mesh=>{if(!mesh.isSkinnedMesh||mesh.material.name!=='Low_Poly_Bake')return;
    const pos=mesh.geometry.attributes.position,idx=mesh.geometry.attributes.skinIndex,w=mesh.geometry.attributes.skinWeight,points=[];
    for(let i=0;i<pos.count;i++){let weight=0;for(let j=0;j<4;j++)if(mesh.skeleton.bones[idx.getComponent(i,j)]?.name==='DEF-neck004_012')weight+=w.getComponent(i,j);
      if(weight<.5)continue;const p=mesh.getVertexPosition(i,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld).applyMatrix4(inv);points.push(p.toArray());
      const bin=Math.floor(p.z*2)/2;bins[bin]??={n:0,x:[999,-999],y:[999,-999],z:[999,-999]};const b=bins[bin];b.n++;for(const ax of ['x','y','z']){b[ax][0]=Math.min(b[ax][0],p[ax]);b[ax][1]=Math.max(b[ax][1],p[ax]);}
    }
   });
   const meshStats=[];world.model.traverse(mesh=>{if(!mesh.isSkinnedMesh)return;const hi=mesh.skeleton.bones.findIndex(b=>b===head),mat=mesh.skeleton.boneInverses[hi].clone().multiply(mesh.bindMatrix),pos=mesh.geometry.attributes.position,idx=mesh.geometry.attributes.skinIndex,w=mesh.geometry.attributes.skinWeight,bounds=new THREE.Box3();let changed=0;for(let i=0;i<pos.count;i++){let weight=0;for(let j=0;j<4;j++)if(idx.getComponent(i,j)===hi)weight+=w.getComponent(i,j);if(weight<.5)continue;bounds.expandByPoint(new THREE.Vector3().fromBufferAttribute(pos,i).applyMatrix4(mat));const morph=mesh.geometry.morphAttributes.position?.[0];if(morph&&(Math.abs(morph.getX(i))+Math.abs(morph.getY(i))+Math.abs(morph.getZ(i)))>.0001)changed++;}meshStats.push({name:mesh.name,material:mesh.material.name,headBindBounds:[bounds.min.toArray(),bounds.max.toArray()],changed,morph:mesh.morphTargetInfluences});});
   return {headBins:bins,meshStats,wingBones:[...world.bones].filter(([n])=>n.includes('Wing')).map(([name,b])=>({name,position:b.getWorldPosition(new THREE.Vector3()).toArray(),rotation:b.rotation.toArray(),local:b.position.toArray()}))};
 });
 result.resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:new URL(r.name).pathname,encodedBytes:r.encodedBodySize,decodedBytes:r.decodedBodySize})));
 result.reducedPower=await page.evaluate(async()=>{world.setReducedMotion(true);return await world.playPower('astral');});assert.equal(result.reducedPower,true);
 result.disposed=await page.evaluate(()=>{world.dispose();return world.disposed&&!world.ready;});assert.equal(result.disposed,true);
 // Use the production HTML and CSS with renderer-only fictional state. This
 // verifies title/HUD clearance without connecting to or writing learner APIs.
 await page.route('**/dragon-grove/game.js*',route=>route.fulfill({contentType:'text/javascript',body:`import {DragonWorld} from '/dragon-grove/world.js';window.world=new DragonWorld({canvas:document.querySelector('#world'),reducedMotion:true});await world.init();document.querySelector('#worldLoading').hidden=true;document.querySelector('#dragonName').textContent='Willow';document.querySelector('#app').innerHTML='<section class="panel"><p class="eyebrow">CHAPTER 1 · LIVING THINGS</p><h2>A world to discover.<br>A dragon to grow.</h2><p>Explore Emberwild with your dragon.</p></section>';document.querySelector('#chapterMap').innerHTML=Array.from({length:10},(_,i)=>'<span>'+String(i+1).padStart(2,'0')+'</span>').join('');window.worldReady=true;`}));
 await page.setViewportSize({width:1440,height:900});await page.goto(origin+'/dragon-grove/index.html');await page.waitForFunction(()=>window.worldReady);
 result.hudClearance=[];
 for(const [device,width,height]of [['desktop',1440,900],['phone',390,844]]){
  await page.setViewportSize({width,height});
  for(const stage of [0,1,2,3,4,10]){
   await page.evaluate(s=>{world.setGrowth({stage:s,paths:s===10?{fire:3,storm:3,nature:2,astral:2}:{}});document.querySelector('#dragonDescription').textContent=s?'Guardian of Emberwild · The dawn of the guardian':'Newborn · A spark in the hollow';const summary=document.querySelector('#dragonSummary');summary.hidden=false;summary.innerHTML='<div><strong>'+s+' / 10</strong><small>Growth stages</small></div><div><strong>'+(s===10?'6.45':'0.35')+' m</strong><small>Stature</small></div><div><strong>'+(s===10?'180':'10')+'</strong><small>Strength</small></div>'+(s===10?'<div class="path-chips"><span class="path-chip">Fire 3</span><span class="path-chip">Storm 3</span><span class="path-chip">Nature 2</span><span class="path-chip">Astral 2</span></div>':'');},stage);
   await page.waitForTimeout(150);
   const clearance=await page.evaluate(()=>{const canvas=world.canvas.getBoundingClientRect(),hud=document.querySelector('#dragonSummary').getBoundingClientRect(),chapter=document.querySelector('#chapterMap').getBoundingClientRect(),texts=[...document.querySelectorAll('#dragonSummary strong,#dragonSummary small,#dragonSummary .path-chip')].map(e=>e.getBoundingClientRect());let lowest=-Infinity,textOverlapVertices=0;world.model.traverse(mesh=>{if(!mesh.isMesh)return;for(let i=0;i<mesh.geometry.attributes.position.count;i++){const p=mesh.getVertexPosition(i,world.look.clone()).applyMatrix4(mesh.matrixWorld).project(world.camera),x=canvas.left+(p.x+1)*canvas.width/2,y=canvas.top+(1-p.y)*canvas.height/2;lowest=Math.max(lowest,y);if(texts.some(r=>x>r.left-3&&x<r.right+3&&y>r.top-3&&y<r.bottom+3))textOverlapVertices++;}});return {stage:world.stage,canvas:{top:canvas.top,height:canvas.height},dragonBottom:lowest,hudTop:hud.top,gap:hud.top-lowest,chapterGap:chapter.top-lowest,textOverlapVertices};});
   result.hudClearance.push({device,...clearance});
   if([0,10].includes(stage))await page.screenshot({path:resolve(out,`game-${device}-grounding-stage-${stage}.png`),fullPage:true});
  }
 }
 for(const c of result.hudClearance){assert.equal(c.textOverlapVertices,0,`${c.device} stage ${c.stage} clears HUD text`);assert.ok(c.chapterGap>8,`${c.device} stage ${c.stage} clears the chapter map`);}
 await page.evaluate(()=>world.dispose());
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));await writeFile(resolve(out,'report.json'),JSON.stringify({errors,snapshots,stages,result},null,2));}
console.log(JSON.stringify({errors,snapshots,stages:stages.length,renderer:result?.diagnostics.renderer,resources:result?.resources},null,2));if(errors.length)process.exitCode=1;
