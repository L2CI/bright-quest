import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { Miniflare } from "miniflare";
import { LOADOUTS, PROJECTS, getCampaign, getExpeditionCompletion } from "../beacon-brigade/campaign.js";
import { QUESTION_TEMPLATES, REGIONS, createQuestion } from "../beacon-brigade/content.js";
import { applyAction, createState, publicState } from "../functions/_lib/beacon-brigade.js";
import { onRequestGet, onRequestPost } from "../functions/api/beacon-brigade.js";
import { sha256 } from "../functions/_lib/family-auth.js";

function act(state, type, fields = {}) { return applyAction(state, { type, ...fields }); }
function solve(state, mode = "independent") {
  for (const station of state.activeExpedition.stations) {
    const stationId = station.id;
    const wrong = station.question.type === "choice"
      ? station.question.options.find((option) => option.id !== station.question.answer).id
      : station.question.answer + 1;
    if (mode !== "independent") state = act(state, "answer", { stationId, answer: wrong });
    if (["hinted", "assisted"].includes(mode)) state = act(state, "hint", { stationId });
    if (mode === "assisted") {
      state = act(state, "answer", { stationId, answer: wrong });
      state = act(state, "hint", { stationId });
    }
    state = act(state, "answer", { stationId, answer: station.question.answer });
  }
  return state;
}
function complete(state, regionId, mode) {
  return act(solve(act(state, "start", { regionId }), mode), "finish");
}
function funded() {
  let state = createState();
  for (const region of REGIONS) state = complete(state, region.id);
  return complete(state, "harbour");
}
function fails(state, action, code, status = 409) {
  const before = structuredClone(state);
  assert.throws(() => applyAction(state, action), (error) => error.code === code && error.status === status);
  assert.deepEqual(state, before);
}

test("five repeat expeditions keep every station on topic and rotate variants within its template", () => {
  for (const region of REGIONS) {
    const templates = QUESTION_TEMPLATES.filter((item) => item.regionId === region.id);
    let state = createState();
    const seen = new Set();
    for (let run = 0; run < 5; run += 1) {
      const history = structuredClone(state.history);
      state = act(state, "start", { regionId: region.id });
      assert.deepEqual(state.history, history, "Existing expedition evidence is never rewritten");
      for (const [index, station] of state.activeExpedition.stations.entries()) {
        const expectedId = region.id === "harbour" ? ["harbour-crate-reserve",
          run % 2 ? "harbour-missing-supply" : "harbour-delivery-total", "harbour-equal-packs",
          "harbour-stock-left", "harbour-place-value"][index] : templates[index].id;
        const template = templates.find((item) => item.id === expectedId);
        const expectedVariant = (region.id === "harbour" && index === 1 ? Math.floor(run / 2) : run) % template.instances.length;
        assert.equal(station.name, region.stationNames[index]);
        assert.equal(station.question.templateId, expectedId, `${region.id}, run ${run}, ${station.name}`);
        assert.equal(station.question.variant, expectedVariant);
        assert.deepEqual(station.question, createQuestion(expectedId, expectedVariant));
        seen.add(station.question.id);
      }
      state = run % 2 ? act(solve(state), "finish") : act(state, "end");
    }
    // With the current two variants, all 12 maths questions still appear in five runs.
    if (templates.every((item) => item.instances.length === 2)) assert.equal(seen.size, templates.length * 2);
  }
});

test("campaign catalogues are frozen arrays with exact IDs and detached projections", () => {
  assert.deepEqual(LOADOUTS.map((item) => item.id), ["balanced", "survey", "hauler"]);
  assert.deepEqual(PROJECTS.map((item) => item.id), ["bridge", "observatory", "greenhouse"]);
  assert.throws(() => { PROJECTS[0].cost.parts = 0; }, TypeError);
  assert.throws(() => { LOADOUTS[1].cargoBonus = 100; }, TypeError);
  const state = createState();
  const before = structuredClone(state);
  const campaign = getCampaign(state);
  assert.equal(campaign.loadoutId, "balanced");
  assert.equal(campaign.stationRewardAmount, 4);
  assert.equal(campaign.canEquip, true);
  assert.deepEqual(campaign.projectsBuilt, []);
  assert.equal(campaign.maxStars, 15);
  assert.equal(campaign.totalStars, 0);
  campaign.loadout.cargoBonus = 99;
  campaign.projects[0].cost.parts = 0;
  assert.equal(getCampaign(state).projects[0].cost.parts, 16);
  assert.deepEqual(state, before);
});

test("loadout speed/cargo tradeoffs and every support path preserve advertised payouts", () => {
  for (const [loadoutId, speed, amount] of [["balanced", 1, 4], ["survey", 1.2, 3], ["hauler", 0.85, 5]]) {
    for (const regionId of ["harbour", "physics"]) {
      for (const mode of ["independent", "corrected", "hinted", "assisted"]) {
        let state = act(createState(), "equip", { loadoutId });
        state = act(state, "start", { regionId });
        assert.equal(getCampaign(state).canEquip, false);
        assert.equal(state.activeExpedition.loadout.id, loadoutId);
        assert.equal(state.activeExpedition.loadoutId, loadoutId);
        assert.equal(state.activeExpedition.modifiers.travelSpeedMultiplier, speed);
        assert.ok(state.activeExpedition.stations.every((station) => station.reward.amount === amount));
        state = solve(state, mode);
        const station = state.activeExpedition.stations[0];
        assert.deepEqual(act(state, "answer", { stationId: station.id, answer: station.question.answer }), state);
        const resource = state.activeExpedition.resource;
        state = act(state, "finish");
        assert.equal(state.wallet[resource], amount * 5);
        assert.equal(state.history[0].earned[resource], amount * 5);
        assert.equal(state.history[0].loadout.id, loadoutId);
        assert.equal(state.history[0].loadoutId, loadoutId);
        assert.equal(getCampaign(state).achievements[0].unlocked, true);
        assert.equal(getCampaign(state).completedDistricts.includes(regionId), true);
      }
    }
  }
});

test("equip and project actions reject malformed IDs, unknown IDs and spoofed authority", () => {
  for (const [type, field, valid, code] of [["equip", "loadoutId", "survey", "INVALID_LOADOUT"],
    ["project", "projectId", "bridge", "INVALID_PROJECT"]]) {
    const state = createState();
    for (const value of [null, 7, [], {}, true]) fails(state, { type, [field]: value }, "INVALID_ACTION", 400);
    fails(state, { type }, "INVALID_ACTION", 400);
    for (const value of ["", "__proto__", "constructor", "missing"]) fails(state, { type, [field]: value }, code, 400);
    for (const extra of [{ cost: { parts: 0, cores: 0 } }, { reward: 100 }, { abilities: { cargoBonus: 100 } },
      { campaign: {} }, { stars: 3 }, { travelSpeedMultiplier: 50 }, { built: true }]) {
      fails(state, { type, [field]: valid, ...extra }, "INVALID_ACTION", 400);
    }
  }
  const active = act(createState(), "start", { regionId: "harbour" });
  for (const { id } of LOADOUTS) fails(active, { type: "equip", loadoutId: id }, "EXPEDITION_ACTIVE");
  fails(createState(), { type: "start", regionId: "harbour", loadoutId: "hauler" }, "INVALID_ACTION", 400);
  fails(createState(), { type: "start", regionId: "harbour", reward: 100 }, "INVALID_ACTION", 400);
});

test("projects require completed districts, never ended or still-active expeditions", () => {
  let state = createState();
  state.wallet = { parts: 100, cores: 100 };
  fails(state, { type: "project", projectId: "bridge" }, "PROJECT_LOCKED");
  state = solve(act(state, "start", { regionId: "harbour" }), "assisted");
  fails(state, { type: "project", projectId: "bridge" }, "PROJECT_LOCKED");
  state = act(state, "end");
  fails(state, { type: "project", projectId: "bridge" }, "PROJECT_LOCKED");
  state = complete(state, "harbour", "assisted");
  const project = getCampaign(state).projects[0];
  assert.equal(project.canBuild, true);
  assert.deepEqual(project.missingDistricts, []);
  state = act(state, "project", { projectId: "bridge" });
  assert.deepEqual(getCampaign(state).projectsBuilt, ["bridge"]);
});

test("the bridge is attainable after the first default harbour expedition with support", () => {
  let state = complete(createState(), "harbour", "assisted");
  assert.deepEqual(state.wallet, { parts: 20, cores: 0 });
  assert.equal(getCampaign(state).projects[0].canBuild, true);
  state = act(state, "project", { projectId: "bridge" });
  assert.deepEqual(state.wallet, { parts: 4, cores: 0 });
  assert.equal(getCampaign(state).bonuses.travelSpeedBonus, 0.08);
  assert.equal(getCampaign(state).stationRewardAmount, 4);
});

test("project debits are exact, atomic, recorded once and cannot overspend either currency", () => {
  let state = funded();
  const wallet = { ...state.wallet };
  for (const project of PROJECTS) {
    for (const resource of ["parts", "cores"]) {
      if (project.cost[resource] === 0) continue;
      const poor = structuredClone(state);
      poor.wallet[resource] = project.cost[resource] - 1;
      assert.equal(getCampaign(poor).projects.find((item) => item.id === project.id).affordable, false);
      fails(poor, { type: "project", projectId: project.id }, "INSUFFICIENT_RESOURCES");
    }
    const version = state.version + 1;
    state = act(state, "project", { projectId: project.id, at: "2026-09-05T00:00:00Z" });
    wallet.parts -= project.cost.parts;
    wallet.cores -= project.cost.cores;
    assert.deepEqual(state.wallet, wallet);
    assert.deepEqual(state.campaign.projects.at(-1), { projectId: project.id, cost: project.cost,
      at: "2026-09-05T00:00:00Z", version });
    fails(state, { type: "project", projectId: project.id }, "PROJECT_BUILT");
    assert.equal(getCampaign(state).projects.find((item) => item.id === project.id).canBuild, false);
  }
  assert.deepEqual(state.wallet, { parts: 4, cores: 20 });
  assert.deepEqual(getCampaign(state).bonuses, { travelSpeedBonus: 0.15, cargoBonus: 1 });
});

test("building during an expedition cannot change its reward or movement snapshots", () => {
  let state = act(funded(), "equip", { loadoutId: "survey" });
  state = act(state, "start", { regionId: "harbour" });
  const expedition = structuredClone(state.activeExpedition);
  for (const project of PROJECTS) state = act(state, "project", { projectId: project.id });
  assert.deepEqual(state.activeExpedition, expedition);
  const beforeWallet = state.wallet.parts;
  state = act(solve(state, "assisted"), "finish");
  assert.equal(state.wallet.parts, beforeWallet + 15);
  state = act(state, "start", { regionId: "harbour" });
  assert.equal(state.activeExpedition.modifiers.travelSpeedMultiplier, 1.2 * 1.15);
  assert.equal(state.activeExpedition.modifiers.cargoBonus, 0);
  assert.ok(state.activeExpedition.stations.every((station) => station.reward.amount === 4));
  assert.equal(state.history.at(-1).modifiers.travelSpeedMultiplier, 1.2);
});

test("stars describe completion evidence, never gate district completion or award resources", () => {
  for (const [mode, stars, counts] of [["independent", 3, [5, 0, 0]], ["corrected", 2, [0, 5, 0]],
    ["hinted", 1, [0, 0, 5]], ["assisted", 1, [0, 0, 5]]]) {
    const state = complete(createState(), "harbour", mode);
    const completion = getCampaign(state).completions[0];
    assert.equal(completion.stars, stars);
    assert.deepEqual([completion.independent, completion.corrected, completion.supported], counts);
    assert.deepEqual(state.history[0].completion, completion);
    assert.equal(state.wallet.parts, 20);
    assert.equal(getCampaign(state).objectives[0].completed, true);
    const ended = act(solve(act(createState(), "start", { regionId: "harbour" }), mode), "end");
    assert.equal(getCampaign(ended).completions[0].stars, 0);
    assert.equal(ended.wallet.parts, 20);
  }
  let state = complete(createState(), "harbour");
  state = complete(state, "harbour", "assisted");
  assert.equal(getCampaign(state).totalStars, 3);
  assert.equal(getCampaign(state).objectives[0].completions, 2);
  const incomplete = { status: "completed", stations: [{ resolved: false }] };
  assert.equal(getExpeditionCompletion(incomplete).stars, 0);
  assert.equal(getExpeditionCompletion({ status: "completed", stations: [] }).stars, 0);
});

test("achievements derive from saved history, retain partial work and ignore cached claims", () => {
  let state = funded();
  for (let i = 0; i < 4; i += 1) state = complete(state, "grove", "assisted");
  assert.ok(getCampaign(state).achievements.every((item) => item.unlocked));
  assert.equal(getCampaign(state).achievements.find((item) => item.id === "steady-crew").progress, 10);
  assert.equal(getCampaign(state).totalStars, 15);
  const partial = act(solve(act(createState(), "start", { regionId: "harbour" }), "assisted"), "end");
  assert.equal(getCampaign(partial).achievements.find((item) => item.id === "fieldwork").progress, 5);
  assert.equal(getCampaign(partial).achievements[0].unlocked, false);
  partial.campaignProgress = getCampaign(state);
  partial.history[0].completion = { stars: 3, completed: true };
  assert.equal(getCampaign(partial).totalStars, 0);
  assert.equal(getCampaign(partial).achievements[0].unlocked, false);
});

test("resolvedStations and totalResolved include active, supported and ended work without double counting", () => {
  function check(state, expected) {
    const campaign = getCampaign(state);
    assert.equal(campaign.totalResolved, expected);
    assert.equal(campaign.resolvedStations, expected);
    assert.equal(publicState(state).campaignProgress.resolvedStations, expected);
  }
  let state = createState();
  check(state, 0);
  state = act(state, "start", { regionId: "harbour" });
  const station = state.activeExpedition.stations[0];
  state = act(state, "answer", { stationId: station.id, answer: station.question.answer + 1 });
  check(state, 0);
  state = act(state, "hint", { stationId: station.id });
  state = act(state, "answer", { stationId: station.id, answer: station.question.answer });
  check(state, 1);
  state = act(state, "end");
  check(state, 1);
  state = complete(state, "english", "assisted");
  state = solve(act(state, "start", { regionId: "physics" }), "assisted");
  check(state, 11);
  state = act(state, "finish");
  check(state, 11);
});

test("old saves and in-flight rewards survive JSON reload, projection, equip and project writes", () => {
  let state = funded();
  delete state.campaign;
  for (const expedition of state.history) {
    for (const key of ["loadoutId", "loadout", "campaignBonuses", "modifiers", "completion"]) delete expedition[key];
  }
  const old = JSON.parse(JSON.stringify(state));
  assert.equal(getCampaign(old).loadoutId, "balanced");
  assert.equal(getCampaign(old).totalStars, 15);
  state = act(old, "project", { projectId: "bridge" });
  assert.equal(state.campaign.loadoutId, "balanced");
  assert.deepEqual(state.history, old.history);
  state = act(old, "equip", { loadoutId: "hauler" });
  assert.deepEqual(state.campaign.projects, []);
  let active = act(old, "start", { regionId: "harbour" });
  delete active.campaign;
  for (const key of ["loadoutId", "loadout", "campaignBonuses", "modifiers"]) delete active.activeExpedition[key];
  active = act(JSON.parse(JSON.stringify(active)), "project", { projectId: "observatory" });
  const before = active.wallet.parts;
  active = act(solve(active, "assisted"), "finish");
  assert.equal(active.wallet.parts, before + 20);
  assert.equal(active.history.at(-1).loadout, undefined);
  assert.equal(active.history.at(-1).loadoutId, undefined);
  assert.equal(publicState(active).campaignProgress.projectsBuilt[0], "observatory");
  assert.equal(old.campaign, undefined);
});

test("public campaign projection is pure, detached, answer-free and consistent with redacted state", () => {
  const state = act(funded(), "start", { regionId: "chemistry" });
  const before = structuredClone(state);
  const projected = publicState(state);
  assert.deepEqual(projected.campaignProgress, getCampaign(projected));
  for (const key of ["answer", "explanation", "hint", "wrongFeedback", "question"]) {
    assert.ok(!JSON.stringify(projected.campaignProgress).includes(`"${key}":`));
  }
  assert.equal(projected.activeExpedition.stations[0].question.answer, undefined);
  projected.campaignProgress.loadout.cargoBonus = 100;
  projected.activeExpedition.loadout.cargoBonus = 100;
  assert.deepEqual(state, before);
});

test("reset clears every campaign purchase, loadout, star and achievement without changing schema", () => {
  let state = act(funded(), "project", { projectId: "observatory" });
  state = act(state, "equip", { loadoutId: "hauler" });
  state = act(state, "start", { regionId: "harbour" });
  const fresh = act(state, "reset");
  assert.deepEqual(fresh, { ...createState({ profileId: state.profileId }), version: state.version + 1 });
  assert.deepEqual(getCampaign(fresh).projectsBuilt, []);
  assert.ok(getCampaign(fresh).achievements.every((item) => item.progress === 0 && !item.unlocked));
});

test("campaign actions persist in D1 with strict API validation, replay and single-debit concurrency", async () => {
  const mf = new Miniflare({ modules: true, script: 'export default { fetch() { return new Response("ok"); } }',
    compatibilityDate: "2026-05-14", d1Databases: ["DB"] });
  try {
    const db = await mf.getD1Database("DB");
    const env = { DB: db, BQ_FAMILY_AUTH_ENABLED: "true", BQ_FAMILY_AUTH_MIGRATION_READY: "true" };
    for (const name of ["0001_bright_quest.sql", "0002_family_auth.sql", "0003_beacon_brigade.sql"]) {
      const sql = await readFile(new URL(`../migrations/${name}`, import.meta.url), "utf8");
      await db.exec(sql.replace(/--[^\r\n]*/g, "").replace(/\r?\n/g, " "));
    }
    const now = new Date().toISOString();
    const future = new Date(Date.now() + 3600000).toISOString();
    await db.prepare("INSERT INTO families (id,name,created_at,updated_at) VALUES ('family','Test',?,?)").bind(now, now).run();
    await db.prepare(`INSERT INTO family_users (id,family_id,email,display_name,password_hash,password_salt,password_iterations,created_at,updated_at)
      VALUES ('user','family','campaign@example.invalid','Test','unused','unused',100000,?,?)`).bind(now, now).run();
    await db.prepare(`INSERT INTO child_profiles (id,family_id,legacy_profile_id,profile_name,payload_json,created_at,updated_at)
      VALUES ('child','family','legacy','Test','{}',?,?)`).bind(now, now).run();
    await db.prepare(`INSERT INTO family_sessions
      (id,family_id,user_id,active_child_id,child_capability_hash,child_capability_expires_at,expires_at,created_at,last_seen_at)
      VALUES (?,'family','user','child',?,?,?,?,?)`).bind(await sha256("campaign-session"), await sha256("campaign-child"), future, future, now, now).run();
    const seed = funded();
    seed.profileId = "child";
    await db.prepare(`INSERT INTO beacon_brigade_states (family_id,child_id,version,state_json,created_at,updated_at)
      VALUES ('family','child',?,?,?,?)`).bind(seed.version, JSON.stringify(seed), now, now).run();
    const headers = { "content-type": "application/json", cookie: "bq_session=campaign-session",
      "x-bq-child-capability": "campaign-child", "x-bq-child-id": "child" };
    async function get() {
      const response = await onRequestGet({ env, request: new Request("https://beacon.test/api/beacon-brigade", { headers }) });
      assert.equal(response.status, 200);
      return (await response.json()).state;
    }
    async function post(body, requestEnv = env) {
      const response = await onRequestPost({ env: requestEnv, request: new Request("https://beacon.test/api/beacon-brigade", {
        method: "POST", headers, body: JSON.stringify(body)
      }) });
      return { status: response.status, body: await response.json() };
    }
    const equip = { operationId: "campaign-equip", version: seed.version, action: { type: "equip", loadoutId: "hauler" } };
    assert.equal((await post(equip)).status, 200);
    assert.equal((await post(equip)).body.state.version, seed.version + 1);
    let state = await get();
    assert.equal(state.campaignProgress.loadoutId, "hauler");
    for (const [i, action] of [{ type: "project", projectId: "bridge", cost: { parts: 0, cores: 0 } },
      { type: "equip", loadoutId: 123 }, { type: "project", projectId: "bridge", at: now }].entries()) {
      assert.equal((await post({ operationId: `invalid-campaign-${i}`, version: state.version, action })).status, 400);
    }
    assert.equal((await get()).version, state.version);
    let arrivals = 0;
    let release;
    const ready = new Promise((resolve) => { release = resolve; });
    const raceEnv = { ...env, DB: { prepare: db.prepare.bind(db), batch: async (statements) => {
      if (++arrivals === 2) release();
      await ready;
      return db.batch(statements);
    } } };
    const requests = ["campaign-build-one", "campaign-build-two"].map((operationId) => ({ operationId,
      version: state.version, action: { type: "project", projectId: "observatory" } }));
    const results = await Promise.all(requests.map((request) => post(request, raceEnv)));
    assert.deepEqual(results.map((result) => result.status).sort(), [200, 409]);
    const winner = requests[results.findIndex((result) => result.status === 200)];
    state = await get();
    assert.deepEqual(state.wallet, { parts: seed.wallet.parts - 24, cores: seed.wallet.cores - 16 });
    assert.equal(state.campaign.projects.length, 1);
    assert.deepEqual((await post(winner)).body.state.wallet, state.wallet);
    assert.equal((await post({ operationId: "campaign-rebuild", version: state.version,
      action: { type: "project", projectId: "observatory" } })).body.code, "PROJECT_BUILT");
    let result = await post({ operationId: "campaign-start", version: state.version, action: { type: "start", regionId: "harbour" } });
    assert.equal(result.status, 200);
    state = result.body.state;
    assert.equal(state.activeExpedition.loadoutId, "hauler");
    assert.equal(state.activeExpedition.modifiers.travelSpeedMultiplier, 0.85);
    assert.ok(state.activeExpedition.stations.every((station) => station.reward.amount === 6 && station.question.answer === undefined));
    assert.equal((await post({ operationId: "campaign-active-equip", version: state.version,
      action: { type: "equip", loadoutId: "survey" } })).body.code, "EXPEDITION_ACTIVE");
    result = await post({ operationId: "campaign-reset", version: state.version, action: { type: "reset" } });
    assert.equal(result.status, 200);
    assert.deepEqual((await get()).campaign, { loadoutId: "balanced", projects: [] });
  } finally {
    await mf.dispose();
  }
});
