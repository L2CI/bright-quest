import assert from "node:assert/strict";
import test from "node:test";
import { HQ_UPGRADES, QUESTION_TEMPLATES, REGIONS, createQuestion } from "../beacon-brigade/content.js";
import { MAX_EXPEDITIONS, MAX_WRONG_ATTEMPTS, applyAction, createState, publicState } from "../functions/_lib/beacon-brigade.js";

const expectedAnswers = {
  "harbour-crate-reserve": [15, 13], "harbour-delivery-total": [383, 422],
  "harbour-equal-packs": [6, 6], "harbour-stock-left": [124, 175],
  "harbour-place-value": [348, 526], "harbour-missing-supply": [64, 73],
  "grove-flexible-cover": ["foil", "film"], "grove-magnet-evidence": ["steel", "iron"],
  "grove-fair-ramp": ["a-b", "d-f"], "grove-absorbent-pad": ["b", "f"],
  "grove-push-observation": ["further", "gentle"], "grove-load-support": ["c", "d"]
};

function start(regionId = "harbour", state = createState()) {
  return applyAction(state, { type: "start", regionId });
}

function answer(state, stationId, answer) {
  return applyAction(state, { type: "answer", stationId, answer });
}

function complete(state, regionId) {
  let next = start(regionId, state);
  for (const station of next.activeExpedition.stations) next = answer(next, station.id, station.question.answer);
  return applyAction(next, { type: "finish" });
}

function fails(state, action, code) {
  const before = structuredClone(state);
  assert.throws(() => applyAction(state, action), (error) => error.code === code);
  assert.deepEqual(state, before);
}

test("12 original templates, two independently checked instances each, exact region economy", () => {
  assert.equal(QUESTION_TEMPLATES.length, 12);
  assert.equal(new Set(QUESTION_TEMPLATES.map((item) => item.id)).size, 12);
  assert.deepEqual(REGIONS.map((item) => [item.id, item.resource]), [["harbour", "parts"], ["grove", "cores"]]);
  assert.deepEqual(HQ_UPGRADES, { 2: { parts: 12, cores: 12 }, 3: { parts: 24, cores: 24 } });
  for (const region of REGIONS) assert.equal(QUESTION_TEMPLATES.filter((item) => item.regionId === region.id).length, 6);
  for (const template of QUESTION_TEMPLATES) {
    assert.equal(template.instances.length, 2);
    for (let variant = 0; variant < 2; variant += 1) {
      const question = createQuestion(template.id, variant);
      assert.equal(question.answer, expectedAnswers[template.id][variant], question.id);
      assert.equal(question.review.status, "reviewed");
      assert.equal(question.review.humanCurriculumReview, "pending");
      for (const field of ["prompt", "explanation", "hint", "wrongFeedback", "skill"]) assert.ok(question[field].length > 10);
      assert.ok(question.diagram.label);
      if (question.type === "choice") {
        assert.equal(question.options.filter((item) => item.id === question.answer).length, 1);
        assert.equal(new Set(question.options.map((item) => item.id)).size, question.options.length);
        assert.ok(question.diagram.controls && question.diagram.limitation);
        assert.equal(question.diagram.simulation, false);
        assert.ok(question.diagram.rows.every((row) => row.length === question.diagram.columns.length));
      }
    }
  }
});

test("science answers follow displayed evidence, not material stereotypes", () => {
  for (const template of QUESTION_TEMPLATES.filter((item) => item.regionId === "grove")) {
    for (let variant = 0; variant < 2; variant += 1) {
      const q = createQuestion(template.id, variant);
      const selected = q.options.findIndex((option) => option.id === q.answer);
      if (template.id === "grove-flexible-cover") {
        assert.deepEqual(q.diagram.rows[selected].slice(1), ["Yes", "No"]);
        assert.equal(q.diagram.rows.filter((row) => row[1] === "Yes" && row[2] === "No").length, 1);
      } else if (template.id === "grove-magnet-evidence") {
        assert.equal(q.diagram.rows[selected][1], "Yes");
        assert.equal(q.diagram.rows.filter((row) => row[1] === "Yes").length, 1);
      } else if (template.id === "grove-fair-ramp") {
        const [first, second] = q.answer.toUpperCase().split("-").map((id) => q.diagram.rows.find((row) => row[0] === id));
        for (const column of [1, 2, 4]) assert.equal(first[column], second[column]);
        assert.notEqual(first[3], second[3]);
      } else if (template.id === "grove-absorbent-pad") {
        const values = q.diagram.rows.map((row) => parseInt(row[1], 10));
        assert.equal(values[selected], Math.max(...values));
        assert.ok(values.every((value) => value <= 20));
      } else if (template.id === "grove-load-support") {
        const threshold = variant === 0 ? 6 : 7;
        assert.ok(q.diagram.rows[selected][1] >= threshold);
        assert.equal(q.diagram.rows.filter((row) => row[1] >= threshold).length, 1);
      } else if (template.id === "grove-push-observation") {
        assert.ok(parseInt(q.diagram.rows[0][1], 10) < parseInt(q.diagram.rows[1][1], 10));
      }
    }
  }
});

test("reducer is deterministic and immutable; questions rotate through all 12 instances per region", () => {
  const initial = createState({ profileId: "child-a" });
  const snapshot = structuredClone(initial);
  assert.deepEqual(start("harbour", initial), start("harbour", initial));
  assert.deepEqual(initial, snapshot);
  for (const region of REGIONS) {
    let state = initial;
    const seen = new Set();
    for (let run = 0; run < 4; run += 1) {
      state = start(region.id, state);
      assert.equal(state.activeExpedition.stations.length, 3);
      for (const station of state.activeExpedition.stations) {
        seen.add(station.question.id);
        assert.ok(station.id.startsWith("child-a:"));
      }
      state = applyAction(state, { type: "end" });
    }
    assert.equal(seen.size, 12);
  }
});

test("correct answer resolves and pays once; original wrong answer and timestamp survive correction", () => {
  let state = start();
  const station = state.activeExpedition.stations[0];
  state = applyAction(state, { type: "answer", stationId: station.id, answer: "24", at: "2026-08-31T01:02:03Z" });
  assert.deepEqual(state.wallet, { parts: 0, cores: 0 });
  assert.equal(state.activeExpedition.stations[0].lastFeedback.correct, false);
  state = answer(state, station.id, ` ${station.question.answer}.0 `);
  const resolved = state.activeExpedition.stations[0];
  assert.equal(resolved.attempts[0].answer, "24");
  assert.equal(resolved.attempts[0].at, "2026-08-31T01:02:03Z");
  assert.equal(resolved.firstAttemptCorrect, false);
  assert.equal(resolved.resolution, "corrected");
  assert.equal(resolved.resolved, true);
  assert.equal(state.wallet.parts, 4);
  assert.deepEqual(answer(state, station.id, station.question.answer), state);
  state = applyAction(state, { type: "end" });
  assert.equal(state.history[0].stations[0].attempts.length, 2);
  assert.equal(state.wallet.parts, 4);
});

test("worked support requires wrong -> hint -> wrong -> hint -> correct, never arbitrary payment", () => {
  let state = start("grove");
  const station = state.activeExpedition.stations[0];
  const wrong = station.question.options.find((option) => option.id !== station.question.answer).id;
  fails(state, { type: "hint", stationId: station.id }, "ATTEMPT_REQUIRED");
  state = answer(state, station.id, wrong);
  state = applyAction(state, { type: "hint", stationId: station.id });
  fails(state, { type: "hint", stationId: station.id }, "RETRY_REQUIRED");
  assert.equal(publicState(state).activeExpedition.stations[0].question.answer, undefined);
  state = answer(state, station.id, wrong);
  state = applyAction(state, { type: "hint", stationId: station.id });
  assert.equal(state.activeExpedition.stations[0].support.stage, 2);
  assert.equal(publicState(state).activeExpedition.stations[0].question.answer, station.question.answer);
  assert.equal(state.activeExpedition.stations[0].resolved, false);
  assert.deepEqual(state.wallet, { parts: 0, cores: 0 });
  state = answer(state, station.id, station.question.answer);
  assert.equal(state.activeExpedition.stations[0].resolution, "assisted");
  assert.equal(state.activeExpedition.stations[0].attempts.at(-1).helpStage, 2);
  assert.equal(state.activeExpedition.stations[0].support.events.length, 2);
  assert.equal(state.wallet.cores, 4);
});

test("full gameplay funds exact HQ2 and optional HQ3, never overspends", () => {
  let state = createState();
  fails(state, { type: "upgrade" }, "INSUFFICIENT_RESOURCES");
  state = complete(state, "harbour");
  fails(state, { type: "upgrade" }, "INSUFFICIENT_RESOURCES");
  state = complete(state, "grove");
  state = applyAction(state, { type: "upgrade" });
  assert.equal(state.hqLevel, 2);
  assert.deepEqual(state.wallet, { parts: 0, cores: 0 });
  fails(state, { type: "upgrade" }, "INSUFFICIENT_RESOURCES");
  for (let i = 0; i < 2; i += 1) for (const region of REGIONS) state = complete(state, region.id);
  state = applyAction(state, { type: "upgrade" });
  assert.equal(state.hqLevel, 3);
  assert.equal(state.history.length, 6);
  assert.equal(state.upgrades.length, 2);
  assert.deepEqual(state.wallet, { parts: 0, cores: 0 });
  fails(state, { type: "upgrade" }, "MAX_HQ_LEVEL");
});

test("state projection protects marking but parent review retains exact snapshots and partial evidence", () => {
  const state = start();
  const original = structuredClone(state);
  const child = publicState(state);
  assert.equal(child.activeExpedition.stations[0].question.answer, undefined);
  assert.equal(child.activeExpedition.stations[0].question.explanation, undefined);
  assert.equal(child.activeExpedition.stations[0].question.hint, undefined);
  assert.deepEqual(child.activeExpedition.stations[0].question.diagram, state.activeExpedition.stations[0].question.diagram);
  assert.equal(publicState(state, { review: true }).activeExpedition.stations[0].question.answer, 15);
  const ended = publicState(applyAction(state, { type: "end" }));
  assert.equal(ended.history[0].status, "ended");
  assert.equal(ended.history[0].stations[0].question.answer, 15);
  assert.deepEqual(state, original);
  child.activeExpedition.stations[0].question.diagram.groups = 99;
  assert.deepEqual(state, original);
});

test("strict actions reject spoofed rewards, foreign stations, unsupported commands and coercion", () => {
  const state = start();
  const id = state.activeExpedition.stations[0].id;
  fails(state, { type: "answer", stationId: id, answer: 15, wallet: { parts: 999 } }, "INVALID_ACTION");
  fails(state, { type: "answer", stationId: "another-child:station", answer: 15 }, "INVALID_STATION");
  for (const invalid of [true, null, [], {}, "", "   ", NaN, Infinity, "0xf", "15 pieces", "1.5e1"]) {
    fails(state, { type: "answer", stationId: id, answer: invalid }, "INVALID_ANSWER");
  }
  fails(state, { type: "claim", amount: 500 }, "INVALID_ACTION");
  fails(state, { type: ["start"], regionId: "harbour" }, "INVALID_ACTION");
  fails(state, { type: "start", regionId: "grove" }, "EXPEDITION_ACTIVE");
  fails(state, { type: "finish" }, "STATIONS_UNRESOLVED");
  fails(createState(), { type: "finish" }, "NO_ACTIVE_EXPEDITION");
  fails(createState(), { type: "start", regionId: "quarry" }, "INVALID_REGION");
});

test("wrong-attempt cap preserves all evidence and still permits a corrected answer", () => {
  let state = start();
  const station = state.activeExpedition.stations[0];
  for (let i = 0; i < MAX_WRONG_ATTEMPTS; i += 1) state = answer(state, station.id, 999);
  fails(state, { type: "answer", stationId: station.id, answer: 999 }, "ATTEMPT_LIMIT");
  state = applyAction(state, { type: "hint", stationId: station.id });
  state = applyAction(state, { type: "hint", stationId: station.id });
  assert.equal(state.activeExpedition.stations[0].support.stage, 2);
  state = answer(state, station.id, station.question.answer);
  assert.equal(state.activeExpedition.stations[0].attempts.length, MAX_WRONG_ATTEMPTS + 1);
  assert.equal(state.activeExpedition.stations[0].resolution, "assisted");
  assert.equal(state.wallet.parts, 4);
});

test("100-expedition retention limit never silently discards history and leaves room under row guard", () => {
  let state = createState();
  for (let i = 0; i < MAX_EXPEDITIONS; i += 1) state = complete(state, i % 2 ? "grove" : "harbour");
  assert.equal(state.history.length, MAX_EXPEDITIONS);
  assert.equal(state.history[0].id, "local-preview:exp-1-harbour");
  assert.equal(state.wallet.parts, 600);
  assert.equal(state.wallet.cores, 600);
  fails(state, { type: "start", regionId: "harbour" }, "HISTORY_FULL");
  assert.equal(publicState(state).limits.expeditionsRemaining, 0);
  assert.ok(Buffer.byteLength(JSON.stringify(state)) < 1800000);
});
