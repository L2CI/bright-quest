import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const out = new URL('../sparkbound/assets/mechs/', import.meta.url);
await fs.mkdir(new URL('vendor/', out), {recursive:true});
const models = {Mike:'1QOp6GVyfby2xiwLWxXsRpArRYvCst_ES',Stan:'1C-LshlvXt-egbENhWpbxR0BTIJMTRxk_'};
const provenance = {author:'Quaternius',license:'CC0-1.0',licenseUrl:'https://creativecommons.org/publicdomain/zero/1.0/',source:'https://quaternius.com/packs/animatedmech.html',verifiedOn:'2026-09-06',models:[],vendor:[]};
async function download(url) { const r=await fetch(url); if(!r.ok) throw new Error(`${r.status}: ${url}`); return Buffer.from(await r.arrayBuffer()); }
for(const [name,id] of Object.entries(models)) {
 const url=`https://drive.google.com/uc?export=download&id=${id}`;
 const original=await download(url); const doc=JSON.parse(original.toString());
 if(doc.buffers.length!==1 || !doc.buffers[0].uri.startsWith('data:')) throw new Error('Expected single embedded buffer');
 const bin=Buffer.from(doc.buffers[0].uri.split(',')[1],'base64'); delete doc.buffers[0].uri;
 const json=Buffer.from(JSON.stringify(doc)); const jp=Buffer.alloc(Math.ceil(json.length/4)*4,32); json.copy(jp);
 const bp=Buffer.alloc(Math.ceil(bin.length/4)*4); bin.copy(bp);
 const glb=Buffer.alloc(28+jp.length+bp.length); glb.writeUInt32LE(0x46546c67,0); glb.writeUInt32LE(2,4); glb.writeUInt32LE(glb.length,8); glb.writeUInt32LE(jp.length,12); glb.writeUInt32LE(0x4e4f534a,16); jp.copy(glb,20); glb.writeUInt32LE(bp.length,20+jp.length); glb.writeUInt32LE(0x004e4942,24+jp.length); bp.copy(glb,28+jp.length);
 await fs.writeFile(new URL(`${name.toLowerCase()}.glb`,out),glb);
 provenance.models.push({name,file:`mechs/${name.toLowerCase()}.glb`,url,bytes:glb.length,sha256:crypto.createHash('sha256').update(glb).digest('hex'),originalSha256:crypto.createHash('sha256').update(original).digest('hex'),modifications:'Lossless embedded glTF to GLB packaging; authored skeleton and animation samples unchanged. Runtime materials and original bone-attached armour.',clips:doc.animations.map(a=>({name:a.name,duration:Math.max(...a.samplers.map(s=>doc.accessors[s.input].max[0]))}))});
}
await fs.writeFile(new URL('LICENSE-Quaternius.txt',out),await download('https://drive.google.com/uc?export=download&id=1za89GDUfFtTyq8f2uL0_U0Nw_anSzGir'));
for(const [name,path] of Object.entries({GLTFLoader:'loaders/GLTFLoader.js',BufferGeometryUtils:'utils/BufferGeometryUtils.js'})) {
 const url=`https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/${path}`;
 const source=(await download(url)).toString().replaceAll("from 'three'", "from '../../../../cave-river-quest/vendor/three.module.js'").replace("'../utils/BufferGeometryUtils.js'", "'./BufferGeometryUtils.js'");
 await fs.writeFile(new URL(`vendor/${name}.js`,out),source); provenance.vendor.push({name,version:'0.165.0',license:'MIT',url,modifications:'Relative local imports only'});
}
await fs.writeFile(new URL('vendor/LICENSE-three.txt',out),await download('https://cdn.jsdelivr.net/npm/three@0.165.0/LICENSE'));
await fs.writeFile(new URL('../model-provenance.json',out),JSON.stringify(provenance,null,2)+'\n');
console.log(provenance.models.map(m=>({name:m.name,bytes:m.bytes})));
