# Beacon Brigade

First playable two-region learning-world slice, 31 August 2026. Local build;
not deployed by this change. The longer-term four-region proposal remains in
`docs/design/beacon-brigade-learning-world-plan.md`.

## Included

- Original Three.js expedition tank, tracked travel, textured terrain, three bases,
  camera controls and three visibly different HQ levels.
- Supply Harbour maths and Discovery Grove science. Three stations per expedition,
  with six authored templates and two validated variants per template in each region.
- Server-authoritative building parts and research cores, confirmation before
  construction, journal, retained original answers, progressive support and retries.
- Bright Quest child launch and Parent Cockpit expedition review popup, missed
  questions first, using the existing family/profile/capability system.
- Default-muted optional browser read-aloud, reduced motion, travel pause/cancel,
  desktop/tablet/mobile layouts and a return to Bright Quest.

No human combat, blood, gore, purchases, advertisements, public chat or copied
Last Z/Transformers/Spider-Man assets. Vehicles are for expedition travel. This is
grounded browser 3D, not a claim of photorealism or a commercial-game art budget.

## Local use

Run the existing static server with an unused `PORT`, then open
`/beacon-brigade/?preview=1`. This explicit preview works only on loopback hosts,
stores separate local preview progress and does not use a real child profile.

The authenticated route is `/beacon-brigade/`. It requires Bright Quest login,
child selection, the existing `DB` binding and migration `0003_beacon_brigade.sql`.
`node tools/serve-beacon-qa.mjs` supplies an isolated local test family and in-memory
D1 database using the actual API handlers. It has no production bindings.

Build: `npm run build:beacon`.
Content/database tests: `npm run test:beacon`.
Browser tests: `tools/qa-beacon-game.mjs`, `tools/qa-beacon-edge.mjs`,
`tools/qa-beacon-parent.mjs`, `tools/qa-beacon-parent-auth.mjs`.
Set `BQ_PLAYWRIGHT_MODULE` to the installed Playwright path if it is not resolvable
in the repository. `BQ_QA_AUTH=1` runs the game test against an isolated real D1
harness. All browser tests launch muted.

## Data and recovery

One active expedition per child. A correct or supported resolution credits one
fixed contract reward; the question's numerical answer is not the token amount.
Original wrong responses and support events remain in the saved record. Version
checks and operation receipts protect resource/answer writes against replay and
concurrent updates. Lost responses retry the same operation, not a second award.

The pilot retains up to 100 expeditions, then stops new ones with a clear error
instead of deleting evidence. Before a wider/longer release, add paged history
storage and a deliberate retention policy. Device drafts and pending-save markers
are namespaced by child UUID. These are not authoritative wallets.

## Scope still ahead

The other two regions, freely controlled driving, squad management, interactive
physical experiments and a larger construction tree are not implemented in this
slice. Science currently uses explicit recorded evidence with inspection highlights,
not a live physics simulation. No artificial countdown or loss of earned resources.

Question consistency is covered by deterministic tests and a separate content
review, but final year-level mapping/educator review and a child playtest remain
open. Do not label the content ICAS material or a certified curriculum product.
Real iPad/Android performance and audible voice quality still require device testing.

## Release boundary

On an explicit push request, use the established GitHub-to-Cloudflare Pages path,
apply the additive D1 migration using the existing release procedure, and verify
the live child launch, persistence and Parent review. No remote Git action,
production migration or Cloudflare deployment was performed for this local build.

Asset sources and licences: `assets/ATTRIBUTION.md` and `assets/provenance.json`.
The portal thumbnail is captured from the actual rendered game, not concept art.
