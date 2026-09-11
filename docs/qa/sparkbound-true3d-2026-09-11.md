# Sparkbound True3D Release QA

## Scope and boundary

11 September 2026. Original Blender armour for eleven heroes and Prism, articulated
in Three.js using retained CC0 skeletons. Six equipment stages per character,
rotatable inspection, new rules-v4 techniques and matching upgrade guide.
No paid generation service was used. Existing saved rules versions remain intact.

All browser QA is muted and uses synthetic profiles with ephemeral local D1.
Mobile/tablet evidence is Chrome viewport/device emulation, not physical-device
certification. Sound synthesis was not changed or subjectively listened to.
Parent review tests exercise the actual popup and evidence module, not a real
parent's sign-in flow. No production learner records are modified.

## Completed checks

- Domain/API/content/campaign suite: 685 passed, zero failed or skipped.
- Technique motion suite: 112 scenarios, 1,561 checks, zero failures or browser
  errors. Covers launch positions, salvo shot totals, rail targeting, counter
  timing and one aggregate damage application. Thirty screenshots retained.
- First-time guide suite: 710 checks, zero failures, 44 screenshots across five
  viewports. Practice, returning saves, reduced motion, dismissal and reload.
- Cold boot suite: six fresh contexts, five compressed-model loads and one
  forced raw-GLB fallback. Zero browser errors.
- Actual arena art checks: desktop and mobile frames, nonblank canvas, controls
  and module thumbnail. Four checks, zero errors.
- Pages Functions build and route checks: build succeeded, eight checks passed,
  including private development fixtures and answer-bank exclusion.
- Model export: twelve templates, 288 sockets, sixty muzzle markers and seven
  materials. GLB 10,076,856 bytes; compressed delivery 2,362,915 bytes. Generator,
  GLB and compressed hashes and exact decompression round-trip verified.
- All 66 roster/guide portraits rendered from the actual 3D characters.
- Full render matrix: 216 cases, 17,029 checks, zero failed checks or browser
  errors. Twelve characters by six stages by three viewport sizes. Representative
  rear, sole-contact and mobile Prism frames were manually inspected as well.
- Actual campaign and recovery: 2,466 checks, zero unexpected errors. Six rounds,
  five upgrades, fifteen questions, all four combat controls, wrong-answer support,
  completed-save reload, Parent wrong-first evidence, back paths and reset.
  See `sparkbound-true3d-campaign.md` for detailed scope and screenshot review.
- Non-campaign UI: 2,122 checks, zero errors, 167 screenshots. All eleven hero
  start/save/back/reset paths, 66 previews, settings, practice, legacy v2/v3,
  six viewport layouts, desktop drag and mobile/tablet touch rotation passed.
- Fresh in-memory builds reproduce both the tested app and separate QA renderer
  exactly. App SHA-256:
  `63cc3ba171214f6ed446bc07285adb280e67a9c8b3b56eda0e76238fe53e946e`.

## Visual refinement

Manual inspection covered actual desktop/mobile battle frames, representative
hero/weapon portraits, rear armour, floor contact and a stage-five attack.
The complete matrix retains angle, movement and contact screenshots for review.

Fixed before the final runs:

1. Limb armour orientation and length were aligned to the authored bones;
   mechanical links now connect the armour assemblies.
2. Additional salvo projectiles initialise at the muzzle, eliminating a stale
   position flash on their first frame.
3. Shield counters use their own pulse and do not produce an extra enemy reply.
4. Bore targeting accounts for the offset between the grip and weapon muzzle.
5. Each hero's sole height is calibrated to the arena floor.
6. Reflection-map blur was corrected to avoid sample-limit warnings.
7. The local synthetic server now serves gzip assets; its missing MIME entry
   previously produced a fixture-only 404. Fresh actual app boots now pass.

## Final gates

All local release gates passed. The actual full UI campaign uses Echo; domain
tests cover all heroes. Screenshot review was sampled, not exhaustive. Live
deployment verification is pending. This is not yet a live claim.

Release must use the approved GitHub main to automatic Cloudflare Pages path.
After publication, verify deployment identity, every canonical asset hash,
real unauthenticated access protection and a synthetic intercepted live-browser
journey. A successful Git push alone is not evidence of a live release.
