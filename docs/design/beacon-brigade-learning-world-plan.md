# Beacon Brigade: HQ and Learning Expeditions

Date: 31 August 2026
Status: Revised design proposal. Plan only; no runtime changes or deployment.
Supersedes: The action-first loop, no-question scope, economy and initial release scope in `beacon-brigade-game-plan.md`. Its Last Z research and graphics shortlist remain background references.
Audience assumption: Year 3 core with Year 4 stretch, pending user confirmation. Exact curriculum outcomes and final question bank require review before implementation.

## 1. The game we are now proposing

An HQ-led, multi-screen learning adventure. The child chooses what to build, sees the resources needed, visits different areas, solves maths and science challenges to earn those resources, returns home and watches the HQ develop.

**Choose a building goal -> select a resource region -> explore -> solve three short challenge stations -> earn resources -> return to HQ -> build -> unlock new destinations.**

The questions are a core resource-earning mechanic, not an optional educational add-on. Preserve the squad, exploration and construction fantasy from the original concept. Action becomes connective play rather than the main activity. Hazards pause when a question or investigation opens; nobody must dodge while reading or calculating.

This is one coherent game with multiple screens, not separate quizzes linked through a menu. Every region has a recognisable purpose, a physical task and a visible consequence. The same expedition, child identity and resource ledger follow the player across screens.

Design balance to test: about half the active session on challenges, a quarter on exploration/interactions and a quarter on HQ choices/construction. These are pacing hypotheses, not enforced timers. A complete expedition should take roughly 3-5 minutes; two plus building can form an 8-12 minute session. Slower readers can take longer without penalty.

## 2. Player-facing modules and screens

| Module | Child's activity | Main actions and return path | First release |
| --- | --- | --- | --- |
| HQ / Home Base | Inspect a living base, choose the next improvement and see resources | Select building, Build, Find resources, World map, Journal, Settings, Return to Bright Quest | Essential; default screen on return |
| World Map | Choose a destination by resource and subject | Inspect region, see reward range/topic/difficulty, Travel, Back to HQ | Essential; four regions, two initially open |
| Region / Expedition | Move a squad between work sites; choose station order where feasible | Move, inspect, interact, pause, return to map, resume expedition | Essential; short routes with real interactions |
| Maths Workbench | Solve the region's logistics, quantity or measurement problem | Enter answer, manipulate objects, Check, Hint, Retry, Learn, Return to region | Essential; reusable across maths areas |
| Science Field Lab | Predict, test, observe and explain a phenomenon | Choose/configure, Run test, inspect results, answer, Hint, Return to region | Essential; reusable experiment and evidence controls |
| Cargo / Expedition Results | See what was earned and what it enables | Review stations, Return to HQ, Continue exploring, see pending-save status | Essential; summarises already credited rewards, not another claim step |
| Construction / Workshop | Inspect an upgrade recipe and its actual effect | Preview, confirm build, cancel, Find missing resources, Back to HQ | Essential; focused screen, not a store |
| Expedition Journal | Revisit discoveries, attempted questions and expedition history | Review, practise a related question, resume saved journey, Back | Essential but compact; no separate classroom dashboard |
| Parent Cockpit integration | Inspect learning evidence and game progress | Open expedition review popup, wrong answers first, correct answers expandable, Close returns to same position | Existing parent surface, not a new parent login |

Settings and help are overlays, not additional navigation destinations. Detailed crew management, equipment crafting and a second technology tree wait until the core loop succeeds. A small squad can still be visible from the start.

### Screen flow

```text
Bright Quest child portal
  -> HQ <-> Construction
       |      -> Find resources -> World Map (relevant region highlighted)
       +-> World Map -> Region -> Maths Workbench or Science Field Lab
       |                  ^                 |
       |                  +---- feedback ---+
       |                  |
       |                  +-> Cargo / Results -> HQ
       +-> Expedition Journal -> question review / practice

Bright Quest Parent Cockpit -> Game progress -> Expedition review popup
```

Use a stable location indicator and consistent Home/Back controls. Screens are internal routes inside the module, not full app reloads. A direct link to a station must restore its eligible expedition or return to the map with an explanation, never skip prerequisites.

### Navigation behaviour contract

- Back from an unanswered station saves the draft and returns to that exact location. It does not mark an answer wrong or grant a reward.
- Back during marking prevents a second submission; a lost response is reconciled using the same operation ID.
- Leaving an expedition retains solved stations and confirmed rewards. It offers Resume or End expedition; ending does not delete earned resources.
- One active expedition per child in v1. Starting another explicitly shelves/ends the current one; another device offers to continue it rather than silently fork it.
- The results screen cannot grant resources again on refresh. Its purpose is explanation and navigation.
- Back from construction cancels an unconfirmed purchase. After a confirmed purchase, returning to the screen shows the upgraded state rather than spending again.
- Browser Back, in-app Back, reload, session expiry and return from existing training links all preserve the same state rules.

## 3. World regions and learning activities

Start with two regions, then add two at HQ Level 2. Resource origin stays easy to understand: maths contracts earn building parts; science investigations earn research cores. Cores are fictional game tokens, not a claim that answering questions physically creates energy.

| Region | Learning territory, provisional | Interaction examples | Reward / unlock |
| --- | --- | --- | --- |
| Supply Harbour | Addition/subtraction, multiplication/division, place value, grouping | Load cranes, pack containers, calculate stock remaining | Building parts; accessible from the beginning |
| Discovery Grove | Material properties, magnets/forces, observation and fair testing | Test candidate materials, compare results, choose a suitable tool | Research cores; accessible from the beginning |
| Quarry and Bridgeworks | Measurement, fractions, shape, capacity and route data | Choose beam lengths, assemble spans, divide supplies fairly | Building parts; HQ Level 2 |
| Waterworks Station | States of matter, heating/cooling, water processes and interpreting observations | Predict a change, adjust a virtual setup, read the evidence, explain | Research cores; HQ Level 2 |

Later regions could include a weather station, observatory, electric workshop or mixed-subject rescue site. Their inclusion depends on curriculum mapping and a successful first world; they are not v1 commitments.

ACARA's current science guidance connects knowledge with inquiry, observation and evidence-based explanation, and its STEM guidance connects science and maths in practical contexts. This supports our activity structure; it does not certify this proposed topic list as an exact Year 3/4 map. Exact descriptors and prerequisite difficulty remain a content-production gate. [ACARA Science](https://www.australiancurriculum.edu.au/curriculum-information/understand-this-learning-area/science), [ACARA STEM connections](https://www.australiancurriculum.edu.au/resources/stem-connections/curriculum-links)

### Sample maths station: crane loading

Task: Four crates each contain six building pieces. Nine pieces are reserved for another repair. How many remain for this job?

The child can inspect the four groups, move the reserved pieces aside, then enter **15**. Feedback shows `4 x 6 = 24`, then `24 - 9 = 15`. The crane loads the verified shipment when the station is completed.

The station pays **4 building-part tokens** as its contract reward. Keep the calculated quantity (15 pieces in the problem) distinct from the contract reward (4 game tokens), both visually and in narration. Never change a mathematically correct answer to match the desired economy.

Question variants change quantities only within validated bounds. Another station can ask the child to pack a feasible configuration directly instead of typing a number. All mathematically valid configurations must be accepted.

### Sample science station: selecting a cover

Task: The squad needs a waterproof cover that can bend around a curved container. Three samples have displayed bend-test and water-test results. Which sample fits BOTH requirements, and what evidence supports the choice?

The child inspects/tests samples and selects the result-supported candidate. The animation wraps that sample around the container. The assessment is based on explicit sample results, not simplistic claims that all materials of a category behave identically.

After explanation and successful completion, award **4 research cores**. Predictions can be revised: an exploratory prediction is recorded as a prediction, not automatically counted as a wrong test answer. Score the relevant final evidence question separately.

### Science correctness boundaries

- Distinguish stylised game action from a scientific model. A colourful repair ray is fiction; a heat-transfer model must show the intended science correctly.
- Each simulation names its controlled variables and limitations. Its output must agree with its explanation and assessment rules.
- Do not teach that every metal is magnetic, that melting is dissolving, or that ordinary filtering removes every dissolved substance.
- Use curated observations for complex phenomena instead of pretending a general game physics engine is a scientifically accurate simulator.
- Demonstrations are virtual and safe; no unsupervised household electrical, chemical or heating instructions.
- Biology and new advanced chemistry are expansion topics, not content silently added from the existing courses.

## 4. Learning and challenge engine

### Shared station sequence

**Brief -> inspect -> respond -> feedback -> retry/support if needed -> outcome -> return to world.**

Teach unfamiliar concepts briefly before expecting independent retrieval. Offer an optional short Learn panel with a worked example; repeat players can go straight to the task. Read-aloud guidance is optional and captioned. Questions themselves are untimed by default.

Use three reusable response families initially: numeric/choice, object grouping/ordering, and evidence-based experiment configuration. They can support many questions without each question becoming bespoke application code. Drag interactions also need tap/select and keyboard alternatives.

### Mistakes, rewards and fair progression

1. Capture the original answer before feedback; show a specific explanation or targeted hint.
2. Allow a retry. If needed, show a worked example, then a related step or fresh variant with assistance.
3. Award the station's fixed resource reward once it is resolved independently OR through the guided path. Record which happened.
4. If the child chooses to leave it unresolved, no reward for that station; previously earned rewards remain safe.
5. Offer future practice of the skill in a different context. Do not require perfect independent performance to keep building the base.

No speed bonuses, resource fines, loss of troops or daily streak pressure for mistakes. Corrected work is worth doing; difficulty and support affect learning evidence, not access to basic game resources. Completing a guided task is not described as mastering the skill.

AERO recommends appropriately challenging, low-risk retrieval with timely correction and practice across occasions. We translate that into feedback, later variants and separate records of support, rather than repeated answer guessing for currency. This is an evidence-informed design choice, not a measured learning outcome of this unbuilt game. [AERO spacing and retrieval](https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication)

### Content model and authoring

Each authored template needs: stable ID/version, subject/skill, provisional year band, prerequisites, prompt, visual stimulus, response type, answer/rubric, worked solution, misconception-specific feedback, hint sequence, parameter constraints, narration/captions where relevant, and source/reviewer status.

Generated instances retain template version, seed/parameters, option ordering and immutable presentation/evaluation data. Future edits cannot rewrite the question a parent is reviewing. Maths variants have executable validity tests; science variants are bounded to reviewed facts and models. No live AI-generated questions or free-text AI grading in the first release.

Start with a small reviewed bank for the first two regions: **12 templates, 6 maths and 6 science, with at least 2 checked instances each**. Template IDs and instances are not the same as distinct skills or distinct question designs.

First-world target after playtesting: **40 reviewed templates across four regions**, with checked variants where sensible. Use evidence to select later practice, but do not infer mastery from one correct answer. Parent reporting shows first-response accuracy, guided completions and later independent evidence separately. Do not penalise speed or exploratory actions.

Existing ICAS maths and science-course content can inform topics, explanations and record shapes. Review any reused item for suitability and preserve its source ID separately. Game practice must not mark existing Chemistry/Physics lessons watched, complete an ICAS test, or overwrite their attempts.

## 5. Resource economy and HQ progression

Two spendable resources only: **building parts** and **research cores**. Blueprints are milestone unlocks, not a third currency. No exchange into Bright Quest stars in v1.

| Milestone | Illustrative cost / rule | Visible consequence |
| --- | --- | --- |
| HQ Level 1 | Free operational starter camp, with basic learning tools | Harbour and Grove open immediately; player can start earning both resources |
| HQ Level 2 | 12 parts + 12 cores | Base becomes a proper workshop; Quarry and Waterworks open |
| HQ Level 3 | A further 24 parts + 24 cores | Command centre and first district finale become available |
| Optional customisation | Small, clearly disclosed costs after the essential loop is introduced | Alternate building finishes or squad appearance; never essential power |

Illustrative yield: three completed stations per expedition x four tokens = twelve of that region's resource. One maths expedition plus one science expedition funds HQ Level 2. Two additional expeditions of each subject fund Level 3. That is six completed expeditions for the core HQ path before optional spending. These numbers must be tested with the eventual content, not treated as final balance.

### Rules that prevent dead ends and reward exploits

- Every essential currency is obtainable before the upgrade that costs it. Both starter regions remain available forever.
- Travel, hints, retries and starting expeditions are free. No fuel-to-earn-fuel cycle.
- No passive resource generation bypasses the questions. HQ machines may animate but do not dispense currency while the player is away.
- Resources are earned on station resolution and credited once by the server, not by clicking Claim repeatedly or reloading results.
- Replaying is permitted with a new expedition and suitable question instances. Replaying the same completed station ID cannot pay again.
- Optional spending never locks essential progress: free expeditions remain available, and the recipe screen explains exactly how to earn any deficit.
- Build prices and prerequisites are visible before confirmation. A purchase must atomically deduct resources and apply the upgrade; either both happen or neither happens.
- Back, interruption or defeat in a short action segment cannot remove earned learning resources.
- Parent approval and security govern changes to learning settings. There is no reset-progress button in the child's routine UI.

## 6. Technical modules: one app, not many services

Recommended structure: an isolated TypeScript game module with Three.js scenes, DOM learning/control surfaces, existing audio conventions and Cloudflare Pages Functions/D1. Reuse Bright Quest identity and portal conventions. Keep the graphics performance gate from the original plan.

| Software module | Responsibility | Important boundary |
| --- | --- | --- |
| Game shell and router | Routes, Back/history, overlays, accessibility, session bootstrap | Owns navigation, not rewards |
| World renderer | HQ, map and region scenes, cameras, animation and interactions | Renders state; a mesh or animation ending cannot authorise currency |
| Expedition controller | Station order, active journey, checkpoints, completion | Stable expedition/station IDs; explicit transitions |
| Challenge engine | Response widgets, marking contract, feedback and experiment state | Shared across regions; content supplied as versioned data |
| Learning records | Original answers, support use, later attempts, subject/skill summaries | Separate from wallet and building progression |
| Economy and construction | Recipes, inventory, rewards, prerequisites, purchases | Server-authoritative, idempotent operations |
| Persistence and sync | Authenticated APIs, IndexedDB drafts, retry queue, save indicators | No browser-only authoritative wallet; no cross-child queue replay |
| Bright Quest adapter | Launch card, child identity, Parent summary and review popup | Small integration surface; preserve other modules' progress |
| Content and asset pipeline | Validation, question releases, licensed models/audio, bundle budgets | Reviewed authored releases, not unbounded runtime generation |

Do not create a microservice per region or duplicate a full quiz implementation for each building. Regions are data plus scene-specific assets and interactions. Load only the current region and nearby shared assets; dispose of scenes and audio when leaving them.

### Proposed code ownership

```text
beacon-brigade/
  index.html
  src/shell/             routes, session, settings, overlays
  src/world/             HQ, map, region rendering
  src/expeditions/       progression and station state
  src/challenges/        maths, science, shared response controls
  src/learning/          review presentation and practice selection
  src/economy/           wallet/recipe presentation
  src/persistence/       API client, local drafts, reconciliation
  content/               reviewed region, mission and item definitions
  assets/                optimised licensed art and audio
  tests/                 logic, route, integration and visual tests

functions/api/beacon-brigade/  authenticated game operations
functions/_lib/               reuse current family-auth helpers
migrations/                   additive game tables
bright-quest-shell-merge.js   narrowly scoped launch/Parent integration
```

This is a proposed layout, not created source folders. Use the repository's established migration/build conventions when implementing.

### Save and review contract

Persist separate records for game state/buildings; expedition/station progress; learning responses; resource transactions. Key each to the existing authenticated family/child. Avoid appending an unlimited game history into the existing whole-profile JSON.

Every answer record includes expedition/station, immutable question version/instance, original response, response history, correctness where applicable, hints/worked-example usage, final resolution, subject/skill and timestamp. Preserve the actual diagram/configuration or enough immutable data to reconstruct it, not just a question ID and percentage.

Server operations include load state, start/resume expedition, submit response, record support use, resolve station, finish expedition, build upgrade and retrieve authorised review. The server validates station state, question instance, marking and rewards; it never accepts a client-supplied wallet balance or arbitrary reward amount.

Use unique request IDs, guarded writes and atomic D1 batches where appropriate, with tests for rollback and concurrency. A zero-row conditional update must be handled explicitly, not treated as a successful debit. Exact SQL and failure handling are an implementation gate. [Cloudflare D1 database API](https://developers.cloudflare.com/d1/worker-api/d1-database/)

MVP connectivity: online to start a new expedition, finalise marking/rewards and purchase upgrades. A brief disconnection preserves drafts and queues submissions, with clear pending status; do not promise full offline assessment or allow spending unconfirmed rewards. On reconnect, reconcile in order under the same child identity. Logout/child switching cannot move a queued answer to another child.

### Parent review

Add a normal Game Learning entry in Parent Cockpit. Clicking an expedition opens a popup using the existing visual language:

- Original incorrect assessed answers first, including those later corrected.
- Show the exact prompt/stimulus, first answer, correct answer, explanation, later resolution and help used.
- Separate prediction revisions and unassessed exploration from objectively incorrect responses.
- Show independently correct answers in an expandable section.
- Show pending or partial expeditions honestly; a completed HQ upgrade is not proof of skill mastery.
- Support subject/skill filters once enough evidence exists; retain close, Escape, focus return and background-scroll behaviour.

Current repo inspection confirms ICAS question records and wrong-answer-first Parent popups exist. Reuse their conventions and record-normalisation ideas through an adapter; do not copy entire module scripts or assume existing dialogs already satisfy every accessibility test.

## 7. Graphics and audio work by module

| Surface | Reusable imported foundation | Custom work that creates quality |
| --- | --- | --- |
| HQ | Coherent modular city/building kit | Three HQ stages, animated builders, machinery contact, construction reveals |
| World map | Selected terrain/building assets | Original geography, legible routes, region silhouettes and resource markers |
| Harbour / Quarry | Roads, utility vehicles, structures | Working crane, loads, beam placement and scene-specific task consequences |
| Grove / Waterworks | Suitable environmental props | Material test rigs, controlled observations and accurate science diagrams |
| Challenge surfaces | Shared accessible DOM controls | Quantity representations, experiment controls and feedback linked to the exact object |
| Results / Journal / Parent | Existing Bright Quest UI conventions | Resource-to-build explanation and full question evidence, not decorative new dashboards |

Use the verified shortlist in the original research, then check selected files and licences at import. Full-bleed gameplay scenes can be expressive; portal and parent controls remain familiar. Avoid an expensive unbounded 3D world: separate compact scenes can feel substantial without loading everything together.

Short NPC/guide cues and satisfying mechanical sounds support the action. There is no need for long narrated videos. Highlight an object for the duration of the spoken instruction, stop speech on leaving its screen, and keep important questions usable with all sound muted. Automated QA remains muted.

## 8. Build sequence and gates

### Phase A: content and design contract

Confirm learning band, freeze the initial resource/unlock graph, map the first 12 templates and review worked answers. Produce HQ, map and station wireframes plus actual-asset hero frames. Validate the two subject loops and define state transitions before coding production features.

Gate: user approves screens, learning level and first-loop storyboard. Resolve whether an educational module should inherit the existing reward-game exam unlock. Recommendation: access under the child's login without requiring an unrelated exam first, since this module itself delivers learning; this is an approval decision, not an automatic policy change.

### Phase B: first complete two-subject loop

Build HQ Level 1, the world map, Harbour, Grove, one maths and one science station family, rewards, HQ Level 2, authenticated saves and a Parent review popup. Expand each prototype expedition to three stations once the response controls work.

This phase must demonstrate **login -> choose HQ goal -> maths expedition -> science expedition -> build -> reload -> correct HQ state -> Parent sees original wrong answer and correction**. It is not complete with static mock-ups or a local-only wallet.

Gate: all navigation and save transitions work; representative graphics pass real-device performance; questions and consequences agree; child understands why each journey matters.

### Phase C: make the loop good

Observe the son playing without adult steering. Adjust question length, difficulty, station variety, travel time, feedback, building costs and presentation. Repeat across separate sessions. The core question is whether he enjoys planning the next build AND engaging with the problems, not simply whether he clicks rapidly for resources.

Gate: meet the child-experience target and resolve major friction. If two substantial revisions fail, rethink the loop before expanding the world.

### Phase D: first full world

Add Quarry and Waterworks, HQ Level 3, six authored expedition routes total, 40 reviewed question templates, repeatable variants and compact Journal practice. Route allocation: two each in Harbour/Grove and one each in Quarry/Waterworks. Add optional appearance choices only after core economy tests pass.

Gate: each region differs in task and presentation; there is enough validated variation for replay; no currency dead ends; all evidence reaches Parent review.

### Phase E: hardening and production

Run the three-pass QA below, then an approved GitHub -> Cloudflare Pages preview/production release. Keep `/beacon-brigade/` on the Bright Quest origin, with existing family authentication and a separate module card. No direct-upload workaround or new domain/login system is needed.

Revalidate Cloudflare asset limits, build settings and live revision at release. Use an additive schema migration and feature flag; rollback hides/restores the game version without deleting learning records or wallets. The current plan itself makes no deployment change.

### Parallel work after approval

Four bounded streams: learning content/answer validation; world art and scene interactions; navigation/challenge client; persistence/Parent integration. An independent QA stream checks their contracts. Agree question-instance and station-resolution formats first so parallel work does not invent incompatible saves. One owner integrates and validates the complete loop.

## 9. Acceptance criteria and proof

| Area | Target | Proof |
| --- | --- | --- |
| Game appeal | At least 18/20 across graphics, controls, clarity and agency, with no category below 4/5 | Child playtest, including a later repeat session; not an agent rating |
| Comprehension | Child can identify the next building goal, missing resource and destination within 90 seconds of onboarding | Unprompted observation |
| Learning integrity | All published items have a reviewed answer/explanation; all parameter variants satisfy validity checks | Content manifest, solution tests, science review |
| Honest evidence | A corrected answer remains visible as initially incorrect; support and predictions are distinct | Parent popup comparison with the actual expedition |
| Navigation | Every screen has a working Back/Home route; every enabled action and interruption state tested | Route/action matrix, desktop/tablet screenshots and recordings |
| Economy | No negative wallet, duplicate reward, double purchase or resource dead end | Automated economy simulation and concurrent-request tests |
| Persistence | Zero lost confirmed records or cross-child leakage in at least 20 disruption scenarios | Reload, expiry, lost response, reconnect, two tabs/devices and child-switch results |
| Graphics/audio | No disconnected hands/tools, wrong science animation, premature emphasis removal or stale narration | Recorded interaction review with deliberately scheduled audible checks |
| Performance | Target 30 fps-class sustained tablet play; retain original plan's load/input budgets and validate scene switching for leaks | Real-device 15-minute session; emulation is supplementary |
| Production | Live child flow, actual saved HQ, correct Parent evidence and all module assets verified | Deployment revision plus live smoke-test report |

### Mandatory three-pass QA

1. Automated/structural: answer validity, scoring states, guarded rewards/builds, prerequisites, ownership, all routes and controls, reconnect behaviour and load budgets.
2. Visual/experiential: every screen, both subjects, wrong/correct/assisted/prediction paths, construction, mobile framing, touch/keyboard alternatives and narration/object timing. Review representative recordings and fast transitions, not just screenshots.
3. Missed-case/regression: direct links, browser Back, nested dialogs, refresh during submission/build, rapid double clicks, repeated results, logout/child change, stale data, context loss, asset failure and old Chemistry/Physics/ICAS progress. Reconcile totals across game, server and Parent cockpit.

All criteria are future gates, not already achieved results. A passing interface does not prove long-term learning improvement; that needs later independent practice evidence and cannot be inferred from resource earnings.

## 10. Approval decisions

User confirmation requested: Year 3 core with Year 4 stretch, or mainly Year 4. Recommended remaining defaults: untimed maths/science challenges, guided recovery earning normal resources, HQ-led play with short exploration sections, two starting regions, no unrelated-exam prerequisite, and a complete two-subject slice before expanding.

The next build should be Phase B only after the content/screens in Phase A are approved. Do not launch parallel production of all regions before proving the multi-screen learning-to-building loop.
