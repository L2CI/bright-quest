// Real browser UI and real ephemeral D1. Optional live assets; all API writes remain local.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import * as expeditionApi from '../functions/api/dragon-expedition.js';
import { createState as createExpedition, applyAction as applyExpedition, publicState as publicExpedition } from '../functions/_lib/dragon-expedition.js';
import { createState, applyAction, publicState, ADVENTURES, PATHS } from '../functions/_lib/dragon-grove.js';
import { QUESTIONS as ORIGINAL_QUESTIONS } from '../functions/_lib/dragon-grove-content.js';
import { QUESTIONS } from '../functions/_lib/dragon-expedition-content.js';
import { createSimulation, stepSimulation, checkpoint } from '../dragon-grove/chapter-two/trial-simulation.js';
import { sha256 } from '../functions/_lib/family-auth.js';

const require = createRequire(import.meta.url), runtime = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || 'C:/Users/gupta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`), out = fileURLToPath(new URL('../outputs/dragon-expedition/', import.meta.url));
await mkdir(out, { recursive: true });
const h = await startSparkboundQa({ port: 0 }), f = h.fixture;
const env = { DB: h.db, BQ_FAMILY_AUTH_ENABLED: 'true', BQ_FAMILY_AUTH_MIGRATION_READY: 'true' };
const live = process.env.BQ_VERIFY_ORIGIN ? new URL(process.env.BQ_VERIFY_ORIGIN).origin : '', origin = live || h.origin;
let cookie = `bq_session=${f.cookie.value}`, timeOffset = 0, apiChain = Promise.resolve(), loseType = null, heldGet = null, heldPost = null;
const nativeNow = Date.now, checks = [], errors = [], failedAssets = [], blocked = [], writes = [], lost = [], apiFailures = [];
const equal = (a, b, label) => { assert.deepEqual(a, b, label); checks.push(label); };
const ok = (value, label) => { assert.ok(value, label); checks.push(label); };
const browser = await chromium.launch({ executablePath: process.env.BQ_CHROMIUM_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true,
  args: ['--no-sandbox', '--mute-audio', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
if (!live) await context.addCookies([f.cookie]);
await context.addInitScript(({ child, parent }) => {
  sessionStorage.setItem('brightQuestChildCapability', child); sessionStorage.setItem('brightQuestParentCapability', parent);
  localStorage.setItem('bqDragonGroveSettingsV1', JSON.stringify({ sound: false, music: false, reduced: true }));
}, { child: f.childCapability, parent: f.parentCapability });

async function localResponse(path, { method = 'GET', body, headers = {} } = {}) {
  const task = apiChain.catch(() => {}).then(async () => {
    const requestHeaders = { 'content-type': 'application/json', 'x-bq-child-id': f.childId, 'x-bq-child-capability': f.childCapability, ...headers, cookie, origin: h.origin };
    for (const key of ['host', 'content-length', 'accept-encoding']) delete requestHeaders[key];
    let response;
    if (new URL(path, h.origin).pathname === '/api/dragon-expedition') {
      Date.now = () => nativeNow() + timeOffset;
      try { response = await (method === 'GET' ? expeditionApi.onRequestGet : expeditionApi.onRequestPost)({ env,
        request: new Request(h.origin + path, { method, headers: requestHeaders, ...(['GET', 'HEAD'].includes(method) ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }) }) }); }
      finally { Date.now = nativeNow; }
    } else response = await fetch(h.origin + path, { method, headers: requestHeaders, redirect: 'manual', ...(['GET', 'HEAD'].includes(method) ? {} : { body }) });
    for (const value of response.headers.getSetCookie()) { const match = /^bq_session=([^;]*)/.exec(value); if (match) cookie = `bq_session=${match[1]}`; }
    const outgoing = Object.fromEntries(response.headers); for (const key of ['set-cookie', 'content-encoding', 'transfer-encoding']) delete outgoing[key];
    return { status: response.status, headers: outgoing, body: Buffer.from(await response.arrayBuffer()) };
  });
  apiChain = task; return task;
}
async function read() { const response = await localResponse('/api/dragon-expedition'); assert.equal(response.status, 200, response.body.toString()); return JSON.parse(response.body); }
async function command(action) { const { state } = await read(); const response = await localResponse('/api/dragon-expedition', { method: 'POST', body: { version: state.version, operationId: crypto.randomUUID(), action } }); assert.equal(response.status, 200, response.body.toString()); return JSON.parse(response.body).state; }
await context.route('**/*', async route => {
  const request = route.request(), url = new URL(request.url());
  if (url.origin === origin && url.pathname.startsWith('/api/')) {
    if (heldGet && request.method() === 'GET' && url.pathname === '/api/dragon-expedition') { const hold = heldGet; heldGet = null; hold.arrived(); await hold.release; }
    const body = request.postData(), action = body ? JSON.parse(body).action : null;
    if (request.method() !== 'GET') writes.push({ path: url.pathname, body });
    const response = await localResponse(url.pathname + url.search, { method: request.method(), body, headers: request.headers() });
    if (heldPost && action?.type === heldPost.type) { const hold = heldPost; heldPost = null; hold.arrived(response); await hold.release; }
    if (response.status >= 400) apiFailures.push({ path: url.pathname, status: response.status, action: action?.type, message: response.body.toString() });
    if (loseType && action?.type === loseType) { lost.push({ type: loseType, body, status: response.status }); loseType = null; return route.abort('internetdisconnected'); }
    return route.fulfill(response);
  }
  if (url.origin !== origin || !['GET', 'HEAD'].includes(request.method())) { blocked.push(request.url()); return route.abort('blockedbyclient'); }
  return route.continue();
});
const page = await context.newPage();
function monitor(p) { p.on('pageerror', error => errors.push(error.message)); p.on('response', response => { if (response.status() >= 400 && !new URL(response.url()).pathname.startsWith('/api/')) failedAssets.push({ url: response.url(), status: response.status() }); }); }
monitor(page);
const url = origin + '/dragon-grove/chapter-two/';
const diagnostic = p => p.evaluate(() => window.dragonExpeditionDiagnostics());
const saved = p => p.waitForFunction(() => window.dragonExpeditionDiagnostics?.().authenticated && !window.dragonExpeditionDiagnostics().busy && !window.dragonExpeditionDiagnostics().pending && document.querySelector('#saveStatus')?.textContent.startsWith('Adventure saved'));
const trialReady = p => p.waitForFunction(() => window.dragonExpeditionDiagnostics?.().trial?.ready, {}, { timeout: 60000 });
async function submit(p, answer) { const before = (await read()).state; if (before.currentQuestion.type === 'choice') await p.locator(`[data-choice="${answer}"]`).click(); else await p.locator('#answer').fill(String(answer)); await p.locator('#checkAnswer').click(); await p.waitForFunction(version => window.dragonExpeditionDiagnostics().version > version, before.version); await saved(p); }
async function solve(p = page) { const { state } = await read(), q = QUESTIONS.find(q => q.id === state.currentQuestion.id);
  if (p === page && [11, 27, 30].includes(q.order)) { await layout(`question-${q.order}-phone`, { width: 390, height: 844 }); await page.setViewportSize({ width: 1440, height: 900 }); }
  await submit(p, String(q.answer)); await p.locator('[data-ui="continue"]').click(); }
async function seedOriginal(child, target = 10) {
  let s = createState(child);
  while (s.phase !== 'complete' && (s.stage < target || target === 10)) {
    if (s.phase === 'welcome') s = applyAction(s, { type: 'begin', name: 'Willow' });
    else if (s.phase === 'questions') { const q = ORIGINAL_QUESTIONS.find(q => q.id === publicState(s).currentQuestion.id); s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(q.answer) }); }
    else if (s.phase === 'evolution') s = applyAction(s, { type: 'evolve', path: PATHS[(s.level - 1) % 4] });
    else if (s.phase === 'adventure') s = applyAction(s, { type: 'adventure', power: 'fire', targetId: ADVENTURES[s.level - 1][s.objectiveIndex].correctTarget });
    else s = applyAction(s, { type: 'next' });
    await h.db.prepare('INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES (?,?,?,?,?,?,?)')
      .bind(crypto.randomUUID(), f.familyId, child, 'dragon-grove.state.v1', 'dragon-grove:v1:' + String(s.version).padStart(10, '0'), JSON.stringify({ state: s, event: s.lastEvent }), new Date().toISOString()).run();
  }
  return s;
}
const originalRows = async () => (await h.db.prepare('SELECT * FROM family_profile_events WHERE event_type!=? ORDER BY rowid').bind(expeditionApi.TYPE).all()).results;
const eventCount = async () => (await h.db.prepare('SELECT COUNT(*) AS n FROM family_profile_events WHERE event_type=?').bind(expeditionApi.TYPE).first()).n;
async function layout(name, { width, height }) {
  await page.setViewportSize({ width, height });
  await page.waitForFunction(() => { const d = window.dragonExpeditionDiagnostics?.(); return d?.review || !d?.authenticated || d?.trial?.ready || d?.graphics?.ready; }, {}, { timeout: 60000 });
  await page.waitForTimeout(180);
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name}: no horizontal overflow`);
  const collisions = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('.trial-controls button,.topbar nav button')].filter(e => e.offsetWidth && e.offsetHeight);
    const problems = []; for (let i = 0; i < buttons.length; i++) for (let j = i + 1; j < buttons.length; j++) { const a = buttons[i].getBoundingClientRect(), b = buttons[j].getBoundingClientRect(); if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) problems.push([buttons[i].textContent, buttons[j].textContent]); } return problems;
  });
  equal(collisions, [], `${name}: visible controls do not overlap`);
  await page.screenshot({ path: `${out}${live ? 'live-' : ''}${name}.png`, fullPage: true });
  if (name === 'parent-phone') { await page.evaluate(() => window.scrollTo(0, 0)); await page.screenshot({ path: `${out}${live ? 'live-' : ''}parent-phone-top.png`, fullPage: false }); }
}
async function fastForwardTo(targetTick = 5990) {
  let { state: s } = await read(); assert.equal(s.phase, 'minigame');
  s = await command({ type: 'minigame-resume', runId: s.minigame.runId });
  const sim = createSimulation({ trial: s.block, seed: s.minigame.seed, paths: s.dragon.paths, saved: s.minigame });
  while (sim.snapshot.tick < targetTick) {
    stepSimulation(sim, { target: [.23, .5 + .27 * Math.sin(sim.snapshot.tick / 140)], power: PATHS[Math.floor(sim.snapshot.tick / 125) % 4] }); timeOffset += 50;
    if (sim.snapshot.tick * 50 - s.minigame.activeMs >= 10000 || sim.snapshot.tick === targetTick) s = await command({ type: 'minigame-checkpoint', runId: s.minigame.runId, seq: s.minigame.checkpointSeq + 1, ...checkpoint(sim), paused: sim.snapshot.tick === targetTick });
  }
  return s;
}
async function seedReview(original) {
  let s = createExpedition(f.childId, original), now = nativeNow(); const rows = [];
  const act = action => { s = applyExpedition(s, action, { now }); rows.push(h.db.prepare('INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES (?,?,?,?,?,?,?)')
    .bind(crypto.randomUUID(), f.familyId, f.childId, expeditionApi.TYPE, expeditionApi.PREFIX + String(s.version).padStart(10, '0'), JSON.stringify({ state: s, event: s.lastEvent }), new Date(now).toISOString())); };
  act({ type: 'begin' }); const first = publicExpedition(s).currentQuestion;
  act({ type: 'hint', questionId: first.id }); act({ type: 'answer', questionId: first.id, answer: '-999' });
  while (s.phase !== 'complete') {
    if (s.phase === 'questions') { const q = QUESTIONS.find(q => q.id === publicExpedition(s).currentQuestion.id); act({ type: 'answer', questionId: q.id, answer: String(q.answer) }); }
    else if (s.phase === 'reward') act({ type: 'next' });
    else {
      act({ type: 'minigame-resume', runId: s.minigame.runId });
      const sim = createSimulation({ trial: s.block, seed: s.minigame.seed, paths: s.dragon.paths, saved: s.minigame });
      while (sim.snapshot.tick < 6000) { stepSimulation(sim, { target: [.23, .5], power: PATHS[Math.floor(sim.snapshot.tick / 125) % 4] }); now += 50;
        if (sim.snapshot.tick % 600 === 0) act({ type: 'minigame-checkpoint', runId: s.minigame.runId, seq: s.minigame.checkpointSeq + 1, ...checkpoint(sim), paused: sim.snapshot.tick === 6000 }); }
      act({ type: 'minigame-complete', runId: s.minigame.runId });
    }
  }
  for (let i = 0; i < rows.length; i += 30) await h.db.batch(rows.slice(i, i + 30));
  return s;
}
async function checkDeepJournalClose() {
  await page.locator('.flight-save-details').first().evaluate(el => { el.open = true; });
  await page.locator('#dialog').evaluate(el => { el.scrollTop = el.scrollHeight; }); await page.waitForTimeout(80);
  const visible = await page.evaluate(() => { const dialog = document.querySelector('#dialog'), button = dialog.querySelector('.dialog-close'), d = dialog.getBoundingClientRect(), b = button.getBoundingClientRect();
    return dialog.scrollTop > 500 && b.top >= d.top && b.bottom <= d.bottom && b.left >= d.left && b.right <= d.right && button.contains(document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2)); });
  ok(visible, 'journal Close stays visible and unobstructed after deep scroll with disclosure open');
  await page.screenshot({ path: `${out}${live ? 'live-' : ''}journal-deep-phone.png`, fullPage: false });
  await page.getByRole('button', { name: 'Close dialog' }).click(); equal(await page.locator('#dialog').evaluate(el => el.open), false, 'sticky Close button closes long journal');
}

try {
  await h.db.prepare("UPDATE family_sessions SET expires_at='2099-01-01T00:00:00.000Z',parent_unlocked_until='2099-01-01T00:00:00.000Z',child_capability_expires_at='2099-01-01T00:00:00.000Z'").run();
  const original = await seedOriginal(f.childId); await seedOriginal(f.children[1].id, 4); const originals = await originalRows();
  if (process.env.BQ_QA_REVIEW_ONLY === '1') {
    const complete = await seedReview(original), count = await eventCount();
    await page.setViewportSize({ width: 390, height: 844 }); await page.goto(url); await page.getByRole('heading', { name: 'A guardian of land and sky.' }).waitFor();
    await page.locator('#journalButton').click(); await page.locator('#evidenceItems').waitFor();
    while (await page.locator('#moreEvidence').count()) { const n = await page.locator('.journal-item').count(); await page.locator('#moreEvidence').click(); await page.waitForFunction(n => document.querySelectorAll('.journal-item').length > n, n); }
    equal(await page.locator('.journal-item').count(), complete.version, 'focused journal preserves all seeded validated history');
    await page.locator('#dialog').evaluate(el => { el.scrollTop = 0; }); await page.screenshot({ path: `${out}${live ? 'live-' : ''}journal-phone.png`, fullPage: false });
    await checkDeepJournalClose();
    await page.goto(url + '?childId=' + f.legacyId); await page.getByRole('heading', { name: 'Our Skybound story.' }).waitFor(); await layout('parent-phone', { width: 390, height: 844 });
    equal(await page.locator('.flight-save-details[open]').count(), 0, 'parent saves collapsed on entry');
    equal(await eventCount(), count, 'focused journal and parent reads create no events'); equal(await originalRows(), originals, 'focused review leaves original saves unchanged');
    equal(errors, [], 'focused review has no browser errors'); equal(failedAssets, [], 'focused review has no missing assets'); equal(blocked, [], 'focused review has no unexpected external requests');
    await writeFile(`${out}${live ? 'live-' : ''}journal-qa.json`, JSON.stringify({ checks: checks.length, details: checks, errors, failedAssets, synthetic: true, productionLearnerWrites: 0, completedAt: new Date().toISOString() }, null, 2));
    console.log(`Focused Chapter II journal QA passed ${checks.length} checks.`);
  } else {
  await page.goto(url + '?childId=' + f.children[1].id); await page.getByRole('heading', { name: 'A guardian has a new horizon.' }).waitFor();
  equal(await eventCount(), 0, 'unfinished original remains locked without chapter writes');
  await page.goto(url); await page.locator('[data-action="begin"]').waitFor();
  equal((await read()).state.dragon.paths, original.paths, 'existing powers inherited exactly');
  for (const [name, width, height] of [['welcome-desktop', 1440, 900], ['welcome-phone', 390, 844]]) await layout(name, { width, height });
  await page.setViewportSize({ width: 1440, height: 900 }); await page.locator('[data-action="begin"]').click(); await saved(page);
  await page.locator('#answer').fill('123'); await page.waitForFunction(() => window.dragonExpeditionDiagnostics().draftSaved); await page.reload(); await page.waitForFunction(() => document.querySelector('#answer')?.value === '123'); ok(true, 'typed draft survives reload');
  await page.locator('[data-action="hint"]').click(); await saved(page); ok(await page.locator('.coach').isVisible(), 'hint shown');
  await submit(page, '-999'); equal((await read()).state.counters.correct, 0, 'wrong answer does not pass gate');
  await solve();
  await page.locator('[data-choice]').first().click(); const choice = await page.locator('[data-choice][aria-pressed=true]').getAttribute('data-choice');
  await page.waitForFunction(() => window.dragonExpeditionDiagnostics().draftSaved); await page.reload(); await page.locator(`[data-choice="${choice}"][aria-pressed=true]`).waitFor(); ok(true, 'choice draft survives reload');
  // Two tabs, stale answer, and a newer outbox reservation arriving during Load latest.
  const peer = await context.newPage(); monitor(peer); await peer.goto(url); await peer.locator('[data-choice]').first().waitFor();
  await solve(peer); const { state: later } = await read();
  await page.locator(`[data-choice="${choice}"]`).click(); await page.locator('#checkAnswer').click(); await page.locator('#pendingBox').waitFor();
  const { owner } = await read(); let releaseGet, getArrived; const arrival = new Promise(resolve => getArrived = resolve);
  heldGet = { arrived: getArrived, release: new Promise(resolve => releaseGet = resolve) };
  await page.locator('#loadLatest').click(); await arrival;
  const newPending = { version: later.version, operationId: crypto.randomUUID(), action: { type: 'hint', questionId: later.currentQuestion.id } };
  await peer.evaluate(async ({ owner, body }) => { const storage = await import('../storage.js'); const old = await storage.get('pending', owner); if (old) await storage.confirm(owner, old.operationId); await storage.reserve(owner, body); }, { owner, body: newPending });
  releaseGet(); await page.waitForFunction(() => !window.dragonExpeditionDiagnostics().busy);
  const retained = await peer.evaluate(async owner => (await import('../storage.js')).get('pending', owner), owner);
  equal(retained?.operationId, newPending.operationId, 'Load latest preserves a newer tab reservation');
  await page.locator('#retrySave').click(); await saved(page); equal((await read()).state.hintUsed, true, 'preserved other-tab action retries safely'); await peer.close();
  while ((await read()).state.phase === 'questions') await solve();
  for (let block = 1; block <= 6; block++) {
    await trialReady(page); let s = (await read()).state;
    equal(s.block, block, `trial ${block}: correct five-question boundary`); equal(s.counters.correct, block * 5, `trial ${block}: exactly five new correct answers`);
    equal(await page.locator('[data-action="next"]').count(), 0, `trial ${block}: next questions stay gated`);
    if (block === 1) {
      for (const [name, width, height] of [['trial-desktop', 1440, 900], ['trial-tablet', 834, 1112], ['trial-phone', 390, 844]]) await layout(name, { width, height });
      await page.setViewportSize({ width: 1440, height: 900 });
      loseType = 'minigame-checkpoint'; await page.locator('#resumeTrial').click();
      const canvas = page.locator('#trialScene canvas[role="application"]'); await canvas.focus(); await page.keyboard.down('ArrowRight'); await page.waitForTimeout(600); await page.keyboard.up('ArrowRight');
      await page.locator('[data-trial-power="storm"]').click(); await page.locator('#usePower').click();
      await page.locator('#retrySave').waitFor({ timeout: 25000 });
      s = (await read()).state; ok(s.minigame.activeMs >= 10000, 'ten-second automatic checkpoint committed before response loss');
      const newer = await fastForwardTo(s.minigame.snapshot.tick + 200);
      const lostCount = await eventCount(); await page.locator('#retrySave').click(); await saved(page); await trialReady(page); equal(await eventCount(), lostCount, 'checkpoint replay adds no duplicate event');
      equal((await diagnostic(page)).trial.tick * 50, newer.minigame.activeMs, 'late checkpoint replay rebuilds engine from newer confirmed progress');
      equal((await diagnostic(page)).minigame.snapshot, newer.minigame.snapshot, 'late checkpoint replay restores newer positions and powers');
      await page.locator('#resumeTrial').click(); await page.waitForTimeout(900); await page.locator('#pauseTrial').click(); await saved(page);
      const paused = (await read()).state.minigame; equal(paused.paused, true, 'pause saves paused checkpoint'); ok(paused.powerUses.storm > 0, 'chosen inherited power recorded');
      await page.reload(); await trialReady(page); await page.waitForTimeout(600);
      equal((await read()).state.minigame, paused, 'reload changes no time, position, entities or powers'); equal((await diagnostic(page)).trial.tick * 50, paused.activeMs, 'engine restores exact confirmed active tick'); equal((await diagnostic(page)).trial.running, false, 'reopened engine is paused');
      // Hold a successful quiet save while another tab reserves a newer action.
      let releasePost, postArrived; const postArrival = new Promise(resolve => postArrived = resolve);
      heldPost = { type: 'minigame-checkpoint', arrived: postArrived, release: new Promise(resolve => releasePost = resolve) };
      await page.locator('#resumeTrial').click(); const committed = JSON.parse((await postArrival).body).state;
      const competing = { version: committed.version, operationId: crypto.randomUUID(), action: { type: 'minigame-resume', runId: committed.minigame.runId } };
      await page.evaluate(async ({ owner, body }) => { const storage = await import('../storage.js'); const old = await storage.get('pending', owner); await storage.confirm(owner, old.operationId); await storage.reserve(owner, body); }, { owner, body: competing });
      releasePost(); await page.waitForFunction(() => { const d = window.dragonExpeditionDiagnostics(); return d.pending && !d.busy && !d.trial.running; });
      ok(await page.locator('#pendingBox').isVisible(), 'quiet checkpoint surfaces another tab reservation and pauses flight');
      equal((await page.evaluate(async owner => (await import('../storage.js')).get('pending', owner), owner)).operationId, competing.operationId, 'quiet checkpoint confirmation preserves different operation body');
      await page.locator('#retrySave').click(); await saved(page); await trialReady(page);
      equal((await diagnostic(page)).trial.running, false, 'quiet race retry rebuilds confirmed checkpoint without auto-resume');
    }
    const nearEnd = await fastForwardTo(); await page.reload(); await trialReady(page);
    equal((await diagnostic(page)).trial.tick, 5990, `trial ${block}: genuine validated near-end checkpoint restored`);
    if (block === 2) loseType = 'minigame-complete';
    await page.locator('#resumeTrial').click();
    if (block === 2) { await page.locator('#retrySave').waitFor(); const count = await eventCount(); await page.locator('#retrySave').click(); await saved(page); equal(await eventCount(), count, 'result response-loss replay adds no duplicate award'); }
    await page.waitForFunction(block => { const d = window.dragonExpeditionDiagnostics?.(); return !d?.busy && d?.phase === (block === 6 ? 'complete' : 'reward'); }, block, { timeout: 30000 });
    s = (await read()).state; equal(s.results.length, block, `trial ${block}: one result awarded`); equal(s.results.at(-1).activeMs, 300000, `trial ${block}: exactly five active minutes`);
    console.log(`Trial ${block}: five-question gate, saved simulation, five-minute completion and result passed`);
    equal(s.dragon.paths, original.paths, `trial ${block}: earned dragon powers preserved`);
    if (block < 6) { await page.locator('[data-action="next"]').click(); await saved(page); while ((await read()).state.phase === 'questions') await solve(); }
  }
  const complete = (await read()).state; equal(complete.counters.correct, 30, 'all thirty questions completed'); equal(complete.stats.activeMs, 1800000, 'six full five-minute trial results');
  for (const title of ['Cloudrunner', 'Emberforge', 'Canopy Rescue', 'Storm Pass', 'Moonward', 'Guardian Flight']) ok((await page.locator('#app').innerText()).includes(title), `final result names ${title}`);
  for (const [name, width, height] of [['finale-desktop', 1440, 900], ['finale-phone', 390, 844]]) await layout(name, { width, height });
  await page.locator('#journalButton').click(); await page.locator('#evidenceItems').waitFor();
  while (await page.locator('#moreEvidence').count()) { const count = await page.locator('.journal-item').count(); await page.locator('#moreEvidence').click(); await page.waitForFunction(n => document.querySelectorAll('.journal-item').length > n, count); }
  equal(await page.locator('.journal-item').count(), complete.version, 'journal paginates every answer and checkpoint'); ok((await page.locator('#evidenceItems').innerText()).includes('-999'), 'original wrong attempt remains in journal');
  equal(await page.locator('.flight-save-details').count(), 6, 'journal groups all flight saves in six trial disclosures');
  equal(await page.locator('.flight-save-details[open]').count(), 0, 'flight save details start collapsed');
  equal(await page.locator('#evidenceItems > .journal-item[data-kind="minigame-checkpoint"],#evidenceItems > .journal-item[data-kind="minigame-resume"]').count(), 0, 'routine checkpoints remain inside disclosures');
  equal(await page.locator('#evidenceItems > .journal-item[data-kind="answer"]').count(), 31, 'learning answers remain directly visible outside save details');
  equal(await page.locator('#evidenceItems > .journal-item[data-kind="minigame-complete"]').count(), 6, 'all trial results remain directly visible');
  await page.evaluate(() => { document.querySelector('#dialog').scrollTop = 0; document.querySelector('#dialogBody').scrollTop = 0; window.scrollTo(0, 0); });
  await page.screenshot({ path: `${out}${live ? 'live-' : ''}journal-phone.png`, fullPage: false });
  await page.locator('.flight-save-details summary').first().click(); ok(await page.locator('.flight-save-details[open] .journal-item').first().isVisible(), 'all saved flight details remain accessible');
  await checkDeepJournalClose();
  await page.goto(url + '?childId=' + f.legacyId); await page.getByRole('heading', { name: 'Our Skybound story.' }).waitFor();
  equal(await page.locator('[data-action],#resumeTrial').count(), 0, 'parent review has no gameplay writes');
  const beforeParentRead = await eventCount();
  while (await page.locator('#moreEvidence').count()) { const count = await page.locator('.journal-item').count(); await page.locator('#moreEvidence').click(); await page.waitForFunction(n => document.querySelectorAll('.journal-item').length > n, count); }
  equal(await page.locator('.journal-item').count(), complete.version, 'parent pagination retains every learning and flight entry'); equal(await eventCount(), beforeParentRead, 'parent journal reads create no game events');
  equal(await page.locator('.flight-save-details[open]').count(), 0, 'parent flight save details remain collapsed'); await layout('parent-phone', { width: 390, height: 844 });
  await page.getByRole('link', { name: 'Return to parent dashboard' }).click(); await page.waitForURL('**/#parent/evidence');
  await page.getByText('Dragon Grove evidence', { exact: true }).click(); await page.getByRole('link', { name: 'Review Skybound Trials' }).click(); await page.getByRole('heading', { name: 'Our Skybound story.' }).waitFor(); ok(true, 'parent portal Chapter II entry and return');
  await page.goto(origin + '/#child/play'); await page.getByText('Dragon Grove: Emberwild', { exact: true }).click(); await page.getByRole('link', { name: /Continue to Chapter II/ }).click(); await page.getByRole('heading', { name: 'A guardian of land and sky.' }).waitFor(); ok(true, 'Bright Quest Play continues completed Chapter II through original finale');
  const sessionId = await sha256(cookie.slice('bq_session='.length));
  await h.db.prepare('UPDATE family_sessions SET active_child_id=? WHERE id=?').bind(f.children[1].id, sessionId).run();
  await page.locator('#journalButton').click(); await page.getByRole('heading', { name: 'Your dragon is waiting.' }).waitFor(); equal((await diagnostic(page)).authenticated, false, 'profile change gates the previous child immediately');
  equal(await originalRows(), originals, 'all original complete and mid-campaign rows remain byte-identical');
  equal(errors, [], 'no browser script errors'); equal(failedAssets, [], 'no failed asset requests'); equal(blocked, [], 'no unexpected external requests');
  ok(apiFailures.length > 0 && apiFailures.every(r => r.status === 409), 'only intentional stale-tab conflicts returned API errors');
  equal(lost.map(item => [item.type, item.status]), [['minigame-checkpoint', 200], ['minigame-complete', 200]], 'both lost responses were successful local commits');
  await writeFile(`${out}${live ? 'live-' : ''}browser-qa.json`, JSON.stringify({ checks: checks.length, details: checks, errors, failedAssets, blocked, completedVersion: complete.version,
    apiFailures, simulatedTrials: 6, realAutomaticCheckpoint: true, synthetic: true, assetOrigin: origin, apiOrigin: 'ephemeral local D1 + local-only virtual clock for validated fast-forward', productionLearnerWrites: 0, completedAt: new Date().toISOString() }, null, 2));
  console.log(`Dragon expedition browser QA passed ${checks.length} checks across all 30 questions and 6 trials.`);
  }
} catch (error) {
  await page.screenshot({ path: out + 'FAILURE.png', fullPage: true }).catch(() => {}); console.error(error); console.error(JSON.stringify({ checks: checks.length, errors, failedAssets, blocked, apiFailures, diagnostics: await diagnostic(page).catch(() => null) })); process.exitCode = 1;
} finally { Date.now = nativeNow; await browser.close(); await h.close(); }
