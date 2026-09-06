import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { Miniflare } from 'miniflare';
const mf = new Miniflare({ modules: true, compatibilityDate: '2026-05-14',
  script: await readFile(resolve('../outputs/sparkbound-build/expansion-pages-worker/index.js'), 'utf8'),
  serviceBindings: { ASSETS: async () => new Response('static-fallback') }
});
try {
  for (const path of ['/tools/test-sparkbound-expansion-content.mjs', '/tools/test-sparkbound-roster.mjs', '/tools/nested/fixture.js', '/sparkbound/content.js']) {
    const r = await mf.dispatchFetch(`http://localhost${path}`);
    assert.equal(r.status, 404, path);
    assert.equal(r.headers.get('cache-control'), 'no-store');
    assert.equal(await r.text(), 'Not found');
  }
  for (const path of ['/sparkbound/', '/sparkbound/roster.js', '/sparkbound/assets/heroes/helio-2.jpg', '/']) {
    const r = await mf.dispatchFetch(`http://localhost${path}`);
    assert.equal(r.status, 200, path);
    assert.equal(await r.text(), 'static-fallback');
  }
  console.log('8 compiled Pages routing checks passed. Local-only; no live requests.');
} finally { await mf.dispose(); }
