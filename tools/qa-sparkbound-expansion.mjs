import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { HEROES } from '../sparkbound/roster.js';
import { createState, applyAction, publicState } from '../functions/_lib/sparkbound.js';
import { EXPANDED_QUESTION_BANK, selectExpandedQuestions } from '../functions/_lib/sparkbound-expansion-content.js';
import { inspectTrue3dRig, assertTrue3dRig, TRUE3D_MODEL } from './qa-sparkbound-true3d.mjs';
const require = createRequire(import.meta.url);
export const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const VIEWPORTS = [['desktop',1440,1000],['tablet',1024,768],['phone',390,844],['small-phone',320,568],['wide-phone',430,932],['landscape',844,390]];
export const CAMPAIGN = { heroes: 11, stages: 6, locked: 5, questions: 15, rounds: 6 };
export const CURRENT_RULES_VERSION = applyAction(createState({ profileId: 'synthetic-qa-version' }), { type: 'start', heroId: 'relay' }).match.rulesVersion;
assert.ok([3, 4].includes(CURRENT_RULES_VERSION), 'Review QA campaign expectations for an unknown rules version');
export const CHALLENGE_BANDS = Object.freeze(['Foundation', 'Applied', 'Stretch', 'Challenge', 'Master']);
const bandName = level => CHALLENGE_BANDS[level - 1];
export function dependency(name) {
  try { return require(name); }
  catch { return require(resolve(process.env.BQ_NODE_MODULES || resolve(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), name)); }
}

async function main() {
assert.ok(process.argv.includes('--bundle-ready'), 'Wait for the user to confirm bundle ready, then pass --bundle-ready. This script never builds.');
const { chromium } = dependency('playwright');
const campaignOnly = process.argv.includes('--campaign-only');
const nonCampaignOnly = process.argv.includes('--non-campaign-only');
assert.ok(!(campaignOnly && nonCampaignOnly), 'Choose only one partial UI scope');
const scope = campaignOnly ? 'campaign-and-recovery' : nonCampaignOnly ? 'non-campaign' : 'full';
const output = resolve(repo, `../outputs/sparkbound-build/${campaignOnly ? 'expansion-campaign-qa' : nonCampaignOnly ? 'expansion-non-campaign-qa' : 'expansion-qa'}`);
const startedAt = new Date().toISOString();
const bundleHash = () => readFile(resolve(repo, 'sparkbound/game.js')).then(bytes => createHash('sha256').update(bytes).digest('hex'));
const bundleSha256 = await bundleHash();
console.log(`Muted UI QA started ${startedAt}; bundle ${bundleSha256}`);
await mkdir(output, { recursive: true });
const harness = await startSparkboundQa({ port: 0 }), f = harness.fixture;
let browser, page;
const errors = [], checks = [], expectedErrors = [], previewEvidence = [];
let expectedFailure = false;
try {
browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, serviceWorkers: 'block' });
await context.addCookies([{ name: 'bq_session', value: f.cookie.value, url: harness.origin }]);
await context.addInitScript(({ id, cap }) => {
  localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true');
  sessionStorage.setItem('brightQuestChildCapability', cap);
  if (!localStorage.getItem('bqSparkSettings')) localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, reduced: false, volume: .4 }));
}, { id: f.childId, cap: f.childCapability });
page = await context.newPage();
page.on('pageerror', e => errors.push(e.message));
page.on('console', e => {
  if (e.type() !== 'error') return;
  const message = e.text();
  const syntheticBootOutage = message.startsWith('Sparkbound boot failed ') && message.includes('Synthetic boot outage');
  (expectedFailure && (message.includes('Failed to load resource') || syntheticBootOutage) ? expectedErrors : errors).push(message);
});
page.on('response', r => { if (r.status() >= 400) (expectedFailure && new URL(r.url()).pathname === '/api/sparkbound' ? expectedErrors : errors).push(`${r.status()} ${r.url()}`); });
page.on('requestfailed', r => errors.push(`${r.failure()?.errorText} ${r.url()}`));
const check = (name, value = true) => { assert.ok(value, name); checks.push(name); };
const settled = () => page.waitForFunction(() => window.__SPARK_QA__ && !window.__SPARK_QA__.acting && document.querySelector('#game').getAttribute('aria-busy') === 'false', null, { timeout: 45000 });
const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
const state = () => page.evaluate(() => window.__SPARK_QA__.state);
const privateState = async () => JSON.parse((await harness.db.prepare('SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?').bind(f.familyId, f.childId).first()).state_json);
const shot = async name => { await page.waitForTimeout(500); await page.screenshot({ path: resolve(output, `${name}.png`) }); };
async function seed(s) {
  publicState(s);
  // A fixture rewind must reset the matching ephemeral operation ledger as well.
  await harness.db.prepare('DELETE FROM sparkbound_operations WHERE family_id=? AND child_id=?').bind(f.familyId, f.childId).run();
  await harness.db.prepare('UPDATE sparkbound_states SET state_json=?,version=?,last_operation_id=NULL WHERE family_id=? AND child_id=?').bind(JSON.stringify(s), s.version, f.familyId, f.childId).run();
  await page.reload(); await settled();
}
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
  await page.goto(`${harness.origin}/sparkbound/`); await settled();
  if (campaignOnly) await click('start');
  else {
  check('Eleven selectable heroes on first screen', HEROES.length === CAMPAIGN.heroes && await page.locator('.hero-tile').count() === CAMPAIGN.heroes);
  for (const hero of HEROES) {
    await page.locator(`[data-hero="${hero.id}"]`).click();
    for (let stage = 0; stage < CAMPAIGN.stages; stage++) {
      await page.locator(`[data-stage="${stage}"]`).click();
      await page.waitForFunction(({ id, stage, model }) => {
        const relay = window.__SPARK_QA__?.world?.relay;
        return relay?.ready && relay.imageActive === false && relay.root.userData.model === model
          && relay.root.userData.heroId === id && relay.root.userData.equipmentStage === stage;
      }, { id: hero.id, stage, model: TRUE3D_MODEL }, { timeout: 45000 });
      const rigHandle = await page.evaluateHandle(() => window.__SPARK_QA__.world.relay);
      let art;
      try { art = await rigHandle.evaluate(inspectTrue3dRig); }
      finally { await rigHandle.dispose(); }
      previewEvidence.push({ hero: hero.id, previewStage: stage, screenshot: `${hero.id}-preview-${stage}.png`, ...art });
      assertTrue3dRig(art, check, `${hero.id} preview ${stage}`, { id: hero.id, stage });
      if (stage > 0) check(`${hero.id} preview ${stage}: equipment geometry changes`, previewEvidence.at(-2).geometrySignature !== art.geometrySignature);
      check(`${hero.id} preview stage ${stage} is render-only`, !(await state()).match && await page.evaluate(id => window.__SPARK_QA__.world.relay.heroId === id, hero.id)
        && (await page.locator('.preview-name').textContent()).includes(hero.weapons[stage].name)
        && await page.locator(`[data-stage="${stage}"]`).getAttribute('aria-pressed') === 'true');
      await layout(`${hero.id} preview ${stage}`); await shot(`${hero.id}-preview-${stage}`);
    }
    await click('path');
    await page.waitForFunction(count => [...document.querySelectorAll('.stage-image img')].length === count && [...document.querySelectorAll('.stage-image img')].every(i => i.complete && i.naturalWidth > 100), CAMPAIGN.stages);
    check(`${hero.id}: all six upgrade images load`, await page.locator('.stage-image img').count() === CAMPAIGN.stages);
    check(`${hero.id}: five advanced stages locked before start`, await page.locator('.stage-status').allTextContents().then(a => a.filter(x => x.includes('Locked')).length === CAMPAIGN.locked));
    check(`${hero.id}: Prism has six arsenal stages`, await page.locator('.prism-path li').count() === CAMPAIGN.stages);
    await click('path-back');
    console.log(`Six previews and path passed: ${hero.id}`);
  }
  check('All 66 articulated hero previews have identity and volumetric geometry evidence', previewEvidence.length === CAMPAIGN.heroes * CAMPAIGN.stages);
  for (const [name, width, height] of VIEWPORTS) {
    await page.setViewportSize({ width, height }); await page.waitForTimeout(350);
    await layout(`${name} hangar`); await shot(`${name}-hangar`);
    if (['desktop', 'tablet', 'phone'].includes(name)) await verifyInspectionControls({ page, state, check, shot, label: name, touch: name !== 'desktop' });
    await click('path'); await layout(`${name} path`); await shot(`${name}-path`);
    await click('path-back');
    await click('settings'); await assertPanelFits(page, 'dialog', check, `${name} settings`); await shot(`${name}-settings`); await click('save-settings');
    await click('how'); await assertPanelFits(page, 'dialog', check, `${name} mission`); await shot(`${name}-mission`); await click('close-dialog');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const hero of HEROES) {
    await page.locator(`[data-hero="${hero.id}"]`).click(); await click('start');
    const s = await state();
    check(`${hero.id}: real v${CURRENT_RULES_VERSION} match starts at base stage with fifteen questions and six rounds`, s.match.heroId === hero.id && s.match.rulesVersion === CURRENT_RULES_VERSION && s.match.upgradeStage === 0 && s.match.questions.length === CAMPAIGN.questions && s.configuration.battle.rounds.length === CAMPAIGN.rounds && !s.match.staff && !s.match.pad);
    check(`${hero.id}: zero-win current campaign starts at Applied`, s.match.learningLevel === 2);
    assertLearnerPrivacy(s, check, `${hero.id} fresh match`);
    check(`${hero.id}: attack and shield immediately available`, await page.locator('[data-move]').count() === 2);
    check(`${hero.id}: HUD names selected hero`, await page.locator('.hero-hud:not(.rival) strong').textContent() === hero.name.toUpperCase());
    await click('settings'); await click('hangar');
    await page.locator(`[data-hero="${hero.id === 'relay' ? 'helio' : 'relay'}"]`).click();
    for (let stage = 0; stage < CAMPAIGN.stages; stage++) await page.locator(`[data-stage="${stage}"]`).click();
    await click('path');
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
    console.log(`Start, save, back paths and reset passed: ${hero.id}`);
  }
  await click('settings');
  await page.locator('#sound-setting').check(); await page.locator('#music-setting').uncheck(); await page.locator('#effects-setting').check();
  await page.locator('#volume-setting').fill('0.15'); await page.locator('#cues-setting').uncheck(); await page.locator('#motion-setting').check();
  await click('save-settings');
  const prefs = await page.evaluate(() => JSON.parse(localStorage.getItem('bqSparkSettings')));
  check('All six settings persist independently', prefs.sound && !prefs.music && prefs.effects && prefs.volume === .15 && !prefs.cues && prefs.reduced);
  await page.reload(); await settled(); await click('settings');
  check('Saved settings restore after reload', await page.locator('#sound-setting').isChecked() && !await page.locator('#music-setting').isChecked() && await page.locator('#effects-setting').isChecked() && await page.locator('#motion-setting').isChecked() && !await page.locator('#cues-setting').isChecked() && await page.locator('#volume-setting').inputValue() === '0.15');
  await page.locator('#music-setting').check(); await page.locator('#effects-setting').uncheck(); await page.locator('#cues-setting').check(); await page.locator('#motion-setting').uncheck(); await click('save-settings');
  await click('sound');
  check('Master mute persists', await page.evaluate(() => !JSON.parse(localStorage.getItem('bqSparkSettings')).sound));
  await click('pause'); await page.keyboard.press('Escape'); await click('exit'); await click('close-dialog');
  check('Pause, Escape, exit and cancellation return cleanly', !await page.locator('dialog').isVisible());
  const savedVersion = (await state()).version;
  await click('how'); await click('practice'); await click('guide-skip');
  check('Practice skip starts selected hero with shield available', (await state()).version === savedVersion + 1 && await page.locator('[data-move="guard"]').isVisible());
  const practiceVersion = (await state()).version;
  await click('settings'); await click('mission'); await click('practice');
  for (const action of ['guide-next', 'guide-next', 'guide-guard', 'guide-next', 'guide-attack', 'guide-finish']) await click(action);
  check('Every practice step returns without changing the save', (await state()).version === practiceVersion);
  await click('pause'); await click('review-dialog'); await click('arena');
  check('Pause review and arena back paths preserve the save', (await state()).version === practiceVersion);
  for (const hero of HEROES) {
    const s = campaignAt(f.childId, hero.id, m => m.round === 6 && m.phase === 'battle');
    Object.assign(s.match, { energy: 4, intent: 'open', lastEvent: { kind: 'exchange', move: 'strike', intent: 'open', damage: 4, rivalDamage: 0, ability: { id: hero.trait.id, name: hero.trait.name, description: hero.trait.description } } });
    await seed(s); await page.setViewportSize({ width: 320, height: 568 });
    const overflow = await page.locator('.move').evaluateAll(buttons => buttons.flatMap(b => [...b.querySelectorAll('b,small,span')].filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.textContent)));
    check(`${hero.id}: all four advanced move labels fit smallest phone`, overflow.length === 0 || (console.log(overflow), false));
    check(`${hero.id}: stage five has all four moves and six round indicators`, await page.locator('[data-move]').count() === 4 && await page.locator('.round-dots i').count() === CAMPAIGN.rounds);
    await shot(`${hero.id}-advanced-phone`);
  }
  await verifyLegacyV3Save({ page, seed, state, settled, check, shot, profileId: f.childId });
  for (const level of [1, 2, 3]) for (const type of ['numeric', 'order', 'mcq']) {
    const candidates = EXPANDED_QUESTION_BANK.filter(q => q.learningLevel === level && q.type === type);
    if (!candidates.length) continue;
    const q = candidates.sort((a,b) => (b.prompt.length + b.choices.map(c => c.label).join('').length) - (a.prompt.length + a.choices.map(c => c.label).join('').length))[0];
    const base = createState({ profileId: f.childId }); base.wins = (level - 1) * 2;
    const s = applyAction(base, { type: 'start' });
    // Preserve the original six-question v2 long-prompt regression, not an invalid current campaign.
    Object.assign(s.match, { heroId: 'helio', rulesVersion: 2, learningLevel: level,
      questions: selectExpandedQuestions(1, 'helio', level).map(question => ({ ...structuredClone(question), attempts: [], hintsUsed: 0, supportEvents: [], feedback: null, resolved: false, completion: null })) });
    Object.assign(s.match, { phase: 'training', trainingStage: q.forge === 'maths' ? 1 : 2, questionIndex: q.slot });
    s.match.questions[q.slot] = { ...structuredClone(q), attempts: [], hintsUsed: 0, supportEvents: [], feedback: null, resolved: false, completion: null };
    await seed(s);
    check(`${level} ${type}: learner sees snapshotted challenge band`, (await page.locator('.forge-top .eyebrow').textContent()).trim().endsWith(`/ ${bandName(level)}`));
    check(`${level} ${type}: legacy save remains v2 with six questions`, (await state()).match.rulesVersion === 2 && (await state()).match.questions.length === 6);
    for (const [name,width,height] of VIEWPORTS) {
      await page.setViewportSize({ width, height }); await page.waitForTimeout(200);
      const fits = await page.locator('.forge-panel').evaluate(p => p.scrollWidth <= p.clientWidth + 2 && [...p.querySelectorAll('h2,button')].every(e => e.scrollWidth <= e.clientWidth + 2));
      check(`${level} ${type} longest question fits ${width}x${height}`, fits);
      check(`${level} ${type}: entire question readable without nested clipping at ${width}`, await page.locator('.forge-brief').evaluate(e => e.scrollHeight <= e.clientHeight + 2));
      await assertPanelFits(page, '.forge-panel', check, `v2 level ${level} ${type} ${name}`);
      await shot(`v2-level-${level}-${type}-${name}`);
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
    await exerciseAnswerControls(page, q, settled, check, `v2 ${level} ${type}`);
  }
  }
  if (nonCampaignOnly) {
    check('No browser or asset errors', errors.length === 0);
    check('Tested bundle stayed unchanged throughout the run', await bundleHash() === bundleSha256);
    console.log(JSON.stringify({ scope, checks: checks.length, errors, output }, null, 2));
    return;
  }
  await verifyHarderCampaignForms({ page, seed, state, settled, check, shot, profileId: f.childId });
  for (const action of ['retry', 'retry-supported']) {
    const s = applyAction(createState({ profileId: f.childId }), { type: 'start', heroId: 'ember' });
    Object.assign(s.match, { phase: 'defeat', playerHP: 0, intent: null }); await seed(s); await click(action);
    check(`${action}: restores the same campaign round`, (await state()).match.round === 1 && (await state()).match.roundAttempt === 2 && (await state()).match.assisted === (action === 'retry-supported'));
  }
  const versionBeforeFailure = (await state()).version;
  expectedFailure = true;
  await page.route('**/api/sparkbound', route => route.request().method() === 'POST'
    ? route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Synthetic save outage' }) }) : route.continue());
  await page.locator('[data-move="strike"]').click(); await settled();
  check('Failed save exposes reconnect and leaves confirmed state intact', await page.locator('[data-action="reconnect"]').isVisible() && (await state()).version === versionBeforeFailure);
  await page.unroute('**/api/sparkbound'); await click('reconnect'); expectedFailure = false;
  check('Reconnect saves the pending action once', (await state()).version === versionBeforeFailure + 1 && !await page.locator('[data-action="reconnect"]').count());
  await page.reload(); await settled(); check('Reconnected save survives reload', (await state()).version === versionBeforeFailure + 1);
  // Exercise the boot recovery button with an isolated, expected failed GET.
  expectedFailure = true;
  await page.route('**/api/sparkbound', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Synthetic boot outage' }) }));
  await page.reload(); await page.locator('[data-action="reload"]').waitFor();
  await page.unroute('**/api/sparkbound'); await page.locator('[data-action="reload"]').click(); await settled(); expectedFailure = false;
  check('Try again recovers boot without losing the saved match', (await state()).version === versionBeforeFailure + 1);
  const journeyBase = createState({ profileId: f.childId });
  Object.assign(journeyBase, { wins: 4, tier: 5 });
  await seed(journeyBase);
  await page.locator('[data-hero="echo"]').click(); await click('start');
  const completed = await runCampaignJourney({ page, settled, state, privateState, check, shot });
  const parent = await context.newPage();
  parent.on('pageerror', e => errors.push(e.message));
  parent.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
  parent.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await verifyParentEvidence({ page: parent, origin: harness.origin, fixture: f, completed, check,
    shot: name => parent.screenshot({ path: resolve(output, `${name}.png`) }) });
  await parent.close();
  await click('review'); check('Learner review contains all fifteen tasks', await page.locator('.review-item').count() === CAMPAIGN.questions);
  for (const [name, width, height] of VIEWPORTS) { await page.setViewportSize({ width, height }); await assertPanelFits(page, '.review-panel', check, `${name} completed review`); await shot(`${name}-completed-review`); }
  await page.goBack(); await settled(); check('Review browser back returns to victory', !await page.locator('.review-panel').count() && (await state()).match.phase === 'victory');
  const saved = await privateState();
  await click('settings'); await click('restart'); await click('close-dialog');
  check('Completed reset cancellation preserves every record', JSON.stringify(await privateState()) === JSON.stringify(saved));
  await click('settings'); await click('restart'); await click('confirm-restart');
  const reset = await privateState();
  check('Confirmed reset preserves wins and all fifteen archived records', !reset.match && reset.wins === saved.wins && JSON.stringify(reset.history.at(-1).questions) === JSON.stringify(saved.match.questions));
  await page.reload(); await settled(); check('Confirmed reset survives reload', !(await state()).match && (await state()).wins === saved.wins);
  check('No browser or asset errors', errors.length === 0);
  check('Tested bundle stayed unchanged throughout the run', await bundleHash() === bundleSha256);
  console.log(JSON.stringify({ checks: checks.length, errors, output }, null, 2));
} catch (error) { errors.push(error.stack); await page?.screenshot({ path: resolve(output, 'failure.png') }).catch(() => {}); throw error; }
finally { await browser?.close(); await harness.close(); await writeFile(resolve(output, 'report.json'), JSON.stringify({ scope, startedAt, finishedAt: new Date().toISOString(), bundleSha256, checks, errors, expectedErrors, previewEvidence, campaign: CAMPAIGN }, null, 2)); }
}

// Only fixture preparation uses domain actions. The full journey below clicks the shipped UI.
export const campaignMove = m => m.intent === 'heavy' ? 'guard' : m.pad && m.energy === 4 ? 'special' :
  m.staff && m.intent === 'guard' && m.energy >= (m.heroId === 'echo' ? 1 : 2) ? 'break' : 'strike';
export function campaignAt(profileId, heroId, predicate, { wins = 0, number = 1 } = {}) {
  const base = createState({ profileId });
  Object.assign(base, { wins, tier: wins + 1, nextMatchNumber: number });
  let s = applyAction(base, { type: 'start', heroId });
  for (let i = 0; i < 400; i++) {
    if (predicate(s.match)) return s;
    const m = s.match, q = m.questions[m.questionIndex];
    assert.notEqual(m.phase, 'defeat', `Fixture defeated: ${heroId} round ${m.round}`);
    s = applyAction(s, m.phase === 'battle' ? { type: 'move', move: campaignMove(m) } :
      m.phase === 'training' ? { type: 'answer', questionId: q.id, answer: q.answer } : { type: 'continue' });
  }
  assert.fail(`Fixture did not reach its target: ${heroId}`);
}

export function assertLearnerPrivacy(saved, check, name) {
  const m = saved.match;
  check(`${name}: no answers in learner history`, saved.history.every(row => !Object.hasOwn(row, 'questions') && !Object.hasOwn(row, 'seed')));
  if (!m) return;
  check(`${name}: hidden battle seed absent`, !Object.hasOwn(m, 'seed'));
  const secretKeys = ['answer', 'normalizedAnswer', 'hints', 'explanation', 'attempts', 'supportEvents'];
  check(`${name}: learner questions omit answer keys and private evidence`, m.questions.every(q => secretKeys.every(key => !Object.hasOwn(q, key))));
  const future = m.questions.filter((q, index) => !q.resolved && !(m.phase === 'training' && index === m.questionIndex));
  check(`${name}: every future task is only an id/forge stub`, future.every(q => JSON.stringify(Object.keys(q).sort()) === JSON.stringify(['forge', 'id']) && typeof q.id === 'string' && ['maths', 'science'].includes(q.forge)));
}

async function assertCurrentBand(page, saved, q, check, name) {
  const current = saved.match.questions[saved.match.questionIndex];
  check(`${name}: current question carries its own challenge band`, current.id === q.id && current.learningLevel === q.learningLevel && current.difficulty === bandName(q.learningLevel));
  const label = (await page.locator('.forge-top .eyebrow').textContent()).trim();
  check(`${name}: learner heading shows ${bandName(q.learningLevel)}, not the starting band`, label.endsWith(`/ ${bandName(q.learningLevel)}`));
}

function longFormCampaignFixture(profileId, template) {
  // Follow legal progression, then substitute one real bank task without changing stage bookkeeping.
  // Master science is a layout boundary fixture even if a current rotation ends with Master maths.
  const forgeStage = template.forge === 'maths' ? 5 : 4;
  for (let number = 1; number <= 8; number++) {
    const s = campaignAt(profileId, 'helio', m => m.phase === 'training' && m.trainingStage === forgeStage && m.questionIndex % 3 === template.slot % 3, { wins: 4, number });
    if (s.match.questions.some((q, index) => index !== s.match.questionIndex && q.id === template.id)) continue;
    s.match.questions[s.match.questionIndex] = { ...structuredClone(template), forgeStage,
      attempts: [], hintsUsed: 0, supportEvents: [], feedback: null, resolved: false, completion: null };
    publicState(s);
    return s;
  }
  assert.fail(`Could not isolate the longest ${template.difficulty} ${template.type} task`);
}

export async function verifyLegacyV3Save({ page, seed, state, settled, check, shot, profileId }) {
  const saved = applyAction(createState({ profileId }), { type: 'start', heroId: 'relay' });
  saved.match.rulesVersion = 3;
  // Legacy battle values are snapshotted, not recalculated using the new campaign table.
  Object.assign(saved.match, { playerHP: 24, maxPlayerHP: 24, rivalHP: 16, playerPower: 10, rivalPower: 10, intent: 'strike' });
  publicState(saved);
  const questionIds = saved.match.questions.map(q => q.id);
  await seed(saved); await page.reload(); await settled();
  let loaded = await state();
  check('Legacy v3 survives reload without upgrade or task replacement', loaded.match.rulesVersion === 3 && JSON.stringify(loaded.match.questions.map(q => q.id)) === JSON.stringify(questionIds));
  const expected = applyAction(saved, { type: 'move', move: 'guard' });
  await page.locator('[data-move="guard"]').click(); await settled();
  loaded = await state();
  check('Legacy v3 accepts a move and retains snapshotted combat results', loaded.match.rulesVersion === 3 && ['playerHP', 'rivalHP', 'energy', 'phase', 'round'].every(key => loaded.match[key] === expected.match[key]));
  await page.reload(); await settled();
  check('Legacy v3 move survives a second reload', (await state()).match.rulesVersion === 3 && (await state()).version === expected.version);
  await shot('legacy-v3-preserved');
}

export async function verifyInspectionControls({ page, state, check, shot, label, touch = false, hook = true }) {
  const before = JSON.stringify(await state());
  const selection = await page.locator('[data-stage][aria-pressed="true"]').getAttribute('data-stage');
  const yaw = () => page.evaluate(() => window.__SPARK_QA__?.world.relay.root.rotation.y ?? null);
  const turn = async (action, delta) => {
    const old = await yaw(); await page.locator(`[data-action="${action}"]`).click();
    if (hook) check(`${label}: ${action} rotates geometry by ${delta}`, Math.abs((await yaw()) - old - delta) < .001);
    await shot(`${label}-${action}`);
  };
  await page.locator('[data-action="rotate-reset"]').click(); const reset = await yaw();
  await turn('rotate-left', -.5); await turn('rotate-right', .5);
  if (hook) check(`${label}: opposite rotations restore orientation`, Math.abs((await yaw()) - reset) < .001);
  await turn('rotate-right', .5);
  await page.locator('[data-action="rotate-reset"]').click();
  if (hook) check(`${label}: reset restores default orientation`, Math.abs((await yaw()) - reset) < .001);
  const points = await page.locator('#scene').evaluate(canvas => {
    const b = canvas.getBoundingClientRect();
    for (let y = Math.max(60, b.top + 30); y < Math.min(innerHeight, b.bottom) - 30; y += 25) {
      for (let x = Math.max(20, b.left + 20); x < Math.min(innerWidth, b.right) - 100; x += 25) {
        if ([0, 25, 50, 75].every(dx => document.elementFromPoint(x + dx, y) === canvas)) return { x, y, endX: x + 75 };
      }
    }
    return null;
  });
  check(`${label}: exposed canvas has a reachable drag area`, points !== null);
  if (points) {
    const old = await yaw();
    if (touch) {
      const cdp = await page.context().newCDPSession(page);
      try {
        await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: points.x, y: points.y, id: 1 }] });
        for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: points.x + (points.endX - points.x) * i / 6, y: points.y, id: 1 }] });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      } finally { await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false }); await cdp.detach(); }
    } else {
      await page.mouse.move(points.x, points.y); await page.mouse.down();
      await page.mouse.move(points.endX, points.y, { steps: 8 }); await page.mouse.up();
    }
    if (hook) check(`${label}: real ${touch ? 'touch' : 'mouse'} drag rotates geometry`, Math.abs((await yaw()) - old) > .1);
    await shot(`${label}-${touch ? 'touch' : 'mouse'}-drag`);
    const released = await yaw(); await page.mouse.move(points.endX + 15, points.y + 10);
    if (hook) check(`${label}: released drag stops rotating`, Math.abs((await yaw()) - released) < .001);
  }
  await page.locator('[data-action="rotate-reset"]').click();
  check(`${label}: rotation leaves save and equipment selection unchanged`, JSON.stringify(await state()) === before && await page.locator('[data-stage][aria-pressed="true"]').getAttribute('data-stage') === selection);
}

export async function verifyHarderCampaignForms({ page, seed, state, settled, check, shot, profileId }) {
  for (const wins of [0, 1, 2, 4, 20]) {
    const base = createState({ profileId }); Object.assign(base, { wins, tier: wins + 1 });
    const fresh = applyAction(base, { type: 'start', heroId: 'helio' });
    check(`V${CURRENT_RULES_VERSION} start at ${wins} wins stays in bands 2..3`, fresh.match.learningLevel >= 2 && fresh.match.learningLevel <= 3);
    if (wins === 0) check('New current campaign starts at Applied, never Foundation', fresh.match.learningLevel === 2);
    if (wins >= 4) check(`Experienced current campaign start is capped at Stretch (${wins} wins)`, fresh.match.learningLevel === 3);
    check(`V${CURRENT_RULES_VERSION} ${wins} wins: fifteen questions use bands 2..5`, fresh.match.questions.length === CAMPAIGN.questions && fresh.match.questions.every(q => q.learningLevel >= 2 && q.learningLevel <= 5 && q.difficulty === bandName(q.learningLevel)));
  }
  for (const level of [2, 3, 4, 5]) for (const type of ['numeric', 'order', 'mcq']) {
    const candidates = EXPANDED_QUESTION_BANK.filter(q => q.learningLevel === level && q.type === type);
    if (!candidates.length && type === 'order' && level >= 3) {
      check(`${bandName(level)} order: not applicable; this band uses numeric maths tasks`, EXPANDED_QUESTION_BANK.filter(q => q.learningLevel === level && q.forge === 'maths').every(q => q.type === 'numeric'));
      continue;
    }
    check(`${bandName(level)} ${type}: long-form bank coverage exists`, candidates.length > 0);
    const length = q => q.prompt.length + q.choices.reduce((n, c) => n + c.label.length, 0);
    const q = candidates.sort((a, b) => length(b) - length(a))[0];
    const fixture = longFormCampaignFixture(profileId, q);
    await seed(fixture);
    check(`${bandName(level)} ${type}: valid v${CURRENT_RULES_VERSION} fifteen-question fixture`, (await state()).match.rulesVersion === CURRENT_RULES_VERSION && (await state()).match.questions.length === CAMPAIGN.questions);
    assertLearnerPrivacy(await state(), check, `${bandName(level)} ${type} fixture`);
    await assertCurrentBand(page, await state(), q, check, `${bandName(level)} ${type}`);
    for (const [name, width, height] of VIEWPORTS) {
      await page.setViewportSize({ width, height });
      await assertPanelFits(page, '.forge-panel', check, `v${CURRENT_RULES_VERSION} ${bandName(level)} ${type} ${name}`);
      check(`v${CURRENT_RULES_VERSION} ${level} ${type} ${name}: prompt is not nested-clipped`, await page.locator('.forge-brief').evaluate(e => e.scrollHeight <= e.clientHeight + 2));
      const target = page.locator(type === 'numeric' ? '[data-key="1"]' : type === 'order' ? '[data-action="order"]:not(:disabled)' : '[data-action="choose"]').last();
      await target.scrollIntoViewIfNeeded(); const scrollTop = await page.locator('.forge-panel').evaluate(e => e.scrollTop);
      await target.click(); await settled();
      check(`v${CURRENT_RULES_VERSION} ${level} ${type} ${name}: choosing preserves scroll`, Math.abs(await page.locator('.forge-panel').evaluate(e => e.scrollTop) - scrollTop) < 3);
      if (type === 'order') { await page.locator('[data-action="clear-order"]').click(); await settled(); }
      await page.locator('[data-action="answer"]').scrollIntoViewIfNeeded();
      check(`v${CURRENT_RULES_VERSION} ${level} ${type} ${name}: confirm reachable`, await page.locator('[data-action="answer"]').isVisible());
      await shot(`v${CURRENT_RULES_VERSION}-level-${level}-${type}-${name}`);
    }
    await page.locator('[data-action="hint"]').click(); await settled();
    await page.locator('[data-action="hint"]').click(); await settled();
    for (const [name, width, height] of VIEWPORTS.filter(([name]) => ['small-phone', 'landscape'].includes(name))) {
      await page.setViewportSize({ width, height });
      await assertPanelFits(page, '.forge-panel', check, `v${CURRENT_RULES_VERSION} ${level} ${type} ${name} worked steps`);
      check(`${bandName(level)} ${type}: full worked steps remain readable`, (await page.locator('.feedback').textContent()).includes(q.hints[1]));
      await shot(`v${CURRENT_RULES_VERSION}-level-${level}-${type}-${name}-worked`);
    }
    assertLearnerPrivacy(await state(), check, `${bandName(level)} ${type} after hints`);
    await exerciseAnswerControls(page, q, settled, check, `v${CURRENT_RULES_VERSION} ${level} ${type}`);
    await enterAnswer(page, q, q.answer);
    await page.locator('[data-action="answer"]').click(); await settled();
    check(`${bandName(level)} ${type}: answer saves and acknowledgement is offered`, await page.locator('[data-action="acknowledge"]').count() === 1);
    await page.locator('[data-action="acknowledge"]').click(); await settled();
    assertLearnerPrivacy(await state(), check, `${bandName(level)} ${type} after answer`);
  }
}

export async function assertPanelFits(page, selector, check, name) {
  const problems = await page.locator(selector).first().evaluate(panel => {
    const bad = [], r = panel.getBoundingClientRect();
    if (r.left < -1 || r.right > innerWidth + 1 || r.top < -1 || r.bottom > innerHeight + 1) bad.push('panel outside viewport');
    if (panel.scrollWidth > panel.clientWidth + 2) bad.push('horizontal panel overflow');
    if (document.documentElement.scrollWidth > innerWidth + 2) bad.push('horizontal page overflow');
    for (const e of panel.querySelectorAll('h1,h2,h3,h4,button,label')) {
      if (e.getClientRects().length && e.scrollWidth > e.clientWidth + 2) bad.push(`text overflow: ${e.textContent}`);
    }
    return bad;
  });
  check(`${name}: viewport and text bounds (${problems.join('; ')})`, problems.length === 0);
  const controls = page.locator(`${selector} button:visible`);
  for (let i = 0; i < await controls.count(); i++) {
    const control = controls.nth(i); await control.scrollIntoViewIfNeeded();
    const reachable = await control.evaluate(e => {
      const r = e.getBoundingClientRect(), x = Math.max(0, Math.min(innerWidth - 1, r.x + r.width / 2)), y = Math.max(0, Math.min(innerHeight - 1, r.y + r.height / 2));
      const hit = document.elementFromPoint(x, y);
      return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && (hit === e || e.contains(hit));
    });
    check(`${name}: control ${i + 1} reachable by scrolling`, reachable);
  }
  await page.locator(selector).first().evaluate(e => { e.scrollTop = 0; });
}

export async function exerciseAnswerControls(page, q, settled, check, name) {
  const click = async selector => { await page.locator(selector).click(); await settled(); };
  if (q.type === 'numeric') {
    for (const digit of '0123456789') {
      await click('[data-key="clear"]'); await click(`[data-key="${digit}"]`);
      check(`${name}: keypad digit ${digit}`, (await page.locator('#numeric-answer').textContent()).trim() === digit);
    }
    await click('[data-key="backspace"]');
    check(`${name}: backspace clears the last digit`, (await page.locator('#numeric-answer').textContent()).trim() === '?');
    await click('[data-key="1"]'); await click('[data-key="clear"]');
  } else if (q.type === 'order') {
    await click('[data-action="clear-order"]');
    await click(`[data-action="order"][data-choice="${q.choices[0].id}"]`); await click('[data-action="undo-order"]');
    check(`${name}: undo restores the option`, await page.locator(`[data-action="order"][data-choice="${q.choices[0].id}"]`).isEnabled());
    for (const choice of q.choices) await click(`[data-action="order"][data-choice="${choice.id}"]`);
    check(`${name}: full order enables confirm`, await page.locator('[data-action="answer"]').isEnabled());
    await click('[data-action="clear-order"]');
    check(`${name}: clear restores every order option`, await page.locator('[data-action="order"]:disabled').count() === 0);
  } else {
    for (const choice of q.choices) {
      const selector = `[data-action="choose"][data-choice="${choice.id}"]`;
      await click(selector); check(`${name}: option ${choice.id} selects exclusively`, await page.locator(`${selector}[aria-pressed="true"]`).count() === 1 && await page.locator('[data-action="choose"][aria-pressed="true"]').count() === 1);
    }
  }
}

async function enterAnswer(page, q, value) {
  if (q.type === 'numeric') {
    await page.locator('[data-key="clear"]').click();
    for (const digit of String(value)) await page.locator(`[data-key="${digit}"]`).click();
  } else if (q.type === 'order') {
    await page.locator('[data-action="clear-order"]').click();
    for (const id of value) await page.locator(`[data-action="order"][data-choice="${id}"]`).click();
  } else await page.locator(`[data-action="choose"][data-choice="${value}"]`).click();
}

export async function runCampaignJourney({ page, settled, state, privateState, check, shot }) {
  const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
  const initial = await privateState(), rounds = new Set(), upgrades = new Set(), answered = new Set(), moves = new Set(), exercised = new Set();
  check(`Fresh journey is a fifteen-question six-round v${CURRENT_RULES_VERSION} campaign`, initial.match.rulesVersion === CURRENT_RULES_VERSION && initial.match.questions.length === CAMPAIGN.questions && initial.match.round === 1);
  check('Current campaign journey starts in bands 2..3 and never exceeds Master', initial.match.learningLevel >= 2 && initial.match.learningLevel <= 3 && initial.match.questions.every(q => q.learningLevel >= 2 && q.learningLevel <= 5 && q.difficulty === bandName(q.learningLevel)));
  check('Experienced journey exercises Challenge and Master', initial.wins < 4 || [4, 5].every(level => initial.match.questions.some(q => q.learningLevel === level)));
  let wrongId = null;
  for (let n = 0; n < 400; n++) {
    const s = await state(), m = s.match;
    assertLearnerPrivacy(s, check, `Journey ${n}`);
    if (m.phase === 'victory') break;
    check(`Journey ${n}: never silently skips a defeat`, m.phase !== 'defeat');
    if (m.phase === 'battle') {
      check(`Round ${m.round}: earned equipment stage`, m.upgradeStage === m.round - 1);
      if (!rounds.has(m.round)) {
        rounds.add(m.round);
        for (const [name, width, height] of VIEWPORTS) {
          await page.setViewportSize({ width, height }); await assertPanelFits(page, '.battle-console', check, `round ${m.round} ${name}`);
          await shot(`round-${m.round}-${name}`);
        }
      }
      const move = campaignMove(m); moves.add(move);
      await page.locator(`[data-move="${move}"]`).click(); await settled();
    } else if (m.phase === 'training') {
      const q = (await privateState()).match.questions[m.questionIndex];
      check(`Question ${m.questionIndex + 1}: correct sequential forge`, q.forgeStage === m.round && m.trainingStage === m.round);
      await assertCurrentBand(page, s, q, check, `Question ${m.questionIndex + 1}`);
      await page.setViewportSize({ width: 320, height: 568 });
      await assertPanelFits(page, '.forge-panel', check, `campaign question ${m.questionIndex + 1}`);
      if (!exercised.has(q.type)) { await exerciseAnswerControls(page, q, settled, check, `campaign ${q.type}`); exercised.add(q.type); }
      if (!wrongId) {
        wrongId = q.id;
        const wrong = q.type === 'numeric' ? (q.answer === 0 ? 1 : 0) : q.type === 'order' ? [...q.answer].reverse() : q.choices.find(c => c.id !== q.answer).id;
        await enterAnswer(page, q, wrong); await click('answer');
        check('Wrong answer retains the current task and exposes a clue', (await state()).match.questionIndex === m.questionIndex && await page.locator('.feedback.wrong').isVisible());
        await click('hint');
        check('Worked steps are recorded before correction', (await privateState()).match.questions[m.questionIndex].hintsUsed === 2);
        assertLearnerPrivacy(await state(), check, 'Wrong answer and worked support');
      }
      await enterAnswer(page, q, q.answer);
      const beforeReload = await privateState();
      await page.reload(); await settled();
      assertLearnerPrivacy(await state(), check, `Question ${m.questionIndex + 1} reloaded`);
      await assertCurrentBand(page, await state(), q, check, `Question ${m.questionIndex + 1} reloaded`);
      check(`Question ${m.questionIndex + 1}: unsent draft survives refresh without a save`, (await privateState()).version === beforeReload.version && await page.locator('[data-action="answer"]').isEnabled());
      if (q.type === 'numeric') check('Restored numeric draft is exact', (await page.locator('#numeric-answer').textContent()).trim() === String(q.answer));
      else if (q.type === 'order') check('Restored ordering draft is exact', JSON.stringify(await page.locator('.order-slots span').allTextContents()) === JSON.stringify(q.answer.map(id => q.choices.find(c => c.id === id).label)));
      else check('Restored choice draft is exact', await page.locator(`[data-choice="${q.answer}"][aria-pressed="true"]`).count() === 1);
      await shot(`question-${String(m.questionIndex + 1).padStart(2, '0')}-draft`);
      await click('answer'); check('Correct answer presents acknowledgement', await page.locator('[data-action="acknowledge"]').count() === 1);
      await click('acknowledge'); answered.add(q.id);
      assertLearnerPrivacy(await state(), check, `Question ${m.questionIndex + 1} saved`);
    } else {
      if (m.phase === 'player_upgrade') {
        upgrades.add(m.upgradeStage);
        check(`Upgrade ${m.upgradeStage}: exactly three additional questions completed`, m.questionIndex === m.upgradeStage * 3);
      }
      await shot(`phase-${m.round}-${m.phase}`); await click('continue');
    }
    if (n % 10 === 0) console.log(`Muted campaign: action ${n}, round ${m.round}, phase ${m.phase}`);
  }
  const completed = await privateState();
  check('Six rounds, five upgrades and fifteen unique answered questions reach victory', completed.match.phase === 'victory' && completed.match.questionIndex === CAMPAIGN.questions && rounds.size === CAMPAIGN.rounds && upgrades.size === CAMPAIGN.locked && answered.size === CAMPAIGN.questions);
  check('All four combat buttons exercised', ['strike', 'guard', 'break', 'special'].every(move => moves.has(move)));
  check('Victory grants exactly one win and all records remain resolved', completed.wins === initial.wins + 1 && completed.match.questions.every(q => q.resolved && q.attempts.length));
  check('All fifteen question difficulty snapshots stay unchanged', completed.match.learningLevel === initial.match.learningLevel && completed.match.questions.every((q, i) => ['id', 'learningLevel', 'difficulty', 'forgeStage'].every(key => q[key] === initial.match.questions[i][key])));
  check('Original wrong answer, correction and support remain saved', completed.match.questions.some(q => q.id === wrongId && q.attempts.length === 2 && !q.attempts[0].correct && q.attempts[1].correct && q.hintsUsed === 2 && q.supportEvents.length >= 2));
  await page.reload(); await settled();
  check('Entire completed campaign survives reload exactly', JSON.stringify(await privateState()) === JSON.stringify(completed));
  return completed;
}

export async function verifyParentEvidence({ page, origin, fixture, completed, check, shot }) {
  await page.goto(`${origin}/sparkbound/`);
  await page.waitForFunction(() => document.querySelector('#game')?.getAttribute('aria-busy') === 'false' && document.querySelector('#loading')?.style.display === 'none');
  const open = () => page.evaluate(async ({ cap, id }) => {
    window.BrightQuestFamilyAuth = { requestHeaders: () => ({ 'x-bq-parent-capability': cap }) };
    const module = await import('/sparkbound-parent.js');
    module.openSparkboundReview({ profile: { id, name: 'Synthetic QA Explorer' }, opener: null, isCurrent: () => true });
  }, { cap: fixture.parentCapability, id: fixture.legacyId });
  await page.route('**/api/profiles', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ profiles: [] }) }));
  await open(); await page.locator('[data-spark-review-retry]').waitFor();
  await page.unroute('**/api/profiles'); await page.locator('[data-spark-review-retry]').click();
  await page.locator('.bq-spark-question.missed').waitFor();
  check('Parent retry recovers and popup includes all fifteen records, incorrect first', await page.locator('.bq-spark-question').count() === CAMPAIGN.questions && await page.locator('.bq-spark-question').first().evaluate(e => e.classList.contains('missed')));
  check('Parent fixture contains a full resolved fifteen-question campaign', completed.match.questions.length === CAMPAIGN.questions && completed.match.questions.every(q => q.resolved));
  const rows = await page.locator('.bq-spark-question').evaluateAll(elements => elements.map(e => ({ id: e.dataset.sparkQuestion, missed: e.classList.contains('missed') })));
  const wrongIds = completed.match.questions.filter(q => q.attempts.some(a => a.correct === false)).map(q => q.id).sort();
  check('Parent renders all fifteen exact question IDs once', new Set(rows.map(row => row.id)).size === CAMPAIGN.questions && JSON.stringify(rows.map(row => row.id).sort()) === JSON.stringify(completed.match.questions.map(q => q.id).sort()));
  check('All incorrect records precede every non-missed record', wrongIds.length > 0 && rows.slice(0, wrongIds.length).every(row => row.missed) && rows.slice(wrongIds.length).every(row => !row.missed) && JSON.stringify(rows.filter(row => row.missed).map(row => row.id).sort()) === JSON.stringify(wrongIds));
  check('Parent summary reports fifteen records', /^15 training records\b/.test((await page.locator('.bq-spark-summary').textContent()).trim()));
  while (await page.locator('#bqSparkboundReviewPopup details:not([open]) > summary').count()) await page.locator('#bqSparkboundReviewPopup details:not([open]) > summary').first().click();
  for (const q of completed.match.questions) {
    const row = page.locator('[data-spark-question]').filter({ has: page.locator('h4', { hasText: q.title }) });
    const exactRow = page.locator(`[data-spark-question="${q.id}"]`);
    check(`Parent ${q.id}: one complete record`, await exactRow.count() === 1 && await row.count() >= 1);
    const text = (await exactRow.textContent()).replace(/\s+/g, ' '), normal = value => String(value ?? '').replace(/\s+/g, ' ');
    check(`Parent ${q.id}: prompt, explanation, difficulty and hero`, [q.prompt, q.explanation, q.difficulty, HEROES.find(h => h.id === completed.match.heroId).name].every(value => text.includes(normal(value))));
    const context = (await exactRow.locator('.bq-spark-context').textContent()).replace(/\s+/g, ' ');
    check(`Parent ${q.id}: actual ${bandName(q.learningLevel)} band and upgrade context`, q.difficulty === bandName(q.learningLevel) && context.includes(bandName(q.learningLevel)) && context.includes(`Upgrade ${q.forgeStage} of 5`));
    check(`Parent ${q.id}: all choices and support visible`, q.choices.every(c => text.includes(normal(c.label))) && text.includes(`Hints used: ${q.hintsUsed}`) && q.hints.slice(0, q.hintsUsed).every(hint => text.includes(normal(hint))));
    const attempts = await exactRow.locator('.bq-spark-attempts > li').allTextContents();
    check(`Parent ${q.id}: every original submission, correction and feedback`, attempts.length === q.attempts.length && q.attempts.every((attempt, i) => attempts[i].includes(JSON.stringify(attempt.answer)) && attempts[i].replace(/\s+/g, ' ').includes(normal(attempt.feedback?.message ?? attempt.feedback))));
    check(`Parent ${q.id}: attempt correctness and assistance match saved evidence`, q.attempts.every((attempt, i) => attempts[i].includes(attempt.correct ? 'Correct' : 'Incorrect') && attempts[i].includes(`Support at submission: ${['None', 'Clue', 'Worked solution'][attempt.assistanceLevel]}`)));
    const codes = await exactRow.locator('code').allTextContents();
    check(`Parent ${q.id}: exact correct answer retained`, codes.at(-1) === JSON.stringify(q.answer));
    if (q.evidence) check(`Parent ${q.id}: original task evidence retained`, JSON.stringify(JSON.parse(await exactRow.locator('pre').textContent())) === JSON.stringify(q.evidence));
  }
  for (const [name, width, height] of VIEWPORTS) {
    await page.setViewportSize({ width, height }); await assertPanelFits(page, '#bqSparkboundReviewPopup', check, `${name} parent evidence`);
    await page.locator('.bq-spark-question').first().scrollIntoViewIfNeeded(); await shot(`parent-${name}-first`);
    for (let i = 0; i < CAMPAIGN.questions; i++) {
      const row = page.locator('.bq-spark-question').nth(i); await row.scrollIntoViewIfNeeded();
      check(`${name}: parent record ${i + 1} reachable`, await row.locator('h4').isVisible());
    }
    await shot(`parent-${name}-last`);
  }
  await page.locator('[data-spark-review-close]').click(); await page.locator('#bqSparkboundReviewPopup').waitFor({ state: 'detached' });
  await open(); await page.locator('.bq-spark-question').first().waitFor({ state: 'attached' }); await page.keyboard.press('Escape');
  await page.locator('#bqSparkboundReviewPopup').waitFor({ state: 'detached' });
  await open(); await page.locator('.bq-spark-question').first().waitFor({ state: 'attached' }); await page.goBack();
  await page.locator('#bqSparkboundReviewPopup').waitFor({ state: 'detached' });
  check('Parent Close, Escape and browser back dismiss cleanly', await page.locator('#bqSparkboundReviewPopup').count() === 0);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
