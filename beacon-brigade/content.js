import { SUBJECT_QUESTION_TEMPLATES } from "./subject-content.js";

export const CONTENT_VERSION = 3;
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
  reviewedAt: "2026-08-31", humanCurriculumReview: "pending",
  source: "Original Beacon Brigade content; science observations are curated virtual datasets."
};

function maths(id, skill, prerequisites, hint, variants, build) {
  return { id, version: 1, regionId: "harbour", subject: "maths", skill,
    yearBand: "Year 3 core / Year 4 stretch (provisional)", prerequisites,
    parameterPolicy: "Only the two checked authored variants are used.", review,
    instances: variants.map((parameters) => ({ ...build(parameters), parameters,
      hint, wrongFeedback: hint, type: "number" })) };
}

function science(id, skill, hint, instances) {
  return { id, version: 1, regionId: "legacy-grove", subject: "science", skill,
    yearBand: "Year 3 core / Year 4 stretch (provisional)",
    prerequisites: ["Read a short observation table", "Compare evidence with a requirement"],
    parameterPolicy: "Only the two checked curated datasets are used.", review,
    instances: instances.map((instance) => ({ ...instance, hint, wrongFeedback: hint, type: "choice",
      diagram: { ...instance.diagram, source: "Curated virtual observations", simulation: false } })) };
}

export const QUESTION_TEMPLATES = deepFreeze([
  maths("harbour-crate-reserve", "Multiply equal groups, then subtract", ["Multiplication facts", "Subtraction"],
    "Find the pieces in all crates first. Then subtract the pieces reserved for the other repair.",
    [{ crates: 4, each: 6, reserved: 9 }, { crates: 5, each: 4, reserved: 7 }],
    ({ crates, each, reserved }) => ({
      prompt: `${crates} crates each hold ${each} repair pieces. ${reserved} pieces are reserved for another base. How many pieces remain for our tank base?`,
      answer: crates * each - reserved,
      explanation: `${crates} x ${each} = ${crates * each} pieces. ${crates * each} - ${reserved} = ${crates * each - reserved} pieces remain.`,
      diagram: { kind: "groups", label: "Repair-piece crates", groups: crates, itemsPerGroup: each, reserved }
    })),
  maths("harbour-delivery-total", "Add two three-digit quantities", ["Place value", "Addition with regrouping"],
    "Add hundreds, tens and ones. Regroup ten ones as one ten when needed.",
    [{ first: 136, second: 247 }, { first: 258, second: 164 }],
    ({ first, second }) => ({
      prompt: `The morning delivery brings ${first} bolts. The afternoon delivery brings ${second} bolts. How many bolts arrive altogether?`,
      answer: first + second, explanation: `${first} + ${second} = ${first + second} bolts altogether.`,
      diagram: { kind: "quantities", label: "Bolt delivery log", rows: [["Morning", first], ["Afternoon", second]] }
    })),
  maths("harbour-equal-packs", "Divide into equal groups", ["Equal sharing", "Multiplication facts"],
    "Share the total equally. Check by multiplying the number of kits by the amount in one kit.",
    [{ total: 36, kits: 6 }, { total: 48, kits: 8 }],
    ({ total, kits }) => ({
      prompt: `${total} washers are shared equally between ${kits} repair kits. How many washers go into each kit?`,
      answer: total / kits,
      explanation: `${total} divided by ${kits} = ${total / kits}. Check: ${kits} x ${total / kits} = ${total}. Each kit gets ${total / kits} washers.`,
      diagram: { kind: "sharing", label: "Repair kits", total, groups: kits }
    })),
  maths("harbour-stock-left", "Subtract with regrouping", ["Three-digit place value", "Subtraction"],
    "Start with the stock count and subtract the used count. You can count up from the used count to check.",
    [{ stock: 302, used: 178 }, { stock: 410, used: 235 }],
    ({ stock, used }) => ({
      prompt: `The workshop has ${stock} track pads. It uses ${used} for repairs. How many track pads are left?`,
      answer: stock - used,
      explanation: `${stock} - ${used} = ${stock - used}. Check: ${used} + ${stock - used} = ${stock}.`,
      diagram: { kind: "quantities", label: "Track-pad stock", rows: [["In stock", stock], ["Used", used]] }
    })),
  maths("harbour-place-value", "Compose hundreds, tens and ones", ["Base-ten grouping"],
    "Each full box stands for 100, each bundle for 10, and each loose pin for 1.",
    [{ hundreds: 3, tens: 4, ones: 8 }, { hundreds: 5, tens: 2, ones: 6 }],
    ({ hundreds, tens, ones }) => ({
      prompt: `There are ${hundreds} boxes of 100 pins, ${tens} bundles of 10 pins and ${ones} loose pins. How many pins are there?`,
      answer: hundreds * 100 + tens * 10 + ones,
      explanation: `${hundreds} x 100 + ${tens} x 10 + ${ones} = ${hundreds * 100 + tens * 10 + ones} pins.`,
      diagram: { kind: "place-value", label: "Pin inventory", hundreds, tens, ones }
    })),
  maths("harbour-missing-supply", "Find a missing addend", ["Addition and subtraction are inverse"],
    "Subtract the amount already packed from the total needed. Add your result to the packed amount to check.",
    [{ target: 150, packed: 86 }, { target: 200, packed: 127 }],
    ({ target, packed }) => ({
      prompt: `A repair order needs ${target} connectors. ${packed} are already packed. How many more connectors are needed?`,
      answer: target - packed,
      explanation: `${target} - ${packed} = ${target - packed}. ${packed} + ${target - packed} = ${target}, so pack ${target - packed} more.`,
      diagram: { kind: "quantities", label: "Connector order", rows: [["Needed", target], ["Packed", packed]] }
    })),
  science("grove-flexible-cover", "Choose a material using two properties",
    "The cover must pass BOTH tests: no water through and able to bend. A sample that passes only one is not enough.", [
      { prompt: "The base needs a cover that bends around a curved box AND keeps water out. Which tested sample meets both needs?",
        options: [{ id: "foil", label: "Sample A: flexible sheet" }, { id: "card", label: "Sample B: card" }, { id: "tile", label: "Sample C: tile" }], answer: "foil",
        explanation: "Sample A bends and lets no water through in the displayed tests. B lets water through; C does not bend. Only A meets both needs.",
        diagram: { kind: "table", label: "Cover tests", columns: ["Sample", "Bends around box", "Water through"],
          rows: [["A: flexible sheet", "Yes", "No"], ["B: card", "Yes", "Yes"], ["C: tile", "No", "No"]],
          controls: "Same water volume and test time.", limitation: "These results describe only the tested samples." } },
      { prompt: "A new cover must bend around a curved box AND keep water out. Which sample passes both displayed tests?",
        options: [{ id: "board", label: "Sample D: board" }, { id: "film", label: "Sample E: film" }, { id: "cloth", label: "Sample F: cloth" }], answer: "film",
        explanation: "E bends and lets no water through. D does not bend and F lets water through, so E is the supported choice.",
        diagram: { kind: "table", label: "New cover tests", columns: ["Sample", "Bends around box", "Water through"],
          rows: [["D: board", "No", "No"], ["E: film", "Yes", "No"], ["F: cloth", "Yes", "Yes"]],
          controls: "Same water volume and test time.", limitation: "Do not generalise from these samples to every material." } }
    ]),
  science("grove-magnet-evidence", "Use observations about magnetic attraction",
    "Use the attraction column, not whether an object looks shiny or is called a metal.", [
      { prompt: "The magnetic pickup must lift an object attracted in this test. Which object should it collect?",
        options: [{ id: "steel", label: "Steel washer" }, { id: "aluminium", label: "Aluminium tab" }, { id: "wood", label: "Wooden peg" }], answer: "steel",
        explanation: "The steel washer was attracted. The aluminium tab and wooden peg were not. Being a metal does not guarantee attraction to this magnet.",
        diagram: { kind: "table", label: "Magnet observations", columns: ["Object", "Attracted"],
          rows: [["Steel washer", "Yes"], ["Aluminium tab", "No"], ["Wooden peg", "No"]],
          controls: "Same magnet and starting distance.", limitation: "Results apply to these objects and this magnet." } },
      { prompt: "Which object has evidence that this magnetic pickup can attract it?",
        options: [{ id: "plastic", label: "Plastic spacer" }, { id: "copper", label: "Copper strip" }, { id: "iron", label: "Iron nail" }], answer: "iron",
        explanation: "Only the iron nail was attracted in this test. The copper strip is metal but was not attracted.",
        diagram: { kind: "table", label: "Pickup observations", columns: ["Object", "Attracted"],
          rows: [["Plastic spacer", "No"], ["Copper strip", "No"], ["Iron nail", "Yes"]],
          controls: "Same magnet and starting distance.", limitation: "Not every metal is attracted to this magnet." } }
    ]),
  science("grove-fair-ramp", "Identify a fair comparison",
    "Change only the surface. Keep the trolley, ramp height and release method the same.", [
      { prompt: "The team is testing whether a surface changes how far a trolley rolls. Which pair changes only the surface?",
        options: [{ id: "a-b", label: "Tests A and B" }, { id: "a-c", label: "Tests A and C" }, { id: "b-c", label: "Tests B and C" }], answer: "a-b",
        explanation: "A and B use trolley 1, a 10 cm ramp and no push; only their surfaces differ. C also changes ramp height, so comparisons with C cannot isolate the surface.",
        diagram: { kind: "table", label: "Ramp test plans", columns: ["Test", "Trolley", "Ramp height", "Surface", "Release"],
          rows: [["A", "1", "10 cm", "Smooth", "No push"], ["B", "1", "10 cm", "Rough", "No push"], ["C", "1", "20 cm", "Rough", "No push"]],
          controls: "Compare trolley, ramp height and release method.", limitation: "Repeat a fair comparison before making a broad claim." } },
      { prompt: "Which pair fairly tests the effect of surface alone on how far the trolley rolls?",
        options: [{ id: "d-e", label: "Tests D and E" }, { id: "d-f", label: "Tests D and F" }, { id: "e-f", label: "Tests E and F" }], answer: "d-f",
        explanation: "D and F use the same trolley, 15 cm ramp and release; only the surface changes. E changes the trolley too.",
        diagram: { kind: "table", label: "New ramp test plans", columns: ["Test", "Trolley", "Ramp height", "Surface", "Release"],
          rows: [["D", "1", "15 cm", "Smooth", "No push"], ["E", "2", "15 cm", "Rough", "No push"], ["F", "1", "15 cm", "Rough", "No push"]],
          controls: "Compare trolley, ramp height and release method.", limitation: "A fair comparison tests one changed variable." } }
    ]),
  science("grove-absorbent-pad", "Compare measured material properties",
    "Choose the greatest measured water uptake. Compare the amounts, not the sample names.", [
      { prompt: "Equal-size pads each receive 20 mL of water. Which pad absorbs the most in the displayed test?",
        options: [{ id: "a", label: "Pad A" }, { id: "b", label: "Pad B" }, { id: "c", label: "Pad C" }], answer: "b",
        explanation: "Pad B absorbs 14 mL, more than A's 5 mL or C's 9 mL. It is the best-supported choice for water uptake in this test.",
        diagram: { kind: "table", label: "Absorbency test", columns: ["Pad", "Water absorbed"],
          rows: [["A", "5 mL"], ["B", "14 mL"], ["C", "9 mL"]], controls: "Same pad area, 20 mL water, 30-second test.", limitation: "One test does not establish performance under every condition." } },
      { prompt: "Equal-size pads each receive 20 mL of water. Which absorbs the most in this new test?",
        options: [{ id: "d", label: "Pad D" }, { id: "e", label: "Pad E" }, { id: "f", label: "Pad F" }], answer: "f",
        explanation: "F absorbs 16 mL, more than D's 8 mL and E's 11 mL. The measurements support F for this test.",
        diagram: { kind: "table", label: "New absorbency test", columns: ["Pad", "Water absorbed"],
          rows: [["D", "8 mL"], ["E", "11 mL"], ["F", "16 mL"]], controls: "Same pad area, 20 mL water, 30-second test.", limitation: "Use the measured result, not an assumption about the material." } }
    ]),
  science("grove-push-observation", "Link a push to observed motion",
    "Look at the distance after each push. Make a claim about this test, not about every possible situation.", [
      { prompt: "The same cart starts at rest on the same track. Which statement matches the observations?",
        options: [{ id: "further", label: "The stronger push moved this cart further." }, { id: "same", label: "Both pushes moved it the same distance." }, { id: "less", label: "The stronger push moved it less far." }], answer: "further",
        explanation: "In this test, the stronger push moves the cart 70 cm and the gentle push 30 cm. Since 70 is greater than 30, the stronger push moves it further.",
        diagram: { kind: "table", label: "Cart push observations", columns: ["Push", "Distance travelled"], rows: [["Gentle", "30 cm"], ["Stronger", "70 cm"]],
          controls: "Same cart, track and start position; cart initially at rest.", limitation: "Curated observations, not a general force simulator." } },
      { prompt: "The same cart starts at rest on the same track. Which statement is supported by these observations?",
        options: [{ id: "none", label: "Neither push moved the cart." }, { id: "gentle", label: "The gentle push moved this cart less far." }, { id: "equal", label: "The two distances are equal." }], answer: "gentle",
        explanation: "The gentle push moves this cart 25 cm, less than the stronger push's 60 cm. That supports the statement about the gentle push.",
        diagram: { kind: "table", label: "New cart observations", columns: ["Push", "Distance travelled"], rows: [["Gentle", "25 cm"], ["Stronger", "60 cm"]],
          controls: "Same cart, track and start position; cart initially at rest.", limitation: "The claim is limited to the displayed tests." } }
    ]),
  science("grove-load-support", "Use test evidence to choose a support",
    "The support must hold at least the required number of blocks without bending. Equal to the requirement is enough.", [
      { prompt: "A small platform needs to hold 6 identical blocks without bending. Which tested support meets that requirement?",
        options: [{ id: "a", label: "Support A" }, { id: "b", label: "Support B" }, { id: "c", label: "Support C" }], answer: "c",
        explanation: "C holds 8 blocks without bending, which is at least 6. A holds only 3 and B only 5, so neither meets the requirement.",
        diagram: { kind: "table", label: "Support tests", columns: ["Support", "Most blocks held without bending"], rows: [["A", 3], ["B", 5], ["C", 8]],
          controls: "Same span and identical blocks, added in the same position.", limitation: "Virtual model only; not instructions for a real load-bearing structure." } },
      { prompt: "A small platform needs to hold 7 identical blocks without bending. Which tested support meets that requirement?",
        options: [{ id: "d", label: "Support D" }, { id: "e", label: "Support E" }, { id: "f", label: "Support F" }], answer: "d",
        explanation: "D holds 7 blocks without bending and meets the requirement exactly. E holds 4 and F holds 6, which are both fewer than 7.",
        diagram: { kind: "table", label: "New support tests", columns: ["Support", "Most blocks held without bending"], rows: [["D", 7], ["E", 4], ["F", 6]],
          controls: "Same span and identical blocks, added in the same position.", limitation: "These results concern only the displayed supports." } }
    ]),
  ...SUBJECT_QUESTION_TEMPLATES
]);

export function createQuestion(templateId, variant = 0) {
  const template = QUESTION_TEMPLATES.find((item) => item.id === templateId);
  if (!template || !Number.isInteger(variant) || variant < 0 || variant >= template.instances.length) {
    throw new RangeError("Unknown Beacon Brigade question instance");
  }
  const { instances, ...metadata } = template;
  return structuredClone({ ...metadata, ...instances[variant],
    id: `${template.id}:v${template.version}:${variant}`, templateId, templateVersion: template.version, variant });
}

function deepFreeze(value) {
  for (const child of Object.values(value)) if (child && typeof child === "object") deepFreeze(child);
  return Object.freeze(value);
}
