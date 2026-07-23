# Physics 101 Chapter 1 Rebuild Report

Status: implementation brief for local rebuild; not approved for production release
Target: Chapter 1, **Force Is An Interaction**
Baseline: `physics-101-motion-004`, 204.75 seconds, 1280x720, 8 fps

## Outcome

Rebuild the chapter as a polished, animated investigation led by a warm and responsive primary science teacher. Keep the current learning outcome, ten-question cockpit check, player controls, captions, and Parent Cockpit data contract. Improve the voice, narration rhythm, scene choreography, perceived frame rate, and emotional arc without turning the lesson into a noisy cartoon or allowing generated video to alter scientific evidence.

## Findings from the current build

1. **The voice profile is the main engagement weakness.** The current `onyx` take is deep and intelligible but restrained. Twelve segments share a similar pace and emotional shape, so curiosity, prediction, correction, and success sound too alike.
2. **There is almost no breathing room.** The script contains 503 words. The recorded segments total 194.9 seconds at an average 154.8 words per minute inside a 204.75-second lesson. That leaves only about ten seconds for every inter-scene pause combined.
3. **The narration describes rather than converses.** It explains the science accurately, but too often begins with formal statements instead of short invitations such as “Watch this”, “What changed?”, and “Let’s test that.”
4. **Motion is technically present but perceptually limited.** The video is rendered at 8 fps. Characters and props translate across the screen, but several scenes still read as a decorated slide because pose changes, anticipation, contact, follow-through, camera emphasis, and environmental reaction are sparse.
5. **The visual hierarchy is now readable.** The white-and-black evidence cues from `motion-004` should be retained. The rebuild must not reintroduce low-contrast yellow arrows over warm scenery.
6. **Scientific diagrams need deterministic control.** Generated video must not draw force arrows, labels, measurements, or contact gaps because small generative changes can weaken or reverse the evidence.

## Research translated into direction

- Vocal enthusiasm can improve engagement and motivation in recorded instruction when it is expressed through natural vocal dynamics rather than constant loudness or exaggerated performance. Source: [Instructor enthusiasm in online lectures](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1339815/full).
- Primary learners benefit from meaningful intonation and sentences that are short enough to process. Flat intonation is a specific risk. Source: [Rate, intonation and length in speech to children](https://www.cambridge.org/core/journals/journal-of-child-language/article/abs/talking-to-children-the-effects-of-rate-intonation-and-length-on-childrens-sentence-imitation/04EBF78D53FD2A93F32451C5B31E3D80).
- Conversational wording and a socially present voice can strengthen multimedia learning; a visible talking head is not automatically beneficial, so relevant animation remains the priority. Source: [Multimedia learning principles review](https://doi.org/10.1186/s40561-022-00200-2).
- OpenAI speech supports voice selection plus performance instructions. The replacement will use a pinned TTS snapshot for repeatability and a disclosed AI voice. Source: [OpenAI Audio API reference](https://platform.openai.com/docs/api-reference/audio/voice-consent-list?lang=curl).

## Teacher voice specification

### Role

A warm Australian primary science teacher beside the learner at a demonstration bench: curious, clear, lightly playful, never babyish, military, theatrical, breathless, or sales-like.

### Performance shape

- Conversational baseline around 142–148 words per minute.
- Noticeable but controlled pitch and energy variation between observation, mystery, prediction, correction, and celebration.
- Crisp emphasis on the evidence words: **pair**, **touch**, **gap**, **change**, **motion**, and **interaction**.
- Short thought groups, usually one visual action per sentence.
- A half-beat after questions and before evidence reveals.
- Softer volume for “look closely” moments; brighter lift for discoveries; calm firmness for misconception repair.
- No identical opening cadence across consecutive scenes.

### Voice selection

Audition `coral`, `marin`, and `cedar` using the same 25–35 second science passage. Select by warmth, child-directed immediacy, diction, and energy range—not by depth alone. The Bright Quest house preference is `coral`; it is the leading candidate, not an automatic choice.

### Script and timing changes

- Cap measured spoken audio at **178 seconds**, leaving at least **24 seconds** of baked-in pauses and room tone inside the approximately 205-second lesson.
- Preserve every assessed concept.
- Convert long explanations into watch–predict–check beats.
- Add direct learner prompts that do not require pausing the video: “Point to the pair”, “Keep your eye on the gap”, “Which thing changed?”
- Hold the visual for at least two seconds after every learner prompt or prediction question so the learner can genuinely respond.
- Keep captions verbatim with the final audio script.
- Break captions at thought-group boundaries into one or two short lines, targeting approximately 32 characters per line where practical.

## Motion and visual rebuild

### Creative direction

Emotion: **curiosity becoming confidence**.
Hero frame: the two skaters separate from a visible palm contact, with crisp white/black interaction arrows, readable object names, and the workshop responding subtly to the motion.
Motion motifs: anticipation, contact pulse, follow-through trails, evidence freeze-frame, and camera push-in.

### Rendering changes

- Raise the final render from 8 fps to 24 fps.
- Keep 1280x720 and browser-safe H.264/AAC with fast-start metadata.
- Preserve the warm workshop but increase local separation behind important white/black cues.
- Use eased camera moves and purposeful object motion; avoid continuous decorative drift.
- Build micro-actions within each narration beat so the visual state changes meaningfully every two to four seconds.
- Replace repeated `Indicate` loops with scene-specific replays: rewind-and-release, before/after freeze, contact pulse, distance comparison, or prediction hold.

### Scene-level changes

1. **Cold open:** begin on still skaters, brief camera creep, palm contact, recoil, then freeze and ask for the interacting pair.
2. **Two-object interaction:** reveal A and B separately, show contact compression, then the matched opposite arrows. Attach “A on B” to B and “B on A” to A; never draw both arrows on one object.
3. **Read an arrow:** animate the label construction—actor, “on”, receiver—before direction.
4. **Motion evidence:** use a true split before/after comparison with ghost positions and a clean change marker.
5. **Push ended:** visibly remove the contact arrows at separation while motion trails continue.
6. **Push and pull:** add hand/rope anticipation, object follow-through, and a brief side-by-side contrast.
7. **Non-contact:** hold the magnet gap in a close-up before the carts move; use a separate clean gravity shot.
8. **Classify:** turn the three examples into a fast visual decision path rather than sequential slide replacement.
9. **Fair test:** start matching carts from the same line on the same surface, use different push impulses, then freeze at measured stopping positions. State aloud that the push is the only changed variable.
10. **Repair the idea:** acknowledge the intuition warmly without showing a wrong-model badge. Replay the correct evidence twice: arrows during contact, arrow removal at separation, then continued motion trails.
11. **Prediction:** stop before motion, give a deliberate thinking beat, then reveal evidence in the learner’s expected order.
12. **Exit:** compress the chapter into the reusable three-step investigation routine.

## Fal pilot boundary

Use Fal for no more than one short non-instructional enhancement clip in the first rebuild:

- a 4–5 second environment-only cinematic workshop establishing movement.

The clip must use a supplied reference/start frame and conservative motion. It must not contain characters, text, force arrows, measurement marks, changing magnet polarity, or essential evidence. If geometry, lighting, or object count drifts, discard the clip and retain the deterministic Manim shot. Generated audio stays off; the OpenAI teacher track remains the single clock.

## Audio and timing architecture

- Generate each narration segment ahead of time; no live TTS at lesson start.
- Use the concatenated teacher MP3 as the master timing source.
- Recalculate captions and scene beat boundaries from measured segment durations.
- Assemble a lossless WAV master first, with deliberate evidence pauses and subtle matched room tone baked into the track; encode to AAC/MP3 only once at delivery.
- Keep a minimum 1.5-second scene-boundary pause and a two-second response hold after learner prompts.
- Normalise the final narration to approximately -16 LUFS integrated with a -1.5 dB true-peak ceiling.
- Add restrained music only if it remains at least 16–20 dB below speech and ducks further during key definitions. No music is required for this rebuild unless it clearly improves the finished audition.

## Accessibility, safety, and performance

- Maintain optional captions, pause, seek, replay, and reduced-motion behaviour in the surrounding lesson player.
- Keep instructional text within mobile-safe sizes and never bake essential paragraphs into generated video.
- Use synthetic lesson assets only. Do not upload child photos, names, voices, or profile data to generation services.
- Ensure all externally generated media has an explicit production-use licence for the selected endpoint.
- Target a final video under approximately 45 MB and a poster under 250 KB where quality permits. Scientific cue legibility takes priority over an arbitrary smaller encode.

## Acceptance gate

- Voice begins promptly, sounds warm and energetic, and no two consecutive scenes have the same flat cadence.
- Measured spoken audio is no longer than 178 seconds, with at least 24 seconds of baked-in room-tone pauses.
- Scientific terms are correctly pronounced and the transcript matches the approved script.
- Motion is visibly smoother at 24 fps and each scene contains meaningful teaching motion at least every four seconds.
- All force arrows, gaps, labels, and measurements remain deterministic and scientifically correct.
- Interaction-pair arrows are attached to the receiving object, never both on one object, and paired arrows are equal in rendered length.
- Every learner prompt is followed by a visible hold of at least two seconds.
- Dense two-second frame extraction shows no text spill, collisions, blank frames, or stale visual stretches.
- Automated animation scan reports no high-severity failures.
- Browser QA passes desktop, tablet, and 390px mobile with no overflow, broken media, console errors, or network errors.
- Parent Cockpit progress and the existing ten-question assessment remain unchanged.
- The protected Chemistry lesson file remains untouched and unstaged.

## Implementation order

1. Review this brief with Claude Fable and incorporate only bounded, relevant feedback.
2. Run a blinded three-voice audition using observation, misconception-correction, and celebration passages; score warmth, diction, question intonation, and emotional range.
3. Tighten narration and regenerate all twelve segments.
4. Rebuild deterministic scenes at 24 fps.
5. Trial up to two Fal shots and keep them only if they pass the scientific and visual gate.
6. Recompose video, captions, poster, card, and timeline.
7. Run transcription, dense frame extraction, animation scanner, browser QA, and human frame review.
8. Present the local preview and report. Do not push without explicit approval.

## Claude Fable review incorporated

Claude Fable 5 reviewed this bounded report as a senior Grade 4 science animation and voice director. The implementation adopts its useful corrections:

- replace the word-count target with a measured speech and pause budget;
- make prompt response holds testable;
- enforce receiving-object placement for interaction-pair arrows;
- teach the correct misconception repair twice without displaying a wrong model;
- make the first Fal trial environment-only;
- assemble lossless audio once and apply a loudness target;
- chunk captions by spoken thought groups; and
- allow a larger encode when needed to protect high-contrast diagram edges.

Fable’s suggested line “the cart keeps rolling all on its own” is **not** adopted verbatim because it may overstate the absence of friction and other forces. The safer Grade 4 wording will be: “The contact push has ended. On this low-friction track, the cart keeps moving while other forces still act.”

## Implementation and QA outcome

- Rebuilt all twelve narration segments with the selected OpenAI `coral` voice and scene-specific performance direction.
- Final lesson duration: 205.00 seconds; measured spoken audio: 168.14 seconds; the remainder provides paced room-tone thinking and transition space.
- Audio transcription passed all ten scientific anchor phrases. Measured programme loudness is -16.7 LUFS with -1.7 dBFS true peak.
- Deterministic Manim animation now renders at 24 fps. The final 1280x720 H.264 video is approximately 24 MB.
- Extracted and reviewed 103 frames at two-second intervals. No text spill, blank frames, stale-board stretches, or scientific-arrow placement errors were found.
- Animation QA scanner: 0 high, 0 medium, and 0 low flags.
- Browser QA passed desktop 1440x900, tablet 834x1194, and mobile 390x844 with 0 overflow, 0 broken images, 0 undersized primary controls, and 0 console/network errors.
- Existing lesson navigation, captions, replay/stop controls, ten-question assessment, and Parent Cockpit result flow were retained.
- The optional Fal environment pilot was discarded because the available Fal account returned an exhausted-balance error. No generated Fal material was used, and no science-critical visual was delegated to a generative renderer.
- No push or deployment was performed.