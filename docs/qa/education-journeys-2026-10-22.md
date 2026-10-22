# Education Journeys release QA

## Recommendation

**RELEASED AND VERIFIED.** Astra independently signed off the science, artwork labels, feature anchors and responsive presentation. The complete local and live browser replays each passed 278 checks with no unexpected runtime errors or failed assets. The production verification gate passed.

## Delivered scope

Education Journeys is available from the Bright Quest Learn library, My Journey learning-world list and parent Learning hub. The first collection has four shared Origins stops and four stops each for whales, birds, horses and elephant relatives. Twenty realistic illustrations support zoom/pan and selected feature explanations. Thirty-seven image pins locate visible anatomy; nineteen evidence features remain text controls. A sourced photograph of replica Mesohippus forelimbs supports exact toe evidence.

Two distinct Smithsonian exhibits provide actual 3D camera orbit and zoom around a mammoth mounted skeleton and a Miocene whale excavation. They retain their correct identity and dates. Preview posters are rendered from the actual models. Two opt-in NPS recordings identify the modern humpback and common raven explicitly. No extinct-animal sounds or generated photographs are claimed.

## Evidence

- **Content, storage, assets:** 7 tests passed. Coverage includes chronology, branching-family misconceptions, question schema, malformed routes, corrupt/denied/quota storage, profile separation, concurrent-tab bookmark merging, legacy-key preservation and asset provenance hashes.
- **Existing dragon learning/regression:** 33 original and Chapter II content/domain tests passed. No original game, question, save or API implementation was edited.
- **Private-route regression:** 145 canonicalisation assertions and 141 compiled Cloudflare Pages runtime assertions passed. Existing private sources remain protected.
- **Browser replay:** 278 checks passed. Every stop, all 56 feature entries, wrong/correct discovery feedback, forward navigation, completion, comparison, sources, both actual audio decodes/playback, audio exclusivity/stop, both model loads/rotation/zoom/reset, focused keyboard controls, touch activation/release, device bookmark/reload, sibling isolation, child entry/return and actual parent-PIN learning entry were exercised.
- **Failure recovery:** an aborted GLB request retains a real scan preview and notes; Retry 3D creates a fresh canvas and successfully reloads. An aborted image request retains the learning text and retries successfully. A throwing browser localStorage getter does not prevent exploration.
- **Responsive and accessibility:** rendered at 1440×900, 834×1194 and 390×844. System/manual reduced motion, 200% text size, labelled controls, dialog Escape/Close, keyboard pan/rotation, nonoverlapping layouts and return navigation passed. These are Chromium viewport tests, not physical-device certification.
- **Independent visual review:** Astra reviewed all 20 images and final representative desktop/phone pages, corrected anchors and source labels, verified actual scan posters and confirmed no remaining design/science blocker. [Review](education-journeys-astra-review-2026-10-22.md).

## Preservation

The journey itself makes no learner API writes. Its new bookmarks use only `bqEducationJourneysV1:{profileId-or-guest}` and explicitly say “saved on this device”; no cross-device sync is claimed. Existing learner payloads remain byte-identical while exploring the new module, and all original event history remains byte-identical throughout the replay. Entry into the existing parent/child portal updates its existing `cloudVersion`/`cloudSyncedAt` bookkeeping; excluding only those two fields, learner content remains identical. Existing device-key sentinels remain unchanged. No database migration or credential/recovery change is included.

All authenticated browser traffic goes to a locally created ephemeral D1 fixture, including when deployed static assets are tested. Production learner writes are zero. No real family credentials or learner records are used.

## Practical limits

- Habitat images are artistic reconstructions/visualisations. Horse-foot details are simplified; toe evidence comes from the cited fossils and replica figure. No question asks a learner to count toes in generated art.
- True 360 inspection is supplied for the two identified real fossils. The twenty habitat pictures support image zoom/pan and are never described as rotatable 3D animal models.
- Rounded chronological stops are not a proportional time scale or proven direct-ancestor sequence. A family-group summary explains branching explicitly.
- Modern audio is available for two identified animals. The common raven is a different living bird from the junglefowl illustration.

## Evidence files and publication

Local screenshots and reports: `outputs/education-journeys-2026-10-22/`. Final file fingerprints, source URLs, licences and exact generation prompts: `education-journeys/assets/`. The approved publication route is a scoped commit to GitHub `main`, automatic Cloudflare Pages build, exact live hash checks and live browser replay. The release receipt records the final deployed commit and verification results.

### Production result

Feature commit `c6d3c2721f286df77d6e4d55d57b0c8264a40249` deployed successfully to [Education Journeys](https://bright-quest.pages.dev/education-journeys/). Cloudflare build `386b3967-66b2-483c-9491-bf8a8298e1e1` completed successfully at 07:14:08 UTC on 22 October 2026.

- **45 file hashes matched** the actual deployed content, including all twenty images, both real models, actual scan posters, recordings, decoder and entry scripts.
- **14 public/protected routes passed**; the complete existing public authentication configuration remained unchanged.
- **278 live browser checks passed**, using production static files with all authenticated/API traffic intercepted into ephemeral local D1. No production learner writes occurred.
- **15 additional focused live controls checks passed**: Origins entry, family choice, timeline/earlier navigation, actual pointer image panning, dialog focus restoration, all four 3D direction controls, more than a full orbit with four distinct views, exact reset, native emulated touch drag rotating geometry and restored vertical scrolling. This public exploration made no learner API calls.
- All nine plan items are complete. The final release receipt identifies the documentation close-out commit and its successful Cloudflare deployment separately from the feature commit.
