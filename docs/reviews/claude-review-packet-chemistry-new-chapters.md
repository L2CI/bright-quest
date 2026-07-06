# Claude Reviewer Packet: Chemistry 101 New Chapters

Date: 2026-07-06

Request: Review the implemented Bright Quest Chemistry 101 Winter 2026 expansion for chapters 6-11 before production push.

## Scope

Implemented six new Chemistry chapters appended to the existing course:

1. Chapter 6: The Mystery of Stuff
2. Chapter 7: Solid, Liquid or Gas?
3. Chapter 8: Tiny Particles, Big Clues
4. Chapter 9: Heat Makes Particles Dance
5. Chapter 10: Melting Is Not Disappearing
6. Chapter 11: Dissolving Is Not Melting

Physics is out of scope.

## Delivery Surface

Kept the existing Bright Quest Chemistry runtime:

- Static Cloudflare Pages course.
- Video-first lesson player.
- MP4 video assets with teacher audio included.
- MP3 teacher audio files retained.
- VTT captions.
- Poster JPGs.
- Chapter card PNGs.
- Existing chapter card, tab, status pill, controls, test form, completion state, return paths, and parent cockpit patterns.

## Content And Pedagogy Constraints

Applied the prior Fable-style feedback:

- No particle dots before the particle-model chapter except app-level arrows for macroscopic gas movement.
- Visible mist is explained as liquid droplets; water vapour is invisible.
- Dissolving is not melting: sugar spreads through water; warm water can affect rate, but spreading is the story.
- Thermometer measures temperature; heat is energy transfer.
- Heat arrows are tied to contact/pathway and warmer-to-cooler direction.
- Heat particle model uses same dot colour; motion amplitude changes instead of inventing hot/cold particle colours.
- Sponge is treated as a tricky solid with air pockets.
- Freezer reverse mechanism explains heat moving away from water.
- Mass comparison and salt recovery remain app-only, not home experiments.
- Low-risk, household-material, parent-supervised framing.

## Runtime Lengths

All six new lesson videos exceed 5 minutes:

- Chapter 6: 338.6 seconds
- Chapter 7: 323.8 seconds
- Chapter 8: 328.8 seconds
- Chapter 9: 321.2 seconds
- Chapter 10: 313.6 seconds
- Chapter 11: 343.8 seconds

## Files Changed

Core course/runtime:

- `chemistry-training/chemistry-101-winter-2026/data/chemistry-101-course.json`
- `chemistry-training/chemistry-101-winter-2026/chemistry-101.js`
- `chemistry-training/chemistry-101-winter-2026/index.html`
- `bright-quest-shell-merge.js`
- `index.html`

New assets:

- `chemistry-training/chemistry-101-winter-2026/assets/audio/chapter-06-teacher.mp3` through `chapter-11-teacher.mp3`
- `chemistry-training/chemistry-101-winter-2026/assets/videos/chapter-06.mp4` through `chapter-11.mp4`
- `chemistry-training/chemistry-101-winter-2026/assets/captions/chapter-06.vtt` through `chapter-11.vtt`
- `chemistry-training/chemistry-101-winter-2026/assets/posters/chapter-06.jpg` through `chapter-11.jpg`
- `chemistry-training/chemistry-101-winter-2026/assets/ui/chapter-06-card.png` through `chapter-11-card.png`

Generation/support docs:

- `tools/build-chemistry-longform-chapters.mjs`
- `docs/storyboards/chemistry-new-chapters-longform-training-blueprint.md`
- `docs/reviews/chemistry-new-chapters-qa-log.md`

Parked dirty file not touched:

- `chemistry-training/lesson-1/lesson-1.js`

## Test Shape

Each new chapter has 10 questions with:

- `prompt`
- `options`
- `answer`
- `concept`
- `feedback`

The existing test submitter stores parent-review fields:

- selected index
- selected answer text
- correct answer text
- answer index
- concept
- feedback
- correctness
- prompt
- score
- total

## QA Evidence

Animation QA:

- Extracted 3-second screenshots for every new chapter.
- Generated contact sheets after motion patch:
  - `outputs/qa-chemistry-new-chapters/contact-sheets-after-motion/`
- Automated scanner after motion patch:
  - `outputs/qa-chemistry-new-chapters/scanner-after-motion/`
- No black, blank, low-content, or freeze objective flags.
- Heuristic timeline flags remain because the generated expected-action timeline is stricter than the simple renderer. Dense visual pass found progressive drawing and motion after patch.

Functional QA:

- Local browser QA used bundled Playwright with local Chrome after Browser plugin could not reach loopback.
- Screenshots:
  - `outputs/qa-chemistry-new-chapters/browser/desktop-course-map.png`
  - `outputs/qa-chemistry-new-chapters/browser/desktop-chapter-11-locked.png`
  - `outputs/qa-chemistry-new-chapters/browser/desktop-chapter-11-test-submitted.png`
  - `outputs/qa-chemistry-new-chapters/browser/desktop-parent-review-popup-loaded.png`
  - `outputs/qa-chemistry-new-chapters/browser/mobile-course-map.png`

Functional results:

- Course shows 11 cards and 11 tabs.
- Course copy shows 11 chapters and 110 questions.
- Chapter 11 loads the expected MP4 and VTT.
- Test locks until completion.
- Test unlocks after completion.
- Chapter 11 test submits and stores profile progress.
- Parent Cockpit summary shows 1/11 watched and 1/11 tests submitted for seeded QA state.
- Parent review popup shows wrong answers first, selected answer, correct answer, and feedback.
- Mobile 390x844 shows no horizontal overflow and has Home, Cockpit, and Back to Bright Quest links.

Known local-only caveat:

- Static local QA server returns 404 for `/api/profiles`; this is expected for local static hosting and is handled by the app as best-effort sync fallback.

## Review Focus

Please review for high-priority issues only:

1. Any serious Grade 3/4 science misconception or unsafe activity implication.
2. Any unacceptable issue in the six-chapter learning progression.
3. Any major mismatch between chapter content, quiz concepts, and parent review behaviour.
4. Any animation/voice risk that should block production, given that local QA found no objective blank/freeze issues but did record heuristic timeline flags.
5. Any launch-blocking UX issue in the 11-chapter course flow.

Please separate:

- Must fix before deployment.
- Should fix soon but can ship.
- Nice-to-have polish.
