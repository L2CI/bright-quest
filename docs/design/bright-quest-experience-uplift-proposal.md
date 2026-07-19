# Bright Quest Experience Uplift Proposal

Date: 11 July 2026
Scope: Entire Bright Quest app, including child entry, dashboard, courses, progress, games, lesson players and Parent Cockpit.
Status: Design review and proposal only. No production UI code changed.

## Executive recommendation

Bright Quest already has a recognisable visual identity and several strong surfaces, especially the Winter Training and Chemistry card systems and the vivid reward-game worlds. The main problem is hierarchy: too many cards, metrics, labels and navigation choices compete at the same level.

The uplift should not be a rebrand. It should become a clearer two-part product:

1. **Bright Quest for children:** one obvious next quest, a compact world map, short paths, large touch controls, visible progress and high-quality subject art.
2. **Parent Cockpit for adults:** a calm decision dashboard focused on what changed, what needs attention and the next useful action.

The recommended direction is **Mission Control with illustrated subject worlds**. It keeps the current professional card quality but reduces visible choice, uses richer art only where it carries meaning and turns completion into a journey rather than a catalogue.

## Evidence reviewed

Fresh screenshots were captured at 1440 x 1000 and 390 x 844 across 23 states per viewport. Evidence is stored in:

`outputs/brightquest-design-audit-20260711/`

The capture covered:

- role selection
- child dashboard
- City School Exam Prep
- Winter Training
- Chemistry Training
- progress
- games and rewards
- nine Parent Cockpit routes
- Chemistry course landing
- Blackboard Focus Session
- English Grammar
- Maths Training
- Treasure Quest
- Street Smart Rescue
- Cave River Quest

The capture logged 25 console errors. Most were repeated local-origin CORS failures to AGMaths and missing local resources; these should be triaged during implementation, but they do not invalidate the visual review.

## Research basis

### Established guidance

- WCAG 2.2 requires pointer targets of at least 24 by 24 CSS pixels or sufficient spacing, visible focus, predictable interaction and controls for moving content. Bright Quest should adopt a stronger internal target of 44 by 44 pixels for child controls. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [Apple UI design tips](https://developer.apple.com/design/tips/)
- Apple recommends fitting primary content to the device, keeping controls close to the content they modify, preserving image aspect ratios and using at least 44 by 44 point touch controls. [Apple UI design tips](https://developer.apple.com/design/tips/)
- UNICEF's RITEC work frames good digital play around children's autonomy, competence, emotions and relationships. Rewards should therefore represent mastery and agency, not only decorative points. [UNICEF RITEC Design Toolbox](https://www.unicef.org/childrightsandbusiness/workstreams/responsible-technology/online-gaming/ritec-design-toolbox)
- The ICO Children's Code says children's best interests should be central, privacy should be high by default and interfaces should not nudge children to weaken privacy or provide unnecessary data. [ICO Age Appropriate Design Code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/)
- Apple separates child experiences from adult actions using parental gates. Bright Quest already has a mode boundary; the redesign should make it clearer and prevent adult controls from leaking into child journeys. [Apple child app guidance](https://developer.apple.com/kids/)

### Product synthesis

These sources do not prescribe a Bright Quest layout. The proposal below is a synthesis of the research, the current product, the target age group and the observed desktop/mobile behaviour.

## Current-state diagnosis

### What already works

- Strong Bright Quest identity: navy typography, energetic blue, yellow, teal and coral accents.
- Consistent professional card treatment across the current dashboard, Winter and Chemistry.
- Clear separation between child and parent modes at entry.
- Good chapter status model: training, test and completion are visible.
- Reward games show the visual ambition children respond to: characters, places and an immediate challenge.
- Existing return paths are usually present.

### Main problems

1. **Too many equal choices.** Dashboard zones, course cards, chapter cards and parent modules often share the same visual weight.
2. **Long mobile inventories.** The child dashboard, Parent Cockpit and Chemistry page require extensive scrolling before the user understands the whole space.
3. **Repeated framing.** Large page headers, metric cards, instruction cards and section cards repeat before the actual action.
4. **Inconsistent visual worlds.** Reward games use vivid scene art while many learning surfaces use pale abstract icons. The product can feel assembled rather than authored as one world.
5. **Progress is reported, not experienced.** Numbers and status pills exist, but they do not consistently show a route, destination or meaningful next milestone.
6. **Empty states consume too much space.** Zero-test states display large metric boxes and repeated explanatory copy instead of a single useful start action.
7. **Navigation is over-complete.** Some course surfaces expose Home, Start Learning, Course Cards, Cockpit and Back to Bright Quest simultaneously.
8. **Parent pages look child-like.** Colourful cards help recognition, but the adult dashboard needs denser comparison, stronger prioritisation and fewer decorative panels.

## Proposed information architecture

### Child navigation

Use four persistent destinations:

- **Today**: the next recommended quest and one optional choice.
- **Learn**: subject worlds and course paths.
- **Play**: unlocked games and the next unlock.
- **My Journey**: progress, trophies and recent achievements.

Do not show Parent Cockpit in child navigation. Keep it behind the role gate.

### Parent navigation

Use four adult destinations:

- **Overview**: attention items, recent change and recommended action.
- **Learning**: exams, Winter, Chemistry and focus areas.
- **Evidence**: attempts, wrong answers, writing and records.
- **Settings**: child switcher, data and app options.

## Core child experience

### 1. Today screen

Replace the current dashboard catalogue with:

- one large **Continue your quest** panel with subject art, estimated time and progress
- one **Choose something else** row with three compact subject tiles
- one small **Reward ready** or **Next game unlock** panel
- a compact top bar showing avatar, stars and streak/progress, not three large metric cards

The first viewport should contain the child's name, the next action and the route to Play. No explanatory feature copy is needed.

### 2. Learn screen

Show three subject worlds, not all chapter cards:

- Exam Expedition
- Winter Maths Workshop
- Chemistry Lab

Opening a world reveals its course path. A world tile should show current milestone, completed count and a single Continue button.

### 3. Course paths

Replace flat chapter grids with an illustrated vertical or horizontal path:

- completed nodes are compact and checked
- the next node is larger and visually active
- locked/future nodes are visible but quiet
- each node shows only title, duration and training/test state
- details appear after selection, not on every card

On mobile, show the current node and the next two nodes, with a clear **View full map** control.

### 4. Lesson player

Create one shared lesson-player frame for Blackboard, Grammar, Maths and Chemistry:

- content dominates the screen
- one control strip for play, replay, captions, volume and progress
- lesson list opens in a drawer or side sheet
- the current teaching point is short and visually connected to the content
- quiz/checkpoint appears as the natural final mission

The Grammar player currently has overlapping lesson-list content; this should be treated as a functional visual defect, not only an uplift opportunity.

### 5. Play

Lead with one playable recommendation and one next unlock. Put the rest into a compact map or collection grid.

Remove large cards for unavailable games. Locked games should be small silhouettes or map destinations with a clear mastery requirement. Use consistent high-quality 3D/cartoon art direction across all reward games.

### 6. My Journey

Replace the sparse progress table with:

- current level and next milestone
- a subject-by-subject progress ring or path
- recent wins
- one focus goal stated positively
- trophy shelf tied to demonstrated skills

Avoid presenting a large list of Pending items to a child with no completed tests.

## Parent Cockpit redesign

### Overview

The first viewport should answer three questions:

1. What needs my attention?
2. What changed since the last session?
3. What should we do next?

Recommended layout:

- one attention strip with severity and evidence
- one recent-activity timeline
- one recommended-action panel
- compact subject rows underneath

Do not display four empty metric cards when there are no results. Use a single empty state with the first useful action.

### Learning and evidence

- Combine Exam Results, Focus Areas, Training, Chemistry and Winter under tabbed Learning views.
- Combine Writing and All Records under Evidence.
- Keep wrong-answer-first review as the default attempt detail.
- Use tables, timelines and expandable rows for adults rather than large colourful cards.
- Preserve subject colour as a thin accent, icon or status marker.

## Visual system uplift

### Keep

- navy as the main text colour
- blue as the primary action colour
- yellow as achievement and attention
- teal and coral as supporting subject accents
- the current 8px-or-less professional card radius
- soft 3D object art where it already works

### Improve

- Replace pale multicolour page washes with mostly white/light-neutral surfaces and one controlled environmental colour per world.
- Use one icon family: soft 3D objects with the same camera angle, lighting, material softness and border treatment.
- Use scene illustrations for world entry and milestones; use icons for controls and status.
- Limit each screen to one primary filled button.
- Reduce display-heading size on operational screens.
- Use motion to explain progress, cause and effect or reward. Avoid ambient movement that competes with learning.
- Add clear hover, focus, pressed, selected, loading, success and locked states to the shared component system.

## Page-by-page uplift priorities

| Surface | Main issue | Proposed uplift | Priority |
| --- | --- | --- | --- |
| Role entry | Large explanatory panel and two card choices | Two direct full-height choices with clearer child/adult visual distinction; keep parental gate | Medium |
| Child dashboard | Too much description and five large zones | One next quest, compact alternatives, progress rail, bottom navigation | Critical |
| City Exam Prep | Eight near-identical cards and large empty metrics | Guided eight-stop expedition with one suggested set | High |
| Winter Training | Ten-card catalogue and three top actions | Workshop path with current topic and one overflow menu | High |
| Chemistry | Eleven-card wall and five header actions | Illustrated lab path, one Continue action, compact chapter drawer | Critical |
| Progress | Sparse adult-style table | Journey milestones, subject progress and recent achievements | High |
| Games | Long locked catalogue | Featured game, next unlock and compact world map | High |
| Parent Overview | Many colourful equal-weight panels | Attention, change and next action first; compact subject rows | Critical |
| Parent Learning pages | Fragmented across many routes | One Learning area with tabs and consistent drill-down | High |
| Parent Evidence pages | Records spread across routes | Unified evidence timeline with filters | Medium |
| Blackboard Focus | Strong focus but visually plain | Shared player shell, richer teaching graphics, compact lesson drawer | Medium |
| Grammar | Overlapping lesson list and dense chrome | Fix overlap; move lesson list to drawer; simplify timer and controls | Critical |
| Maths Training | Separate visual language | Move into shared player shell and shared controls | High |
| Reward games | High visual quality but inconsistent framing | Shared game HUD, exit/pause pattern and art direction | High |

## Sample visual directions

Three child-dashboard concepts accompany this proposal:

1. **Quest Map**: an illustrated path with today's node enlarged and subject worlds visible ahead.
2. **Mission Control**: a cleaner dashboard with one main mission, compact progress and three world tiles.
3. **Adventure Journal**: a warm, story-led daily page with one mission, recent wins and a trophy shelf.

All three keep the existing Bright Quest palette and professional card quality. They differ mainly in navigation model and the amount of environmental illustration.

## Recommended direction

Adopt **Mission Control** as the structural base and borrow the world art and milestone path from **Quest Map** inside courses. This is the simplest system to implement incrementally, the easiest to scan on mobile and the least likely to bury learning under decoration.

## Delivery phases

### Phase 1: Foundation

- define tokens, icon art direction, buttons, status, navigation and shared card states
- build shared child and parent shells
- fix Grammar overlap and local missing-resource errors

### Phase 2: Child core

- rebuild Today, Learn, Play and My Journey
- convert Chemistry, Winter and Exam Prep to course paths
- retain all existing progress and Parent Cockpit data contracts

### Phase 3: Lesson and game consistency

- standardise lesson-player controls
- standardise game HUD, pause, return and completion states
- replace low-quality or inconsistent art in priority order

### Phase 4: Parent Cockpit

- simplify overview
- consolidate Learning and Evidence
- preserve wrong-answer-first drill-down and existing saved records

## Success measures

- a child can start the recommended activity in one tap from Today
- no more than one primary filled button per screen region
- the first mobile viewport always includes the main action
- all child controls meet a 44 x 44 pixel internal target
- every course has a visible current milestone and next milestone
- every standalone experience has the same pause, exit and return pattern
- Parent Cockpit answers attention/change/next-action without scrolling on desktop
- no overlapping text or controls at 390 x 844, 768 x 1024 and 1440 x 900
- no unexplained console errors on supported local/live origins

## Constraints

- Preserve existing child progress, test records and Parent Cockpit wrong-answer review.
- Do not change course content or Chemistry video assets as part of the shell uplift.
- Keep AGMaths deep links and return paths working.
- Keep `chemistry-training/lesson-1/lesson-1.js` untouched unless separately approved.
