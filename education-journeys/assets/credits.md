# Education Journeys media credits

## Original scene artwork

Twenty realistic educational illustrations were made with built-in OpenAI image generation. They are artistic visualisations, not photographs. Exact prompts are in [prompts.json](prompts.json); file dimensions and SHA-256 fingerprints are in [provenance.json](provenance.json). Cropping and WebP encoding package the illustrations for the browser. The horse atlas received an anatomical correction pass; small foot details remain simplified and are not used as fossil evidence.

Final scene files: `art/origins-0.webp` through `art/origins-3.webp`, `art/whales-0.webp` through `art/whales-3.webp`, `art/birds-0.webp` through `art/birds-3.webp`, `art/horses-0.webp` through `art/horses-3.webp`, and `art/elephants-0.webp` through `art/elephants-3.webp`.

## Real museum models

- **Woolly mammoth mounted skeleton USNM V23792** — Smithsonian Institution, public-domain media. [Original record](https://3d.si.edu/object/3d/mammuthus-primigenius-blumbach%3A341c96cd-f967-4540-8ed1-d3fc56d31f12). `models/mammoth.glb` is unmodified; its poster is a render of this scan.
- **Fossil whale excavation MPC 677, Cerro Ballena, Chile** — Smithsonian Institution, public-domain media. [Original record](https://3d.si.edu/object/3d/fossil-whale-excavation-site-mpc-677%3Aa4068a00-9712-4c8e-8948-a9e2ea27fe0a). `models/whale.glb` is unmodified; its poster is a render of this scan.

The mammoth mount can include supports and restored material. The whale is a much younger Miocene excavation, not one of the illustrated early whales.

## Fossil evidence photograph

**Replica Mesohippus forelimbs, American Museum of Natural History** — photograph by H. Zell / Wikimedia Commons, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Obtained from the [Florida Museum Mesohippus page](https://www.floridamuseum.ufl.edu/fossil-horses/gallery/mesohippus/). `models/mesohippus-forelimbs.jpg` is unchanged and retains its source licence. The photograph shows a replica, not excavated original bones.

## Real animal recordings

- **Humpback whale** — US National Park Service, public domain, [source](https://www.nps.gov/subjects/sound/sounds-humpback-whale.htm). `audio/humpback.mp3`, unmodified.
- **Common raven** — US National Park Service, public domain, [source](https://www.nps.gov/subjects/sound/sounds-common-raven.htm). `audio/raven.mp3`, unmodified. This is a different living bird from the junglefowl illustration.

[NPS Sound Gallery reuse statement](https://www.nps.gov/subjects/sound/gallery.htm): clips are public domain, downloadable, with appropriate credit requested. These are modern recordings and never presented as extinct-animal sounds.

## Viewer software

Three.js 0.165.0, MIT — existing same-origin engine/GLTF loader plus the matching local DRACOLoader. Google Draco decoder, Apache 2.0. Licence texts accompany the local decoder files under `vendor/`. All runtime media and libraries are served from Bright Quest itself.
