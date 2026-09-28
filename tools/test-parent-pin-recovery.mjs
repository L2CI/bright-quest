import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after, before } from "node:test";
import { Miniflare } from "miniflare";
import { onRequestPost as requestReset } from "../functions/api/auth/parent-pin-reset-request.js";
import { onRequestPost as confirmReset } from "../functions/api/auth/parent-pin-reset-confirm.js";
import { recoveryAvailable, sendRecoveryEmail } from "../functions/_lib/parent-pin-recovery.js";
import { hashSecret, sha256, verifySecret } from "../functions/_lib/family-auth.js";

let mf;
let db;
let fixtureNumber = 0;
let passwordHash;
let oldPinHash;
const password = "Synthetic-Family-Password-Only";
const passwordSalt = "10".repeat(16);
const pinSalt = "20".repeat(16);
const now = new Date().toISOString();
const future = new Date(Date.now() + 3600000).toISOString();

before(async () => {
  mf = new Miniflare({ modules: true, script: 'export default { fetch() { return new Response("Local recovery test"); } }', compatibilityDate: "2026-05-14", d1Databases: ["DB"], d1Persist: false });
  db = await mf.getD1Database("DB");
  for (const name of ["0001_bright_quest.sql", "0002_family_auth.sql", "0003_beacon_brigade.sql", "0004_sparkbound.sql", "0005_parent_pin_recovery.sql"]) {
    const sql = await readFile(new URL(`../migrations/${name}`, import.meta.url), "utf8");
    await db.exec(sql.replace(/--[^\r\n]*/g, "").replace(/\r?\n/g, " "));
  }
  passwordHash = await hashSecret(password, passwordSalt, 1000);
  oldPinHash = await hashSecret("7391", pinSalt, 1000);
});
after(async () => { await mf?.dispose(); });

async function fixture() {
  const n = ++fixtureNumber;
  const familyId = `recovery-family-${n}`;
  const userId = `recovery-user-${n}`;
  const childId = `recovery-child-${n}`;
  const email = `recovery-${n}@example.invalid`;
  const cookie = `recovery-session-${n}`;
  const mail = [];
  const env = {
    DB: db, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true",
    BQ_PARENT_PIN_RECOVERY_ENABLED: "true", BQ_PARENT_PIN_RECOVERY_MIGRATION_READY: "true",
    BQ_APP_ORIGIN: "https://bright-quest.test", BQ_PIN_RECOVERY_MAILER: async (message) => { mail.push(message); }
  };
  await db.prepare("INSERT INTO families(id,name,parent_pin_hash,parent_pin_salt,parent_pin_iterations,created_at,updated_at) VALUES(?,?,?,?,1000,?,?)")
    .bind(familyId, "Synthetic family", oldPinHash, pinSalt, now, now).run();
  await db.prepare("INSERT INTO family_users(id,family_id,email,display_name,password_hash,password_salt,password_iterations,created_at,updated_at) VALUES(?,?,?,?,?,?,1000,?,?)")
    .bind(userId, familyId, email, "Synthetic parent", passwordHash, passwordSalt, now, now).run();
  const payload = JSON.stringify({ id: childId, name: "Synthetic child", stars: 37, attempts: [{ id: "saved-attempt", correct: 0, questionStats: [{ selected: 0, correct: false, prompt: "Original question" }] }], writingSamples: [{ response: "Original writing\nSecond line" }], activeDraft: { answers: [{ selected: 0, writing: "draft" }], remainingSeconds: 72 }, chemistry101Progress: { chapters: { hidden: { completed: true } } } });
  await db.prepare("INSERT INTO child_profiles(id,family_id,legacy_profile_id,profile_name,stars,payload_json,version,child_pin_hash,child_pin_salt,child_pin_iterations,created_at,updated_at) VALUES(?,?,?,?,37,?,7,'child-secret','child-salt',1000,?,?)")
    .bind(childId, familyId, `legacy-${n}`, "Synthetic child", payload, now, now).run();
  for (const suffix of ["", "-second"]) {
    await db.prepare(`INSERT INTO family_sessions(id,family_id,user_id,active_child_id,parent_unlocked_until,parent_capability_hash,child_capability_hash,child_capability_expires_at,expires_at,created_at,last_seen_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(await sha256(cookie + suffix), familyId, userId, childId, future, await sha256(`parent-${n}`), await sha256(`child-${n}`), future, future, now, now).run();
  }
  await db.prepare("INSERT INTO family_profile_events(id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES(?,?,?,?,?,?,?)")
    .bind(`event-${n}`, familyId, childId, "test_completed", `idem-${n}`, '{"original":true}', now).run();
  for (const table of ["beacon_brigade_states", "sparkbound_states"]) {
    await db.prepare(`INSERT INTO ${table}(family_id,child_id,version,state_json,created_at,updated_at) VALUES(?,?,0,?,?,?)`)
      .bind(familyId, childId, JSON.stringify({ profileId: childId, version: 0, originalEvidence: ["keep"] }), now, now).run();
  }
  const headers = { "content-type": "application/json", cookie: `bq_session=${cookie}`, "cf-connecting-ip": `synthetic-${n}` };
  return { n, familyId, userId, childId, email, cookie, mail, env, headers };
}

async function call(handler, fixture, body, options = {}) {
  const response = await handler({ env: options.env || fixture.env, request: new Request(options.url || "https://bright-quest.test/api/auth/recovery", {
    method: "POST", headers: options.headers || fixture.headers, body: JSON.stringify(body)
  }) });
  return { status: response.status, body: await response.json(), headers: response.headers };
}
async function issue(f) {
  const result = await call(requestReset, f, { password });
  assert.equal(result.status, 200, JSON.stringify(result.body));
  const match = f.mail.at(-1).text.match(/#parent-pin-reset=([a-f0-9]{64})/);
  assert.ok(match, "Captured synthetic email contains the fragment link");
  return match[1];
}
async function learningSnapshot(f) {
  const output = {};
  for (const table of ["child_profiles", "family_profile_events", "beacon_brigade_states", "sparkbound_states"]) {
    output[table] = (await db.prepare(`SELECT * FROM ${table} WHERE family_id = ?`).bind(f.familyId).all()).results;
  }
  return output;
}

test("disabled or incomplete configuration remains unavailable; only function injection enables synthetic mail", async () => {
  const f = await fixture();
  assert.equal(recoveryAvailable(f.env), true);
  for (const patch of [{ BQ_PARENT_PIN_RECOVERY_ENABLED: "false" }, { BQ_PARENT_PIN_RECOVERY_MIGRATION_READY: "false" }, { BQ_PIN_RECOVERY_MAILER: "capture" }, { BQ_PIN_RECOVERY_MAILER: { send() {} } }, { BQ_APP_ORIGIN: "http://untrusted.test" }, { BQ_APP_ORIGIN: "https://bright-quest.test/path" }, { BQ_APP_ORIGIN: "https://user:password@bright-quest.test" }]) {
    assert.equal(recoveryAvailable({ ...f.env, ...patch }), false);
  }
  assert.equal(recoveryAvailable({ ...f.env, BQ_APP_ORIGIN: "http://127.0.0.1:4194" }), true);
  assert.equal(recoveryAvailable({ ...f.env, BQ_APP_ORIGIN: "http://localhost:4194" }), true);
  const unavailable = await call(requestReset, f, { password }, { env: { ...f.env, BQ_PIN_RECOVERY_MAILER: undefined } });
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.body.code, "RECOVERY_UNAVAILABLE");
  assert.equal(f.mail.length, 0);
});

test("request needs a signed-in family and current password; ignores arbitrary recipient and origin fields", async () => {
  const f = await fixture();
  const before = await learningSnapshot(f);
  assert.equal((await call(requestReset, f, { password }, { headers: { "content-type": "application/json" } })).status, 401);
  assert.equal((await call(requestReset, f, { password: "wrong-password" })).body.code, "PASSWORD_MISMATCH");
  assert.equal(f.mail.length, 0);
  const result = await call(requestReset, f, { password, email: "attacker@example.invalid", to: "attacker@example.invalid", origin: "https://attacker.invalid" }, { url: "https://spoofed-host.test/api/auth/recovery" });
  assert.equal(result.status, 200);
  assert.equal(f.mail[0].to, f.email);
  assert.match(f.mail[0].text, /https:\/\/bright-quest\.test\/#parent-pin-reset=/);
  assert.doesNotMatch(f.mail[0].text, /spoofed-host|attacker/);
  assert.equal(result.body.expiresInMinutes, 15);
  assert.doesNotMatch(JSON.stringify(result.body), /[a-f0-9]{64}/);
  const token = f.mail[0].text.match(/parent-pin-reset=([a-f0-9]{64})/)[1];
  const row = await db.prepare("SELECT * FROM family_parent_pin_recovery WHERE family_id=?").bind(f.familyId).first();
  assert.equal(row.token_hash, await sha256(token));
  assert.equal(row.user_id, f.userId);
  assert.equal(Date.parse(row.expires_at) - Date.parse(row.created_at), 15 * 60000);
  assert.ok(!JSON.stringify(row).includes(token));
  assert.deepEqual(await learningSnapshot(f), before);
});

test("cross-origin and oversize requests are rejected", async () => {
  const f = await fixture();
  assert.equal((await call(requestReset, f, { password }, { headers: { ...f.headers, origin: "https://evil.test", "sec-fetch-site": "cross-site" } })).status, 403);
  assert.equal((await call(confirmReset, f, { token: "a".repeat(64), parentPin: "1234" }, { headers: { ...f.headers, origin: "https://evil.test" } })).status, 403);
  assert.equal((await call(requestReset, f, { password: "x".repeat(2200) })).status, 413);
  assert.equal((await call(requestReset, f, null)).status, 400);
});

test("mail failure invalidates only the new link and returns a sanitised error", async () => {
  const f = await fixture();
  const first = await issue(f);
  const failing = { ...f.env, BQ_PIN_RECOVERY_MAILER: async (message) => { throw new Error(`Private content ${message.text}`); } };
  const result = await call(requestReset, f, { password }, { env: failing });
  assert.equal(result.status, 503);
  assert.equal(result.body.code, "RECOVERY_SEND_FAILED");
  assert.doesNotMatch(JSON.stringify(result.body), /Private content|parent-pin-reset=|[a-f0-9]{64}/);
  const rows = (await db.prepare("SELECT token_hash FROM family_parent_pin_recovery WHERE family_id=?").bind(f.familyId).all()).results;
  assert.deepEqual(rows.map((row) => row.token_hash), [await sha256(first)]);
});

test("wrong, malformed and expired links cannot change PINs or learner records", async () => {
  const f = await fixture();
  const before = await learningSnapshot(f);
  const token = await issue(f);
  for (const invalid of ["bad", "a".repeat(64)]) {
    assert.equal((await call(confirmReset, f, { token: invalid, parentPin: "1234" })).body.code, "RECOVERY_LINK_INVALID");
  }
  await db.prepare("UPDATE family_parent_pin_recovery SET expires_at=? WHERE token_hash=?").bind(new Date(Date.now() - 1000).toISOString(), await sha256(token)).run();
  assert.equal((await call(confirmReset, f, { token, parentPin: "1234" })).body.code, "RECOVERY_LINK_INVALID");
  const family = await db.prepare("SELECT parent_pin_hash FROM families WHERE id=?").bind(f.familyId).first();
  assert.equal(family.parent_pin_hash, oldPinHash);
  assert.deepEqual(await learningSnapshot(f), before);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(f.familyId).first()).n, 2);
});

test("PIN validation leaves a valid link usable", async () => {
  const f = await fixture();
  const token = await issue(f);
  for (const parentPin of ["123", "123456789", "abcd", 1234]) assert.equal((await call(confirmReset, f, { token, parentPin })).body.code, "PIN_INVALID");
  assert.equal((await db.prepare("SELECT used_at FROM family_parent_pin_recovery WHERE token_hash=?").bind(await sha256(token)).first()).used_at, null);
});

test("successful reset is single-use, revokes all family sessions and other links, preserves children and other families", async () => {
  const f = await fixture();
  const other = await fixture();
  const before = await learningSnapshot(f);
  const otherBefore = await learningSnapshot(other);
  const token = await issue(f);
  const second = await issue(f);
  const result = await call(confirmReset, other, { token, parentPin: "001234" });
  assert.equal(result.status, 200);
  assert.equal(result.body.requiresSignIn, true);
  assert.match(result.headers.get("set-cookie"), /Max-Age=0/);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(f.familyId).first()).n, 0);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(other.familyId).first()).n, 2);
  const family = await db.prepare("SELECT * FROM families WHERE id=?").bind(f.familyId).first();
  assert.equal(family.parent_pin_iterations, 100000);
  assert.equal(await verifySecret("001234", family.parent_pin_hash, family.parent_pin_salt, family.parent_pin_iterations), true);
  assert.equal(await verifySecret("7391", family.parent_pin_hash, family.parent_pin_salt, family.parent_pin_iterations), false);
  assert.deepEqual(await learningSnapshot(f), before);
  assert.deepEqual(await learningSnapshot(other), otherBefore);
  assert.equal((await call(confirmReset, f, { token, parentPin: "9876" })).body.code, "RECOVERY_LINK_INVALID");
  assert.equal((await call(confirmReset, f, { token: second, parentPin: "9876" })).body.code, "RECOVERY_LINK_INVALID");
});

test("concurrent confirmation has exactly one winner", async () => {
  const f = await fixture();
  const token = await issue(f);
  const responses = await Promise.all([call(confirmReset, f, { token, parentPin: "1234" }), call(confirmReset, f, { token, parentPin: "5678" })]);
  assert.deepEqual(responses.map((r) => r.status).sort(), [200, 400]);
  const winningPin = responses[0].status === 200 ? "1234" : "5678";
  const family = await db.prepare("SELECT * FROM families WHERE id=?").bind(f.familyId).first();
  assert.equal(await verifySecret(winningPin, family.parent_pin_hash, family.parent_pin_salt, family.parent_pin_iterations), true);
});

test("a failed transaction rolls back consumption, PIN and session changes", async () => {
  const f = await fixture();
  const token = await issue(f);
  await db.exec(`CREATE TRIGGER fail_recovery_${f.n} BEFORE UPDATE ON families WHEN NEW.id = '${f.familyId}' BEGIN SELECT RAISE(ABORT, 'Synthetic recovery rollback'); END;`);
  try {
    assert.equal((await call(confirmReset, f, { token, parentPin: "1234" })).status, 503);
    const row = await db.prepare("SELECT used_at,claim_nonce FROM family_parent_pin_recovery WHERE token_hash=?").bind(await sha256(token)).first();
    assert.equal(row.used_at, null);
    assert.equal(row.claim_nonce, null);
    assert.equal((await db.prepare("SELECT parent_pin_hash FROM families WHERE id=?").bind(f.familyId).first()).parent_pin_hash, oldPinHash);
    assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(f.familyId).first()).n, 2);
  } finally { await db.exec(`DROP TRIGGER fail_recovery_${f.n};`); }
  assert.equal((await call(confirmReset, f, { token, parentPin: "1234" })).status, 200);
});

test("password guessing and repeated email requests are rate limited", async () => {
  const f = await fixture();
  for (let i = 0; i < 5; i++) assert.equal((await call(requestReset, f, { password: "wrong" })).status, 401);
  assert.equal((await call(requestReset, f, { password })).status, 429);
  assert.equal(f.mail.length, 0);
  const g = await fixture();
  for (let i = 0; i < 3; i++) await issue(g);
  assert.equal((await call(requestReset, g, { password })).status, 429);
  assert.equal(g.mail.length, 3);
});

test("Cloudflare transport uses fixed endpoint and exact recipient; requires accepted delivery status", async (t) => {
  const env = { BQ_EMAIL_ACCOUNT_ID: "a".repeat(32), BQ_EMAIL_API_TOKEN: "synthetic-secret-token-never-used", BQ_EMAIL_FROM: "recovery@example.invalid" };
  const message = { to: "parent@example.invalid", subject: "Synthetic", text: "Synthetic only", html: "<p>Synthetic only</p>" };
  let next = { success: true, result: { delivered: [], queued: [message.to], permanent_bounces: [] } };
  let captured;
  t.mock.method(globalThis, "fetch", async (url, options) => { captured = { url, options }; return new Response(JSON.stringify(next), { status: 200 }); });
  await sendRecoveryEmail(env, message);
  assert.equal(captured.url, `https://api.cloudflare.com/client/v4/accounts/${env.BQ_EMAIL_ACCOUNT_ID}/email/sending/send`);
  assert.equal(captured.options.redirect, "error");
  assert.deepEqual(JSON.parse(captured.options.body), { from: env.BQ_EMAIL_FROM, ...message });
  assert.ok(captured.options.signal instanceof AbortSignal);
  for (const result of [{ success: false }, { success: true, result: { queued: ["wrong@example.invalid"] } }, { success: true, result: { delivered: [message.to], permanent_bounces: [message.to] } }]) {
    next = result;
    await assert.rejects(sendRecoveryEmail(env, message));
  }
});

test("local HTTP harness advertises recovery and captures mail behind its QA control token", async () => {
  const { startSparkboundQa } = await import("./serve-sparkbound-qa.mjs");
  const harness = await startSparkboundQa({ port: 0 });
  try {
    const config = await fetch(`${harness.origin}/api/auth/config`).then((response) => response.json());
    assert.equal(config.parentPinRecoveryEnabled, true);
    assert.equal((await fetch(`${harness.origin}/__sparkbound-qa__/recovery-inbox`)).status, 403);
    const response = await fetch(`${harness.origin}/api/auth/parent-pin-reset-request`, {
      method: "POST", headers: { "content-type": "application/json", cookie: `bq_session=${harness.fixture.cookie.value}` },
      body: JSON.stringify({ password: harness.fixture.login.password })
    });
    assert.equal(response.status, 200);
    const inbox = await fetch(`${harness.origin}/__sparkbound-qa__/recovery-inbox`, { headers: { "x-bq-qa-control": harness.controlToken } }).then((result) => result.json());
    assert.equal(inbox.synthetic, true);
    assert.equal(inbox.messages.length, 1);
    assert.equal(inbox.messages[0].to, harness.fixture.login.email);
    assert.ok(inbox.messages[0].text.includes(`${harness.origin}/#parent-pin-reset=`));
  } finally { await harness.close(); }
});
