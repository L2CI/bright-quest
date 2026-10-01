# Skyforge: Titan Command — release review

1 October 2026. User explicitly authorised design, review, build and publication through the existing GitHub main → automatic Cloudflare Pages route.

## Delivered

- New original game at `/skyforge/`, visible in Bright Quest Play/Learn, with a parent evidence destination.
- Twelve sequential operations across Verdant Reach, Frostline and Ember Rift. Three paper multiplication problems unlock equipment allocation and a tactical 3D battle. Operands progress from 2-digit × 2-digit to 4-digit × 3-digit as requested.
- Three forge cores allocated between cannon, armour and reactor; real geometry and combat stats change. Four enemy intent patterns, Strike/Brace/Breaker/Repair actions, three boss operations, replay/refit without repeating completed maths, new expeditions preserving all evidence.
- Original generated cinematic key art, new articulated volumetric guardian/rogue models and three regional environments, moving projectiles/impact effects, gesture-enabled original synthesised score and effects, separate sound/music and reduced-motion settings.
- Place-value coaching, original wrong answers retained alongside corrections, no calculation timer.

## Photo and persistence boundary

Every answered power code requires an attached photo reference and a typed whole-number answer. Only the typed answer is automatically marked. The interface never claims to read or verify handwriting. Photos are decoded, resized and re-encoded on device, removing metadata; stored under the authenticated family/child in a dedicated IndexedDB database. Photos do not sync or leave the browser. Cloud records contain operands, answers, corrections, hint use, photo hash/size and game state. Camera capture hardware was not physically tested; browser file input/upload and device persistence were.

Cloud progression uses append-only `skyforge.state.v1` records in the existing event table. No schema migration, profile overwrite, existing game-state write, real learner change or recovery configuration change is needed. Unique version keys, operation/payload replay checks and SQL live-session conditions protect races. The generic events API now rejects the dedicated Skyforge namespace; a narrow preservation test strips exactly that reviewed guard and still requires the original API hash.

## Review and evidence

Claude Fable was requested but unavailable in this cloud session: no transferred credentials, callable connection or discovered plugin. The review is explicitly an independent available-agent review, not a Fable review. See `docs/reviews/skyforge-independent-review-2026-10-01.md`.

- New domain suite: six grouped tests, including operand boundary samples and all 120 mission/loadout combinations. Informed policies win every combination; blind repeated Strike fails key bosses.
- New independent API suite: 81 assertions using real ephemeral D1. Covers auth, parent review, family/child scoping, duplicate/payload replay, concurrent version winners, generic-event forgery, rollback, five session-change races and byte-for-byte preservation of non-empty existing profile/Beacon/Sparkbound records.
- Existing preservation/sync/auth UI suite: 81 passing tests.
- Existing Sparkbound suite: 685 passing tests. Existing Beacon suite: 85 passing tests.
- Browser interaction suite: 21 assertions at desktop 1440, tablet 834 and phone 390. Exercises paper upload, no-photo gate, wrong/correct answers, hints, draft/photo reload, offline pending-action retry, equipment gating, battle reload/win, photo journal, settings, final campaign, parent evidence and portal launch. The only recorded console failure is the deliberately simulated offline POST.
- Additional graphics/audio suite checks desktop and phone views of early/frost/final arenas, finite solid geometry, actor framing and an actual nonzero unclipped Web Audio signal. All six combinations passed; both fighters fit, geometry is finite and volumetric, and audio is present and unclipped. Results are preserved in `docs/qa/skyforge-2026-10-01/graphics-audio-qa.json`.
- Cloudflare Pages Functions compile with Wrangler 4.99.0. No new runtime CDN, paid AI service, account or email dependency.

QA uses only fictional local families and synthetic paper images. Raw working outputs live under `outputs/skyforge/`; selected screenshots and final summaries are preserved with this release.

## Release gate

Normal scoped commit/push to main only. Confirm the Cloudflare Pages check has succeeded and run `tools/verify-skyforge-live.mjs` to compare ten public assets against source, verify unauthenticated API rejection and preserved recovery flags. Then check the production sign-in journey at desktop/phone sizes. A successful push alone is not deployment proof.

## Publication attempt — blocked by access

The normal `git push origin HEAD:main` failed because this cloud checkout has no GitHub command-line credentials (`could not read Username`). The connected GitHub app also rejected the initial Git blob write with HTTP 403, `Resource not accessible by integration`. No blob/commit/ref write succeeded and no Cloudflare deployment was triggered. The live application's existing recovery flags were read and remain disabled.

The finished code, review and QA evidence are committed locally. Publication requires an authenticated GitHub connection with write access to L2CI/bright-quest, or resuming this exact release from the original authorised local checkout. Do not claim the game is live or ready for production testing until the normal main push, deployment check and live verifier pass.
