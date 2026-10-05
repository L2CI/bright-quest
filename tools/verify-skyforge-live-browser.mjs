// Public production entry checks in a fresh browser; no login or learner writes.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(`${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/playwright`);
const origin=process.env.BQ_VERIFY_ORIGIN||'https://bright-quest.pages.dev';
const out=new URL('../outputs/skyforge/',import.meta.url);
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.BQ_CHROMIUM_PATH||undefined,headless:true});
const findings={origin,verifiedAt:new Date().toISOString(),authenticated:false,checks:[],errors:[],blockedWrites:[]};
try {
  for(const [device,width,height] of [['desktop',1440,900],['phone',390,844]]) {
    const context=await browser.newContext({viewport:{width,height}});
    await context.route('**/*',async route=>{
      const request=route.request();
      if(!['GET','HEAD','OPTIONS'].includes(request.method())) {
        findings.blockedWrites.push({method:request.method(),url:request.url()});
        return route.abort();
      }
      return route.continue();
    });
    const page=await context.newPage();
    page.on('pageerror',error=>findings.errors.push(error.message));
    page.on('response',response=>{
      const url=new URL(response.url());
      if(response.status()>=400&&!(url.pathname==='/api/skyforge'&&response.status()===401)) findings.errors.push(`${response.status()} ${url.pathname}`);
    });
    for(const fragment of ['', '#parent/evidence']) {
      await page.goto(origin+'/'+fragment);
      await page.locator('#familyLoginEmail').waitFor({state:'visible'});
      assert(await page.locator('#familyLoginPassword').isVisible());
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      findings.checks.push(`${device}: ${fragment||'home'} shows family sign-in without overflow`);
    }
    await page.screenshot({path:fileURLToPath(new URL(`live-${device}-sign-in.png`,out)),fullPage:true});
    await page.goto(origin+'/skyforge/');
    await page.getByRole('heading',{name:'Meet your guardian.'}).waitFor();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    findings.checks.push(`${device}: Skyforge requires sign-in`);
    await page.screenshot({path:fileURLToPath(new URL(`live-${device}-skyforge-gate.png`,out)),fullPage:true});
    await page.getByRole('link',{name:'Open Bright Quest'}).click();
    await page.locator('#familyLoginEmail').waitFor({state:'visible'});
    findings.checks.push(`${device}: Skyforge returns to family sign-in`);
    await context.close();
  }
  assert.deepEqual(findings.errors,[]);
  assert.deepEqual(findings.blockedWrites,[]);
  await writeFile(new URL('live-browser-verification.json',out),JSON.stringify(findings,null,2));
  console.log(`Live browser verification passed: ${findings.checks.length} checks, desktop/phone, public entry only.`);
} finally { await browser.close(); }
