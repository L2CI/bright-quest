# Physics 101: High-Fidelity Build Plan

Status: **preproduction only — Kinetic Workshop selected; no runtime implementation or deployment**  
Prepared: 21 July 2026  
Companion course plan: `docs/design/physics-101-advanced-grade-4-plan.md`

## 1. Product promise

Physics 101 should feel like a premium animated science series made for an able Grade 4 learner: vivid enough to invite curiosity, calm enough to teach, and precise enough that the child can explain what the evidence proves.

The build keeps Chemistry 101's successful operating format—11 chapters, approximately 180 seconds per lesson, prerecorded teacher narration, optional captions, a ten-question test, selected-child progress and Parent Cockpit evidence—but raises the visible and audible standard.

The non-negotiable learning sequence remains:

> Observe the motion → identify the interacting objects → model the forces → test a prediction → justify a decision with evidence.

## 2. Experience architecture

### Course landing

- One decisive Physics hero, one primary action (`Continue chapter`) and one secondary action (`View course path`).
- A horizontal **Force Trail** communicates the 11-chapter journey as a connected sequence rather than a wall of equal cards.
- The current chapter is visually dominant. Completed chapters are quieter; the next chapter is inviting; later chapters remain legible without competing.
- At tablet width the trail becomes a vertical path with the current chapter centred and nearby chapters visible.

### Chapter path

- Eleven chapter markers grouped into three acts: **See Forces** (1–3), **Test Forces** (4–8) and **Engineer With Forces** (9–11).
- Each marker uses a unique scientific scene, not the same thumbnail with changed text.
- Progress, test score and locked/unlocked state are conveyed by label, icon and colour together.
- The capstone reads as the destination of the same course, not a separate game.

### Lesson player

- Preserve Chemistry's familiar controls: play/pause, replay, 15-second rewind, scrubber, optional captions, chapter selection and return path.
- The lesson video is the primary surface. Controls sit below it and never obscure diagrams.
- Chapter context is a narrow rail on desktop and a collapsible strip on tablet.
- The test remains a distinct post-lesson state, not an overlay on the animation.

### Test and recovery

- One question per screen with a visible `Question x of 10` position and no timer.
- Diagrams are given the largest area; answer choices use restrained rows rather than ten decorative boxes.
- Submission feedback explains the causal reason, identifies the relevant concept and offers a specific replay point when remediation is useful.
- A missed answer is framed as evidence to revisit, never as failure.

### Parent Cockpit

- Reuse the professional Bright Quest card and table conventions.
- Show chapter completion, latest and best scores, misconception tags and missed-answer explanations.
- Use a bright Physics identity within the existing system; do not create a separate parent-facing design language.

## 3. Lesson-frame layout designed before artwork

Every 1920 × 1080 master frame uses one stable composition grid. Generated imagery and animation must fit this grid; the interface must never stretch artwork to fill a device.

| Zone | Master-frame allocation | Purpose |
|---|---:|---|
| Orientation rail | top 9% | Short chapter/scene identifier; never a large title wall |
| Demonstration stage | centre-left 66% × 69% | One observable event at readable scale |
| Evidence lane | right 24% × 69% | Force arrows, meter, table, graph or before/after comparison |
| Caption-safe band | bottom 12% | Optional captions and essential labels; kept clear in every frame |
| Edge safety | 5% on all sides | Prevents tablet crops and player-control collisions |

The demonstration stage and evidence lane may exchange sides when the physical action demands it, but their visual roles stay stable. No frame may contain more than one hero action, one evidence model and three short labels.

The 24% evidence lane is only for a simple meter, two-value comparison or single-arrow model. A table or graph that cannot pass the tablet legibility test receives its own full-stage evidence beat; it is never miniaturised merely to preserve the grid.

### Responsive framing

- Desktop and tablet landscape use the complete 16:9 composition.
- Tablet portrait uses the same uncropped master inside a letterboxed player; surrounding controls reflow rather than scaling the lesson text smaller.
- Posters use a deliberate 16:9 crop. Chapter cards use separately composed 16:9 art, never a squashed poster.
- All essential subjects remain inside the central 80% image-safe area.
- Master-frame labels are at least 40 px high, teaching-diagram strokes at least 4 px, and evidence text meets a minimum 4.5:1 contrast ratio.
- Final checks are performed on a real 10-inch tablet viewed at approximately 40 cm, not inferred from a desktop monitor.

## 4. Shared visual system

### Colour

Large areas stay airy and slightly muted; high-chroma colour is reserved for the active force, the current evidence and the learner's next action.

| Role | Colour |
|---|---|
| Deep anchor | midnight teal `#0B2633` |
| Main sky | clear azure `#3F9BFF` |
| Discovery cyan | `#45D6DF` |
| Applied-force gold | `#FFC857` |
| Friction/air orange | `#FF8A5B` |
| Gravity violet | `#9B7BFF` |
| Magnetic magenta | `#E45AA9` |
| Success mint | `#66D6A4` |
| Reading surface | warm cream `#FFF8E8` |

No scene uses every accent. The active concept receives one dominant accent plus at most two supporting colours.

The force lexicon also fixes line treatment: applied force uses solid gold; support solid cyan; friction solid orange; air resistance dashed orange; gravity deep violet `#6D4BEF` with long dashes; magnetism magenta `#D83798` with a dot-dash pattern. Colour, pattern and an object-pair label travel together.

### Typography

- UI and labels: **Atkinson Hyperlegible** or the closest locally available equivalent, with Inter as the system fallback.
- Display copy: a restrained geometric sans; no condensed military, novelty or comic fonts.
- Video title maximum: 54 px at 1920 × 1080; main diagram labels 42–46 px; supporting lesson labels never below 40 px.
- Labels are no longer than four words where possible and never sit over moving objects.
- A type-fit check rejects clipping, collision, single-word orphan lines and any label below the tablet readability threshold.

### Scientific drawing grammar

- Show the environment first, then the relevant object, motion, force arrow, evidence and label—in that order.
- Force arrows retain the approved course-wide colours and always identify both interacting objects.
- Arrow length is comparative only within a scene. Colour is reinforced by a label and line pattern.
- The rubber-band force meter is the recurring measurement instrument.
- Surfaces and objects have tangible material cues—rubber, felt, timber, metal, grass—without photoreal clutter.

## 5. Three visual directions for comparison

All three directions use the same Chapter 4 moment—an identical cart crossing smooth tile and textured mat—so the choice tests visual treatment rather than content.

### Selection decision

On 21 July 2026, the user selected the second displayed keyframe: **Kinetic Workshop**. It is now the primary visual target.

The production refinement must preserve its tactile timber-and-powder-coated apparatus, real measurement hardware and hands-on experimental character while correcting the sample's density risks:

- brighten and simplify the surrounding workshop;
- remove small repeated pegboard insets;
- reserve the full stage for complex evidence;
- protect the bottom caption band;
- keep labels at or above the tablet-safe minimum;
- use only a few background tools, softly separated from the lesson action;
- preserve the cart, force meter and material surfaces as stable recurring assets.

### Sunlit Discovery Studio

An airy near-future science studio with a warm cream floor, cyan daylight, sky-blue architecture and gold active-force cues. Objects feel beautifully manufactured and tactile. The evidence lane resembles translucent museum glass rather than a floating dashboard. Mood: optimistic, premium and welcoming.

Representative keyframe: `docs/design/assets/physics-101/sunlit-discovery-studio.png`

Explored but not selected. Its airy light and generous spacing may inform the Workshop refinement without replacing its tactile identity.

### Kinetic Workshop

An angled workbench stage with rich timber, powder-coated blue tools and precise physical models. Measurements appear as integrated bench markings and a compact pegboard evidence lane. Motion is more mechanical and energetic, but the frame stays editorial and uncluttered. Mood: hands-on, inventive and capable.

Representative keyframe: `docs/design/assets/physics-101/kinetic-workshop.png`

**Selected visual direction.**

### Field Evidence Expedition

A cinematic real-world environment—playground, path or test track—with a bright sky, natural surface texture and restrained translucent evidence overlays. The lesson feels like a filmed scientific investigation, while clean illustrated arrows preserve conceptual clarity. Mood: adventurous, grounded and story-led.

Representative keyframe: `docs/design/assets/physics-101/field-evidence-expedition.png`

Explored but not selected. Its surface-lane idea remains available as a controlled Workshop test rig.

The selected direction becomes the visual target. Any preferred elements from two directions are recombined into one final style frame before implementation.

### Fable design test

Claude Fable recommends a **Studio–Workshop hybrid**: keep the Sunlit Studio's bright stage and hierarchy, replace its translucent evidence glass with the Workshop's physical measurement apparatus, remove the ornate title rail, and use the Expedition's surface lanes only as occasional controlled props. Fable rejects the outdoor Expedition as the primary 11-chapter system because background competition and a detached dark evidence ribbon are difficult to solve consistently.

The user subsequently selected Kinetic Workshop. The hybrid was not adopted as the primary direction, but its non-conflicting safeguards now shape the Workshop refinement: brighter spacing, physical rather than floating evidence, strict type/contrast rules and a reduced density of small insets. The full bounded critique is recorded in `docs/reviews/fable-physics-101-visual-directions-review.md`.

## 6. Voice, diction and soundtrack plan

### Audition before production

Create three separate 35–45 second auditions using the same Chapter 1 excerpt and unchanged beat timings:

1. warm, energetic `coral` teacher using the approved long-lesson Bright Quest profile;
2. `coral` with slightly deeper, calmer authority and more varied sentence endings;
3. warm `onyx` baritone with clear Australian-friendly diction and no military or trailer cadence.

The user selects one voice before Chapter 1 is rendered. The selected voice identity, prompt and cache version are then locked across all 11 chapters.

### Diction bible

- Record approved pronunciation and stress for: *interaction, friction, gravitational, magnetic, resistance, variable, evidence, prediction,* and *investigation*.
- Prefer short clauses and concrete verbs. Target 140–155 spoken words per minute after final timing, with deliberate silence before evidence and label reveals.
- Use curiosity and contrast, not exaggerated pitch: “Watch what changes.” “Now compare the evidence.” “That result looks tempting—but is the test fair?”
- Avoid baby talk, game-announcer delivery, fake suspense and overlong rhetorical questions.

### Audio master

- Prerender narration with `gpt-4o-mini-tts`; do not call live TTS at lesson start.
- The stored MP3 is the master clock for video, captions, progress, seek and test unlock.
- Mix target: approximately −16 LUFS integrated, true peak at or below −1 dBTP, no audible clipping or sudden level shifts between chapters.
- Music is off by default. If a scene earns it, use one restrained motif at least 12 dB below narration, no lyrics, no persistent beat under reasoning-heavy explanations, and deeper automatic ducking around scientific terms.
- Browser speech is a tested fallback only. It must not silently change voice family between chapters.

## 7. Motion and transition direction

The hero moment is the instant the observable action and its evidence model become understandable in one glance. Each chapter is storyboarded around that frame before animation begins.

Reuse five motion motifs:

1. **Purposeful draw:** arrows and measures draw on in 600–900 ms after the interaction is named.
2. **Match-action cut:** the same object continues its movement into the comparison scene in 280–450 ms.
3. **Evidence settle:** a result lands in the table or graph with a short 400–650 ms ease-out.
4. **Diagram morph:** a real object simplifies into the corresponding model in 500–800 ms.
5. **Focus wash:** the periphery desaturates mildly while the misconception evidence is tested; overall luminance and label contrast do not drop.

Transitions never spin, bounce continuously, flash white or zoom through text. Ambient motion is limited to subtle environmental cues. No narration stretch may exceed eight seconds without a meaningful visual change.

The frame stays recognisable, but repetition is controlled through a small variation vocabulary: two approved camera distances, left-to-right or right-to-left hero orientation, one of four evidence instruments, chapter-specific props/surfaces, and restrained daylight changes. Force lexicon, frame zones, caption band, object identity and reveal order never drift.

Reduced-motion behaviour removes shell slides and parallax; lesson playback remains fully pausable, seekable and replayable.

## 8. Image and asset production pipeline

1. Approve one of the three representative keyframes.
2. Produce a final style frame with the chosen layout, palette, material finish, arrow grammar and tablet-safe crop.
3. Build an art bible for recurring objects, surfaces, instruments, icons, lighting, perspective and line weight.
4. Storyboard each chapter in six audio-led beats: mystery, demonstration, model, transfer, misconception trial and exit prediction.
5. Generate chapter-specific composition references and poster/card art with controlled prompts and fixed visual references.
6. Rebuild teaching-critical diagrams as deterministic animation primitives; generated raster art may support environments, posters and cards but must not be the sole source of labelled scientific truth.
7. Render MP4, MP3, VTT, poster, chapter card and timeline metadata as one versioned chapter bundle.
8. Validate every asset at desktop 16:9, tablet landscape and tablet portrait player sizes without stretching.

Each chapter requires: one hero environment, 3–5 main object models, force-arrow variants, one evidence visual, one misconception comparison, one poster, one unique chapter card and a reduced-motion shell state.

The art bible begins with two canonical sheets:

- a force lexicon specifying hex colour, line pattern, stroke, arrowhead and object-pair label;
- one fixed rubber-band meter asset and comparison-only wording: greater stretch means greater pull in this test. It never reports formal force units.

## 9. Build phases and decision gates

### Phase A — visual and audio lock

- Compare the three style keyframes.
- Select or combine one direction.
- Approve the final style frame, colour tokens, force-arrow sheet and typography scale.
- Audition and lock the teacher voice using the same timed excerpt.
- Prove the 180-second pacing on Chapter 4 before the visual system is declared scalable: orientation no more than 15 seconds, demonstration approximately 90 seconds, evidence approximately 45 seconds and consolidation approximately 30 seconds.

**Gate A:** user signs off visual target and voice target before runtime work.

### Phase B — Chapter 1 production packet

- Finalise the 180-second narration and pronunciation notes.
- Create a timestamped storyboard, hero frame and transition sheet.
- Author the 20–30 question bank and ten-slot test blueprint.
- Conduct a bounded Fable review for clarity, cognitive load and age-appropriate challenge.

**Gate B:** user reviews script, storyboard, five sample questions and voice audition.

### Phase C — isolated Chapter 1 pilot

- Create the Physics course shell by adapting Chemistry's operating contract, with Physics-specific IDs and data.
- Render and integrate only Chapter 1.
- Keep Parent Cockpit writes disabled until local profile-isolation tests pass.
- Run content, media-sync, accessibility, desktop and tablet QA.

**Gate C:** user tests the isolated pilot before Chapters 2–11 are produced.

### Phase D — course production

- Produce Chapters 2–10 in small reviewable batches.
- Build Chapter 11 only after earlier misconception evidence and capstone gating have been validated.
- Add profile sync and Parent Cockpit evidence after course-local progress is proven.

### Phase E — release candidate

- Complete all media, test-bank, profile, Parent Cockpit, accessibility, performance and visual QA gates.
- Commit only approved Physics/course integration files; preserve the parked Chemistry dirty file.
- Push and deploy only after explicit release approval.

## 10. Quality gates

### Visual

- Hero idea is understandable at the early, middle, misconception and final checkpoints.
- No text overlap, clipping, crushed type, accidental crop or stretched imagery at any target viewport.
- The active evidence is visually dominant; decorative detail never competes with it.
- Recurring objects retain identity, perspective, material and lighting across chapters.
- Every chapter card has a unique composition and remains readable at its smallest size.
- A revised Chapter 4 keyframe passes greyscale, tablet-at-40-cm, caption-collision, minimum-type and three-label checks.
- All 11 chapter hero frames read as one recognisable series when placed side by side.

### Motion

- Narration/visual drift remains below 300 ms at named beat markers.
- Important objects enter in meaning order.
- Pausing, seeking, replaying and resizing restore the correct completed visual state immediately.
- Transitions clarify comparison or causality and do not delay the learning point.

### Voice and captions

- No obvious start dead air, droning cadence, mispronounced science term or unexpected voice-family change.
- Pausing stops media cleanly and resuming continues from the correct beat.
- Captions match narration, fit within the safe band and preserve scientific terminology.
- Music never masks consonants, measurements or test instructions.

### Learning and testing

- Every chapter explicitly tests and replaces one misconception with visible evidence.
- At least four questions per attempt require two or more reasoning moves.
- Every distractor maps to a plausible child model or evidence-reading error.
- Parent Cockpit records the selected answer, correct answer, concept, explanation, attempt, latest score and best score for the selected child only.
- Before course-scale production, run a small consent-based target-age comprehension check on Chapter 4: the learner must identify which surface produced the longer distance and explain the role of friction. Visual appeal cannot override a failed explanation.

### Performance and safety

- Preload only the selected chapter's poster and metadata; lazily load its video/audio.
- Playback starts quickly on a mid-range tablet and supports byte-range delivery.
- No unsafe home experiments, flashing, jump scares, manipulative timers or open-ended child communication.
- Keyboard access, visible focus, 44 px touch targets, labels beyond colour and optional captions are verified.

## 11. Immediate next decision

The visual direction is now selected. The next design action, when approved, is one refined **Kinetic Workshop final style frame** that applies the tablet, density, evidence and caption safeguards, followed by the three-voice audition. Runtime implementation, course-media production, Parent Cockpit changes, Git push and deployment remain out of scope until the corresponding gates are approved.
