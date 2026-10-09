import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Miniflare } from 'miniflare';
import { onRequest } from '../functions/_middleware.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = resolve(root, 'outputs/private-routes-qa');
const denied = [
  '/tools/test-dragon-grove-domain.mjs', '/tools/nested/fixture.js', '/tools',
  '/tools%2Ftest-skyforge-api.mjs', '/%74ools%2ftest-skyforge-api.mjs',
  '/tools%252Ftest-skyforge-api.mjs', '/tools%25252Ftest-skyforge-api.mjs',
  '/TOOLS%5csecret.js', '//tools///secret.js', '/public%2f..%2ftools%2fsecret.js',
  '/public%252f..%252ftools%252fsecret.js', '/tools%2F.%2Fsecret.js',
  '/functions/_lib/dragon-grove-content.js', '/functions%2F_lib%2Fdragon-grove-content.js',
  '/_lib/dragon-grove-content', '/%5flib/dragon-grove-content',
  '/__sparkbound-qa__/health', '/__skyforge-graphics-test', '/__beacon-qa__/fixture',
  '/__dragon-grove-qa__/state', '/__dragon-qa__/state',
  '/sparkbound/content.js', '/sparkbound%2Fcontent.js', '/sparkbound%252fcontent.js',
  '/sparkbound/content%2ejs', '/sparkbound/content.js.map', '/sparkbound/content.js/extra'
];
const allowed = [
  '/', '/index.html', '/dragon-grove/', '/dragon-grove/game.js', '/dragon-grove/storage.js',
  '/dragon-grove/assets/dragon.glb', '/dragon-grove/assets/audio/enchanted-valley.mp3',
  '/skyforge/', '/skyforge/assets/key-art.webp', '/beacon-brigade/',
  '/sparkbound/', '/sparkbound/roster.js', '/sparkbound/assets/heroes/helio-2.jpg',
  '/docs/design/dragon-grove-plan-2026-10-09.md', '/docs/my%20notes.md', '/docs/100%25-complete.md',
  '/toolsmith/game.js', '/api/dragon-grove', '/api/skyforge', '/api/auth/config'
];
let unitChecks = 0, compiledChecks = 0;
for (const path of denied) {
  let next = false;
  const response = await onRequest({ request: new Request('https://example.invalid' + path), next: () => { next = true; return new Response('unexpected'); } });
  assert.equal(response.status, 404, path); assert.equal(await response.text(), 'Not found', path);
  assert.equal(response.headers.get('cache-control'), 'no-store'); assert.equal(next, false); unitChecks += 4;
}
for (const path of allowed) {
  const response = await onRequest({ request: new Request('https://example.invalid' + path), next: () => new Response('allowed') });
  assert.equal(await response.text(), 'allowed', path); unitChecks++;
}
for (const path of ['/tools%00/secret.js', '/tools%FF/secret.js', '/tools%ZZ/secret.js']) {
  const response = await onRequest({ request: new Request('https://example.invalid' + path), next: () => new Response('unexpected') });
  assert.equal(response.status, 400, path); unitChecks++;
}
const head = await onRequest({ request: new Request('https://example.invalid/tools%2Fsecret.js', { method: 'HEAD' }), next: () => new Response('unexpected') });
assert.equal(head.status, 404); assert.equal(await head.text(), ''); unitChecks += 2;

await mkdir(out, { recursive: true });
const build = spawnSync(process.execPath, [resolve(root, 'node_modules/wrangler/bin/wrangler.js'), 'pages', 'functions', 'build',
  '--outdir', resolve(out, 'worker'), '--output-routes-path', resolve(out, 'routes.json'), '--compatibility-date=2026-05-14'],
  { cwd: root, env: { ...process.env, WRANGLER_SEND_METRICS: 'false' }, encoding: 'utf8', windowsHide: true });
assert.equal(build.status, 0, build.stdout + build.stderr);
const routes = JSON.parse(await readFile(resolve(out, 'routes.json'), 'utf8'));
assert(routes.include.includes('/*'), 'root middleware must run before every possible encoded static path');
assert(!routes.exclude?.length, 'private routes must not bypass middleware'); compiledChecks += 2;
const mf = new Miniflare({ modules: true, compatibilityDate: '2026-05-14',
  script: await readFile(resolve(out, 'worker/index.js'), 'utf8'), d1Databases: ['DB'], d1Persist: false,
  bindings: { BQ_FAMILY_AUTH_ENABLED: 'true', BQ_FAMILY_AUTH_MIGRATION_READY: 'true', BQ_LEGACY_API_ENABLED: 'false' },
  serviceBindings: { ASSETS: async () => new Response('public-static-asset', { headers: { 'x-test-assets': 'true' } }) }
});
try {
  for (const path of denied) {
    const response = await mf.dispatchFetch('http://localhost' + path);
    assert.equal(response.status, 404, path); assert.equal(await response.text(), 'Not found', path);
    assert.equal(response.headers.get('cache-control'), 'no-store'); compiledChecks += 3;
  }
  for (const path of allowed.filter(path => !path.startsWith('/api/'))) {
    const response = await mf.dispatchFetch('http://localhost' + path);
    assert.equal(response.status, 200, path); assert.equal(await response.text(), 'public-static-asset', path); compiledChecks += 2;
  }
  for (const path of ['/api/dragon-grove', '/api/skyforge', '/api/sparkbound', '/api/beacon-brigade']) {
    const response = await mf.dispatchFetch('http://localhost' + path);
    assert.equal(response.status, 401, path); assert((await response.json()).error); compiledChecks += 2;
  }
  const config = await mf.dispatchFetch('http://localhost/api/auth/config');
  assert.equal(config.status, 200); assert.equal((await config.json()).enabled, true); compiledChecks += 2;
  console.log(`Private asset guard passed: ${unitChecks} canonicalisation assertions and ${compiledChecks} compiled Pages runtime assertions. Public game art/docs and authenticated API routing preserved. Root middleware deliberately covers all requests.`);
} finally { await mf.dispose(); }
