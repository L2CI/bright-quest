const appId = "bright-quest";
import { familyAuthEnabled, getSession, readJson } from "../_lib/family-auth.js";

export async function onRequestGet(context) {
  if (!context.env.DB) {
    return json({ error: "D1 binding DB is missing. Check the Production D1 binding in Cloudflare Pages settings." }, 500);
  }

  if (familyAuthEnabled(context.env)) return getFamilyProfiles(context);
  if (!legacyApiEnabled(context.env)) return migrationGuardResponse();

  let profiles;
  try {
    profiles = await context.env.DB.prepare(
      "SELECT profile_id, profile_name, stars, payload_json, updated_at, created_at FROM app_profiles WHERE app_id = ? ORDER BY updated_at DESC"
    ).bind(appId).all();
  } catch (error) {
    return json({ error: "D1 query failed", detail: error.message }, 500);
  }

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
  if (!context.env.DB) {
    return json({ error: "D1 binding DB is missing. Check the Production D1 binding in Cloudflare Pages settings." }, 500);
  }

  if (familyAuthEnabled(context.env)) return saveFamilyProfile(context);
  if (!legacyApiEnabled(context.env)) return migrationGuardResponse();

  const body = await readJson(context.request, 1600000);
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
  if (!context.env.DB) {
    return json({ error: "D1 binding DB is missing. Check the Production D1 binding in Cloudflare Pages settings." }, 500);
  }

  if (familyAuthEnabled(context.env)) return deleteFamilyProfile(context);
  if (!legacyApiEnabled(context.env)) return migrationGuardResponse();

  const url = new URL(context.request.url);
  const profileId = String(url.searchParams.get("profileId") || "").trim();
  if (profileId) {
    await context.env.DB.prepare("DELETE FROM app_profiles WHERE app_id = ? AND profile_id = ?").bind(appId, profileId).run();
    await context.env.DB.prepare("DELETE FROM app_events WHERE app_id = ? AND profile_id = ?").bind(appId, profileId).run();
    return json({ ok: true, deletedProfileId: profileId });
  }

  await context.env.DB.prepare("DELETE FROM app_events WHERE app_id = ?").bind(appId).run();
  await context.env.DB.prepare("DELETE FROM app_profiles WHERE app_id = ?").bind(appId).run();
  return json({ ok: true });
}

async function getFamilyProfiles(context) {
  try {
    const session = await getSession(context);
    const parentUnlocked = session.parent_capability_valid;
    const profiles = parentUnlocked
      ? await context.env.DB.prepare(
        `SELECT id, legacy_profile_id, profile_name, stars, payload_json, version, updated_at, created_at
           FROM child_profiles WHERE family_id = ? ORDER BY updated_at DESC`
        ).bind(session.family_id).all()
      : await context.env.DB.prepare(
        `SELECT id, legacy_profile_id, profile_name, stars, payload_json, version, updated_at, created_at
           FROM child_profiles WHERE family_id = ? AND id = ? ORDER BY updated_at DESC`
        ).bind(session.family_id, session.active_child_id).all();
    return json({
      profiles: profiles.results.map((row) => ({
        childId: row.id,
        profileId: row.legacy_profile_id || row.id,
        profileName: row.profile_name,
        stars: row.stars,
        version: row.version,
        updatedAt: row.updated_at,
        createdAt: row.created_at,
        payload: safeJson(row.payload_json)
      }))
    });
  } catch (error) {
    if (error.status === 401) return json({ profiles: [], authenticated: false });
    return authError(error);
  }
}

async function saveFamilyProfile(context) {
  try {
    const session = await getSession(context);
    if (!session.active_child_id) return json({ error: "Select a child profile first" }, 409);
    const body = await readJson(context.request, 1600000);
    const profile = body.profile || {};
    const profileId = String(profile.id || "").trim();
    const profileName = String(profile.name || "").trim();
    if (!profileId || !profileName) return json({ error: "profile.id and profile.name are required" }, 400);
    if (!Array.isArray(profile.attempts || []) || typeof (profile.trainingCompleted || {}) !== "object") {
      return json({ error: "Profile payload shape is invalid" }, 400);
    }
    const payloadJson = JSON.stringify(profile);
    if (payloadJson.length > 1500000) return json({ error: "Profile payload is too large" }, 413);
    const child = await context.env.DB.prepare(
      "SELECT id, legacy_profile_id, version, created_at FROM child_profiles WHERE id = ? AND family_id = ?"
    ).bind(session.active_child_id, session.family_id).first();
    if (!child) return json({ error: "Active child profile was not found" }, 404);
    if (child.legacy_profile_id && child.legacy_profile_id !== profileId) {
      return json({ error: "Profile does not match the active child" }, 403);
    }
    const expectedVersion = Number(profile.cloudVersion || body.version || 0);
    if (!expectedVersion || expectedVersion !== Number(child.version)) {
      return json({ error: "This profile changed on another device. Refresh before saving.", code: "STALE_PROFILE", currentVersion: child.version }, 409);
    }
    const now = new Date().toISOString();
    const nextVersion = Number(child.version) + 1;
    const result = await context.env.DB.prepare(
      `UPDATE child_profiles
          SET legacy_profile_id = COALESCE(legacy_profile_id, ?), profile_name = ?, stars = ?,
              payload_json = ?, version = ?, updated_at = ?
        WHERE id = ? AND family_id = ? AND version = ?`
    ).bind(profileId, profileName, Math.max(0, Number(profile.stars || 0)), payloadJson, nextVersion, now, child.id, session.family_id, child.version).run();
    if (!result?.meta?.changes) {
      return json({ error: "This profile changed on another device. Refresh before saving.", code: "STALE_PROFILE" }, 409);
    }
    return json({ ok: true, childId: child.id, version: nextVersion, syncedAt: now });
  } catch (error) {
    return authError(error);
  }
}

async function deleteFamilyProfile(context) {
  try {
    const session = await getSession(context, { parentRequired: true });
    const url = new URL(context.request.url);
    const profileId = String(url.searchParams.get("profileId") || "").trim();
    if (!profileId) {
      await context.env.DB.batch([
        context.env.DB.prepare(
          `UPDATE family_sessions
              SET active_child_id = NULL, child_capability_hash = NULL, child_capability_expires_at = NULL
            WHERE family_id = ?`
        ).bind(session.family_id),
        context.env.DB.prepare("DELETE FROM family_profile_events WHERE family_id = ?").bind(session.family_id),
        context.env.DB.prepare("DELETE FROM child_profiles WHERE family_id = ?").bind(session.family_id)
      ]);
      return json({ ok: true, deletedAll: true });
    }
    const child = await context.env.DB.prepare(
      "SELECT id, legacy_profile_id FROM child_profiles WHERE family_id = ? AND (id = ? OR legacy_profile_id = ?)"
    ).bind(session.family_id, profileId, profileId).first();
    if (!child) return json({ error: "Child profile not found" }, 404);
    await context.env.DB.batch([
      context.env.DB.prepare(
        `UPDATE family_sessions
            SET active_child_id = NULL, child_capability_hash = NULL, child_capability_expires_at = NULL
          WHERE family_id = ? AND active_child_id = ?`
      ).bind(session.family_id, child.id),
      context.env.DB.prepare("DELETE FROM family_profile_events WHERE family_id = ? AND child_id = ?").bind(session.family_id, child.id),
      context.env.DB.prepare("DELETE FROM child_profiles WHERE family_id = ? AND id = ?").bind(session.family_id, child.id)
    ]);
    return json({ ok: true, deletedProfileId: profileId });
  } catch (error) {
    return authError(error);
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

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function authError(error) {
  return json({ error: error.message || "Authentication failed", ...(error.details || {}) }, error.status || 500);
}

function legacyApiEnabled(env) {
  return env?.BQ_LEGACY_API_ENABLED === "true";
}

function migrationGuardResponse() {
  return json({ error: "The legacy profile API is disabled" }, 503);
}
