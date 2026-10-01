# Skyforge: Titan Command — independent design review

Date: 1 October 2026

Status: design review; implementation and release gates below remain to be verified.

This review was performed by an available independent Codex reviewer. Claude Fable was unavailable in this environment; this document does not represent a Claude Fable review.

## Reviewed direction

A new original 3D mech action-strategy campaign with twelve missions. Each mission requires three multiplication answers worked on paper, a photograph of the work, and typed final answers. Correct answers award three upgrade points for weapon, shield or reactor improvements, followed by a tactical battle. Defeat permits a retry with the same earned learning progress and loadout. Photography remains on the device; cloud state records answer/evidence metadata and game progress.

The user explicitly clarified a starting difficulty of two-digit by two-digit multiplication, progressing to a maximum of four-digit by three-digit. Preserve this range. Offer partial-product and place-value hints, generous retries and no learning timer; do not silently reduce the requested difficulty.

## Critical findings and agreed fixes

1. **Reserve the authoritative event namespace.** The existing `functions/api/events.js` accepts arbitrary authenticated `eventType`, `eventId` and payload values. If Skyforge trusts rows in the same `family_profile_events` table, this generic endpoint could forge game progress. Reject Skyforge event types (`skyforge.*`) and idempotency keys (`skyforge:`) in the generic endpoint. Only the new validated game endpoint may produce authoritative Skyforge state. Test both paths and verify ordinary events still work.

2. **Make concurrent mutations and retries deterministic.** Use unique per-child next-version keys and conditional insertion. A repeated operation must return the previously committed result only when its identity and payload match. A conflicting operation must return current state without spending or awarding twice. Do not treat an arbitrary `ON CONFLICT DO NOTHING` as successful application. Server-side mission definitions and transitions determine answers, upgrades, rewards and progression; never accept an entire arbitrary client state snapshot as authoritative.

3. **Bind asynchronous work to the original child.** Capture family, child and capability when preparing requests or processing photos. Recheck these before applying local or remote results. At the database write, require the original live session and selected child to remain valid; a preflight session read alone leaves a child-switch/logout/reset race. Existing multi-child authentication requires `x-bq-child-capability`. Switching children must not redirect an old queue to the newly selected profile.

4. **Describe photo checking accurately.** The proposed implementation checks typed numeric answers; it does not read handwriting or prove that the photographed working is correct. Label photos as locally saved work for review. Require successful local photo storage before declaring evidence saved or allowing its associated gate. Do not claim AI marking or handwriting verification. Parent-visible review should distinguish numeric correctness from unverified photographed working.

5. **Recover gracefully from device-only evidence loss.** IndexedDB storage can fail or be cleared. Do not show a hash as if it were a retrievable photograph. Cross-device review must show “Photo is on the original device” where applicable. Clearing site data must not remove confirmed cloud progress. A storage failure must keep the current answers and permit retry or a clear supported recovery path; no silent pass and no silent data replacement.

## Experience acceptance criteria

- The child sees a clear mission objective, their original mech and one primary next action immediately. The product launches into a playable experience rather than a promotional page.
- The paper gate presents one clear set of three problems, supports leaving and resuming, and provides place-value coaching without erasing correct answers. Wrong answers do not remove already earned upgrades or progress.
- Enemy intent is visible in text/icon form before a move. Strike, Guard, Breaker and Repair each have a meaningful use and a visible consequence. At least two viable loadout strategies complete the campaign; a single repeatedly selected move must not dominate every encounter.
- A defeat explains the tactical cause and offers retry without repeating the completed paper gate. A replay cannot duplicate mission rewards or bypass a future learning gate.
- Campaign locations, enemy behaviours and boss encounters vary beyond changes to numerical health and colour. Mission selection clearly indicates locked, current and completed missions.
- Hero machines are recognisably authored articulated models with convincing animation, materials, lighting and environment composition. Inspect actual rendered gameplay frames; promotional art alone is insufficient proof of graphics quality.
- Touch controls have clear labels and adequate targets; desktop supports visible focus and keyboard interaction. Test narrow phone portrait, tablet and desktop without clipped controls or horizontal overflow.
- Mute/music/effects controls work. Audio begins after a user gesture, pauses when backgrounded, and respects reduced-motion preferences for camera shake/flashes. Important information never depends on sound or colour alone.
- Camera/file selection supports cancellation, invalid files and storage failure. Use bounded image dimensions and byte sizes, strip image metadata through re-encoding, and release temporary image URLs. Do not send photo content to analytics or external services.
- Local photo records are scoped by family and child and accessed only under the correct active identity. A shared device must not reveal another family's or child's photographs. A clear deletion action may delete the chosen local photo without rewriting the cloud learning record.

## Persistence and preservation acceptance criteria

- Reject unauthenticated requests, wrong child, missing/expired child capability, spoofed family, invalid answer formats, out-of-order progression and invalid upgrades.
- Verify duplicate requests, changed-payload replay, stale versions and simultaneous competing requests result in exactly one committed mutation and no duplicated rewards.
- Verify logout, child switch, expiry and reset between request preparation and write cannot record progress under another profile or retain a stale authenticated mutation.
- Confirm reload resumes confirmed progress. Show pending/failed saves honestly; do not display unconfirmed completion as cloud-saved. Retrying failed requests does not require redoing completed learning.
- Photograph metadata is immutable per submitted attempt. If re-photographing is allowed, record a new evidence item rather than replacing historical metadata.
- Compare pre/post synthetic database records to verify existing child profiles, learning records, other-game saves and unrelated events remain unchanged. Only the game's own new events and necessary authentication housekeeping may change.
- Run existing scoped preservation and game regression suites and compile Pages Functions. Do not change the parked chemistry lesson or unrelated infrastructure.

## Release acceptance criteria

Use the authorised scoped GitHub push and established automatic Cloudflare Pages deployment. Record deployment success and verify the deployed revision and game assets in production. Separate synthetic local QA from production verification and identify any missing authenticated live test, physical-device performance measurement or audible review explicitly. No real learner-data edits or credential resets are needed for release verification.

The next review should examine the implemented domain transitions, SQL concurrency/session conditions, photo lifecycle and automated evidence against these criteria before release.

## Initial implementation review

The initial implementation was inspected in `functions/_lib/skyforge.js`, `functions/api/skyforge.js` and `functions/api/events.js`.

- The reserved namespace guard is implemented in the generic event endpoint, covering both event type and idempotency key, including case variants.
- The SQL insertion uses a unique next-version key and a live session/child/capability predicate. The independent API suite injects session changes immediately before the real D1 insertion to verify this boundary.
- A release-blocking exception-handling defect was found: both branches returning asynchronous `replay(...)` omit `await`, allowing replay conflict rejection to escape the endpoint's error handler. The required fix is `return await replay(...)` in both branches; subsequent test results must verify it.
- A balance issue was reproduced: choosing Strike every turn wins all twelve missions using either an all-cannon or all-armour loadout. Later encounters should require responding to telegraphs; retain at least two viable informed strategies.
- Non-object JSON bodies should be rejected as a client error; the initial code turns JSON `null` into an internal error.

`tools/test-skyforge-api.mjs` is the independent integration suite. It creates synthetic families in an ephemeral Miniflare D1, invokes the actual handlers, and does not read production credentials or bindings. Its final run result is recorded below once the identified fixes are applied.

## Verification after corrections

The two replay returns were changed to `return await replay(...)`, and non-object request bodies are rejected before accessing their fields. The independent API integration suite then passed **81 assertions** against ephemeral real D1. Coverage includes duplicate and competing writes, changed-payload replay, invalid inputs, unauthenticated and cross-family access, parent-only evidence, both reserved event namespace paths, SQL write failure, and five changes injected immediately before insertion: child switch, capability rotation, capability expiry, session expiry and sign-out. Existing child/family/user records, non-empty Beacon/Sparkbound saves and operation receipts, and unrelated event rows remained unchanged.

After increasing charged-attack damage to `58 + mission × 5`, independent simulation tested the simple informed policy “Brace against charge; Breaker against shield when charged; otherwise Strike” across **120 mission/loadout combinations** (all ten legal allocations across twelve missions). All completed successfully. The finale took six or seven turns depending on the kit. Repeated Strike now fails the final boss with an all-cannon kit and fails every boss with an all-armour or balanced kit, closing the original dominant-action issue.

Optional polish findings: make Scout, Warden and Sentinel intent patterns distinct; explain that Repair still permits the opponent's attack and that Brace is the response to a charged attack. More sophisticated adaptive encounter design and measured child enjoyment are not established by these deterministic simulations.

The tests do not establish that handwriting was read or checked, that device-only photographs exist remotely, that production deployment succeeded, or that physical-device graphics/audio performance was measured. Those remain separate product and release verification responsibilities.

## Final frontend/static review

Reviewed `skyforge/game.js`, `storage.js`, `world.js`, `audio.js`, the module HTML/CSS and the child/parent portal integration. The frontend clearly distinguishes typed-answer marking from unverified photographs; photos are re-encoded locally to bounded JPEGs, removing original metadata, and are stored under family/child/hash keys. The game uses same-origin requests and local authored audio; this review found no photo upload or external tracking path.

Material findings sent to the implementing agent before release:

1. **Draft-load race:** the initial training render enables input before asynchronous IndexedDB draft loading, while the global draft can still belong to the prior question. Reset draft synchronously and gate input/photo/submit/hint actions until the correct render epoch's draft is ready. Do not let stale loads unlock a pending save.
2. **Recovery identity check:** “Load latest campaign” must verify the GET response's owner and profile against the original owner before adopting its state. Otherwise signing into another single-child family in another tab can mix that family's returned state with the old local-photo namespace.
3. **Local-photo access after session changes:** revalidate the session/owner on journal or photo access, or on resume, rather than indefinitely trusting an earlier `authenticated=true`. Server-side child checks already protect mutations; local cached photographs need an equivalent UI boundary.
4. **Storage abort handling:** add `transaction.onabort` rejection to `storage.remove` so an aborted pending-receipt deletion cannot leave the game waiting indefinitely.
5. **Articulation:** attach hand-held cannon/shield equipment to the moving arm/forearm hierarchy. The initial body-level equipment group allows moving arms to separate from their tools during firing.
6. **Graphics lifecycle:** dispose or pool owned effects/region materials, in addition to their geometries. Preserve shared actor materials. Avoid constructing a hidden continuously rendered 3D world in the parent-review-only view.

These are static-review findings, not claims of reproduced browser symptoms. The implementation owner should record fixes and browser checks separately. Actual screenshots, touch layout, sound quality and production availability are outside this static pass.

## Final static disposition

Re-read the current implementation after the six frontend fixes:

- **Draft race closed:** each render clears the in-memory draft, and training answer/photo/submit controls start disabled. Draft loading verifies the render epoch, restores the correct photo, marks `draftReady`, and only enables controls when no mutation or pending receipt blocks them. Submission checks `draftReady`.
- **Recovery identity checked:** the load-latest path requires the original `owner` and canonical profile ID before adopting state or removing its pending receipt.
- **Local photo access revalidated:** journal and photo opening call `ensureOwner`; return to a visible page also revalidates an open dialog. Authentication/owner changes close the dialog and require returning to the profile.
- **Storage abort covered:** pending-receipt deletion now rejects aborted transactions explicitly.
- **Equipment follows the articulated rig:** hand equipment groups belong to the corresponding arms; cannon and shield are built in these groups, while torso equipment remains separate.
- **Material lifecycle bounded:** colour/material combinations are cached, cloud/water materials reused, and cached materials disposed on world disposal. Parent evidence returns before constructing the 3D renderer.

The current API suite was rerun after the additional request-type validation and encounter-pattern changes: **81 assertions passed**. The implementation owner separately reports a fresh 120-combination domain pass after differentiating the four enemy patterns; that rerun is not claimed as an independently executed balance result here.

**Disposition:** no unresolved release-blocking issue remains from this independent source/API review. Desktop/mobile screenshots, camera composition, practical sound quality, browser interaction evidence and verified Cloudflare deployment remain the implementation owner's release checks. This disposition does not replace those checks.
