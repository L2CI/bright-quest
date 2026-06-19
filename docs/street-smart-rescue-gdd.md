# Street Smart Rescue Game Design

## Concept

Street Smart Rescue is a short Grade 4 grammar reward game. A child makes an unsafe choice around a parked car, a safety officer intervenes, and the player clears five grammar checkpoints to guide the child back to a safe decision.

## Player Flow

1. Start at a quiet street scene with the child outside the vehicle.
2. The child approaches the car, the scene transitions into a top-down road view, and the car rolls forward.
3. The police/safety car catches up with visible road motion, light effects, and a clear stop beat.
4. The officer gives calm, varied guidance.
5. The player answers five grammar checkpoints.
6. Each correct answer moves the car one safe step back toward home.
7. Finale reinforces the safety lesson: ask an adult, never drive without permission or a licence.

## UX Rules

- No always-on story captions.
- Keep question and answer text visible.
- Voice clips must finish before advancing.
- Dialogue should sound realistic and non-repetitive.
- Car motion must show meaningful travel through road movement, lane markers, camera drift, and acceleration/brake tweening.

## Art Direction

Use consistent open-licensed Kenney assets where possible:

- Kenney Racing Pack for vehicles.
- Kenney Road Textures for road surfaces.
- Kenney Toon Characters 1 for child/officer replacements.

## Acceptance Criteria

- The car no longer looks like the bad side-view placeholder.
- No boy is visible inside the car before the child enters.
- Story captions are not visible.
- Officer dialogue varies across stop, instruction, correction, and finale.
- Road movement is obvious during the driving beat.
- All assets are tracked in `docs/ASSET_REGISTER.md`.
