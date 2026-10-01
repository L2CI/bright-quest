import {createState,validateState,applyAction,publicState} from '../_lib/skyforge.js';
import {getSession,json,readJson,sha256,assertFamilyAuthEnabled,HttpError} from '../_lib/family-auth.js';
const TYPE='skyforge.state.v1', PREFIX='skyforge:v1:';
export async function onRequestGet(ctx){try{assertFamilyAuthEnabled(ctx.env);const url=new URL(ctx.request.url);const reviewing=url.searchParams.has('childId');const session=await getSession(ctx,{parentRequired:reviewing});const child=await resolveChild(ctx.env.DB,session,reviewing?url.searchParams.get('childId'):null);const state=await load(ctx.env.DB,session.family_id,child.id);return json({state:publicState(state),profile:{id:child.id,name:child.profile_name},owner:`${session.family_id}:${child.id}`});}catch(e){return error(e);}}
export async function onRequestPost(ctx){try{
 assertFamilyAuthEnabled(ctx.env);if(ctx.request.headers.get('origin')!==new URL(ctx.request.url).origin)throw new HttpError(403,'Open this game from Bright Quest.');
 const session=await getSession(ctx),child=await resolveChild(ctx.env.DB,session,null);if(ctx.request.headers.get('x-bq-child-id')!==child.id)throw new HttpError(403,'The selected child changed. Return to Bright Quest.',{code:'CHILD_CHANGED'});
 const body=await readJson(ctx.request,5000);if(!body||typeof body!=='object'||Array.isArray(body))throw new HttpError(400,'Invalid game request.');if(!Number.isSafeInteger(body.version)||body.version<0||typeof body.operationId!=='string'||!/^[-a-zA-Z0-9]{16,80}$/.test(body.operationId))throw new HttpError(400,'Invalid game request.');
 const key=PREFIX+String(body.version+1).padStart(10,'0');const hash=await sha256(JSON.stringify({version:body.version,action:body.action}));
 const existing=await rowFor(ctx.env.DB,session.family_id,child.id,key);if(existing)return await replay(existing,body,hash,ctx,session,child);
 const current=await load(ctx.env.DB,session.family_id,child.id);if(current.version!==body.version)throw new HttpError(409,'Your game changed in another tab. Reload to continue.',{code:'STALE_GAME'});
 const next=applyAction(current,body.action);const payload=JSON.stringify({operationId:body.operationId,hash,state:next});if(new TextEncoder().encode(payload).length>700000)throw new HttpError(409,'Evidence storage is full. Your saved work has not been removed.');
 const now=new Date().toISOString();
 // Unique next-version key elects exactly one winner. A live-session predicate closes switch/signout races.
 const result=await ctx.env.DB.prepare(`INSERT INTO family_profile_events (id,family_id,child_id,event_type,idempotency_key,payload_json,created_at)
 SELECT ?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM family_sessions fs WHERE fs.id=? AND fs.family_id=? AND fs.active_child_id=? AND fs.expires_at>? AND COALESCE(fs.child_capability_hash,'')=? AND ( ? <= 1 OR fs.child_capability_expires_at>?))
 ON CONFLICT(family_id,child_id,idempotency_key) DO NOTHING`).bind(crypto.randomUUID(),session.family_id,child.id,TYPE,key,payload,now,session.id,session.family_id,child.id,now,session.child_capability_hash||'',Number(session.child_count),now).run();
 if(!result.meta?.changes){const winner=await rowFor(ctx.env.DB,session.family_id,child.id,key);if(winner)return await replay(winner,body,hash,ctx,session,child);throw new HttpError(403,'Your session or selected child changed. Return to Bright Quest.',{code:'CHILD_CHANGED'});}
 return json({state:publicState(next)});
}catch(e){return error(e);}}
async function resolveChild(db,s,id){const wanted=id??s.active_child_id;if(!wanted)throw new HttpError(409,'Select your child profile in Bright Quest first.',{code:'CHILD_REQUIRED'});const c=await db.prepare('SELECT id,profile_name FROM child_profiles WHERE family_id=? AND (id=? OR legacy_profile_id=?)').bind(s.family_id,wanted,wanted).first();if(!c)throw new HttpError(404,'Child profile not found.');return c;}
async function rowFor(db,f,c,key){return db.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND idempotency_key=? AND event_type=?').bind(f,c,key,TYPE).first();}
async function load(db,f,c){const r=await db.prepare('SELECT payload_json FROM family_profile_events WHERE family_id=? AND child_id=? AND event_type=? ORDER BY idempotency_key DESC LIMIT 1').bind(f,c,TYPE).first();if(!r)return createState(c);const s=validateState(JSON.parse(r.payload_json).state);if(s.childId!==c)throw new HttpError(500,'Saved game identity mismatch.');return s;}
async function replay(row,b,hash,ctx,s,c){const p=JSON.parse(row.payload_json);if(p.operationId!==b.operationId||p.hash!==hash)throw new HttpError(409,'Your game changed in another tab. Reload to continue.',{code:'STALE_GAME'});return json({state:publicState(await load(ctx.env.DB,s.family_id,c.id)),replayed:true});}
function error(e){return json({error:e.status?e.message:'Game could not save. Your previous progress is safe.',code:e.code||e.details?.code||'GAME_ERROR'},e.status||500);}
