import { createState, validateState, applyAction, publicState } from '../_lib/dragon-expedition.js';
import { validateState as validateOriginal } from '../_lib/dragon-grove.js';
import { getSession, json, readJson, sha256, assertFamilyAuthEnabled, HttpError } from '../_lib/family-auth.js';

export const TYPE = 'dragon-expedition.state.v1';
export const PREFIX = 'dragon-expedition:v1:';
const ORIGINAL_TYPE = 'dragon-grove.state.v1';
const keyFor = version => PREFIX + (version === 10000000000 ? '~' : String(version).padStart(10, '0'));

export async function onRequestGet(ctx) {
  try {
    assertFamilyAuthEnabled(ctx.env);
    const url = new URL(ctx.request.url), review = url.searchParams.has('childId');
    const session = await getSession(ctx, { parentRequired: review });
    const child = await resolveChild(ctx.env.DB, session, review ? url.searchParams.get('childId') : null);
    const state = await load(ctx.env.DB, session.family_id, child.id);
    const limit = url.searchParams.has('limit') ? Number(url.searchParams.get('limit')) : 50;
    const before = url.searchParams.has('before') ? Number(url.searchParams.get('before')) : 10000000000;
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100 || !Number.isSafeInteger(before) || before < 1 || before > 10000000000) throw new HttpError(400, 'Invalid evidence page.');
    const rows = (await ctx.env.DB.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=? AND idempotency_key<? ORDER BY idempotency_key DESC LIMIT ?').bind(session.family_id, child.id, TYPE, keyFor(before), limit + 1).all()).results;
    const page = rows.slice(0, limit).map(r => JSON.parse(r.payload_json));
    return json({ state: state ? publicState(state) : null, locked: !state, continueUrl: '/dragon-grove/', profile: { id: child.id, name: child.profile_name },
      owner: `${session.family_id}:${child.id}:dragon-expedition`, review,
      evidence: { items: page.map(p => ({ version: p.state.version, ...p.event })), nextCursor: rows.length > limit ? page.at(-1).state.version : null } });
  } catch (error) { return failure(error); }
}

export async function onRequestPost(ctx) {
  try {
    assertFamilyAuthEnabled(ctx.env);
    const url = new URL(ctx.request.url);
    if (ctx.request.headers.get('origin') !== url.origin) throw new HttpError(403, 'Open this chapter from Bright Quest.');
    if (url.searchParams.has('childId')) throw new HttpError(403, 'Parent evidence is read-only.');
    const session = await getSession(ctx), child = await resolveChild(ctx.env.DB, session, null);
    if (ctx.request.headers.get('x-bq-child-id') !== child.id) throw new HttpError(403, 'The selected child changed. Return to Bright Quest.', { code: 'CHILD_CHANGED' });
    const body = await readJson(ctx.request, 12000);
    if (!body || typeof body !== 'object' || Array.isArray(body) || !Number.isSafeInteger(body.version) || body.version < 0 || body.version >= 9999999999 ||
      typeof body.operationId !== 'string' || !/^[-a-zA-Z0-9]{16,80}$/.test(body.operationId)) throw new HttpError(400, 'Invalid chapter request.');
    const key = keyFor(body.version + 1), hash = await sha256(JSON.stringify({ version: body.version, action: body.action }));
    const existing = await rowFor(ctx.env.DB, session.family_id, child.id, key);
    if (existing) return await replay(existing, body, hash, ctx, session, child);
    const current = await load(ctx.env.DB, session.family_id, child.id);
    if (!current) throw new HttpError(403, 'Finish the first dragon adventure before starting Chapter II.', { code: 'CHAPTER_LOCKED' });
    if (current.version !== body.version) throw stale();
    const next = applyAction(current, body.action);
    const payload = JSON.stringify({ operationId: body.operationId, hash, state: next, event: next.lastEvent });
    if (new TextEncoder().encode(payload).length > 24000) throw new HttpError(409, 'This checkpoint needs attention. Your confirmed trial is safe.');
    const now = new Date().toISOString(), idleFloor = new Date(Date.now() - 24 * 3600000).toISOString();
    const result = await ctx.env.DB.prepare(`INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at)
      SELECT ?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM family_sessions fs WHERE fs.id=? AND fs.family_id=? AND fs.active_child_id=? AND fs.expires_at>? AND fs.last_seen_at>=? AND COALESCE(fs.child_capability_hash,'')=? AND (SELECT COUNT(*) FROM child_profiles cp WHERE cp.family_id=fs.family_id)=? AND (? <= 1 OR fs.child_capability_expires_at>?))
      ON CONFLICT(family_id,child_id,idempotency_key) DO NOTHING`).bind(crypto.randomUUID(), session.family_id, child.id, TYPE, key, payload, now,
      session.id, session.family_id, child.id, now, idleFloor, session.child_capability_hash || '', Number(session.child_count), Number(session.child_count), now).run();
    if (!result.meta?.changes) {
      const winner = await rowFor(ctx.env.DB, session.family_id, child.id, key);
      if (winner) return await replay(winner, body, hash, ctx, session, child);
      throw new HttpError(403, 'Your session or selected child changed. Return to Bright Quest.', { code: 'CHILD_CHANGED' });
    }
    return json({ state: publicState(next) });
  } catch (error) { return failure(error); }
}

async function resolveChild(db, session, id) {
  const wanted = id ?? session.active_child_id;
  if (!wanted) throw new HttpError(409, 'Select your child profile in Bright Quest first.', { code: 'CHILD_REQUIRED' });
  const child = await db.prepare('SELECT id,profile_name FROM child_profiles WHERE family_id=? AND (id=? OR legacy_profile_id=?)').bind(session.family_id, wanted, wanted).first();
  if (!child) throw new HttpError(404, 'Child profile not found.'); return child;
}
async function rowFor(db, family, child, key) {
  return db.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=? AND idempotency_key=?').bind(family, child, TYPE, key).first();
}
async function load(db, family, child) {
  const row = await db.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=? ORDER BY idempotency_key DESC LIMIT 1').bind(family, child, TYPE).first();
  if (row) {
    const state = validateState(JSON.parse(row.payload_json).state);
    if (state.childId !== child) throw new HttpError(500, 'Saved chapter identity mismatch.'); return state;
  }
  const source = await db.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=? ORDER BY idempotency_key DESC LIMIT 1').bind(family, child, ORIGINAL_TYPE).first();
  if (!source) return null;
  const original = validateOriginal(JSON.parse(source.payload_json).state);
  if (original.childId !== child) throw new HttpError(500, 'Saved dragon identity mismatch.');
  return original.phase === 'complete' ? createState(child, original) : null;
}
function stale() { return new HttpError(409, 'Your chapter changed in another tab. Load the latest progress to continue.', { code: 'STALE_GAME' }); }
async function replay(row, body, hash, ctx, session, child) {
  const saved = JSON.parse(row.payload_json);
  if (saved.operationId !== body.operationId || saved.hash !== hash) throw stale();
  return json({ state: publicState(await load(ctx.env.DB, session.family_id, child.id)), replayed: true });
}
function failure(error) { return json({ error: error.status ? error.message : 'Your chapter could not save. Your previous progress is safe.', code: error.code || error.details?.code || 'GAME_ERROR' }, error.status || 500); }
