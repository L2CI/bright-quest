# Parent and family uplift completion

28 September 2026. Covers P08, P09 and the parent/family part of P05 in the integrated uplift plan.

## Implemented

- Parent header uses the established four destinations, a compact child selector and Return to child. Settings contains family/account actions; reset remains behind Advanced data controls and uses the existing confirmation handler.
- Overview shows four factual metrics, a supported observation, the latest saved result and direct actions. Different test results are described as separate attempts, not proof of a learning trend.
- Evidence, attempt detail, focus groups and writing use compact native disclosures. Search and All / Incorrect / Unanswered / Correct / Writing filters expose complete original prompts and responses, recorded time and saved support/writing signals. Unknown legacy marking has a separate Not marked state.
- Full writing retains paragraph breaks. Standalone legacy writing samples remain accessible; only a presentation duplicate tied to an existing attempt is suppressed. No stored sample is removed or rewritten.
- Focus groups preserve every question rather than showing only five. Correct and unanswered questions remain accessible; incorrect and unanswered work have distinct labels without changing the score.
- Parent subpages preserve the originating Learning/Evidence destination in their URL, including browser back paths. Full ICAS, Chemistry and Physics question prompts are retained in their existing review panels.
- Chemistry Learning summaries use the existing chapter list and test count, eliminating undefined denominators.
- Authenticated family chooser, parent PIN and family settings use a compact full-width layout. Child PIN controls reflow before the panel becomes too narrow.
- Return to child checks the family session, confirms the parent-lock request succeeded and refreshes the reduced child-authorised session before continuing to `#child/today`. A failed lock keeps the parent view and offers retry; a failed refresh after locking opens the PIN screen. It does not claim a successful return on failure.
- Parent/child/account transitions await the current child's cloud save. A failed save retains the current access and device copy, with a reconnect notice. Hydration combines saved records only for an authorised full payload and matching family, database child and profile identity; redacted siblings never inherit private local history.
- The child chooser retires the previous active pointer after a successful save and access change, including when an unselected family reloads. Choosing a child, opening Parent and logging out then work without trying to save the retired child. Reconnect notices are visible inside family screens.
- New parent styles use light surfaces, blue primary controls, warm illustrations, subject accents, readable status labels, visible keyboard focus, responsive layouts and reduced-motion support.
- The graphics revision replaces the login hill and decorative tile group with a separate painted treehouse image panel, leaving all copy on a light surface. The parent next-step summary uses a small painted study thumbnail instead of an oversized symbolic SVG; phone layouts omit that decoration. Signed-in family forms remain compact and illustration-free.
- Initial page loading shows a plain Opening Bright Quest status until configuration and session selection finish rendering. This prevents cached learner and legacy dashboard flashes on reload or course return. Disabled/unavailable configuration retains the existing fallback, failures release the gate, and subsequent actions leave the current view stable.

## Files

- Targeted parent functions in `bright-quest-shell-merge.js`.
- `bright-quest-family-auth.js` and `bright-quest-family-auth.css`.
- New `parent-experience-uplift.css`; root index linking is owned by the lead.

No question bank, database migration, existing storage key, profile ID, original answer, score, star balance or game-save format changed in this scope. An additive `brightQuestFamilyProfileCacheOwnerV1` key binds the family ID and database-child-to-profile mapping to the exact authorised cache written, enabling reload recovery only when all identities match. `brightQuestDeviceProfileRecoveryV1` retains original cache and ownership strings before unowned, foreign-owner or redacted cached records are replaced; those archive entries are never shown to or merged into another account. Automatic profile-deduplication/render-write removal is the lead's separate preservation change. Separately authorised P13 recovery uses new backend endpoints and has its own completion note.

## Verification

- Node syntax checks passed for both edited scripts.
- `tools/test-parent-pin-recovery-ui.mjs`: 23/23 checks passed, including four initial-load gate cases, eight PIN recovery cases, eight separately authorised family-password recovery cases and three shared save/confirmation cases.
- Integrated `tools/test-ui-preservation.mjs`: 49/49 checks passed, including long writing/prompts, standalone writing, incorrect/unanswered/index-zero/legacy status, Chemistry totals, navigation without data writes, return-to-child success/failure boundaries, separate device-only science history, cache ownership, failed-save transition guards, chooser reload/next actions and safe cache archival/deduplication.
- `git diff --check` passed.
- Browser/visual QA is owned by the lead and remains required. This note does not claim screenshots, physical-device testing, exhaustive screen-reader testing or production verification.

## Integration notes

- New stylesheet must follow the existing experience stylesheet (and shared child token stylesheet).
- Physics/Chemistry progress readers now use the selected profile ID only. Unassigned `demo-student` history remains available in a labelled device-history disclosure on each science parent page. Existing copies already stored under a named profile, including earlier migrated Chemistry records, remain visible. No demo data is deleted, moved or reassigned.
- Filter state is held in memory by child/profile and route. It does not create a stored-data migration or alter records.
- Main record layouts retain native browser disclosure interaction. Game-specific evidence and course playback remain under their existing modules.
- Unowned older caches are never assigned to an authenticated family by a matching name or legacy profile ID. Ownership is established only after an authorised session has written its matching cache. This protects families whose legacy profile IDs happen to be the same.
- Before replacing a cache whose records cannot be safely retained in the current authorised profile map, hydration writes and verifies a device-only archive containing the exact original cache and owner metadata. Repeated entries with the same learning content and ownership keep the first original strings. Comparison ignores only each profile's top-level `cloudVersion` and `cloudSyncedAt` and object-key order; changed answers, drafts, unknown fields and ownership remain distinct. Unparseable data uses exact-byte matching. Nothing is pruned. If the archive cannot be saved, hydration stops before writing or deleting the source cache or owner; the family screen explains the storage problem. Archive recovery is deliberate maintenance work, not an automatic account merge.
