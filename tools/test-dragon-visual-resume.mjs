// Real frontend/renderer over fictional, ephemeral D1 campaigns. No production learner writes.
// BQ_VERIFY_ORIGIN optionally reads released static assets; every /api request still runs locally.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { QUESTIONS } from '../functions/_lib/dragon-grove-content.js';
import { ADVENTURES, PATHS } from '../functions/_lib/dragon-grove.js';
import { TYPE } from '../functions/api/dragon-grove.js';

const require = createRequire(import.meta.url);
const runtime = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || 'C:/Users/gupta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const liveOrigin = process.env.BQ_VERIFY_ORIGIN ? new URL(process.env.BQ_VERIFY_ORIGIN).origin : '';
const out = fileURLToPath(new URL('../outputs/dragon-grove/', import.meta.url));
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.BQ_CHROMIUM_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true, args: ['--no-sandbox', '--mute-audio', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const checks = [], scenarios = [];
const equal = (actual, expected, label) => { assert.deepEqual(actual, expected, label); checks.push(label); };
const ok = (value, label) => { assert.ok(value, label); checks.push(label); };
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const cases = [
  { stage: 4, phase: 'questions', level: 5, questionIndex: 1 },
  { stage: 5, phase: 'adventure', level: 5, objectiveIndex: 1 },
  { stage: 6, phase: 'celebrate', level: 6 },
];

try {
  for (const wanted of cases) {
    const h = await startSparkboundQa({ port: 0 });
    const f = h.fixture, gameOrigin = liveOrigin || h.origin;
    let cookie = `bq_session=${f.cookie.value}`, context, page;
    const errors = [], requests = [], writes = [], blocked = [];
    const label = `stage ${wanted.stage}`;
    async function localRequest(path, { method = 'GET', body, headers = {} } = {}) {
      const response = await fetch(h.origin + path, { method, redirect: 'manual', headers: {
        cookie, origin: h.origin, 'content-type': 'application/json',
        'x-bq-child-id': f.childId, 'x-bq-child-capability': f.childCapability, ...headers,
      }, ...(body === undefined ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }) });
      for (const value of response.headers.getSetCookie()) {
        const match = /^bq_session=([^;]*)/.exec(value);
        if (match) cookie = `bq_session=${match[1]}`;
      }
      return response;
    }
    async function read(query = '') {
      const r = await localRequest('/api/dragon-grove' + query);
      assert.equal(r.status, 200, await r.clone().text());
      return r.json();
    }
    async function command(action) {
      const { state } = await read();
      const r = await localRequest('/api/dragon-grove', { method: 'POST', body: { version: state.version, operationId: crypto.randomUUID(), action } });
      assert.equal(r.status, 200, await r.clone().text());
      return (await r.json()).state;
    }
    async function evidence() {
      let cursor = null, result = [];
      do {
        const data = await read(`?limit=13${cursor === null ? '' : `&before=${cursor}`}`);
        result.push(...data.evidence.items); cursor = data.evidence.nextCursor;
      } while (cursor !== null);
      return result;
    }
    const rows = async () => (await h.db.prepare('SELECT * FROM family_profile_events WHERE event_type=? ORDER BY idempotency_key').bind(TYPE).all()).results;
    async function unrelated() {
      const data = {};
      for (const table of ['families', 'family_users', 'child_profiles', 'app_profiles', 'app_events', 'beacon_brigade_states', 'beacon_brigade_operations', 'sparkbound_states', 'sparkbound_operations'])
        data[table] = (await h.db.prepare(`SELECT * FROM ${table} ORDER BY rowid`).all()).results;
      data.events = (await h.db.prepare('SELECT * FROM family_profile_events WHERE event_type!=? ORDER BY rowid').bind(TYPE).all()).results;
      return data;
    }
    try {
      let state = await command({ type: 'begin', name: `Willow ${wanted.stage}` });
      let seeded = 0;
      while (!(state.stage === wanted.stage && state.phase === wanted.phase && state.level === wanted.level &&
        (wanted.questionIndex === undefined || state.questionIndex === wanted.questionIndex) &&
        (wanted.objectiveIndex === undefined || state.objectiveIndex === wanted.objectiveIndex))) {
        assert.ok(++seeded < 110, 'fixture reaches intended resume point');
        if (state.phase === 'questions') {
          const q = QUESTIONS.find(q => q.id === state.currentQuestion.id);
          if (state.questionIndex === 0) {
            state = await command({ type: 'hint', questionId: q.id });
            state = await command({ type: 'answer', questionId: q.id, answer: '-999' });
          }
          state = await command({ type: 'answer', questionId: q.id, answer: String(q.answer) });
        } else if (state.phase === 'evolution') state = await command({ type: 'evolve', path: PATHS[(state.level - 1) % PATHS.length] });
        else if (state.phase === 'adventure') {
          const objective = ADVENTURES[state.level - 1][state.objectiveIndex];
          state = await command({ type: 'adventure', power: PATHS[(state.level - 1) % PATHS.length], targetId: objective.correctTarget });
        } else if (state.phase === 'celebrate') state = await command({ type: 'next' });
        else assert.fail('unexpected fixture phase ' + state.phase);
      }
      // Keep an unfinished attempted question/objective at the exact resume point.
      if (state.phase === 'questions') {
        const q = QUESTIONS.find(q => q.id === state.currentQuestion.id);
        state = await command({ type: 'hint', questionId: q.id });
        state = await command({ type: 'answer', questionId: q.id, answer: q.choices.find(c => c.id !== q.answer).id });
      } else if (state.phase === 'adventure') {
        const objective = ADVENTURES[state.level - 1][state.objectiveIndex];
        state = await command({ type: 'adventure', power: 'nature', targetId: objective.targets.find(t => t.id !== objective.correctTarget).id });
      }
      const beforeState = (await read()).state, beforeRows = await rows(), beforeEvidence = await evidence(), beforeOther = await unrelated();
      equal(beforeRows.length, beforeState.version, `${label}: one immutable event for every version`);
      ok(beforeEvidence.some(e => e.type === 'answer' && !e.correct) && beforeEvidence.some(e => e.type === 'hint'), `${label}: original mistakes and hints in fixture`);
      ok(PATHS.every(p => beforeState.paths[p] > 0), `${label}: four mixed path ranks retained`);
      context = await browser.newContext({ viewport: { width: 1440, height: 900 }, serviceWorkers: 'block' });
      if (!liveOrigin) await context.addCookies([f.cookie]);
      await context.addInitScript(({ cap, parent }) => {
        sessionStorage.setItem('brightQuestChildCapability', cap);
        sessionStorage.setItem('brightQuestParentCapability', parent);
        localStorage.setItem('bqDragonGroveSettingsV1', JSON.stringify({ sound: false, music: false, reduced: true }));
      }, { cap: f.childCapability, parent: f.parentCapability });
      // Fail closed: live assets can only be read, and all API traffic goes to this ephemeral D1.
      await context.route('**/*', async route => {
        const request = route.request(), url = new URL(request.url());
        if (url.origin === gameOrigin && url.pathname.startsWith('/api/')) {
          const headers = { ...request.headers() };
          for (const key of ['cookie', 'origin', 'host', 'content-length', 'accept-encoding']) delete headers[key];
          if (request.method() !== 'GET') writes.push({ method: request.method(), path: url.pathname, body: request.postData() });
          const r = await localRequest(url.pathname + url.search, { method: request.method(), headers, ...(['GET', 'HEAD'].includes(request.method()) ? {} : { body: request.postData() }) });
          const outgoing = Object.fromEntries(r.headers);
          for (const key of ['set-cookie', 'content-encoding', 'transfer-encoding']) delete outgoing[key];
          return route.fulfill({ status: r.status, headers: outgoing, body: Buffer.from(await r.arrayBuffer()) });
        }
        if (url.origin !== gameOrigin || !['GET', 'HEAD'].includes(request.method())) {
          blocked.push({ url: request.url(), method: request.method() }); return route.abort('blockedbyclient');
        }
        return route.continue();
      });
      page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', r => { if (r.status() >= 400) requests.push({ url: r.url(), status: r.status() }); });
      const ready = async () => {
        await page.waitForFunction(() => window.dragonGroveDiagnostics?.().authenticated && window.dragonGroveDiagnostics?.().graphics?.ready, {}, { timeout: 60000 });
        await page.waitForFunction(() => !window.dragonGroveDiagnostics().busy);
      };
      const diagnostics = () => page.evaluate(() => window.dragonGroveDiagnostics());
      async function unchanged(reason) {
        equal((await read()).state, beforeState, `${label}: ${reason} keeps complete state`);
        equal(await rows(), beforeRows, `${label}: ${reason} keeps all raw saved bytes`);
        equal(await evidence(), beforeEvidence, `${label}: ${reason} keeps complete paginated evidence`);
        equal(writes.length, 0, `${label}: ${reason} sends no game writes`);
      }
      await page.goto(gameOrigin + '/dragon-grove/'); await ready();
      let visual = await diagnostics();
      equal([visual.stage, visual.phase, visual.version, visual.graphics.stage], [beforeState.stage, beforeState.phase, beforeState.version, beforeState.stage], `${label}: frontend and renderer resume saved stage`);
      equal(visual.graphics.paths, beforeState.paths, `${label}: renderer receives exact inherited paths`);
      await unchanged('opening');
      await page.reload(); await ready(); await unchanged('reloading');
      // Preview newborn, an earlier earned form, and the exact current form.
      for (const previewStage of [0, wanted.stage - 1, wanted.stage]) {
        await page.locator('#galleryButton').click(); await page.locator('[data-gallery="0"]').waitFor();
        equal(await page.locator('[data-gallery]:enabled').count(), wanted.stage + 1, `${label}: only earned gallery stages enabled at preview ${previewStage}`);
        await page.locator(`[data-gallery="${previewStage}"]`).click();
        visual = await diagnostics();
        equal([visual.stage, visual.version, visual.graphics.stage], [wanted.stage, beforeState.version, previewStage], `${label}: gallery ${previewStage} changes only presentation`);
        const expectedPaths = Object.fromEntries(PATHS.map(p => [p, beforeState.growth.slice(0, previewStage).filter(g => g.path === p).length]));
        equal(visual.graphics.paths, expectedPaths, `${label}: gallery ${previewStage} replays earned path order`);
        await unchanged('gallery ' + previewStage);
        await page.locator('#returnGrowth').click();
        equal((await diagnostics()).graphics.paths, beforeState.paths, `${label}: gallery restores current path ranks`);
        equal((await diagnostics()).graphics.stage, wanted.stage, `${label}: gallery restores current stage`);
      }
      await page.locator('#journalButton').click(); await page.locator('#evidenceItems').waitFor();
      while (await page.locator('#moreEvidence').count()) {
        const count = await page.locator('.journal-item').count();
        await page.locator('#moreEvidence').click();
        await page.waitForFunction(n => document.querySelectorAll('.journal-item').length > n, count);
      }
      equal(await page.locator('.journal-item').count(), beforeEvidence.length, `${label}: journal displays every saved event`);
      ok((await page.locator('#evidenceItems').innerText()).includes('-999'), `${label}: journal still displays original mistakes`);
      await page.locator('.dialog-close').click(); await unchanged('journal');
      await page.screenshot({ path: `${out}${liveOrigin ? 'live-' : ''}visual-resume-stage-${wanted.stage}.png`, fullPage: true });
      // Deliberately leave the renderer at newborn: the next action must use current saved progress.
      await page.locator('#galleryButton').click(); await page.locator('[data-gallery="0"]').click();
      if (beforeState.phase === 'questions') {
        const q = QUESTIONS.find(q => q.id === beforeState.currentQuestion.id);
        await page.locator(`[data-choice="${q.answer}"]`).click(); await page.locator('#checkAnswer').click();
      } else if (beforeState.phase === 'adventure') {
        // Commit to local D1, lose the response, reload, then retry exactly the same outbox action.
        let loseOnce = true;
        await page.route('**/api/dragon-grove', async route => {
          if (loseOnce && route.request().method() === 'POST') {
            loseOnce = false;
            writes.push({ method: 'POST', path: '/api/dragon-grove', body: route.request().postData(), lostResponse: true });
            const response = await localRequest('/api/dragon-grove', { method: 'POST', body: route.request().postData() });
            assert.equal(response.status, 200, await response.clone().text());
            return route.abort('internetdisconnected');
          }
          return route.fallback();
        });
        await page.locator('[data-power="nature"]').click();
        await page.locator(`[data-target="${ADVENTURES[beforeState.level - 1][beforeState.objectiveIndex].correctTarget}"]`).click();
        await page.locator('#retrySave').waitFor(); await page.unroute('**/api/dragon-grove');
        await page.reload(); await page.locator('#retrySave').waitFor();
        await page.waitForFunction(() => window.dragonGroveDiagnostics?.().graphics?.ready, {}, { timeout: 60000 });
        await page.locator('#retrySave').click();
      } else await page.locator('[data-action="next"]').click();
      await page.waitForFunction(version => window.dragonGroveDiagnostics?.().version === version && !window.dragonGroveDiagnostics().busy && document.querySelector('#saveStatus')?.textContent.startsWith('Adventure saved'), beforeState.version + 1);
      const afterState = (await read()).state, afterRows = await rows(), afterEvidence = await evidence();
      equal(afterRows.length, beforeRows.length + 1, `${label}: next action appends exactly one event`);
      equal(afterRows.slice(0, -1), beforeRows, `${label}: next action preserves every original event byte`);
      equal(afterEvidence.slice(1), beforeEvidence, `${label}: next action preserves original evidence`);
      equal([afterState.stage, afterState.paths, afterState.growth], [beforeState.stage, beforeState.paths, beforeState.growth], `${label}: next action keeps earned evolution unchanged`);
      equal(afterState.phase, beforeState.phase === 'questions' ? 'questions' : beforeState.phase === 'adventure' ? 'celebrate' : 'questions', `${label}: next legitimate transition succeeds`);
      equal(afterState.level, beforeState.level + (beforeState.phase === 'celebrate' ? 1 : 0), `${label}: next action continues correct chapter`);
      if (beforeState.phase === 'questions') equal(afterState.questionIndex, beforeState.questionIndex + 1, `${label}: next action continues exact unanswered question`);
      equal(writes.length, beforeState.phase === 'adventure' ? 2 : 1, `${label}: expected original/retry request count`);
      if (beforeState.phase === 'adventure') equal(JSON.parse(writes[0].body), JSON.parse(writes[1].body), `${label}: response-loss retry reuses identical operation`);
      equal((await diagnostics()).graphics.stage, wanted.stage, `${label}: action restores current visual stage after gallery preview`);
      await page.reload(); await ready();
      equal((await read()).state, afterState, `${label}: next action survives reopening`);
      equal(await rows(), afterRows, `${label}: reopening next action appends nothing`);
      equal(await unrelated(), beforeOther, `${label}: child profiles, legacy records and other games unchanged`);
      equal(errors, [], `${label}: no browser script errors`); equal(requests, [], `${label}: no failed asset/API responses`); equal(blocked, [], `${label}: no external or unapproved requests`);
      scenarios.push({ stage: wanted.stage, phase: beforeState.phase, beforeVersion: beforeState.version, afterVersion: afterState.version,
        originalEventCount: beforeRows.length, originalEventHash: digest(beforeRows), preservedEventHash: digest(afterRows.slice(0, -1)),
        paths: beforeState.paths, lostResponseReplay: beforeState.phase === 'adventure', graphics: (await diagnostics()).graphics });
      console.log(`${label}: reload, gallery, history and next-action preservation passed`);
    } catch (error) {
      if (page) await page.screenshot({ path: `${out}visual-resume-failure-${wanted.stage}.png`, fullPage: true }).catch(() => {});
      console.error(JSON.stringify({ stage: wanted.stage, errors, requests, blocked })); throw error;
    } finally { await context?.close(); await h.close(); }
  }
  await writeFile(`${out}${liveOrigin ? 'live-' : ''}visual-resume-qa.json`, JSON.stringify({ checks: checks.length, details: checks, scenarios,
    synthetic: true, api: 'Ephemeral local D1', assetOrigin: liveOrigin || 'local working tree', productionLearnerWrites: 0, completedAt: new Date().toISOString() }, null, 2));
  console.log(`Dragon visual-resume regression passed ${checks.length} checks across stages 4, 5 and 6.`);
} finally { await browser.close(); }
