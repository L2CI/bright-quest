// Skyforge rules are server-owned. Existing Bright Quest records are never mutated.
export const MISSIONS = [
  ['Verdant Reach','First light',2,2,'Scout'],['Verdant Reach','The broken bridge',2,2,'Warden'],['Verdant Reach','Beacon run',3,2,'Sentinel'],['Verdant Reach','Crown of the canopy',3,2,'Colossus'],
  ['Frostline','Into the white',3,2,'Scout'],['Frostline','Frozen signal',3,2,'Warden'],['Frostline','Stormbreak',4,2,'Sentinel'],['Frostline','The ice citadel',4,2,'Colossus'],
  ['Ember Rift','Ash and thunder',3,3,'Scout'],['Ember Rift','Molten crossing',3,3,'Warden'],['Ember Rift','Last sky relay',4,3,'Sentinel'],['Ember Rift','The dawn engine',4,3,'Colossus']
].map(([region,title,digitsA,digitsB,enemy],index)=>({index,region,title,digitsA,digitsB,enemy}));
export class GameError extends Error { constructor(message,status=400,code='INVALID_ACTION'){super(message);this.status=status;this.code=code;} }
const fail=(condition,message,code)=>{if(condition)throw new GameError(message,400,code);};
export function createState(childId){return {schema:1,version:0,childId,mission:0,expedition:1,phase:'briefing',questions:[],questionIndex:0,attempts:[],victories:[],kit:{cannon:0,armour:0,reactor:0},battle:null,lastEvent:null};}
export function validateState(s){if(s?.schema!==1||!Number.isSafeInteger(s.version)||!Array.isArray(s.attempts)||!Array.isArray(s.questions)||!Array.isArray(s.victories)||!Number.isInteger(s.mission)||s.mission<0||s.mission>11||!['briefing','training','forge','battle','won','lost','complete'].includes(s.phase))throw new GameError('Saved campaign needs attention. It has not been reset.',500,'INVALID_SAVE');return s;}
export function question(digitsA,digitsB,random=Math.random){const number=d=>10**(d-1)+Math.floor(Math.max(0,Math.min(.999999,random()))*(9*10**(d-1)));return {id:crypto.randomUUID(),a:number(digitsA),b:number(digitsB),hintUsed:false};}
export function normaliseAnswer(value){if(typeof value!=='string'||value.length>24||!/^\d[\d ,]*$/.test(value.trim()))return null;const n=Number(value.replace(/[ ,]/g,''));return Number.isSafeInteger(n)?n:null;}
export function hint(q){return {rows:String(q.b).split('').reverse().map((digit,i)=>({place:10**i,multiplier:Number(digit)*10**i,label:`${q.a.toLocaleString('en-AU')} × ${Number(digit)*10**i}`})),tip:'Multiply by each place value on separate lines. Add the partial products. Check your carrying.'};}
export function intent(s){const pattern=[['strike','shield','charge','strike'],['shield','strike','charge','shield'],['strike','charge','strike','shield'],['charge','shield','strike','charge']][s.mission%4];return pattern[s.battle.turn%pattern.length];}
export function applyAction(current,action,random=Math.random){
 validateState(current);fail(!action||typeof action.type!=='string','Choose a game action.');const s=structuredClone(current);s.lastEvent=null;
 const m=MISSIONS[s.mission];
 switch(action.type){
 case 'start':
  fail(s.phase!=='briefing','This operation has already started.');s.questions=Array.from({length:3},()=>question(m.digitsA,m.digitsB,random));s.questionIndex=0;s.kit={cannon:0,armour:0,reactor:0};s.phase='training';break;
 case 'hint':
  fail(s.phase!=='training','Open training first.');fail(s.questions[s.questionIndex].hintUsed,'This hint is already open.');s.questions[s.questionIndex].hintUsed=true;break;
 case 'answer':{
  fail(s.phase!=='training','This challenge is already finished.');const q=s.questions[s.questionIndex];fail(action.questionId!==q.id,'Your challenge changed. Reload it.');const value=normaliseAnswer(action.answer);fail(value===null,'Enter a whole-number answer.');
  fail(!action.photo||typeof action.photo.hash!=='string'||!/^([a-f0-9]{64})$/.test(action.photo.hash)||!Number.isInteger(action.photo.bytes)||action.photo.bytes<20||action.photo.bytes>1500000,'Add a photo of your paper working first.','PHOTO_REQUIRED');
  const correct=value===q.a*q.b;
  s.attempts.push({id:action.attemptId&&/^[a-zA-Z0-9-]{1,60}$/.test(action.attemptId)?action.attemptId:crypto.randomUUID(),questionId:q.id,mission:s.mission,expedition:s.expedition,a:q.a,b:q.b,answer:value,correct,hintUsed:q.hintUsed,photo:{hash:action.photo.hash,bytes:action.photo.bytes},at:new Date().toISOString()});
  s.lastEvent={type:'answer',correct};if(correct){s.questionIndex++;if(s.questionIndex===3)s.phase='forge';}break;
 }
 case 'deploy':{
  fail(s.phase!=='forge','Complete training before deploying.');const k=action.kit;fail(!k||!['cannon','armour','reactor'].every(x=>Number.isInteger(k[x])&&k[x]>=0&&k[x]<=3)||k.cannon+k.armour+k.reactor!==3,'Assign all three forge cores.');s.kit={cannon:k.cannon,armour:k.armour,reactor:k.reactor};s.battle=makeBattle(s);s.phase='battle';break;
 }
 case 'move':{
  fail(s.phase!=='battle','No battle is active.');const b=s.battle,move=action.move;fail(!['strike','brace','breaker','repair'].includes(move),'Choose a tactical command.');const warning=intent(s);let damage=0,incoming=0,healing=0;
  if(move==='breaker'||move==='repair')fail(b.charge<(move==='breaker'?3:2),'Not enough charge. Strike or Brace to recharge.');
  if(move==='strike'){damage=19+s.mission*2+s.kit.cannon*6;b.charge=Math.min(b.maxCharge,b.charge+2);if(warning==='shield')damage=Math.ceil(damage*.35);}
  if(move==='breaker'){damage=34+s.mission*2+s.kit.cannon*7+(warning==='shield'?16:0);b.charge-=3;}
  if(move==='brace')b.charge=Math.min(b.maxCharge,b.charge+1);
  if(move==='repair'){healing=Math.min(b.maxHull-b.hull,26+s.kit.reactor*8);fail(healing===0,'Hull is full. Choose another command.');b.hull+=healing;b.charge-=2;}
  b.enemyHull=Math.max(0,b.enemyHull-damage);
  if(b.enemyHull>0){incoming=warning==='charge'?58+s.mission*5:warning==='shield'?7+s.mission:14+s.mission;incoming=Math.max(1,incoming-s.kit.armour*3);if(move==='brace')incoming=Math.ceil(incoming*.22);b.hull=Math.max(0,b.hull-incoming);}
  b.turn++;s.lastEvent={type:'combat',move,intent:warning,damage,incoming,healing};
  if(b.enemyHull===0){s.phase=s.mission===11?'complete':'won';s.victories.push({mission:s.mission,expedition:s.expedition,turns:b.turn,hull:b.hull,kit:s.kit,at:new Date().toISOString()});}
  else if(b.hull===0)s.phase='lost';break;
 }
 case 'retry':fail(s.phase!=='lost','There is no battle to retry.');s.battle=makeBattle(s);s.phase='battle';break;
 case 'refit':fail(s.phase!=='lost','Refit is available after a battle setback.');s.phase='forge';break;
 case 'next':fail(s.phase!=='won','Restore this relay first.');s.mission++;s.phase='briefing';s.battle=null;s.questions=[];break;
 case 'expedition':fail(s.phase!=='complete','Finish the campaign first.');s.expedition++;s.mission=0;s.phase='briefing';s.questions=[];s.battle=null;break;
 default:throw new GameError('Unknown action.');
 }
 fail(s.attempts.length>1200,'Your evidence archive is full. Existing work is safe; ask a parent to export it before continuing.','ARCHIVE_FULL');s.version++;return s;
}
function makeBattle(s){const maxHull=110+s.mission*4+s.kit.armour*18,maxEnemy=74+s.mission*10+(s.mission%4===3?24:0);return {hull:maxHull,maxHull,enemyHull:maxEnemy,maxEnemy,charge:2+s.kit.reactor,maxCharge:6+s.kit.reactor,turn:0};}
export function publicState(s){const out=structuredClone(s);out.missionInfo=MISSIONS[s.mission];out.missions=MISSIONS;out.currentQuestion=s.phase==='training'?out.questions[s.questionIndex]:null;if(out.currentQuestion?.hintUsed)out.coaching=hint(out.currentQuestion);delete out.questions;out.intent=s.phase==='battle'?intent(s):null;return out;}
