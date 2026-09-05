import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { QUESTION_TEMPLATES, createQuestion } from '../beacon-brigade/content.js';

// Uses only an ephemeral local harness; never rebuilds or edits the game bundle.
const repo = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.BQ_PLAYWRIGHT_MODULE || 'playwright');
const out = process.env.BQ_FIELD_LAB_OUTPUT || join(tmpdir(), 'beacon-field-lab-qa');
const result = await build({ absWorkingDir: repo, tsconfigRaw: {}, entryPoints: [resolve(repo, 'beacon-brigade/src/field-lab.ts')], bundle: true,
  write: false, format: 'esm', platform: 'browser', target: 'es2022', logLevel: 'silent' });
const moduleCode = result.outputFiles[0].text;
const api = await import(`data:text/javascript;base64,${Buffer.from(moduleCode).toString('base64')}`);
const publicQuestions = QUESTION_TEMPLATES.flatMap(template => template.instances.map((_, i) => {
  const q = createQuestion(template.id, i);
  return { id: q.id, subject: q.subject, diagram: q.diagram };
}));
let supported = 0;
for (const q of publicQuestions) {
  const protectedQuestion = { ...q };
  for (const key of ['answer', 'options', 'explanation', 'parameters']) {
    Object.defineProperty(protectedQuestion, key, { get() { throw new Error(`Read hidden ${key}`); } });
  }
  const rendered = api.renderFieldLab(protectedQuestion);
  const expected = ['groups', 'sharing'].includes(q.diagram.kind) || (q.diagram.kind === 'table' && q.subject !== 'english');
  assert.equal(Boolean(rendered), expected, q.id);
  if (rendered) supported++;
}
for (const diagram of [null, {}, { kind: 'sharing', total: -1, groups: 6 },
  { kind: 'sharing', total: 3.5, groups: 2 }, { kind: 'groups', groups: 100, itemsPerGroup: 100, reserved: 0 },
  { kind: 'table', columns: ['A', 'B'], rows: [['A'], ['B']] }]) {
  assert.equal(api.renderFieldLab({ id: 'invalid', diagram }), '');
}
const hostile = api.renderFieldLab({ id: '"><img src=x onerror=alert(1)>', subject: 'science',
  diagram: { kind: 'table', label: '<script>bad()</script>', columns: ['Name', 'Value'], rows: [['<img>', '"'], ['&', 3]] } });
assert.ok(!hostile.includes('<img') && !hostile.includes('<script>'));

const [css, gameCss] = await Promise.all([
  readFile(resolve(repo, 'beacon-brigade/field-lab.css'), 'utf8'),
  readFile(resolve(repo, 'beacon-brigade/beacon.css'), 'utf8')
]);
const harness = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Beacon field lab QA</title><style>${gameCss}\n${css}\nhtml,body{height:auto;overflow:auto;background:#e8eeeb}main#game{height:auto;min-height:0;overflow:visible;max-width:580px;margin:24px auto;padding:16px;background:white}h1{font-size:20px}#answer-input{max-width:100%}</style><main id="game"><h1>Station field lab</h1><div id="host"></div><label>Your answer<input id="answer-input" value="untouched"></label><button type="button" data-action="outside">Outside action</button></main><script type="module">
import * as lab from '/lab.js';
const root = document.querySelector('#game');
window.lab = lab; window.outside = 0; window.submissions = 0;
window.mount = question => { window.question = question; document.querySelector('#host').innerHTML = lab.renderFieldLab(question); };
root.addEventListener('click', e => { const button = e.target.closest('[data-action^="field-lab-"]'); if (button && lab.handleFieldLabClick(button, root)) return; if(e.target.closest('[data-action]')) window.outside++; });
root.addEventListener('input', e => { lab.handleFieldLabInput(e.target, root); });
root.addEventListener('submit', e => { e.preventDefault(); window.submissions++; });
window.ready = true;
</script></html>`;
const server = createServer((req, res) => {
  res.setHeader('Content-Type', req.url === '/lab.js' ? 'text/javascript' : 'text/html');
  res.end(req.url === '/lab.js' ? moduleCode : harness);
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
const errors = [];
const screenshots = [];
try {
  browser = await chromium.launch({ headless: true,
    ...(process.env.BQ_BROWSER_PATH ? { executablePath: process.env.BQ_BROWSER_PATH } : process.platform === 'win32' ? { executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  await page.goto(origin);
  await page.waitForFunction(() => window.ready);
  const pick = (id, variant = 0) => publicQuestions.find(q => q.id === `${id}:v1:${variant}`);
  const mount = async q => {
    await page.evaluate(q => window.mount(q), q);
    if (!(await page.locator('.field-lab').getAttribute('open') === '')) await page.locator('.field-lab > summary').click();
  };
  const click = action => page.locator(`[data-action="field-lab-${action}"]`).click();
  const metric = label => page.locator('.fl-metric').filter({ has: page.locator('span', { hasText: new RegExp(`^${label}$`) }) }).locator('strong').textContent();
  const counts = () => page.locator('.fl-kit h4 strong').allTextContents();
  const input = (type, index) => page.locator(`[data-fl-input="${type}"][data-fl-index="${index}"]`);
  const kit = (action, index) => page.locator(`[data-action="field-lab-${action}"][data-fl-index="${index}"]`);
  const screenshot = async name => {
    const path = join(out, `${name}.png`);
    await page.screenshot({ path, fullPage: true });
    screenshots.push(path);
  };
  await mkdir(out, { recursive: true });
  await mount(pick('harbour-equal-packs'));
  assert.equal(await metric('Washers left'), '36');
  await kit('give', 0).click();
  assert.equal(await metric('Washers left'), '35');
  assert.match(await page.locator('.fl-status').textContent(), /different amounts/);
  await click('round');
  assert.deepEqual(await counts(), ['2', '1', '1', '1', '1', '1']);
  await click('undo');
  assert.deepEqual(await counts(), ['1', '0', '0', '0', '0', '0']);
  await page.evaluate(() => window.mount(window.question));
  assert.equal(await metric('Washers left'), '35');
  assert.equal(await page.locator('.field-lab').getAttribute('open'), '');
  await kit('take', 0).click();
  assert.equal(await metric('Washers left'), '36');
  for (let i = 0; i < 6; i++) await click('round');
  assert.deepEqual(await counts(), Array(6).fill('6'));
  assert.equal(await metric('Washers left'), '0');
  assert.ok(await kit('give', 0).isDisabled());
  assert.ok(await page.locator('[data-action="field-lab-round"]').isDisabled());
  await screenshot('sharing-desktop');
  await mount(pick('harbour-equal-packs', 1));
  assert.equal(await metric('Washers left'), '48');
  await mount(pick('harbour-equal-packs'));
  assert.equal(await metric('Washers left'), '0');
  await click('reset');
  assert.equal(await metric('Washers left'), '36');
  await mount({ id: 'remainder', diagram: { kind: 'sharing', total: 7, groups: 3 } });
  await click('round'); await click('round');
  assert.equal(await metric('Washers left'), '1');
  assert.ok(await page.locator('[data-action="field-lab-round"]').isDisabled());
  await kit('give', 2).click();
  assert.deepEqual(await counts(), ['2', '2', '3']);
  await kit('take', 2).click();
  await click('undo');
  assert.equal(await metric('Washers left'), '0');

  await mount(pick('harbour-crate-reserve'));
  const piece = index => page.locator(`[data-action="field-lab-piece"][data-fl-index="${index}"]`);
  for (let i = 0; i < 24; i++) await piece(i).click();
  assert.equal(await metric('Counted'), '24');
  await click('reserve');
  for (let i = 0; i < 9; i++) await piece(i).click();
  assert.equal(await metric('Set aside'), '9 / 9');
  assert.equal(await metric('Counted, not set aside'), '15');
  await page.evaluate(() => window.mount(window.question));
  assert.equal(await metric('Set aside'), '9 / 9');
  await piece(0).click();
  assert.equal(await metric('Counted, not set aside'), '16');
  await screenshot('crates-desktop');
  await click('reset');
  assert.equal(await metric('Counted'), '0');
  assert.equal(await metric('Set aside'), '0 / 9');

  await mount(pick('grove-fair-ramp'));
  assert.equal(await page.locator('.fl-comparison table').count(), 0);
  await input('row', 0).check(); await input('row', 1).check();
  assert.ok(await input('row', 2).isDisabled());
  assert.equal(await page.locator('tbody tr').count(), 4);
  assert.equal(await page.locator('tbody th small').filter({ hasText: 'Same entry' }).count(), 3);
  assert.equal(await page.locator('tbody th small').filter({ hasText: 'Different entries' }).count(), 1);
  await input('column', 2).uncheck();
  assert.equal(await page.locator('tbody tr').count(), 3);
  await page.evaluate(() => window.mount(window.question));
  assert.ok(await input('row', 0).isChecked());
  assert.ok(!(await input('column', 2).isChecked()));
  await input('row', 1).uncheck(); await input('row', 2).check();
  await input('column', 2).check();
  assert.equal(await page.locator('tbody th small').filter({ hasText: 'Different entries' }).count(), 2);
  await page.locator('.fl-notes summary').click();
  await screenshot('compare-desktop');
  for (let i = 1; i < 5; i++) await input('column', i).uncheck();
  assert.match(await page.locator('.fl-status').textContent(), /No evidence columns/);
  await click('reset');
  await input('row', 0).focus(); await page.keyboard.press('Space');
  assert.ok(await input('row', 0).isChecked());
  assert.ok(await input('row', 0).evaluate(el => document.activeElement === el));
  await page.locator('.field-lab > summary').click();
  await page.evaluate(() => window.mount(window.question));
  assert.equal(await page.locator('.field-lab').getAttribute('open'), null);

  for (const width of [375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, q] of [['sharing', pick('harbour-equal-packs', 1)], ['crates', pick('harbour-crate-reserve', 1)], ['compare', pick('chemistry-material-properties')]]) {
      await mount(q);
      await click('reset');
      if (name === 'sharing') { await click('round'); await click('round'); }
      if (name === 'crates') { await piece(0).click(); await click('reserve'); await piece(0).click(); }
      if (name === 'compare') { await input('row', 0).check(); await input('row', 1).check(); }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: horizontal overflow at ${width}`);
      const small = await page.locator('.field-lab button, .field-lab > summary, .field-lab .fl-choice').evaluateAll(elements => elements.filter(el => {
        const r = el.getBoundingClientRect(); return r.width > 0 && (r.width < 44 || r.height < 44);
      }).map(el => el.outerHTML));
      assert.deepEqual(small, [], `${name}: touch targets`);
      const clipped = await page.locator('.field-lab button, .field-lab th, .field-lab td').evaluateAll(elements => elements.filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent));
      assert.deepEqual(clipped, [], `${name}: clipped text`);
      await screenshot(`${name}-${width}`);
    }
  }
  // Same ID with changed public evidence resets stale manipulative data.
  await mount({ id: 'changed', diagram: { kind: 'sharing', total: 8, groups: 2 } });
  await click('round');
  await mount({ id: 'changed', diagram: { kind: 'sharing', total: 10, groups: 2 } });
  assert.equal(await metric('Washers left'), '10');
  assert.equal(await page.locator('#answer-input').inputValue(), 'untouched');
  assert.equal(await page.evaluate(() => window.outside), 0);
  assert.equal(await page.evaluate(() => window.submissions), 0);
  assert.equal(await page.evaluate(() => window.lab.handleFieldLabClick(document.querySelector('.fl-command'), document.createElement('div'))), false);
  await page.locator('[data-action="outside"]').click();
  assert.equal(await page.evaluate(() => window.outside), 1);
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: true, supportedQuestions: supported, tested: ['hidden-field guards', 'validation and escaping', 'sharing conservation/undo/remainders', 'crate counting/reserving/reset', 'science row/column comparison', 'state across rerenders and variants', 'keyboard and touch targets', 'event and answer isolation', 'desktop/375px/320px layouts'], screenshots }, null, 2));
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}
