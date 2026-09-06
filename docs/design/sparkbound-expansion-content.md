# Sparkbound age-eight expansion content

## Server export contract

`functions/_lib/sparkbound-expansion-content.js` exports `EXPANDED_QUESTION_BANK`
and `selectExpandedQuestions(matchNumber, heroId = "relay", learningLevel = 1)`. The existing
content module re-exports them at its footer. No legacy task, question or
selector is changed: the old bank remains 24 variants and selects four questions.

The expansion has 144 questions in three genuinely different bands of 48:
six slots, four tasks per slot, two variants per task in each band.
Each question includes the existing `type` plus `id`, `taskId`,
`variant`, `forge`, `slot`, `skill`, `title`, `prompt`, `choices`, `answer`, two
`hints`, `explanation`, `evidence`, `outcome`, `learningLevel` (1, 2 or 3) and
`difficulty` (`Foundation`, `Applied` or `Stretch`). IDs start with `expansion-`.
Foundation IDs remain `expansion-<task>-v<variant>`; later IDs use
`expansion-<task>-l<level>-v<variant>`. The same taskId links a skill family across bands.
The bank is deeply frozen. Selection returns mutable, detached snapshots.

Selection requires a positive safe-integer match number. Unknown hero IDs throw
`RangeError`; omitted hero means Relay. Hero offsets 0-5 are, in order, `relay`,
`helio`, `volt`, `bastion`, `zephyr`, `glacier`. Let
`cycle = ((matchNumber - 1) % 8 + heroOffset) % 8`. Slot `s` uses task
`(cycle + s) % 4` and variant `floor(cycle / 4) + 1`. This arithmetic covers all
48 questions exactly once per eight matches for each hero, then repeats. There
is no randomness, retry loop, profile hash, clock or reroll state. Rotation occurs
within the explicitly requested level, never across levels. Modulo occurs
before offset addition to preserve safe-integer accuracy.

The backend owns `learningLevel = min(3, 1 + floor(state.wins / 2))` and snapshots
it on each new match. The selector accepts only integer levels 1-3 and throws
`RangeError` otherwise. It does not read wins, resets, hints or attempts. A match
number of 100000 still selects Foundation when level 1 is passed. Default level
is 1 for callers that have not yet adopted progression. Retry snapshots should
reuse stored questions and level, not recalculate them. This is an additive
content contract; authority/UI integration belongs to the backend/frontend owners.
Never import either answer bank into a learner bundle or return raw selected
questions to a browser. Use the authority's existing public-state projection.

## Coverage

| Slot | Forge | Four tasks, each with two variants |
| --- | --- | --- |
| 0 | Maths | Equal groups; equal sharing; division into packs; missing factor |
| 1 | Maths | Digit value; three-digit composition; unit fractions; fraction remaining |
| 2 | Maths | Length ordering; number patterns; elapsed minutes; measurement differences |
| 3 | Science | Light sources/reflection; shadows; transparent materials; magnetic materials |
| 4 | Science | Magnetic poles; contact forces; fair comparisons; repeated observations |
| 5 | Science | States of matter; melting/freezing; evaporation/condensation; sound vibration |

Maths stays within 1000, with exact whole-number answers. Foundation has 20 numeric,
four ordering and 24 multiple-choice questions. Applied has 22 numeric, two ordering
and 24 MCQs; Stretch has 24 numeric and 24 MCQs. Correct MCQ positions are
balanced at six each for A/B/C/D in every band. Contexts involve supplies, displays and
classroom observations, not fictional weapons presented as real science.

All necessary observations are written out. References to a picture, diagram
or recording are scenario descriptions, not dependencies on missing assets.
Generic `observation.description` evidence avoids irrelevant pad/sensor tables.
Only Foundation length ordering and increasing patterns use the specialised `measurement`
and `sequence` renderers. No unsupported evidence kinds or circuit tasks are added.

Electricity is not covered by expanded hero-mode matches. The expansion contains
72 science questions and zero electricity/circuit questions. Six circuit variants
remain in the legacy bank only: two each for `lamp-gap`, `lamp-switch` and
`lamp-path`. Expanded hero-mode selection never draws from that legacy bank.
Do not advertise electricity as a topic covered by the expanded mode.

## Calibrated progression

Stage 1 always selects three maths questions; stage 2 always selects three science
questions. Levels are deliberately capped, not a formula for ever-larger numbers.

| Band | Maths demand | Science demand |
| --- | --- | --- |
| 1 Foundation | Familiar groups, sharing, place value, unit fractions and short time intervals | Identify a property or explain one clearly stated observation |
| 2 Applied | Choose and sequence operations; regroup tens; find non-unit fractions; convert cm/mm before ordering | Compare observations, predict one change, distinguish a cause from a coincidental property |
| 3 Stretch | Combine familiar steps: total then remaining, fraction then allocation, unit conversion then subtraction, elapsed time excluding breaks | Infer hidden conditions, trace linked changes, distinguish evidence from an overclaim, improve a confounded test |

Examples: a boxed marker total becomes boxed plus loose, then total minus used;
a fraction quantity becomes a non-unit fraction, then that fraction minus used;
a known magnet-pole interaction becomes an unknown pole inference, then inference
after turning the magnet. Science text supplies the scenario facts, but not an
answer key. A few skills plateau in arithmetic complexity while shifting from a
direct operation to selecting the right quantities; not every skill simply adds
larger operands. No formal algebra, decimal division or advanced physics is needed.

## Primary-source checks

Checked 6 September 2026. Questions and distractors are original, not copied
assessment items. These sources check the underlying concepts; the bank is not
a claim of complete curriculum coverage or Australian curriculum certification.

- [Department for Education: primary science](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study), lower KS2 working scientifically, Year 3 light/forces and Year 4 states/sound: scope and age-band reference. Fair comparisons control relevant conditions; repeated observations support limited conclusions. Shadows involve blocked light, and sound involves vibration. Years 3-4 span the intended approximate age band; individual readiness varies.
- [NASA: Moon viewing tips](https://science.nasa.gov/moon/viewing-tips/): the Moon reflects sunlight rather than producing its own visible light. Supports `light-source-v2`.
- [Oak National Academy: magnetic poles](https://www.thenational.academy/teachers/programmes/science-primary-ks2/units/simple-forces-including-magnets/lessons/putting-magnets-together-attract-or-repel): like poles repel and unlike poles attract; supports the pole-prediction and inference tasks.
- [University of Wisconsin-Madison: magnetism](https://wonders.physics.wisc.edu/what-is-magnetism/): iron versus copper attraction and magnetic interaction; supports material distinctions without the incorrect all-metals rule.
- [Oak National Academy: transparent and translucent materials](https://www.thenational.academy/pupils/programmes/science-primary-year-3/units/introduction-to-light-and-shadows/lessons/opaque-transparent-and-translucent/video): transmitting some light does not guarantee a clear view. Supports the later window-material comparisons.
- [Australian Academy of Science, Primary Connections: shadow size](https://primaryconnections.org.au/teaching-sequences/year-5/light-imitates-art/lesson-5-how-can-i-make-shadow-shorter-or-taller): light-path geometry behind shadow-size changes. Used only to verify the stated small-lamp observation, not to import a Year 5 syllabus or require ray-diagram mathematics at age eight.
- [American Chemical Society: melting](https://www.acs.org/middleschoolchemistry/lessonplans/chapter2/lesson5.html): solid-to-liquid change; supports `melt-freeze-v1` and the inverse freezing distinction.
- [American Chemical Society: evaporation](https://www.acs.org/middleschoolchemistry/lessonplans/chapter2/lesson2.html): liquid water can become invisible water vapour without disappearing; supports `water-air-v1`.
- [American Chemical Society: condensation](https://www.acs.org/middleschoolchemistry/lessonplans/chapter2/lesson3.html): cold-cup drops can come from surrounding water vapour, not leakage; supports `water-air-v2`.
- [NIH/NIDCD: How do we hear?](https://www.nidcd.nih.gov/health/how-do-we-hear): sound waves in air reach the ear and cause vibration; supports the sound-path fixture.

Material questions specify ordinary samples and strong attraction to a classroom
magnet, avoiding claims that every metal is magnetic or that copper has no
magnetic response under any conditions. Transparent sheets are explicitly clear;
opaque sheets have no holes. Water scenarios name starting and ending states.
Fair-test claims apply to the stated setup, never all surfaces or all future tests.

## Bounded content corrections

The five reviewed higher-band items were corrected without changing the 144
question IDs, answers, correct-choice positions, selector or topic coverage:

- `repeat-evidence-l3-v2`: readings start at 10 cm and end at 35 cm; the mistake
  is recording 35 cm without subtracting 10 cm. Starting at a nonzero mark is valid.
- `contact-force-l3-v2`: a stationary, unbroken paper barrier and visible air gap
  rule out a paper-to-clip contact push. The clip does not pierce the paper, and
  the explanation acknowledges that pushes can pass through touching objects.
- `light-source-l2-v1`: distractors now test self-emission, stored light and
  eye-emitted light rather than fantasy transformations.
- `water-air-l3-v1`: distractors reverse the observed transitions or confuse
  condensation with a change to solid. The final drops are explicitly liquid.
- `sound-vibration-l2-v1`: distractors test vibration versus sound-path changes,
  sound continuing without vibration, and the reversed vibration/loudness relation.

Independent regression fixtures check all revised choices, the numerical ruler
interval, the force scenario's contact conditions, and the absence of expanded
electricity coverage. An answer-key fingerprint guards every existing answer
and choice position against unintended changes.

## Safety and verification

No practical battery wiring, heating, bright-light viewing, loud-noise exercise
or unsupervised experiment is requested. Science questions describe observations,
recordings or plans. Outcomes acknowledge learning or workshop organisation, not
weapon upgrades justified by real physics.

Run `node --test tools/test-sparkbound-expansion-content.mjs tools/test-sparkbound-content.mjs`.
The expansion suite checks every maths answer using prompt operands or sorted
choice values, and every science answer using independently specified truth
labels across all three bands. It checks exact counts, schema, evidence, balanced
positions, all hero/level cycles, invalid inputs, maximum safe integers, deep freezing, detached snapshots,
legacy source preservation and learner-source exclusion. Each new answer is also
submitted through the authority in an isolated supported-shape fixture, with
learner projection checked before and after scoring. The authority's explicitly
privileged `review: true` view is intentionally not a learner-redaction contract.
This does not assert that
the live authority has switched to the six-question expansion.

Truth fixtures protect against answer-key and label drift; they are not a formal
proof of natural-language science. The source checks and editorial review remain
part of the correctness gate. No build, publication, commit or deployment is part
of this change.
