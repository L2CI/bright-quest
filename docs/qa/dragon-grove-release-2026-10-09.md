# Dragon Grove release review — 9 October 2026

## Delivered experience

- An initial newborn and ten earned dragon evolutions. Each chapter has maths, living-things and physical/Earth science questions; a stable child-specific selection comes from 90 original questions.
- Fire, Storm, Nature and Astral accumulate independently. Body proportions, stature, crown, eyes, wings and markings develop over time. The source model has a real skeleton and authored animation; fire and other powers follow the animated mouth.
- Twenty adventure objectives, including a three-part finale. Mistakes preserve progress. The child can revisit earned appearances and a paginated learning journal.
- Parent Evidence links to read-only original answers, corrections, hints and choices. Play and parent return paths retain the existing Bright Quest shell.

## Data preservation

The new game appends only to its own event namespace. No migrations, existing profile edits, stars changes or account-recovery setting changes are included. Snapshots are compact; evidence is immutable per action. Concurrent actions share an atomic browser outbox and server version checks. Sessions are checked at the database commit boundary.

The real D1 suite includes non-empty legacy profiles/events, child profiles, Beacon, Sparkbound and Skyforge saves; they remain byte-identical after the new campaign. All test families and answers are fictional. No production learner records are used or written by QA.

## Checks

| Area | Current evidence |
|---|---|
| Curriculum, progression and preservation | 65 passing Node tests: 9 content, 7 domain and 49 existing preservation tests. Includes 68 full pure/mixed path simulations. |
| D1 API | 230 assertions: ten-level campaign, marking, evidence pagination, replay, concurrency, six session races, rollback/corrupt-state behaviour and existing-data preservation. |
| Browser journey | 55 checks at desktop 1440×900, tablet 834×1112 and phone 390×844. All ten chapters played through the UI, including wrong answers, hints, draft reload, a committed request with a lost response, four paths, finale, gallery, journal, parent portal and Play return. |
| Browser storage | 142 real Chrome/IndexedDB assertions across two tabs and 20 simultaneous races, including stale confirmations, owner isolation and reload. |
| Source protection | 133 canonicalisation assertions and 127 compiled Pages runtime assertions. Normal static and API routes pass. |
| Account recovery regression | 33 passing tests against fictional local accounts. Existing production flags remain unchanged. |
| Graphics | All eleven body states, four powers, authored animation, newborn/adult mobile frames, reduced motion and disposal checked. No shader or browser errors in the renderer proof. Screenshots inspected and lighting, crown proportions, framing and phone spacing refined. |
| Audio | 23 real Chrome checks. Recorded soundtrack and all eight effects produce finite, nonzero audio. Maximum sampled post-master peak 0.280009, zero clipped samples; independent controls, mute and lifecycle pass. |

## Visual and sound limits

This is a detailed, freely licensed 3D dragon within an original panoramic woodland scene. It uses one coherent sculpt and skeleton with staged proportions and a juvenile crown morph. The source has no bespoke breath clip; the game adds a jaw/head overlay and mouth-attached effects. It is a chapter-based learning adventure with target choices, not a freely explorable open world.

Music is the freely licensed recording *Enchanted Valley* by Kevin MacLeod. Fire and wings use licensed recordings; other cues use original synthesis. Audio was measured in Chrome, not human listening-reviewed. Headless Chrome did not expose a hidden-tab transition; real suspend/resume and the app's visibility handler wiring were verified separately.

The renderer caps device pixel ratio at 1.5, runs at up to 30 fps and drops to 10 fps for reduced-motion idle. Renderer, forest and dependencies transferred 8,349,890 bytes from the uncompressed local server, excluding audio and question/power icons. The model uses a 6.38 MB compressed transfer with a 10.23 MB raw compatibility fallback. Music streams after a gesture. These are local measurements, not mobile network benchmarks.

## Release routing

A public read exposed an encoded-slash bypass in the older `/tools/*` guard. The new root middleware canonicalises paths and blocks private source/fixture routes plus Sparkbound's existing answer-bank path. It runs before **every Pages request**, adding a small function invocation to static requests. No deployment settings were changed.

Release uses the authorised GitHub `main` → automatic Cloudflare Pages route. Deployment success, exact live asset hashes, source exclusions and live browser verification are recorded in `outputs/dragon-grove/release-receipt.json`. A Git push alone is not completion.

## Reproduce

Use `npm run test:dragon-grove`, `npm run test:private-routes`, `npm run qa:dragon-grove`, `npm run qa:dragon-graphics` and `npm run qa:dragon-audio`. Browser tools use `CODEX_PRIMARY_RUNTIME_NODE_MODULES` and `BQ_CHROMIUM_PATH` from the configured local runtime. Windows workerd needs execution outside the restricted sandbox. The test harness remains ephemeral and separate from production.

After deployment, run `node tools/verify-dragon-grove-live.mjs`. Setting `BQ_VERIFY_ORIGIN=https://bright-quest.pages.dev` for the browser QA loads real deployed assets while intercepting every API request into ephemeral local D1. No production gameplay writes are made.
