// Real Chrome + real AudioContext, local audio only. No account, learner or production state.
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES ? `${process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES}/playwright` : 'C:/Users/gupta/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = fileURLToPath(new URL('../',import.meta.url));
const out = resolve(root,'outputs/dragon-grove');
await mkdir(out,{recursive:true});
const report = {date:new Date().toISOString(),scope:'Local isolated real Chrome audio; no account or learner state',listeningReview:false,checks:[],recordings:[],captures:[],consoleErrors:[],pageErrors:[],failedRequests:[],audioErrors:[]};
const check = (condition,label,details) => { report.checks.push({label,passed:Boolean(condition),...(details === undefined ? {} : {details})}); assert(condition,label); };
const html = `<!doctype html><html><head><meta charset="utf-8"><link rel="icon" href="data:,"><title>Dragon Grove audio QA</title></head><body>
<h1>Dragon Grove audio QA</h1><button id="start">Start audio from a real click</button><p id="status">Waiting</p>
<script type="module">
import {GroveAudio} from '/dragon-grove/audio.js';
window.audioErrors=[];window.audio=new GroveAudio({onError:message=>audioErrors.push(message)});
audio.configure({sound:true,music:true,reduced:false});
window.preGestureResult=await audio.start();
document.addEventListener('visibilitychange',()=>{window.visibilityEvents.push(document.visibilityState);document.hidden?audio.suspend():audio.resume();});
window.visibilityEvents=[];window.captureId=0;const pending=new Map();
document.querySelector('#start').onclick=async()=>{
  window.startResult=await audio.start();
  if(!window.meter){
    const processor=\`class GroveMeter extends AudioWorkletProcessor {
      constructor(){super();this.reset();this.port.onmessage=({data})=>{if(data.command==='reset'){this.reset();this.id=data.id;}else if(data.command==='report'){this.port.postMessage({id:data.id,samples:this.samples,peak:this.peak,rms:this.samples?Math.sqrt(this.squares/this.samples):0,clippingSamples:this.clipping,nonFinite:this.nonFinite});}};}
      reset(){this.samples=0;this.squares=0;this.peak=0;this.clipping=0;this.nonFinite=0;}
      process(inputs,outputs){for(const channel of inputs[0]||[])for(const sample of channel){if(!Number.isFinite(sample)){this.nonFinite++;continue;}this.samples++;this.squares+=sample*sample;this.peak=Math.max(this.peak,Math.abs(sample));if(Math.abs(sample)>=1)this.clipping++;}return true;}
    }registerProcessor('grove-meter',GroveMeter);\`;
    const blob=URL.createObjectURL(new Blob([processor],{type:'text/javascript'}));
    await audio.context.audioWorklet.addModule(blob);URL.revokeObjectURL(blob);
    window.meter=new AudioWorkletNode(audio.context,'grove-meter');
    // A parallel silent metering branch receives the actual post-compressor/master mix.
    audio.master.connect(meter);meter.connect(audio.context.destination);
    meter.port.onmessage=({data})=>{pending.get(data.id)?.(data);pending.delete(data.id);};
    window.capture=(duration=1500)=>new Promise(resolve=>{const id=++captureId;pending.set(id,resolve);meter.port.postMessage({command:'reset',id});setTimeout(()=>meter.port.postMessage({command:'report',id}),duration);});
  }
  document.querySelector('#status').textContent='Ready';window.ready=true;
};
window.loaded=true;
</script></body></html>`;

const server = createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    if (pathname === '/') {res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);return;}
    if (pathname !== '/dragon-grove/audio.js' && !pathname.startsWith('/dragon-grove/assets/audio/')) {res.writeHead(404).end();return;}
    const path = resolve(root,'.'+pathname), audioRoot=resolve(root,'dragon-grove/assets/audio')+sep;
    if (path !== resolve(root,'dragon-grove/audio.js') && !path.startsWith(audioRoot)) {res.writeHead(403).end();return;}
    const bytes = await readFile(path), contentType = {'.js':'text/javascript','.mp3':'audio/mpeg','.wav':'audio/wav'}[extname(path)] || 'application/octet-stream';
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),bytes.length-1):bytes.length-1;
      if (start> end || start>=bytes.length) {res.writeHead(416,{'Content-Range':`bytes */${bytes.length}`}).end();return;}
      res.writeHead(206,{'Content-Type':contentType,'Content-Range':`bytes ${start}-${end}/${bytes.length}`,'Content-Length':end-start+1,'Accept-Ranges':'bytes'});
      res.end(bytes.subarray(start,end+1));return;
    }
    res.writeHead(200,{'Content-Type':contentType,'Content-Length':bytes.length,'Accept-Ranges':'bytes'});res.end(bytes);
  } catch {res.writeHead(404).end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({executablePath:process.env.BQ_CHROMIUM_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--mute-audio']});
let context,page,streamControlsExercised=false;
try {
  report.browser = browser.version();
  report.output = 'Operating-system audio muted; post-master PCM measured inside the actual browser graph';
  context = await browser.newContext();page = await context.newPage();
  page.on('pageerror',e=>report.pageErrors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});
  page.on('requestfailed',r=>{
    const error=r.failure()?.errorText;
    const expected=streamControlsExercised && error==='net::ERR_ABORTED' && new URL(r.url()).pathname==='/dragon-grove/assets/audio/enchanted-valley.mp3';
    report.failedRequests.push({url:r.url(),error,expected,reason:expected?'The test deliberately seeks and pauses the streamed soundtrack, which can cancel an earlier range request.':undefined});
  });
  await page.goto(origin);await page.waitForFunction(()=>window.loaded);
  const before = await page.evaluate(()=>({preGestureResult,diagnostics:audio.diagnostics(),active:navigator.userActivation.isActive}));
  check(before.preGestureResult === false && before.diagnostics.contextState === 'not-started','No playback or AudioContext before a gesture',before);
  await page.getByRole('button',{name:'Start audio from a real click'}).click();
  await page.waitForFunction(()=>window.ready && audio.diagnostics().recordedEffects.length === 2,{},{timeout:20000});
  check(await page.evaluate(()=>startResult && audio.context.state==='running'),'Real click starts Chrome AudioContext');
  report.recordings = await page.evaluate(()=>[...audio.buffers].map(([name,buffer])=>({name,duration:buffer.duration,channels:buffer.numberOfChannels,sampleRate:buffer.sampleRate})));
  check(report.recordings.every(r=>r.duration>1&&r.channels===2&&r.sampleRate>=44100),'Both recorded effects decode to valid stereo PCM',report.recordings);
  await page.waitForFunction(()=>audio.musicElement.readyState>=3 && audio.musicElement.currentTime>0.1,{},{timeout:20000});
  const initialTime = await page.evaluate(()=>audio.musicElement.currentTime);
  await page.waitForTimeout(1200);
  const advancedTime = await page.evaluate(()=>audio.musicElement.currentTime);
  check(advancedTime > initialTime + 0.5,'Recorded soundtrack time advances', {initialTime,advancedTime});
  streamControlsExercised=true;
  await page.evaluate(()=>{audio.musicElement.currentTime=18;audio.setScene('question',4);});
  await page.waitForTimeout(400);
  const musicCapture=await page.evaluate(()=>capture(1800));report.captures.push({label:'music-only-question',...musicCapture});
  check(musicCapture.samples>10000 && musicCapture.rms>0.00001 && musicCapture.peak<1 && musicCapture.clippingSamples===0 && musicCapture.nonFinite===0,'Recorded music reaches output with a finite nonzero unclipped signal',musicCapture);
  const questionGain=await page.evaluate(()=>audio.musicGain.gain.value);
  check(questionGain<=0.101,'Question soundtrack gain settles near its quieter target',{questionGain});

  // Music off isolates every effect from the soundtrack, so music cannot hide a broken cue.
  await page.evaluate(()=>audio.configure({music:false,sound:true}));
  check(await page.evaluate(()=>audio.musicElement.paused && audio.settings.sound),'Music off leaves effects enabled');
  for (const name of ['correct','try','grow','victory','fire','storm','nature','astral']) {
    await page.waitForTimeout(2200);
    const capture=await page.evaluate(async name=>{const measurement=window.capture(2000),played=audio.effect(name);return {played,...await measurement};},name);
    report.captures.push({label:name,...capture});
    check(capture.played && capture.samples>10000 && capture.rms>0.000001 && capture.peak>0.00001 && capture.peak<1 && capture.clippingSamples===0 && capture.nonFinite===0,`${name} has a finite nonzero bounded output without music`,capture);
  }
  const stress=await page.evaluate(async()=>{const measurement=capture(2000);for(const name of ['grow','victory','fire','storm','nature','astral'])audio.effect(name);const activeVoices=audio.voices.size;return {activeVoices,...await measurement};});
  report.captures.push({label:'overlapping-powers',...stress});
  check(stress.activeVoices<=24 && stress.rms>0 && stress.peak<1 && stress.clippingSamples===0 && stress.nonFinite===0,'Overlapping effects respect voice cap and remain unclipped',stress);

  await page.evaluate(()=>{audio.configure({sound:false,music:true});audio.setScene('complete',10);});
  await page.getByRole('button',{name:'Start audio from a real click'}).click();
  await page.waitForTimeout(500);
  const independent=await page.evaluate(()=>({effectResult:audio.effect('fire'),effectGain:audio.effectsGain.gain.value,musicGain:audio.musicGain.gain.value,musicPlaying:!audio.musicElement.paused,activeVoices:audio.voices.size}));
  check(!independent.effectResult && independent.musicGain<=0.201 && independent.musicPlaying && independent.activeVoices===0,'Effects off leaves music playing and removes active effect voices',independent);
  await page.evaluate(()=>audio.configure({sound:false,music:false}));await page.waitForTimeout(900);
  // A silent bus can stop processing and leave its AudioParam getter at an old value.
  // Inject a real known tone directly into the muted bus: measure its output, not the getter.
  await page.evaluate(()=>{window.muteProbe=audio.context.createOscillator();window.muteProbeGain=audio.context.createGain();muteProbeGain.gain.value=0.05;muteProbe.frequency.value=440;muteProbe.connect(muteProbeGain).connect(audio.effectsGain);muteProbe.start();});
  const silence=await page.evaluate(()=>capture(700));report.captures.push({label:'both-switches-off',...silence});
  const mutedBusValue=await page.evaluate(()=>{const value=audio.effectsGain.gain.value;muteProbe.stop();muteProbe.disconnect();muteProbeGain.disconnect();return value;});
  check(silence.peak<0.00001 && silence.clippingSamples===0 && mutedBusValue===0,'Both switches off block a real injected tone and produce measured silence',{...silence,mutedBusValue});

  await page.evaluate(()=>audio.configure({sound:true,music:true}));await page.getByRole('button',{name:'Start audio from a real click'}).click();
  await page.waitForTimeout(300);
  const second=await context.newPage();await second.goto('about:blank');await second.bringToFront();await page.waitForTimeout(400);
  const backgroundVisibility=await page.evaluate(()=>({hidden:document.hidden,visibilityState:document.visibilityState,events:visibilityEvents,diagnostics:audio.diagnostics()}));
  report.backgroundVisibility=backgroundVisibility;
  if (backgroundVisibility.hidden) {
    check(backgroundVisibility.diagnostics.suspended && !backgroundVisibility.diagnostics.musicPlaying && backgroundVisibility.diagnostics.contextState==='suspended','Actual hidden document suspends the audio graph');
    await page.bringToFront();await page.waitForTimeout(500);
    check(await page.evaluate(()=>!document.hidden && audio.context.state==='running' && !audio.musicElement.paused),'Actual visible document resumes the audio graph');
    report.visibilityMethod='Real second tab foreground/background transition';
  } else {
    // Headless Chrome exposes all its pages as visible. Exercise the same lifecycle methods
    // directly and record the limitation; do not claim an actual hidden-tab event occurred.
    report.visibilityMethod='Headless browser keeps document visible; explicit lifecycle methods checked; handler checked in game source';
    await page.evaluate(()=>audio.suspend());
    const pausedAt=await page.evaluate(()=>audio.musicElement.currentTime);await page.waitForTimeout(500);
    const suspended=await page.evaluate(()=>({time:audio.musicElement.currentTime,diagnostics:audio.diagnostics()}));
    check(suspended.diagnostics.suspended && suspended.diagnostics.contextState==='suspended' && !suspended.diagnostics.musicPlaying && Math.abs(suspended.time-pausedAt)<0.03,'Explicit suspend pauses the actual media clock and AudioContext',suspended);
    await page.evaluate(()=>audio.resume());await page.waitForTimeout(500);
    check(await page.evaluate(()=>audio.context.state==='running' && !audio.musicElement.paused),'Explicit resume restarts the actual audio graph');
  }
  await second.close();
  await page.evaluate(()=>{audio.configure({sound:true,music:true,reduced:true});audio.effect('nature');});await page.waitForTimeout(500);
  const reduced=await page.evaluate(()=>({music:audio.musicGain.gain.value,effects:audio.effectsGain.gain.value,master:audio.master.gain.value}));
  check(reduced.music<=0.17 && reduced.effects>=0.25 && reduced.effects<=0.305 && reduced.master<=0.800001,'Reduced effects and master volume caps are applied',reduced);

  const game=await readFile(resolve(root,'dragon-grove/game.js'),'utf8');
  const hooks={configure:game.includes('audio.configure(settings)'),gestureStart:game.includes('audio.start()'),scene:game.includes('audio.setScene(state.phase,state.level)'),effect:game.includes('audio.effect('),hidden:game.includes("document.addEventListener('visibilitychange'")&&game.includes('audio.suspend()')&&game.includes('audio.resume()'),diagnostics:game.includes('audio:audio.diagnostics()')};
  check(Object.values(hooks).every(Boolean),'Game integration calls the audio settings, gesture, scene, effect and lifecycle interfaces',hooks);
  report.audioErrors=await page.evaluate(()=>audioErrors);
  report.finalDiagnostics=await page.evaluate(()=>audio.diagnostics());
  check(report.audioErrors.length===0&&report.consoleErrors.length===0&&report.pageErrors.length===0&&report.failedRequests.filter(r=>!r.expected).length===0,'No audio, console, page or unexpected network errors');
  report.passed=true;
} catch(error) {
  report.passed=false;report.failure=error.stack||String(error);process.exitCode=1;
} finally {
  if(page)try{await page.evaluate(()=>audio.suspend());}catch{}
  await browser.close();await new Promise(resolve=>server.close(resolve));
  report.summary={passedChecks:report.checks.filter(c=>c.passed).length,total:report.checks.length,maximumMeasuredPeak:Math.max(0,...report.captures.map(c=>c.peak)),clippingSamples:report.captures.reduce((sum,c)=>sum+c.clippingSamples,0)};
  await writeFile(resolve(out,'audio-qa.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({passed:report.passed,...report.summary,visibilityMethod:report.visibilityMethod,report:resolve(out,'audio-qa.json'),failure:report.failure},null,2));
}
