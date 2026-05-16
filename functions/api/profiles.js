const appId = "bright-quest";

export async function onRequestGet(context) {
  const profiles = await context.env.DB.prepare(
    "SELECT profile_id, profile_name, stars, payload_json, updated_at, created_at FROM app_profiles WHERE app_id = ? ORDER BY updated_at DESC"
  ).bind(appId).all();

  return json({
    profiles: profiles.results.map((row) => ({
      profileId: row.profile_id,
      profileName: row.profile_name,
      stars: row.stars,
      updatedAt: row.updated_at,
      createdAt: row.created_at,
      payload: safeJson(row.payload_json)
    }))
  });
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const now = new Date().toISOString();
  const profile = body.profile || {};
  const profileId = String(profile.id || "").trim();
  const profileName = String(profile.name || "").trim();

  if (!profileId || !profileName) {
    return json({ error: "profile.id and profile.name are required" }, 400);
  }

  const id = `${appId}:${profileId}`;
  const existing = await context.env.DB.prepare(
    "SELECT created_at FROM app_profiles WHERE id = ?"
  ).bind(id).first();

  await context.env.DB.prepare(
    `INSERT OR REPLACE INTO app_profiles
      (id, app_id, profile_id, profile_name, stars, payload_json, updated_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    appId,
    profileId,
    profileName,
    Number(profile.stars || 0),
    JSON.stringify(profile),
    now,
    existing?.created_at || profile.createdAt || now
  ).run();

  return json({ ok: true, syncedAt: now });
}

export async function onRequestDelete(context) {
  await context.env.DB.prepare("DELETE FROM app_events WHERE app_id = ?").bind(appId).run();
  await context.env.DB.prepare("DELETE FROM app_profiles WHERE app_id = ?").bind(appId).run();
  return json({ ok: true });
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

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
