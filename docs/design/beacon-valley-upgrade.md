# Beacon Brigade: Restore the Valley

## Release targets

- A readable miniature valley: natural ground, water, bridges and identifiable subject buildings; every district remains visible and touchable on a phone.
- Three vehicle setups with a useful trade-off, preserved across saves and fixed for each active expedition.
- Three permanent restoration projects, earned through subject expeditions and resources, with visible changes in the world.
- An explicit campaign objective and satisfying progress after a five-site expedition; no time pressure or penalty for using learning support.
- Questions appropriate for an eight-year-old: short wording, accurate science, concrete evidence, hints and hands-on tools.
- Preserve existing saves, original answers, parent review, resource accounting and authenticated child ownership.
- Muted desktop, tablet and mobile browser QA: selection, march, arrival, answers, hints, return paths, equipment, construction, reset warning, refresh and camera alignment.
- Publish only after build, domain/API checks, campaign regression tests and screenshot review pass; verify the GitHub commit on Cloudflare Pages and production asset integrity.

## Game loop

Choose a vehicle setup at HQ, select any subject district, march to its field sites, solve five missions, bring home resources and restore the valley. Completed districts remain replayable. Restoration and learning records use the existing server-authoritative save transaction.

## Visual direction

Detailed expedition diorama, natural sage vegetation and stone, blue-green water, warm sun, distinct restrained roof colours. Quiet aerial map by default; destination detail appears on selection. The terrain is supporting scenery, while buildings, the tank and completed objectives carry the visual hierarchy.

## Implementation ownership

- World: terrain, architecture, campaign landmarks and vehicle attachments.
- Campaign domain: legacy-compatible state, equipment, projects, rewards and tests.
- Content: question accuracy, age fit and independent marking checks.
- Field lab: optional interactive manipulatives using visible question data.
- Integration: player screens, responsive controls, browser verification and deployment.

## Review decisions

Claude Fable reviewed a bounded, non-sensitive game brief. Accepted: an early visible repair, simple vehicle descriptions, distinct building silhouettes, and manipulative learning tools. Retained all five playable subjects to honour the existing game direction. The bridge can be earned after the first Maths expedition; small HQ repairs appear after two and five solved missions. Learning support does not reduce mission cargo.

Question difficulty is anchored in Year 3 with supported stretch. ACARA references checked on 2026-09-05:

- https://www.australiancurriculum.edu.au/resources/work-samples/mathematics/year-3/ws01-ways-to-make-18
- https://www.australiancurriculum.edu.au/support-resources/background-information/science_teacher_background_information_AC9S3U04_E4
- https://www.australiancurriculum.edu.au/support-resources/background-information/science_teacher_background_information_AC9S5U04_E6

The particle model is supported stretch rather than assumed Year 3 recall. Saved historical question snapshots are retained. Current marking and educational consistency checks are not a substitute for observing a child's actual experience.
