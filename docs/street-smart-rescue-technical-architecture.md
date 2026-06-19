# Street Smart Rescue Technical Architecture

## Runtime

- Phaser renders the animated street scene.
- DOM overlays handle the HUD, start panel, question panel, and finale.
- Static MP3 files provide narration.

## Scene Structure

- `StreetScene.preload()` loads legacy local PNGs and, after import, selected Kenney files.
- `makeTextures()` creates runtime helper textures for effects and temporary fallback vehicles.
- Gameplay state stays in a shared `state` object.
- DOM question flow remains outside Phaser for readability and responsive layout.

## Motion System

- `state.scene` controls motion mode.
- Road stripes and roadside props move during `rollout`, `return-step`, and `finale`.
- Cars use Phaser tweens for acceleration, braking, and safe return steps.
- Police lights and particles are visual effects only; they do not control game state.

## Audio Timing

- `playVoice(id)` returns a Promise.
- Story progression waits for voice completion or the existing duration fallback.
- Answer buttons remain disabled until the question voice prompt completes.

## Asset Manifest Direction

The next asset import should map stable keys to local files:

- `studentCar`
- `safetyCar`
- `roadTile`
- `childCharacter`
- `officerCharacter`

The game should reference manifest keys rather than raw file paths throughout gameplay code.
