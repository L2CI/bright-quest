# Physics 101 Animation Fresh Review And Upgrade Plan

Date: 18 August 2026
Scope: `physics-training/physics-101-advanced-grade-4`
Canonical render: `assets/videos/chapter-01.mp4`
Source: `tools/render_physics_chapter_01_voice_directed.py`
Status: implemented and QA passed in release `physics-101-force-lab-008`

## Executive Decision

The module shell remains visually strong and the existing release evidence shows a sound responsive player, test flow, and controls. The animation is not ready to be the template for Chapters 2-11.

The central defect is structural: each 15-20 second scene executes most meaningful animation in roughly its first 4-7 seconds, then `finish()` fills the remaining narration with repeated translucent sweeps and static holds. The visual state therefore often arrives before the spoken referent, stops changing while the explanation continues, or clears before the relevant caption cue.

Rebuild Chapter 1 around caption-level beats while preserving the current narration, duration, visual direction, module UI, and route.

## Scope And Inventory

- The course defines 11 chapters, but only Chapter 1 is currently available.
- Only one canonical Physics lesson video exists: `assets/videos/chapter-01.mp4`.
- Video properties: 206.714 seconds, 1280 x 720, 24 fps, H.264/AAC, rendered with Manim Community 0.20.1.
- Review inputs: the canonical MP4, 73-caption VTT, 12-scene timeline JSON, Manim source, 2-second and 5-second contact sheets, and scanner evidence clips/screenshots.
- No prototype or dirty Chemistry video was included. The parked `chemistry-training/lesson-1/lesson-1.js` file remains untouched.

## Research Applied

The proposed direction follows these principles:

1. Temporal contiguity: present words and corresponding visuals together.
2. Spatial contiguity: attach labels and evidence to the object being discussed.
3. Functional cueing: use cues for selection, organisation, or integration, not decoration.
4. Coherence: remove motion that does not support the scientific explanation.
5. Segmentation: divide long explanations into meaningful micro-events and intentional prediction or inspection holds.
6. Transient-information control: keep important cues and evidence visible until the narration moves on.

Manim tools should support those principles: persistent overlays after `Indicate` or `Circumscribe`, `AnimationGroup`/`Succession` for semantic ordering, `ValueTracker` and updaters for continuous physical motion, `Create`/`Write` for concise construction, and `TransformMatchingShapes` where conservation or before/after correspondence matters.

## Fresh QA Result

Automated scan result:

- 0 high-severity render failures.
- 10 medium `VISUAL_SILENCE_DURING_NARRATION` spans.
- Flagged ranges: 00:21-00:29, 00:36-00:48, 00:55-01:04, 01:11-01:21, 01:30-01:40, 01:48-01:56, 02:02-02:14, 02:21-02:34, 02:41-02:52, and 03:14-03:26.

These are heuristic flags, but dense manual review confirms a real pacing problem across the full render. The translucent `lab_sweep()` is decorative motion and must not count as a meaningful visual event.

## Priority Findings

### P0: Narration And Animation Use Different Clocks

`finish()` computes unused scene time only after each handler has already run its complete animation sequence. It then alternates decorative sweeps with waits. The source has no caption-level `wait_until()` or cue-lifecycle contract.

Impact:

- visual events are commonly front-loaded;
- named referents are not actively highlighted when spoken;
- intentional-looking still frames mask timing errors;
- future chapters would repeat the same production flaw.

### P0: Contact-Force Sequence Contradicts Its Narration

In `push_ended()`, contact, arrows, separation, and the "contact ended" state complete well before the captions explain "while their palms touch" and "when their hands separate" at 01:10-01:17. This is a causal visual mismatch, not merely a pacing preference.

### P0: Prediction Pause Happens Too Early

In `predict()`, the three-part countdown begins near the start of the scene. Narration does not ask for the three quiet seconds until 02:58.6. The trial and evidence therefore risk revealing before the learner has received the full prediction prompt.

### P1: Short Emphasis Reverses Before The Voice Moves On

`Circumscribe` at lines 213 and 215 and `Indicate` at lines 296-297 are one-shot effects. The learner loses the target while the associated caption continues. Use the effect only to orient, then retain a surrounding shape, colour state, pointer, or dimmed-comparison state through the caption end.

### P1: Missing Spoken Referents

- The non-contact scene mentions gravity at 01:50-01:56 but never shows Earth or a gravity interaction.
- The classification scene repeats Earth pulling an object at 02:08-02:10 without an Earth/object example.
- The repair scene says other forces still act at 02:47-02:52 but shows no support, gravity, or resistive-force model.
- The fair-test scene explains confounded variables at 02:25-02:31 without showing an invalid comparison.

### P1: Relationship Labels Are Too Weak

The arrow scene shortens labels to "ON BLUE" and "ON ORANGE". The lesson's core idea is the interacting pair, so labels should retain both objects, such as "orange on blue" and "blue on orange", while clearly anchoring each vector to its receiving object.

### P1: Composite Images Limit Physical Explanation

The robot-plus-cart and robot-plus-trolley images move as single rigid pictures. That shows translation but not the hand/cart contact or cable tension changing. Separate the relevant object layers or add a visible contact/tension model that remains anchored during motion.

### P1: Magnet Repulsion Is Ambiguous

The carts move apart, but the facing poles are not explicitly identified. Add visible matching pole labels or another unambiguous repulsion cue so the direction is scientifically inspectable rather than inferred from decorative magnet icons.

### P2: Evidence Accumulation Is Underused

Several scenes reach a useful final state, but earlier evidence is discarded between scenes. Retain compact before/after traces, interaction-pair labels, and measurement marks where later reasoning depends on them.

### P2: Mobile Readability Is Marginal For Supporting Labels

The main composition survives tablet and mobile framing, but several 15-18 Manim font-size chips become small in the 364 x 205 CSS-pixel mobile player. Raise the master label scale and reduce copy rather than adding more chips.

## Scene-By-Scene Rebuild

1. **00:00-00:14 Watch the motion:** hold the still state through "both are still"; spotlight hands at 00:04.6; show contact at 00:06.1; move platforms during 00:06.1-00:10.2; retain before/after traces for the question.
2. **00:14-00:30 A force needs two:** reveal the blue-on-orange vector during its caption, then the simultaneous orange-on-blue vector during its caption; keep both vectors and full object-pair labels through "two different objects".
3. **00:30-00:48 Name both objects:** trace each arrow to its receiving object as named; retain target outlines until each sentence ends; then compare equal length and opposite direction with a shared baseline.
4. **00:48-01:04 Motion is evidence:** hold "before: still", animate "afterwards" only when spoken, then transform the two states into a compact measured-change strip; do not depict a force travelling through air.
5. **01:04-01:21 The push has ended:** stage the misconception first; show contact/arrows only during the touching caption; remove them exactly as hands separate; continue platform motion while a persistent "contact ended" state remains.
6. **01:21-01:40 Push or pull:** isolate and highlight hand-cart contact during "first bay"; change to a visibly taut cable and trolley during "second"; finish with two explicit object-pair labels.
7. **01:40-01:56 No touch required:** spotlight the gap, then show unambiguous like-pole repulsion and motion evidence; transition to a compact Earth-object gravity vignette for the final sentence.
8. **01:56-02:14 Contact or non-contact:** reveal the two-question decision tree one question at a time; highlight robot/cart, magnet/magnet, then Earth/object in narration order; finish by crossing out a strength gauge and retaining "touching chooses the label".
9. **02:14-02:34 Test one change:** lock same cart/track/start controls, change only arrow size when spoken, animate and measure distance in the same time, then show a contrasting invalid trial with multiple changed controls and ambiguous evidence.
10. **02:34-02:52 Repair the explanation:** keep the stored-push misconception until "No"; transform contact arrows into a time-ordered interaction-then-motion trace; finish with a restrained force model showing support and gravity still acting and any horizontal resistance explicitly identified.
11. **02:52-03:08 Predict the evidence:** present the full prompt first; run the three-second clock only during 02:58.6-03:00.8; hide outcome cues until "Now check"; reveal gap, both motions, and no hand one at a time with persistent checkmarks.
12. **03:08-03:26 Your physics move:** highlight each routine step only while spoken; assemble the three steps into a causal chain; finish on "force belongs to an interaction" with the object pair and relation visibly integrated.

## Implementation Plan

### Phase 1: Caption-Level Beat Sheet

- Extend the timeline with cue-level visual contracts: caption start/end, spoken referent, cue function, target IDs, onset, settle, hold-until, clear-at, and intentional-hold reason.
- Map all 73 caption cues; a cue may reuse a state, but every named object, property, comparison, or relationship must have an inspectable target.

### Phase 2: Timing And Emphasis Helpers

- Add `wait_until(global_time)` and scene-relative beat helpers.
- Add persistent focus helpers for spotlight/dim, object outline, object-pair arrows, evidence checkmarks, and state transfer.
- Remove `lab_sweep()` as a filler mechanism. Permit a sweep only as a meaningful transition between semantic phases.
- Keep one primary attention cue active at a time and retain it through the relevant caption end.

### Phase 3: Rebuild Twelve Scenes

- Rewrite each handler against the cue-level beat sheet.
- Separate or mask composite assets where contact/tension must be shown.
- Add Earth/object, invalid-fair-test, and ongoing-force visuals.
- Preserve the Kinetic Workshop art direction and existing narration/audio duration.

### Phase 4: Render And Scientific Review

- Render a low-resolution timing draft first and compare it to VTT cue boundaries.
- Review force-vector origin, direction, object pair, contact state, pole orientation, before/after evidence, and prediction integrity.
- Render the 1280 x 720 delivery master only after the timing draft passes.

### Phase 5: Three-Pass Animation QA

1. Automated scanner with MP4, VTT, and expanded timeline.
2. Dense 2-second and 5-second visual review plus targeted one-second strips around every emphasis hand-off.
3. Missed-issue pass covering inventory, referent mapping, cue persistence, decorative-only motion, mobile legibility, and source/delivery parity.

### Phase 6: Existing Module QA

- Do not redesign the UI.
- Verify landing, course map, Chapter 1 launch, play/pause, 15-second rewind, stop, scrubber, captions, test unlock, all ten test questions, result state, browser Back, course Back, and Bright Quest return path.
- Check desktop, tablet, and mobile; record console, network, broken-media, and overflow results.

## Acceptance Targets

- 0 objective render failures, black frames, or missing media.
- 0 `CAUSAL_VISUAL_MISMATCH`, `REFERENT_NOT_CUED`, or `CUE_CLEARS_EARLY` findings after manual review.
- 0 unmarked narration-active static spans over 8 seconds.
- No decorative-only motion used to satisfy cadence.
- 100% of 73 caption cues represented in the beat sheet.
- Prediction outcome remains hidden until the narrated check begins.
- All force arrows identify the interacting pair and receiving object; magnet pole setup is unambiguous.
- Supporting labels remain readable in the 364 x 205 mobile video viewport.
- Existing module controls, test flow, progress behaviour, and Bright Quest return path remain unchanged and pass browser QA.

## Evidence

- Scanner report: `outputs/physics-animation-review-fresh/20260818-103724-chapter-01/review-report.md`
- Scanner summary: `outputs/physics-animation-review-fresh/20260818-103724-chapter-01/summary.json`
- Dense contact sheets: `outputs/physics-animation-review-fresh/20260818-103724-chapter-01/dense-review/`

## Research Sources

- [Manim indication animations](https://docs.manim.community/en/stable/reference/manim.animation.indication.html)
- [Manim AnimationGroup](https://docs.manim.community/en/stable/reference/manim.animation.composition.AnimationGroup.html)
- [Manim ValueTracker](https://docs.manim.community/en/stable/reference/manim.mobject.value_tracker.ValueTracker.html)
- [Manim creation animations](https://docs.manim.community/en/stable/reference/manim.animation.creation.html)
- [Manim TransformMatchingShapes](https://docs.manim.community/en/stable/reference/manim.animation.transform_matching_parts.TransformMatchingShapes.html)
- [de Koning et al., attention cueing framework](https://link.springer.com/article/10.1007/s10648-009-9098-7)
- [Fiorella and Mayer, multimedia learning principles](https://doi.org/10.1017/9781108894333.019)
- [Spanjers et al., segmentation, pausing, and temporal cueing](https://doi.org/10.1016/j.compedu.2011.12.009)
