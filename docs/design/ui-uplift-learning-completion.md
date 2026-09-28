# Learning experience uplift — implementation and checks

28 September 2026. Plan items P06, P07 and the learning surfaces in P05.

## Implemented

### P06 — tests, writing and results

- Added `learning-experience-uplift.js` and `.css` as a presentation layer. The root page must load them after the existing styles/scripts.
- Compact test header, timer and progress; removed repeated decorative art from the live question area. Answer targets remain at least 44px high.
- Moved the existing complete question navigator into a native **Questions** disclosure. Current question, answered status, all numbered targets and the original jump handler are retained. Selecting a question closes the disclosure and focuses the question prompt.
- Displays **Save & leave** when the lead-owned draft adapter is available. No draft logic is reimplemented in this layer.
- Writing retains the original textarea and save handlers, with an explicit accessible label.
- Results keep original scoring, outcome text, stars and reward/training actions. The evidence list now includes all saved question statistics, including correct answers and writing, in compact expandable rows.
- Result filters separate Incorrect, Unanswered, Correct and Writing. A selected answer index of zero is treated as an answer. Full prompts, original responses, correct answers, explanations and recorded seconds appear in the expanded detail. Summary previews are shortened; their full source text remains in the detail.
- **Back to Today** uses the child navigation adapter when the new child shell is active, preventing the previous exam-catalogue route from reopening under an incorrect button label. The original return handler remains available when that shell is inactive.
- The timer no longer announces every second through a live region. Visible urgency and timing logic remain unchanged.

### P07 — learning players

- **Chemistry:** one collapsed chapter chooser above the current player. All eleven chapters have unique numbered full titles, their current completion/test state and original navigation. Choosing a chapter closes the chooser and returns keyboard focus to its summary. Playback, rewind, stop and captions are together directly below the video/timeline. The full course map remains available. Runtime wording uses the existing per-chapter runtime values (about 53 minutes of video), replacing the fixed 74-minute statement.
- **Grammar:** moved all three ladder steps into the existing Lessons drawer above its scene list. Switching steps retains keyboard focus within the drawer. The unchanged board, audio-driven animation and timeline share a frame with Play and Rewind. Captions remain available below. The existing modal drawer, Escape, focus trap and lesson switching are retained.
- **Physics:** retained the established video/timeline/player layout. Reduced oversized landing art and heading spacing; kept the original skater artwork. Cleaned white surfaces, blue primary controls and focus styles. The duplicate Course map control is hidden only in the player header; the in-player Course map button remains visible. Replaced “Cockpit Check” interface copy with “Chapter check”.
- **ICAS P06 amendment:** full question navigation now sits in a native Questions disclosure, initially collapsed. The compact phone title/timer brings the question forward. Answered/flagged states, every jump target and original save/scoring/timing logic remain; a jump focuses the prompt and typed answers update the count. Save & leave retains the existing confirmation dialog and draft handler.
- **Focus Studio:** aligned the page title with its catalogue name and compacted the phone header into a brand/return row plus a small learner badge. All board dimensions, teacher/audio logic, lessons and teaching controls are unchanged.

### P05 — visual rules

Learning surfaces use white/light panels, restrained shadows, clear typography, blue actions and gold focus indicators. Chemistry keeps its teal identity and chapter illustrations; Grammar keeps its green board and drawn teaching scenes; Physics keeps the illustrated workshop. Phone layouts prioritise the activity and control row. Reduced motion is respected.

## Preservation boundaries

No changes to `app.js`, root scoring, course bank JSON, narration, video/audio assets, caption files, course/test IDs, local-storage keys, profile payloads, API contracts, unlock gates or lesson clocks. `chemistry-training/lesson-1/lesson-1.js` is untouched.

Course presentation changes are limited to labels, read-only runtime summary, chapter chooser state and keyboard focus. Root presentation functions read saved records; they do not write, delete, recalculate or migrate them.

During integration review, the lead authorised a targeted Chemistry identity safeguard: removed the automatic copying of the unmapped `demo-student` history into every empty named child's progress. The legacy bucket and any previously copied named-child records remain untouched. Existing merges between device/profile records for the same explicit child ID are unchanged. Parent presentation exposes legacy device history separately without assigning it to a learner.

## Checks completed by learning agent

- JavaScript syntax checks passed for the new presentation script and all three touched course scripts.
- `git diff --check` passed for the three course directories.
- Reviewed course script diffs: no save/progress/gate/timing code changed.
- Retained the Physics release marker in its script URL so the existing release QA recognises the content release independently of the UI cache version.
- Reviewed HTML structure: each existing player ID appears once after moving controls, and every JavaScript element reference retains a corresponding element.
- Lead's phone visual check confirmed the first core-test answer at y=388 on a 390×844 viewport, with all four answers and Next visible (previously the first answer began at y=1098).
- QA agent's preservation suite passed 32/32, including the Chemistry identity safeguard: no legacy chapters copied to a new named child; legacy bucket and previously attributed chapters/metadata retained; same-child device/cloud merge preserves maximum watch time and the newest original test.

## Integration checks owned by lead/QA agent

- QA agent will exercise result record integrity, including long prompts/writing and selected answer zero.
- Lead will run responsive visual/interaction QA for question positioning, native disclosure keyboard behaviour, result filters, Chemistry chapter picker/playback/captions, Grammar drawer/ladders and Physics return paths.
- Existing shell-based browser scripts were not run by the learning agent because the lead owns browser work through the supported browser interface.
- This file records implementation and static checks; visual/timing regression results must be recorded in the main completion log before release claims.

## Owned files

- `learning-experience-uplift.js`, `learning-experience-uplift.css`
- `chemistry-training/chemistry-101-winter-2026/index.html`, `chemistry-101.js`, `chemistry-101.css`
- `english-grammar/index.html`, `english-grammar.js`, `english-grammar.css`
- `physics-training/physics-101-advanced-grade-4/index.html`, `physics-101.js`, `physics-101.css`

The later P06 amendment also changes `icas-prep/index.html`, `icas-prep.js`, `icas-prep.css`; the Focus Studio consistency pass changes only `blackboard-focus-session/index.html` and its stylesheet. No game, parent, root index or shared shell files were edited by this agent.

## Final integration review

- Reviewed the current learning script diffs and the PIN recovery helper/endpoints. No blocking integration defect found.
- Changed JavaScript syntax checks passed. The recovery API suite passed 12/12, including the local HTTP routes and imports. The current preservation suite passed 38/38, including complete result evidence, draft boundaries and Chemistry identity isolation.
- Verified the root presentation layer loads last, changed module assets use refreshed cache versions, and the Physics content release marker remains intact.
- Confirmed the parked Chemistry lesson, question banks, audio/video and caption assets have no changes.
- No separate ICAS logic/API suite exists. Its existing browser runner and external transcription script were not run; the lead owns the current ICAS browser checks. The transcription assets are unchanged.
- Production PIN recovery remains disabled until the additive migration, sender configuration, secrets and real delivery verification are completed. All recovery tests used fictional families and captured or mocked mail.

## Painted artwork integration amendment

The user requested proper graphics in place of geometric decoration. The lead extended this agent's ownership to `bright-quest-child-experience.js` and `.css` for that presentation work.

- Mapped the eight learning categories to distinct painted scenes in `assets/ui/illustrated-worlds/`; Today uses the discovery treehouse or Chemistry scene. Earlier lessons reuse their appropriate subject scene.
- Reused each subject scene in My Journey. Its banner now uses the voyage painting, with the existing numerical star total presented clearly beside its label.
- Reused real Beacon Brigade and Sparkbound previews, the clean Mechshift city scene, and existing painted scenery for the three earlier games.
- Scenes fill the catalogue's 3:2 art areas. Phone Today retains actions before a 200px image. Removed the decorative oval and inset pictogram presentation. All text stays outside the artwork.
- Removed the result celebration pictogram; score, rewards and evidence remain intact.
- Navigation, actions, search/filter logic and learner state are unchanged. No auth, parent, shared-shell, teaching board or media files were edited in this amendment.
- JavaScript syntax passed. The lead owns asset encoding/copy, root cache versions and browser review; asset existence/preservation checks follow when all nine scene files are available.
