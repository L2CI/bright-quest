# Parent PIN recovery — interface

28 September 2026. P13 is the separately authorised parent PIN recovery addition.

## User flow

1. Open Parent and choose **Forgot parent PIN?**
2. Confirm the family account password. The server decides which registered email receives the link; the interface does not accept a different recipient.
3. See the masked destination and link expiry after the server confirms that the request succeeded.
4. Open the email link and enter a new 4–8 digit PIN twice.
5. After confirmation, sign in again and use the new PIN through the normal parent unlock.

## Interface and preservation details

- Changes are contained in `bright-quest-family-auth.js` and `bright-quest-family-auth.css`; no new imports are needed.
- Uses the server's `parentPinRecoveryEnabled` configuration flag. If unavailable, it explains that recovery is unavailable and offers a return to PIN entry. It does not claim a message was sent.
- Recovery tokens arrive as a URL fragment. The script captures a valid 64-character hexadecimal token in its closure and immediately removes the fragment using `history.replaceState`. It does not place the token in local/session storage, rendered markup or logs.
- Malformed, expired or already-used links have a clear route back to sign-in and a new recovery request.
- The form checks PIN length/digits and matching confirmation before making the confirmation request. Passwords are cleared after the email-link request.
- On success, parent/child capability values and active in-memory identity are cleared. Saved profile/draft storage is retained. The interface never automatically grants parent access.
- If a recovery link is opened in an active test tab, the existing Save & leave control runs before the recovery form replaces the screen.
- Labels, numeric PIN input modes, keyboard focus and responsive compact forms follow the family UI. Busy controls prevent duplicate submission.

## Backend contract

- `POST /api/auth/parent-pin-reset-request` with `{password}` returns `{ok, maskedEmail, expiresInMinutes}`.
- `POST /api/auth/parent-pin-reset-confirm` with `{token, parentPin}` returns `{ok, requiresSignIn: true}`.
- The request form handles `RECOVERY_UNAVAILABLE`. The reset form handles `RECOVERY_LINK_INVALID`; other server errors remain visible without assuming success.
- Backend ownership, token lifetime, email delivery and session revocation are documented/tested by the backend agent and lead.

## Verification status

- JavaScript syntax check passed.
- `tools/test-parent-pin-recovery-ui.mjs`: 23/23 checks passed. Eight PIN recovery cases cover immediate fragment removal, malformed/expired links, password verification, masked destination, PIN validation, failed/successful confirmation, retained learner storage, unavailable service and cancel. Four startup cases verify the initial visibility gate, disabled/unavailable configuration fallback, session failure and selected-child rendering before release. Eight later family-password recovery cases and three shared save/confirmation cases are documented in `family-password-recovery-ui-completion.md`.
- Integrated `tools/test-ui-preservation.mjs`: 49/49 checks passed, including full history, correct access transitions, chooser reloads, owned-cache recovery, device-only retention and blocked transitions when saving fails.
- QA reports 12/12 backend API checks passed. Independent static review found no additional actionable defect.
- Browser/visual verification is owned by the lead. No real family PIN was changed and no real recovery email was sent during implementation. These local checks do not claim production email delivery or a release.
