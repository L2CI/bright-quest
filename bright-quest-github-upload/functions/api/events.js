const appId = "bright-quest";

export async function onRequestPost(context) {
  const body = await context.request.json();
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

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
