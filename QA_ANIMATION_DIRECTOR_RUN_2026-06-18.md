# Bright Quest Animation Director QA - Run 1

Scope: English Grammar and Maths Training production lesson pages before GitHub push/live QA.

Method: local Chrome extension QA where available, DOM/layout inspection, syntax checks, and frame/timing review against the whiteboard-animation standard. This log intentionally separates first-run issues from the patch batch and second-run verification.

## Run 1 Issues

| ID | Severity | Area | Timestamp / Frame | What Viewer Sees Or Hears | Why It Feels Wrong | Likely Root Cause | Proposed Fix | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| QA-001 | High | Maths + Grammar timing | All animated beats | Board strokes can appear static, restart, or fail to complete cleanly while narration continues. | Audio and visuals feel out of sync even when the beat timestamps are roughly right. | Beat CSS classes were removed and re-added every animation frame, restarting CSS stroke animations. | Only reset/reapply beat classes when the active beat key changes; use audio currentTime as stable master clock. | Patched locally, needs live QA |
| QA-002 | High | Grammar Step 1, Sentence Machine | ~0:48, "Maya reads the comic" | Maya example appears late/early relative to the voice in some runs. | The learner hears the example before the board clearly changes. | Fallback beat for `example` was at 40s while caption/narration cue is at 48s. | Move the example beat to 48s and preserve beat classes until the next real beat. | Patched locally, needs live QA |
| QA-003 | High | Maths, Ducks And Rabbits | Model/calculation/final frames | Rabbit/duck labels and formula boxes collide with the animal lane; bottom answer can clip. | The board looks amateur and the learner has to untangle overlapping visual information. | Formula lane, animal lane, and label lane share the same vertical space. | Recompose into separate top formula lane, middle animal lane, lower group label lane; reduce animal complexity. | Patched locally, needs live QA |
| QA-004 | Medium | Maths navigation/layout | On scene selection | Clicking a scene can pull the scene list into view and push the board partly offscreen. | The blackboard stops being the centrepiece immediately after a lesson choice. | `scrollIntoView` on the active scene button scrolls the page, not just the right rail. | Replace with internal `sceneList.scrollTop` adjustment. | Patched locally, needs live QA |
| QA-005 | Medium | Maths responsive layout | Short Chrome QA viewport | Header/board can clip because the app was fixed to the viewport and page overflow was hidden. | On smaller or unusual windows the viewer sees controls/list without the full board. | `html/body overflow:hidden` and fixed-height app layout. | Allow vertical scrolling; keep horizontal overflow hidden. | Patched locally, needs live QA |
| QA-006 | Medium | Maths scene list | Course overview | Episode tabs show around 4-6 minutes per part, while user expected each top episode to feel like a fuller 15 minute session. | The information architecture reads as "only two/few lessons" or too short, even though there are 14 modules total. | Course is currently 14:18 total; scene list shows all modules but visible rail height reveals only part of it. | Do not block current push. Clarify labels as parts/modules; consider adding more modules later if a true 15 minutes per part is required. | Open |
| QA-007 | Medium | Maths, Excess And Shortage | Explanation beat | The topic still needs a clearer conceptual bridge from shortage/excess to "total gap". | Learner may memorize the trick instead of understanding the distance between two plans. | Current board jumps from plans to formula with limited visual bridge. | Future patch: add a number-line/gap bridge visual and one practice checkpoint. | Open |
| QA-008 | Low | Chrome QA tooling | Screenshot capture | Some Chrome screenshots timed out even while DOM/layout inspection worked. | Visual QA is slower and less reliable than desired. | Chrome extension/CDP screenshot command instability after tab/session restart. | Use DOM/layout checks plus live-page manual screenshot if needed; close sessions after use. | Open |
| QA-009 | Low | Grammar and Maths controls | Quiz sections | Interactive quiz can remain as-is for now. | User prefers not to overwork quiz if it is easier/better to leave it. | Quiz mechanics are less urgent than board sync and visuals. | Only fix clear timing defects; do not redesign quiz in this batch. | Accepted constraint |
| QA-010 | Medium | Maths + Grammar responsive layout | Live Chrome at ~1037px width | Training layout collapses to one column too early, so choosing a scene can leave the board above the viewport. | Tablet/desktop-ish windows should keep board and controls together. | Breakpoint was 980-1100px and board min width forced a single-column layout. | Keep two-column layout down to 900px with flexible board column and 280px side rail. | Patched locally, needs live QA |
| QA-011 | Medium | Maths + Grammar right rail containment | Live Chrome at ~1037px width | Scene list makes the right rail extremely tall instead of scrolling internally. | The stage becomes much taller than the viewport, making the board feel less like a focused training screen. | Right rail had no explicit viewport-constrained height in two-column mode. | Cap right rail height to available viewport and keep scene list as internal scroll. | Patched locally, needs live QA |
| QA-012 | High | Grammar timeline seek | Live Chrome at 0:48 via timeline | Board reaches `example` beat, but seeked text can remain invisible when not actively playing. | Rewind/timeline review should restore the board state immediately. | Grammar player had no `seeked` static-render class equivalent to Maths. | Add `seeked` state and CSS to force drawn paths/text visible after a timeline seek. | Patched locally, needs live QA |
| QA-013 | Medium | Maths Ducks And Rabbits | Live Chrome final frame | `one complete unit group` overlaps `1404 / 12 = 117 groups`. | The formula and teaching label compete in the same lower lane. | Lower label lane and discovery formula are too close. | Raise/shrink the group label and lower/shrink the formula box. | Patched locally, needs live QA |

## Patch Batch Targets

1. Preserve audio-clock beat classes until the beat actually changes.
2. Align Grammar Step 1 Maya example beat to the narration cue.
3. Recompose Maths Ducks And Rabbits to avoid accidental line and label intersections.
4. Keep scene-list scrolling local to the right rail.
5. Allow vertical scroll on Maths Training in short/tablet-like viewports.
6. Keep board and right rail side-by-side down to tablet-width layouts.
7. Constrain the right rail so lesson lists scroll internally.
8. Bump asset versions so Cloudflare fetches the changed JS/CSS.

## Local Verification After Patch Batch

- `node --check maths-training\maths-training.js`: passed.
- `node --check english-grammar\english-grammar.js`: passed.
- Local Chrome smoke QA:
  - Maths page loaded `maths-training.js?v=20260618f` and `maths-training.css?v=20260618f`.
  - English page loaded `english-grammar.js?v=20260618d` and `english-grammar.css?v=20260618d`.
  - Both pages rendered the blackboard in the viewport with no console errors.
  - Maths initial board active beat: `setup`.
  - Grammar initial board active beat: `intro`.

## Live Verification After Push

- GitHub commits pushed:
  - `cf8989f` - training animation timing and QA log.
  - `8926bc4` - tablet/two-column board visibility.
  - `1360d2a` - right-rail containment.
  - `68b2ff1` - targeted seek-state and Ducks/Rabbits spacing fixes.
- Live Cloudflare checks through Chrome:
  - Maths page served `maths-training.js?v=20260618f` and `maths-training.css?v=20260618h`.
  - English page served `english-grammar.js?v=20260618d` and `english-grammar.css?v=20260618f`.
  - Both pages rendered as two columns at approximately 1037px browser width: board column about 686px, side rail 280px.
  - Both pages kept the board visible in the first viewport and constrained the right scene list to an internal scroll area.
  - Live console error logs were empty for both pages.
- Second targeted live run:
  - English page served `english-grammar.css?v=20260618g` and `english-grammar.js?v=20260618e`.
  - Maths page served `maths-training.css?v=20260618h` and `maths-training.js?v=20260618g`.
  - Grammar at 0:48 reached active beat `example`, showed `Quick check: Maya reads the comic.`, `Maya`, `reads`, and `the comic`, and produced no visible text overlaps.
  - Maths at 2:23 reached active beat `apply`, showed the Ducks/Rabbits unit group and final formula, and produced no visible text overlaps.
  - Console error logs were empty for both pages.

## Current Status

- QA-001 through QA-005: patched and smoke-verified live.
- QA-010 and QA-011: patched and smoke-verified live.
- QA-012 and QA-013: patched, targeted local Chrome QA passed, and targeted live Cloudflare QA passed.
- Broad live Grammar board scan after `e58a4dd`: `english-grammar.css?v=20260618h` and `english-grammar.js?v=20260618f` served from Cloudflare, zero detected visible text overlaps/spills, and no console errors.
- Broad live Maths board scan: `maths-training.css?v=20260618h` and `maths-training.js?v=20260618g` served from Cloudflare, zero detected visible text overlaps/spills, and no console errors.
- Static voice asset coverage: 27 of 27 English Grammar lessons and 14 of 14 Maths Training lessons have local MP3 files present; no referenced lesson audio files are missing or tiny.
- Restore point evidence: clean restore backup exists at `C:\Users\gupta\OneDrive\Documents\New project 2\backups\bright-quest-restore-clean-20260618-162402`.
- QA-006 and QA-007 remain content/design backlog items, not regressions.
- QA-008 remains a tooling limitation: Chrome DOM/layout QA worked; screenshot capture was intermittent.
- QA-009 remains accepted by user: leave quiz interaction mostly as-is unless clear timing defects appear.

## Targeted Local Verification For Second Patch

- Grammar at 0:48:
  - Active scene: `The Sentence Machine`.
  - Active beat: `example`.
  - Board classes include `seeked` and `show-maya-example`.
  - Visible board text includes `Quick check: Maya reads the comic.`, `Maya`, `reads`, and `the comic`.
  - Visible-text overlap detector found no overlaps.
  - Console error logs were empty.
- Maths at 2:23:
  - Active scene: `Ducks And Rabbits`.
  - Active beat: `apply`.
  - Visible board text includes `one complete unit group`, `group total = 12`, `1404 / 12 = 117 groups`, and `answer: 117 rabbits`.
  - Effective-opacity visible-text overlap detector found no overlaps.
  - Console error logs were empty.

## Second Run Verification Plan

1. Local syntax checks: `node --check maths-training\maths-training.js` and `node --check english-grammar\english-grammar.js`.
2. Local Chrome QA:
   - Maths: Included Average, Ducks And Rabbits, Excess And Shortage, Pop Quiz.
   - Grammar: Sentence Machine at 0:48 Maya cue, Nouns intro/number cue, Recap Quiz cue sequence.
   - Check no visible label spills or accidental intersections on final frames.
3. Commit and push to GitHub. Complete.
4. Live Cloudflare QA. Complete for QA-012 and QA-013.
5. Update this log statuses after second run. Complete.
