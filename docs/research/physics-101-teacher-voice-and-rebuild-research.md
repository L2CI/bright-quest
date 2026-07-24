# Physics 101: teacher voice and from-scratch rebuild research

**Status:** research direction only — no runtime, audio, or deployment change

**Date:** 24 July 2026

**Scope:** Chapter 1, *Force Is an Interaction*, Advanced Grade 4

## Executive conclusion

The present problem is chiefly **performance direction and prosodic structure**, not the identity of the `coral` preset voice.

The current narration is generated as twelve independent clips. Each clip receives a new emotional direction — for example, “gently hushed,” “brighten with real surprise,” “conspiratorially,” “game-like,” or “satisfying rhythmic finish” — and all clips are accelerated to `1.12` speed. The script also uses trailer-like fragments such as “Two objects. Two forces.” and “Same carts. Same floor. Same starting line.” The result can be technically clear yet sound over-directed, staccato, and synthetic: every scene starts a fresh performance instead of continuing one natural lesson.

The target should not be “more enthusiastic” everywhere. It should be a **warmly authoritative, autonomy-supportive teacher** whose energy follows the meaning: curious while observing, steady while explaining, open while asking, and briefly warm when affirming. Enthusiasm should come from selective pitch and timing changes, not constant brightness, speed, or theatrical emphasis.

## What the research says

These studies are **adjacent evidence, not direct validation of this exact product**. The strongest child study begins at age 10, the enthusiasm experiment used adult learners, and neither tested synthetic speech or independently generated clip boundaries. They support the target qualities, but the Bright Quest-specific diagnosis must be proven by the controlled audition below.

| Evidence | Design consequence |
|---|---|
| In a preregistered experiment, 250 children aged 10–16 heard the same speakers and sentences with controlling, neutral, or autonomy-supportive prosody. Controlling/pressuring delivery reduced anticipated need satisfaction, wellbeing, and willingness to self-disclose. Exploratory analysis found benefits to autonomy and relatedness from autonomy-supportive delivery. | Avoid a command voice, relentless urgency, harshness, and “performance pressure.” Invite attention and thought; retain calm adult authority. |
| The same research characterises autonomy-supportive delivery as warmer and less pressuring, while related vocal work associates it with lower intensity, slower rate, and less harshness than controlling delivery. | Slow down explanations and questions. Do not use one global speed increase. A lower *relative* pitch/intensity does not mean a deep or dull character voice. |
| Two online-lecture studies found that greater vocal enthusiasm — manipulated through pitch and intonation variability — increased engagement and motivation to continue, but did not significantly improve quiz performance. The paper also reviews evidence that excessive enthusiasm can be unhelpful in some settings. | Use moderate, meaning-led pitch variation. Energy can support attention, but it is not a substitute for clear explanation, appropriate pauses, or good visual teaching. |
| OpenAI’s steerable text-to-speech supports instructions about *how* to speak, so performance direction can be tested independently of the script and preset voice. The official model page currently labels `gpt-4o-mini-tts` deprecated. | Run a controlled tone-first audition, but treat the current model as a baseline with migration risk rather than silently locking the rebuilt course to it. |

Sources: [Teachers’ motivational prosody](https://pmc.ncbi.nlm.nih.gov/articles/PMC10952248/), [vocal awareness and motivating teacher voices](https://pmc.ncbi.nlm.nih.gov/articles/PMC12068009/), [vocal enthusiasm in online lectures](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1339815/full), [classroom wait-time synthesis](https://files.eric.ed.gov/fulltext/ED353561.pdf), [OpenAI steerable audio announcement](https://openai.com/index/introducing-our-next-generation-audio-models/), and [OpenAI GPT-4o mini TTS model page](https://developers.openai.com/api/docs/models/gpt-4o-mini-tts).

## Diagnosis of the current chapter

### 1. The emotional direction is too literary

Directions such as “brighten with real surprise,” “warmly and conspiratorially,” and “give ... a satisfying rhythmic finish” describe acting choices, not measurable teaching behaviours. A speech model may exaggerate them into sing-song contours, false intimacy, or a promotional cadence.

### 2. Twelve separate generations reset the performance

Every scene begins without the breath, pitch centre, pace, or thought carried from the previous scene. Even a consistent voice preset can therefore sound like twelve short announcements rather than one teacher leading a continuous investigation.

### 3. The global speed is wrong for several teaching modes

`speed: 1.12` affects the mystery, explanation, misconception repair, questions, and summary equally. This removes useful thinking space and makes short fragments feel even more clipped.

### 4. The script invites exaggerated stress

“Shh—look closely” and “Ooh, careful” feel performed for a younger child. Repeated fragments — “Two objects. Two forces.” and “Same carts. Same floor.” — invite equal, slogan-like stress. A capable Grade 4 learner needs a natural conversation with precise scientific emphasis, not a trailer voice.

### 5. Negative prompt prohibitions are doing too much work

The prompt says not to become deep, dull, military, theatrical, sing-song, breathless, or advertisement-like. The better control surface is a short positive performance score: pace, intensity, thought groups, emphasis word, pause, and terminal contour.

## Target voice: “warm scientific guide”

The teacher is an intelligent adult speaking beside one capable nine-year-old, not presenting to a hall and not performing a character.

| Mode | Sound | Use |
|---|---|---|
| Observe and invite | Close, soft-medium intensity, genuine curiosity; one small lift on the clue | Opening a phenomenon and directing the eyes |
| Explain and model | Stable centre pitch, unhurried pace, one stressed contrast per thought group | Scientific definitions and causal sequences |
| Ask and think | Clear question contour followed by at least 3 seconds of genuine silence for a substantive question | Prediction, retrieval, and visual search |
| Correct kindly | Acknowledge the idea neutrally, then use calm falling certainty for the evidence | Misconceptions without mockery or drama |
| Affirm and transition | Brief warmth, no cheering or exaggerated pitch jump | Progress and scene changes |

### Performance rules

- Aim for conversational pace; slow slightly for new terminology and causal explanations.
- Use one principal emphasis word per thought group, chosen for scientific meaning.
- Prefer 5–12 spoken words per thought group.
- End facts with a settled fall; use a restrained open contour for genuine invitations.
- Use silence as teaching time. Do not fill every visual transition with speech.
- Keep intensity in a comfortable middle band; increase it only for a key contrast, never for an entire scene.
- Use Australian English pronunciation and crisp diction without over-enunciating.
- Avoid whispers, faux amazement, conspiratorial asides, slogans, announcer cadence, and repeated sentence-final upward inflection.

## Example rewrite and prosody score

**Current:** “Shh—look closely. Two skaters are still. Watch their hands. They press, then both platforms roll apart. Freeze the picture. Point to the pair. Where did the pushes act?”

**Proposed script:** “Watch the two skaters. / At first, both are **still**. / Now watch their **hands**. // They push — and both skaters move apart. // Which two objects are interacting?”

Score key: `/` short thought break; `//` genuine observation or thinking pause; bold word receives the only marked emphasis in that group. Facts settle downward. The final question opens gently, then leaves silence.

This version removes stagey interjections, preserves the scientific observation sequence, and makes the learner’s task explicit.

## Tone-first audition protocol

Do not choose a new voice by listening to different timbres reading different prompts. First isolate delivery.

### Round 1 — same voice, same script, three directions

1. **Calm scientific guide** — steady and supportive; low theatricality.
2. **Curious field teacher** — slightly more pitch movement around evidence, never faster overall.
3. **Warm classroom coach** — slightly softer and more relational, with firmer scientific conclusions.

Use one 60–90 second passage containing observation, explanation, misconception repair, a question, and a transition. Hide the labels during listening.

### Round 1b — test the diagnosed boundary defect

Render the winning direction twice: once as a continuous take, and once as five independently generated clips joined at scene boundaries. Randomise and blind the order. Rate boundary naturalness specifically: pitch-centre reset, pace reset, loudness jump, clipped breath, duplicated “fresh start” energy, and whether the thought continues naturally. If the stitched version fails, change the generation architecture rather than adding more emotional adjectives.

### Round 2 — timbre only

Apply the winning direction unchanged to two or three appropriate preset voices. This reveals whether the remaining problem is timbre rather than performance.

### Round 3 — model portability

Recreate the winning script, direction, and voice character on the supported successor model before visual proof approval. A direction that works only on the deprecated model is not production-ready.

### Acoustic pre-check

These are **pilot operating bands to compare samples consistently**, not universal research thresholds:

- observe/invite: 130–150 spoken words per minute;
- explain/model: 140–160 spoken words per minute;
- ask/think: 125–145 spoken words per minute before the silent wait;
- substantive prediction wait: 3–5 seconds, with the visual continuing;
- integrated loudness: within 1 LUFS between adjacent clips after mastering;
- no audible clip-boundary jump in pitch centre, pace, room tone, or intensity;
- scored emphasis word must be perceptually prominent without stretching or shouting it;
- no recurring upward sentence ending on declarative facts.

Measure rate, pauses, loudness, and pitch traces before subjective rating. Do not use a rigid absolute pitch range: a natural range depends on the chosen voice. Compare within-voice variability and boundary drift instead.

### Rating criteria

Score each sample from 1–5 for:

- natural teacher presence;
- warmth without childishness;
- scientific authority without pressure;
- correct semantic emphasis;
- question contour and thinking space;
- diction and Australian English fit;
- absence of sing-song or advertisement cadence;
- comfort after 60–90 seconds;
- child preference and ability to state what to do next.

Reject any sample that is merely more exciting but less clear, less trustworthy, or more tiring.

Use at least three adult raters with randomised playback order. Weight semantic emphasis, boundary continuity, and comfort over time more heavily than generic “energy.” A sample must pass all critical criteria; a high average cannot compensate for failed comprehension or a controlling tone.

For the final two samples, run a small age-matched listening check with 5–8 children aged 8–10 where feasible and appropriately consented. Ask one content question, one “what should you do next?” question, and one simple preference question. Do not collect names, accounts, recordings, or sensitive learner data for this test. If an age-matched group is not available, treat one family test as directional evidence only, not validation.

## From-scratch visual rebuild implications

The visual rebuild must also be genuinely new. It should not reuse the current workshop background, character staging, camera, scene compositions, or persistent right-side information pattern.

Before production:

1. Produce exactly three distinct keyframe directions for comparison. They must differ deliberately in camera language, world/staging concept, diagram integration, and motion grammar — not merely colour palette.
2. Keep all three bright but restrained, with readable focal contrast and uncluttered teaching space.
3. Choose one direction with the user.
4. Build a 20–30 second proof-of-quality sequence with final-level character motion, camera language, effects, narration, music balance, and tablet-safe text.
5. Approve that proof before rebuilding the full chapter.

The finished lesson should use shot-based visual storytelling: an establishing phenomenon, close evidence shots, spatial diagrams integrated into the world, visible cause-and-effect animation, and clean transitions motivated by the investigation. It must not be a static illustrated backdrop with labels moving over it.

### Visual proof pass/fail criteria

- One unmistakable focal point per shot; the learner can point to the relevant objects within 2 seconds.
- Cause and effect remain understandable with sound muted.
- All essential text is legible at arm’s length on a 10-inch tablet and never overlaps characters, diagrams, or controls.
- Labels remain on screen long enough to read and use; no text enters or exits during its own narration.
- Narration, force arrows, object contact, and motion change align within 150 ms at the teaching beat.
- Character proportions, lighting direction, camera perspective, and object identity remain consistent across the sequence.
- Motion is purposeful and readable; no constant idle movement competes with the evidence.
- Music stays beneath narration and ducks further for questions; effects confirm physical events without masking consonants.
- The learner can answer the proof’s content question and state what to observe next.

## Proposed gate before any build

The next authorised step should be **audition and keyframe selection**, not full production:

- three blind tone-direction samples using one voice and one script;
- three genuinely different visual keyframes;
- a short decision sheet showing trade-offs;
- no production asset replacement, runtime edit, push, or deployment.

Once one voice direction and one visual direction are selected, create the 20–30 second proof. Only after that proof is approved should Chapter 1 be rebuilt in full.

## Fable review incorporated

Claude Fable independently agreed that the most important diagnosis is the reset created by separately directed clips, and that tone-first/timbre-second testing is the right sequence. Its useful challenges have been incorporated here: the evidence is now labelled as adjacent rather than direct; continuity is explicitly A/B tested; acoustic and rater controls are defined; substantive wait time is extended; the child comprehension check is specified; the visual proof has pass/fail criteria; and the deprecated-model migration check is a stop gate.
