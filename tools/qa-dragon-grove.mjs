// Actual UI + ephemeral D1 only. No production cookies, learners or database bindings.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {startSparkboundQa} from './serve-sparkbound-qa.mjs';
import {QUESTIONS} from '../functions/_lib/dragon-grove-content.js';
import {ADVENTURES} from '../functions/_lib/dragon-grove.js';
const require=createRequire(import.meta.url),{chromium}=require(`${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/playwright`);
const out=fileURLToPath(new URL('../outputs/dragon-grove/',import.meta.url));await mkdir(out,{recursive:true});
const harness=await startSparkboundQa({port:0});
const production=process.env.BQ_VERIFY_ORIGIN||'',gameOrigin=production||harness.origin;
const browser=await chromium.launch({executablePath:process.env.BQ_CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox','--mute-audio','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const context=await browser.newContext({viewport:{width:1440,height:900}});await context.addCookies([harness.fixture.cookie]);
await context.addInitScript(({cap,parent})=>{sessionStorage.setItem('brightQuestChildCapability',cap);sessionStorage.setItem('brightQuestParentCapability',parent);localStorage.setItem('bqDragonGroveSettingsV1',JSON.stringify({sound:false,music:false,reduced:true}));},{cap:harness.fixture.childCapability,parent:harness.fixture.parentCapability});
let syntheticSessionCookie=`bq_session=${harness.fixture.cookie.value}`;
async function localApiResponse(request){
  const url=new URL(request.url());
  const headers={...request.headers(),cookie:syntheticSessionCookie,origin:harness.origin};
  delete headers.host;delete headers['content-length'];delete headers['accept-encoding'];
  const response=await fetch(harness.origin+url.pathname+url.search,{method:request.method(),headers,...(!['GET','HEAD'].includes(request.method())?{body:request.postData()}:{}),redirect:'manual'});
  // Honour local session rotation without placing a fictional cookie on the live origin.
  for(const cookie of response.headers.getSetCookie()){const match=/^bq_session=([^;]*)/.exec(cookie);if(match)syntheticSessionCookie=`bq_session=${match[1]}`;}
  const outgoing=Object.fromEntries(response.headers);delete outgoing['set-cookie'];delete outgoing['content-encoding'];delete outgoing['transfer-encoding'];
  return {status:response.status,headers:outgoing,body:Buffer.from(await response.arrayBuffer())};
}
if(production)await context.route('**/*',async route=>{
 const request=route.request(),url=new URL(request.url());
 if(url.origin===gameOrigin&&url.pathname.startsWith('/api/'))return route.fulfill(await localApiResponse(request));
 if(!['GET','HEAD','OPTIONS'].includes(request.method()))throw new Error('Unexpected production write blocked: '+url.pathname);
 return route.continue();
});
const page=await context.newPage(),errors=[],checks=[],requests=[];let latest;
page.on('pageerror',e=>errors.push(e.message));page.on('response',async r=>{const u=new URL(r.url());if(u.pathname==='/api/dragon-grove'&&r.ok()){try{const d=await r.json();if(d.state)latest=d.state;}catch{}}if(r.status()>=400)requests.push({path:u.pathname,status:r.status()});});
const check=(condition,label)=>{assert(condition,label);checks.push(label);};
const snap=async name=>{if(name!=='FAILURE'&&await page.locator('.world-pane').isVisible()){await page.waitForFunction(()=>window.dragonGroveDiagnostics?.().graphics?.ready,{},{timeout:60000});await page.waitForTimeout(200);}return page.screenshot({path:out+name+'.png',fullPage:true});};
const saved=()=>page.waitForFunction(()=>window.dragonGroveDiagnostics?.().busy===false&&document.querySelector('#saveStatus')?.textContent.startsWith('Adventure saved'));
const getState=()=>page.evaluate(async()=>{const r=await fetch('/api/dragon-grove',{headers:{'x-bq-child-capability':sessionStorage.getItem('brightQuestChildCapability')}});if(!r.ok)throw new Error('state'+r.status);return(await r.json()).state;});
async function submit(answer){const s=await getState();if(s.currentQuestion.type==='choice')await page.locator(`[data-choice="${answer}"]`).click();else await page.locator('#answer').fill(String(answer));await page.locator('#checkAnswer').click();await page.waitForFunction(version=>window.dragonGroveDiagnostics?.().version>version,s.version);await saved();}
async function continueFeedback(){if(await page.locator('[data-ui="continue"]').count()){await page.locator('[data-ui="continue"]').click();await saved();}}
async function solve(){const s=await getState(),q=QUESTIONS.find(q=>q.id===s.currentQuestion.id);await submit(String(q.answer));await continueFeedback();}
try{
 await page.goto(gameOrigin+'/dragon-grove/');await page.locator('#nameForm').waitFor();
 await page.waitForFunction(()=>window.dragonGroveDiagnostics?.().graphics?.ready,{},{timeout:60000});
 check(!(await page.locator('#worldNotice:not([hidden])').count()),'dragon loads without fallback');
 check((await getState()).stage===0,'newborn begins before earned growth');await snap('01-desktop-newborn');
 await page.locator('#dragonNameInput').fill('Willow');await page.getByRole('button',{name:'Meet my dragon'}).click();await saved();
 await page.locator('#answer').fill('123');await page.waitForFunction(()=>window.dragonGroveDiagnostics?.().draftSaved&&document.querySelector('#saveStatus').textContent.startsWith('Draft saved'));await page.reload();await page.waitForFunction(()=>document.querySelector('#answer')?.value==='123');check(true,'answer draft survives reload');
 await page.locator('[data-action="hint"]').click();await saved();check(await page.locator('.coach').isVisible(),'hint is accessible');
 await submit('-999');check((await getState()).counters.answers===1,'wrong answer retained');check(await page.locator('#answerFeedback').innerText().then(Boolean),'wrong feedback visible');
 // Simulate a committed request whose response is lost. Retrying must not record a duplicate.
 const before=await getState(),correct=QUESTIONS.find(q=>q.id===before.currentQuestion.id);
 let interrupted=true;await page.route('**/api/dragon-grove',async route=>{if(interrupted&&route.request().method()==='POST'){interrupted=false;if(production)await localApiResponse(route.request());else await route.fetch();await route.abort('internetdisconnected');}else await route.fallback();});
 await page.locator('#answer').fill(String(correct.answer));await page.locator('#checkAnswer').click();await page.locator('#retrySave').waitFor();await page.unroute('**/api/dragon-grove');
 await page.reload();await page.locator('#retrySave').waitFor();await page.locator('#retrySave').click();await saved();
 check((await getState()).counters.answers===2,'lost response retries exactly once');check((await getState()).questionIndex===1,'replayed answer resumes next question');
 await page.locator('[data-choice]').first().click();const chosen=await page.locator('[data-choice][aria-pressed=true]').getAttribute('data-choice');await page.waitForFunction(()=>window.dragonGroveDiagnostics?.().draftSaved&&document.querySelector('#saveStatus').textContent.startsWith('Draft saved'));await page.reload();await page.locator(`[data-choice="${chosen}"][aria-pressed=true]`).waitFor();check(true,'choice draft survives reload');
 for(const [name,width,height]of [['phone',390,844],['tablet',834,1112],['desktop',1440,900]]){await page.setViewportSize({width,height});await page.waitForTimeout(250);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${name} question fits viewport`);await snap(`02-${name}-question`);}
 await solve();await solve();check((await getState()).phase==='evolution','three questions unlock growth');await snap('03-desktop-evolution');
 const earnedPaths=['fire','storm','nature','astral'];let loops=0;
 while((await getState()).phase!=='complete'&&loops++<140){const s=await getState();
  if(s.phase==='questions'){await solve();}
  else if(s.phase==='evolution'){
   const path=earnedPaths[(s.level-1)%4];await page.locator(`button[data-path="${path}"]`).click();
   check(await page.locator(`button[data-path="${path}"]`).getAttribute('aria-pressed')==='true',`chapter${s.level} evolution choice available`);
   await page.locator('[data-action="evolve"]').click();await saved();check((await getState()).stage===s.level,`growth${s.level} earned and saved`);
   if([1,4,7,10].includes(s.level)){await page.waitForTimeout(400);await snap(`04-growth-${s.level}`);}
  }else if(s.phase==='adventure'){
   const objective=ADVENTURES[s.level-1][s.objectiveIndex];
   if(s.level===1&&s.objectiveIndex===0&&s.counters.adventureAttempts===0){await page.locator(`[data-target="${objective.targets.find(t=>t.id!==objective.correctTarget).id}"]`).click();await saved();check((await getState()).objectiveIndex===0,'wrong target preserves progress');check(await page.locator('#adventureFeedback').innerText().then(Boolean),'adventure feedback visible');}
   const power=earnedPaths[(s.level-1)%4];await page.locator(`[data-power="${power}"]`).click();await page.locator(`[data-target="${objective.correctTarget}"]`).click();await saved();
  }else if(s.phase==='celebrate'){await page.locator('[data-action="next"]').click();await saved();}
  else throw new Error('Unexpectedphase'+s.phase);
 }
 const done=await getState();check(done.phase==='complete'&&done.stage===10&&done.completedLevels.length===10,'ten chapter finale complete through UI');check(done.stats.solved===30,'exactly thirty questions solved');check(Object.values(done.paths).every(rank=>rank>0),'all four combined powers earned');check(done.adventures.filter(a=>a.level===10).length===3,'three finale objectives retained');
 await page.waitForTimeout(500);await snap('05-desktop-finale');await page.setViewportSize({width:390,height:844});await page.waitForTimeout(350);check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'phone finale fits');await snap('06-phone-finale');
 await page.locator('#galleryButton').click();await page.locator('[data-gallery="0"]').waitFor();check(await page.locator('[data-gallery]:enabled').count()===11,'newborn and ten earned stages in gallery');await page.locator('[data-gallery="0"]').click();await page.locator('#returnGrowth').waitFor();check((await getState()).stage===10,'gallery does not reset saved growth');await page.locator('#returnGrowth').click();
 await page.locator('#journalButton').click();await page.locator('#evidenceItems').waitFor();while(await page.locator('#moreEvidence').count()){const count=await page.locator('.journal-item').count();await page.locator('#moreEvidence').click();await page.waitForFunction(before=>document.querySelectorAll('.journal-item').length>before,count);}check(await page.locator('.journal-item').count()===done.version,'journal paginates every saved action');check((await page.locator('#evidenceItems').innerText()).includes('-999'),'journal retains original wrong answer');await page.locator('.dialog-close').click();
 await page.locator('#helpButton').click();await page.getByRole('heading',{name:'A little guide to the grove.'}).waitFor();await page.keyboard.press('Escape');check(!await page.locator('#dialog').isVisible(),'help and Escape work');
 await page.locator('#settingsButton').click();await page.locator('[data-setting="sound"]').check();await page.locator('[data-setting="music"]').check();await page.locator('[data-setting="reduced"]').uncheck();await page.waitForTimeout(1800);await page.locator('.dialog-close').click();check((await page.evaluate(()=>window.dragonGroveDiagnostics().audio)).started,'audio enabled by gesture');
 await page.locator('#creditsButton').click();check((await page.locator('#dialogBody').innerText()).includes('CC BY 4.0'),'asset credits accessible');await page.keyboard.press('Escape');
 await page.reload();await page.getByRole('heading',{name:'You brought the grove to life.'}).waitFor();check((await getState()).stage===10,'completion survives reload');
 await page.goto(gameOrigin+'/dragon-grove/?childId='+harness.fixture.legacyId);await page.getByRole('heading',{name:'Your learning journal.'}).waitFor();check(!await page.locator('[data-action]').count(),'parent review cannot mutate play');check(await page.locator('.exit').getAttribute('href')==='../#parent/evidence','parent return path preserved');await snap('07-parent-review');
 await page.getByRole('link',{name:'Return to parent dashboard'}).click();await page.getByText('Dragon Grove evidence',{exact:true}).waitFor();await page.getByText('Dragon Grove evidence',{exact:true}).click();await page.getByRole('link',{name:'Review dragon journey'}).click();await page.getByRole('heading',{name:'Your learning journal.'}).waitFor();check(true,'parent portal entry and return work');
 await page.goto(gameOrigin+'/#child/play');await page.getByText('Dragon Grove: Emberwild',{exact:true}).waitFor();await page.getByText('Dragon Grove: Emberwild',{exact:true}).click();await page.getByRole('heading',{name:'You brought the grove to life.'}).waitFor();check(true,'Play opens existing saved dragon');
 await page.getByRole('link',{name:'Return to Bright Quest'}).click();await page.waitForURL('**/#child/play');check(true,'child return to Play');
 if(production){
  const publicContext=await browser.newContext();await publicContext.route('**/*',route=>['GET','HEAD','OPTIONS'].includes(route.request().method())?route.continue():route.abort());
  const publicPage=await publicContext.newPage();
  for(const [device,width,height]of [['desktop',1440,900],['phone',390,844]]){
   await publicPage.setViewportSize({width,height});await publicPage.goto(gameOrigin+'/dragon-grove/');await publicPage.getByRole('heading',{name:'Your dragon is waiting.'}).waitFor();
   check(await publicPage.getByRole('link',{name:'Open Bright Quest'}).isVisible(),device+' live anonymous gate');
   await publicPage.getByRole('link',{name:'Open Bright Quest'}).click();await publicPage.waitForFunction(()=>window.BrightQuestFamilyAuth?.enabled&&!document.body.classList.contains('bq-app-opening'));await publicPage.locator('#familyLoginEmail').waitFor();await publicPage.locator('#familyLoginPassword').waitFor();await publicPage.evaluate(()=>document.fonts.ready);check(true,device+' live family sign-in return');await publicPage.screenshot({path:out+`08-${device}-family-sign-in.png`,fullPage:true,animations:'disabled'});
  }
  await publicContext.close();
 }
 check(errors.length===0,'no browser script errors: '+errors.join('; '));check(requests.length===0,'no missing assets: '+JSON.stringify(requests));
 await writeFile(out+(production?'live-browser-qa.json':'browser-qa.json'),JSON.stringify({checks:checks.length,details:checks,errors,requests,synthetic:true,assetOrigin:gameOrigin,apiOrigin:harness.origin,productionLearnerWrites:0,viewports:[1440,834,390],completedAt:new Date().toISOString()},null,2));console.log(`Dragon Grove browser QA passed ${checks.length} checks across all10 chapters.`);
}catch(error){await snap('FAILURE');console.error(error);console.error(JSON.stringify({errors,requests,checks:checks.length}));process.exitCode=1;}finally{await browser.close();await harness.close();}
