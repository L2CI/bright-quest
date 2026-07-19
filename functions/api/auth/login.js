import {
  createSession,
  assertFamilyAuthEnabled,
  consumeRateLimitAttempt,
  clearRateLimit,
  errorResponse,
  hashSecret,
  json,
  normalizeEmail,
  pruneRateLimits,
  requestAddress,
  readJson,
  sessionCookie,
  sessionSummary,
  sha256,
  validateEmail,
  verifySecret
} from "../../_lib/family-auth.js";

export async function onRequestPost(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const body = await readJson(context.request);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    if (!validateEmail(email) || !password) return json({ error: "Email and password are required" }, 400);

    await pruneRateLimits(context.env);
    const ipLimit = await consumeRateLimitAttempt(context.env, `login-ip:${requestAddress(context.request)}`, { maxFailures: 20 });
    const user = await context.env.DB.prepare(
      `SELECT id, family_id, email, display_name, password_hash, password_salt,
              password_iterations, failed_attempts, locked_until
         FROM family_users WHERE email = ?`
    ).bind(email).first();
    if (!user) {
      await hashSecret(password, "00000000000000000000000000000000");
      return json({ error: "Email or password did not match" }, 401);
    }

    const accountLimit = await consumeRateLimitAttempt(context.env, `login-account:${email}`);

    const valid = await verifySecret(password, user.password_hash, user.password_salt, user.password_iterations);
    if (!valid) {
      return json({ error: "Email or password did not match" }, 401);
    }

    await Promise.all([
      clearRateLimit(context.env, ipLimit),
      clearRateLimit(context.env, accountLimit)
    ]);
    await context.env.DB.prepare(
      "UPDATE family_users SET failed_attempts = 0, locked_until = NULL, updated_at = ? WHERE id = ?"
    ).bind(new Date().toISOString(), user.id).run();
    const childRows = await context.env.DB.prepare(
      "SELECT id FROM child_profiles WHERE family_id = ? ORDER BY created_at ASC"
    ).bind(user.family_id).all();
    const activeChildId = childRows.results.length === 1 ? childRows.results[0].id : null;
    const created = await createSession(context.env, user, activeChildId);
    const session = await context.env.DB.prepare(
      `SELECT s.*, u.email, u.display_name, f.name AS family_name
         FROM family_sessions s
         JOIN family_users u ON u.id = s.user_id
         JOIN families f ON f.id = s.family_id WHERE s.id = ?`
    ).bind(await sha256(created.token)).first();
    return json(await sessionSummary(context.env, session), 200, { "set-cookie": sessionCookie(created.token, created.expires, context.request) });
  } catch (error) {
    return errorResponse(error);
  }
}
