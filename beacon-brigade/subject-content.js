const review = {
  status: "reviewed",
  reviewer: "Codex educational content and ambiguity review",
  reviewedAt: "2026-09-05",
  humanCurriculumReview: "pending",
  source: "Original Beacon Brigade content; all evidence tables are authored datasets."
};

function subjectChoice(regionId, subject, id, skill, hint, wrongFeedback, instances) {
  return {
    id,
    version: 1,
    regionId,
    subject,
    skill,
    yearBand: id === "chemistry-dissolving-particles"
      ? "Age 8 supported introduction / Year 5 particle concept (provisional)"
      : "Age 8 / Year 3 with supported stretch (provisional)",
    prerequisites: ["Read a short evidence table", "Choose the best-supported answer"],
    parameterPolicy: "Only the two checked authored instances are used.",
    review,
    instances: instances.map((instance) => ({
      hint,
      wrongFeedback,
      ...instance,
      type: "choice",
      diagram: {
        kind: "table",
        source: "Authored mission evidence",
        simulation: false,
        ...instance.diagram
      }
    }))
  };
}

export const SUBJECT_QUESTION_TEMPLATES = deepFreeze([
  // English: Word Archive, Sentence Studio, Spelling Signal, Reading Room, Story Press.
  subjectChoice("english", "english", "english-context-meaning", "Use clues to work out a word's meaning",
    "Read what happens next. What does that tell you about the word's meaning?",
    "That meaning does not fit the clue in the sentence. Read what the team does next.", [
      {
        prompt: "The path was narrow, so the team walked one behind another. What does narrow mean?",
        options: [
          { id: "not-wide", label: "Not wide" },
          { id: "very-noisy", label: "Very noisy" },
          { id: "steep", label: "Steep and rocky" },
          { id: "bright", label: "Brightly lit" }
        ],
        answer: "not-wide",
        explanation: "A narrow path is not wide, so the team has room to walk only one behind another.",
        diagram: {
          label: "Word Archive clue",
          columns: ["Sentence clue", "What it tells us"],
          rows: [["One behind another", "Little room side by side"]],
          controls: "Use the meaning that fits this sentence.",
          limitation: "Here, narrow describes the path."
        }
      },
      {
        prompt: "The glass cup was fragile, so Noor carried it carefully. What does fragile mean?",
        options: [
          { id: "easily-broken", label: "Easily broken" },
          { id: "very-heavy", label: "Very heavy" },
          { id: "brightly-coloured", label: "Brightly coloured" },
          { id: "difficult-to-find", label: "Difficult to find" }
        ],
        answer: "easily-broken",
        explanation: "Fragile means easily broken. Noor carries the glass cup carefully to keep it safe.",
        diagram: {
          label: "Word Archive clue",
          columns: ["Sentence clue", "What it tells us"],
          rows: [["Noor carried it carefully", "The cup could be damaged"]],
          controls: "Use the meaning that explains Noor's careful action.",
          limitation: "Here, fragile describes the glass cup."
        }
      }
    ]),
  subjectChoice("english", "english", "english-complete-sentence", "Recognise a complete sentence",
    "Look for who or what the sentence is about, what happens, and an idea that feels finished.",
    "Read those words on their own. Do you still need more words to finish the idea?", [
      {
        prompt: "Which option is a complete sentence?",
        options: [
          { id: "bridge", label: "Under the old bridge" },
          { id: "lantern", label: "The lantern glowed brightly." },
          { id: "because", label: "Because it was dark" },
          { id: "running", label: "Running towards the gate" }
        ],
        answer: "lantern",
        explanation: "The lantern glowed brightly. This tells us what the lantern did and gives a complete idea.",
        diagram: {
          label: "Sentence Studio check",
          columns: ["Words", "Who or what?", "What happens or is true?"],
          rows: [["Under the old bridge", "Not given", "Not given"], ["The lantern glowed brightly.", "The lantern", "Glowed brightly"], ["Because it was dark", "It", "Was dark"], ["Running towards the gate", "Not given", "Running"]],
          controls: "Read each option without adding words.",
          limitation: "Because it was dark has a subject, it, but needs more words to finish the idea."
        }
      },
      {
        prompt: "Which option is a complete sentence?",
        options: [
          { id: "beacon", label: "The beacon flashed twice." },
          { id: "beside", label: "Beside the tall tower" },
          { id: "when", label: "When the bell rang" },
          { id: "carrying", label: "Carrying the silver key" }
        ],
        answer: "beacon",
        explanation: "The beacon flashed twice. This tells us what the beacon did and gives a complete idea.",
        diagram: {
          label: "Sentence Studio check",
          columns: ["Words", "Who or what?", "What happens or is true?"],
          rows: [["The beacon flashed twice.", "The beacon", "Flashed twice"], ["Beside the tall tower", "Not given", "Not given"], ["When the bell rang", "The bell", "Rang"], ["Carrying the silver key", "Not given", "Carrying"]],
          controls: "Read each option without adding words.",
          limitation: "When the bell rang tells us when, but needs more words to finish the idea."
        }
      }
    ]),
  subjectChoice("english", "english", "english-possessive-apostrophe", "Use apostrophes to show who owns something",
    "Count the owners first. One owner and several owners can need the apostrophe in different places.",
    "Check how many people own the things. Then look closely at the apostrophe.", [
      {
        prompt: "The toolkit belongs to one engineer. Which sentence is correct?",
        hint: "For one owner, add 's to the owner's word. For example: the pilot's hat.",
        options: [
          { id: "one-owner", label: "The engineer's toolkit is open." },
          { id: "many-owners", label: "The engineers' toolkit is open." },
          { id: "no-apostrophe", label: "The engineers toolkit is open." },
          { id: "toolkit-owner", label: "The engineer toolkits' is open." }
        ],
        answer: "one-owner",
        explanation: "There is one engineer. Add 's: the engineer's toolkit.",
        diagram: {
          label: "Spelling Signal ownership note",
          columns: ["Owners", "Object owned"],
          rows: [["One engineer", "One toolkit"]],
          controls: "Use the exact number of owners shown.",
          limitation: "Here, the apostrophe shows who owns the toolkit."
        }
      },
      {
        prompt: "The maps belong to several captains. Which sentence is correct?",
        hint: "For several owners whose word ends in s, put the apostrophe after that s. For example: the pilots' hats.",
        options: [
          { id: "plural-owner", label: "The captains' maps are ready." },
          { id: "single-owner", label: "The captain's maps are ready." },
          { id: "plain-plural", label: "The captains maps are ready." },
          { id: "map-owner", label: "The captains map's are ready." }
        ],
        answer: "plural-owner",
        explanation: "Several captains own the maps. Captains already ends in s, so add the apostrophe after it: captains' maps.",
        diagram: {
          label: "Spelling Signal ownership note",
          columns: ["Owners", "Objects owned"],
          rows: [["Several captains", "Several maps"]],
          controls: "Use the exact number of owners shown.",
          limitation: "This rule is for words for several owners that end in s."
        }
      }
    ]),
  subjectChoice("english", "english", "english-linking-ideas", "Choose a word to join two ideas",
    "Read both ideas. Does the second tell you why something happened, or what happened next?",
    "Read the sentence with your word in the gap. Check how the two ideas fit together.", [
      {
        prompt: "Rain was expected. Choose the word that tells us why: Mia took an umbrella ___ rain was expected.",
        hint: "The rain is the reason for taking the umbrella. Which word joins an action to its reason?",
        options: [
          { id: "because", label: "because" },
          { id: "but", label: "but" },
          { id: "or", label: "or" },
          { id: "until", label: "until" }
        ],
        answer: "because",
        explanation: "Because introduces the reason Mia carried an umbrella.",
        diagram: {
          label: "Reading Room idea link",
          columns: ["First idea", "Second idea", "Relationship"],
          rows: [["Mia took an umbrella", "Rain was expected", "Why she took it"]],
          controls: "Choose a word that explains why.",
          limitation: "The question asks for the clearest meaning in this sentence."
        }
      },
      {
        prompt: "The team closed the gate after hearing the bell. Choose the best word: The bell rang, ___ the team closed the gate.",
        hint: "Closing the gate is the result of hearing the bell. Which word joins an event to its result?",
        options: [
          { id: "so", label: "so" },
          { id: "because", label: "because" },
          { id: "although", label: "although" },
          { id: "unless", label: "unless" }
        ],
        answer: "so",
        explanation: "So introduces the result of the warning bell ringing.",
        diagram: {
          label: "Reading Room idea link",
          columns: ["First idea", "Second idea", "Relationship"],
          rows: [["The bell rang", "The team closed the gate", "What happened next"]],
          controls: "Choose a word that shows the result.",
          limitation: "The comma and joining word are part of one complete sentence."
        }
      }
    ]),
  subjectChoice("english", "english", "english-story-sequence", "Find what happens first in a story",
    "Read the Before this column. Find the event that needs none of the other events to happen first.",
    "Something in the table happens before that event. Look for the start of this story.", [
      {
        prompt: "In this story, which event happens first?",
        options: [
          { id: "discover", label: "The team discovers the broken lamp." },
          { id: "replace", label: "The team replaces the lamp." },
          { id: "shine", label: "The beacon shines again." },
          { id: "ships", label: "Ships see the light again." }
        ],
        answer: "discover",
        explanation: "In this story, the team finds the broken lamp first. Then they replace it, and ships can see the light again.",
        diagram: {
          label: "Story Press event clues",
          columns: ["Event", "Before this"],
          rows: [["Discover broken lamp", "Nothing else listed"], ["Replace lamp", "Broken lamp is discovered"], ["Beacon shines", "Lamp is replaced"], ["Ships see light", "Beacon shines"]],
          controls: "Use the events in this table.",
          limitation: "Another story could have a different order."
        }
      },
      {
        prompt: "In this story about a missing key, which event happens first?",
        options: [
          { id: "notice", label: "The team notices that the key is missing." },
          { id: "search", label: "The team searches the map room." },
          { id: "find", label: "The team finds the key." },
          { id: "unlock", label: "The team unlocks the storehouse." }
        ],
        answer: "notice",
        explanation: "In this story, the team notices the missing key first. Then they search, find it and unlock the storehouse.",
        diagram: {
          label: "Story Press event clues",
          columns: ["Event", "Before this"],
          rows: [["Notice missing key", "Nothing else listed"], ["Search map room", "Missing key is noticed"], ["Find key", "Search begins"], ["Unlock storehouse", "Key is found"]],
          controls: "Use the events in this table.",
          limitation: "Another story could have a different order."
        }
      }
    ]),

  // Physics: Force Track, Light Observatory, Sound Lab, Circuit Station, Energy Workshop.
  subjectChoice("physics", "physics", "physics-force-motion", "Think about pushes, pulls and movement",
    "A force is a push or a pull. Use the table to find which way each force acts.",
    "Look at what is being pulled and which way the pull acts.", [
      {
        prompt: "A builder lets go of a wooden block. Which force pulls it towards the ground?",
        hint: "The hand is no longer touching the block. Think about the pull from Earth.",
        wrongFeedback: "The block falls even without a hand or magnet pulling it. What pulls things towards Earth?",
        options: [
          { id: "gravity", label: "Gravity" },
          { id: "magnetism", label: "Magnetism" },
          { id: "friction", label: "Friction" },
          { id: "hand-push", label: "A push from the builder's hand" }
        ],
        answer: "gravity",
        explanation: "Gravity pulls the released block towards Earth even after the builder is no longer touching it.",
        diagram: {
          label: "Force Track release evidence",
          columns: ["What we check", "What we see"],
          rows: [["Object", "Wooden block"], ["Hand still touching it", "No"], ["Magnet nearby", "No"], ["Way it falls", "Towards the ground"]],
          controls: "Let go without a push. Nothing is under the block.",
          limitation: "Air can slow a fall. This question asks about the downward pull."
        }
      },
      {
        prompt: "A rope is held still and level. Two teams pull equally hard in opposite directions. What happens while these pulls stay equal?",
        hint: "Compare the left and right pulls. Is either pull stronger? The rope starts still.",
        wrongFeedback: "Neither side pulls harder. Think about whether the rope has a stronger pull in either direction.",
        options: [
          { id: "stays", label: "It stays in place." },
          { id: "left", label: "It moves left." },
          { id: "right", label: "It moves right." },
          { id: "up", label: "It moves upwards." }
        ],
        answer: "stays",
        explanation: "Neither side pulls harder. The sideways pulls balance, so this rope stays still while it is held level.",
        diagram: {
          label: "Force Track pull test",
          columns: ["Side", "Pull", "Direction"],
          rows: [["Left team", "Same strength", "Left"], ["Right team", "Same strength", "Right"]],
          controls: "Hold the rope level. Pull at the same time in one straight line.",
          limitation: "This model is about sideways pulls on a rope that starts still."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-reflection", "Use observations of reflected light",
    "Reflected light bounces back from a surface. Look for the clearest picture in the table.",
    "Compare the pictures seen in each surface. Which was clear, rather than wobbly or not seen?", [
      {
        prompt: "Which tested surface reflected the clearest image of the signal card?",
        options: [
          { id: "mirror", label: "Smooth mirror" },
          { id: "brick", label: "Rough brick" },
          { id: "cloth", label: "Crumpled cloth" },
          { id: "cardboard", label: "Unpainted cardboard" }
        ],
        answer: "mirror",
        explanation: "The smooth mirror bounces light back in a way that keeps the picture clear. Rough surfaces scatter light in different directions.",
        diagram: {
          label: "Light Observatory reflection test",
          columns: ["Surface", "Picture seen"],
          rows: [["Smooth mirror", "Clear"], ["Rough brick", "No clear picture"], ["Crumpled cloth", "No clear picture"], ["Unpainted cardboard", "No clear picture"]],
          controls: "Same signal card, light, distance and viewing position.",
          limitation: "The other surfaces reflect light too, but do not show a clear picture."
        }
      },
      {
        prompt: "Which tested water surface reflected the clearest image of the tower?",
        options: [
          { id: "still", label: "Still water" },
          { id: "small-ripples", label: "Water with small ripples" },
          { id: "large-waves", label: "Water with large waves" },
          { id: "foam", label: "Foamy water" }
        ],
        answer: "still",
        explanation: "The still water had the smoothest surface and produced the clearest reflected image in the test.",
        diagram: {
          label: "Light Observatory water test",
          columns: ["Water surface", "Tower picture"],
          rows: [["Still", "Clear"], ["Small ripples", "A little wobbly"], ["Large waves", "Very wobbly"], ["Foam", "No clear picture"]],
          controls: "Same tower model, light, container and viewing position.",
          limitation: "These results describe only the surfaces in this test."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-sound-vibration", "Connect vibrations with sound",
    "Look for the object that was moving back and forth when the sound was heard.",
    "Sound was linked to a vibration in this test. Find the part that moved back and forth.", [
      {
        prompt: "What was the tuning fork doing when the team heard its sound?",
        options: [
          { id: "vibrating", label: "Vibrating (moving quickly back and forth)" },
          { id: "glowing", label: "Glowing brightly" },
          { id: "melting", label: "Melting slowly" },
          { id: "becoming-magnetic", label: "Becoming magnetic" }
        ],
        answer: "vibrating",
        explanation: "The fork moves quickly back and forth. This makes the air vibrate too, carrying sound to our ears.",
        diagram: {
          label: "Sound Lab tuning-fork test",
          columns: ["What the fork does", "Sound heard"],
          rows: [["Still", "No"], ["Moving rapidly back and forth", "Yes"]],
          controls: "Same tuning fork, room and listening distance.",
          limitation: "The table does not show the tiny movements of the air."
        }
      },
      {
        prompt: "The team taps the drum skin. Which part starts vibrating to make the sound?",
        options: [
          { id: "skin", label: "The stretched drum skin" },
          { id: "stand", label: "The floor under the stand" },
          { id: "paint", label: "The painted symbol" },
          { id: "shadow", label: "The drum's shadow" }
        ],
        answer: "skin",
        explanation: "The drum skin moves back and forth after the tap. It makes the air vibrate, carrying sound to our ears.",
        diagram: {
          label: "Sound Lab drum test",
          columns: ["Part", "Movement after the tap"],
          rows: [["Stretched drum skin", "Back and forth"], ["Floor under stand", "None we can see"], ["Painted symbol", "Moves with the skin"], ["Shadow", "Not a part we can touch"]],
          controls: "Tap the same drum once in the middle.",
          limitation: "Other drum parts can vibrate too. Here the skin is tapped first."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-complete-circuit", "Identify a complete electrical circuit",
    "Look for a battery and a loop with no gaps. The loop must pass through the bulb and join both battery ends.",
    "Check for a battery, then trace the path through the bulb. Is there a gap?", [
      {
        prompt: "Which circuit plan will light the working bulb?",
        options: [
          { id: "closed", label: "A: battery and bulb joined in a loop" },
          { id: "beside", label: "B: bulb beside a battery, no wires" },
          { id: "one-terminal", label: "C: only one battery end wired to the bulb" },
          { id: "no-battery", label: "D: bulb and wires, no battery" }
        ],
        answer: "closed",
        explanation: "A has a battery and a loop with no gaps through the bulb. Electric current can flow around this loop and light the bulb.",
        diagram: {
          label: "Circuit Station plans",
          columns: ["Plan", "Battery?", "Loop through bulb?"],
          rows: [["A", "Yes", "Yes"], ["B", "Yes", "No wires"], ["C", "Yes", "No"], ["D", "No", "Yes"]],
          controls: "All parts work and the bulbs match the small batteries. Wires touch metal contacts where joined.",
          limitation: "This model uses a small battery. Never experiment with power points."
        }
      },
      {
        prompt: "Which setup will make the signal lamp light?",
        options: [
          { id: "switch-closed", label: "Switch closed: no gap" },
          { id: "switch-open", label: "Switch open: a gap" },
          { id: "switch-removed", label: "Switch removed: two gaps" },
          { id: "battery-removed", label: "Switch closed, but no battery" }
        ],
        answer: "switch-closed",
        explanation: "A closed switch joins the gap. With the battery in place, current can flow through the lamp and light it.",
        diagram: {
          label: "Circuit Station switch test",
          columns: ["Setup", "Battery?", "Path through lamp"],
          rows: [["Switch closed", "Yes", "Complete"], ["Switch open", "Yes", "Gap"], ["Switch removed", "Yes", "Two gaps"], ["Battery removed", "No", "Gap where battery was"]],
          controls: "Use matching, working parts. Only the change listed in each row is made.",
          limitation: "This model uses a small battery. Never experiment with power points."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-thermal-insulation", "Find what keeps water warm",
    "All cups start at the same temperature. Find the highest temperature in the last column.",
    "A higher temperature means warmer water. Compare the last column, not the wrap or lid names.", [
      {
        prompt: "Which tested wrap kept the warm water warmest after 10 minutes?",
        options: [
          { id: "felt", label: "Felt wrap" },
          { id: "paper", label: "Paper wrap" },
          { id: "foil", label: "Single foil wrap" },
          { id: "none", label: "No wrap" }
        ],
        answer: "felt",
        explanation: "The felt cup stayed warmest at 54 C. This wrap helped slow heat loss in this test. C means degrees Celsius, a temperature unit.",
        diagram: {
          label: "Energy Workshop insulation test",
          columns: ["Cup wrap", "Start", "After 10 minutes"],
          rows: [["Felt", "60 C", "54 C"], ["Paper", "60 C", "50 C"], ["Single foil", "60 C", "48 C"], ["None", "60 C", "45 C"]],
          controls: "Same cups, water amount, starting temperature and room. C means degrees Celsius.",
          limitation: "These wraps were tested for 10 minutes. An adult handles hot water."
        }
      },
      {
        prompt: "Which tested lid kept the warm water warmest after 15 minutes?",
        options: [
          { id: "foam", label: "Foam lid" },
          { id: "card", label: "Card lid" },
          { id: "metal", label: "Thin metal lid" },
          { id: "open", label: "No lid" }
        ],
        answer: "foam",
        explanation: "The foam-lid cup stayed warmest at 51 C. This lid helped slow heat loss in this test. It did not stop all cooling.",
        diagram: {
          label: "Energy Workshop lid test",
          columns: ["Cup lid", "Start", "After 15 minutes"],
          rows: [["Foam", "58 C", "51 C"], ["Card", "58 C", "48 C"], ["Thin metal", "58 C", "46 C"], ["None", "58 C", "42 C"]],
          controls: "Same cups, water amount, starting temperature and room. C means degrees Celsius.",
          limitation: "Heat can leave in several ways. An adult handles hot water."
        }
      }
    ]),

  // Chemistry: Matter Hall, Mixture Lab, Changes Chamber, Properties Bay, Particle Observatory.
  subjectChoice("chemistry", "chemistry", "chemistry-states-of-matter", "Use clues to name a state of matter",
    "Volume means the space something takes up. Check whether the sample keeps its shape or fills the whole container.",
    "Look at all the clues: shape, space taken up, and whether the sample fills the whole container.", [
      {
        prompt: "Sample A pours smoothly, with no grains. It changes shape but takes up the same space. What state is it?",
        hint: "Think about pouring water into a different-shaped cup. Does it fill every space, including the air above it?",
        options: [
          { id: "liquid", label: "Liquid" },
          { id: "solid", label: "Solid" },
          { id: "gas", label: "Gas" },
          { id: "light", label: "Light" }
        ],
        answer: "liquid",
        explanation: "A liquid takes the shape of the part of the container it fills. Its volume stays about the same when poured.",
        diagram: {
          label: "Matter Hall sample test",
          columns: ["Observation", "Sample A"],
          rows: [["Top after settling", "Smooth and level; no grains"], ["Space taken up after pouring", "Same"], ["Fills the whole container", "No; air above it"]],
          controls: "Pour the whole sample into another cup. Keep the temperature the same.",
          limitation: "Sand can pour too, but it is made of solid grains. This sample has no grains."
        }
      },
      {
        prompt: "Sample B spreads out to fill all the space inside a closed container. What state is it?",
        hint: "Think about air inside a bottle. Does it sit at the bottom like water, or spread through the space?",
        options: [
          { id: "gas", label: "Gas" },
          { id: "liquid", label: "Liquid" },
          { id: "solid", label: "Solid" },
          { id: "sound", label: "Sound" }
        ],
        answer: "gas",
        explanation: "A gas spreads out to fill the available space in its sealed container.",
        diagram: {
          label: "Matter Hall sample test",
          columns: ["Observation", "Sample B"],
          rows: [["Keeps its own shape", "No"], ["Has a top like water in a cup", "No"], ["Fills the whole container", "Yes"]],
          controls: "Keep the container closed and the temperature the same.",
          limitation: "The table describes the whole sample, not its tiny particles."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-separate-mixture", "Choose a tool to separate a mixture",
    "Look for a difference between the two materials. Which tool can use that difference to separate them?",
    "We need to remove one material from the other, not just change how the mixture looks.", [
      {
        prompt: "Tiny iron pieces are mixed with dry sand. Which tool can separate them?",
        hint: "The table shows which material the magnet pulls. Can it pull one material away and leave the other?",
        options: [
          { id: "magnet", label: "Move a magnet over the mixture" },
          { id: "more-sand", label: "Add more sand" },
          { id: "crush", label: "Crush the mixture" },
          { id: "stir", label: "Stir it with a wooden stick" }
        ],
        answer: "magnet",
        explanation: "The magnet pulls the tiny iron pieces out of this sand. It does not pull the sand used in this test.",
        diagram: {
          label: "Mixture Lab property check",
          columns: ["Material", "Magnet can pick it up", "Dry"],
          rows: [["Tiny iron pieces", "Yes", "Yes"], ["Sand", "No", "Yes"]],
          controls: "Same covered magnet and dry mixture. An adult handles tiny iron pieces.",
          limitation: "Some sand contains magnetic grains. This tested sand does not."
        }
      },
      {
        prompt: "Large stones are mixed with fine sand. Which tool can separate them?",
        hint: "A sieve is a tray with small holes. Which material fits through the holes, and which stays on top?",
        options: [
          { id: "sieve", label: "Shake the mixture through a sieve" },
          { id: "magnet", label: "Use a magnet" },
          { id: "dissolve", label: "Try to dissolve both in water" },
          { id: "paint", label: "Paint the stones" }
        ],
        answer: "sieve",
        explanation: "The sand falls through the sieve's small holes. The stones are too big, so they stay on top.",
        diagram: {
          label: "Mixture Lab size check",
          columns: ["Material", "Size compared with holes", "Falls through?"],
          rows: [["Stones", "Bigger", "No"], ["Sand grains", "Smaller", "Yes"]],
          controls: "Use the same sieve and keep the mixture dry.",
          limitation: "Wet sand can stick in lumps and may not fall through."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-observe-change", "Use clues about changes in materials",
    "Look at what changed in the material, not just its container.",
    "Use the results in the table to check what happened to the material.", [
      {
        prompt: "Which change can we undo by cooling the material?",
        hint: "Imagine putting melted ice in a freezer. Then think about whether cooling could undo the other changes.",
        wrongFeedback: "Cooling cannot turn ash back into paper, uncook an egg or remove rust. Look for a change of state.",
        options: [
          { id: "melting-ice", label: "Ice melting into liquid water" },
          { id: "burning-paper", label: "Paper burning into ash and gases" },
          { id: "frying-egg", label: "An egg cooking in a pan" },
          { id: "rusting", label: "Iron slowly forming rust" }
        ],
        answer: "melting-ice",
        explanation: "Cooling liquid water below its freezing point can turn it back into solid ice.",
        diagram: {
          label: "Changes Chamber log",
          columns: ["Change", "Cooling turns it back?"],
          rows: [["Melting ice", "Yes, as ice"], ["Burning paper", "No"], ["Cooking egg", "No"], ["Rusting iron", "No"]],
          controls: "Check whether cooling alone undoes the change.",
          limitation: "Some changes are hard to undo. Adults handle heat and flames."
        }
      },
      {
        prompt: "Two liquids are mixed without heating or shaking. Which clue suggests a chemical reaction may be making gas?",
        hint: "A chemical reaction can make a new material. Look for gas forming inside the liquid, not a change to the cup.",
        wrongFeedback: "Changing a cup or its label does not show a reaction. Look for a change inside the mixture.",
        options: [
          { id: "new-bubbles", label: "Bubbles keep forming in the liquid" },
          { id: "taller-cup", label: "The mixture is poured into a taller cup" },
          { id: "new-shape", label: "The cup has a different shape" },
          { id: "label", label: "A new label is placed on the cup" }
        ],
        answer: "new-bubbles",
        explanation: "The new bubbles contain gas. A reaction may be making that gas, but we need more tests to be sure.",
        diagram: {
          label: "Changes Chamber reaction check",
          columns: ["Condition", "Observation"],
          rows: [["Before mixing", "No bubbles"], ["After mixing", "Bubbles keep forming"], ["Temperature", "Room temperature; not boiling"]],
          controls: "Clean cup, no shaking, no heating. This is a made-up test, not a mixing activity.",
          limitation: "Bubbles alone are not proof. Gas already dissolved in a liquid can escape too."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-material-properties", "Choose a material that does both jobs",
    "Check both needs in the same row. One matching result is not enough.",
    "That sample misses one of the needs. Look across its whole row and check both results.", [
      {
        prompt: "A cover must bend around a box and keep water out. Which sample does both?",
        options: [
          { id: "film", label: "Sample A: flexible film" },
          { id: "card", label: "Sample B: card" },
          { id: "tile", label: "Sample C: tile" },
          { id: "cloth", label: "Sample D: cloth with small gaps" }
        ],
        answer: "film",
        explanation: "Sample A bends around the box and lets no water through, so it meets both requirements.",
        diagram: {
          label: "Properties Bay cover tests",
          columns: ["Sample", "Bends around box?", "Water gets through?"],
          rows: [["A: flexible film", "Yes", "No"], ["B: card", "Yes", "Yes"], ["C: tile", "No", "No"], ["D: cloth with gaps", "Yes", "Yes"]],
          controls: "Same sample size, water amount, box and one-minute test.",
          limitation: "Other samples or longer tests may give different results."
        }
      },
      {
        prompt: "A window must let light through and keep water out. Which sample does both?",
        options: [
          { id: "clear-plastic", label: "Sample E: clear plastic" },
          { id: "paper", label: "Sample F: thin paper" },
          { id: "metal", label: "Sample G: metal sheet" },
          { id: "mesh", label: "Sample H: plastic mesh" }
        ],
        answer: "clear-plastic",
        explanation: "Sample E lets light through and lets no water through, so it meets both window-panel needs.",
        diagram: {
          label: "Properties Bay panel tests",
          columns: ["Sample", "Light gets through?", "Water gets through?"],
          rows: [["E: clear plastic", "Yes", "No"], ["F: thin paper", "Some", "Yes"], ["G: metal sheet", "No", "No"], ["H: plastic mesh", "Yes", "Yes"]],
          controls: "Same sample size, light, water amount and one-minute test.",
          limitation: "This test does not tell us how strong a window would be."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-dissolving-particles", "Use clues to explain dissolving",
    "Look at what is left when the water dries up. Could the material still be in the water, even if you cannot see it?",
    "Look at the last row. The crystals come back when the water dries up, so the material has not vanished.", [
      {
        prompt: "Sugar is stirred into water. Tiny particles can be too small to see. Use the table: what happened to the sugar?",
        options: [
          { id: "dissolved", label: "It dissolved and spread through the water." },
          { id: "stopped-existing", label: "It stopped existing." },
          { id: "oxygen", label: "It changed into oxygen." },
          { id: "left-cup", label: "It passed through the solid cup." }
        ],
        answer: "dissolved",
        explanation: "When sugar dissolves, its tiny particles spread through the water. They are too small to see. The sugar is still there and forms crystals when the water dries up.",
        diagram: {
          label: "Particle Observatory sugar evidence",
          columns: ["Check", "Observation"],
          rows: [["Before stirring", "Sugar crystals can be seen"], ["After stirring with the lid on", "No crystals seen; same total mass"], ["Lid off; water dries up", "Sugar crystals remain"]],
          controls: "No spills. Compare the whole cup's mass with the lid on. Then remove the lid to let water dry up.",
          limitation: "This made-up test does not show tiny particles. Never taste lab mixtures."
        }
      },
      {
        prompt: "We stir salt into water and cannot see it. Tiny particles can be too small to see. Use the table: what happened?",
        options: [
          { id: "spread", label: "Salt particles spread through the water." },
          { id: "destroyed", label: "The water destroyed the salt." },
          { id: "sand", label: "The salt changed into sand." },
          { id: "escaped", label: "All the salt escaped into the air." }
        ],
        answer: "spread",
        explanation: "The salt dissolved. Its tiny particles are too small to see and spread through the water. Salt crystals remain when the water dries up.",
        diagram: {
          label: "Particle Observatory salt evidence",
          columns: ["Check", "Observation"],
          rows: [["Before stirring", "Salt crystals can be seen"], ["After stirring with the lid on", "No crystals seen; same total mass"], ["Lid off; water dries up", "Salt crystals remain"]],
          controls: "No spills. Compare the whole cup's mass with the lid on. Then remove the lid to let water dry up.",
          limitation: "This made-up test does not show tiny particles. Never taste lab mixtures."
        }
      }
    ]),

  // Grove: Seed Lab, Habitat Dome, Life-Cycle Nursery, Food-Web Field, Adaptation Clinic.
  subjectChoice("grove", "life-sciences", "grove-plant-parts", "Match plant parts to their jobs",
    "Find the job in the question. Look for a plant part that does that job in the table.",
    "That part has a different job here. Check what each part takes in or makes.", [
      {
        prompt: "Which part of this plant uses sunlight to make food called sugars?",
        options: [
          { id: "leaves", label: "Leaves" },
          { id: "roots", label: "Roots" },
          { id: "flower", label: "Flower petals" },
          { id: "seed-coat", label: "Seed coat" }
        ],
        answer: "leaves",
        explanation: "Green leaves use light energy, water and carbon dioxide from the air to make sugars. This is called photosynthesis.",
        diagram: {
          label: "Seed Lab plant-part observations",
          columns: ["Plant part", "Main job here"],
          rows: [["Leaves", "Use light to make sugars"], ["Roots", "Take in water and minerals"], ["Flower petals", "Attract insects that carry pollen"], ["Seed coat", "Protect the seed"]],
          controls: "Use the jobs listed for this flowering plant.",
          limitation: "Other green parts, such as some stems, can make sugars too."
        }
      },
      {
        prompt: "Which plant part takes in most of the water needed by this seedling?",
        options: [
          { id: "roots", label: "Roots" },
          { id: "leaves", label: "Leaves" },
          { id: "petals", label: "Petals" },
          { id: "fruit", label: "Fruit" }
        ],
        answer: "roots",
        explanation: "The seedling's roots absorb most of its water from the soil.",
        diagram: {
          label: "Seed Lab seedling observations",
          columns: ["Plant part", "Where it is or what it does"],
          rows: [["Roots", "In moist soil; take in water"], ["Leaves", "In light; make sugars"], ["Petals", "Not present on this seedling"], ["Fruit", "Not present on this seedling"]],
          controls: "This young plant is healthy and growing in damp soil.",
          limitation: "Some plants take in water through other parts too."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-habitat-needs", "Find a place with everything an animal needs",
    "A habitat is a place to live. Check that it gives this animal everything listed in the table.",
    "That place is missing something this animal needs. Check every row, not just food or water.", [
      {
        prompt: "This pond frog needs the things in the table. Which place has them all?",
        options: [
          { id: "pond-edge", label: "A shaded pond edge with insects and plants" },
          { id: "dry-rock", label: "A dry bare rock with no nearby water" },
          { id: "sealed-box", label: "A sealed empty box" },
          { id: "salt-flat", label: "An open salt flat with no shelter" }
        ],
        answer: "pond-edge",
        explanation: "The pond edge has fresh water, insects to eat and plants for shelter. It is damp and shaded too.",
        diagram: {
          label: "Habitat Dome frog needs",
          columns: ["Need", "What this frog needs"],
          rows: [["Water", "Fresh pond water"], ["Food", "Small insects"], ["Shelter", "Pond plants and shade"], ["Place", "Damp areas"]],
          controls: "Compare each option with all four needs of this frog.",
          limitation: "Other kinds of frogs may need different places to live."
        }
      },
      {
        prompt: "This small bird needs the things in the table. Which place has them all?",
        options: [
          { id: "woodland", label: "Woodland with shrubs, seeds, insects and water" },
          { id: "empty-yard", label: "A paved yard with no plants or water" },
          { id: "deep-ocean", label: "Deep ocean far from land" },
          { id: "sealed-room", label: "A sealed room with no food" }
        ],
        answer: "woodland",
        explanation: "The woodland provides food, water, nesting places and cover from danger.",
        diagram: {
          label: "Habitat Dome bird needs",
          columns: ["Need", "What this bird needs"],
          rows: [["Water", "Fresh water nearby"], ["Food", "Seeds and insects"], ["Shelter", "Shrubs and trees"], ["Nesting", "Branches and plant material"]],
          controls: "Compare each option with all four needs of this woodland bird.",
          limitation: "Other kinds of birds may have different needs."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-life-cycle", "Find the next stage in an animal's life",
    "Find Egg in the table. Read the next row to see what hatches from it.",
    "That is not the next stage for this animal. Start at Egg and move down one row.", [
      {
        prompt: "Which stage comes directly after a butterfly egg hatches?",
        options: [
          { id: "larva", label: "Larva (caterpillar)" },
          { id: "adult", label: "Adult butterfly" },
          { id: "pupa", label: "Pupa" },
          { id: "seedling", label: "Seedling" }
        ],
        answer: "larva",
        explanation: "A caterpillar hatches from the egg. It later becomes a pupa, then an adult butterfly. Larva is another name for the caterpillar stage.",
        diagram: {
          label: "Life-Cycle Nursery butterfly record",
          columns: ["Stage number", "Stage"],
          rows: [["1", "Egg"], ["2", "Larva (caterpillar)"], ["3", "Pupa (chrysalis)"], ["4", "Adult butterfly"]],
          controls: "Use the stage order shown for a butterfly.",
          limitation: "Different butterflies spend different amounts of time at each stage."
        }
      },
      {
        prompt: "In this frog's life cycle, what hatches from the egg?",
        options: [
          { id: "tadpole", label: "Tadpole" },
          { id: "adult", label: "Adult frog" },
          { id: "froglet", label: "Froglet" },
          { id: "caterpillar", label: "Caterpillar" }
        ],
        answer: "tadpole",
        explanation: "This frog's egg hatches into a tadpole. The tadpole later grows legs and becomes a froglet, a young frog.",
        diagram: {
          label: "Life-Cycle Nursery frog record",
          columns: ["Stage number", "Stage"],
          rows: [["1", "Egg"], ["2", "Tadpole"], ["3", "Tadpole with legs"], ["4", "Froglet"], ["5", "Adult frog"]],
          controls: "Use the stage order shown for this frog life cycle.",
          limitation: "Some frogs skip a free-swimming tadpole stage. Use this frog's record."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-food-chain", "Find what makes its own food in a food chain",
    "In these chains, the producer uses sunlight to make its own food. The animals get food by eating other living things.",
    "That animal eats another living thing. Look for the living thing that makes its own food using light.", [
      {
        prompt: "Which living thing in this food chain makes its own food using sunlight? We call it a producer.",
        options: [
          { id: "grass", label: "Grass" },
          { id: "grasshopper", label: "Grasshopper" },
          { id: "frog", label: "Frog" },
          { id: "snake", label: "Snake" }
        ],
        answer: "grass",
        explanation: "Grass uses sunlight, water and carbon dioxide from the air to make sugars. It is the producer in this chain.",
        diagram: {
          label: "Food-Web Field energy path",
          columns: ["From", "To", "Meaning"],
          rows: [["Grass", "Grasshopper", "Grasshopper eats grass"], ["Grasshopper", "Frog", "Frog eats grasshopper"], ["Frog", "Snake", "Snake eats frog"]],
          controls: "From is the food. To is the animal that eats it.",
          limitation: "This is one food chain. These animals can have other foods too."
        }
      },
      {
        prompt: "Which living thing in this pond food chain makes its own food using sunlight? We call it a producer.",
        hint: "Algae are living things in the water that can use sunlight. Which choice does not need to eat another living thing?",
        options: [
          { id: "algae", label: "Algae" },
          { id: "snail", label: "Snail" },
          { id: "fish", label: "Fish" },
          { id: "heron", label: "Heron" }
        ],
        answer: "algae",
        explanation: "These algae use sunlight, water and carbon dioxide to make sugars. They are producers in this pond food chain.",
        diagram: {
          label: "Food-Web Field pond path",
          columns: ["From", "To", "Meaning"],
          rows: [["Algae", "Snail", "Snail eats algae"], ["Snail", "Fish", "Fish eats snail"], ["Fish", "Heron", "Heron eats fish"]],
          controls: "From is the food. To is the animal that eats it.",
          limitation: "This is one pond food chain. These animals can have other foods too."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-adaptation-function", "Find how a body part helps an animal",
    "Think about the body part in the question. How could it help the animal where it lives?",
    "Look at what this body part does in the table. Does that match the job you chose?", [
      {
        prompt: "How do a duck's webbed feet help it in water?",
        options: [
          { id: "paddle", label: "They push against water while swimming." },
          { id: "breathe", label: "They let the duck breathe underwater." },
          { id: "dry-feathers", label: "They keep every feather dry." },
          { id: "chew", label: "They help the duck chew food." }
        ],
        answer: "paddle",
        explanation: "The skin between the toes creates a broad surface that pushes against water like a paddle.",
        diagram: {
          label: "Adaptation Clinic duck observations",
          columns: ["Body part", "What happens"],
          rows: [["Toes spread out", "Skin makes a wide paddle"], ["Foot pushes back", "Water moves backwards"], ["Duck's body", "Moves forwards"]],
          controls: "Watch the same duck swimming in calm water.",
          limitation: "Feet have other jobs too. Here we are looking at swimming."
        }
      },
      {
        prompt: "How does thick fur help a polar bear stay warm in a cold place?",
        hint: "A smaller temperature drop means less cooling. Compare the thick covering with no covering.",
        options: [
          { id: "slow-heat-loss", label: "It slows heat loss from the body." },
          { id: "make-food", label: "It makes food from sunlight." },
          { id: "breathe-water", label: "It allows the bear to breathe underwater." },
          { id: "hear-distance", label: "It makes distant sounds louder." }
        ],
        answer: "slow-heat-loss",
        explanation: "Thick fur traps air and slows heat leaving the bear's warm body. The fur does not make heat itself.",
        diagram: {
          label: "Adaptation Clinic insulation evidence",
          columns: ["Model covering", "Cooling after 10 minutes"],
          rows: [["Thick fur-like covering", "3 C"], ["Thin covering", "8 C"], ["No covering", "12 C"]],
          controls: "Same warm model, starting temperature, room and time. C means degrees Celsius.",
          limitation: "This is a model, not a test on a bear. Body fat also helps polar bears stay warm."
        }
      }
    ])
]);

function deepFreeze(value) {
  for (const child of Object.values(value)) {
    if (child && typeof child === "object") deepFreeze(child);
  }
  return Object.freeze(value);
}
