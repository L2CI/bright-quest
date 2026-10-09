import assert from 'node:assert/strict';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { onRequestGet, onRequestPost, TYPE, PREFIX } from '../functions/api/dragon-grove.js';
import { onRequestPost as postEvent } from '../functions/api/events.js';
import { onRequestGet as getProfiles } from '../functions/api/profiles.js';
import { QUESTIONS } from '../functions/_lib/dragon-grove-content.js';
import { ADVENTURES, PATHS } from '../functions/_lib/dragon-grove.js';
import { sha256 } from '../functions/_lib/family-auth.js';

// Real ephemeral D1 and fictional families. This never connects to a production binding.
const harness = await startSparkboundQa({ port: 0 });
const { origin, fixture: f, db } = harness;
const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: 'true', BQ_FAMILY_AUTH_MIGRATION_READY: 'true' };
const headersFor = family => ({ cookie: `bq_session=${family.cookie.value}`, origin, 'x-bq-child-id': family.childId,
  'x-bq-child-capability': family.childCapability, 'content-type': 'application/json' });
const headers = headersFor(f), parentHeaders = { ...headers, 'x-bq-parent-capability': f.parentCapability };
let checks = 0;
const equal = (actual, expected, message) => { assert.deepEqual(actual, expected, message); checks++; };
const ok = (value, message) => { assert.ok(value, message); checks++; };
async function request({ body, raw, path = '/api/dragon-grove', useHeaders = headers, useEnv = env, handler } = {}) {
  const post = body !== undefined || raw !== undefined;
  const response = await (handler || (post ? onRequestPost : onRequestGet))({ env: useEnv, request: new Request(origin + path, {
    headers: useHeaders, ...(post ? { method: 'POST', body: raw ?? JSON.stringify(body) } : {})
  }) });
  return { status: response.status, body: await response.json(), headers: response.headers };
}
const op = (version, action) => ({ version, action, operationId: crypto.randomUUID() });
const read = async () => (await request()).body.state;
const eventCount = async () => (await db.prepare('SELECT COUNT(*) AS n FROM family_profile_events WHERE event_type=?').bind(TYPE).first()).n;
async function command(action) {
  const state = await read(), response = await request({ body: op(state.version, action) });
  equal(response.status, 200, JSON.stringify(response.body)); return response.body.state;
}
async function snapshot() {
  const output = {};
  for (const table of ['families', 'family_users', 'child_profiles', 'app_profiles', 'app_events', 'beacon_brigade_states', 'beacon_brigade_operations', 'sparkbound_states', 'sparkbound_operations']) {
    output[table] = (await db.prepare(`SELECT * FROM ${table} ORDER BY rowid`).all()).results;
  }
  output.unrelatedEvents = (await db.prepare('SELECT * FROM family_profile_events WHERE event_type!=? ORDER BY rowid').bind(TYPE).all()).results;
  return output;
}
function interceptInsert(callback) {
  return { prepare(sql) { const statement = db.prepare(sql); return { bind(...args) { const bound = statement.bind(...args);
    return { first: (...a) => bound.first(...a), all: (...a) => bound.all(...a), async run(...a) {
      if (sql.includes('INSERT INTO family_profile_events')) await callback(); return bound.run(...a);
    } }; } }; } };
}

try {
  const legacyAt = '2026-08-01T00:00:00.000Z';
  await db.prepare('INSERT INTO app_profiles (id,app_id,profile_id,profile_name,stars,payload_json,updated_at,created_at) VALUES (?,?,?,?,?,?,?,?)')
    .bind('dragon-preservation-legacy', 'bright-quest', 'dragon-preservation-profile', 'Original legacy learner', 47,
      JSON.stringify({ writing: 'Keep my original story', activeDraft: { answers: [0, 'full original text'] }, extra: { retained: true } }), legacyAt, legacyAt).run();
  await db.prepare('INSERT INTO app_events (id,app_id,profile_id,event_type,payload_json,created_at) VALUES (?,?,?,?,?,?)')
    .bind('dragon-preservation-event', 'bright-quest', 'dragon-preservation-profile', 'original-test-result', JSON.stringify({ score: 7, answers: ['original answer'], support: false }), legacyAt).run();
  for (const game of ['beacon_brigade', 'sparkbound']) {
    const at = '2026-09-01T00:00:00.000Z';
    await db.prepare(`INSERT INTO ${game}_states (family_id,child_id,version,state_json,last_operation_id,created_at,updated_at) VALUES (?,?,1,?,?,?,?)`)
      .bind(f.familyId, f.childId, JSON.stringify({ version: 1, preserved: { draft: 'Original work', stars: 47, completed: ['mission-a'] } }), 'preserved-operation', at, at).run();
    await db.prepare(`INSERT INTO ${game}_operations (family_id,child_id,operation_id,request_hash,expected_version,result_version,feedback_json,created_at) VALUES (?,?,'preserved-operation',?,0,1,?,?)`)
      .bind(f.familyId, f.childId, 'c'.repeat(64), JSON.stringify({ preserved: true }), at).run();
  }
  await db.prepare('INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES (?,?,?,?,?,?,?)')
    .bind(crypto.randomUUID(), f.familyId, f.childId, 'skyforge.state.v1', 'skyforge:v1:0000000001', JSON.stringify({ state: { version: 1, mission: 7, attempts: [{ answer: 144, correct: false }], kit: { cannon: 1, armour: 1, reactor: 1 } } }), '2026-10-01T00:00:00.000Z').run();
  const initialCount = await eventCount();
  equal(initialCount, 0);
  equal((await request({ useHeaders: {} })).status, 401, 'unauthenticated reads rejected');
  equal((await request({ useHeaders: { cookie: headers.cookie } })).status, 409, 'multi-child capability required');
  equal((await request({ useHeaders: { ...headers, 'x-bq-child-capability': 'wrong' } })).status, 409);
  equal((await request({ path: `/?childId=${f.childId}` })).status, 403, 'parent evidence capability required');
  equal((await request({ path: `/?childId=${f.otherFamily.childId}`, useHeaders: parentHeaders })).status, 404);
  equal((await request({ path: `/?childId=${f.otherFamily.legacyId}`, useHeaders: parentHeaders })).status, 404);
  equal((await request({ path: `/?childId=${f.legacyId}`, useHeaders: parentHeaders })).body.profile.id, f.childId);
  equal((await request({ path: `/?childId=${f.children[1].id}`, useHeaders: parentHeaders })).body.state.version, 0);
  equal((await request({ useEnv: { ...env, BQ_FAMILY_AUTH_ENABLED: 'false' } })).status, 404);
  equal((await request()).headers.get('cache-control'), 'no-store');
  equal((await request()).body.evidence, { items: [], nextCursor: null });
  equal(await eventCount(), 0, 'GET never creates a dragon');
  for (const query of ['limit=0', 'limit=101', 'limit=no', 'before=0', 'before=1.5', 'before=10000000001']) equal((await request({ path: '/api/dragon-grove?' + query })).status, 400, query);

  const first = op(0, { type: 'begin', name: 'Aster' });
  for (const [override, status] of [
    [{ useHeaders: { ...headers, origin: 'https://elsewhere.invalid' } }, 403],
    [{ useHeaders: { ...headers, origin: '' } }, 403],
    [{ useHeaders: { ...headers, 'x-bq-child-id': f.children[1].id } }, 403],
    [{ useHeaders: { ...headers, 'content-type': 'text/plain' } }, 415],
    [{ path: `/api/dragon-grove?childId=${f.childId}`, useHeaders: parentHeaders }, 403],
    [{ body: { ...first, version: -1 } }, 400], [{ body: { ...first, version: 1.5 } }, 400],
    [{ body: { ...first, operationId: 'short' } }, 400], [{ body: { ...first, operationId: '<script>123456789' } }, 400],
    [{ raw: 'null' }, 400], [{ raw: '[]' }, 400], [{ raw: '42' }, 400], [{ raw: '{' }, 400],
    [{ raw: JSON.stringify({ padding: 'x'.repeat(6000) }) }, 413],
    [{ body: op(0, { type: 'evolve', path: 'fire' }) }, 400], [{ body: op(0, { type: 'begin', name: '<script>' }) }, 400]
  ]) equal((await request({ body: first, ...override })).status, status);
  equal(await eventCount(), 0, 'invalid actions never create progress');
  for (const [eventType, eventId] of [[TYPE, 'ordinary'], ['ordinary', PREFIX + '0000000001'], [TYPE.toUpperCase(), 'ordinary'], ['ordinary', PREFIX.toUpperCase() + '0000000001']]) {
    equal((await request({ handler: postEvent, path: '/api/events', body: { eventType, eventId, payload: { state: { phase: 'complete' } } } })).status, 403, 'reserved namespace cannot be forged');
  }
  equal((await request({ handler: postEvent, path: '/api/events', body: { eventType: 'dragon-grove-lookalike', eventId: 'ordinary-' + crypto.randomUUID(), payload: { preserved: true } } })).status, 200);
  const before = await snapshot();

  const duplicate = await Promise.all([request({ body: first }), request({ body: first })]);
  equal(duplicate.map(r => r.status), [200, 200]); equal(await eventCount(), 1); equal((await read()).version, 1);
  ok(duplicate.some(r => r.body.replayed), 'duplicate write replays one receipt');
  equal((await request({ body: { ...first, action: { type: 'begin', name: 'Changed' } } })).status, 409);
  equal((await request({ body: op(0, { type: 'begin', name: 'Other' }) })).status, 409);
  equal((await request({ body: op(999, { type: 'begin', name: 'Future' }) })).status, 409);
  let s = await read(); const question = s.currentQuestion;
  ok(!('answer' in question) && !('accepted' in question) && !('questionSet' in s), 'private answers and future assignments omitted');
  equal((await request({ body: op(s.version, { type: 'answer', questionId: 'forged-future', answer: '1' }) })).status, 400);
  equal((await request({ body: op(s.version, { type: 'answer', questionId: question.id, answer: { value: 1 } }) })).status, 400);
  const race = await Promise.all([
    request({ body: op(s.version, { type: 'hint', questionId: question.id }) }),
    request({ body: op(s.version, { type: 'answer', questionId: question.id, answer: '-987654' }) })
  ]);
  equal(race.map(r => r.status).sort(), [200, 409]); equal((await read()).version, 2); equal(await eventCount(), 2);
  s = await read(); if (!s.hintUsed) s = await command({ type: 'hint', questionId: question.id });
  s = await command({ type: 'answer', questionId: question.id, answer: '-987654' });
  equal(s.lastEvent.correct, false); equal(s.lastEvent.hintUsed, true); equal(s.stage, 0); equal(s.questionIndex, 0);
  const wrong = structuredClone(s.lastEvent);

  const stateBeforeFailure = await read();
  const answer = String(QUESTIONS.find(q => q.id === stateBeforeFailure.currentQuestion.id).answer);
  const answerAction = { type: 'answer', questionId: stateBeforeFailure.currentQuestion.id, answer };
  await db.exec(`CREATE TRIGGER dragon_qa_failure BEFORE INSERT ON family_profile_events WHEN NEW.event_type='${TYPE}' BEGIN SELECT RAISE(ABORT,'Synthetic save failure'); END;`);
  equal((await request({ body: op(stateBeforeFailure.version, answerAction) })).status, 500);
  equal(await read(), stateBeforeFailure, 'failed database write keeps confirmed progress');
  await db.exec('DROP TRIGGER dragon_qa_failure;');
  const sessionId = await sha256(f.cookie.value), savedSession = await db.prepare('SELECT * FROM family_sessions WHERE id=?').bind(sessionId).first();
  const restoreSession = async () => {
    const keys = Object.keys(savedSession);
    await db.prepare(`INSERT OR REPLACE INTO family_sessions (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`).bind(...keys.map(k => savedSession[k])).run();
  };
  for (const [name, mutate] of [
    ['child switch', () => db.prepare('UPDATE family_sessions SET active_child_id=? WHERE id=?').bind(f.children[1].id, sessionId).run()],
    ['capability rotation', () => db.prepare('UPDATE family_sessions SET child_capability_hash=? WHERE id=?').bind('b'.repeat(64), sessionId).run()],
    ['capability expiry', () => db.prepare('UPDATE family_sessions SET child_capability_expires_at=? WHERE id=?').bind('2000-01-01T00:00:00.000Z', sessionId).run()],
    ['session expiry', () => db.prepare('UPDATE family_sessions SET expires_at=? WHERE id=?').bind('2000-01-01T00:00:00.000Z', sessionId).run()],
    ['idle expiry', () => db.prepare('UPDATE family_sessions SET last_seen_at=? WHERE id=?').bind('2000-01-01T00:00:00.000Z', sessionId).run()],
    ['sign-out', () => db.prepare('DELETE FROM family_sessions WHERE id=?').bind(sessionId).run()]
  ]) {
    const count = await eventCount();
    equal((await request({ body: op(stateBeforeFailure.version, answerAction), useEnv: { ...env, DB: interceptInsert(mutate) } })).status, 403, name);
    equal(await eventCount(), count, name + ' writes nothing'); await restoreSession(); equal(await read(), stateBeforeFailure);
  }

  for (let level = 1; level <= 10; level++) {
    s = await read();
    while (s.phase === 'questions') {
      const q = QUESTIONS.find(q => q.id === s.currentQuestion.id);
      s = await command({ type: 'answer', questionId: q.id, answer: String(q.answer) });
    }
    equal(s.phase, 'evolution'); equal(s.level, level);
    s = await command({ type: 'evolve', path: PATHS[(level - 1) % 4] }); equal(s.stage, level);
    while (s.phase === 'adventure') {
      ok(!('correctTarget' in s.adventure));
      const objective = ADVENTURES[level - 1][s.objectiveIndex];
      s = await command({ type: 'adventure', targetId: objective.correctTarget, power: PATHS[(level - 1) % 4] });
    }
    if (level < 10) s = await command({ type: 'next' });
  }
  equal(s.phase, 'complete'); equal(s.counters.correct, 30); equal(s.stage, 10); equal(s.growth.length, 10);
  equal((await request({ body: op(s.version, { type: 'next' }) })).status, 400);
  equal((await request({ body: first })).body.state, s, 'late retry returns latest state');

  const rows = (await db.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=? ORDER BY idempotency_key').bind(f.familyId, f.childId, TYPE).all()).results;
  ok(rows.every(r => new TextEncoder().encode(r.payload_json).length < 12000), 'compact snapshots remain bounded after full campaign');
  const payloads = rows.map(r => JSON.parse(r.payload_json));
  ok(payloads.some(p => JSON.stringify(p.event) === JSON.stringify(wrong)), 'original wrong attempt remains immutable');
  ok(payloads.every(p => !('attempts' in p.state)), 'history is not copied into every snapshot');
  const evidence = []; let cursor = null;
  do {
    const response = await request({ path: `/api/dragon-grove?childId=${f.childId}&limit=7${cursor ? '&before=' + cursor : ''}`, useHeaders: parentHeaders });
    equal(response.status, 200); evidence.push(...response.body.evidence.items); cursor = response.body.evidence.nextCursor;
  } while (cursor);
  equal(evidence.length, rows.length); equal(new Set(evidence.map(e => e.version)).size, rows.length);
  equal(evidence.map(e => e.version), Array.from({ length: rows.length }, (_, i) => rows.length - i), 'pagination returns each operation exactly once');
  equal((await request()).body.evidence.items, (await request({ path: `/api/dragon-grove?childId=${f.childId}`, useHeaders: parentHeaders })).body.evidence.items, 'child journal and parent review expose exact same own evidence');
  equal((await request({ handler: getProfiles, path: '/api/profiles', useHeaders: parentHeaders })).body.profiles.some(p => JSON.stringify(p.payload).includes('dragon-grove')), false, 'generic profile listing contains no game events');
  const childCount = rows.length;
  equal((await request({ useHeaders: headersFor(f.otherFamily) })).body.state.version, 0);
  equal((await request({ body: first, useHeaders: headersFor(f.otherFamily) })).status, 200);
  equal((await db.prepare('SELECT COUNT(*) AS n FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=?').bind(f.familyId, f.childId, TYPE).first()).n, childCount);
  equal(await snapshot(), before, 'all existing profiles, other games and unrelated events remain byte-identical');

  const last = rows.at(-1).payload_json, corrupt = JSON.parse(last); corrupt.state.stage = 99;
  const lastKey = PREFIX + String(s.version).padStart(10, '0');
  await db.prepare('UPDATE family_profile_events SET payload_json=? WHERE family_id=? AND child_id=? AND idempotency_key=?').bind(JSON.stringify(corrupt), f.familyId, f.childId, lastKey).run();
  equal((await request()).status, 500, 'corrupt state fails safely'); equal(await eventCount(), childCount + 1, 'corrupt read never resets campaign');
  await db.prepare('UPDATE family_profile_events SET payload_json=? WHERE family_id=? AND child_id=? AND idempotency_key=?').bind(last, f.familyId, f.childId, lastKey).run();
  equal(await read(), s);
  console.log(`Dragon Grove API QA passed: ${checks} assertions; real ephemeral D1, ten-level campaign, strict auth, replay/concurrency, six session races, read-only journals, compact immutable evidence and existing-data preservation.`);
} finally { await harness.close(); }
