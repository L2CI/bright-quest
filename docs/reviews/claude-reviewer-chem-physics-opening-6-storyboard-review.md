# Claude Reviewer Notes: Chemistry/Physics Opening 6-Chapter Storyboard

Date: 2026-07-06  
Reviewer skill: `claude-reviewer`  
Model reported by script: `claude-opus-4-8`  
Reviewed file: `docs/storyboards/chem-physics-opening-6-chapters-scene-by-scene.md`

## Verdict

Claude's concise verdict was that the storyboard is a sound, well-structured design artifact and close to implementation-ready, with strong pedagogy and safety thinking. The main risks identified were curriculum-code traceability, possible overreach in the heat/temperature chapter, and animation-transition assumptions that should be specified before build.

## Strengths called out

- Misconception-first structure is strong: each chapter names a child-like wrong idea and corrects it with evidence before a model.
- "Observe before model" sequencing is appropriate for this age band and is protected by production notes.
- Safety handling is conservative and consistent, including app-only treatment for steam/boiling/tasting risks.
- Animation grammar is coherent: stable lanes, late labels, separate heat and motion arrows, and no completed diagram at scene start.
- The reusable scene-data shape and QA checklist make the storyboard reviewable rather than purely aspirational.

## Priority findings

1. Curriculum traceability needed tightening. Claude flagged that curriculum codes should be verified against exact current source documents before implementation or parent-facing claims, and that shorthand inquiry ranges are not auditable.
2. Chapter 4's heat/temperature distinction risked being too abstract for Grade 3/4. Claude recommended keeping "temperature tells how warm" and "heat moves from warmer to cooler" while avoiding overloading the child with a secondary-level distinction.
3. Chapter 6 had an unclear status: it was labelled advanced extension but also looked like a core assessed chapter. Claude recommended deciding whether it is core or challenge/extension.
4. Chapter runtimes risked creep, especially Chapter 6. Claude recommended setting a runtime cap and splitting chapters if needed.
5. Some animation beats assumed morph/interpolation support. Claude recommended renderer-neutral wording or explicit engineering confirmation.
6. The scene-data `draw` field was underspecified. Claude recommended defining whether it references object IDs, stroke commands or primitives.
7. Minor: one checkpoint gave away the answer, and the teacher-voice pace spec was not measurable.

## Edits applied after review

- Added a storyboard note that curriculum traceability is design-level only and must be cross-checked against current ACARA, VCAA, NGSS and England documents before implementation.
- Replaced inquiry range shorthand in the storyboard and research scan with a requirement to map individual inquiry descriptors.
- Flagged Victorian code-version risk in the curriculum scan and made storyboard Victorian references provisional.
- Softened Chapter 4 to "temperature tells us how warm something is" and kept heat transfer as "heat can move from warmer things to cooler things."
- Added a chapter runtime target of 2:00 to 2:45 and shortened/reframed Chapter 6.
- Marked Chapter 6 as an advanced challenge/extension chapter, not a baseline Grade 3/4 claim.
- Replaced morph/loosen wording with redraw/transition wording that does not assume a specific renderer.
- Replaced the generic `draw: string[]` field with `drawObjectIds` and optional `strokeOrder`.
- Reworded the liquid-model checkpoint and teacher voice pace target.

## Remaining decisions before implementation

- Do a final live curriculum-code audit if the storyboard is used for parent-facing or school-facing claims.
- Decide whether the first production version uses pre-rendered MP4 assets or a programmatic chalk scene player.
- If programmatic, define the exact particle redraw/transition primitives and run early/middle/final visual QA for each scene.
