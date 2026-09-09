import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { EXPANDED_QUESTION_BANK as bank, selectExpandedQuestions as select, selectCampaignQuestions } from "../functions/_lib/sparkbound-expansion-content.js";
import * as legacy from "../functions/_lib/sparkbound-content.js";
import { createState, applyAction, publicState } from "../functions/_lib/sparkbound.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const heroes = ["relay", "helio", "volt", "bastion", "zephyr", "glacier"];
const campaignHeroes = [...heroes, "ember", "tidal", "atlas", "nova", "echo"];
const ids = (questions) => questions.map((q) => q.id);
const byTask = Map.groupBy(bank.filter((q) => q.learningLevel === 1), (q) => q.taskId);
const originalBank = bank.filter(q => q.learningLevel <= 3);

test("campaign selects fifteen unique bank tasks across five progressively harder alternating forges", () => {
  for (const hero of campaignHeroes) for (const level of [2, 3])
    for (const number of [1, 2, 3, 4, 5, 6, 7, 8, 100000, Number.MAX_SAFE_INTEGER]) {
      const questions = selectCampaignQuestions(number, hero, level);
      assert.equal(questions.length, 15);
      assert.equal(new Set(ids(questions)).size, 15);
      assert.equal(new Set(questions.map(q => q.taskId)).size, 15);
      assert.equal(new Set(questions.map(q => q.prompt)).size, 15);
      assert.deepEqual(questions, selectCampaignQuestions(number, hero, level));
      for (const [index, q] of questions.entries()) {
        const stage = Math.floor(index / 3) + 1;
        assert.equal(q.forgeStage, stage);
        assert.equal(q.forge, stage % 2 ? "maths" : "science");
        assert.equal(q.learningLevel, Math.min(5, level + stage - 1));
        const { forgeStage, ...snapshot } = q;
        assert.deepEqual(snapshot, bank.find(candidate => candidate.id === q.id));
      }
      questions[0].prompt = "Detached copy";
      assert.notEqual(selectCampaignQuestions(number, hero, level)[0].prompt, "Detached copy");
    }
  for (const number of [0, -1, 1.5, NaN, Infinity, "1", Number.MAX_SAFE_INTEGER + 1])
    assert.throws(() => selectCampaignQuestions(number), RangeError);
  for (const hero of [null, "unknown", "Ember", "echo ", {}, []])
    assert.throws(() => selectCampaignQuestions(1, hero), RangeError);
  for (const level of [0, 1, 4, 5, 1.5, "2", null, NaN])
    assert.throws(() => selectCampaignQuestions(1, "relay", level), RangeError);
});

test("campaign copy is stage-neutral and does not promise legacy equipment or an early final round", () => {
  for (const q of bank) {
    const copy = [q.title, q.prompt, q.outcome, q.explanation, ...q.hints].join(" ");
    assert.doesNotMatch(copy, /\b(final round|last round|staff|pad|pulse launcher|overdrive)\b/i, q.id);
  }
});

test("five calibrated bands of 48: six slots, four tasks per slot, two variants per task", () => {
  assert.equal(bank.length, 240);
  assert.equal(new Set(ids(bank)).size, 240);
  assert.equal(new Set(bank.map((q) => q.prompt)).size, 240);
  assert.equal(byTask.size, 24);
  for (let slot = 0; slot < 6; slot++) {
    for (const level of [1, 2, 3, 4, 5]) {
      const questions = bank.filter((q) => q.slot === slot && q.learningLevel === level);
      assert.equal(questions.length, 8);
      assert.equal(new Set(questions.map((q) => q.taskId)).size, 4);
      assert.ok(questions.every((q) => q.forge === (slot < 3 ? "maths" : "science")));
      assert.ok(questions.every((q) => q.difficulty === ["Foundation", "Applied", "Stretch", "Challenge", "Master"][level - 1]));
      for (const pair of Map.groupBy(questions, (q) => q.taskId).values())
        assert.deepEqual(pair.map((q) => q.variant), [1, 2]);
    }
  }
  for (const [taskId, questions] of byTask) {
    assert.match(taskId, /^expansion-/);
    assert.deepEqual(questions.map((q) => q.variant), [1, 2]);
    assert.equal(questions[0].skill, questions[1].skill);
    assert.equal(questions[0].slot, questions[1].slot);
    assert.notEqual(questions[0].prompt, questions[1].prompt);
  }
  assert.ok(bank.every((q) => !legacy.QUESTION_BANK.some((old) => old.id === q.id || old.prompt === q.prompt)));
});

test("legacy source and 24-variant/four-selection contract remain unchanged", () => {
  const source = readFileSync(join(root, "functions/_lib/sparkbound-content.js"), "utf8");
  const original = source.replace(/\r?\nexport \{ EXPANDED_QUESTION_BANK, selectExpandedQuestions \} from "\.\/sparkbound-expansion-content\.js";\r?\n?$/, "");
  // Canonical LF matches the pre-edit source; a footer re-export is the only allowed change.
  const hash = createHash("sha256").update(original.replace(/\r?\n/g, "\n")).digest("hex");
  assert.equal(hash, "d69cde4682a06963d78538583dd21b4c563441d929c3315b25adb2fdb9df69a4");
  assert.equal(legacy.EXPANDED_QUESTION_BANK, bank);
  assert.equal(legacy.selectExpandedQuestions, select);
  assert.equal(legacy.TASKS.length, 12);
  assert.equal(legacy.QUESTION_BANK.length, 24);
  for (let number = 1; number <= 8; number++) assert.equal(legacy.selectQuestions(number).length, 4);
});

test("every hero has eight deterministic matches, full coverage and a stable offset", () => {
  for (const level of [1, 2, 3]) {
    for (const [offset, hero] of heroes.entries()) {
      const seen = new Set();
      for (let number = 1; number <= 8; number++) {
        const questions = select(number, hero, level);
        assert.ok(questions.every((q) => q.learningLevel === level));
        assert.deepEqual(questions.map((q) => q.slot), [0, 1, 2, 3, 4, 5]);
        assert.deepEqual(questions.map((q) => q.forge), ["maths", "maths", "maths", "science", "science", "science"]);
        assert.deepEqual(questions, select(number, hero, level));
        assert.deepEqual(questions, select(number + offset, "relay", level));
        assert.deepEqual(questions, select(number + 8, hero, level));
        for (const q of questions) {
          assert.ok(!seen.has(q.id), `${hero} repeats ${q.id} before exhausting its cycle`);
          seen.add(q.id);
        }
      }
      assert.equal(seen.size, 48);
    }
  }
  assert.equal(new Set(heroes.map((hero) => ids(select(1, hero)).join())).size, 6);
  assert.deepEqual(select(1), select(1, "relay"));
  assert.deepEqual(ids(select(1)), ["expansion-supply-groups-v1", "expansion-build-number-v1", "expansion-elapsed-time-v1",
    "expansion-magnet-material-v1", "expansion-magnet-poles-v1", "expansion-melt-freeze-v1"]);
});

test("level changes are substantive, bounded and independent of match-count difficulty", () => {
  for (const q of bank.filter((entry) => entry.learningLevel === 1)) {
    const family = bank.filter((entry) => entry.taskId === q.taskId && entry.variant === q.variant);
    assert.deepEqual(family.map((entry) => entry.learningLevel), [1, 2, 3, 4, 5]);
    assert.equal(new Set(family.map((entry) => entry.prompt)).size, 5);
    assert.equal(new Set(family.map((entry) => entry.explanation)).size, 5);
    assert.ok(family.every((entry) => entry.slot === q.slot && entry.forge === q.forge));
  }
  const sample = (task, level) => bank.find((q) => q.taskId === `expansion-${task}` && q.variant === 1 && q.learningLevel === level);
  assert.match(sample("supply-groups", 2).prompt, /loose markers/);
  assert.match(sample("supply-groups", 3).prompt, /uses.*remain/);
  assert.match(sample("fraction-share", 2).prompt, /2\/3/);
  assert.match(sample("fraction-share", 3).prompt, /Use.*remain/);
  assert.match(sample("magnet-poles", 2).prompt, /turned/);
  assert.match(sample("magnet-poles", 3).prompt, /unknown.*other end/i);
  assert.match(sample("repeat-evidence", 3).prompt, /two.*third/);
  for (const level of [1, 2, 3]) {
    assert.ok(select(100000, "relay", level).every((q) => q.learningLevel === level));
    const first = select(4, "volt", level);
    const changed = select(4, "volt", level);
    changed[0].hints.reverse();
    changed[0].evidence.description = "changed";
    assert.deepEqual(select(4, "volt", level), first);
  }
});

test("strict inputs, safe-integer boundary and no random selection", () => {
  for (const value of [0, -1, 0.5, "1", NaN, Infinity, undefined, null, {}, 1n, Number.MAX_SAFE_INTEGER + 1])
    assert.throws(() => select(value), RangeError);
  for (const hero of ["", "Relay", "prism", "constructor", "toString", "__proto__", "relay ", null, 0, {}, ["relay"]])
    assert.throws(() => select(1, hero), RangeError);
  for (const level of [0, 4, -1, 1.5, "1", null, NaN, Infinity, {}, 1n])
    assert.throws(() => select(1, "relay", level), RangeError);
  const random = Math.random;
  Math.random = () => { throw new Error("Selection must not use randomness"); };
  try {
    for (const level of [1, 2, 3]) for (const hero of heroes) {
      for (const number of [1, 17, Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER]) {
        const reduced = Number((BigInt(number) - 1n) % 8n) + 1;
        assert.deepEqual(select(number, hero, level), select(reduced, hero, level));
      }
    }
  } finally { Math.random = random; }
});

test("deep freeze and complete selection detachment", () => {
  const checkFrozen = (value) => {
    if (!value || typeof value !== "object") return;
    assert.ok(Object.isFrozen(value));
    Object.values(value).forEach(checkFrozen);
  };
  checkFrozen(bank);
  const before = select(1);
  const edited = select(1);
  for (const q of edited) {
    q.prompt = "edited";
    q.hints[0] = "edited";
    q.evidence.description = "edited";
    if (q.choices.length) q.choices[0].label = "edited";
    if (Array.isArray(q.answer)) q.answer.reverse();
  }
  assert.deepEqual(select(1), before);
  assert.notEqual(before[0], select(1)[0]);
});

// Oracles read the problem operands, not its answer, hints or explanation.
const arithmetic = {
  "supply-groups": ([groups, each]) => groups * each,
  "tray-sharing": ([total, trays]) => total / trays,
  "pack-count": ([total, size]) => total / size,
  "missing-group": ([rows, total]) => total / rows,
  "digit-value": ([code, digit]) => {
    const place = String(code).length - 1 - String(code).indexOf(String(digit));
    return digit * 10 ** place;
  },
  "build-number": ([hundreds, tens, ones]) => hundreds * 100 + tens * 10 + ones,
  "fraction-share": ([total], prompt) => total / (prompt.includes("quarter") ? 4 : 3),
  "fraction-rest": ([total], prompt) => total - total / (prompt.includes("quarter") ? 4 : 2),
  "elapsed-time": ([startHour, startMinute, endHour, endMinute]) => endHour * 60 + endMinute - startHour * 60 - startMinute,
  "measure-difference": ([larger, smaller]) => larger - smaller
};

const tierArithmetic = {
  "supply-groups": ([boxes, each, extra, used], level) => boxes * each + extra - (level === 3 ? used : 0),
  "tray-sharing": (n, level) => level === 2 ? (n[0] - n[1]) / n[2] : n[0] / n[1] - n[2],
  "pack-count": ([total, already, size]) => (total - already) / size,
  "missing-group": (n, level) => level === 2 ? (n[0] - n[1]) / n[2] : (n[2] - n[1]) / n[0],
  "digit-value": ([code, tens, ones], level) => code + tens * 10 - (level === 3 ? ones : 0),
  "build-number": ([h, t, o, removed], level) => h * 100 + t * 10 + o - (level === 3 ? removed : 0),
  "fraction-share": ([total, numerator, denominator, used], level) => total * numerator / denominator - (level === 3 ? used : 0),
  "fraction-rest": ([total, numerator, denominator, last], level) => level === 2
    ? total - total * numerator / denominator + last : (total - total * numerator / denominator) / last,
  "length-sort": ([cm, mm]) => cm - mm / 10,
  "number-pattern": ([a, b, c, steps]) => c + (b - a) * steps,
  "elapsed-time": ([h1, m1, h2, m2, breaks, minutes]) => (h2 - h1) * 60 + m2 - m1 - breaks * minutes,
  "measure-difference": ([a, b, change, use], level) => level === 2 ? a - b - change : (a - change) - (b - use)
};

// Challenge/Master checks work forwards from each candidate (0..1000), without reading
// generated answers, hints or explanations. Exactly one candidate must satisfy the prompt.
function advancedCheck(task, n, level, x) {
  const master = level === 5;
  switch (task) {
    case "supply-groups": return master ? x * n[3] * (n[1] - n[0]) === n[2] * n[1] : x * n[0] + n[1] - n[2] === n[3];
    case "tray-sharing": return master ? x === n[0] - n[2] * (Math.floor((n[0] - n[1]) / n[2]) - n[3]) :
      x < n[2] && (n[0] - n[1] - x) % n[2] === 0;
    case "pack-count": return master ? x < n[2] && (n[0] + x - n[1]) % n[2] === 0 :
      n[1] + x * n[2] >= n[0] && n[1] + (x - 1) * n[2] < n[0];
    case "missing-group": return master ? x * n[0] + n[1] === x * n[2] - n[3] : (x + n[0]) * n[1] - n[2] === n[3];
    case "digit-value": {
      if (!master) return n[0] + x * 10 - n[1] === n[2];
      const h = Math.floor(x / 100), t = Math.floor(x / 10) % 10, o = x % 10;
      return x >= 100 && x <= 999 && h === n[0] && t - o === n[1] && h + t + o === n[2];
    }
    case "build-number": return master ? 2 * (x - n[2]) === n[0] * 100 + n[1] * 10 : n[0] * 100 + x * 10 + n[1] === n[2];
    case "fraction-share": return master ? x * n[0] === (n[2] + n[3]) * n[1] :
      x + n[3] * n[4] / n[5] === n[0] * n[1] / n[2];
    case "fraction-rest": return master ? x * (n[1] - n[0]) * (n[3] - n[2]) === n[4] * n[1] * n[3] :
      x * n[2] * n[4] === n[0] * (n[2] - n[1]) * (n[4] - n[3]);
    case "length-sort": return master ? x < n[2] + n[3] && (n[0] - n[1] / 10 - x) % (n[2] + n[3]) === 0 :
      x + n[1] * n[2] + n[3] / 10 === n[0];
    case "number-pattern": {
      let reading = master ? x : n[0];
      for (let i = 0; i < n[2]; i++) reading = master ? (i % 2 ? reading + n[1] : reading * n[0]) :
        (i % 2 ? reading * 2 : reading + n[1]);
      return master ? reading === n[3] : reading === x;
    }
    case "elapsed-time": {
      if (!master) return n[0] * 60 + n[1] + n[4] * n[5] + x === n[2] * 60 + n[3];
      let clock = n[6] * 60 + n[7] - x + n[5];
      for (let game = 0; game < n[2]; game++) clock += n[3] + (game < n[2] - 1 ? n[4] : 0);
      return clock === n[0] * 60 + n[1];
    }
    case "measure-difference": return master ? x % (n[0] + 1) === 0 &&
      x / (n[0] + 1) * n[0] - n[1] === x / (n[0] + 1) + n[1] : n[0] - n[2] - x === n[1] + x;
    default: assert.fail(`Missing advanced forward check: ${task}`);
  }
}

// Science review, 2026-09-08: these fixtures identify the sole supported answer by its
// meaning, independent of shuffled answer position. Other choices were reviewed for
// wrong light/pole paths, changed controls, unjustified always claims or numerical errors.
// Primary source checks (adult references; no older terminology is imported into questions):
// Fair tests: https://primaryconnections.org.au/pedagogical-tools/conducting-fair-test-investigations
// Magnet poles/iron: https://openstax.org/books/physics/pages/20-1-magnetic-fields-field-lines-and-force
// Reflected light: https://openstax.org/books/physics/pages/16-1-reflection
// Matter/mass: https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter
// Compression: https://openstax.org/books/university-physics-volume-1/pages/14-1-fluids-density-and-pressure
// Water changes: https://www.usgs.gov/water-science-school/science/evaporation-and-water-cycle
// Vibrating sources: https://openstax.org/books/physics/pages/14-2-sound-intensity-and-sound-level
const challengeTruth = {
  "light-source": ["Torch to A to B to wall", "Reflected light travelling from book to eye"],
  "shadow-block": ["B supplied the light reaching that patch", "A with B, because the other positions match"],
  "window-material": ["A: it passes light while blurring letters", "Test it alone, keeping letters and light unchanged"],
  "magnet-material": ["Could be wood or copper", "Material, not paint colour, explains these results"],
  "magnet-poles": ["North: X is north, Y south, then opposite", "Attraction: both turns leave unlike poles facing"],
  "contact-force": ["String: contact pull; magnet: pull across a gap", "A high with A low"],
  "fair-ramp": ["A and B: only their coverings differ", "Test both orders with matched cars and releases"],
  "repeat-evidence": ["B by 5 cm", "30 cm; subtract the tool's fixed error"],
  "matter-state": ["Same amount, different shape", "Air compresses without escaping"],
  "melt-freeze": ["Both have 40 g of water after subtracting jars", "Evaporation, then condensation"],
  "water-air": ["A and B", "Air supplies vapour that condenses on cold cups"],
  "sound-vibration": ["The divider reduces sound reaching the listener", "A and C"]
};
const masterTruth = {
  "light-source": ["The mirror reflects light from either source", "Both light routes must stay clear"],
  "shadow-block": ["Neither lamp has an unblocked path to that patch", "B versus C shows a position effect"],
  "window-material": ["Test the uncovered sheet", "B only"],
  "magnet-material": ["A only: ordinary iron attracts rather than repels", "Red copper, same size and shape"],
  "magnet-poles": ["North: X north, Y south, Z south, then opposite", "Repulsion: south faces south"],
  "contact-force": ["Magnetic pull crosses the gap without the string", "A wins on smooth; B wins on rough"],
  "fair-ramp": ["B on plastic versus B on felt", "First rolls go farther; neither covering leads at matching positions"],
  "repeat-evidence": ["A travelled 5 cm farther", "Match car and starting height"],
  "matter-state": ["Trapped air compresses more easily than trapped water", "The same trapped air changes volume, not mass"],
  "melt-freeze": ["Refreezing shows the water returning to its earlier state", "Liquid evaporates; vapour condenses at the cold lid"],
  "water-air": ["B: 15 mL per hour; A: 10", "Warm metal in humid air"],
  "sound-vibration": ["Each meter reads higher near than far", "Soft strike with screen, at the same meter position"]
};

test("advanced pattern changes count individual operations, not pairs of operations", () => {
  for (const q of bank.filter(q => q.learningLevel === 5 && q.taskId === "expansion-number-pattern"))
    assert.match(q.prompt, /Count each multiplication or addition as one change/);
});

test("Master box counts and deadline questions state their unique-answer constraints", () => {
  for (const task of ["supply-groups", "elapsed-time"]) {
    const questions = bank.filter(q => q.learningLevel === 5 && q.taskId === `expansion-${task}`);
    assert.equal(questions.length, 2);
    for (const q of questions) {
      assert.match(q.prompt, task === "supply-groups"
        ? /Each box starts with the same number of markers/
        : /minimum number of minutes before 3:00 pm/);
    }
  }
});

function lengthRankCredit(lengths, answerIndex) {
  // Ranks run longest to shortest. An answer tied across several ranks earns
  // equal credit at each occupied rank, matching a random choice within the tie.
  const answerLength = lengths[answerIndex];
  const before = lengths.filter(length => length > answerLength).length;
  const ties = lengths.filter(length => length === answerLength).length;
  return lengths.map((_, rank) => rank >= before && rank < before + ties ? 1 / ties : 0);
}

test("length-rank scoring splits ties at every rank, including the middle", () => {
  assert.deepEqual(lengthRankCredit([9, 7, 5, 3], 1), [0, 1, 0, 0]);
  assert.deepEqual(lengthRankCredit([7, 9, 7, 3], 0), [0, 0.5, 0.5, 0]);
  assert.deepEqual(lengthRankCredit([9, 9, 5, 3], 1), [0.5, 0.5, 0, 0]);
  assert.deepEqual(lengthRankCredit([3, 9, 5, 3], 3), [0, 0, 0.5, 0.5]);
  assert.deepEqual(lengthRankCredit([7, 7, 7, 7], 2), [0.25, 0.25, 0.25, 0.25]);
});

test("every advanced science answer-length rank stays below 35 percent in each band and overall", (t) => {
  for (const level of [4, 5, "combined"]) {
    const questions = bank.filter(q => q.forge === "science" &&
      (level === "combined" ? q.learningLevel >= 4 : q.learningLevel === level));
    assert.equal(questions.length, level === "combined" ? 48 : 24);
    for (const [measure, size] of [["words", s => s.split(/\s+/).length], ["characters", s => s.length]]) {
      const rates = [0, 0, 0, 0];
      for (const q of questions) {
        const credit = lengthRankCredit(q.choices.map(c => size(c.label)), q.choices.findIndex(c => c.id === q.answer));
        credit.forEach((value, rank) => { rates[rank] += value / questions.length; });
      }
      t.diagnostic(`Level ${level}, ${measure}, longest to shortest: ${rates.map(rate => (100 * rate).toFixed(2)).join("%, ")}%`);
      assert.ok(Math.abs(rates.reduce((sum, rate) => sum + rate, 0) - 1) < 1e-12);
      rates.forEach((rate, rank) => {
        assert.ok(rate <= 0.35, `Level ${level}: rank ${rank + 1} by ${measure} predicts ${(100 * rate).toFixed(2)}%`);
      });
    }
  }
});

test("advanced pole questions require and independently check the entire pole chain", () => {
  const opposite = pole => pole === "north" ? "south" : "north";
  for (const level of [4, 5]) {
    const q = bank.find(q => q.id === `expansion-magnet-poles-l${level}-v1`);
    assert.match(q.prompt, /Which pole and reasoning/);
    const turned = bank.find(q => q.id === `expansion-magnet-poles-l${level}-v2`);
    assert.match(turned.prompt, /Which interaction and pole reasoning are correct/);
    assert.equal(q.choices.filter(c => c.label.startsWith("North:")).length, 2);
    assert.equal(q.choices.filter(c => c.label.startsWith("South:")).length, 2);
    const valid = q.choices.filter(c => {
      const chain = /^(North|South): X (?:is )?(north|south), Y (north|south), (?:Z (north|south), )?then (same|opposite)$/.exec(c.label);
      assert.ok(chain, `${q.id}: explicit pole chain needed`);
      const [, answer, x, y, z, last] = chain;
      return x === "north" && y === opposite(x) && (level === 4 ? !z : z === y)
        && last === "opposite" && answer.toLowerCase() === opposite(z || y);
    });
    assert.deepEqual(valid.map(c => c.id), [q.answer]);
  }
});

test("reviewed science distractors use nearby reasoning errors, not impossible transformations", () => {
  const q = id => bank.find(q => q.id === `expansion-${id}`);
  const labels = id => q(id).choices.map(c => c.label).join(" | ");
  assert.doesNotMatch(labels("magnet-poles-l5-v2"), /no force|removes their poles|no pole/i);
  assert.doesNotMatch(labels("matter-state-l5-v1"), /water is a solid|cannot be matter/i);
  assert.match(labels("matter-state-l5-v1"), /compress equally/);
  assert.doesNotMatch(labels("melt-freeze-l5-v2"), /unseen|extra water|through the glass|stops existing/i);
  assert.match(q("melt-freeze-l5-v2").prompt, /below boiling temperature/);
  assert.match(labels("melt-freeze-l5-v2"), /vapour freezes into liquid/);
  assert.doesNotMatch(labels("water-air-l4-v2"), /room's surfaces|absorb liquid directly/);
  assert.match(labels("water-air-l4-v2"), /Coldness turns the air itself into water/);
});

test("science controls and conclusions are explicit in the question, not only in hints", () => {
  const ramp = bank.find(q => q.id === "expansion-fair-ramp-l5-v2");
  assert.doesNotMatch(JSON.stringify(ramp), /untested/);
  assert.equal(ramp.choices.find(c => c.id === ramp.answer).label,
    "First rolls go farther; neither covering leads at matching positions");
  const sound = bank.find(q => q.id === "expansion-sound-vibration-l4-v1");
  assert.match(sound.prompt, /Drum and listener stay put; only the divider changes/);
});

test("advanced prose is bounded, fully hinted and uses substantive new reasoning", () => {
  const advanced = bank.filter(q => q.learningLevel >= 4);
  assert.equal(advanced.length, 96);
  for (const q of advanced) {
    assert.ok(q.prompt.split(/\s+/).length <= 70, `${q.id}: too much reading`);
    assert.ok(q.choices.every(c => c.label.split(/\s+/).length <= 17), `${q.id}: long choice`);
    assert.equal(q.hints.length, 2);
    assert.ok(q.hints.every(hint => hint.length > 20));
    assert.doesNotMatch(q.prompt, /algebra|coefficient|hypotenuse|molecular|kinetic theory|electromagnetism|logarithm/i);
    assert.ok(!originalBank.some(old => old.prompt === q.prompt));
  }
});

const appliedTruth = {
  "light-source": ["The mirror reflects the torch's light", "Light must reach the book and then the eye"],
  "shadow-block": ["More lamp light reaches it", "The shadow is now on the left, away from the lamp"],
  "window-material": ["A, because objects can be seen clearly through it", "B, because it blocks the light"],
  "magnet-material": ["Sort by magnetic attraction, not just by being metal", "The material underneath matters, not just paint colour"],
  "magnet-poles": ["Repulsion instead of attraction", "A north pole"],
  "contact-force": ["The hand push needs contact; the magnetic pull does not", "Contact with the mat resists the car's motion"],
  "fair-ramp": ["Change only the covering and release without pushing", "Use the same release height for both coverings"],
  "repeat-evidence": ["A travelled farther in these trials on this surface", "It may reveal a real variation or a setup problem"],
  "matter-state": ["Its shape changes, but it remains liquid water", "A gas can occupy space even when it is invisible"],
  "melt-freeze": ["Solid water again", "B only"],
  "water-air": ["Water must boil before any of it can become gas", "Water vapour changes from gas to liquid at the cold surface"],
  "sound-vibration": ["Reducing the bell's vibration reduces the sound it makes", "Vibrations travel through air without pieces of drum travelling across"]
};
const stretchTruth = {
  "light-source": ["Torch to mirror to wall", "A working source is not enough; light must reach the book and the eye"],
  "shadow-block": ["The closer card blocks a wider part of the spreading light reaching the screen", "Keep lamp and screen fixed and change only card position"],
  "window-material": ["Both pass light, but only B meets the clear-view requirement", "Light passes through the hole; the material can still be opaque"],
  "magnet-material": ["It may contain magnetic material beneath the plastic", "Test it; being a metal alone does not settle strong attraction"],
  "magnet-poles": ["Attraction, because the other end is south", "Unmagnetised iron can also be attracted to a magnet"],
  "contact-force": ["The tested surfaces affect how the car's motion changes", "Magnetic force can act across a gap and through thin paper"],
  "fair-ramp": ["Car A on each covering, with the same ramp and release point", "Release both without an extra push"],
  "repeat-evidence": ["The results vary; collect more fair observations before a strong claim", "Repeating can be consistent while the measuring method is wrong"],
  "matter-state": ["Liquid changes shape with its container; this solid keeps its own shape", "The air is matter in the gas state and occupies space"],
  "melt-freeze": ["Melting permanently changes water into a different material", "The first is solid to liquid; the second can be liquid to gas"],
  "water-air": ["Liquid to gas, then gas to liquid", "Humid air supplies more water vapour that can condense"],
  "sound-vibration": ["Stopping one source's vibration does not stop another source's sound", "Both distance and the strength of the strike changed"]
};

// Independently reviewed truth fixtures, keyed to the authored scenario, not answer positions.
// Source/coverage notes: docs/design/sparkbound-expansion-content.md.
const scienceTruth = {
  "light-source": ["The switched-on torch", "It reflects light from the Sun"],
  "shadow-block": ["The block stops some lamp light reaching the screen", "On the screen behind the card"],
  "window-material": ["Clear transparent plastic", "Transparent"],
  "magnet-material": ["Iron", "Not every metal is strongly attracted to a magnet"],
  "magnet-poles": ["A push apart", "A pull together"],
  "contact-force": ["The hand touches the trolley and pushes it", "A magnetic force can act without contact"],
  "fair-ramp": ["The car and its release height", "Two things changed, so either could affect the result"],
  "repeat-evidence": ["To check whether the results show a consistent pattern", "Keep the record, check the setup and repeat fairly"],
  "matter-state": ["Liquid", "Gas"],
  "melt-freeze": ["Melting", "Freezing"],
  "water-air": ["It becomes water vapour in the air", "Water vapour in the air cools and becomes liquid"],
  "sound-vibration": ["The vibrating metal", "Vibrations travelling through the air"]
};

// Explicit truth values guard plausible distractors as well as the unchanged correct choices.
const correctedChoices = {
  "expansion-light-source-l2-v1": [
    ["The mirror makes its own light whenever the torch is nearby", false],
    ["The mirror reflects the torch's light", true],
    ["The mirror stores light and keeps shining after the torch is covered", false],
    ["The light seen at the mirror comes from the viewer's eyes", false]
  ],
  "expansion-contact-force-l3-v2": [
    ["The paper must touch the clip before any magnetic pull can act", false],
    ["Magnetic force can act across a gap and through thin paper", true],
    ["The paper has to move and push the clip", false],
    ["A paper barrier always blocks a magnet's pull", false]
  ],
  "expansion-repeat-evidence-l3-v2": [
    ["Identical results guarantee correct measurements", false],
    ["Repeating can be consistent while the measuring method is wrong", true],
    ["The end reading alone gives the length even when the start is not zero", false],
    ["Repeating more times will remove the same subtraction mistake", false]
  ],
  "expansion-water-air-l3-v1": [
    ["Gas to liquid, then liquid to gas", false],
    ["Liquid to solid, then solid to liquid", false],
    ["Liquid to gas, then gas to liquid", true],
    ["Liquid to gas, then gas to solid", false]
  ],
  "expansion-sound-vibration-l2-v1": [
    ["The hand changes only the sound's path, not the bell's vibration", false],
    ["Once ringing starts, the bell makes the same sound without vibrating", false],
    ["Smaller vibrations make the bell's sound louder", false],
    ["Reducing the bell's vibration reduces the sound it makes", true]
  ]
};

for (const [id, fixtures] of Object.entries(correctedChoices)) test(`reviewed misconception choices: ${id}`, () => {
  const q = bank.find((entry) => entry.id === id);
  assert.ok(q);
  assert.deepEqual(q.choices.map((choice) => choice.label), fixtures.map(([label]) => label));
  assert.deepEqual(q.choices.map((choice) => choice.id === q.answer), fixtures.map(([, correct]) => correct));
  assert.equal(fixtures.filter(([, correct]) => correct).length, 1);
  assert.ok(q.hints[1].endsWith(`Choose ${fixtures.find(([, correct]) => correct)[0]}.`));
  if (id === "expansion-repeat-evidence-l3-v2") {
    const [, start, end] = q.prompt.match(/start at (\d+) cm and end at (\d+) cm/);
    assert.equal(Number(end) - Number(start), 25);
    assert.match(q.prompt, /records 35 cm each time, without subtracting the starting reading/);
    assert.ok(q.explanation.includes(`${end} - ${start} = ${Number(end) - Number(start)} cm`));
    assert.match(q.explanation, /Starting at 10 cm is valid if that starting reading is subtracted/);
  } else if (id === "expansion-contact-force-l3-v2") {
    assert.match(q.prompt, /visible air gap remains between the clip and the paper/);
    assert.match(q.prompt, /paper stays still and unbroken/);
    assert.match(q.explanation, /clip does not pass through the paper/);
    assert.match(q.explanation, /push can pass through touching objects/);
  } else if (id === "expansion-water-air-l3-v1") {
    assert.match(q.prompt, /forms liquid drops/);
    assert.match(q.explanation, /Freezing would produce a solid, which is not observed/);
  } else if (id === "expansion-sound-vibration-l2-v1") {
    assert.match(q.prompt, /vibration becomes smaller and its ringing fades/);
    assert.match(q.explanation, /not just a change in the sound's path/);
  } else {
    assert.match(q.prompt, /ordinary mirror/);
    assert.match(q.explanation, /eyes receive light/);
  }
});

test("bounded review preserves all 144 IDs, answers and answer positions", () => {
  const signature = JSON.stringify(originalBank.map(({ id, answer }) => ({ id, answer })));
  assert.equal(createHash("sha256").update(signature).digest("hex"),
    "0c76d84fda9e676cd94c59b610d238990d1889be50bb01561ae708328e52f760");
  assert.equal(createHash("sha256").update(JSON.stringify(originalBank)).digest("hex"),
    "0ed28a885d65abd4f9406753119390e21648f62f5a2ede8bf6451afc33ccd1b9");
});

test("electricity is legacy-only, not an expanded hero-mode topic", () => {
  const isCircuit = (q) => q.evidence.kind.startsWith("circuit-");
  assert.equal(bank.filter((q) => q.forge === "science").length, 120);
  assert.equal(bank.filter(isCircuit).length, 0);
  assert.ok(bank.every((q) => !/electric|circuit/.test(q.skill)));
  const legacyCircuits = legacy.QUESTION_BANK.filter(isCircuit);
  assert.equal(legacyCircuits.length, 6);
  assert.deepEqual([...new Set(legacyCircuits.map((q) => q.taskId))].sort(), ["lamp-gap", "lamp-path", "lamp-switch"]);
  for (const level of [1, 2, 3]) for (const hero of heroes) for (let number = 1; number <= 8; number++) {
    const selected = select(number, hero, level);
    assert.ok(selected.every((q) => !isCircuit(q) && q.id.startsWith("expansion-")));
  }
  const notes = readFileSync(join(root, "docs/design/sparkbound-expansion-content.md"), "utf8");
  assert.ok(notes.includes("Electricity is not covered by expanded hero-mode matches."));
});

for (const q of bank) test(`format, evidence and independent answer: ${q.id}`, () => {
  for (const field of ["id", "taskId", "skill", "title", "prompt", "explanation", "outcome"])
    assert.ok(typeof q[field] === "string" && q[field].trim().length, field);
  assert.equal(q.id, `${q.taskId}${q.learningLevel > 1 ? `-l${q.learningLevel}` : ""}-v${q.variant}`);
  assert.ok(q.title.length <= 45);
  assert.ok(q.prompt.length >= 40 && q.prompt.length < 650);
  assert.equal(q.hints.length, 2);
  assert.ok(q.hints.every((hint) => typeof hint === "string" && hint.length >= 20));
  assert.notEqual(q.hints[0], q.hints[1]);
  assert.ok(["observation", "sequence", "measurement"].includes(q.evidence.kind));
  assert.ok(!("readings" in q.evidence));
  if (q.evidence.kind === "observation") assert.ok(q.evidence.description.length >= 20);
  const prose = [q.title, q.prompt, ...q.hints, q.explanation, q.outcome, JSON.stringify(q.evidence)].join(" ");
  assert.doesNotMatch(prose, /placeholder|lorem ipsum|weapon|launcher|damage|attack|cannon|<script|javascript:/i);
  assert.doesNotMatch(prose, /look directly at the sun|try this at home|mains electricity|boil a|heat a/i);
  assert.equal(new Set(q.choices.map((choice) => choice.id)).size, q.choices.length);
  assert.equal(new Set(q.choices.map((choice) => choice.label)).size, q.choices.length);
  assert.deepEqual(q.choices.map((choice) => choice.id), ["a", "b", "c", "d"].slice(0, q.choices.length));
  assert.ok(q.choices.every((choice) => typeof choice.label === "string" && choice.label.length > 0));
  const task = q.taskId.replace("expansion-", "");
  if (q.type === "numeric") {
    assert.equal(q.forge, "maths");
    assert.equal(q.choices.length, 0);
    const operands = [...q.prompt.matchAll(/\d+/g)].map((match) => Number(match[0]));
    assert.ok(operands.every((n) => n <= 1000));
    if (q.learningLevel >= 4) {
      const valid = Array.from({ length: 1001 }, (_, answer) => answer).filter(answer => advancedCheck(task, operands, q.learningLevel, answer));
      assert.deepEqual(valid, [q.answer], `Expected exactly one valid whole-number answer: ${q.id}`);
    } else {
      const oracle = q.learningLevel === 1 ? arithmetic[task] : tierArithmetic[task];
      assert.ok(oracle, `Missing oracle: ${task}`);
      assert.equal(q.answer, oracle(operands, q.learningLevel === 1 ? q.prompt : q.learningLevel));
    }
    assert.ok(Number.isSafeInteger(q.answer) && q.answer > 0 && q.answer <= 1000);
    assert.ok(q.explanation.includes(String(q.answer)));
    assert.ok(q.hints[1].endsWith(`Enter ${q.answer}.`));
  } else if (q.type === "order") {
    assert.equal(q.forge, "maths");
    assert.equal(q.choices.length, 4);
    const measure = (label) => parseInt(label) * (q.learningLevel === 2 && label.endsWith(" cm") ? 10 : 1);
    const sorted = [...q.choices].sort((a, b) => measure(a.label) - measure(b.label));
    assert.deepEqual(q.answer, sorted.map((choice) => choice.id));
    assert.ok(sorted.every((choice) => parseInt(choice.label) <= 1000));
    if (q.evidence.kind === "sequence") {
      const step = Number(q.prompt.match(/by (\d+)/)[1]);
      assert.equal(step, q.evidence.step);
      for (let i = 1; i < sorted.length; i++) assert.equal(Number(sorted[i].label) - Number(sorted[i - 1].label), step);
    } else if (q.learningLevel === 1) {
      assert.equal(q.evidence.unit, "cm");
      assert.ok(sorted.every((choice) => /^\d+ cm$/.test(choice.label)));
    } else {
      assert.equal(q.evidence.kind, "observation");
      assert.match(q.evidence.description, /1 cm = 10 mm/);
      assert.ok(sorted.every((choice) => /^\d+ (cm|mm)$/.test(choice.label)));
    }
  } else {
    assert.equal(q.type, "mcq");
    assert.equal(q.forge, "science");
    assert.equal(q.choices.length, 4);
    const fixtures = [scienceTruth, appliedTruth, stretchTruth, challengeTruth, masterTruth][q.learningLevel - 1];
    assert.ok(fixtures[task], `Missing truth fixture: ${task}`);
    const expected = fixtures[task][q.variant - 1];
    const valid = q.choices.filter((choice) => choice.label === expected);
    assert.equal(valid.length, 1);
    assert.equal(q.answer, valid[0].id);
    assert.ok(q.hints[1].endsWith(`Choose ${expected}.`));
  }
});

test("MCQ correct positions are balanced with no all-A shortcut", () => {
  for (const level of [1, 2, 3, 4, 5]) {
    const counts = { a: 0, b: 0, c: 0, d: 0 };
    for (const q of bank.filter((q) => q.type === "mcq" && q.learningLevel === level)) counts[q.answer]++;
    assert.deepEqual(counts, { a: 6, b: 6, c: 6, d: 6 });
    if (level <= 3) for (const hero of heroes) for (let number = 1; number <= 8; number++)
      assert.ok(new Set(select(number, hero, level).filter((q) => q.type === "mcq").map((q) => q.answer)).size >= 2);
  }
});

test("every new answer scores through existing authority and unrevealed content stays private", () => {
  for (const q of bank) {
    let state = applyAction(createState({ profileId: "expansion-content-test" }), { type: "start" });
    // Replace one question in the current authority's supported match shape, not its selection policy.
    state.match.phase = "training";
    state.match.questionIndex = 0;
    state.match.questions[0] = { ...structuredClone(q), attempts: [], supportEvents: [], hintsUsed: 0,
      feedback: null, resolved: false, completion: null };
    const original = structuredClone(state);
    const learner = publicState(state);
    assert.equal(learner.match.questions[0].prompt, q.prompt);
    assert.deepEqual(learner.match.questions[0].evidence, q.evidence);
    for (const question of learner.match.questions) {
      for (const key of ["answer", "hints", "explanation", "attempts", "supportEvents"])
        assert.ok(!(key in question), `${q.id} leaks ${key}`);
    }
    for (const future of learner.match.questions.slice(1)) assert.deepEqual(Object.keys(future).sort(), ["forge", "id"]);
    const serialised = JSON.stringify(learner);
    for (const secret of [...q.hints, q.explanation]) assert.ok(!serialised.includes(secret), `${q.id} leaks secret prose`);
    assert.deepEqual(state, original);
    const wrongAnswer = q.type === "numeric" ? q.answer + 1 : q.type === "order" ? [...q.answer].reverse() :
      q.choices.find((choice) => choice.id !== q.answer).id;
    const wrong = applyAction(state, { type: "answer", questionId: q.id, answer: wrongAnswer });
    assert.equal(wrong.match.questions[0].resolved, false, `${q.id} accepts wrong answer`);
    state = applyAction(state, { type: "answer", questionId: q.id, answer: q.answer });
    assert.equal(state.match.questions[0].resolved, true, q.id);
    assert.equal(state.match.questions[0].completion, "independent", q.id);
    const visible = publicState(state);
    assert.ok(!("answer" in visible.match.questions[0]));
    assert.ok(!("explanation" in visible.match.questions[0]));
  }
});

test("no expansion bank, answers or imports in learner source", () => {
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory() && !["node_modules", "dist", ".git"].includes(entry.name)) visit(path);
      else if (entry.isFile() && /\.(?:[cm]?js|tsx?|html|json)$/.test(entry.name)) {
        const source = readFileSync(path, "utf8");
        assert.doesNotMatch(source, /sparkbound-(?:expansion-)?content|EXPANDED_QUESTION_BANK/, path);
        for (const q of bank) {
          assert.ok(!source.includes(q.prompt), `${path} contains an answer-bank prompt`);
          assert.ok(!source.includes(q.explanation), `${path} contains an answer-bank explanation`);
        }
      }
    }
  };
  visit(join(root, "sparkbound"));
});
