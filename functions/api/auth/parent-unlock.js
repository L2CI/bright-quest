import { assertFamilyAuthEnabled, clearRateLimit, consumeRateLimitAttempt, errorResponse, getSession, json, parentUnlockUntil, randomHex, readJson, rotateSession, sessionCookie, sha256, verifySecret } from "../../_lib/family-auth.js";

export async function onRequestPost(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const session = await getSession(context);
    const body = await readJson(context.request);
    const family = await context.env.DB.prepare(
      "SELECT parent_pin_hash, parent_pin_salt, parent_pin_iterations FROM families WHERE id = ?"
    ).bind(session.family_id).first();
    if (!family?.parent_pin_hash) return json({ error: "Parent PIN setup is required", code: "PARENT_PIN_SETUP_REQUIRED" }, 409);
    const limit = await consumeRateLimitAttempt(context.env, `parent-pin:${session.family_id}`);
    const valid = await verifySecret(String(body.pin || ""), family.parent_pin_hash, family.parent_pin_salt, family.parent_pin_iterations);
    if (!valid) {
      return json({ error: "Parent PIN did not match" }, 401);
    }
    await clearRateLimit(context.env, limit);
    const unlockedUntil = parentUnlockUntil();
    const parentCapability = randomHex(32);
    const rotated = await rotateSession(context.env, session, unlockedUntil, await sha256(parentCapability));
    return json({ ok: true, parentUnlockedUntil: unlockedUntil, parentCapability }, 200, {
      "set-cookie": sessionCookie(rotated.token, rotated.expires, context.request)
    });
  } catch (error) {
    return errorResponse(error);
  }
}
