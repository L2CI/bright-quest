import { BeaconError, applyAction, createState, publicState } from "../_lib/beacon-brigade.js";
import { HttpError, familyAuthEnabled, getSession, json, readJson, sha256 } from "../_lib/family-auth.js";

const MAX_STATE_BYTES = 1800000;

export async function onRequestGet(context) {
  try {
    requireFamilyAuth(context.env);
    const url = new URL(context.request.url);
    const review = url.searchParams.has("childId");
    const session = await getSession(context, { parentRequired: review });
    const child = await resolveChild(context.env.DB, session, review ? url.searchParams.get("childId") : null);
    const state = await loadState(context.env.DB, session.family_id, child.id);
    return json({ state: publicState(state, { review }), profile: { id: child.id, name: child.profile_name } });
  } catch (error) {
    return apiError(error);
  }
}

export async function onRequestPost(context) {
  try {
    requireFamilyAuth(context.env);
    assertSameOrigin(context.request);
    const session = await getSession(context);
    const child = await resolveChild(context.env.DB, session, null);
    const pinnedChild = context.request.headers.get("x-bq-child-id");
    if ((pinnedChild && pinnedChild !== child.id) || new URL(context.request.url).searchParams.has("childId")) {
      throw new HttpError(403, "The selected child has changed. Reload before sending queued actions.", { code: "CHILD_CHANGED" });
    }
    const body = await readJson(context.request, 8192);
    validateBody(body);
    const db = context.env.DB;
    const requestHash = await sha256(canonicalJson({ version: body.version, action: body.action }));
    const prior = await loadReceipt(db, session.family_id, child.id, body.operationId);
    if (prior) return await replay(db, session.family_id, child.id, prior, requestHash);

    const current = await loadState(db, session.family_id, child.id);
    if (current.version !== body.version) {
      const committed = await loadReceipt(db, session.family_id, child.id, body.operationId);
      if (committed) return await replay(db, session.family_id, child.id, committed, requestHash);
      return stale(current.version);
    }
    const now = new Date().toISOString();
    const next = applyAction(current, { ...body.action, at: now });
    // A fresh no-op request still gets its own receipt and version; rewards remain unchanged.
    next.version = current.version + 1;
    const stateJson = JSON.stringify(next);
    if (new TextEncoder().encode(stateJson).byteLength > MAX_STATE_BYTES) {
      throw new HttpError(409, "Saved evidence has reached the storage limit. No existing records were deleted.", { code: "STATE_STORAGE_FULL" });
    }
    const station = next.activeExpedition?.stations.find((item) => item.id === body.action.stationId);
    const feedback = station?.lastFeedback ? { ...station.lastFeedback, stationId: station.id,
      expeditionId: next.activeExpedition.id } : null;

    let result;
    try {
      // D1 batch is transactional. Receipt insertion is conditional on THIS operation's
      // successful versioned update, not just a version another request might have written.
      result = await db.batch([
        db.prepare(
          `INSERT INTO beacon_brigade_states
             (family_id, child_id, version, state_json, last_operation_id, created_at, updated_at)
           VALUES (?, ?, 0, ?, NULL, ?, ?)
           ON CONFLICT(family_id, child_id) DO NOTHING`
        ).bind(session.family_id, child.id, JSON.stringify(createState({ profileId: child.id })), now, now),
        db.prepare(
          `UPDATE beacon_brigade_states
              SET state_json = ?, version = ?, last_operation_id = ?, updated_at = ?
            WHERE family_id = ? AND child_id = ? AND version = ?
              AND NOT EXISTS (
                SELECT 1 FROM beacon_brigade_operations
                 WHERE family_id = ? AND child_id = ? AND operation_id = ?
              )`
        ).bind(stateJson, next.version, body.operationId, now, session.family_id, child.id, current.version,
          session.family_id, child.id, body.operationId),
        db.prepare(
          `INSERT INTO beacon_brigade_operations
             (family_id, child_id, operation_id, request_hash, expected_version, result_version, feedback_json, created_at)
           SELECT family_id, child_id, ?, ?, ?, ?, ?, ? FROM beacon_brigade_states
            WHERE family_id = ? AND child_id = ? AND version = ? AND last_operation_id = ?
              AND NOT EXISTS (
                SELECT 1 FROM beacon_brigade_operations
                 WHERE family_id = ? AND child_id = ? AND operation_id = ?
              )`
        ).bind(body.operationId, requestHash, current.version, next.version, JSON.stringify(feedback), now,
          session.family_id, child.id, next.version, body.operationId, session.family_id, child.id, body.operationId)
      ]);
    } catch (error) {
      const receipt = await loadReceipt(db, session.family_id, child.id, body.operationId);
      if (receipt) return await replay(db, session.family_id, child.id, receipt, requestHash);
      const latest = await loadState(db, session.family_id, child.id);
      if (latest.version !== current.version) return stale(latest.version);
      throw error;
    }
    if (Number(result[1]?.meta?.changes) !== 1 || Number(result[2]?.meta?.changes) !== 1) {
      const receipt = await loadReceipt(db, session.family_id, child.id, body.operationId);
      if (receipt) return await replay(db, session.family_id, child.id, receipt, requestHash);
      return stale((await loadState(db, session.family_id, child.id)).version);
    }
    return json({ state: publicState(next), ...(feedback ? { feedback } : {}) });
  } catch (error) {
    return apiError(error);
  }
}

async function resolveChild(db, session, reviewChildId) {
  if (reviewChildId !== null && !reviewChildId.trim()) {
    throw new HttpError(400, "A child ID is required for review.", { code: "INVALID_CHILD" });
  }
  const requestedId = reviewChildId ?? session.active_child_id;
  if (!requestedId) throw new HttpError(409, "Select a child profile first.", { code: "CHILD_REQUIRED" });
  const child = reviewChildId !== null
    ? await db.prepare(
      `SELECT id, profile_name FROM child_profiles
        WHERE family_id = ? AND (id = ? OR legacy_profile_id = ?)
        ORDER BY CASE WHEN id = ? THEN 0 ELSE 1 END LIMIT 1`
    ).bind(session.family_id, requestedId, requestedId, requestedId).first()
    : await db.prepare("SELECT id, profile_name FROM child_profiles WHERE family_id = ? AND id = ?")
      .bind(session.family_id, requestedId).first();
  if (!child) throw new HttpError(404, "Child profile not found.", { code: "CHILD_NOT_FOUND" });
  return child;
}

async function loadState(db, familyId, childId) {
  const row = await db.prepare("SELECT version, state_json FROM beacon_brigade_states WHERE family_id = ? AND child_id = ?")
    .bind(familyId, childId).first();
  if (!row) return createState({ profileId: childId });
  const state = JSON.parse(row.state_json);
  if (state.schemaVersion !== 1 || state.version !== Number(row.version) || state.profileId !== childId
    || !Array.isArray(state.history) || !Array.isArray(state.upgrades)) {
    throw new HttpError(500, "Saved game evidence needs repair; it has not been reset.", { code: "INVALID_SAVED_STATE" });
  }
  return state;
}

async function loadReceipt(db, familyId, childId, operationId) {
  return db.prepare(
    "SELECT request_hash, feedback_json FROM beacon_brigade_operations WHERE family_id = ? AND child_id = ? AND operation_id = ?"
  ).bind(familyId, childId, operationId).first();
}

async function replay(db, familyId, childId, receipt, requestHash) {
  if (receipt.request_hash !== requestHash) {
    throw new HttpError(409, "This operation ID was already used for a different request.", { code: "OPERATION_ID_REUSED" });
  }
  const state = await loadState(db, familyId, childId);
  const feedback = JSON.parse(receipt.feedback_json);
  // Return current state, not a stale snapshot that could undo later progress in the UI.
  return json({ state: publicState(state), ...(feedback ? { feedback } : {}) });
}

function validateBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)
    || Object.keys(body).some((key) => !["operationId", "version", "action"].includes(key))) {
    throw new HttpError(400, "Expected operationId, version and action only.", { code: "INVALID_REQUEST" });
  }
  if (typeof body.operationId !== "string" || !/^[A-Za-z0-9][A-Za-z0-9:_-]{7,99}$/.test(body.operationId)) {
    throw new HttpError(400, "Use a unique operation ID of 8 to 100 letters, digits, hyphens, underscores or colons.", { code: "INVALID_OPERATION_ID" });
  }
  if (!Number.isSafeInteger(body.version) || body.version < 0) {
    throw new HttpError(400, "A non-negative integer version is required.", { code: "INVALID_VERSION" });
  }
  if (!body.action || typeof body.action !== "object" || Array.isArray(body.action) || Object.hasOwn(body.action, "at")) {
    throw new HttpError(400, "An action without client-supplied timestamps is required.", { code: "INVALID_ACTION" });
  }
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function requireFamilyAuth(env) {
  if (!familyAuthEnabled(env)) throw new HttpError(503, "Beacon Brigade requires family authentication.", { code: "FAMILY_AUTH_REQUIRED" });
}

function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new HttpError(403, "Cross-origin game actions are not allowed.", { code: "CROSS_ORIGIN" });
  }
}

function stale(version) {
  return json({ error: "This game changed on another device. Reload before retrying with a new operation ID.",
    code: "STALE_STATE", currentVersion: version }, 409);
}

function apiError(error) {
  if (error instanceof HttpError || error instanceof BeaconError) {
    return json({ error: error.message, code: error.code || error.details?.code
      || (error.status === 401 ? "AUTH_REQUIRED" : "REQUEST_FAILED"), ...(error.details || {}) }, error.status);
  }
  console.error("Beacon Brigade storage request failed");
  return json({ error: "Unable to load or save game progress. Existing evidence has not been reset.", code: "STORAGE_ERROR" }, 500);
}
