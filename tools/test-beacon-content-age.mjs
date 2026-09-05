import assert from "node:assert/strict";
import test from "node:test";
import { CONTENT_VERSION, QUESTION_TEMPLATES, createQuestion } from "../beacon-brigade/content.js";
import { applyAction, createState, publicState } from "../functions/_lib/beacon-brigade.js";

// Review anchors, not a claim that the whole bank is Year 3 core:
// https://www.australiancurriculum.edu.au/resources/work-samples/mathematics/year-3/ws01-ways-to-make-18
// https://www.australiancurriculum.edu.au/support-resources/background-information/science_teacher_background_information_AC9S3U04_E4
// https://www.australiancurriculum.edu.au/support-resources/background-information/science_teacher_background_information_AC9S5U04_E6
// https://www.acs.org/middleschoolchemistry/lessonplans/chapter5/lesson4.html
// https://dictionary.cambridge.org/grammar/british-grammar/subordinate-clauses
// Word limits below are regression guardrails, not a validated reading-age assessment.
const expectedAnswers = {
  "harbour-crate-reserve": [15, 13], "harbour-delivery-total": [383, 422],
  "harbour-equal-packs": [6, 6], "harbour-stock-left": [124, 175],
  "harbour-place-value": [348, 526], "harbour-missing-supply": [64, 73],
  "grove-flexible-cover": ["foil", "film"], "grove-magnet-evidence": ["steel", "iron"],
  "grove-fair-ramp": ["a-b", "d-f"], "grove-absorbent-pad": ["b", "f"],
  "grove-push-observation": ["further", "gentle"], "grove-load-support": ["c", "d"],
  "english-context-meaning": ["not-wide", "easily-broken"],
  "english-complete-sentence": ["lantern", "beacon"],
  "english-possessive-apostrophe": ["one-owner", "plural-owner"],
  "english-linking-ideas": ["because", "so"],
  "english-story-sequence": ["discover", "notice"],
  "physics-force-motion": ["gravity", "stays"], "physics-reflection": ["mirror", "still"],
  "physics-sound-vibration": ["vibrating", "skin"],
  "physics-complete-circuit": ["closed", "switch-closed"],
  "physics-thermal-insulation": ["felt", "foam"],
  "chemistry-states-of-matter": ["liquid", "gas"],
  "chemistry-separate-mixture": ["magnet", "sieve"],
  "chemistry-observe-change": ["melting-ice", "new-bubbles"],
  "chemistry-material-properties": ["film", "clear-plastic"],
  "chemistry-dissolving-particles": ["dissolved", "spread"],
  "grove-plant-parts": ["leaves", "roots"],
  "grove-habitat-needs": ["pond-edge", "woodland"],
  "grove-life-cycle": ["larva", "tadpole"],
  "grove-food-chain": ["grass", "algae"],
  "grove-adaptation-function": ["paddle", "slow-heat-loss"]
};
const wordCount = (value) => String(value).trim().split(/\s+/).length;
const questions = QUESTION_TEMPLATES.flatMap((t) => t.instances.map((_, v) => createQuestion(t.id, v)));
const selectedLabel = (q) => q.options.find((o) => o.id === q.answer).label;

test("all 32 templates retain both original variant IDs, answer keys and answer types", () => {
  assert.equal(CONTENT_VERSION, 4);
  assert.deepEqual(QUESTION_TEMPLATES.map((t) => t.id), Object.keys(expectedAnswers));
  assert.equal(questions.length, 64);
  for (const t of QUESTION_TEMPLATES) {
    assert.equal(t.version, 1, t.id);
    assert.deepEqual(t.instances.map((q) => q.answer), expectedAnswers[t.id], t.id);
    for (let v = 0; v < 2; v += 1) {
      const q = createQuestion(t.id, v);
      assert.equal(q.id, `${t.id}:v1:${v}`);
      assert.equal(q.contentVersion, 4);
      assert.equal(q.type, t.regionId === "harbour" ? "number" : "choice");
      assert.equal(q.review.humanCurriculumReview, "pending");
      assert.match(q.yearBand, /provisional/);
      if (q.type === "choice") {
        assert.equal(q.options.length, t.regionId === "legacy-grove" ? 3 : 4);
        assert.equal(new Set(q.options.map((o) => o.id)).size, q.options.length);
        assert.equal(q.options.filter((o) => o.id === q.answer).length, 1);
        assert.equal(q.diagram.kind, "table");
        assert.equal(q.diagram.simulation, false);
        assert.ok(q.diagram.source && q.diagram.controls && q.diagram.limitation);
        assert.ok(q.diagram.rows.every((r) => r.length === q.diagram.columns.length));
      }
    }
    assert.throws(() => createQuestion(t.id, 2), RangeError);
  }
});

test("all variants keep bounded text and working hints without nonexistent visual cues", () => {
  for (const q of questions) {
    for (const [field, limit] of Object.entries({ prompt: 35, hint: 32, wrongFeedback: 32, explanation: 40 })) {
      assert.ok(q[field].length > 10, `${q.id}: empty ${field}`);
      assert.ok(wordCount(q[field]) <= limit, `${q.id}: ${field} exceeds ${limit} words`);
    }
    for (const o of q.options ?? []) assert.ok(wordCount(o.label) <= 12, `${q.id}: long option`);
    for (const heading of q.diagram.columns ?? []) assert.ok(wordCount(heading) <= 7, `${q.id}: long heading`);
    for (const row of q.diagram.rows ?? []) {
      for (const cell of row) assert.ok(wordCount(cell) <= 10, `${q.id}: long table cell`);
    }
    assert.doesNotMatch(`${q.hint} ${q.wrongFeedback}`, /bold word|follow the arrows|solute|thermal energy transfer/i, q.id);
  }
});

test("all maths answers follow their parameters and stretch tasks have useful intermediate steps", () => {
  const calculate = {
    "harbour-crate-reserve": (p) => p.crates * p.each - p.reserved,
    "harbour-delivery-total": (p) => p.first + p.second,
    "harbour-equal-packs": (p) => p.total / p.kits,
    "harbour-stock-left": (p) => p.stock - p.used,
    "harbour-place-value": (p) => 100 * p.hundreds + 10 * p.tens + p.ones,
    "harbour-missing-supply": (p) => p.target - p.packed
  };
  for (const q of questions.filter((q) => q.type === "number")) {
    assert.equal(q.answer, calculate[q.templateId](q.parameters), q.id);
    assert.ok(Number.isInteger(q.answer) && q.answer > 0);
    assert.notEqual(q.hint, q.wrongFeedback, `${q.id}: hint must add support after wrong feedback`);
    if (["harbour-stock-left", "harbour-missing-supply"].includes(q.templateId)) {
      assert.match(q.hint, /jumps/);
      assert.match(q.explanation, /Add the jumps:/);
    }
    if (q.templateId === "harbour-delivery-total") assert.match(q.explanation, /Add .* to get .* Add .* to get/);
    if (q.templateId === "harbour-equal-packs") assert.match(q.hint, /one ring.*at a time/);
  }
});

test("English clues distinguish grammar, intended meaning and story order", () => {
  for (const v of [0, 1]) {
    const meaning = createQuestion("english-context-meaning", v);
    assert.match(meaning.hint, /what happens next/i);
    const sentence = createQuestion("english-complete-sentence", v);
    const clause = sentence.diagram.rows.find((r) => /^(Because|When)/.test(r[0]));
    assert.equal(clause[1], v === 0 ? "It" : "The bell");
    assert.match(sentence.diagram.limitation, /needs more words/);
    const owner = createQuestion("english-possessive-apostrophe", v);
    assert.match(owner.hint, v === 0 ? /pilot's hat/ : /pilots' hats/);
    assert.match(selectedLabel(owner), v === 0 ? /engineer's toolkit/ : /captains' maps/);
    const joining = createQuestion("english-linking-ideas", v);
    assert.match(joining.prompt, v === 0 ? /tells us why/ : /after hearing the bell/);
    const story = createQuestion("english-story-sequence", v);
    assert.match(story.prompt, /In this story/);
    assert.equal(story.diagram.rows.filter((r) => r[1] === "Nothing else listed").length, 1);
    assert.equal(story.diagram.rows[0][1], "Nothing else listed");
  }
});

test("physics answers follow displayed evidence and do not overclaim", () => {
  const fall = createQuestion("physics-force-motion", 0);
  assert.match(fall.hint, /pull from Earth/);
  assert.doesNotMatch(fall.hint, /size of each force|opposite forces/);
  const rope = createQuestion("physics-force-motion", 1);
  assert.match(rope.prompt, /held still and level/);
  assert.equal(rope.diagram.rows[0][1], rope.diagram.rows[1][1]);
  assert.notEqual(rope.diagram.rows[0][2], rope.diagram.rows[1][2]);
  assert.doesNotMatch(rope.diagram.limitation, /rope and teams as one/);
  for (const v of [0, 1]) {
    const light = createQuestion("physics-reflection", v);
    assert.equal(light.diagram.rows[0][1], "Clear");
    assert.equal(light.diagram.rows.filter((r) => r[1] === "Clear").length, 1);
    const sound = createQuestion("physics-sound-vibration", v);
    assert.match(sound.explanation, /back and forth/);
    assert.match(sound.explanation, /air vibrate/);
    const circuit = createQuestion("physics-complete-circuit", v);
    assert.equal(circuit.diagram.rows.filter((r) => r[1] === "Yes" && ["Yes", "Complete"].includes(r[2])).length, 1);
    assert.equal(circuit.diagram.rows[0][1], "Yes");
    assert.match(circuit.diagram.limitation, /small battery.*Never/);
    const heat = createQuestion("physics-thermal-insulation", v);
    const rows = heat.diagram.rows;
    assert.equal(new Set(rows.map((r) => r[1])).size, 1);
    assert.equal(parseInt(rows[0][2], 10), Math.max(...rows.map((r) => parseInt(r[2], 10))));
    assert.match(heat.explanation, /in this test/);
    assert.match(heat.diagram.controls, /C means degrees Celsius/);
  }
  assert.match(createQuestion("physics-reflection", 0).diagram.limitation, /other surfaces reflect light too/);
  assert.match(createQuestion("physics-complete-circuit", 1).prompt, /setup/);
});

test("chemistry uses observable clues, scoped claims and supplied particle facts", () => {
  const liquid = createQuestion("chemistry-states-of-matter", 0);
  assert.match(liquid.prompt, /no grains/);
  assert.match(liquid.diagram.limitation, /Sand can pour too/);
  assert.match(liquid.hint, /pouring water/);
  const gas = createQuestion("chemistry-states-of-matter", 1);
  assert.deepEqual(gas.diagram.rows.at(-1), ["Fills the whole container", "Yes"]);
  const magnetic = createQuestion("chemistry-separate-mixture", 0);
  assert.deepEqual(magnetic.diagram.rows.map((r) => r[1]), ["Yes", "No"]);
  assert.match(magnetic.diagram.limitation, /Some sand contains magnetic grains/);
  const sieve = createQuestion("chemistry-separate-mixture", 1);
  assert.deepEqual(sieve.diagram.rows.map((r) => r.slice(1)), [["Bigger", "No"], ["Smaller", "Yes"]]);
  assert.match(sieve.hint, /sieve is a tray with small holes/);
  const melting = createQuestion("chemistry-observe-change", 0);
  assert.equal(melting.diagram.rows.filter((r) => r[1].startsWith("Yes")).length, 1);
  assert.match(melting.hint, /freezer/);
  const reaction = createQuestion("chemistry-observe-change", 1);
  assert.match(reaction.prompt, /may be making gas/);
  assert.match(reaction.diagram.limitation, /not proof.*already dissolved/);
  assert.notEqual(reaction.hint, melting.hint);
  for (const v of [0, 1]) {
    const material = createQuestion("chemistry-material-properties", v);
    const passing = material.diagram.rows.filter((r) => r[1] === "Yes" && r[2] === "No");
    assert.deepEqual(passing, [material.diagram.rows[0]]);
    const dissolved = createQuestion("chemistry-dissolving-particles", v);
    assert.match(dissolved.yearBand, /supported introduction.*Year 5/);
    assert.match(dissolved.prompt, /Tiny particles can be too small to see/);
    assert.match(dissolved.explanation, /too small to see/);
    assert.doesNotMatch(dissolved.explanation, /too (widely|spread)|atom|electron|nucleus/);
    assert.match(dissolved.diagram.rows.at(-1)[0], /Lid off/);
    assert.match(dissolved.diagram.rows.at(-1)[1], /crystals remain/);
    assert.match(dissolved.diagram.limitation, /Never taste/);
  }
});

test("life science supplies vocabulary and limits claims to the described plants and animals", () => {
  const leaves = createQuestion("grove-plant-parts", 0);
  assert.match(leaves.explanation, /light energy, water and carbon dioxide/);
  assert.match(leaves.diagram.limitation, /Other green parts/);
  assert.match(createQuestion("grove-plant-parts", 1).explanation, /roots absorb most.*water from the soil/);
  for (const v of [0, 1]) {
    const habitat = createQuestion("grove-habitat-needs", v);
    assert.equal(habitat.diagram.rows.length, 4);
    assert.match(selectedLabel(habitat), v === 0 ? /pond edge with insects and plants/ : /shrubs, seeds, insects and water/);
    const life = createQuestion("grove-life-cycle", v);
    assert.match(life.hint, /next row/);
    assert.equal(life.diagram.rows[1][1].toLowerCase().split(" ")[0], life.answer);
    const chain = createQuestion("grove-food-chain", v);
    assert.match(chain.prompt, /makes its own food using sunlight.*producer/);
    assert.equal(chain.diagram.rows[0][0].toLowerCase(), chain.answer);
    assert.match(chain.diagram.controls, /From is the food. To is the animal that eats it/);
    assert.match(chain.diagram.limitation, /other foods too/);
  }
  assert.match(createQuestion("grove-life-cycle", 1).diagram.limitation, /Some frogs skip/);
  const duck = createQuestion("grove-adaptation-function", 0);
  assert.match(selectedLabel(duck), /push against water/);
  const bear = createQuestion("grove-adaptation-function", 1);
  const drops = bear.diagram.rows.map((r) => parseInt(r[1], 10));
  assert.equal(drops[0], Math.min(...drops));
  assert.match(bear.explanation, /does not make heat/);
  assert.match(bear.diagram.limitation, /not a test on a bear/);
});

test("legacy magnet question asks about attraction, not unsupported lifting ability", () => {
  for (const v of [0, 1]) {
    const q = createQuestion("grove-magnet-evidence", v);
    assert.match(q.prompt, /pulled towards the magnet/);
    assert.doesNotMatch(q.prompt, /lift|collect/);
    const index = q.options.findIndex((o) => o.id === q.answer);
    assert.equal(q.diagram.rows[index][1], "Yes");
    assert.equal(q.diagram.rows.filter((r) => r[1] === "Yes").length, 1);
  }
});

test("authored instances remain frozen and each created question is an independent snapshot", () => {
  for (const q of questions) {
    const copy = createQuestion(q.templateId, q.variant);
    copy.prompt = "Changed only in this snapshot.";
    copy.diagram.label = "Changed label";
    if (copy.options) copy.options[0].label = "Changed option";
    assert.deepEqual(createQuestion(q.templateId, q.variant), q);
    const template = QUESTION_TEMPLATES.find((t) => t.id === q.templateId);
    assert.ok(Object.isFrozen(template.instances[q.variant].diagram));
  }
});

test("saved old question text, help, answer and history survive the new content bank", () => {
  let state = applyAction(createState({ profileId: "saved-content" }), { type: "start", regionId: "chemistry" });
  state.contentVersion = 3;
  const station = state.activeExpedition.stations.find((s) => s.question.templateId === "chemistry-dissolving-particles");
  // Keep the original wording, even where the current bank corrects it. History is evidence, not a live template view.
  Object.assign(station.question, {
    prompt: "Sugar seems to disappear after it is stirred into water. What happened?",
    hint: "The dissolved material is still present even when its particles are too spread out to see.",
    wrongFeedback: "The solute did not vanish or become a different element. Use the before-and-after evidence.",
    explanation: "The sugar particles remain in the water but are spread too widely to see; evaporating the water can recover sugar.",
    yearBand: "Year 3 core / Year 4 stretch (provisional)"
  });
  station.question.review.reviewedAt = "2026-09-01";
  delete station.question.contentVersion;
  const saved = structuredClone(station.question);
  const stationId = station.id;
  const act = (type, answer) => {
    state = applyAction(JSON.parse(JSON.stringify(state)), { type, stationId, ...(answer === undefined ? {} : { answer }) });
    return state.activeExpedition.stations.find((s) => s.id === stationId);
  };
  assert.equal(act("answer", "stopped-existing").lastFeedback.explanation, saved.wrongFeedback);
  assert.equal(act("hint").support.message, saved.hint);
  act("answer", "stopped-existing");
  assert.equal(act("hint").support.message, saved.explanation);
  assert.equal(act("answer", "dissolved").resolved, true);
  assert.deepEqual(state.activeExpedition.stations.find((s) => s.id === stationId).question, saved);
  state = applyAction(state, { type: "end" });
  const oldHistory = structuredClone(state.history);
  state = applyAction(state, { type: "start", regionId: "chemistry" });
  assert.equal(state.contentVersion, 3);
  assert.ok(state.activeExpedition.stations.every((s) => s.question.contentVersion === 4));
  assert.deepEqual(state.history, oldHistory);
  assert.deepEqual(state.history[0].stations.find((s) => s.id === stationId).question, saved);
  const reviewed = publicState(state, { review: true }).history[0].stations.find((s) => s.id === stationId);
  assert.equal(reviewed.question.prompt, saved.prompt);
  assert.equal(reviewed.question.explanation, saved.explanation);
  assert.equal(reviewed.question.answer, saved.answer);
  assert.notEqual(createQuestion(saved.templateId, saved.variant).explanation, saved.explanation);
});
