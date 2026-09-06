import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { createState, applyAction } from '../functions/_lib/sparkbound.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const { chromium } = createRequire(import.meta.url)('playwright');
const output = resolve(root, '../outputs/sparkbound-build', process.env.BQ_DUEL_QA_RUN || 'duel-qa');
const viewports = [
  { name: 'small-phone', width: 320, height: 568 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'landscape', width: 844, height: 390 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'narrow-mobile', width: 360, height: 740 }
];
const checks = [], failures = [], errors = [], screenshots = [], layouts = [], canvases = [];
const check = (label, condition, detail) => {
  checks.push({ label, passed: !!condition });
  if (!condition) {
    failures.push({ label, detail });
    console.error(`FAIL ${label}: ${JSON.stringify(detail ?? '')}`);
  }
};
await mkdir(output, { recursive: true });
const bundleHash = createHash('sha256').update(await readFile(resolve(root, 'sparkbound/game.js'))).digest('hex');
const cssHash = createHash('sha256').update(await readFile(resolve(root, 'sparkbound/sparkbound.css'))).digest('hex');
const harness = await startSparkboundQa({ port: 0 });
const f = harness.fixture;
let browser;

// Fixture progression uses the actual server rules; only isolated D1 is written.
function bestStep(s) {
  const m = s.match;
  if (m.phase === 'battle') {
    return ['strike', 'guard', 'break', 'special'].flatMap(move => {
      try {
        const next = applyAction(s, { type: 'move', move }), n = next.match;
        return [{ next, score: n.phase === 'defeat' ? -10000 : n.phase === 'round_won' ? 10000 :
          (m.rivalHP - n.rivalHP) * 5 - (m.playerHP - n.playerHP) * 3 + n.energy }];
      } catch { return []; }
    }).sort((a, b) => b.score - a.score)[0].next;
  }
  if (m.phase === 'training') {
    const q = m.questions[m.questionIndex];
    return applyAction(s, { type: 'answer', questionId: q.id, answer: q.answer });
  }
  return applyAction(s, m.phase === 'defeat' ? { type: 'retry', support: true } : { type: 'continue' });
}

try {
  browser = await chromium.launch({
    executablePath: process.env.BQ_QA_CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true, args: ['--mute-audio']
  });
  const context = await browser.newContext({ viewport: viewports[0], deviceScaleFactor: 1 });
  await context.addCookies([{ name: 'bq_session', value: f.cookie.value, url: harness.origin }]);
  await context.addInitScript(id => localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true'), f.childId);
  await context.addInitScript(cap => {
    sessionStorage.setItem('brightQuestChildCapability', cap);
    // Initialise once so reload really exercises persisted cue preferences.
    if (!localStorage.getItem('bqSparkSettings')) {
      localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, volume: 0, reduced: false }));
    }
  }, f.childCapability);
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  page.on('requestfailed', r => errors.push(`${r.failure()?.errorText} ${r.url()}`));
  const settled = () => page.waitForFunction(() => window.__SPARK_QA__ && !window.__SPARK_QA__.acting &&
    document.querySelector('#game').getAttribute('aria-busy') === 'false', { timeout: 30000 });
  const state = () => page.evaluate(() => window.__SPARK_QA__.state);
  const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
  const privateState = async () => JSON.parse((await harness.db.prepare(
    'SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?'
  ).bind(f.familyId, f.childId).first()).state_json);
  const seed = async s => {
    const now = new Date().toISOString();
    await harness.db.prepare('INSERT INTO sparkbound_states(family_id,child_id,version,state_json,last_operation_id,created_at,updated_at) VALUES(?,?,?,?,NULL,?,?) ON CONFLICT(family_id,child_id) DO UPDATE SET version=excluded.version,state_json=excluded.state_json,last_operation_id=NULL')
      .bind(f.familyId, f.childId, s.version, JSON.stringify(s), now, now).run();
    await page.goto(`${harness.origin}/sparkbound/`); await settled();
  };
  const shot = async name => {
    const path = resolve(output, `${name}.png`);
    await page.screenshot({ path }); screenshots.push(path);
    console.log(`SCREENSHOT ${path}`);
  };
  async function geometry(name, battle = true) {
    await page.waitForTimeout(500);
    await shot(name);
    const result = await page.evaluate(battle => {
      const issues = [], rect = el => el.getBoundingClientRect();
      const visible = el => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && rect(el).width > 0 && rect(el).height > 0;
      const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
        Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
      const inside = (a, b) => a.left >= b.left - 2 && a.right <= b.right + 2 && a.top >= b.top - 2 && a.bottom <= b.bottom + 2;
      const viewport = { left: 0, right: innerWidth, top: 0, bottom: innerHeight };
      const label = el => el.dataset.move || el.dataset.action || el.className || el.tagName;
      const controls = [...document.querySelectorAll('#game button,#game a')].filter(visible);
      for (const el of controls) {
        if (!inside(rect(el), viewport)) issues.push(`Control outside viewport: ${label(el)}`);
      }
      for (let i = 0; i < controls.length; i++) for (let j = i + 1; j < controls.length; j++) {
        if (overlap(rect(controls[i]), rect(controls[j]))) issues.push(`Controls overlap: ${label(controls[i])} / ${label(controls[j])}`);
      }
      const text = [], walker = document.createTreeWalker(document.querySelector('#game'), NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode, parent = node.parentElement;
        if (!node.textContent.trim() || !visible(parent) || parent.closest('svg,script,style,#loading')) continue;
        const range = document.createRange(); range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (!r.width || !r.height) continue;
          const entry = { r, parent, node, text: node.textContent.trim() };
          text.push(entry);
          if (!inside(r, viewport)) issues.push(`Text outside viewport: ${entry.text}`);
          const control = parent.closest('button,a');
          if (control && !inside(r, rect(control))) issues.push(`Text outside control: ${entry.text}`);
          for (const other of controls) if (!other.contains(parent) && overlap(r, rect(other))) issues.push(`Text covers control: ${entry.text} / ${label(other)}`);
        }
      }
      for (let i = 0; i < text.length; i++) for (let j = i + 1; j < text.length; j++) {
        // Font bounding boxes on adjacent lines of one text node can overlap
        // without painted glyphs overlapping. Compare independent text runs.
        if (text[i].node !== text[j].node && overlap(text[i].r, text[j].r)) issues.push(`Text overlap: ${text[i].text} / ${text[j].text}`);
      }
      if (battle) {
        const regions = [...document.querySelectorAll('.hero-hud,.round-chip,.intent,.exchange-recap,.turn-status,.moves')].filter(visible);
        for (let i = 0; i < regions.length; i++) for (let j = i + 1; j < regions.length; j++) {
          if (overlap(rect(regions[i]), rect(regions[j]))) issues.push(`Battle regions overlap: ${label(regions[i])} / ${label(regions[j])}`);
        }
      }
      const heroBounds = [];
      if (document.querySelector(battle ? '.battle-console' : '.welcome')) {
        const w = window.__SPARK_QA__.world, canvas = rect(document.querySelector('#scene'));
        const consoleRect = rect(document.querySelector(battle ? '.battle-console' : '.welcome'));
        const overlays = [...document.querySelectorAll(battle ? '#topbar,.hero-hud,.round-chip,.intent,.battle-console' : '#topbar,.welcome')].filter(visible);
        for (const name of ['relay', 'prism']) {
          const bounds = w[name].visualBounds(), points = [];
          for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
            const p = bounds.min.clone().set(x, y, z).project(w.camera);
            points.push({ x: canvas.left + (p.x + 1) * canvas.width / 2, y: canvas.top + (1 - p.y) * canvas.height / 2 });
          }
          const b = { left: Math.min(...points.map(p => p.x)), right: Math.max(...points.map(p => p.x)), top: Math.min(...points.map(p => p.y)), bottom: Math.max(...points.map(p => p.y)) };
          const intent = document.querySelector('.intent');
          heroBounds.push({ name, ...b, overlay: battle ? 'battle-console' : 'welcome', consoleTop: consoleRect.top,
            intersectsConsole: overlap(b, consoleRect), intersectsIntent: !!intent && overlap(b, rect(intent)),
            clipped: !inside(b, viewport), collisions: overlays.filter(el => overlap(b, rect(el))).map(el => ({
              overlay: el.id || label(el), top: rect(el).top, bottom: rect(el).bottom, left: rect(el).left, right: rect(el).right
            })) });
        }
      }
      return { viewport: { width: innerWidth, height: innerHeight }, issues: [...new Set(issues)], heroBounds, overflow: document.documentElement.scrollWidth > innerWidth };
    }, battle);
    layouts.push({ name, ...result });
    check(`${name}: no text/control overlap or clipping`, !result.issues.length && !result.overflow, result.issues);
    check(`${name}: both heroes fit without UI intersections`, result.heroBounds.length === 2 &&
      result.heroBounds.every(hero => !hero.clipped && hero.collisions.length === 0), result.heroBounds);
    return result;
  }
  async function canvasCheck(name) {
    const sample = () => page.evaluate(() => {
      const w = window.__SPARK_QA__.world;
      w.renderer.render(w.scene, w.camera);
      const gl = w.renderer.getContext(), width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
      const bytes = new Uint8Array(width * height * 4);
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
      let hash = 2166136261; const colours = new Set();
      for (let i = 0; i < bytes.length; i += 64) {
        hash = Math.imul(hash ^ bytes[i], 16777619) >>> 0;
        colours.add(`${bytes[i]},${bytes[i + 1]},${bytes[i + 2]}`);
      }
      return { hash, colours: colours.size, frame: w.frame, ready: w.relay.ready && w.prism.ready };
    });
    const before = await sample(); await page.waitForTimeout(700); const after = await sample();
    canvases.push({ name, before, after });
    check(`${name}: both models ready and canvas nonblank`, before.ready && after.colours > 100, after);
    check(`${name}: canvas pixels move`, after.frame > before.frame + 2 && after.hash !== before.hash, { before, after });
  }

  await page.goto(`${harness.origin}/sparkbound/`); await settled();
  assert.equal(await page.locator('.welcome').count(), 1, 'Expected new welcome screen in the built bundle');
  const welcome = await page.locator('.welcome').innerText();
  check('Welcome explicitly states mission, three rounds, maths and science upgrades', /city guardian/i.test(welcome) && /three rounds/i.test(welcome) && /maths/i.test(welcome) && /science/i.test(welcome));
  for (const viewport of viewports) { await page.setViewportSize(viewport); await geometry(`welcome-${viewport.name}`, false); }
  await click('how'); check('Mission explains both shield win/loss conditions', /Empty Prism's shield/i.test(await page.locator('dialog').innerText()) && /keeping your own above zero/i.test(await page.locator('dialog').innerText()));
  await click('close-dialog'); await click('start');
  const rounds = new Map(), training = new Map();
  let fixture = await privateState();
  for (let n = 0; n < 200 && fixture.match.phase !== 'victory'; n++) {
    if (fixture.match.phase === 'battle' && !rounds.has(fixture.match.round)) rounds.set(fixture.match.round, structuredClone(fixture));
    if (fixture.match.phase === 'training' && !training.has(fixture.match.trainingStage)) training.set(fixture.match.trainingStage, structuredClone(fixture));
    fixture = bestStep(fixture);
  }
  assert.equal(rounds.size, 3, 'All real equipment progression states reached');
  for (const [round, saved] of rounds) {
    await seed(saved);
    const m = saved.match, expected = round === 1 ? ['strike', 'guard'] : round === 2 ? ['strike', 'guard', 'break'] : ['strike', 'guard', 'break', 'special'];
    check(`Round ${round}: exact visible unlocked moves`, JSON.stringify(await page.locator('[data-move]').evaluateAll(nodes => nodes.map(n => n.dataset.move))) === JSON.stringify(expected));
    check(`Round ${round}: shield is primary, no power/HP clutter`, await page.locator('.shield-track[role="progressbar"]').count() === 2 && !/\bpower\b|\bHP\b/i.test(await page.locator('#hud').innerText()));
    for (const [label, value] of [['Relay', m.playerHP], ['Prism', m.rivalHP]]) check(`Round ${round}: ${label} shield matches server`, Number(await page.getByRole('progressbar', { name: `${label} shield` }).getAttribute('aria-valuenow')) === value);
    check(`Round ${round}: explicit objective`, /empty prism.s shield/i.test(await page.locator('.round-chip').innerText()));
    check(`Round ${round}: energy readout and filled cells match server`, await page.locator('.energy-meter').getAttribute('aria-label') === `Energy ${m.energy} of 4` && await page.locator('.energy-cells .charged').count() === m.energy);
    check(`Round ${round}: no locked move clutter`, !/locked|forge required/i.test(await page.locator('.moves').innerText()));
    for (const viewport of viewports) {
      await page.setViewportSize(viewport); await geometry(`round-${round}-${viewport.name}`); await canvasCheck(`round-${round}-${viewport.name}`);
    }
  }

  await page.setViewportSize(viewports[4]);
  for (const intent of ['open', 'strike', 'guard', 'heavy']) for (const energy of [0, 3, 4]) {
    const saved = structuredClone(rounds.get(3)); Object.assign(saved.match, { intent, energy }); await seed(saved);
    const expected = ['heavy', 'strike'].includes(intent) ? 'guard' : intent === 'guard' ? energy >= 2 ? 'break' : 'guard' : energy >= 4 ? 'special' : energy >= 2 ? 'break' : 'strike';
    check(`${intent}, energy ${energy}: contextual cue`, await page.locator('.move.suggested').count() === 1 && await page.locator('.move.suggested').getAttribute('data-move') === expected);
    check(`${intent}, energy ${energy}: not forced`, await page.locator('[data-move="strike"]').isEnabled() && await page.locator('[data-move="guard"]').isEnabled());
    check(`${intent}, energy ${energy}: costs enforced`, await page.locator('[data-move="break"]').isDisabled() === (energy < 2) && await page.locator('[data-move="special"]').isDisabled() === (energy < 4));
    for (const move of ['strike', 'guard']) {
      const delta = applyAction(saved, { type: 'move', move }).match.energy - energy;
      const hint = await page.locator(`[data-move="${move}"] small`).innerText();
      const advertised = /\+(\d+) energy/.exec(hint);
      check(`${intent}, energy ${energy}: ${move} advertises actual server energy gain`, (advertised ? Number(advertised[1]) : 0) === delta &&
        (delta > 0 || (move === 'guard' && intent === 'open' ? /no hit to block/i.test(hint) : /energy full/i.test(hint))), { hint, delta });
    }
    await shot(`cue-${intent}-${energy}`);
    if (energy === 0) {
      await page.setViewportSize(viewports[0]);
      await geometry(`cue-${intent}-low-energy-small-phone`);
      await page.setViewportSize(viewports[4]);
    }
  }

  await seed(rounds.get(1));
  const version = (await state()).version;
  await click('settings'); check('Cues initially enabled', await page.locator('#cues-setting').isChecked());
  await page.locator('#cues-setting').uncheck(); await click('save-settings');
  check('Cues switch off immediately but intent remains', await page.locator('.move.suggested').count() === 0 && await page.locator('.intent strong').isVisible() && await page.locator('.intent small').count() === 0);
  await page.reload(); await settled();
  check('Cues off persists on reload', await page.locator('.move.suggested').count() === 0 && await page.evaluate(() => JSON.parse(localStorage.getItem('bqSparkSettings')).cues === false));
  await click('settings'); check('Settings reflects persisted cues off', !await page.locator('#cues-setting').isChecked());
  await page.locator('#cues-setting').check(); await click('save-settings'); await page.reload(); await settled();
  check('Cues on also persists', await page.locator('.move.suggested').count() === 1);
  check('Preferences do not advance match', (await state()).version === version);
  await page.locator('[data-move="guard"]').click(); await settled();
  const noHit = await state(), recap = await page.locator('.exchange-recap').innerText();
  check('Non-suggested guard executes without coercion', noHit.match.lastEvent.move === 'guard' && noHit.version === version + 1);
  check('No-hit guard recap is factual', /no incoming hit/i.test(recap) && /neither shield changed/i.test(recap) && noHit.match.energy === rounds.get(1).match.energy);
  await page.waitForTimeout(5200);
  check('Exchange recap persists beyond transient messages', await page.locator('.exchange-recap').innerText() === recap);
  await click('settings'); await click('close-dialog'); await page.reload(); await settled();
  check('Server exchange recap survives settings and reload', await page.locator('.exchange-recap').innerText() === recap);
  await page.setViewportSize(viewports[0]); await geometry('zero-hit-recap-small-phone');
  const prior = await state(); await page.locator('[data-move="strike"]').click(); await settled();
  const after = await state(), event = after.match.lastEvent;
  check('Ordinary recap reports exact server shield losses', (await page.locator('.exchange-recap span').innerText()) === `Prism lost ${event.damage} shield. You lost ${event.rivalDamage}.` && event.damage === prior.match.rivalHP - after.match.rivalHP && event.rivalDamage === prior.match.playerHP - after.match.playerHP);

  await seed(training.get(1));
  const q = (await privateState()).match.questions[0];
  assert.equal(q.type, 'numeric', 'First synthetic maths question supports keypad regression');
  const wrong = q.answer === 9 ? '8' : '9';
  await page.locator(`[data-key="${wrong}"]`).click(); await click('answer');
  check('Wrong answer retains useful clue', await page.locator('.feedback.wrong').isVisible() && (await state()).match.questions[0].hintsUsed === 1);
  await click('hint'); check('Worked support remains available', /worked support/i.test(await page.locator('.feedback').innerText()) && (await state()).match.questions[0].hintsUsed === 2);
  await shot('wrong-worked-support-small-phone');
  await page.locator('[data-key="clear"]').click();
  for (const digit of String(q.answer)) await page.locator(`[data-key="${digit}"]`).click();
  await click('answer'); await click('acknowledge');
  const corrected = await privateState();
  check('Original wrong attempt and worked completion retained', corrected.match.questions[0].attempts[0].answer === wrong && corrected.match.questions[0].completion === 'worked');
  const reviewResponse = await context.request.get(`${harness.origin}/api/sparkbound?childId=${f.childId}`, { headers: { 'x-bq-parent-capability': f.parentCapability } });
  check('Parent evidence endpoint remains authorised', reviewResponse.status() === 200);
  const review = await reviewResponse.json();
  check('Parent receives original wrong answer plus correction', review.state?.match.questions[0].attempts.length === 2 && review.state.match.questions[0].attempts[0].answer === wrong);
  const denied = await context.request.get(`${harness.origin}/api/sparkbound?childId=${f.childId}`);
  check('Child cannot request parent evidence', denied.status() === 403);
  // Exercise the real parent-review module in a separate page with synthetic auth.
  const parent = await context.newPage();
  parent.on('pageerror', e => errors.push(e.message));
  parent.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
  await parent.goto(`${harness.origin}/sparkbound/`);
  await parent.evaluate(async ({ cap, id }) => {
    window.BrightQuestFamilyAuth = { requestHeaders: () => ({ 'x-bq-parent-capability': cap }) };
    const module = await import('/sparkbound-parent.js');
    module.openSparkboundReview({ profile: { id, name: 'Synthetic QA Explorer' }, opener: null, isCurrent: () => true });
  }, { cap: f.parentCapability, id: f.legacyId });
  await parent.locator('.bq-spark-question.missed').waitFor();
  check('Parent review visually retains incorrect-answer record', /incorrect answers/i.test(await parent.locator('#bqSparkboundReviewPopup').innerText()));
  const parentPath = resolve(output, 'parent-wrong-answer-review.png');
  await parent.screenshot({ path: parentPath }); screenshots.push(parentPath);
  await parent.locator('[data-spark-review-close]').click();
  check('Parent review closes', await parent.locator('#bqSparkboundReviewPopup').count() === 0);
  await parent.close();
  check('QA remains muted', await page.evaluate(() => { const p = JSON.parse(localStorage.getItem('bqSparkSettings')); return p.sound === false && p.volume === 0; }));
  check('No browser/runtime/network errors', errors.length === 0, errors);
} catch (error) {
  failures.push({ label: 'Harness or blocking assertion', detail: error.stack });
  console.error(error);
} finally {
  if (browser) await browser.close();
  await harness.close();
  const endingHash = createHash('sha256').update(await readFile(resolve(root, 'sparkbound/game.js'))).digest('hex');
  const endingCssHash = createHash('sha256').update(await readFile(resolve(root, 'sparkbound/sparkbound.css'))).digest('hex');
  check('Tested bundle and CSS stayed unchanged during QA', bundleHash === endingHash && cssHash === endingCssHash,
    { bundleHash, endingHash, cssHash, endingCssHash });
  const report = { bundleHash, endingHash, cssHash, endingCssHash, bundleChangedDuringRun: bundleHash !== endingHash,
    cssChangedDuringRun: cssHash !== endingCssHash, checks, failures, errors, screenshots, layouts, canvases, output };
  await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: checks.filter(c => c.passed).length, failed: failures.length, bundleHash, cssHash,
    bundleChangedDuringRun: report.bundleChangedDuringRun, cssChangedDuringRun: report.cssChangedDuringRun, output }, null, 2));
  if (failures.length) process.exitCode = 1;
}
