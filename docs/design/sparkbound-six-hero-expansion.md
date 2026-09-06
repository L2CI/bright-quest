# Sparkbound Six-Hero Expansion

## Scope and progression

Relay is joined by Helio, Volt, Bastion, Zephyr and Glacier. All six can be chosen
at the hangar; hero selection is not a paid or random reward. Each has its own
combat trait, silhouette, specialist weapon, advanced weapon and travelling effect.

New matches earn equipment sequentially: base suit in round 1, specialist weapon
after three maths tasks, advanced kit after three science tasks. Previews do not
equip anything. Equipment is earned afresh in each duel; Guardian rank, victories
and learning evidence persist. A current match never switches heroes when the
player inspects another one. The next-duel preference is saved per child.

New matches use a snapshotted challenge band based on completed victories:

- 0-1 victories: Foundation.
- 2-3 victories: Applied.
- 4 or more: Stretch, capped at age-eight reasoning rather than unlimited scaling.

There are 144 original expanded questions, 48 per band. See
`sparkbound-expansion-content.md` for curriculum sources, coverage and answer checks.
Retries, hints and resets cannot increase difficulty or bypass forge requirements.
Older four-question matches retain their exact saved content and progression.

## Presentation

- Full-scene live hero inspection, six portrait selectors and three preview stages.
- Upgrade guide with full-body equipment images and actual equipped/locked status.
- Pulse, laser, arc, gravity, coordinated burst and frost effects; impact occurs
  on arrival, not at launch. Only simulated shield combat is depicted.
- Eighteen 640-pixel portraits rendered from the real rigs, not concept art.
  Base rig provenance remains in `sparkbound/assets/model-provenance.json` (CC0);
  new armour and weapons are original runtime additions.
- Original 16-bar procedural music, adaptive battle/forge/victory arrangements,
  distinct launches and assembly rewards. Master sound defaults off. Music and
  effects have independent preferences. Pausing and hidden tabs stop sound.
- Long questions use one scrolling reading surface; answer choices preserve
  scroll position. New feedback is brought into view once, not after every tap.

## QA gates, 6 September 2026

All browser checks used muted Chromium and isolated synthetic saves. No real
family records, remote database writes, commits or deployments were performed.

- Domain/API/content regression: all tests passed, including legacy snapshots,
  six-question redaction, family isolation, difficulty thresholds and retries.
- 180 expansion UI checks: six heroes, three preview stages, six viewport sizes,
  upgrade paths, browser Back, reset/cancel, preferences, hardest prompt layouts,
  reading-position retention and immediate Attack/Shield availability.
- 189 battle-layout and interaction checks, with zero browser errors.
- Complete three-round/six-question browser journey: 18 checks, including saved
  refresh recovery and the Parent popup with incorrect answers first.
- Tutorial regression: 710 checks / 44 screenshots. Graphics gate: 647 checks,
  plus 54 integrated hangar views and 18 integrated tutorial views.
- Audio: 37 offline synthesis checks and 28 final-bundle lifecycle checks.
  Subjective listening quality was not assessed because QA remained muted.
- Pages functions compile successfully; eight compiled routing checks verify
  normal assets and blocked development fixtures. Public `tools/*` is denied
  because test files contain answer-checking evidence.

Evidence is under `../outputs/sparkbound-build/`: `expansion-qa`, `duel-qa`,
`game-qa`, `guide-qa`, `roster-art-qa`, and `expansion-pages-worker`.

Final client SHA-256: `6076668ece4a3c7abac7642521560602b8bbbb5269a060fc71ff6b33bc366819`.
Final CSS SHA-256: `b2ab4558da3c6ec14beca6fdc55cd79deadbb7708a967aa6a08248306771372e`.

## Publication gate

This expansion is not yet live. On explicit publication approval, use the normal
scoped commit -> GitHub main push -> linked Cloudflare Pages build route. Do not
direct-upload or reset D1. No schema migration is needed. Verify the deployed
commit, client/portrait hashes, authenticated entry and new-match `heroId` /
`learningLevel` contract using synthetic intercepted gameplay, not a real child's
match. Check the live tools deny route and Pages fail-closed behaviour before
claiming development fixtures cannot fall back to static serving.

Routing reference: https://developers.cloudflare.com/pages/functions/routing/
