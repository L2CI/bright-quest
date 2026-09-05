# Beacon Brigade assets

- Ground colour and OpenGL normal maps: Poly Haven, Aerial Grass Rock, https://polyhaven.com/a/aerial_grass_rock. Concrete maps: https://polyhaven.com/a/concrete_floor_worn_001. CC0: https://polyhaven.com/license. The preparation script verifies provider checksums and records source URLs and SHA-256 hashes in provenance.json.
- Five expedition vehicles (tank, scout buggy, eight-wheel cargo truck, rescue rover and engineering crawler), discovery stops, buildings, field apparatus, terrain geometry and infrastructure: original procedural Three.js models for Bright Quest. No Last Z, Transformers or Spider-Man assets are used.
- Five-biome aerial terrain painting (`world-biomes.jpg`): original project asset generated with OpenAI image generation for Beacon Brigade on 2026-09-01. The production JPEG checksum is recorded in `provenance.json`.
- Three.js r165: existing repository vendor copy, MIT licence, retained in source bundle.
- Interface icons: Lucide, ISC licence. The module bundle includes only the icons used.
- Valley ground (`valley-ground.jpg`): OpenAI built-in image generation, 2026-09-05. Prompt: seamless overhead natural meadow albedo, muted sage and olive grass, grey earth and fine pebbles; no buildings, roads, shadows or text. Converted to 1024px JPEG for the 3D terrain.
- Project and Atlas equipment thumbnails (`project-*.jpg`, `atlas-*.jpg`) and the portal preview are captured directly from the original playable Three.js world with `tools/capture-beacon-valley.mjs`.
