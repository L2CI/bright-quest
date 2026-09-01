import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after, before } from "node:test";
import { Miniflare } from "miniflare";
import { onRequestGet, onRequestPost } from "../functions/api/beacon-brigade.js";
import { applyAction, createState } from "../functions/_lib/beacon-brigade.js";
import { sha256 } from "../functions/_lib/family-auth.js";

let mf;
let db;
let env;
let operationNumber = 0;
const token = "test-session-token";
const childCapability = "test-child-capability";
const parentCapability = "test-parent-capability";
const now = new Date().toISOString();
const future = new Date(Date.now() + 3600000).toISOString();
const headers = { "content-type": "application/json", cookie: `bq_session=${token}`,
  "x-bq-child-capability": childCapability, "x-bq-child-id": "child-a" };

before(async () => {
  mf = new Miniflare({ modules: true, script: 'export default { fetch() { return new Response("ok"); } }',
    compatibilityDate: "2026-05-14", d1Databases: ["DB"] });
  db = await mf.getD1Database("DB");
  env = { DB: db, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true" };
  for (const name of ["0001_bright_quest.sql", "0002_family_auth.sql", "0003_beacon_brigade.sql"]) {
    const sql = await readFile(new URL(`../migrations/${name}`, import.meta.url), "utf8");
    // D1 exec treats each line as a statement; flatten these migration-only SQL scripts.
    await db.exec(sql.replace(/--[^\r\n]*/g, "").replace(/\r?\n/g, " "));
  }
  for (const family of ["family-a", "family-b"]) {
    await db.prepare("INSERT INTO families (id,name,created_at,updated_at) VALUES (?,?,?,?)").bind(family, family, now, now).run();
  }
  await db.prepare(`INSERT INTO family_users (id,family_id,email,display_name,password_hash,password_salt,password_iterations,created_at,updated_at)
    VALUES ('user-a','family-a','test@example.invalid','Test','not-a-password','not-a-salt',100000,?,?)`).bind(now, now).run();
  for (const [id, family, legacy] of [["child-a", "family-a", "legacy-a"], ["child-b", "family-a", "legacy-b"], ["child-c", "family-b", "legacy-c"]]) {
    await db.prepare(`INSERT INTO child_profiles (id,family_id,legacy_profile_id,profile_name,payload_json,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?)`).bind(id, family, legacy, `Name ${id}`, "{}", now, now).run();
  }
  await db.prepare(`INSERT INTO family_sessions
    (id,family_id,user_id,active_child_id,parent_unlocked_until,parent_capability_hash,child_capability_hash,child_capability_expires_at,expires_at,created_at,last_seen_at)
    VALUES (?,'family-a','user-a','child-a',?,?,?,?,?, ?,?)`).bind(await sha256(token), future, await sha256(parentCapability),
    await sha256(childCapability), future, future, now, now).run();
});

after(async () => { if (mf) await mf.dispose(); });

async function get(query = "", options = {}) {
  const response = await onRequestGet({ env: options.env ?? env,
    request: new Request(`https://beacon.test/api/beacon-brigade${query}`, { headers: options.headers ?? headers }) });
  return { status: response.status, body: await response.json(), headers: response.headers };
}

async function post(body, options = {}) {
  const response = await onRequestPost({ env: options.env ?? env, request: new Request(`https://beacon.test/api/beacon-brigade${options.query || ""}`, {
    method: "POST", headers: options.headers ?? headers, body: JSON.stringify(body)
  }) });
  return { status: response.status, body: await response.json() };
}

async function command(action) {
  const loaded = await get();
  assert.equal(loaded.status, 200);
  return post({ operationId: `operation-${++operationNumber}`, version: loaded.body.state.version, action });
}

async function rawState() {
  const row = await db.prepare("SELECT state_json FROM beacon_brigade_states WHERE family_id='family-a' AND child_id='child-a'").first();
  return row ? JSON.parse(row.state_json) : createState({ profileId: "child-a" });
}

async function complete(regionId) {
  assert.equal((await command({ type: "start", regionId })).status, 200);
  const state = await rawState();
  for (const station of state.activeExpedition.stations) {
    assert.equal((await command({ type: "answer", stationId: station.id, answer: station.question.answer })).status, 200);
  }
  assert.equal((await command({ type: "finish" })).status, 200);
}

function synchronisedDB(participants) {
  let arrivals = 0;
  let release;
  const ready = new Promise((resolve) => { release = resolve; });
  return { prepare: db.prepare.bind(db), batch: async (statements) => {
    if (++arrivals === participants) release();
    await ready;
    return db.batch(statements);
  } };
}

test("D1 migration loads; missing session is 401 and disabled auth never falls back to demo", async () => {
  assert.equal((await get("", { headers: {} })).status, 401);
  assert.equal((await get("", { env: { ...env, BQ_FAMILY_AUTH_ENABLED: "false" } })).body.code, "FAMILY_AUTH_REQUIRED");
  assert.equal((await get("", { env: { ...env, BQ_FAMILY_AUTH_MIGRATION_READY: "false" } })).status, 503);
  const loaded = await get();
  assert.equal(loaded.status, 200);
  assert.deepEqual(loaded.body.profile, { id: "child-a", name: "Name child-a" });
  assert.equal(loaded.body.state.version, 0);
  assert.equal(loaded.headers.get("cache-control"), "no-store");
  const row = await db.prepare("SELECT COUNT(*) AS n FROM beacon_brigade_states").first();
  assert.equal(row.n, 0, "GET must not create game progress");
});

test("parent review requires capability and family ownership; UUID and legacy lookup agree", async () => {
  assert.equal((await get("?childId=child-a")).status, 403);
  const parentHeaders = { ...headers, "x-bq-parent-capability": parentCapability };
  const uuid = await get("?childId=child-a", { headers: parentHeaders });
  const legacy = await get("?childId=legacy-a", { headers: parentHeaders });
  assert.equal(uuid.status, 200);
  assert.deepEqual(uuid.body, legacy.body);
  assert.equal((await get("?childId=child-b", { headers: parentHeaders })).body.profile.id, "child-b");
  assert.equal((await get("?childId=child-b", { headers: { cookie: `bq_session=${token}`, "x-bq-parent-capability": parentCapability } })).status, 200);
  assert.equal((await get("?childId=child-c", { headers: parentHeaders })).status, 404);
  assert.equal((await get("?childId=legacy-c", { headers: parentHeaders })).status, 404);
  assert.equal((await get("?childId=", { headers: parentHeaders })).status, 400);
  assert.equal((await get("?childId=child-a", { headers: { ...parentHeaders, "x-bq-parent-capability": "invalid" } })).status, 403);
});

test("first save creates game row atomically; child questions redacted, parent sees answers", async () => {
  const response = await command({ type: "start", regionId: "harbour" });
  assert.equal(response.status, 200);
  assert.equal(response.body.state.version, 1);
  assert.equal(response.body.state.activeExpedition.stations[0].question.answer, undefined);
  assert.equal(response.body.state.activeExpedition.stations[0].question.diagram.kind, "groups");
  const review = await get("?childId=child-a", { headers: { ...headers, "x-bq-parent-capability": parentCapability } });
  assert.equal(review.body.state.activeExpedition.stations[0].question.answer, 15);
});

test("API rejects child spoofing, missing child capability, arbitrary wallet and cross-origin actions", async () => {
  const version = (await get()).body.state.version;
  const body = { operationId: "spoof-check", version, action: { type: "upgrade" } };
  assert.equal((await post({ ...body, childId: "child-b" })).body.code, "INVALID_REQUEST");
  assert.equal((await post(body, { query: "?childId=child-b" })).body.code, "CHILD_CHANGED");
  assert.equal((await post(body, { headers: { ...headers, "x-bq-child-id": "child-b" } })).status, 403);
  assert.equal((await post(body, { headers: { ...headers, "x-bq-child-capability": "invalid" } })).body.code, "CHILD_REQUIRED");
  assert.equal((await post(body, { headers: { ...headers, origin: "https://evil.invalid" } })).body.code, "CROSS_ORIGIN");
  assert.equal((await post({ ...body, action: { type: "upgrade", wallet: { parts: 9999 } } })).body.code, "INVALID_ACTION");
  assert.equal((await post({ ...body, action: { type: "upgrade", at: now } })).body.code, "INVALID_ACTION");
  assert.equal((await get()).body.state.version, version);
});

test("wrong then correct keeps original evidence and exactly one reward; replay returns latest state", async () => {
  const station = (await rawState()).activeExpedition.stations[0];
  const wrong = await command({ type: "answer", stationId: station.id, answer: "24" });
  assert.equal(wrong.status, 200);
  assert.equal(wrong.body.feedback.correct, false);
  assert.equal(wrong.body.state.wallet.parts, 0);
  const body = { operationId: "correct-once", version: wrong.body.state.version,
    action: { type: "answer", stationId: station.id, answer: 15 } };
  const first = await post(body);
  const repeated = await post(body);
  assert.equal(first.status, 200);
  assert.equal(repeated.status, 200);
  assert.deepEqual(first.body, repeated.body);
  const resolved = repeated.body.state.activeExpedition.stations[0];
  assert.equal(resolved.attempts[0].answer, "24");
  assert.equal(resolved.attempts[0].correct, false);
  assert.ok(Date.parse(resolved.attempts[0].at));
  assert.equal(resolved.attempts.length, 2);
  assert.equal(repeated.body.state.wallet.parts, 4);
  const fresh = await command(body.action);
  assert.equal(fresh.body.state.wallet.parts, 4);
  assert.equal(fresh.body.state.activeExpedition.stations[0].attempts.length, 2);
  assert.equal((await post(body)).body.state.version, fresh.body.state.version);
  const conflict = await post({ ...body, action: { ...body.action, answer: 14 } });
  assert.equal(conflict.status, 409);
  assert.equal(conflict.body.code, "OPERATION_ID_REUSED");
});

test("stale request returns 409 with no receipt, wallet change or evidence loss", async () => {
  const before = await rawState();
  const result = await post({ operationId: "stale-operation", version: 0, action: { type: "end" } });
  assert.equal(result.status, 409);
  assert.equal(result.body.code, "STALE_STATE");
  assert.equal(result.body.currentVersion, before.version);
  assert.deepEqual(await rawState(), before);
  assert.equal(await db.prepare("SELECT operation_id FROM beacon_brigade_operations WHERE operation_id='stale-operation'").first(), null);
});

test("same-operation concurrent answers are idempotent in actual D1 transaction execution", async () => {
  const current = await rawState();
  const station = current.activeExpedition.stations[1];
  const body = { operationId: "concurrent-answer", version: current.version,
    action: { type: "answer", stationId: station.id, answer: station.question.answer } };
  const raceEnv = { ...env, DB: synchronisedDB(3) };
  const results = await Promise.all([post(body, { env: raceEnv }), post(body, { env: raceEnv }), post(body, { env: raceEnv })]);
  assert.ok(results.every((result) => result.status === 200));
  const after = await rawState();
  assert.equal(after.version, current.version + 1);
  assert.equal(after.wallet.parts, current.wallet.parts + 4);
  assert.equal(after.activeExpedition.stations[1].attempts.length, 1);
});

test("different operations at same version have only one winner, no orphan receipt", async () => {
  const before = await rawState();
  const station = before.activeExpedition.stations[2];
  const action = { type: "answer", stationId: station.id, answer: station.question.answer };
  const raceEnv = { ...env, DB: synchronisedDB(2) };
  const results = await Promise.all(["race-first", "race-second"].map((operationId) => post({ operationId, version: before.version, action }, { env: raceEnv })));
  assert.deepEqual(results.map((result) => result.status).sort(), [200, 409]);
  const after = await rawState();
  assert.equal(after.wallet.parts, 12);
  assert.equal(after.version, before.version + 1);
  const count = await db.prepare("SELECT COUNT(*) AS n FROM beacon_brigade_operations WHERE operation_id IN ('race-first','race-second')").first();
  assert.equal(count.n, 1);
});

test("finish/end preserve earned cargo and learning history; duplicate finish cannot archive twice", async () => {
  let before = await rawState();
  for (const station of before.activeExpedition.stations.filter((station) => !station.resolved)) {
    assert.equal((await command({ type: "answer", stationId: station.id, answer: station.question.answer })).status, 200);
  }
  before = await rawState();
  const body = { operationId: "finish-once", version: before.version, action: { type: "finish" } };
  assert.equal((await post(body)).status, 200);
  const replay = await post(body);
  assert.equal(replay.status, 200);
  assert.equal(replay.body.state.history.length, 1);
  assert.equal(replay.body.state.history[0].status, "completed");
  assert.equal(replay.body.state.activeExpedition, null);
  assert.equal(replay.body.state.wallet.parts, 20);
  assert.equal(replay.body.state.history[0].stations[0].attempts[0].correct, false);
  await complete("grove");
});

test("concurrent upgrades debit once, replay never upgrades again, insufficient upgrade stays unchanged", async () => {
  const before = await rawState();
  assert.deepEqual(before.wallet, { parts: 20, cores: 20 });
  const requests = ["upgrade-one", "upgrade-two"].map((operationId) => ({ operationId, version: before.version, action: { type: "upgrade" } }));
  const raceEnv = { ...env, DB: synchronisedDB(2) };
  const results = await Promise.all(requests.map((body) => post(body, { env: raceEnv })));
  assert.deepEqual(results.map((result) => result.status).sort(), [200, 409]);
  const winner = requests[results.findIndex((result) => result.status === 200)];
  const after = await rawState();
  assert.equal(after.hqLevel, 2);
  assert.deepEqual(after.wallet, { parts: 8, cores: 8 });
  assert.equal(after.upgrades.length, 1);
  assert.equal((await post(winner)).body.state.hqLevel, 2);
  assert.equal((await command({ type: "upgrade" })).body.code, "INSUFFICIENT_RESOURCES");
  assert.deepEqual(await rawState(), after);
});

test("receipt failure rolls back the state write; retry succeeds using the original operation ID", async () => {
  const before = await rawState();
  const originalBatch = db.batch.bind(db);
  const faultyDB = { prepare: db.prepare.bind(db), batch: async (statements) => {
    const failing = db.prepare("INSERT INTO beacon_brigade_operations (family_id) VALUES ('bad')");
    return originalBatch([...statements.slice(0, 2), failing]);
  } };
  const body = { operationId: "rollback-start", version: before.version, action: { type: "start", regionId: "grove" } };
  assert.equal((await post(body, { env: { ...env, DB: faultyDB } })).status, 500);
  assert.deepEqual(await rawState(), before);
  assert.equal(await db.prepare("SELECT operation_id FROM beacon_brigade_operations WHERE operation_id='rollback-start'").first(), null);
  assert.equal((await post(body)).status, 200);
});

test("assisted route survives API reload and records guidance without hint currency", async () => {
  const initial = await rawState();
  const station = initial.activeExpedition.stations[0];
  const wrong = station.question.options.find((option) => option.id !== station.question.answer).id;
  assert.equal((await command({ type: "hint", stationId: station.id })).body.code, "ATTEMPT_REQUIRED");
  await command({ type: "answer", stationId: station.id, answer: wrong });
  await command({ type: "hint", stationId: station.id });
  assert.equal((await command({ type: "hint", stationId: station.id })).body.code, "RETRY_REQUIRED");
  await command({ type: "answer", stationId: station.id, answer: wrong });
  await command({ type: "hint", stationId: station.id });
  const loaded = (await get()).body.state;
  assert.deepEqual(loaded.wallet, initial.wallet);
  assert.equal(loaded.activeExpedition.stations[0].question.answer, station.question.answer);
  assert.equal(loaded.activeExpedition.stations[0].resolved, false);
  const corrected = await command({ type: "answer", stationId: station.id, answer: station.question.answer });
  assert.equal(corrected.body.state.activeExpedition.stations[0].resolution, "assisted");
  assert.equal(corrected.body.state.wallet.cores, initial.wallet.cores + 4);
  const ended = await command({ type: "end" });
  assert.equal(ended.body.state.history.at(-1).status, "ended");
  assert.equal(ended.body.state.history.at(-1).stations[0].attempts.length, 3);
});

test("child change cannot replay a previous child's station or pinned mutation", async () => {
  const saved = await rawState();
  await db.prepare("UPDATE family_sessions SET active_child_id='child-b' WHERE id=?").bind(await sha256(token)).run();
  try {
    const operation = { operationId: "queued-old-child", version: 0, action: { type: "start", regionId: "harbour" } };
    assert.equal((await post(operation)).body.code, "CHILD_CHANGED");
    const otherHeaders = { ...headers, "x-bq-child-id": "child-b" };
    const started = await post(operation, { headers: otherHeaders });
    assert.equal(started.status, 200);
    const oldStation = saved.history[0].stations[0];
    assert.equal((await post({ operationId: "foreign-station", version: started.body.state.version,
      action: { type: "answer", stationId: oldStation.id, answer: oldStation.question.answer } }, { headers: otherHeaders })).body.code, "INVALID_STATION");
    assert.deepEqual(await rawState(), saved);
  } finally {
    await db.prepare("UPDATE family_sessions SET active_child_id='child-a' WHERE id=?").bind(await sha256(token)).run();
  }
});

test("envelope validation and database constraints fail closed", async () => {
  const version = (await rawState()).version;
  for (const invalid of [null, [], { operationId: "short", version, action: { type: "end" } },
    { operationId: "invalid-version", version: "0", action: { type: "end" } },
    { operationId: "invalid-wallet", version, action: { type: "grant", amount: 999 } }]) {
    assert.equal((await post(invalid)).status, 400);
  }
  const other = createState({ profileId: "child-c" });
  await assert.rejects(() => db.prepare(`INSERT INTO beacon_brigade_states
    (family_id,child_id,version,state_json,created_at,updated_at) VALUES ('family-a','child-c',0,?,?,?)`)
    .bind(JSON.stringify(other), now, now).run());
  assert.equal((await rawState()).version, version);
  const mismatch = applyAction(createState({ profileId: "child-a" }), { type: "start", regionId: "harbour" });
  await assert.rejects(() => db.prepare("UPDATE beacon_brigade_states SET state_json=? WHERE family_id='family-a' AND child_id='child-a'")
    .bind(JSON.stringify(mismatch)).run());
});

test("identical operation committed between receipt lookup and state read returns success, not false stale", async () => {
  const current = await rawState();
  const body = { operationId: "receipt-read-race", version: current.version, action: { type: "start", regionId: "harbour" } };
  let triggered = false;
  const raceDB = { batch: db.batch.bind(db), prepare: (sql) => {
    const prepared = db.prepare(sql);
    return { bind: (...args) => {
      const bound = prepared.bind(...args);
      if (!sql.startsWith("SELECT version, state_json")) return bound;
      return { first: async () => {
        if (!triggered) {
          triggered = true;
          assert.equal((await post(body)).status, 200);
        }
        return bound.first();
      } };
    } };
  } };
  const result = await post(body, { env: { ...env, DB: raceDB } });
  assert.equal(triggered, true);
  assert.equal(result.status, 200);
  assert.equal(result.body.state.version, current.version + 1);
  assert.deepEqual(result.body.state.wallet, current.wallet);
});

test("reset persists through the authenticated API and clears Parent review evidence for that child", async () => {
  const before = await rawState();
  assert.ok(before.activeExpedition || before.history.length || before.wallet.parts || before.wallet.cores);
  const response = await command({ type: "reset" });
  assert.equal(response.status, 200);
  assert.equal(response.body.state.version, before.version + 1);
  assert.equal(response.body.state.activeExpedition, null);
  assert.deepEqual(response.body.state.history, []);
  assert.deepEqual(response.body.state.wallet, { parts: 0, cores: 0 });
  const parent = await get("?childId=child-a", { headers: { ...headers, "x-bq-parent-capability": parentCapability } });
  assert.equal(parent.status, 200);
  assert.deepEqual(parent.body.state.history, []);
  assert.equal(parent.body.state.activeExpedition, null);
});
