# Education Journeys — immersive Astra design

22 October 2026. Refinement of the shipped animal-evolution collection. User direction: make it a full-screen experience with an exit, rather than a vertically scrolling webpage.

## Product decision

Make each route a **single full-height scene**. Keep the existing science, art, recordings, fossil scans, source credits and device bookmarks. Move supporting material into intentional drawers. The animal or world remains the centre of attention.

The experience fills the browser viewport immediately. **Full screen** is a separate, optional button that invokes genuine browser fullscreen after a user gesture. **Exit journey** is always easy to find and returns to Bright Quest Learn with learner identity intact. No exit confirmation is needed because progress already bookmarks automatically.

## Persistent frame

Three layers:

1. **Scene:** fills the usable height, with an authentic image or real 3D specimen.
2. **Compact HUD:** top bar and bottom navigation; restrained dark translucent surfaces protect legibility.
3. **One active drawer:** learning, family library, timeline, sounds or sources. Avoid stacked competing drawers.

Desktop composition:

```text
┌ Exit journey ───── Whales · 37 million years ago ── Sound Full screen Menu ┐
│                                                                         │
│              BASILOSAURUS                               DISCOVER         │
│              A life fully at sea                       [Close]           │
│                                                                         │
│                                                        Story Features   │
│              LARGE REALISTIC SCENE                     Question Evidence │
│              WITH FEATURE PINS                         [scroll inside]   │
│                                                                         │
│ Zoom − + Reset        Reconstruction label                              │
├ Earlier ─── ● ● ◉ ● / Moment 3 of 4 ─── Discover ─── Next moment ────────┤
└─────────────────────────────────────────────────────────────────────────┘
```

Use a ~56–64px top bar and ~64–76px bottom dock. Remaining height belongs to the scene. On desktop, an open Discover drawer is ~340–400px wide and sits beside the scene or occupies a reserved right rail. It must not cover the animal's face or leave the viewport sized for a hidden drawer. Closing it restores the full stage width.

Use the existing deep-ink, ivory and warm-yellow colours. Keep button language and realistic assets; remove the webpage footer, repeated large section headings and document-flow card stacks.

## Entry experience

The library route becomes a cover scene with the humpback image, a compact title and two primary choices:

- **Begin with Origins**
- **Choose a family**

Show **Continue** when a device bookmark exists. A small secondary choice opens **Real fossils**. Do not place four large cards and an evidence banner beneath the cover.

Choose a family opens a drawer/sheet with the four existing illustrated cards, their question and visited count. On wide screens a 2×2 grid fits the panel; on phones the panel scrolls internally. Closing the family drawer returns to the unchanged cover or chapter.

## Chapter experience

### Default scene state

- Top HUD: clear Exit journey, family name and approximate age. Species title and one short scene subtitle sit in a quiet corner of the stage.
- Image/3D specimen dominates. Existing visible-anatomy pins remain available.
- Bottom dock: Earlier, compact four-stop control, Discover, Next. The current species/date must not rely on a dot colour alone.
- Scene controls: Zoom out, Zoom in, Reset; optional comparison and 3D entry through Discover/Evidence or a clearly named secondary action.
- Art label remains visible, including the existing horse anatomical limitation and composite-cosmic-history note. Long clarification may wrap in a small caption or open a clearly labelled artwork note; never remove the distinction between artwork and evidence.
- On first entry, show a short prompt such as **“Tap a feature, or open Discover.”** It should not block input or replay on every render.

Default Discover closed makes this a scene-first experience. Opening it is explicit. A learner can navigate to another moment without first completing a quiz.

### Discover drawer

Use a compact header with **Discover** and an explicit **Close** button. Provide four clear sections through accessible tabs or a compact section switcher:

| Section | Existing content preserved |
|---|---|
| Story | Chapter explanation; environment and adaptation |
| Features | All feature controls and descriptions; evidence-only entries retain their label |
| Question | The existing observation question, choices and explanatory feedback |
| Evidence | Family-branch explanation, sources, comparison, real-fossil entry and Mesohippus specimen inset |

Clicking a visible image pin opens Features and selects that feature. Selecting an evidence-only feature does not create an image pin. The scene remains manipulable when the drawer is open on a sufficiently large screen.

The drawer scrolls internally, with its close button and section controls stationary. Preserve the current selection and image/3D camera while opening/closing drawers. A drawer toggle must not remount the canvas, reload the model, reset the camera or clear quiz feedback.

Next moment changes the scene, title, date and content. Retain the learner's preferred drawer-open state on desktop if practical, but reset its internal scroll to the top. On phone, collapse the drawer after moving to a new moment so the new animal is visible. A concise live-region announcement identifies the new moment.

### Compact time navigation

Four direct-select stops fit in the bottom dock. Each has an accessible species/age label and selected state. At phone widths, use **Earlier · 3 / 4 · Next**, with the centre control opening the four-stop list. This is selected-moment navigation, not a proportional geological timeline; preserve the “not to scale” explanation in the time panel.

### Completion

The last Next action opens a compact discovery overlay with visited count, the family-branch conclusion and **Choose another family** / **Keep exploring**. Do not append a new page section below the viewport.

## Device behaviour

| Surface | Frame | Discover/library behaviour |
|---|---|---|
| Desktop ≥1100px | Single 100dvh stage; slim top HUD and bottom dock | Right rail, ~340–400px; scene uses the remaining width; drawer alone scrolls |
| Tablet 760–1099px | Full-height stage, shorter labels; no multi-row webpage header | Narrow right panel in landscape; bottom sheet in portrait if the scene otherwise becomes too narrow |
| Phone portrait | Top bar ~52–60px; species/date in compact overlay; bottom dock two short rows only if needed | Bottom sheet, normally ≤65dvh, with explicit Collapse/Close and internal scrolling; retain visible scene above |
| Phone landscape / short viewport | Compact header/dock; hide decorative subtitles and redundant labels first | Reading sheet may use most remaining height; allow a dedicated accessible reading panel when the scene cannot retain a useful area |

Do not implement draggable sheet physics unless fully tested. A simple labelled open/collapse button is more dependable than a sheet that needs a particular gesture.

At high text zoom or very short heights, allow the active content panel to use the full space between the HUD and dock and scroll internally. Never solve overflow by shrinking body text below a readable size, clipping the question, hiding Exit, or disabling user zoom.

## Scene and pin geometry

The art is 3:2. Pins currently use percentages of that image. A full-viewport `object-fit: cover` image would crop anatomy and move pins away from their features.

Recommended construction: dim/blurred full-stage image as a decorative backdrop, plus a **contain-fit 3:2 image plane** in the scene's safe area. Pins are children of that exact image plane. Centre the plane inside the available stage and keep it clear of the top HUD and bottom dock. The background cannot be mistaken for a second specimen: keep it subdued.

If the main scene uses a different crop, compute pin positions against the actual image transform and re-audit every feature. Do not assume the old percentage coordinates still work. Image zoom and pan transform the image plane and pins together.

For 3D, the canvas resizes when the drawer, orientation, browser toolbar or fullscreen state changes. Render after resizing. Keep rotate/zoom/reset controls on-screen and provide a labelled Notes/Evidence drawer. The real-scan poster and load-failure text remain available without WebGL.

## Fullscreen and exit contract

- Request fullscreen on the **whole experience root**, including Exit, dialogs and controls. Fullscreening only the canvas can hide the rest of the interface.
- Call `requestFullscreen()` directly from a click/tap handler. Handle rejection without stopping the journey. The viewport experience remains usable when fullscreen is unsupported or disallowed.
- Derive the button state from `document.fullscreenElement` and update it on `fullscreenchange`; a resolved promise or local Boolean alone is insufficient.
- Button labels: **Full screen** when windowed; **Leave full screen** when active. **Exit journey** always means returning to Bright Quest, not merely changing browser display mode.
- Exit journey stops audio, disposes the viewer, exits fullscreen if needed and follows the profile-preserving return URL. Ensure navigation still works if `exitFullscreen()` rejects or fullscreen has already ended.
- Native browser Escape behaviour must remain intact. Do not lock the keyboard or capture Escape to prevent leaving fullscreen. Browsers can consume Escape before app handlers run, so visible Close/Collapse controls remain necessary.
- An open modal must have a visible Close control and a usable Exit journey path; do not leave the apparent global Exit visible but inaccessible behind a modal backdrop.
- Preserve browser Back and deep links. Do not push history for every feature or drawer toggle. Back-forward-cache restoration must recover the viewer as in the current implementation.

Current platform references: [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API), [requestFullscreen](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen). Browser support and permission vary, so fullscreen is progressive enhancement.

## Accessibility and motion

- Use native buttons and clear accessible names for all compact controls. Icon-only controls need labels; Exit stays textual.
- A drawer is not automatically a modal. For a nonmodal desktop Discover panel, do not trap focus or make the scene inert. When closed, its hidden controls must leave the tab order. Restore focus to the opening control after closing.
- True modal library/sources overlays use dialog semantics, focus containment and restored focus. Avoid modal-on-modal stacking.
- Tab controls require selected state, associated panels and keyboard behaviour. A section switcher made from ordinary buttons is acceptable if it clearly reveals its controlled section without pretending to be ARIA tabs.
- Minimum 44px touch targets, strong focus indicators, visible selected states and no hover-only content.
- Reduced motion removes drawer slides, camera flights, parallax and scene movement. Use a short fade at most, or immediate transitions. No automatic camera orbit or autoplay sound.
- Use `100dvh` with suitable fallback, `env(safe-area-inset-*)`, `min-height: 0` on grid/flex children, and `overscroll-behavior: contain` on scrolling panels. The underlying document should not become a second competing scroll surface.

## Acceptance checks

1. Library, all chapter routes and both fossil exhibits fit the viewport at desktop, tablet, phone portrait and phone landscape. Ordinary document scrolling must not reveal additional page sections.
2. Discover, library, timeline, sources and sounds are all reachable. Long text, source lists and the horse specimen inset scroll inside their panel. No existing lesson content is lost.
3. Visible pins align with final anatomy at closed/open drawer widths, fullscreen, phone orientation changes, zoom and pan. Evidence-only features stay pin-free.
4. Open/close Discover repeatedly without resetting camera, loading the GLB again, duplicating audio handlers or clearing feedback. Switching chapters updates the content and moves panel scroll to the top.
5. Prove real fullscreen entry and exit where supported, denied/unsupported fallback, Escape exit, explicit Exit journey, and Back restoration. The full-height layout itself must work in all cases.
6. Keyboard and 200% text zoom retain access to Exit, Next, Close and quiz choices. Test short-height mode and reduced motion. No focus disappears behind a collapsed drawer.
7. Re-run existing 20-stage/56-feature, audio, genuine 3D rotation/reset, bookmark isolation and failure cases against the new layout. Preserve all learner keys and account data.
8. Capture fresh rendered screenshots after transitions finish. After the authorised release, verify the live immersive layout and controls, not just the earlier webpage route or deployment job.

## Scope boundary

This is a presentation and interaction refinement. Keep the existing learning content, source distinctions, asset provenance, two real fossil exhibits, honest sound species labels and local bookmark schema. It needs no production database changes or learner-data migration.

## Independent implementation review

Reviewed `immersive.js`, `immersive.css`, `index.html` and their integration with `journeys.js`, plus pilot desktop/phone/landscape/200%-text screenshots under `outputs/education-journeys-immersive-2026-10-22/`.

The new desktop scene and side drawer meet the requested experience direction. The controller moves existing content rather than replacing learning/state logic. Contain-fit artwork preserves the feature-coordinate system, genuine 3D inspection remains intact, and the HUD provides a clear Exit journey. No new learner-data write path or bookmark-schema change was found.

### Final disposition — GO, 22 October 2026

No remaining release blocker was found in this independent implementation and screenshot review. The local experience meets the requested scene-first, full-viewport direction and keeps Exit journey visible. Live deployment and production smoke verification remain the release owner's final gate.

The previous findings are resolved:

- **Covered keyboard controls:** `updateCoveredControls()` now makes overlapping scene controls, chapter navigation, pins and cover actions inert and visually hidden. It restores them when Discover closes or the layout changes. The HUD remains active. Fresh phone and landscape captures show the drawer without a visible, inaccessible Next button beneath it. The 60dvh phone drawer retains a visible animal scene above the reading surface.
- **Native fullscreen evidence:** the focused browser suite checks real `document.fullscreenElement`, fullscreen button state, native entry and exit, fullscreenchange after an API-driven browser exit, denied and unsupported fallbacks, and Exit journey returning to Bright Quest Learn with the profile identity preserved. This verifies a genuine browser fullscreen mode in addition to the viewport layout.
- **State preservation:** the focused suite checks image zoom/pan across drawer toggles, image-relative feature alignment, the same live 3D renderer and unchanged camera image across notes toggles, touch rotation, restored focus, internal panel scrolling and controls restored on close. The presentation controller introduces no learner storage schema or production data mutation.
- **Artwork and entry clarity:** Discover includes the exact artwork caption, retaining the horse-foot limitation when the external caption is hidden in short layouts. The cover explicitly explains fullscreen entry and the family selection CTA says “Full screen”.

Evidence inspected: `focused-discover-phone.png`, `focused-discover-landscape.png`, `focused-discover-desktop.png`, `focused-phone-text-200.png`, `library-desktop.png` and `whales-2-phone.png` under `outputs/education-journeys-immersive-2026-10-22/`; the implementation and `tools/qa-education-journeys-immersive-controls.mjs`; the focused report recorded at 09:28:08 UTC and learning replay recorded at 09:28:54 UTC. The release owner ran these suites; this review inspected their assertions, reports and rendered captures. They record **76 focused checks and 314 learning replay checks**, no errors or failures, and **zero production learner writes**.

At 200% phone text size the cover deliberately permits internal scrolling so its actions remain reachable while the global Exit stays visible. This is the intended small-screen accessibility fallback, rather than a return to a scrolling library page. Native fullscreen support still varies by browser; unsupported browsers retain the complete viewport experience.
