# Sparkbound Guardian Campaign QA

## Scope

Eleven heroes, five earned upgrades each, six-round campaigns with fifteen questions,
generated 2.5D actors, progressive Prism equipment, expanded sounds and Parent review.
Existing saved campaigns and the original 144 questions remain unchanged. New campaigns
start at Applied or Stretch and progress to Challenge and Master; 96 harder questions
bring the bank to 240. Hints and worked support remain available without a timer.

## Build

- Browser bundle SHA256: `383045711ab740358761efcfd2743c859cb20c165b0e66ab278cfe4b2ba0d1dc`.
- HTML asset version: `20260909-1`.
- No database migration or production data writes.
- Release path: scoped GitHub `main` push, automatic Cloudflare Pages, live verification.
- User approved publication on 9 September 2026 after disclosure of the residual risk.

## Completed Checks

- Full automated suite: 681 passed, zero failures in the final run.
- Ten consecutive isolated campaign API runs passed.
- Twelve injected save-failure scenarios verify transactional rollback, ambiguous commits,
  identical-operation retries, exact Parent evidence and no duplicate upgrades or rewards.
- Independent question review: all 48 added maths keys checked; all 48 added science
  questions reviewed for correctness and ambiguity. Answer-length rank checks pass.
- Generated actors: 132 hero-stage/viewport checks and 22 attack sequences passed.
  All 66 portraits were inspected after fixing a crossfade ghost in portrait capture.
- Prism's aim pose is held while the player decides; launch begins at the visible muzzle.
- Final loader change: 20 cold/reload pairs, 40 GLB requests, zero errors; authored clips,
  clocks, single impact callbacks and contact anchors retained.
- Pages functions compilation and eight compiled routing checks passed.
- Audio is checked through offline renders and channel controls, not subjective listening.
- All browser checks are muted and use synthetic profiles in ephemeral local D1.

## Browser Gate

The preceding bundle passed 3,785 functional assertions, covering six viewports, 66
previews, full campaign, question forms, hints/support, reload/retry/reset, back paths
and the wrong-first Parent popup. Its strict network gate failed on 20 model-request
cancellations, despite completed response bodies and parsed models. These were not
filtered out. The loader now consumes each native response fully before parsing it,
without changing the shared Three.js library.

Final integrated browser QA PASS: 3,787 checks, zero unexpected browser, network or
asset errors, with no abort filtering. The only expected errors were two deliberately
injected API 503s. All 66 previews, six viewports, bands 2-5 forms, six rounds/fifteen
questions, Parent evidence, retries, reloads, back paths and resets passed. The bundle
hash was unchanged after the run, which ended at 06:51 Sydney time on 9 September.

## Remaining Release Risk

One earlier local campaign API run returned `STORAGE_ERROR` after about 314 seconds.
The original exception was not retained. It has not recurred in the final suite or ten
bounded stress runs. Diagnostic capture and recovery tests were added to the test
harness; production timeouts and retry behaviour were not changed.

`STORAGE_ERROR` is an unexpected-exception boundary, not proof of a transport failure.
The installed Miniflare proxy disables Undici's usual five-minute timeouts, so elapsed
time alone cannot establish the cause. The historical cause remains unconfirmed.

The final browser gate passed. The user subsequently instructed "publish then",
accepting the disclosed historical storage risk. Release recommendation is GO WITH
ACCEPTED RISK; the historical cause remains unconfirmed. Deployment and live verification
must still complete before a production success claim.

## Evidence Locations

- Workspace `outputs/sparkbound-build/expansion-qa/`: full browser report and screenshots.
- Workspace `outputs/sparkbound-build/generated-actors-qa/`: graphics and charge reports.
- Workspace `outputs/sparkbound-build/hero-loader-check/`: final targeted loader report.
- Repository `outputs/sparkbound-storage-investigation-20260909/`: stress logs,
  injected recovery results, final suite and transport evidence.
- `sparkbound/assets/heroes/generated/README.md`: original artwork prompts and provenance.

Live verification must check exact asset hashes and authentication after the approved
GitHub deployment. Its synthetic gameplay interception does not prove authenticated
production D1 behaviour and must not write to the child's real record.
