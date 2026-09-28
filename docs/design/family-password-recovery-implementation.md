# Family password recovery — backend implementation

28 September 2026. Implements R02 of the approved account-recovery extension. Production activation has not been performed.

## Public request

`POST /api/auth/password-reset-request` accepts `{email}` without a session. The server normalises a string address using the existing account rules. Invalid formats receive 400 `EMAIL_INVALID`; valid formats receive the same 200 `{ok:true,expiresInMinutes:15}` whether registered, unknown, account-throttled or affected by delivery failure.

The response waits only for the address-independent IP limit. Account rate limiting, account lookup, token generation/storage and mail sending all run in a handled `context.waitUntil` task. No registered-account branch or mail latency is awaited before acknowledging. An environment without `waitUntil` returns 503 rather than falling back to a blocking request. This follows the [Pages Functions context API](https://developers.cloudflare.com/pages/functions/api-reference/#eventcontext).

Only the registered database address can receive mail. Request recipient/origin fields have no effect. The configured application origin supplies `/#password-reset=<token>`. The message contains a 15-minute, single-use link; neither the response nor logs expose the token or account identity. A failed send deletes the new unused token. Background exceptions, including cleanup failures, are handled without logging provider payloads or sensitive content.

## Confirmation

`POST /api/auth/password-reset-confirm` accepts `{token,password}`. It does not require a session. Passwords must be strings of 8–128 characters, matching signup. A malformed, expired, used, unknown or PIN-purpose token receives 400 `RECOVERY_LINK_INVALID`; a rejected password receives 400 `PASSWORD_INVALID` without consuming the link.

`0006_family_password_recovery.sql` adds a separate token table and indexes. Tokens contain 32 random bytes; only the SHA-256 hash, family/user identity, timestamps and claim state are stored. The table is purpose-bound, so PIN tokens cannot reset a password and password tokens cannot reset a PIN.

An atomic, nonce-gated D1 batch:

1. Claims the unused, still-unexpired password token, rechecking its user/family relationship.
2. Updates only the matching user's password hash, salt, iterations and authentication metadata.
3. Revokes every session and capability in that family.
4. Invalidates every other pending password link in that family.
5. Clears only the matching user's hashed login-account throttle, so earlier incorrect passwords do not block sign-in with the recovered password. IP limits and other accounts' limits remain intact.
6. Invalidates pending parent PIN links if their migration is ready.

Only the winning claim can mutate credentials or sessions. The new password uses PBKDF2/SHA-256, 100,000 iterations and a new random salt through the existing account helper. The family parent PIN, other users' passwords, other families and every child/profile/event/game record remain untouched. Success returns 200 `{ok:true,requiresSignIn:true}` and clears the session cookie.

## Parent PIN compatibility

The parent PIN request still requires a signed-in family and its current password. Issuance uses an atomic `INSERT … SELECT` that rechecks the verified password hash and email plus the exact matching, unexpired session. A concurrent reset or sign-out cannot authorise a new PIN token using a retired session; issuance then returns 401 `SESSION_EXPIRED`.

PIN confirmation now invalidates outstanding family-password links in its existing claim transaction when migration 0006 is ready. Cross-purpose invalidation depends on the other migration-ready flag, even when that recovery flow is temporarily disabled. PIN-only deployments with no password table retain their previous behaviour.

## Availability, limits and errors

The config endpoint adds `familyPasswordRecoveryEnabled`. Password recovery requires existing family authentication, the same configured email transport and trusted origin used by PIN recovery, plus:

- `BQ_PASSWORD_RECOVERY_ENABLED=true`
- `BQ_PASSWORD_RECOVERY_MIGRATION_READY=true`, only after migration 0006 is applied and verified

Password and PIN enable flags remain independent. Mail transport still defaults unavailable without its production sender/account/secret configuration. Tests may inject only the existing in-process function `BQ_PIN_RECOVERY_MAILER`; no new production recipient or transport setting is added.

All limits use the existing atomic 15-minute limiter: request IP 15; requested account/address 3; confirmation IP 20; confirmation family 5. Unknown addresses consume the same hashed account quota. Account throttling is silent in the public acknowledgement; IP/confirmation throttling returns 429 `RATE_LIMITED`. Cross-origin requests receive 403 `ORIGIN_MISMATCH`; JSON bodies are limited to 2 KiB; unavailable configuration and unexpected foreground errors receive sanitised 503 `RECOVERY_UNAVAILABLE`.

## Verification and release boundary

Changed JavaScript syntax checks passed. Independent API tests and browser review are owned by the QA agent and lead; results are recorded after execution. No real mail, password/PIN reset, remote migration or publication was performed. Production still requires both additive migrations as applicable, configured sender/domain and secrets, and verified delivery.
