# Dragon Grove Chapter II verification

## Delivered experience

The Skybound Trials opens from the original finale. It carries the child's grown dragon, name, appearance and earned powers into 30 new questions and six direct-control challenges. Every five correctly solved questions opens one trial, which runs for 300,000 milliseconds of active play. The six trials cover seed gathering, clearing brambles, bird rescue, storm navigation, nest defence and a combined finale.

The flight renderer uses the existing textured 3D dragon and authored wing animation, with new illustrated canyon, forest and coastal environments, organic targets and mouth-attached effects. Keyboard and touch controls share earned powers. Menus and hidden tabs pause play. Sound and reduced-motion preferences carry across the two chapters.

## Local validation

- **Question bank and domain:** 17 tests passed, including independent arithmetic, science reasoning, all six five-question boundaries, supported extension work, strict checkpoints and complete simulated trials.
- **New API:** 413 assertions passed against ephemeral D1, including authorisation, replay, concurrent requests, session changes, strict snapshot schema and existing-record preservation.
- **Complete browser journey:** 114 checks passed. All 30 questions and six trial results completed. Checks include drafts, hints, wrong attempts, real ten-second automatic saves, exact reload snapshots, lost responses, newer checkpoint reconciliation, competing outbox reservations, profile gates, parent return paths and responsive layouts. No script errors or missing assets were observed.
- **Journal dismissal:** 11 focused checks passed. The phone Close control remains visible and clickable after scrolling through an expanded flight disclosure. Parent review reads add no game events.
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

Prepared for the established scoped GitHub `main` push and automatic Cloudflare Pages build. The release is complete after the deployment check succeeds, deployed file hashes match, protected/public routes pass, and the browser journey is replayed against live assets with every API call intercepted into ephemeral local D1.
