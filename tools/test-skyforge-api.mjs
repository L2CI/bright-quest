import assert from 'node:assert/strict';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
import { onRequestGet, onRequestPost } from '../functions/api/skyforge.js';
import { onRequestPost as postEvent } from '../functions/api/events.js';
import { sha256 } from '../functions/_lib/family-auth.js';

// Real ephemeral Miniflare D1, synthetic families only. No production bindings.
const harness = await startSparkboundQa({ port: 0 });
const { origin, fixture: f, db } = harness;
const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: 'true', BQ_FAMILY_AUTH_MIGRATION_READY: 'true' };
const headersFor = family => ({ cookie: `bq_session=${family.cookie.value}`, origin,
  'x-bq-child-id': family.childId, 'x-bq-child-capability': family.childCapability,
  'content-type': 'application/json' });
const headers = headersFor(f);
const parentHeaders = { ...headers, 'x-bq-parent-capability': f.parentCapability };
let checks = 0;
function equal(a,b,message){ assert.deepEqual(a,b,message); checks++; }
function ok(value,message){ assert.ok(value,message); checks++; }
async function request({ body, raw, path='/api/skyforge', useHeaders=headers, useEnv=env, handler }={}) {
  const post = body !== undefined || raw !== undefined;
  const response = await (handler || (post ? onRequestPost : onRequestGet))({env:useEnv,request:new Request(origin+path,{
    headers:useHeaders,...(post?{method:'POST',body:raw??JSON.stringify(body)}:{})
  })});
  return { status:response.status, body:await response.json(), headers:response.headers };
}
const op=(version,action)=>({version,action,operationId:crypto.randomUUID()});
const read=async()=> (await request()).body.state;
async function command(action){const s=await read();const r=await request({body:op(s.version,action)});equal(r.status,200,JSON.stringify(r.body));return r.body.state;}
const evidence=()=>({hash:'a'.repeat(64),bytes:1234});
async function snapshot(){const tables=['child_profiles','families','family_users','app_profiles','app_events','beacon_brigade_states','beacon_brigade_operations','sparkbound_states','sparkbound_operations'];const output={};for(const name of tables){try{output[name]=(await db.prepare(`SELECT * FROM ${name} ORDER BY rowid`).all()).results;}catch(e){if(!String(e).includes('no such table'))throw e;}}return output;}
async function eventCount(){return (await db.prepare("SELECT count(*) AS n FROM family_profile_events WHERE event_type='skyforge.state.v1'").first()).n;}
function interceptInsert(callback){return {prepare(sql){const statement=db.prepare(sql);return {bind(...args){const bound=statement.bind(...args);return {first:(...a)=>bound.first(...a),all:(...a)=>bound.all(...a),async run(...a){if(sql.includes('INSERT INTO family_profile_events'))await callback();return bound.run(...a);}};}};}};}

try {
 // Non-empty unrelated save/receipt rows make preservation checks substantive.
 for(const game of ['beacon_brigade','sparkbound']){
  const at='2026-09-01T00:00:00.000Z';
  await db.prepare(`INSERT INTO ${game}_states (family_id,child_id,version,state_json,last_operation_id,created_at,updated_at) VALUES (?,?,1,?,?,?,?)`).bind(f.familyId,f.childId,JSON.stringify({version:1,profileId:f.childId,preserved:{draft:'Original writing',stars:47,completed:['mission-a']}}),'preserve-operation',at,at).run();
  await db.prepare(`INSERT INTO ${game}_operations (family_id,child_id,operation_id,request_hash,expected_version,result_version,feedback_json,created_at) VALUES (?,?,'preserve-operation',?,0,1,?,?)`).bind(f.familyId,f.childId,'c'.repeat(64),JSON.stringify({preserved:true}),at).run();
 }
 const before=await snapshot();
 equal((await request({useHeaders:{}})).status,401,'unauthenticated read');
 equal((await request({useHeaders:{cookie:headers.cookie}})).status,409,'multi-child requires capability');
 equal((await request({useHeaders:{...headers,'x-bq-child-capability':'wrong'}})).status,409);
 equal((await request({path:`/api/skyforge?childId=${f.childId}`})).status,403,'parent evidence requires parent capability');
 equal((await request({path:`/api/skyforge?childId=${f.otherFamily.childId}`,useHeaders:parentHeaders})).status,404,'cross-family review denied');
 equal((await request({path:`/api/skyforge?childId=${f.otherFamily.legacyId}`,useHeaders:parentHeaders})).status,404,'cross-family legacy review denied');
 equal((await request({path:`/api/skyforge?childId=${f.legacyId}`,useHeaders:parentHeaders})).body.profile.id,f.childId);
 equal((await request({path:`/api/skyforge?childId=${f.children[1].id}`,useHeaders:parentHeaders})).body.state.version,0);
 equal((await request({useEnv:{...env,BQ_FAMILY_AUTH_ENABLED:'false'}})).status,404);
 equal((await request()).headers.get('cache-control'),'no-store');
 equal(await eventCount(),0,'read never creates campaign');
 const first=op(0,{type:'start'});
 for(const [override,status] of [
  [{useHeaders:{...headers,origin:'https://elsewhere.invalid'}},403],
  [{useHeaders:{...headers,origin:''}},403],
  [{useHeaders:{...headers,'x-bq-child-id':f.otherFamily.childId}},403],
  [{useHeaders:{...headers,'content-type':'text/plain'}},415],
  [{body:{...first,version:-1}},400],[{body:{...first,operationId:'short'}},400],
  [{raw:'null'},400],[{raw:'[]'},400],[{raw:'42'},400],[{raw:'{'},400],[{raw:JSON.stringify({padding:'x'.repeat(6000)})},413],
  [{body:op(0,{type:'deploy',kit:{cannon:3,armour:0,reactor:0}})},400],
 ])equal((await request({body:first,...override})).status,status);
 equal(await eventCount(),0,'invalid actions preserve empty game');
 for(const [eventType,eventId] of [['skyforge.state.v1','ordinary'],['ordinary','skyforge:v1:0000000001'],['SKYFORGE.state.v1','ordinary'],['ordinary','SKYFORGE:v1:0000000001']]){
  equal((await request({handler:postEvent,path:'/api/events',body:{eventType,eventId,payload:{state:{phase:'complete'}}}})).status,403,'generic event forgery denied');
 }
 equal((await request({handler:postEvent,path:'/api/events',body:{eventType:'skyforge-lookalike',eventId:'ordinary-'+crypto.randomUUID(),payload:{preserve:true}}})).status,200,'ordinary event API preserved');
 const ordinaryBefore=(await db.prepare("SELECT * FROM family_profile_events WHERE event_type!='skyforge.state.v1'").all()).results;
 const duplicate=await Promise.all([request({body:first}),request({body:first})]);
 equal(duplicate.map(r=>r.status),[200,200]);equal((await read()).version,1);equal(await eventCount(),1);
 ok(duplicate.some(r=>r.body.replayed),'one identical duplicate is replayed');
 equal((await request({body:{...first,action:{type:'hint'}}})).status,409,'changed payload cannot reuse saved receipt');
 equal((await request({body:op(0,{type:'start'})})).status,409,'other operation on consumed version rejected');
 equal((await request({body:op(9,{type:'hint'})})).status,409,'future version rejected');
 const question=(await read()).currentQuestion;
 ok(question.a>=10&&question.a<=99&&question.b>=10&&question.b<=99,'initial 2x2 challenge');
 equal(Object.hasOwn(await read(),'questions'),false,'unrevealed question queue excluded');
 equal((await request({body:op(1,{type:'answer',questionId:question.id,answer:String(question.a*question.b)})})).status,400,'paper evidence required');
 equal((await request({body:op(1,{type:'answer',questionId:'wrong',answer:'1',photo:evidence()})})).status,400);
 for(const photo of [{hash:'x',bytes:42},{hash:'b'.repeat(64),bytes:1500001},{hash:'b'.repeat(64),bytes:19}])equal((await request({body:op(1,{type:'answer',questionId:question.id,answer:'1',photo})})).status,400);
 const race=await Promise.all([request({body:op(1,{type:'hint'})}),request({body:op(1,{type:'answer',questionId:question.id,answer:'1',photo:evidence()})})]);
 equal(race.map(r=>r.status).sort(),[200,409]);equal((await read()).version,2);equal(await eventCount(),2);
 const wrong=await command({type:'answer',questionId:question.id,answer:'1',photo:evidence()});
 equal(wrong.questionIndex,0);equal(wrong.lastEvent.correct,false);
 const immutableAttempt=structuredClone(wrong.attempts.at(-1));
 for(let i=0;i<3;i++){const s=await read(),q=s.currentQuestion;await command({type:'answer',questionId:q.id,answer:(q.a*q.b).toLocaleString('en-AU'),photo:evidence(),attemptId:crypto.randomUUID()});}
 const trained=await read();equal(trained.phase,'forge');equal(trained.questionIndex,3);ok(trained.attempts.some(a=>JSON.stringify(a)===JSON.stringify(immutableAttempt)),'wrong attempt preserved');
 equal((await request({body:op(trained.version,{type:'deploy',kit:{cannon:3,armour:3,reactor:3}})})).status,400,'cannot overallocate cores');
 await command({type:'deploy',kit:{cannon:1,armour:1,reactor:1}});
 const stateBeforeFailure=await read();
 await db.exec("CREATE TRIGGER skyforge_qa_failure BEFORE INSERT ON family_profile_events WHEN NEW.event_type='skyforge.state.v1' BEGIN SELECT RAISE(ABORT,'Synthetic save failure'); END;");
 equal((await request({body:op(stateBeforeFailure.version,{type:'move',move:'strike'})})).status,500);
 equal(await read(),stateBeforeFailure,'failed write preserves confirmed game');
 await db.exec('DROP TRIGGER skyforge_qa_failure;');
 const sessionId=await sha256(f.cookie.value);
 const session=await db.prepare('SELECT * FROM family_sessions WHERE id=?').bind(sessionId).first();
 for(const [name,mutate] of [
  ['child switch',()=>db.prepare('UPDATE family_sessions SET active_child_id=? WHERE id=?').bind(f.children[1].id,sessionId).run()],
  ['capability rotation',()=>db.prepare('UPDATE family_sessions SET child_capability_hash=? WHERE id=?').bind('b'.repeat(64),sessionId).run()],
  ['capability expiry',()=>db.prepare('UPDATE family_sessions SET child_capability_expires_at=? WHERE id=?').bind('2000-01-01T00:00:00.000Z',sessionId).run()],
  ['session expiry',()=>db.prepare('UPDATE family_sessions SET expires_at=? WHERE id=?').bind('2000-01-01T00:00:00.000Z',sessionId).run()],
 ]){
  const count=await eventCount();const r=await request({body:op(stateBeforeFailure.version,{type:'move',move:'strike'}),useEnv:{...env,DB:interceptInsert(mutate)}});
  equal(r.status,403,`${name} race denied`);equal(await eventCount(),count,`${name} writes nothing`);
  await db.prepare('UPDATE family_sessions SET active_child_id=?,child_capability_hash=?,child_capability_expires_at=?,expires_at=? WHERE id=?').bind(session.active_child_id,session.child_capability_hash,session.child_capability_expires_at,session.expires_at,sessionId).run();
  equal(await read(),stateBeforeFailure,`${name} preserves game`);
 }
 const signedOut=await request({body:op(stateBeforeFailure.version,{type:'move',move:'strike'}),useEnv:{...env,DB:interceptInsert(()=>db.prepare('DELETE FROM family_sessions WHERE id=?').bind(sessionId).run())}});
 equal(signedOut.status,403,'signout race denied');
 const keys=Object.keys(session);await db.prepare(`INSERT INTO family_sessions (${keys.join(',')}) VALUES (${keys.map(()=>'?').join(',')})`).bind(...keys.map(k=>session[k])).run();
 equal(await read(),stateBeforeFailure);
 const childCountBefore=(await db.prepare('SELECT count(*) AS n FROM family_profile_events WHERE child_id=?').bind(f.childId).first()).n;
 equal((await request({useHeaders:headersFor(f.otherFamily)})).body.state.version,0);
 equal((await request({body:first,useHeaders:headersFor(f.otherFamily)})).status,200,'other family has separate same version');
 equal((await db.prepare('SELECT count(*) AS n FROM family_profile_events WHERE child_id=?').bind(f.childId).first()).n,childCountBefore);
 const oldReplay=await request({body:first});equal(oldReplay.status,200);equal(oldReplay.body.state.version,stateBeforeFailure.version,'late replay returns latest state');
 equal(await snapshot(),before,'existing profiles, users and other game tables unchanged');
 equal((await db.prepare("SELECT * FROM family_profile_events WHERE event_type!='skyforge.state.v1'").all()).results,ordinaryBefore,'unrelated event bytes unchanged');
 equal((await request({path:`/api/skyforge?childId=${f.childId}`,useHeaders:parentHeaders})).body.state.attempts,(await read()).attempts,'parent sees exact saved evidence');
 console.log(`Skyforge API QA passed: ${checks} assertions; ephemeral two-family D1, real SQL replay/concurrency, reserved namespace, auth/child isolation, five session races, rollback and preservation.`);
} finally { await harness.close(); }
