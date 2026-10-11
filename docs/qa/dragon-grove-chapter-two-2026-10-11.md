# Dragon Grove Chapter II verification

## Delivered experience

The Skybound Trials opens from the original finale. It carries the child's grown dragon, name, appearance and earned powers into 30 new questions and six direct-control challenges. Every five correctly solved questions opens one trial, which runs for 300,000 milliseconds of active play. The six trials cover seed gathering, clearing brambles, bird rescue, storm navigation, nest defence and a combined finale.

The flight renderer uses the existing textured 3D dragon and authored wing animation, with new illustrated canyon, forest and coastal environments, organic targets and mouth-attached effects. Keyboard and touch controls share earned powers. Menus and hidden tabs pause play. Sound and reduced-motion preferences carry across the two chapters.

## Local validation

- **Question bank and domain:** 17 tests passed, including independent arithmetic, science reasoning, all six five-question boundaries, supported extension work, strict checkpoints and complete simulated trials.
- **New API:** 413 assertions passed against ephemeral D1, including authorisation, replay, concurrent requests, session changes, strict snapshot schema and existing-record preservation.
- **Complete browser journey:** 114 checks passed. All 30 questions and six trial results completed. Checks include drafts, hints, wrong attempts, real ten-second automatic saves, exact reload snapshots, lost responses, newer checkpoint reconciliation, competing outbox reservations, profile gates, parent return paths and responsive layouts. No script errors or missing assets were observed.
- **Journal dismissal:** 15 focused checks passed on the final toolbar. The phone Close control remains visible and clickable after scrolling through an expanded flight disclosure. Its opaque toolbar sits flush to the dialog edges, with a clear reading boundary. Parent review reads add no game events.
- **Real timing:** a complete browser flight ran for 300,000 active milliseconds over 302,211 wall milliseconds. It completed once, used all four powers and produced 29 automatic checkpoints. Other trial boundaries and exact resume were exercised with deterministic simulation and validated local-only time advancement.
- **Rendered scenes:** all six trials were captured early, midway and near completion on desktop, tablet and phone. Full wingbeats stay inside the scene at movement extremes. Keyboard, pointer, power selection, camera reset, hidden-tab pause, reduced motion and save failure were checked.
- **Original game:** 16 content/domain tests, 231 API assertions, 182 browser save/resume checks at stages 4, 5 and 6, and 33 rendered growth layouts passed.
- **Compiled Pages routes:** 145 canonicalisation assertions and 141 runtime assertions passed. New chapter assets remain public; private question sources and test tools remain protected.

The browser fixture retained all 249 append-only chapter entries, including 31 answer attempts and six results. Routine flight save entries are available in closed disclosures, so parents can first read the learning evidence and challenge results.

## Preservation

Chapter II uses a separate `dragon-expedition` event namespace and isolated device outbox/draft keys. Existing complete and unfinished Chapter I saves and unrelated records remained byte-identical. No database migration was required. Browser QA used fictional local records and wrote no production learner data.

## Evidence and artwork

Local evidence is saved under `outputs/dragon-expedition/`, `outputs/dragon-chapter-two-2026-10-11/trials/` and `outputs/dragon-grove/`. The full browser report, real-time report, flight framing proof and screenshots are retained there.

The four new WebP assets, dimensions, fingerprints and exact built-in image-generation prompts are recorded in [the chapter artwork notes](../../dragon-grove/chapter-two/assets/credits.md), [provenance](../../dragon-grove/chapter-two/assets/provenance.json) and [prompt set](../../dragon-grove/chapter-two/assets/prompts.json). The original model and audio retain their existing credits.

## Release

The chapter was published through GitHub `main` and automatic Cloudflare Pages deployment at commit `1250b26505ede43469ea7630d1bf1d9e66dbda30`. Cloudflare check `f364fe26-7169-47a1-8d0c-cf522d9a7314` completed successfully on 11 October 2026.

- **Deployed files and routes:** 46 asset hashes matched the local release; 21 public and protected route checks passed. Existing authentication recovery flags were preserved.
- **Live browser replay:** 116 checks passed against `https://bright-quest.pages.dev`, completing all 30 questions, six trials and 249 history entries. No script errors, missing assets or unexpected external requests were observed. Every API call used ephemeral local D1; production learner writes remained zero.
- **Focused live review:** 13 checks confirmed the phone guardian after a visible rendered frame, the learning evidence and the scrolling journal. Offscreen WebGL captures were corrected in the QA harness by bringing the hero into view before taking responsive screenshots.

The final journal polish gives Close its own opaque toolbar, flush to the dialog top, so it stays discoverable without obscuring the learning text. Gameplay, save logic and questions remain the tested implementation. The final deployed commit, file verification and focused live follow-up are recorded in `outputs/dragon-chapter-two-2026-10-11/release-receipt.json`.
