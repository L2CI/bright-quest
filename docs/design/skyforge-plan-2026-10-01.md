# Skyforge: Titan Command

1 October 2026. User authorised design, review, implementation, QA and release through GitHub main → automatic Cloudflare Pages. Baseline 736aed88797bf25e3394f232f43e2ec64f10ffe7. No recovery-email changes.

## Brief and experience
A new original 3D action-strategy campaign for an eight-to-ten-year-old. Twelve operations over Verdant Reach, Frostline and Ember Rift. A blue-and-gold guardian rescues sky-island power relays from rogue machines. Original articulated geometry, volumetric terrain, changing equipment, animated projectiles, cinematic key art and original musical score/effects. No copied entertainment characters.

Each operation: choose mission → solve three written multiplication challenges → allocate three forge cores between cannon, armour and reactor → read enemy intent and command turn-based combat → unlock next operation. Enemy actions are telegraphed; Strike gains charge, Brace counters charged attacks, Breaker pierces shields, Repair trades charge for hull. Replay battle without redoing completed maths. No timer while calculating; optional partial-product hints, wrong answers retained and corrected, no deducted rewards for mistakes. Campaign completion leads to a new remix expedition while preserving prior evidence.

User clarified 2-digit × 2-digit starting problems, mixed progression to maximum 4-digit × 3-digit. Both operands stay within the mission's stated bounds. Three short training questions per operation. Input accepts whole-number answers with spaces/commas, not scientific notation or decimals. Every new answer requires an attached photo of paper working; multiple corrections can reuse that problem's photo. Typed answer is marked, handwriting is NOT automatically read or verified.

## Preservation and storage
New authenticated /api/skyforge endpoint uses existing family session/child capability and pins writes to the current child. Dedicated skyforge event types and unique version keys in existing append-only family_profile_events; no new database migration, existing profile updates or game-state changes. Conditional insert, exact-operation replay, version conflicts and client serialisation prevent double rewards/stale overwrites. Snapshots are bounded; old events/evidence never pruned. Future unsupported state fails closed.

Paper photos: resize/re-encode on device to remove EXIF; store in dedicated IndexedDB scoped to authenticated child. Only SHA-256 reference metadata goes to server. No child photographs sent to external AI. Explain clearly photos remain on this browser/device and do not sync; attempts/progress do. A failed photo save blocks submission with actionable retry. Draft operands/typed entry/photo survive reload. Old photos retained. Cloud never claims to have examined them.

## Review
Claude Fable was requested; previous reviews name claude-fable-5. No Claude credentials or callable connector in this cloud environment, and plugin search returned none. Independent available-agent design/security review is the documented fallback, not a Fable review.

## Acceptance and release gates
- Real playable 12-operation campaign and tactical choices, not a static mockup.
- Arithmetic range/correctness, no answer leak in pre-answer payload, hints, retry, win/loss and campaign continuation covered.
- Authentication, child/family isolation, same-origin mutation, operation replay and racing version writes tested on synthetic ephemeral D1.
- Photo capture/upload, rejection, persistence, restart and device-only explanation verified on desktop and phone. Keyboard/focus, reduced motion, sound/music toggles, no horizontal overflow or JS errors.
- Original 3D meshes/rendering at desktop/tablet/phone; live battle impact aligns with result, clear opponent intent.
- Existing preservation/sync and game suites run as scoped integration checks. Protected chemistry file and existing learner records untouched.
- Commit scoped changes, normal push main, inspect Cloudflare success and verify production content hashes and public/auth-gated routes. No real learner records or resets for QA.

## Status
Implementation complete. Independent design/source/API review complete; all material findings addressed. Domain/API/preservation/game and full browser journey checks pass. Graphics/audio verification passed. Publication is blocked by missing GitHub CLI credentials and the connected app's HTTP 403 write denial; release is tracked in docs/qa/skyforge-release-2026-10-01.md.
