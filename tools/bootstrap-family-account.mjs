import { createHash, pbkdf2Sync, randomBytes, randomUUID } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const remote = process.argv.includes("--remote");
const persistTo = (process.env.BQ_D1_PERSIST_TO || "").trim();
const locationArgs = remote ? ["--remote"] : ["--local", ...(persistTo ? ["--persist-to", persistTo] : [])];
if (remote && process.env.BQ_ALLOW_REMOTE_BOOTSTRAP !== "yes") {
  fail("Remote bootstrap requires BQ_ALLOW_REMOTE_BOOTSTRAP=yes and explicit production approval.");
}

const email = required("BQ_BOOTSTRAP_EMAIL").trim().toLowerCase();
const password = required("BQ_BOOTSTRAP_PASSWORD");
const parentPin = required("BQ_BOOTSTRAP_PARENT_PIN");
const childName = required("BQ_BOOTSTRAP_CHILD_NAME").trim();
const displayName = (process.env.BQ_BOOTSTRAP_DISPLAY_NAME || "Parent").trim();
const familyName = (process.env.BQ_BOOTSTRAP_FAMILY_NAME || `${displayName}'s family`).trim();
const legacyProfileIdOverride = (process.env.BQ_BOOTSTRAP_LEGACY_PROFILE_ID || "").trim();

if (password.length < 8 || password.length > 128) fail("Bootstrap password must be 8 to 128 characters.");
if (!/^\d{4,8}$/.test(parentPin)) fail("Bootstrap parent PIN must contain 4 to 8 digits.");

const existingUser = query(`SELECT id FROM family_users WHERE email = ${sql(email)} LIMIT 1`);
if (existingUser.length) fail("A family user already exists for the bootstrap email.");

const legacyProfiles = query(
  `SELECT profile_id, profile_name, stars, payload_json, updated_at, created_at
     FROM app_profiles
    WHERE app_id = 'bright-quest'
      AND ${legacyProfileIdOverride ? `profile_id = ${sql(legacyProfileIdOverride)}` : `lower(profile_name) = lower(${sql(childName)})`}
    ORDER BY updated_at DESC`
);
if (legacyProfiles.length > 1 && !legacyProfileIdOverride) {
  fail("Multiple legacy profiles match the child name. Set BQ_BOOTSTRAP_LEGACY_PROFILE_ID explicitly.");
}

const now = new Date().toISOString();
const familyId = randomUUID();
const userId = randomUUID();
const childId = randomUUID();
const legacy = legacyProfiles[0] || null;
const legacyProfileId = legacy?.profile_id || profileKey(childName);
if (legacy) {
  const priorClaim = query(
    `SELECT family_id, child_id FROM profile_migration_log
      WHERE source_kind = 'app_profiles' AND source_id = ${sql(legacyProfileId)} LIMIT 1`
  );
  if (priorClaim.length) fail("The selected legacy profile has already been claimed by a family account.");
}
const payload = legacy?.payload_json || JSON.stringify({
  id: legacyProfileId,
  name: childName,
  createdAt: now,
  stars: 0,
  attempts: [],
  trainingCompleted: {},
  writingSamples: []
});
const legacyEvents = legacy
  ? query(`SELECT id, event_type, payload_json, created_at FROM app_events WHERE app_id = 'bright-quest' AND profile_id = ${sql(legacyProfileId)} ORDER BY created_at ASC`)
  : [];

const passwordSalt = randomBytes(16).toString("hex");
const parentPinSalt = randomBytes(16).toString("hex");
const passwordHash = hashSecret(password, passwordSalt);
const parentPinHash = hashSecret(parentPin, parentPinSalt);
const checksum = createHash("sha256").update(payload).digest("hex");
const profile = JSON.parse(payload);
const recordCounts = {
  profiles: 1,
  events: legacyEvents.length,
  attempts: Array.isArray(profile.attempts) ? profile.attempts.length : 0,
  writingSamples: Array.isArray(profile.writingSamples) ? profile.writingSamples.length : 0,
  trainingCompleted: Object.keys(profile.trainingCompleted || {}).length,
  stars: Number(profile.stars || legacy?.stars || 0)
};

const statements = [
  "PRAGMA foreign_keys = ON",
  `INSERT INTO families
    (id, name, parent_pin_hash, parent_pin_salt, parent_pin_iterations, created_at, updated_at)
   VALUES (${sql(familyId)}, ${sql(familyName)}, ${sql(parentPinHash)}, ${sql(parentPinSalt)}, 600000, ${sql(now)}, ${sql(now)})`,
  `INSERT INTO family_users
    (id, family_id, email, display_name, password_hash, password_salt, password_iterations,
     failed_attempts, locked_until, created_at, updated_at)
   VALUES (${sql(userId)}, ${sql(familyId)}, ${sql(email)}, ${sql(displayName)}, ${sql(passwordHash)}, ${sql(passwordSalt)},
     600000, 0, NULL, ${sql(now)}, ${sql(now)})`,
  `INSERT INTO child_profiles
    (id, family_id, legacy_profile_id, profile_name, stars, payload_json, version,
     child_pin_hash, child_pin_salt, child_pin_iterations, created_at, updated_at)
   VALUES (${sql(childId)}, ${sql(familyId)}, ${sql(legacyProfileId)}, ${sql(childName)}, ${Number(profile.stars || legacy?.stars || 0)},
     ${sql(payload)}, 1, NULL, NULL, NULL, ${sql(legacy?.created_at || now)}, ${sql(legacy?.updated_at || now)})`,
  ...legacyEvents.map((event) => `INSERT INTO family_profile_events
    (id, family_id, child_id, event_type, idempotency_key, payload_json, created_at)
   VALUES (${sql(event.id)}, ${sql(familyId)}, ${sql(childId)}, ${sql(event.event_type)}, ${sql(`legacy:${event.id}`)},
     ${sql(event.payload_json)}, ${sql(event.created_at)})`),
  `INSERT INTO profile_migration_log
    (id, family_id, child_id, source_kind, source_id, source_checksum, record_counts_json, migrated_at)
   VALUES (${sql(randomUUID())}, ${sql(familyId)}, ${sql(childId)}, ${sql(legacy ? "app_profiles" : "bootstrap")},
      ${sql(legacy ? legacyProfileId : childId)}, ${sql(checksum)}, ${sql(JSON.stringify(recordCounts))}, ${sql(now)})`
];

const tempPath = resolve(".wrangler", "tmp", `bright-quest-family-bootstrap-${Date.now()}.sql`);
mkdirSync(dirname(tempPath), { recursive: true });
writeFileSync(tempPath, `${statements.join(";\n")};\n`, { encoding: "utf8", mode: 0o600 });
try {
  runWrangler(["d1", "execute", "bright-quest-db", ...locationArgs, "--file", tempPath]);
} finally {
  rmSync(tempPath, { force: true });
}

const destination = query(
  `SELECT c.id, c.legacy_profile_id, c.profile_name, c.stars, c.version,
          (SELECT COUNT(*) FROM family_profile_events e WHERE e.family_id = c.family_id AND e.child_id = c.id) AS event_count
     FROM child_profiles c WHERE c.id = ${sql(childId)}`
)[0];

const report = {
  mode: remote ? "remote" : "local",
  familyId,
  userId,
  childId,
  email,
  childName,
  source: legacy ? "legacy-profile" : "new-profile",
  sourceProfileId: legacyProfileId,
  sourceChecksum: checksum,
  expected: recordCounts,
  destination
};
const reportDir = resolve("outputs", "family-auth-bootstrap");
mkdirSync(reportDir, { recursive: true });
const reportPath = join(reportDir, `reconciliation-${remote ? "remote" : "local"}-${Date.now()}.json`);
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`Family bootstrap complete. Reconciliation report: ${reportPath}`);

function query(command) {
  const result = runWrangler(["d1", "execute", "bright-quest-db", ...locationArgs, "--command", command, "--json"]);
  const parsed = JSON.parse(result.stdout || "[]");
  return parsed[0]?.results || parsed[0]?.result?.results || [];
}

function runWrangler(args) {
  const wranglerScript = resolve("node_modules", "wrangler", "bin", "wrangler.js");
  const result = spawnSync(process.execPath, [wranglerScript, ...args], { encoding: "utf8", shell: false });
  if (result.status !== 0) fail(result.error?.message || result.stderr || result.stdout || "Wrangler command failed.");
  return result;
}

function hashSecret(secret, saltHex) {
  return pbkdf2Sync(secret, Buffer.from(saltHex, "hex"), 600000, 32, "sha256").toString("hex");
}

function profileKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `student-${Date.now()}`;
}

function sql(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function required(name) {
  const value = process.env[name];
  if (!value) fail(`${name} is required.`);
  return value;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
