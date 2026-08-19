# Physics 101 Chapters 4-6 release QA

Release: `physics-101-cinematic-lab-011`

## Delivery decisions

- Preserved the existing curriculum structure and 20-question chapter banks.
- Rebuilt delivery around one full-frame tactile apparatus per chapter: surface lab, vacuum chamber, and magnetic test bench.
- Used set-up, prediction, run, inspect, explain, transfer, misconception and exit beats.
- Changed the teacher voice to OpenAI `cedar`, with quieter evidence holds and stronger contrast at reveals.
- Used persistent labels, object-anchored arrows and large evidence callouts instead of decorative motion.

Research basis: OpenAI speech guidance, de Koning et al.'s cueing framework, Vanderbilt's educational-video synthesis, young-learner animation design research, and current Manim camera/transform documentation. Claude expert review was used as a bounded delivery critique.

## Completion repair

- Successful profile saves now record the returned cloud version.
- `STALE_PROFILE` conflicts fetch remote state, merge chapter completion and tests, then retry once.
- Portal cloud pulls preserve the union of local and remote Physics progress.
- Child, Journey and Parent counts use the six released chapters rather than a hard-coded single/three-chapter state.
- Same-name profile deduplication preserves the richer Physics test history.

## Three-pass media QA

1. Automated scanner: all three 205-second MP4s scanned with captions and timelines. Final result: zero high-severity findings; no black frames, freezes or missing-action defects.
2. Dense visual review: every chapter reviewed on 5-second contact sheets plus flagged-frame inspection. No clipping, collisions, illegible primary labels or science-model errors found.
3. Missed-issue pass: verified first and final frames, 12 unique visual beats per chapter, 20 questions per chapter, distinct media/caption/timeline assets, and 205-second audio/video alignment.

Medium scanner flags were human-reviewed. They correspond to information-rich prediction or evidence holds, including repeated stopping data, the vacuum landing comparison and labelled magnetic repulsion. These holds were retained deliberately.

All delivery videos remain 1920x1080 H.264 at 30 fps and use a two-pass encode below Cloudflare Pages' 25 MiB per-file limit. Master/delivery comparison sheets confirmed that labels, arrows, apparatus edges and photographic detail remain sharp at the player scale.

## Browser and data QA

- Muted Chrome: desktop 1440x900, tablet 834x1194 and mobile 390x844.
- Exercised all six chapter cards, play, pause/resume, rewind, stop, captions, timeline, chapter tests, retakes, course-map returns, both Bright Quest returns and browser Back.
- Exercised all six Parent review buttons; each popup opens missed answers first and shows selected answer, correct answer and teaching feedback.
- Verified no browser console errors, no broken images, no horizontal overflow and no undersized primary controls.
- Mocked versioned API regression passed successful save, stale merge/retry, chapter/test preservation, same-name dedupe and Parent cloud refresh.
