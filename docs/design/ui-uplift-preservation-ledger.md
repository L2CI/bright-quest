# Bright Quest uplift — preservation and regression ledger

28 September 2026. Covers P01 and P10 in `ui-uplift-plan-2026-09-28.md`.

## Scope and evidence boundary

The uplift changes presentation, navigation and safe access to existing saved work. It does not rename record identifiers, recalculate historical scores or merge children. The later user-authorised PIN and family-password recovery work adds separate authentication-only migrations; the four original migrations and every learning table remain unchanged. All automated data fixtures are fictional. No production database, account, child history or remote Git operation is used by these checks.

`tools/ui-preservation-baseline.json` freezes 33 protected text files from commit `62e75ec`, normalising only UTF-8 BOM and CRLF line endings. These include all four original database migrations, server API/library contracts, question banks, course JSON, the Sparkbound roster and the parked Chemistry lesson script. It also lists 16 retained page routes. A failing hash requires an explicit scope review, not an automatic baseline update. One exact amendment is recorded for `functions/api/auth/config.js`: the UI feature flag and the authorised PIN/family-password recovery availability flags. Its original hash is retained alongside the reviewed new hash. The other 32 original files still match.

## Data owners and invariants

| Store | Owner and contents | Invariant for the uplift | Automated coverage |
|---|---|---|---|
| `child_profiles` | Family-scoped child identity; complete profile JSON; stars; version | IDs, family boundary, full payload and optimistic version checks remain | Protected API/schema; synthetic complete-payload render checks |
| `app_profiles`, `app_events` | Legacy profiles and events | Retained; no new automatic conversion or deletion | Protected schema/API |
| `families`, `family_users`, `family_sessions`, `auth_rate_limits` | Family account, PIN/password hashes, issued capabilities and sessions | Parent access stays locked until authorised; child/family isolation unchanged | Protected API/library; existing game API suites |
| `family_parent_pin_recovery` | P13 one-use expiring token hashes and claim nonce | Authentication-only addition; reset changes the winning family's PIN and revokes that family's sessions without touching learning rows | Real ephemeral D1 tests for expiry, concurrency, rollback, family isolation and complete learning-row invariance |
| `family_password_recovery` | R02 one-use password token hashes and claim nonce | Reset changes only the matched user's password and account login quota; keeps the family PIN; revokes family sessions and both recovery purposes without touching learning rows | Independent 21-case ephemeral D1 suite, including issuance races, atomic rollback, cross-purpose concurrency and byte-for-byte learning/game invariance |
| `family_profile_events`, `profile_migration_log` | Idempotent events and migration provenance | Records and uniqueness rules remain; no migration runs | Protected schema/API |
| `beacon_brigade_states`, `beacon_brigade_operations` | Expedition, HQ, wallet, history, support and permanent operation receipts | Same per-child versioned state and replay rules | Existing Beacon domain/API/campaign tests |
| `sparkbound_states`, `sparkbound_operations` | Campaign, hero, match, upgrades, original training evidence and permanent receipts | Same legacy/current rules versions, per-child state and replay rules | Existing Sparkbound domain/API/campaign tests |
| `brightQuestProfilesV2` | Local full profile map | Preserve every profile ID, same-name children, unknown fields and original records | Actual shell render test with two same-name children and rich histories |
| `brightQuestActiveProfile` | Current local child selection | Keep identity separate from display name | Same-name identity test; route fixtures |
| `brightQuestFamilyProfileCacheOwnerV1` | Additive cache ownership metadata: family ID plus database-child-to-profile mapping | Cached work is adopted only when all three identities match a full authorised payload; no name or unbound legacy-ID inference | Same-family reload recovery, different family/child/profile rejection, redacted sibling exclusion and malformed/null metadata checks |
| `brightQuestDeviceProfileRecoveryV1` | Additive device archive containing original cache and ownership strings | Retain unowned, foreign or redacted cache before replacement; never attach archive entries to another family. Stop hydration if a safe archive cannot be written | Verbatim preservation, failed-write blocking, chooser reload, metadata-only dedupe, distinct learning/ownership changes and malformed-byte fallback |
| Profile `activeDraft` | Core or international test ID, question index, original answers/writing, time and metadata | Resume same bank; index zero and zero remaining time are valid; unresolved drafts remain; another test cannot overwrite silently | Core/international resume, unknown ID, fresh start, interrupted start, save/leave and post-finish tests |
| `brightQuestIcasDraftsV1`, `brightQuestIcasStandaloneAttemptsV1` | ICAS device drafts and standalone results | Keep key, profile/test identity, flags and elapsed time; no home navigation write | ICAS source unchanged; browser save/resume belongs to P11 |
| Profile `icasAttempts` | Submitted ICAS question evidence | Full responses and original marking remain | Rich profile and full evidence checks |
| `brightQuestChemistry101ProgressV1` and profile `chemistry101Progress` | Per-profile chapter watch/test progress | Same progress owner, chapter IDs and unlock semantics; no copying unassigned demo records into a named child | Protected bank; 11-chapter summary, identity isolation and existing-attributed-history checks |
| `brightQuestPhysics101ProgressV1` and profile `physics101Progress` | Watched seconds, completed chapters, tests and released chapter metadata | No watch-position, gate or score rewrite; unassigned device history stays distinct | Protected bank; rich-profile render nonmutation and device-history review |
| `brightQuestEnglishGrammarLadder` | Existing device ladder progress | Keep key and lesson identity | Source review; player browser verification belongs to P11 |
| `brightQuestMechshiftRescueV1` | Existing local game result | Keep saved build, result, time and stars | Game source unchanged; route retained |
| `bqBeaconPending:*`, `bqBeaconDraft:*`, `bqBeaconDiscovery:*`, `bqBeaconSettings` | Pending game commands, station answers, discovery history and preferences | Never clear on catalogue/navigation changes | Game source/API unchanged; existing domain/API suites |
| `bqSparkPending:*`, `bqSparkDraft:*`, `bqSparkHero:*`, `bqSparkGuide:*`, `bqSparkSettings` | Pending game commands, answers, chosen hero, guide and preferences | Same profile/match/question identity | Game source/API unchanged; existing domain/API suites |
| Session capabilities | `brightQuestParentCapability`, `brightQuestChildCapability` | Keep session scope; return-to-child must lock parent | Actual family-controller logic: failed lock, successful lock/reduced session, failed post-lock refresh; UI verification belongs to P11 |
| AGMaths | Separate linked application and its student records | Preserve handoff identity/return context; no change to its storage/backend | URL/source review; external real-account writes excluded |

### Complete profile fixture

The regression fixture includes core answers, an unanswered question, a first-choice index of zero, a prompt over 2,500 characters, writing over 3,500 characters, original correct/wrong answer strings, ICAS evidence, Chemistry and Physics tests, training counts, stars, a paused draft and unknown nested fields. Two children intentionally share the display name **Alex**. They must remain distinct, and opening any parent route must not write or delete a profile.

## Capability and route ledger

| Capability | Retained route/action | Intended entry after uplift | Preservation case |
|---|---|---|---|
| Child entry and four destinations | `/` | Today, Learn, Play, My Journey | Navigation must not mutate profile payloads |
| Seven core exam sets and final test | Existing `startLevel` / `startQuest`; all eight IDs | Learn → Exam practice | Same banks, durations and scoring; draft guard and resume |
| International tests | Existing `openInternationalArena` / `startInternationalTest`; `intl-*` IDs | Learn → International | Same banks and IDs; international draft now follows existing save adapter |
| ICAS maths/spelling | `/icas-prep/` | Learn → ICAS | Same attempts, drafts, flags, spelling audio and evidence |
| Winter Maths / AGMaths | Existing external handoff plus `/maths-training/` | Learn → Maths | Same student identity; local maths route retained |
| Chemistry course | `/chemistry-training/chemistry-101-winter-2026/` | Learn → Chemistry | Existing 11 chapter IDs, media and tests |
| Physics course | `/physics-training/physics-101-advanced-grade-4/` | Learn → Physics | Same released/planned chapter distinction and watch gates |
| Grammar | `/english-grammar/` | Learn → Grammar | Existing ladder and lesson states |
| Blackboard Focus | `/blackboard-focus-session/` | Learn → Blackboard Focus | Existing saved evidence input and narration |
| Short practice and writing | Existing in-app training/test actions | Learn or relevant practice; parent Evidence | Full questions and responses remain available |
| Mechshift Rescue | `/mechshift-rescue/`, `/mechshift-rescue/level-2/` | Play | Existing level routes and unlock/result handling |
| Beacon Brigade | `/beacon-brigade/` | Play and learning catalogue | Same child ID and API save |
| Sparkbound | `/sparkbound/` | Play and learning catalogue | Same child ID, hero/campaign and API save |
| Cave River Quest | `/cave-river-quest/` | Play → retained adventures | Existing page and game assets remain |
| Street Smart Rescue | `/street-smart-rescue/` | Play → retained adventures | Existing page and game assets remain |
| Treasure Quest prototype | `/treasure-quest/` | Explicit older-adventure destination | Route remains; do not redirect its state into another game |
| Standalone Chemistry lessons | `/chemistry-training/lesson-1/`, `/chemistry-training/secret-alphabet-session/` | Learn → additional/older lessons | Original lesson route and content retained; parked lesson script unchanged |
| Parent review | Existing `#parent/...` routes | Overview, Learning, Evidence, Settings | Full records plus compact views; original data not rewritten |
| Family/PIN, refresh, logout, reset | Existing family API/actions | Settings and return-to-child | Controls retained; destructive actions remain explicit |
| Voice audition | `/blackboard-voice-audition/` | Development tooling | Retained outside the ordinary learning catalogue |

Route-file and dependency checks establish that pages and referenced local scripts/styles/art exist. They do not establish that every launcher, game control or cross-app handoff works in a browser. P11 owns that separate interaction evidence.

## Automated checks

Run from the repository with the installed x64 Node runtime:

```text
node --test tools/test-ui-preservation.mjs
node --test tools/test-profile-sync.mjs
node --test tools/test-parent-pin-recovery.mjs
node --test tools/test-family-password-recovery.mjs
node --test tools/test-parent-pin-recovery-ui.mjs
node tools/test-ui-harness.mjs
node --test tools/test-beacon-domain.mjs tools/test-beacon-api.mjs tools/test-beacon-campaign.mjs tools/test-beacon-content-age.mjs tools/test-beacon-activities.mjs
node --test tools/test-sparkbound-domain.mjs tools/test-sparkbound-content.mjs tools/test-sparkbound-api.mjs tools/test-sparkbound-duel.mjs tools/test-sparkbound-roster.mjs tools/test-sparkbound-expansion-content.mjs tools/test-sparkbound-campaign.mjs
```

The preservation suite runs the complete shipped shell, child experience, result presentation, autosave and family-controller closures in a Node VM. It supplies only a minimal DOM and synthetic local state. The Chemistry closure runs with media boot skipped so its real progress functions can be tested independently. Its private-function exposure is appended to the in-memory script text; no test hooks are added to production files. Original app helper functions are taken from the actual `app.js`. All fetches in this VM suite are contained in a recording stub and cannot access a network. The suite deliberately does **not** claim browser rendering, accessibility compliance, actual media playback or real account synchronisation.

The separate unified-harness smoke uses actual localhost APIs and ephemeral D1. `serve-sparkbound-qa.mjs` now also serves the existing Beacon API and applies its existing migration to the fictional local database. Both games use the same synthetic family session and keep their isolated state tables. P13 adds recovery routes and a captured inbox protected by the local QA control token. The mailer is an injected function; no real email is sent.

The sync suite executes the actual `app.js` save/merge functions with a deferred recording transport. It reproduces the browser-observed overlap between an autosave and test completion, including optimistic-version conflicts. Nine checks cover record union, completed-draft suppression, a valid newer retake, serial request ordering, bounded retries and responses arriving after logout or an authorised profile-map replacement.

Outputs are stored beside the repository under `outputs/brightquest-uplift-qa-2026-09-28/`:

- `preservation-tests.json`: structured latest run, including failures.
- `profile-sync-tests.json`: sync race, merge and late-response regression evidence.
- `parent-pin-recovery-independent.txt`: independent rerun of the recovery backend suite against ephemeral D1 and synthetic mail.
- `beacon-suite.txt`: existing Beacon regression run.
- `sparkbound-suite.txt`: existing Sparkbound regression run.
- `sparkbound-api-after-unified-harness.txt`: API regression repeated after adding the Beacon route to the development harness.
- `unified-harness-smoke.json`: actual local API reachability and unchanged child profile evidence.

## Completion notes

- P01: protected baseline, storage owners, 16 retained route pages and capability inventory recorded.
- P10: regression script added for identity, read-only review, full long evidence, correct status labels, Chemistry totals, core/international draft safety, child catalogue/search/artwork, Return to child failure handling, browser-history save handling and unassigned science history. Existing game domain/API suites are run separately.
- The suite first exposed an existing local `saveProfiles()` on every parent render via `normalizeProfiles()`. Removing that render-time call makes review read-only; bootstrap retains its existing normalisation responsibility.
- Standalone legacy writing now has a full review path; long core, ICAS, Chemistry and Physics question prompts remain available without truncation. Saved records remain unchanged.
- Unassigned science history is preserved and reviewed separately. Previously attributed named-child history is retained; no old attribution is silently reversed.
- Real browser QA found that overlapping autosave/completion requests could return a version conflict, pull an older cloud snapshot and replace a finished attempt with its paused draft. The client now serialises saves per profile, keeps independent attempts/writing/ICAS evidence, carries the preceding response's version, and suppresses only a draft whose same-level completion is already recorded. A newer retake remains resumable. Historical scores are not recalculated.
- Late save/read responses are ignored if authentication replaces the profile map, preventing an old request from restoring cleared profiles after logout or attaching them to a newly loaded session.
- Parent/child/logout transitions wait for active work to save and stop on failure. Hydration retains same-family, same-database-child records, including owned cache recovery after reload. A redacted sibling stays redacted, and unowned device records are never assigned automatically from a legacy ID. The original profile storage key is unchanged; a separate owner key records only identity metadata.
- Chooser entry clears stale active pointers after switching or reloading an unselected family. Regression coverage checks subsequent child selection, Parent access and logout without attempting a save under the retired child's capability. Reconnect messages appear inside the family screen.
- Before hydration replaces unowned, foreign-owner or redacted cached history, it saves and verifies the exact original cache and owner strings in a separate device-only recovery archive. Identical entries are deduplicated; none are automatically merged or exposed to a different family. An archive write failure blocks hydration and leaves the original cache and owner unchanged.
- Archive comparison ignores only each profile's top-level `cloudVersion` and `cloudSyncedAt`, so routine save acknowledgements do not add duplicate full histories. It retains the first original raw strings. All answers, drafts, nested/unknown fields and ownership remain part of the comparison; malformed data uses exact-byte comparison. No archived learning history is pruned or deleted.
- P13 independently reviewed: fixed server origin and registered email, current-password verification, atomic rate limits, hash-only token storage, claim-time expiry, nonce-gated transactional reset, all-family-session revocation, sanitised transport errors and unchanged learner rows. Real email delivery and production configuration are outside this synthetic evidence.

### Final illustrated asset check

Nine WebP scenes in `assets/ui/illustrated-worlds/` are referenced by the child/auth graphics. Every file exists and has a valid WebP container header. The combined size is **3,378,018 bytes (3.2215 MiB)**, below the 3.3 MiB limit. The new graphics consumers use local image paths, with no external runtime image URL. `preservation-tests.json` records each scene's path, size and SHA-256. This static gate complements the lead's browser artwork/cropping review.

### Automated result at handoff

| Check | Result | Evidence |
|---|---|---|
| Preservation, presentation, hydration, archive and illustrated assets | **49/49 pass** | `preservation-tests.json` includes the exact tested source and scene hashes |
| Protected content/server/schema/parked lesson | **32 original hashes + 1 explicit config amendment pass** | First preservation case; original config hash retained |
| Save overlap, conflict recovery and late responses | **9/9 pass** | `profile-sync-tests.json` |
| PIN recovery backend after password extension | **12/12 pass** | `parent-pin-recovery-after-password.txt`; ephemeral D1 and captured mail only |
| Family-password recovery backend | **21/21 pass** | `family-password-recovery-tests.json` and `.txt`; source hashes and independent real D1 results |
| Auth startup and both recovery frontends | **23/23 pass** | `account-recovery-ui-preservation-final.txt`; complete controller in synthetic DOM, including active-work save and pending-confirmation guards |
| Retained page routes and local dependencies | **16 pages pass** | Second preservation case |
| Illustrated worlds | **9/9 referenced; 3.2215 MiB total** | Local WebP files; asset case in `preservation-tests.json` |
| Existing Beacon domain/API/campaign/content | **85/85 pass** | `beacon-suite.txt` |
| Existing Sparkbound domain/API/campaign/content | **685/685 pass** | `sparkbound-suite.txt` |
| Sparkbound API after unified QA harness change | **Pass** | `sparkbound-api-after-unified-harness.txt`; intentional storage-fault injection is expected |
| Both game APIs in one ephemeral family | **Pass** | `unified-harness-smoke.json`; entry reads do not create saved games or change child profiles |

Browser screenshots, interactions and responsive-layout judgement remain P11 evidence owned by the lead. Full game campaigns, physical devices and external AGMaths account state are not inferred from these automated checks. Rerun preservation after any further source edits; the JSON stores the source hashes for that run.

Final graphics/chooser/archive review reran the preservation, sync and recovery UI suites together: **66/66 pass**. JavaScript syntax and `git diff --check` also passed. Unchanged backend and game suites were not repeated for the graphical asset changes.

The later family-password extension passes **114 scoped cases**: password API21, PIN API12, auth UI23, preservation49 and sync9. The final UI/preservation rerun is **81/81**; backend results are saved separately. See `account-recovery-independent-review-2026-09-28.md` for the independent R04 review and evidence boundaries.
