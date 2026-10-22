// Public reads only. Authenticated UI replay is separately intercepted into ephemeral D1.
import assert from 'node:assert/strict';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin=process.env.BQ_VERIFY_ORIGIN||'https://bright-quest.pages.dev',root=new URL('../',import.meta.url),out=new URL(`../outputs/${process.env.BQ_RELEASE_OUTPUT||'education-journeys-2026-10-22'}/`,import.meta.url);await mkdir(out,{recursive:true});
if(process.argv.includes('--capture-auth-baseline')){const response=await fetch(origin+'/api/auth/config',{signal:AbortSignal.timeout(20000)});assert.equal(response.status,200);await writeFile(new URL('auth-baseline.json',out),JSON.stringify(await response.json(),null,2));console.log('Captured existing public auth configuration; no credentials or learner records.');}else{
const paths=['index.html','bright-quest-child-experience.js','bright-quest-shell-merge.js'],assets=[],routes=[];
async function list(path){for(const entry of await readdir(new URL(path,root),{withFileTypes:true})){const file=path+entry.name;if(entry.isDirectory())await list(file+'/');else paths.push(file);}}await list('education-journeys/');
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
await Promise.all(paths.map(async path=>{const r=await fetch(`${origin}/${path}?release=education-journeys-20261022`,{signal:AbortSignal.timeout(60000),cache:'no-store'});assert.equal(r.status,200,path);const remote=Buffer.from(await r.arrayBuffer()),local=await readFile(new URL(path,root));const normal=b=>/\.(?:html|js|css|json|md|txt)$/.test(path)?Buffer.from(b.toString().replace(/\r\n/g,'\n')):b;assert.equal(hash(normal(remote)),hash(normal(local)),path+' bytes differ');assets.push({path,bytes:remote.length,sha256:hash(normal(remote))});}));
for(const path of ['/','/education-journeys/','/dragon-grove/','/dragon-grove/chapter-two/','/sparkbound/','/beacon-brigade/','/skyforge/']){const r=await fetch(origin+path);assert.equal(r.status,200,path);routes.push({path,status:r.status});}
for(const path of ['/api/dragon-grove','/api/dragon-expedition','/api/skyforge']){const r=await fetch(origin+path);assert.equal(r.status,401,path);routes.push({path,status:r.status});}
for(const path of ['/tools/qa-education-journeys.mjs','/tools%2Ftest-education-journeys.mjs','/functions/_lib/dragon-grove-content.js','/sparkbound/content.js']){const r=await fetch(origin+path);assert.equal(r.status,404,path);routes.push({path,status:r.status});}
const config=await(await fetch(origin+'/api/auth/config')).json();const baseline=JSON.parse(await readFile(new URL('auth-baseline.json',out),'utf8'));assert.deepEqual(config,baseline,'Existing public authentication configuration changed');
await writeFile(new URL('live-verification.json',out),JSON.stringify({origin,verifiedAt:new Date().toISOString(),assets:assets.sort((a,b)=>a.path.localeCompare(b.path)),routes,authConfigurationPreserved:true,productionLearnerWrites:0},null,2));
console.log(`Live verified: ${assets.length} matching file hashes, ${routes.length} routes, unchanged authentication, zero production learner writes.`);

}
