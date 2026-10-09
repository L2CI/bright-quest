// Deterministic atlas packing only. Source artwork was created with image generation.
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const sharp=require(`${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/sharp`);
const root=new URL('../dragon-grove/assets/',import.meta.url);
const source=process.env.BQ_DRAGON_ART_SOURCE||'C:/Users/gupta/.codex/generated_images/01a0e521-6a69-7791-b09a-e929df17890e';
await mkdir(new URL('powers/',root),{recursive:true});await mkdir(new URL('science/',root),{recursive:true});
for(const [filename,folder,columns,rows,names]of [
 ['exec-ed4b821c-d121-4bea-80bf-d7dabfc33dbe.png','powers',2,2,['fire','storm','nature','astral']],
 ['exec-14a69106-96c9-471c-8f0b-8eb41105eb4c.png','science',4,3,['egg','caterpillar','butterfly','grass','grasshopper','frog','leaf','snail','bird','lizard','beetle','cloud']]
]){const file=`${source}/${filename}`,meta=await sharp(file).metadata();for(let i=0;i<names.length;i++){const left=Math.floor(i%columns*meta.width/columns),top=Math.floor(Math.floor(i/columns)*meta.height/rows),right=Math.floor((i%columns+1)*meta.width/columns),bottom=Math.floor((Math.floor(i/columns)+1)*meta.height/rows);await sharp(file).extract({left,top,width:right-left,height:bottom-top}).resize(240,240,{fit:'contain',background:'#00000000'}).webp({quality:88,alphaQuality:100}).toFile(new URL(`${folder}/${names[i]}.webp`,root).pathname.replace(/^\/([A-Z]:)/,'$1').replaceAll('%20',' '));}}
console.log('Packed4 original power icons and12 scientific specimen images.');
