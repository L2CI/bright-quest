# Bright Quest whole-app uplift review packet

## Review purpose

This packet describes a local, feature-flagged Bright Quest release candidate. Review it as a senior product designer and release reviewer for a child-facing learning product. No production deployment or family-data migration has occurred.

## Product goals

- Make the child experience simpler, more exciting and easier to resume.
- Give each family an account boundary and support one or more children without adding unnecessary child login steps.
- Keep Parent Cockpit protected by its existing PIN while making its information architecture adult-facing.
- Preserve existing course content, progress, tests and Parent Cockpit evidence.
- Standardise return, pause and completion behaviour across lessons and reward games.

## Implemented scope

### Family entry and data boundaries

- Feature-flagged email/password family gateway.
- One-child families enter that child automatically; multi-child families receive a child chooser with child PINs.
- Parent Cockpit still requires the existing parent PIN capability.
- D1-backed family, session and child ownership model with bounded parsing, rate limiting and default-deny legacy APIs.
- Migration and reconciliation tooling exists for the current family data, but has not been run against production.
- Flags can independently disable family auth, migration, signup, legacy APIs and the experience uplift.

### Child Mission Control

- One primary next mission based on saved progress.
- Three learning worlds: Exam Expedition, Winter Maths Workshop and Chemistry Lab.
- Four child destinations: Today, Learn, Play and My Journey.
- Compact star/reward state and a restrained game catalogue.
- Exam and Winter paths show the current milestone and nearby next milestones on mobile, with an explicit full-map control.
- My Journey shows a positive level, subject progress, stars and recent wins.

### Chemistry course

- Existing Chemistry visual identity and lesson content are retained.
- Eleven chapters appear as a connected course lab path rather than an equal-weight card grid.
- Continue opens the first incomplete chapter and direct chapter links preserve the active child profile.
- Mobile initially shows the current chapter plus the next two, with a full-map control.
- Existing video, captions, quizzes, completion, saved selected answers and wrong-answer-first Parent Cockpit review remain intact.
- Separate local Chemistry progress is hydrated from the active profile when necessary.

### Other lesson shells

- English Grammar: compact header, persistent return, visible playback, responsive lesson drawer, focus trap and Escape close.
- Blackboard Focus: shared Bright Quest header, explicit return, compact lesson navigation and accessible status.
- Maths Training: shared header, explicit return, compact lesson navigation and corrected active-scene scrolling.
- Lesson content, audio, timing, quizzes and progress logic were not rewritten.

### Parent Cockpit

- Four adult destinations: Overview, Learning, Evidence and Settings.
- Overview prioritises attention, recent change and next action.
- Learning and Evidence use compact rows while preserving detailed drill-down routes.
- Chemistry test review remains wrong-answer-first and retains reconstructed evidence compatibility.
- Neutral adult-facing surfaces replace child-like decorative styling.

### Reward games

- Play leads with one featured unlocked game, one secondary unlocked game and the next locked reward; remaining unlocked games are compact launch rows.
- Treasure Quest now has persistent Return, functional pause/resume and a terminal Return/Replay completion panel.
- Street Smart Rescue now has persistent Return, functional pause/resume and Return/Replay in the finale.
- Cave River Quest now has persistent Return, functional pause/resume and a terminal Return/Replay state after the reward claim.
- Existing game mechanics and visual assets remain intact.
- Dragon Forge already has pause and a Bright Quest return path; it remains an endless-practice experience.

## Visual system

- Professional card system with radii no greater than 8px for new shared controls and cards.
- Neutral page surfaces with blue, teal, yellow and coral status accents.
- Soft 3D/course artwork is used as content imagery, not generic decoration.
- Child pages are energetic but scannable; Parent Cockpit is flatter and quieter.
- Visible keyboard focus, reduced-motion support and 44px minimum visible controls are enforced in automated checks.

## QA evidence

- Shared app and Parent Cockpit: 119 checks at 1440x900, 768x1024 and 390x844; zero failures and zero browser errors.
- Lesson shells: 66 checks across English Grammar, Blackboard Focus and Maths Training at the same three viewports; zero failures and zero browser errors.
- Game shells: 78 checks across Treasure Quest, Street Smart Rescue and Cave River Quest at 1440x900, 768x1024 and 390x844; zero failures and zero browser errors.
- Feature-flag-off fallback: 8 checks at desktop and mobile; zero failures and zero browser errors.
- Syntax checks and `git diff --check` pass.
- Verified return paths, no page-level horizontal overflow, 44px visible controls, pause/resume, terminal game outcomes, chapter progress, quiz review and responsive path disclosure.

## Screenshot inventory and visual observations

- Mission Control: one large next-mission card, three compact world cards and a four-item child navigation.
- Parent Overview: restrained blue/neutral header, one attention callout, two compact recommendation panels and three evidence rows.
- Chemistry desktop: eleven-node lab path with the current chapter clearly outlined; mobile: current plus two next chapters and a full-map control.
- Treasure completion: focused white completion panel over the blurred game, Return primary and Replay secondary.
- Street Smart finale: compact white finale panel over the game, persistent Back/Pause in the HUD, Replay and Return.
- Cave River completion: high-quality cave artwork remains visible behind a dark reward panel, clear Replay and gold Return action, no overlaps.

## Known release boundaries

- Production flags, remote D1 state and the GitHub/Cloudflare deployment are unchanged.
- The current family data migration must run only in the production release window with reconciliation and rollback evidence.
- Signup remains independently gated.
- Dragon Forge is intentionally endless practice rather than a finite reward session.
- The parked dirty file `chemistry-training/lesson-1/lesson-1.js` is unrelated and excluded from this release candidate.

## Requested review

Identify Critical, High or Medium issues only. Focus on:

1. Simplicity and excitement for a Grade 4 child.
2. Information hierarchy and obvious next actions.
3. Cross-page visual consistency without making every learning mode feel identical.
4. Responsive accessibility and interaction-state risks.
5. Parent Cockpit clarity and evidence preservation.
6. Family migration and release safety.
7. Any missing pause, return, completion or progress behaviour that should block release.

For each finding, give severity, evidence from this packet and a concrete patch recommendation. End with a release recommendation: hold, conditional go or go.
