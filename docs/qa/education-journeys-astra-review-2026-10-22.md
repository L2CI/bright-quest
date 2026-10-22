# Education Journeys — independent Astra review

Review date: 22 October 2026. Scope: science copy, source spot-checks, all 20 generated scenes, frontend logic, preservation of existing data, and fidelity to the Astra design brief. Browser interaction/deployment QA is owned by the implementation agent; this review does not replace it.

## Final reviewer verdict

**GO for the reviewed module: no remaining science, artwork-label, feature-marker or design blockers.** The initial findings below were corrected or addressed with explicit evidence. Final desktop and phone screenshots are readable, show the intended visual hierarchy, and preserve the natural-history presentation.

This is the independent design/science review sign-off, not a statement that deployment is complete. The implementation agent must finish the shell integration/failure-case run, reconcile the final browser report, and verify the authorised live release. At the final review, the earlier run had recorded 263 successful checks before a parent-PIN selector timeout; `browser-report.json` had been restarted and contained only four checks. That incomplete reporting state must not be presented as the final release receipt.

**Subsequent release evidence, recorded by the implementation owner:** the completed local replay passed 278 checks, the deployed replay passed another 278, and 15 focused live pointer/touch/orbit checks passed. The final reports replace the incomplete review-time run as the release evidence. Forty-five deployed hashes and fourteen routes passed, authentication remained unchanged and production learner writes were zero. See [the final QA record](education-journeys-2026-10-22.md). Astra's independent scope remains the design/science review above.

## Required fixes identified

| ID | Finding | Required resolution | Final status |
|---|---|---|---|
| A1 | `origins-0.webp` included a strip of the next Earth scene along its bottom edge; `origins-1.webp` included a strip of the next ocean scene. | Repack using actual panel boundaries and inspect exports. | Resolved: both final files and rendered Origins page inspected |
| A2 | Original Mesohippus and Merychippus scenes showed single hooves while teaching three toes/retained side toes. | Repack corrected art, separate exact toe evidence from illustrative art, and supply a sourced specimen figure. | Resolved with a documented limit: corrected art is still simplified, explicitly captioned; toe features have no image pins; Mesohippus has an attributed replica-forelimb photograph and evidence-based question |
| A3 | Several pins missed their named anatomy, including Basilosaurus limbs, Gomphotherium tusks and junglefowl beak. | Audit every feature marker; do not pin internal/hidden anatomy as though the image reveals it. | Resolved: 56 entries reviewed, 37 visible pins and 19 evidence-only entries; rendered examples inspected |
| A4 | The default localStorage getter was read outside a try/catch and could prevent the module from starting. | Catch storage acquisition and test a throwing getter. | Resolved: independent SecurityError-getter regression assertion passed |

## Refinements

- The red junglefowl chapter's sound action now says “Hear a raven · another living bird”, confirmed in the final phone screenshot.
- The implementation now has a persisted `pageshow` rerender path after `pagehide` disposes the viewer. Browser navigation recovery remains covered by the implementation agent's final interaction gates.
- The Ichthyornis illustration has teeth extending very close to the bill tip. The text correctly describes a small horn-covered beak tip with teeth behind it. Avoid treating this rendering as precise anatomical evidence; a skull close-up from the cited research would be stronger if this feature becomes a scored visual-identification exercise.
- The original `EXHIBITS.image` entries referred to generated living-animal artwork. Inspection of the actual renderer confirmed those entries are unused: it requests `assets/models/{id}-poster.webp`. The first concern about a false fossil preview was therefore a false positive, withdrawn. Both final poster files were inspected and show the real skeleton/excavation objects.
- The first Origins caption now explains that early expansion and much later stars/galaxies are shown together. This avoids reading the composite art as a literal simultaneous Big Bang scene.

## Science assessment

The following are well handled in the reviewed code:

- Evolution is described as branching, with no claim that the displayed species form a proven ancestor-to-descendant ladder.
- The guide distinguishes population change from the growth or transformation of one individual.
- Origins distinguishes cosmic history, the unresolved origin of life and biological evolution.
- The Early Earth date is rounded, early microbial evidence is expressed as “at least”, and the Cambrian account explicitly says animals existed earlier.
- Birds are placed within dinosaurs, not descended from pterosaurs. The red junglefowl is an illustrative living endpoint, not a claimed descendant of the exact illustrated fossil species.
- Mammoths are described as cousins of living elephants; the closer relationship to Asian elephants is stated.
- The whale scan has its own late-Miocene date and expressly is not Pakicetus, Ambulocetus or Basilosaurus. The mammoth scan is clearly a mounted skeleton with possible supports/restoration.
- Every generated habitat scene is labelled artistic visualisation/reconstruction. No modern generated image is called a photograph. There are no fabricated extinct-animal recordings.

Source spot-checks performed live:

- [Florida Museum: Mesohippus](https://www.floridamuseum.ufl.edu/fossil-horses/gallery/mesohippus/) supports the selected 35-million-year moment and change from four front toes in earlier relatives.
- [Florida Museum: Merychippus](https://www.floridamuseum.ufl.edu/fossil-horses/gallery/merychippus/) supports the selected 15-million-year moment, retained three toes and high-crowned cheek teeth.
- [Yale's Ichthyornis research summary](https://news.yale.edu/2018/05/02/scientists-find-first-bird-beak-right-under-their-noses) supports the beak-tip/teeth combination and CT-based reconstruction.
- [NPS humpback recording](https://www.nps.gov/subjects/sound/sounds-humpback-whale.htm) and [NPS raven recording](https://www.nps.gov/subjects/sound/sounds-common-raven.htm) confirm the species, National Park Service credit and recording provenance.
- The official Smithsonian item records and downloadable manifests were verified during the design pass, including the mammoth GLB binary's Draco dependency. The implementation now includes a local Draco loader and decoder.

## Data and implementation assessment

Read-only code review found no production API mutation, migration or writes to existing exam/game/account keys in this module. New device bookmarks use `bqEducationJourneysV1:{profileId-or-guest}`. Storage status and source copy correctly say that bookmarks do not sync across devices. This is a code finding; release evidence must still prove zero production learner-data writes during browser verification.

3D inspection uses real GLB geometry, camera orbit and zoom. It is technically genuine 360° inspection, not a rotated image. The code supplies explicit rotation controls, keyboard handling, an opt-in touch interaction mode, reduced-motion handling, load-failure content, texture/geometry disposal and stopped audio on navigation. Their rendered usability and actual model orientation still require browser checks.

The library, Origins, chapter layout, readable evidence notes, direct chapter selection and separate real-fossil exhibit follow the design brief. No new frontend framework or legacy-save coupling was introduced.

## Recheck record

- A3 coordinate pass completed by Astra under explicit implementation ownership: all 20 stages and 56 feature entries reviewed; 37 visible pins remain and 19 hidden/conceptual/anatomically unresolved features have null coordinates. A programmatic comparison proved that no other collection content changed. The application must display those null-coordinate entries as evidence buttons without image pins.
- A4 fixed in implementation and independently tested with a localStorage getter that throws `SecurityError`. Module creation and visit actions no longer throw; bookmark availability correctly reports false. This was a direct one-off assertion, with no browser or production learner-data writes.
- A1 rechecked: the final Origins files have no neighbouring-panel strips; the desktop Earth screenshot renders cleanly.
- A2 rechecked: the corrected horse atlas is packed. Precise toe counts are separated from generated anatomy; the Mesohippus inset shows a real photograph of replica forelimbs with H. Zell/Wikimedia Commons attribution, CC BY-SA 3.0 link and Florida Museum source link. The quiz asks for the strongest evidence rather than an image toe count. This is acceptable for the stated illustrative-art scope.
- Final screenshots inspected: `library-desktop.png`, `origins-1-desktop.png`, `horses-1-desktop.png`, `horses-1-phone.png`, `mammoth-3d-phone.png`, `birds-3-phone.png`, and `whale-rear.png` under `outputs/education-journeys-2026-10-22/`. Also inspected both poster WebPs and the updated Origins/horse artwork directly. No persistent fade/dark-frame issue is visible in these final captures.
- The library presents all four families clearly. The phone chapters stack cleanly; controls and credits remain visible; evidence buttons correctly omit false image pins. The mammoth screenshot and whale rear capture show genuine three-dimensional objects, correctly labelled and dated.
- Browser execution was performed by the implementation agent, not independently repeated by Astra. The captured failure artefact contains 263 passed checks and no recorded application errors/failures before the separate shell signup selector timed out. Final run completion and live release verification remain implementation/release gates, as stated in the verdict.
