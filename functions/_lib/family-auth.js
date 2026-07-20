const SESSION_COOKIE = "bq_session";
const PASSWORD_ITERATIONS = 100000;
const SESSION_DAYS = 30;
const SESSION_IDLE_HOURS = 24;
const PARENT_UNLOCK_MINUTES = 30;

export function familyAuthEnabled(env) {
  return env?.BQ_FAMILY_AUTH_ENABLED === "true" && env?.BQ_FAMILY_AUTH_MIGRATION_READY === "true";
}

export function assertFamilyAuthEnabled(env) {
  if (!familyAuthEnabled(env)) throw new HttpError(404, "Not found");
}

export function json(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers
    }
  });
}

export async function readJson(request, maxBytes = 16384) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) throw new HttpError(415, "JSON request required");
  maxBytes = Number(maxBytes);
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > maxBytes) throw new HttpError(413, "Request body is too large");
  try {
    if (!request.body) return {};
    const reader = request.body.getReader();
    const chunks = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > maxBytes) {
        await reader.cancel();
        throw new HttpError(413, "Request body is too large");
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, "Invalid JSON body");
  }
}

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function validateEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return typeof password === "string" && password.length >= 8 && password.length <= 128;
}

export async function hashSecret(secret, saltHex, iterations = PASSWORD_ITERATIONS) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    salt: fromHex(saltHex),
    iterations
  }, key, 256);
  return toHex(new Uint8Array(bits));
}

export function randomHex(bytes = 32) {
  const value = new Uint8Array(bytes);
  crypto.getRandomValues(value);
  return toHex(value);
}

export async function verifySecret(secret, expectedHash, salt, iterations) {
  if (!expectedHash || !salt || !iterations) return false;
  const actual = await hashSecret(secret, salt, Number(iterations));
  return constantTimeEqual(actual, expectedHash);
}

export async function createSession(env, user, activeChildId = null) {
  const token = randomHex(32);
  const id = await sha256(token);
  const now = new Date();
  const expires = new Date(now.getTime() + SESSION_DAYS * 86400000);
  await env.DB.prepare(
    `INSERT INTO family_sessions
      (id, family_id, user_id, active_child_id, parent_unlocked_until, expires_at, created_at, last_seen_at)
     VALUES (?, ?, ?, ?, NULL, ?, ?, ?)`
  ).bind(id, user.family_id, user.id, activeChildId, expires.toISOString(), now.toISOString(), now.toISOString()).run();
  return { token, expires };
}

export function sessionCookie(token, expires, request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${token}; Path=/; Expires=${expires.toUTCString()}; HttpOnly${secure}; SameSite=Strict`;
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly${secure}; SameSite=Strict`;
}

export async function getSession(context, { parentRequired = false } = {}) {
  if (!context.env.DB) throw new HttpError(500, "D1 binding DB is missing");
  const token = cookieValue(context.request.headers.get("cookie"), SESSION_COOKIE);
  if (!token) throw new HttpError(401, "Login required");
  const id = await sha256(token);
  const row = await context.env.DB.prepare(
    `SELECT s.id, s.family_id, s.user_id, s.active_child_id, s.parent_unlocked_until,
            s.parent_capability_hash, s.child_capability_hash, s.child_capability_expires_at,
            s.expires_at, s.last_seen_at, u.email, u.display_name, f.name AS family_name,
            (SELECT COUNT(*) FROM child_profiles cp WHERE cp.family_id = s.family_id) AS child_count
       FROM family_sessions s
       JOIN family_users u ON u.id = s.user_id
       JOIN families f ON f.id = s.family_id
      WHERE s.id = ?`
  ).bind(id).first();
  const idleExpired = row && Date.now() - Date.parse(row.last_seen_at) > SESSION_IDLE_HOURS * 3600000;
  if (!row || Date.parse(row.expires_at) <= Date.now() || idleExpired) {
    if (row) await context.env.DB.prepare("DELETE FROM family_sessions WHERE id = ?").bind(id).run();
    throw new HttpError(401, "Session expired");
  }
  row.parent_capability_valid = await capabilityMatches(
    context.request.headers.get("x-bq-parent-capability"),
    row.parent_capability_hash,
    row.parent_unlocked_until
  );
  row.child_capability_valid = Number(row.child_count) <= 1 || await capabilityMatches(
    context.request.headers.get("x-bq-child-capability"),
    row.child_capability_hash,
    row.child_capability_expires_at
  );
  if (Number(row.child_count) > 1 && !row.child_capability_valid) row.active_child_id = null;
  if (parentRequired && !row.parent_capability_valid) {
    throw new HttpError(403, "Parent PIN required", { code: "PARENT_PIN_REQUIRED" });
  }
  if (Date.now() - Date.parse(row.last_seen_at) > 5 * 60000) {
    row.last_seen_at = new Date().toISOString();
    await context.env.DB.prepare("UPDATE family_sessions SET last_seen_at = ? WHERE id = ?").bind(row.last_seen_at, row.id).run();
  }
  return row;
}

export async function rotateSession(env, session, parentUnlockedUntil = null, parentCapabilityHash = null) {
  const token = randomHex(32);
  const id = await sha256(token);
  await env.DB.prepare(
    `UPDATE family_sessions
        SET id = ?, parent_unlocked_until = ?, parent_capability_hash = ?, last_seen_at = ?
      WHERE id = ?`
  ).bind(id, parentUnlockedUntil, parentCapabilityHash, new Date().toISOString(), session.id).run();
  return { token, expires: new Date(session.expires_at) };
}

export async function sessionSummary(env, session) {
  const children = await env.DB.prepare(
    `SELECT id, legacy_profile_id, profile_name, stars, payload_json, version, updated_at,
            CASE WHEN child_pin_hash IS NOT NULL THEN 1 ELSE 0 END AS pin_set
       FROM child_profiles WHERE family_id = ? ORDER BY created_at ASC`
  ).bind(session.family_id).all();
  const parentUnlocked = Boolean(session.parent_capability_valid);
  const mapped = children.results.map((row) => ({
    id: row.id,
    legacyProfileId: row.legacy_profile_id,
    name: row.profile_name,
    stars: parentUnlocked || row.id === session.active_child_id || children.results.length === 1 ? row.stars : null,
    updatedAt: parentUnlocked || row.id === session.active_child_id || children.results.length === 1 ? row.updated_at : null,
    version: parentUnlocked || row.id === session.active_child_id || children.results.length === 1 ? row.version : null,
    pinSet: Boolean(row.pin_set),
    payload: parentUnlocked || row.id === session.active_child_id || children.results.length === 1 ? safeJson(row.payload_json) : null
  }));
  const activeChildId = mapped.some((child) => child.id === session.active_child_id)
    ? session.active_child_id
    : (mapped.length === 1 ? mapped[0].id : null);
  if (activeChildId !== session.active_child_id) {
    await env.DB.prepare("UPDATE family_sessions SET active_child_id = ?, last_seen_at = ? WHERE id = ?")
      .bind(activeChildId, new Date().toISOString(), session.id).run();
  }
  return {
    authenticated: true,
    family: { id: session.family_id, name: session.family_name },
    user: { id: session.user_id, email: session.email, displayName: session.display_name },
    children: mapped,
    activeChildId,
    parentUnlocked
  };
}

export async function consumeRateLimitAttempt(env, key, { maxFailures = 5 } = {}) {
  const id = await sha256(key);
  const now = new Date();
  const nowIso = now.toISOString();
  const cutoff = new Date(now.getTime() - 15 * 60000).toISOString();
  const lockCandidate = new Date(now.getTime() + 15 * 60000).toISOString();
  const row = await env.DB.prepare(
    `INSERT INTO auth_rate_limits (id, failure_count, window_started_at, locked_until, updated_at)
     VALUES (?, 1, ?, NULL, ?)
     ON CONFLICT(id) DO UPDATE SET
       failure_count = CASE
         WHEN auth_rate_limits.window_started_at < ? THEN 1
         ELSE auth_rate_limits.failure_count + 1
       END,
       window_started_at = CASE
         WHEN auth_rate_limits.window_started_at < ? THEN ?
         ELSE auth_rate_limits.window_started_at
       END,
       locked_until = CASE
         WHEN auth_rate_limits.locked_until IS NOT NULL AND auth_rate_limits.locked_until > ?
           THEN auth_rate_limits.locked_until
         WHEN auth_rate_limits.window_started_at < ? THEN NULL
         WHEN auth_rate_limits.failure_count + 1 > ? THEN ?
         ELSE NULL
       END,
       updated_at = ?
     RETURNING failure_count, locked_until`
  ).bind(id, nowIso, nowIso, cutoff, cutoff, nowIso, nowIso, cutoff, maxFailures, lockCandidate, nowIso).first();
  if (Number(row?.failure_count || 0) > maxFailures || (row?.locked_until && Date.parse(row.locked_until) > Date.now())) {
    throw new HttpError(429, "Too many attempts. Try again later.", { code: "RATE_LIMITED" });
  }
  return { id };
}

export async function pruneRateLimits(env) {
  const cutoff = new Date(Date.now() - 86400000).toISOString();
  await env.DB.prepare("DELETE FROM auth_rate_limits WHERE updated_at < ?").bind(cutoff).run();
}

export async function clearRateLimit(env, limit) {
  await env.DB.prepare("DELETE FROM auth_rate_limits WHERE id = ?").bind(limit.id).run();
}

export function requestAddress(request) {
  return request.headers.get("cf-connecting-ip") || "local";
}

export function parentUnlockUntil() {
  return new Date(Date.now() + PARENT_UNLOCK_MINUTES * 60000).toISOString();
}

export async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toHex(new Uint8Array(digest));
}

export function errorResponse(error) {
  if (error instanceof HttpError) return json({ error: error.message, ...error.details }, error.status);
  console.error("Bright Quest API error", error);
  return json({ error: "Unexpected server error" }, 500);
}

export class HttpError extends Error {
  constructor(status, message, details = {}) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function cookieValue(header, name) {
  const entries = String(header || "").split(";");
  for (const entry of entries) {
    const [key, ...parts] = entry.trim().split("=");
    if (key === name) return parts.join("=");
  }
  return "";
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let different = 0;
  for (let index = 0; index < a.length; index += 1) different |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return different === 0;
}

async function capabilityMatches(token, expectedHash, expiresAt) {
  if (!token || !expectedHash || !expiresAt || Date.parse(expiresAt) <= Date.now()) return false;
  return constantTimeEqual(await sha256(token), expectedHash);
}

function toHex(bytes) {
  return [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function fromHex(value) {
  if (!/^[0-9a-f]+$/i.test(value) || value.length % 2) throw new Error("Invalid hex value");
  return Uint8Array.from(value.match(/.{2}/g), (part) => Number.parseInt(part, 16));
}

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
