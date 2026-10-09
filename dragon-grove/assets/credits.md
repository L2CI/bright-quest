# Dragon Grove: Emberwild — asset credits

## Dragon

**European Dragon**, Regina Cachoa (original packaged alias Nonexistent 101).

- Source: https://sketchfab.com/3d-models/european-dragon-82f393a2e6c048ad80c171ce3b3a7b87
- Licence: Creative Commons Attribution 4.0, https://creativecommons.org/licenses/by/4.0/
- Original sculpted geometry, skeleton and authored animation retained. Textures resized/re-encoded, packaged to GLB/gzip; runtime adds staged proportions, lighting, colour treatments and ability effects.
- Full source, mirror, hashes, staged appearance changes and technical details: `models/model-provenance.json`, `models/appearance-manifest.json` and `models/LICENSE-European-Dragon.txt`.
- `module-preview.webp`: a capture of the actual stage 7 dragon renderer, combining this attributed dragon with the original woodland artwork below.

## Recorded audio

**Enchanted Valley**, Kevin MacLeod (incompetech.com). Creative Commons Attribution 4.0, https://creativecommons.org/licenses/by/4.0/ (current source grant verified 9 October 2026).

- Track: https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1200093
- Full track re-encoded at 192 kbps for the web; playback gain and scene mixing adjusted.

**Dragon Flap**, VishwaJai. CC0. https://opengameart.org/content/dragon-flap-0

**Spell 4 (fire)**, Bart K. Creative Commons Attribution 3.0, https://creativecommons.org/licenses/by/3.0/. https://opengameart.org/content/spell-4-fire

Effect volume and playback timing adjusted. Supplementary chimes, wind and magical tones are original Web Audio synthesis. Full recording provenance and hashes: `audio/audio-provenance.md`.

## Original raster artwork

Created for Bright Quest using OpenAI image generation on 9 October 2026:

- `emberwild.webp`: cinematic ancient woodland sanctuary at sunrise, mossy ruins, distant waterfall valley, a clear natural stone foreground, empty of creatures so the live dragon can inhabit it. Source generation `exec-f9c59089-2b6b-47de-8d86-573d982aee88.png`.
- `powers/*.webp`: four detailed fantasy cutouts — orange flame, lightning cloud, curled fern, violet starlight crystal. Source atlas `exec-ed4b821c-d121-4bea-80bf-d7dabfc33dbe.png`.
- `science/*.webp`: twelve natural-history specimens for accessible question diagrams. Source atlas `exec-14a69106-96c9-471c-8f0b-8eb41105eb4c.png`.
- `textures/dragon-fire.webp`: original transparent organic flame plume, resized to 768 × 256 and compressed with its alpha channel preserved. The source PNG is retained outside the deployed product in the planning assets. Generation and hash details are recorded in `models/appearance-manifest.json`.

Atlas preparation crops and compresses the original pixels without repainting them. Labels carry the scientific information; illustrations support it. Source image files remain in the original generation directory. Preparation script: `tools/prepare-dragon-art.mjs` (development only).

No external franchise imagery, paid Fal job, subscription purchase or licence fee was used for this release.
