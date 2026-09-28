# Bright Quest UI uplift — implementation plan

28 September 2026. User authorised planning followed by implementation with multiple agents. Baseline: `62e75ec`, local branch `codex/brightquest-ui-uplift`.

## Outcome

A visually appealing, connected experience for children and parents. Existing learning content, game choice, account boundaries, saved records, scores and progress remain intact. This plan follows the 16-journey UI review and its 44 screenshots in `outputs/brightquest-ui-review-2026-09-28` beside the repository.

## Design direction

Keep the Bright Quest identity: clear blue primary actions, warm gold achievements, distinct subject colours, white/light surfaces and recognisable lesson/game art. Use generous but purposeful spacing, a consistent rounded card shape, strong readable headings and restrained shadows. Artwork belongs on catalogue and milestone surfaces; the question, lesson or evidence takes priority during work. Respect reduced motion and keep keyboard focus visible.

Four child destinations:

- **Today:** a real saved activity where supported, an accurate suggested next step, a small recent achievement and freedom to choose something else.
- **Learn:** the complete catalogue, searchable and filterable by subject/type/time where durations are known.
- **Play:** all retained game experiences, with current save identities and unlock rules.
- **My Journey:** honest completion/results/achievement views across the supported areas; link to module-owned progress where a shared summary is unavailable.

Four parent destinations:

- **Overview:** recent meaningful activity, a supported observation and a direct next action.
- **Learning:** course coverage and current progress.
- **Evidence:** compact searchable lists; complete original questions, answers, writing, timing and support details on demand.
- **Settings:** family controls, refresh/account actions and clearly separated advanced reset controls.

## Preservation contract

1. No production writes, resets, real account changes or historical-score recalculation during development/QA. The subsequently authorised PIN recovery adds one auth-only token table; existing migrations and learning tables remain unchanged.
2. Keep every existing storage key, profile ID, question/test ID, API contract, content bank, reward rule and game state format.
3. Preserve full profile payloads: attempts, original question statistics, writing, training, stars, science progress and ICAS history.
4. Preserve device-only drafts and module saves. Resume must read the existing draft and continue it; opening the home/catalogue must not replace it. Starting another test must not silently overwrite an unfinished test.
5. Remove automatic name-based profile merging/deletion. Display names are not identities. Existing manual account/data controls remain protected.
6. Preserve media timing, caption/seek behaviour and test-unlock gates. `chemistry-training/lesson-1/lesson-1.js` remains untouched.
7. Test only with synthetic families in ephemeral local QA environments. Do not export real child records into test artifacts.
8. Keep the linked AGMaths app separate. Improve Bright Quest entry, status clarity and return context; do not change the other app's records or backend.

## Work items and ownership

| ID | Work item | Owner | Acceptance criteria | Status |
|---|---|---|---|---|
| P01 | Preservation baseline and route/data ledger | QA agent + lead | Document stores, IDs and routes; same-name identities stay separate; sensitive files/banks unchanged | Complete; evidence below |
| P02 | Child navigation and Today | Lead | Four real destinations; navigation reachable at phone size; actual draft resume; accurate duration and progress; browser/app returns preserve context | Complete; evidence below |
| P03 | Complete Learn library | Lead | Search/subject/type filters work; all retained courses, exams, international tests, grammar and focus activities have an intentional entry; no silent removals | Complete; evidence below |
| P04 | Play and My Journey | Lead | Retained game entries use existing unlock/save paths; full existing game list remains reachable; supported learning areas represented with truthful status | Complete; evidence below |
| P05 | Visual system | Lead + domain agents | Coherent colours, type, spacing, artwork and controls across changed surfaces; responsive desktop/tablet/phone; no visual clipping or decoration obscuring tasks | Complete; evidence below |
| P06 | Focused tests, writing and results | Learning agent | Question and answer visible early on phone; question index in accessible disclosure; accurate pre-start duration; Save & leave/Resume retains draft; full results remain accessible | Complete; evidence below |
| P07 | Focused learning players | Learning agent | Chemistry chapters disclosed on demand; unique labels; video/board and controls grouped; Physics/Grammar consistency; timing/captions/progress/gates unchanged | Complete; evidence below |
| P08 | Parent overview and evidence | Parent agent | Useful concise summary; compact full evidence with Incorrect/Unanswered/Correct/Writing filters and search; full prompts/responses; stable navigation context; no record truncation | Complete; evidence below |
| P09 | Family/settings and accurate labels | Parent agent + lead | PIN/settings reflow at tablet/phone; return to child locks parent; advanced resets retain safeguards; Chemistry totals valid; empty/unavailable/unfinished states distinct | Complete; evidence below |
| P10 | Integration and regression checks | QA agent + lead | Meaningful tests cover identity, data, resume, full evidence, route inventory and existing domain suites; no unexplained failures | Complete; 884 checks across the recorded suites after the recovery extension |
| P11 | Visual and interaction QA | Lead | Exercise main child-parent loop, all changed primary controls, back paths, draft interruption/resume, empty/history cases at 1440/834/390 widths; save screenshots and defects | Complete; evidence below |
| P12 | Completion review and delivery | Lead | Every P item has an outcome, evidence and any limitations; no unresolved critical/high defects; report what is built and release status honestly | Complete; evidence below |
| P13 | Password and verified PIN recovery linked to email | Parent + learning + QA agents | Family password recovery from login; parent PIN recovery with current password verification; registered email, purpose-bound single-use tokens, new credential, prior grants revoked and learning records unchanged | Code and local QA complete; production email setup pending |

## Agent boundaries

- **Lead:** root index/integration, child functions in `bright-quest-shell-merge.js`, child visual styles, autosave public resume adapter/guard, content catalogue, safety removal of automatic dedupe, visual browser QA.
- **Parent agent:** targeted parent functions in `bright-quest-shell-merge.js` (no whole-file rewrites), `bright-quest-family-auth.js/.css`, new parent presentation stylesheet. No child functions/shared styles/root index edits.
- **Learning agent:** new focused test/results presentation files; course-specific Chemistry/Physics/Grammar files. No root index, banks, root app/autosave logic or parked lesson edits.
- **QA agent:** tests, synthetic fixture/harness additions, route/data ledger. No production application rewrites or real-data access.

Shared-file edits use bounded patches. Agents report files, checks, unresolved issues and each plan item completed. The lead integrates and independently reviews the final result.

## Verification plan

### Automated

- Syntax checks for changed JavaScript and repository checks appropriate to the changed surface.
- Record/content preservation: baseline hashes for banks, migrations and protected data formats; identity preservation, no automatic DELETE on parent render.
- Existing Beacon/Sparkbound domain/API suites as regression checks when their launch integration is touched; source/content smoke checks for modules changed.
- Draft scenarios: save/leave/resume with answer index zero, writing, remaining time, unknown/old content and starting a different test. Do not erase an unresolvable draft.
- Parent scenarios: empty history, long/full writing and prompts, many records, correct/incorrect/unanswered distinctions and totals.
- Catalogue: every supported route/control resolves and retains its original storage/profile context.

### Browser

Use the in-app browser and synthetic local families. Review desktop (1440), tablet (834), phone (390). Check Today → Learn → activity → save/leave → resume → result → parent evidence → return to child. Review course maps, players, Play and game launch/exit. Check keyboard focus, details/filter interaction, navigation/back, readable contrast, no overflow, no missing art and console/runtime errors.

### Exit criteria

All P01–P13 rows are completed with evidence, or a specific limitation is recorded and handled without pretending it passed. No unresolved loss-of-data, broken-primary-flow, stranded-page or auth-boundary defect. Full game campaigns, physical-device testing and a new cross-device sync architecture are not part of this visual uplift; existing save/API contracts must remain compatible.

## Release boundary

This request authorises implementation and deployment of multiple agents. App publication is a separate final action after a tested, reviewable build. Follow the established GitHub/Cloudflare route only when release is authorised; do not run remote Git or database operations while building.

## Completion log

### P06 scope amendment: ICAS phone runner

Visual QA found the complete ICAS question palette still preceded the question on phones. The authorised P06 focus work therefore also includes `icas-prep.js`, `icas-prep.css` and its local cache-version links: put the full palette in an accessible Questions disclosure, compact the title/timer, retain all answered/flagged positions and focus the question after a jump. ICAS drafts, timing, scoring, question bank and audio behaviour remain unchanged.

### P05 scope amendment: original illustrated worlds

The user explicitly asked to replace geometric decorative graphics with good sourced or created artwork. Nine original raster scenes were created using the built-in image-generation tool: Discovery Treehouse, Winter Maths, Chemistry Lab, Grammar Garden, Physics Workshop, Exam Expedition, Challenge Observatory, Focus Studio and World Voyage. They use a consistent, detailed painted adventure-book direction, tangible places and expressive children. Existing painted game environments are reused for the games. Navigation icons, logos, teaching diagrams and lesson media stay intact.

The new artwork is shared across Today, Learn, My Journey, login and the restrained parent summary. Scene images fill their art panels; headings and actions remain outside the pictures. Originals and the complete prompt manifest are saved with the review outputs. The nine optimised WebP assets total about 3.22 MiB at 1536 × 1024 each. No remote image host is required.

### Initial uplift completion evidence

- **P01:** 32 original protected file hashes unchanged; one explicit additive auth-config amendment documented. Existing migrations, banks, parked lesson, learning media and game formats remain intact. 16 retained route pages and their local dependencies pass.
- **P02–P05:** Four child destinations, complete searchable library, original game choices and truthful journey summaries implemented. Nine original illustrated scenes and existing painted game scenes integrated; no external image host. Final captures 34–38 and 41 show the revised graphics at desktop, phone and tablet sizes.
- **P06:** First-choice answers, full writing, position and remaining time survive Save & leave, reload and resume. A different test cannot silently replace an unfinished draft. Core completion is retained across return-home, reload and sign-in. ICAS question jump/flag/resume and international browser Back verified.
- **P07:** Chemistry, Physics and Grammar maps, playback, captions and return paths checked. Compact Chemistry controls verified in final capture 33. Actual lessons, media clocks and unlock gates retained. Focus Studio header improved.
- **P08–P09:** Full long reading/writing evidence and clear answer status remain available. Parent, child chooser, settings and Return to child flows checked with separate fictional children. The first child retains its paused challenge, completed result and three stars; the sibling remains at zero. Initial loading now waits for the selected screen rather than flashing cached legacy content.
- **P10:** 49 preservation/identity/asset checks, nine sync checks, 12 recovery API checks, 12 recovery/startup UI checks, 85 Beacon and 685 Sparkbound checks pass: **852 recorded checks**. Changed JavaScript syntax and whitespace checks pass. Existing unchanged domain suites were not repeatedly rerun for image-only changes.
- **P11:** Main child/parent/test/player/game-entry/recovery flows reviewed in the actual browser at 1440, 834 and 390 px widths. Screenshots, defects and verification limits recorded in the browser acceptance file. New scene crops reviewed with no horizontal overflow or broken loaded images on the checked catalogue views. Full campaign replays and physical devices are outside this check.
- **P12:** Source, this completed plan, individual agent completion notes, preservation ledger, visual HTML review, Markdown completion review, original image files and complete prompt manifest saved. No unresolved critical/high defect identified in the scoped checks.
- **P13:** Password verification, registered-email link, token cleanup, expiration, replay prevention, atomic reset, prior-session revocation and unchanged learner rows verified with synthetic fixtures. Browser request/link/cancel and isolated full-reset tests pass. **Not enabled in production:** sender/domain, secrets, additive migration, publication and real email delivery verification remain release tasks.

### Data-preservation fixes found during the review

Overlapping autosave and completion writes could restore a stale draft over a completed test. Saves now run in order, preserve independent evidence and ignore late responses from a retired session. Same-name profiles are no longer merged automatically. Unassigned science records stay separate and reviewable. Unknown/foreign/redacted device caches are archived verbatim before replacement; archive failure leaves the original bytes untouched. Routine save-version changes do not duplicate the archive, and no archive record is pruned.

### Saved evidence

Under `outputs/brightquest-uplift-qa-2026-09-28/` beside the repository:

- `review.html` — illustrated completion review and plan ledger.
- `completion.md` and `browser-qa.md` — concise outcome, tested journeys, defects and limits.
- `screenshots/` — original browser captures; superseded drafts are explicitly identified.
- `preservation-tests.json`, `profile-sync-tests.json`, game/API outputs — test evidence.
- `artwork-manifest.json` and `originals/` — built-in image-generation prompts and original PNGs.

Web-delivered artwork and the prompt manifest are also retained in `assets/ui/illustrated-worlds/`. The app has not been committed remotely or published, and no production data or credentials were changed.

### P13 extension: family password recovery

The user subsequently chose email recovery for both the family password and parent PIN. All R01–R05 items in `account-recovery-extension-plan-2026-09-28.md` are complete locally. Login offers Forgot family password; the existing verified PIN flow also links there when both credentials are forgotten. Expiring one-use tokens are separated by purpose. Either reset signs out family sessions and invalidates pending links, without changing learner records. A winning password reset clears only its matched account's login throttle. Same-tab recovery links and confirmation preserve active learning first.

The independent scoped run passes **114 checks**: 21 password API, 12 PIN API, 23 auth UI, 49 preservation and nine sync checks. With the unchanged previously passed 85 Beacon and 685 Sparkbound checks, the recorded total is **884**. Desktop and phone request/link/cancel/error paths, the parent-to-password route and clean console were reviewed. The local preview is clearly labelled; the live app was opened and already signed in. Sender setup, production migration, publication and actual email delivery remain outstanding release work.
