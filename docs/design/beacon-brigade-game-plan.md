# Beacon Brigade: Last Z-inspired Bright Quest game plan

Date: 31 August 2026
Status: Proposal for approval. No game implementation, asset purchases or deployment authorised by this document.
Revision notice: The subsequent HQ-led maths/science expedition design in [beacon-brigade-learning-world-plan.md](beacon-brigade-learning-world-plan.md) supersedes this document's action-first loop, no-question scope, economy and release scope. Retain this document as the original research and asset shortlist.
Working title: Beacon Brigade. Final naming and originality checks remain open.
Audience: Ages 7-10, initially playtested with the user's eight-year-old son.

## 1. Recommendation

Build an original, action-first squad adventure with a small, visibly evolving home base. Keep the immediate dodging, satisfying target clearing, growing team and upgrade choices that make this genre appealing. Replace the apocalypse and spending pressure with a hopeful robot-city restoration story.

**Choose equipment -> launch a squad -> dodge and disable malfunctioning machines -> recover helpers and parts -> restore your town -> save and stop, or choose another mission.**

Recommended balance: approximately 70% action and 30% preparation/base building. Two short missions plus a town upgrade form an optional 8-12 minute session, but every mission is a valid stopping point. No compulsory minimum play time.

Use polished, toy-like real-time 3D, subject to a real-device performance gate. Build ONE complete mission with final-quality representative graphics before committing to six missions. Do not start by producing a large campaign of placeholder art.

This is a game first, not a quiz interrupted by action. Number sense, budgeting and planning can arise through play; formal curriculum questions are outside the proposed first release.

## 2. Research: what Last Z actually offers

Research basis: publisher store descriptions and screenshots, a secondary gameplay guide, official asset listings and technology documentation. This was desk research, not hands-on testing of an installed Last Z account. Exact late-game balance, economy and current event rules have not been validated.

The publisher describes dodge-and-shoot action, exploration, companions, shelter expansion and economic/technological progression. Its Australian Apple listing currently rates it 16+ and discloses weapons, violence, horror themes, loot boxes and messaging/chat. That makes the original an inspiration for selected mechanics, not an appropriate child-facing product to embed. [Publisher listing](https://apps.apple.com/au/app/last-z-survival-shooter/id6503272652)

A secondary walkthrough describes vertically scrolling squad stages with hazards, numbered gates, breakable reward containers and power-ups, linked to base construction and hero development. This supports designing TWO connected loops rather than copying only an advertising-style runner. The exact gate arithmetic is not essential to our adaptation. [BlueStacks gameplay guide](https://www.bluestacks.com/blog/game-guides/last-z-survival-shooter/lzss-beginners-guide-en.html)

| Observed appeal | Proposed adaptation | What we should not carry over |
| --- | --- | --- |
| Immediate movement and target feedback | Steer a squad; tools fire automatically; trigger one special ability | Complex twin-stick aiming for the first mission |
| Squad grows during a run | Reboot stranded helper bots that visibly join the formation | Disposable human troops or frightening defeat |
| Choosing targets and bonuses under pressure | Choose between repair stations, parts and additional helpers | An always-obvious larger-number gate with no real trade-off |
| Action funds base progression | Earn parts and physically restore town structures | Long upgrade timers or resource purchases |
| Heroes and loadout development | Three clearly different tools and deterministic unlocks | Gacha recruitment, paid rarity and escalating stat grind |
| Persistent world | A safe town that improves through player choices | Raids, offline damage, public chat or competitive spending |

The proposed design below is our interpretation, not a claim about how Last Z implements every system. Do not reuse its name, characters, interface, maps, dialogue, sound or extracted assets.

## 3. Kid-friendly concept refinement

### Alternatives considered

| Direction | Strength | Main drawback | Decision |
| --- | --- | --- | --- |
| Colourful creature blaster | Closest to a conventional shooter | Can still make the core fantasy harming living characters | Not the starting direction |
| Peaceful town builder | Creative and relaxed | Loses the immediate action the user requested | Keep its restoration rewards, not its whole structure |
| Robot squad and town restoration | Preserves excitement, tools and large encounters without gore | Could resemble existing Mechshift unless mechanics are distinct | Recommended |

### Identity and core verbs

Working fantasy: **My small team can bring a whole city back to life.** A city-wide signal fault has scrambled its service machines. The squad uses repair pulses, magnetic tethers and shields to reach control cores and reboot them.

Player verbs: steer, dodge, prioritise, recruit, shield, repair, customise and build. Disabled machines power down and later rejoin the restored city. No death imagery or frightening distress.

Unlike Mechshift, the central mechanic is a growing squad in continuous action, feeding a persistent town. No vehicle transformation loop and no repeated maths pop-up checkpoints.

### Controls and meaningful decisions

- Touch: drag in a clear lower-screen steering area, with an alternative virtual stick. A large thumb-accessible special-tool button sits outside the hazard lane.
- Desktop: arrows/WASD and one special-tool key. All menus work with keyboard focus.
- Forward movement and basic repair fire are automatic. Steering changes which target the squad faces. No tap-spamming.
- Fixed elevated camera; no camera controls while dodging. Portrait and landscape preserve the same critical hazard visibility.
- Prepare with one of three tools: pulse clears clustered faults; magnet reaches isolated helpers and parts; shield trades clearing speed for protection. Each tool must have missions where it is useful.
- Example fork: take a safer lane to refill a shield, or a harder lane to gain a helper. Neither is always better. Preview the consequences with icons before the fork.
- Team size initially caps at six. Additional rescues return safely to town rather than producing an unreadable screen full of units.

### Representative first mission: Switchyard Rescue

| Time | Playable beat | Evidence that it works |
| --- | --- | --- |
| 0:00-0:15 | Squad is already visible. One short objective, then steer immediately | Movement, target clearing and mission goal understandable without a lecture |
| 0:15-0:45 | Avoid a clearly telegraphed obstacle and reboot the first helper | Helper turns towards the squad, joins it, and contributes visible repair pulses |
| 0:45-1:20 | Choose a shield refill or a helper route | Both routes tested; consequence visible before and after choosing |
| 1:20-2:00 | Moving machinery asks the player to change lanes and time a special tool | Action has timing and spatial decisions, not just increasing numbers |
| 2:00-2:45 | Large maintenance machine sweeps an arm; dodge, expose its core, reboot it | Arm physically joins the body, ground contact is credible, cue precedes sweep |
| 2:45-3:15 | Return to the town and spend earned parts on its first workshop | Actual building changes, reward saves once, resume reproduces the result |

Times are pacing targets, not fixed narration deadlines. Gameplay state triggers short voice lines, with text equivalents; speech never holds up a manoeuvre.

### Safety without removing challenge

UNICEF's RITEC toolbox identifies autonomy, competence, creativity, emotions, relationships and safety among dimensions to consider in children's digital play. Our practical translation is meaningful choices, recoverable mistakes, customisation and natural stopping points. This is design guidance, not a certification or a promise of developmental benefit. [UNICEF RITEC](https://www.unicef.org/childrightsandbusiness/workstreams/responsible-technology/online-gaming/ritec-design-toolbox)

- No ads, purchases, paid currency, loot boxes, public chat, user uploads, public rankings, raids, streak loss or expiring rewards.
- No offline production countdowns or daily stamina. Energy is a tactical within-mission resource and resets at launch.
- Failure returns to a safe checkpoint. Earned town upgrades cannot be destroyed. Retry and leave are equally easy to find.
- Offer an explicit assist mode: slower hazards, longer warning time and stronger shielding. Do not secretly label a child's ability.
- Pause, sound off, reduced motion and return to Bright Quest remain available. Backgrounding the tab pauses play and audio.
- During active play use brief cues, not long instructions. Allow immediate skipping of repeat introductions.
- No child name, account details or profile data goes into external art/voice-generation prompts. No external model is needed at runtime.

## 4. First-release scope

Six authored missions in two districts, with replay variants. This is deliberately a small campaign, not a miniature online empire game.

| Mission | New challenge | Town consequence |
| --- | --- | --- |
| Switchyard Rescue | Steering, helpers, route choice, first large machine | Workshop restored |
| Rooftop Relay | Moving obstructions and choosing repair targets | Relay tower activates |
| Cargo Run | Protect a moving load; balance helpers against shield reserves | Garage opens |
| Canal Circuit | Alternating lanes and timed sluice mechanisms | Water station restored |
| Power Route | Longer combination of earlier patterns; deliberate loadout choice | Town systems reconnect |
| Beacon Reboot | Multi-stage encounter using learned cues, not a surprise control scheme | District restoration finale |

Scope caps: three tools; three ordinary hazard/machine behaviour families; two major encounter rigs, reused with genuinely different patterns; four base structures with three visible restoration stages; one persistent currency (parts) and one temporary resource (energy).

Buildings unlock options, not mandatory power inflation: workshop unlocks tools; relay reveals mission alternatives; garage unlocks squad appearance presets; water station opens district restoration objectives. First campaign rewards must fund essential unlocks without replay grinding. No passive-income economy.

Use selectable building upgrade slots and cosmetic presets, not unrestricted city placement or player-created content in v1. Players choose upgrade order, and the town remembers it. Replay offers alternate routes and personal bests without public comparison.

Out of scope: PvP, alliances, chat, live services/events, daily tasks, procedural open world, real-money economy, full crafting tree, native app and formal curriculum assessment.

## 5. Graphics: import foundations, build identity

### Art direction

**Cinematic toy-city adventure:** bevelled readable machines, expressive faces, rich but uncluttered streets, directional light, convincing contact shadows and clear depth. Use a balanced palette: neutral roads, green planting, cyan utilities, yellow safety markings and selective coral hazards. Different tools need shape and motion signatures as well as colour.

Carry forward Bright Quest's preference for crafted, cinematic scenes, but do not use a painted still as a substitute for the interactive world. The squad, obstacles and repair events must actually animate and respond.

Set the quality bar with one approved gameplay frame and one town frame using production-compatible assets. Concept art alone cannot pass that gate.

### Verified candidate shortlist

These are shortlist entries, not downloaded or engine-tested assets. Recheck each selected file's licence and contents on import. Do not mix every pack into one scene.

| Need | Candidate and verified information | Import/customise/build decision |
| --- | --- | --- |
| Town buildings | [KayKit City Builder Bits](https://kaylousberg.itch.io/city-builder-bits): 32+ low-poly models; GLTF/FBX/OBJ; shared texture atlas; CC0. Free tier exists, editable Blender sources are a paid tier | Preferred town foundation. Test scale/readability, unify palette and build restoration variants. Do not assume the free tier includes Blender source |
| Roads and city props | [Kenney City Kit Roads](https://kenney.nl/assets/city-kit-roads) and [Suburban](https://kenney.nl/assets/city-kit-suburban): 3D, CC0 | Alternate coherent environment family or selected compatible road pieces. Inspect downloaded formats and remodel mismatches |
| Vehicles | [Kenney Toy Car Kit](https://kenney.nl/assets/toy-car-kit): 3D, CC0 | Background utility vehicles and early shape references; customise silhouettes/materials for prominent units |
| Animated helper | [Quaternius Animated Robot](https://quaternius.com/packs/animatedrobot.html): CC0; FBX, OBJ and Blender formats listed | Candidate prototype rig. Convert to GLB, verify clips and proportions. Do not assume a ready-made GLB or automatically compatible animation |
| Broader machine kit | [Quaternius Sci-Fi Essentials](https://quaternius.com/packs/scifiessentialskit.html): models/animated robots with free and paid tiers | Optional alternative after checking exactly which files are included. Exclude realistic weapon props |
| Alternate base theme | [KayKit Space Base Bits](https://kaylousberg.com/game-assets/space-base-bits): GLTF/FBX/OBJ, CC0 | Alternative if a space colony is selected instead of a town; not another visual family to mix in by default |
| Interface audio | [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds): CC0 | Short menu cues after listening and loudness balancing; create distinctive repair, shield and reboot sounds separately |
| Squad identity and major machines | Original designs based on gameplay roles | Build/custom-model leader silhouette, face expressions, tool attachments, two encounter rigs and their gameplay animations |
| Repair effects and world changes | Original, driven by game state | Build pulse paths, tether attachment, shielding, shutdown/reboot, construction stages and district light-up sequence |
| Portal art and distant decoration | Original raster artwork where useful | Generate/create portraits and module art, then match the actual in-game models. Never use a concept image that overpromises the playable graphics |

Start with free assets. Buying source files may make a selected kit easier to customise, but any paid purchase or commissioned model requires a separate budget approval. The existence of free packs does not make polished art production free of effort.

### Asset production pipeline

1. Inventory selected files: source URL, creator, licence text, download date, checksum, original format and modifications. Keep an attribution file even where credit is optional.
2. Import a small candidate set into the modelling pipeline; normalise units, pivots, forward axis, material names and rig scale. Check every animation clip.
3. Build a consistent visual family. Adjust proportions, faces, palette and detail frequency; avoid obvious assembled-pack mismatch.
4. Export runtime GLB assets, optimise geometry/textures and retain editable source files outside the deployed asset folder. Select compression only after verifying its browser decoder and loading cost.
5. Use shared materials, repeated-object instancing, pooled effects and limited shadow casters. Validate texture sharpness at the actual camera distance.
6. Test in the real game camera on tablet, not only in a modelling preview. Check hands/tool attachment, wheels/feet on the ground, hitboxes and occlusion.
7. Record first/middle/finale/recovery footage. Rework any asset that cannot express its gameplay state clearly.

### What makes motion feel expensive rather than noisy

- Anticipation -> action -> result -> recovery: every important hazard and tool has all four stages.
- Machine mass comes from acceleration, joint motion and settling, not screen shake alone.
- Repair tethers remain attached until the action ends. Target emphasis persists for the whole instruction or interaction, not a momentary flash.
- Squad members visibly perform different jobs without cluttering the danger area.
- The large machine changes behaviour and expression when rebooted, then contributes to the town. The outcome is more than a number on a results panel.
- Save dramatic camera movement for safe moments. Reduced-motion mode removes camera shakes and large zooms without removing essential cues.
- Audio uses separate music/effects/voice controls; priority rules prevent overlapping guidance. Automated QA stays muted; audible review is deliberate and separately scheduled.

## 6. Technical and Bright Quest integration plan

### Current repo observations

Local inspection on 31 August 2026 found a clean worktree. Bright Quest serves static module folders, has existing Phaser/Howler games, and uses Pages Functions with D1-backed family/child profiles. Existing profile writes enforce session identity and optimistic version checks, including STALE_PROFILE conflicts.

Relevant local references: `mechshift-rescue/index.html`, `cave-river-quest/index.html`, `bright-quest-shell-merge.js`, `functions/api/profiles.js`, `package.json` and `wrangler.toml`. Three.js files exist in an older game folder, but the inspected active entry points use Phaser; that does not establish a production-ready shared 3D game engine.

### Engine decision

Recommend **Three.js + TypeScript for the isolated module, Rapier for collision/physics, existing Howler-style audio and a DOM interface**. Three.js supports GLTF loading and instancing, which fit the proposed models and repeated scenery. It is a renderer, not a complete game framework: input, mission state, progression and save handling still need explicit implementation. [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html), [InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html), [Rapier JavaScript](https://rapier.rs/docs/user_guides/javascript/getting_started_js/)

This adds engineering compared with the established Phaser approach. Justification: an articulated squad, large machines and a persistent 3D town are central to the intended quality jump. Validate that advantage in the slice before scaling.

Fallback, only if the slice fails target-device performance or art feasibility: Phaser with offline-rendered 3D sprite atlases. That reduces runtime complexity but restricts angles and animation variation. It is an explicit product decision, not a second engine to build simultaneously. [Phaser Arcade Physics](https://docs.phaser.io/phaser/concepts/physics/arcade)

Use pinned dependencies and self-hosted bundles. Keep the new build step scoped to this module rather than converting the whole portal to a new framework. Rendering, mission definitions, collision, effects, audio and persistence must be separate enough to test without a running canvas. Begin with authored encounters and seeded variants, not unbounded random spawning.

### Module, identity and persistence

- Proposed same-origin module route: `/beacon-brigade/` in the existing Bright Quest Pages project. This means a separate module, not a new account system or separate domain. A separate Pages project would require a deliberate authentication design change.
- Add a normal Bright Quest Play card with existing sizing, status treatment and return navigation. Preserve the existing reward-game unlock policy unless the user explicitly changes it.
- Launch directly into the town or saved mission, not a marketing landing page. Provide a clear unauthenticated return-to-login flow and preserve the intended destination.
- Use the existing authenticated child identity from the server. Never trust a child ID supplied only in a URL or browser storage.
- Maintain a small game-specific D1 state and reward/purchase ledger. Give each run and operation a unique ID; apply completion rewards and upgrades atomically and idempotently. Do not merge spendable currency using maximum values or naive unions.
- Reuse auth helpers. Check child ownership for every read/write. Parent access is restricted to the authenticated family's children. Validate reward values from mission definitions rather than accepting a client-supplied balance.
- Local checkpoints survive reloads and temporary network loss. Offline completions remain visibly pending until reconciled; do not allow unconfirmed earnings to fund purchases. Already saved progress remains playable. Resolve competing device updates without duplicate rewards or lost purchases.
- Parent Cockpit shows missions completed, last played, tool choices, attempts and town restoration. It must not label these as maths mastery or invent wrong-answer records for a non-quiz game.
- Use an additive schema migration and a feature flag for rollout. Removing the game card must not erase existing progress or require destructive database rollback.

### Hosting and deployment

Static graphics/audio/game bundles stay on Cloudflare Pages; authenticated saves use Pages Functions/D1. No real-time multiplayer server, AI runtime or new hosted service is proposed.

Cloudflare documents a 25 MiB per-asset limit. Enforce a stricter build check below 24 MiB per file, load mission assets incrementally and avoid giant all-in-one scene downloads. Pages Function usage is separately metered; do not assume all backend traffic is free. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/)

After implementation and release approval: scoped GitHub change -> Cloudflare preview -> verification -> approved production branch -> Cloudflare production verification. Use the established GitHub integration method, not a new direct-upload shortcut or casually changed Git remote. Verify the deployed revision and game assets, then exercise the logged-in child flow on the live site.

## 7. Measurable success criteria

Targets below are proposed acceptance gates, not achieved results. Record device, browser, build revision and evidence for every measured claim.

| Area | Acceptance target | Required evidence |
| --- | --- | --- |
| Child experience | At least 18/20 across visual appeal, control feel, clarity and meaningful choices; no category below 4/5 | Son's rating after real play, not an adult or agent proxy; repeat after a later session to check novelty effects |
| First use | Understand goal and complete first helper rescue within 90 seconds without adult steering | Observed cold-start playtest; no leading prompts |
| Agency | At least two viable routes/loadouts on each non-tutorial mission; no required replay grind | Balance runs with both strategies and a campaign economy audit |
| Stopping | Pause/leave at any point; each 3-4 minute mission provides a complete stopping point | Child can leave and resume without penalty or pressure |
| Graphics | No placeholder geometry in prominent shipped actors; no detached tools, sliding feet, clipping or unreadable hazard cues | Frame review and slowed recordings of every interaction family and finale |
| Performance | Sustained 30 fps class on agreed target tablet, p95 frame time <=33.3 ms during measured gameplay; desktop target 55-60 fps | Real-device 15-minute run, including the largest encounter; emulation alone insufficient |
| Responsiveness | p95 input-to-visible-response under 100 ms | Instrumented/captured steering and special-tool tests on target devices |
| Loading | First playable <=5 seconds on specified 20 Mbps/100 ms cold-load profile; initial transfer target <=6 MB | Network trace; count engine/physics/first-scene assets, not just textures |
| Saves | Zero lost confirmed completions, duplicate rewards or cross-child writes across at least 20 scripted disruption scenarios | Reload, offline/reconnect, stale state, duplicate requests, multi-tab, two devices, expiry and child switching tests |
| Controls/navigation | Every enabled button and return path works with touch and keyboard where applicable | Click inventory covering all states; desktop/tablet/mobile evidence |
| Audio/accessibility | Pause/mute/background stop audio; captions for guidance; cues not colour-only; no camera shake in reduced motion | Recorded state tests, visible focus checks and deliberate audible review |
| Safety/licensing | No ads/chat/purchases/tracking additions; every asset has provenance and licence record | Network audit, asset manifest and content review |
| Live release | Correct revision, working assets, authenticated saves and Parent summary verified live | Cloudflare deployment evidence and live smoke-test report with no unexplained console/network errors |

If the son rates it below target, capture what caused the score and change the relevant mechanic/art. Do not add more missions to compensate for an unconvincing first mission. A small playtest is formative evidence, not proof that all children will enjoy the game.

## 8. Build pathway and approval gates

| Stage | Work and deliverables | Exit gate |
| --- | --- | --- |
| 1. Approve direction | Confirm action/base balance, robot-restoration theme, game-first scope and primary device | User approves this brief; no production coding before this |
| 2. Art and technical proof | Import a few assets; build a gameplay camera, moving rig and representative load; show actual-render gameplay/town frames | Art direction approved and target device meets a preliminary performance budget |
| 3. Complete first slice | One 3-minute mission, one major encounter, one town upgrade, audio, retry, pause, save/resume and a minimal authenticated save path | The whole launch/play/reward/reopen loop works; no placeholder hero art |
| 4. Child playtest and revision | Observe first use and later replay; score four categories; correct controls, clarity, art or pacing | Agreed child-experience target met; after two unsuccessful major revisions revisit the design before expanding |
| 5. Small campaign | Produce remaining five missions, two districts, tool variations and restoration stages; integrate Play card and Parent review | All six missions are distinct enough, complete and persist correctly |
| 6. Three-pass QA | Automated/state tests; visual/audio review; final missed-case inventory and regressions | No unresolved release-blocking defect; evidence report retained |
| 7. Preview and release | Approved GitHub-to-Cloudflare deployment, isolated preview testing, production verification and rollback check | User receives verified live module link, not merely a successful build notification |

Do not set a fixed delivery date until Stage 2 confirms the model/animation and real-device constraints. The largest uncertainty is custom hero/encounter art and iteration, not writing the portal card. Agree milestone effort and any asset budget after the slice specification is accepted.

Suggested parallel work after approval: gameplay/input; art/rigging/effects; authenticated progression/integration; independent QA. Keep the save contract, art direction and mission definitions agreed centrally. External critique can use a bounded non-sensitive design packet; it cannot substitute for child playtesting or hands-on visual review.

### Three-pass QA inventory

**Pass 1: automated and structural.** Mission transitions, deterministic encounter schedules, fair reachable lanes, tool cooldowns, collision tests, asset loading, animation state validity, progression ledger, ownership, input modes, offline conflicts, performance and per-file size limits.

**Pass 2: visual and experiential.** Record every mission on desktop/tablet, including each tool and assist mode. Inspect motion contacts, telegraphs, shadows, target emphasis, text fit, voice timing and clutter. Review high-action moments frame by frame; sample routine footage at five-second intervals. Confirm that guidance ends or remains highlighted appropriately.

**Pass 3: missed-case and release review.** Start, continue, mission selection, tool choice, upgrade, insufficient parts, retry, completion, replay, pause/resume, mute/volume, captions, assist, reduced motion, settings close, Back, browser Back, portal return, session expiry, refresh, child switch and Parent detail/close paths. Recheck touch cancellation, orientation changes, backgrounding, WebGL context loss and interrupted saves. Run relevant existing-game and science-progress regressions.

Automated testing stays muted. Any untested physical device or unavailable audible review must be reported as a gap, not marked passed.

## 9. Decisions needed before building

Recommended defaults: action-first robot adventure; compact base building; no quiz interruptions; a separate same-origin module; free-first assets; six missions only after the first slice passes.

The material design decision is whether the user actually wants Last Z's deeper base/strategy experience to dominate. If so, adjust the core loop before implementation rather than quietly delivering only the shooter.

Also confirm the son's main device/browser before setting the final performance gate. A user-supplied example of the favourite Last Z stage would improve fidelity to the desired feel, but the research above is sufficient to discuss and approve the proposed direction.
