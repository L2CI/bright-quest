# Sparkbound: Articulated Guardians

## Direction

An eight-year-old commands a recognisable mechanical guardian: weighty movement,
readable intent and equipment that genuinely changes how a duel is played.
Original mechanical designs, not replicas of existing entertainment characters.
The hero frame shows the player braced behind a substantial arm weapon, with
Prism's charging assembly clearly visible across the arena.

## Construction

- Blender 4.5.3 LTS on Windows ARM generates original three-dimensional armour,
  shaped helmets, joints, weapons and rear assemblies. No paid asset generation.
- Rigid armour follows the existing CC0 Quaternius skeleton and authored clips.
  The old surface is hidden; no hero billboard is used by the new renderer.
- The shared GLB library has distinct geometry for all eleven heroes and Prism.
- Metal uses broad reflected light, restrained emissive optics and contact shadows.
- The hangar supports pointer rotation and labelled rotation/reset icon controls.
- Existing generated art may remain as source material, but roster and guide
  portraits are rendered from the actual new 3D characters.

## Motion

1. Idle: restrained authored motion, grounded stance and readable silhouette.
2. Warning: raise the weapon or fist; hold the charging light until the attack.
3. Commit: authored windup, calibrated muzzle or fist, recoil after emission.
4. Impact: show the shot/contact before changing the displayed shield outcome.
5. Upgrade: reveal the earned assembly, then settle to a stable inspection pose.

Reduced motion removes shake and rapid embellishment without hiding combat cues.
Sound remains gesture-enabled and can be muted independently of music.

## Progression

New games use rules version 4. Existing versions 1, 2 and 3 keep their original
outcomes and progression. The current question bank and Parent review are retained.

| Stage | Equipment change | New tactical choice |
| --- | --- | --- |
| Base | Sculpted suit and mechanical fists | Attack for energy; block incoming hits |
| Specialist | Hero-specific arm weapon | Pierce a raised shield |
| Advanced | Larger specialist weapon and shield assembly | Spend four energy on a heavy blast |
| Elite | Shoulder support battery and salvo weapon | Two-shot special costs three energy |
| Master | Rail assembly and tall stabilisers | Charged shot gains damage on openings and prevents shield return hits |
| Guardian | Full siege assembly | Three-shot special, reduced incoming damage and a shield counter |

The event carries the resolved technique and shot breakdown. Rendering never
recalculates damage or awards progress. The guide uses version-aware descriptions.

## Release Gate

- Build and all domain/API/content/save regression tests pass.
- True volume, visible depth and changing silhouettes verified from several angles.
- All hero/stage combinations and Prism kits render without missing assets.
- Desktop, tablet and mobile canvas frames, motion and controls are verified.
- Actual UI journeys cover practice, battle, five forges, victory, reset, back,
  reload, hard question types and wrong-first Parent review.
- QA is muted and uses synthetic data, never the child's production records.
- Publish only through the approved GitHub main to automatic Cloudflare Pages path.
- Verify deployment status, live asset hashes, authentication gate and browser flow.
  Report the boundary between real production reads and synthetic intercepted writes.
