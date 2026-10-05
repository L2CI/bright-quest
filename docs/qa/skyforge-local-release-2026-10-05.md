# Skyforge local import and release checks

## Package and scope

Retrieved the original cloud release from the owner's private Bright Quest Exchange source using the supported Sites opening workflow. No Exchange source push or publication was performed. The ZIP was 787,634 bytes and matched SHA-256 `6255d98caad88ec4b3cd29d55efc9f50b25c4a4bcf49c9e9e1dfc11d4fed7025`.

Git verified the release bundle. Imported commit `346122671ee70a5224ba402e633b0577f0db9ebf` is based on released main `736aed88797bf25e3394f232f43e2ec64f10ffe7`; remote main had not advanced. No existing work was overwritten.

Local corrections:

- Resolve the browser-test output directory with `fileURLToPath` so it works on Windows.
- Return Skyforge parent review to `#parent/evidence` through both return controls.
- Honour that explicit return route at family-auth startup only after the server validates the existing parent capability. Expired or invalid parent access still prompts for the PIN; unauthenticated requests still show family sign-in. Child entry retains the existing parent-lock behaviour.
- Extend browser coverage to click both portal launch paths, parent Evidence return, help/close and child Play return. Add three authentication regressions for the parent return route, and verify the changed authentication script in the public asset check.

## Local verification

All tests use fictional local families and ephemeral databases.

- Six Skyforge domain tests, including 120 mission/loadout simulations.
- 81 Skyforge API assertions against real ephemeral D1: authentication, family/child isolation, replay/concurrency, five session races, rollback and preservation of non-empty existing saves.
- 84 preservation, profile-sync and authentication UI tests after the navigation correction.
- 770 existing Sparkbound and Beacon tests.
- 12 parent-PIN recovery tests and 21 family-password recovery tests. The unified API harness also passed.
- Cloudflare Pages Functions compile passed with Wrangler 4.99.0.
- 27 browser assertions passed on installed Chrome in a fresh isolated profile: desktop 1440x900, tablet 834x1112 and phone 390x844. Covered the full campaign, photo/draft reload, offline save retry, original/corrected answers, equipment, battle resume, journal, parent review, both portal launches and return paths. The only console failure was the intentionally blocked offline POST.
- Six graphics/viewport combinations passed with finite volumetric geometry and both fighters in frame. Synthesised audio was running, finite, nonzero and unclipped; no browser errors.
- Inspected fresh desktop, tablet and phone screenshots for briefing, paper training, combat and portal layout. Controls remained visible with no horizontal overflow. The rendered game uses stylised 3D models; its painted key art is distinct from gameplay rendering.
- The parked chemistry lesson is unchanged. No database migration, recovery-email configuration or credential reset is included.

Evidence is in ignored `outputs/skyforge/`: browser and graphics JSON, screenshots and local test logs. The original cloud evidence remains in `docs/qa/skyforge-2026-10-01/`.

## Production verification

Release through the authorised GitHub main to automatic Cloudflare Pages path. A successful push alone does not establish deployment success. Check the new commit's Cloudflare Pages check, run `tools/verify-skyforge-live.mjs`, then `tools/verify-skyforge-live-browser.mjs`. The latter uses a fresh unauthenticated browser and blocks every non-read request. Record results locally with the deployed commit and deployment ID.

Production checks do not use family credentials or modify learner records. Physical-device camera capture, audible listening and real-account gameplay remain outside this verification scope.
