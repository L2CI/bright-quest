// Answer-bearing content belongs on the authority, not in the learner bundle.
function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

export const INTENTS = freeze({
  open: { label: "Open stance", description: "Prism is recovering. No incoming hit this exchange." },
  guard: { label: "Shield ready", description: "Prism braces and nudges forward. Strike is blocked; staff Break pierces the shield." },
  strike: { label: "Quick strike", description: "A light hit is coming. Guard reduces it and charges energy." },
  heavy: { label: "Power strike", description: "A strong hit is coming. Guard absorbs most of it; attacking leaves you exposed." }
});
export const MOVES = freeze({
  strike: { label: "Strike", description: "Deal modest damage and gain 1 energy.", cost: 0, unlockRound: 1 },
  guard: { label: "Guard", description: "Reduce incoming damage. Gain 2 energy only if a hit arrives.", cost: 0, unlockRound: 1 },
  break: { label: "Break", description: "Spend 2 energy. The staff pierces Prism's shield.", cost: 2, unlockRound: 2 },
  special: { label: "Special", description: "Spend all 4 energy for a powerful attack. You still take the incoming hit.", cost: 4, unlockRound: 3 }
});
export const BATTLE_CONFIG = freeze({
  maxEnergy: 4,
  rounds: [
    { playerHP: 24, rivalHP: 16, playerPower: 10, rivalPower: 10 },
    { playerHP: 26, rivalHP: 28, playerPower: 18, rivalPower: 18 },
    { playerHP: 24, rivalHP: 50, playerPower: 26, rivalPower: 26 }
  ],
  incoming: { open: 0, guard: 2, strike: 4, heavy: 10 },
  sequences: [
    ["guard", "heavy", "open", "strike", "guard", "open"],
    ["heavy", "guard", "strike", "open", "heavy", "open"],
    ["strike", "heavy", "guard", "open", "guard", "heavy", "open"],
    ["guard", "strike", "heavy", "open", "heavy", "guard", "open"],
    ["heavy", "open", "guard", "heavy", "strike", "open"],
    ["strike", "guard", "heavy", "open", "strike", "heavy", "open"]
  ]
});

const choices = (labels) => labels.map((label, i) => ({ id: String.fromCharCode(97 + i), label }));
const numeric = (title, prompt, answer, clue, explanation, evidence) => ({
  type: "numeric", title, prompt, answer, choices: [], evidence,
  hints: [clue, `${explanation} Enter ${answer}.`], explanation
});
const order = (title, prompt, labels, answer, clue, explanation, evidence) => ({
  type: "order", title, prompt, choices: choices(labels), answer, evidence,
  hints: [clue, `${explanation} Tap: ${answer.map((id) => labels[id.charCodeAt(0) - 97]).join(", ")}.`], explanation
});
const mcq = (title, prompt, labels, answer, clue, explanation, evidence) => ({
  type: "mcq", title, prompt, choices: choices(labels), answer, evidence,
  hints: [clue, `${explanation} Choose ${labels[answer.charCodeAt(0) - 97]}.`], explanation
});
const task = (id, slot, skill, outcome, variants) => ({ id, slot, skill, outcome, variants });

export const TASKS = freeze([
  task("cell-packs", 0, "equal-groups", "The staff cartridge receives its cells.", [
    numeric("Fill the cartridge", "Relay has 3 packs with 8 cells in each pack. How many cells can go into the staff cartridge?", 24,
      "Count three equal groups of eight.", "8 + 8 + 8 = 24 cells.", { kind: "groups", groups: 3, each: 8, unit: "cells" }),
    numeric("Fill the cartridge", "Relay has 4 packs with 6 cells in each pack. How many cells can go into the staff cartridge?", 24,
      "Count four equal groups of six.", "6 + 6 + 6 + 6 = 24 cells.", { kind: "groups", groups: 4, each: 6, unit: "cells" })
  ]),
  task("cell-gap", 0, "subtraction", "The missing cartridge spaces are filled.", [
    numeric("Complete the cartridge", "The staff cartridge holds 30 cells. Relay has fitted 18. How many more cells fill it?", 12,
      "Count up from 18 to 30, or subtract 18 from 30.", "18 + 12 = 30, so 12 cells are missing.", { kind: "capacity", capacity: 30, filled: 18, unit: "cells" }),
    numeric("Complete the cartridge", "The staff cartridge holds 32 cells. Relay has fitted 17. How many more cells fill it?", 15,
      "Count from 17 to 20, then from 20 to 32.", "3 + 12 = 15, so 15 cells are missing.", { kind: "capacity", capacity: 32, filled: 17, unit: "cells" })
  ]),
  task("cell-share", 0, "equal-sharing", "Balanced cell trays slide into the staff.", [
    numeric("Balance the trays", "Share 20 cells equally between 4 staff trays. How many cells go in each tray?", 5,
      "Find a number that makes 20 when used four times.", "5 + 5 + 5 + 5 = 20, so each tray gets 5 cells.", { kind: "sharing", total: 20, groups: 4, unit: "cells" }),
    numeric("Balance the trays", "Share 18 cells equally between 3 staff trays. How many cells go in each tray?", 6,
      "Find a number that makes 18 when used three times.", "6 + 6 + 6 = 18, so each tray gets 6 cells.", { kind: "sharing", total: 18, groups: 3, unit: "cells" })
  ]),
  task("ring-count", 1, "skip-counting", "The calibration rings align and the staff unfolds.", [
    order("Align the rings", "Calibration rises by 4 each step. Put these ring numbers in increasing order.", ["20", "12", "24", "16"], ["b", "d", "a", "c"],
      "Start at the smallest number. Add four for each next ring.", "12, 16, 20, 24 increase by four each time.", { kind: "sequence", step: 4 }),
    order("Align the rings", "Calibration rises by 5 each step. Put these ring numbers in increasing order.", ["25", "15", "30", "20"], ["b", "d", "a", "c"],
      "Start at the smallest number. Add five for each next ring.", "15, 20, 25, 30 increase by five each time.", { kind: "sequence", step: 5 })
  ]),
  task("staff-length", 1, "measurement-order", "The staff sections lock from shortest to longest.", [
    order("Sort the sections", "Arrange the four staff sections from shortest to longest. All lengths use centimetres.", ["18 cm", "9 cm", "25 cm", "12 cm"], ["b", "d", "a", "c"],
      "Compare the numbers because all the units are the same.", "9 cm < 12 cm < 18 cm < 25 cm.", { kind: "measurement", unit: "cm" }),
    order("Sort the sections", "Arrange the four staff sections from shortest to longest. All lengths use centimetres.", ["21 cm", "14 cm", "8 cm", "17 cm"], ["c", "b", "d", "a"],
      "The smallest number is the shortest section.", "8 cm < 14 cm < 17 cm < 21 cm.", { kind: "measurement", unit: "cm" })
  ]),
  task("ring-place", 1, "place-value-order", "The numbered locks open the staff joints.", [
    order("Set the lock codes", "Put the staff lock codes in increasing order, smallest first.", ["105", "150", "95", "115"], ["c", "a", "d", "b"],
      "A two-digit number is smaller than these three-digit numbers. Then compare tens.", "95 < 105 < 115 < 150.", { kind: "place-value", range: "within 200" }),
    order("Set the lock codes", "Put the staff lock codes in increasing order, smallest first.", ["120", "102", "98", "112"], ["c", "b", "d", "a"],
      "Begin with the two-digit number. Compare the tens in the remaining codes.", "98 < 102 < 112 < 120.", { kind: "place-value", range: "within 200" })
  ]),
  task("pad-reading", 2, "compare-test-data", "The pad chosen from this test fits into Relay's suit.", [
    mcq("Choose a tested pad", "Look at the test table. Each pad gets the same push. Lower readings mean smaller pushes behind the pad. Which pad has the lowest reading?", ["Pad A", "Pad B", "Pad C"], "a",
      "Compare 6, 11 and 8. Find the smallest reading.", "Pad A recorded 6, the lowest reading. This result supports A for this test, not for every possible push.",
      { kind: "pad-test", note: "The same sensor measures the push behind each pad. These results apply to this test only.", controlled: "same test push and sensor", lowerIs: "smaller measured push behind pad", readings: [{ pad: "A", values: [6] }, { pad: "B", values: [11] }, { pad: "C", values: [8] }] }),
    mcq("Choose a tested pad", "Look at the test table. Each pad gets the same push. Lower readings mean smaller pushes behind the pad. Which pad has the lowest reading?", ["Pad A", "Pad B", "Pad C"], "b",
      "Compare 9, 7 and 12. Find the smallest reading.", "Pad B recorded 7, the lowest reading. This supports B under these test conditions only.",
      { kind: "pad-test", note: "The same sensor measures the push behind each pad. These results apply to this test only.", controlled: "same test push and sensor", lowerIs: "smaller measured push behind pad", readings: [{ pad: "A", values: [9] }, { pad: "B", values: [7] }, { pad: "C", values: [12] }] })
  ]),
  task("pad-repeat", 2, "repeated-test-data", "The pad supported by both trials is fitted.", [
    mcq("Check both trials", "Look at both trials in the table. Each pad gets the same push. Lower readings mean smaller pushes behind the pad. Which pad is lowest in BOTH trials?", ["Pad C", "Pad A", "Pad B"], "c",
      "Find the lowest reading in trial 1, then check trial 2.", "B is lowest in trial 1 (5) and trial 2 (6). Both trials support B for this tested push.",
      { kind: "pad-test", note: "Both trials use the same test push and sensor for all pads. These results apply to these test conditions only.", controlled: "same test push and sensor", lowerIs: "smaller measured push behind pad", readings: [{ pad: "A", values: [7, 8] }, { pad: "B", values: [5, 6] }, { pad: "C", values: [9, 10] }] }),
    mcq("Check both trials", "Look at both trials in the table. Each pad gets the same push. Lower readings mean smaller pushes behind the pad. Which pad is lowest in BOTH trials?", ["Pad C", "Pad A", "Pad B"], "b",
      "Compare each row separately. The same pad must be lowest twice.", "A is lowest in trial 1 (4) and trial 2 (5). Both trials support A for this tested push.",
      { kind: "pad-test", note: "Both trials use the same test push and sensor for all pads. These results apply to these test conditions only.", controlled: "same test push and sensor", lowerIs: "smaller measured push behind pad", readings: [{ pad: "A", values: [4, 5] }, { pad: "B", values: [8, 9] }, { pad: "C", values: [6, 7] }] })
  ]),
  task("pad-tie", 2, "limits-of-evidence", "A tied test result is recorded honestly before fitting a pad.", [
    mcq("Read a tied result", "Look at this test table. Each pad gets the same push. Lower readings mean smaller pushes behind the pad. Which statement matches these readings?", ["A is better than B in this test", "A and B share the lowest reading", "C has the lowest reading"], "b",
      "Two pads have the same number. Do these numbers tell them apart?", "A and B both read 6. They tie for lowest here; this test does not show that A beats B.",
      { kind: "pad-test", note: "The same sensor measures the push behind each pad. These results apply to this test only.", controlled: "same test push and sensor", lowerIs: "smaller measured push behind pad", readings: [{ pad: "A", values: [6] }, { pad: "B", values: [6] }, { pad: "C", values: [9] }] }),
    mcq("Read a tied result", "Look at this test table. Each pad gets the same push. Lower readings mean smaller pushes behind the pad. Which statement matches these readings?", ["B and C share the lowest reading", "B beats C in every test", "A has the lowest reading"], "a",
      "Look for equal lowest readings. A single test cannot tell us what always happens.", "B and C both read 7, so they tie for lowest in this test only.",
      { kind: "pad-test", note: "The same sensor measures the push behind each pad. These results apply to this test only.", controlled: "same test push and sensor", lowerIs: "smaller measured push behind pad", readings: [{ pad: "A", values: [10] }, { pad: "B", values: [7] }, { pad: "C", values: [7] }] })
  ]),
  task("lamp-gap", 3, "complete-circuit", "The diagnostic lamp lights; the fictional suit reports ready.", [
    mcq("Close the lamp loop", "Look at the diagram. One wire is already fitted. Which extra wire makes a complete loop from the battery, through the bulb, and back?", ["Y to -", "+ to -", "X to Y"], "a",
      "The path must go from one battery end, through the bulb, then back to the other battery end.", "Join Y to -. The loop is +, X, through the bulb to Y, then -. Joining + straight to - bypasses the bulb and is unsafe.",
      { kind: "circuit-gap", note: "The battery and bulb work. + and - mark battery ends; X and Y mark bulb contacts. Use diagrams only; do not try battery experiments alone.", nodes: ["+", "-", "X", "Y"], wires: [["+", "X"]], bulb: ["X", "Y"], options: { a: ["Y", "-"], b: ["+", "-"], c: ["X", "Y"] } }),
    mcq("Close the lamp loop", "Look at the diagram. One wire is already fitted. Which extra wire makes a complete loop from the battery, through the bulb, and back?", ["X to Y", "+ to X", "+ to -"], "b",
      "Find the bulb contact not yet connected to a battery end.", "Join + to X. Now the path goes from + through the bulb and back to -. A direct wire between battery ends bypasses the bulb and is unsafe.",
      { kind: "circuit-gap", note: "The battery and bulb work. + and - mark battery ends; X and Y mark bulb contacts. Use diagrams only; do not try battery experiments alone.", nodes: ["+", "-", "X", "Y"], wires: [["Y", "-"]], bulb: ["X", "Y"], options: { a: ["X", "Y"], b: ["+", "X"], c: ["+", "-"] } })
  ]),
  task("lamp-switch", 3, "switch-gap", "The diagnostic switch closes the lamp loop.", [
    mcq("Repair the switch gap", "Look at the diagram's open switch. Which change makes a complete loop from the battery, through the bulb, and back to the battery?", ["Remove the wire from + to X", "Close the gap from S to T", "Add a wire directly from + to -"], "b",
      "Follow the path and find its only gap.", "Closing S to T completes the loop through the bulb. Removing a wire opens another gap. Connecting battery ends directly bypasses the bulb and is unsafe.",
      { kind: "circuit-switch", note: "Everything works except the open switch. X and Y mark bulb contacts; S and T mark switch contacts. Use diagrams only; do not try battery experiments alone.", nodes: ["+", "-", "X", "Y", "S", "T"], wires: [["+", "X"], ["Y", "S"], ["T", "-"]], bulb: ["X", "Y"], gap: ["S", "T"] }),
    mcq("Repair the switch gap", "Look at the diagram's open switch. Which change makes a complete loop from the battery, through the bulb, and back to the battery?", ["Close the gap from S to T", "Remove the wire from Y to -", "Add a wire directly from + to -"], "a",
      "A switch can be on either side of the bulb. Find the break in this loop.", "Closing S to T connects the whole path through the bulb. It works on this side of the bulb too. Never connect battery ends directly.",
      { kind: "circuit-switch", note: "Everything works except the open switch. X and Y mark bulb contacts; S and T mark switch contacts. Use diagrams only; do not try battery experiments alone.", nodes: ["+", "-", "X", "Y", "S", "T"], wires: [["+", "S"], ["T", "X"], ["Y", "-"]], bulb: ["X", "Y"], gap: ["S", "T"] })
  ]),
  task("lamp-path", 3, "trace-circuit", "The checked diagnostic loop powers the suit's ready signal.", [
    mcq("Check the wiring card", "Look at the three wiring diagrams. Which card makes a complete loop through the bulb, without a wire joining the battery ends directly?", ["Card A: + to X, and Y to -", "Card B: + to X only", "Card C: + straight to - only"], "a",
      "Check that both bulb contacts connect to different battery ends.", "Card A makes the complete path + to X, through the bulb to Y, then to -. Card B has a gap; Card C bypasses the bulb and is unsafe.",
      { kind: "circuit-cards", note: "The battery and simple bulb work. The bulb's contacts X and Y connect through its inside. Use diagrams only; do not try battery experiments alone.", bulb: ["X", "Y"], cards: { a: [["+", "X"], ["Y", "-"]], b: [["+", "X"]], c: [["+", "-"]] } }),
    mcq("Check the wiring card", "Look at the three wiring diagrams. Which card makes a complete loop through the bulb, without a wire joining the battery ends directly?", ["Card A: - to X only", "Card B: + straight to - only", "Card C: - to X, and Y to +"], "c",
      "This simple bulb can connect either way round. It still needs a complete loop through it.", "Card C connects the two battery ends through the bulb. Reversing the connections of this simple bulb still gives a complete loop. Card A has a gap; Card B is an unsafe bypass.",
      { kind: "circuit-cards", note: "The battery and simple bulb work. The bulb's contacts X and Y connect through its inside. Use diagrams only; do not try battery experiments alone.", bulb: ["X", "Y"], cards: { a: [["-", "X"]], b: [["+", "-"]], c: [["-", "X"], ["Y", "+"]] } })
  ])
]);

export const QUESTION_BANK = freeze(TASKS.flatMap((entry) => entry.variants.map((variant, index) => ({
  ...variant, id: `${entry.id}-v${index + 1}`, taskId: entry.id, variant: index + 1,
  forge: entry.slot < 2 ? "maths" : "science", slot: entry.slot, skill: entry.skill, outcome: entry.outcome
}))));

export function selectQuestions(matchNumber) {
  if (!Number.isSafeInteger(matchNumber) || matchNumber < 1) throw new RangeError("Invalid match number");
  const taskIndex = (matchNumber - 1) % 3;
  const variant = Math.floor((matchNumber - 1) / 3) % 2 + 1;
  return [0, 1, 2, 3].map((slot) => structuredClone(QUESTION_BANK.find((q) =>
    q.taskId === TASKS.filter((t) => t.slot === slot)[taskIndex].id && q.variant === variant)));
}
