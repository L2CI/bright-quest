# Skyforge assets and provenance

- `key-art.webp`: original cinematic artwork generated with the built-in ImageGen tool on 1 October 2026, then encoded to WebP for the game. Source prompt in `prompts.json`. No external game franchise or identifiable child is depicted.
- The in-game guardian, rogue machines, equipment, drone, relay architecture, sky islands and combat particles are actual original articulated Three.js meshes authored in `../world.js`. Runtime geometry changes with loadout and region; this is not a flat character billboard.
- Three.js r165 is reused from the repository's existing `cave-river-quest/vendor/three.module.js`, retaining its MIT notice. No new CDN runtime dependency.
- `../audio.js` contains an original 32-step layered musical sequence and synthesised shot, shield, repair, confirmation and victory effects. Audio begins on a gesture and pauses in background tabs. No downloaded music or audio-provider dependency.
- Paper photos are user-created evidence. They are re-encoded on-device, stored only in scoped IndexedDB and never included in source or sent to an AI provider.
