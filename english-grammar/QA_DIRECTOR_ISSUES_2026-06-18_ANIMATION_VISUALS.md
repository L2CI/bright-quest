# Grammar Animation QA Director Issues - 2026-06-18

Scope: second-pass visual and learning-flow audit after the audio-clock issue log. This list focuses on missing board animation, wrong reveal order, and containment/spillover.

## Issues

| Severity | Timestamp | Scene | What Viewer Sees/Hears | Why It Feels Wrong | Likely Root Cause | Proposed Fix | Status |
|---|---:|---|---|---|---|---|---|
| High | 0:00 | Nouns, Number, Gender And Case | Board opens with the "Number" box as the first meaningful visual. | Narration starts by explaining what nouns are, but the drawing jumps straight to a subtopic. | Custom noun board had no intro phase for person/place/thing/idea. | Add an intro noun phase, then reveal number, gender/case, and apply phases in order. | Fixed |
| High | 0:22 | Nouns, Number, Gender And Case | Number, gender, and case can all feel present too early as one finished board. | Learner gets too much taxonomy at once. | Step 1 custom board was not beat-gated like Step 2/3. | Gate noun sub-sections with `beat-number`, `beat-case`, and `beat-apply`. | Fixed |
| Medium | Multiple | Step 1 custom boards | Some labels are long for their chalk boxes. | Text can look squeezed or spill beyond the intended container, especially on tablet-sized layouts. | SVG `text` elements had no width fitting or wrapping inside `wordBox`. | Add a fitted SVG text helper and use it in `wordBox` labels. | Fixed |
| Medium | Seeking/rewind | Custom boards | Jumping to a later beat can restart local stroke animations instead of showing the expected completed beat state. | Visual state can lag behind the selected timestamp. | CSS stroke animation is time-based rather than state-rendered for seeks. | Future fix: deterministic static render for seek/resume, live stroke animation only for forward playback. | Open |
| Medium | 0:48+ | Sentence Machine | Maya example appears, but custom Step 1 architecture differs from Step 2/3 phase model. | Course feels inconsistent from module to module. | Step 1 uses bespoke SVGs; Step 2/3 use generic phase wrappers. | Future fix: migrate all Step 1 boards to shared phase wrappers. | Open |
| Low | Multiple | Grammar studio advanced scenes | Earlier phase scaffolding remains faintly visible during apply. | Final board can feel visually busy. | Cumulative phase display keeps all previous phases at 0.9 opacity. | Future fix: fade nonessential scaffolding to 0.35-0.55 during apply. | Open |
| Low | Multiple | Board labels | Long phrases are fitted by horizontal compression rather than true multi-line wrapping. | Better than spillover, but not always as elegant as hand-laid text. | SVG single-line labels inside fixed boxes. | Future fix: per-box wrapped `multiText` for long labels. | Open |

## Fixes In This Pass

- Rebuilt the noun board so the first visual teaches noun categories: person, place, thing, idea.
- Added beat-gated noun phases for intro, number, gender/case, and apply.
- Added `fitText` and updated `wordBox` so labels stay inside their boxes.
- Added explicit CSS for noun phase visibility.
- Updated reusable whiteboard/animator skills with a QA director role and containment checks.
