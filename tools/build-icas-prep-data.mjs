import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve("icas-prep/data");
await mkdir(outputDir, { recursive: true });

const SUBJECTS = {
  maths: "Mathematics",
  spelling: "Spelling Bee"
};

const mathsDiagnostic = mathTest("icas-maths-diagnostic", "Mathematics Readiness Check", "diagnostic", 20, "elapsed", [
  ["number", "placeValue", 1, "textChoice"], ["number", "compare", 1, "textChoice"], ["number", "fraction", 2, "imageChoice"], ["number", "groups", 2, "imageChoice"],
  ["patterns", "numberPattern", 1, "textChoice"], ["patterns", "shapePattern", 2, "imageChoice"], ["patterns", "missingValue", 2, "numeric"], ["patterns", "ruleTable", 2, "tableGraph"],
  ["measures", "clock", 1, "imageChoice"], ["measures", "calendar", 2, "tableGraph"], ["measures", "duration", 2, "numeric"], ["measures", "compareMeasure", 2, "textChoice"],
  ["space", "shape", 1, "textChoice"], ["space", "turn", 2, "imageChoice"], ["space", "grid", 2, "spatial"], ["space", "solid", 2, "imageChoice"],
  ["data", "chance", 1, "textChoice"], ["data", "pictureGraph", 2, "tableGraph"], ["data", "dataTable", 2, "tableGraph"], ["data", "classify", 2, "textChoice"]
]);

const mathsNumberPatterns = mathTest("icas-maths-number-patterns", "Number & Pattern Pressure Set", "targeted", 14, "elapsed", [
  ["number", "placeValue", 2, "textChoice"], ["number", "compare", 2, "textChoice"], ["number", "fractionOrder", 3, "imageChoice"], ["number", "groups", 2, "imageChoice"],
  ["number", "division", 3, "textChoice"], ["number", "multiStep", 3, "numeric"], ["number", "numberLine", 3, "spatial"],
  ["patterns", "numberPattern", 2, "textChoice"], ["patterns", "growingPattern", 3, "imageChoice"], ["patterns", "missingValue", 3, "numeric"], ["patterns", "ruleTable", 3, "tableGraph"],
  ["patterns", "balance", 3, "imageChoice"], ["patterns", "reverse", 4, "textChoice"], ["patterns", "twoRules", 4, "tableGraph"]
]);

const mathsMeasuresSpaceData = mathTest("icas-maths-measures-space-data", "Measure, Space & Data Pressure Set", "targeted", 14, "elapsed", [
  ["measures", "clock", 2, "imageChoice"], ["measures", "calendar", 3, "tableGraph"], ["measures", "duration", 3, "numeric"], ["measures", "compareMeasure", 2, "textChoice"], ["measures", "areaTiles", 3, "imageChoice"],
  ["space", "grid", 3, "spatial"], ["space", "turn", 2, "imageChoice"], ["space", "shape", 3, "textChoice"], ["space", "solid", 3, "imageChoice"], ["space", "path", 4, "spatial"],
  ["data", "pictureGraph", 2, "tableGraph"], ["data", "dataTable", 3, "tableGraph"], ["data", "chance", 3, "textChoice"], ["data", "twoClues", 4, "tableGraph"]
]);

const mathsFull = mathTest("icas-maths-full-1", "Mathematics Full Simulation 1", "simulation", 40, "countdown", [
  ["number", "placeValue", 1, "textChoice"], ["patterns", "numberPattern", 1, "textChoice"], ["measures", "clock", 1, "imageChoice"], ["space", "shape", 1, "textChoice"], ["data", "chance", 1, "textChoice"],
  ["number", "compare", 1, "textChoice"], ["measures", "compareMeasure", 1, "textChoice"], ["space", "solid", 1, "imageChoice"],
  ["number", "fraction", 2, "imageChoice"], ["patterns", "shapePattern", 2, "imageChoice"], ["measures", "calendar", 2, "tableGraph"], ["space", "turn", 2, "imageChoice"],
  ["data", "pictureGraph", 2, "tableGraph"], ["number", "groups", 2, "imageChoice"], ["measures", "duration", 2, "numeric"], ["space", "grid", 2, "spatial"],
  ["number", "division", 2, "textChoice"], ["patterns", "missingValue", 2, "numeric"], ["measures", "massTable", 2, "tableGraph"], ["space", "shapeCompare", 2, "imageChoice"],
  ["data", "dataTable", 2, "tableGraph"], ["number", "fractionOrder", 2, "textChoice"], ["patterns", "ruleTable", 2, "tableGraph"], ["space", "halfTurn", 2, "imageChoice"],
  ["number", "multiStep", 3, "numeric"], ["measures", "areaTiles", 3, "imageChoice"], ["data", "classify", 3, "textChoice"], ["number", "numberLine", 3, "spatial"],
  ["patterns", "growingPattern", 3, "imageChoice"], ["space", "path", 3, "spatial"], ["measures", "durationChoice", 3, "textChoice"], ["data", "twoClues", 3, "tableGraph"],
  ["number", "reverse", 3, "textChoice"], ["patterns", "balance", 3, "textChoice"], ["measures", "calendarChain", 3, "textChoice"], ["space", "shapeRiddle", 3, "textChoice"],
  ["number", "fractionChain", 4, "textChoice"], ["number", "numberLine", 4, "spatial"], ["number", "multiStep", 4, "numeric"], ["data", "dataChain", 4, "textChoice"]
]);

const spellingDiagnostic = spellingTest("icas-spelling-diagnostic", "Spelling Readiness Check", "diagnostic", 16, "elapsed", [
  d("journey", "Our journey through the forest began before sunrise.", "visual", 1),
  d("thousand", "A thousand tiny lights shone above the stage.", "phonological", 2),
  d("quarter", "The lesson ended at quarter past ten.", "etymological", 2),
  d("search", "We began to search beneath the old bridge.", "phonological", 2),
  r("swimming", "swim", "Which spelling correctly adds -ing to swim?", ["swiming", "swimming", "swimmimg", "swimingg"], 1, "Double the final consonant before adding -ing.", "morphemic", 1),
  r("carries", "carry", "Which spelling completes this sentence correctly: She ___ the books?", ["carrys", "carryes", "carries", "carrise"], 2, "Change the final y to i before adding -es.", "morphemic", 2),
  r("hopeful", "hope", "Which word is correctly formed from hope and -ful?", ["hopefull", "hopful", "hopeful", "hoppeful"], 2, "Keep the silent e in hopeful and use one l in -ful.", "morphemic", 2),
  r("dislike", "like", "Which word correctly adds the prefix dis- to like?", ["disslike", "dislike", "deslike", "diselike"], 1, "The prefix dis- joins directly to like.", "morphemic", 1),
  p("beautiful", "beautifull", "The artist painted a beautifull sunset over the bay.", "visual", 2),
  p("children", "childrens", "The childrens carried their bags into the hall.", "visual", 1),
  p("because", "becuase", "We stayed inside becuase the rain was heavy.", "visual", 2),
  p("surprise", "suprise", "The class planned a suprise for their teacher.", "visual", 2),
  c("kitchen", "kichen", "Correct the misspelt word: kichen", "phonological", 1),
  c("whisper", "wisper", "Correct the misspelt word: wisper", "phonological", 2),
  c("amount", "ammount", "Correct the misspelt word: ammount", "visual", 2),
  c("bicycle", "bicycal", "Correct the misspelt word: bicycal", "etymological", 2)
]);

const spellingSoundsSight = spellingTest("icas-spelling-sounds-sight", "Sounds & Sight Pressure Set", "targeted", 16, "elapsed", [
  d("slippery", "The slippery path curved beside the waterfall.", "phonological", 2),
  d("pleasant", "A pleasant breeze cooled the playground.", "phonological", 3),
  d("frightened", "The sudden crash frightened the sleeping cat.", "phonological", 3),
  d("neighbour", "Our neighbour watered the garden while we were away.", "visual", 3),
  r("happiness", "happy", "Which spelling correctly adds -ness to happy?", ["happyness", "happiness", "happyiness", "hapiness"], 1, "Change y to i before adding -ness.", "morphemic", 2),
  r("carefully", "careful", "Which spelling correctly adds -ly to careful?", ["carefuly", "carefully", "carfully", "carefulley"], 1, "Careful already ends in l, so adding -ly creates carefully.", "morphemic", 2),
  r("hopped", "hop", "Which spelling correctly makes hop past tense?", ["hoped", "hopped", "hoppped", "hopt"], 1, "Double the final consonant before adding -ed.", "morphemic", 2),
  r("misbehave", "behave", "Which spelling correctly adds mis- to behave?", ["missbehave", "misbehave", "misbehaive", "misbehav"], 1, "The prefix mis- joins directly to behave.", "morphemic", 3),
  p("believe", "beleive", "I beleive the missing key is beside the window.", "phonological", 3),
  p("separate", "seperate", "Please seperate the paper from the cardboard.", "visual", 3),
  p("favourite", "favorite", "Blue is Mia's favorite colour.", "visual", 2),
  p("February", "Febuary", "Our swimming carnival is held in Febuary.", "visual", 3),
  c("scissors", "sissors", "Correct the misspelt word: sissors", "phonological", 3),
  c("answer", "anser", "Correct the misspelt word: anser", "visual", 2),
  c("straight", "strait", "Correct the misspelt word for a line that does not bend: strait", "visual", 3),
  c("daughter", "dauter", "Correct the misspelt word: dauter", "phonological", 4)
]);

const spellingWordBuilding = spellingTest("icas-spelling-word-building", "Word Building & Proofreading Set", "targeted", 16, "elapsed", [
  d("argument", "Their argument ended when both children listened calmly.", "morphemic", 3),
  d("attention", "Please give the final instruction your full attention.", "morphemic", 3),
  d("quantity", "Check the quantity before placing the order.", "phonological", 4),
  d("trophy", "The team displayed its trophy near the office.", "phonological", 3),
  r("reliable", "rely", "Which spelling correctly changes rely to reliable?", ["relyable", "reliable", "reliabel", "relieable"], 1, "The accepted spelling is reliable.", "morphemic", 4),
  r("admitted", "admit", "Which spelling correctly makes admit past tense?", ["admited", "admitted", "admittted", "admittid"], 1, "Double the final consonant before adding -ed.", "morphemic", 3),
  r("useful", "use", "Which word is correctly formed from use and -ful?", ["usefull", "useful", "usful", "useeful"], 1, "Useful keeps the silent e and uses one l.", "morphemic", 2),
  r("disappear", "appear", "Which spelling correctly adds dis- to appear?", ["dissapear", "disappear", "disapear", "desappear"], 1, "Dis- plus appear produces disappear with double p.", "morphemic", 4),
  p("through", "throug", "The hikers walked throug the tunnel carefully.", "visual", 3),
  p("caught", "cought", "Noah cought the ball near the boundary.", "phonological", 3),
  p("different", "diffrent", "The twins chose diffrent coloured folders.", "visual", 3),
  p("receive", "recieve", "Did you recieve the note from the office?", "visual", 4),
  c("island", "iland", "Correct the misspelt word: iland", "visual", 2),
  c("autumn", "autum", "Correct the misspelt word: autum", "visual", 3),
  c("guard", "gaurd", "Correct the misspelt word: gaurd", "phonological", 3),
  c("machine", "masheen", "Correct the misspelt word: masheen", "phonological", 4)
]);

const spellingFull = spellingTest("icas-spelling-full-1", "Spelling Bee Full Simulation 1", "simulation", 40, "countdown", [
  d("adventure", "Our adventure continued beyond the rocky hill.", "visual", 1), d("curious", "The curious child examined the unusual shell.", "phonological", 1),
  d("ordinary", "It looked like an ordinary box until it began to glow.", "visual", 2), d("breathe", "Pause and breathe slowly before answering.", "phonological", 2),
  d("calendar", "Mark the excursion date on the calendar.", "visual", 2), d("measure", "Use the ruler to measure the ribbon.", "phonological", 2),
  d("enough", "There is enough water for every runner.", "visual", 2), d("early", "We arrived early and helped arrange the chairs.", "visual", 1),
  d("circle", "Draw a circle around the strongest answer.", "phonological", 1), d("strength", "The bridge gained strength from the extra support.", "phonological", 3),
  d("library", "Return the atlas to the library after lunch.", "visual", 2), d("natural", "The cave had a natural opening near the river.", "morphemic", 3),
  d("possible", "It is possible to solve the puzzle in two ways.", "phonological", 3), d("knowledge", "Her knowledge of maps helped the whole group.", "etymological", 4),
  r("studying", "study", "Which spelling correctly adds -ing to study?", ["studyng", "studing", "studying", "studiing"], 2, "Keep the y when adding -ing.", "morphemic", 1),
  r("races", "race", "Which spelling correctly makes race plural?", ["races", "racees", "racis", "racies"], 0, "Add -s to race and keep the silent e.", "morphemic", 1),
  r("kindness", "kind", "Which word correctly adds -ness to kind?", ["kindnes", "kindness", "kinndness", "kindeness"], 1, "Kind plus -ness forms kindness.", "morphemic", 1),
  r("unkindly", "kind", "Which word correctly uses both a prefix and a suffix?", ["unkindley", "unkindly", "unkindlly", "unkindily"], 1, "Un- plus kind plus -ly forms unkindly.", "morphemic", 3),
  r("movement", "move", "Which spelling correctly adds -ment to move?", ["movment", "movement", "moveement", "mouvment"], 1, "Movement keeps the silent e before -ment.", "morphemic", 2),
  r("happier", "happy", "Which spelling correctly compares happy?", ["happyier", "happier", "hapier", "happyear"], 1, "Change y to i before adding -er.", "morphemic", 2),
  r("planned", "plan", "Which spelling correctly makes plan past tense?", ["planed", "planned", "plannned", "plant"], 1, "Double the final consonant before adding -ed.", "morphemic", 2),
  r("careless", "care", "Which spelling correctly adds -less to care?", ["carless", "careless", "careles", "cairless"], 1, "Keep the silent e when adding -less.", "morphemic", 2),
  r("impatiently", "patient", "Which word correctly uses both im- and -ly?", ["impatientley", "impatiently", "inpatiently", "impatently"], 1, "Im- plus patient plus -ly forms impatiently.", "morphemic", 4),
  r("completion", "complete", "Which spelling correctly changes complete to completion?", ["compleation", "completion", "compleetion", "completian"], 1, "Drop the final e before adding -ion.", "morphemic", 3),
  p("grammar", "grammer", "The editor checked every sentence for grammer mistakes.", "visual", 2), p("weather", "wether", "The wether changed before the match began.", "visual", 1),
  p("piece", "peice", "A small peice of glass sparkled in the sand.", "visual", 2), p("address", "adress", "Write the return adress on the envelope.", "visual", 2),
  p("minute", "minit", "Wait one minit before opening the lid.", "phonological", 2), p("probably", "probly", "The bus will probly arrive before nine.", "phonological", 3),
  p("business", "buisness", "The family opened a small buisness near the station.", "morphemic", 3), p("ceiling", "cieling", "A bright lantern hung from the cieling.", "visual", 2),
  c("exciting", "exsiting", "Correct the misspelt word: exsiting", "phonological", 2), c("disease", "desease", "Correct the misspelt word: desease", "phonological", 3),
  c("garage", "gararge", "Correct the misspelt word: gararge", "etymological", 3), c("parallel", "paralel", "Correct the misspelt word: paralel", "etymological", 4),
  c("bristle", "brissle", "Correct the misspelt word: brissle", "visual", 3), c("badge", "baj", "Correct the misspelt word: baj", "phonological", 2),
  c("alive", "aliv", "Correct the misspelt word: aliv", "phonological", 1), c("restaurant", "restarant", "Correct the misspelt word: restarant", "etymological", 4)
]);

const payload = {
  version: "icas-prep-001",
  generatedAt: new Date().toISOString(),
  disclaimer: "Original Bright Quest practice. Not affiliated with or endorsed by ICAS Assessments or Janison.",
  subjects: SUBJECTS,
  tests: [mathsDiagnostic, mathsNumberPatterns, mathsMeasuresSpaceData, mathsFull, spellingDiagnostic, spellingSoundsSight, spellingWordBuilding, spellingFull]
};

validate(payload);
await writeFile(resolve(outputDir, "icas-question-bank.json"), `${JSON.stringify(payload, null, 2)}\n`);
await writeFile(resolve(outputDir, "icas-question-bank.js"), `window.BrightQuestIcasBank = ${JSON.stringify(payload, null, 2)};\n`);
console.log(JSON.stringify({ result: "built", version: payload.version, tests: payload.tests.length, questions: payload.tests.reduce((sum, test) => sum + test.questions.length, 0) }, null, 2));

function mathTest(id, title, mode, count, timing, specs) {
  if (specs.length !== count) throw new Error(`${id} expected ${count} specs, received ${specs.length}`);
  return {
    id, subject: "maths", title, mode, timing,
    minutes: mode === "simulation" ? 45 : mode === "diagnostic" ? 25 : 20,
    questions: specs.map((spec, index) => makeMathQuestion(id, index, spec))
  };
}

function makeMathQuestion(testId, index, [domainKey, type, difficulty, formatGroup]) {
  const seed = hash(`${testId}-${index}-${type}`);
  const variant = testId.includes("diagnostic") ? 0 : testId.includes("full") ? 2 : 1;
  const domain = ({ number: "Number & Arithmetic", patterns: "Algebra & Patterns", measures: "Measures & Units", space: "Space & Geometry", data: "Chance & Data" })[domainKey];
  const base = mathTemplate(type, seed, variant);
  return {
    id: `${testId}-q${String(index + 1).padStart(2, "0")}`,
    section: "Mathematics", domain, skill: base.skill, format: base.format || "choice", formatGroup, difficulty,
    framework: `ICAS Paper A / ${domain}`,
    ...base
  };
}

function mathTemplate(type, seed, variant) {
  const a = 120 + seed % 370;
  const b = 20 + seed % 70;
  const correctChoice = (answer, distractors) => optionise(String(answer), distractors.map(String), seed);
  switch (type) {
    case "placeValue": { const hundreds = 3 + seed % 6; const tens = 2 + seed % 7; const ones = 1 + seed % 8; const number = hundreds * 100 + tens * 10 + ones; return { skill: "Place value", prompt: `Which expression has the same value as ${number}?`, ...correctChoice(`${hundreds * 100} + ${tens * 10} + ${ones}`, [`${hundreds * 10} + ${tens * 100} + ${ones}`, `${hundreds * 100} + ${tens} + ${ones * 10}`, `${number + 100}`]), explanation: `${number} has ${hundreds} hundreds, ${tens} tens and ${ones} ones.` }; }
    case "compare": { const x = a; const y = a + (seed % 2 ? 9 : -7); const answer = Math.max(x, y); return { skill: "Compare numbers", prompt: `Which number is greater: ${x} or ${y}?`, ...correctChoice(answer, [Math.min(x, y), answer - 10, answer + 10]), explanation: `${answer} is farther to the right on a number line.` }; }
    case "fraction": { const eighths = 2 + seed % 5; return { skill: "Fractions", prompt: "What fraction of the strip is coloured?", stimulus: { type: "fractionBar", parts: 8, filled: eighths }, ...correctChoice(`${eighths}/8`, [`${8 - eighths}/8`, `${eighths}/6`, `1/${eighths}`]), explanation: `${eighths} of 8 equal parts are coloured.` }; }
    case "fractionOrder": {
      const versions = [
        ["Which fraction is greatest?", "3/4", ["1/2", "2/8", "1/4"], "Three quarters is greater than one half, two eighths and one quarter."],
        ["Which fraction is smallest?", "1/6", ["1/3", "1/2", "5/6"], "One sixth is the smallest fraction because each equal part is smaller and only one is selected."],
        ["Which fraction is closest to one whole?", "7/8", ["3/4", "2/3", "1/2"], "Seven eighths is only one eighth away from a whole."]
      ][variant];
      return { skill: "Compare fractions", prompt: versions[0], ...correctChoice(versions[1], versions[2]), explanation: versions[3] };
    }
    case "fractionChain": { return { skill: "Fraction reasoning", prompt: "A ribbon is cut into 8 equal pieces. Ava uses 3 pieces and Leo uses 2. What fraction remains?", ...correctChoice("3/8", ["5/8", "3/5", "5/3"]), explanation: "Five of eight pieces are used, so three eighths remain." }; }
    case "groups": { const rows = 3 + seed % 3; const cols = 3 + (seed >> 2) % 4; const total = rows * cols; return { skill: "Arrays and groups", prompt: "How many counters are shown?", stimulus: { type: "array", rows, cols }, ...correctChoice(total, [total - cols, total + rows, rows + cols]), explanation: `${rows} rows of ${cols} counters make ${total}.` }; }
    case "division": { const groups = 3 + seed % 5; const each = 4 + (seed >> 2) % 5; const total = groups * each; return { skill: "Equal sharing", prompt: `${total} tokens are shared equally among ${groups} teams. How many does each team receive?`, ...correctChoice(each, [groups, each - 1, each + groups]), explanation: `${total} divided by ${groups} is ${each}.` }; }
    case "multiStep": { const boxes = 3 + seed % 4; const each = 7 + (seed >> 2) % 6; const used = 5 + (seed >> 4) % 8; const answer = boxes * each - used; return { skill: "Multi-step arithmetic", format: "numeric", prompt: `${boxes} trays hold ${each} counters each. ${used} counters are removed. How many remain?`, acceptedAnswers: [String(answer)], correctText: String(answer), explanation: `${boxes} x ${each} = ${boxes * each}; then subtract ${used} to get ${answer}.` }; }
    case "numberLine": { const start = 100 + variant * 70 + (seed % 6) * 10; const step = 5 + variant * 2; const targetIndex = 3; return { skill: "Number line", prompt: "Which labelled point shows the target number?", stimulus: { type: "numberLine", start, step, points: 6, target: start + step * targetIndex }, ...correctChoice("D", ["A", "C", "F"]), explanation: `Counting by ${step} from ${start}, the target is at point D.` }; }
    case "numberPattern": { const start = 3 + seed % 12; const step = 3 + seed % 7; const answer = start + step * 4; return { skill: "Number patterns", prompt: `Complete the pattern: ${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, __`, ...correctChoice(answer, [answer - 1, answer + 1, answer + step]), explanation: `The pattern increases by ${step} each time.` }; }
    case "shapePattern": {
      const versions = [
        [["triangle", "square", "square", "triangle", "square", "square", "?"], "triangle", ["square", "circle", "rectangle"]],
        [["circle", "triangle", "circle", "square", "circle", "triangle", "circle", "?"], "square", ["circle", "triangle", "rectangle"]],
        [["square", "circle", "triangle", "square", "circle", "triangle", "?"], "square", ["circle", "triangle", "rectangle"]]
      ][variant];
      return { skill: "Shape patterns", prompt: "Which shape comes next?", stimulus: { type: "shapePattern", shapes: versions[0] }, ...correctChoice(versions[1], versions[2]), explanation: `The repeating pattern shows that ${versions[1]} comes next.` };
    }
    case "growingPattern": {
      const versions = [
        ["A tile pattern has 2 tiles in Stage 1, 5 in Stage 2 and 8 in Stage 3. How many tiles are in Stage 5?", [2, 5, 8, 11, "?"], "14", ["11", "13", "15"], "The pattern grows by 3 tiles each stage: 2, 5, 8, 11, 14."],
        ["A tower pattern is 4 cubes high at Stage 1, 7 at Stage 2 and 10 at Stage 3. How high is Stage 5?", [4, 7, 10, 13, "?"], "16", ["14", "15", "17"], "The pattern grows by 3 cubes each stage, so Stage 5 has 16 cubes."],
        ["A bead pattern uses 3 beads in Stage 1, 5 in Stage 2 and 7 in Stage 3. How many beads are in Stage 5?", [3, 5, 7, 9, "?"], "11", ["9", "10", "12"], "The pattern grows by 2 beads each stage: 3, 5, 7, 9, 11."]
      ][variant];
      return { skill: "Growing patterns", prompt: versions[0], stimulus: { type: "stagePattern", values: versions[1] }, ...correctChoice(versions[2], versions[3]), explanation: versions[4] };
    }
    case "missingValue": { const total = 70 + seed % 80; const known = 20 + seed % 30; const answer = total - known; return { skill: "Missing values", format: "numeric", prompt: `${known} + [ ] = ${total}. What number belongs in the box?`, acceptedAnswers: [String(answer)], correctText: String(answer), explanation: `Subtract ${known} from ${total} to find ${answer}.` }; }
    case "ruleTable": { const step = 2 + variant; const add = variant + 1; const input = [1, 2, 3, 4]; const output = input.map((n) => n * step + add); const answer = 5 * step + add; return { skill: "Function patterns", prompt: "The same rule is used in every row. What output belongs with input 5?", stimulus: { type: "table", headers: ["Input", "Output"], rows: input.map((n, i) => [n, output[i]]).concat([[5, "?"]]) }, ...correctChoice(answer, [answer - 1, answer + 1, 5 * step]), explanation: `Multiply the input by ${step}, then add ${add}.` }; }
    case "balance": { const left = 8 + seed % 8; const add = 3 + seed % 5; const answer = left + add; return { skill: "Balanced equations", prompt: `Both sides must have the same value. ${left} + ${add} = [ ]. What belongs in the box?`, ...correctChoice(answer, [left, add, answer + 1]), explanation: `${left} + ${add} = ${answer}.` }; }
    case "reverse": { const final = 30 + seed % 25; const removed = 6 + seed % 9; const answer = final + removed; return { skill: "Reverse problems", prompt: `After ${removed} beads were removed, ${final} remained. How many beads were there at first?`, ...correctChoice(answer, [final - removed, final, answer + removed]), explanation: `Work backwards: ${final} + ${removed} = ${answer}.` }; }
    case "twoRules": {
      const versions = [
        ["The jumps are +1, +3, +1, +3. What comes next: 4, 5, 8, 9, 12, __?", "13", ["14", "15", "16"], "The next jump is +1, so 12 becomes 13."],
        ["The jumps are +2, +5, +2, +5. What comes next: 3, 5, 10, 12, 17, __?", "19", ["18", "20", "22"], "The next jump is +2, so 17 becomes 19."],
        ["The jumps are +3, +6, +3, +6. What comes next: 2, 5, 11, 14, 20, __?", "23", ["21", "24", "26"], "The next jump is +3, so 20 becomes 23."]
      ][variant];
      return { skill: "Two-rule patterns", prompt: versions[0], ...correctChoice(versions[1], versions[2]), explanation: versions[3] };
    }
    case "clock": { const hour = 2 + seed % 7; const minute = [0, 15, 30, 45][seed % 4]; const label = `${hour}:${String(minute).padStart(2, "0")}`; return { skill: "Read time", prompt: "What time does the clock show?", stimulus: { type: "clock", hour, minute }, ...correctChoice(label, [`${hour}:${String((minute + 15) % 60).padStart(2, "0")}`, `${hour + 1}:${String(minute).padStart(2, "0")}`, `${hour}:50`]), explanation: `The minute hand and hour hand show ${label}.` }; }
    case "calendar": { const day = 8 + seed % 9; const answer = day + 7; return { skill: "Calendars", prompt: `The excursion is on ${day} June. The rehearsal is exactly one week later. What date is the rehearsal?`, stimulus: { type: "calendar", month: "June", highlighted: day }, ...correctChoice(`${answer} June`, [`${day + 5} June`, `${day + 6} June`, `${day + 8} June`]), explanation: `One week is 7 days, so ${day} + 7 = ${answer}.` }; }
    case "calendarChain": { return { skill: "Calendar reasoning", prompt: "A camp starts on Tuesday 18 June and lasts 3 days, including Tuesday. On which date does it finish?", ...correctChoice("Thursday 20 June", ["Wednesday 19 June", "Friday 21 June", "Thursday 21 June"]), explanation: "Tuesday is day 1, Wednesday day 2 and Thursday day 3." }; }
    case "duration": { const start = 20 + seed % 15; const add = 25 + seed % 20; const answer = start + add; return { skill: "Duration", format: "numeric", prompt: `A task begins ${start} minutes after 9:00 and lasts ${add} minutes. How many minutes after 9:00 does it finish?`, acceptedAnswers: [String(answer)], correctText: String(answer), explanation: `${start} + ${add} = ${answer} minutes after 9:00.` }; }
    case "durationChoice": { return { skill: "Duration", prompt: "Training starts at 10:35 am and ends at 11:20 am. How long does it last?", ...correctChoice("45 minutes", ["35 minutes", "55 minutes", "1 hour 15 minutes"]), explanation: "It is 25 minutes to 11:00 and another 20 minutes to 11:20: 45 minutes." }; }
    case "timeChain": { return { skill: "Multi-step time", format: "numeric", prompt: "A session starts at 9:15 am. It has two 20-minute activities and a 10-minute break. How many minutes after 9:15 does it finish?", acceptedAnswers: ["50"], correctText: "50", explanation: "20 + 20 + 10 = 50 minutes." }; }
    case "compareMeasure": {
      const versions = [
        ["Which length is greatest?", "half a metre", ["45 cm", "480 mm", "40 cm"], "Half a metre is 50 cm, which is greater than 48 cm, 45 cm and 40 cm."],
        ["Which length is shortest?", "390 mm", ["42 cm", "half a metre", "45 cm"], "390 mm is 39 cm, which is shorter than 42 cm, 45 cm and 50 cm."],
        ["Which length is closest to 60 cm?", "590 mm", ["half a metre", "68 cm", "720 mm"], "590 mm is 59 cm, only 1 cm away from 60 cm."]
      ][variant];
      return { skill: "Compare measures", prompt: versions[0], ...correctChoice(versions[1], versions[2]), explanation: versions[3] };
    }
    case "areaTiles": { const rows = 3 + seed % 2; const cols = 4 + seed % 3; const answer = rows * cols; return { skill: "Informal area", prompt: "How many equal square tiles cover the rectangle?", stimulus: { type: "array", rows, cols, tile: true }, ...correctChoice(answer, [answer - rows, answer + cols, rows + cols]), explanation: `${rows} rows of ${cols} tiles make ${answer} tiles.` }; }
    case "massTable": { return { skill: "Compare mass", prompt: "Which parcel is 150 g heavier than parcel B?", stimulus: { type: "table", headers: ["Parcel", "Mass"], rows: [["A", "350 g"], ["B", "425 g"], ["C", "575 g"], ["D", "625 g"]] }, ...correctChoice("Parcel C", ["Parcel A", "Parcel B", "Parcel D"]), explanation: "425 g + 150 g = 575 g, which is parcel C." }; }
    case "shape": {
      const versions = [
        ["Which shape always has 4 equal sides and 4 square corners?", "square", ["rectangle", "triangle", "pentagon"], "A square has four equal sides and four right angles."],
        ["Which shape has exactly 5 straight sides?", "pentagon", ["triangle", "rectangle", "hexagon"], "A pentagon has exactly five sides."],
        ["Which shape has exactly one pair of parallel sides?", "trapezium", ["square", "triangle", "circle"], "A trapezium can have exactly one pair of parallel sides."]
      ][variant];
      return { skill: "2D shape properties", prompt: versions[0], ...correctChoice(versions[1], versions[2]), explanation: versions[3] };
    }
    case "shapeCompare": { return { skill: "Compare shapes", prompt: "Which pair has the same number of sides?", stimulus: { type: "shapeChoices", pairs: [["square", "rectangle"], ["triangle", "pentagon"], ["circle", "triangle"], ["hexagon", "square"]] }, ...correctChoice("A", ["B", "C", "D"]), explanation: "A square and rectangle each have four sides." }; }
    case "shapeRiddle": { return { skill: "Shape reasoning", prompt: "I have more than 3 sides, fewer than 6 sides, and not all my sides need to be equal. Which shape could I be?", ...correctChoice("rectangle", ["triangle", "hexagon", "circle"]), explanation: "A rectangle has four sides, which is more than 3 and fewer than 6." }; }
    case "solid": {
      const versions = [
        ["Which object has 6 square faces?", "cube", ["cone", "cylinder", "sphere"], ["cube", "cone", "cylinder", "sphere"], "A cube has six equal square faces."],
        ["Which object has one curved surface and two flat circular faces?", "cylinder", ["cube", "cone", "sphere"], ["cylinder", "cube", "cone", "sphere"], "A cylinder has one curved surface and two flat circular faces."],
        ["Which object has one vertex, one circular face and one curved surface?", "cone", ["cube", "cylinder", "sphere"], ["cone", "cube", "cylinder", "sphere"], "A cone has one vertex, one circular face and one curved surface."]
      ][variant];
      return { skill: "3D objects", prompt: versions[0], stimulus: { type: "solids", names: versions[3] }, ...correctChoice(versions[1], versions[2]), explanation: versions[4] };
    }
    case "turn": {
      const versions = [
        ["up", "quarter-clockwise", "right", ["left", "down", "up"], "A quarter turn clockwise from up points right."],
        ["right", "quarter-anticlockwise", "up", ["left", "down", "right"], "A quarter turn anticlockwise from right points up."],
        ["down", "quarter-clockwise", "left", ["right", "up", "down"], "A quarter turn clockwise from down points left."]
      ][variant];
      return { skill: "Turns", prompt: `The arrow points ${versions[0]}, then makes a quarter turn ${versions[1].includes("anti") ? "anticlockwise" : "clockwise"}. Which way will it point?`, stimulus: { type: "arrow", direction: versions[0], turn: versions[1] }, ...correctChoice(versions[2], versions[3]), explanation: versions[4] };
    }
    case "halfTurn": { return { skill: "Turns", prompt: "The arrow points left, then makes a half turn. Which way does it point?", stimulus: { type: "arrow", direction: "left", turn: "half" }, ...correctChoice("right", ["left", "up", "down"]), explanation: "A half turn points in the opposite direction." }; }
    case "grid": {
      const versions = [
        ["B2", "one square right and two squares up", "C4", ["A4", "C3", "D4"], "One right moves B to C; two up moves row 2 to row 4."],
        ["C1", "two squares left and two squares up", "A3", ["B3", "A2", "D3"], "Two left moves C to A; two up moves row 1 to row 3."],
        ["A4", "three squares right and one square down", "D3", ["C3", "D4", "C2"], "Three right moves A to D; one down moves row 4 to row 3."]
      ][variant];
      return { skill: "Grid position", prompt: `Start at ${versions[0]}. Move ${versions[1]}. Where do you finish?`, stimulus: { type: "grid", columns: ["A", "B", "C", "D"], rows: 4, start: versions[0] }, ...correctChoice(versions[2], versions[3]), explanation: versions[4] };
    }
    case "path": {
      const versions = [
        ["A1", "C3", "2 right, then 2 up", ["2 left, then 2 up", "3 right, then 1 up", "1 right, then 3 up"]],
        ["D1", "B4", "2 left, then 3 up", ["2 right, then 3 up", "3 left, then 2 up", "1 left, then 3 up"]],
        ["A4", "D2", "3 right, then 2 down", ["2 right, then 3 down", "3 left, then 2 down", "3 right, then 1 down"]]
      ][variant];
      return { skill: "Directions", prompt: `Which instruction moves the marker from ${versions[0]} to ${versions[1]} using exactly two moves?`, stimulus: { type: "grid", columns: ["A", "B", "C", "D"], rows: 4, start: versions[0], finish: versions[1] }, ...correctChoice(versions[2], versions[3]), explanation: `${versions[2]} reaches the finish.` };
    }
    case "chance": {
      const versions = [
        ["A bag contains 8 blue counters and 2 yellow counters. Which colour is more likely to be chosen?", "blue", ["yellow", "both are equally likely", "neither colour"], "There are more blue counters, so blue is more likely."],
        ["A spinner has 5 red sections, 3 green sections and 1 yellow section. Which colour is least likely?", "yellow", ["red", "green", "all are equally likely"], "Yellow has only one section, so it is least likely."],
        ["A box has 4 stars and 4 circles. Which statement is true?", "A star and a circle are equally likely.", ["A star is more likely.", "A circle is more likely.", "Neither shape can be chosen."], "There are four of each shape, so the outcomes are equally likely."]
      ][variant];
      return { skill: "Likelihood", prompt: versions[0], ...correctChoice(versions[1], versions[2]), explanation: versions[3] };
    }
    case "pictureGraph": {
      const versions = [
        [2, [["Books", 4], ["Games", 6], ["Puzzles", 3]], "Games", "12", ["6", "8", "10"]],
        [3, [["Apples", 5], ["Pears", 3], ["Oranges", 4]], "Pears", "9", ["3", "7", "12"]],
        [4, [["Red", 3], ["Blue", 5], ["Green", 2]], "Blue", "20", ["5", "8", "16"]]
      ][variant];
      return { skill: "Picture graphs", prompt: `Each symbol represents ${versions[0]} votes. How many votes did ${versions[2]} receive?`, stimulus: { type: "pictureGraph", key: versions[0], rows: versions[1] }, ...correctChoice(versions[3], versions[4]), explanation: `${versions[1].find((row) => row[0] === versions[2])[1]} symbols at ${versions[0]} votes each make ${versions[3]} votes.` };
    }
    case "dataTable": {
      const versions = [
        ["How many more students chose cycling than skating?", [["Cycling", 17], ["Skating", 9], ["Swimming", 14], ["Running", 11]], "8", ["5", "6", "26"], "17 - 9 = 8."],
        ["How many students chose chess and music altogether?", [["Chess", 12], ["Music", 15], ["Art", 9], ["Drama", 8]], "27", ["21", "23", "35"], "12 + 15 = 27."],
        ["How many fewer votes did mango receive than banana?", [["Apple", 18], ["Banana", 24], ["Mango", 15], ["Pear", 11]], "9", ["6", "13", "39"], "24 - 15 = 9."]
      ][variant];
      return { skill: "Tables", prompt: versions[0], stimulus: { type: "table", headers: ["Choice", "Total"], rows: versions[1] }, ...correctChoice(versions[2], versions[3]), explanation: versions[4] };
    }
    case "classify": {
      const versions = [
        ["Which question would produce number data?", "How many books did you read?", ["What is your favourite colour?", "Which pet do you prefer?", "What fruit do you like?"], "The number of books is recorded as numerical data."],
        ["Which question would produce category data?", "Which transport do you use?", ["How many minutes is your trip?", "How far do you travel?", "How many stops are there?"], "Transport types are categories rather than measurements."],
        ["Which result should be shown as a number?", "The height of each plant", ["The colour of each flower", "The type of each seed", "The name of each gardener"], "Height is measured and recorded as number data."]
      ][variant];
      return { skill: "Classify data", prompt: versions[0], ...correctChoice(versions[1], versions[2]), explanation: versions[3] };
    }
    case "twoClues": {
      const versions = [
        ["Which team scored more than Team B but fewer than Team D?", [["A", 18], ["B", 14], ["C", 21], ["D", 25]], "Team C", ["Team A", "Team B", "Team D"], "21 is greater than 14 and less than 25."],
        ["Which garden grew fewer than Garden C but more than Garden A?", [["A", 12], ["B", 19], ["C", 23], ["D", 9]], "Garden B", ["Garden A", "Garden C", "Garden D"], "19 is fewer than 23 but more than 12."],
        ["Which player scored at least 20 points but fewer than 25?", [["J", 18], ["K", 24], ["L", 25], ["M", 29]], "Player K", ["Player J", "Player L", "Player M"], "24 is at least 20 and still fewer than 25."]
      ][variant];
      return { skill: "Data reasoning", prompt: versions[0], stimulus: { type: "table", headers: ["Entry", "Value"], rows: versions[1] }, ...correctChoice(versions[2], versions[3]), explanation: versions[4] };
    }
    case "dataChain": { return { skill: "Multi-step data", prompt: "A picture graph shows 5 symbols for red and 3 for green. Each symbol means 4 votes. How many more votes did red receive?", ...correctChoice("8", ["2", "12", "20"]), explanation: "The difference is 2 symbols, and 2 x 4 = 8 votes." }; }
    default: throw new Error(`Unknown maths template: ${type}`);
  }
}

function spellingTest(id, title, mode, count, timing, specs) {
  if (specs.length !== count) throw new Error(`${id} expected ${count} specs, received ${specs.length}`);
  return {
    id, subject: "spelling", title, mode, timing,
    minutes: mode === "simulation" ? 40 : mode === "diagnostic" ? 20 : 18,
    questions: specs.map((spec, index) => ({
      id: `${id}-q${String(index + 1).padStart(2, "0")}`,
      section: "Spelling Bee", domain: contextLabel(spec.format), skill: knowledgeLabel(spec.knowledge),
      framework: `ICAS Paper A / ${contextLabel(spec.format)} / ${knowledgeLabel(spec.knowledge)}`,
      ...spec,
      audio: spec.format === "dictation" ? `assets/audio/${id}-q${String(index + 1).padStart(2, "0")}.mp3` : undefined
    }))
  };
}

function d(word, sentence, knowledge, difficulty) {
  return { format: "dictation", difficulty, knowledge, prompt: "Listen, then type the target word.", target: word, sentence, acceptedAnswers: [word], correctText: word, explanation: `The correct spelling is ${word}.` };
}
function r(target, base, prompt, options, correct, explanation, knowledge, difficulty) {
  return { format: "choice", difficulty, knowledge, prompt, target, base, options, correct, correctText: options[correct], explanation };
}
function p(target, wrong, sentence, knowledge, difficulty) {
  const words = sentence.replace(/[.?!]/g, "").split(/\s+/);
  const correct = words.findIndex((word) => word.toLowerCase().replace(/[^a-z']/g, "") === wrong.toLowerCase());
  if (correct < 0) throw new Error(`Proofreading sentence does not contain ${wrong}`);
  return { format: "proofread", difficulty, knowledge, prompt: "Select the misspelt word.", target, wrong, sentence, options: words, correct, correctText: target, explanation: `${wrong} should be spelt ${target}.` };
}
function c(target, wrong, prompt, knowledge, difficulty) {
  return { format: "correction", difficulty, knowledge, prompt, target, wrong, acceptedAnswers: [target], correctText: target, explanation: `The correct spelling is ${target}.` };
}

function contextLabel(format) {
  return ({ dictation: "Dictation", choice: "Rules & Conventions", proofread: "Proofreading", correction: "Error Correction" })[format] || format;
}
function knowledgeLabel(knowledge) {
  return ({ visual: "Visual knowledge", phonological: "Phonological knowledge", morphemic: "Morphemic knowledge", etymological: "Etymological knowledge" })[knowledge] || knowledge;
}
function optionise(answer, distractors, seed) {
  const values = [...new Set([answer, ...distractors])].slice(0, 4);
  while (values.length < 4) values.push(String(Number(answer) + values.length + 1));
  const shift = seed % values.length;
  const options = values.slice(shift).concat(values.slice(0, shift));
  return { options, correct: options.indexOf(answer), correctText: answer };
}
function hash(value) {
  let result = 2166136261;
  for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619);
  return result >>> 0;
}

function validate(bank) {
  const ids = new Set();
  const prompts = new Map();
  const duplicatePrompts = [];
  const spellingTargets = new Set();
  let total = 0;
  for (const test of bank.tests) {
    if (ids.has(test.id)) throw new Error(`Duplicate test id ${test.id}`);
    ids.add(test.id);
    test.questions.forEach((question) => {
      total += 1;
      if (ids.has(question.id)) throw new Error(`Duplicate question id ${question.id}`);
      ids.add(question.id);
      if (!question.prompt || !question.explanation || !question.domain || !question.skill) throw new Error(`Incomplete question ${question.id}`);
      const promptKey = test.subject === "spelling"
        ? `${question.target}|${question.sentence || question.wrong || question.base || ""}`
        : `${question.prompt}|${JSON.stringify(question.stimulus || {})}`;
      if (prompts.has(promptKey)) duplicatePrompts.push(`${question.id} (${question.skill}; matches ${prompts.get(promptKey)})`);
      prompts.set(promptKey, question.id);
      if (question.options) {
        const expectedLength = question.format === "proofread" ? question.options.length : 4;
        const hasDuplicateChoices = question.format !== "proofread" && new Set(question.options.map(String)).size !== question.options.length;
        if (expectedLength < 4 || question.options.length !== expectedLength || hasDuplicateChoices) throw new Error(`Invalid options ${question.id}`);
        if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.options.length) throw new Error(`Invalid answer index ${question.id}`);
      } else if (!Array.isArray(question.acceptedAnswers) || !question.acceptedAnswers.length) throw new Error(`Missing accepted answer ${question.id}`);
      if (question.target) {
        const targetKey = question.target.toLowerCase();
        if (spellingTargets.has(targetKey)) throw new Error(`Repeated spelling target ${question.target}`);
        spellingTargets.add(targetKey);
        if (question.format === "choice" && normalise(question.correctText) !== normalise(question.target)) throw new Error(`Spelling choice key does not match target ${question.id}`);
      }
    });
  }
  if (duplicatePrompts.length) throw new Error(`Duplicate prompt/stimulus: ${duplicatePrompts.join(", ")}`);
  if (total !== 176) throw new Error(`Expected 176 questions, received ${total}`);
  validateFullMath(bank.tests.find((test) => test.id === "icas-maths-full-1"));
  validateFullSpelling(bank.tests.find((test) => test.id === "icas-spelling-full-1"));
}

function validateFullMath(test) {
  const expectedDomains = { "Number & Arithmetic": 12, "Algebra & Patterns": 6, "Measures & Units": 8, "Space & Geometry": 8, "Chance & Data": 6 };
  const expectedFormats = { textChoice: 16, imageChoice: 10, tableGraph: 6, spatial: 4, numeric: 4 };
  const expectedDifficulty = { 1: 8, 2: 16, 3: 12, 4: 4 };
  assertCounts(test.questions, "domain", expectedDomains, "Maths domains");
  assertCounts(test.questions, "formatGroup", expectedFormats, "Maths formats");
  assertCounts(test.questions, "difficulty", expectedDifficulty, "Maths difficulty");
}
function validateFullSpelling(test) {
  const expectedContexts = { dictation: 14, choice: 10, proofread: 8, correction: 8 };
  const expectedKnowledge = { phonological: 12, visual: 12, morphemic: 12, etymological: 4 };
  const expectedDifficulty = { 1: 9, 2: 17, 3: 10, 4: 4 };
  assertCounts(test.questions, "format", expectedContexts, "Spelling contexts");
  assertCounts(test.questions, "knowledge", expectedKnowledge, "Spelling knowledge");
  assertCounts(test.questions, "difficulty", expectedDifficulty, "Spelling difficulty");
}
function assertCounts(items, key, expected, label) {
  const actual = items.reduce((map, item) => ({ ...map, [item[key]]: (map[item[key]] || 0) + 1 }), {});
  const allKeys = new Set([...Object.keys(actual), ...Object.keys(expected)]);
  if ([...allKeys].some((entry) => actual[entry] !== expected[entry])) throw new Error(`${label} mismatch: ${JSON.stringify(actual)} expected ${JSON.stringify(expected)}`);
}

function normalise(value) {
  return String(value ?? "").trim().toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, " ");
}
