# Sparkbound Launcher And Guided Duel

## Direction

An eight-year-old should recognise their hero, read the rival's preparation, and see why a counter worked. The first equipment reward should look and behave like a substantial fictional pulse launcher; the final kit must add real silhouette changes rather than a palette swap. Combat remains a simulated mech shield trial.

## Motion Beats

1. Introduce Relay, then Prism, with an on-scene focus marker.
2. Hold Prism's raised-arm charge until the learner chooses a shield.
3. Demonstrate the block and report its exact shield effect.
4. Show Prism recovering; let the learner take the opening.
5. Return to the saved match without spending its resources.
6. Forge rewards assemble the launcher, then armour and twin power cells.
7. Launcher attacks aim, charge, discharge, travel, and land in that order. Shield damage and impact sound occur at arrival, not at discharge.

## Acceptance Gates

- Desktop, tablet, small phone and landscape compositions remain readable and nonblank.
- Guided practice never writes simulated moves or answers to the API.
- First practice completion starts a real match only when no match exists.
- Returning learners can practise without changing their saved match or learning evidence.
- Pause, mute, reduced motion, skip, replay, settings and return paths work.
- Legacy equipment and question IDs remain compatible with saved progress.
- Future prompts use launcher terminology; historical question snapshots remain unchanged.
- Ranged attacks show a travelling bolt, muzzle flash and recoil, with one correctly timed impact.
- All three equipment silhouettes are visually distinct.
- Normal three-round gameplay, question answering and Parent review still pass regression checks.

## Verification

Browser checks use isolated local test data and muted Chromium. No production learner records were written. No subjective audio listening is claimed.

- Unit/domain/content/API: 130 tests passed, including historical snapshot preservation and 120 complete adaptive-policy wins.
- Final guided practice: 710 checks passed, zero failures or browser errors, 44 screenshots across 320x568, 390x844, 844x390, 1024x768 and 1440x1000. Evidence: `outputs/sparkbound-build/guide-qa-release/report.json` and `visual-review.md` in the parent workspace.
- Final duel regression: 199 checks passed, including six viewport sizes, all three equipment states, energy boundaries, supported answers and Parent review. Evidence: `outputs/sparkbound-build/duel-qa-launcher-final/report.json`.
- Full browser journey: three rounds, four learning tasks, victory, refresh, review, Back and reset retention passed, with zero browser errors. Evidence: `outputs/sparkbound-build/game-qa/report.json`.
- Audio: 35 checks passed, including 15 generated effects, a full victory run, 11 launch cues and silent pause/mute boundaries. Offline synthesis and muted Chromium only. Evidence: `outputs/sparkbound-build/audio-v2/report.json`.
- Launcher choreography: 22 scenario groups cover distinct equipment silhouettes, three viewports, aimed Shoot poses, projectile travel, discharge-before-impact, arrival-synchronised damage/cues, melee contact regression, a 20-exchange camera endurance run and reduced motion. Evidence: `outputs/sparkbound-build/launcher-qa/report.json`.

## Refinements From QA

- Fixed an invisible caption probe wrapping inside a narrow intent label, which incorrectly reserved half the tablet screen. Caption width is now stable. Minimum measured guide hero height is 158 px on tablet and 251 px on desktop, compared with 47-54 px before the fix.
- Removed the redundant round badge during guided practice and raised the phone charge label without moving Prism's HUD out of its right-hand column.
- Camera framing no longer retains the combined bounds of every animation in a long match.
- Repeated preview renders do not restart the same charging pose. Reduced motion uses a static charge light.
- Updated the regression scanner to compare independent text runs rather than flagging adjacent font boxes from the same naturally wrapped heading as separate overlapping elements. Existing viewport and control containment checks remain; screenshots were reviewed.

Final built assets verified by both guide and duel suites:

- `sparkbound/game.js`: `8b134e0a1b295053a703dd61b1ba5ecd2ac7075b5456f0f9d4575d2886da5197`
- `sparkbound/sparkbound.css`: `20624c6f4c6a8f9a446792b59915aed9adcb8ca85dbcb1acd77dfdde7861dd9f`

Scope limits: Chromium emulation, not physical iPad/Safari validation; no subjective listening; no signed-in production test writes. Existing saved question snapshots retain their original wording; newly created questions use launcher terminology.

## Release

Publication approved by the user on 6 September 2026. Release uses the established scoped GitHub main push followed by Cloudflare Pages' automatic build and live verification. The post-deployment receipt is recorded in `outputs/sparkbound-build/live/launcher-guide-deployment.md` in the parent workspace; a pushed commit alone is not deployment proof. No database migration or learner-progress reset is required.
