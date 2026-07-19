import { assertFamilyAuthEnabled, clearRateLimit, consumeRateLimitAttempt, errorResponse, getSession, json, randomHex, readJson, sha256, verifySecret } from "../../_lib/family-auth.js";

export async function onRequestPost(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const session = await getSession(context);
    const body = await readJson(context.request);
    const childId = String(body.childId || "");
    if (!childId) {
      await context.env.DB.prepare(
        `UPDATE family_sessions
            SET active_child_id = NULL, parent_unlocked_until = NULL, parent_capability_hash = NULL,
                child_capability_hash = NULL, child_capability_expires_at = NULL, last_seen_at = ?
          WHERE id = ?`
      ).bind(new Date().toISOString(), session.id).run();
      return json({ ok: true, activeChildId: null });
    }
    const children = await context.env.DB.prepare(
      `SELECT id, child_pin_hash, child_pin_salt, child_pin_iterations
         FROM child_profiles WHERE family_id = ? ORDER BY created_at ASC`
    ).bind(session.family_id).all();
    const child = children.results.find((item) => item.id === childId);
    if (!child) return json({ error: "Child profile not found" }, 404);
    if (children.results.length > 1) {
      if (!child.child_pin_hash) return json({ error: "A child PIN must be set before this profile can be used", code: "CHILD_PIN_SETUP_REQUIRED" }, 409);
      const limit = await consumeRateLimitAttempt(context.env, `child-pin:${session.family_id}:${child.id}`);
      const valid = await verifySecret(String(body.pin || ""), child.child_pin_hash, child.child_pin_salt, child.child_pin_iterations);
      if (!valid) {
        return json({ error: "Child PIN did not match" }, 401);
      }
      await clearRateLimit(context.env, limit);
    }
    const childCapability = children.results.length > 1 ? randomHex(32) : null;
    const childCapabilityHash = childCapability ? await sha256(childCapability) : null;
    const childCapabilityExpiresAt = childCapability ? new Date(Date.now() + 12 * 3600000).toISOString() : null;
    await context.env.DB.prepare(
      `UPDATE family_sessions
          SET active_child_id = ?, parent_unlocked_until = NULL, parent_capability_hash = NULL,
              child_capability_hash = ?, child_capability_expires_at = ?, last_seen_at = ?
        WHERE id = ?`
    ).bind(child.id, childCapabilityHash, childCapabilityExpiresAt, new Date().toISOString(), session.id).run();
    return json({ ok: true, activeChildId: child.id, childCapability, childCapabilityExpiresAt });
  } catch (error) {
    return errorResponse(error);
  }
}
