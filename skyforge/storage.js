let database;
function db(){return database??=new Promise((resolve,reject)=>{const r=indexedDB.open('brightQuestSkyforgeV1',1);r.onupgradeneeded=()=>{r.result.createObjectStore('photos');r.result.createObjectStore('drafts');r.result.createObjectStore('pending');};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(new Error('Device storage is unavailable. Enable browser storage and try again.'));});}
export async function get(store,key){const d=await db();return new Promise((resolve,reject)=>{const t=d.transaction(store),r=t.objectStore(store).get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function put(store,key,value){const d=await db();return new Promise((resolve,reject)=>{const t=d.transaction(store,'readwrite');t.objectStore(store).put(value,key);t.oncomplete=resolve;t.onerror=()=>reject(new Error('Could not save to this device. Free some browser storage and try again.'));t.onabort=()=>reject(new Error('Device save did not finish. Please retry.'));});}
export async function remove(store,key){const d=await db();return new Promise((resolve,reject)=>{const t=d.transaction(store,'readwrite');t.objectStore(store).delete(key);t.oncomplete=resolve;t.onerror=()=>reject(t.error);t.onabort=()=>reject(new Error('Device save confirmation was interrupted. Retry safely.'));});}
export async function preparePhoto(file){
 if(!file||!['image/jpeg','image/png','image/webp','image/heic','image/heif'].includes(file.type))throw new Error('Choose a JPG, PNG or WebP photo. If your phone uses HEIC, share it as a JPEG.');
 if(file.size>18000000)throw new Error('This photo is too large. Choose one under 18 MB.');
 let bitmap;try{bitmap=await createImageBitmap(file,{imageOrientation:'from-image'});}catch{throw new Error('This photo could not open. Try a JPG or PNG image.');}
 if(bitmap.width<80||bitmap.height<80){bitmap.close();throw new Error('Choose a larger photo so your working can be seen.');}
 const ratio=Math.min(1,1280/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*ratio);canvas.height=Math.round(bitmap.height*ratio);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 const blob=await new Promise(r=>canvas.toBlob(r,'image/jpeg',.82));if(!blob||blob.size>1500000)throw new Error('Photo could not be prepared. Try a smaller image.');const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))].map(n=>n.toString(16).padStart(2,'0')).join('');return {blob,hash,bytes:blob.size};
}
