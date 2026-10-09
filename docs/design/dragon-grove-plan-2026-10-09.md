# Dragon Grove: Emberwild

## Approved experience

A baby dragon grows through ten earned stages. Each chapter has three questions: maths, living things, and physical or Earth science. Correct answers unlock a choice of Fire, Storm, Nature or Astral growth. Choices combine, so the child can build a dragon of their own. An adventure uses its powers after every growth step, ending with a three-part finale.

The question ladder moves from approximately Year 3.5 to Year 4.5. These are difficulty descriptions, not formal Australian Curriculum grades. There is no timer or penalty for trying again. Hints and explanations support learning. Parents can review original answers, corrections, hints and choices.

## Visual direction and cost

Sparkbound is the visual reference: detailed, realistic creature artwork and cinematic lighting, with no primitive-built dragon. Use a freely licensed, articulated dragon, authored animation clips and an original woodland environment. Ten stages must change anatomy and size. Earned powers change appearance and produce mouth-attached effects. Music and sound use free licensed recordings and bounded original synthesis; no paid Fal jobs.

## Plan and release checklist

- [x] Confirm mixed typed/visual questions, four combined paths and adventure finale.
- [x] Inspect Sparkbound's actual artwork and asset provenance.
- [x] Assign independent curriculum, state/API and rendering agents.
- [x] Validate the free model's licence, hatchling/elder anatomy and animation.
- [x] Create and inspect original woodland art; optimise assets and document credits.
- [x] Deliver ten chapters with three question slots and varied private questions.
- [x] Deliver server-authoritative marking, replay-safe saves and immutable evidence.
- [x] Build accessible responsive play, hints, growth choice, adventure, finale and gallery.
- [x] Add recorded music/effects, separate controls and reduced motion.
- [x] Add the game to Play and its read-only evidence to the parent dashboard.
- [x] Exercise all ten levels and all four pure/mixed evolution paths.
- [x] Prove wrong-answer retention, reload/retry, conflict and profile isolation.
- [x] Inspect desktop/tablet/phone screenshots, growth and power-effect frames.
- [x] Run preservation checks and review the final diff.
- [x] Publish by the authorised GitHub main → Cloudflare Pages path.
- [x] Verify the deployment and live asset hashes, routes and browser behaviour.

## Data and release boundaries

The game owns a new `dragon-grove.state.v1` namespace in the existing event store. Existing learner profiles, stars, lesson progress and other games are not changed. Each saved action adds compact state plus its evidence delta. The API validates session and child ownership at commit time, and uses a version and operation identifier to resolve retries without duplicates. Browser drafts are scoped to the family and child. Parent evidence is paginated and cannot play the game.

No database migration, credential change or recovery-email configuration is part of this release. Tests use fictional families and ephemeral local D1. Production validation must not write real learner data.

## Team ownership

- Curriculum agent: private content, marking examples and curriculum checks.
- State/API agent: progression, capability checks, atomic persistence, history and D1 tests.
- Rendering agent: licensed 3D dragon, ten growth stages, powers, animation and graphic checks.
- Main agent: integration, visual design, original environment, audio, browser flows, review and release.

## Acceptance evidence

Record current results in `docs/qa/dragon-grove-release-2026-10-09.md`; retain machine reports and screenshots in `outputs/dragon-grove/`. Do not reuse old Sparkbound/Skyforge test counts as evidence for this release. Check every plan item before reporting completion, and state any remaining limitation plainly.
