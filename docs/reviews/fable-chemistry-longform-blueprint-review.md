# Fable Review Notes: Chemistry Long-Form Training Blueprint

Date: 2026-07-06  
Reviewer skill: `claude-expert`  
Model reported by script: `claude-fable-5`  
Reviewed file: `docs/storyboards/chemistry-new-chapters-longform-training-blueprint.md`

## Review Run

The Fable review was run with a 15-minute command cap. The first call returned only the model header. The second and third calls returned useful comments but the terminal stream truncated mid-response. The actionable comments that were captured were applied conservatively before any renewed media generation.

## Fable Verdict

Fable approved the long-form direction but blocked media generation until science sequencing and animation QA issues were fixed.

## Captured Required Fixes

- Chapter 7 introduced visible air/particle dots before Chapter 8 had taught "model, not photograph." Fable flagged this as breaking the planned sequence.
- Chapter 7 risked conflating visible steam with water vapour. Visible "steam" is condensed liquid droplets; water vapour is invisible.
- Chapter 11's "no heat story" wording was too strong. Dissolving is not melting, but temperature can affect dissolving rate.
- Chapter 11 needed stronger evidence for "dissolved does not mean gone" without relying on child tasting.
- The long scene timings needed a clearer 3-second visual-action rule so the videos do not become static narrated boards.

## Edits Applied

- Added a non-negotiable rule: no particle dots before Chapter 8.
- Reworked Chapter 7 gas evidence to use balloon expansion, plunger compression, shaded air regions and pressure arrows instead of particle dots.
- Replaced the steam safety scene with a water-vapour precision scene that distinguishes invisible vapour from visible droplets.
- Reworded Chapter 11 to say dissolving is a spreading-through-water story, not a melting state-change story; temperature can affect speed but is not the definition.
- Added safe evidence options for dissolved material: app model, labelled known material, mass comparison, or app-only salt recovery. Child tasting remains excluded.
- Added a dedicated Animation QA Translation section requiring one visible action every 3 seconds during narration and no static summary card over 6 seconds.

## Remaining Gate Before Media Generation

Before new MP4/MP3 generation resumes, the implementation script should be rebuilt from this long-form blueprint, not from the rejected short draft. Generated chapters must target at least 5 minutes each and include timestamped visual actions for 3-second screenshot QA.
