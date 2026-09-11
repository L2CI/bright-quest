import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { request as httpRequest } from "node:http";
import { startSparkboundQa } from "./serve-sparkbound-qa.mjs";
import { applyAction } from "../functions/_lib/sparkbound.js";
import { onRequestGet, onRequestPost } from "../functions/api/sparkbound.js";
import { renderSparkboundEvidence } from "../sparkbound-parent.js";
import { HEROES } from "../sparkbound/roster.js";

assert.ok(existsSync(new URL("../functions/_lib/sparkbound-content.js", import.meta.url)), "Answer bank must exist in the server-only Functions directory");
assert.equal(existsSync(new URL("../sparkbound/content.js", import.meta.url)), false, "Answer bank must not exist in the public Pages asset tree");
const harness = await startSparkboundQa({ port: 0 });
const { origin, fixture: f, db } = harness;
const headersFor = (fixture) => ({ cookie: `bq_session=${fixture.cookie.value}`,
  "x-bq-child-capability": fixture.childCapability, "x-bq-child-id": fixture.childId,
  "content-type": "application/json" });
const childHeaders = headersFor(f);
const parentHeaders = { ...childHeaders, "x-bq-parent-capability": f.parentCapability };
const foreignHeaders = headersFor(f.otherFamily);
const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true" };
async function request(path = "/api/sparkbound", { headers = childHeaders, body, raw } = {}) {
  const response = await fetch(`${origin}${path}`, { headers, ...(body === undefined && raw === undefined ? {} : {
    method: "POST", body: raw ?? JSON.stringify(body) }) });
  const payload = await response.json();
  return { status: response.status, body: payload, headers: response.headers };
}
const get = () => request();
const review = () => request(`/api/sparkbound?childId=${f.legacyId}`, { headers: parentHeaders });
const operation = (version, action) => ({ version, action, operationId: crypto.randomUUID() });
async function command(action) {
  const current = await get();
  const result = await request("/api/sparkbound", { body: operation(current.body.state.version, action) });
  assert.equal(result.status, 200, JSON.stringify(result.body));
  assert.equal(result.body.state.version, current.body.state.version + 1);
  assertRedacted(result.body.state);
  return result.body.state;
}
async function privateState() {
  const row = await db.prepare("SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?").bind(f.familyId, f.childId).first();
  return JSON.parse(row.state_json);
}
function assertRedacted(state) {
  for (const q of state.match?.questions || []) {
    for (const key of ["answer", "hints", "explanation", "attempts"]) assert.equal(Object.hasOwn(q, key), false, `${q.id}: ${key} leaked`);
  }
  for (const match of state.history) assert.equal(Object.hasOwn(match, "questions"), false);
  assert.equal(Object.hasOwn(state.match || {}, "seed"), false);
}
function chooseMove(state) {
  const candidates = ["strike", "guard", "break", "special"].flatMap((move) => {
    try {
      const next = applyAction(state, { type: "move", move });
      const m = next.match;
      const score = m.phase === "defeat" ? -10000 : m.phase === "round_won" ? 10000 :
        (state.match.rivalHP - m.rivalHP) * 5 - (state.match.playerHP - m.playerHP) * 3 + m.energy;
      return [{ move, score }];
    } catch { return []; }
  }).sort((a, b) => b.score - a.score);
  assert.ok(candidates.length);
  return candidates[0].move;
}

try {
  const untouchedProfiles = (await db.prepare("SELECT * FROM child_profiles ORDER BY id").all()).results;
  assert.equal((await request("/api/sparkbound", { headers: {} })).status, 401);
  assert.equal((await request("/api/sparkbound", { headers: { cookie: childHeaders.cookie } })).status, 409);
  assert.equal((await request(`/api/sparkbound?childId=${f.childId}`)).body.code, "PARENT_PIN_REQUIRED");
  assert.equal((await request(`/api/sparkbound?childId=${f.otherFamily.childId}`, { headers: parentHeaders })).status, 404);
  assert.equal((await request(`/api/sparkbound?childId=${f.otherFamily.legacyId}`, { headers: parentHeaders })).status, 404);
  assert.equal((await request("/api/sparkbound?childId=", { headers: parentHeaders })).status, 400);
  const initial = await get();
  assert.equal(initial.body.state.version, 0);
  assert.equal(initial.body.profile.id, f.childId);
  assert.equal(initial.headers.get("cache-control"), "no-store");
  assert.equal((await review()).body.profile.id, f.childId);
  assert.equal((await request(`/api/sparkbound?childId=${f.children[1].legacyId}`, { headers: parentHeaders })).body.state.match, null);
  assert.equal((await db.prepare("SELECT count(*) AS n FROM sparkbound_states").first()).n, 0);

  const first = operation(0, { type: "start" });
  for (const [body, code] of [
    [{ ...first, version: -1 }, "INVALID_VERSION"], [{ ...first, operationId: "short" }, "INVALID_OPERATION_ID"],
    [{ ...first, state: {} }, "INVALID_REQUEST"], [{ ...first, action: { type: "start", at: "fake" } }, "INVALID_ACTION"]
  ]) assert.equal((await request("/api/sparkbound", { body })).body.code, code);
  assert.equal((await request("/api/sparkbound", { raw: "{" })).status, 400);
  assert.equal((await request("/api/sparkbound", { body: first, headers: { ...childHeaders, "content-type": "text/plain" } })).status, 415);
  assert.equal((await request("/api/sparkbound", { raw: JSON.stringify({ padding: "x".repeat(9000) }) })).status, 413);
  assert.equal((await request("/api/sparkbound", { body: first, headers: { ...childHeaders, "x-bq-child-id": f.children[1].id } })).body.code, "CHILD_CHANGED");
  assert.equal((await request(`/api/sparkbound?childId=${f.childId}`, { body: first })).status, 403);
  const crossOrigin = await onRequestPost({ env, request: new Request(`${origin}/api/sparkbound`, {
    method: "POST", headers: { ...childHeaders, origin: "https://foreign.invalid" }, body: JSON.stringify(first) }) });
  assert.equal(crossOrigin.status, 403);
  assert.equal((await onRequestGet({ env: { ...env, BQ_FAMILY_AUTH_ENABLED: "false" }, request: new Request(`${origin}/api/sparkbound`, { headers: childHeaders }) })).status, 503);

  const duplicate = await Promise.all([request("/api/sparkbound", { body: first }), request("/api/sparkbound", { body: first })]);
  assert.deepEqual(duplicate.map((r) => r.status), [200, 200]);
  assert.equal((await get()).body.state.version, 1);
  assertRedacted(duplicate[0].body.state);
  assert.equal((await request("/api/sparkbound", { body: { ...first, action: { type: "reset" } } })).body.code, "OPERATION_ID_REUSED");
  assert.equal((await request("/api/sparkbound", { body: operation(0, { type: "move", move: "strike" }) })).body.code, "STALE_STATE");
  const beforeRace = (await get()).body.state;
  const race = await Promise.all(["strike", "guard"].map((move) => request("/api/sparkbound", { body: operation(beforeRace.version, { type: "move", move }) })));
  assert.deepEqual(race.map((r) => r.status).sort(), [200, 409]);
  assert.equal((await get()).body.state.version, 2);

  // A failed receipt write must roll the state update back as part of the same D1 batch.
  await db.exec("CREATE TRIGGER sparkbound_qa_failure BEFORE INSERT ON sparkbound_operations BEGIN SELECT RAISE(ABORT, 'Synthetic receipt failure'); END;");
  const rollbackState = await privateState();
  const failed = await request("/api/sparkbound", { body: operation(rollbackState.version, { type: "move", move: "strike" }) });
  assert.equal(failed.status, 500);
  assert.deepEqual(await privateState(), rollbackState);
  await db.exec("DROP TRIGGER sparkbound_qa_failure;");

  let originalAnswer;
  let originalQuestionId;
  let transitions = 0;
  while ((await get()).body.state.match.phase !== "victory") {
    assert.ok(++transitions < 200, "Full match must terminate");
    const state = await privateState();
    const match = state.match;
    if (match.phase === "battle") await command({ type: "move", move: chooseMove(state) });
    else if (match.phase === "defeat") await command({ type: "retry", support: true });
    else if (match.phase === "training") {
      const q = match.questions[match.questionIndex];
      if (!originalQuestionId) {
        originalQuestionId = q.id;
        originalAnswer = 999;
        const answerOp = operation(state.version, { type: "answer", questionId: q.id, answer: originalAnswer });
        assert.equal((await request("/api/sparkbound", { body: answerOp })).status, 200);
        assert.equal((await request("/api/sparkbound", { body: { operationId: answerOp.operationId,
          action: { answer: originalAnswer, questionId: q.id, type: "answer" }, version: answerOp.version } })).status, 200);
        const wrongState = await privateState();
        assert.equal(wrongState.match.questions[0].attempts.length, 1);
        assert.equal(wrongState.match.playerHP, match.playerHP);
        assert.equal(wrongState.match.energy, match.energy);
        await command({ type: "hint", questionId: q.id });
      }
      await command({ type: "answer", questionId: q.id, answer: q.answer });
    } else await command({ type: "continue" });
  }
  const completed = await privateState();
  assert.equal(completed.wins, 1);
  assert.equal(completed.match.questions.length, 4);
  assert.ok(completed.match.questions.every((q) => q.resolved));
  const evidence = (await review()).body.state;
  assert.equal(evidence.match.questions[0].attempts[0].answer, originalAnswer);
  assert.equal(evidence.match.questions[0].completion, "worked");
  const html = renderSparkboundEvidence(evidence);
  assert.ok(html.includes("Original answer"));
  assert.ok(html.includes("Worked support:</strong> Yes"));
  assert.ok(html.indexOf(originalQuestionId) < html.indexOf("Correct first try"));
  const hostile = structuredClone(evidence);
  hostile.match.questions[0].prompt = '<img src=x onerror="alert(1)">';
  assert.ok(!renderSparkboundEvidence(hostile).includes('<img src=x'));
  assert.ok(renderSparkboundEvidence({ match: null, history: [] }).includes("No saved training answers"));

  await command({ type: "start" });
  assert.deepEqual((await privateState()).history[0].questions, completed.match.questions);
  await command({ type: "reset" });
  const reset = await privateState();
  assert.equal(reset.match, null);
  assert.equal(reset.wins, 1);
  assert.deepEqual(reset.history[0].questions, completed.match.questions);
  const delayedReplay = await request("/api/sparkbound", { body: first });
  assert.equal(delayedReplay.body.state.version, reset.version);
  assertRedacted(delayedReplay.body.state);
  assert.equal((await request("/api/sparkbound", { headers: foreignHeaders })).body.state.version, 0);
  assert.equal((await request("/api/sparkbound", { headers: foreignHeaders, body: first })).status, 200);
  assert.equal((await get()).body.state.version, reset.version);
  const totals = await db.prepare("SELECT count(*) AS n, max(result_version) AS v FROM sparkbound_operations WHERE child_id=?").bind(f.childId).first();
  assert.equal(totals.n, reset.version);
  assert.equal(totals.v, reset.version);
  assert.deepEqual((await db.prepare("SELECT * FROM child_profiles ORDER BY id").all()).results, untouchedProfiles);

  const preserved = JSON.stringify(reset);
  const corrupt = { ...reset, history: null };
  await db.prepare("UPDATE sparkbound_states SET state_json=? WHERE child_id=?").bind(JSON.stringify(corrupt), f.childId).run();
  assert.equal((await get()).body.code, "INVALID_SAVED_STATE");
  assert.deepEqual(await privateState(), corrupt);
  await db.prepare("UPDATE sparkbound_states SET state_json=? WHERE child_id=?").bind(preserved, f.childId).run();

  // Explicit hero requests opt into v4 without changing the legacy workflow above.
  for (const heroId of [null, "Relay", "helio ", "constructor", {}, ["relay"]]) {
    const invalid = await request("/api/sparkbound", { body: operation(reset.version, { type: "start", heroId }) });
    assert.equal(invalid.status, 400);
    assert.equal(invalid.body.code, "INVALID_HERO");
    assert.deepEqual(await privateState(), reset);
  }
  for (const hero of HEROES) {
    const before = await privateState();
    const startOp = operation(before.version, { type: "start", heroId: hero.id });
    const started = await request("/api/sparkbound", { body: startOp });
    assert.equal(started.status, 200);
    assert.equal(started.body.state.match.heroId, hero.id);
    assert.equal(started.body.state.match.rulesVersion, 4);
    assert.equal(started.body.state.match.learningLevel, 2);
    assert.equal(started.body.state.match.questions.length, 15);
    assert.equal(started.body.state.match.upgradeStage, 0);
    assert.equal(started.body.state.configuration.battle.rounds.length, 6);
    assertRedacted(started.body.state);
    for (const q of started.body.state.match.questions) assert.deepEqual(Object.keys(q), ["id", "forge"]);
    const saved = await privateState();
    assert.deepEqual((await request("/api/sparkbound", { body: startOp })).body.state, started.body.state);
    assert.deepEqual(await privateState(), saved);
    const changedHero = await request("/api/sparkbound", { body: { ...startOp,
      action: { type: "start", heroId: hero.id === "relay" ? "helio" : "relay" } } });
    assert.equal(changedHero.body.code, "OPERATION_ID_REUSED");
    const attack = await command({ type: "move", move: "strike" });
    if (["helio", "nova"].includes(hero.id)) assert.deepEqual(attack.match.lastEvent.ability, {
      id: hero.trait.id, name: hero.trait.name, description: hero.trait.description
    });
    else assert.equal(Object.hasOwn(attack.match.lastEvent, "ability"), false);
    const archived = await command({ type: "reset" });
    assert.equal(archived.history.at(-1).heroId, hero.id);
    assert.equal(archived.history.at(-1).learningLevel, 2);
    assert.deepEqual((await review()).body.state.history.at(-1).questions, saved.match.questions);
    const replayAfterReset = await request("/api/sparkbound", { body: startOp });
    assert.equal(replayAfterReset.body.state.match, null);
    assert.equal(replayAfterReset.body.state.version, archived.version);
  }

  assert.equal((await request("/__sparkbound-qa__/fixture", { headers: {} })).status, 403);
  assert.equal((await request("/__sparkbound-qa__/fixture", { headers: { "x-bq-qa-control": harness.controlToken } })).body.otherFamily.children.length, 2);
  for (const path of ["/.git/config", "/functions/_lib/sparkbound.js", "/functions/_lib/sparkbound-content.js",
    "/tools/serve-sparkbound-qa.mjs", "/sparkbound/content.js", "/sparkbound/%63ontent.js", "/spark%62ound/content.js", "/.env"]) {
    assert.equal((await request(path, { headers: {} })).status, 404, path);
  }
  const badHost = await new Promise((resolve, reject) => {
    const req = httpRequest(`${origin}/__sparkbound-qa__/health`, { headers: { host: "foreign.invalid" } }, (res) => { res.resume(); resolve(res.statusCode); });
    req.on("error", reject); req.end();
  });
  assert.equal(badHost, 403);
  assert.equal((await request("/__sparkbound-qa__/health", { headers: { origin: "https://foreign.invalid" } })).status, 403);
  const unlock = await request("/api/auth/parent-unlock", { body: { pin: f.login.parentPin } });
  assert.equal(unlock.status, 200);
  assert.ok(unlock.body.parentCapability);
  assert.ok(unlock.headers.get("set-cookie").includes("bq_session="));
  assert.equal((await review()).status, 401, "Rotated session cannot retain old Parent access");
  console.log(`Sparkbound API QA passed: two-family auth/isolation, transactional replay/races/rollback, ${transitions} match transitions, ${HEROES.length} explicit v4 hero starts/replays/resets, invalid hero rejection, exact evidence, redaction, retained history, unchanged child profiles, local-only harness.`);
} finally { await harness.close(); }
