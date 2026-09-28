# Family password and parent PIN recovery

28 September 2026. The user chose email recovery for both credentials. Existing passwords remain one-way hashes; recovery sets a new credential. Security questions are not the recovery proof.

## Plan

| Item | Owner | Acceptance | Status |
|---|---|---|---|
| R01 | Lead | Clearly label the fictional local preview and open the live app for real login | Complete; banner verified in browser and harness check; live app opens already signed in |
| R02 | Backend agent | Add public family-password email request and token-confirm endpoints; keep verified parent PIN recovery | Complete; 21 password and 12 PIN API checks pass |
| R03 | Parent UI agent | Forgot family password from login, generic sent state, new password/confirmation, expiry/error/back paths; preserve existing PIN flow | Complete; 23 auth UI checks pass, including save failure and pending confirmation |
| R04 | QA agent + lead | Check single-use purpose-bound tokens, expiry, concurrent claims, rollback, account enumeration, session revocation, unchanged learning/game records and auth UI regressions | Complete; 114 scoped checks pass, with independent review and source hashes |
| R05 | Lead | Browser review desktop/phone, update completion and release requirements | Complete; 1440/390 px request/link/cancel/error/back paths, final parent entry path and console check pass; visual review updated |

## Contract and preservation

- `POST /api/auth/password-reset-request` accepts `{email}` without a session or old password. A valid email format always receives the same generic acknowledgement, whether registered, throttled by account or delivery failed. Apply IP and account limits without exposing account existence. Send asynchronously with `waitUntil` so mail latency does not reveal registered addresses; the asynchronous task handles errors and invalidates failed tokens without logging sensitive content.
- `POST /api/auth/password-reset-confirm` accepts `{token,password}`. Password requirements match signup (8–128 characters). Links use the configured trusted origin and `/#password-reset=<token>`, with a random 32-byte token, hash-only storage, 15-minute expiry and one use.
- An additive `0006_family_password_recovery.sql` table keeps password tokens separate from parent PIN tokens. PIN tokens cannot reset passwords and vice versa. Password reset changes only the matching family user's password; it does not change the family PIN. Either reset revokes all family sessions and outstanding recovery links for both purposes when both migrations are enabled. Existing PIN-only installations stay supported until password recovery is enabled.
- Existing parent PIN recovery still requires a signed-in family and current family password, then sends a link to the registered email. A forgotten family password can be recovered first through the login screen.
- Updates are atomic with token claims and session revocation. No child/profile/event/game record is changed. Browser caches and drafts must be saved or preserved using the existing auth transition safeguards.
- A winning password reset clears only the matched user's login-account throttle in the same atomic transaction, allowing the new password after previous failed attempts. IP throttles, other accounts and losing/replayed confirmations remain unaffected.
- Add `familyPasswordRecoveryEnabled` to auth config and explicit `BQ_PASSWORD_RECOVERY_ENABLED` / `BQ_PASSWORD_RECOVERY_MIGRATION_READY` deployment gates. Reuse the configured mail transport; never reveal whether an email has an account.
- Test only in isolated fictional families. No real email, real credential change, remote migration or publication is part of this implementation. Sender/domain and secrets are still required before production activation.

## Ownership boundaries

- Backend agent: new backend helper, endpoints and migration; narrow shared PIN helper/config changes; backend documentation. Do not edit browser UI, harness or QA-owned tests.
- Parent UI agent: `bright-quest-family-auth.js/.css`, auth UI tests and UI completion notes. No root index or backend files.
- QA agent: independent password-recovery API tests and review. No production implementation edits.
- Lead: harness, preview banner, root integration/cache version, browser evidence and overall completion.

## Completion and limits

All R01–R05 items are complete locally. The independent review is in `account-recovery-independent-review-2026-09-28.md`; backend and UI completion notes describe the contracts and checks. The updated visual review contains desktop and phone recovery captures 47 and 45. The separate harness check confirms the preview label/live link and both game APIs leave child records unchanged.

Production is unchanged. Neither recovery flow is active until the sender/domain, secrets, relevant additive migrations and feature flags are configured and the app is published. Real email delivery still needs verification. Browser QA exercised requests, captured links, forms, errors and cancellation; complete credential changes were tested in isolated API/controller fixtures, without entering a new credential through the browser.
