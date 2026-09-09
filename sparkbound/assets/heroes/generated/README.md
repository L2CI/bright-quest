# Generated Mech Artwork

Created on 8 September 2026 using the built-in OpenAI image generation tool. Original robot and equipment artwork for Sparkbound; no external franchise artwork was imported.

## Prompt Set

Shared specification: production transparent sprite cutouts for a cinematic, child-friendly mech game; realistic shaped armour, articulated hands, hydraulic joints, cables, brushed metal and neutral studio lighting. No primitive-built bodies, cartoon toys, human injury, text or backgrounds. Full figures face right with consistent identities across ready, firing, guarding and impact poses. Each character atlas requests four pose columns and three character rows. Generated cell boundaries require inspection rather than assuming a perfectly uniform grid.

| Asset | Character Rows / Equipment Order | Source Generation |
| --- | --- | --- |
| roster-a.png | Relay: amber rescue mech; Helio: ivory solar specialist; Volt: emerald electrical specialist | exec-bc3d7fa3-6d72-470d-b148-ad97a9c0efc9.png |
| roster-b.png | Bastion: heavy silver defender; Zephyr: blue aerial specialist; Glacier: arctic guardian | exec-d7727e0e-7592-4c42-a536-4419662a5800.png |
| roster-c.png | Ember: crimson thermal guardian; Tidal: ocean rescue specialist; Atlas: heavy construction guardian | exec-aa260a08-1bef-46d6-8688-1fcd939ee866.png |
| roster-d.png | Nova: plasma vanguard; Echo: acoustic specialist; Prism: burgundy training rival | exec-94591627-480a-499d-b885-b8ce3e0ddfbc.png |
| weapons.png | Four columns, three rows: Relay, Helio, Volt, Bastion, Zephyr, Glacier, Ember, Tidal, Atlas, Nova, Echo, Prism. Isolated specialist guns, stock left and muzzle right, detailed machinery without firing effects. | exec-f1d0747d-fe58-47a1-9837-a2294494cf82.png |
| upgrades.png | Three columns, two rows: paired power cells, shoulder rocket battery, dorsal rail, articulated forearm shield, stabilised backpack reactor, twin siege cannon. Independent detailed titanium equipment cutouts. | exec-fdc940a4-31d6-435f-bd74-ed7668f2ed50.png |
| combat-effects.png | Three columns, two rows: short flame jet, long flame jet, thermal impact, water jet, electrical arc, sparks. Isolated detailed wispy emissions with transparent alpha, pointing right. | exec-08a111b1-3190-47ec-84ed-a66a784d3de7.png |

These raster assets support a camera-facing 2.5D actor pipeline in the existing Three.js arena. They are not rigged 3D models. Generated transparency is preserved; any crop manifest is a runtime asset-packing instruction, not new painted artwork.

## Runtime And Preparation

The normal game loads only `packed/manifest.json` and the prepared WebP files. Original PNGs are retained as reproducible build sources, not downloaded during normal play. Preparation isolates each pose once, preserving its pixels and alpha; the browser does not repeat the component scan at startup.

With `BQ_NODE_MODULES` pointing at the installed QA dependencies, run `node tools/qa-sparkbound-image-actors.mjs --prepare` from the repository root to rebuild the packed assets. Then run `node tools/qa-sparkbound-image-actors.mjs` and `node tools/render-sparkbound-roster.mjs`. These browser workflows are muted. Portrait capture requires a single settled pose, with no crossfade ghost layer.
