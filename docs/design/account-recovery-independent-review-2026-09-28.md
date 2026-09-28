# Account recovery — independent preservation review

28 September 2026. Covers R04 in `account-recovery-extension-plan-2026-09-28.md`.

## Result

The family-password API passes **21 independent checks** against real ephemeral D1. The existing parent PIN API passes **12 checks** after the extension. Source review found no blocking issue in the request, token claim, credential update or session-revocation paths. All data and mail used for these tests are fictional.

## Evidence

- `tools/test-family-password-recovery.mjs` owns the independent password tests and records hashes of the tested implementation.
- `outputs/brightquest-uplift-qa-2026-09-28/family-password-recovery-tests.json` contains structured results and source hashes.
- `family-password-recovery-tests.txt` contains the 21-case summary.
- `parent-pin-recovery-after-password.txt` contains the 12 existing PIN API result lines from the integrated run.
- `account-recovery-integration.txt` contains the combined command output: **111/111 pass** at that integration point, including password API21, PIN API12, auth UI20, preservation49 and sync9.
- `account-recovery-ui-preservation-final.txt` contains the final rerun after active-work/navigation guards: **81/81 pass**, including auth UI23, preservation49 and sync9. Together with the unchanged API results, the final scoped coverage is **114 passing cases**. JavaScript syntax and `git diff --check` also pass.

The output directory is beside the repository, under the workspace's `outputs/` directory.

## Reviewed boundaries

| Boundary | Verification |
|---|---|
| No account enumeration through the response | Known, unknown, account-throttled and failed-delivery requests return the same acknowledgement. Account lookup, token creation and mail run in `waitUntil`; an unresolved mail promise does not delay acknowledgement. IP limits remain independent of account existence. |
| Correct recipient and origin | Recovery needs no session or old password. The request accepts only the account email; supplied recipient/origin fields and a spoofed request host cannot change the registered recipient or configured link origin. |
| Secret handling | Random 32-byte tokens are sent only in captured email. Database rows contain hashes, purpose-specific tables, user/family identity, fifteen-minute expiry and claim status. Responses contain no token. Background errors are caught without logging private message content. |
| Separate purposes | PIN links cannot reset passwords and password links cannot reset PINs. Concurrent resets of different purposes have one winner. A successful reset retires outstanding links for both purposes once their migrations exist, even when the other flow's feature flag is off. |
| Atomic reset | Nonce-gated D1 batches claim the still-valid token, update the matching credential and revoke sessions/links. Concurrent same-token requests have one winner. Injected transaction failure preserves the credential, unused token, sessions, both link purposes and login quota. |
| Family and user isolation | Password reset changes the token's matching user only, leaves the family PIN and sibling user password unchanged, and revokes all sessions only for that family. A different family's session or supplied user ID cannot retarget the reset. |
| Existing learner data | Before/after snapshots match byte for byte across child profiles, family events, migration provenance, legacy profiles/events, both game states and their permanent operation receipts. Fixtures include original writing, index-zero answers, an exhausted draft and unknown fields. |
| Retired PIN request authority | The test pauses a PIN request immediately before token insertion and completes a password reset. No PIN token or email is produced. Separate tests retire only the session, password hash or registered email; each is rejected after the initial password check. |
| Login after recovery | The winning password reset clears only the matched user's hashed login-account quota. The new password signs in successfully. IP and sibling-account limits remain. A replay and an injected losing concurrent reset cannot clear a fresh quota created after the winner. |
| Active work and reset navigation | A recovery link arriving during learning pauses and saves the test before opening its form. Failed saving retains the link in memory with Retry/Dismiss actions. Confirmation waits for the active save; a failure preserves access and drafts. Cancel/navigation controls and duplicate submission are disabled while confirmation is pending. |

## Scope amendment

The reviewed `functions/api/auth/config.js` amendment now exposes family-password recovery availability alongside the existing UI and PIN recovery flags. Only that file's authorised amendment hash/scope was updated in `tools/ui-preservation-baseline.json`; its original baseline hash remains recorded. Existing learning banks, schemas and protected API files were not rebased.

The new `0006_family_password_recovery.sql` migration is authentication-only. The original learning migrations remain unchanged.

## Limits

These checks establish API and data behaviour in a local isolated database. They do not prove production email delivery, sender/domain configuration, production migration status or real-account recovery. No real mail, credentials, learner records, remote migration or deployment were used. Browser rendering and the complete user journey are reviewed separately by the lead.
