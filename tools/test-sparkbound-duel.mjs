import assert from 'node:assert/strict';
import test from 'node:test';
import { duelCue, duelMoves, exchangeOutcome, roundReward } from '../sparkbound/src/duel.js';
import { createState, applyAction, publicState, BATTLE_CONFIG } from '../functions/_lib/sparkbound.js';
import { INTENTS, MOVES, QUESTION_BANK, selectQuestions } from '../functions/_lib/sparkbound-content.js';

const intents = ['open', 'strike', 'guard', 'heavy'];
const equipment = [
  { staff: false, pad: false, ids: ['strike', 'guard'] },
  { staff: true, pad: false, ids: ['strike', 'guard', 'break'] },
  { staff: true, pad: true, ids: ['strike', 'guard', 'break', 'special'] },
  { staff: false, pad: true, ids: ['strike', 'guard', 'special'] }
];
const match = (extra = {}) => ({ round: 1, intent: 'open', energy: 2, staff: false, pad: false, ...extra });
const freeze = value => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};

test('Equipment, not energy or round, determines the visible two/three/four moves', () => {
  for (const kit of equipment) for (const round of [1, 2, 3]) for (let energy = 0; energy <= 4; energy++) {
    const moves = duelMoves(match({ ...kit, round, energy }));
    assert.deepEqual(moves.map(move => move.id), kit.ids);
    assert.equal(new Set(moves.map(move => move.id)).size, moves.length);
    for (const move of moves) {
      const cost = { strike: 0, guard: 0, break: 2, special: 4 }[move.id];
      assert.equal(move.disabled, energy < cost, `${move.id}, energy=${energy}`);
      assert.ok(move.name && move.icon && move.hint);
      assert.doesNotMatch(`${move.name} ${move.hint}`, /locked|unlock|forge required/i);
    }
  }
});

test('Move copy states exact costs and never promises charge from an opening guard', () => {
  for (const intent of intents) for (let energy = 0; energy <= 4; energy++) {
    const moves = duelMoves(match({ intent, energy, staff: true, pad: true }));
    assert.match(moves[0].hint, energy < 4 ? /\+1 energy/ : /energy full/i);
    assert.match(moves[1].hint, intent === 'open' ? /no hit to block/i : energy < 4 ? new RegExp(`\\+${Math.min(2, 4 - energy)} energy`) : /energy full/i);
    if (intent === 'open') assert.doesNotMatch(moves[1].hint, /\+2|charge|build energy/i);
    assert.match(moves[2].hint, energy < 2 ? /needs 2 energy/i : /use 2 energy/i);
    assert.match(moves[3].hint, energy < 4 ? /needs 4 energy/i : /use 4 energy/i);
  }
});

test('Every cue suggests an available, affordable move without disabling alternatives', () => {
  for (const kit of equipment) for (const intent of intents) for (let energy = 0; energy <= 4; energy++) {
    const m = match({ ...kit, intent, energy });
    const cue = duelCue(m), moves = duelMoves(m);
    assert.ok(cue.title && cue.detail && cue.icon && cue.tone && cue.badge);
    assert.ok(moves.some(move => move.id === cue.suggested && !move.disabled), JSON.stringify(m));
    assert.equal(moves.filter(move => !move.disabled).length >= 2, true);
    assert.equal(moves.find(move => move.id === 'strike').disabled, false);
    assert.equal(moves.find(move => move.id === 'guard').disabled, false);
  }
});

test('Attack and heavy intent cues explain defending even with zero energy', () => {
  for (const intent of ['strike', 'heavy']) for (const kit of equipment) {
    const cue = duelCue(match({ ...kit, intent, energy: 0 }));
    assert.equal(cue.suggested, 'guard');
    assert.match(cue.title, /attack|hit/i);
    assert.match(cue.detail, /shield|block/i);
  }
  assert.notEqual(duelCue(match({ intent: 'heavy' })).title, duelCue(match({ intent: 'strike' })).title);
});

test('Guard intent recommends charging until a pulse launcher is owned and affordable', () => {
  for (const kit of equipment) for (let energy = 0; energy <= 4; energy++) {
    const cue = duelCue(match({ ...kit, intent: 'guard', energy }));
    assert.match(cue.title, /shield/i);
    assert.equal(cue.suggested, kit.staff && energy >= 2 ? 'break' : 'guard');
    assert.match(cue.detail, kit.staff && energy >= 2 ? /pulse launcher.*fire through/i : energy < 4 ? /energy/i : /shield safe.*opening/i);
  }
});

test('Opening cues use only genuinely unlocked, affordable moves', () => {
  for (const kit of equipment) for (let energy = 0; energy <= 4; energy++) {
    const cue = duelCue(match({ ...kit, energy }));
    assert.match(cue.title, /open/i);
    assert.match(cue.detail, /no incoming hit/i);
    assert.equal(cue.suggested, kit.pad && energy >= 4 ? 'special' : kit.staff && energy >= 2 ? 'break' : 'strike');
  }
});

test('Only server exchange events produce an exchange recap', () => {
  for (const value of [undefined, null, {}, ...['match_started', 'round_started', 'answer_wrong', 'answer_correct', 'hint', 'victory', 'retry'].map(kind => ({ kind }))]) {
    assert.equal(exchangeOutcome(value), null);
  }
});

test('A zero incoming guard accurately reports no shield change, not a successful hit', () => {
  const started = applyAction(createState({ profileId: 'duel-unit' }), { type: 'start' });
  started.match.energy = 0;
  const next = applyAction(started, { type: 'move', move: 'guard' });
  assert.equal(next.match.playerHP, started.match.playerHP);
  assert.equal(next.match.rivalHP, started.match.rivalHP);
  assert.equal(next.match.energy, 0);
  const recap = exchangeOutcome(next.match.lastEvent);
  assert.match(`${recap.title} ${recap.detail}`, /no incoming hit/i);
  assert.match(recap.detail, /neither shield changed/i);
  assert.doesNotMatch(recap.title, /absorbed|landed|pierced|opening taken/i);
});

test('Recap distinguishes shield piercing, a blocked attack, an opening and an ordinary hit', () => {
  const event = { kind: 'exchange', move: 'strike', intent: 'strike', damage: 4, rivalDamage: 4, guardBroken: false };
  assert.match(exchangeOutcome({ ...event, guardBroken: true }).title, /pierced/i);
  assert.match(exchangeOutcome({ ...event, damage: 0, intent: 'guard' }).title, /blocked/i);
  assert.match(exchangeOutcome({ ...event, intent: 'open', rivalDamage: 0 }).title, /opening/i);
  assert.match(exchangeOutcome(event).title, /landed/i);
  assert.equal(exchangeOutcome(event).positive, false);
});

test('Presentation agrees with server outcomes across 888 legal move/resource/intent combinations', () => {
  let cases = 0;
  for (const round of [1, 2, 3]) for (const intent of intents) for (let energy = 0; energy <= 4; energy++) {
    for (const assisted of [false, true]) for (const kit of equipment.slice(0, 3)) {
      const state = applyAction(createState({ profileId: 'duel-matrix' }), { type: 'start' });
      Object.assign(state.match, { round, intent, energy, assisted, staff: kit.staff, pad: kit.pad, playerHP: 24, rivalHP: 50 });
      for (const move of duelMoves(state.match)) {
        if (move.disabled) {
          assert.throws(() => applyAction(state, { type: 'move', move: move.id }), error => error.code === 'INSUFFICIENT_ENERGY');
          continue;
        }
        const next = applyAction(state, { type: 'move', move: move.id });
        const event = next.match.lastEvent, recap = exchangeOutcome(event);
        assert.equal(event.damage, state.match.rivalHP - next.match.rivalHP);
        assert.equal(event.rivalDamage, state.match.playerHP - next.match.playerHP);
        assert.ok(recap.title && recap.detail);
        if (move.id === 'guard' && intent === 'open') {
          assert.match(recap.detail, /no incoming hit.*neither shield changed/i);
        } else {
          assert.match(recap.detail, new RegExp(`Prism lost ${event.damage} shield\\. You lost ${event.rivalDamage}\\.`));
        }
        if (move.id === 'guard') {
          assert.equal(next.match.energy, intent === 'open' ? energy : Math.min(4, energy + 2));
          const incoming = Math.floor(BATTLE_CONFIG.incoming[intent] / 5);
          assert.equal(event.rivalDamage, assisted ? Math.floor(incoming / 2) : incoming);
        }
        if (['strike', 'guard'].includes(move.id)) {
          const delta = next.match.energy - state.match.energy;
          const advertised = /\+(\d+) energy/.exec(move.hint);
          assert.equal(advertised ? Number(advertised[1]) : 0, delta, `${move.id}: ${intent}, energy ${energy}`);
          if (delta === 0) assert.match(move.hint, intent === 'open' && move.id === 'guard' ? /no hit to block/i : /energy full/i);
        }
        cases++;
      }
    }
  }
  assert.equal(cases, 888, 'All server-backed combinations were exercised');
});

test('Recap uses clipped server losses, including the final shield point', () => {
  for (const move of ['strike', 'guard', 'break', 'special']) {
    const state = applyAction(createState({ profileId: 'duel-last-shield' }), { type: 'start' });
    Object.assign(state.match, { intent: 'heavy', playerHP: 1, rivalHP: 1, energy: 4, staff: true, pad: true });
    const next = applyAction(state, { type: 'move', move });
    const event = next.match.lastEvent;
    assert.equal(event.rivalDamage, 1);
    assert.equal(event.damage, move === 'guard' ? 0 : 1);
    assert.match(exchangeOutcome(event).detail, new RegExp(`Prism lost ${event.damage} shield\\. You lost 1\\.`));
  }
});

test('Presentation helpers are pure and independent of the next intent or live resources', () => {
  const m = freeze(match({ intent: 'heavy', staff: true, pad: true, energy: 3 }));
  assert.deepEqual(duelCue(m), duelCue(m));
  assert.deepEqual(duelMoves(m), duelMoves(m));
  assert.equal(roundReward(m), roundReward(m));
  const event = freeze({ kind: 'exchange', intent: 'guard', move: 'break', guardBroken: true, damage: 7, rivalDamage: 2 });
  assert.deepEqual(exchangeOutcome(event), exchangeOutcome(event));
  const moves = duelMoves(m);
  moves[0].name = 'changed';
  assert.equal(duelMoves(m)[0].name, 'Attack');
});

test('Rewards state the next learning upgrade and final mission', () => {
  assert.match(roundReward(match({ round: 1 })), /maths.*pulse launcher/i);
  assert.match(roundReward(match({ round: 2 })), /science.*bigger armour.*twin power cells.*overdrive/i);
  assert.match(roundReward(match({ round: 3 })), /win.*city guardian/i);
});

test('Pierce and Overdrive retain internal IDs and costs with ranged presentation', () => {
  const moves = duelMoves(match({ staff: true, pad: true, energy: 4 }));
  assert.equal(moves.find(move => move.id === 'break').name, 'Pierce');
  assert.equal(moves.find(move => move.id === 'break').icon, 'target');
  assert.equal(moves.find(move => move.id === 'special').name, 'Overdrive');
  assert.equal(MOVES.break.label, 'Pierce');
  assert.equal(MOVES.special.label, 'Overdrive');
  assert.deepEqual(Object.entries(MOVES).map(([id, move]) => [id, move.cost, move.unlockRound]), [
    ['strike', 0, 1], ['guard', 0, 1], ['break', 2, 2], ['special', 4, 3]
  ]);
  assert.match(INTENTS.guard.description, /pulse launcher.*Pierce/);
});

test('Future question and duel copy uses launcher wording without renaming legacy task IDs', () => {
  assert.deepEqual(QUESTION_BANK.filter(q => q.taskId === 'staff-length').map(q => q.id), ['staff-length-v1', 'staff-length-v2']);
  for (const question of QUESTION_BANK) {
    const { title, prompt, outcome, hints, explanation, choices, evidence } = question;
    assert.doesNotMatch(JSON.stringify({ title, prompt, outcome, hints, explanation, choices, evidence }), /\bstaff\b/i);
    if (question.slot === 1) assert.match(outcome, /pulse launcher/i);
    if (question.slot === 2) assert.match(outcome, /larger armour plates/i);
    if (question.slot === 3) assert.match(outcome, /twin power cells.*Overdrive/i);
  }
  assert.doesNotMatch(JSON.stringify({ INTENTS, MOVES }), /\bstaff\b/i);
  for (const kit of equipment) for (const intent of intents) for (let energy = 0; energy <= 4; energy++) {
    const m = match({ ...kit, intent, energy });
    assert.doesNotMatch(JSON.stringify([duelCue(m), duelMoves(m), ...[1, 2, 3].map(round => roundReward({ ...m, round }))]), /\bstaff\b/i);
  }
});

test('Resuming and archiving a historical staff question preserves its saved copy', () => {
  const saved = applyAction(createState({ profileId: 'legacy-launcher-copy' }), { type: 'start' });
  Object.assign(saved.match.questions[0], {
    prompt: 'Relay has 3 packs with 8 cells in each pack. How many cells can go into the staff cartridge?',
    outcome: 'The staff cartridge receives its cells.'
  });
  const questions = structuredClone(saved.match.questions);
  freeze(saved);
  const resumed = applyAction(saved, { type: 'move', move: 'guard' });
  assert.deepEqual(resumed.match.questions, questions);
  assert.deepEqual(publicState(resumed, { review: true }).match.questions, questions);
  const archived = applyAction(resumed, { type: 'reset' });
  const fresh = applyAction(archived, { type: 'start' });
  assert.deepEqual(fresh.history[0].questions, questions);
  assert.deepEqual(publicState(fresh, { review: true }).history[0].questions, questions);
  assert.deepEqual(saved.match.questions, questions);
  assert.match(fresh.match.questions[0].prompt, /pulse launcher/i);
  assert.match(selectQuestions(1)[0].prompt, /pulse launcher/i);
});

test('Full-energy tactical cues do not promise energy that cannot be gained', () => {
  for (const intent of ['strike', 'guard']) {
    const cue = duelCue(match({ intent, energy: 4 }));
    assert.equal(cue.suggested, 'guard');
    assert.equal(cue.badge, 'Protect');
    assert.doesNotMatch(cue.detail, /builds? energy|charge/i);
  }
});

test('Suggested-move policy wins all three rounds for 120 seeds without support or stalls', () => {
  for (let seed = 0; seed < 120; seed++) {
    let state = applyAction(createState({ profileId: `duel-policy-${seed}` }), { type: 'start' });
    state.match.seed = seed;
    const wonRounds = new Set();
    for (let turn = 0; turn < 150 && state.match.phase !== 'victory'; turn++) {
      const m = state.match;
      assert.notEqual(m.phase, 'defeat', `Seed ${seed} lost round ${m.round} at step ${turn}`);
      if (m.phase === 'round_won') wonRounds.add(m.round);
      const action = m.phase === 'battle' ? { type: 'move', move: duelCue(m).suggested } :
        m.phase === 'training' ? { type: 'answer', questionId: m.questions[m.questionIndex].id, answer: m.questions[m.questionIndex].answer } :
          { type: 'continue' };
      state = applyAction(state, action);
    }
    assert.equal(state.match.phase, 'victory', `Seed ${seed} stalled before victory`);
    assert.deepEqual([...wonRounds], [1, 2, 3], `Seed ${seed} won each round`);
    assert.equal(state.match.assisted, false);
    assert.equal(state.wins, 1);
    assert.ok(state.match.questions.every(q => q.resolved && q.completion === 'independent'));
  }
});
