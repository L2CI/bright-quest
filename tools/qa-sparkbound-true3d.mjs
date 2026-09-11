import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir, realpath } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { HEROES } from '../sparkbound/roster.js';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const VIEWPORTS = { desktop: [1440, 900], mobile: [390, 844], tablet: [1024, 768] };
const ANGLES = { front: 0, quarter: Math.PI / 4, side: Math.PI / 2, rear: Math.PI };
const MOTIONS = ['idle', 'walk', 'strike', 'guard', 'charge', 'break', 'hit', 'special', 'upgrade', 'victory'];
export const TRUE3D_MODEL = 'Blender articulated guardian';

function dependency(name) {
  try { return require(name); }
  catch { return require(resolve(process.env.BQ_NODE_MODULES || resolve(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'), name)); }
}

// Serializable browser inspection shared with the UI suite. No Three import or private rig fields.
export function inspectTrue3dRig(rig) {
  const hash = values => {
    let h = 2166136261;
    for (const value of values) h = Math.imul(h ^ Math.round(value * 100000), 16777619);
    return (h >>> 0).toString(16);
  };
  const visible = object => {
    for (let p = object; p; p = p.parent) if (!p.visible) return false;
    return true;
  };
  rig.root.updateWorldMatrix(true, true);
  const meshes = [], actorNodes = [], min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  let invalidVertices = 0;
  rig.root.traverse(object => {
    if (!visible(object)) return;
    if (/generated-image-actor|image.?actor/i.test(object.name) || object.constructor?.name === 'ImageActor') actorNodes.push(object.name);
    if (!object.isMesh || !object.geometry?.attributes.position) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    if (!materials.some(m => m?.visible !== false && (!m?.transparent || m.opacity > .01))) return;
    const position = object.geometry.attributes.position;
    if (!position.count) return;
    const v = rig.root.position.clone(), samples = [];
    for (let i = 0; i < position.count; i++) {
      if (object.getVertexPosition) object.getVertexPosition(i, v);
      else v.fromBufferAttribute(position, i);
      v.applyMatrix4(object.matrixWorld);
      const xyz = v.toArray();
      if (!xyz.every(Number.isFinite)) invalidVertices++;
      xyz.forEach((n, j) => { min[j] = Math.min(min[j], n); max[j] = Math.max(max[j], n); });
    }
    // A rotated plane has a 3D AABB too. Prove non-coplanarity with a tetrahedron.
    for (let i = 0; i < position.count; i += Math.max(1, Math.floor(position.count / 128))) {
      samples.push(rig.root.position.clone().fromBufferAttribute(position, i));
    }
    const a = samples[0];
    const b = samples.reduce((best, p) => p.distanceToSquared(a) > best.distanceToSquared(a) ? p : best, a);
    const ab = b.clone().sub(a);
    const c = samples.reduce((best, p) => ab.clone().cross(p.clone().sub(a)).lengthSq() > ab.clone().cross(best.clone().sub(a)).lengthSq() ? p : best, a);
    const normal = ab.clone().cross(c.clone().sub(a));
    const volume = Math.max(...samples.map(p => Math.abs(normal.dot(p.clone().sub(a)))));
    const extent = Math.sqrt(b.distanceToSquared(a));
    let attached = Boolean(object.isSkinnedMesh && object.skeleton?.bones?.length);
    for (let p = object.parent; p && p !== rig.root; p = p.parent) attached ||= Boolean(p.isBone);
    meshes.push({ name: object.name, vertices: position.count, attached,
      solid: extent > 1e-6 && volume / extent ** 3 > 1e-5,
      geometry: hash([...position.array, ...(object.geometry.index?.array || [])]),
      transform: hash(object.matrixWorld.elements), skinned: Boolean(object.isSkinnedMesh) });
  });
  const sockets = {};
  for (const name of ['weaponTip', 'contactPoint', 'shieldPoint']) {
    try { sockets[name] = rig[name]?.toArray?.() ?? null; }
    catch (error) { sockets[name] = { error: error.message }; }
  }
  const bounds = rig.visualBounds();
  return { model: rig.root.userData.model, id: rig.root.userData.heroId ?? rig.heroId,
    stage: rig.root.userData.equipmentStage, imageActive: rig.imageActive,
    ready: rig.ready, visible: visible(rig.root), error: rig.error?.message ?? null,
    actorNodes, meshes, invalidVertices, bounds: { min, max },
    reportedBounds: { min: bounds.min.toArray(), max: bounds.max.toArray() }, sockets,
    geometrySignature: meshes.map(m => m.geometry).sort().join(':'),
    poseSignature: meshes.map(m => `${m.name}:${m.transform}`).sort().join(':') };
}

export function assertTrue3dRig(rig, check, label, { id, stage } = {}) {
  check(`${label}: articulated guardian, no active ImageActor`, rig.model === TRUE3D_MODEL && rig.imageActive === false && rig.actorNodes.length === 0);
  check(`${label}: ready and visible`, rig.ready && rig.visible && !rig.error);
  if (id !== undefined) check(`${label}: selected hero identity`, rig.id === id);
  if (stage !== undefined) check(`${label}: selected equipment stage`, rig.stage === stage);
  const solids = rig.meshes.filter(m => m.solid);
  check(`${label}: visible volumetric bone-attached geometry`, solids.length >= 3 && solids.filter(m => m.attached).length >= 3);
  check(`${label}: finite rendered vertices`, rig.invalidVertices === 0 && rig.meshes.length > 0);
  check(`${label}: positive volume bounds`, rig.bounds.min.every((n, i) => Number.isFinite(n) && Number.isFinite(rig.bounds.max[i]) && rig.bounds.max[i] - n > .05));
  check(`${label}: visualBounds contains actual vertices`, rig.bounds.min.every((n, i) => rig.reportedBounds.min[i] <= n + .05 && rig.reportedBounds.max[i] >= rig.bounds.max[i] - .05));
  for (const [name, point] of Object.entries(rig.sockets)) {
    check(`${label}: ${name} is finite`, Array.isArray(point) && point.length === 3 && point.every(Number.isFinite));
    if (Array.isArray(point)) check(`${label}: ${name} is near geometry`, point.every((n, i) => n >= rig.bounds.min[i] - .8 && n <= rig.bounds.max[i] + .8));
  }
}

// Runs inside the bundled QA page, not in the shipped application.
function installBrowserQa(THREE, SparkWorld, inspect) {
  const w = new SparkWorld(document.querySelector('canvas'));
  window.__SPARK_QA__ = { world: w };
  window.qa = { world: w, inspect,
    step(n = 1, dt = 1 / 120) {
      for (let i = 0; i < n; i++) {
        w.elapsed += dt; w.animateAction(dt); w.relay.update(dt, w.elapsed); w.prism.update(dt, w.elapsed); w.updateImpact(dt);
      }
    },
    async select(id, stage, rulesVersion) {
      w.stopAnimation(); w.paused = true; w.syncKey = '';
      w.sync({ id: 'synthetic-true3d', heroId: id === 'prism' ? 'relay' : id, rulesVersion,
        phase: 'battle', round: stage + 1, upgradeStage: stage, staff: stage > 0, pad: stage > 1,
        intent: 'open', energy: 4, questions: [], questionIndex: 0 });
      await Promise.all([w.relay.readyPromise, w.prism.readyPromise]);
      for (const rig of [w.relay, w.prism]) {
        rig.setKit({ stage, tier: 1, staff: stage > 0, pad: stage > 1 });
        rig.setAim(null); rig.setCharge(0); rig.play('idle', { restart: true, fade: 0 }); rig.update(.01);
      }
      this.slot = id === 'prism' ? 'prism' : 'relay';
      this.label = `${id} / stage ${stage + 1}`;
    },
    pixels() {
      const gl = w.renderer.getContext(), width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
      const p = new Uint8Array(width * height * 4); gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, p);
      const colours = new Set(); let foreground = 0, hash = 2166136261;
      for (let i = 0; i < p.length; i += 16) {
        colours.add(`${p[i] >> 3}:${p[i + 1] >> 3}:${p[i + 2] >> 3}`);
        if (Math.abs(p[i] - p[0]) + Math.abs(p[i + 1] - p[1]) + Math.abs(p[i + 2] - p[2]) > 24) foreground++;
        hash = Math.imul(hash ^ (p[i] + 257 * p[i + 1] + 65537 * p[i + 2]), 16777619);
      }
      return { colours: colours.size, foreground, sampled: p.length / 16, hash: hash >>> 0 };
    },
    view(angle = 0, markers = false) {
      const rig = w[this.slot], parent = rig.root.parent, position = rig.root.position.clone(), rotation = rig.root.quaternion.clone();
      const scene = new THREE.Scene(); scene.background = new THREE.Color(0xc6cdd3);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x65717a, 2.5));
      const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(5, 9, 7); scene.add(key);
      const fill = new THREE.DirectionalLight(0xc8eaff, 2); fill.position.set(-6, 4, -5); scene.add(fill);
      scene.add(rig.root); rig.root.position.set(0, 0, 0); rig.root.quaternion.identity();
      const oldCamera = w.camera;
      const markerObjects = [];
      try {
        const b = rig.visualBounds(), centre = b.getCenter(new THREE.Vector3()), size = b.getSize(new THREE.Vector3());
        const radius = size.length() / 2;
        const camera = new THREE.PerspectiveCamera(38, w.canvas.clientWidth / w.canvas.clientHeight, .05, 200);
        const halfFov = Math.min(THREE.MathUtils.degToRad(19), Math.atan(Math.tan(THREE.MathUtils.degToRad(19)) * camera.aspect));
        const distance = radius / Math.sin(halfFov) * 1.12;
        camera.position.copy(centre).add(new THREE.Vector3(Math.sin(angle), .13, Math.cos(angle)).normalize().multiplyScalar(distance));
        camera.lookAt(centre); camera.updateMatrixWorld(); rig.setCamera(camera);
        if (markers) for (const [name, colour] of [['weaponTip', 0xff3030], ['contactPoint', 0xffcf00], ['shieldPoint', 0x2060ff]]) {
          const point = rig[name];
          if (!point?.isVector3) continue;
          const marker = new THREE.Mesh(new THREE.SphereGeometry(.065, 12, 8), new THREE.MeshBasicMaterial({ color: colour, depthTest: false }));
          marker.position.copy(point); marker.renderOrder = 1000; scene.add(marker); markerObjects.push(marker);
        }
        const projected = [];
        for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) projected.push(new THREE.Vector3(x, y, z).project(camera).toArray());
        w.renderer.render(scene, camera);
        document.querySelector('p').textContent = `${this.label} / ${Math.round(angle * 180 / Math.PI)} deg${markers ? ' / red muzzle, yellow contact, blue guard' : ''}`;
        return { pixels: this.pixels(), projected, rotation: rig.root.quaternion.toArray() };
      } finally {
        parent.add(rig.root); rig.root.position.copy(position); rig.root.quaternion.copy(rotation); rig.setCamera(oldCamera);
        rig.root.updateWorldMatrix(true, true);
        for (const marker of markerObjects) { marker.geometry.dispose(); marker.material.dispose(); }
      }
    },
    worldFrame() {
      w.fitHeroes(); w.camera.position.copy(w.cameraGoal); w.camera.lookAt(w.target); w.camera.updateMatrixWorld();
      w.relay.setCamera(w.camera); w.prism.setCamera(w.camera); w.renderer.render(w.scene, w.camera);
      const projected = [];
      for (const rig of [w.relay, w.prism]) {
        const b = rig.visualBounds();
        for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) projected.push(new THREE.Vector3(x, y, z).project(w.camera).toArray());
      }
      return { projected, pixels: this.pixels(), errors: [...w.errors] };
    },
    sockets() {
      const rig = w[this.slot], position = rig.root.position.clone(), quaternion = rig.root.quaternion.clone();
      const local = Object.fromEntries(['weaponTip', 'contactPoint', 'shieldPoint'].map(name => [name, rig.root.worldToLocal(rig[name].clone())]));
      const contacts = ['strike', 'break', 'special'].map(name => ({ name, point: rig.contactLocal(name).toArray() }));
      try {
        rig.root.position.add(new THREE.Vector3(.7, .2, -.4)); rig.root.rotation.y += .6; rig.root.updateWorldMatrix(true, true);
        return { contacts, transformErrors: Object.fromEntries(Object.entries(local).map(([name, point]) => [name, rig[name].distanceTo(rig.root.localToWorld(point))])) };
      } finally { rig.root.position.copy(position); rig.root.quaternion.copy(quaternion); rig.root.updateWorldMatrix(true, true); }
    },
    groundView() {
      const rig = w[this.slot], camera = new THREE.PerspectiveCamera(42, w.canvas.clientWidth / w.canvas.clientHeight, .05, 200);
      camera.position.copy(rig.root.position).add(new THREE.Vector3(0, .42, 3.3));
      camera.lookAt(rig.root.position.clone().add(new THREE.Vector3(0, .18, 0)));
      w.renderer.render(w.scene, camera);
      document.querySelector('p').textContent = `${this.label} / boot contact with arena floor`;
    },
    async action(id, stage, rulesVersion, rival = false) {
      await this.select(id, stage, rulesVersion);
      const hits = [], launches = [], phases = [];
      const event = { kind: 'exchange', move: rival ? 'guard' : stage === 0 ? 'strike' : stage === 1 ? 'break' : 'special', intent: rival ? 'heavy' : 'guard', damage: rival ? 0 : 4, rivalDamage: rival ? 2 : 0 };
      w.onImpact = (actual, part) => {
        const a = w.animation;
        const attacker = part === 'player' ? w.relay : w.prism;
        hits.push({ part, eventUnchanged: JSON.stringify(actual) === JSON.stringify(event),
          arrivalError: a.target ? w.bolt.position.distanceTo(a.target) : w.impactShell.position.distanceTo(attacker.contactPoint),
          target: a.target?.toArray() ?? attacker.contactPoint.toArray(), guard: (part === 'player' ? w.prism : w.relay).shieldPoint.toArray() });
      };
      w.playEvent(event, { ...w.match });
      this.actionRun = { hits, launches, phases, steps: 0, snapshots: [] };
      return this.actionRun;
    },
    actionUntil(target) {
      const run = this.actionRun;
      while (w.animation && run.steps++ < 3600) {
        const before = w.animation.phase; this.step();
        const phase = w.animation?.phase;
        if (phase && run.phases.at(-1) !== phase) run.phases.push(phase);
        if (phase === 'flight' && before !== 'flight') {
          const attacker = w.animation.part === 'rival' ? w.prism : w.relay;
          run.launches.push({ muzzleError: w.bolt.position.distanceTo(attacker.weaponTip), visible: w.bolt.visible, hitsBefore: run.hits.length });
        }
        if (phase === target || (target === 'impact' && run.hits.length > 0)) break;
      }
      const frame = this.worldFrame();
      return { ...run, finished: !w.animation, phase: w.animation?.phase, frame };
    }
  };
  w.ready.then(() => { w.paused = true; cancelAnimationFrame(w.raf); window.qaReady = true; }).catch(error => { window.qaBootError = error.stack; });
}

async function bundleWorld() {
  const { build } = dependency('esbuild');
  const result = await build({ absWorkingDir: repo,
    stdin: { contents: `import * as THREE from './cave-river-quest/vendor/three.module.js';\nimport { SparkWorld } from './sparkbound/src/world.ts';\n(${installBrowserQa.toString()})(THREE, SparkWorld, ${inspectTrue3dRig.toString()});`, resolveDir: repo, sourcefile: 'true3d-qa-entry.js' },
    bundle: true, write: false, format: 'esm', target: 'es2022', tsconfigRaw: {},
    nodePaths: process.env.BQ_NODE_MODULES ? [process.env.BQ_NODE_MODULES] : [] });
  return result.outputFiles[0].text;
}

async function assetServer(bundle, ui = false, httpGzip = false) {
  const root = await realpath(resolve(repo, 'sparkbound/assets'));
  const assets = new Map();
  const mime = { '.glb': 'model/gltf-binary', '.gz': 'application/gzip', '.gltf': 'model/gltf+json', '.bin': 'application/octet-stream', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav' };
  const server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
      const send = (type, body, headers = {}) => { response.writeHead(200, { 'content-type': type, 'cache-control': 'no-store', ...headers }); response.end(body); };
      if (request.method !== 'GET') { response.writeHead(405); return response.end(); }
      if (ui && pathname === '/sparkbound/') return send('text/html', await readFile(resolve(repo, 'sparkbound/index.html')));
      if (ui && pathname === '/sparkbound/game.js') return send('text/javascript', bundle);
      if (ui && pathname === '/sparkbound/sparkbound.css') return send('text/css', await readFile(resolve(repo, 'sparkbound/sparkbound.css')));
      if (pathname === '/sparkbound/') return send('text/html', '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>Muted true3D QA</title><style>body{margin:0}canvas{display:block;width:100vw;height:100vh}p{position:fixed;bottom:8px;left:12px;right:12px;margin:0;font:14px Arial;color:#fff;background:#20252c;padding:8px;pointer-events:none}</style></head><body><canvas></canvas><p></p><script type="module" src="/qa.js"></script></body></html>');
      if (pathname === '/qa.js') return send('text/javascript', bundle);
      if (!pathname.startsWith('/sparkbound/assets/')) { response.writeHead(404); return response.end(); }
      const relative = decodeURIComponent(pathname.slice('/sparkbound/assets/'.length));
      if (relative.split(/[\\/]/).some(p => p.startsWith('.') || p.includes(':'))) throw Error('Invalid asset path');
      const file = await realpath(resolve(root, relative));
      if (!file.startsWith(root + sep) || !mime[extname(file)]) throw Error('Not a runtime asset');
      const bytes = await readFile(file);
      assets.set(pathname, { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
      return send(mime[extname(file)], bytes, httpGzip && extname(file) === '.gz' ? { 'content-encoding': 'gzip' } : {});
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise((yes, no) => { server.once('error', no); server.listen(0, '127.0.0.1', yes); });
  return { assets, origin: `http://127.0.0.1:${server.address().port}`, close: () => new Promise(yes => { server.close(yes); server.closeAllConnections(); }) };
}

function options(argv) {
  const result = { run: false, preflight: false, selfTest: false, ui: false, rawLibrary: false, httpGzip: false, heroes: [...HEROES.map(h => h.id), 'prism'], stages: [0, 1, 2, 3, 4, 5], viewports: Object.keys(VIEWPORTS), output: resolve(repo, '../outputs/sparkbound-build/true3d', new Date().toISOString().replace(/[:.]/g, '-')) };
  for (const arg of argv) {
    if (arg === '--run') result.run = true;
    else if (arg === '--preflight') result.preflight = true;
    else if (arg === '--self-test') result.selfTest = true;
    else if (arg === '--ui') result.ui = true;
    else if (arg === '--raw-library') result.rawLibrary = true;
    else if (arg === '--http-gzip') result.httpGzip = true;
    else if (arg === '--help') result.help = true;
    else if (arg.startsWith('--heroes=')) result.heroes = arg.slice(9).split(',');
    else if (arg.startsWith('--stages=')) result.stages = arg.slice(9).split(',').map(Number);
    else if (arg.startsWith('--viewports=')) result.viewports = arg.slice(12).split(',');
    else if (arg.startsWith('--output=')) result.output = resolve(arg.slice(9));
    else throw Error(`Unknown argument: ${arg}`);
  }
  assert.ok(!(result.rawLibrary && result.httpGzip), 'Choose one loader branch per run');
  for (const [name, list, permitted] of [['heroes', result.heroes, [...HEROES.map(h => h.id), 'prism']], ['stages', result.stages, [0, 1, 2, 3, 4, 5]], ['viewports', result.viewports, Object.keys(VIEWPORTS)]]) {
    assert.ok(list.length && new Set(list).size === list.length && list.every(n => permitted.includes(n)), `Invalid ${name}`);
  }
  return result;
}

async function main() {
  const config = options(process.argv.slice(2));
  if (config.selfTest) return selfTest();
  if (config.help || (!config.run && !config.preflight)) {
    console.log('Muted true3D QA: no game or build files are changed.\n  node tools/qa-sparkbound-true3d.mjs --preflight   (in-memory build, localhost and blank browser only)\n  node tools/qa-sparkbound-true3d.mjs --run         (only after models are ready and QA is requested)\n  node tools/qa-sparkbound-true3d.mjs --run --ui    (current app source, synthetic in-memory domain API; no auth/D1 testing)\n  --heroes=relay,prism --stages=0,5 --viewports=desktop,mobile,tablet --output=PATH\n  node tools/qa-sparkbound-true3d.mjs --self-test\nStages use 0..5. Full coverage: 11 heroes x 6 plus Prism x 6, all three viewports, four angles.\nChrome: BQ_QA_CHROME or CHROME_PATH; dependencies: BQ_NODE_MODULES or bundled runtime.\nFiltered runs are labelled partial, never a release pass.');
    console.log('Loader probes: --raw-library disables DecompressionStream; --http-gzip exercises transparent HTTP decompression. Choose one per run.');
    return;
  }
  if (config.ui) { assert.ok(config.run, '--ui requires --run'); return uiQa(config); }
  const bundle = await bundleWorld(), { chromium } = dependency('playwright');
  const { createState, applyAction } = await import('../functions/_lib/sparkbound.js');
  const rulesVersion = applyAction(createState({ profileId: 'synthetic-true3d-version' }), { type: 'start', heroId: 'relay' }).match.rulesVersion;
  assert.ok([3, 4].includes(rulesVersion), 'Review campaign expectations before testing an unknown rules version');
  const report = { at: new Date().toISOString(), status: 'NOT_RUN', synthetic: true, muted: true, rulesVersion,
    libraryMode: config.rawLibrary ? 'raw-fallback' : config.httpGzip ? 'http-transparent-gzip' : 'native-gzip',
    fullMatrix: config.heroes.length === 12 && config.stages.length === 6 && config.viewports.length === 3,
    scope: 'Render/rig regression only; does not replace campaign, privacy or manual visual QA.',
    bundleSha256: createHash('sha256').update(bundle).digest('hex'), checks: [], errors: [], cases: [], evidence: [], motions: [], actions: [] };
  let server, browser, page, activeCase = 'startup';
  const check = (name, passed) => { report.checks.push({ name, passed: Boolean(passed), case: activeCase }); };
  await mkdir(config.output, { recursive: true });
  const shot = async name => {
    const file = `${name}.png`; await page.screenshot({ path: resolve(config.output, file) }); report.evidence.push({ case: activeCase, file });
  };
  try {
    server = await assetServer(bundle, false, config.httpGzip);
    browser = await chromium.launch({ executablePath: process.env.BQ_QA_CHROME || process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'], timeout: 30000 });
    report.browser = browser.version();
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    await context.addInitScript(() => { if (location.protocol === 'http:') localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, volume: 0, reduced: false })); });
    if (config.rawLibrary) await context.addInitScript(() => { Object.defineProperty(globalThis, 'DecompressionStream', { value: undefined, configurable: true }); });
    await context.route('**/*', route => new URL(route.request().url()).origin === server.origin ? route.continue() : route.abort('blockedbyclient'));
    page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ case: activeCase, type: 'pageerror', message: error.message }));
    page.on('console', msg => { if (msg.type() === 'error') report.errors.push({ case: activeCase, type: 'console', message: msg.text() }); });
    page.on('requestfailed', request => report.errors.push({ case: activeCase, type: 'requestfailed', url: request.url(), error: request.failure()?.errorText }));
    page.on('response', response => { if (response.status() >= 400) report.errors.push({ case: activeCase, type: 'http', status: response.status(), url: response.url() }); });
    if (config.preflight && !config.run) {
      await page.goto('about:blank');
      const response = await fetch(`${server.origin}/qa.js`);
      assert.equal(await response.text(), bundle);
      assert.deepEqual(report.errors, [], 'No browser errors during preflight');
      report.status = 'PREFLIGHT_ONLY';
      console.log('Verified in-memory bundle, ephemeral localhost asset server, and muted blank Chrome. No model regression run.');
      return;
    }
    await page.goto(`${server.origin}/sparkbound/`);
    await page.waitForFunction(() => window.qaReady || window.qaBootError, null, { timeout: 120000 });
    const bootError = await page.evaluate(() => window.qaBootError);
    if (bootError) throw Error(bootError);
    for (const viewport of config.viewports) {
      const [width, height] = VIEWPORTS[viewport]; await page.setViewportSize({ width, height });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const stageSignatures = new Map();
      for (const id of config.heroes) for (const stage of config.stages) {
        activeCase = `${viewport}-${id}-stage-${stage}`;
        try {
          await page.evaluate(({ id, stage, rulesVersion }) => qa.select(id, stage, rulesVersion), { id, stage, rulesVersion });
          const rig = await page.evaluate(() => qa.inspect(qa.world[qa.slot]));
          report.cases.push({ case: activeCase, viewport: { width, height }, id, stage, ...rig });
          assertTrue3dRig(rig, check, activeCase, { id, stage });
          check(`${activeCase}: idle geometry is not sunk below floor by more than 3cm`, rig.bounds.min[1] >= -.03);
          const sockets = await page.evaluate(() => qa.sockets());
          check(`${activeCase}: all sockets follow root translation and rotation`, Object.values(sockets.transformErrors).every(n => n < .0001));
          check(`${activeCase}: authored contact profiles are finite`, sockets.contacts.every(c => c.point.length === 3 && c.point.every(Number.isFinite)));
          const previous = stageSignatures.get(id);
          if (previous) check(`${activeCase}: geometry differs from stage ${previous.stage}`, previous.signature !== rig.geometrySignature);
          stageSignatures.set(id, { stage, signature: rig.geometrySignature });
          const views = [];
          for (const [angle, radians] of Object.entries(ANGLES)) {
            const view = await page.evaluate(radians => qa.view(radians), radians); views.push(view);
            check(`${activeCase}/${angle}: isolated hero has nonblank pixels`, view.pixels.colours > 20 && view.pixels.foreground > 300 && view.pixels.foreground / view.pixels.sampled > .005);
            check(`${activeCase}/${angle}: bounds are inside the camera`, view.projected.every(p => p.every(Number.isFinite) && Math.abs(p[0]) < 1 && Math.abs(p[1]) < 1 && p[2] > -1 && p[2] < 1));
            check(`${activeCase}/${angle}: camera does not billboard the rig`, view.rotation.every((n, i) => Math.abs(n - [0, 0, 0, 1][i]) < 1e-6));
            await shot(`${activeCase}-${angle}`);
          }
          check(`${activeCase}: multi-angle images differ`, new Set(views.map(v => v.pixels.hash)).size >= 3);
          const world = await page.evaluate(() => qa.worldFrame());
          check(`${activeCase}: actual arena frames both heroes`, world.projected.every(p => p.every(Number.isFinite) && Math.abs(p[0]) < 1 && Math.abs(p[1]) < 1 && Math.abs(p[2]) < 1));
          check(`${activeCase}: no renderer errors`, world.errors.length === 0);
          await shot(`${activeCase}-arena`);
          if (stage === 0 || stage === 5) { await page.evaluate(() => qa.groundView()); await shot(`${activeCase}-boot-contact`); }
          for (const motion of MOTIONS) {
            const result = await page.evaluate(({ motion }) => {
              const r = qa.world[qa.slot], before = qa.inspect(r); let impacts = 0, completes = 0;
              r.play('idle', { restart: true, fade: 0 }); r.update(.01);
              const idle = qa.inspect(r), root = r.root.matrixWorld.toArray();
              const timing = r.play(motion, { restart: true, fade: 0, loop: false, onImpact: () => impacts++, onComplete: () => completes++ });
              const samples = [];
              for (const fraction of [.15, .25, .35]) { r.update(timing.duration * fraction); samples.push(qa.inspect(r)); }
              const picture = qa.view(Math.PI / 4, motion === 'guard' || motion === 'charge');
              r.update(timing.duration * 2);
              return { motion, timing, impacts, completes, rootUnchanged: root.every((n, i) => Math.abs(n - r.root.matrixWorld.elements[i]) < 1e-6),
                poseChanged: samples.some(s => s.poseSignature !== idle.poseSignature), imageActive: r.imageActive,
                socketMovement: samples.map(s => s.sockets), geometryBefore: before.geometrySignature, picture };
            }, { motion });
            report.motions.push({ case: activeCase, ...result });
            check(`${activeCase}/${motion}: articulated mesh pose changes`, result.poseChanged);
            check(`${activeCase}/${motion}: no root-only motion or ImageActor`, result.rootUnchanged && result.imageActive === false);
            check(`${activeCase}/${motion}: impact callback count`, result.impacts === (['strike', 'break', 'special'].includes(motion) ? 1 : 0));
            check(`${activeCase}/${motion}: completion callback fires once`, result.completes === 1);
            if (['walk', 'strike', 'guard', 'charge', 'hit', 'special'].includes(motion)) await shot(`${activeCase}-${motion}-sockets`);
          }
          for (const rival of [false, true]) {
            await page.evaluate(args => qa.action(args.id, args.stage, args.rulesVersion, args.rival), { id, stage, rulesVersion, rival });
            const launch = await page.evaluate(stage => qa.actionUntil(stage === 0 ? 'strike' : 'flight'), stage);
            await shot(`${activeCase}-${rival ? 'prism' : 'hero'}-launch`);
            const impact = await page.evaluate(() => qa.actionUntil('impact'));
            await shot(`${activeCase}-${rival ? 'prism' : 'hero'}-impact`);
            const end = await page.evaluate(() => qa.actionUntil('finished'));
            report.actions.push({ case: activeCase, rival, launch, impact, end });
            if (stage > 0) check(`${activeCase}/${rival}: ranged flight begins at muzzle before impact`, launch.phase === 'flight' && launch.launches.length === 1 && launch.launches[0].visible && launch.launches[0].muzzleError < .08 && launch.launches[0].hitsBefore === 0);
            else check(`${activeCase}/${rival}: base stage uses melee with no projectile`, launch.phase === 'strike' && end.launches.length === 0);
            check(`${activeCase}/${rival}: one exact target impact`, end.hits.length === 1 && end.hits[0].part === (rival ? 'rival' : 'player') && end.hits[0].arrivalError < .02 && end.hits[0].eventUnchanged);
            check(`${activeCase}/${rival}: animation settles`, end.finished);
          }
        } catch (error) {
          check(`${activeCase}: completes`, false); report.errors.push({ case: activeCase, type: 'case', message: error.stack });
          await shot(`${activeCase}-failure`).catch(() => {});
        }
        console.log(`${activeCase}: captured`);
      }
    }
    check('All selected hero-stage-viewport cases inspected', report.cases.length === config.heroes.length * config.stages.length * config.viewports.length);
    report.status = report.errors.length || report.checks.some(c => !c.passed) ? 'FAIL' : report.fullMatrix ? 'PASS_AUTOMATED_MANUAL_REVIEW_REQUIRED' : 'PASS_PARTIAL';
    if (report.status === 'FAIL') process.exitCode = 1;
  } catch (error) { report.status = 'FAIL'; report.errors.push({ case: activeCase, type: 'fatal', message: error.stack }); process.exitCode = 1; }
  finally {
    try { await page?.evaluate(() => window.qa?.world.dispose()); } catch { /* Boot may not have created the world. */ }
    await browser?.close(); await server?.close();
    report.assets = Object.fromEntries(server?.assets || []);
    await writeFile(resolve(config.output, 'report.json'), JSON.stringify(report, null, 2));
    const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    await writeFile(resolve(config.output, 'index.html'), `<!doctype html><meta charset="utf-8"><title>True3D QA evidence</title><style>body{font:15px Arial;background:#e9edf0;color:#20252b;margin:24px}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}figure{margin:0}img{width:100%;display:block}figcaption{overflow-wrap:anywhere;padding:8px}a{color:#174f8a}</style><h1>${escape(report.status)}</h1><p>Muted synthetic QA. Manual inspection still required. ${report.checks.filter(c => !c.passed).length} failed checks. <a href="report.json">Full report</a></p><section>${report.evidence.map(e => `<figure><a href="${escape(e.file)}"><img loading="lazy" src="${escape(e.file)}"></a><figcaption>${escape(e.file)}</figcaption></figure>`).join('')}</section>`);
    console.log(JSON.stringify({ status: report.status, checks: report.checks.length, failures: report.checks.filter(c => !c.passed).length, errors: report.errors.length, screenshots: report.evidence.length, output: config.output }, null, 2));
  }
}

async function uiQa(config) {
  const { build } = dependency('esbuild'), { chromium } = dependency('playwright'), sharp = dependency('sharp');
  const { createState, applyAction, publicState } = await import('../functions/_lib/sparkbound.js');
  const { verifyInspectionControls, assertPanelFits, campaignAt } = await import('./qa-sparkbound-expansion.mjs');
  const result = await build({ absWorkingDir: repo, entryPoints: [resolve(repo, 'sparkbound/src/app.ts')], bundle: true, write: false,
    format: 'esm', target: 'es2022', tsconfigRaw: {}, nodePaths: process.env.BQ_NODE_MODULES ? [process.env.BQ_NODE_MODULES] : [] });
  const bundle = result.outputFiles[0].text;
  const profile = { id: 'synthetic-true3d-ui', name: 'Synthetic QA Explorer' };
  let saved = createState({ profileId: profile.id }), server, browser, page;
  const report = { at: new Date().toISOString(), status: 'NOT_RUN', muted: true, synthetic: true, errors: [], checks: [], evidence: [],
    boundary: 'Real current-source app/UI. API responses use the real domain module in memory. No D1, authentication, production, parent or durable-persistence verification.',
    bundleSha256: createHash('sha256').update(bundle).digest('hex') };
  const check = (name, passed = true) => { report.checks.push({ name, passed: Boolean(passed) }); assert.ok(passed, name); };
  await mkdir(config.output, { recursive: true });
  const shot = async name => {
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.screenshot({ path: resolve(config.output, `${name}.png`) }); report.evidence.push(`${name}.png`);
  };
  try {
    server = await assetServer(bundle, true, config.httpGzip);
    browser = await chromium.launch({ executablePath: process.env.BQ_QA_CHROME || process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
    if (config.rawLibrary) await context.addInitScript(() => { Object.defineProperty(globalThis, 'DecompressionStream', { value: undefined, configurable: true }); });
    await context.addInitScript(id => {
      localStorage.setItem('bqSparkSettings', JSON.stringify({ sound: false, volume: 0, reduced: false }));
      localStorage.setItem(`bqSparkGuide:launcher-v1:${id}`, 'true');
    }, profile.id);
    await context.route('**/*', async route => {
      const request = route.request(), url = new URL(request.url());
      if (url.origin !== server.origin) return route.abort('blockedbyclient');
      if (url.pathname === '/api/sparkbound') {
        try {
          if (request.method() === 'POST') {
            const body = request.postDataJSON(); assert.equal(body.version, saved.version, 'UI sends the confirmed fixture version');
            saved = applyAction(saved, body.action);
          } else assert.equal(request.method(), 'GET');
          return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ state: publicState(saved), profile }) });
        } catch (error) {
          report.errors.push({ type: 'fixture', message: error.stack });
          return route.fulfill({ status: 400, contentType: 'application/json', body: JSON.stringify({ error: error.message }) });
        }
      }
      if (url.pathname.startsWith('/api/')) { report.errors.push({ type: 'unexpected-api', path: url.pathname }); return route.abort(); }
      return route.continue();
    });
    page = await context.newPage();
    page.on('pageerror', error => report.errors.push({ type: 'pageerror', message: error.message }));
    page.on('console', msg => { if (msg.type() === 'error') report.errors.push({ type: 'console', message: msg.text() }); });
    page.on('requestfailed', request => report.errors.push({ type: 'requestfailed', url: request.url(), message: request.failure()?.errorText }));
    page.on('response', response => { if (response.status() >= 400) report.errors.push({ type: 'http', url: response.url(), status: response.status() }); });
    const settled = () => page.waitForFunction(() => window.__SPARK_QA__?.world.relay.ready && !window.__SPARK_QA__.acting && document.querySelector('#game')?.getAttribute('aria-busy') === 'false', null, { timeout: 120000 });
    const state = () => page.evaluate(() => window.__SPARK_QA__.state);
    const click = async action => { await page.locator(`[data-action="${action}"]`).first().click(); await settled(); };
    for (const viewport of config.viewports) {
      const [width, height] = VIEWPORTS[viewport]; await page.setViewportSize({ width, height });
      saved = createState({ profileId: profile.id });
      await page.goto(`${server.origin}/sparkbound/`); await settled();
      await assertPanelFits(page, '.hangar-panel', check, `${viewport} hangar`); await shot(`${viewport}-hangar`);
      await verifyInspectionControls({ page, state, check, shot, label: viewport, touch: viewport !== 'desktop' });
      for (const id of config.heroes.filter(id => id !== 'prism')) {
        await page.locator(`[data-hero="${id}"]`).click();
        for (const stage of config.stages) {
          await page.locator(`[data-stage="${stage}"]`).click();
          const handle = await page.evaluateHandle(() => window.__SPARK_QA__.world.relay);
          let rig; try { rig = await handle.evaluate(inspectTrue3dRig); } finally { await handle.dispose(); }
          assertTrue3dRig(rig, check, `${viewport}/${id}/${stage}`, { id, stage });
          const stats = await sharp(await page.locator('#scene').screenshot()).stats();
          check(`${viewport}/${id}/${stage}: nonblank actual UI canvas`, stats.channels.slice(0, 3).every(c => c.stdev > 12));
          check(`${viewport}/${id}/${stage}: preview has not created a match`, !(await state()).match);
          await shot(`${viewport}-${id}-preview-${stage}`);
        }
        await click('path'); await assertPanelFits(page, '.path-panel', check, `${viewport}/${id} path`);
        await shot(`${viewport}-${id}-path`); await click('path-back');
      }
      for (const stage of config.stages) {
        saved = campaignAt(profile.id, 'relay', m => m.phase === 'battle' && m.round === stage + 1);
        await page.reload(); await settled();
        await assertPanelFits(page, '.battle-console', check, `${viewport}/round-${stage + 1} battle`);
        await shot(`${viewport}-battle-stage-${stage}`);
        const start = await page.evaluate(() => window.__SPARK_QA__.world.frame);
        await page.waitForTimeout(250);
        check(`${viewport}/${stage}: actual RAF loop advances`, await page.evaluate(start => window.__SPARK_QA__.world.frame > start, start));
        await click('settings'); await click('hangar'); await click('arena');
        check(`${viewport}/${stage}: hangar back path restores active match`, (await state()).match.round === stage + 1);
      }
      console.log(`${viewport}: real UI previews, rotation, drag, path and battle evidence captured`);
    }
    check('No UI browser or asset errors', report.errors.length === 0);
    report.status = 'PASS_UI_ONLY_MANUAL_REVIEW_REQUIRED';
  } catch (error) { report.status = 'FAIL'; report.errors.push({ type: 'fatal', message: error.stack }); process.exitCode = 1; await shot('failure').catch(() => {}); }
  finally {
    await browser?.close(); await server?.close(); report.assets = Object.fromEntries(server?.assets || []);
    await writeFile(resolve(config.output, 'ui-report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ status: report.status, checks: report.checks.length, errors: report.errors, screenshots: report.evidence.length, output: config.output }, null, 2));
  }
}

async function selfTest() {
  const valid = { model: TRUE3D_MODEL, imageActive: false, actorNodes: [], ready: true, visible: true, id: 'relay', stage: 0, invalidVertices: 0,
    meshes: Array.from({ length: 3 }, () => ({ solid: true, attached: true })), bounds: { min: [-1, 0, -1], max: [1, 4, 1] },
    reportedBounds: { min: [-1, 0, -1], max: [1, 4, 1] }, sockets: { weaponTip: [0, 2, 1], contactPoint: [0, 2, 1], shieldPoint: [0, 2, 0] } };
  const passes = rig => { const results = []; assertTrue3dRig(rig, (_name, passed) => results.push(Boolean(passed)), 'fixture', { id: 'relay', stage: 0 }); return results.every(Boolean); };
  assert.ok(passes(valid));
  for (const mutation of [{ imageActive: true }, { actorNodes: ['generated-image-actor'] }, { meshes: [{ solid: false, attached: true }] },
    { meshes: [{ solid: true, attached: false }] }, { stage: 5 }, { id: 'prism' }, { invalidVertices: 1 }, { sockets: { weaponTip: [NaN, 2, 0] } },
    { reportedBounds: { min: [0, 1, 0], max: [0, 2, 0] } }]) assert.ok(!passes({ ...valid, ...mutation }), JSON.stringify(mutation));
  assert.throws(() => options(['--heroes=unknown'])); assert.throws(() => options(['--stages=6'])); assert.throws(() => options(['--viewports=watch']));
  const THREE = await import('../cave-river-quest/vendor/three.module.js');
  const root = new THREE.Group(); root.userData = { model: TRUE3D_MODEL, heroId: 'relay', equipmentStage: 0 };
  const bone = new THREE.Bone(); root.add(bone);
  for (let i = 0; i < 3; i++) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
    mesh.position.y = i; bone.add(mesh);
  }
  const rig = { root, imageActive: false, ready: true, visualBounds: () => new THREE.Box3().setFromObject(root),
    weaponTip: new THREE.Vector3(0, 1, 0), contactPoint: new THREE.Vector3(0, 1, 0), shieldPoint: new THREE.Vector3(0, 1, 0) };
  assert.ok(passes(inspectTrue3dRig(rig)), 'Actual box geometry passes');
  bone.children.forEach(mesh => { mesh.geometry.dispose(); mesh.geometry = new THREE.PlaneGeometry(1, 1); mesh.rotation.set(.4, .7, .2); });
  assert.ok(inspectTrue3dRig(rig).meshes.every(mesh => !mesh.solid), 'Rotated planes cannot masquerade as volumetric geometry');
  assert.ok(!passes(inspectTrue3dRig(rig)));
  bone.children.forEach(mesh => { mesh.geometry.dispose(); mesh.material.dispose(); });
  console.log('True3D harness self-test passed: valid rig, nine defect fixtures, actual box/rotated-plane geometry, and invalid CLI filters. No browser or models loaded.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
