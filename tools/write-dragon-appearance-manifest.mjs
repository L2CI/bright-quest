import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {GROWTH_STAGES} from '../dragon-grove/world.js';

const relative='dragon-grove/assets/';
const flame=await readFile(new URL('../'+relative+'textures/dragon-fire.webp',import.meta.url));
const provenance={
  version:1,created:'2026-10-09',title:'Dragon Grove: Emberwild — dragon appearance',
  source:{title:'European Dragon',author:'Regina Cachoa',packagedAlias:'Nonexistent 101',url:'https://sketchfab.com/3d-models/european-dragon-82f393a2e6c048ad80c171ce3b3a7b87',licence:'CC BY 4.0',licenceUrl:'https://creativecommons.org/licenses/by/4.0/',details:'model-provenance.json'},
  modifications:['2K body colour/normal textures, 1K roughness and 512px eye/teeth maps, embedded in GLB; original mesh, skeleton and animation clips preserved.','Eleven body states: an initial newborn and ten earned evolutions. Stage-specific head, neck, wing, chest, limb and tail proportions are applied after the animation sampler.','A shared-topology juvenile crown morph shortens the existing head horns; larger eye/lid bone proportions fade as the dragon matures.','Independent Fire, Storm, Nature and Astral skin masks, with additional inherited chest, wing and tail proportions.','Three-quarter camera, soft contact shadow, image-based forest scene, warm key and cool rim lighting.'],
  stages:GROWTH_STAGES,
  inheritance:{fire:'Warm crest markings and broader chest.',storm:'Cool wing membrane markings and longer wings.',nature:'Forest scale markings and a longer tail.',astral:'Violet wing and crest markings, and broader wing proportions.',combination:'All four channels accumulate independently; none replaces another.'},
  animation:{authoredClips:['Fly','Walk','Run','Idle Stand','Idle Sit'],runtime:'Source Idle Stand is sampled by a 169-joint skeleton. Breath adds an animated jaw/head overlay. Growth proportions are reapplied after animation sampling.',limits:'The source does not include a bespoke fire-breath animation. The runtime supplements it with a jaw/head pose and mouth-attached effects.'},
  generatedTextures:[{path:'textures/dragon-fire.webp',bytes:flame.length,sha256:createHash('sha256').update(flame).digest('hex'),creator:'Original asset created for Bright Quest with OpenAI image generation',created:'2026-10-09',transparent:true,prompt:'A realistic dragon fire-breath VFX plume on transparent background, left narrow nozzle expanding right into turbulent orange/amber flames, pale yellow core, wispy irregular tongues and translucent smoke edges. Entire plume visible with clear padding; no scenery, text, border or black background.'}],
  runtimeBudget:{compressedModelBytes:6382057,uncompressedModelBytes:10234980,modelTriangles:42338,maxDevicePixelRatio:1.5,maxFramesPerSecond:30,shadowResolution:1024},
};
await writeFile(new URL('../'+relative+'models/appearance-manifest.json',import.meta.url),JSON.stringify(provenance,null,2)+'\n');
console.log('Wrote dragon appearance manifest with '+GROWTH_STAGES.length+' body states.');
