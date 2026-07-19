import {
  createSession,
  assertFamilyAuthEnabled,
  errorResponse,
  hashSecret,
  json,
  normalizeEmail,
  randomHex,
  readJson,
  sessionCookie,
  sessionSummary,
  sha256,
  validateEmail,
  validatePassword
} from "../../_lib/family-auth.js";

const ITERATIONS = 600000;

export async function onRequestPost(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    if (context.env.BQ_SIGNUP_ENABLED !== "true") return json({ error: "Signup is currently closed" }, 403);
    const body = await readJson(context.request);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "");
    const parentPin = String(body.parentPin || "");
    const displayName = String(body.displayName || "Parent").trim().slice(0, 60) || "Parent";
    const familyName = String(body.familyName || `${displayName}'s family`).trim().slice(0, 80);
    if (!validateEmail(email)) return json({ error: "Enter a valid email address" }, 400);
    if (!validatePassword(password)) return json({ error: "Password must be 8 to 128 characters" }, 400);
    if (!/^\d{4,8}$/.test(parentPin)) return json({ error: "Parent PIN must contain 4 to 8 digits" }, 400);
    const existing = await context.env.DB.prepare("SELECT id FROM family_users WHERE email = ?").bind(email).first();
    if (existing) return json({ error: "An account already exists for this email" }, 409);

    const now = new Date().toISOString();
    const familyId = crypto.randomUUID();
    const userId = crypto.randomUUID();
    const salt = randomHex(16);
    const passwordHash = await hashSecret(password, salt, ITERATIONS);
    const parentPinSalt = randomHex(16);
    const parentPinHash = await hashSecret(parentPin, parentPinSalt, ITERATIONS);
    await context.env.DB.batch([
      context.env.DB.prepare(
        `INSERT INTO families
          (id, name, parent_pin_hash, parent_pin_salt, parent_pin_iterations, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(familyId, familyName, parentPinHash, parentPinSalt, ITERATIONS, now, now),
      context.env.DB.prepare(
        `INSERT INTO family_users
          (id, family_id, email, display_name, password_hash, password_salt, password_iterations,
           failed_attempts, locked_until, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, NULL, ?, ?)`
      ).bind(userId, familyId, email, displayName, passwordHash, salt, ITERATIONS, now, now)
    ]);
    const user = { id: userId, family_id: familyId };
    const created = await createSession(context.env, user, null);
    const session = {
      id: await sha256(created.token),
      family_id: familyId,
      user_id: userId,
      active_child_id: null,
      parent_unlocked_until: null,
      email,
      display_name: displayName,
      family_name: familyName
    };
    return json(await sessionSummary(context.env, session), 201, { "set-cookie": sessionCookie(created.token, created.expires, context.request) });
  } catch (error) {
    return errorResponse(error);
  }
}
