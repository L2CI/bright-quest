# Bright Quest Uplift Implementation Plan

Date: 11 July 2026
Status: Implementation in progress; family identity foundation is a local release candidate
Design direction: Mission Control home plus illustrated course quest maps

## Objective

Rebuild Bright Quest as a multi-family product while preserving the current Gupta family data and improving the full child and parent experience. The release must remain reversible, migrate existing records without loss and pass strong local, staging and production QA gates.

## Decisions confirmed

- Add a short email-and-password login or signup screen before entering Bright Quest.
- Seed the existing Gupta household under the supplied email address.
- Do not store or commit the supplied password in plaintext. Create its password hash through a controlled bootstrap process.
- Attach all existing Bright Quest child data to that family account.
- The existing child is Aarin and remains the same child record after migration.
- A one-child family skips child selection and opens Aarin's home directly.
- A family with multiple children sees a profile chooser and uses a child-specific PIN/password to prevent accidental profile switching.
- Parent Cockpit always requires its existing parent PIN after family login.
- Preserve the Parent Cockpit wrong-answer-first review behaviour.
- Preserve AGMaths identity, progress links and the return path to Bright Quest.

## Rollback point

Before implementation:

1. Verify the worktree and leave `chemistry-training/lesson-1/lesson-1.js` untouched.
2. Confirm production commit `8fad1bbfadf34cecff293c458919a9ac91cac4bd` is still the live baseline.
3. Create an annotated local tag named `bright-quest-pre-uplift-2026-07-11` at that commit.
4. Push the rollback tag only as part of an explicitly approved production operation.
5. Export a read-only D1 snapshot before any schema or data migration.

The design documents and QA outputs are not part of the application rollback point.

## Target entry experience

### First visit

1. Show the Bright Quest identity and a compact authentication panel.
2. Offer **Log in** and **Create family account** as tabs or a segmented control.
3. Login requires email and password.
4. Signup requires parent name, email, password and acceptance of a short privacy statement.
5. Child creation happens after the parent account exists; do not collect unnecessary child data.

### Returning Gupta family

1. Log in with the supplied family email and password.
2. Server resolves the Gupta family and its existing Aarin profile.
3. Because the family has one child, skip the child chooser and open Aarin's Mission Control home.
4. Opening Parent Cockpit triggers the existing parent PIN gate.

### Multiple-child family

1. Family login succeeds.
2. Show large child profile tiles with avatar, first name and current quest.
3. Selecting a child requires that child's short PIN/password.
4. Parent Cockpit remains a separate parent-PIN action.
5. Switching children always returns to the family profile chooser.

## Data architecture

### New tenant model

Add D1 tables along these ownership boundaries:

```text
families
family_users
family_sessions
child_profiles
child_credentials
parent_pins
profile_events
profile_migration_log
```

Every child-owned record must be scoped by both `family_id` and `child_id`. Human-readable names and email addresses must never be used as record keys.

### Authentication

- Hash passwords using a modern adaptive password hash. Prefer Argon2id if the selected Cloudflare-compatible implementation is supportable; otherwise use an OWASP-compliant PBKDF2-HMAC-SHA-256 configuration through Web Crypto.
- Give every credential a unique random salt.
- Use random, opaque server-side session IDs.
- Store only the session identifier in an `HttpOnly; Secure; SameSite=Strict` cookie.
- Do not store passwords, session IDs or authentication tokens in localStorage.
- Rotate the session after login and after parent privilege elevation.
- Rate-limit login, child-PIN and parent-PIN attempts.
- Add explicit logout and server-side session invalidation.
- Keep authenticated responses non-cacheable.

Security references: [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) and [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

## Gupta family migration

The migration is a release gate, not a best-effort background task.

### Source inventory

Capture all records associated with the current Bright Quest child from:

- D1 `app_profiles`
- D1 `app_events`
- current Bright Quest local profile payloads on the trusted family device
- Chemistry course progress and test attempts
- Parent Cockpit wrong-answer review payloads
- City School Exam Prep attempts
- Winter Training and AGMaths identity/linkage
- stars, rewards, game completion and unlock state
- writing samples and saved evidence
- training completion and focus-session state

### Migration procedure

1. Create the Gupta family and owner user through a one-time controlled bootstrap command.
2. Generate the supplied password hash locally or in the controlled bootstrap path; never place the password in a migration file, shell history, source code or logs.
3. Create or resolve Aarin's canonical `child_id` while preserving the existing Bright Quest profile ID as an external/legacy identifier.
4. Copy D1 profile and event records into family-scoped storage.
5. Run a one-time authenticated **Claim this device's existing progress** import for records that exist only in localStorage.
6. Merge by stable record IDs and timestamps; do not overwrite newer or more complete records with empty values.
7. Write a migration ledger containing source IDs, destination IDs, counts, timestamps and checksums, but no secrets.
8. Keep the old records read-only for at least one release cycle.

### Reconciliation report

Before release, produce counts for:

- child profiles: before and after
- attempts by course and chapter: before and after
- correct and incorrect answer detail: before and after
- stars and unlocks: before and after
- writing/evidence records: before and after
- unmatched or conflicting records

Release is blocked if any expected Aarin record is unmatched, if scores change, or if exact selected/correct answer detail is lost where it currently exists.

## Implementation phases

### Phase 0: Baseline and safety

- create rollback tag and D1 export
- record current live routes and asset versions
- capture authenticated child and parent baseline screenshots
- document current localStorage and D1 payload shapes
- add migration fixtures using sanitised test data

Exit gate: rollback tested locally and baseline inventory approved.

### Phase 1: Family identity foundation

- add family, user, credential, session and child tables
- build login, signup, logout and session APIs
- add rate limiting, CSRF protection and secure cookie handling
- build the compact family login/signup screen
- retain the old role screen behind a temporary rollback flag
- add one-child auto-selection and multiple-child chooser rules
- retain the separate Parent Cockpit PIN elevation

Exit gate: cross-family access tests, auth security tests and session tests pass.

### Phase 2: Gupta migration

- seed the Gupta family securely
- attach Aarin's canonical profile
- migrate D1 records
- run the trusted-device local data claim
- reconcile Bright Quest, Chemistry and linked AGMaths identifiers
- produce the migration report

Exit gate: all existing data is visible under the supplied family login and record counts match.

### Phase 3: Shared design foundation

- define colour, type, spacing, elevation, icon and motion tokens
- create shared buttons, icon buttons, status, progress, empty states and navigation
- create one coherent soft-3D illustration direction
- implement separate child and parent application shells
- add feature flags for each redesigned surface

Exit gate: component states pass desktop, tablet, mobile, keyboard and reduced-motion QA.

### Phase 4: Child Mission Control

- build Today with one primary next quest
- build Learn with Exam, Winter Maths and Chemistry worlds
- build Play with featured game and next unlock
- build My Journey with milestones, wins and trophies
- add per-child avatar, accent, companion and home-base preferences
- preserve the existing dashboard behind a rollback flag

Exit gate: Aarin lands directly on the correct personalised home and can reach every existing destination and return.

### Phase 5: Course quest maps

- convert City School Exam Prep to an eight-stop expedition
- convert Winter Training to a workshop path
- convert Chemistry to an illustrated lab path
- show only current, completed and next milestones prominently
- retain existing training, test, progress and answer-record data contracts

Exit gate: all old completion states render identically in meaning and all tests still write Parent Cockpit-compatible records.

### Phase 6: Lesson and game shell uplift

- standardise lesson player controls and navigation
- fix the current Grammar lesson-list overlap
- standardise game pause, exit, return and completion HUDs
- replace inconsistent visuals in priority order without changing course content

Exit gate: every obvious control, return path, caption control and completion state passes on desktop, tablet and mobile.

### Phase 7: Parent Cockpit simplification

- redesign Overview around attention, recent change and next action
- combine learning views under one Learning area
- combine writing and records under Evidence
- retain wrong-answer-first attempt review
- use compact adult rows, timelines and drill-downs rather than child-style card walls

Exit gate: parent PIN is required, family/child scoping is correct and all historical Aarin records remain available.

### Phase 8: Staged release

- deploy to a non-public preview first
- run full migration rehearsal against a copied dataset
- complete local and preview QA
- run bounded Claude Opus design/release review after patching local findings
- deploy production with feature flags initially off
- migrate the Gupta family, validate, then enable the new experience for that family first
- monitor errors and data counts
- expand to new family signup only after the Gupta account passes acceptance testing

## QA programme

### Cycle A: Static and automated

- schema migration tests, rollback tests and fixture reconciliation
- API contract, authentication, authorisation and cross-family isolation tests
- child/parent privilege tests
- duplicate-event and interrupted-migration tests
- lint/build checks and route/asset integrity

### Cycle B: Functional browser QA

Test at 1440 x 900, 768 x 1024 and 390 x 844:

- signup, login, logout and expired session
- incorrect password, repeated attempts and rate limiting
- one-child automatic entry
- multiple-child chooser and child PIN
- Parent Cockpit PIN and privilege timeout
- switching child and switching family
- every child and parent destination
- browser Back and visible app return paths
- progress save, reload and cross-device retrieval

### Cycle C: Visual and interaction QA

- no clipping, overlap, hidden focus or inaccessible controls
- one obvious primary action per child screen
- 44 x 44 pixel minimum internal touch target
- no long empty card walls
- meaningful loading, empty, error, success and locked states
- motion aligned to interaction and disabled under reduced-motion preference
- shared illustration quality and consistent icon treatment

### Cycle D: Data integrity QA

- compare before/after record counts and checksums
- inspect representative attempts from every course
- verify Chemistry selected answers, correct answers and feedback
- verify Parent Cockpit wrong-answer-first popup
- verify stars, rewards, writing and unlocks
- verify AGMaths deep links use Aarin's correct identity

### Cycle E: Independent review

- send bounded screenshots, architecture summary, QA report and migration reconciliation to Claude Reviewer/Opus
- patch high-priority findings
- repeat affected QA suites rather than relying on review comments alone

### Cycle F: Production verification

- verify login and session cookies on the live HTTPS origin
- verify Aarin's child home and all historical data
- verify Parent Cockpit PIN and record drill-down
- check console, network, API and Cloudflare logs
- run desktop, tablet and mobile smoke paths
- keep rollback flag and old data available through the observation period

## Usage-window continuity

Work will be split into independently verifiable checkpoints. At the end of every work window:

- finish or revert the current atomic change; do not leave a partially active migration
- update this plan and a concise handoff log with completed work, current commit, tests and next command
- keep feature flags off until a complete surface passes its exit gate
- persist QA artefacts and migration reports under dated output folders
- never deploy merely because a usage window is ending
- resume from the last verified checkpoint after the refill window

## Public-release gate

Production remains **NO-GO** until all are true:

- rollback tag and D1 backup exist
- authentication and cross-family isolation tests pass
- the Gupta account resolves to Aarin automatically
- all existing Aarin data is reconciled with no unexplained loss
- Parent Cockpit still requires its PIN
- wrong-answer-first review works
- all critical child and parent paths pass desktop, tablet and mobile QA
- no unresolved Critical or High defects
- Claude Opus high-priority findings are patched and retested
- live verification succeeds after deployment

## Out of scope for the first release

- social features or communication between children
- public profiles
- child email addresses
- third-party advertising or analytics
- major course-content rewrites
- Physics course implementation
