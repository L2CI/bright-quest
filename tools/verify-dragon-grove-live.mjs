// Public production reads only. Authenticated gameplay is verified separately against ephemeral D1.
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const origin=process.env.BQ_VERIFY_ORIGIN||'https://bright-quest.pages.dev';
const root=new URL('../',import.meta.url),out=new URL('../outputs/dragon-grove/',import.meta.url);await mkdir(out,{recursive:true});
const paths=['index.html','bright-quest-child-experience.js','bright-quest-shell-merge.js'];
async function list(relative){for(const entry of await readdir(new URL(relative,root),{withFileTypes:true})){const p=relative+entry.name;if(entry.isDirectory())await list(p+'/');else if(/\.(?:html|js|css|webp|png|glb|gz|mp3|wav|json)$/.test(p))paths.push(p);}}
await list('dragon-grove/');
const sha=buffer=>createHash('sha256').update(buffer).digest('hex'),assets=[],routes=[];
for(const path of paths){const response=await fetch(`${origin}/${path}?release=dragon-20261009`,{cache:'no-store',signal:AbortSignal.timeout(60000)});assert(response.ok,`${path}: HTTP${response.status}`);const remote=Buffer.from(await response.arrayBuffer()),local=await readFile(new URL(path,root));const normalise=b=>/\.(?:js|css|html|json)$/.test(path)?Buffer.from(b.toString('utf8').replace(/\r\n/g,'\n')):b;assert.equal(sha(normalise(remote)),sha(normalise(local)),`${path}: deployed bytes differ`);assets.push({path,bytes:remote.length,sha256:sha(normalise(remote))});}
for(const path of ['/api/dragon-grove','/api/dragon-grove?childId=unauthorised']){const r=await fetch(origin+path);assert.equal(r.status,401,path);routes.push({path,status:r.status});}
for(const path of ['/tools/test-dragon-grove-domain.mjs','/tools%2Ftest-skyforge-api.mjs','/%74ools%2ftest-dragon-grove-domain.mjs','/tools%252Ftest-dragon-grove-domain.mjs','/functions/_lib/dragon-grove-content.js','/functions%2F_lib%2Fdragon-grove-content.js','/_lib/dragon-grove-content','/__dragon-grove-qa__/state','/sparkbound%2Fcontent.js']){const r=await fetch(origin+path);assert.equal(r.status,404,path);assert(!(await r.text()).includes('export const QUESTIONS'),path);routes.push({path,status:r.status});}
for(const path of ['/','/skyforge/','/sparkbound/','/beacon-brigade/','/dragon-grove/']){const r=await fetch(origin+path);assert.equal(r.status,200,path);routes.push({path,status:r.status});}
const config=await(await fetch(origin+'/api/auth/config')).json();assert.equal(config.enabled,true);assert.equal(config.parentPinRecoveryEnabled,false);assert.equal(config.familyPasswordRecoveryEnabled,false);
const result={origin,verifiedAt:new Date().toISOString(),publicOnly:true,assets,routes,recoveryFlagsPreserved:true};await writeFile(new URL('live-verification.json',out),JSON.stringify(result,null,2));console.log(`Live verification passed: ${assets.length} matching assets, ${routes.length} routes, protected sources and existing recovery flags.`);
