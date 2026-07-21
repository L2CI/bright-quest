# Mechshift Rescue design QA

## Scope

- Reference: `docs/design/assets/bright-quest-mechshift-rescue-keyframe.png`
- Build: `/mechshift-rescue/` plus the Bright Quest landing, signup, child nomination, and one-game catalogue flow
- Evidence: `qa-screens/mechshift-rescue/`
- Viewports: desktop 1440 x 900, landscape tablet 1180 x 820, short landscape phone 740 x 320, portrait guidance 390 x 844

## Reference comparison

The build keeps the approved painted cinematic direction: the same cobalt-and-orange city, Relay-7 silhouette, child pilot, storm light, deep sky layers, and clear foreground roadway. The start and completion states use the approved keyframe directly; playable states use matching generated raster views for Rover, Lift, and Bridge forms. The combined reference/build comparison is recorded in `design-compare-reference-vs-build.jpg`.

## Visual review

- App-store-quality opening composition, readable mission title, one dominant CTA, and no decorative card clutter: passed.
- Relay-7 character identity, camera perspective, lighting, proportions, and icon treatment remain consistent across all three forms: passed.
- Play space remains readable over the painted environment; HUD uses controlled cobalt, cyan, amber, and lime signals: passed.
- Capacity, power, and timeline systems are visually distinct and legible without becoming separate quiz slides: passed.
- Completion has a clear rescue payoff, saved reward, replay, and Bright Quest return path: passed.
- Signup, first-name-only nomination, and the one-game catalogue follow the surrounding Bright Quest professional UI: passed.

## Interaction and accessibility

- Keyboard driving plus large split-thumb press-and-hold controls, three-form transformation, pause, audio, captions, reduced motion, recovery hints, and replay: passed.
- All visible controls meet the 44 px target; visible buttons have accessible names: passed.
- Touch drive controls are at least 88 x 68 px, sit on opposite device edges, and do not overlap the objective or transform controls: passed.
- No horizontal overflow on desktop; landscape tablet renders correctly; short-phone canvas and painted assets preserve equal X/Y scale; portrait shows rotation guidance: passed.
- Wrong choices recover in place and do not shame or end the mission: passed.
- Every stage opens with three compact mission orders that name the required form, driving/action sequence, and the follow-on maths interaction: passed.
- Commander Nimbus briefings are prerecorded OpenAI TTS media with visible replay, transcript-equivalent orders, AI-voice disclosure, and mute/pause handling: passed.

## Functional and performance checks

- 77 automated browser checks passed with no page exceptions, console errors, or failed required responses.
- All three multi-step Grade 4 systems and the completion save were exercised end to end.
- The original 20-second `Skybridge Rescue Shift` loop was composed from an OpenAI-generated score specification, rendered locally, compressed to a 243 KB Opus game asset with WAV fallback, and verified at runtime with voice ducking.
- Production game art uses compressed WebP assets; the Phaser runtime is stored locally and requires no third-party CDN.
- Local Pages Functions/D1 verification passed: parent confirmation required, honeypot rejected, signup created, child nominated, and active child selected. Only synthetic local QA data was used.

## Corrections made during review

- Delayed the catalogue evidence capture until the shared entrance animation settles.
- Restored strong contrast to the catalogue mission banner after a later uplift stylesheet overrode its painted background.
- Corrected the capacity QA seating plan and removed redundant unreferenced PNG production copies.
- Removed the fixed 540 px mobile-height floor, compacted the start and mission-brief layouts for browser-bar-constrained landscape screens, and added regression checks for both launch buttons and the catalogue link.
- Replaced the small adjacent Left/Right buttons with picture-first split-thumb controls, added resilient pointer release handling, and moved the short-phone transform forms into a compact visual dock.
- Removed CSS canvas overrides and non-uniform transformation squashing; added uniform-scale and viewport-fit assertions for tablet and short-phone artwork.
- Switched short-landscape key art to aspect-safe right-side framing and sized the playable vehicle from both viewport width and height.
- Reduced drive speed, added automatic stopping at every rescue beacon, and locked Relay-7 in place until the child chooses the visible rescue action.
- Added a no-penalty wrong-form recovery button that switches to the required form, then reveals the actual mission action.
- Contained direction and objective labels at short-phone, tablet, standard desktop, and the reported 2048 x 1076 wide-screen viewport.
- Added automatic Stage 1, Lift, and Bridge briefing overlays, plus explicit “your mission” instructions inside all three maths systems.
- Reduced oversized title, briefing, challenge, result, equation, and number-entry typography without shrinking the touch targets.
- Added three OpenAI-generated baritone commander recordings, a replay control, a cinematic soundtrack, and one Sound control that governs voice, music, and effects together.

final result: passed
