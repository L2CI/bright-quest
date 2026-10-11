# Dragon Grove Chapter II: The Skybound Trials

## Experience

After restoring Emberwild, the child's grown dragon sets out beyond the grove. The second adventure uses its existing name, appearance and earned powers. The chapter has 30 new questions, in six groups of five, followed by six five-minute challenges. Questions mix typed maths answers and visual or multiple-choice science and living-things questions, progressing through Year 4 and Year 4 extension work.

The minigames put the dragon under direct control: flying through mountain routes, using breath powers precisely, carrying out rescues and protecting the grove. Each lasts five minutes of active play. Pausing, leaving the tab and reopening the game preserve the remaining time and confirmed progress. Performance earns a positive summary; mistakes do not remove earned progress.

## Creative direction

The dragon is the main subject: the existing textured, licensed 3D model, its authored animation and its inherited appearance remain central. New panoramic environments and organic illustrated targets support moving scenes, with clear silhouettes, controlled camera motion and mouth-attached effects. The hero moment is a grown dragon flying or using its power against a richly textured landscape. Keyboard and touch controls must feel immediate and remain clear on phones.

Use the same Bright Quest navigation, account flow and quiet learning panels. Questions have no timer. The five-minute challenge clock runs only while playing. Sound and reduced-motion preferences carry across the two adventures.

## Work plan

- [x] Define the chapter, question/trial sequence, controls and public data contract.
- [x] Write and review the new question bank, hints, feedback and marking rules.
- [x] Add independent saved chapter progress, immutable evidence, checkpoints and retry handling. Prove existing saves and records remain unchanged.
- [x] Build the six varied challenges with the animated dragon, responsive controls, active-play clock and resumable simulation.
- [x] Create and integrate the new landscape and organic target art. Review hero frames and animation on desktop, tablet and phone.
- [x] Connect the finale to Chapter II, add the learning and challenge screens, carry audio/settings across, and provide parent evidence and return paths.
- [x] Verify the complete second adventure, every five-question boundary, full five-minute timing, pause/reload/retry, controls, access boundaries and original-game regressions.
- [ ] Release through the established GitHub main to Cloudflare Pages path, verify deployed files and routes, and replay the key flows with fictional local learner records.

## Preservation and test boundaries

Chapter II uses its own saved event namespace. Starting it explicitly snapshots the completed dragon; existing Chapter I records remain the historical source. Original saves in the middle of a chapter continue through the existing game. No database migration or production test learner is needed.

Browser tests use fictional local D1 records. Released files may be read for final verification; all gameplay writes are intercepted into the local test database. Checkpoint retries use the same operation ID. A failed save must not silently advance the question or discard the minigame.

## Acceptance

Every fifth correctly solved question opens the next challenge; a question never bypasses its preceding challenge. Each challenge gives five minutes of active play, with explicit pause, readable remaining time and a saved result. The next question group continues from that result. The final challenge completes the new adventure.

Quality checks include actual rendered early, middle and final scenes, all earned powers, desktop/tablet/phone framing, keyboard/touch controls, animation frame pacing, audio controls and reduced motion. At least one full five-minute challenge runs in real browser time; deterministic simulation tests cover the remaining boundary and resume cases efficiently.
