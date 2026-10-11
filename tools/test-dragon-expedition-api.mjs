import assert from 'node:assert/strict';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { onRequestGet, onRequestPost, TYPE, PREFIX } from '../functions/api/dragon-expedition.js';
import { onRequestPost as postEvent } from '../functions/api/events.js';
import { onRequestGet as getProfiles } from '../functions/api/profiles.js';
import { QUESTIONS } from '../functions/_lib/dragon-expedition-content.js';
import { createState, applyAction, publicState, ADVENTURES, PATHS } from '../functions/_lib/dragon-grove.js';
import { QUESTIONS as ORIGINAL_QUESTIONS } from '../functions/_lib/dragon-grove-content.js';
import { sha256 } from '../functions/_lib/family-auth.js';

// Real ephemeral D1, fictional families and a deterministic server clock; no production bindings.
const h = await startSparkboundQa({ port: 0 }), { origin, fixture: f, db } = h;
const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: 'true', BQ_FAMILY_AUTH_MIGRATION_READY: 'true' };
const headersFor = family => ({ cookie: `bq_session=${family.cookie.value}`, origin, 'x-bq-child-id': family.childId, 'x-bq-child-capability': family.childCapability, 'content-type': 'application/json' });
const headers = headersFor(f), parentHeaders = { ...headers, 'x-bq-parent-capability': f.parentCapability };
const actualNow = Date.now; let clock = actualNow(), checks = 0;
const equal = (actual, expected, label) => { assert.deepEqual(actual, expected, label); checks++; };
const ok = (condition, label) => { assert.ok(condition, label); checks++; };
const op = (version, action) => ({ version, operationId: crypto.randomUUID(), action });
async function request({ body, raw, path = '/api/dragon-expedition', useHeaders = headers, useEnv = env, handler } = {}) {
  const post = body !== undefined || raw !== undefined;
  const response = await (handler || (post ? onRequestPost : onRequestGet))({ env: useEnv, request: new Request(origin + path, { headers: useHeaders,
    ...(post ? { method: 'POST', body: raw ?? JSON.stringify(body) } : {}) }) });
  return { status: response.status, body: await response.json(), headers: response.headers };
}
const read = async () => (await request()).body.state;
const count = async () => (await db.prepare('SELECT COUNT(*) AS n FROM family_profile_events WHERE event_type=?').bind(TYPE).first()).n;
async function command(action) { const s = await read(), response = await request({ body: op(s.version, action) }); equal(response.status, 200, JSON.stringify(response.body)); return response.body.state; }
async function originalRows(child, family = f.familyId, stopStage = 10) {
  let s = createState(child), first = true;
  while (s.phase !== 'complete' && (first || s.stage < stopStage)) {
    first = false;
    if (s.phase === 'welcome') s = applyAction(s, { type: 'begin', name: 'Willow' });
    else if (s.phase === 'questions') { const q = ORIGINAL_QUESTIONS.find(q => q.id === publicState(s).currentQuestion.id); s = applyAction(s, { type: 'answer', questionId: q.id, answer: String(q.answer) }); }
    else if (s.phase === 'evolution') s = applyAction(s, { type: 'evolve', path: PATHS[(s.level - 1) % 4] });
    else if (s.phase === 'adventure') s = applyAction(s, { type: 'adventure', power: PATHS[(s.level - 1) % 4], targetId: ADVENTURES[s.level - 1][s.objectiveIndex].correctTarget });
    else s = applyAction(s, { type: 'next' });
    await db.prepare('INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES (?,?,?,?,?,?,?)')
      .bind(crypto.randomUUID(), family, child, 'dragon-grove.state.v1', 'dragon-grove:v1:' + String(s.version).padStart(10, '0'),
        JSON.stringify({ operationId: crypto.randomUUID(), state: s, event: s.lastEvent, hash: 'fictional-existing-operation' }), new Date(clock).toISOString()).run();
  }
  // The final growth happens before its adventure, so finish that final adventure for completed fixtures.
  if (stopStage === 10) while (s.phase !== 'complete') {
    s = applyAction(s, { type: 'adventure', power: 'fire', targetId: ADVENTURES[s.level - 1][s.objectiveIndex].correctTarget });
    await db.prepare('INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES (?,?,?,?,?,?,?)')
      .bind(crypto.randomUUID(), family, child, 'dragon-grove.state.v1', 'dragon-grove:v1:' + String(s.version).padStart(10, '0'),
        JSON.stringify({ operationId: crypto.randomUUID(), state: s, event: s.lastEvent, hash: 'fictional-existing-operation' }), new Date(clock).toISOString()).run();
  }
  return s;
}
async function preserve() {
  const data = {};
  for (const table of ['families', 'family_users', 'child_profiles', 'app_profiles', 'app_events', 'beacon_brigade_states', 'beacon_brigade_operations', 'sparkbound_states', 'sparkbound_operations'])
    data[table] = (await db.prepare(`SELECT * FROM ${table} ORDER BY rowid`).all()).results;
  data.otherEvents = (await db.prepare('SELECT * FROM family_profile_events WHERE event_type!=? ORDER BY rowid').bind(TYPE).all()).results;
  return data;
}
const checkpoint = (s, activeMs, paused = false) => ({ type: 'minigame-checkpoint', runId: s.minigame.runId, seq: s.minigame.checkpointSeq + 1, activeMs,
  score: 100, hits: 3, misses: 1, combo: 2, bestCombo: 3, powerUses: { fire: 2, storm: 0, nature: 0, astral: 0 }, paused,
  snapshot: { v: 1, tick: activeMs / 50, player: [.2, .5], aim: [.8, .5], spawnIndex: 10, shotSeq: 10, cooldowns: [0, 0, 0, 0], entities: [[1, 0, .7, .5, 2, 60]], projectiles: [] } });
function interceptInsert(callback) {
  return { prepare(sql) { const statement = db.prepare(sql); return { bind(...args) { const bound = statement.bind(...args); return {
    first: (...a) => bound.first(...a), all: (...a) => bound.all(...a), async run(...a) { if (sql.includes('INSERT INTO family_profile_events')) await callback(); return bound.run(...a); },
  }; } }; } };
}

try {
  Date.now = () => clock;
  // Long virtual-time cases keep only the fictional capability expiry open. Auth checks still run normally.
  await db.prepare("UPDATE family_sessions SET expires_at='2099-01-01T00:00:00.000Z',parent_unlocked_until='2099-01-01T00:00:00.000Z',child_capability_expires_at='2099-01-01T00:00:00.000Z'").run();
  equal((await request()).body.locked, true); equal((await request()).body.state, null); equal(await count(), 0);
  equal((await request({ body: op(0, { type: 'begin' }) })).status, 403, 'missing original cannot start Chapter II');
  await originalRows(f.children[1].id, f.familyId, 4);
  const mid = await request({ path: `/?childId=${f.children[1].id}`, useHeaders: parentHeaders });
  equal(mid.status, 200); equal(mid.body.locked, true); equal(mid.body.continueUrl, '/dragon-grove/');
  const source = await originalRows(f.childId), before = await preserve();
  equal(source.phase, 'complete'); equal((await request()).body.locked, false); equal((await read()).phase, 'welcome');
  equal(await count(), 0, 'preview GET writes nothing'); equal((await request()).headers.get('cache-control'), 'no-store');
  equal((await read()).dragon.paths, source.paths); equal((await read()).dragon.growth, source.growth);
  equal((await request()).body.owner, `${f.familyId}:${f.childId}:dragon-expedition`, 'independent outbox owner');
  equal((await request({ useHeaders: {} })).status, 401); equal((await request({ useHeaders: { cookie: headers.cookie } })).status, 409);
  equal((await request({ useHeaders: { ...headers, 'x-bq-child-capability': 'wrong' } })).status, 409);
  equal((await request({ path: `/?childId=${f.childId}` })).status, 403);
  equal((await request({ path: `/?childId=${f.otherFamily.childId}`, useHeaders: parentHeaders })).status, 404);
  equal((await request({ path: `/?childId=${f.legacyId}`, useHeaders: parentHeaders })).body.state.dragon.sourceVersion, source.version);
  equal((await request({ useEnv: { ...env, BQ_FAMILY_AUTH_ENABLED: 'false' } })).status, 404);
  for (const query of ['limit=0', 'limit=101', 'limit=bad', 'before=0', 'before=1.5', 'before=10000000001']) equal((await request({ path: '/api/dragon-expedition?' + query })).status, 400);
  const first = op(0, { type: 'begin' });
  for (const [override, status] of [
    [{ useHeaders: { ...headers, origin: 'https://unrelated.invalid' } }, 403], [{ useHeaders: { ...headers, origin: '' } }, 403],
    [{ useHeaders: { ...headers, 'x-bq-child-id': f.children[1].id } }, 403], [{ useHeaders: { ...headers, 'content-type': 'text/plain' } }, 415],
    [{ path: `/?childId=${f.childId}`, useHeaders: parentHeaders }, 403], [{ body: { ...first, version: -1 } }, 400], [{ body: { ...first, operationId: 'short' } }, 400],
    [{ raw: 'null' }, 400], [{ raw: '{' }, 400], [{ raw: JSON.stringify({ huge: 'x'.repeat(12001) }) }, 413], [{ body: op(0, { type: 'next' }) }, 400],
  ]) equal((await request({ body: first, ...override })).status, status);
  equal(await count(), 0, 'invalid requests do not create chapter rows');
  for (const [eventType, eventId] of [[TYPE, 'ordinary'], ['ordinary', PREFIX + '0000000001'], [TYPE.toUpperCase(), 'ordinary'], ['ordinary', PREFIX.toUpperCase() + '0000000001']])
    equal((await request({ handler: postEvent, path: '/api/events', body: { eventType, eventId, payload: { forged: true } } })).status, 403);
  const duplicate = await Promise.all([request({ body: first }), request({ body: first })]);
  equal(duplicate.map(r => r.status), [200, 200]); ok(duplicate.some(r => r.body.replayed)); equal(await count(), 1);
  equal((await request({ body: { ...first, action: { type: 'begin', changed: true } } })).status, 409);
  equal((await request({ body: op(0, { type: 'begin' }) })).status, 409);
  let s = await read(), q = QUESTIONS.find(q => q.id === s.currentQuestion.id);
  equal(s.currentQuestion.answer, undefined); equal(s.currentQuestion.hint, undefined);
  const race = await Promise.all([request({ body: op(s.version, { type: 'hint', questionId: q.id }) }), request({ body: op(s.version, { type: 'answer', questionId: q.id, answer: '-999' }) })]);
  equal(race.map(r => r.status).sort(), [200, 409]); s = await read();
  if (!s.hintUsed) s = await command({ type: 'hint', questionId: q.id });
  s = await command({ type: 'answer', questionId: q.id, answer: '-999' });
  const wrong = structuredClone(s.lastEvent); equal(wrong.correct, false); equal(wrong.hintUsed, true);
  const beforeFailure = await read(), answerAction = { type: 'answer', questionId: q.id, answer: String(q.answer) };
  await db.exec(`CREATE TRIGGER expedition_qa_failure BEFORE INSERT ON family_profile_events WHEN NEW.event_type='${TYPE}' BEGIN SELECT RAISE(ABORT,'Synthetic save failure'); END;`);
  equal((await request({ body: op(beforeFailure.version, answerAction) })).status, 500); equal(await read(), beforeFailure);
  await db.exec('DROP TRIGGER expedition_qa_failure;');
  const sessionId = await sha256(f.cookie.value), savedSession = await db.prepare('SELECT * FROM family_sessions WHERE id=?').bind(sessionId).first();
  const restore = async () => { const keys = Object.keys(savedSession); await db.prepare(`INSERT OR REPLACE INTO family_sessions (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`).bind(...keys.map(k => savedSession[k])).run(); };
  for (const [name, mutate] of [
    ['child switch', () => db.prepare('UPDATE family_sessions SET active_child_id=? WHERE id=?').bind(f.children[1].id, sessionId).run()],
    ['capability rotation', () => db.prepare('UPDATE family_sessions SET child_capability_hash=? WHERE id=?').bind('b'.repeat(64), sessionId).run()],
    ['capability expiry', () => db.prepare("UPDATE family_sessions SET child_capability_expires_at='2000-01-01T00:00:00.000Z' WHERE id=?").bind(sessionId).run()],
    ['session expiry', () => db.prepare("UPDATE family_sessions SET expires_at='2000-01-01T00:00:00.000Z' WHERE id=?").bind(sessionId).run()],
    ['idle expiry', () => db.prepare("UPDATE family_sessions SET last_seen_at='2000-01-01T00:00:00.000Z' WHERE id=?").bind(sessionId).run()],
    ['sign-out', () => db.prepare('DELETE FROM family_sessions WHERE id=?').bind(sessionId).run()],
  ]) { const beforeCount = await count(); equal((await request({ body: op(beforeFailure.version, answerAction), useEnv: { ...env, DB: interceptInsert(mutate) } })).status, 403, name); equal(await count(), beforeCount); await restore(); equal(await read(), beforeFailure); }
  for (let block = 1; block <= 6; block++) {
    s = await read();
    while (s.phase === 'questions') { q = QUESTIONS.find(q => q.id === s.currentQuestion.id); s = await command({ type: 'answer', questionId: q.id, answer: String(q.answer) }); }
    equal(s.phase, 'minigame'); equal(s.block, block); equal(s.minigame.activeMs, 0); equal(s.minigame.paused, true);
    equal((await request({ body: op(s.version, { type: 'next' }) })).status, 400);
    equal((await request({ body: op(s.version, { type: 'minigame-complete', runId: s.minigame.runId }) })).status, 400);
    s = await command({ type: 'minigame-resume', runId: s.minigame.runId });
    equal((await request({ body: op(s.version, checkpoint(s, 10000)) })).status, 400, 'client cannot fast-forward server clock');
    for (let activeMs = 10000; activeMs <= 300000; activeMs += 10000) {
      clock += 10000;
      const body = op(s.version, checkpoint(s, activeMs, activeMs === 300000 || block === 1 && activeMs === 10000));
      const response = await request({ body }); equal(response.status, 200, JSON.stringify(response.body)); s = response.body.state;
      if (block === 1 && activeMs === 10000) {
        const confirmed = structuredClone(s), confirmedCount = await count();
        // The caller lost this successful response. An identical retry returns it without another event.
        const retry = await request({ body }); equal(retry.status, 200); equal(retry.body.replayed, true); equal(retry.body.state, confirmed); equal(await count(), confirmedCount);
        clock += 3600000; equal(await read(), confirmed, 'an hour away never adds active time');
        equal((await request({ body: op(s.version, checkpoint(s, 20000)) })).status, 400, 'paused checkpoints cannot move');
        s = await command({ type: 'minigame-resume', runId: s.minigame.runId }); equal(s.minigame.activeMs, 10000); equal(s.minigame.snapshot, confirmed.minigame.snapshot);
        equal((await request({ body: op(s.version, checkpoint(s, 20000)) })).status, 400, 'resuming starts fresh active-time allowance');
      }
    }
    equal(s.minigame.activeMs, 300000); equal(s.minigame.paused, true);
    s = await command({ type: 'minigame-complete', runId: s.minigame.runId }); equal(s.results.length, block); equal(s.phase, block === 6 ? 'complete' : 'reward');
    if (block < 6) s = await command({ type: 'next' });
  }
  equal(s.counters.correct, 30); equal(s.completedBlocks, [1, 2, 3, 4, 5, 6]); equal(s.stats.activeMs, 1800000);
  equal(s.dragon.name, source.name); equal(s.dragon.stage, 10); equal(s.dragon.paths, source.paths); equal(s.dragon.growth, source.growth);
  equal((await request({ body: first })).body.state, s, 'late begin replay returns latest completed chapter');
  const rows = (await db.prepare('SELECT * FROM family_profile_events WHERE event_type=? ORDER BY idempotency_key').bind(TYPE).all()).results;
  equal(rows.length, s.version); ok(rows.every(r => new TextEncoder().encode(r.payload_json).length < 10000), 'snapshots remain compact');
  ok(rows.some(r => JSON.stringify(JSON.parse(r.payload_json).event) === JSON.stringify(wrong)), 'original mistake remains immutable');
  const evidence = []; let cursor = null;
  do { const result = await request({ path: `/?childId=${f.childId}&limit=17${cursor ? '&before=' + cursor : ''}`, useHeaders: parentHeaders }); equal(result.status, 200); evidence.push(...result.body.evidence.items); cursor = result.body.evidence.nextCursor; } while (cursor);
  equal(evidence.length, rows.length); equal(evidence.map(e => e.version), Array.from({ length: rows.length }, (_, i) => rows.length - i));
  equal((await request()).body.evidence.items, (await request({ path: `/?childId=${f.childId}`, useHeaders: parentHeaders })).body.evidence.items);
  equal((await request({ handler: getProfiles, path: '/api/profiles', useHeaders: parentHeaders })).body.profiles.some(p => JSON.stringify(p.payload).includes('dragon-expedition')), false);
  equal((await request({ useHeaders: headersFor(f.otherFamily) })).body.locked, true); equal(await count(), rows.length);
  equal(await preserve(), before, 'all original complete/mid-campaign events, child profiles and other games remain byte-identical');
  const last = rows.at(-1), corrupt = JSON.parse(last.payload_json); corrupt.state.dragon.stage = 0;
  await db.prepare('UPDATE family_profile_events SET payload_json=? WHERE id=?').bind(JSON.stringify(corrupt), last.id).run();
  equal((await request()).status, 500); equal(await count(), rows.length, 'corrupt saved state never resets or rewrites records');
  await db.prepare('UPDATE family_profile_events SET payload_json=? WHERE id=?').bind(last.payload_json, last.id).run(); equal(await read(), s);
  console.log(`Dragon expedition API passed ${checks} assertions: real ephemeral D1, six five-minute trials, all question gates, clock bounds, replay, parent evidence, six commit-session races and original-data preservation.`);
} finally { Date.now = actualNow; await h.close(); }
