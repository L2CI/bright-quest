# Education Journeys immersive release QA

## Result

Education Journeys now occupies one viewport: a cinematic cover, a scene with a compact era dock, and internally scrolling Discover and family panels. Exit journey returns to Bright Quest Learn with the profile identity. Start/Continue and the named fullscreen control request genuine fullscreen for the complete document; unsupported or denied requests retain the viewport experience.

The refinement keeps all 20 time stops, all features and questions, original illustrations, sources, real recordings and both real 3D scans. No science content, bookmark keys, storage schema, authentication, backend or database migration changed.

## Local evidence

- Full fixture-backed browser replay: 314 checks, no unexpected browser errors or asset failures. All 20 scenes and discovery checks; comparison, sounds, 3D rotation/zoom/reset, device bookmark isolation, parent/child shell entry and network/storage failure recovery.
- Focused presentation replay: 81 checks covering genuine fullscreen entry/toggle/browser-event exit; rejected and unsupported fullscreen; profile-preserving Exit; image zoom/pan and exact 3D view retained across notes; real CDP touch rotation; visible image-coordinate pin alignment; hidden controls inert while covered; Escape, restored focus, internal panel scrolling and large-text cover access. Camera preservation compares raw WebGL canvas pixels, with screenshots retained separately, so other visual layers cannot change the comparison.
- Rendered review: desktop 1440×900, tablet 834×1194, phone 390×844, small phone 320×568 and landscape 844×390. Phone notes leave an animal image visible above the sheet. Desktop and phone 200% text checks preserve access through internal scrolling.
- 7 content/storage/provenance tests passed.
- Private route guard: 145 canonicalisation assertions and 141 compiled Pages runtime assertions passed.
- Astra independently reviewed the design and implementation. Its keyboard occlusion finding was fixed by removing covered controls from focus and restoring them when the panel closes. Complete image captions remain in Discover, including in short viewports.

Browser replay uses fictional records in ephemeral local D1. Live replay intercepts every API request into that fixture. The journey itself sends no learner writes. Original game-event history and learner content were compared with their starting fixture values; portal sync timestamps/version metadata are the only excluded fields after returning to the existing shell.

The initial live focused pass identified a focus-scroll offset after returning from a panel at phone text zoom. The stage now uses `overflow: clip`, which cannot scroll programmatically, while Discover and the large-text cover keep their own scrolling. The focused suite asserts that the large-text cover starts beneath the HUD and the main scene remains at scroll offset zero.

Evidence folder: `outputs/education-journeys-immersive-2026-10-22/`. Local reports: `browser-report.json`, `focused-browser-report.json`; screenshots include `library-desktop.png`, `whales-2-phone.png`, `focused-discover-phone.png`, `focused-discover-landscape.png`, `focused-phone-text-200.png` and the two camera-state screenshots.

## Release verification

Publish through the existing GitHub main → Cloudflare Pages connection. Require a successful deployment check, matching deployed hashes, public/protected/private route checks, unchanged public authentication configuration and the intercepted live browser replays before marking the plan complete. No production learner database access or migration is part of this release.

Browser fullscreen depends on device support and browser permission. Escape is also handled by the browser; the application tracks fullscreenchange and retains its explicit window/Exit controls. On phones with enlarged text, the cover scrolls inside its viewport so every entry option remains reachable.

### Production result

Experience commit `59d2ab8719ec770dd94bf58dde81233fb3e0d7e7` deployed to [Education Journeys](https://bright-quest.pages.dev/education-journeys/). Cloudflare deployment `086420b2-992f-4516-a7f2-a317b2eccdff` completed successfully at 09:41:33 UTC on 22 October 2026.

- **314 live learning checks and 81 focused live controls checks passed**, with no unexpected runtime errors or failed assets. Authenticated requests were intercepted into the ephemeral fixture throughout.
- **47 deployed hashes matched** the source files; **14 public/protected/private route checks passed**.
- Existing public authentication configuration remained identical. No production learner writes or database migrations occurred.
- Fresh live phone/landscape/desktop screenshots were inspected. The scene stays aligned below the HUD after opening/closing notes, the phone animal remains visible, and the enlarged-text cover retains its internal scrolling.
- The final release receipt records the documentation close-out commit and successful Cloudflare check separately from the experience commit. All eight plan items are complete.
