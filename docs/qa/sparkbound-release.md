# Sparkbound Release Record

6 September 2026. Local implementation; production release is pending.

## Scope

- New `/sparkbound/` module, original Relay and Prism art treatment over licensed
  CC0 Quaternius animated mech rigs. Local assets, physical materials, articulated
  motion, industrial harbour, textured animated water and mechanical forge.
- Three actual battles; two maths tasks unlock a guard-piercing staff; two science
  tasks unlock protective equipment and Special. Twenty-four authored variants
  rotate across six matches. No question generation or AI marking at runtime.
- Native animation contact callbacks drive damage displays and impact sounds.
  Upgrade equipment unfolds; first promotion gains visible armour fins.
- Optional original synthesised audio. Default muted, gesture-gated, stopped on
  pause, mute and tab hiding. No commercial soundtrack or franchise content.
- Existing family/child capabilities, separate versioned D1 state and operation
  receipts, exact answer snapshots, wrong-first Parent review popup, both portal
  launch locations, history-preserving restart and honest support labels.
- Answer-bearing content is server-only at `functions/_lib/sparkbound-content.js`.
  The old public content path explicitly returns 404. The learner bundle imports
  neither the authority nor the marking bank.

## Verification Evidence

Evidence files are under `outputs/sparkbound-build` in the parent workspace.

| Gate | Local evidence |
| --- | --- |
| Rules, content and API | 112 passing tests; transactional replay, race/rollback, two-family isolation, strict input, redaction, old snapshots, history and support paths |
| Repeated play and balance | 20-match evidence soak; 120 seeds per policy; adaptive policy wins 120/120, fixed Strike/Guard/Break do not dominate |
| Browser full match | `game-qa/report.json`: real UI through three rounds, four forge tasks, wrong answer and worked support, victory, refresh, review, Back and restart |
| Question and recovery matrix | `edge-qa/report.json`: all 24 variants; numeric/ordering drafts; lost-response replay; portrait/landscape; sound controls; nonblank canvas pixels |
| Character motion | `mechs/game-motion-results.json`: native timing, measured contacts, independent counter hit, passive open Guard, tier persistence, resize and forge framing |
| Environment/audio | `stage/report.json` and `stage/game-report.json`: assets, canvas, lifecycle, original sound signal generation and mute/hidden cleanup |
| Parent review | Desktop/tablet/mobile screenshots plus synthetic authenticated review checks, wrong-first evidence, Retry, Escape and browser Back |
| Existing Beacon Brigade | 85 regression tests passed; no Beacon game source or saved data changed |
| Pages compilation | Functions compiled with the private bank; installed Wrangler excludes root `functions` before static traversal |

Visual refinements made after first inspection: portrait hero cropping, short-phone
Confirm clipping, permanently visible answer choices, readable circuit diagrams,
shorter science prompts, held correct-answer explanations, real weapon contact,
distinct rival poses, and impact audio moved from wind-up to actual contact.

Scope of confidence: automated Chromium and synthetic local D1, not a child's
playtest, real iPad performance certification, or subjective soundtrack listening
review. Audio QA was muted/offline throughout. The 6-10 minute duration and device
frame-rate targets in the concept are not claimed as measured child outcomes.

## Production Blocker

The existing Wrangler OAuth refresh failed with HTTP 400. No Cloudflare API token
was found in Process, Windows User or Machine environment. A narrowed official
sign-in flow was opened for account read, D1 and Pages permissions. It timed out
without receiving approval. No production schema or deployment has been changed.

Do not push this module live until its two new save tables have been provisioned.
Do not add request-time schema creation as an authentication workaround.

## Release Procedure

1. Renew Cloudflare sign-in using the official Wrangler flow. Do not print tokens.
2. Read production table names and migration state for `bright-quest-db`, database
   ID `1122d594-27f3-488e-aaa3-584bafb1f473`, as bound in `wrangler.toml`.
3. Apply only `migrations/0004_sparkbound.sql`. It creates two isolated tables;
   it does not alter, reset or delete existing learning records. Do not blindly
   apply historical migrations. Verify the new schema read-only afterward.
4. Recheck local scope and QA. Commit only the Sparkbound files, two portal entry
   integrations and build/test commands. User approved the GitHub-to-Cloudflare
   production route in the 6 September build request.
5. Push the scoped commit to `origin main`. Let the existing Cloudflare Pages
   integration build it. No direct Pages upload, forced push or remote change.
6. Check the GitHub commit's Cloudflare deployment result and run
   `tools/verify-sparkbound-live.mjs`. It hashes the live assets, checks the real
   unauthenticated API/gate and denied content URL, then runs the live bundle
   against an isolated synthetic backend without production writes.
7. Only then announce `https://bright-quest.pages.dev/sparkbound/` as ready to test.

Cloudflare references: [D1 commands](https://developers.cloudflare.com/d1/wrangler-commands/)
and [migrations](https://developers.cloudflare.com/d1/reference/migrations/).
