# Mechshift Rescue Level 2 — Stormrail Shield Sprint

Status: selected for production on 30 July 2026. Visual truth: Product Design Option 1, `exec-1d5fd24f-7407-4488-bf5b-44ff105fb6d2.png`.

## Product promise

Level 2 is a genuine action sequel, not another vehicle sliding between quiz beacons. Relay-7 escorts three evacuation carriers through a lightning supercell. The child repairs the rail, calculates the shield reserve, actively protects the convoy, and completes a bridge-mech transformation.

The session remains safe and readable for a young transformer-loving player while the maths targets a capable Grade 4 learner. A normal first run lasts 8–12 minutes.

## Final design decisions

These decisions incorporate the bounded Fable review and one final Claude Opus adjudication.

- Phaser owns the moving world: parallax, sprites, lanes, convoy, camera, lightning, shield impacts and finale.
- DOM owns readable/tappable information: level select, mission brief, captions, maths manipulatives, large touch controls, pause and results.
- A thin event bus is the only bridge between the two layers.
- The child never hard-fails. A missed defence pauses the convoy safely, rewinds only the current wave, and resumes with a stronger telegraph.
- Numbers vary from pre-validated sets on replay. The structure and instruction language remain stable.

## Session

### Stage 1 — Charge the couplers

Relay-7 transforms into Mag-Claw form and locks three rail couplers into the junction.

Core problem: seven couplers hold 18 charge units each. Two damaged couplers lose 9 units each. The stabiliser needs 96 units.

`7 × 18 = 126`; `2 × 9 = 18`; `126 − 18 = 108`; `108 − 96 = 12 spare`.

The child enters the available charge, then drags three couplers into large world-aligned sockets. Incorrect couplers spark harmlessly and return to the inventory. Hints reveal one operation at a time.

### Stage 2 — Shield Sprint

The convoy auto-runs along three magnetic lanes. Relay-7 has three carriers and 171 shield units: `171 ÷ 3 = 57` per carrier. Each crossing consumes 17 units, leaving `57 − 17 = 40` reserve per carrier. That reserve powers four 10-unit shield impacts.

The child completes the allocation, then plays a 35-second protection run. Desktop uses Up/Down or W/S to change lane and Space to raise the shield. Tablet uses two large lane buttons under the left thumb and one large Shield button under the right thumb. Lightning always shows a bright ground marker, a rising audio cue and a safe reaction window before impact.

Motion priority:

1. Layered parallax and camera response.
2. Convoy wheel/bob movement and lane changes.
3. Relay-7 gait, suspension and weight shift.
4. Lightning telegraph, shield bloom and impact particles.
5. Short transformation finale.

Missed defence rule: the carrier shield catches the pulse, the convoy pauses, Nimbus says what to do, and the last four-second wave restarts at 70% speed. No civilians are shown in danger and no earned progress is lost.

### Stage 3 — Titan Bridge

Relay-7 unfolds into Titan Bridge form. Sections of 24 m, 18 m and 12 m total 54 m across a 52 m gap. The extra 2 m is explicitly the anchor zone.

The child chooses and orders the required actions: rotate deck (2 minutes), lock anchors (3 minutes), energise shield rail (2 minutes). A tempting re-scan (2 minutes) is unnecessary. The correct three actions take 7 minutes, leaving a stated 1-minute safety margin before the 8-minute storm deadline.

The physical finale uses three forgiving rotate/lock inputs. The camera settles into the selected hero composition as the carriers cross over Relay-7.

## Replay sets

- Coupler charge uses multipliers 16, 17 or 18 with validated damage/target pairs and a positive spare amount.
- Shield totals use 168, 171 or 174, all divisible by three; the crossing cost and active-run reserve are displayed and consumed physically.
- Bridge section triples are pre-validated to total exactly 2 m more than their gap; action choices always preserve one safe minute.
- Lightning lane patterns are seeded from three readable patterns, then remixed without reducing the minimum reaction window.

## Motion and safety

- The runner never flashes full-screen. Lightning luminance is capped and localised.
- Camera shake is short, low-amplitude and disabled by reduced motion.
- Reduced motion keeps playability: parallax becomes a slow pan, gait becomes a two-pose settle, impact becomes a shield colour change, and the finale uses a crossfade/lock sequence.
- Sound, captions and visuals each communicate the required form and next physical action.
- Music ducks under Commander Nimbus and never masks the lightning telegraph.

## Performance budget

- Level 1 loads as before.
- Level 2 artwork and audio lazy-load only after selection.
- Target Level 2 compressed payload: under 5 MB on first mission load; no uncompressed WAV in the normal browser path.
- Target sustained play: 50+ FPS on a representative Android tablet, with automatic particle reduction below 45 FPS.

## Acceptance criteria

- A first-time child reaches the first Level 2 interaction within 45 seconds and can state the required form/action from voice or captions.
- All arithmetic is internally consistent and every quantity has a visible game-world purpose.
- Shield Sprint includes lane changes, gait/suspension, convoy motion, telegraphed lightning, shield impacts and camera response; it cannot be implemented as a horizontal image slide.
- Every missed defence produces an understandable recovery within three seconds and never restarts the full level.
- Level 1 remains fully playable and its progress migrates without loss.
- Every primary button, keyboard control and touch control works at desktop, tablet landscape and short-phone landscape targets.
- No text clipping, overlap, squashed raster art, missing asset, console error or required-network failure remains.
- Design QA compares the selected visual and the implemented hero state at the same viewport and finishes with `final result: passed`.
- Local and live QA pass before the release is reported complete.
