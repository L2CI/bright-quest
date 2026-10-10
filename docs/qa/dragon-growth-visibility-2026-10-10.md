# Dragon Grove: visible growth and saved progress

## Change

Automatic camera fitting made later dragons occupy similar screen space, and the changes between stages 4, 5 and 6 were too subtle. Each stage now has a larger screen footprint, with a consistent ground line. Broader wings, longer horns, a stronger chest and larger paws make the stages easier to recognise. Crown and scale markings mature along with the existing textured model.

The renderer derives these appearances from the existing saved stage and path choices. It does not change the API, database schema, save format, questions, rewards or earned progress. Independent elemental colours accumulate without weakening an earlier choice. Repeated updates with the same stage and paths reuse the fitted view.

## Acceptance and verification

- Compare stages 4, 5 and 6 using the same path choices and still pose, including at phone size.
- Inspect newborn through stage 10 at desktop, tablet and phone sizes. Verify visible growth, framing, title clearance, stats and chapter navigation.
- Resume fictional saves in the middle of a question, an adventure and a celebration. Verify their exact state, original event records, hints, mistakes and mixed path ranks survive reloads, gallery previews and journal viewing.
- Complete the next legitimate action from each saved point. Simulate a lost response and retry the same queued action without creating a duplicate.
- Publish through GitHub `main` and the automatic Cloudflare Pages build. Verify released asset hashes and routes, then repeat the resume checks with live static assets and an isolated local database.

## Results

- Content and domain tests: 16 passed, including 68 complete campaigns with pure and mixed paths.
- Saved-progress regression: 182 checks passed for stages 4, 5 and 6. Opening, reloading, gallery previews and journal viewing preserved saved state and complete raw event records byte for byte. Each next action appended exactly one event; response-loss retry did not duplicate it. Other games and profile records were unchanged.
- Renderer: all eleven forms passed at desktop 1440×900, tablet 834×1112 and phone 390×844. All 33 layouts cleared the title, description, stats and chapter navigation. Projected height and footprint increased at every adjacent stage. On phone, stages 4, 5 and 6 measured approximately 112, 128 and 146 pixels high. No browser or shader errors were reported; the repeated-state camera cache check passed.
- Independent visual review accepted the clearer stage 4–6 progression on desktop and phone. The mature view turns gradually towards the chest, revealing the face and forelegs. The final stage 10 desktop/phone and fire effect screenshots were also inspected.

## Evidence and release

- Renderer report and screenshots: `outputs/dragon-growth-2026-10-10/renderer-qa/`.
- Previous stage 4–6 screenshots: `outputs/dragon-growth-2026-10-10/before-stage-*.png`.
- Local preservation report: `outputs/dragon-grove/visual-resume-qa.json`.
- Live asset and route report: `outputs/dragon-grove/live-verification.json`.
- Live asset preservation report: `outputs/dragon-grove/live-visual-resume-qa.json`.
- Deployment receipt: `outputs/dragon-growth-2026-10-10/release-receipt.json`.

Live verification uses public static reads and fictional local learner records. No production learner data is modified. Players load the new appearance on reopening or refreshing the game and continue from their saved point.
