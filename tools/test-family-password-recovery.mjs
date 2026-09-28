import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import test, { after, before } from "node:test";
import { Miniflare } from "miniflare";
import { onRequestPost as requestPassword } from "../functions/api/auth/password-reset-request.js";
import { onRequestPost as confirmPassword } from "../functions/api/auth/password-reset-confirm.js";
import { onRequestPost as requestPin } from "../functions/api/auth/parent-pin-reset-request.js";
import { onRequestPost as confirmPin } from "../functions/api/auth/parent-pin-reset-confirm.js";
import { onRequestPost as login } from "../functions/api/auth/login.js";
import { hashSecret, sha256, verifySecret } from "../functions/_lib/family-auth.js";

// Real, ephemeral D1 and fictional identities. Mail is captured in process.
// No browser, production binding, persistent database or real mail transport.
let mf; let db; let serial = 0; let oldHash; let pinHash;
const password = "Synthetic-Old-Password-Only";
const newPassword = "Synthetic-New-Password-Only";
const salt = "ab".repeat(16); const pinSalt = "cd".repeat(16);
const now = new Date().toISOString(); const future = new Date(Date.now() + 3600000).toISOString();
const passwordTable = "family_password_recovery";
const report = { startedAt: now, scope: "Ephemeral D1, fictional accounts and captured email only", checks: [] };
const verify = (name, action) => test(name, async (t) => {
  try { await action(t); report.checks.push({ name, passed: true }); }
  catch (error) { report.checks.push({ name, passed: false, detail: error.message }); throw error; }
});

before(async () => {
  mf = new Miniflare({ modules: true, script: 'export default { fetch() { return new Response("Fictional recovery tests"); } }', compatibilityDate: "2026-05-14", d1Databases: ["DB"], d1Persist: false });
  db = await mf.getD1Database("DB");
  for (const name of ["0001_bright_quest.sql", "0002_family_auth.sql", "0003_beacon_brigade.sql", "0004_sparkbound.sql", "0005_parent_pin_recovery.sql", "0006_family_password_recovery.sql"]) {
    const sql = await readFile(new URL(`../migrations/${name}`, import.meta.url), "utf8");
    await db.exec(sql.replace(/--[^\r\n]*/g, "").replace(/\r?\n/g, " "));
  }
  oldHash = await hashSecret(password, salt, 1000); pinHash = await hashSecret("7391", pinSalt, 1000);
});

after(async () => {
  await mf?.dispose(); report.passed = report.checks.length > 0 && report.checks.every((item) => item.passed);
  report.sourceHashes = {};
  for (const path of ["functions/_lib/family-password-recovery.js", "functions/_lib/parent-pin-recovery.js", "functions/api/auth/password-reset-request.js", "functions/api/auth/password-reset-confirm.js", "migrations/0006_family_password_recovery.sql"]) {
    try { report.sourceHashes[path] = createHash("sha256").update(await readFile(new URL(`../${path}`, import.meta.url))).digest("hex"); } catch { /* Missing source will already fail its import/setup. */ }
  }
  const output = new URL("../../outputs/brightquest-uplift-qa-2026-09-28/", import.meta.url);
  await mkdir(output, { recursive: true }); await writeFile(new URL("family-password-recovery-tests.json", output), JSON.stringify(report, null, 2));
  const summary = ["Family password recovery independent API regression", report.scope,
    `Started: ${report.startedAt}`, `Result: ${report.checks.filter((item) => item.passed).length}/${report.checks.length} passed`, "",
    ...report.checks.map((item) => `${item.passed ? "PASS" : "FAIL"} ${item.name}${item.detail ? `: ${item.detail}` : ""}`), "",
    "Exact source hashes are recorded in family-password-recovery-tests.json."];
  await writeFile(new URL("family-password-recovery-tests.txt", output), summary.join("\n") + "\n");
});

async function fixture() {
  const n = ++serial; const familyId = `pw-family-${n}`; const userId = `pw-user-${n}`;
  const secondUserId = `pw-user-second-${n}`; const childId = `pw-child-${n}`;
  const email = `pw-parent-${n}@example.invalid`; const secondEmail = `pw-second-${n}@example.invalid`;
  const cookie = `pw-session-${n}`; const mail = []; const attemptedMail = [];
  const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true",
    BQ_PARENT_PIN_RECOVERY_ENABLED: "true", BQ_PARENT_PIN_RECOVERY_MIGRATION_READY: "true",
    BQ_PASSWORD_RECOVERY_ENABLED: "true", BQ_PASSWORD_RECOVERY_MIGRATION_READY: "true",
    BQ_APP_ORIGIN: "https://bright-quest.test", BQ_PIN_RECOVERY_MAILER: async (message) => { attemptedMail.push(message); mail.push(message); } };
  await db.prepare("INSERT INTO families(id,name,parent_pin_hash,parent_pin_salt,parent_pin_iterations,created_at,updated_at) VALUES(?,?,?,?,1000,?,?)")
    .bind(familyId, "Fictional family", pinHash, pinSalt, now, now).run();
  for (const [id, address] of [[userId, email], [secondUserId, secondEmail]]) {
    await db.prepare("INSERT INTO family_users(id,family_id,email,display_name,password_hash,password_salt,password_iterations,failed_attempts,locked_until,created_at,updated_at) VALUES(?,?,?,?,?,?,1000,3,?,?,?)")
      .bind(id, familyId, address, "Fictional parent", oldHash, salt, future, now, now).run();
  }
  const payload = JSON.stringify({ id: childId, name: "Fictional child", stars: 43,
    attempts: [{ id: "old-result", level: 1, percent: 4, questionStats: [{ selected: 0, prompt: "Full original question", answerText: "Original writing\nFull second line" }] }],
    writingSamples: [{ response: "Original standalone writing" }], icasAttempts: [{ id: "icas-original", correct: false }],
    activeDraft: { level: 2, answers: [{ selected: 0, writing: "Unsynced original draft" }], remainingSeconds: 0 },
    chemistry101Progress: { chapters: { original: { test: { answers: ["unchanged"] } } } }, unknownFutureData: { retained: [1, 2, 3] } });
  await db.prepare("INSERT INTO child_profiles(id,family_id,legacy_profile_id,profile_name,stars,payload_json,version,created_at,updated_at) VALUES(?,?,?,?,43,?,7,?,?)")
    .bind(childId, familyId, `legacy-${n}`, "Fictional child", payload, now, now).run();
  for (const [token, user] of [[cookie, userId], [cookie + "-second", secondUserId]]) {
    await db.prepare("INSERT INTO family_sessions(id,family_id,user_id,active_child_id,parent_unlocked_until,parent_capability_hash,child_capability_hash,child_capability_expires_at,expires_at,created_at,last_seen_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)")
      .bind(await sha256(token), familyId, user, childId, future, await sha256(`parent-${n}`), await sha256(`child-${n}`), future, future, now, now).run();
  }
  await db.prepare("INSERT INTO family_profile_events(id,family_id,child_id,event_type,idempotency_key,payload_json,created_at) VALUES(?,?,?,?,?,?,?)")
    .bind(`event-${n}`, familyId, childId, "original", `idem-${n}`, '{"answer":"unchanged"}', now).run();
  await db.prepare("INSERT INTO profile_migration_log(id,family_id,child_id,source_kind,source_id,source_checksum,record_counts_json,migrated_at) VALUES(?,?,?,?,?,?,?,?)")
    .bind(`migration-${n}`, familyId, childId, "synthetic", `source-${n}`, "original-checksum", '{"attempts":1}', now).run();
  await db.prepare("INSERT INTO app_profiles(id,app_id,profile_id,profile_name,stars,payload_json,updated_at,created_at) VALUES(?,?,?,?,43,?,?,?)")
    .bind(`legacy-row-${n}`, "bright-quest", `legacy-${n}`, "Original legacy child", payload, now, now).run();
  await db.prepare("INSERT INTO app_events(id,app_id,profile_id,event_type,payload_json,created_at) VALUES(?,?,?,?,?,?)")
    .bind(`legacy-event-${n}`, "bright-quest", `legacy-${n}`, "original", '{"retain":true}', now).run();
  for (const prefix of ["beacon_brigade", "sparkbound"]) {
    await db.prepare(`INSERT INTO ${prefix}_states(family_id,child_id,version,state_json,created_at,updated_at) VALUES(?,?,1,?,?,?)`)
      .bind(familyId, childId, JSON.stringify({ profileId: childId, version: 1, originalLearning: ["keep"] }), now, now).run();
    await db.prepare(`INSERT INTO ${prefix}_operations(family_id,child_id,operation_id,request_hash,expected_version,result_version,feedback_json,created_at) VALUES(?,?,?,?,0,1,?,?)`)
      .bind(familyId, childId, `operation-${n}`, "original-hash", '{"evidence":"keep"}', now).run();
  }
  return { n, familyId, userId, secondUserId, childId, email, secondEmail, cookie, env, mail, attemptedMail };
}

async function call(handler, f, body, options = {}) {
  const pending = [];
  const context = { env: options.env || f.env, waitUntil: (promise) => pending.push(Promise.resolve(promise)),
    request: new Request(options.url || "https://bright-quest.test/api/auth/recovery", { method: "POST",
      headers: { "content-type": "application/json", "cf-connecting-ip": options.ip || `synthetic-pw-${f.n}`, ...(options.session ? { cookie: `bq_session=${f.cookie}` } : {}), ...options.headers }, body: JSON.stringify(body) }) };
  const response = await handler(context);
  return { status: response.status, body: await response.json(), headers: response.headers, pending, drain: () => Promise.all(pending) };
}
async function issue(f, email = f.email) {
  const result = await call(requestPassword, f, { email }); assert.equal(result.status, 200, JSON.stringify(result.body)); await result.drain();
  const match = f.mail.at(-1)?.text.match(/#password-reset=([a-f0-9]{64})/); assert.ok(match, "Captured mail contains a purpose-specific link");
  return match[1];
}
async function issuePin(f) {
  const result = await call(requestPin, f, { password }, { session: true }); assert.equal(result.status, 200, JSON.stringify(result.body)); await result.drain();
  return f.mail.at(-1).text.match(/#parent-pin-reset=([a-f0-9]{64})/)[1];
}
async function userRow(id) { return db.prepare("SELECT * FROM family_users WHERE id=?").bind(id).first(); }
async function familyRow(id) { return db.prepare("SELECT * FROM families WHERE id=?").bind(id).first(); }
async function learningSnapshot() {
  const snapshot = {};
  for (const table of ["child_profiles", "family_profile_events", "profile_migration_log", "app_profiles", "app_events", "beacon_brigade_states", "beacon_brigade_operations", "sparkbound_states", "sparkbound_operations"]) {
    snapshot[table] = (await db.prepare(`SELECT * FROM ${table} ORDER BY rowid`).all()).results;
  }
  return JSON.stringify(snapshot);
}
async function openLinks(f, table) { return (await db.prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE family_id=? AND used_at IS NULL`).bind(f.familyId).first()).n; }
async function seedLimit(key) {
  const id = await sha256(key);
  await db.prepare("INSERT INTO auth_rate_limits(id,failure_count,window_started_at,locked_until,updated_at) VALUES(?,7,?,?,?) ON CONFLICT(id) DO UPDATE SET failure_count=7,window_started_at=excluded.window_started_at,locked_until=excluded.locked_until,updated_at=excluded.updated_at")
    .bind(id, now, future, now).run();
  return db.prepare("SELECT * FROM auth_rate_limits WHERE id=?").bind(id).first();
}
async function limitRow(key) { return db.prepare("SELECT * FROM auth_rate_limits WHERE id=?").bind(await sha256(key)).first(); }

verify("Password recovery is gated separately and incomplete configuration sends no email", async () => {
  const f = await fixture();
  for (const patch of [{ BQ_PASSWORD_RECOVERY_ENABLED: "false" }, { BQ_PASSWORD_RECOVERY_MIGRATION_READY: "false" }, { BQ_PIN_RECOVERY_MAILER: undefined }, { BQ_APP_ORIGIN: "http://untrusted.test" }]) {
    const response = await call(requestPassword, f, { email: f.email }, { env: { ...f.env, ...patch } });
    assert.equal(response.status, 503); await response.drain();
  }
  assert.equal(f.mail.length, 0);
});

verify("Known and unknown email requests have identical generic acknowledgements without a session or old password", async () => {
  const f = await fixture(); const before = await learningSnapshot();
  const known = await call(requestPassword, f, { email: `  ${f.email.toUpperCase()}  `, password: "irrelevant", to: "attacker@example.invalid", origin: "https://attacker.test" }, { url: "https://spoofed-host.test/api/auth/recovery" });
  const unknown = await call(requestPassword, f, { email: `unknown-${f.n}@example.invalid` });
  assert.equal(known.status, 200); assert.equal(unknown.status, known.status); assert.deepEqual(unknown.body, known.body);
  assert.equal(known.headers.get("cache-control"), "no-store");
  assert.doesNotMatch(JSON.stringify(known.body), /[a-f0-9]{64}|maskedEmail|registered|password-reset=/i);
  await Promise.all([known.drain(), unknown.drain()]);
  assert.equal(f.mail.length, 1); assert.equal(f.mail[0].to, f.email);
  assert.match(f.mail[0].text, /https:\/\/bright-quest\.test\/#password-reset=/); assert.doesNotMatch(f.mail[0].text, /spoofed-host|attacker/);
  assert.equal(await learningSnapshot(), before);
});

verify("The public acknowledgement does not wait for account email delivery", async () => {
  const f = await fixture(); let release; let entered;
  const enteredMail = new Promise((resolve) => { entered = resolve; });
  const env = { ...f.env, BQ_PIN_RECOVERY_MAILER: async () => { entered(); await new Promise((resolve) => { release = resolve; }); } };
  let timeout;
  try {
    const result = await Promise.race([call(requestPassword, f, { email: f.email }, { env }), new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error("Request waited for email delivery")), 3000); })]);
    assert.equal(result.status, 200); assert.ok(result.pending.length > 0, "Background work is registered with waitUntil");
    await enteredMail; release(); await result.drain();
  } finally { clearTimeout(timeout); release?.(); }
});

verify("Tokens are random, purpose-specific, hash-only and expire after fifteen minutes", async () => {
  const f = await fixture(); const first = await issue(f); const second = await issue(f); assert.notEqual(first, second);
  const rows = (await db.prepare(`SELECT * FROM ${passwordTable} WHERE family_id=? ORDER BY created_at`).bind(f.familyId).all()).results;
  assert.equal(rows.length, 2);
  const hashes = rows.map((row) => row.token_hash); assert.ok(hashes.includes(await sha256(first))); assert.ok(hashes.includes(await sha256(second)));
  for (const row of rows) { assert.equal(row.user_id, f.userId); assert.equal(row.family_id, f.familyId); assert.equal(Date.parse(row.expires_at) - Date.parse(row.created_at), 900000); }
  assert.ok(!JSON.stringify(rows).includes(first)); assert.ok(!JSON.stringify(rows).includes(second));
});

verify("Email failures receive the same acknowledgement and invalidate only their undelivered link", async () => {
  const f = await fixture(); const first = await issue(f); let failedToken;
  const env = { ...f.env, BQ_PIN_RECOVERY_MAILER: async (message) => { failedToken = message.text.match(/password-reset=([a-f0-9]{64})/)[1]; throw new Error(`Sensitive synthetic body ${message.text}`); } };
  const failed = await call(requestPassword, f, { email: f.email }, { env }); const unknown = await call(requestPassword, f, { email: `absent-${f.n}@example.invalid` });
  assert.equal(failed.status, unknown.status); assert.deepEqual(failed.body, unknown.body); await Promise.all([failed.drain(), unknown.drain()]);
  assert.ok(failedToken); assert.doesNotMatch(JSON.stringify(failed.body), /Sensitive|password-reset=/);
  assert.equal((await call(confirmPassword, f, { token: failedToken, password: newPassword })).status, 400);
  assert.equal((await db.prepare(`SELECT token_hash FROM ${passwordTable} WHERE token_hash=? AND used_at IS NULL`).bind(await sha256(first)).first()).token_hash, await sha256(first));
});

verify("Malformed, cross-origin and oversized requests are rejected before mail", async () => {
  const f = await fixture();
  for (const email of ["", "not-an-email", null]) assert.equal((await call(requestPassword, f, { email })).status, 400);
  assert.equal((await call(requestPassword, f, { email: f.email }, { headers: { origin: "https://evil.test", "sec-fetch-site": "cross-site" } })).status, 403);
  assert.equal((await call(confirmPassword, f, { token: "a".repeat(64), password: newPassword }, { headers: { origin: "https://evil.test" } })).status, 403);
  assert.equal((await call(requestPassword, f, { email: "x".repeat(3000) })).status, 413); assert.equal(f.mail.length, 0);
});

verify("Invalid, expired and malformed links preserve passwords, sessions and complete learning records", async () => {
  const f = await fixture(); const token = await issue(f); const userBefore = await userRow(f.userId); const before = await learningSnapshot();
  for (const invalid of ["bad", "a".repeat(64)]) assert.equal((await call(confirmPassword, f, { token: invalid, password: newPassword })).status, 400);
  await db.prepare(`UPDATE ${passwordTable} SET expires_at=? WHERE token_hash=?`).bind(new Date(Date.now() - 1000).toISOString(), await sha256(token)).run();
  assert.equal((await call(confirmPassword, f, { token, password: newPassword })).status, 400);
  assert.deepEqual(await userRow(f.userId), userBefore); assert.equal(await learningSnapshot(), before);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(f.familyId).first()).n, 2);
});

verify("Signup-equivalent password bounds reject invalid values without consuming a valid link", async () => {
  const f = await fixture(); const token = await issue(f);
  for (const value of ["short", "x".repeat(129), 12345678, null]) assert.equal((await call(confirmPassword, f, { token, password: value })).status, 400);
  assert.equal((await db.prepare(`SELECT used_at FROM ${passwordTable} WHERE token_hash=?`).bind(await sha256(token)).first()).used_at, null);
  assert.equal((await call(confirmPassword, f, { token, password: "12345678" })).status, 200);
});

verify("Parent PIN and family password links cannot be substituted across purposes", async () => {
  const f = await fixture(); const pw = await issue(f); const pin = await issuePin(f);
  const userBefore = await userRow(f.userId); const familyBefore = await familyRow(f.familyId);
  assert.equal((await call(confirmPassword, f, { token: pin, password: newPassword })).status, 400);
  assert.equal((await call(confirmPin, f, { token: pw, parentPin: "4567" })).status, 400);
  assert.deepEqual(await userRow(f.userId), userBefore); assert.deepEqual(await familyRow(f.familyId), familyBefore);
  assert.equal(await openLinks(f, passwordTable), 1); assert.equal(await openLinks(f, "family_parent_pin_recovery"), 1);
});

verify("Password reset changes only the matched user, keeps the PIN and revokes both purposes and all family sessions", async () => {
  const f = await fixture(); const other = await fixture(); const token = await issue(f); await issue(f, f.secondEmail); await issuePin(f); await issue(other);
  const before = await learningSnapshot(); const secondBefore = await userRow(f.secondUserId); const otherBefore = await userRow(other.userId); const familyBefore = await familyRow(f.familyId);
  const result = await call(confirmPassword, other, { token, password: newPassword, email: other.email, userId: other.userId }, { session: true });
  assert.equal(result.status, 200); assert.equal(result.body.requiresSignIn, true); assert.match(result.headers.get("set-cookie"), /Max-Age=0/);
  const updated = await userRow(f.userId); assert.equal(updated.password_iterations, 100000); assert.notEqual(updated.password_salt, salt);
  assert.equal(await verifySecret(newPassword, updated.password_hash, updated.password_salt, updated.password_iterations), true);
  assert.equal(await verifySecret(password, updated.password_hash, updated.password_salt, updated.password_iterations), false);
  assert.equal(updated.failed_attempts, 0); assert.equal(updated.locked_until, null);
  assert.deepEqual(await userRow(f.secondUserId), secondBefore); assert.deepEqual(await userRow(other.userId), otherBefore); assert.deepEqual(await familyRow(f.familyId), familyBefore);
  assert.equal(await openLinks(f, passwordTable), 0); assert.equal(await openLinks(f, "family_parent_pin_recovery"), 0); assert.equal(await openLinks(other, passwordTable), 1);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(f.familyId).first()).n, 0);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(other.familyId).first()).n, 2);
  assert.equal(await learningSnapshot(), before); assert.equal((await call(confirmPassword, f, { token, password: "Replay-Password-Only" })).status, 400);
});

verify("Parent PIN reset revokes outstanding family-password links when both migrations are enabled", async () => {
  const f = await fixture(); const pw = await issue(f); const pin = await issuePin(f); const before = await learningSnapshot(); const userBefore = await userRow(f.userId);
  assert.equal((await call(confirmPin, f, { token: pin, parentPin: "4567" })).status, 200);
  assert.equal(await openLinks(f, passwordTable), 0); assert.equal((await call(confirmPassword, f, { token: pw, password: newPassword })).status, 400);
  assert.deepEqual(await userRow(f.userId), userBefore); assert.equal(await learningSnapshot(), before);
});

verify("Concurrent password confirmations have exactly one winner with that winner's password", async () => {
  const f = await fixture(); const token = await issue(f);
  const results = await Promise.all([call(confirmPassword, f, { token, password: "Concurrent-Password-A" }), call(confirmPassword, f, { token, password: "Concurrent-Password-B" })]);
  assert.deepEqual(results.map((item) => item.status).sort(), [200, 400]);
  const winner = results[0].status === 200 ? "Concurrent-Password-A" : "Concurrent-Password-B"; const user = await userRow(f.userId);
  assert.equal(await verifySecret(winner, user.password_hash, user.password_salt, user.password_iterations), true);
});

verify("A failed password transaction rolls back token claims, password, both link purposes and session revocation", async () => {
  const f = await fixture(); const token = await issue(f); await issuePin(f); const before = await learningSnapshot(); const userBefore = await userRow(f.userId);
  const limitBefore = await seedLimit(`login-account:${f.email}`);
  await db.exec(`CREATE TRIGGER reject_password_${f.n} BEFORE UPDATE ON family_users WHEN NEW.id='${f.userId}' BEGIN SELECT RAISE(ABORT, 'Synthetic rollback'); END;`);
  try {
    assert.equal((await call(confirmPassword, f, { token, password: newPassword })).status, 503);
    const row = await db.prepare(`SELECT used_at,claim_nonce FROM ${passwordTable} WHERE token_hash=?`).bind(await sha256(token)).first();
    assert.equal(row.used_at, null); assert.equal(row.claim_nonce, null); assert.deepEqual(await userRow(f.userId), userBefore);
    assert.deepEqual(await limitRow(`login-account:${f.email}`), limitBefore);
    assert.equal(await openLinks(f, passwordTable), 1); assert.equal(await openLinks(f, "family_parent_pin_recovery"), 1);
    assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM family_sessions WHERE family_id=?").bind(f.familyId).first()).n, 2); assert.equal(await learningSnapshot(), before);
  } finally { await db.exec(`DROP TRIGGER reject_password_${f.n};`); }
  assert.equal((await call(confirmPassword, f, { token, password: newPassword })).status, 200);
});

verify("Account request throttling keeps known and unknown acknowledgements indistinguishable", async () => {
  const f = await fixture(); const results = [];
  for (let i = 0; i < 5; i++) { const result = await call(requestPassword, f, { email: f.email }, { ip: `account-limit-${f.n}-${i}` }); await result.drain(); results.push(result); }
  assert.ok(f.mail.length > 0 && f.mail.length < 5, "Repeated account requests are capped even from distinct IPs");
  for (const result of results) { assert.equal(result.status, 200); assert.deepEqual(result.body, results[0].body); }
  const unknown = await call(requestPassword, f, { email: `unknown-rate-${f.n}@example.invalid` }); await unknown.drain();
  assert.equal(unknown.status, results[0].status); assert.deepEqual(unknown.body, results[0].body);
});

verify("IP request and confirmation limits bound public abuse independently of account existence", async () => {
  const f = await fixture();
  for (let i = 0; i < 15; i++) {
    const result = await call(requestPassword, f, { email: `unregistered-${f.n}-${i}@example.invalid` });
    assert.equal(result.status, 200); await result.drain();
  }
  assert.equal((await call(requestPassword, f, { email: f.email })).status, 429); assert.equal(f.mail.length, 0);
  for (let i = 0; i < 20; i++) assert.equal((await call(confirmPassword, f, { token: "a".repeat(64), password: newPassword })).status, 400);
  assert.equal((await call(confirmPassword, f, { token: "a".repeat(64), password: newPassword })).status, 429);
});

verify("A concurrent password reset retires the authority of a PIN request before it can issue a link", async () => {
  const f = await fixture(); const passwordToken = await issue(f); const mailBefore = f.mail.length;
  const before = await learningSnapshot(); let interleaved = false;
  const guardedDb = {
    prepare(sql) {
      const statement = db.prepare(sql);
      if (!/INSERT\s+(?:OR\s+\w+\s+)?INTO\s+family_parent_pin_recovery\b/i.test(sql)) return statement;
      return { bind(...values) {
        const bound = statement.bind(...values);
        return { async run() {
          assert.equal(interleaved, false); interleaved = true;
          const reset = await call(confirmPassword, f, { token: passwordToken, password: newPassword });
          assert.equal(reset.status, 200);
          return bound.run();
        } };
      } };
    },
    batch: (statements) => db.batch(statements), exec: (sql) => db.exec(sql)
  };
  const result = await call(requestPin, f, { password }, { session: true, env: { ...f.env, DB: guardedDb } });
  await result.drain(); assert.equal(interleaved, true, "Reset was injected immediately before PIN token insertion");
  assert.equal(result.status, 401); assert.equal(result.body.code, "SESSION_EXPIRED"); assert.equal(f.mail.length, mailBefore);
  assert.equal(await openLinks(f, "family_parent_pin_recovery"), 0); assert.equal(await learningSnapshot(), before);
});

verify("PIN issuance independently rechecks session, password and registered email after initial verification", async () => {
  for (const change of ["session", "password", "email"]) {
    const f = await fixture(); let intercepted = false;
    const guardedDb = { prepare(sql) {
      const statement = db.prepare(sql);
      if (!/INSERT\s+INTO\s+family_parent_pin_recovery\b/i.test(sql)) return statement;
      return { bind(...values) { const bound = statement.bind(...values); return { async run() {
        intercepted = true;
        if (change === "session") await db.prepare("DELETE FROM family_sessions WHERE id=?").bind(await sha256(f.cookie)).run();
        if (change === "password") await db.prepare("UPDATE family_users SET password_hash=? WHERE id=?").bind("retired-password-hash", f.userId).run();
        if (change === "email") await db.prepare("UPDATE family_users SET email=? WHERE id=?").bind(`changed-${f.n}@example.invalid`, f.userId).run();
        return bound.run();
      } }; } };
    }, batch: (statements) => db.batch(statements) };
    const result = await call(requestPin, f, { password }, { session: true, env: { ...f.env, DB: guardedDb } });
    assert.equal(intercepted, true); assert.equal(result.status, 401, change); assert.equal(result.body.code, "SESSION_EXPIRED");
    assert.equal(f.mail.length, 0); assert.equal(await openLinks(f, "family_parent_pin_recovery"), 0);
  }
});

verify("Simultaneous PIN and password resets cannot both redeem their outstanding links", async () => {
  const f = await fixture(); const pw = await issue(f); const pin = await issuePin(f); const before = await learningSnapshot();
  const results = await Promise.all([call(confirmPassword, f, { token: pw, password: newPassword }), call(confirmPin, f, { token: pin, parentPin: "4567" })]);
  assert.deepEqual(results.map((item) => item.status).sort(), [200, 400]);
  const user = await userRow(f.userId); const family = await familyRow(f.familyId);
  if (results[0].status === 200) {
    assert.equal(await verifySecret(newPassword, user.password_hash, user.password_salt, user.password_iterations), true); assert.equal(family.parent_pin_hash, pinHash);
  } else {
    assert.equal(user.password_hash, oldHash); assert.equal(await verifySecret("4567", family.parent_pin_hash, family.parent_pin_salt, family.parent_pin_iterations), true);
  }
  assert.equal(await openLinks(f, passwordTable), 0); assert.equal(await openLinks(f, "family_parent_pin_recovery"), 0); assert.equal(await learningSnapshot(), before);
});

verify("Cross-purpose revocation still applies when the other flow is disabled but its migration exists", async () => {
  const f = await fixture(); const pw = await issue(f); const pin = await issuePin(f);
  assert.equal((await call(confirmPassword, f, { token: pw, password: newPassword }, { env: { ...f.env, BQ_PARENT_PIN_RECOVERY_ENABLED: "false" } })).status, 200);
  assert.equal(await openLinks(f, "family_parent_pin_recovery"), 0);
  const g = await fixture(); await issue(g); const otherPin = await issuePin(g);
  assert.equal((await call(confirmPin, g, { token: otherPin, parentPin: "4567" }, { env: { ...g.env, BQ_PASSWORD_RECOVERY_ENABLED: "false" } })).status, 200);
  assert.equal(await openLinks(g, passwordTable), 0); assert.ok(pin);
});

verify("A winning password reset clears only the matched login-account quota and permits the new login", async () => {
  const f = await fixture(); const token = await issue(f); const before = await learningSnapshot();
  await seedLimit(`login-account:${f.email}`);
  const siblingLimit = await seedLimit(`login-account:${f.secondEmail}`); const ipLimit = await seedLimit(`login-ip:previous-ip-${f.n}`);
  assert.equal((await call(confirmPassword, f, { token, password: newPassword })).status, 200);
  assert.equal(await limitRow(`login-account:${f.email}`), null);
  assert.deepEqual(await limitRow(`login-account:${f.secondEmail}`), siblingLimit); assert.deepEqual(await limitRow(`login-ip:previous-ip-${f.n}`), ipLimit);
  const signedIn = await call(login, f, { email: f.email, password: newPassword }, { ip: `fresh-login-ip-${f.n}` });
  assert.equal(signedIn.status, 200); assert.equal(signedIn.body.authenticated, true); assert.equal(signedIn.body.user.id, f.userId); assert.match(signedIn.headers.get("set-cookie"), /bq_session=/);
  const freshLimit = await seedLimit(`login-account:${f.email}`);
  assert.equal((await call(confirmPassword, f, { token, password: "Replay-Password-Only" })).status, 400);
  assert.deepEqual(await limitRow(`login-account:${f.email}`), freshLimit); assert.equal(await learningSnapshot(), before);
});

verify("A losing concurrent reset cannot clear a fresh quota created after the winning transaction", async () => {
  const f = await fixture(); const token = await issue(f); let intercepted = false; let freshLimit;
  const guardedDb = { prepare: (sql) => db.prepare(sql), async batch(statements) {
    assert.equal(intercepted, false); intercepted = true;
    assert.equal((await call(confirmPassword, f, { token, password: newPassword })).status, 200);
    freshLimit = await seedLimit(`login-account:${f.email}`);
    return db.batch(statements);
  } };
  const loser = await call(confirmPassword, f, { token, password: "Losing-New-Password-Only" }, { env: { ...f.env, DB: guardedDb } });
  assert.equal(intercepted, true); assert.equal(loser.status, 400); assert.deepEqual(await limitRow(`login-account:${f.email}`), freshLimit);
  const user = await userRow(f.userId); assert.equal(await verifySecret(newPassword, user.password_hash, user.password_salt, user.password_iterations), true);
});
