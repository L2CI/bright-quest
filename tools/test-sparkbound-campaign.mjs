import test from "node:test";
import assert from "node:assert/strict";
import { inspect } from "node:util";
import { createHash } from "node:crypto";
import { createState, applyAction, publicState, CAMPAIGN_ROUNDS, BATTLE_CONFIG } from "../functions/_lib/sparkbound.js";
import { HEROES, equipmentStage, forgeSize, totalRounds } from "../sparkbound/roster.js";
import { renderSparkboundEvidence } from "../sparkbound-parent.js";
import { EXPANDED_QUESTION_BANK } from "../functions/_lib/sparkbound-expansion-content.js";
import { duelCue, duelMoves, exchangeOutcome } from "../sparkbound/src/duel.js";

const heroIds = ["relay", "helio", "volt", "bastion", "zephyr", "glacier", "ember", "tidal", "atlas", "nova", "echo"];
function fresh(heroId = "relay", seed = 0, level = 2) {
  const state = createState({ profileId: `campaign-${seed}` });
  state.wins = (level - 2) * 2;
  state.tier = state.wins + 1;
  return applyAction(state, { type: "start", heroId });
}
// Respond only to the visible intent, unlocked equipment and energy, never the hidden seed.
const policy = m => m.intent === "heavy" ? "guard" : m.pad && m.energy === 4 ? "special" :
  m.staff && m.intent === "guard" && m.energy >= (m.heroId === "echo" ? 1 : 2) ? "break" : "strike";
function actionFor(state) {
  const m = state.match, q = m.questions[m.questionIndex];
  return m.phase === "battle" ? { type: "move", move: policy(m) } :
    m.phase === "training" ? { type: "answer", questionId: q.id, answer: q.answer } : { type: "continue" };
}
const step = state => applyAction(state, actionFor(state));
function until(state, predicate) {
  for (let i = 0; i < 400; i++) {
    if (predicate(state)) return state;
    assert.notEqual(state.match.phase, "defeat", `${state.match.heroId}: defeat at round ${state.match.round}`);
    state = step(state);
  }
  assert.fail("Campaign did not reach target in 400 actions");
}
const rejects = (state, action, code) => assert.throws(() => applyAction(state, action), error => error.code === code);

test("saved v3 domain, public and Parent review outcomes retain their original digest", () => {
  const digest = createHash("sha256");
  const record = state => digest.update(JSON.stringify([state, publicState(state), publicState(state, { review: true })]));
  for (const heroId of heroIds) {
    let state = fresh(heroId);
    state.match.rulesVersion = 3;
    for (let stage = 0; stage <= 5; stage++) {
      state = until(state, s => s.match.round === stage + 1 && s.match.phase === "battle");
      record(state);
      for (const move of ["strike", "guard", "break", "special"]) for (const intent of ["open", "guard", "strike", "heavy"])
        for (const energy of [0, 1, 2, 3, 4]) for (const assisted of [false, true]) for (const hp of [1, 30]) {
          const fixture = structuredClone(state);
          Object.assign(fixture.match, { intent, energy, assisted, playerHP: hp, rivalHP: hp });
          try { record(applyAction(fixture, { type: "move", move })); }
          catch (error) {
            assert.ok(["MOVE_LOCKED", "INSUFFICIENT_ENERGY"].includes(error.code));
            digest.update(error.code);
          }
        }
    }
    state = until(state, s => s.match.phase === "victory");
    record(state);
    record(applyAction(state, { type: "reset" }));
  }
  assert.equal(digest.digest("hex"), "d66c7d03e86ba1b0c21acd833ee62df50fdd1dee70573996155980e765eada89");
});
function assertRedacted(state) {
  const visible = publicState(state);
  assert.equal(visible.match?.seed, undefined);
  for (const [i, q] of (visible.match?.questions || []).entries()) {
    for (const key of ["answer", "hints", "explanation", "attempts", "supportEvents"])
      assert.equal(Object.hasOwn(q, key), false, `Leaked ${key} for ${q.id}`);
    if (!state.match.questions[i].resolved && (state.match.phase !== "training" || i !== state.match.questionIndex))
      assert.deepEqual(Object.keys(q), ["id", "forge"]);
    else assert.equal(q.learningLevel, state.match.questions[i].learningLevel);
  }
  assert.ok(visible.history.every(m => !Object.hasOwn(m, "questions")));
}

test("campaign contract and public configuration are isolated from legacy", () => {
  assert.deepEqual(HEROES.map(h => h.id), heroIds);
  const state = fresh();
  assert.equal(state.match.rulesVersion, 4);
  assert.equal(state.match.upgradeStage, 0);
  assert.equal(state.match.questions.length, 15);
  assert.equal(totalRounds(state.match), 6);
  assert.equal(forgeSize(state.match), 3);
  assert.deepEqual(publicState(state).configuration.battle.rounds, CAMPAIGN_ROUNDS);
  assert.equal(publicState(state).configuration.battle.sequences, undefined);
  assert.equal(BATTLE_CONFIG.rounds.length, 3);
  const legacy = applyAction(createState({ profileId: "legacy-campaign" }), { type: "start" });
  assert.equal(legacy.match.questions.length, 4);
  assert.equal(Object.hasOwn(legacy.match, "rulesVersion"), false);
  assert.deepEqual(publicState(legacy).configuration.battle.rounds, BATTLE_CONFIG.rounds);
  assertRedacted(state);
});

test("v4 salvo, rail and arsenal have distinct costs, openings, protection and clipped shot records", () => {
  let state = fresh();
  for (let stage = 0; stage <= 5; stage++) {
    state = until(state, s => s.match.round === stage + 1 && s.match.phase === "battle");
    for (const heroId of heroIds) for (const intent of ["open", "guard", "strike", "heavy"])
      for (const energy of [0, 1, 2, 3, 4]) for (const assisted of [false, true]) for (const hp of [1, 30]) {
        const fixture = structuredClone(state);
        Object.assign(fixture.match, { heroId, intent, energy, assisted, playerHP: hp, rivalHP: hp });
        const projected = publicState(fixture);
        const moves = duelMoves(projected.match);
        assert.ok(moves.some(m => m.id === duelCue(projected.match).suggested && !m.disabled));
        for (const move of moves) {
          const cost = move.id === "break" ? heroId === "echo" ? 1 : 2 : move.id === "special" ? stage === 3 ? 3 : 4 : 0;
          assert.equal(projected.configuration.moves[move.id].cost, cost);
          assert.equal(move.disabled, energy < cost);
          if (move.disabled) {
            rejects(fixture, { type: "move", move: move.id }, "INSUFFICIENT_ENERGY");
            continue;
          }
          const next = applyAction(fixture, { type: "move", move: move.id });
          const event = next.match.lastEvent;
          const incoming = intent === "open" ? 0 : BATTLE_CONFIG.incoming[intent] + Math.floor(stage / 2);
          let damage = move.id === "guard" ? stage === 5 && incoming ? 2 : 0 :
            move.id === "strike" ? intent === "guard" ? stage === 0 ? 2 : 0 : 4 :
              move.id === "break" ? intent === "guard" ? 10 : 6 : 12;
          if (move.id !== "guard" && damage > 0) damage += stage;
          if (move.id === "special" && stage >= 4 && intent === "open") damage += 4;
          if (heroId === "helio" && move.id !== "guard" && intent === "open") damage += 2;
          if (heroId === "ember" && move.id === "break" && intent === "guard") damage += 2;
          if (heroId === "atlas" && move.id === "special" && cost === 4) damage += 2;
          if (heroId === "nova" && move.id === "strike" && intent !== "guard") damage += 1;
          let received = move.id === "guard" ? Math.floor(incoming / 5) : incoming;
          if (move.id === "special" && stage >= 4 && intent === "guard") received = 0;
          if (move.id === "special" && stage === 5) received = Math.floor(received / 2);
          if (heroId === "bastion") received = Math.max(0, received - 1);
          if (heroId === "zephyr" && move.id === "strike" && intent === "strike") received = Math.max(0, received - 2);
          if (heroId === "glacier" && move.id === "special") received = Math.floor(received / 2);
          if (assisted) received = Math.floor(received / 2);
          assert.equal(event.damage, Math.min(hp, damage), `${heroId}/${stage}/${intent}/${move.id}`);
          assert.equal(event.rivalDamage, Math.min(hp, received));
          assert.equal(event.guardBroken, intent === "guard" && ["break", "special"].includes(move.id));
          assert.equal(next.match.phase, next.match.playerHP === 0 ? "defeat" : next.match.rivalHP === 0 ? "round_won" : "battle");
          const gained = move.id === "strike" ? 1 : move.id === "guard" && incoming > 0 ? heroId === "volt" ? 3 : 2 : 0;
          assert.equal(next.match.energy, Math.min(4, energy - cost + gained));
          if (event.technique) {
            const shots = move.id === "break" ? 2 : move.id === "special" ? stage === 3 ? 2 : stage === 5 ? 3 : 1 : 1;
            assert.equal(event.technique.shots.length, shots);
            assert.equal(event.technique.shots.reduce((a, b) => a + b, 0), event.damage);
            assert.equal(event.technique.energySpent, cost);
            assert.ok(event.technique.shots.every(n => Number.isInteger(n) && n >= 0));
            if (hp === 1) assert.deepEqual(event.technique.shots, [1, ...Array(shots - 1).fill(0)]);
          }
          if (move.id === "guard" && stage === 5) {
            assert.equal(event.technique?.id, incoming > 0 ? "counter" : undefined);
            assert.match(exchangeOutcome(event).title, incoming > 0 ? /hit back/ : /resting/);
          }
          assert.deepEqual(applyAction(JSON.parse(JSON.stringify(fixture)), { type: "move", move: move.id }), next);
        }
      }
  }
});

test("v4 does not alter persisted v3 rules when resuming, retrying or archiving", () => {
  let old = fresh("echo");
  old.match.rulesVersion = 3;
  old = until(old, s => s.match.round === 4 && s.match.phase === "battle");
  old.match.energy = 3;
  rejects(old, { type: "move", move: "special" }, "INSUFFICIENT_ENERGY");
  const current = structuredClone(old);
  current.match.rulesVersion = 4;
  assert.equal(applyAction(current, { type: "move", move: "special" }).match.energy, 0);
  old.match.playerHP = 1;
  old.match.intent = "heavy";
  const defeated = applyAction(old, { type: "move", move: "strike" });
  const retried = applyAction(defeated, { type: "retry", support: true });
  assert.equal(retried.match.rulesVersion, 3);
  assert.deepEqual(retried.match.questions, old.match.questions);
  const won = until(retried, s => s.match.phase === "victory");
  const next = applyAction(won, { type: "start", heroId: "echo" });
  assert.equal(next.match.rulesVersion, 4);
  assert.deepEqual(next.history[0], { ...won.match, outcome: "victory" });
  assert.equal(publicState(next, { review: true }).history[0].rulesVersion, 3);
});

for (const heroId of heroIds) test(`${heroId}: six-round fifteen-question unassisted journeys at both starting levels and varied seeds`, t => {
  let journeys = 0;
  for (const level of [2, 3]) for (let seed = 0; seed < 18; seed++) {
    let state = fresh(heroId, seed, level);
    assert.equal(state.match.learningLevel, level);
    assert.deepEqual(state.match.questions.map(q => q.learningLevel),
      Array.from({ length: 5 }, (_, i) => Array(3).fill(Math.min(5, level + i))).flat());
    const original = structuredClone(state.match.questions);
    const seenRounds = new Set(), upgrades = [], forges = [];
    const initialWins = state.wins;
    for (let i = 0; i < 400 && state.match.phase !== "victory"; i++) {
      const m = state.match;
      assert.notEqual(m.phase, "defeat", `${heroId}, seed ${seed}, level ${level}, round ${m.round}`);
      assert.equal(state.wins, initialWins);
      assert.equal(m.rewardGranted, false);
      assertRedacted(state);
      assert.equal(equipmentStage(m), m.upgradeStage);
      if (m.phase === "battle") {
        seenRounds.add(m.round);
        assert.equal(m.upgradeStage, m.round - 1);
        if (m.exchange === 0) for (const key of ["playerHP", "rivalHP", "playerPower", "rivalPower"])
          assert.equal(m[key], CAMPAIGN_ROUNDS[m.round - 1][key]);
      }
      if (m.phase === "training") {
        forges.push(m.questions[m.questionIndex].forge);
        assert.equal(m.upgradeStage, m.round - 1);
      }
      if (m.phase === "player_upgrade") upgrades.push(m.upgradeStage);
      state = step(state);
    }
    assert.equal(state.match.phase, "victory");
    assert.deepEqual([...seenRounds], [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(upgrades, [1, 2, 3, 4, 5]);
    assert.deepEqual(forges, ["maths", "science", "maths", "science", "maths"].flatMap(f => [f, f, f]));
    assert.equal(state.wins, initialWins + 1);
    assert.equal(state.tier, initialWins + 2);
    assert.equal(state.match.questionIndex, 15);
    assert.equal(state.match.assisted, false);
    assert.equal(state.match.rewardGranted, true);
    assert.ok(state.match.questions.every(q => q.resolved && q.completion === "independent" && q.attempts.length === 1));
    for (const [index, q] of state.match.questions.entries())
      for (const key of Object.keys(original[index]).filter(k => !["attempts", "hintsUsed", "supportEvents", "feedback", "resolved", "completion"].includes(k)))
        assert.deepEqual(q[key], original[index][key]);
    assert.deepEqual(JSON.parse(JSON.stringify(state)), state);
    assert.deepEqual(publicState(state, { review: true }).match, state.match);
    rejects(state, { type: "continue" }, "INVALID_PHASE");
    journeys++;
  }
  t.diagnostic(`${journeys} complete campaigns`);
});

test("all five upgrades require three current correct answers and reject client overrides or stale replays", () => {
  let state = fresh();
  for (const field of ["upgradeStage", "round", "rulesVersion", "questions", "staff", "pad", "learningLevel"])
    rejects(state, { type: "move", move: "strike", [field]: 5 }, "INVALID_ACTION");
  rejects(state, { type: "move", move: "break" }, "MOVE_LOCKED");
  rejects(state, { type: "move", move: "special" }, "MOVE_LOCKED");
  for (let stage = 1; stage <= 5; stage++) {
    state = until(state, s => s.match.phase === "training");
    rejects(state, { type: "continue" }, "INVALID_PHASE");
    const q = state.match.questions[state.match.questionIndex];
    const future = state.match.questions[state.match.questionIndex + 1];
    rejects(state, { type: "answer", questionId: future.id, answer: future.answer }, "QUESTION_NOT_CURRENT");
    const wrong = q.type === "numeric" ? q.answer + 1 : q.type === "order" ? [...q.answer].reverse() : q.choices.find(c => c.id !== q.answer).id;
    state = applyAction(state, { type: "answer", questionId: q.id, answer: wrong });
    state = applyAction(state, { type: "hint", questionId: q.id });
    assert.equal(state.match.upgradeStage, stage - 1);
    for (let answer = 0; answer < 3; answer++) {
      const action = { ...actionFor(state), expectedVersion: state.version };
      const before = structuredClone(state);
      const next = applyAction(state, action);
      assert.deepEqual(state, before);
      assert.deepEqual(applyAction(state, action), next);
      rejects(next, action, "STALE_VERSION");
      state = next;
      assert.equal(state.match.upgradeStage, answer === 2 ? stage : stage - 1);
      assert.equal(state.match.phase, answer === 2 ? "player_upgrade" : "training");
      assertRedacted(state);
    }
    assert.equal(state.match.lastEvent.upgradeStage, stage);
    state = step(state);
    if (stage === 1) rejects(state, { type: "move", move: "special" }, "MOVE_LOCKED");
  }
  state = until(state, s => s.match.phase === "victory");
  assert.equal(state.match.questions.filter(q => q.completion === "worked").length, 5);
  const html = renderSparkboundEvidence(publicState(state, { review: true }));
  assert.match(html, /15 training records/);
  assert.equal((html.match(/data-spark-question=/g) || []).length, 15);
  const reset = applyAction(state, { type: "reset" });
  assert.deepEqual(reset.history[0].questions, state.match.questions);
  assert.equal(reset.wins, 1);
  assertRedacted(reset);
  const restarted = applyAction(reset, { type: "start", heroId: "nova" });
  assert.equal(restarted.match.upgradeStage, 0);
  assert.equal(restarted.match.number, 2);
  assert.equal(restarted.wins, 1);
});

test("corrupt campaign stages and premature rewards cannot advance", () => {
  const state = fresh();
  for (const patch of [{ upgradeStage: 1 }, { upgradeStage: 6 }, { upgradeStage: "0" }, { staff: true },
    { pad: true }, { round: 6 }, { round: 7 }, { questionIndex: 3 }, { rewardGranted: true },
    { rulesVersion: 2 }, { phase: "victory" }, { trainingStage: 0, phase: "training" }]) {
    const corrupt = structuredClone(state);
    Object.assign(corrupt.match, patch);
    rejects(corrupt, { type: "continue" }, "INVALID_STATE");
  }
  for (const patch of [{ learningLevel: 0 }, { learningLevel: 6 }, { learningLevel: "2" }, { forgeStage: 2 }, { forge: "science" }]) {
    const corrupt = structuredClone(state);
    Object.assign(corrupt.match.questions[0], patch);
    rejects(corrupt, { type: "move", move: "strike" }, "INVALID_STATE");
  }
  const final = until(state, s => s.match.round === 6 && s.match.phase === "round_won");
  final.match.phase = "rival_upgrade";
  rejects(final, { type: "continue" }, "INVALID_STATE");
});

test("new starts adapt from Applied to Stretch, capped at three, while questions reach Master", () => {
  for (const wins of [0, 1, 2, 3, 4, 20, Number.MAX_SAFE_INTEGER - 1]) {
    const initial = createState({ profileId: `advanced-start-${wins}` });
    initial.wins = wins;
    const state = applyAction(initial, { type: "start", heroId: "relay" });
    const start = Math.min(3, 2 + Math.floor(wins / 2));
    assert.equal(state.match.learningLevel, start);
    assert.deepEqual(state.match.questions.filter((q, i) => i % 3 === 0).map(q => q.learningLevel),
      start === 2 ? [2, 3, 4, 5, 5] : [3, 4, 5, 5, 5]);
    assert.ok(state.match.questions.every(q => q.learningLevel <= 5));
  }
});

test("old v3 snapshots keep their original ids, answers and lower learning bands through victory", () => {
  let state = fresh();
  state.match.rulesVersion = 3;
  state.match.learningLevel = 1;
  state.match.questions = state.match.questions.map((q, index) => ({ ...q,
    ...structuredClone(EXPANDED_QUESTION_BANK.find(old => old.taskId === q.taskId && old.variant === q.variant &&
      old.learningLevel === Math.min(3, 1 + Math.floor(index / 6))))
  }));
  const snapshots = structuredClone(state.match.questions);
  for (let turn = 0; turn < 400 && state.match.phase !== "victory"; turn++) {
    state = JSON.parse(JSON.stringify(state));
    assert.equal(state.match.learningLevel, 1);
    assertRedacted(state);
    state = step(state);
  }
  assert.equal(state.match.phase, "victory");
  for (const [i, q] of state.match.questions.entries()) for (const field of ["id", "taskId", "prompt", "answer", "hints", "explanation", "learningLevel", "difficulty"])
    assert.deepEqual(q[field], snapshots[i][field]);
  const next = applyAction(state, { type: "start", heroId: "relay" });
  assert.deepEqual(next.history[0].questions, state.match.questions);
  assert.equal(next.match.learningLevel, 2);
  assert.equal(next.match.questions.at(-1).learningLevel, 5);
});

test("unsafe action results are rejected before they can become persisted saves", () => {
  const final = until(fresh(), s => s.match.round === 6 && s.match.phase === "round_won");
  for (const key of ["wins", "tier", "version"]) {
    const state = structuredClone(final);
    state[key] = Number.MAX_SAFE_INTEGER - (key === "version" ? 1 : 0);
    assert.doesNotThrow(() => publicState(state));
    const before = structuredClone(state);
    rejects(state, { type: "continue" }, "INVALID_STATE");
    assert.deepEqual(state, before);
  }
});

test("Tidal healing events represent restored HP only, with no open-stance healing or revival", () => {
  const initial = fresh("tidal");
  for (const [playerHP, intent, assisted, expectedHP, expectedHeal] of [
    [24, "strike", false, 24, 0], [23, "strike", false, 24, 1],
    [23, "open", false, 23, 0], [24, "heavy", false, 23, 1],
    [1, "heavy", false, 0, 0], [24, "heavy", true, 24, 1],
    [1, "heavy", true, 0, 0]
  ]) {
    const state = structuredClone(initial);
    Object.assign(state.match, { playerHP, intent, assisted });
    const next = applyAction(state, { type: "move", move: "guard" });
    assert.equal(next.match.playerHP, expectedHP);
    assert.equal(next.match.lastEvent.healing || 0, expectedHeal);
    assert.equal(Object.hasOwn(next.match.lastEvent, "healing"), expectedHeal > 0);
    assert.equal(Object.hasOwn(next.match.lastEvent, "ability"), expectedHeal > 0);
    assert.equal(next.match.lastEvent.healed, undefined);
  }
});

test("late retries restore round health and intent without losing stage, answers or support", () => {
  for (const heroId of heroIds) {
    const initial = until(fresh(heroId), s => s.match.round === 6 && s.match.phase === "battle");
    const fragile = structuredClone(initial);
    fragile.match.playerHP = 1;
    fragile.match.intent = "heavy";
    const defeated = applyAction(fragile, { type: "move", move: "strike" });
    assert.equal(defeated.match.phase, "defeat");
    for (const support of [false, true]) {
      const retried = applyAction(defeated, { type: "retry", support });
      for (const key of ["heroId", "rulesVersion", "learningLevel", "seed", "questions", "questionIndex", "upgradeStage", "staff", "pad", "round", "intent", "energy", "playerHP", "rivalHP"])
        assert.deepEqual(retried.match[key], initial.match[key]);
      assert.equal(retried.match.assisted, support);
      assert.equal(retried.match.roundAttempt, 2);
      assertRedacted(retried);
      const completed = until(retried, s => s.match.phase === "victory");
      assert.equal(completed.wins, 1);
    }
    const reset = applyAction(defeated, { type: "reset" });
    assert.deepEqual(reset.history[0].questions, initial.match.questions);
    assert.equal(reset.history[0].upgradeStage, 5);
    assert.equal(reset.wins, 0);
  }
});

test("Prism health, power and incoming pressure increase while earned damage scales modestly", () => {
  let state = fresh();
  for (let stage = 0; stage <= 5; stage++) {
    state = until(state, s => s.match.round === stage + 1 && s.match.phase === "battle");
    const fixture = structuredClone(state);
    fixture.match.intent = "strike";
    const next = applyAction(fixture, { type: "move", move: "strike" });
    assert.equal(next.match.lastEvent.damage, 4 + stage);
    assert.equal(next.match.lastEvent.rivalDamage, 4 + Math.floor(stage / 2));
    if (stage) {
      assert.ok(CAMPAIGN_ROUNDS[stage].rivalHP > CAMPAIGN_ROUNDS[stage - 1].rivalHP);
      assert.ok(CAMPAIGN_ROUNDS[stage].rivalPower > CAMPAIGN_ROUNDS[stage - 1].rivalPower);
    }
  }
});

test("new abilities honour intent, health/energy caps, support rounding and actual-benefit events", () => {
  const base = until(fresh(), s => s.match.round === 4 && s.match.phase === "battle");
  for (const heroId of ["ember", "tidal", "atlas", "nova", "echo"]) {
    for (const move of ["strike", "guard", "break", "special"]) for (const intent of ["open", "guard", "strike", "heavy"])
      for (const hp of [1, 10, 30]) for (const rivalHP of [1, 54]) for (const assisted of [false, true]) {
        const fixture = structuredClone(base);
        Object.assign(fixture.match, { heroId, intent, playerHP: hp, rivalHP, assisted, energy: 4 });
        const control = structuredClone(fixture);
        control.match.heroId = "relay";
        const normal = applyAction(control, { type: "move", move });
        const next = applyAction(fixture, { type: "move", move });
        const event = next.match.lastEvent;
        const bonus = heroId === "ember" && move === "break" && intent === "guard" ? 2 :
          heroId === "atlas" && move === "special" && normal.match.lastEvent.technique.energySpent === 4 ? 2 : heroId === "nova" && move === "strike" && intent !== "guard" ? 1 : 0;
        const expectedDamage = Math.min(rivalHP, normal.match.lastEvent.damage + bonus);
        assert.equal(event.damage, expectedDamage);
        assert.equal(event.rivalDamage, normal.match.lastEvent.rivalDamage);
        const healing = heroId === "tidal" && move === "guard" && intent !== "open" && normal.match.playerHP > 0 ? Math.min(1, 30 - normal.match.playerHP) : 0;
        assert.equal(next.match.playerHP, normal.match.playerHP + healing);
        assert.equal(event.healing || 0, healing);
        const energySaved = heroId === "echo" && move === "break" ? 1 : 0;
        assert.equal(next.match.energy, normal.match.energy + energySaved);
        assert.equal(Object.hasOwn(event, "ability"), expectedDamage > normal.match.lastEvent.damage || healing > 0 || energySaved > 0);
      }
  }
  base.match.heroId = "echo";
  base.match.energy = 1;
  assert.equal(applyAction(base, { type: "move", move: "break" }).match.energy, 0);
  assert.equal(publicState(base).configuration.moves.break.cost, 1);
  assert.match(publicState(base).configuration.moves.break.description, /Spend 1 energy/);
  base.match.energy = 0;
  rejects(base, { type: "move", move: "break" }, "INSUFFICIENT_ENERGY");
});

// The public API deliberately hides unexpected storage exceptions. Observe the
// ephemeral binding in this test so a failure retains its original cause chain.
function observeStorage(db, onFailure) {
  const statements = new WeakMap();
  function call(method, operation) {
    const at = new Date().toISOString(), started = performance.now();
    function failed(error) {
      onFailure({ method, at, elapsedMs: Math.round(performance.now() - started), error });
      throw error;
    }
    let result;
    try { result = operation(); } catch (error) { return failed(error); }
    return result instanceof Promise ? result.catch(failed) : result;
  }
  function wrap(statement, sql) {
    const label = sql.replace(/\s+/g, " ").trim().slice(0, 160);
    const wrapped = {
      bind(...values) { return wrap(call(`bind: ${label}`, () => statement.bind(...values)), sql); }
    };
    for (const method of ["first", "all", "run", "raw"])
      wrapped[method] = (...args) => call(`${method}: ${label}`, () => statement[method](...args));
    statements.set(wrapped, statement);
    return wrapped;
  }
  return {
    prepare(sql) { return wrap(call("prepare", () => db.prepare(sql)), sql); },
    batch(items) { return call("batch", () => db.batch(items.map(item => statements.get(item) || item))); },
    exec(sql) { return call("exec", () => db.exec(sql)); }
  };
}

test("campaign storage diagnostics preserve synchronous and asynchronous original causes", async () => {
  const cause = Object.assign(new Error("synthetic transport failure"), { code: "TEST_TRANSPORT" });
  const failure = new Error("synthetic D1 failure", { cause });
  const captured = [];
  const rawStatement = { bind() { return this; }, async first() { throw failure; } };
  const db = observeStorage({
    prepare() { return rawStatement; },
    async batch(items) { assert.equal(items[0], rawStatement); throw failure; },
    exec() { throw failure; }
  }, record => captured.push(record));
  const statement = db.prepare("SELECT test_value FROM synthetic_table WHERE id=?").bind("not-logged");
  await assert.rejects(statement.first(), error => error === failure);
  await assert.rejects(db.batch([statement]), error => error === failure);
  assert.throws(() => db.exec("synthetic failure"), error => error === failure);
  assert.equal(captured.length, 3);
  for (const record of captured) {
    assert.equal(record.error.cause, cause);
    assert.ok(record.elapsedMs >= 0);
    assert.ok(Number.isFinite(Date.parse(record.at)));
    assert.doesNotMatch(record.method, /not-logged/);
    assert.match(inspect(record.error), /TEST_TRANSPORT/);
  }
});

test("campaign API failure boundaries preserve evidence across precommit and ambiguous postcommit retries", async (t) => {
  const { startSparkboundQa } = await import("./serve-sparkbound-qa.mjs");
  const { onRequestGet, onRequestPost } = await import("../functions/api/sparkbound.js");
  const harness = await startSparkboundQa({ port: 0 });
  const { db, fixture: f, origin } = harness;
  const headers = { cookie: `bq_session=${f.cookie.value}`, "x-bq-child-capability": f.childCapability,
    "x-bq-child-id": f.childId, "content-type": "application/json" };
  const env = DB => ({ DB, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true" });
  async function post(operation, storage = db) {
    const response = await onRequestPost({ env: env(storage), request: new Request(`${origin}/api/sparkbound`, {
      method: "POST", headers, body: JSON.stringify(operation) }) });
    return { status: response.status, body: await response.json() };
  }
  async function row() {
    return db.prepare("SELECT * FROM sparkbound_states WHERE family_id=? AND child_id=?").bind(f.familyId, f.childId).first();
  }
  async function seed(state) {
    // This binding belongs exclusively to the ephemeral synthetic family harness.
    await db.prepare("DELETE FROM sparkbound_states WHERE family_id=? AND child_id=?").bind(f.familyId, f.childId).run();
    const now = new Date().toISOString();
    await db.prepare("INSERT INTO sparkbound_states (family_id, child_id, version, state_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(f.familyId, f.childId, state.version, JSON.stringify(state), now, now).run();
  }
  try {
    const initial = applyAction(createState({ profileId: f.childId }), { type: "start", heroId: "echo" });
    const fixtures = [
      ["answer", until(initial, s => s.match.phase === "training")],
      ["earned-upgrade", until(initial, s => s.match.phase === "training" && s.match.questionIndex === 2)],
      ["final-reward", until(initial, s => s.match.round === 6 && s.match.phase === "round_won")]
    ];
    for (const [transition, before] of fixtures) {
      for (const fault of ["precommit", "receipt-abort", "postcommit-recovered", "postcommit-unreadable"]) {
        await t.test(`${transition}: ${fault}`, async () => {
          await seed(before);
          const snapshot = await row();
          const operation = { version: before.version, action: actionFor(before), operationId: crypto.randomUUID() };
          const expected = applyAction(before, operation.action);
          const failure = new Error(`Synthetic ${fault}`, { cause: Object.assign(new Error("Synthetic lost storage response"), { code: "TEST_TRANSPORT" }) });
          let armed = true, unavailable = false;
          const captured = [];
          const storage = observeStorage({
            prepare(sql) {
              if (unavailable && /sparkbound_operations/.test(sql)) throw failure;
              return db.prepare(sql);
            },
            async batch(statements) {
              if (!armed || fault === "receipt-abort") return db.batch(statements);
              armed = false;
              if (fault === "precommit") throw failure;
              await db.batch(statements);
              unavailable = fault === "postcommit-unreadable";
              throw failure;
            }
          }, record => captured.push(record));
          if (fault === "receipt-abort") await db.exec("CREATE TRIGGER sparkbound_campaign_abort BEFORE INSERT ON sparkbound_operations BEGIN SELECT RAISE(ABORT, 'Synthetic receipt abort'); END;");
          let response;
          try { response = await post(operation, storage); }
          finally {
            if (fault === "receipt-abort") await db.exec("DROP TRIGGER sparkbound_campaign_abort;");
          }
          assert.ok(captured.length > 0, "The original injected storage exception must be captured");
          if (fault !== "receipt-abort") assert.equal(captured[0].error, failure);
          assert.equal(response.status, fault === "postcommit-recovered" ? 200 : 500, inspect(response));
          if (response.status === 500) assert.equal(response.body.code, "STORAGE_ERROR");
          const committed = fault.startsWith("postcommit");
          if (committed) assert.deepEqual(JSON.parse((await row()).state_json), expected);
          else assert.deepEqual(await row(), snapshot, "Failed transaction must preserve the entire saved row");
          const receipts = () => db.prepare("SELECT * FROM sparkbound_operations WHERE family_id=? AND child_id=?")
            .bind(f.familyId, f.childId).all();
          assert.equal((await receipts()).results.length, committed ? 1 : 0);

          // Restore availability and retry the IDENTICAL logical operation, never
          // replacing the id after a response whose commit status was unknown.
          unavailable = false;
          armed = false;
          const retried = await post(operation, storage);
          assert.equal(retried.status, 200, inspect(retried));
          assert.deepEqual(retried.body.state, publicState(expected));
          const replay = await post(operation, storage);
          assert.deepEqual(replay, retried);
          const stale = await post({ ...operation, operationId: crypto.randomUUID() }, storage);
          assert.equal(stale.status, 409);
          assert.equal(stale.body.code, "STALE_STATE");
          const saved = JSON.parse((await row()).state_json);
          assert.deepEqual(saved, expected);
          assert.equal(saved.version, before.version + 1);
          const records = (await receipts()).results;
          assert.equal(records.length, 1);
          assert.equal(records[0].operation_id, operation.operationId);
          assert.equal(records[0].result_version, expected.version);
          const review = await onRequestGet({ env: env(db), request: new Request(`${origin}/api/sparkbound?childId=${f.childId}`, {
            headers: { ...headers, "x-bq-parent-capability": f.parentCapability } }) });
          assert.equal(review.status, 200);
          assert.deepEqual((await review.json()).state.match.questions, expected.match.questions);
          if (transition === "earned-upgrade") assert.equal(saved.match.upgradeStage, before.match.upgradeStage + 1);
          if (transition === "final-reward") {
            assert.equal(saved.wins, before.wins + 1);
            assert.equal(saved.match.rewardGranted, true);
            assert.equal(saved.match.questions.filter(q => q.resolved).length, 15);
            assert.match(renderSparkboundEvidence(saved), /15 training records/);
          }
        });
      }
    }

    await t.test("typed validation and unexpected saved-state exceptions have different error codes", async () => {
      await seed(initial);
      const snapshot = await row();
      const operation = { version: initial.version, operationId: crypto.randomUUID(), action: { type: "continue" } };
      assert.equal((await post({ ...operation, version: -1 })).body.code, "INVALID_VERSION");
      const wrongPhase = await post(operation);
      assert.notEqual(wrongPhase.body.code, "STORAGE_ERROR");
      assert.ok(wrongPhase.status >= 400 && wrongPhase.status < 500);
      assert.deepEqual(await row(), snapshot);

      // Valid JSON null satisfies SQLite's nullable CHECK expressions, but causes
      // a JavaScript TypeError in loadState, not a D1/transport exception.
      await db.prepare("UPDATE sparkbound_states SET state_json='null' WHERE family_id=? AND child_id=?")
        .bind(f.familyId, f.childId).run();
      const invalidSnapshot = await row();
      const unexpected = await post(operation);
      assert.equal(unexpected.status, 500);
      assert.equal(unexpected.body.code, "STORAGE_ERROR");
      assert.deepEqual(await row(), invalidSnapshot, "Unexpected save errors must not reset evidence");
      await seed(initial);
    });
  } finally {
    await harness.close();
  }
});

test("campaign API persists fifteen parent records, replay-safe upgrades and one final reward", async (t) => {
  const { Miniflare } = await import("miniflare");
  const getD1Database = Miniflare.prototype.getD1Database;
  const storageFailures = [];
  t.mock.method(Miniflare.prototype, "getD1Database", async function (...args) {
    return observeStorage(await getD1Database.apply(this, args), record => {
      storageFailures.push(record);
      if (storageFailures.length > 8) storageFailures.shift();
      t.diagnostic(`Local D1 failure: ${inspect(record, { depth: 8 })}`);
    });
  });
  const { startSparkboundQa } = await import("./serve-sparkbound-qa.mjs");
  const harness = await startSparkboundQa({ port: 0 });
  const { fixture: f, origin, db } = harness;
  const headers = { cookie: `bq_session=${f.cookie.value}`, "x-bq-child-capability": f.childCapability,
    "x-bq-child-id": f.childId, "content-type": "application/json" };
  async function request(body, review = false) {
    const started = performance.now();
    const context = { at: new Date().toISOString(), version: body?.version, action: body?.action?.type, review };
    try {
      const response = await fetch(`${origin}/api/sparkbound${review ? `?childId=${f.childId}` : ""}`, {
        headers: { ...headers, ...(review ? { "x-bq-parent-capability": f.parentCapability } : {}) },
        ...(body ? { method: "POST", body: JSON.stringify(body) } : {})
      });
      const result = { status: response.status, body: await response.json() };
      if (response.status >= 500) t.diagnostic(inspect({ ...context, elapsedMs: Math.round(performance.now() - started),
        response: result, storageFailures }, { depth: 8 }));
      return result;
    } catch (error) {
      t.diagnostic(inspect({ ...context, elapsedMs: Math.round(performance.now() - started), error, storageFailures }, { depth: 8 }));
      throw error;
    }
  }
  try {
    let state = createState({ profileId: f.childId });
    let finalOperation;
    for (let i = 0; i < 400 && state.match?.phase !== "victory"; i++) {
      const action = state.match ? actionFor(state) : { type: "start", heroId: "echo" };
      const operation = { version: state.version, action, operationId: crypto.randomUUID() };
      const response = await request(operation);
      assert.equal(response.status, 200, JSON.stringify(response.body));
      state = applyAction(state, action);
      assert.deepEqual(response.body.state, publicState(state));
      if (state.match.phase === "player_upgrade" || state.match.phase === "victory") {
        const replay = await request(operation);
        assert.equal(replay.status, 200);
        assert.deepEqual(replay.body.state, response.body.state);
        const stale = await request({ ...operation, operationId: crypto.randomUUID() });
        assert.equal(stale.status, 409);
        assert.equal(stale.body.code, "STALE_STATE");
      }
      finalOperation = operation;
    }
    assert.equal(state.match.phase, "victory");
    assert.equal(state.wins, 1);
    const review = await request(undefined, true);
    assert.equal(review.status, 200);
    assert.deepEqual(review.body.state.match, state.match);
    assert.match(renderSparkboundEvidence(review.body.state), /15 training records/);
    const row = await db.prepare("SELECT state_json FROM sparkbound_states WHERE family_id=? AND child_id=?").bind(f.familyId, f.childId).first();
    assert.deepEqual(JSON.parse(row.state_json), state);
    const reset = await request({ version: state.version, action: { type: "reset" }, operationId: crypto.randomUUID() });
    assert.equal(reset.status, 200);
    const replay = await request(finalOperation);
    assert.equal(replay.status, 200);
    assert.equal(replay.body.state.match, null);
    assert.equal(replay.body.state.wins, 1);
    const archived = await request(undefined, true);
    assert.deepEqual(archived.body.state.history[0].questions, state.match.questions);
    assert.ok(reset.body.state.history.every(m => !Object.hasOwn(m, "questions")));
  } finally {
    await harness.close();
  }
});
