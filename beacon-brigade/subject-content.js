const review = {
  status: "reviewed",
  reviewer: "Codex educational content and ambiguity review",
  reviewedAt: "2026-09-01",
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
    yearBand: "Year 3 core / Year 4 stretch (provisional)",
    prerequisites: ["Read a short evidence table", "Choose the best-supported answer"],
    parameterPolicy: "Only the two checked authored instances are used.",
    review,
    instances: instances.map((instance) => ({
      ...instance,
      hint,
      wrongFeedback,
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
  subjectChoice("english", "english", "english-context-meaning", "Use context to infer word meaning",
    "Read the whole sentence and look for words that explain the bold word.",
    "That meaning does not fit the clue in the sentence. Read what the team does next.", [
      {
        prompt: "The path was narrow, so the team walked in single file. What does narrow mean?",
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
          rows: [["The team walked in single file", "There was little room side by side"]],
          controls: "Use the meaning that fits this sentence.",
          limitation: "The word narrow can describe other things, but this question is about the path."
        }
      },
      {
        prompt: "The glass lens was fragile, so Noor carried it with both hands. What does fragile mean?",
        options: [
          { id: "easily-broken", label: "Easily broken" },
          { id: "very-heavy", label: "Very heavy" },
          { id: "brightly-coloured", label: "Brightly coloured" },
          { id: "difficult-to-find", label: "Difficult to find" }
        ],
        answer: "easily-broken",
        explanation: "Fragile means easily broken, which explains why Noor carries the lens carefully.",
        diagram: {
          label: "Word Archive clue",
          columns: ["Sentence clue", "What it tells us"],
          rows: [["Noor carried it with both hands", "The lens needed careful handling"]],
          controls: "Use the meaning that explains Noor's careful action.",
          limitation: "The table gives a context clue, not a full dictionary definition."
        }
      }
    ]),
  subjectChoice("english", "english", "english-complete-sentence", "Recognise a complete sentence",
    "Find the option with a subject, a verb and a complete idea.",
    "That group of words does not express a complete idea by itself. Check who or what acts and what happens.", [
      {
        prompt: "Which option is a complete sentence?",
        options: [
          { id: "bridge", label: "Under the old bridge" },
          { id: "lantern", label: "The lantern glowed brightly." },
          { id: "because", label: "Because it was dark" },
          { id: "running", label: "Running towards the gate" }
        ],
        answer: "lantern",
        explanation: "The lantern glowed brightly names the subject, tells what it did and expresses a complete idea.",
        diagram: {
          label: "Sentence Studio check",
          columns: ["Option", "Has a named subject", "Expresses a complete idea by itself"],
          rows: [["Under the old bridge", "No", "No"], ["The lantern glowed brightly.", "Yes", "Yes"], ["Because it was dark", "No", "No"], ["Running towards the gate", "No", "No"]],
          controls: "Judge each option as written, without adding missing words.",
          limitation: "These checks cover the sentence patterns shown here."
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
        explanation: "The beacon flashed twice names the subject, gives its action and completes the idea.",
        diagram: {
          label: "Sentence Studio check",
          columns: ["Option", "Has a named subject", "Expresses a complete idea by itself"],
          rows: [["The beacon flashed twice.", "Yes", "Yes"], ["Beside the tall tower", "No", "No"], ["When the bell rang", "Yes", "No"], ["Carrying the silver key", "No", "No"]],
          controls: "Judge each option as written, without adding missing words.",
          limitation: "When the bell rang has a subject and verb but leaves the main idea unfinished."
        }
      }
    ]),
  subjectChoice("english", "english", "english-possessive-apostrophe", "Use apostrophes to show ownership",
    "First decide whether one person or several people own the object, then place the apostrophe.",
    "Check the number of owners in the mission note. One engineer and several engineers need different apostrophe positions.", [
      {
        prompt: "The toolkit belongs to one engineer. Which sentence is correct?",
        options: [
          { id: "one-owner", label: "The engineer's toolkit is open." },
          { id: "many-owners", label: "The engineers' toolkit is open." },
          { id: "no-apostrophe", label: "The engineers toolkit is open." },
          { id: "toolkit-owner", label: "The engineer toolkits' is open." }
        ],
        answer: "one-owner",
        explanation: "Engineer is singular, so engineer's shows that the toolkit belongs to one engineer.",
        diagram: {
          label: "Spelling Signal ownership note",
          columns: ["Owners", "Object owned"],
          rows: [["One engineer", "One toolkit"]],
          controls: "Use the exact number of owners shown.",
          limitation: "The sentence is testing possession, not a shortened word such as it's."
        }
      },
      {
        prompt: "The maps belong to several captains. Which sentence is correct?",
        options: [
          { id: "plural-owner", label: "The captains' maps are ready." },
          { id: "single-owner", label: "The captain's maps are ready." },
          { id: "plain-plural", label: "The captains maps are ready." },
          { id: "map-owner", label: "The captains map's are ready." }
        ],
        answer: "plural-owner",
        explanation: "Captains is a plural ending in s, so the apostrophe goes after the s to show ownership.",
        diagram: {
          label: "Spelling Signal ownership note",
          columns: ["Owners", "Objects owned"],
          rows: [["Several captains", "Several maps"]],
          controls: "Use the exact number of owners shown.",
          limitation: "This rule applies to regular plurals that already end in s."
        }
      }
    ]),
  subjectChoice("english", "english", "english-linking-ideas", "Choose a conjunction that matches the meaning",
    "Decide whether the second idea gives a reason, a result, a contrast or a choice.",
    "That joining word shows the wrong relationship. Compare the two ideas in the evidence table.", [
      {
        prompt: "Choose the best word: Mia carried an umbrella ___ rain was forecast.",
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
          rows: [["Mia carried an umbrella", "Rain was forecast", "Reason"]],
          controls: "Choose the word that preserves the stated relationship.",
          limitation: "The question asks for the clearest meaning in this sentence."
        }
      },
      {
        prompt: "Choose the best word: The warning bell rang, ___ the team closed the gate.",
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
          rows: [["The warning bell rang", "The team closed the gate", "Result"]],
          controls: "Choose the word that preserves the stated relationship.",
          limitation: "The comma and joining word are part of one complete sentence."
        }
      }
    ]),
  subjectChoice("english", "english", "english-story-sequence", "Order causes and results in a story",
    "Find the problem or starting action that must happen before the other events.",
    "That event depends on something else happening first. Trace the cause-and-result chain.", [
      {
        prompt: "Which event must happen first in this beacon-repair sequence?",
        options: [
          { id: "discover", label: "The team discovers the broken lamp." },
          { id: "replace", label: "The team replaces the lamp." },
          { id: "shine", label: "The beacon shines again." },
          { id: "ships", label: "Ships see the restored light." }
        ],
        answer: "discover",
        explanation: "The team must discover the broken lamp before replacing it, restoring the beacon and helping the ships.",
        diagram: {
          label: "Story Press event clues",
          columns: ["Event", "Depends on"],
          rows: [["Discover broken lamp", "Nothing else listed"], ["Replace lamp", "Broken lamp is discovered"], ["Beacon shines", "Lamp is replaced"], ["Ships see light", "Beacon shines"]],
          controls: "Use only the cause-and-result links shown.",
          limitation: "This is one planned story sequence, not every possible repair story."
        }
      },
      {
        prompt: "Which event must happen first in this locked-storehouse sequence?",
        options: [
          { id: "notice", label: "The team notices that the key is missing." },
          { id: "search", label: "The team searches the map room." },
          { id: "find", label: "The team finds the key." },
          { id: "unlock", label: "The team unlocks the storehouse." }
        ],
        answer: "notice",
        explanation: "The team must notice the missing key before searching for it, finding it and unlocking the storehouse.",
        diagram: {
          label: "Story Press event clues",
          columns: ["Event", "Depends on"],
          rows: [["Notice missing key", "Nothing else listed"], ["Search map room", "Missing key is noticed"], ["Find key", "Search begins"], ["Unlock storehouse", "Key is found"]],
          controls: "Use only the cause-and-result links shown.",
          limitation: "This is one planned story sequence, not every possible search story."
        }
      }
    ]),

  // Physics: Force Track, Light Observatory, Sound Lab, Circuit Station, Energy Workshop.
  subjectChoice("physics", "physics", "physics-force-motion", "Use force direction to predict motion",
    "Look at the direction and size of each force, and check whether the object starts at rest.",
    "Recheck the force directions. Equal opposite forces on an object at rest are balanced; gravity pulls towards Earth.", [
      {
        prompt: "A builder releases a wooden block. Which force pulls it towards the ground?",
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
          columns: ["Observation", "Mission detail"],
          rows: [["Object", "Wooden block"], ["Builder touching it after release", "No"], ["Nearby magnet", "No"], ["Direction of fall", "Towards the ground"]],
          controls: "The block is released from rest and is not touching another surface.",
          limitation: "Air resistance is not measured; the question asks which force pulls downwards."
        }
      },
      {
        prompt: "Two teams pull a rope equally hard in opposite directions. The rope starts at rest. What happens?",
        options: [
          { id: "stays", label: "It stays in place." },
          { id: "left", label: "It moves left." },
          { id: "right", label: "It moves right." },
          { id: "up", label: "It moves upwards." }
        ],
        answer: "stays",
        explanation: "The equal forces act in opposite directions, so they are balanced and the rope remains at rest.",
        diagram: {
          label: "Force Track pull test",
          columns: ["Side", "Pull", "Direction"],
          rows: [["Left team", "20 N", "Left"], ["Right team", "20 N", "Right"]],
          controls: "The rope starts at rest; both pulls act at the same time along one straight line.",
          limitation: "The table treats the rope and teams as one simple force model."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-reflection", "Use observations of reflected light",
    "Choose the surface that produced the clearest image in the displayed test.",
    "That surface did not produce the clearest image in this test. Compare the observation words in the table.", [
      {
        prompt: "Which tested surface reflected the clearest image of the signal card?",
        options: [
          { id: "mirror", label: "Smooth mirror" },
          { id: "brick", label: "Rough brick" },
          { id: "cloth", label: "Crumpled cloth" },
          { id: "cardboard", label: "Unpainted cardboard" }
        ],
        answer: "mirror",
        explanation: "The smooth mirror reflected a clear image because its even surface reflected the light in an organised way.",
        diagram: {
          label: "Light Observatory reflection test",
          columns: ["Surface", "Observed image"],
          rows: [["Smooth mirror", "Clear"], ["Rough brick", "No recognisable image"], ["Crumpled cloth", "No recognisable image"], ["Unpainted cardboard", "No recognisable image"]],
          controls: "Same signal card, light, distance and viewing position.",
          limitation: "The result describes image clarity, not how much total light each surface reflects."
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
          columns: ["Water surface", "Observed tower image"],
          rows: [["Still", "Clear"], ["Small ripples", "Slightly distorted"], ["Large waves", "Very distorted"], ["Foam", "Not recognisable"]],
          controls: "Same tower model, light, container and viewing position.",
          limitation: "The observations apply to these tested surface conditions."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-sound-vibration", "Connect vibrations with sound",
    "Look for the object that was moving back and forth when the sound was heard.",
    "Sound was linked to a vibration in this test. Find the part that moved back and forth.", [
      {
        prompt: "What was the tuning fork doing when the team heard its sound?",
        options: [
          { id: "vibrating", label: "Vibrating rapidly" },
          { id: "glowing", label: "Glowing brightly" },
          { id: "melting", label: "Melting slowly" },
          { id: "becoming-magnetic", label: "Becoming magnetic" }
        ],
        answer: "vibrating",
        explanation: "The tuning fork's rapid vibrations made the surrounding air vibrate, allowing the sound to travel.",
        diagram: {
          label: "Sound Lab tuning-fork test",
          columns: ["Tuning-fork state", "Sound heard"],
          rows: [["Still", "No"], ["Moving rapidly back and forth", "Yes"]],
          controls: "Same tuning fork, room and listening distance.",
          limitation: "The table records visible motion and sound; it does not show every air vibration."
        }
      },
      {
        prompt: "Which part of a drum vibrates to begin producing its sound when struck?",
        options: [
          { id: "skin", label: "The stretched drum skin" },
          { id: "stand", label: "The floor under the stand" },
          { id: "paint", label: "The painted symbol" },
          { id: "shadow", label: "The drum's shadow" }
        ],
        answer: "skin",
        explanation: "The stretched drum skin moves back and forth after it is struck, beginning the sound vibrations.",
        diagram: {
          label: "Sound Lab drum test",
          columns: ["Part observed", "Moved back and forth after strike"],
          rows: [["Stretched drum skin", "Yes"], ["Floor under stand", "No visible movement"], ["Painted symbol", "Moves only with the skin"], ["Shadow", "Not a material part"]],
          controls: "The same drum is struck once in the centre with the same beater.",
          limitation: "Other drum parts can also vibrate, but the question asks which part begins the tested sound."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-complete-circuit", "Identify a complete electrical circuit",
    "A working circuit needs an energy source and an unbroken conducting loop through the bulb.",
    "That plan is missing either the battery or a complete path. Trace the loop from one battery terminal to the other.", [
      {
        prompt: "Which circuit plan will light the working bulb?",
        options: [
          { id: "closed", label: "Plan A: battery, wires and bulb in an unbroken loop" },
          { id: "beside", label: "Plan B: bulb placed beside a battery" },
          { id: "one-terminal", label: "Plan C: one wire from one battery terminal to the bulb" },
          { id: "no-battery", label: "Plan D: bulb and wires in a loop with no battery" }
        ],
        answer: "closed",
        explanation: "Plan A has a battery and a complete conducting path through the bulb, so current can flow.",
        diagram: {
          label: "Circuit Station plans",
          columns: ["Plan", "Battery present", "Unbroken loop through bulb"],
          rows: [["A", "Yes", "Yes"], ["B", "Yes", "No wires"], ["C", "Yes", "No"], ["D", "No", "Yes"]],
          controls: "All bulbs, batteries and wires are working; connections touch conducting metal parts.",
          limitation: "This is a simple low-voltage circuit model, not instructions for mains electricity."
        }
      },
      {
        prompt: "Which switch position will make the working signal lamp light?",
        options: [
          { id: "switch-closed", label: "Closed, completing the loop" },
          { id: "switch-open", label: "Open, leaving a gap" },
          { id: "switch-removed", label: "Removed, leaving two gaps" },
          { id: "battery-removed", label: "Closed after the battery is removed" }
        ],
        answer: "switch-closed",
        explanation: "Closing the switch completes the conducting loop, allowing current to flow through the lamp.",
        diagram: {
          label: "Circuit Station switch test",
          columns: ["Setup", "Battery present", "Path through lamp"],
          rows: [["Switch closed", "Yes", "Complete"], ["Switch open", "Yes", "Gap"], ["Switch removed", "Yes", "Two gaps"], ["Battery removed", "No", "Incomplete energy source"]],
          controls: "The same working lamp, battery and wires are used in every setup.",
          limitation: "The table models only open and closed states in a simple circuit."
        }
      }
    ]),
  subjectChoice("physics", "physics", "physics-thermal-insulation", "Compare thermal energy transfer",
    "The container with the smallest temperature drop slowed thermal energy transfer the most.",
    "Compare the starting and final temperatures, not just the material name. A smaller drop means less energy left the water.", [
      {
        prompt: "Which tested wrap kept the warm water warmest after 10 minutes?",
        options: [
          { id: "felt", label: "Felt wrap" },
          { id: "paper", label: "Paper wrap" },
          { id: "foil", label: "Single foil wrap" },
          { id: "none", label: "No wrap" }
        ],
        answer: "felt",
        explanation: "The felt-wrapped cup finished at 54 degrees C, the highest temperature, so it slowed thermal energy transfer the most in this test.",
        diagram: {
          label: "Energy Workshop insulation test",
          columns: ["Cup wrap", "Start", "After 10 minutes"],
          rows: [["Felt", "60 degrees C", "54 degrees C"], ["Paper", "60 degrees C", "50 degrees C"], ["Single foil", "60 degrees C", "48 degrees C"], ["None", "60 degrees C", "45 degrees C"]],
          controls: "Same cups, water volume, starting temperature, room and test time.",
          limitation: "The result ranks only these tested wraps under these conditions."
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
        explanation: "The cup with the foam lid finished at 51 degrees C, the highest temperature, so it lost the least thermal energy in this test.",
        diagram: {
          label: "Energy Workshop lid test",
          columns: ["Cup lid", "Start", "After 15 minutes"],
          rows: [["Foam", "58 degrees C", "51 degrees C"], ["Card", "58 degrees C", "48 degrees C"], ["Thin metal", "58 degrees C", "46 degrees C"], ["None", "58 degrees C", "42 degrees C"]],
          controls: "Same cups, water volume, starting temperature, room and test time.",
          limitation: "The test compares heat loss from the whole cup setup, not one transfer process alone."
        }
      }
    ]),

  // Chemistry: Matter Hall, Mixture Lab, Changes Chamber, Properties Bay, Particle Observatory.
  subjectChoice("chemistry", "chemistry", "chemistry-states-of-matter", "Identify states of matter from observations",
    "Compare shape, volume and whether the sample spreads to fill its container.",
    "That state does not match all the observations. Check both shape and volume before choosing.", [
      {
        prompt: "Sample A changes shape when poured but keeps the same volume. What state is it?",
        options: [
          { id: "liquid", label: "Liquid" },
          { id: "solid", label: "Solid" },
          { id: "gas", label: "Gas" },
          { id: "light", label: "Light" }
        ],
        answer: "liquid",
        explanation: "A liquid flows to take its container's shape while keeping approximately the same volume.",
        diagram: {
          label: "Matter Hall sample test",
          columns: ["Observation", "Sample A"],
          rows: [["Keeps its own shape", "No"], ["Volume after pouring", "Same within measurement"], ["Fills all available space", "No"]],
          controls: "The same sample is poured between two sealed measuring containers at the same temperature.",
          limitation: "The table uses the simple particle model for ordinary classroom conditions."
        }
      },
      {
        prompt: "Sample B spreads out to fill every part of a sealed container. What state is it?",
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
          rows: [["Keeps its own shape", "No"], ["Keeps a fixed surface level", "No"], ["Fills all available space", "Yes"]],
          controls: "The sample remains sealed at the same temperature while container shape changes.",
          limitation: "The table identifies the state from large-scale observations, not individual particles."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-separate-mixture", "Choose a separation method from material properties",
    "Find a property that differs between the mixed materials and choose a method that uses it.",
    "That method does not use the useful difference shown in the table. Compare attraction or particle size.", [
      {
        prompt: "What is the best way to separate dry iron filings from sand?",
        options: [
          { id: "magnet", label: "Move a magnet over the mixture" },
          { id: "more-sand", label: "Add more sand" },
          { id: "crush", label: "Crush the mixture" },
          { id: "stir", label: "Stir it with a wooden stick" }
        ],
        answer: "magnet",
        explanation: "A magnet attracts the iron filings but not the sand, so it can lift one material away from the other.",
        diagram: {
          label: "Mixture Lab property check",
          columns: ["Material", "Attracted to test magnet", "Dry"],
          rows: [["Iron filings", "Yes", "Yes"], ["Sand", "No", "Yes"]],
          controls: "Use the same covered magnet and keep the mixture dry.",
          limitation: "The result applies to the tested iron filings, sand and magnet."
        }
      },
      {
        prompt: "What is the best way to separate large gravel pieces from fine sand?",
        options: [
          { id: "sieve", label: "Shake the mixture through a sieve" },
          { id: "magnet", label: "Use a magnet" },
          { id: "dissolve", label: "Try to dissolve both in water" },
          { id: "paint", label: "Paint the gravel" }
        ],
        answer: "sieve",
        explanation: "The fine sand passes through the sieve holes while the larger gravel pieces remain behind.",
        diagram: {
          label: "Mixture Lab size check",
          columns: ["Material", "Typical particle width", "Passes 3 mm holes"],
          rows: [["Gravel", "8-15 mm", "No"], ["Sand", "Less than 2 mm", "Yes"]],
          controls: "The mixture is dry and the same 3 mm sieve is used throughout.",
          limitation: "Very small gravel or clumped wet sand could need a different method."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-observe-change", "Distinguish reversible changes from reaction clues",
    "Use the after-change evidence: cooling can reverse some state changes, while an unexpected new gas may suggest a reaction.",
    "Check whether the original material can be recovered by cooling or whether the observation suggests a new substance.", [
      {
        prompt: "Which change in the mission log can be reversed by cooling?",
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
          columns: ["Change", "Original material recovered by cooling"],
          rows: [["Melting ice", "Yes, as ice"], ["Burning paper", "No"], ["Cooking egg", "No"], ["Rusting iron", "No"]],
          controls: "Compare only whether ordinary cooling reverses each listed change.",
          limitation: "The table does not claim that every physical change is easy to reverse."
        }
      },
      {
        prompt: "Two room-temperature liquids are mixed without stirring. Which new observation is the strongest clue that a chemical reaction may have produced a gas?",
        options: [
          { id: "new-bubbles", label: "Bubbles keep forming throughout the liquid" },
          { id: "taller-cup", label: "The mixture is poured into a taller cup" },
          { id: "new-shape", label: "The cup has a different shape" },
          { id: "label", label: "A new label is placed on the cup" }
        ],
        answer: "new-bubbles",
        explanation: "New bubbles forming throughout two non-boiling liquids can be evidence that a reaction is producing a gas.",
        diagram: {
          label: "Changes Chamber reaction check",
          columns: ["Condition", "Observation"],
          rows: [["Before mixing", "Both liquids still; no bubbles"], ["After mixing", "Bubbles continue forming throughout"], ["Temperature", "Remains well below boiling"]],
          controls: "Clean container; liquids begin bubble-free at room temperature; no shaking or boiling.",
          limitation: "Bubbles are a clue, not proof by themselves; trapped air and boiling have been controlled here."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-material-properties", "Select a material using tested properties",
    "The chosen material must meet every mission requirement, not just one.",
    "That sample misses at least one requirement. Check every property column for the same sample.", [
      {
        prompt: "A cover must bend around a curved box and keep water out. Which tested sample meets both needs?",
        options: [
          { id: "film", label: "Sample A: flexible film" },
          { id: "card", label: "Sample B: card" },
          { id: "tile", label: "Sample C: tile" },
          { id: "cloth", label: "Sample D: open-weave cloth" }
        ],
        answer: "film",
        explanation: "Sample A bends around the box and lets no water through, so it meets both requirements.",
        diagram: {
          label: "Properties Bay cover tests",
          columns: ["Sample", "Bends around box", "Water through after 1 minute"],
          rows: [["A: flexible film", "Yes", "No"], ["B: card", "Yes", "Yes"], ["C: tile", "No", "No"], ["D: open-weave cloth", "Yes", "Yes"]],
          controls: "Same sample area, water volume, curved box and one-minute test.",
          limitation: "Results describe only these samples and do not prove long-term durability."
        }
      },
      {
        prompt: "A window panel must let light through and resist water. Which tested sample meets both needs?",
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
          columns: ["Sample", "Light through", "Water through after 1 minute"],
          rows: [["E: clear plastic", "Yes", "No"], ["F: thin paper", "Some", "Yes"], ["G: metal sheet", "No", "No"], ["H: plastic mesh", "Yes", "Yes"]],
          controls: "Same sample area, lamp position, water volume and one-minute test.",
          limitation: "The test checks only light passage and short-term water resistance."
        }
      }
    ]),
  subjectChoice("chemistry", "chemistry", "chemistry-dissolving-particles", "Explain dissolving with a particle model",
    "The dissolved material is still present even when its particles are too spread out to see.",
    "The solute did not vanish or become a different element. Use the before-and-after evidence.", [
      {
        prompt: "Sugar seems to disappear after it is stirred into water. What happened?",
        options: [
          { id: "dissolved", label: "It dissolved and spread through the water." },
          { id: "stopped-existing", label: "It stopped existing." },
          { id: "oxygen", label: "It changed into oxygen." },
          { id: "left-cup", label: "It passed through the solid cup." }
        ],
        answer: "dissolved",
        explanation: "The sugar particles remain in the water but are spread too widely to see; evaporating the water can recover sugar.",
        diagram: {
          label: "Particle Observatory sugar evidence",
          columns: ["Check", "Observation"],
          rows: [["Before stirring", "Sugar crystals visible"], ["After stirring in a sealed cup", "No crystals visible; total mass unchanged"], ["After water evaporates", "Sugar crystals remain"]],
          controls: "Same sugar-water sample; no liquid is spilled; gentle evaporation by an adult-run virtual process.",
          limitation: "The table is evidence for dissolving and does not show individual sugar particles."
        }
      },
      {
        prompt: "Salt is no longer visible after it is stirred into water. Which explanation best fits the evidence?",
        options: [
          { id: "spread", label: "Salt particles spread through the water." },
          { id: "destroyed", label: "The water destroyed the salt." },
          { id: "sand", label: "The salt changed into sand." },
          { id: "escaped", label: "All the salt escaped into the air." }
        ],
        answer: "spread",
        explanation: "The salt dissolved, so its particles are still present and spread throughout the water.",
        diagram: {
          label: "Particle Observatory salt evidence",
          columns: ["Check", "Observation"],
          rows: [["Before stirring", "Salt crystals visible"], ["After stirring in a sealed cup", "No crystals visible; total mass unchanged"], ["After water evaporates", "Salt crystals remain"]],
          controls: "Same salt-water sample; no liquid is spilled; gentle evaporation by an adult-run virtual process.",
          limitation: "The table shows large-scale evidence, not the size or exact arrangement of particles."
        }
      }
    ]),

  // Grove: Seed Lab, Habitat Dome, Life-Cycle Nursery, Food-Web Field, Adaptation Clinic.
  subjectChoice("grove", "life-sciences", "grove-plant-parts", "Connect plant parts with their functions",
    "Match the job in the question with the plant-part observations in the table.",
    "That plant part has a different main job in this mission. Compare what each part takes in or makes.", [
      {
        prompt: "Which plant part uses light energy to make sugars for the plant?",
        options: [
          { id: "leaves", label: "Leaves" },
          { id: "roots", label: "Roots" },
          { id: "flower", label: "Flower petals" },
          { id: "seed-coat", label: "Seed coat" }
        ],
        answer: "leaves",
        explanation: "Leaves contain structures that capture light energy and use it to help make sugars by photosynthesis.",
        diagram: {
          label: "Seed Lab plant-part observations",
          columns: ["Plant part", "Observed main job"],
          rows: [["Leaves", "Receive light and exchange gases"], ["Roots", "Take in water and minerals"], ["Flower petals", "Help attract some pollinators"], ["Seed coat", "Protects the seed"]],
          controls: "Use the main functions listed for this flowering plant.",
          limitation: "Plant parts can have more than one function; the question asks about making sugars with light."
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
          columns: ["Plant part", "Observed contact or job"],
          rows: [["Roots", "In moist soil; take in water"], ["Leaves", "In light; make sugars"], ["Petals", "Not present on this seedling"], ["Fruit", "Not present on this seedling"]],
          controls: "The seedling is healthy, rooted in moist soil and observed under ordinary conditions.",
          limitation: "Small amounts of water can contact other parts, but roots are the main uptake structures here."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-habitat-needs", "Use habitat evidence to meet an animal's needs",
    "Choose the habitat that supplies all the needs named in the mission table.",
    "That habitat is missing at least one listed need. Check water, food, shelter and suitable conditions.", [
      {
        prompt: "Which habitat best meets all the displayed needs of this pond frog?",
        options: [
          { id: "pond-edge", label: "A shaded pond edge with insects and plants" },
          { id: "dry-rock", label: "A dry bare rock with no nearby water" },
          { id: "sealed-box", label: "A sealed empty box" },
          { id: "salt-flat", label: "An open salt flat with no shelter" }
        ],
        answer: "pond-edge",
        explanation: "The shaded pond edge provides fresh water, insect food, plant shelter and moist conditions for the frog.",
        diagram: {
          label: "Habitat Dome frog needs",
          columns: ["Need", "Mission evidence"],
          rows: [["Water", "Fresh pond water"], ["Food", "Small insects"], ["Shelter", "Pond plants and shade"], ["Conditions", "Moist areas"]],
          controls: "Compare each option with all four needs of this frog.",
          limitation: "Different frog species can have different habitat needs."
        }
      },
      {
        prompt: "Which habitat best meets all the displayed needs of this small woodland bird?",
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
          columns: ["Need", "Mission evidence"],
          rows: [["Water", "Fresh water nearby"], ["Food", "Seeds and insects"], ["Shelter", "Shrubs and trees"], ["Nesting", "Branches and plant material"]],
          controls: "Compare each option with all four needs of this woodland bird.",
          limitation: "The question concerns the described bird, not every bird species."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-life-cycle", "Order stages in an animal life cycle",
    "Find the stage shown directly after the egg in the displayed life cycle.",
    "That stage occurs later or belongs to a different organism. Follow the arrows from the egg.", [
      {
        prompt: "Which stage comes directly after a butterfly egg hatches?",
        options: [
          { id: "larva", label: "Larva (caterpillar)" },
          { id: "adult", label: "Adult butterfly" },
          { id: "pupa", label: "Pupa" },
          { id: "seedling", label: "Seedling" }
        ],
        answer: "larva",
        explanation: "A butterfly develops from egg to larva, then pupa and then adult.",
        diagram: {
          label: "Life-Cycle Nursery butterfly record",
          columns: ["Stage number", "Stage"],
          rows: [["1", "Egg"], ["2", "Larva"], ["3", "Pupa"], ["4", "Adult butterfly"]],
          controls: "Use the stage order shown for a butterfly.",
          limitation: "Timing and appearance vary between butterfly species, but this stage order is consistent."
        }
      },
      {
        prompt: "Which stage comes directly after a frog egg hatches?",
        options: [
          { id: "tadpole", label: "Tadpole" },
          { id: "adult", label: "Adult frog" },
          { id: "froglet", label: "Froglet" },
          { id: "caterpillar", label: "Caterpillar" }
        ],
        answer: "tadpole",
        explanation: "In the displayed frog life cycle, the egg hatches into a tadpole before developing legs and becoming a froglet.",
        diagram: {
          label: "Life-Cycle Nursery frog record",
          columns: ["Stage number", "Stage"],
          rows: [["1", "Egg"], ["2", "Tadpole"], ["3", "Tadpole with legs"], ["4", "Froglet"], ["5", "Adult frog"]],
          controls: "Use the stage order shown for this frog life cycle.",
          limitation: "Development details vary among frog species, but the answer follows the displayed record."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-food-chain", "Identify producers in food chains",
    "A producer uses light energy to make its own sugars; start at the first organism in the chain.",
    "That organism gets energy by eating another organism. Find the plant or alga that begins the chain.", [
      {
        prompt: "In grass -> grasshopper -> frog -> snake, which organism is the producer?",
        options: [
          { id: "grass", label: "Grass" },
          { id: "grasshopper", label: "Grasshopper" },
          { id: "frog", label: "Frog" },
          { id: "snake", label: "Snake" }
        ],
        answer: "grass",
        explanation: "Grass is the producer because it uses light energy to make sugars instead of eating another organism.",
        diagram: {
          label: "Food-Web Field energy path",
          columns: ["From", "To", "Meaning"],
          rows: [["Grass", "Grasshopper", "Grasshopper eats grass"], ["Grasshopper", "Frog", "Frog eats grasshopper"], ["Frog", "Snake", "Snake eats frog"]],
          controls: "Arrows point from the food to the organism that receives its energy.",
          limitation: "This simplified chain shows one energy path, not the full food web."
        }
      },
      {
        prompt: "In algae -> snail -> fish -> heron, which organism is the producer?",
        options: [
          { id: "algae", label: "Algae" },
          { id: "snail", label: "Snail" },
          { id: "fish", label: "Fish" },
          { id: "heron", label: "Heron" }
        ],
        answer: "algae",
        explanation: "The algae are producers because they use light energy to make sugars and begin this energy path.",
        diagram: {
          label: "Food-Web Field pond path",
          columns: ["From", "To", "Meaning"],
          rows: [["Algae", "Snail", "Snail eats algae"], ["Snail", "Fish", "Fish eats snail"], ["Fish", "Heron", "Heron eats fish"]],
          controls: "Arrows point from the food to the organism that receives its energy.",
          limitation: "This simplified chain shows one energy path; each organism may have other food links."
        }
      }
    ]),
  subjectChoice("grove", "life-sciences", "grove-adaptation-function", "Link an adaptation with its helpful function",
    "Choose the function that directly matches the body feature and habitat shown.",
    "That function is not supported by the feature in the table. Think about how the shape or covering helps survival.", [
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
          columns: ["Feature", "Observed effect"],
          rows: [["Toes spread in water", "Skin forms a broad surface"], ["Foot sweeps backwards", "Water is pushed backwards"], ["Duck's movement", "Body moves forwards"]],
          controls: "Observe the same duck swimming at a steady pace in calm water.",
          limitation: "Webbed feet also assist with other movements; the question asks about swimming."
        }
      },
      {
        prompt: "How does thick fur help a polar bear in its cold habitat?",
        options: [
          { id: "slow-heat-loss", label: "It slows heat loss from the body." },
          { id: "make-food", label: "It makes food from sunlight." },
          { id: "breathe-water", label: "It allows the bear to breathe underwater." },
          { id: "hear-distance", label: "It makes distant sounds louder." }
        ],
        answer: "slow-heat-loss",
        explanation: "Thick fur traps air and slows thermal energy transfer from the bear's warm body to the cold surroundings.",
        diagram: {
          label: "Adaptation Clinic insulation evidence",
          columns: ["Model covering", "Temperature drop in 10 minutes"],
          rows: [["Thick fur-like covering", "3 C"], ["Thin covering", "8 C"], ["No covering", "12 C"]],
          controls: "Same warm model, starting temperature, size, room and test time.",
          limitation: "This model tests insulation only; polar bears have several adaptations for cold conditions."
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
