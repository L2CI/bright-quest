import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createState, applyAction, publicState, SparkError, MOVES, BATTLE_CONFIG } from "../functions/_lib/sparkbound.js";
import { HEROES, getHero, isHeroId, forgeSize, equipmentStage } from "../sparkbound/roster.js";
import * as content from "../functions/_lib/sparkbound-content.js";

const fresh = (heroId, profileId = "roster-child") => applyAction(createState({ profileId }),
  { type: "start", ...(heroId === undefined ? {} : { heroId }) });
const error = (fn, code) => assert.throws(fn, e => e instanceof SparkError && e.code === code && e.status === 400);
const legacyPolicy = m => m.intent === "heavy" ? "guard" : m.pad && m.energy === 4 ? "special" :
  m.staff && m.intent === "guard" ? (m.energy >= 2 ? "break" : "guard") : "strike";
function bestLegalAction(state) {
  const candidates = Object.keys(MOVES).flatMap(move => {
    try {
      const next = applyAction(state, { type: "move", move });
      const m = next.match;
      const score = m.phase === "defeat" ? -10000 : m.phase === "round_won" ? 10000 :
        (state.match.rivalHP - m.rivalHP) * 5 - (state.match.playerHP - m.playerHP) * 8 + m.energy;
      return [{ move, score }];
    } catch (e) {
      assert.ok(["MOVE_LOCKED", "INSUFFICIENT_ENERGY"].includes(e.code));
      return [];
    }
  }).sort((a, b) => b.score - a.score);
  assert.ok(candidates.length > 0);
  return candidates[0].move;
}
function step(state, policy = bestLegalAction) {
  const m = state.match, q = m.questions[m.questionIndex];
  return applyAction(state, m.phase === "battle" ? { type: "move", move: policy(state) } :
    m.phase === "training" ? { type: "answer", questionId: q.id, answer: q.answer } : { type: "continue" });
}
function until(state, predicate) {
  for (let i = 0; i < 200; i++) {
    if (predicate(state)) return state;
    assert.notEqual(state.match.phase, "defeat", `Unexpected defeat: ${state.match.heroId}, round ${state.match.round}`);
    state = step(state);
  }
  assert.fail("Match did not reach target in 200 actions");
}
function freeze(value) {
  if (value && typeof value === "object") { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}
function assertRedacted(state) {
  const projected = publicState(state);
  assert.equal(Object.hasOwn(projected.match, "seed"), false);
  for (const [index, q] of projected.match.questions.entries()) {
    for (const key of ["answer", "hints", "explanation", "attempts", "supportEvents"])
      assert.equal(Object.hasOwn(q, key), false, `${index}: ${key} leaked`);
    if (!state.match.questions[index].resolved && (state.match.phase !== "training" || state.match.questionIndex !== index))
      assert.deepEqual(Object.keys(q), ["id", "forge"]);
  }
  for (const archived of projected.history) assert.equal(Object.hasOwn(archived, "questions"), false);
}

test("catalogue exposes six unique strict ids and legacy equipment/forge defaults", () => {
  assert.deepEqual(HEROES.map(h => h.id), ["relay", "helio", "volt", "bastion", "zephyr", "glacier"]);
  assert.equal(getHero(undefined).id, "relay");
  assert.equal(forgeSize(fresh().match), 2);
  assert.equal(forgeSize({ questions: Array(6) }), 3);
  assert.equal(equipmentStage({}), 0);
  assert.equal(equipmentStage({ staff: true }), 1);
  assert.equal(equipmentStage({ staff: true, pad: true }), 2);
});

for (const [index, heroId] of [undefined, null, "", "Relay", "HELIO", "helio ", " helio", "relay\n", "constructor",
  "__proto__", "unknown", 0, true, {}, [], ["relay"], new String("relay"), Symbol("relay")].entries()) {
  test(`strict invalid explicit hero id ${index + 1}`, () => {
    const state = freeze(createState({ profileId: "invalid-hero" }));
    assert.equal(isHeroId(heroId), false);
    error(() => applyAction(state, { type: "start", heroId }), "INVALID_HERO");
    assert.equal(state.version, 0);
    assert.equal(state.nextMatchNumber, 1);
  });
}

test("hero selectors cannot execute getters, inherit fields, or change an active hero", () => {
  let read = false;
  const getter = { type: "start", get heroId() { read = true; return "helio"; } };
  error(() => applyAction(createState({ profileId: "getter" }), getter), "INVALID_ACTION");
  assert.equal(read, false);
  error(() => applyAction(createState({ profileId: "inherited" }), Object.assign(Object.create({ heroId: "helio" }), { type: "start" })), "INVALID_ACTION");
  for (const type of ["move", "continue", "reset", "retry", "hint", "answer"])
    error(() => applyAction(fresh(), { type, heroId: "helio" }), "INVALID_ACTION");
});

test("full legacy state/public/review snapshots remain byte-for-byte compatible across six matches", () => {
  // Captured from the unmodified domain before hero support, including all selected content variants.
  const digest = createHash("sha256");
  let count = 0;
  const record = state => { digest.update(JSON.stringify([state, publicState(state), publicState(state, { review: true })])); count++; };
  let state = createState({ profileId: "legacy-snapshot" });
  record(state);
  for (let game = 0; game < 6; game++) {
    state = applyAction(state, { type: "start" });
    assert.equal(Object.hasOwn(state.match, "heroId"), false);
    assert.equal(Object.hasOwn(state.match, "rulesVersion"), false);
    record(state);
    for (let i = 0; state.match.phase !== "victory" && i < 200; i++) {
      assert.notEqual(state.match.phase, "defeat");
      state = step(state, s => legacyPolicy(s.match));
      record(state);
    }
    assert.equal(state.match.phase, "victory");
  }
  state = applyAction(state, { type: "reset" });
  record(state);
  assert.equal(count, 213);
  assert.equal(digest.digest("hex"), "40518290d80195b3a1e0bc8f55f6935eda6a0fa958222219c9545fa75293a6f5");
});

for (const hero of HEROES) {
  test(`${hero.id}: ability boundaries across all moves, intents, caps, clipping and support`, t => {
    const base = fresh();
    let cases = 0;
    for (const name of Object.keys(MOVES)) for (const intent of Object.keys(BATTLE_CONFIG.incoming))
      for (const energy of [0, 1, 2, 3, 4]) for (const playerHP of [1, 3, 24]) for (const rivalHP of [1, 5, 50])
        for (const assisted of [false, true]) {
          if (energy < MOVES[name].cost) continue;
          const state = structuredClone(base);
          Object.assign(state.match, { heroId: hero.id, round: 3, staff: true, pad: true, intent, energy, playerHP, rivalHP, assisted });
          const incoming = BATTLE_CONFIG.incoming[intent];
          const baselineDamage = name === "guard" ? 0 : name === "strike" ? (intent === "guard" ? 0 : 4) :
            name === "break" ? (intent === "guard" ? 10 : 6) : 12;
          const baselineIncoming = name === "guard" ? Math.floor(incoming / 5) : incoming;
          const baselineEnergy = name === "guard" ? Math.min(4, energy + (incoming > 0 ? 2 : 0)) :
            name === "strike" ? Math.min(4, energy + 1) : name === "break" ? energy - 2 : 0;
          const expectedEnergy = hero.id === "volt" && name === "guard" && incoming > 0 ? Math.min(4, energy + 3) : baselineEnergy;
          const rawDamage = baselineDamage + (hero.id === "helio" && name !== "guard" && intent === "open" ? 2 : 0);
          let rawIncoming = baselineIncoming;
          if (hero.id === "bastion") rawIncoming = Math.max(0, rawIncoming - 1);
          if (hero.id === "zephyr" && name === "strike" && intent === "strike") rawIncoming = Math.max(0, rawIncoming - 2);
          if (hero.id === "glacier" && name === "special") rawIncoming = Math.floor(rawIncoming / 2);
          const expectedDamage = Math.min(rivalHP, rawDamage);
          const expectedIncoming = Math.min(playerHP, assisted ? Math.floor(rawIncoming / 2) : rawIncoming);
          const extraDamage = expectedDamage - Math.min(rivalHP, baselineDamage);
          const prevented = Math.min(playerHP, assisted ? Math.floor(baselineIncoming / 2) : baselineIncoming) - expectedIncoming;
          const extraEnergy = expectedEnergy - baselineEnergy;
          const next = applyAction(freeze(state), freeze({ type: "move", move: name }));
          const event = next.match.lastEvent;
          assert.equal(event.damage, expectedDamage);
          assert.equal(event.rivalDamage, expectedIncoming);
          assert.equal(next.match.playerHP, playerHP - expectedIncoming);
          assert.equal(next.match.rivalHP, rivalHP - expectedDamage);
          assert.equal(next.match.energy, expectedEnergy);
          const helpful = extraDamage > 0 || prevented > 0 || extraEnergy > 0;
          assert.equal(Object.hasOwn(event, "ability"), helpful, JSON.stringify({ hero: hero.id, name, intent, energy, playerHP, rivalHP, assisted }));
          if (helpful) assert.deepEqual(event.ability, {
            id: hero.trait.id, name: hero.trait.name,
            description: hero.trait.description
          });
          cases++;
        }
    assert.equal(cases, 1008);
    t.diagnostic(`${cases} boundary scenarios`);
  });
}

for (const hero of HEROES) for (let seed = 0; seed < 30; seed++) {
  test(`${hero.id}: all three rounds unassisted with best-legal-action policy, seed ${seed}`, () => {
    let state = fresh(hero.id, `roster-seed-${seed}`);
    assert.equal(state.match.heroId, hero.id);
    assert.equal(state.match.rulesVersion, 2);
    assert.equal(state.match.questions.length, 6);
    assert.deepEqual(state.match.questions.map(q => q.forge), ["maths", "maths", "maths", "science", "science", "science"]);
    const snapshots = structuredClone(state.match.questions);
    const rounds = new Set(), upgrades = [];
    for (let i = 0; i < 200 && state.match.phase !== "victory"; i++) {
      const m = state.match;
      assert.notEqual(m.phase, "defeat", `${hero.id} seed ${seed}, round ${m.round}`);
      assertRedacted(state);
      if (m.phase === "battle") rounds.add(m.round);
      if (m.phase === "battle" && m.exchange === 0) {
        for (const key of ["playerHP", "rivalHP", "playerPower", "rivalPower"])
          assert.equal(m[key], BATTLE_CONFIG.rounds[m.round - 1][key]);
        assert.equal(equipmentStage(m), m.round - 1);
      }
      if (m.phase === "player_upgrade") upgrades.push(m.questionIndex);
      if (m.phase === "training") {
        assert.ok(m.questionIndex < m.trainingStage * 3);
        assert.equal(equipmentStage(m), m.trainingStage - 1);
      }
      state = step(state);
    }
    assert.deepEqual([...rounds], [1, 2, 3]);
    assert.deepEqual(upgrades, [3, 6]);
    assert.equal(state.match.phase, "victory");
    assert.equal(state.wins, 1);
    assert.equal(state.tier, 2);
    assert.equal(state.match.assisted, false);
    assert.equal(state.match.questionIndex, 6);
    assert.ok(state.match.questions.every(q => q.resolved && q.completion === "independent"));
    for (const [index, q] of state.match.questions.entries())
      for (const key of Object.keys(snapshots[index]).filter(key => !["attempts", "hintsUsed", "supportEvents", "feedback", "resolved", "completion"].includes(key)))
        assert.deepEqual(q[key], snapshots[index][key]);
    assert.deepEqual(publicState(state, { review: true }).match, state.match);
  });
}

test("saved four/six question arrays use their own length and reject out-of-range indices", () => {
  for (const heroId of [undefined, "relay"]) {
    const state = fresh(heroId), length = state.match.questions.length;
    for (let questionIndex = 0; questionIndex <= length; questionIndex++) {
      const saved = structuredClone(state);
      saved.match.questionIndex = questionIndex;
      assert.doesNotThrow(() => publicState(saved));
    }
    for (const questionIndex of [-1, length + 1, 1.5, "1"]) {
      const saved = structuredClone(state);
      saved.match.questionIndex = questionIndex;
      error(() => publicState(saved), "INVALID_STATE");
    }
    for (const count of [0, 3, 5, 7]) {
      const saved = structuredClone(state);
      saved.match.questions = Array(count).fill(state.match.questions[0]);
      error(() => publicState(saved), "INVALID_STATE");
    }
  }
  const state = fresh();
  state.match.heroId = "not-a-hero";
  error(() => publicState(state), "INVALID_STATE");
});

test("expanded snapshots, actions and public/review projections are detached", () => {
  const state = freeze(until(fresh("helio"), s => s.match.phase === "training"));
  const q = state.match.questions[0];
  const action = freeze({ type: "answer", questionId: q.id, answer: structuredClone(q.answer) });
  const next = applyAction(state, action);
  next.match.questions[0].prompt = "changed";
  assert.notEqual(state.match.questions[0].prompt, "changed");
  for (const review of [false, true]) {
    const projected = publicState(state, { review });
    projected.match.questions[0].prompt = "changed projection";
    assert.notEqual(state.match.questions[0].prompt, "changed projection");
  }
  const selected = content.selectExpandedQuestions(state.match.number, "helio");
  selected[0].prompt = "changed selection";
  assert.notEqual(state.match.questions[0].prompt, "changed selection");
  assert.equal(state.match.questionIndex, 0);
});

test("expanded saved answers govern scoring; wrong answers, hints and replays cannot bypass three-question forge", () => {
  let state = until(fresh("volt"), s => s.match.phase === "training");
  const q = state.match.questions[0];
  assert.equal(q.type, "numeric");
  q.answer = 314;
  const copied = structuredClone(q);
  state = applyAction(state, { type: "answer", questionId: q.id, answer: 315 });
  assert.equal(state.match.questionIndex, 0);
  state = applyAction(state, { type: "hint", questionId: q.id });
  const action = { type: "answer", questionId: q.id, answer: 314, expectedVersion: state.version };
  const next = applyAction(state, action);
  assert.deepEqual(applyAction(state, action), next);
  assert.throws(() => applyAction(next, action), e => e.code === "STALE_VERSION");
  assert.equal(next.match.questions[0].completion, "worked");
  assert.equal(next.match.questions[0].answer, copied.answer);
  state = step(next);
  assert.equal(state.match.questionIndex, 2);
  assert.equal(state.match.staff, false);
  assert.equal(state.match.phase, "training");
  state = step(state);
  assert.equal(state.match.questionIndex, 3);
  assert.equal(state.match.staff, true);
  assert.equal(state.match.phase, "player_upgrade");
});

for (const hero of HEROES) test(`${hero.id}: retry preserves hero, seed, equipment and learning without reroll`, () => {
  const initial = until(fresh(hero.id), s => s.match.round === 3 && s.match.phase === "battle");
  let defeated = structuredClone(initial);
  defeated.match.playerHP = 1;
  defeated.match.intent = "heavy";
  defeated = applyAction(defeated, { type: "move", move: "strike" });
  assert.equal(defeated.match.phase, "defeat");
  const questions = structuredClone(defeated.match.questions);
  const retried = applyAction(freeze(defeated), { type: "retry" });
  for (const key of ["heroId", "rulesVersion", "learningLevel", "seed", "id", "number", "questionIndex", "trainingStage", "staff", "pad", "intent"])
    assert.deepEqual(retried.match[key], initial.match[key]);
  assert.deepEqual(retried.match.questions, questions);
  assert.equal(retried.match.roundAttempt, 2);
  assert.equal(retried.match.playerHP, BATTLE_CONFIG.rounds[2].playerHP);
  assert.equal(Object.hasOwn(retried.match.lastEvent, "ability"), false);
  let a = initial, b = retried;
  for (let i = 0; i < 4; i++) {
    const move = bestLegalAction(a);
    a = applyAction(a, { type: "move", move });
    b = applyAction(b, { type: "move", move });
    for (const key of ["intent", "playerHP", "rivalHP", "energy", "phase"]) assert.equal(a.match[key], b.match[key]);
  }
  const assisted = applyAction(defeated, { type: "retry", support: true });
  assert.equal(assisted.match.assisted, true);
  assert.deepEqual(assisted.match.questions, questions);
  assert.equal(assisted.match.seed, initial.match.seed);
  assert.equal(assisted.match.learningLevel, initial.match.learningLevel);
});

for (const [wins, learningLevel] of [[0, 1], [1, 1], [2, 2], [3, 2], [4, 3], [5, 3], [100, 3], [Number.MAX_SAFE_INTEGER - 1, 3]]) {
  test(`learning level: ${wins} wins selects band ${learningLevel}, independent of tier and attempts`, () => {
    for (const hero of HEROES) {
      const initial = createState({ profileId: "learning-threshold" });
      Object.assign(initial, { wins, tier: 900, nextMatchNumber: 123 });
      const state = applyAction(freeze(initial), { type: "start", heroId: hero.id });
      assert.equal(state.match.learningLevel, learningLevel);
      assert.equal(publicState(state).match.learningLevel, learningLevel);
      const selected = content.selectExpandedQuestions(123, hero.id, learningLevel);
      assert.equal(selected.length, 6);
      for (const [index, q] of selected.entries()) {
        assert.equal(q.slot, index);
        assert.equal(q.learningLevel, learningLevel);
        assert.equal(q.difficulty, ["Foundation", "Applied", "Stretch"][learningLevel - 1]);
        for (const key of Object.keys(q)) assert.deepEqual(state.match.questions[index][key], q[key]);
      }
      assert.equal(equipmentStage(state.match), 0);
      assert.equal(state.match.questionIndex, 0);
      assertRedacted(state);
      const legacy = applyAction(initial, { type: "start" });
      assert.equal(Object.hasOwn(legacy.match, "learningLevel"), false);
      assert.equal(legacy.match.questions.length, 4);
    }
  });
}

for (const hero of HEROES) for (const learningLevel of [2, 3]) {
  test(`${hero.id}: band ${learningLevel} completes six matching-band tasks and earns upgrades sequentially`, () => {
    const initial = createState({ profileId: `learning-duel-${hero.id}-${learningLevel}` });
    initial.wins = (learningLevel - 1) * 2;
    initial.tier = initial.wins + 1;
    let state = applyAction(initial, { type: "start", heroId: hero.id });
    const answered = [], upgrades = [];
    for (let i = 0; i < 200 && state.match.phase !== "victory"; i++) {
      const m = state.match;
      assert.notEqual(m.phase, "defeat");
      assert.equal(m.learningLevel, learningLevel);
      if (m.phase === "training") {
        const q = m.questions[m.questionIndex];
        assert.equal(q.learningLevel, learningLevel);
        assert.equal(equipmentStage(m), m.trainingStage - 1);
        answered.push(q.slot);
      }
      if (m.phase === "player_upgrade") upgrades.push(m.questionIndex);
      assertRedacted(state);
      state = step(state);
    }
    assert.equal(state.match.phase, "victory");
    assert.deepEqual(answered, [0, 1, 2, 3, 4, 5]);
    assert.deepEqual(upgrades, [3, 6]);
    assert.equal(state.wins, initial.wins + 1);
    assert.equal(state.match.assisted, false);
    assert.deepEqual(publicState(state, { review: true }).match, state.match);
  });
}

for (const [wins, learningLevel] of [[1, 1], [3, 2], [4, 3]]) {
  test(`learning level ${learningLevel}: repeated resets and supported retries cannot raise the band`, () => {
    let state = createState({ profileId: "learning-reset" });
    Object.assign(state, { wins, tier: wins + 1 });
    for (let attempt = 0; attempt < 8; attempt++) {
      state = applyAction(state, { type: "start", heroId: HEROES[attempt % HEROES.length].id });
      assert.equal(state.match.learningLevel, learningLevel);
      assert.equal(equipmentStage(state.match), 0);
      state.match.playerHP = 1;
      state.match.intent = "heavy";
      state = applyAction(state, { type: "move", move: "strike" });
      assert.equal(state.match.phase, "defeat");
      const questions = structuredClone(state.match.questions);
      state = applyAction(freeze(state), { type: "retry", support: attempt % 2 === 0 });
      assert.equal(state.match.learningLevel, learningLevel);
      assert.deepEqual(state.match.questions, questions);
      assert.equal(state.wins, wins);
      state = applyAction(state, { type: "reset" });
      assert.equal(state.history.at(-1).learningLevel, learningLevel);
      assert.equal(publicState(state).history.at(-1).learningLevel, learningLevel);
      assert.equal(state.wins, wins);
    }
    assert.equal(state.nextMatchNumber, 9);
  });
}

test("learning band changes only on a new match after earned win thresholds, never on a saved match", () => {
  for (const wins of [1, 3]) {
    const initial = createState({ profileId: `learning-promotion-${wins}` });
    Object.assign(initial, { wins, tier: wins + 1 });
    const started = applyAction(initial, { type: "start", heroId: "relay" });
    const level = started.match.learningLevel;
    const won = until(started, s => s.match.phase === "victory");
    assert.equal(won.wins, wins + 1);
    assert.equal(won.match.learningLevel, level);
    assert.equal(publicState(won).match.learningLevel, level);
    const next = applyAction(freeze(won), { type: "start", heroId: "relay" });
    assert.equal(next.match.learningLevel, level + 1);
    assert.equal(next.history.at(-1).learningLevel, level);
    assert.equal(publicState(next).history.at(-1).learningLevel, level);
    assert.deepEqual(next.history.at(-1).questions, won.match.questions);
    assert.equal(equipmentStage(next.match), 0);
    for (const move of ["break", "special"])
      assert.throws(() => applyAction(next, { type: "move", move }), e => e.code === "MOVE_LOCKED");
  }
});

test("learning level rejects client overrides and invalid saved values but accepts older hero snapshots", () => {
  for (const learningLevel of [undefined, null, 0, 4, -1, 1.5, "2", NaN, Infinity]) {
    const state = fresh("relay");
    state.match.learningLevel = learningLevel;
    error(() => publicState(state), "INVALID_STATE");
  }
  for (const field of ["learningLevel", "wins", "tier", "staff", "pad"])
    error(() => applyAction(createState({ profileId: "client-level" }), { type: "start", heroId: "relay", [field]: 3 }), "INVALID_ACTION");
  const old = fresh("relay");
  delete old.match.learningLevel;
  assert.doesNotThrow(() => publicState(old));
  const next = applyAction(old, { type: "move", move: "strike" });
  assert.equal(Object.hasOwn(next.match, "learningLevel"), false);
  assert.deepEqual(next.match.questions, old.match.questions);
});

test("reset and victory archives retain optional hero id with complete private review and legacy history shape", () => {
  const won = until(fresh("glacier"), s => s.match.phase === "victory");
  const next = applyAction(won, { type: "start", heroId: "bastion" });
  assert.deepEqual(next.history[0], { ...won.match, outcome: "victory" });
  assert.equal(next.match.heroId, "bastion");
  const reset = applyAction(freeze(next), { type: "reset" });
  assert.equal(reset.match, null);
  assert.equal(reset.wins, 1);
  assert.equal(reset.tier, 2);
  assert.deepEqual(reset.history[1], { ...next.match, outcome: "reset" });
  assert.deepEqual(publicState(reset).history.map(m => m.heroId), ["glacier", "bastion"]);
  assert.ok(publicState(reset).history.every(m => !Object.hasOwn(m, "questions")));
  assert.deepEqual(publicState(reset, { review: true }).history, reset.history);
  const legacy = applyAction(reset, { type: "start" });
  assert.equal(legacy.match.questions.length, 4);
  assert.equal(Object.hasOwn(legacy.match, "heroId"), false);
  assert.equal(Object.hasOwn(legacy.match, "rulesVersion"), false);
  const archived = applyAction(legacy, { type: "reset" });
  assert.deepEqual(Object.keys(publicState(archived).history[2]), ["id", "number", "round", "phase", "outcome", "assisted"]);
  assert.equal(archived.nextMatchNumber, 4);
});
