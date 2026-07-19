const appId = "bright-quest";
import { familyAuthEnabled, getSession, readJson, sha256 } from "../_lib/family-auth.js";

export async function onRequestPost(context) {
  if (familyAuthEnabled(context.env)) return logFamilyEvent(context);
  if (context.env?.BQ_LEGACY_API_ENABLED !== "true") {
    return json({ error: "The legacy event API is disabled" }, 503);
  }

  const body = await readJson(context.request, 120000);
  const now = new Date().toISOString();
  const profileId = String(body.profileId || "").trim();
  const eventType = String(body.eventType || "").trim();

  if (!profileId || !eventType) {
    return json({ error: "profileId and eventType are required" }, 400);
  }

  await context.env.DB.prepare(
    `INSERT INTO app_events
      (id, app_id, profile_id, event_type, payload_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    appId,
    profileId,
    eventType,
    JSON.stringify(body.payload || {}),
    now
  ).run();

  return json({ ok: true, loggedAt: now });
}

async function logFamilyEvent(context) {
  try {
    const session = await getSession(context);
    if (!session.active_child_id) return json({ error: "Select a child profile first" }, 409);
    const body = await readJson(context.request, 120000);
    const eventType = String(body.eventType || "").trim();
    const eventId = String(body.eventId || "").trim();
    if (!eventType || !eventId) return json({ error: "eventType and eventId are required" }, 400);
    if (eventType.length > 80 || eventId.length > 100) return json({ error: "Event metadata is too long" }, 400);
    const payloadJson = JSON.stringify(body.payload || {});
    if (payloadJson.length > 100000) return json({ error: "Event payload is too large" }, 413);
    const child = await context.env.DB.prepare(
      "SELECT id, legacy_profile_id FROM child_profiles WHERE id = ? AND family_id = ?"
    ).bind(session.active_child_id, session.family_id).first();
    if (!child) return json({ error: "Active child profile was not found" }, 404);
    if (body.profileId && body.profileId !== child.id && body.profileId !== child.legacy_profile_id) {
      return json({ error: "Profile does not match the active child" }, 403);
    }
    const now = new Date().toISOString();
    const recordId = await sha256(`${session.family_id}:${child.id}:${eventId}`);
    await context.env.DB.prepare(
      `INSERT INTO family_profile_events
        (id, family_id, child_id, event_type, idempotency_key, payload_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(family_id, child_id, idempotency_key) DO NOTHING`
    ).bind(recordId, session.family_id, child.id, eventType, eventId, payloadJson, now).run();
    return json({ ok: true, loggedAt: now });
  } catch (error) {
    return json({ error: error.message || "Authentication failed", ...(error.details || {}) }, error.status || 500);
  }
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
