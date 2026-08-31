# Beacon Brigade first-slice QA

Date: 31 August 2026
Recommendation: GO for local family preview, with the coverage limits below.
Production: not deployed; live release checks and migration remain required.

## Scope and acceptance targets

- Complete maths/science expedition -> rewards -> HQ upgrade -> reload.
- No lost original wrong answers, duplicate resource rewards or cross-child evidence.
- Visible, moving, correctly framed 3D on desktop, tablet and mobile viewports.
- Primary controls, map pins, cancellation and return paths work without trapping the child.
- Parent popup shows original missed answers first, including later-corrected answers.
- No real-world violence, copied franchise assets, purchases or autoplay audio.

Environment: installed Chrome, headless/muted Playwright; Windows. Desktop
1440x900, tablet 834x1194, mobile 390x844. Synthetic local families and in-memory
Miniflare D1 only. No real family data or production state modified.

## Three-pass evidence

### Pass 1: content, state and authenticated browser journeys

- `npm run test:beacon`: 25/25 passing. Includes independently checked maths,
  evidence-based science answers, auth/ownership, actual D1 transactions,
  concurrent rewards/upgrades, rollback, operation replay and retention boundaries.
- Authenticated game browser journey: 45/45 passing. Both regions, six stations,
  hints, wrong/correct responses, construction, reload, canvas pixels, motion,
  assets, browser Back, settings and matching Parent API evidence.
- Local preview journey: 43/43 passing in the earlier iteration.
- Portal synthetic-state suite: 25/25; actual authenticated Parent/D1 suite: 20/20.
  Both have repeatable scripts and screenshot-backed reports.

### Pass 2: visual inspection and layout refinement

Reviewed HQ, question workbenches, map, travel, construction upgrades and Parent
review across the three viewports. Corrected mobile tank framing, camera-control
overlap, hidden controls appearing over questions, caption contrast, map labels at
viewport edges, excessive map fog and the missing mobile portal-return route.
The final HQ now adds a raised observation/control structure, not just a label.
Map pins and the tank remain visible after the final camera/fog correction.

### Pass 3: missed-case review

`tools/qa-beacon-edge.mjs`: 25/25 passing against the actual local API/D1 handlers:

- Desktop/mobile map pins are clickable and routes render.
- Travel pause freezes position/time; continue moves; stop retains the expedition.
- Numeric and choice drafts survive a real reload.
- Muted read-aloud has visible feedback; evidence inspection highlights table rows.
- A deliberately dropped successful API response offers retry, then credits exactly
  once with one retained answer after replay and reload.
- Starting a second region cannot discard an active expedition.
- Ending/cancelling preserves earned cargo and answer history.
- Escape restores dialog focus; mobile return opens Bright Quest.
- Final HQ geometry changes visibly; no uncaught game errors.

Expected error logs in failure-injection tests are not unexplained runtime failures:
the suite deliberately aborts one successful POST response, and the database test
deliberately rejects one receipt write to verify transaction rollback.

## Evidence locations

All are relative to the workspace parent of the repository:

- `outputs/qa-beacon-brigade-authenticated/report.json` and eight screenshots.
- `outputs/qa-beacon-edge/report.json` and map/travel/HQ screenshots.
- `outputs/qa-beacon-parent/latest.md` and timestamped reports/screenshots.
- `outputs/qa-beacon-parent-auth/latest.md` and timestamped API/D1/visual evidence.

The game module totals approximately 2.7 MB on disk, including source, documentation,
textures and the actual-scene thumbnail. This is not a measured mobile download-time
or frames-per-second guarantee. No external runtime asset dependency is required.

## Remaining limits and release checklist

- Physical iPad/Android performance and Safari compatibility are not yet verified.
- Tests were muted; browser-supplied read-aloud voices have not had an audible review.
- An eight-year-old's engagement/graphics rating is not established by automated QA.
- Final educator/year-level review remains open; there is no curriculum certification.
- This is two regions, directed tank travel and evidence-table science. It does not
  yet provide the full four-region roadmap, free driving or simulated experiments.
- Production release requires the additive migration, normal GitHub/Cloudflare path,
  current production configuration checks and live child/Parent smoke tests.
- The 100-expedition pilot limit needs a history-pagination extension before broad use.

No unresolved primary-flow defect was observed in the tested local slice. These
results do not certify every possible browser, device or input combination.
