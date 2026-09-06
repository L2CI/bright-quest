import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { createState, applyAction } from '../functions/_lib/sparkbound.js';
const { chromium } = createRequire(import.meta.url)('playwright');
const output = resolve('../outputs/sparkbound-build/edge-qa');
await mkdir(output,{recursive:true});
const h=await startSparkboundQa({port:0}), f=h.fixture;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']});
const context=await browser.newContext({viewport:{width:390,height:844}});
await context.addCookies([{name:'bq_session',value:f.cookie.value,url:h.origin}]);
await context.addInitScript(cap=>{sessionStorage.setItem('brightQuestChildCapability',cap);localStorage.setItem('bqSparkSettings',JSON.stringify({sound:false,volume:0,reduced:true}));},f.childCapability);
const page=await context.newPage(), errors=[], checks=[];
page.on('pageerror',e=>errors.push(e.message));
const check=(name,condition=true)=>{assert.ok(condition,name);checks.push(name);};
const settle=()=>page.waitForFunction(()=>window.__SPARK_QA__&&!window.__SPARK_QA__.acting&&document.querySelector('#game').getAttribute('aria-busy')==='false');
const state=()=>page.evaluate(()=>window.__SPARK_QA__.state);
const click=async action=>{await page.locator(`[data-action="${action}"]`).first().click();await settle();};
const step=s=>{const m=s.match,q=m.questions[m.questionIndex];return applyAction(s,m.phase==='battle'?{type:'move',move:m.intent==='heavy'?'guard':m.pad&&m.energy===4?'special':m.staff&&m.intent==='guard'?(m.energy>=2?'break':'guard'):'strike'}:m.phase==='training'?{type:'answer',questionId:q.id,answer:q.answer}:{type:'continue'});};
const seed=async s=>{await h.db.prepare('INSERT INTO sparkbound_states(family_id,child_id,version,state_json,last_operation_id,created_at,updated_at) VALUES(?,?,?,?,NULL,?,?) ON CONFLICT(family_id,child_id) DO UPDATE SET version=excluded.version,state_json=excluded.state_json,last_operation_id=NULL').bind(f.familyId,f.childId,s.version,JSON.stringify(s),'2026-09-06T00:00:00Z','2026-09-06T00:00:00Z').run();};
try {
  let s=createState({profileId:f.childId});
  for(let match=1;match<=6;match++) {
    s=applyAction(s,{type:'start'});
    for(let slot=0;slot<4;slot++) {
      for(let n=0;n<150&&!(s.match.phase==='training'&&s.match.questionIndex===slot);n++)s=step(s);
      check(`Match ${match} slot ${slot} reached`,s.match.phase==='training');
      const q=s.match.questions[slot]; await seed(s); await page.goto(`${h.origin}/sparkbound/`);await settle();
      check(`${q.id} complete prompt visible`,await page.locator('.forge-panel h2').textContent()===q.prompt);
      check(`${q.id} no page overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if(q.evidence.kind.startsWith('circuit'))check(`${q.id} readable circuit`,(await page.locator('.circuit-diagram').first().boundingBox()).width>=120);
      await page.screenshot({path:resolve(output,`${q.id}.png`)});
      if(match===1&&slot===0)for(const size of [{width:375,height:667},{width:320,height:568}]){
        await page.setViewportSize(size);await page.waitForTimeout(300);
        check(`Numeric Confirm fully visible ${size.width}x${size.height}`,await page.evaluate(()=>{const b=document.querySelector('[data-action="answer"]').getBoundingClientRect(),p=document.querySelector('.forge-panel').getBoundingClientRect();return b.bottom<=Math.min(innerHeight,p.bottom)&&b.top>=p.top;}));
        check(`Keypad touch targets ${size.width}x${size.height}`,await page.evaluate(()=>Array.from(document.querySelectorAll('.keypad button')).every(b=>b.getBoundingClientRect().height>=44)));
        await page.screenshot({path:resolve(output,`compact-${size.width}.png`)});
      }
      await page.setViewportSize({width:390,height:844});
      if(q.type==='numeric') {
        await page.locator('[data-key="1"]').click();await page.locator('[data-key="backspace"]').click();
        for(const digit of String(q.answer))await page.locator(`[data-key="${digit}"]`).click();
        await page.reload();await settle();check(`${q.id} draft survives reload`,(await page.locator('#numeric-answer').textContent())===String(q.answer));
      } else if(q.type==='order') {
        await page.locator(`[data-choice="${q.answer[0]}"]`).click();await click('undo-order');
        for(const id of q.answer)await page.locator(`[data-choice="${id}"]`).click();
        await page.reload();await settle();check(`${q.id} ordering survives reload`,await page.locator('.order-slots span').filter({hasText:/\d/}).count()===4);
      } else {await page.locator(`[data-choice="${q.answer}"]`).click();}
      await click('answer');check(`${q.id} correct outcome held`,await page.locator('[data-action="acknowledge"]').isVisible());await click('acknowledge');
      s=applyAction(s,{type:'answer',questionId:q.id,answer:q.answer});
    }
    for(let n=0;n<150&&s.match.phase!=='victory';n++)s=step(s);
    check(`Match ${match} ends in victory`,s.match.phase==='victory');
  }
  s=applyAction(s,{type:'reset'});s=applyAction(s,{type:'start'});await seed(s);await page.goto(`${h.origin}/sparkbound/`);await settle();
  let lost=false;
  await page.route('**/api/sparkbound',async route=>{if(!lost&&route.request().method()==='POST'){lost=true;await route.fetch();await route.abort('failed');}else await route.continue();});
  await page.locator('[data-move="strike"]').click();await settle();check('Lost response retains pending operation',await page.locator('[data-action="reconnect"]').isVisible());
  await page.unroute('**/api/sparkbound');await click('reconnect');check('Replay commits exactly once',(await state()).version===s.version+1);
  await page.setViewportSize({width:844,height:390});await page.waitForTimeout(500);await page.screenshot({path:resolve(output,'landscape.png')});
  check('Landscape controls fit',await page.evaluate(()=>Array.from(document.querySelectorAll('.move')).every(b=>{const r=b.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth;})));
  const pixels=await page.evaluate(()=>{const w=window.__SPARK_QA__.world;w.renderer.render(w.scene,w.camera);const gl=w.renderer.getContext(),b=new Uint8Array(64*64*4);gl.readPixels(Math.floor(gl.drawingBufferWidth/2)-32,Math.floor(gl.drawingBufferHeight/2)-32,64,64,gl.RGBA,gl.UNSIGNED_BYTE,b);return {colours:new Set(Array.from({length:4096},(_,i)=>`${b[i*4]},${b[i*4+1]},${b[i*4+2]}`)).size,render:w.frame};});
  check('Canvas has nonblank pixel detail',pixels.colours>20);
  await click('settings');await page.locator('#sound-setting').check();await page.locator('#volume-setting').fill('0');await click('save-settings');check('Sound opt-in reflected',await page.locator('[aria-label="Mute sound"]').isVisible());await click('sound');
  check('Mute reflected',await page.locator('[aria-label="Enable sound"]').isVisible());check('No script errors',!errors.length);
  await writeFile(resolve(output,'report.json'),JSON.stringify({checks,errors,pixels},null,2));console.log(JSON.stringify({passed:checks.length,errors,output},null,2));
} finally {await browser.close();await h.close();}
