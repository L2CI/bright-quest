# Education Journeys immersive refinement

User direction: make the learning collection a full-screen experience with an Exit option. Preserve the existing science, 20 time stops, illustrations, real sounds, actual 3D scans, discovery checks and device bookmarks.

## Experience direction

One viewport is one world. The scene occupies the viewport with a restrained HUD, persistent Exit journey, a compact time dock and a Discover drawer that opens on demand. The cover is a cinematic invitation; animal selection lives in a library drawer. There is no document-length chapter page. Real browser fullscreen starts on an explicit entry/control gesture; the viewport experience remains usable when unsupported or denied. The full document enters fullscreen so dialogs and Exit remain available.

Motion: a brief scene reveal, a soft drawer slide and slow cover-backdrop movement. Reduced motion removes those effects. Foreground anatomy stays fixed to the image plane; image pins keep their exact contain-fit 3:2 coordinates.

## Acceptance checklist

- [x] Get and apply Astra's immersive design and review the existing entry/exit/save paths.
- [x] Build a viewport cover, family library drawer, scene theatre, compact era dock and persistent Exit.
- [x] Add genuine fullscreen entry/toggle with fullscreenchange state, Escape/browser handling and unsupported/denied fallback.
- [x] Move story, features, questions, evidence and branch explanations into accessible Discover panels without deleting content.
- [x] Preserve image zoom/pan and real 3D view while toggling details; keep scene hotspots correctly aligned during resize.
- [x] Retain sources, sound controls, science labels, bookmark keys/profile identity and reliable failure recovery.
- [x] Run full learning regression plus desktop/tablet/phone/landscape, 200% text, keyboard, fullscreen, touch, exit and failure-case QA. Inspect rendered hero and chapter states.
- [x] Publish through GitHub main to automatic Cloudflare Pages and verify live files, interactions and unchanged authentication/data.

## QA and preservation

Use ephemeral local D1 for original shell integration and intercepted API calls when testing production static assets. Never write production learner data. Capture screenshots and reports under `outputs/education-journeys-immersive-2026-10-22/`. Native fullscreen changes browser display; it does not unlock, reset or migrate progress. Exit stops audio and returns to Bright Quest Learn with the learner identity retained. Browser Back from a fossil returns to the current family moment. Internal panel scrolling is allowed; the main scene should stay in the viewport at supported sizes.

All eight items are complete. Final experience commit `59d2ab8719ec770dd94bf58dde81233fb3e0d7e7` deployed successfully. Production static assets passed 314 learning checks and 81 focused immersive checks; 47 file hashes and 14 route checks matched, authentication configuration stayed identical, and no production learner writes or migrations occurred. See the immersive QA report and `outputs/education-journeys-immersive-2026-10-22/release-receipt.json` for the final documentation deployment and consolidated evidence.
