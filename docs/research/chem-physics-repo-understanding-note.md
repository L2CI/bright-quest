# Bright Quest Chemistry/Physics Repo Understanding Note

Date: 2026-07-06  
Scope: Phase 1 reconnaissance only. No implementation changes were made.

## Executive summary

Bright Quest is a static, browser-first Cloudflare Pages application with plain HTML, CSS and JavaScript modules rather than a React/Vite build. Existing Chemistry 101 is already integrated as a first-class training module through a standalone course page, structured JSON content, generated video/audio/caption assets, local/profile progress persistence, D1 profile sync and parent cockpit reporting.

Future chemistry/physics chapters should extend the current Chemistry 101 course architecture unless the approved design later requires a live programmatic chalk renderer. The safest near-term implementation path is to add structured chapter data, media or programmatic scene assets under `chemistry-training/chemistry-101-winter-2026/`, then update shell-level progress and parent cockpit assumptions only where counts, titles or review data change. The proposed six-chapter opening arc comes from the attached curriculum/design brief, not from an existing shipped six-chapter course.

## Current application structure

- Framework and build system: static HTML/CSS/JS served from the repository root. `package.json` contains utility scripts for `node serve-static.mjs` and Cloudflare Pages commands; no framework compiler is required for the current app.
- Hosting model: `wrangler.toml` configures Cloudflare Pages with `pages_build_output_dir = "."` and a D1 binding named `DB`.
- Main Bright Quest shell: `index.html`, `app.js`, `app-data.js`, `bright-quest-shell-merge.js` and `bright-quest-shell-merge.css`.
- Existing training modules: `maths-training/`, `english-grammar/`, `blackboard-focus-session/`, and `chemistry-training/`.
- Current Chemistry 101 course: `chemistry-training/chemistry-101-winter-2026/`.

## Existing Chemistry 101 architecture

- Course page: `chemistry-training/chemistry-101-winter-2026/index.html` provides a landing/card view, player view, video element, captions, controls, chapter map and chapter test panel.
- Runtime controller: `chemistry-training/chemistry-101-winter-2026/chemistry-101.js` fetches `data/chemistry-101-course.json`, derives asset paths for each chapter, manages chapter selection, media playback, closed captions, progress, completion and tests.
- Course data: `chemistry-training/chemistry-101-winter-2026/data/chemistry-101-course.json` stores course metadata, chapter ids/titles, learning outcomes, narration segments and test questions.
- Media convention: chapter assets are numbered as `chapter-01` through `chapter-05` under `assets/videos`, `assets/audio`, `assets/captions`, `assets/posters` and `assets/ui`.
- Progress model: browser local storage key `brightQuestChemistry101ProgressV1` stores per-profile chapter state. The active profile comes from `profileId`, `brightQuestActiveProfile`, or a `demo-student` fallback.
- Profile sync: completed chapter/test data is also copied into `brightQuestProfilesV2` under `profile.chemistry101Progress` and `profile.trainingCompleted`, then best-effort POSTed to `/api/profiles`.
- Parent cockpit: `bright-quest-shell-merge.js` reads the Chemistry course data, maps chapter ids/titles, builds Chemistry progress cards, links into the course with `profileId`, and shows chapter-test review popups.

## Physics architecture status

- No dedicated `physics-training/` course or Physics shell route was found during this pass.
- The current first-class science course is Chemistry 101 Winter 2026. It is matter-heavy, but the curriculum scan supports later Grade 3/4 physics strands around forces, magnets, light, sound, heat and simple electricity.
- Recommended v1 decision: keep the first six matter/chemistry chapters inside the Chemistry 101/opening science-course path, then decide before implementation whether later forces/energy chapters remain in the same course as "science foundations" or move to a separate `physics-training/` route.
- If Physics becomes a separate module, reuse the Chemistry course page contract, parent cockpit card pattern, progress persistence shape and test-review popup pattern rather than creating a second shell architecture.

## Animation, audio and text rendering

- Current Chemistry 101 uses rendered MP4 video as the main animated teaching surface. The page also uses matching MP3 teacher audio, VTT captions, JPG posters and generated chapter-card images.
- The UI exposes captions through the native text track plus a custom caption readout.
- The earlier `chemistry-training/lesson-1/` SVG/voice experiment exists separately and is currently a parked dirty path. It should not be used as the base for new implementation unless explicitly reopened.
- Future live chalk animation could be implemented with SVG/canvas/CSS, but that would be a new runtime path compared with the currently deployed Chemistry 101 video-course pattern.

## Content production pipeline status

- Existing Chemistry 101 assets behave like an external-rendered course: MP4 lesson video, MP3 teacher narration, VTT captions, poster JPG and chapter-card PNG are prebuilt and loaded by predictable chapter number.
- This reconnaissance did not find a complete, reproducible Chemistry 101 production script that regenerates the MP4/MP3/VTT/poster/card stack from a single source file. Treat the current production pipeline as manual or external until a later pass documents it.
- Repo voice-generation helpers such as `generate-game-voices.mjs` are useful precedent for audio workflow, but they are not a full Chemistry 101 lesson-rendering pipeline.
- If the next implementation uses programmatic chalk scenes, define a structured scene-data format first and generate captions, audio timings, tests and parent-review metadata from the same source to avoid drift.

## Media and deploy-size snapshot

- Current deploy-relevant repository content, excluding `.git`, `node_modules` and `qa-screens`, was approximately `207,204,669` bytes, or about 198 MiB, during this pass.
- Current Chemistry 101 MP4 files range from about 10.0 MB to 15.8 MB each. The five existing lesson MP4s together are about 60.7 MB.
- Current Chemistry 101 MP3 files together are about 10.3 MB. VTT caption files are small, roughly 3-4 KB each.
- The largest current Chemistry 101 video file observed was `chapter-02.mp4` at `15,823,675` bytes.
- Before committing to six more rendered MP4 chapters, re-check current Cloudflare Pages limits and repository/deploy behaviour. Those limits are date-sensitive and should be verified live before implementation.

## Progress, profile sync and parent-review contracts

- Local Chemistry progress key: `brightQuestChemistry101ProgressV1`.
- Local progress stores per-profile chapter state using the active `profileId`, `brightQuestActiveProfile`, or `demo-student` fallback.
- A chapter progress entry defaults to `watchedSeconds`, `completed` and `test`, then gains `completedAt` and latest `test` data after completion/test submission.
- Profile mirror: `brightQuestProfilesV2` stores `profile.chemistry101Progress` plus `profile.trainingCompleted["chemistry-101-winter-2026:<chapterId>"]`.
- Cloud sync endpoint: `functions/api/profiles.js` reads/writes D1 table `app_profiles`. The whole profile is stored as JSON in `payload_json`, keyed as `bright-quest:<profileId>`.
- D1 failures or missing `DB` binding return server errors, but the client treats profile sync as best effort. Local progress remains the immediate source of truth for the child workflow.
- Current new test feedback items include question number, prompt, concept, `selectedIndex`, selected answer text, `answerIndex`, correct answer text, feedback, correctness and a compatibility copy field.
- Parent cockpit review reconstructs older attempts from course JSON when possible. Older attempts may not contain the exact selected option, so future test schemas should continue storing explicit selected answer detail.

## Style conventions to preserve

- Chemistry 101 uses the Bright Quest/Winter Training card language: large course cards, compact status pills, professional rounded panels, icon chips, strong primary/soft button contrast and progress states.
- Bright Quest shell cards differentiate learning areas while preserving the same card anatomy and button treatment.
- Chemistry colours currently combine navy, cyan, gold, copper, green and chalk tones. New pages should avoid inventing a separate visual system.
- Navigation expectations are already in place: course page has Home, Cockpit and Back to Bright Quest paths; shell pages link into Chemistry with profile context.

## Curriculum inputs for synthesis

- Do not open with atoms, ions, equations or periodic-table memorisation. The curriculum baseline starts from materials, solids/liquids, heat, observable change and fair testing.
- Particles should be introduced as a simple explanatory model after observable evidence, not as photographs of reality.
- Misconceptions that need explicit storyboard treatment include dissolving vs melting, melting vs disappearing, heat vs temperature, gases as real matter, and force vs motion.
- Optional home activities must remain low-risk, parent-supervised and household-material based. App-only simulations should be used when a real demonstration would require heat, pressure, small magnets, batteries or chemicals.

## Where new chapters should be added

Recommended default for the first implementation batch:

- Add or revise chapter definitions in `chemistry-training/chemistry-101-winter-2026/data/chemistry-101-course.json`.
- Add matching chapter assets under `chemistry-training/chemistry-101-winter-2026/assets/` if continuing the rendered-video pattern.
- Update `chemistry-training/chemistry-101-winter-2026/chemistry-101.js` only where the number of chapters, runtime mapping, icons, checkpoints or new data fields require it.
- Update `bright-quest-shell-merge.js` only if parent cockpit title/count/review logic must know about new chapters or a new data structure.
- Update CSS only to support approved new controls, not to redesign the course.

## QA baseline for future implementation

- Serve the course locally and test with an explicit seeded `profileId`; avoid falling back to shared `demo-student` state during QA.
- Verify desktop and mobile layouts for the course landing, player, chapter selector, captions, tests and return paths.
- Complete at least one chapter, submit one test with wrong answers, then verify both `brightQuestChemistry101ProgressV1` and `brightQuestProfilesV2` update correctly.
- Open the parent cockpit Chemistry view and verify chapter status cards, review popup, wrong-answer ordering and profile-specific results.
- Check console errors and failed network requests. A failed `/api/profiles` call in local static mode is acceptable only if local/profile storage still behaves correctly and the failure is documented.
- If animation is programmatic rather than pre-rendered video, capture early, middle and final frames for each new scene and verify labels, captions and controls do not overlap.

## Likely implementation risks

- Chapter count assumptions: current UI and parent cockpit copy refer to five chapters and 50 questions. Adding six new chapters will require careful count/runtime/status updates.
- Asset naming: the current script derives chapter asset paths from chapter order. Any skipped number or non-video chapter type needs an explicit data model change.
- Progress compatibility: existing saved chapter ids must remain readable. New ids should not overwrite the current five Chemistry 101 chapter states.
- Parent review compatibility: recent parent cockpit work reconstructs older test attempts from course JSON and newer attempts store selected answer detail. Any new test schema must preserve that behaviour.
- Profile boundaries: keep per-child `profileId` propagation working and avoid falling back to shared demo state during QA.
- Parked file constraint: do not touch `chemistry-training/lesson-1/lesson-1.js` unless the user explicitly asks to revive that SVG lesson route.
- Media weight: adding six rendered MP4 chapters could increase repository and deploy size. If the approved storyboard favours live programmatic chalk animation, plan a reusable scene data/runtime before coding.

## Recommendation for next phase

Use the current video-course architecture as the baseline in the implementation plan, but let the curriculum/storyboard review decide whether the first six chapters are delivered as rendered videos or a new programmatic chalk scene player. Do not choose that implementation route until the curriculum synthesis, storyboards and external review gates are complete.
