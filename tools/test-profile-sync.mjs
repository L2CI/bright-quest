import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { test, after } from "node:test";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const copy = (value) => JSON.parse(JSON.stringify(value));
const functions = ["pullCloudProfiles", "syncProfileToCloud", "saveCloudProfileSnapshot", "mergeCloudProfile", "mergeSavedRecords", "draftSavedAt", "draftHasCompletedAttempt", "mergeChemistryCourseProgress", "mergePhysicsCourseProgress", "mergePhysicsChapterProgress", "newestPhysicsTest", "mergePhysicsReleasedChapters", "mergeTrainingProgress", "latestProfileDate"];
const report = { sourceSha256: createHash("sha256").update(source).digest("hex"), checks: [] };
const verify = (name, fn) => test(name, async () => { try { await fn(); report.checks.push({ name, passed: true }); } catch (error) { report.checks.push({ name, passed: false, detail: error.message }); throw error; } });
function fixture(profile) {
  const state = { profiles: { [profile.id]: copy(profile) }, profileId: profile.id };
  state.profile = state.profiles[profile.id];
  const saves = []; const notices = [];
  const context = { state, JSON, Date, Math, Number, String, Map, Set, Promise, apiBase: "/api", profileSyncQueues: new Map(),
    screens: { dashboard: { classList: { contains: () => true } }, parent: { classList: { contains: () => true } } },
    saveProfiles: () => saves.push(copy(state.profiles)), showToast: (message) => notices.push(message), renderDashboard() {}, renderParentDashboard() {} };
  context.window = context; vm.createContext(context);
  for (const name of functions) {
    const match = new RegExp(`^(?:async )?function ${name}\\(`, "m").exec(source);
    assert.ok(match, `Function ${name} exists`);
    const end = source.indexOf("\n}", match.index);
    vm.runInContext(source.slice(match.index, end + 2), context, { filename: `app.js:${name}` });
  }
  return { context, state, saves, notices };
}
const startedAt = Date.parse("2026-09-28T00:00:00Z");
const initial = () => ({ id: "synthetic-child", name: "Alex", stars: 11, cloudVersion: 7, createdAt: "2026-01-01", cloudSyncedAt: "2026-09-27T00:00:00Z",
  attempts: [{ id: "old-attempt", level: 2, date: "2026-09-01", percent: 55, questionStats: [{ id: "old-question", prompt: "Original old prompt", selectedText: "Old response" }] }],
  writingSamples: [], icasAttempts: [{ id: "icas-old", percent: 75 }], trainingCompleted: {},
  activeDraft: { id: "draft-one", level: 1, startedAtMs: startedAt, lastSavedAt: "2026-09-28T00:01:00Z", activeQuestion: 26, answers: [{ selected: 0, writing: "" }, { selected: null, writing: "Original full writing" }], remainingSeconds: 1470 },
  originalExtra: { retained: true } });
const completion = () => ({ id: "new-attempt", level: 1, date: "2026-09-28T00:02:00Z", percent: 4, correct: 1, total: 26,
  questionStats: [{ id: "q1", correct: true, selected: 0, selectedText: "First choice", prompt: "Original full prompt" }, { id: "q-writing", format: "writing", answerText: "Original full writing" }] });
const ok = (body) => ({ ok: true, status: 200, json: async () => body });
function finishLocally(f) { delete f.state.profile.activeDraft; f.state.profile.attempts.push(completion()); f.state.profile.writingSamples.push({ date: "2026-09-28T00:02:00Z", level: 1, prompt: "Original writing prompt", response: "Original full writing" }); f.state.profile.stars += 3; }

verify("A newer cloud draft cannot overwrite a completed local attempt, writing or earned stars", () => {
  const f = fixture(initial()); const remote = initial(); const remoteBefore = copy(remote); finishLocally(f); const before = copy(f.state.profile);
  const merged = f.context.mergeCloudProfile(f.state.profile, remote, true);
  assert.equal(merged.attempts.length, 2); assert.equal(merged.attempts[1].questionStats[0].selected, 0);
  assert.equal(merged.writingSamples[0].response, "Original full writing"); assert.equal(merged.stars, 14); assert.equal(merged.activeDraft, undefined);
  assert.deepEqual(copy(f.state.profile), before); assert.deepEqual(remote, remoteBefore);
});

verify("A genuine retake draft newer than the completed attempt remains resumable", () => {
  const f = fixture(initial()); finishLocally(f); const remote = initial();
  remote.activeDraft = { ...remote.activeDraft, id: "new-retake", startedAtMs: startedAt + 180000, lastSavedAt: "2026-09-28T00:04:00Z", answers: [{ selected: 0, writing: "Retake response" }] };
  const merged = f.context.mergeCloudProfile(f.state.profile, remote, true);
  assert.equal(merged.activeDraft.id, "new-retake"); assert.equal(merged.activeDraft.answers[0].selected, 0); assert.equal(merged.attempts.length, 2);
});

verify("Independent cloud/local records and science chapters are retained without recalculating scores", () => {
  const f = fixture(initial()); finishLocally(f); const remote = initial();
  remote.attempts.push({ id: "other-device-attempt", level: 3, date: "2026-09-27", percent: 63 });
  remote.writingSamples.push({ id: "remote-writing", response: "Other device full writing" });
  remote.icasAttempts.push({ id: "icas-remote", percent: 39 }); remote.remoteExtra = { retained: true };
  remote.chemistry101Progress = { chapters: { "remote-chapter": { watchedSeconds: 90, completed: true, test: { score: 3, submittedAt: "2026-09-01" } } } };
  f.state.profile.chemistry101Progress = { chapters: { "local-chapter": { watchedSeconds: 180, completed: true, test: { score: 4, submittedAt: "2026-09-02" } } } };
  const merged = f.context.mergeCloudProfile(f.state.profile, remote, true);
  assert.deepEqual(copy(merged.attempts.map((item) => item.id)), ["old-attempt", "other-device-attempt", "new-attempt"]);
  assert.equal(merged.attempts.find((item) => item.id === "other-device-attempt").percent, 63);
  assert.equal(merged.writingSamples.length, 2); assert.equal(merged.icasAttempts.length, 2);
  assert.equal(Object.keys(merged.chemistry101Progress.chapters).length, 2); assert.equal(merged.originalExtra.retained, true); assert.equal(merged.remoteExtra.retained, true);
});

verify("Overlapping autosave and completion writes serialize and carry the latest version and completed data", async () => {
  const f = fixture(initial()); const posts = []; let finishFirst;
  f.context.fetch = async (_url, options) => {
    const payload = JSON.parse(options.body).profile; posts.push({ payload, keepalive: options.keepalive });
    if (posts.length === 1) return new Promise((resolve) => { finishFirst = () => resolve(ok({ version: 8, syncedAt: "2026-09-28T00:01:00Z" })); });
    assert.equal(payload.cloudVersion, 8); return ok({ version: 9, syncedAt: "2026-09-28T00:02:01Z" });
  };
  const autosave = f.context.syncProfileToCloud(); await Promise.resolve(); await Promise.resolve();
  assert.equal(posts.length, 1); finishLocally(f);
  const completionSave = f.context.syncProfileToCloud(f.state.profile, true, { keepalive: true }); await Promise.resolve();
  assert.equal(posts.length, 1, "Second request waits for the first request's version");
  finishFirst(); assert.equal(await autosave, true); assert.equal(await completionSave, true);
  assert.equal(posts.length, 2); assert.equal(posts[1].payload.attempts.length, 2); assert.equal(posts[1].payload.activeDraft, undefined); assert.equal(posts[1].keepalive, true);
  assert.equal(f.state.profile.stars, 14); assert.equal(f.state.profile.activeDraft, undefined); assert.equal(f.state.profile.cloudVersion, 9);
});

verify("A409 retry merges the older cloud snapshot and saves completed local work without a draft resurrection", async () => {
  const f = fixture(initial()); const cloud = initial(); finishLocally(f); const calls = []; let posts = 0;
  f.context.fetch = async (_url, options) => {
    calls.push(options.method || "GET");
    if (options.method === "POST") {
      posts += 1; const payload = JSON.parse(options.body).profile;
      if (posts === 1) return { ok: false, status: 409 };
      assert.equal(payload.cloudVersion, 8); assert.equal(payload.attempts.length, 2); assert.equal(payload.activeDraft, undefined); assert.equal(payload.stars, 14);
      assert.equal(payload.writingSamples[0].response, "Original full writing"); return ok({ version: 9, syncedAt: "2026-09-28T00:03:00Z" });
    }
    return ok({ profiles: [{ payload: cloud, version: 8, updatedAt: "2026-09-28T00:02:30Z" }] });
  };
  assert.equal(await f.context.syncProfileToCloud(), true);
  assert.deepEqual(calls, ["POST", "GET", "POST"]); assert.equal(f.state.profile.attempts.length, 2); assert.equal(f.state.profile.activeDraft, undefined); assert.equal(f.state.profile.stars, 14);
});

verify("Repeated conflict stops retrying and keeps full local work rather than claiming a successful save", async () => {
  const f = fixture(initial()); const cloud = initial(); finishLocally(f); let posts = 0;
  f.context.fetch = async (_url, options) => options.method === "POST" ? (posts += 1, { ok: false, status: 409 }) : ok({ profiles: [{ payload: cloud, version: 8, updatedAt: "2026-09-28T00:02:30Z" }] });
  assert.equal(await f.context.syncProfileToCloud(), false); assert.equal(posts, 2);
  assert.equal(f.state.profile.attempts.length, 2); assert.equal(f.state.profile.activeDraft, undefined); assert.equal(f.state.profile.stars, 14);
  assert.ok(f.notices.some((message) => message.includes("saved on this device")));
});

verify("Logout while a save is in flight cannot restore cleared profiles or send the queued snapshot", async () => {
  const f = fixture(initial()); let release; let posts = 0;
  f.context.fetch = async () => { posts += 1; return new Promise((resolve) => { release = () => resolve(ok({ version: 8 })); }); };
  const first = f.context.syncProfileToCloud(); await Promise.resolve(); await Promise.resolve();
  const second = f.context.syncProfileToCloud();
  f.state.profiles = {}; f.state.profile = null; f.state.profileId = "";
  release(); assert.equal(await first, false); assert.equal(await second, false);
  assert.equal(posts, 1); assert.deepEqual(f.state.profiles, {}); assert.equal(f.state.profile, null); assert.equal(f.saves.length, 0);
});

verify("An old response cannot merge into a newly authorised session with a matching legacy profile ID", async () => {
  const f = fixture(initial()); let release;
  f.context.fetch = async () => new Promise((resolve) => { release = () => resolve(ok({ version: 8 })); });
  const pending = f.context.syncProfileToCloud(); await Promise.resolve(); await Promise.resolve();
  const newProfile = { id: initial().id, name: "Different authorised family", stars: 0, attempts: [], writingSamples: [] };
  f.state.profiles = { [newProfile.id]: newProfile }; f.state.profile = newProfile;
  release(); assert.equal(await pending, false); assert.deepEqual(f.state.profile, newProfile); assert.equal(f.saves.length, 0);
});

verify("A cloud read started before logout cannot repopulate the cleared profile map", async () => {
  const f = fixture(initial()); let release;
  f.context.fetch = async () => new Promise((resolve) => { release = () => resolve(ok({ profiles: [{ payload: initial(), version: 8 }] })); });
  const pending = f.context.pullCloudProfiles();
  f.state.profiles = {}; f.state.profile = null; f.state.profileId = "";
  release(); await pending; assert.deepEqual(f.state.profiles, {}); assert.equal(f.saves.length, 0);
});

after(async () => { report.passed = report.checks.every((check) => check.passed); const out = new URL("../../outputs/brightquest-uplift-qa-2026-09-28/", import.meta.url); await mkdir(fileURLToPath(out), { recursive: true }); await writeFile(new URL("profile-sync-tests.json", out), JSON.stringify(report, null, 2)); });
