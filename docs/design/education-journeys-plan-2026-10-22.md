# Education Journeys: Life Through Time

## Brief and direction

Build a new reusable Bright Quest Education Journeys destination. Its first collection is an interactive natural-history experience for a Grade 4 learner: the shared origins of the universe, Earth and life, followed by four animal family stories (whales, birds, horses and elephant relatives). Research and Astra design precede implementation. Publish through GitHub main and automatic Cloudflare Pages only after internal browser and visual QA.

The visual direction is a cinematic natural-history theatre: realistic habitat reconstructions, generous imagery, compact reading, warm cream type over deep forest/ink, evidence-led callouts and real museum specimens in a dedicated 360-degree inspection mode. Existing Bright Quest navigation and visual identity remain recognisable.

## Scope and acceptance checklist

- [x] Research primary scientific/museum sources; record sources, approximate dates, uncertainty and common misconceptions.
- [x] Obtain and apply Astra design guidance; document hero composition, responsive layout and motion beats.
- [x] Create realistic art for the origins prologue and four animal journeys; record exact prompts and provenance. No primitive-shaped animal stand-ins.
- [x] Source and optimise openly reusable real 3D specimens; inspect in true 360 degrees with zoom, reset and accessible controls. Keep reconstructions, scans and comparative specimens accurately labelled.
- [x] Build shared origins, four family stories with successive time stops, era navigation, specialty callouts, before/after comparison and discovery checks.
- [x] Add optional labelled real sound recordings with visible playback controls, plus mute, motion controls, keyboard/touch support and reliable image fallback.
- [x] Integrate Education Journeys into Learn and My Journey without changing existing learner data. Use isolated profile-scoped device bookmarks, explicitly labelled as device-only; no migrations or production learner writes.
- [x] Test content, chronology, all routes/buttons, 360 controls, sound, persistence, storage failure, keyboard, reduced motion, offline asset failure, responsive desktop/tablet/phone and original entry flows.
- [ ] Review rendered representative frames, fix defects, record QA evidence, then publish and verify the actual live files and primary interactions.

## Scientific guardrails

Evolution describes inherited changes in populations across generations. A single animal does not transform into a different species. Fossils shown are representative relatives: a chronological collection is not a claim of direct ancestry. Family trees branch, several branches coexist, mammoths did not become modern elephants, living birds are dinosaurs, and evolution has no predetermined finish line. Dates are rounded and chapter spacing is not a proportional time scale. Colour, soft tissues, behaviour and extinct-animal sounds are often uncertain. Artistic reconstructions are clearly marked. Modern recordings are never presented as authentic sounds of extinct animals. Space has no airborne sound.

## Preservation and release

Keep existing dragon, game, family, recovery and exam code intact except the narrow new library entry and cache version. No schema changes. Read-only production smoke checks; browser tests use isolated synthetic device state and intercept any API traffic. Run git diff checks and existing private-route regression. A successful push alone is not a release claim: verify the Cloudflare build, deployed asset hashes, routes and live browser behaviour.

## QA scope

Primary flows: Learn -> Education Journeys -> Origins -> animal selection -> every era -> feature callout -> comparison -> 360 specimen -> sound -> bookmark/reload -> return to Bright Quest. Viewports: 1440x900, 834x1194, 390x844. High risks: misleading ancestry, unlicensed assets, false 360 claims, blank WebGL, clipped specimens/text, inaccessible interactions, unexpected audio, storage failures, existing-save changes, and publishing an unverified build. Evidence goes to outputs/education-journeys-2026-10-22/.
