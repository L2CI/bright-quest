# Sparkbound Guardian Campaign

## Direction

An eight-year-old pilots a recognisable, weighty training mech and earns an increasingly capable arsenal through thoughtful shield combat and maths/science challenges. Mechanical silhouettes, deliberate recoil, muzzle-to-target effects and readable anticipation carry the excitement; no injury, gore or attacks on people.

## Scope

- Five additional heroes: Ember, Tidal, Atlas, Nova and Echo. Eleven total.
- Base equipment plus five sequential earned upgrades for every hero.
- Six rounds in a new campaign duel; five three-question forges alternate maths, science, maths, science, maths.
- New campaigns start at Applied or Stretch and progress through Challenge and Master. Multi-step maths and science evidence replace the old Foundation starting point. Clues and worked support remain available without a timer; existing saved questions are preserved.
- Prism progresses through gauntlets, breach blaster, flame projector, rocket battery, arc rail cannon and solar siege array.
- Generated, detailed mech artwork replaces visible primitive-built bodies in the arena and portraits. Four authored pose cutouts per character cover ready, firing, guard and impact. The Three.js arena uses camera-facing actors with anticipation, recoil and contact motion. This is a 2.5D art pipeline, not newly generated rigged 3D models.
- Generated weapon and upgrade attachments change the equipment silhouette, rather than recolouring the same body. Portraits must be rendered from the same actors and stage loadouts used in battle.
- Existing three-round saves keep their original rules and evidence. New hero starts select campaign rules version 3. No forced reset or migration.

## Motion Beats

1. Anticipation: clear weapon pose and sustained charge indicate Prism's next attack while the player decides.
2. Launch: recoil begins at the authored firing beat; the effect originates at the weapon muzzle.
3. Travel: flame, fluid, shock, plasma, sonic or rocket effects visibly move toward the opposing shield.
4. Contact: impact particles, shield response and shield numbers change together, once per resolved attack.
5. Recovery: the weapon settles and the next tactical cue becomes available. Reduced motion retains all game information.

Hero frame: two full-body mechs visible in the arena, a readable weapon trail between them, shield contact clearly attached to the target, and no effects hiding the four move controls.

## Release Targets

- All eleven heroes can complete six rounds and fifteen questions using visible tactical suggestions, with no forced defeat or progress loss.
- Five upgrades are earned in order and cannot be preview-equipped into a real duel.
- Prism has six visibly different equipment states and readable counters at every level.
- All 66 hero portraits load and match their stage.
- Phone, tablet and desktop: nonblank canvas, moving actors, no clipped controls, functional back paths.
- Reset confirmation/cancellation, reload/resume, guide, equipment preview, all question types, hints, worked support and Parent wrong-first review pass.
- All QA is muted and isolated from the child's production records.
- Scoped GitHub main push, automatic Cloudflare Pages deployment, then exact live asset and authentication verification. No direct Pages upload.

## Evidence

Automated and rendered evidence is kept under `outputs/sparkbound-build/`. Release is gated on the final integrated bundle, not an intermediate agent build.
