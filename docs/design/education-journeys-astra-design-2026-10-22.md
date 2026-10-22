# Education Journeys — Astra design brief

Date: 22 October 2026. Scope: the animal-evolution launch of a reusable Bright Quest Education Journeys area.

## Experience decision

Build a natural-history expedition inside Bright Quest: **Origins → choose a family → explore changing worlds → inspect evidence → make a discovery**. Launch four families: whales, birds, horses and elephants. Three strong families would satisfy the requested range if a fourth cannot meet the art/science quality bar, but the availability of 3D models should not limit the number of image-led journeys.

Use two explicitly named visual modes:

- **Explore the scene:** large, realistic artwork or photographs with zoom and labelled features. Extinct animal artwork is labelled “Artist’s reconstruction”; a modern animal is labelled “Photograph”.
- **Inspect a real fossil · 3D:** an actual textured museum scan that rotates through all sides and zooms. This is a distinct evidence activity, associated with the correct species and date. Never rotate a flat image and call it 360°.

The art carries the wonder. The controls and words make the science understandable. Do not cover the animal with several paragraph cards.

## Fit with the existing product

The repository already provides standalone subdirectories with a Bright Quest return link, accessible skip link, child-friendly title, sound/settings controls and a credits dialog. `dragon-grove/index.html` is a useful navigation pattern; its magical visual identity is not appropriate for this factual module. `bright-quest-shell-merge.js` contains the current child action routing and parent Learning hub.

Suggested route: `/education-journeys/`, with a first collection called **Animal evolution**. Show it in the child learning area and the parent Learning hub. A child should reach it without hunting through the arcade. Use the same back-navigation, button language and family identity as the existing shell. Preserve the selected learner when returning.

No database migration is needed for the first exploratory version. If progress is local, explicitly call it “Saved on this device”; do not imply account sync. If account persistence is implemented later, use a dedicated namespace and established profile APIs. Never overwrite an existing game save or require production learner-data writes for release verification.

## Screen composition

### 1. Journey library

Header: Bright Quest return link, **Education Journeys**, Sources button, sound off by default.

Hero copy: **Every animal has a deep history.** Supporting line: “Travel from the early Universe to the worlds that shaped whales, birds, horses and elephants.” Primary action: **Start with Origins**. Secondary action: **Choose an animal**.

Give the hero a deep-space-to-Earth image, not a large artificial gradient with floating geometric animals. Below it, use four landscape cards with full-bleed authentic animal imagery, a small family name, a memorable question and a visible action:

| Family | Card question | Colour accent |
|---|---|---|
| Whales | How did mammals return to the sea? | Sea glass / cyan |
| Birds | How are birds living dinosaurs? | Warm amber |
| Horses | What can toes and teeth tell us? | Grass / lime |
| Elephants | How are mammoths and elephants related? | Copper / ochre |

Avoid implying that every chapter must be unlocked. Exploration is the reward; revisiting is useful learning.

### 2. Shared Origins prologue

Four concise scenes: early Universe (~13.8 billion years ago), Earth and the Solar System (~4.6 billion), early life (at least ~3.5 billion), and branching animal life. The final scene opens the four families. Distinguish cosmic history, origin of life and biological evolution; do not claim that evolution explains the initial origin of life.

Each scene has one dominant visual, one key sentence, two short discoveries and **Continue**. Keep Origins available from every family. Do not replay it forcibly whenever a family opens.

The date strip is a chapter navigator. If chapter spacing is equal, label it **Selected moments · not to scale**. Do not position billions and millions of years on the same visually equal timeline without explaining that compression.

### 3. Animal chapter

At desktop width use a 65% specimen/scene viewport and a 35% reading pane. The image/3D area should dominate the first screen. Above it: family title, geological period, approximate age. Beneath: **Zoom in**, **Zoom out**, **Reset view**, and the mode label. The reading pane contains:

1. A chapter title that communicates the change, e.g. **Feet in the shallows**.
2. A short account of the environment and visible adaptation (roughly 45–70 words).
3. Two or three feature buttons: e.g. **Nostrils**, **Forelimbs**, **Back legs**. A selected feature highlights one marker and one short explanation; the others remain quiet.
4. **Look closely** — a single observation question, followed by explanatory feedback.
5. **Next moment** and a smaller **Back**.

Below the stage, show chapter thumbnails that can be selected directly and a compact **Family branches** view. The next/back sequence is a guided tour through examples, not a diagram claiming each specimen was the parent of the next.

For 3D specimens, model-space hotspots must rotate with the model. Hide back-facing or occluded markers, or select a preset camera angle when the learner selects a feature. Fixed screen markers that drift away from the anatomy are a release defect. Simple labelled feature buttons alongside the viewport are safer if reliable occlusion is out of scope.

### 4. Discovery end state

Show three visible discoveries the learner has encountered, one comparison question and **Explore another family**. No countdown, streak loss or answer penalty. Incorrect answers invite another look with an explanation. Explain **“Evolution branches. These examples show relatives and changing features, not a single ladder of direct ancestors.”** beside the family view, not buried in legal/source copy.

## Visual specification

- Overall background: deep ink `#081A21`; surfaces: `#102A34`; readable text: ivory `#F3F3E8`; secondary text: `#C0D2D3`; action: warm yellow `#F2CE6B`. Verify contrast in the final render.
- Let scene photography supply most of the colour. Use a restrained vignette only where text actually overlaps the art.
- Use the existing readable sans-serif family. Headings can be large and spacious; body copy should remain at least 16px on phones and about 18px in the reading pane.
- Use 12–18px corner radii, thin luminous borders and clear selected states. Avoid a wall of similarly weighted cards.
- One modest transition between chapters: fade/crossfade under 250ms. Do not morph one species into another, which suggests individual transformation and direct ancestry.
- Modern animals should be photographs or genuinely detailed textured models. Extinct reconstructions must have coherent limbs, plausible anatomy and era-appropriate habitat; reject invented extra joints, wrong toes, misplaced nostrils, unfeathered bird-line theropods where misleading, and mammoth/elephant swaps.
- Do not describe a fossil scan as the living animal. A mounted skeleton can include reconstructed bones/supports; its caption must say what is actually shown.

## True 360° asset feasibility — verified sources

Two useful real scans are directly downloadable without paid services. The item pages explicitly describe their media as public domain. Store the original source URL, rights statement, capture date, chosen variant and file hash in the asset manifest. Credit the Smithsonian even where CC0 does not legally require it.

| Specimen | Verified resource | Deployment use |
|---|---|---|
| Woolly mammoth, complete mounted skeleton, USNM V23792 | [Official item](https://3d.si.edu/object/3d/mammuthus-primigenius-blumbach%3A341c96cd-f967-4540-8ed1-d3fc56d31f12) · [Scene manifest](https://3d-api.si.edu/content/document/3d_package:341c96cd-f967-4540-8ed1-d3fc56d31f12/document.json) | Strong free-standing evidence object for the elephant family. Clearly a mammoth cousin, not the ancestor of today's elephants. |
| Fossil whale excavation MPC 677, Cerro Ballena, Chile | [Official item](https://3d.si.edu/object/3d/fossil-whale-excavation-site-mpc-677%3Aa4068a00-9712-4c8e-8948-a9e2ea27fe0a) · [Scene manifest](https://3d-api.si.edu/content/document/3d_package:a4068a00-9712-4c8e-8948-a9e2ea27fe0a/document.json) | A fossil excavation scan from 7–9 million years ago. Use as a late-Miocene evidence stop; do not label it Pakicetus or Dorudon. The rock slab is part of the object. |

Direct model URLs:

- Mammoth medium: `https://3d-api.si.edu/content/document/3d_package:341c96cd-f967-4540-8ed1-d3fc56d31f12/woolly-mammoth-150k-2048-medium.glb` — HEAD verified 200, 1,953,824 bytes. Low variant `woolly-mammoth-150k-1024-low.glb`: manifest reports 986,452 bytes. Thumb variant `woolly-mammoth-20k-512-thumb.glb`: 214,776 bytes.
- Whale medium: `https://3d-api.si.edu/content/document/3d_package:a4068a00-9712-4c8e-8948-a9e2ea27fe0a/whale-mpc-677-150k-2048-medium.glb` — manifest reports 2,679,232 bytes. Low variant `whale-mpc-677-150k-1024-low.glb`: 1,015,516 bytes. Validate the downloaded file before use.

**Important implementation finding:** the downloaded mammoth medium GLB has `KHR_draco_mesh_compression` as both a used and required extension, one mesh and two embedded textures. The existing local `cave-river-quest/vendor/three.module.js` and GLTFLoader provide a starting point, but the inspected vendor directory has no DRACOLoader. Add a matching local decoder/loader or predecode the asset. Merely calling the existing GLTFLoader will fail. Preserve upstream engine licences.

Model manifests also contain orientation, bounds and scene camera information. Centre and scale the object from its actual bounds, apply its intended up-axis and test the initial camera. The mammoth manifest model rotation is approximately -90° around X. Do not assume every scan is already Y-up.

A bird scan, [Limnofregata azygosternon](https://www.si.edu/object/3d/limnofregata-azygosternon-olson%3A458506a1-399a-4938-bfda-3432f8795bfe), has usable GLB variants, but its official page states media restrictions/noncommercial educational use despite CC0 metadata. **Do not treat metadata CC0 as media CC0.** Skip it until the media rights are resolved. A complete modern horse/elephant/bird model was not verified during this design pass. Sketchfab downloads can require authentication and carry varying licences, so they are not a dependable launch dependency.

Use same-origin copies of licensed assets to remove museum uptime and CORS dependencies. Only load a GLB when the learner opens 3D inspection. Keep the scene image and chapter text available during loading and on WebGL failure. A failure message should say **“3D could not load. You can still explore the fossil image.”** with Retry.

## Sound

Sound begins off. Use user-triggered play/pause with a visible species name and source. Real modern whale recordings are available from [NOAA's marine mammal sound collection](https://www.fisheries.noaa.gov/national/science-data/sounds-ocean-mammals); inspect each clip's credit and reuse conditions before bundling. Label any speed-adjusted sample. A humpback recording cannot silently stand in for a blue whale or an extinct whale.

Do not invent real recordings of extinct animals. A chapter can say **“We do not have a recording of this extinct animal.”** Ambient ocean/forest sound must be labelled ambience, kept separate from animal calls, and never treated as evidence. Sounds must stop when leaving a chapter, switching family, closing a sound panel or navigating away.

## Responsive and accessible behaviour

- At 760px and below, stack scene first, controls second, reading pane third. Keep the stage around 330–430px tall on a typical phone, without a forced viewport-height trap.
- Minimum 44px touch controls with visible labels. Put zoom/reset controls in one stable row; do not depend solely on pinch gestures.
- Pointer drag rotates the true 3D object. Provide arrow-button rotation, zoom buttons, reset and accessible descriptions for keyboard users. Keyboard controls act only when the viewer is focused.
- Touch manipulation must not trap page scrolling. Prefer explicit **Interact with 3D** activation on phones; provide **Done inspecting** and retain normal scrolling outside the viewer.
- Every graphic has meaningful alt text. Every hotspot has the same explanation in ordinary DOM text. A screen-reader user can complete the journey without manipulating a canvas.
- `prefers-reduced-motion` disables automatic movement, parallax and animated camera flights. Default to no auto-spin even without that preference; rotating is an intentional inspection action.
- Chapter navigation updates the heading/focus and announces the new chapter briefly. Avoid a live region that repeats continuously while dragging or zooming.
- Use a genuine dialog for sources/credits with a heading, close button, focus containment and restored focus.
- At 200% text zoom, controls wrap and no feature callout overlaps the animal or hides the next action.

## Scientific guardrails

- “Around” and “about” belong beside dates. Use consistent Ma/million-year explanations, not precision unsupported by the source.
- Populations change over many generations; an individual does not evolve because it needs a new trait. Avoid “the whale decided to grow flippers”.
- Evolution is branching and has no goal of making a “better” animal. Horse history includes several concurrent forms; some later horses were smaller and some retained three toes. [AMNH](https://www.amnh.org/exhibitions/permanent/advanced-mammals/evolution-of-horses)
- Birds are living dinosaurs. Do not put pterosaurs on the bird ancestor chain or imply that T. rex became a pigeon. [Natural History Museum](https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html)
- Mammoths and living elephants are cousins. A mammoth-to-elephant slideshow needs an explicit branch illustration, not an ancestry arrow. [Natural History Museum](https://www.nhm.ac.uk/discover/were-all-mammoths-woolly.html)
- Whales' fossil relatives illustrate changing adaptations; displaying successive examples does not establish direct ancestry. [Smithsonian whale education guide](https://www.naturalhistory.si.edu/sites/default/files/media/file/whale-evolution-activity-facilitation-guide-v2.pdf)
- The Origins dates above are rounded from [NASA](https://science.nasa.gov/exoplanets/what-is-the-universe/) and the early-life reference in the [Natural History Museum's origins gallery](https://www.nhm.ac.uk/visit/galleries-and-museum-map/from-the-beginning.html). Do not turn an earliest known fossil date into a proven exact start date for life.

## Release evidence required

1. Verify every chapter's animal, period, image caption, feature claim and source link. Review images at full stage size for anatomy, cropping and legibility.
2. Render the library, Origins, all four families, feature selection and both 3D specimens at desktop, tablet and phone widths. Check 200% text zoom and reduced motion.
3. Prove actual 3D movement with captures at front/side/rear angles and changed visible geometry; test zoom limits and reset. Verify the correct specimen remains labelled through mode/chapter changes.
4. Exercise keyboard-only navigation, image fallback, failed GLB request, slow loading, audio play/stop and repeated family changes. Confirm disposal of old textures/geometries and audio so memory does not grow on every chapter change.
5. Verify return to Bright Quest, parent access and preserved learner identity. Snapshot legacy progress before and after internal QA using isolated test state; production verification must write no learner data.
6. After authorised publication, verify the actual public route, asset response codes, responsive interactions, console errors and hashes against the release. A local screenshot or successful deployment job alone is not proof of the live experience.

## Scope recommendation

Ship the four image-led families, shared Origins, short observation activities, source credits, optional real modern animal calls, and two separately labelled fossil inspection exhibits. This gives the requested realism and true 360° interaction with verified free assets, without pretending every extinct species has an authentic full-body 3D reconstruction.
