# Beacon Brigade: Fleet and Discovery Stops

Status: pre-release QA GO, 5 September 2026. Live verification is recorded
separately in `outputs/qa-beacon-valley/live/report.json` after the Git-triggered build.
Preview: http://localhost:4187/beacon-brigade/?preview=1#map

## Delivered

- Five original vehicle models: Atlas tank, Falcon scout buggy, Titan eight-wheel
  cargo truck, Summit rescue rover and Terra engineering crawler. Layered armour,
  visible running gear, tyre/tread movement, glazing, vents, lights and material
  contrast replace the previous shared tank silhouette. No firing or human combat.
- Inspect each model in the full-screen world before equipping. Previewing never
  spends resources or changes equipment. An active expedition keeps its snapshot.
- Four small destinations: Joke Jetty, Riddle Nook, Lookout and Number Trail.
  There are 28 short activities, with retries/reveals, next-item controls and
  discovered markers. These optional breaks do not award cargo or alter answers.
- Connected paths and parking, a timber stage, stone puzzle arch, telescope deck,
  number stones, pond, stream, reeds, flowers and rocky outcrops.
- Discovery progress is child-scoped local device storage, not cross-device
  assessment history. Reset confirmation explicitly covers local discoveries.

## Visual Research

Reviewed Last Z's official listing and vehicle screenshots for silhouette,
layered armour, substantial tyres, tread assemblies and readable material contrast:

- https://apps.apple.com/us/app/last-z-survival-shooter/id6503272652
- https://www.ldshop.gg/blog/last-z/vehicle-modification-guide.html
- https://www.z-elite.org/images/tank/destroyer-ex3.png

All playable models and thumbnails are original Three.js work. Reference images
were kept outside the repository and were not imported into the game. Sources
and current asset hashes are in `beacon-brigade/assets/provenance.json`.
This is detailed lightweight browser 3D, not photorealism.

## QA Evidence

All browser runs used muted Chromium and synthetic local child data, never a
real child's production account. Viewports: 1440x900, 834x1194 and 390x844.

| Gate | Result | Evidence under workspace outputs |
| --- | --- | --- |
| Domain, API, campaign and content tests | 85/85 | `npm run test:beacon` |
| Authenticated 25-mission playthrough | 204/204, no errors | `qa-beacon-brigade-authenticated/report.json` |
| Buttons, map, camera, pause, focus and return paths | 57/57, no errors | `qa-beacon-edge/report.json` |
| Equipment, construction, snapshot and actual Parent PIN review | 12/12 | `qa-beacon-campaign/2026-09-05T10-39-36-038Z/report.json` |
| Fleet and discovery regression | 138/138, no errors | `qa-beacon-discovery/report.json` |

The final discovery run includes 24 return-route checks, all five vehicle models
on all three viewports, nonblank canvas pixels, correct equipment persistence,
every activity destination, reveal/retry/next/reload, active-mission detour/resume,
and both reset cancellation and confirmation. Original wrong answers remain
visible through the unchanged Parent review workflow.

Manual screenshot review prompted fixes for tablet camera clipping, obstructing
lamp posts in equipment images, activity parking near the river and mobile stop
framing. Return routes now use the arrival connectors rather than cutting to HQ.

## Remaining Boundaries

- Publishing was explicitly approved on 5 September 2026. Use the established
  GitHub-to-Cloudflare production path; no database migration is required.
- Desktop browser emulation is not proof of real iPad/Android GPU performance.
- Child playtesting remains the test of enjoyment. Optional content is not an
  assessment or a certified curriculum product.
- Existing auth, Parent UI, Chemistry files and production data were not edited.
