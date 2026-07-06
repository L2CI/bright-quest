# Chemistry 101 New Chapters: Long-Form Training Blueprint

Date: 2026-07-06  
Status: Back-to-drawing-board blueprint after rejecting short draft renders.  
Scope: Chapters 6-11 only. This file is design guidance before media generation.

## Non-negotiables

- No new Chemistry training chapter may be shorter than 5 minutes of training video.
- Target runtime is 6:00 to 7:30 per chapter. This gives enough time for teaching, animation, misconception correction, recap, and checkpoint setup without drifting into a full lecture.
- Every chapter is followed by a 10-question test using the existing Chemistry 101 quiz pattern.
- Every test must save prompt, concept, selected index, selected answer text, correct answer text, feedback, correctness, score, and submitted timestamp for Parent Cockpit review.
- Videos must not be static narrated slides. There must be a visible board change at least every 3 seconds during active narration.
- Before implementation, run Fable review on this long-form blueprint and apply high-priority content comments.
- Do not show particle dots before Chapter 8 has taught "model, not photograph." Chapter 7 must use macroscopic air evidence only: balloons, plungers, air space, arrows and shaded regions.
- Be precise about steam and water vapour: visible "steam" is condensed tiny liquid droplets; water vapour itself is invisible. Avoid using visible steam as the main gas example.
- Do not say dissolving has "no heat story." More accurate Grade 3/4 wording: dissolving is not melting; it can happen without a state change, and temperature may change how fast it happens.

## Production Shape

Each chapter should be written as a 900-1,150 word narration script at roughly 150-165 words per minute. The animation should be planned as 9-12 scenes, each 30-50 seconds, with multiple sub-beats inside each scene. Each 30-50 second scene must contain 8-15 visual changes so the 3-second screenshot QA sees active teaching rather than a frozen board. The chapter ends by setting up the test, not by replacing the test.

The existing Chemistry 101 runtime remains the delivery surface:

- new chapters append as chapters 6-11
- asset names are `chapter-06` through `chapter-11`
- existing player controls, buttons, card treatment, status pills, captions, quiz locking, and Parent Cockpit review stay intact
- Physics remains a separate future course, `Winter 2026 Physics`

## Chapter 6: The Mystery of Stuff

Target runtime: 6:15  
Teaching goal: Start from observable materials and properties before any tiny-particle model.  
Misconception: Science begins by naming invisible atoms.  
Test focus: materials, properties, evidence, sorting, fair observation.

| Time | Scene | Teaching move | Animation and QA expectation |
|---:|---|---|---|
| 0:00-0:35 | Evidence table opens | Establish five everyday objects and ask what kind of stuff they are made from. | Draw table, then cup, spoon, jumper, bottle, paper one by one. No labels until all objects exist. |
| 0:35-1:15 | Material vs object | Separate object name from material name. | Split board into object lane and material lane. Move each object card into both lanes. |
| 1:15-2:00 | Property detective | Define property as a testable clue. | Four test stations draw in sequence: bend, light, water, magnet. Object travels between stations. |
| 2:00-2:40 | Same shape, different material | Show wooden, metal, and plastic spoons. | Three spoons draw side by side with distinct textures. Heat-safe job question appears late. |
| 2:40-3:25 | Best for what job? | Link material properties to use. | Raincoat, window, pan handle, wire cards appear. Arrows connect properties to jobs. |
| 3:25-4:05 | Student interruption | Student asks whether everything is one kind of stuff. | Pause board, show question bubble, answer by sorting evidence, not by jumping to atoms. |
| 4:05-4:50 | Science notebook rule | Record observations precisely. | Notebook columns animate: object, material, property, evidence. Fill one row at a time. |
| 4:50-5:35 | Mini investigation | Compare two unknown materials by one property. | Two sample tiles appear. Single fair-test ruler/check icon shows one variable at a time. |
| 5:35-6:15 | Test handoff | Recap observe, compare, evidence, then unlock test. | Four-rule summary draws as icons. Final card says "Chapter test: material clues." |

## Chapter 7: Solid, Liquid or Gas?

Target runtime: 6:30  
Teaching goal: Classify solids, liquids and gases by behaviour.  
Misconception: Gas is not real matter because it is invisible.  
Test focus: shape, volume, flow, gas evidence, tricky examples, safety.

| Time | Scene | Teaching move | Animation and QA expectation |
|---:|---|---|---|
| 0:00-0:35 | Three examples | Block, water, and balloon appear before vocabulary. | Objects draw without labels. Labels stay hidden until behaviour is observed. |
| 0:35-1:20 | Shape test | Show a solid keeping shape in two containers. | Block moves between two outline containers. Shape stays the same. |
| 1:20-2:05 | Liquid test | Show water taking container shape while amount remains. | Water level redraws in cup and bowl. Use fill animation, not a static swap. |
| 2:05-2:55 | Gas evidence | Show air filling a balloon and pushing a plunger. | Balloon expands. Plunger compresses a shaded air region with pressure arrows. Do not use particle dots yet. |
| 2:55-3:35 | Student interruption | Student asks about jelly. | Answer: jelly is a tricky soft solid; one clue is not enough. Add "test more than one clue." |
| 3:35-4:20 | Word map | Name solid, liquid, gas after evidence. | Three-column chart reveals rules, then examples. |
| 4:20-5:05 | Water vapour precision | Explain that water vapour is invisible and visible "steam" is tiny liquid droplets. Keep hot-water examples app-only/adult-only. | App-only hot-cup icon appears behind a safety boundary. Draw invisible vapour as arrows, then visible droplets as tiny mist marks labelled "droplets." |
| 5:05-5:50 | Sort examples | Ice cube, juice, air in tyre, honey, sponge. | Cards sort into solid/liquid/gas/tricky lanes with movement every few seconds. |
| 5:50-6:30 | Test handoff | Recap "behaviour, not just looks." | Three evidence icons pulse, then test card appears. |

## Chapter 8: Tiny Particles, Big Clues

Target runtime: 6:45  
Teaching goal: Introduce particle diagrams as models that explain state behaviour.  
Misconception: Particle diagrams are photographs of real particles.  
Test focus: model limits, solid/liquid/gas arrangements, evidence-to-model matching.

| Time | Scene | Teaching move | Animation and QA expectation |
|---:|---|---|---|
| 0:00-0:40 | Model warning | Explain model vs photograph. | Camera icon crosses out; thinking-tool map appears. |
| 0:40-1:25 | Why models help | Link visible behaviour to invisible explanation. | Evidence cards from Chapter 7 connect to a blank model box. |
| 1:25-2:10 | Solid model | Close particles in mostly fixed places. | Dot grid draws gradually; small vibration strokes loop. No dots stop fully. |
| 2:10-2:55 | Liquid model | Close particles that can slide. | Redraw grid into close cluster. Sliding arrows appear in short local strokes. |
| 2:55-3:40 | Gas model | Spread-out particles moving through space. | Sparse dots animate in a large balloon/container. |
| 3:40-4:20 | Student interruption | Student says the dots must be real photos. | Teacher repeats: useful model, not exact picture. Add "chosen because it explains evidence." |
| 4:20-5:05 | Evidence matching | Keeps shape, pours, fills space. | Chalk lines connect each evidence card to a model. |
| 5:05-5:55 | Model limits | Explain dots do not show size, colour, wetness, or exact look. | Four "not shown" icons appear: colour, wetness, exact size, exact photo. |
| 5:55-6:45 | Test handoff | Recap arrangement plus movement. | Three model boxes summarise solid/liquid/gas and unlock test. |

## Chapter 9: Heat Makes Particles Dance

Target runtime: 6:45  
Teaching goal: Explain warming, cooling, temperature reading, and heat transfer safely.  
Misconception: The thermometer number is the heat itself.  
Test focus: warmer-to-cooler transfer, temperature, particle motion, safe observation.

| Time | Scene | Teaching move | Animation and QA expectation |
|---:|---|---|---|
| 0:00-0:40 | Warm and cool objects | Warm cup and cool spoon establish heat direction. | Draw cup, spoon, thermometer, then heat arrows. |
| 0:40-1:25 | Heat moves | Show heat moving from warmer to cooler. | Yellow arrows travel from cup to spoon. Avoid decorative flame imagery. |
| 1:25-2:05 | Temperature reading | Temperature tells how warm something is. | Thermometer rises/falls. Label "temperature reading" appears late. |
| 2:05-2:45 | Student interruption | Student asks whether heat is the number. | Teacher separates "number tells warm" from "heat moves." Keep wording age-appropriate. |
| 2:45-3:35 | Warmer particle model | Warmer model dots jiggle more. | Split panel: cool side small wiggle, warm side larger wiggle. No full stop. |
| 3:35-4:20 | Cooling model | Heat leaves and motion slows. | Arrows leave object, wiggles become smaller. |
| 4:20-5:05 | Safe observation | Warm tap water only, parent-supervised. | Safety card draws: parent, warm tap water, no boiling, no flame. |
| 5:05-5:55 | Predict direction | Several pairs: warm hand/cool cup, warm room/cold bottle. | Direction arrows appear after child prediction prompt. |
| 5:55-6:45 | Test handoff | Recap heat direction, temperature, motion, safety. | Four summary icons draw, then test card appears. |

## Chapter 10: Melting Is Not Disappearing

Target runtime: 6:30  
Teaching goal: Explain melting and freezing as state changes where the material remains.  
Misconception: The solid disappears when it melts.  
Test focus: melting, freezing, same material, particle model, safe ice observation.

| Time | Scene | Teaching move | Animation and QA expectation |
|---:|---|---|---|
| 0:00-0:35 | Ice evidence | Ice cube on plate starts the mystery. | Draw ice cube, plate, timer. No water label yet. |
| 0:35-1:20 | Shape changes | Ice becomes puddle. | Smooth redraw from cube outline to puddle. Label appears after change. |
| 1:20-2:05 | Student interruption | Student says the cube is gone. | Teacher says cube shape is gone; water is not. Balance-style before/after appears. |
| 2:05-2:55 | Same stuff, new state | Reinforce solid water and liquid water. | Same "water" tag moves from ice to puddle. |
| 2:55-3:40 | Particle model | Fixed places become sliding cluster. | Dot grid redraws to close sliding cluster with heat arrows. |
| 3:40-4:25 | Freezing reverses | Removing heat can reform solid. | Reverse arrows and grid return. |
| 4:25-5:10 | Other melting examples | Butter, chocolate, wax as app-safe examples. | Examples appear as cards. No hot pan/flame imagery. |
| 5:10-5:55 | Safe home option | Sealed bag ice observation. | Parent, sealed bag, clock, notebook. |
| 5:55-6:30 | Test handoff | Recap "same material, new state." | Two-state diagram locks into final summary and test card. |

## Chapter 11: Dissolving Is Not Melting

Target runtime: 7:00  
Teaching goal: Compare melting with dissolving and show dissolved material is spread out, not gone.  
Misconception: Sugar melts in water or vanishes.  
Test focus: melting vs dissolving, spreading model, evidence, safety, comparison reasoning.

| Time | Scene | Teaching move | Animation and QA expectation |
|---:|---|---|---|
| 0:00-0:40 | Two mysteries | Ice on plate and sugar in water look like disappearing. | Draw both side by side with question marks. No answers yet. |
| 0:40-1:25 | Melting recap | Melting is heat-driven state change. | Heat arrow, solid-to-liquid model, "state change" label appears late. |
| 1:25-2:10 | Dissolving setup | Sugar or salt crystals enter water. | Draw crystals, water cup, stirring arrow. No "melt" label. Label the material clearly so evidence does not rely on tasting. |
| 2:10-2:55 | Student interruption | Student says the sugar melted. | Teacher corrects: not a melting state-change story. It is a spreading-through-water story; temperature can affect speed, but heat is not the definition. |
| 2:55-3:45 | Dissolving model | Sugar dots spread among water dots. | Redraw cup with sugar dots distributed. Magnifier inset appears. |
| 3:45-4:25 | Not gone | Invisible to eyes does not mean gone. | Clear cup and model inset stay together. Evidence options are app-model, labelled known material, mass comparison, or app-only salt recovery. Avoid child tasting as evidence. |
| 4:25-5:05 | Safety boundary | No tasting unknowns; adult-led only if real sugar-water demo is used. | Crossed taste icon, parent icon, app-model icon, and "known food only with parent" note. |
| 5:05-5:50 | Compare table | Cause, model, result for melting and dissolving. | Two-row table fills one cell at a time. |
| 5:50-6:35 | Sort statements | Three examples sort into melting/dissolving/neither. | Cards move into lanes. Wrong lane shakes gently, then corrects. |
| 6:35-7:00 | Test handoff | Recap "cannot see it does not mean gone." | Final rule card and test unlock card. |

## Test Pattern

Each chapter gets 10 questions:

- 3 direct concept questions
- 2 misconception questions
- 2 evidence/reasoning questions
- 1 safety question where relevant
- 1 model-limit question where relevant
- 1 transfer question using a new example

Use the current Chemistry test structure exactly: `prompt`, `options`, `answer`, `concept`, `feedback`.

## Animation QA Translation

For every 5+ minute chapter, the render source must include a timestamped visual-action list. At minimum:

- one action every 3 seconds during narration
- no label before the object or model exists
- no particle dots before Chapter 8
- no visible steam labelled as water vapour
- no scene with only a static summary card for more than 6 seconds
- every checkpoint or test-handoff card must include an action the learner is about to take

## Fable Review Questions

Ask Fable to review:

- Is each chapter long enough to feel like real training while staying age-appropriate?
- Are there any weak or misleading science claims?
- Are the misconception corrections strong enough?
- Does the sequence still work now that each chapter is at least 5 minutes?
- Are any chapters too advanced for Grade 3/4 even as extension?
- Are the animation beats varied enough to avoid static screens in 3-second QA?
- Which comments must be applied before media generation?
