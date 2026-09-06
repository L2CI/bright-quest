import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
const require=createRequire(import.meta.url), {chromium}=require('playwright'), sharp=require('sharp');
const origin='https://bright-quest.pages.dev', output=resolve('../outputs/sparkbound-build/live');
await mkdir(output,{recursive:true});
const report={at:new Date().toISOString(),boundary:'Production static assets and real unauthenticated gate. All gameplay requests intercepted into an ephemeral local D1; no production writes.',assets:[],checks:[],errors:[]};
const hash=b=>createHash('sha256').update(b).digest('hex');
let browser,h;
try {
  const models=JSON.parse(await readFile('sparkbound/assets/model-provenance.json','utf8'));
  const environment=JSON.parse(await readFile('sparkbound/assets/environment-provenance.json','utf8'));
  const files=['sparkbound/index.html','sparkbound/game.js','sparkbound/sparkbound.css','sparkbound/assets/module-preview.jpg','sparkbound-parent.js','sparkbound-parent.css','bright-quest-shell-merge.js',...models.models.map(m=>'sparkbound/assets/'+m.file),...environment.files.map(m=>'sparkbound/assets/'+m.file)];
  for(const path of files){const r=await fetch(`${origin}/${path}`,{cache:'no-store'});assert.equal(r.status,200,path);const live=Buffer.from(await r.arrayBuffer()),local=await readFile(path);const normal=b=>/\.(js|css|html)$/.test(path)?Buffer.from(b.toString().replaceAll('\r\n','\n')):b;assert.equal(hash(normal(live)),hash(normal(local)),path);report.assets.push({path,sha256:hash(normal(live)),bytes:live.length});}
  assert.equal((await fetch(origin+'/api/sparkbound')).status,401);report.checks.push('Production API requires authentication');
  assert.equal((await fetch(origin+'/sparkbound/content.js')).status,404);report.checks.push('Answer-bank URL is not published');
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']});
  const gate=await browser.newPage();await gate.goto(origin+'/sparkbound/');await gate.getByText('Open Bright Quest and select your child profile to begin.').waitFor();await gate.screenshot({path:resolve(output,'auth-gate.png')});await gate.close();report.checks.push('Real sign-in gate and Bright Quest return');
  h=await startSparkboundQa({port:0});const context=await browser.newContext({viewport:{width:1440,height:1000}});let latest;
  await context.addInitScript(id=>localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`,'true'),h.fixture.childId);
  await context.route('**/*',async route=>{
    const request=route.request(),url=new URL(request.url());if(url.origin!==origin)return route.abort();
    if(url.pathname.startsWith('/api/')){assert.equal(url.pathname,'/api/sparkbound');const r=await fetch(h.origin+url.pathname,{method:request.method(),headers:{origin:h.origin,'content-type':'application/json',cookie:`bq_session=${h.fixture.cookie.value}`,'x-bq-child-capability':h.fixture.childCapability,'x-bq-child-id':h.fixture.childId},...(request.postData()?{body:request.postData()}:{})});const body=await r.text();assert.equal(r.status,200,body);latest=JSON.parse(body).state;return route.fulfill({status:r.status,contentType:'application/json',body});}
    assert.equal(request.method(),'GET');return route.continue();
  });
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  const idle=()=>page.waitForFunction(()=>document.querySelector('#loading').style.display==='none'&&document.querySelector('#game').getAttribute('aria-busy')==='false');
  await page.goto(origin+'/sparkbound/');await idle();await page.locator('[data-action="start"]').click();await idle();
  for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['phone',{width:390,height:844}],['tablet',{width:1024,height:768}]]){
    await page.setViewportSize(viewport);await page.waitForTimeout(600);const stats=await sharp(await page.locator('#scene').screenshot()).stats();assert(stats.channels.slice(0,3).every(c=>c.stdev>12));
    await page.locator('[data-move="strike"]').click();await idle();await page.screenshot({path:resolve(output,`${name}.png`)});assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));report.checks.push(`${name}: nonblank live art, actual move, layout and saving through synthetic backend`);
  }
  const version=latest.version;await page.reload();await idle();assert.equal(latest.version,version);report.checks.push('Live bundle resumes saved match');assert.deepEqual(report.errors,[]);
  await writeFile(resolve(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser?.close();await h?.close();}
