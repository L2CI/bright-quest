import {
  assertFamilyAuthEnabled, clearSessionCookie, consumeRateLimitAttempt,
  familyAuthEnabled, getSession, hashSecret, HttpError, json, normalizeEmail,
  randomHex, readJson, requestAddress, sha256, validateEmail, verifySecret
} from "./family-auth.js";

const EXPIRY_MINUTES = 15;
const PIN_ITERATIONS = 100000;
const SEND_TIMEOUT_MS = 10000;

export function recoveryAvailable(env) {
  return Boolean(familyAuthEnabled(env)
    && env?.BQ_PARENT_PIN_RECOVERY_ENABLED === "true"
    && env?.BQ_PARENT_PIN_RECOVERY_MIGRATION_READY === "true"
    && recoveryTransportAvailable(env));
}

export function recoveryTransportAvailable(env) {
  return Boolean(recoveryOrigin(env) && (syntheticMailer(env) || emailConfiguration(env)));
}

export async function requestParentPinRecovery(context) {
  assertAvailable(context.env);
  assertSameOrigin(context.request);
  const session = await getSession(context);
  const body = await readJson(context.request, 2048);
  const password = typeof body?.password === "string" ? body.password : "";
  if (!password || password.length > 128) throw new HttpError(400, "Enter your current family password.", { code: "PASSWORD_REQUIRED" });

  await consumeRateLimitAttempt(context.env, `parent-recovery-request-ip:${requestAddress(context.request)}`, { maxFailures: 15 });
  await consumeRateLimitAttempt(context.env, `parent-recovery-password:${session.user_id}`, { maxFailures: 5 });
  const user = await context.env.DB.prepare(
    `SELECT id, family_id, email, password_hash, password_salt, password_iterations
       FROM family_users WHERE id = ? AND family_id = ?`
  ).bind(session.user_id, session.family_id).first();
  if (!user || !await verifySecret(password, user.password_hash, user.password_salt, user.password_iterations)) {
    throw new HttpError(401, "The family password did not match.", { code: "PASSWORD_MISMATCH" });
  }
  const recipient = normalizeEmail(user.email);
  if (!validateEmail(recipient)) throw unavailable();
  await consumeRateLimitAttempt(context.env, `parent-recovery-send:${session.family_id}`, { maxFailures: 3 });

  const token = randomHex(32);
  const tokenHash = await sha256(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + EXPIRY_MINUTES * 60000).toISOString();
  const issued = await context.env.DB.prepare(
    `INSERT INTO family_parent_pin_recovery
      (token_hash, family_id, user_id, created_at, expires_at, used_at, claim_nonce)
     SELECT ?, u.family_id, u.id, ?, ?, NULL, NULL
       FROM family_users u
       JOIN family_sessions s ON s.user_id = u.id AND s.family_id = u.family_id
      WHERE u.id = ? AND u.family_id = ? AND u.password_hash = ? AND u.email = ?
        AND s.id = ? AND s.expires_at > ? AND s.last_seen_at >= ?`
  ).bind(tokenHash, now.toISOString(), expiresAt, user.id, user.family_id, user.password_hash, user.email,
    session.id, now.toISOString(), new Date(now.getTime() - 24 * 3600000).toISOString()).run();
  // A reset or sign-out may have retired the verified session/password while
  // this request was awaiting the password check or rate-limit writes.
  if (Number(issued?.meta?.changes) !== 1) {
    throw new HttpError(401, "Your session changed. Sign in and request a new recovery link.", { code: "SESSION_EXPIRED" });
  }

  const link = `${recoveryOrigin(context.env)}/#parent-pin-reset=${token}`;
  try {
    await sendRecoveryEmail(context.env, recoveryMessage(recipient, link));
  } catch {
    // Provider errors can include message content. Never log or return them.
    // A link that was not confirmed accepted by the mail service is invalid.
    await context.env.DB.prepare("DELETE FROM family_parent_pin_recovery WHERE token_hash = ? AND used_at IS NULL")
      .bind(tokenHash).run();
    throw new HttpError(503, "The recovery email could not be sent. Please try again later.", { code: "RECOVERY_SEND_FAILED" });
  }
  return json({ ok: true, maskedEmail: maskEmail(recipient), expiresInMinutes: EXPIRY_MINUTES });
}

export async function completeParentPinRecovery(context) {
  assertAvailable(context.env);
  assertSameOrigin(context.request);
  const body = await readJson(context.request, 2048);
  const token = typeof body?.token === "string" ? body.token : "";
  const parentPin = typeof body?.parentPin === "string" ? body.parentPin : "";
  await consumeRateLimitAttempt(context.env, `parent-recovery-confirm-ip:${requestAddress(context.request)}`, { maxFailures: 20 });
  if (!/^[a-f0-9]{64}$/.test(token)) throw invalidLink();
  if (!/^\d{4,8}$/.test(parentPin)) throw new HttpError(400, "Parent PIN must contain 4 to 8 digits.", { code: "PIN_INVALID" });
  const tokenHash = await sha256(token);
  const now = new Date().toISOString();
  const recovery = await context.env.DB.prepare(
    `SELECT r.family_id, r.user_id FROM family_parent_pin_recovery r
       JOIN family_users u ON u.id = r.user_id AND u.family_id = r.family_id
      WHERE r.token_hash = ? AND r.used_at IS NULL AND r.expires_at > ?`
  ).bind(tokenHash, now).first();
  if (!recovery) throw invalidLink();
  await consumeRateLimitAttempt(context.env, `parent-recovery-confirm-family:${recovery.family_id}`, { maxFailures: 5 });

  const salt = randomHex(16);
  const hash = await hashSecret(parentPin, salt, PIN_ITERATIONS);
  const claimedAt = new Date().toISOString();
  const claimNonce = randomHex(24);
  // D1 batch is a transaction. Every following statement is conditional on
  // this invocation winning the unused-token claim. A concurrent/replayed
  // request cannot update the PIN or revoke sessions with a losing nonce.
  const statements = [
    context.env.DB.prepare(
      `UPDATE family_parent_pin_recovery SET used_at = ?, claim_nonce = ?
        WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
          AND EXISTS (SELECT 1 FROM family_users u
                       WHERE u.id = family_parent_pin_recovery.user_id
                         AND u.family_id = family_parent_pin_recovery.family_id)`
    ).bind(claimedAt, claimNonce, tokenHash, claimedAt),
    context.env.DB.prepare(
      `UPDATE families SET parent_pin_hash = ?, parent_pin_salt = ?, parent_pin_iterations = ?, updated_at = ?
        WHERE id = (SELECT family_id FROM family_parent_pin_recovery
                     WHERE token_hash = ? AND claim_nonce = ?)`
    ).bind(hash, salt, PIN_ITERATIONS, claimedAt, tokenHash, claimNonce),
    context.env.DB.prepare(
      `DELETE FROM family_sessions
        WHERE family_id = (SELECT family_id FROM family_parent_pin_recovery
                            WHERE token_hash = ? AND claim_nonce = ?)`
    ).bind(tokenHash, claimNonce),
    context.env.DB.prepare(
      `UPDATE family_parent_pin_recovery SET used_at = ?
        WHERE family_id = (SELECT family_id FROM family_parent_pin_recovery
                            WHERE token_hash = ? AND claim_nonce = ?)
          AND token_hash <> ? AND used_at IS NULL`
    ).bind(claimedAt, tokenHash, claimNonce, tokenHash)
  ];
  // A PIN-only installation has no password-recovery table yet. Once that
  // migration is ready, also revoke its outstanding links in this transaction.
  if (context.env.BQ_PASSWORD_RECOVERY_MIGRATION_READY === "true") {
    statements.push(context.env.DB.prepare(
      `UPDATE family_password_recovery SET used_at = ?
        WHERE family_id = (SELECT family_id FROM family_parent_pin_recovery
                            WHERE token_hash = ? AND claim_nonce = ?)
          AND used_at IS NULL`
    ).bind(claimedAt, tokenHash, claimNonce));
  }
  const results = await context.env.DB.batch(statements);
  if (Number(results[0]?.meta?.changes) !== 1 || Number(results[1]?.meta?.changes) !== 1) throw invalidLink();
  return json({ ok: true, requiresSignIn: true }, 200, { "set-cookie": clearSessionCookie(context.request) });
}

// These endpoints deliberately sanitise unexpected errors: a provider failure
// or request object must never put a recovery token/password into logs.
export function recoveryErrorResponse(error) {
  if (error instanceof HttpError) return json({ error: error.message, ...error.details }, error.status);
  return json({ error: "PIN recovery is temporarily unavailable. Please try again later.", code: "RECOVERY_UNAVAILABLE" }, 503);
}

export async function sendRecoveryEmail(env, message) {
  const injected = syntheticMailer(env);
  if (injected) {
    await injected(Object.freeze({ ...message }));
    return;
  }
  const config = emailConfiguration(env);
  if (!config) throw unavailable();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.accountId}/email/sending/send`, {
      method: "POST",
      headers: { authorization: `Bearer ${config.apiToken}`, "content-type": "application/json" },
      body: JSON.stringify({ from: config.from, to: message.to, subject: message.subject, text: message.text, html: message.html }),
      signal: controller.signal,
      redirect: "error"
    });
    if (!response.ok) throw new Error("Email service rejected the request");
    const result = await response.json();
    const delivered = Array.isArray(result.result?.delivered) ? result.result.delivered : [];
    const queued = Array.isArray(result.result?.queued) ? result.result.queued : [];
    const bounced = Array.isArray(result.result?.permanent_bounces) ? result.result.permanent_bounces : [];
    const recipient = normalizeEmail(message.to);
    if (result.success !== true || bounced.some((address) => normalizeEmail(address) === recipient)
      || ![...delivered, ...queued].some((address) => normalizeEmail(address) === recipient)) {
      throw new Error("Email service did not accept the recipient");
    }
  } finally {
    clearTimeout(timeout);
  }
}

function syntheticMailer(env) {
  return typeof env?.BQ_PIN_RECOVERY_MAILER === "function" ? env.BQ_PIN_RECOVERY_MAILER : null;
}

function emailConfiguration(env) {
  const accountId = typeof env?.BQ_EMAIL_ACCOUNT_ID === "string" ? env.BQ_EMAIL_ACCOUNT_ID.trim() : "";
  const apiToken = typeof env?.BQ_EMAIL_API_TOKEN === "string" ? env.BQ_EMAIL_API_TOKEN.trim() : "";
  const from = typeof env?.BQ_EMAIL_FROM === "string" ? normalizeEmail(env.BQ_EMAIL_FROM) : "";
  if (!/^[a-f0-9]{32}$/i.test(accountId) || apiToken.length < 16 || apiToken.length > 2048 || /[\r\n]/.test(apiToken) || !validateEmail(from)) return null;
  return { accountId, apiToken, from };
}

export function recoveryOrigin(env) {
  if (typeof env?.BQ_APP_ORIGIN !== "string") return null;
  try {
    const origin = new URL(env.BQ_APP_ORIGIN);
    const localOnly = syntheticMailer(env) && origin.protocol === "http:" && ["127.0.0.1", "localhost", "[::1]"].includes(origin.hostname);
    if (origin.protocol !== "https:" && !localOnly) return null;
    if (origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) return null;
    return origin.origin;
  } catch {
    return null;
  }
}

function assertAvailable(env) {
  assertFamilyAuthEnabled(env);
  if (!recoveryAvailable(env)) throw unavailable();
}

export function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== new URL(request.url).origin)) {
    throw new HttpError(403, "Open Bright Quest to continue.", { code: "ORIGIN_MISMATCH" });
  }
}

function unavailable() {
  return new HttpError(503, "Parent PIN recovery is not available yet. Please try again later.", { code: "RECOVERY_UNAVAILABLE" });
}

function invalidLink() {
  return new HttpError(400, "This recovery link is invalid or has expired. Request a new link.", { code: "RECOVERY_LINK_INVALID" });
}

function maskEmail(email) {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 1)}•••@${domain}`;
}

function recoveryMessage(to, link) {
  const subject = "Reset your Bright Quest parent PIN";
  const text = `Use this link to choose a new parent PIN:\n\n${link}\n\nThis link expires in ${EXPIRY_MINUTES} minutes and can be used once. After resetting your PIN, every device will need to sign in again. Your children's learning records will stay unchanged.\n\nIf you did not request this, you can ignore this email.`;
  const safeLink = link.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const html = `<h1>Choose a new parent PIN</h1><p><a href="${safeLink}">Reset your Bright Quest parent PIN</a></p><p>This link expires in ${EXPIRY_MINUTES} minutes and can be used once. Every device will need to sign in again after the reset. Your children's learning records will stay unchanged.</p><p>If you did not request this, you can ignore this email.</p>`;
  return { to, subject, text, html };
}
