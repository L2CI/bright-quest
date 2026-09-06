import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { HEROES } from '../sparkbound/roster.js';
import { root, output, chromium, chromeOptions, startRosterHarness, bundleHash } from './qa-sparkbound-roster-art.mjs';

const destination=resolve(root,'sparkbound/assets/heroes');
await mkdir(destination,{recursive:true});await mkdir(output,{recursive:true});
const before=await bundleHash(),harness=await startRosterHarness();let browser;
const errors=[],portraits=[];
try{
  browser=await chromium.launch(chromeOptions);
  const page=await browser.newPage({viewport:{width:1000,height:800},deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(harness.origin+'/sparkbound/');await page.waitForFunction(()=>window.loaded);
  const images=await page.evaluate(async heroes=>{
    const T=THREE,rig=new HeroRig('relay');await rig.readyPromise;
    const scene=new T.Scene();scene.background=new T.Color(0xe3ecee);scene.add(rig.root);
    scene.add(new T.HemisphereLight(0xe5f5ff,0x69796d,2.5));
    const key=new T.DirectionalLight(0xffeed7,3.8);key.position.set(-5,9,9);scene.add(key);
    const rim=new T.DirectionalLight(0xbce9ff,2.5);rim.position.set(6,5,-5);scene.add(rim);
    const size=640;
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});renderer.setSize(size,size);
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
    const back=new T.Vector3(5,2.4,12).normalize(),right=new T.Vector3().crossVectors(new T.Vector3(0,1,0),back).normalize(),up=new T.Vector3().crossVectors(back,right).normalize();
    const union=new T.Box3();rig.reduced=true;
    const pose=(id,stage)=>{rig.setHero(id);rig.setKit({staff:stage>0,pad:stage>1,tier:1});rig.play('guard',{restart:true,fade:0});rig.update(.001);};
    for(const hero of heroes)for(let stage=0;stage<3;stage++){pose(hero.id,stage);union.union(rig.visualBounds());}
    const centre=union.getCenter(new T.Vector3());let extent=0;
    for(const x of [union.min.x,union.max.x])for(const y of [union.min.y,union.max.y])for(const z of [union.min.z,union.max.z]){const p=new T.Vector3(x,y,z).sub(centre);extent=Math.max(extent,Math.abs(p.dot(right)),Math.abs(p.dot(up)));}
    extent*=1.06;
    const camera=new T.OrthographicCamera(-extent,extent,extent,-extent,.1,100);camera.position.copy(centre).addScaledVector(back,18);camera.lookAt(centre);
    const output=[];
    for(const hero of heroes)for(let stage=0;stage<3;stage++){
      pose(hero.id,stage);renderer.render(scene,camera);
      const gl=renderer.getContext(),pixels=new Uint8Array(size*size*4);gl.readPixels(0,0,size,size,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
      const colours=new Set();for(let i=0;i<pixels.length;i+=16)colours.add(pixels[i]+','+pixels[i+1]+','+pixels[i+2]);
      output.push({id:hero.id,stage,size,data:renderer.domElement.toDataURL('image/jpeg',.88),colours:colours.size,camera:camera.position.toArray(),extent,clip:rig.currentTiming.clip});
    }
    rig.dispose();renderer.dispose();return output;
  },HEROES);
  for(const item of images){
    assert(item.colours>100);const bytes=Buffer.from(item.data.split(',')[1],'base64');
    const path=resolve(destination,`${item.id}-${item.stage}.jpg`);await writeFile(path,bytes);
    portraits.push({...item,data:undefined,path,bytes:bytes.length});
  }
  assert.equal(images.length,18);assert.deepEqual(errors,[]);assert.equal(before,await bundleHash());
  await page.setContent(`<html><body style="margin:0;background:#fff;display:grid;grid-template-columns:repeat(6,1fr);font:14px Arial">${[0,1,2].flatMap(stage=>HEROES.map(h=>`<figure style="margin:6px"><img style="width:100%" src="${harness.origin}/sparkbound/assets/heroes/${h.id}-${stage}.jpg"><figcaption>${h.name} / ${stage}</figcaption></figure>`)).join('')}</body></html>`);
  await page.setViewportSize({width:1440,height:850});await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth===640));
  await page.screenshot({path:resolve(output,'portrait-contact-sheet.png'),fullPage:true});
  await writeFile(resolve(output,'portraits.json'),JSON.stringify({portraits,errors},null,2));
  console.log(JSON.stringify({portraits:portraits.length,bytes:portraits.map(p=>p.bytes),destination}));
}finally{await browser?.close();await harness.close();}
