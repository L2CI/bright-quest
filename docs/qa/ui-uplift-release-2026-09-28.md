# Bright Quest UI uplift release

28 September 2026. The user explicitly authorised publication after reviewing the completed implementation.

## Scope

- Four child destinations and a complete searchable catalogue, with nine original painted scenes and retained game artwork.
- Clearer parent overview, full evidence, family settings and focused lesson/test layouts.
- Save ordering, draft retention and identity safeguards. Original learning banks, historical scores and protected lesson files remain unchanged.
- Family password and verified parent PIN recovery by registered email. The recovery code ships disabled until its independent configuration and migration gates are ready.

## Verified before publication

- 114 scoped checks: 49 preservation, nine sync, 21 password API, 12 PIN API and 23 auth UI checks.
- Existing unchanged game suites previously passed 85 Beacon and 685 Sparkbound checks; total recorded coverage is 884.
- Desktop, tablet and phone browser review with fictional accounts; recovery request/link/error/cancel paths and unchanged learner records.
- Local Cloudflare Pages Functions bundle compiled successfully with Wrangler 4.99.0.
- Remote main matched baseline `62e75ec` when checked. Publication follows the established GitHub main → automatic Cloudflare Pages route, without forced push or direct upload.

## Data and email boundary

This release does not run a migration, change an existing password/PIN or write learner records. Recovery migrations 0005 and 0006 are additive, authentication-only, and remain unapplied until email setup can be completed. The service reports unavailable when its required migration, origin, sender and secret settings are missing. Cloudflare administrative access was signed out during release preparation; sender/domain was not supplied.

Production verification will check Cloudflare's deployment status, published asset hashes, auth configuration and browser routes. Evidence belongs in the workspace output folder `outputs/brightquest-uplift-live-2026-09-28/`, separate from the public source tree. Real account information is not exported into test artifacts.
