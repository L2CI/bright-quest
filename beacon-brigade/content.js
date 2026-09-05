import { SUBJECT_QUESTION_TEMPLATES } from "./subject-content.js";

export const CONTENT_VERSION = 4;
export const STATIONS_PER_EXPEDITION = 5;
export const STATION_REWARD = 4;
export const HQ_UPGRADES = deepFreeze({
  2: { parts: 12, cores: 12 },
  3: { parts: 24, cores: 24 }
});

export const REGIONS = deepFreeze([
  { id: "harbour", name: "Maths Operations", subject: "maths", resource: "parts", icon: "calculator", minHqLevel: 1,
    description: "Run the number-powered logistics district and recover building parts.",
    stationNames: ["Multiplication Depot", "Addition Dispatch", "Division Workshop", "Subtraction Yard", "Place Value Tower"] },
  { id: "english", name: "English Communications", subject: "english", resource: "parts", icon: "book-open", minHqLevel: 1,
    description: "Decode words, sentences and stories inside the communications archive.",
    stationNames: ["Word Archive", "Sentence Studio", "Spelling Signal", "Reading Room", "Story Press"] },
  { id: "physics", name: "Physics Research", subject: "physics", resource: "cores", icon: "orbit", minHqLevel: 1,
    description: "Test forces, light, sound, circuits and energy at the research complex.",
    stationNames: ["Force Track", "Light Observatory", "Sound Lab", "Circuit Station", "Energy Workshop"] },
  { id: "chemistry", name: "Chemistry Laboratory", subject: "chemistry", resource: "cores", icon: "flask-conical", minHqLevel: 1,
    description: "Investigate matter, mixtures, changes, materials and particle models.",
    stationNames: ["Matter Hall", "Mixture Lab", "Changes Chamber", "Properties Bay", "Particle Observatory"] },
  { id: "grove", name: "Life Sciences BioDome", subject: "life-sciences", resource: "cores", icon: "sprout", minHqLevel: 1,
    description: "Study plants, habitats, life cycles, food webs and adaptations.",
    stationNames: ["Seed Lab", "Habitat Dome", "Life-Cycle Nursery", "Food-Web Field", "Adaptation Clinic"] }
]);

const review = {
  status: "reviewed", reviewer: "Codex authored-answer and executable consistency review",
  reviewedAt: "2026-09-05", humanCurriculumReview: "pending",
  source: "Original Beacon Brigade content; science observations are curated virtual datasets."
};

function maths(id, skill, prerequisites, hint, variants, build) {
  return { id, version: 1, regionId: "harbour", subject: "maths", skill,
    yearBand: "Age 8 / Year 3 with supported stretch (provisional)", prerequisites,
    parameterPolicy: "Only the two checked authored variants are used.", review,
    instances: variants.map((parameters) => ({ hint, wrongFeedback: hint,
      ...build(parameters), parameters, type: "number" })) };
}

function science(id, skill, hint, instances) {
  return { id, version: 1, regionId: "legacy-grove", subject: "science", skill,
    yearBand: "Age 8 / Year 3 with supported stretch (provisional)",
    prerequisites: ["Read a short observation table", "Compare evidence with a requirement"],
    parameterPolicy: "Only the two checked curated datasets are used.", review,
    instances: instances.map((instance) => ({ ...instance, hint, wrongFeedback: hint, type: "choice",
      diagram: { ...instance.diagram, source: "Curated virtual observations", simulation: false } })) };
}

export const QUESTION_TEMPLATES = deepFreeze([
  maths("harbour-crate-reserve", "Multiply equal groups, then subtract", ["Multiplication facts", "Subtraction"],
    "Count the pieces in all crates. Then take away the pieces for the other base.",
    [{ crates: 4, each: 6, reserved: 9 }, { crates: 5, each: 4, reserved: 7 }],
    ({ crates, each, reserved }) => ({
      prompt: `${crates} boxes each hold ${each} pieces. Another base needs ${reserved} of these pieces. How many are left for us?`,
      hint: `Add ${each} for each of the ${crates} boxes, or work out ${crates} x ${each}. Then take away ${reserved}.`,
      wrongFeedback: "There are two steps: count all the pieces, then take away the other base's share.",
      answer: crates * each - reserved,
      explanation: `${crates} x ${each} = ${crates * each} pieces. ${crates * each} - ${reserved} = ${crates * each - reserved} pieces remain.`,
      diagram: { kind: "groups", label: "Boxes of pieces", groups: crates, itemsPerGroup: each, reserved }
    })),
  maths("harbour-delivery-total", "Add two three-digit quantities", ["Place value", "Addition with regrouping"],
    "Start with the first delivery. Add the hundreds, then the tens, then the ones from the second delivery.",
    [{ first: 136, second: 247 }, { first: 258, second: 164 }],
    ({ first, second }) => {
      const hundreds = Math.floor(second / 100) * 100;
      const tens = Math.floor(second / 10) % 10 * 10;
      const ones = second % 10;
      return {
        prompt: `The morning delivery brings ${first} bolts. The afternoon delivery brings ${second} bolts. How many bolts arrive altogether?`,
        answer: first + second,
        explanation: `${first} + ${hundreds} = ${first + hundreds}. Add ${tens} to get ${first + hundreds + tens}. Add ${ones} to get ${first + second} bolts altogether.`,
        hint: `Start at ${first}. Add ${hundreds}, then ${tens}, then ${ones}.`,
        wrongFeedback: "Both deliveries add to the total. Keep the hundreds, tens and ones in their places.",
        diagram: { kind: "quantities", label: "Bolt delivery log", rows: [["Morning", first], ["Afternoon", second]] }
      };
    }),
  maths("harbour-equal-packs", "Divide into equal groups", ["Equal sharing", "Multiplication facts"],
    "Give each kit the same number. Count in groups to reach the total.",
    [{ total: 36, kits: 6 }, { total: 48, kits: 8 }],
    ({ total, kits }) => ({
      prompt: `Share ${total} metal rings equally between ${kits} repair kits. How many rings go in each kit?`,
      hint: `Imagine giving one ring to each of ${kits} kits at a time. How many rounds use all ${total} rings?`,
      wrongFeedback: "Each kit needs the same number. Check that all the kits together use every ring.",
      answer: total / kits,
      explanation: `${total} divided by ${kits} = ${total / kits}. Check: ${kits} x ${total / kits} = ${total}. Each kit gets ${total / kits} rings.`,
      diagram: { kind: "sharing", label: "Repair kits", total, groups: kits }
    })),
  maths("harbour-stock-left", "Subtract with regrouping", ["Three-digit place value", "Subtraction"],
    "You can find what is left by counting up from the number used to the starting number.",
    [{ stock: 302, used: 178 }, { stock: 410, used: 235 }],
    ({ stock, used }) => {
      const nextHundred = Math.ceil(used / 100) * 100;
      const firstJump = nextHundred - used;
      const secondJump = stock - nextHundred;
      return {
        prompt: `The workshop has ${stock} spare parts. It uses ${used} for repairs. How many parts are left?`,
        hint: `Count up from ${used} to ${nextHundred}, then to ${stock}. Add the two jumps.`,
        wrongFeedback: "We need the parts left, not the parts used. Try counting up from the used number to the starting number.",
        answer: stock - used,
        explanation: `From ${used} to ${nextHundred} is ${firstJump}. Then to ${stock} is ${secondJump}. Add the jumps: ${firstJump} + ${secondJump} = ${stock - used} parts left.`,
        diagram: { kind: "quantities", label: "Spare parts", rows: [["At the start", stock], ["Used", used]] }
      };
    }),
  maths("harbour-place-value", "Compose hundreds, tens and ones", ["Base-ten grouping"],
    "Each full box stands for 100, each bundle for 10, and each loose pin for 1.",
    [{ hundreds: 3, tens: 4, ones: 8 }, { hundreds: 5, tens: 2, ones: 6 }],
    ({ hundreds, tens, ones }) => ({
      prompt: `There are ${hundreds} boxes of 100 pins, ${tens} bundles of 10 pins and ${ones} loose pins. How many pins are there?`,
      answer: hundreds * 100 + tens * 10 + ones,
      explanation: `${hundreds} x 100 + ${tens} x 10 + ${ones} = ${hundreds * 100 + tens * 10 + ones} pins.`,
      wrongFeedback: "A box is worth 100 pins and a bundle is worth 10. Count their values, not just the boxes and bundles.",
      diagram: { kind: "place-value", label: "Pin count", hundreds, tens, ones }
    })),
  maths("harbour-missing-supply", "Find a missing addend", ["Addition and subtraction are inverse"],
    "Count up from the number packed to the number needed. How many more does that take?",
    [{ target: 150, packed: 86 }, { target: 200, packed: 127 }],
    ({ target, packed }) => {
      const nextTen = Math.ceil(packed / 10) * 10;
      const firstJump = nextTen - packed;
      const secondJump = target - nextTen;
      return {
        prompt: `We need ${target} bolts. We have packed ${packed}. How many more bolts do we need?`,
        hint: `Start at ${packed}. Jump to ${nextTen}, then to ${target}. Add the jumps.`,
        wrongFeedback: "Some bolts are already packed. Find only the extra bolts needed to reach the total.",
        answer: target - packed,
        explanation: `From ${packed} to ${nextTen} is ${firstJump}. Then to ${target} is ${secondJump}. Add the jumps: ${firstJump} + ${secondJump} = ${target - packed} more bolts.`,
        diagram: { kind: "quantities", label: "Bolts to pack", rows: [["Needed", target], ["Packed", packed]] }
      };
    }),
  science("grove-flexible-cover", "Choose a material using two properties",
    "Find a row with Yes for bending and No for water getting through. Both must match.", [
      { prompt: "A cover must bend around a box and keep water out. Which sample does both?",
        options: [{ id: "foil", label: "Sample A: flexible sheet" }, { id: "card", label: "Sample B: card" }, { id: "tile", label: "Sample C: tile" }], answer: "foil",
        explanation: "Sample A bends and lets no water through in the displayed tests. B lets water through; C does not bend. Only A meets both needs.",
        diagram: { kind: "table", label: "Cover tests", columns: ["Sample", "Bends around box", "Water through"],
          rows: [["A: flexible sheet", "Yes", "No"], ["B: card", "Yes", "Yes"], ["C: tile", "No", "No"]],
          controls: "Same water volume and test time.", limitation: "These results describe only the tested samples." } },
      { prompt: "A new cover must bend around a box and keep water out. Which sample does both?",
        options: [{ id: "board", label: "Sample D: board" }, { id: "film", label: "Sample E: film" }, { id: "cloth", label: "Sample F: cloth" }], answer: "film",
        explanation: "E bends and keeps water out in this test. D cannot bend. F lets water through.",
        diagram: { kind: "table", label: "New cover tests", columns: ["Sample", "Bends around box", "Water through"],
          rows: [["D: board", "No", "No"], ["E: film", "Yes", "No"], ["F: cloth", "Yes", "Yes"]],
          controls: "Same amount of water and test time.", limitation: "Other samples may give different results." } }
    ]),
  science("grove-magnet-evidence", "Use observations about magnetic attraction",
    "Attracted means pulled towards the magnet. Find Yes in that column. Shiny objects are not always magnetic.", [
      { prompt: "Which object was pulled towards the magnet in this test?",
        options: [{ id: "steel", label: "Steel washer" }, { id: "aluminium", label: "Aluminium tab" }, { id: "wood", label: "Wooden peg" }], answer: "steel",
        explanation: "The magnet pulled the steel washer, but not the aluminium tab or wooden peg. Not all metals are attracted to a magnet.",
        diagram: { kind: "table", label: "Magnet observations", columns: ["Object", "Attracted"],
          rows: [["Steel washer", "Yes"], ["Aluminium tab", "No"], ["Wooden peg", "No"]],
          controls: "Same magnet and starting distance.", limitation: "Results apply to these objects and this magnet." } },
      { prompt: "Which object was pulled towards the magnet in this new test?",
        options: [{ id: "plastic", label: "Plastic spacer" }, { id: "copper", label: "Copper strip" }, { id: "iron", label: "Iron nail" }], answer: "iron",
        explanation: "Only the iron nail was attracted in this test. The copper strip is metal but was not attracted.",
        diagram: { kind: "table", label: "Pickup observations", columns: ["Object", "Attracted"],
          rows: [["Plastic spacer", "No"], ["Copper strip", "No"], ["Iron nail", "Yes"]],
          controls: "Same magnet and starting distance.", limitation: "Not every metal is attracted to this magnet." } }
    ]),
  science("grove-fair-ramp", "Identify a fair comparison",
    "Change only the surface. Keep the trolley, ramp height and release method the same.", [
      { prompt: "Does the surface change how far a trolley rolls? Which two tests change only the surface?",
        options: [{ id: "a-b", label: "Tests A and B" }, { id: "a-c", label: "Tests A and C" }, { id: "b-c", label: "Tests B and C" }], answer: "a-b",
        explanation: "A and B use the same trolley, ramp height and no push. Only the surface changes. C uses a higher ramp.",
        diagram: { kind: "table", label: "Ramp test plans", columns: ["Test", "Trolley", "Ramp height", "Surface", "Release"],
          rows: [["A", "1", "10 cm", "Smooth", "No push"], ["B", "1", "10 cm", "Rough", "No push"], ["C", "1", "20 cm", "Rough", "No push"]],
          controls: "Keep the trolley, ramp height and start the same.", limitation: "Repeat the tests to check the results." } },
      { prompt: "We want to test two surfaces. Which pair keeps the trolley, ramp height and start the same?",
        options: [{ id: "d-e", label: "Tests D and E" }, { id: "d-f", label: "Tests D and F" }, { id: "e-f", label: "Tests E and F" }], answer: "d-f",
        explanation: "D and F use the same trolley, 15 cm ramp and release; only the surface changes. E changes the trolley too.",
        diagram: { kind: "table", label: "New ramp test plans", columns: ["Test", "Trolley", "Ramp height", "Surface", "Release"],
          rows: [["D", "1", "15 cm", "Smooth", "No push"], ["E", "2", "15 cm", "Rough", "No push"], ["F", "1", "15 cm", "Rough", "No push"]],
          controls: "Keep the trolley, ramp height and start the same.", limitation: "Change only the surface for this fair test." } }
    ]),
  science("grove-absorbent-pad", "Compare measured material properties",
    "Absorbs means soaks up. Find the biggest amount of water in the table. mL measures the amount of water.", [
      { prompt: "Each pad gets 20 mL of water. Which pad soaks up the most in this test?",
        options: [{ id: "a", label: "Pad A" }, { id: "b", label: "Pad B" }, { id: "c", label: "Pad C" }], answer: "b",
        explanation: "B soaks up 14 mL. That is more than A's 5 mL and C's 9 mL.",
        diagram: { kind: "table", label: "Absorbency test", columns: ["Pad", "Water absorbed"],
          rows: [["A", "5 mL"], ["B", "14 mL"], ["C", "9 mL"]], controls: "Same pad size, water amount and 30-second test.", limitation: "Other tests may give different results." } },
      { prompt: "Each pad gets 20 mL of water. Which pad soaks up the most in this new test?",
        options: [{ id: "d", label: "Pad D" }, { id: "e", label: "Pad E" }, { id: "f", label: "Pad F" }], answer: "f",
        explanation: "F soaks up 16 mL. That is more than D's 8 mL and E's 11 mL.",
        diagram: { kind: "table", label: "New absorbency test", columns: ["Pad", "Water absorbed"],
          rows: [["D", "8 mL"], ["E", "11 mL"], ["F", "16 mL"]], controls: "Same pad size, water amount and 30-second test.", limitation: "Choose using these results, not the pad's name." } }
    ]),
  science("grove-push-observation", "Link a push to observed motion",
    "Compare the two distances. The larger number means the cart went further in this test.", [
      { prompt: "The cart starts still each time on the same track. Which sentence matches the results?",
        options: [{ id: "further", label: "The stronger push moved this cart further." }, { id: "same", label: "Both pushes moved it the same distance." }, { id: "less", label: "The stronger push moved it less far." }], answer: "further",
        explanation: "In this test, the stronger push moves the cart 70 cm and the gentle push 30 cm. Since 70 is greater than 30, the stronger push moves it further.",
        diagram: { kind: "table", label: "Cart push observations", columns: ["Push", "Distance travelled"], rows: [["Gentle", "30 cm"], ["Stronger", "70 cm"]],
          controls: "Same cart, track and starting point. Start with the cart still.", limitation: "These are made-up test results, not a live experiment." } },
      { prompt: "The cart starts still each time on the same track. Which sentence matches these new results?",
        options: [{ id: "none", label: "Neither push moved the cart." }, { id: "gentle", label: "The gentle push moved this cart less far." }, { id: "equal", label: "The two distances are equal." }], answer: "gentle",
        explanation: "25 cm is less than 60 cm. The gentle push moved this cart less far in this test.",
        diagram: { kind: "table", label: "New cart observations", columns: ["Push", "Distance travelled"], rows: [["Gentle", "25 cm"], ["Stronger", "60 cm"]],
          controls: "Same cart, track and starting point. Start with the cart still.", limitation: "These results describe only these tests." } }
    ]),
  science("grove-load-support", "Use test evidence to choose a support",
    "Find a support that holds the number needed or more. Exactly that number is enough.", [
      { prompt: "We need a support that holds 6 blocks without bending. Which one can do this?",
        options: [{ id: "a", label: "Support A" }, { id: "b", label: "Support B" }, { id: "c", label: "Support C" }], answer: "c",
        explanation: "C holds 8 blocks without bending, which is at least 6. A holds only 3 and B only 5, so neither meets the requirement.",
        diagram: { kind: "table", label: "Support tests", columns: ["Support", "Most blocks without bending"], rows: [["A", 3], ["B", 5], ["C", 8]],
          controls: "Same gap, same kind of blocks, same block position.", limitation: "Made-up test results. Do not use them to build real supports." } },
      { prompt: "We need a support that holds 7 blocks without bending. Which one can do this?",
        options: [{ id: "d", label: "Support D" }, { id: "e", label: "Support E" }, { id: "f", label: "Support F" }], answer: "d",
        explanation: "D holds 7 blocks without bending and meets the requirement exactly. E holds 4 and F holds 6, which are both fewer than 7.",
        diagram: { kind: "table", label: "New support tests", columns: ["Support", "Most blocks without bending"], rows: [["D", 7], ["E", 4], ["F", 6]],
          controls: "Same gap, same kind of blocks, same block position.", limitation: "These results describe only these supports." } }
    ]),
  ...SUBJECT_QUESTION_TEMPLATES
]);

export function createQuestion(templateId, variant = 0) {
  const template = QUESTION_TEMPLATES.find((item) => item.id === templateId);
  if (!template || !Number.isInteger(variant) || variant < 0 || variant >= template.instances.length) {
    throw new RangeError("Unknown Beacon Brigade question instance");
  }
  const { instances, ...metadata } = template;
  // Stamp each new snapshot, including those created for profiles on an older content version.
  return structuredClone({ ...metadata, ...instances[variant], contentVersion: CONTENT_VERSION,
    id: `${template.id}:v${template.version}:${variant}`, templateId, templateVersion: template.version, variant });
}

function deepFreeze(value) {
  for (const child of Object.values(value)) if (child && typeof child === "object") deepFreeze(child);
  return Object.freeze(value);
}
