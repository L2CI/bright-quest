# Physics 101 Chapter 1 Release QA

Recommendation: GO

Build: `physics-101-pilot-001`

Route: `/physics-training/physics-101-advanced-grade-4/`

## What was tested

- Full 3:25 H.264/AAC lesson with 12 timed teaching beats, teacher narration and WebVTT captions.
- OpenAI transcription check across eight phrases distributed from the opening mystery to the final Cockpit Check cue.
- Course landing and map, Chapter 1 entry, lesson controls, 95% completion contract, test unlock, all 10 question screens, result and retake.
- Physics progress merge and save contract for `brightQuestPhysics101ProgressV1`, `physics101Progress` and `trainingCompleted`.
- Bright Quest child entry card and Parent Cockpit Physics route.
- Desktop 1440 x 900, tablet 834 x 1194 and mobile 390 x 844 in Google Chrome.

## Evidence

- `outputs/physics-101-qa/report.json`
- `outputs/physics-101-qa/desktop-landing.png`
- `outputs/physics-101-qa/desktop-lesson.png`
- `outputs/physics-101-qa/desktop-test-result.png`
- `outputs/physics-101-qa/tablet-lesson.png`
- `outputs/physics-101-qa/mobile-landing.png`
- `outputs/physics-101-qa/mobile-lesson.png`
- `outputs/physics-101-pilot-media/chapter-01-transcript.txt`
- `outputs/physics-101-pilot-media/qa-frames/`

## Results

- No horizontal overflow at any tested viewport.
- No broken images or controls below the 44 px primary touch target.
- Video remained 16:9 at all tested viewports and the generated artwork was never stretched.
- No browser console or network errors in the final run.
- The first visual pass found and fixed a long evidence-board heading, an incorrect apparatus background and the mobile start-overlay text layout.
- Voice completeness check passed with no missing anchor phrases.

## Deliberate scope

- Chapter 1 is live; Chapters 2-11 are clearly labelled `In production` and cannot be opened.
- Existing games and Chemistry runtime remain unchanged. The protected local Chemistry lesson file was not touched or staged.
