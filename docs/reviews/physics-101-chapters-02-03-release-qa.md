# Physics 101 Chapters 2-3 Release QA

Release: `physics-101-force-lab-010`

## Scope

- Chapter 2: Motion Tells The Story
- Chapter 3: Push, Pull And Support
- Chapter-specific voice, captions, timelines, posters, cards, videos, and 20-question banks
- Physics player chapter switching and saved progress
- Parent Cockpit chapter summaries and wrong-answer-first review popups

## Science review

- Force arrows name the source and receiving object.
- The resting-book model distinguishes the book-on-foam interaction pair from the forces acting on the book.
- The motion investigation uses equal entry speed, repeated trials, and before/after evidence.
- Surface resistance is presented as a carpet friction/deformation model, not a stored force.
- Rubber-band stretch is explicitly a relative comparison measure, not Newtons.

## Animation QA

Pass 1 used `animation-qa-scanner` against both final MP4s with their VTT captions and JSON timelines. It found no high-severity issues. Medium `VISUAL_SILENCE_DURING_NARRATION` flags were inspected rather than accepted as defects.

Pass 2 reviewed five-second contact sheets and targeted full-resolution frames. This found and fixed hidden data labels, hidden motion dots, a speed-gate label overlap, and emphasis pulses that briefly obscured text.

Pass 3 reviewed every two seconds across both 205-second videos. Scanner-flagged stretches contain caption-aligned state additions, persistent step activation, comparisons, or callouts. Critical frames confirm hand-to-cart contact, correct support/weight arrows, readable data, and no blank or prototype media.

## Browser QA

`node tools/qa-physics-101.mjs` passed in muted headless Chrome.

- Chapters 1-3 opened their independent MP4, VTT, and timeline assets.
- Play, pause, resume, stop, rewind, captions, seek, course map, Bright Quest return links, and browser Back passed.
- Ten-question completion and retake passed for every chapter.
- Desktop 1440x900, tablet 834x1194, and mobile 390x844 had no horizontal overflow, broken images, or undersized primary controls.
- All media-level checks remained muted and Chrome used `--mute-audio`.
- Parent Cockpit showed all three chapter tests; every review popup opened and closed, displayed missed answers first, kept correct answers collapsed, and included selected answer, correct answer, and feedback.
- Browser console/network gate passed. The harness ignores only the expected localhost static-server fallbacks for `/api/profiles` and `/api/auth/config`; production requests remain errors.

Evidence is generated under `outputs/physics-101-qa` and `outputs/physics-101-chapters-02-03/qa`.
