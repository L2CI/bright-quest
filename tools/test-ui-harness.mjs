import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { startSparkboundQa } from "./serve-sparkbound-qa.mjs";

// A separate ephemeral family and D1; never uses the manually running QA server.
const harness = await startSparkboundQa({ port: 0 });
const result = { synthetic: true, persistence: "ephemeral", checks: [] };
try {
  const f = harness.fixture;
  const headers = { cookie: `bq_session=${f.cookie.value}`, "x-bq-child-capability": f.childCapability, "x-bq-child-id": f.childId };
  const snapshot = async () => (await harness.db.prepare("SELECT id,payload_json,version,stars FROM child_profiles ORDER BY id").all()).results;
  const before = await snapshot();
  const portalResponse = await fetch(harness.origin + "/");
  const portalHtml = await portalResponse.text();
  assert.equal(portalResponse.status, 200);
  assert.match(portalHtml, /Local test preview/);
  assert.match(portalHtml, /Fictional accounts only\. Your real login will not work here\./);
  assert.match(portalHtml, /href="https:\/\/bright-quest\.pages\.dev\/"/);
  result.checks.push({ name: "Synthetic preview is clearly labelled and links to the live app", passed: true });
  for (const path of ["/api/sparkbound", "/api/beacon-brigade"]) {
    const response = await fetch(harness.origin + path, { headers, signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 200, path);
    assert.ok((await response.json()).state, path);
    result.checks.push({ name: `${path} is available for the same synthetic child`, passed: true });
  }
  assert.equal((await harness.db.prepare("SELECT count(*) AS n FROM sparkbound_states").first()).n, 0, "Read-only Sparkbound entry does not create a saved game");
  assert.equal((await harness.db.prepare("SELECT count(*) AS n FROM beacon_brigade_states").first()).n, 0, "Read-only Beacon entry does not create a saved game");
  assert.deepEqual(await snapshot(), before);
  result.checks.push({ name: "Games use separate state tables and leave child profiles unchanged", passed: true });
  result.passed = true;
  const out = new URL("../../outputs/brightquest-uplift-qa-2026-09-28/", import.meta.url);
  await mkdir(fileURLToPath(out), { recursive: true });
  await writeFile(new URL("unified-harness-smoke.json", out), JSON.stringify(result, null, 2));
  console.log("Unified UI harness: both game APIs passed; separate game states and unchanged child profiles confirmed.");
} finally {
  await harness.close();
}
