import {
  assertFamilyAuthEnabled, clearSessionCookie, consumeRateLimitAttempt,
  familyAuthEnabled, hashSecret, HttpError, json, normalizeEmail, randomHex,
  readJson, requestAddress, sha256, validateEmail, validatePassword
} from "./family-auth.js";
import {
  assertSameOrigin, recoveryOrigin, recoveryTransportAvailable, sendRecoveryEmail
} from "./parent-pin-recovery.js";

const EXPIRY_MINUTES = 15;
const PASSWORD_ITERATIONS = 100000;

export function familyPasswordRecoveryAvailable(env) {
  return Boolean(familyAuthEnabled(env)
    && env?.BQ_PASSWORD_RECOVERY_ENABLED === "true"
    && env?.BQ_PASSWORD_RECOVERY_MIGRATION_READY === "true"
    && recoveryTransportAvailable(env));
}

export async function requestFamilyPasswordRecovery(context) {
  assertAvailable(context.env);
  assertSameOrigin(context.request);
  const body = await readJson(context.request, 2048);
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  if (!validateEmail(email)) throw new HttpError(400, "Enter a valid email address.", { code: "EMAIL_INVALID" });
  // Never fall back to awaiting account-specific work: that would expose its
  // latency through an otherwise identical public acknowledgement.
  if (typeof context.waitUntil !== "function") throw unavailable();
  await consumeRateLimitAttempt(context.env, `password-recovery-request-ip:${requestAddress(context.request)}`, { maxFailures: 15 });
  context.waitUntil(deliverPasswordRecovery(context.env, email));
  return json({ ok: true, expiresInMinutes: EXPIRY_MINUTES });
}

async function deliverPasswordRecovery(env, email) {
  let tokenHash = null;
  try {
    // Every valid address consumes the same account quota, including unknown
    // addresses. The common helper stores only a hash of this rate-limit key.
    await consumeRateLimitAttempt(env, `password-recovery-account:${email}`, { maxFailures: 3 });
    const user = await env.DB.prepare(
      "SELECT id, family_id, email FROM family_users WHERE email = ?"
    ).bind(email).first();
    if (!user) return;
    const recipient = normalizeEmail(user.email);
    if (!validateEmail(recipient)) return;

    const token = randomHex(32);
    tokenHash = await sha256(token);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + EXPIRY_MINUTES * 60000).toISOString();
    await env.DB.prepare(
      `INSERT INTO family_password_recovery
        (token_hash, family_id, user_id, created_at, expires_at, used_at, claim_nonce)
       VALUES (?, ?, ?, ?, ?, NULL, NULL)`
    ).bind(tokenHash, user.family_id, user.id, now.toISOString(), expiresAt).run();
    const link = `${recoveryOrigin(env)}/#password-reset=${token}`;
    await sendRecoveryEmail(env, recoveryMessage(recipient, link));
  } catch {
    // Account throttling, missing accounts and delivery/storage failures must
    // remain indistinguishable to the caller. Never log provider exceptions,
    // addresses, message contents, passwords or recovery tokens.
    if (tokenHash) {
      try {
        await env.DB.prepare("DELETE FROM family_password_recovery WHERE token_hash = ? AND used_at IS NULL")
          .bind(tokenHash).run();
      } catch { /* Keep all background failures handled and private. */ }
    }
  }
}

export async function completeFamilyPasswordRecovery(context) {
  assertAvailable(context.env);
  assertSameOrigin(context.request);
  const body = await readJson(context.request, 2048);
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";
  await consumeRateLimitAttempt(context.env, `password-recovery-confirm-ip:${requestAddress(context.request)}`, { maxFailures: 20 });
  if (!/^[a-f0-9]{64}$/.test(token)) throw invalidLink();
  if (!validatePassword(password)) throw new HttpError(400, "Password must be 8 to 128 characters.", { code: "PASSWORD_INVALID" });
  const tokenHash = await sha256(token);
  const recovery = await context.env.DB.prepare(
    `SELECT r.family_id, r.user_id, u.email FROM family_password_recovery r
       JOIN family_users u ON u.id = r.user_id AND u.family_id = r.family_id
      WHERE r.token_hash = ? AND r.used_at IS NULL AND r.expires_at > ?`
  ).bind(tokenHash, new Date().toISOString()).first();
  if (!recovery) throw invalidLink();
  await consumeRateLimitAttempt(context.env, `password-recovery-confirm-family:${recovery.family_id}`, { maxFailures: 5 });

  const salt = randomHex(16);
  const passwordHash = await hashSecret(password, salt, PASSWORD_ITERATIONS);
  const accountLimitId = await sha256(`login-account:${normalizeEmail(recovery.email)}`);
  const claimedAt = new Date().toISOString();
  const claimNonce = randomHex(24);
  // D1 executes this batch atomically. Only the invocation that claims the
  // still-valid password token can change its user's password or any sessions.
  const statements = [
    context.env.DB.prepare(
      `UPDATE family_password_recovery SET used_at = ?, claim_nonce = ?
        WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
          AND EXISTS (SELECT 1 FROM family_users u
                       WHERE u.id = family_password_recovery.user_id
                         AND u.family_id = family_password_recovery.family_id)`
    ).bind(claimedAt, claimNonce, tokenHash, claimedAt),
    context.env.DB.prepare(
      `UPDATE family_users SET password_hash = ?, password_salt = ?, password_iterations = ?,
                               failed_attempts = 0, locked_until = NULL, updated_at = ?
        WHERE id = (SELECT user_id FROM family_password_recovery WHERE token_hash = ? AND claim_nonce = ?)
          AND family_id = (SELECT family_id FROM family_password_recovery WHERE token_hash = ? AND claim_nonce = ?)`
    ).bind(passwordHash, salt, PASSWORD_ITERATIONS, claimedAt, tokenHash, claimNonce, tokenHash, claimNonce),
    context.env.DB.prepare(
      `DELETE FROM family_sessions
        WHERE family_id = (SELECT family_id FROM family_password_recovery
                            WHERE token_hash = ? AND claim_nonce = ?)`
    ).bind(tokenHash, claimNonce),
    context.env.DB.prepare(
      `UPDATE family_password_recovery SET used_at = ?
        WHERE family_id = (SELECT family_id FROM family_password_recovery
                            WHERE token_hash = ? AND claim_nonce = ?)
          AND token_hash <> ? AND used_at IS NULL`
    ).bind(claimedAt, tokenHash, claimNonce, tokenHash),
    context.env.DB.prepare(
      `DELETE FROM auth_rate_limits WHERE id = ?
        AND EXISTS (SELECT 1 FROM family_password_recovery
                     WHERE token_hash = ? AND claim_nonce = ?)`
    ).bind(accountLimitId, tokenHash, claimNonce)
  ];
  if (context.env.BQ_PARENT_PIN_RECOVERY_MIGRATION_READY === "true") {
    statements.push(context.env.DB.prepare(
      `UPDATE family_parent_pin_recovery SET used_at = ?
        WHERE family_id = (SELECT family_id FROM family_password_recovery
                            WHERE token_hash = ? AND claim_nonce = ?)
          AND used_at IS NULL`
    ).bind(claimedAt, tokenHash, claimNonce));
  }
  const results = await context.env.DB.batch(statements);
  if (Number(results[0]?.meta?.changes) !== 1 || Number(results[1]?.meta?.changes) !== 1) throw invalidLink();
  return json({ ok: true, requiresSignIn: true }, 200, { "set-cookie": clearSessionCookie(context.request) });
}

export function passwordRecoveryErrorResponse(error) {
  if (error instanceof HttpError) return json({ error: error.message, ...error.details }, error.status);
  return json({ error: "Password recovery is temporarily unavailable. Please try again later.", code: "RECOVERY_UNAVAILABLE" }, 503);
}

function assertAvailable(env) {
  assertFamilyAuthEnabled(env);
  if (!familyPasswordRecoveryAvailable(env)) throw unavailable();
}

function unavailable() {
  return new HttpError(503, "Family password recovery is not available yet. Please try again later.", { code: "RECOVERY_UNAVAILABLE" });
}

function invalidLink() {
  return new HttpError(400, "This recovery link is invalid or has expired. Request a new link.", { code: "RECOVERY_LINK_INVALID" });
}

function recoveryMessage(to, link) {
  const subject = "Reset your Bright Quest family password";
  const text = `Use this link to choose a new family password:\n\n${link}\n\nThis link expires in ${EXPIRY_MINUTES} minutes and can be used once. After resetting your password, every device will need to sign in again. Your parent PIN and children's learning records will stay unchanged.\n\nIf you did not request this, you can ignore this email.`;
  const safeLink = link.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const html = `<h1>Choose a new family password</h1><p><a href="${safeLink}">Reset your Bright Quest family password</a></p><p>This link expires in ${EXPIRY_MINUTES} minutes and can be used once. Every device will need to sign in again after the reset. Your parent PIN and children's learning records will stay unchanged.</p><p>If you did not request this, you can ignore this email.</p>`;
  return { to, subject, text, html };
}
