# Physics 101: Advanced Grade 4 Course Plan

Status: **design and validation only — no runtime implementation approved**  
Prepared: 21 July 2026  
Proposed course ID: `physics-101-advanced-grade-4`

## 1. Product decision

Build a new 11-chapter Bright Quest Physics course focused on **forces, motion and scientific evidence**. It will use the same learner-facing format as Chemistry 101: short prerecorded animated chapters, stored teacher narration and captions, a 10-question test after each chapter, resumable child-profile progress, and detailed Parent Cockpit review.

“Advanced Grade 4” means deeper reasoning within the Year 4 domain. It does **not** mean importing Year 5 light, Year 6 circuits, secondary-school formulas, Newton units or a formal mass-versus-weight lesson.

The through-line is:

> Observe motion → identify the interacting objects → model the forces → test a prediction → use evidence to justify a decision.

## 2. Chemistry parity contract

| Area | Physics requirement |
|---|---|
| Course size | 11 numbered chapters |
| Lesson duration | 180-second target per chapter, matching Chemistry’s `durationTarget: 180` |
| Lesson media | Prerendered MP4 with matching stored teacher MP3, VTT captions, poster and chapter-card artwork |
| Player | Course landing, chapter map, chapter tabs, play/pause, replay, 15-second rewind, timeline, optional captions and return path |
| Completion | Save watched seconds; complete at 95% watched or video end |
| Test | Ten four-option questions served after chapter completion; retakes allowed |
| Feedback | Score, correct/missed state, concept tag and a concise explanation for every response |
| Child progress | Device record plus selected-profile merge and `/api/profiles` sync |
| Parent Cockpit | Course progress, chapter scores, test dates, missed answers and concept-level follow-up |
| Delivery | Browser/tablet first; no live AI dependency during playback |

Physics will improve retake integrity while preserving the same visible test format: each attempt still contains ten questions, but those questions are drawn from a balanced 20–30 item chapter bank.

## 3. Curriculum foundation

Primary alignment:

- **AC9S4U03:** identify how forces can be exerted by one object on another and investigate the effect of frictional, gravitational and magnetic forces on the motion of objects.
- **AC9S4H01:** examine how people use data to develop scientific explanations.
- **AC9S4H02:** consider how people use scientific explanations to meet a need or solve a problem.
- **AC9S4I01–I06:** question and predict; plan fair and safe investigations; make formal observations; use tables, simple column graphs and models; evaluate fairness and conclusions; communicate using scientific vocabulary.

The course deliberately uses AC9S4I04’s force-arrow, distance, table and column-graph opportunities as part of the Physics content rather than placing inquiry in a separate methods unit.

## 4. Advanced difficulty model

Every chapter climbs the same five-rung reasoning ladder:

1. **Notice:** identify the relevant motion or interaction.
2. **Name:** identify the two interacting objects and the force family.
3. **Model:** interpret or complete the course’s qualitative force-arrow grammar.
4. **Predict:** decide what will change when one condition changes.
5. **Justify:** use a diagram, measurement, table or graph as evidence.

Advanced questions must require at least two of these moves. Difficulty comes from separating variables, interpreting evidence and rejecting plausible misconceptions—not from unfamiliar vocabulary.

### Scope rules

- Maximum three genuinely new science terms per chapter.
- No calculations with Newtons, acceleration or mechanical advantage.
- No formal mass/weight distinction.
- Tension may be named once in the capstone as “the rope’s pull”; it is not a tested term.
- Pulleys are deferred. Ramps and levers share one testable idea: less force requires more distance.
- Every distractor must represent a plausible child model or a specific evidence error.

## 5. Course-wide visual grammar

### Force arrows

- Arrow direction shows the direction of the force.
- Arrow length shows relative strength **within the current scene only**.
- Every arrow is labelled with both objects, for example `grass on ball` or `Earth on book`.
- Arrows never appear before the narration names the interaction.
- Colours remain stable across all chapters:
  - applied force and rope pull: gold;
  - support force: cyan;
  - friction and air resistance: orange;
  - gravity: violet;
  - magnetic force: magenta.
- Still objects may show forces; “not moving” must never be represented as “no arrows.”

### Measurement proxy

Chapter 3 introduces one reusable rubber-band force meter. Greater stretch in centimetres represents a greater pull in the investigation. This provides a concrete, Grade 4-safe measurement for tables and graphs without introducing Newtons.

## 6. The 11 chapters

| # | Chapter | Learning target | Misconception to defeat | Animated hero demonstration | Test emphasis |
|---|---|---|---|---|---|
| 1 | **Force Is An Interaction** | Identify a push or pull between two named objects; separate contact from non-contact interactions. | “Force is a thing stored inside an object.” | Two skaters press palms and glide apart; the scene freezes to identify both interacting objects before the labelled arrows appear. | Object pairs, push/pull, contact/non-contact. |
| 2 | **Motion Tells The Story** | Use before-and-after evidence to explain starting, stopping, speeding up, slowing down or changing direction. | “The kick’s force stays inside the ball and gradually runs out.” | One identical ball rolls across tile, short grass and thick carpet. The foot’s arrow disappears after contact; the surface-friction arrow remains. | Motion evidence, stopping distance, stored-force misconception. |
| 3 | **Push, Pull And Support** | Model applied and support forces and use the rubber-band meter as a relative measure. | “Tables and floors do nothing; they merely get in the way.” | A book visibly squashes a foam block; the support arrow grows as the block springs back. A cart pull introduces the meter. | Support, applied force, arrow direction, scaled readings. |
| 4 | **Friction Grips** | Explain how friction between touching surfaces can help or hinder motion; plan a fair surface test. | “Friction is always bad.” | Split screen: a shoe slips on ice but grips on bitumen; a cart then travels different distances after the same launch. | Surface comparisons, changed/measured variables, useful friction. |
| 5 | **Gravity Pulls** | Explain gravity as Earth’s non-contact pull and distinguish gravity from air resistance. | “Gravity needs air” or “gravity switches off when something floats.” | Animated vacuum chamber: a ball and feather fall together when air is removed, then compare with open air. | Earth-object interaction, force direction, gravity versus air. |
| 6 | **Magnets Push And Pull** | Predict attraction and repulsion, identify magnetic materials and use distance evidence. | “Magnets attract every metal.” | A magnet sorts a mixed pile; steel moves while aluminium and copper do not. Two ring magnets then repel. | Poles, material evidence, distance, attraction/repulsion. |
| 7 | **Forces Team Up** | Use two or more qualitative arrows to decide whether motion will change. | “If an object is still, no forces act.” | A tug-of-war freezes at equal pull; one arrow lengthens and the flag begins to move. A book-on-table example restores balance. | Balanced/unbalanced qualitative models, direction, still objects. |
| 8 | **Air Pushes Back** | Explain air resistance as a contact force and investigate the effect of shape/surface area. | “Heavier objects always fall faster.” | Two sheets with identical mass—one flat, one tightly balled—are dropped together, followed by a fair parachute comparison. | Same mass/different shape, controlled variables, fall-time data. |
| 9 | **Machines Trade Force For Distance** | Explain how ramps and levers can reduce the needed force by increasing distance moved. | “Machines create free force.” | Rubber-band-meter readings compare a straight lift with a long ramp; a long lever lifts the same load with a smaller reading but a longer hand path. | Force/distance trade-off, diagram comparison, design choice. |
| 10 | **The Broken Experiment** | Diagnose unfair tests, improve a procedure, read tables/graphs and justify a conclusion. | “The biggest number proves the claim, even when the test was unfair.” | The teacher deliberately uses different carts, different pushes and one trial per surface. The animation becomes an evidence-board investigation. | Variables, repeats, anomalous results, graphs, conclusion strength. |
| 11 | **Rescue The Rover** | Integrate friction, gravity, magnetism, force arrows and evidence to select and justify a rescue design. | Integration rather than new vocabulary. | Two rescue designs fail for visible reasons. The video reveals constraints and evidence; the linked test lets the child engineer the third attempt. | Ten linked scenario questions forming one coherent engineering decision. |

## 7. Chapter animation template

Every chapter targets 180 seconds and uses the same audio-led beat structure:

| Time | Beat | Direction |
|---|---|---|
| 0–20 s | Mystery | Show one concrete phenomenon and ask for a prediction. No vocabulary wall. |
| 20–60 s | Demonstration | Animate the observable event at readable scale. |
| 60–105 s | Model | Build arrows, labels or a measurement progressively from the narration clock. |
| 105–145 s | Transfer | Apply the model to a new example, table, diagram or graph. |
| 145–170 s | Misconception trial | State the tempting wrong model, test it against evidence and replace it explicitly. |
| 170–180 s | Exit prediction | One concise prompt that prepares the child for the chapter test. |

### Animation direction

- Preserve Chemistry’s dark, restrained diagram-led rendered style and existing player shell.
- Use one hero composition per chapter; avoid slide decks and decorative card sequences.
- Draw the orienting object first, functional parts next, arrows after the interaction, labels last.
- Use camera movement only to clarify scale or comparison.
- Restore completed visual states correctly after seek, replay or resize.
- Prevent Chemistry’s known failure modes: oversized titles, text collisions, labels sitting on objects and long visually static narration stretches.
- Capture and review early, middle, misconception and final frames for every chapter.

## 8. Voice and caption specification

- Proposed voice profile: `physics-teacher-v1`.
- Prerecorded OpenAI TTS using the approved Bright Quest long-lesson voice pattern: `gpt-4o-mini-tts`, `coral`, playback rate 1.1.
- Direction: warm, energetic and precise; sound like a capable Grade 4 science teacher beside the learner, not a cartoon scientist.
- Short sentences should align with visual beats. Energy comes from rhythm and curiosity, not shouting.
- The audio/video timeline is the master clock for captions, animation state, progress, rewind and test unlock.
- VTT captions remain optional through CC and must preserve scientific terms exactly.
- Browser speech remains a tested fallback only; the voice family must not change unpredictably between chapters.

## 9. Test system

### Attempt format

- Ten four-option questions per attempt.
- Twenty to thirty authored items per chapter, organised into blueprint slots.
- Each attempt serves one item from each slot; retakes rotate variants while preserving difficulty and concept coverage.
- Options rotate deterministically without changing the correct answer.
- Unlimited recovery-oriented retakes; latest and best score both retained for Parent Cockpit.

### Blueprint per attempt

1. Two concept/object-interaction questions.
2. Two diagram or force-arrow interpretations.
3. Two application/prediction questions in new contexts.
4. Two fair-test, table, graph or evidence questions.
5. One named-misconception diagnosis.
6. One multi-step transfer/design decision.

At least four questions must require two or more reasoning moves. A score of 7/10 is “secure”; lower scores trigger a specific chapter revisit suggestion without shame language.

### Capstone rule

Chapter 11 becomes available after Chapters 1–10 have been watched and their tests submitted. The recommended mastery gate is 7/10 for each prior chapter, with a parent-controlled override to avoid an accidental dead end. This gate requires user approval during calibration.

### Example item standard

**A soccer ball rolls across grass, slows and stops. Why?**

- The force from the kick gradually runs out.
- Friction from the grass acts backwards on the ball. **(correct)**
- Gravity pulls the ball backwards.
- No force acts, so moving objects naturally stop.

The three wrong options diagnose stored-force, misdirected-gravity and no-cause stopping models.

## 10. Progress and Parent Cockpit model

### Proposed keys

- Local progress: `brightQuestPhysics101ProgressV1`
- Profile field: `physics101Progress`
- Course record: `physics-101-advanced-grade-4`
- Completion key: `physics-101-advanced-grade-4:<chapter-id>`

### Chapter record

```json
{
  "watchedSeconds": 174,
  "completed": true,
  "completedAt": "ISO timestamp",
  "test": {
    "score": 8,
    "bestScore": 9,
    "total": 10,
    "attempt": 2,
    "submittedAt": "ISO timestamp",
    "feedback": [
      {
        "correct": false,
        "concept": "friction-direction",
        "prompt": "Question shown to child",
        "selectedAnswer": "Child's answer",
        "correctAnswer": "Correct answer",
        "copy": "Short causal explanation"
      }
    ]
  }
}
```

### Parent Cockpit presentation

- Physics course card: completed chapters, tests submitted and next recommended chapter.
- Chapter grid: watched/completed state, latest score, best score and last attempt date.
- Review popup: missed answers first, followed by correct answers; show the child’s answer, correct answer, concept and explanation.
- Concept signals: interaction pairs, motion evidence, friction, gravity, magnetism, multiple forces, air resistance, machines and fair testing.
- Course insight: identify repeated misconception tags across attempts, for example “still means no forces” or “biggest number proves it.”
- Keep child profiles isolated and server-synchronised through the existing profile API. Do not store voice transcripts or new personal information.

## 11. Asset and implementation plan

Proposed runtime location:

`physics-training/physics-101-advanced-grade-4/`

Required course assets:

- `data/physics-101-course.json`
- `assets/videos/chapter-01.mp4` through `chapter-11.mp4`
- `assets/audio/chapter-01-teacher.mp3` through `chapter-11-teacher.mp3`
- `assets/captions/chapter-01.vtt` through `chapter-11.vtt`
- `assets/posters/chapter-01.jpg` through `chapter-11.jpg`
- `assets/ui/chapter-01-card.png` through `chapter-11-card.png`
- per-chapter timeline/beat metadata used by the renderer and QA tooling

Reuse the Chemistry course shell structurally, then replace IDs, copy, art theme, course data, progress namespace and Parent Cockpit subject adapters. Do not copy Chemistry-specific names into generic utilities.

## 12. Accessibility, safety and performance

- Full keyboard operation, visible focus and 44 px minimum touch targets.
- Optional captions, meaningful button names and no colour-only force distinction; labels and arrow patterns accompany colours.
- Reduced-motion affects shell transitions; the lesson video remains controllable with pause, replay and seek.
- No flashing, jump scares, unsafe household experiments or instructions involving mains electricity, heights, projectiles, fire or strong magnets near devices/medical equipment.
- Any optional physical activity uses ordinary safe objects and states adult supervision requirements where appropriate.
- Preload only current poster and metadata. Load current video/audio on chapter selection; do not preload all 11 chapters.
- Match or beat Chemistry’s media-delivery performance and support byte-range requests.

## 13. QA and acceptance criteria

### Content

- All 11 chapters align to AC9S4U03 and embed inquiry rather than adding unrelated Physics topics.
- Every misconception is stated, tested and corrected with visible evidence.
- No chapter introduces more than three new terms.
- Test items require only representations already taught.
- No joke distractors; every distractor has a documented diagnostic purpose.

### Media

- Eleven complete MP4/MP3/VTT/poster/card sets exist and match chapter numbering.
- Narration and visual beat drift stays below 300 ms at named checkpoints.
- No narration stretch exceeds eight seconds without a meaningful visual change.
- Early, middle, misconception and final frames are reviewed for overlap, clipping, visual silence and causal clarity.
- Captions match narration and scientific vocabulary.

### Course/player

- Chapter selection, play/pause, replay, rewind, seek, CC, resume and return all work on desktop and tablet.
- The test remains locked below 95% watched and unlocks correctly at/above the threshold.
- Progress restores to the correct child and chapter without cross-profile leakage.
- Ten questions are served per attempt; retakes rotate items while retaining blueprint balance.
- Latest/best scores and concept feedback survive reload and profile sync.

### Parent Cockpit

- Physics appears as a separate, professionally styled subject card.
- Completion counts, scores, dates and wrong-answer details match the child record.
- Missed-answer review works with the course-data fallback and with server-synchronised progress.
- No secrets, parent PINs or unrelated child data are exposed.

### Release gate

- Local automated QA, animation scanner, desktop visual QA, tablet landscape QA, console/network checks and production data-integrity verification must pass before release.
- The parked dirty file `chemistry-training/lesson-1/lesson-1.js` remains untouched and excluded.
- No push or deployment occurs without a new explicit approval after the pilot is reviewed.

## 14. Build and approval sequence

1. **Plan calibration with user:** confirm course depth, mastery gate and voice direction using the sample learner test.
2. **Chapter 1 preproduction:** final narration, 180-second beat sheet, hero frame, arrow grammar frame and 20–30 item bank.
3. **User test:** review narration, storyboard, voice audition and five representative questions before rendering.
4. **Pilot build:** render Chapter 1 media and wire it into an isolated Physics course shell; no Parent Cockpit mutation yet.
5. **Pilot QA:** animation director pass, media sync, accessibility, desktop/tablet and test-variant checks.
6. **User approval:** approve or revise the pilot before scaling.
7. **Course production:** create Chapters 2–11 using the approved template.
8. **Integration:** child card, progress sync and Parent Cockpit evidence.
9. **Full QA and release approval:** only then consider commit, push and live deployment.

## 15. Sources

- [Australian Curriculum v9 AC9S4U03 teacher background](https://www.australiancurriculum.edu.au/support-resources/background-information/science_teacher_background_information_AC9S4U03_E5)
- [Australian Curriculum v9 Year 3–4 primary scope and sequence](https://www.australiancurriculum.edu.au/media/7160/primary_scope_and_sequence_years_3-4.pdf)
- [Scootle AC9S4I04 force-arrow and data elaborations](https://www.scootle.edu.au/ec/search?acVersion=&accContentId=AC9S4I04&lom=true&q=AC9S4I04)

