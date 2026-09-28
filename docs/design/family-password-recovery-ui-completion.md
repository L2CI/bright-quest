# Family password recovery — interface

28 September 2026. R03 in the account recovery extension plan.

## Completed

- Login has **Forgot family password?**. The verified parent PIN recovery form also links to it, so someone who has forgotten both can recover the family password first.
- The request form accepts a valid family email address. Every successful request shows the same conditional acknowledgement: if an account uses the address, a link will arrive. The view does not echo the address or claim that an account exists or that delivery succeeded.
- Password email links use `#password-reset=<64hex>`. The script captures the token in a closure and immediately removes the fragment before requesting configuration. Password and parent PIN links have separate purpose checks and forms. Tokens are not put in markup, device storage or logs.
- The new password and confirmation must match. Password length is 8–128 characters, matching signup; the submitted password is not trimmed or otherwise altered.
- Invalid/expired/used links offer a new request and sign-in. Unavailable configuration, request errors and rate limits show honest retry/back paths. Cancelling drops the in-memory token and returns to sign-in.
- Successful password recovery clears parent/child capabilities and active identity, retaining saved profile caches, recovery archives and drafts. It asks the user to sign in normally with the new password. The family password reset does not change the parent PIN.
- Existing initial-load gating, verified parent PIN recovery, safe auth transitions and family/cache ownership guards remain intact. Compact responsive forms use existing keyboard focus, labels and busy states.
- A reset link arriving during learning pauses the active test and awaits the current child's save before opening a reset form. If saving fails, the token stays in memory and a visible Retry/Dismiss notice leaves the saved work in place. Both confirmation forms await an active save before posting, retain access on failure and disable all reset/navigation controls while the request is in flight. Startup email links do not depend on an existing login.

## Files and contract

- `bright-quest-family-auth.js` and `.css`; no new imports or root markup edits are required.
- Config: `familyPasswordRecoveryEnabled`.
- `POST /api/auth/password-reset-request` with `{email}`. Success is always `{ok:true,expiresInMinutes:15}` for a valid request. The UI handles unavailable/error/rate-limit responses without inferring registration.
- `POST /api/auth/password-reset-confirm` with `{token,password}`. Success `{ok:true,requiresSignIn:true}`; `RECOVERY_LINK_INVALID` clears the unusable token.
- Backend purpose binding, session revocation, email delivery and account enumeration safeguards are independently owned and tested by the backend/QA agents.

## Verification

- Auth UI suite: **23/23 passed** — eight family-password cases, eight parent PIN cases, four startup cases and three shared save/confirmation cases. Tests cover both password-length boundaries, mismatch, generic acknowledgements, token clearance/non-persistence, cross-purpose rejection, failures, expired/cancelled links, restored sign-in, unchanged learner storage, save-before-reset and disabled cancellation/duplicate submissions during confirmation.
- Captured TAP: `../outputs/brightquest-uplift-qa-2026-09-28/account-recovery-ui-tests.txt`.
- Script syntax and whitespace checks passed.
- Independent final integration: **81/81 passed** — preservation 49, sync 9 and auth UI 23. QA reviewed and recorded the config hash amendment for the newly authorised password recovery flag.
- Browser/layout verification is owned by the lead. Tests use synthetic local accounts only. No real email or real credential was changed, and this note does not claim deployment or configured production delivery.
