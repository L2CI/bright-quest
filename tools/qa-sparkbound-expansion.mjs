import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { HEROES } from '../sparkbound/roster.js';
import { createState, applyAction } from '../functions/_lib/sparkbound.js';
import { EXPANDED_QUESTION_BANK } from '../functions/_lib/sparkbound-expansion-content.js';
const require = createRequire(import.meta.url), { chromium } = require('playwright');
const output = resolve('../outputs/sparkbound-build/expansion-qa');
await mkdir(output, { recursive: true });
const harness = await startSparkboundQa({ port: 0 }), f = harness.fixture;
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.addCookies([{ name: 'bq_session', value: f.cookie.value, url: harness.origin }]);
await context.addInitScript(({ id, cap }) => {
  localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true');
  sessionStorage.setItem('brightQuestChildCapability', cap);
  localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, reduced: false, volume: .4 }));
}, { id: f.childId, cap: f.childCapability });
const page = await context.newPage(), errors = [], checks = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
const check = (name, value = true) => { assert.ok(value, name); checks.push(name); };
const settled = () => page.waitForFunction(() => window.__SPARK_QA__ && !window.__SPARK_QA__.acting && document.querySelector('#game').getAttribute('aria-busy') === 'false', { timeout: 25000 });
const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
const state = () => page.evaluate(() => window.__SPARK_QA__.state);
const shot = async name => { await page.waitForTimeout(500); await page.screenshot({ path: resolve(output, `${name}.png`) }); };
async function layout(name) {
  const problems = await page.evaluate(() => {
    const visible = e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
    const panel = document.querySelector('.hangar-panel,.path-panel');
    const r = panel.getBoundingClientRect();
    const bad = [];
    if (r.left < 0 || r.right > innerWidth + 1 || r.top < 0 || r.bottom > innerHeight + 1) bad.push('panel outside viewport');
    if (panel.scrollWidth > panel.clientWidth + 2) bad.push('horizontal panel overflow');
    for (const e of panel.querySelectorAll('button,h1,h2,h3')) if (visible(e) && e.scrollWidth > e.clientWidth + 2) bad.push(`text overflow: ${e.textContent}`);
    const w = window.__SPARK_QA__.world;
    w.renderer.render(w.scene, w.camera);
    const canvas = document.createElement('canvas'); canvas.width = 100; canvas.height = 100;
    const c = canvas.getContext('2d'); c.drawImage(document.querySelector('#scene'), 0, 0, 100, 100);
    const pixels = c.getImageData(0, 0, 100, 100).data;
    const values = new Set(); for (let i = 0; i < pixels.length; i += 4) values.add(`${pixels[i]},${pixels[i+1]},${pixels[i+2]}`);
    if (values.size < 100) bad.push('canvas lacks rendered detail');
    return bad;
  });
  check(`${name}: responsive bounds, text and nonblank canvas`, problems.length === 0 || (console.log(problems), false));
}
try {
  await page.goto(`${harness.origin}/sparkbound/`); await settled();
  check('Six selectable heroes on first screen', await page.locator('.hero-tile').count() === 6);
  for (const hero of HEROES) {
    await page.locator(`[data-hero="${hero.id}"]`).click();
    for (let stage = 0; stage < 3; stage++) {
      await page.locator(`[data-stage="${stage}"]`).click();
      check(`${hero.id} preview stage ${stage} is render-only`, !(await state()).match && await page.evaluate(id => window.__SPARK_QA__.world.relay.heroId === id, hero.id));
    }
    await click('path');
    check(`${hero.id}: all three upgrade images load`, await page.locator('.stage-image img').evaluateAll(imgs => imgs.length === 3 && imgs.every(i => i.complete && i.naturalWidth > 100)));
    check(`${hero.id}: two advanced stages locked before start`, await page.locator('.stage-status').allTextContents().then(a => a.filter(x => x.includes('Locked')).length === 2));
    await click('path-back');
  }
  for (const [name, width, height] of [['desktop',1440,1000],['tablet',1024,768],['phone',390,844],['small-phone',320,568],['wide-phone',430,932],['landscape',844,390]]) {
    await page.setViewportSize({ width, height }); await page.waitForTimeout(350);
    await layout(`${name} hangar`); await shot(`${name}-hangar`);
    await click('path'); await layout(`${name} path`); await shot(`${name}-path`);
    await click('path-back');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const hero of HEROES) {
    await page.locator(`[data-hero="${hero.id}"]`).click(); await click('start');
    const s = await state();
    check(`${hero.id}: real match starts at base stage with six questions`, s.match.heroId === hero.id && s.match.questions.length === 6 && !s.match.staff && !s.match.pad);
    check(`${hero.id}: attack and shield immediately available`, await page.locator('[data-move]').count() === 2);
    check(`${hero.id}: HUD names selected hero`, await page.locator('.hero-hud:not(.rival) strong').textContent() === hero.name.toUpperCase());
    await click('settings'); await click('hangar');
    await page.locator(`[data-hero="${hero.id === 'relay' ? 'helio' : 'relay'}"]`).click();
    await page.locator('[data-stage="2"]').click(); await click('path');
    await click('path-back'); await click('arena');
    check(`${hero.id}: inspecting another hero cannot equip or change active match`, (await state()).version === s.version && await page.evaluate(id => window.__SPARK_QA__.world.relay.heroId === id, hero.id));
    await page.reload(); await settled(); await click('settings'); await click('hangar');
    check(`${hero.id}: next-duel selection survives reload independently`, await page.locator(`.hero-tile[data-hero="${hero.id === 'relay' ? 'helio' : 'relay'}"]`).getAttribute('aria-pressed') === 'true');
    await click('arena');
    await click('settings'); await click('path');
    await page.locator(`[data-hero="${hero.id}"]`).click();
    check(`${hero.id}: path marks actual base equipment`, (await page.locator('.stage-status').first().textContent()).includes('Equipped'));
    await page.goBack(); await settled();
    check(`${hero.id}: browser back restores battle`, await page.locator('[data-move]').count() === 2);
    await click('settings'); await click('restart'); await click('close-dialog');
    check(`${hero.id}: reset cancellation preserves save`, (await state()).version === s.version);
    await click('settings'); await click('restart'); await click('confirm-restart');
    check(`${hero.id}: reset returns to hangar without increasing difficulty`, !(await state()).match && (await state()).wins === 0);
  }
  await click('settings');
  await page.locator('#sound-setting').check(); await page.locator('#music-setting').uncheck(); await page.locator('#effects-setting').check();
  await click('save-settings');
  const prefs = await page.evaluate(() => JSON.parse(localStorage.getItem('bqSparkSettings')));
  check('Independent audio settings persist', prefs.sound && !prefs.music && prefs.effects);
  await click('sound');
  check('Master mute persists', await page.evaluate(() => !JSON.parse(localStorage.getItem('bqSparkSettings')).sound));
  await click('pause'); await page.keyboard.press('Escape'); await click('exit'); await click('close-dialog');
  check('Pause, Escape, exit and cancellation return cleanly', !await page.locator('dialog').isVisible());
  const savedVersion = (await state()).version;
  await click('how'); await click('practice'); await click('guide-skip');
  check('Practice skip starts selected hero with shield available', (await state()).version === savedVersion + 1 && await page.locator('[data-move="guard"]').isVisible());
  async function seed(s) {
    await harness.db.prepare('UPDATE sparkbound_states SET state_json=?,version=?,last_operation_id=NULL WHERE family_id=? AND child_id=?').bind(JSON.stringify(s), s.version, f.familyId, f.childId).run();
    await page.reload(); await settled();
  }
  for (const hero of HEROES) {
    const s = applyAction(createState({ profileId: f.childId }), { type: 'start', heroId: hero.id });
    Object.assign(s.match, { round: 3, staff: true, pad: true, playerHP: 24, rivalHP: 50, energy: 4, intent: 'open', lastEvent: { kind: 'exchange', move: 'strike', intent: 'open', damage: 4, rivalDamage: 0, ability: { id: hero.trait.id, name: hero.trait.name, description: hero.trait.description } } });
    await seed(s); await page.setViewportSize({ width: 320, height: 568 });
    const overflow = await page.locator('.move').evaluateAll(buttons => buttons.flatMap(b => [...b.querySelectorAll('b,small,span')].filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent)));
    check(`${hero.id}: all four advanced move labels fit smallest phone`, overflow.length === 0 || (console.log(overflow), false));
    await shot(`${hero.id}-advanced-phone`);
  }
  for (const level of [1, 2, 3]) for (const type of ['numeric', 'order', 'mcq']) {
    const candidates = EXPANDED_QUESTION_BANK.filter(q => q.learningLevel === level && q.type === type);
    if (!candidates.length) continue;
    const q = candidates.sort((a,b) => (b.prompt.length + b.choices.map(c => c.label).join('').length) - (a.prompt.length + a.choices.map(c => c.label).join('').length))[0];
    const base = createState({ profileId: f.childId }); base.wins = (level - 1) * 2;
    const s = applyAction(base, { type: 'start', heroId: 'helio' });
    Object.assign(s.match, { phase: 'training', trainingStage: q.forge === 'maths' ? 1 : 2, questionIndex: q.slot });
    s.match.questions[q.slot] = { ...structuredClone(q), attempts: [], hintsUsed: 0, supportEvents: [], feedback: null, resolved: false, completion: null };
    await seed(s);
    check(`${level} ${type}: learner sees snapshotted challenge band`, (await page.locator('.forge-top .eyebrow').textContent()).includes(['Foundation','Applied','Stretch'][level-1]));
    for (const [width,height] of [[320,568],[844,390],[1440,1000]]) {
      await page.setViewportSize({ width, height }); await page.waitForTimeout(200);
      const fits = await page.locator('.forge-panel').evaluate(p => p.scrollWidth <= p.clientWidth + 2 && [...p.querySelectorAll('h2,button')].every(e => e.scrollWidth <= e.clientWidth + 2));
      check(`${level} ${type} longest question fits ${width}x${height}`, fits);
      check(`${level} ${type}: entire question readable without nested clipping at ${width}`, await page.locator('.forge-brief').evaluate(e => e.scrollHeight <= e.clientHeight + 2));
      if (width === 320) {
        await shot(`level-${level}-${type}-phone`);
        const target = page.locator(type === 'mcq' ? '[data-action="choose"]' : type === 'order' ? '[data-action="order"]' : '[data-key="1"]').last();
        await target.scrollIntoViewIfNeeded();
        const before = await page.locator('.forge-panel').evaluate(e => e.scrollTop);
        await target.click();
        check(`${level} ${type}: choosing an answer preserves reading position`, Math.abs(await page.locator('.forge-panel').evaluate(e => e.scrollTop) - before) < 3);
        await page.locator('[data-action="answer"]').scrollIntoViewIfNeeded();
        check(`${level} ${type}: confirm remains reachable`, await page.locator('[data-action="answer"]').isVisible());
      }
    }
  }
  check('No browser or asset errors', errors.length === 0);
  await writeFile(resolve(output, 'report.json'), JSON.stringify({ checks, errors }, null, 2));
  console.log(JSON.stringify({ checks: checks.length, errors, output }, null, 2));
} finally { await browser.close(); await harness.close(); }
