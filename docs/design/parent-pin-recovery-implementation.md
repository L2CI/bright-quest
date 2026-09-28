# Parent PIN recovery — implementation and release requirements

28 September 2026. P13 was explicitly authorised during the Bright Quest uplift.

## User journey and API contract

1. A signed-in family user chooses **Forgot parent PIN** and provides their current family password.
2. `POST /api/auth/parent-pin-reset-request` accepts `{password}`. The server verifies the password against that session's user, then sends the recovery message only to the email currently registered for that user. Supplied recipient/origin fields are ignored.
3. Success returns `{ok:true, maskedEmail, expiresInMinutes:15}`. The email link uses the configured app origin and `/#parent-pin-reset=<token>`; the token is never returned by this endpoint.
4. The UI consumes the fragment into memory and removes it from the address bar. `POST /api/auth/parent-pin-reset-confirm` accepts `{token,parentPin}`. PINs remain 4–8 digits.
5. Success returns `{ok:true,requiresSignIn:true}`, clears the session cookie and revokes every existing family session/capability. The family signs in again and uses the new PIN normally. No learning/profile records are reset.

Unavailable configuration returns 503 `RECOVERY_UNAVAILABLE`; incorrect password returns 401 `PASSWORD_MISMATCH`; invalid/expired/replayed links return 400 `RECOVERY_LINK_INVALID`; an invalid PIN returns 400 `PIN_INVALID`; rate limiting returns 429. Failed email acceptance returns 503 `RECOVERY_SEND_FAILED` and invalidates the new token.

## Preservation and security

- Migration `0005_parent_pin_recovery.sql` adds a separate recovery table and indexes. It does not alter existing tables or learner payloads.
- Tokens contain 32 cryptographically random bytes. Only their SHA-256 digest is stored, with family/user IDs, creation, 15-minute expiry and consumption state.
- Token claim, PIN update, session revocation and invalidation of other pending family links occur in one conditional D1 batch. A fresh nonce gates every mutation, so a replay or concurrent losing request cannot update the family. The batch rolls back together if any statement fails.
- Current-password checks and send requests are independently rate limited by user/family/IP. Confirmation is rate limited by IP and the token's family.
- Message URLs use a fixed configured origin, never the request Host or a caller-supplied URL. Cross-origin mutation requests are rejected. Bodies are limited to 2 KiB.
- PINs use the existing PBKDF2/SHA-256 helper with a new random salt and 100,000 iterations. Child PINs, child identities, attempts, writing, stars, drafts, course progress, game states and evidence remain untouched.
- Provider exceptions and unexpected errors are sanitised without logging the token, password, message body or API credentials.

## Mail transport

Uses the documented [Cloudflare Email Service REST API](https://developers.cloudflare.com/email-service/api/send-emails/rest-api/), with a fixed Cloudflare endpoint, no redirects and a 10-second timeout. It requires `success:true` and the exact recipient in the delivered/queued set; a permanent bounce is a failure. Delivery acceptance is not a guarantee that a person has read the message.

The atomic behaviour relies on [D1 transactional batches](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch), verified with a real ephemeral D1 rollback test.

## Required production configuration — deliberately not applied

- `BQ_PARENT_PIN_RECOVERY_ENABLED=true`
- `BQ_PARENT_PIN_RECOVERY_MIGRATION_READY=true`, only after the additive migration has been applied and verified
- `BQ_APP_ORIGIN`: the exact HTTPS app origin, without a path, query, fragment or credentials
- `BQ_EMAIL_ACCOUNT_ID`: the Cloudflare account ID
- `BQ_EMAIL_API_TOKEN`: a secret with the email-sending permission
- `BQ_EMAIL_FROM`: a bare email address on the configured sending domain

All are required for production availability. Sender/domain setup, account entitlement, secrets, production migration and delivery verification remain release tasks. No real email, Cloudflare REST call, remote migration or credential change was performed during this implementation.

## Local test transport

The development harness supplies `BQ_PIN_RECOVERY_MAILER` as an in-process async function. Strings and object-shaped impostors do not activate it. Only this synthetic path permits a fixed HTTP loopback origin. It captures mail in memory and does not make a network call to a mail provider.

`GET /__sparkbound-qa__/recovery-inbox` is restricted to localhost and the harness's existing QA control header. The production app has no such route. Stopping the harness discards these messages and its entire fictional database.

## Validation

`node --test tools/test-parent-pin-recovery.mjs` covers configuration, password/session boundaries, recipient/origin control, token hashing/expiry, invalid and replayed tokens, PIN format, mail failure, rate limiting, concurrent one-winner redemption, transaction rollback, cross-family isolation and byte-for-byte learner/game record preservation. The provider transport is mocked; the HTTP harness captures synthetic email only.

All 12 tests passed in the implementation run. An independent preservation-agent source review found no blocking issue in the claim transaction, identity scope, expiry recheck, registered recipient, fixed origin or sanitised error handling.

UI screenshot and interaction checks are recorded by the lead separately. The feature remains unavailable in production until its release requirements are satisfied.

## Family password recovery extension

The approved extension adds independent recovery of the family password. See [the backend implementation](family-password-recovery-implementation.md) for its public request, purpose-bound tokens and configuration gates. PIN requests keep their current-password requirement. Their token insertion now rechecks the unchanged credential and a still-valid session atomically, preventing issuance after a concurrent reset/sign-out. Successful PIN resets also invalidate pending password links when migration 0006 is ready; successful password resets invalidate pending PIN links when migration 0005 is ready. Existing PIN-only installations remain supported.
