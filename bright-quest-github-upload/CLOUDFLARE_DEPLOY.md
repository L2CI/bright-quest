# Cloudflare Setup

This project is ready for Cloudflare Pages + Pages Functions + D1.

## What this gives you

- Public app URL with no laptop required.
- Browser app still works offline/local-first.
- When hosted on Cloudflare, profiles and progress sync to D1.
- Parent dashboard can read progress across devices after sync.
- The same backend pattern can be reused for future simple apps.

## One-time setup

1. Create or log in to a Cloudflare account.
2. Install dependencies:

   ```powershell
   npm install
   ```

3. Log in to Cloudflare:

   ```powershell
   npx wrangler login
   ```

4. Create the D1 database:

   ```powershell
   npx wrangler d1 create bright-quest-db
   ```

5. Copy the returned `database_id` into `wrangler.toml`, replacing:

   ```text
   REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID
   ```

6. Apply the schema remotely:

   ```powershell
   npx wrangler d1 migrations apply bright-quest-db --remote
   ```

7. Deploy:

   ```powershell
   npx wrangler pages deploy . --project-name bright-quest
   ```

## Local development with Cloudflare APIs

After `npm install`, use:

```powershell
npx wrangler pages dev . --d1=DB
```

Cloudflare docs used:

- Pages Functions bindings: https://developers.cloudflare.com/pages/functions/bindings/
- D1 Wrangler commands: https://developers.cloudflare.com/d1/wrangler-commands/
- D1 Worker API: https://developers.cloudflare.com/d1/worker-api/
