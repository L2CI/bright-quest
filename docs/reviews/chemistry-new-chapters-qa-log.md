# Chemistry New Chapters QA Log

Date: 2026-07-06

Scope: Chemistry 101 Winter 2026 chapters 6-11 only. Physics is out of scope.

## Build Outputs

Generated assets:

- `chapter-06`: 338.6 seconds
- `chapter-07`: 323.8 seconds
- `chapter-08`: 328.8 seconds
- `chapter-09`: 321.2 seconds
- `chapter-10`: 313.6 seconds
- `chapter-11`: 343.8 seconds

Each new chapter is longer than 5 minutes and is followed by a 10-question chapter test.

## Animation And Voice QA

Voice:

- Reused the existing Chemistry teacher direction: OpenAI `gpt-4o-mini-tts`, voice `coral`, warm/brisk Grade 4-5 chemistry teacher.
- The motion rerender reused the existing generated voice files; only visuals were patched.

Automated scan:

- Scanner folders:
  - `outputs/qa-chemistry-new-chapters/scanner/`
  - `outputs/qa-chemistry-new-chapters/scanner-after-motion/`
- Objective failures: none found for black frames, blank frames, low-content frames, or freeze flags.
- Heuristic flags remain for generated timeline actions and visual-silence thresholds. Dense visual review showed progressive drawing, moving cues, and particle/model movement, so these are recorded as heuristic review prompts rather than objective blockers.

Dense screenshot pass:

- Extracted frames every 3 seconds.
- Contact sheets:
  - `outputs/qa-chemistry-new-chapters/contact-sheets-after-motion/`
- Spot-checked chapter 6 and chapter 9 sheets after patching.
- No obvious text/object intersections, clipped labels, caption/control overlap, or blank/static lesson screens were observed in the reviewed contact sheets.

Patch from QA Step 1:

- Added progressive item reveal, a moving chalk/evidence cue, pulsing emphasis, and second-based particle motion.
- Rerendered all six videos after the patch.

## Functional QA

Environment:

- Local static server on `127.0.0.1:4181`.
- Browser plugin could not reach local loopback, so QA used bundled Playwright with local Chrome executable.
- Screenshots: `outputs/qa-chemistry-new-chapters/browser/`

Checks passed:

- Chemistry route loads with 11 chapter cards and 11 tabs.
- Course copy shows 11 chapters and 110 questions.
- Chapter 11 navigation loads `chapter-11.mp4` and `chapter-11.vtt`.
- Chapter 11 test is locked before completion.
- Simulated video completion unlocks the test.
- Chapter 11 test renders 10 questions.
- Test submission stores score, selected answer text, correct answer text, answer index, concept, feedback, prompt, correctness, and profile progress.
- Parent Cockpit shows 1/11 watched, 1/11 tests submitted, and 110 questions.
- Parent review popup shows wrong answers first, selected answer, correct answer, and feedback.
- Mobile 390x844 route renders 11 cards without horizontal overflow and keeps Home, Cockpit, and Back to Bright Quest paths visible.

Screenshots captured:

- `desktop-course-map.png`
- `desktop-chapter-11-locked.png`
- `desktop-chapter-11-test-submitted.png`
- `desktop-parent-review-popup-loaded.png`
- `mobile-course-map.png`

Local-only caveat:

- The static QA server returns 404 for `/api/profiles`; this is expected for local static hosting and is handled by the app as best-effort cloud sync. It is not a Chemistry regression.

## Status

Local QA passed for the requested Chemistry chapter expansion after the animation motion patch.

Claude Reviewer / Opus:

- First review requested more evidence because the initial packet summarised content but did not include full scripts and quiz items.
- Expanded packet was generated with all chapter scripts and all 60 quiz items.
- Claude Reviewer verdict on the expanded packet: launch-ready with minor polish; no science, safety, answer-index, feedback contradiction, or progression blockers.
- Claude flagged that all authored quiz answers use index `0`; runtime verification confirmed `orderedOptions()` rotates display order while preserving source answer indexes.
- Rendered correct-answer display distribution across chapters 6-11: position 1 = 15, position 2 = 16, position 3 = 15, position 4 = 14.

Post-Claude edits applied:

- Chapter 6 raincoat distractor changed from an early "melts easily" distractor to "lets light through".
- Chapter 9 thermometer prompt changed from recognition wording to concept-transfer wording.
- Chapter 9 warm-hand/cool-cup prompt removed the potentially confusing word "first" and tightened feedback.

Status: ready for commit/deploy QA, with `chemistry-training/lesson-1/lesson-1.js` still parked and excluded.
