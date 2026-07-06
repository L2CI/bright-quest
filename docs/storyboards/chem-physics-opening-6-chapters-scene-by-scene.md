# Bright Quest Chemistry/Physics Opening Arc: Scene-by-Scene Animation Design

Date: 2026-07-06  
Scope: Design artifact only. No app code, lesson media, captions or current Chemistry 101 assets are changed by this file.
Superseded note: this short-form storyboard has been superseded for implementation by `chemistry-new-chapters-longform-training-blueprint.md`. Do not use the 2:00 to 2:45 runtime target below for production. The current requirement is no new Chemistry training chapter under 5 minutes, followed by a test.

## Design intent

This opening six-chapter arc is for an advanced Grade 3/4 learner. It starts with observable matter and safe household phenomena, then introduces particles as a simple model after the child has seen evidence. The tone should match the approved Bright Quest classroom style: warm, direct, curious and practical.

The chapters are designed to work as either pre-rendered video lessons or a future programmatic chalk scene player. If implemented as code, the animation should use the audio file as the master clock, map board states from beat timestamps, and keep each stroke phase local to the current beat.

Curriculum traceability in this file is design-level only. Before implementation or parent-facing claims, cross-check the final code list against the exact current ACARA, VCAA, NGSS and England source documents. Particle models and dissolving are intentionally advanced extension ideas for an able learner, not baseline Grade 3/4 claims.

## Animation and voice rules

- One dominant idea per board. Never show the completed diagram at the start.
- Draw in meaning order: setting, object, action arrow, evidence, then label.
- Labels appear late, after the object they describe exists.
- Keep board lanes stable: main phenomenon in the centre lane, particle model below, vocabulary labels on the side, checkpoints in a compact lower corner.
- Use chalk-like strokes with muted white, cyan, yellow, green and rose emphasis. Avoid decorative backgrounds.
- Teacher voice should be a warm Grade 4 teacher, lightly energetic, with a target pace around 150-165 words per minute after timing against the final board animation.
- Use short teacher phrases: "Watch this", "Here is the trick", "Let me test that idea", "Now the important move".
- Add one brief student interruption per chapter, then return cleanly to the lesson point.
- Optional home activities are parent-supervised. Anything involving steam, boiling, pressure, small magnets, coin cells or unknown substances is app-only or adult demonstration only.
- Target runtime is 2:00 to 2:45 per chapter for this opening arc. If narration, checkpoints or animation exceed that, split the chapter rather than stretching the scene.

## Chapter 1: The Mystery of Stuff

Teaching question: What is everything around us made of?  
Curriculum trace: AU `AC9S4U04`; ACARA Year 3/4 inquiry descriptors to be mapped individually before implementation.  
Misconception target: "Science starts with invisible atoms." Correction: science starts with careful observation, then uses models.

| Scene | Runtime | Teaching point | Voice and interruption | Board animation beats | Checkpoint |
|---|---:|---|---|---|---|
| 1. Table of stuff | 0:00-0:25 | Materials are the stuff objects are made from. | Teacher: "Watch this table. Same room, lots of different stuff." Student: "Is everything just one kind of thing?" Teacher: "Good question. Let's sort before we guess." | Draw tabletop, then cup, spoon, jumper, bottle, paper. Add late labels: glass, metal, fibre, plastic, paper. | Tap the object made from metal. |
| 2. Property detective | 0:25-0:55 | We compare materials by observable properties. | Teacher: "A property is a clue you can test." | Draw four test icons in side lane: bends, lets light through, soaks water, sticks to magnet. Animate one object moving past each test. | Choose which property helps pick a raincoat material. |
| 3. Same shape, different material | 0:55-1:25 | The same object shape can be made from different materials. | Teacher: "A spoon shape is not the same as spoon material." | Draw three spoons in a row. Stroke-fill hints: wood grain, metal shine, plastic colour. Labels appear after comparison arrows. | Which spoon would conduct heat most easily? |
| 4. Science notebook rule | 1:25-1:55 | Observations should be precise, not guesses. | Teacher: "Now the important move: write what you noticed, not what you hoped." | Draw mini notebook with columns: object, material, property, evidence. Fill one row using animated handwriting. | Sort a new object into material plus property. |

Production notes:

- Keep this chapter visually calm. It sets the grammar for all later science: observe, compare, name evidence.
- Do not show atoms or particles yet. End with a teaser: "Soon we will need a model for tiny pieces, but not yet."

## Chapter 2: Solid, Liquid or Gas?

Teaching question: How do solids, liquids and gases behave differently?  
Curriculum trace: AU `AC9S3U04`; England Year 4 states of matter; NGSS Grade 5 particle extension as model only.  
Misconception target: "A gas is not real stuff." Correction: air can take space and push.

| Scene | Runtime | Teaching point | Voice and interruption | Board animation beats | Checkpoint |
|---|---:|---|---|---|---|
| 1. Three containers | 0:00-0:30 | Solids, liquids and gases can be compared by behaviour. | Teacher: "Do not memorise the words first. Watch how each one behaves." | Draw tray with block, water cup, balloon. Labels stay hidden. Animate block staying shaped, water taking cup shape, balloon expanding. | Which one keeps its own shape? |
| 2. Shape test | 0:30-1:00 | Solids usually keep shape; liquids take container shape. | Student: "But jelly is wobbly. Is it a liquid?" Teacher: "Jelly is a tricky soft solid, so one clue is not enough. That is why we test behaviour, not just looks." | Draw two container outlines. Move block and water into new shapes using arrows. Add "keeps shape" and "takes shape" labels late. | Drag solid/liquid labels to examples. |
| 3. Gas is matter | 1:00-1:35 | Gas takes space even when invisible. | Teacher: "Here is the trick: invisible does not mean nothing." | Draw syringe-style plunger or sealed balloon visual. Animate air dots spreading inside; plunger arrow compresses space slightly. | What evidence shows air is there? |
| 4. Word map | 1:35-2:05 | The three state words describe behaviour. | Teacher: "Now we can name them: solid, liquid, gas." | Draw a three-column chart. Reveal one rule and one example in each column. | Pick the best category for steam/water vapour in the app-only animation. |

Production notes:

- Do not use real steam or boiling as a child task. Water vapour appears only as animation or adult-controlled everyday observation.
- The particle dots are introduced only as "model dots", not atoms or molecules.

## Chapter 3: Tiny Particles, Big Clues

Teaching question: Why do solids, liquids and gases behave differently?  
Curriculum trace: AU `AC9S3U04` as state-change explanation support; NGSS 5.Structure and Properties of Matter as advanced extension.  
Misconception target: "Particle pictures are photographs." Correction: diagrams are models that help explain patterns.

| Scene | Runtime | Teaching point | Voice and interruption | Board animation beats | Checkpoint |
|---|---:|---|---|---|---|
| 1. Model warning | 0:00-0:25 | A model is a thinking tool, not a real photo. | Teacher: "Watch this carefully. These dots are not a photograph. They are a model." | Draw camera icon with a cross, then draw simple model box. Label: model = helps explain. | True/false: the dots are an exact picture of real particles. |
| 2. Solid model | 0:25-0:55 | Solid particles stay close and mostly vibrate in place. | Teacher: "In a solid, the tiny pieces are packed close." | Draw square container, then dot grid. Add tiny vibration strokes around dots. Label late: close, fixed places. | Why does the block keep shape? |
| 3. Liquid model | 0:55-1:25 | Liquid particles are close but can slide past each other. | Student: "So liquid particles are loose like gas?" Teacher: "Not that loose. Close, but able to slide." | Redraw the dot grid as a close random cluster inside a cup outline, then animate short sliding arrows. | Which phrase best describes the liquid model? |
| 4. Gas model | 1:25-1:55 | Gas particles are spread out and move through the available space. | Teacher: "Now the important move: gases spread to fill the space." | Draw large balloon outline, sparse dots moving with bouncing arrows. Label: spread out. | Which model fits air in a balloon? |
| 5. Model match | 1:55-2:25 | Match evidence to model. | Teacher: "A model earns its place by explaining evidence." | Show three evidence cards: keeps shape, pours, fills balloon. Connect each to solid/liquid/gas model with chalk lines. | Match evidence to state. |

Production notes:

- Use the same dot style for all states so the child compares arrangement and motion, not decoration.
- Keep particle density readable on mobile. Use fewer, larger dots.

## Chapter 4: Heat Makes Particles Dance

Teaching question: What does heating or cooling do to materials?  
Curriculum trace: AU `AC9S3U03`, `AC9S3U04`; provisional Victorian heat/state-change mapping to be refreshed against current VCAA codes; NGSS Grade 4 energy connection.  
Misconception target: "The thermometer number is the heat." Correction: temperature tells us how warm something is; heat can move from warmer things to cooler things.

| Scene | Runtime | Teaching point | Voice and interruption | Board animation beats | Checkpoint |
|---|---:|---|---|---|---|
| 1. Warm cup, cool spoon | 0:00-0:35 | Heat moves from warmer objects to cooler objects. | Teacher: "Watch this. Heat has a direction." | Draw warm cup and cool spoon. Animate yellow arrows from cup to spoon. Thermometer icons appear after arrows. | Which way does heat move? |
| 2. Temperature is a measure | 0:35-1:05 | Temperature helps measure warm/cool change. | Student: "So heat is the number?" Teacher: "The number is temperature. It tells us how warm something is." | Draw two thermometers. Animate level rising/falling. Add label: temperature reading. Keep heat arrows separate in the next beat. | Pick the temperature-reading label. |
| 3. Faster model | 1:05-1:40 | Heating usually makes particles move more. | Teacher: "Here is the trick: warmer model dots jiggle more." | Split board: cool particles with small wiggles, warm particles with larger wiggles. Keep labels late and never let cooled particles stop completely. | Which side is warmer? |
| 4. Cooling model | 1:40-2:10 | Cooling removes heat energy and particle motion slows. | Teacher: "Cooling is not magic. Heat energy leaves." | Animate arrows leaving a warm object into cooler surroundings. Particle wiggles slow. | What changed: particles vanished or moved less? |
| 5. Safe experiment card | 2:10-2:35 | Optional home observation must be safe. | Teacher: "Use warm tap water only, and a parent checks first." | Draw safety card with icons: parent, warm tap water, no boiling, no flame. | Confirm the safe rule before continuing. |

Production notes:

- No flames, boiling water or hot glass. Use animation for any hot-material idea.
- Keep heat arrows visually distinct from motion arrows: yellow for heat transfer, cyan for particle motion.

## Chapter 5: Melting Is Not Disappearing

Teaching question: What happens when a solid melts?  
Curriculum trace: AU `AC9S3U04`; England Year 4 states of matter; provisional Victorian state-change mapping to be refreshed against current VCAA codes.  
Misconception target: "When ice melts, the ice disappears." Correction: the material changes state; the water is still there.

| Scene | Runtime | Teaching point | Voice and interruption | Board animation beats | Checkpoint |
|---|---:|---|---|---|---|
| 1. Ice cube evidence | 0:00-0:30 | Melting changes state from solid to liquid. | Teacher: "Watch the shape change, but do not let your brain say vanished." | Draw ice cube on plate. Animate outline softening into puddle. Label appears: solid water -> liquid water. | Did the material vanish? |
| 2. Same stuff, new state | 0:30-1:00 | The material stays the same kind of stuff. | Student: "But the cube is gone." Teacher: "The cube shape is gone. The water is not." | Draw before/after balance-style visual: ice cube on left, puddle on right, equal "water" tags. | What changed: shape/state or material? |
| 3. Particle model of melting | 1:00-1:35 | Particles move from fixed places to sliding movement. | Teacher: "Now the model can help." | Draw solid dot grid. Add heat arrows. Redraw as a close sliding cluster. | Choose the best model for melted ice. |
| 4. Freezing reverses it | 1:35-2:05 | Removing heat can turn liquid back into solid. | Teacher: "Let me test that idea backwards." | Animate puddle model losing heat arrows, dots locking into grid, cube outline reforms. | Which process removes heat: melting or freezing? |
| 5. Safe home option | 2:05-2:30 | Use sealed bag ice observation. | Teacher: "Parent-supervised, sealed bag, no hot water needed." | Draw sealed bag, ice, clock, observation notebook. | Pick the safe observation setup. |

Production notes:

- This chapter should feel like a correction of a common child explanation, not a vocabulary lecture.
- Use the same "water" label across solid and liquid states to reinforce conservation qualitatively.

## Chapter 6: Dissolving Is Not Melting

Teaching question: What is different about dissolving and melting?  
Curriculum trace: AU `AC9S3U04` as state-change baseline; NGSS 5.Structure and Properties of Matter as advanced extension; ACARA Year 3/4 inquiry descriptors to be mapped individually before implementation.  
Misconception target: "Sugar melts in water." Correction: sugar dissolves by spreading through the water; it has not melted from heat.
Chapter status: advanced extension inside the opening arc. It should use a misconception checkpoint, not be marketed as a baseline Grade 3/4 standard.

| Scene | Runtime | Teaching point | Voice and interruption | Board animation beats | Checkpoint |
|---|---:|---|---|---|---|
| 1. Two mysteries | 0:00-0:35 | Melting and dissolving can look similar but have different causes. | Teacher: "Two things can disappear from sight for different reasons." | Draw ice on warm plate and sugar in water side by side. Add question marks, no labels yet. | Which one needs heat to change state? |
| 2. Melting recap | 0:35-1:00 | Melting is a state change caused by added heat. | Teacher: "First, the melting story." | On left lane, animate solid water model becoming liquid water model with heat arrows. Label: melting. | What moved into the material? Heat energy. |
| 3. Dissolving model | 1:00-1:35 | Dissolving spreads tiny bits of solute through the liquid. | Student: "So the sugar melted?" Teacher: "Not this time. No heat story. A spreading story." | On right lane, draw sugar crystals as small squares, water as blue dots, then redraw the cup with sugar dots spread among water dots. Label: dissolving. | Choose: melted, dissolved or vanished. |
| 4. Evidence after stirring | 1:35-2:05 | The sugar is still present even if you cannot see grains. | Teacher: "Invisible to our eyes is not the same as gone." | Draw magnifier over clear cup, then model inset showing sugar particles spread out. Optional taste icon crossed out: no tasting unknowns. | What evidence would a safe adult-led setup use? |
| 5. Compare and checkpoint | 2:05-2:45 | Use a compact table to separate cause, model and result. | Teacher: "If your brain says vanished, pause and ask: what is the evidence?" | Draw two-row table: melting, dissolving. Fill cause and model cells one at a time. End with rule card: cannot see it != gone. | Sort three statements into melting/dissolving. |

Production notes:

- Do not ask children to taste dissolved substances. If taste is mentioned as everyday evidence, mark it as adult-context only and not a Bright Quest task.
- Keep dissolving as advanced extension. It belongs here because it fixes a high-value misconception before later chemistry work, but the implementation should label it as a challenge chapter or optional extension if the rest of the course is marketed as Grade 3/4 baseline.

## Reusable scene data fields

Future implementation should store each scene with these fields so animation, captions, tests and parent review can stay aligned:

```ts
type BrightQuestScienceScene = {
  chapterId: string;
  sceneId: string;
  title: string;
  teachingPoint: string;
  misconceptionTarget?: string;
  safetyTag: "app-core" | "home-optional" | "adult-demo-only" | "defer-home";
  curriculumTags: string[];
  narrationBeats: Array<{ at: number; speaker: "teacher" | "student"; text: string }>;
  boardBeats: Array<{
    at: number;
    state: string;
    drawObjectIds: string[]; // references boardObjects in reveal order
    strokeOrder?: Array<{ objectId: string; strokeGroup: string; durationSec: number }>;
  }>;
  boardObjects: Array<{
    id: string;
    primitive: "container" | "object" | "particle-model" | "arrow" | "table" | "label" | "checkpoint";
    lane: "centre" | "model" | "side" | "label" | "checkpoint";
    label?: string;
  }>;
  checkpoint: {
    prompt: string;
    answerMode: "tap" | "drag" | "multiple-choice" | "short-explain";
    parentReviewConcept: string;
  };
};
```

## QA director checklist for these chapters

- Early frame: only the orienting object or first stroke is visible; no labels should have appeared.
- Middle frame: the main phenomenon should be clear without needing the final label.
- Final frame: diagram, captions, checkpoint and controls must fit on mobile and desktop without overlap.
- Voice/visual sync: teacher names an object only when it is being drawn or has just appeared.
- Misconception handling: every chapter must include a child-like wrong idea and a calm correction.
- Parent review: every checkpoint should save prompt, selected answer, correct answer, concept and feedback so the cockpit can show wrong answers first.
- Safety: optional demos must carry one of the four safety tags, and app-only demos must not be presented as home tasks.
