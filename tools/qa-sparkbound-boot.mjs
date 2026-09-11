import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { mkdir,writeFile } from 'node:fs/promises';
import { startSparkboundQa } from './serve-sparkbound-qa.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');
console.log('Starting isolated synthetic D1');
const h = await startSparkboundQa({port:0});
let browser;
const report={runs:[],errors:[]};
try {
  console.log('Synthetic server ready');
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--mute-audio']});
  for(let run=0;run<6;run++){
    const context=await browser.newContext(),page=await context.newPage(),paths=[];
    if(run===5)await page.addInitScript(()=>{window.DecompressionStream=undefined;});
    page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
    page.on('pageerror',e=>report.errors.push(e.message));
    page.on('response',r=>{const path=new URL(r.url()).pathname;if(r.status()>=400)report.errors.push(`${r.status()} ${path}`);if(path.includes('guardian-library'))paths.push(path);});
    const start=Date.now();await page.goto(h.previewUrl);
    await page.waitForFunction(()=>document.querySelector('#game')?.getAttribute('aria-busy')==='false');
    assert(await page.evaluate(()=>Boolean(window.__SPARK_QA__?.world.relay.ready)),'Player finishes boot');
    assert.equal(paths.length,1);assert.equal(paths[0].endsWith('.gz'),run!==5);
    report.runs.push({run,mode:run===5?'raw fallback':'native gzip',paths,ms:Date.now()-start});await context.close();
  }
  assert.deepEqual(report.errors,[]);console.log(JSON.stringify(report));
}finally{await browser?.close();await h.close();await mkdir('../outputs/sparkbound-build/boot',{recursive:true});await writeFile('../outputs/sparkbound-build/boot/report.json',JSON.stringify(report,null,2));}
