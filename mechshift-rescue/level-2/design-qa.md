# Stormrail Shield Sprint — design QA

## Comparison inputs

- Approved visual contract: `mechshift-rescue/assets/level-2/stormrail-selected-keyframe.webp`
- Implemented comparison state: `qa-screens/mechshift-rescue/level-2/05-shield-impact.png`
- Combined comparison: `qa-screens/mechshift-rescue/level-2/reference-comparison.jpg`
- Viewport: 1440 × 900 CSS pixels at device scale factor 1
- State parity: active Shield Runner sequence with the convoy visible and the energy shield intercepting a lightning pulse

## Full-view comparison

The implementation preserves the approved sunrise-to-storm composition, floating-city depth, blue/orange rescue machinery, cyan energy language, dark glass HUD, bottom thumb controls, readable central play space, and strong shield-impact focal point. The implementation uses a wider game camera and smaller runner so three playable lanes, three carriers, lane telegraphs, and persistent controls remain readable during motion.

## Focused findings and fixes

1. **P0/P1 — none.** No missing core actions, broken navigation, unreadable primary content, or asset-loading failures remain.
2. **P2 — initial raster payload was too large.** Seven runtime PNG assets and the selected keyframe were converted to WebP without changing sprite dimensions or transparency. The complete Level 2 art and audio pack is now 2,686,571 bytes.
3. **P2 — shield-impact evidence was initially captured after the lightning cleared.** The QA capture was moved into the active impact window so the pulse, lightning, and shield response are reviewed together.
4. **P2 — legacy Level 1 QA used the former launch label.** The selector now targets the stable Level 1 launch control; the full Level 1 regression suite passes.
5. **Animation scanner — one medium heuristic flag.** The detected scene jump is the intentional child-safe hold overlay after a missed pulse. Dense frame review confirms the world remains present, the recovery instruction is readable, and control returns without a hard fail. No high-severity animation findings were reported.

## Coverage

- Desktop launch, all three briefings, every maths input, wrong-answer recovery, hints, physical coupler placement, lane controls, shield hold/release, safe-hold retry, Titan transform, completion, replay, and return link
- Tablet touch controls and short-landscape layout
- Portrait rotation guidance
- Keyboard control, pause/resume, sound mute/unmute, reduced motion, save state, console, page, network, and asset errors
- Motion sampling for runner gait, lane changes, convoy suspension, layered parallax, pulse telegraph, lightning/shield impact, and Titan Bridge finale
- Audio decode and peak check for three commander briefings and the soundtrack loop

## QA history

- Pass 1: 31 checks; two test-harness false negatives corrected.
- Pass 2: 37/37 Level 2 checks passed with zero captured errors.
- Final live button, audio, asset-download, and responsive rerun: 43/43 Level 2 checks passed with zero captured errors.
- Live Level 1 regression: 77/77 checks passed with 21 screenshots.
- Animation scan: 0 high-severity findings; one reviewed intentional safe-hold transition.

## Final result

passed
