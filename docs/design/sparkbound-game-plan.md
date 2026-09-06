# Bright Quest: Sparkbound

Working title. Concept and build plan, 5 September 2026.
Status: implemented locally on 6 September after the user's approval. Release
verification and the Cloudflare authentication blocker are tracked in
`../qa/sparkbound-release.md`. No automatic task or release is scheduled.

## Approved Build Direction

The 6 September instruction superseded the human-costume art assumption with
original, Transformers-inspired mechanical heroes: articulated licensed rigs,
original armour, an industrial harbour arena, unfolding equipment and mechanical
sound. No Transformers characters, insignia, music or franchise assets are used.
The gameplay structure below remains the three-round, two-forge first slice.

## The Game

A friendly superhero rivalry where a lesson produces a tool you can see working.

You are Relay, an agile kinetic hero. Your sparring partner is Prism, a composed
defensive hero. On a sunlit city training terrace, you learn each other's fighting
styles and qualify together as City Guardians. The rivalry is real; injury is not.

The signature scene: your strike glances off Prism's new guard. At the nearby forge
you solve a short equipment problem. A staff unfolds from your gauntlet. Back in
the arena, the same guard visibly cracks under the new technique. The improvement
is a changed action and reaction, not merely a bigger number.

This is not another open-world vehicle game. It is an intimate, side-on 2.5D duel:
two expressive characters, one exceptional arena, short choices and visible growth.

## Review of the Supplied Brief

Keep its strongest ideas: superhero action first, visibly escalating rivalry,
learning-earned equipment, supportive retries, three rounds and mutual evolution.

Change these before building:

| Brief risk | Design decision |
| --- | --- |
| Three training bursts requested, but only two placed in its detailed match loop | Two pauses between three fights; do not add questions after the final fight merely to satisfy a count |
| 4-5 questions per burst risks lengthy compulsory interruptions | First playtest uses two tasks per pause; consider a third only after measured pacing and child feedback |
| Power-based randomness can make good choices feel unfair | Committed rival intent and deterministic effects; no hidden reroll or scripted loss |
| Every correct answer grants several unrelated stats | Each task completes a visible equipment step; one clear upgrade per pause |
| Six similarly prominent meters clutter the arena | Power comparison is dominant; suit integrity is secondary; energy belongs to Special |
| Five tiers, many weapons and six question types dilute art quality | One arena, two heroes, one staff unlock and one modular tier transformation |
| Generic React recommendation does not fit this repository | Reuse ES modules, Three.js, existing HTML controls and esbuild |

These are deliberate recommendations, not unnoticed omissions from the attachment.

## First Match

1. **Enter immediately.** The portal opens onto Relay and Prism in the arena. Resume
   an existing match or start with one obvious action. No separate marketing screen.
2. **Try a move.** A short playable exchange demonstrates Strike and Guard. The
   child performs it; this is neither a movie nor an unwinnable introductory fight.
3. **Round 1: learn the rival.** Real base-kit combat with forgiving readable intent.
   After the round Prism reveals an upgraded guard in a brief safe demonstration.
4. **Forge A: build the answer.** Two maths tasks calibrate and assemble the staff.
   The camera moves within the same arena; combat and timers are fully paused.
5. **Round 2: use the new tool.** Break becomes available. Prism mixes guarded and
   exposed stances; the staff's guard-piercing effect is immediately demonstrated.
6. **Forge B: prepare for pressure.** Two science tasks use supplied evidence to
   select a protective module and reconnect its diagnostic light. Special charges.
7. **Round 3: combine the kit.** Decide between safety, spending energy now and
   saving it for a special. Victory is earned, not secretly guaranteed.
8. **Mutual promotion.** Prism's suit powers down safely. The heroes acknowledge
   each other; both receive a guardian insignia and a visible armour attachment.
   Offer Rematch, Review training and Return to Bright Quest, all working routes.

Planning target: roughly 6-10 minutes, not a completion timer or validated estimate.
Reading, assistance and input time can extend the session without penalty. Pauses
must be tested, not justified by average adult completion time. No unlock countdowns.

## Combat With Real Choices

The player chooses actions; the game handles approach, contact and retreat. Keep
both characters visible and planted. Avoid joystick and camera-management overhead.

| Command | Benefit | Trade-off |
| --- | --- | --- |
| Strike | Reliable modest damage; earns some energy | Less effective into a guard; leaves incoming pressure to absorb |
| Guard | Reduces the incoming hit; gains energy when actually struck | Does not damage the rival; no energy from guarding an idle opponent |
| Break | Spends energy for a heavier, guard-piercing staff technique | Delays Special; expensive to use indiscriminately |
| Special | Full-meter cinematic attack and clear payoff | Empties the meter; timing remains the player's decision |

Introduce Strike/Guard first, then Break, then Special. The same control positions
remain stable. No more than these four battle commands. Three distinct attack
animations are Strike, Break and Special; Guard is defence, not a fourth attack.

Before each choice, Prism uses a recognisable wind-up pose plus a matching icon
and short label. Hold at least one second, then maintain an idle telegraph until
the player chooses. No colour-only signals, reaction deadlines or sound dependency.
Intent is committed before the choice, not selected after seeing the player's input.

Energy is a shared finite resource, so several moves can be sensible. Tune a small
deterministic ruleset; do not introduce a rock-paper-scissors answer key. Test
always-Strike, always-Guard, always-Break-when-affordable, Guard-to-Special and
mixed strategies over varied authored rival sequences. A fixed policy dominating
normal-mode scenarios is a balance defect; stronger adaptive policies should do
better. The suggested 70% fixed-policy threshold is a diagnostic, not a guarantee.

Suit integrity reaching zero pauses that round. Retry with upgrades and learning
progress intact; assistance can clarify intent. Wrong school answers never cause
the hero to be hit. Do not call supported completion independent mastery.

## Learning That Produces a Visible Result

The forge is an intentional, brief learning pause. Keeping it inside the arena
helps continuity but does not by itself make it seamless. The child's reason to
return is the equipment effect they have already seen they need.

First-playtest examples, subject to final content and visual review:

| Task | Interaction and answer | Visible outcome |
| --- | --- | --- |
| Three packs have eight cells each. How many cells? | Numeric keypad: 24 | Fill three groups of eight in the staff cartridge |
| Calibration rises by four: order 12, 16, 20, 24 | Tap-order, with undo/reset | Rings align and the staff unfolds |
| Identical tests give pad A sensor reading 6, B 11, C 8; lower means a smaller measured push. Which is lowest? | Select A; say this test supports the choice, not that it is universally best | Fit the tested protective pad |
| A depicted battery and lamp have one missing connection | Choose the diagram forming a complete loop through the lamp and battery, with no short circuit | Diagnostic lamp illuminates; fictionally the suit reports ready |

The last task is supported introductory/stretch content, not assumed prior
knowledge. Fictional suit powers are not taught as real physics. Diagrams and
correct alternatives must be authored before scoring logic or animation.

- Begin with numeric entry, multiple choice and tap-order. Matching/image types
  stay extensible in the schema; do not claim unsupported renderers are implemented.
- Use a large in-game keypad, not a mobile keyboard covering the arena.
- Wrong answer -> specific clue -> retry -> worked support -> achievable completion.
  Give the same equipment reward for resolved supported and independent work.
- Snapshot the original prompt, choices, answer, attempts, hint use and explanation.
  Revealed/worked completion is explicitly distinct from independent correctness.
- First playtest has a fixed skill sequence. Later adaptation is per skill and
  based on multiple first attempts and assistance, never reading speed alone.
- First released bank target: 12 authored tasks with two checked variants each.
  Track recent exposure; no claim of endless fresh content. A technical 20-match
  soak is a stability test, not twenty unique matches.

## Art Direction and Asset Decision

**Readable superhero realism, not photorealism and not a preschool cartoon.**
Relay has an agile human silhouette, asymmetric short jacket, ivory/carbon armour
and amber gauntlets. Prism has a taller layered silhouette, restrained red details
and a shaped cyan shield. These are original concepts, not existing franchise heroes.

The full-bleed arena is a bright elevated training terrace: credible surface
materials, city depth, a small integrated forge and restrained atmospheric movement.
No corporate cards, rainbow terrain, permanent bloom clouds or effects hiding hands.
Spend detail on faces/visors, hands, footwear, weapon attachments and contact.

| Asset | Obtain or build | Acceptance |
| --- | --- | --- |
| Humanoid base and locomotion/combat clips | Import an explicitly redistributable rigged set; retarget only after compatibility proof | Coherent skeleton, planted feet, clean shoulder/wrist motion; recorded licence |
| Hero identity and upgrade | Original costume materials and modular attachments | Two recognisable silhouettes; no six full outfits or simulated cloth |
| Staff and guard | Original model and authored attachment animation | No detached grip, intersection or contact drift |
| Arena | One compact original scene with verified textures and baked/static lighting | Quiet readable backdrop at desktop/tablet/mobile sizes |
| Concept imagery | Generated raster studies if needed before final art selection | Reference only; never presented as runnable rigged art |
| Audio/VFX | Licensed or original, event-driven assets | Clear impacts, controlled particles, no flashing dependency; mute works |

No production rig, animation pack or paid purchase has been selected yet. This is
the main open risk. Timebox the first build session's asset investigation to about
60-90 minutes. If no suitable legal rig is demonstrably usable, present two concrete
asset choices and an explicitly approved 2.5D fallback. Do not quietly replace
superheroes with primitive geometry or spend days browsing packs without a decision.

Record sources, authors, redistribution terms, checksums, rig scale, clip names,
event timings and quality variants in one manifest. Shared rig, distinct characters.
No runtime dependency downloads from arbitrary asset hosts.

## Technical Fit

Local inspection confirmed a static Bright Quest application, esbuild, existing
Three.js scene code, installed Phaser/Howler, Pages Functions and D1. Existing
`functions/api/beacon-brigade.js` demonstrates family/child scoping, Parent access,
versioned actions and idempotent transactional receipts. Reuse these patterns,
not the other game's state or resource economy.

Proposed ownership boundaries:

- `/sparkbound/`: HTML entry, scoped styles, compiled module and asset manifest.
- `src/arena/`: rig loading, animation clips, camera, effects and sound events.
- `src/ui/`: accessible HUD, keypad, training renderers, pause/settings and return.
- `content/`: reviewed tasks, evidence, variants and battle/equipment configuration.
- `functions/_lib/sparkbound.js`: pure authoritative match and scoring transitions.
- `functions/api/sparkbound.js`: existing child identity, parent-review projection,
  action receipts and version checks; separate additive D1 tables if implemented.
- Existing portal launch and Parent cockpit: narrowly scoped new module integration.
- Tests: domain/content, API isolation/replay, fixture browser journeys and visual QA.

Use Three.js for the 3D scene rather than mixing two rendering engines. Its
[GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) loads scene/animation
assets and [AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
plays clips. Match addon versions to the existing pinned runtime before use;
current online documentation is not proof that a newer API exists locally.

Authoritative states: intro/demo, battle, round-result, rival-upgrade, training,
player-upgrade, match-result and evolution. Pause/settings are presentation overlays.
Persist match/round/exchange IDs, committed rival intent, question snapshots, kit,
attempts and reward receipts. Animation callbacks only present already-decided
events; they never grant rewards. Reload must not reroll an exchange or repeat an
upgrade. Network failures pause progression and retry the same operation. Debug
controls are local-only and cannot grant production rewards.

## Tomorrow's Build Path

| Stage | Deliverable | Stop/go condition |
| --- | --- | --- |
| 1. Asset feasibility | One proven rig/clip pipeline plus character/arena visual target | Licence and animation quality verified; no silent placeholders |
| 2. Signature proof | A 60-90-second playable scene: guard blocks, one task, staff unfolds, attack breaks guard | Unbriefed observer can explain the before/after; hand/weapon contact looks right |
| 3. Combat proof | Strike/Guard/Break/Special resource choices, rival telegraphs, retry | No obvious dominant loop; choices comprehensible without rapid tapping |
| 4. First match | Three rounds, two two-task forge pauses, one evolution and a rematch | Measured pacing supports the learning pauses; no dead next-tier CTA |
| 5. Product integration | Child save/resume, original-answer Parent popup, scoped reset and portal return | No duplicate rewards, cross-child state or lost wrong-answer evidence |
| 6. Polish and release QA | Animation/audio, reviewed content variants, real-browser checks and soak | All primary flows pass; fresh production approval before GitHub/Cloudflare |

Tomorrow begins stages 1-2; this is not a promise to finish all six in one day.
The proof has **one** task. The first full-match playtest has **two plus two**.
Do not build a large question bank or several arenas before the signature works.

Parallel work after visual approval: animation/assets, deterministic combat and
content/API contracts can be separate bounded work streams. One integrator owns
state/event contracts, collision/contact timing, UX and end-to-end QA.

## Success Gates

- After the demo, an unbriefed observer recognises Prism's intent and what the
  forge changed. Repeat with the child; adult review cannot certify child enjoyment.
- After the first upgrade, guard breaking is categorically visible, not a small
  damage-number difference. During combat, limbs and equipment make contact.
- The child can state a reason for choosing defence or spending energy; no adult
  explanation of an invisible counter chart is required.
- Forge tasks are self-paced. Consider a third only if the initial playtest shows
  comfortable sub-90-second bursts and willingness to return, not just fast scoring.
- Screenshots at 1440x900, tablet landscape and 390x844/mobile landscape show readable
  text and unobstructed heroes. Portrait remains usable; rotation never loses state.
- All buttons, touch/keyboard input, numeric edits, ordering undo, pause, mute,
  settings, retry, cancel, browser Back and portal return work without stranded views.
- Target responsive input acknowledgement below 100ms, desktop 60fps and stable
  tablet 30fps; measure on named devices. Target initial compressed assets <=15MB.
  These are provisional budgets, not achieved measurements or guarantees.
- Muted automated QA; check sound timing separately without sending audio to the
  user's headphones. Reduced motion removes shake/flashes without hiding outcomes.
- Exact answers/hints remain in wrong-first Parent review. Test replayed writes,
  lost responses, double taps, refresh, child switching and tab backgrounding.
- Twenty-match technical soak: no duplicate rewards, unresolved console/network
  errors or sustained memory growth. Real Safari/iPad testing remains a separate gate.

Simple controls, self-paced text, separate audio controls and pose/icon redundancy
follow the [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/basic/).

## Fable Review and Decisions

Fable 5 reviewed the bounded draft, then a revised packet. Its first response was
incomplete; a second response finished the review and gave a **conditional GO for
the small proof**, not full implementation or production. Review packets and records
are under `outputs/sparkbound-plan/` in the workspace, outside the deployed module.

Accepted: fight-first structure, categorical equipment effect, staged controls,
Guard/Special-loop testing, shorter training, legal-asset timebox and honest learning
records. Clarified rather than blindly copied: one-task proof versus 2+2 slice,
policy win-rate thresholds, and a closing pitch whose three-minute maths suggestion
contradicted the shorter pauses. Parent evidence and soak QA remain release gates,
even though they do not block the isolated first proof.

No game code, deployed UI, auth data or production state changed during planning.
