# Sparkbound Duel Refinement

6 September 2026. QA-tested refinement of the published Sparkbound game; approved for the GitHub-to-Cloudflare release.

## Direction

For an eight-year-old, make each duel a readable decision rather than a repeated button sequence. Keep the existing original mech art and authoritative rules. The mission is three round wins, with maths and science equipment tasks between rounds.

- Show shields as the main battle state, the round objective and a four-cell energy meter.
- Show only earned moves: Attack and Shield, then Pierce, then Overdrive. Preserve internal move IDs and existing saves.
- Explain Prism's current intent, optionally suggest an available move, and leave every legal alternative usable. Energy gains shown on controls respect the cap.
- Leave a factual exchange recap until the next choice. A shield against an open stance must not imply that a hit happened or energy was gained.
- Use quicker staggered movement, anticipation and recoil, with native contact still driving health changes and impact sounds. Fit heroes into space left by the real interface; reserve a stable battle band to avoid camera jumps on changing captions.
- Add original layered stereo sound and a short generated room response, distinct shield versus impact timbres, movement sounds and adaptive music. Wind-up is motion-only; hard impacts are contact-triggered. Mute, pause, hidden tabs and zero volume clear voices and reverb tails.

## Evidence

All evidence is in the sibling `outputs/sparkbound-build` directory.

- `npm run test:sparkbound`: 127 tests, including 888 legal presentation/server comparisons and 120 guided-policy matches that reached victory without stalls.
- `game-qa/report.json`: complete three-round browser journey, all four learning tasks, wrong answer/support, saved refresh, review, Back and restart.
- `duel-qa-final-natural-wrap/report.json`: 194 automatic checks passed; five wrapped-heading font-box flags were manually reviewed as false positives with no visible text overlap. No browser errors or genuine unresolved clipping/overlap. Includes source hashes, six viewport sizes, parent-review and persistence checks. Earlier intermediate reports contain resolved layout defects.
- `motion-v2/report.json`: 72 motion cases with calibrated contact, reduced motion, guard/open and terminal outcomes. Later DOM framing is additionally covered by final integrated browser QA.
- `audio-v2/report.json`: 35 audio checks, 14 sounds, 50 contact-aligned cues and a full integrated match.

Browser QA is muted Chromium with isolated local D1 profiles. Offline waveform checks are not subjective listening tests. No claim is made about real iPad performance, Safari audio interruptions, child enjoyment or learning outcomes. Existing production learning records were not changed.

Final tested bundle SHA-256: `9743dd1fb235fd1d460f1b06154407a8f93b42dbbdc8b1317f54342931fd16f7`. Bundle and CSS were unchanged throughout the final browser run. On the narrowest 320px screens, heroes are scaled down to keep all battle information and actions visible.

## Release

User approved publishing on 6 September 2026 and confirmed that acceptance testing is on the live site, not localhost. Release through the established scoped GitHub main push and automatic Cloudflare Pages build, followed by live verification. No new migration is required. The post-deployment receipt and live screenshots are in `outputs/sparkbound-build/live` in the parent workspace.
