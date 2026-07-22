# Physics 101 Chapter 1 Text-Overflow Report

Pre-patch status: **NO-GO**  
Post-patch status: **GO for release approval; not deployed**  
Build reviewed: `e74287c` / `physics-101-motion-002`  
Route: `/physics-training/physics-101-advanced-grade-4/`  
Video: `assets/videos/chapter-01.mp4` (1280 x 720, 3:25)

## Review method

- Extracted 102 full-resolution frames at two-second intervals across the complete lesson.
- Inspected seven 4 x 4 contact sheets and the full-resolution frames for every suspected containment failure.
- Cross-checked the affected states against the narration timeline and `tools/render_physics_chapter_01_motion.py`.
- Kept page-level browser layout separate from text rendered inside the MP4. The defect is in the rendered lesson frames, not responsive CSS.

Evidence: `outputs/physics-101-text-overflow-audit-2s/prepatch-e74287c/`

## Confirmed defects

| Severity | Approx. time | Sequence | Confirmed failure | Evidence |
| --- | ---: | --- | --- | --- |
| High | 16-32s | A Force Needs Two | The fixed-width `OBJECT A` and `OBJECT B` tags are laid out as a pair wider than the evidence panel. `OBJECT B` runs beyond the panel and the right edge of the video. | `frames/frame-013.jpg`, sheet 01 |
| High | 84-100s | Push or Pull | `HAND ON CART` and `ROPE ON TROLLEY` extend outside their individual bordered boxes. The labels and action words compete for the same vertical space. | `frames/frame-046.jpg`, sheets 03-04 |
| High | 118-136s | Contact or Non-contact | `NAME BOTH OBJECTS` exceeds its fixed status-row plate on the right. Other long rows sit too close to their borders. | `frames/frame-063.jpg`, sheets 04-05 |
| High | 136-153s | Test One Change | `CHANGE ONLY THE PUSH` and `MEASURE DISTANCE` exceed their row boxes. The longest line extends beyond the evidence panel itself. | `frames/frame-072.jpg`, sheet 05 |
| High | 153-171s | Repair the Explanation | `FORCE HIDES INSIDE` exceeds its red tag and becomes harder to read when the strike-through is drawn. | `frames/frame-087.jpg`, sheet 06 |
| Medium | 171-189s | Predict the Evidence | Long evidence rows use nearly all available width; the coloured marker circles sit outside their row plates and text touches the right boundary. | `frames/frame-091.jpg`, sheets 06-07 |

## Root cause

1. `status_row()` always creates a 3.05-unit plate but never scales or wraps its label to the available inner width.
2. `tag()` accepts an explicit fixed width but does not constrain the text to that width.
3. Some paired tags are arranged as a group without a maximum group width, so the group can exceed the 3.75-unit evidence panel or the video frame.
4. Text containment was not part of the previous two-second visual gate; the earlier five-second contact sheet and opening-state browser screenshots did not cover these transient states adequately.

## Build-source mismatch found during the patch pass

The first post-patch package was byte-for-byte identical to the faulty production video even though Manim had created a new true-motion render. The packager searched recursively for `physics-chapter-01-silent.mp4` and returned the first match, which was the stale output under `render_physics_chapter_01/`, instead of the newly rendered file under `render_physics_chapter_01_motion/`.

This explains why the committed motion renderer and the published MP4 did not match. The packaging path must be renderer-specific before the visual patch can be accepted.

## Patch requirements

- Introduce a reusable fit-to-box rule with explicit horizontal padding for every tag and status row.
- Cap paired-tag groups to the evidence panel's inner width.
- Keep a minimum visible gap between text and border; no glyph may touch or cross a plate edge.
- Shorten copy only where fitting it would make the type visibly smaller than the lesson's readability floor.
- Preserve the existing animation timing, narration, characters, palette and object motion.
- Select the silent render from the active renderer's exact Manim output directory; never package a first-match recursive result.

## Acceptance gate

- Re-render the complete lesson after the patch.
- Extract the complete render again at two-second intervals.
- Zero text or marker overflow across all 102 frames.
- Zero text touching a box border at full resolution.
- Titles and evidence labels remain readable when the video is displayed at 364 x 205 CSS pixels on a 390-pixel-wide phone.
- Re-run desktop, tablet and mobile browser checks after the video asset changes.

## Post-patch verification

Verified build: `physics-101-motion-003`  
Final video: 1280 x 720, 3:24.75, 19,994,107 bytes  
Final two-second evidence: `outputs/physics-101-text-overflow-audit-2s/postpatch-motion-003-final/`  
Animation scan: `outputs/physics-101-animation-qa-motion-003/20260722-124543-chapter-01/review-report.md`  
Responsive QA: `outputs/physics-101-qa/report.json`

| Acceptance check | Result |
| --- | --- |
| Complete 2-second extraction | Pass: 102 of 102 full-resolution frames reviewed across seven contact sheets |
| Original six overflow classes | Pass: all six resolved |
| Text and marker containment | Pass: no confirmed border crossings or clipped markers |
| Moving-object occlusion | Pass: instruction panels and tags remain above animated props |
| Renderer selection | Pass: builder now selects the exact `render_physics_chapter_01_motion/720p8/` output |
| Deterministic animation scan | Pass: zero high, medium or low flags |
| Desktop, tablet and mobile page QA | Pass: zero horizontal overflow, broken images, undersized primary controls or browser/network errors |
| Mobile lesson frame at 364 x 205 CSS pixels | Pass: verified at 145s and 183s with genuine decoded video frames |

The patch keeps the existing narration and scene timing while replacing the stale packaged render with the intended animated source. The release remains local until explicit deployment approval.
