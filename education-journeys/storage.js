import {parseRoute,COLLECTIONS} from './content.js';
export function createBookmarks(profileId='',storage){
 try{storage??=globalThis.localStorage;}catch{storage=null;}
 const key=`bqEducationJourneysV1:${String(profileId||'guest').slice(0,100)}`;
 let available=true;
 function read(){try{const parsed=JSON.parse(storage.getItem(key)||'{}');return parsed&&typeof parsed==='object'&&!Array.isArray(parsed)?parsed:{};}catch{available=false;return {};}}
 let state=read();
 function save(){try{storage.setItem(key,JSON.stringify(state));available=true;}catch{available=false;}return available;}
 return {key,get available(){return available;},get state(){return structuredClone(state);},visit(id,index){const c=COLLECTIONS.find(c=>c.id===id);if(!c||!Number.isInteger(index)||index<0||index>=c.stages.length)return false;state=read();const valid=Array.isArray(state.visited)?state.visited.filter(v=>typeof v==='string'):[];state.visited=[...new Set([...valid,`${id}/${index}`])];state.last=`#${id}/${index}`;return save();},record(id,index,answer){if(!COLLECTIONS.some(c=>c.id===id&&c.stages[index]))return false;state=read();state.discoveries=state.discoveries&&typeof state.discoveries==='object'&&!Array.isArray(state.discoveries)?state.discoveries:{};state.discoveries[`${id}/${index}`]=answer===true;return save();},resume(){const route=parseRoute(typeof state.last==='string'?state.last:'');return route.type==='stage'?`#${route.id}/${route.index}`:null;},count(id){return new Set((Array.isArray(state.visited)?state.visited:[]).filter(v=>typeof v==='string'&&v.startsWith(id+'/')&&/^\d$/.test(v.split('/')[1])&&Number(v.split('/')[1])<4)).size;}};
}
