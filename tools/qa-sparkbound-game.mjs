import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { applyAction } from '../functions/_lib/sparkbound.js';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const output = resolve('../outputs/sparkbound-build/game-qa');
await mkdir(output, { recursive: true });
const harness = await startSparkboundQa({ port: 0 });
const f = harness.fixture;
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const errors = [], checks = [];
const page = await context.newPage();
page.on('pageerror', e => errors.push(e.message));
page.on('console', e => { if(e.type() === 'error') errors.push(e.text()); });
page.on('response', r => { if(r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
await context.addCookies([{ name: 'bq_session', value: f.cookie.value, url: harness.origin }]);
await context.addInitScript(id => localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true'), f.childId);
await context.addInitScript(cap => { sessionStorage.setItem('brightQuestChildCapability', cap); localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, volume: 0, reduced: false })); }, f.childCapability);
const check = (label, value = true) => { assert.ok(value, label); checks.push(label); };
const settled = () => page.waitForFunction(() => window.__SPARK_QA__ && !window.__SPARK_QA__.acting && document.querySelector('#game').getAttribute('aria-busy') === 'false', { timeout: 20000 });
const click = async (action) => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
const state = () => page.evaluate(() => window.__SPARK_QA__.state);
const privateState = async () => JSON.parse((await harness.db.prepare('SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?').bind(f.familyId, f.childId).first()).state_json);
const shot = async name => { await page.waitForTimeout(600); await page.screenshot({ path: resolve(output, `${name}.png`) }); };
try {
  await page.goto(`${harness.origin}/sparkbound/`); await settled();
  await shot('01-welcome-desktop');
  check('Both rigged models loaded', await page.evaluate(() => window.__SPARK_QA__.world.relay.ready && window.__SPARK_QA__.world.prism.ready));
  const startFrame = await page.evaluate(() => window.__SPARK_QA__.world.frame); await page.waitForTimeout(900);
  check('Canvas is continuously rendering', await page.evaluate(n => window.__SPARK_QA__.world.frame > n + 5, startFrame));
  await click('start'); await shot('02-battle-desktop');
  if(process.argv.includes('--thumbnail')) await page.screenshot({path:resolve('sparkbound/assets/module-preview.jpg'),type:'jpeg',quality:90,style:'#topbar,#hud,#interface,#scene-caption{visibility:hidden!important}#game:after{display:none}'});
  await page.setViewportSize({ width: 390, height: 844 }); await shot('03-battle-mobile');
  await page.setViewportSize({ width: 1024, height: 768 }); await shot('04-battle-tablet');
  await page.setViewportSize({ width: 1440, height: 1000 });
  if (process.argv.includes('--art-only')) { check('Art gate captures created'); }
  else {
    await click('settings'); check('Settings opens', await page.locator('dialog').isVisible());
    await page.keyboard.press('Escape'); check('Escape closes settings', !await page.locator('dialog').isVisible());
    await click('pause'); check('Pause dialog opens', await page.locator('dialog').isVisible());
    await click('close-dialog'); await click('exit'); await click('close-dialog');
    let guardProof = false, breakProof = false, wrongChecked = false;
    for (let n = 0; n < 110; n++) {
      const s = await state(), m = s.match;
      if (m.phase === 'victory') break;
      if (m.phase === 'battle') {
        const p = await privateState();
        let move;
        if (!guardProof && m.round === 1 && m.intent === 'guard') { move = 'strike'; guardProof = true; }
        else if (!breakProof && m.staff && m.intent === 'guard' && m.energy >= 2) { move = 'break'; breakProof = true; }
        else move = ['strike','guard','break','special'].flatMap(move => { try { const next = applyAction(p,{type:'move',move}).match; return [{move, score:next.phase==='defeat'?-10000:next.phase==='round_won'?10000:(m.rivalHP-next.rivalHP)*5-(m.playerHP-next.playerHP)*3+next.energy}]; } catch { return []; } }).sort((a,b)=>b.score-a.score)[0].move;
        await page.locator(`[data-move="${move}"]`).click();
        if (move === 'break' || n === 0) { await page.waitForTimeout(850); await shot(`exchange-${n}-${move}`); }
        await settled();
      } else if (m.phase === 'training') {
        const q = (await privateState()).match.questions[m.questionIndex];
        await shot(`forge-${m.questionIndex}-desktop`);
        await page.setViewportSize({width:390,height:844}); await shot(`forge-${m.questionIndex}-mobile`); await page.setViewportSize({width:1440,height:1000});
        if (!wrongChecked && q.type === 'numeric') {
          await page.locator('[data-key="9"]').click(); await click('answer');
          check('Wrong answer shows earned clue', await page.locator('.feedback').isVisible());
          await click('hint'); check('Worked support available', (await state()).match.questions[m.questionIndex].hintsUsed === 2);
          await page.locator('[data-key="clear"]').click(); wrongChecked = true;
        }
        if(q.type==='numeric') for (const digit of String(q.answer)) await page.locator(`[data-key="${digit}"]`).click();
        else if(q.type==='order') for(const id of q.answer) await page.locator(`[data-action="order"][data-choice="${id}"]`).click();
        else await page.locator(`[data-action="choose"][data-choice="${q.answer}"]`).click();
        await click('answer');
        if(await page.locator('[data-action="acknowledge"]').count()) await click('acknowledge');
      } else if (m.phase === 'defeat') { await click('retry-supported'); }
      else { await shot(`phase-${m.round}-${m.phase}`); await click('continue'); }
    }
    check('Three rounds and four tasks reach victory', (await state()).match.phase === 'victory');
    check('Blocked strike and guard-piercing staff exercised', guardProof && breakProof);
    await shot('victory');
    const saved = await state(); await page.reload(); await settled(); check('Victory survives refresh', (await state()).version === saved.version && (await state()).wins === saved.wins);
    await click('review'); check('Completed training review has four tasks', await page.locator('.review-item').count() === 4);
    await page.goBack(); await settled(); check('Back returns to arena', await page.locator('.review-panel').count() === 0);
    await click('settings'); await click('restart'); await click('close-dialog'); check('Cancelled restart changes nothing', (await state()).version === saved.version);
    await click('settings'); await click('restart'); await click('confirm-restart');
    check('Restart preserves wins and evidence', (await state()).wins === saved.wins && (await state()).history.length >= 1);
  }
  console.log('Browser errors:', errors);
  check('No browser errors', errors.length === 0);
  await writeFile(resolve(output,process.argv.includes('--art-only')?'art-report.json':'report.json'), JSON.stringify({checks,errors,origin:harness.origin},null,2));
  console.log(JSON.stringify({checks,errors,output},null,2));
} finally { await browser.close(); await harness.close(); }
