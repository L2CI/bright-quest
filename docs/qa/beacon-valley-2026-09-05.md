# Beacon Valley Release Review

## Scope

Beacon Brigade only: restrained miniature landscape, generated ground texture,
distinct subject campuses, direct building taps, three vehicle loadouts, three
permanent restoration projects, early visible repairs and optional question tools.
No migrations, authentication changes or production learning-data edits.

## Content

Reviewed all 32 templates / 64 variants. Maths buildings retain their topic on
repeat visits. Shorter wording, concrete evidence and worked support target an
eight-year-old; more advanced particle concepts supply the needed facts rather
than requiring recall. Science wording avoids unsupported conclusions from
bubbles, magnetism and dissolving. Existing saved question snapshots stay intact.
This is an engineering/content review, not a formal teacher certification.

## Verification

- Build: `npm run build:beacon` passes.
- Domain, authenticated API/D1, campaign and content: 52 tests pass.
- Full authenticated 25-mission browser play-through: 204 checks pass.
- Edge cases and direct miniature taps on desktop/mobile: 57 checks pass.
- Campaign browser/D1: 12 checks pass, including all three projects, vehicle
  snapshots, early repairs, Parent evidence and reset during a live drive.
- Actual Parent PIN / wrong-first review / sibling isolation: 20 checks pass.
- Field lab: 46 supported instances; sharing, counting, evidence comparison,
  state retention, keyboard, touch targets and 320/375px layouts pass.
- Manual screenshots inspected across 1440x900, 834x1194 and 390x844. Canvas
  pixel variation, moving renderer, loaded assets, camera anchoring, back paths,
  travel pause/cancel, lost-response retry and save persistence checked.
- Browser QA is muted and uses synthetic children in isolated ephemeral D1.
- No runtime errors in the passing browser suites.

## Refinements From QA

Fixed tank/workshop overlap, trees obscuring project artwork, mobile map controls
covering a destination, reset reopening a station after travel, and a direct HQ
building tap being mistaken for a subject district. Project artwork and vehicle
portraits are captures of the actual world, not unrelated concept imagery.

## Evidence And Release Boundary

Local evidence is under `outputs/qa-beacon-valley`, `outputs/qa-beacon-edge`,
`outputs/qa-beacon-brigade-authenticated`, `outputs/qa-beacon-campaign` and
`outputs/qa-beacon-parent-auth` beside the repository. Field-lab screenshots
are in the local temporary `beacon-field-lab-qa` folder.

Release uses the approved existing GitHub main -> Cloudflare Pages integration.
`tools/verify-beacon-live.mjs` checks deployed asset hashes and the real login
gate, then exercises production static assets against an isolated local backend.
It never writes to production child records. Its output records the post-deploy
result separately; a successful local check alone is not a live-release claim.
