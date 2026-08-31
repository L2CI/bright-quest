import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { readFile, realpath, stat } from "node:fs/promises";
import { createServer, request as httpRequest } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { Miniflare } from "miniflare";
import { createSession, hashSecret, randomHex, sha256 } from "../functions/_lib/family-auth.js";
import * as beacon from "../functions/api/beacon-brigade.js";
import * as profiles from "../functions/api/profiles.js";
import * as events from "../functions/api/events.js";
import * as authConfig from "../functions/api/auth/config.js";
import * as authSession from "../functions/api/auth/session.js";
import * as authLogin from "../functions/api/auth/login.js";
import * as authChildren from "../functions/api/auth/children.js";
import * as selectChild from "../functions/api/auth/select-child.js";
import * as parentUnlock from "../functions/api/auth/parent-unlock.js";
import * as parentLock from "../functions/api/auth/parent-lock.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const HOST = "127.0.0.1";
const ROUTES = new Map([
  ["/api/beacon-brigade", beacon], ["/api/beacon", beacon], ["/api/profiles", profiles], ["/api/events", events],
  ["/api/auth/config", authConfig], ["/api/auth/session", authSession], ["/api/auth/login", authLogin],
  ["/api/auth/children", authChildren], ["/api/auth/select-child", selectChild],
  ["/api/auth/parent-unlock", parentUnlock], ["/api/auth/parent-lock", parentLock]
]);
const MIME = new Map(Object.entries({
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".glb": "model/gltf-binary", ".gltf": "model/gltf+json",
  ".bin": "application/octet-stream", ".wasm": "application/wasm", ".woff": "font/woff", ".woff2": "font/woff2",
  ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg", ".mp4": "video/mp4", ".webm": "video/webm", ".vtt": "text/vtt"
}));

// This development-only process creates its own ephemeral D1. It never reads wrangler
// bindings, .dev.vars, production credentials, or a persistent database directory.
export async function startBeaconQa({ port = 4191 } = {}) {
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Invalid localhost port");
  const mf = new Miniflare({ host: HOST, modules: true,
    script: 'export default { fetch() { return new Response("Local Beacon QA runtime"); } }',
    compatibilityDate: "2026-05-14", d1Databases: ["DB"], d1Persist: false });
  let server;
  try {
    const db = await mf.getD1Database("DB");
    for (const name of ["0001_bright_quest.sql", "0002_family_auth.sql", "0003_beacon_brigade.sql"]) {
      const sql = await readFile(join(ROOT, "migrations", name), "utf8");
      await db.exec(sql.replace(/--[^\r\n]*/g, "").replace(/\r?\n/g, " "));
    }
    const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true",
      BQ_EXPERIENCE_UPLIFT_ENABLED: "true", BQ_SIGNUP_ENABLED: "false", BQ_LEGACY_API_ENABLED: "false" };
    const seeded = await seedSyntheticFamily(env);
    const controlToken = randomHex(32);
    const root = await realpath(ROOT);
    const pending = new Set();
    let origin;
    let fixture;
    server = createServer(async (incoming, outgoing) => {
      outgoing.setHeader("cache-control", "no-store");
      outgoing.setHeader("x-content-type-options", "nosniff");
      outgoing.setHeader("referrer-policy", "same-origin");
      try {
        const currentPort = server.address().port;
        const host = incoming.headers.host;
        const localHosts = [`127.0.0.1:${currentPort}`, `localhost:${currentPort}`];
        if (!localHosts.includes(host) || ![HOST, "::ffff:127.0.0.1"].includes(incoming.socket.remoteAddress)) {
          return sendJson(outgoing, 403, { error: "Localhost only" });
        }
        const requestOrigin = `http://${host}`;
        if ((incoming.headers.origin && incoming.headers.origin !== requestOrigin)
          || incoming.headers["sec-fetch-site"] === "cross-site") {
          return sendJson(outgoing, 403, { error: "Cross-origin requests are not allowed" });
        }
        const url = new URL(incoming.url, requestOrigin);
        if (url.origin !== requestOrigin) return sendJson(outgoing, 403, { error: "Invalid request origin" });
        if (url.pathname === "/__beacon-qa__/health") {
          return sendJson(outgoing, 200, { ready: true, synthetic: true, persistence: "ephemeral", origin });
        }
        if (url.pathname === "/__beacon-qa__/fixture") {
          if (incoming.method !== "GET") return sendJson(outgoing, 405, { error: "GET required" });
          if (incoming.headers["x-bq-qa-control"] !== controlToken) return sendJson(outgoing, 403, { error: "Local QA control token required" });
          return sendJson(outgoing, 200, fixture);
        }
        if (url.pathname.startsWith("/api/")) {
          const module = ROUTES.get(url.pathname);
          if (!module) return sendJson(outgoing, 404, { error: "API route not served by this harness" });
          const method = incoming.method.toLowerCase();
          const handler = module[`onRequest${method[0].toUpperCase()}${method.slice(1)}`];
          if (!handler) return sendJson(outgoing, 405, { error: "Method not allowed" });
          const request = new Request(url, { method: incoming.method, headers: incoming.headers,
            ...(["GET", "HEAD"].includes(incoming.method) ? {} : { body: Readable.toWeb(incoming), duplex: "half" }) });
          const response = await handler({ env, request, params: {}, data: {}, waitUntil(promise) {
            const tracked = Promise.resolve(promise).catch(() => {}).finally(() => pending.delete(tracked));
            pending.add(tracked);
          } });
          outgoing.statusCode = response.status;
          for (const [name, value] of response.headers) if (name !== "set-cookie") outgoing.setHeader(name, value);
          const cookies = response.headers.getSetCookie();
          if (cookies.length) outgoing.setHeader("set-cookie", cookies);
          if (response.body) await pipeline(Readable.fromWeb(response.body), outgoing);
          else outgoing.end();
          return;
        }
        await serveStatic(root, url, incoming, outgoing);
      } catch (error) {
        if (!outgoing.headersSent) sendJson(outgoing, 500, { error: "Local QA harness error" });
        else outgoing.destroy();
        console.error("Beacon QA request failed:", error.message);
      }
    });
    for (let attempt = 0; ; attempt += 1) {
      try {
        await new Promise((resolveListen, reject) => {
          server.once("error", reject);
          server.listen(port === 0 ? 0 : port + attempt, HOST, () => {
            server.removeListener("error", reject);
            resolveListen();
          });
        });
        break;
      } catch (error) {
        if (error.code !== "EADDRINUSE" || attempt >= 19 || port + attempt >= 65535) throw error;
      }
    }
    origin = `http://${HOST}:${server.address().port}`;
    fixture = { synthetic: true, origin, ...seeded, cookie: { ...seeded.cookie, url: origin } };
    return { origin, fixture, controlToken, db, async close() {
      await new Promise((resolveClose) => {
        server.close(resolveClose);
        server.closeAllConnections();
      });
      await Promise.allSettled(pending);
      await mf.dispose();
    } };
  } catch (error) {
    server?.close();
    await mf.dispose();
    throw error;
  }
}

async function seedSyntheticFamily(env) {
  const now = new Date().toISOString();
  const expires = new Date(Date.now() + 12 * 3600000).toISOString();
  const familyId = "beac0000-0000-4000-8000-000000000001";
  const userId = "beac0000-0000-4000-8000-000000000002";
  const children = [
    { id: "beac0000-0000-4000-8000-000000000011", legacyId: "beacon-qa-explorer", name: "Beacon QA Explorer", pin: "2486" },
    { id: "beac0000-0000-4000-8000-000000000012", legacyId: "beacon-qa-sibling", name: "Beacon QA Sibling", pin: "5739" }
  ];
  const login = { email: "beacon-qa@example.invalid", password: "Synthetic-Beacon-QA-Only", parentPin: "7391" };
  const parentSalt = randomHex(16);
  const passwordSalt = randomHex(16);
  await env.DB.prepare(`INSERT INTO families (id,name,parent_pin_hash,parent_pin_salt,parent_pin_iterations,created_at,updated_at)
    VALUES (?,?,?,?,100000,?,?)`).bind(familyId, "Synthetic Beacon QA Family", await hashSecret(login.parentPin, parentSalt), parentSalt, now, now).run();
  await env.DB.prepare(`INSERT INTO family_users
    (id,family_id,email,display_name,password_hash,password_salt,password_iterations,created_at,updated_at)
    VALUES (?,?,?,?,?,?,100000,?,?)`).bind(userId, familyId, login.email, "Synthetic QA Parent",
    await hashSecret(login.password, passwordSalt), passwordSalt, now, now).run();
  for (const child of children) {
    const salt = randomHex(16);
    const payload = { id: child.legacyId, name: child.name, stars: 0, attempts: [], trainingCompleted: {}, writingSamples: [],
      createdAt: now, createdByParent: true };
    await env.DB.prepare(`INSERT INTO child_profiles
      (id,family_id,legacy_profile_id,profile_name,payload_json,child_pin_hash,child_pin_salt,child_pin_iterations,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,100000,?,?)`).bind(child.id, familyId, child.legacyId, child.name, JSON.stringify(payload),
      await hashSecret(child.pin, salt), salt, now, now).run();
  }
  const session = await createSession(env, { id: userId, family_id: familyId }, children[0].id);
  const childCapability = randomHex(32);
  const parentCapability = randomHex(32);
  await env.DB.prepare(`UPDATE family_sessions SET child_capability_hash=?,child_capability_expires_at=?,
    parent_capability_hash=?,parent_unlocked_until=? WHERE id=?`).bind(await sha256(childCapability), expires,
    await sha256(parentCapability), expires, await sha256(session.token)).run();
  return { familyId, childId: children[0].id, legacyId: children[0].legacyId, children, login, childCapability, parentCapability,
    sessionStorage: { brightQuestChildCapability: childCapability },
    cookie: { name: "bq_session", value: session.token, httpOnly: true, secure: false, sameSite: "Strict",
      expires: Math.floor(session.expires.getTime() / 1000) },
    notes: "Do not inject parent capability before portal boot: the real portal intentionally locks it. Open Parent Cockpit using the synthetic parent PIN." };
}

async function serveStatic(root, url, incoming, outgoing) {
  if (!["GET", "HEAD"].includes(incoming.method)) return sendJson(outgoing, 405, { error: "Method not allowed" });
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return sendJson(outgoing, 400, { error: "Invalid path" }); }
  const segments = pathname.split(/[\\/]+/).filter(Boolean);
  if (segments.some((part) => part.startsWith(".") || part.includes(":"))
    || ["tools", "functions", "migrations", "node_modules"].includes(segments[0]?.toLowerCase())) {
    return sendJson(outgoing, 404, { error: "Not found" });
  }
  let path = resolve(root, ...segments);
  if (!inside(root, path)) return sendJson(outgoing, 404, { error: "Not found" });
  let info;
  try {
    info = await stat(path);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        outgoing.writeHead(302, { location: `${url.pathname}/${url.search}` });
        outgoing.end();
        return;
      }
      path = join(path, "index.html");
      info = await stat(path);
    }
    path = await realpath(path);
  } catch { return sendJson(outgoing, 404, { error: "Not found" }); }
  if (!inside(root, path) || !info.isFile() || !MIME.has(extname(path).toLowerCase())) return sendJson(outgoing, 404, { error: "Not found" });
  const headers = { "content-type": MIME.get(extname(path).toLowerCase()), "accept-ranges": "bytes" };
  let start = 0;
  let end = info.size - 1;
  let status = 200;
  if (incoming.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(incoming.headers.range);
    if (!match || (!match[1] && !match[2])) return sendJson(outgoing, 416, { error: "Invalid byte range" });
    start = match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]));
    end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
    if (start > end || start >= info.size) return sendJson(outgoing, 416, { error: "Range outside file" });
    headers["content-range"] = `bytes ${start}-${end}/${info.size}`;
    status = 206;
  }
  outgoing.writeHead(status, { ...headers, "content-length": info.size === 0 ? 0 : end - start + 1 });
  if (incoming.method === "HEAD" || info.size === 0) outgoing.end();
  else await pipeline(createReadStream(path, { start, end }), outgoing);
}

function inside(root, path) { return path === root || path.startsWith(`${root}${sep}`); }

function sendJson(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function selfTest() {
  const harness = await startBeaconQa({ port: 0 });
  const { origin, fixture } = harness;
  try {
    const childHeaders = { cookie: `bq_session=${fixture.cookie.value}`, "x-bq-child-capability": fixture.childCapability,
      "x-bq-child-id": fixture.childId, "content-type": "application/json" };
    const get = (path, headers = {}) => fetch(`${origin}${path}`, { headers });
    assert.equal((await get("/api/beacon-brigade")).status, 401);
    assert.equal((await get("/__beacon-qa__/fixture")).status, 403);
    const retrieved = await (await get("/__beacon-qa__/fixture", { "x-bq-qa-control": harness.controlToken })).json();
    assert.equal(retrieved.childId, fixture.childId);
    const foreignHostStatus = await new Promise((resolveStatus, reject) => {
      const request = httpRequest(`${origin}/__beacon-qa__/health`, { headers: { host: "example.invalid" } }, (response) => {
        response.resume();
        resolveStatus(response.statusCode);
      });
      request.on("error", reject);
      request.end();
    });
    assert.equal(foreignHostStatus, 403);
    assert.equal((await get("/__beacon-qa__/health", { origin: "https://example.invalid" })).status, 403);
    for (const path of ["/", "/beacon-brigade/", "/beacon-brigade/content.js"]) assert.equal((await get(path)).status, 200);
    for (const path of ["/.git/config", "/.env", "/tools/serve-beacon-qa.mjs", "/functions/_lib/family-auth.js"]) assert.equal((await get(path)).status, 404);
    assert.equal((await get("/beacon-brigade/content.js", { range: "bytes=0-19" })).status, 206);
    const session = await (await get("/api/auth/session", childHeaders)).json();
    assert.equal(session.authenticated, true);
    assert.equal(session.children.length, 2);
    assert.equal((await (await get("/api/profiles", childHeaders)).json()).profiles[0].childId, fixture.childId);
    let state = (await (await get("/api/beacon-brigade", childHeaders)).json()).state;
    const command = async (action) => {
      const response = await fetch(`${origin}/api/beacon-brigade`, { method: "POST", headers: childHeaders,
        body: JSON.stringify({ operationId: crypto.randomUUID(), version: state.version, action }) });
      assert.equal(response.status, 200);
      state = (await response.json()).state;
    };
    await command({ type: "start", regionId: "harbour" });
    const stationId = state.activeExpedition.stations[0].id;
    await command({ type: "answer", stationId, answer: 999 });
    await command({ type: "answer", stationId, answer: 15 });
    await command({ type: "end" });
    assert.equal(state.wallet.parts, 4);
    const reviewPath = `/api/beacon-brigade?childId=${fixture.legacyId}`;
    assert.equal((await get(reviewPath, childHeaders)).status, 403);
    const reviewed = await (await get(reviewPath, { ...childHeaders, "x-bq-parent-capability": fixture.parentCapability })).json();
    assert.equal(reviewed.state.history[0].stations[0].attempts[0].answer, 999);
    assert.equal(reviewed.state.history[0].stations[0].attempts[1].correct, true);
    assert.equal(reviewed.state.history[0].stations[1].question.answer, 383);
    const unlock = await fetch(`${origin}/api/auth/parent-unlock`, { method: "POST", headers: childHeaders,
      body: JSON.stringify({ pin: fixture.login.parentPin }) });
    assert.equal(unlock.status, 200);
    assert.ok(unlock.headers.get("set-cookie")?.includes("bq_session="));
    assert.ok((await unlock.json()).parentCapability);
    console.log("Beacon QA harness self-test passed: static assets, real auth/D1, marking, parent evidence, local-only guards.");
  } finally { await harness.close(); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--self-test")) await selfTest();
  else {
    const harness = await startBeaconQa({ port: Number(process.env.BQ_QA_PORT || 4191) });
    console.log(JSON.stringify({ url: `${harness.origin}/beacon-brigade/`, portal: `${harness.origin}/`,
      fixtureUrl: `${harness.origin}/__beacon-qa__/fixture`, controlHeader: "x-bq-qa-control", controlToken: harness.controlToken,
      parentPin: harness.fixture.login.parentPin, synthetic: true, persistence: "Ephemeral: stopping this process discards its synthetic data" }, null, 2));
    let stopping = false;
    const stop = async () => { if (stopping) return; stopping = true; await harness.close(); };
    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
  }
}
