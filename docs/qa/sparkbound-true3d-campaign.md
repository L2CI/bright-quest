# Sparkbound True3D Campaign QA

## Status

PASS: 2,466 checks, zero unexpected errors. GO for this campaign-and-recovery
scope only, not an overall release approval. Hooke's separate volumetric matrix
and the integrating task's remaining release gates still apply. Models, runtime
and harness code were not changed by this QA task.

## Scope

- Exercise the shipped UI through all six campaign rounds, five upgrades and
  fifteen answered questions, including an intentionally wrong first answer,
  worked support, correction, acknowledgement and victory.
- Exercise current Applied, Stretch, Challenge and Master long-form tasks,
  numeric keypad, ordering and choice controls where present in the question
  bank, hints, readable worked steps and scroll preservation.
- Verify draft reload, completed-campaign reload, retry/support retry,
  intentionally failed save/reconnect and intentionally failed boot/reload.
- Inspect Parent evidence for all fifteen exact records, incorrect-first order,
  attempts, hints, assistance, difficulty and upgrade context.
- Verify review back paths, Parent Close/Escape/browser Back, reset cancellation,
  confirmed reset, archived evidence and retained wins.
- Leave the 66-model volumetric/inspection matrix to Hooke. This run uses the
  existing `--campaign-only` option; it does not repeat the full hero-selector,
  all-hero reset, practice, legacy-v2 or settings-preference matrix.

## Environment

- Start: 2026-09-11 08:08:37.714 UTC (18:08:37 Australia/Sydney).
- Finish: 2026-09-11 08:14:48.316 UTC (18:14:48 Australia/Sydney).
- Elapsed harness run: 6 minutes 10.602 seconds, including screenshot/test waits.
- Installed x64 Node v24.16.0; headless installed Google Chrome launched with
  `--mute-audio`; Playwright from the bundled dependency directory.
- Existing file-based `tools/qa-sparkbound-expansion.mjs`; no stdin module or
  inline Miniflare entry point was used.
- Localhost-only QA server, ephemeral Miniflare D1 (`d1Persist: false`), synthetic
  family/child capabilities, no production database, credentials or account data.
- Windows child-process escalation approved for the test run.
- Rules version: 4. Six viewport dimensions: 1440x1000, 1024x768, 390x844,
  320x568, 430x932 and 844x390. Touch-device emulation is not part of this run.
- Parent review is opened through the actual review module with a synthetic
  parent capability. The full Parent portal sign-in/unlock journey is out of scope.

```powershell
$env:NODE_PATH = 'C:\Users\gupta\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:BQ_NODE_MODULES = $env:NODE_PATH
& 'C:\Program Files\nodejs\node.exe' tools/qa-sparkbound-expansion.mjs --bundle-ready --campaign-only
```

The first attempt used bundled ARM Node v24.19.0 and failed before harness startup
with `Unsupported platform: win32 arm64 LE` in `workerd/lib/main.js`. The installed
x64 Node matches the repository's `workerd-windows-64` package and starts correctly.
This environment mismatch is not a product finding.

## Build Identity

- Bundle SHA-256:
  `63cc3ba171214f6ed446bc07285adb280e67a9c8b3b56eda0e76238fe53e946e`
- Campaign harness SHA-256 at launch:
  `e27cf1581bb1eef18363b514cbaf4404c4a9f21960bf6bee8d38dd86bd4117b1`
- Local server harness SHA-256 at launch:
  `4df02febd2ff609c5704f402a6fb0fd1387462a13a338b90d302c9b6570370b9`
- Models were frozen before this run. No bundle build, harness edit, model
  regeneration, commit, push or deployment is performed by this task.

The owner added the narrow synthetic-boot diagnostic classification before launch.
The deliberate `Synthetic boot outage` diagnostic is expected only while the
failure fixture is enabled; unexpected browser/asset errors still fail the run.
All three hashes above matched again after completion. The harness also asserted
the bundle hash at the end. No live rebuild changed the tested application.

## Evidence

Evidence is written by the existing harness to
`../../../outputs/sparkbound-build/expansion-campaign-qa/`.

Only files modified during this run count as evidence. This directory also
contains earlier runs, so old screenshots or reports must not be read as current.
The final [report.json](../../../outputs/sparkbound-build/expansion-campaign-qa/report.json)
supplies exact start/finish times, bundle hash, all 2,466 individual passed checks,
unexpected errors and intentionally injected errors. This run produced 157 fresh
PNG screenshots. Older files in the same directory are excluded from this result.

Representative screenshots visually inspected after capture:

- [Small-phone worked support](../../../outputs/sparkbound-build/expansion-campaign-qa/v4-level-2-numeric-small-phone-worked.png)
- [Master form in landscape](../../../outputs/sparkbound-build/expansion-campaign-qa/v4-level-5-numeric-landscape-worked.png)
- [Desktop round 1](../../../outputs/sparkbound-build/expansion-campaign-qa/round-1-desktop.png)
- [Small-phone round 6](../../../outputs/sparkbound-build/expansion-campaign-qa/round-6-small-phone.png)
- [Landscape completed learner review](../../../outputs/sparkbound-build/expansion-campaign-qa/landscape-completed-review.png)
- [Desktop Parent wrong-first evidence](../../../outputs/sparkbound-build/expansion-campaign-qa/parent-desktop-first.png)
- [Small-phone Parent evidence](../../../outputs/sparkbound-build/expansion-campaign-qa/parent-small-phone-first.png)

## Results

| Area | Coverage | Result |
| --- | --- | --- |
| Harder forms | Nine applicable band/type combinations across Applied through Master; six viewports; long prompts and two support levels | PASS |
| Ordering availability | Applied order controls exercised; higher bands explicitly checked as numeric maths rather than inventing missing ordering fixtures | PASS |
| Form controls | Every numeric digit, clear, backspace; ordering selection/undo/clear; exclusive choices; confirmation and acknowledgement | PASS |
| Responsive access | Six viewports; panel/text bounds; every visible panel button reachable by scrolling; choice scroll preservation | PASS |
| Retry and recovery | Retry and supported retry preserve round; failed save leaves confirmed state intact; reconnect applies pending action once; boot retry succeeds | PASS |
| Full UI campaign | Echo, six battle rounds, five earned upgrades, fifteen unique completed tasks, four combat buttons, victory and one earned win | PASS |
| Wrong-first support | Original wrong answer, correction, two hints and assistance events retained | PASS |
| Reload | All fifteen unsent drafts restore exactly without saving; question bands unchanged; completed state survives reload exactly | PASS |
| Parent review | Fifteen exact IDs once; wrong-first ordering; original submissions, feedback, correct answer, support, hero and upgrade context preserved | PASS |
| Parent navigation | Initial review retry; Close, Escape and browser Back; every record reachable at every viewport | PASS |
| Learner review | Fifteen tasks; responsive bounds; browser Back returns to victory | PASS |
| Reset | Cancellation preserves all evidence; confirmation archives all fifteen records and retains wins; reset survives reload | PASS |
| Learner privacy | Hidden seed and private answer/evidence keys absent; future tasks remain only id/forge stubs throughout | PASS |
| Browser/network | Zero unexpected console, page, request or asset errors | PASS |
| Tested build | Application bundle unchanged throughout; harness files also unchanged at completion | PASS |

No product or harness assertion failed. No further visual issue was found in the
seven inspected representative screenshots. The smallest-phone final battle shows
both characters, stage equipment, readable HUD and all four combat buttons.
Long forms and Parent records use vertical scrolling; a single screenshot is not
expected to contain the complete scrollable record. Automated reachability checks
confirmed access to the remaining controls and records.

### Expected Diagnostics

Exactly five messages belong to the two deliberately injected localhost outages:

1. Save fixture: `/api/sparkbound` HTTP 503 response.
2. Save fixture: Chromium's matching `Failed to load resource` 503 message.
3. Boot fixture: `/api/sparkbound` HTTP 503 response.
4. Boot fixture: Chromium's matching `Failed to load resource` 503 message.
5. Boot fixture: `Sparkbound boot failed Error: Synthetic boot outage`, with the
   stack recorded in JSON at `game.js?v=20260911-3d:3832:44450` and
   `game.js?v=20260911-3d:3832:71637`.

No unexpected diagnostic was reclassified after the run. The owner-supplied
listener was present before Node loaded the harness. No rerun was needed after
the successful x64 launch, and the run used an isolated synthetic database only.

### Remaining Boundaries

- Hooke owns the full true3D volume/rotation matrix and broader expansion harness
  coverage excluded by campaign-only mode. This report does not replace it.
- This is headless Chrome at six viewport sizes, not Safari/WebKit or a physical
  mobile/tablet test. No frame-rate, performance budget or comprehensive
  accessibility audit is claimed.
- The Parent evidence popup was tested; full Parent portal authentication was not.
- The browser and ephemeral D1 server were closed by the harness's normal cleanup.
- This task added only this QA document. It did not modify a harness, product
  source, bundle or model, and did not commit, push or deploy.
