let database;
function db(){return database??=new Promise((resolve,reject)=>{const request=indexedDB.open('brightQuestDragonGroveV1',1);request.onupgradeneeded=()=>{request.result.createObjectStore('drafts');request.result.createObjectStore('pending');};request.onsuccess=()=>resolve(request.result);request.onerror=()=>{database=null;reject(new Error('Device storage is unavailable. Enable browser storage to keep your saved actions safe.'));};});}
export async function get(store,key){const d=await db();return new Promise((resolve,reject)=>{const transaction=d.transaction(store),request=transaction.objectStore(store).get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
export async function put(store,key,value){const d=await db();return new Promise((resolve,reject)=>{const transaction=d.transaction(store,'readwrite');transaction.objectStore(store).put(value,key);transaction.oncomplete=()=>resolve();transaction.onerror=()=>reject(new Error('Your action could not be saved on this device. Free some browser storage and try again.'));transaction.onabort=()=>reject(new Error('Device save interrupted. Please try again.'));});}
export async function remove(store,key){const d=await db();return new Promise((resolve,reject)=>{const transaction=d.transaction(store,'readwrite');transaction.objectStore(store).delete(key);transaction.oncomplete=()=>resolve();transaction.onerror=()=>reject(new Error('Save confirmation was interrupted. Your action can be retried safely.'));transaction.onabort=transaction.onerror;});}

// A read/write transaction serialises outbox ownership across every tab on this origin.
// A new action must never replace another tab's unconfirmed intent.
export async function reserve(owner,body){
 const d=await db();
 return new Promise((resolve,reject)=>{
  const transaction=d.transaction('pending','readwrite'),store=transaction.objectStore('pending'),request=store.get(owner);
  let reserved;
  request.onsuccess=()=>{reserved=request.result||body;if(!request.result)store.put(body,owner);};
  transaction.oncomplete=()=>resolve(reserved);
  transaction.onerror=()=>reject(new Error('Your action could not be reserved on this device. Please retry.'));
  transaction.onabort=transaction.onerror;
 });
}

// Return any different outstanding intent instead of deleting it after an older response arrives.
export async function confirm(owner,operationId){
 const d=await db();
 return new Promise((resolve,reject)=>{
  const transaction=d.transaction('pending','readwrite'),store=transaction.objectStore('pending'),request=store.get(owner);
  let remaining=null;
  request.onsuccess=()=>{const current=request.result;if(current?.operationId===operationId)store.delete(owner);else remaining=current||null;};
  transaction.oncomplete=()=>resolve(remaining);
  transaction.onerror=()=>reject(new Error('This device could not confirm the saved action. Retrying it is safe.'));
  transaction.onabort=transaction.onerror;
 });
}
