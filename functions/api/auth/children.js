import {
  errorResponse,
  assertFamilyAuthEnabled,
  getSession,
  hashSecret,
  json,
  randomHex,
  readJson
} from "../../_lib/family-auth.js";

const ITERATIONS = 100000;

export async function onRequestGet(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const session = await getSession(context);
    const children = await context.env.DB.prepare(
      `SELECT id, legacy_profile_id, profile_name, stars, payload_json, version, updated_at,
              CASE WHEN child_pin_hash IS NOT NULL THEN 1 ELSE 0 END AS pin_set
         FROM child_profiles WHERE family_id = ? ORDER BY created_at ASC`
    ).bind(session.family_id).all();
    const parentUnlocked = session.parent_capability_valid;
    return json({ children: children.results.map((row) => toChild(row, parentUnlocked || row.id === session.active_child_id)) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function onRequestPost(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    let session = await getSession(context);
    const existing = await context.env.DB.prepare(
      `SELECT id, child_pin_hash
         FROM child_profiles WHERE family_id = ? ORDER BY created_at ASC`
    ).bind(session.family_id).all();
    if (existing.results.length) session = await getSession(context, { parentRequired: true });
    const body = await readJson(context.request);
    const name = String(body.name || "").trim().slice(0, 40);
    const childPin = String(body.pin || "");
    if (!name) return json({ error: "Child first name is required" }, 400);
    if (existing.results.length && !/^\d{4,8}$/.test(childPin)) {
      return json({ error: "A 4 to 8 digit child PIN is required for multi-child families" }, 400);
    }
    const missingPins = existing.results.filter((child) => !child.child_pin_hash);
    if (missingPins.length > 1) {
      return json({ error: "Set a PIN for each existing child before adding another", code: "CHILD_PIN_SETUP_REQUIRED" }, 409);
    }
    const existingChildPin = String(body.existingChildPin || "");
    if (missingPins.length === 1 && !/^\d{4,8}$/.test(existingChildPin)) {
      return json({ error: "Set a 4 to 8 digit PIN for the existing child first", code: "EXISTING_CHILD_PIN_REQUIRED" }, 400);
    }
    const id = crypto.randomUUID();
    const legacyProfileId = profileKey(name, existing.results.length ? id.slice(0, 8) : "");
    const now = new Date().toISOString();
    const payload = {
      id: legacyProfileId,
      name,
      createdAt: now,
      stars: 0,
      attempts: [],
      trainingCompleted: {},
      writingSamples: []
    };
    const pinSalt = childPin ? randomHex(16) : null;
    const pinHash = childPin ? await hashSecret(childPin, pinSalt, ITERATIONS) : null;
    const statements = [];
    if (missingPins.length === 1) {
      const existingPinSalt = randomHex(16);
      const existingPinHash = await hashSecret(existingChildPin, existingPinSalt, ITERATIONS);
      statements.push(context.env.DB.prepare(
        `UPDATE child_profiles
            SET child_pin_hash = ?, child_pin_salt = ?, child_pin_iterations = ?, updated_at = ?
          WHERE id = ? AND family_id = ? AND child_pin_hash IS NULL`
      ).bind(existingPinHash, existingPinSalt, ITERATIONS, now, missingPins[0].id, session.family_id));
    }
    statements.push(context.env.DB.prepare(
      `INSERT INTO child_profiles
        (id, family_id, legacy_profile_id, profile_name, stars, payload_json,
         child_pin_hash, child_pin_salt, child_pin_iterations, created_at, updated_at)
       VALUES (?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?)`
    ).bind(id, session.family_id, legacyProfileId, name, JSON.stringify(payload), pinHash, pinSalt, pinHash ? ITERATIONS : null, now, now));
    await context.env.DB.batch(statements);
    if (!existing.results.length) {
      await context.env.DB.prepare("UPDATE family_sessions SET active_child_id = ? WHERE id = ?").bind(id, session.id).run();
    }
    return json({ child: { id, legacyProfileId, name, stars: 0, pinSet: Boolean(pinHash), payload }, activeChildId: existing.results.length ? null : id }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function onRequestPatch(context) {
  try {
    assertFamilyAuthEnabled(context.env);
    const session = await getSession(context, { parentRequired: true });
    const body = await readJson(context.request);
    const childId = String(body.childId || "");
    const childPin = String(body.pin || "");
    if (!/^\d{4,8}$/.test(childPin)) return json({ error: "Child PIN must contain 4 to 8 digits" }, 400);
    const child = await context.env.DB.prepare(
      "SELECT id FROM child_profiles WHERE id = ? AND family_id = ?"
    ).bind(childId, session.family_id).first();
    if (!child) return json({ error: "Child profile not found" }, 404);
    const pinSalt = randomHex(16);
    const pinHash = await hashSecret(childPin, pinSalt, ITERATIONS);
    await context.env.DB.prepare(
      `UPDATE child_profiles
          SET child_pin_hash = ?, child_pin_salt = ?, child_pin_iterations = ?, updated_at = ?
        WHERE id = ? AND family_id = ?`
    ).bind(pinHash, pinSalt, ITERATIONS, new Date().toISOString(), child.id, session.family_id).run();
    return json({ ok: true, childId: child.id, pinSet: true });
  } catch (error) {
    return errorResponse(error);
  }
}

function toChild(row, includePayload) {
  return {
    id: row.id,
    legacyProfileId: row.legacy_profile_id,
    name: row.profile_name,
    stars: includePayload ? row.stars : null,
    version: includePayload ? row.version : null,
    updatedAt: includePayload ? row.updated_at : null,
    pinSet: Boolean(row.pin_set),
    payload: includePayload ? safeJson(row.payload_json) : null
  };
}

function profileKey(name, suffix = "") {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "student";
  return suffix ? `${base}-${suffix}` : base;
}

function safeJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
