/** Deterministic, DOM-free Chapter II flight simulation. One tick is 50 active ms. */
export const TICK_MS=50;
export const DURATION_MS=300000;
export const POWERS=['fire','storm','nature','astral'];
export const TRIALS=[
  {id:'cloud-run',title:'Cloudrunner',clue:'Fly through the seed trail. Steer around rocks and use your powers to clear a path.',background:'canyon-flight.webp',cadence:36},
  {id:'ember-forge',title:'Emberforge',clue:'Clear the thorn barriers and gather the glowing seeds beyond them.',background:'canyon-flight.webp',cadence:32},
  {id:'canopy-rescue',title:'Canopy Rescue',clue:'Reach the golden birds and guide them home. Clear hazards along the way.',background:'forest-sanctuary.webp',cadence:40},
  {id:'storm-pass',title:'Storm Pass',clue:'Ride the mountain winds. Dodge falling rocks or clear them with a power.',background:'storm-coast.webp',cadence:26},
  {id:'moonward',title:'Moonward',clue:'Guard the sanctuary nest. Stop the drifting wisps before they reach it.',background:'forest-sanctuary.webp',cadence:28},
  {id:'guardian-flight',title:'Guardian Flight',clue:'Bring every skill together: rescue birds, gather seeds and protect Emberwild.',background:'storm-coast.webp',cadence:26},
].map((t,i)=>Object.freeze({...t,mode:t.id,trial:i+1,durationMs:DURATION_MS}));
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const copy=value=>JSON.parse(JSON.stringify(value));
const distance=(a,b)=>Math.hypot(a[0]-b[0],(a[1]-b[1])*.72);
function random(seed,index,salt=0){let n=((seed>>>0)^Math.imul(index+1,0x9e3779b1)^Math.imul(salt+1,0x85ebca6b))>>>0;n=Math.imul(n^(n>>>16),0x7feb352d);n=Math.imul(n^(n>>>15),0x846ca68b);return ((n^(n>>>16))>>>0)/4294967296;}
function metrics(saved){saved||={};return {score:saved.score||0,hits:saved.hits||0,misses:saved.misses||0,combo:saved.combo||0,bestCombo:saved.bestCombo||0,powerUses:Object.fromEntries(POWERS.map(p=>[p,saved.powerUses?.[p]||0]))};}

export function createSimulation({trial=1,seed=1,paths={},saved=null}={}){
  const state={trial:clamp(Math.floor(trial),1,6),seed:seed>>>0,paths:Object.fromEntries(POWERS.map(p=>[p,Math.max(0,Number(paths[p])||0)])),...metrics(saved)};
  state.snapshot=saved?.snapshot?copy(saved.snapshot):{v:1,tick:0,player:[.30,.52],aim:[.30,.52],spawnIndex:0,shotSeq:0,cooldowns:[0,0,0,0],entities:[],projectiles:[]};
  if(!validSnapshot(state.snapshot)||state.snapshot.tick*TICK_MS!==(saved?.activeMs||0))throw new Error('This flight checkpoint cannot be restored. Your saved progress has not been changed.');
  return state;
}

export function validSnapshot(s){
  const number=(n,a,b)=>Number.isFinite(n)&&n>=a&&n<=b,int=(n,a,b)=>Number.isInteger(n)&&number(n,a,b),pair=(p,a,b)=>Array.isArray(p)&&p.length===2&&p.every(n=>number(n,a,b));
  return !!s&&s.v===1&&int(s.tick,0,6000)&&pair(s.player,.08,.85)&&s.player[0]<=.82&&pair(s.aim,.08,.85)&&s.aim[0]<=.82&&int(s.spawnIndex,0,400)&&int(s.shotSeq,0,2000)&&Array.isArray(s.cooldowns)&&s.cooldowns.length===4&&s.cooldowns.every(n=>int(n,0,100))&&Array.isArray(s.entities)&&s.entities.length<=18&&s.entities.every(e=>Array.isArray(e)&&e.length===6&&int(e[0],0,2000)&&int(e[1],0,4)&&number(e[2],-.3,1.3)&&number(e[3],-.3,1.3)&&int(e[4],1,5)&&int(e[5],0,6000))&&Array.isArray(s.projectiles)&&s.projectiles.length<=16&&s.projectiles.every(p=>Array.isArray(p)&&p.length===7&&int(p[0],0,2000)&&int(p[1],0,3)&&number(p[2],-.3,1.3)&&number(p[3],-.3,1.3)&&number(p[4],-2,2)&&number(p[5],-2,2)&&int(p[6],0,100));
}

export function checkpoint(state){return {...metrics(state),activeMs:state.snapshot.tick*TICK_MS,snapshot:copy(state.snapshot)};}
export function availablePowers(state){return POWERS.filter(p=>state.paths[p]>0);}

function award(state,entity,events,bonus=0){state.hits++;state.combo++;state.bestCombo=Math.max(state.bestCombo,state.combo);const points=(entity[1]===2?35:entity[1]===0?25:20)+Math.min(25,state.combo*2)+bonus;state.score+=points;events.push({type:'hit',kind:entity[1],x:entity[2],y:entity[3],points});}
function spawn(state){
  const s=state.snapshot,index=s.spawnIndex++,mode=state.trial,r=random(state.seed,index),wave=Math.floor(s.tick/1200);
  // 0 seed, 1 rock, 2 bird, 3 thorns, 4 wisp. Each trial has a different objective mix.
  const tables=[[0,0,0,1,2],[3,3,0,3,0],[2,2,2,1,0],[1,1,0,1,2],[4,4,4,0,2],[0,1,2,3,4]];
  const kind=tables[mode-1][Math.floor(r*5)],y=.19+random(state.seed,index,2)*.60;
  s.entities.push([index,kind,1.10,y,kind===3&&wave>1?2:1,0]);
}

/** Returns cosmetic events. Inputs are local intentions, never persisted as arbitrary objects. */
export function stepSimulation(state,input={}){
  const s=state.snapshot,events=[];if(s.tick>=6000)return events;s.tick++;
  for(let i=0;i<4;i++)s.cooldowns[i]=Math.max(0,s.cooldowns[i]-1);
  if(input.target){s.aim=[clamp(input.target[0],.28,.72),clamp(input.target[1],.22,.78)];}
  if(input.dx||input.dy){s.aim=[clamp(s.player[0]+(input.dx||0)*.026,.28,.72),clamp(s.player[1]+(input.dy||0)*.032,.22,.78)];}
  for(let i=0;i<2;i++){const delta=s.aim[i]-s.player[i];s.player[i]+=clamp(delta,-.023,.023);}
  if((s.tick===1||s.tick%TRIALS[state.trial-1].cadence===0)&&s.entities.length<18)spawn(state);
  const power=POWERS.indexOf(input.power);
  if(power>=0&&state.paths[input.power]>0&&!s.cooldowns[power]&&s.projectiles.length<14){
    s.cooldowns[power]=[20,27,30,24][power];state.powerUses[input.power]++;const strength=state.paths[input.power];
    const nearest=s.entities.filter(e=>e[2]>s.player[0]&&e[1]!==0&&e[1]!==2).sort((a,b)=>distance([a[2],a[3]],s.player)-distance([b[2],b[3]],s.player))[0];
    const vx=[1.02,1.5,.82,1.15][power],vy=nearest?clamp((nearest[3]-s.player[1])*.9,-.55,.55):0;
    s.projectiles.push([s.shotSeq++,power,s.player[0]+.055,s.player[1]+.015,vx,vy,45]);
    events.push({type:'power',path:input.power,x:s.player[0],y:s.player[1],strength});
    if(power===2){for(let i=s.entities.length-1;i>=0;i--){const e=s.entities[i];if((e[1]===0||e[1]===2)&&distance([e[2],e[3]],s.player)<.22){award(state,e,events,10);s.entities.splice(i,1);}}}
  }
  for(let i=s.projectiles.length-1;i>=0;i--){const p=s.projectiles[i];p[2]+=p[4]*.05;p[3]+=p[5]*.05;p[6]--;let spent=false;
    for(let j=s.entities.length-1;j>=0;j--){const e=s.entities[j];if(e[1]===0||e[1]===2)continue;if(distance([e[2],e[3]],[p[2],p[3]])<([.082,.07,.10,.115][p[1]])){
      e[4]-=p[1]===0?2:1;if(e[4]<=0){award(state,e,events);s.entities.splice(j,1);}if(p[1]!==3){spent=true;break;}
    }}
    if(spent||p[6]<=0||p[2]>1.24||p[3]<-.2||p[3]>1.2)s.projectiles.splice(i,1);
  }
  for(let i=s.entities.length-1;i>=0;i--){const e=s.entities[i];e[5]++;const speed=(e[1]===4?.15:.11)+state.trial*.006+Math.min(2,Math.floor(s.tick/2000))*.012;e[2]-=speed*.05;
    if(state.trial===4&&e[1]===1)e[3]=clamp(e[3]+.00075,.15,.85);
    if(distance([e[2],e[3]],s.player)<(e[1]===0||e[1]===2?.080:.059)){
      if(e[1]===0||e[1]===2)award(state,e,events);else{state.misses++;state.combo=0;events.push({type:'bump',x:e[2],y:e[3]});}s.entities.splice(i,1);
    }else if(e[2]<-.10){if(e[1]===4){state.misses++;state.combo=0;events.push({type:'escaped',x:.06,y:.75});}s.entities.splice(i,1);}
  }
  if(s.tick===6000)events.push({type:'complete'});
  return events;
}
