import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

// Controller logic only, with synthetic records and an in-memory DOM/network.
// Visual and real browser interaction checks are a separate release requirement.
const source = await readFile(new URL("../bright-quest-family-auth.js", import.meta.url), "utf8");
const token = "a7".repeat(32);
const fixtureProfile = { id: "synthetic-child", name: "Explorer", stars: 17, attempts: [{ id: "saved-attempt", percent: 60 }], activeDraft: { level: 1, answers: [{ selected: 0, writing: "Original draft text" }], remainingSeconds: 900 } };

class Element {
  constructor() {
    this.innerHTML = ""; this.textContent = ""; this.value = ""; this.dataset = {}; this.fields = {};
    this.queries = new Map(); this.listeners = new Map(); this.attributes = new Map(); this.children = [];
    const classes = new Set();
    this.classList = { add: (x) => classes.add(x), remove: (x) => classes.delete(x), contains: (x) => classes.has(x),
      toggle: (x, force) => { const on = force ?? !classes.has(x); on ? classes.add(x) : classes.delete(x); return on; } };
  }
  querySelector(key) { if (!this.queries.has(key)) this.queries.set(key, new Element()); return this.queries.get(key); }
  querySelectorAll() { return [...this.queries.values()]; }
  addEventListener(type, fn) { this.listeners.set(type, fn); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  removeAttribute(name) { this.attributes.delete(name); }
  append(...nodes) { this.children.push(...nodes); }
  remove() { this.removed = true; }
  focus() { this.focused = true; }
  reset() { this.fields = {}; for (const node of this.queries.values()) node.value = ""; }
  click() { if (!this.disabled) return this.listeners.get("click")?.({ currentTarget: this, target: this, preventDefault() {} }); }
}

async function fixture({ fragment = "", configured = true, passwordConfigured = true, startupConfig, startupSession, configFailure = false, sessionFailure = false, configWait, beforeReady } = {}) {
  const nodes = new Map();
  const node = (name) => { if (!nodes.has(name)) nodes.set(name, new Element()); return nodes.get(name); };
  const local = new Map([["brightQuestProfilesV2", JSON.stringify({ [fixtureProfile.id]: fixtureProfile })], ["brightQuestActiveProfile", fixtureProfile.id]]);
  const localBefore = [...local];
  const capabilities = new Map([["brightQuestParentCapability", "synthetic-parent"], ["brightQuestChildCapability", "synthetic-child"]]);
  const writes = [], calls = [], replacements = [], queued = [], renders = [], events = new Map();
  const state = { profiles: structuredClone({ [fixtureProfile.id]: fixtureProfile }), profile: structuredClone(fixtureProfile), profileId: fixtureProfile.id, parentProfileId: fixtureProfile.id, selectedRole: "parent" };
  const location = { origin: "https://example.invalid", pathname: "/", search: "", hash: fragment };
  const document = { querySelector: node, querySelectorAll: () => [], createElement: () => new Element(), body: new Element() };
  document.body.classList.add("bq-app-opening");
  const screens = { test: node("#testScreen"), parent: node("#parentScreen"), dashboard: node("#dashboardScreen") };
  screens.test.classList.add("hidden");
  const context = {
    document, location, state, screens, URL, JSON, Number, String, Object, Array, RegExp,
    FormData: class { constructor(form) { this.form = form; } get(name) { return this.form.fields[name] ?? ""; } },
    localStorage: { getItem: (key) => local.get(key) ?? null, setItem: (key, value) => { writes.push([key, value]); local.set(key, value); }, removeItem: (key) => { writes.push([key]); local.delete(key); } },
    sessionStorage: { getItem: (key) => capabilities.get(key) ?? null, setItem: (key, value) => capabilities.set(key, value), removeItem: (key) => capabilities.delete(key) },
    history: { state: { route: "saved-route" }, replaceState(stateValue, _title, url) { replacements.push({ state: stateValue, url }); location.hash = new URL(url, location.origin).hash; } },
    switchProfileButton: node("#switchProfileButton"), parentExitButton: node("#parentExitButton"), storageKey: "brightQuestProfilesV2",
    addEventListener(name, fn) { events.set(name, fn); }, requestAnimationFrame(fn) { fn(); }, scrollTo() {}, renderDashboard() { renders.push({ opening: document.body.classList.contains("bq-app-opening"), profileId: state.profileId }); }, renderParentDashboard() {}, showScreen() {}, showToast() {}, normalizeProfiles() {}, saveProfiles() {},
    escapeHtml: (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;"),
    fetch: async (url, options = {}) => {
      calls.push({ url, method: options.method || "GET", body: options.body, fragment: location.hash, opening: document.body.classList.contains("bq-app-opening") });
      if (url === "/api/auth/config") {
        if (configWait) await configWait;
        if (configFailure) throw new Error("Synthetic unavailable configuration");
        return { ok: true, json: async () => startupConfig ?? { enabled: Boolean(fragment), parentPinRecoveryEnabled: configured, familyPasswordRecoveryEnabled: passwordConfigured, experienceUpliftEnabled: true } };
      }
      if (url === "/api/auth/session" && sessionFailure) throw new Error("Synthetic unavailable session");
      if (url === "/api/auth/session" && startupSession) return { ok: true, json: async () => startupSession };
      const response = queued.shift();
      assert.ok(response, `Unexpected synthetic request ${url}`);
      assert.equal(url, response.url);
      response.onRequest?.();
      if (response.wait) await response.wait;
      return { ok: response.ok !== false, json: async () => response.body };
    }
  };
  context.window = context;
  vm.createContext(context);
  const hooks = `\nwindow.__ui = {openParentPinRecovery, requestParentPinRecovery, confirmParentPinReset, openFamilyPasswordRecovery, requestFamilyPasswordRecovery, confirmFamilyPasswordReset, bindActiveSession(value) { session=value; hydratedFamilyId=value.family.id; hydratedChildren=Object.fromEntries(value.children.map(child => [child.id,child.payload.id])); }, setSession(value) { session=value; controller.enabled=true; controller.parentPinRecoveryEnabled=${configured}; controller.familyPasswordRecoveryEnabled=${passwordConfigured}; }};\n`;
  const executable = source.replace("  initialise();", "  window.__ready = initialise();").replace(/\}\)\(\);\s*$/, hooks + "})();");
  vm.runInContext(executable, context, { filename: "bright-quest-family-auth.js" });
  // Capture this before waiting for async configuration to finish.
  const immediateFragment = location.hash;
  beforeReady?.(context);
  await context.__ready;
  const startupView = { enabled: context.BrightQuestFamilyAuth.enabled, profileId: state.profileId, authView: node("#familyAuthScreen").dataset.authView };
  context.__ui.setSession({ authenticated: true, parentUnlocked: false, children: [{ id: fixtureProfile.id, name: "Explorer" }] });
  return { context, nodes, node, state, local, localBefore, capabilities, writes, calls, queued, replacements, immediateFragment, renders, startupView,
    dispatch(name) { return events.get(name)?.(); },
    next: node("#familyNextStep"), message: node("#familyAuthMessage"),
    assertLearnerStorage() { assert.deepEqual([...local], localBefore); assert.equal(writes.length, 0); },
    form(fields) { const form = new Element(); form.fields = fields; return { form, event: { currentTarget: form, preventDefault() {} } }; }
  };
}

test("Initial access remains gated until config resolves, then feature-disabled legacy content renders before release", async () => {
  let release;
  const configWait = new Promise((resolve) => { release = resolve; });
  const f = await fixture({ configWait, startupConfig: { enabled: false, experienceUpliftEnabled: false }, beforeReady(context) {
    assert.equal(context.document.body.classList.contains("bq-app-opening"), true); release();
  } });
  assert.equal(f.startupView.enabled, false); assert.equal(f.renders.length, 1); assert.equal(f.renders[0].opening, true);
  assert.equal(f.context.document.body.classList.contains("bq-app-opening"), false);
  assert.equal(f.context.document.body.classList.contains("bq-experience-uplift"), false);
  assert.equal(f.calls.length, 1); f.assertLearnerStorage();
});

test("Unavailable configuration releases the initial gate to the existing fallback without changing saved learning", async () => {
  const f = await fixture({ configFailure: true });
  assert.equal(f.renders.length, 1); assert.equal(f.renders[0].opening, true);
  assert.equal(f.context.document.body.classList.contains("bq-app-opening"), false);
  assert.equal(f.startupView.enabled, false); f.assertLearnerStorage();
});

test("Session failure shows sign-in before releasing the initial gate", async () => {
  const f = await fixture({ startupConfig: { enabled: true, experienceUpliftEnabled: true }, sessionFailure: true });
  assert.equal(f.calls.find((call) => call.url === "/api/auth/session").opening, true);
  assert.equal(f.startupView.authView, "gateway"); assert.equal(f.renders.length, 0);
  assert.equal(f.node("#dashboardScreen").classList.contains("hidden"), true);
  assert.equal(f.context.document.body.classList.contains("bq-app-opening"), false); f.assertLearnerStorage();
});

test("Authenticated startup renders the selected child before release and later actions do not restore the gate", async () => {
  const f = await fixture({ startupConfig: { enabled: true, experienceUpliftEnabled: true }, startupSession: {
    authenticated: true, family: { id: "synthetic-family" }, parentUnlocked: false, activeChildId: "database-child",
    children: [{ id: "database-child", legacyProfileId: fixtureProfile.id, name: "Explorer", version: 7, payload: structuredClone(fixtureProfile) }]
  } });
  assert.equal(f.renders.length, 1); assert.equal(f.renders[0].opening, true); assert.equal(f.renders[0].profileId, fixtureProfile.id);
  assert.equal(f.context.document.body.classList.contains("bq-app-opening"), false);
  f.context.__ui.openParentPinRecovery();
  assert.equal(f.context.document.body.classList.contains("bq-app-opening"), false);
});

test("An emailed token is cleared from the fragment immediately and never stored or rendered", async () => {
  const f = await fixture({ fragment: `#parent-pin-reset=${token}` });
  assert.equal(f.immediateFragment, "");
  assert.equal(f.replacements.length, 1);
  assert.equal(f.calls[0].fragment, "");
  assert.match(f.next.innerHTML, /Choose a new parent PIN/);
  assert.equal(f.next.innerHTML.includes(token), false);
  assert.equal(JSON.stringify([...f.capabilities]).includes(token), false);
  f.assertLearnerStorage();
});

test("Malformed recovery fragments are removed without allowing a confirmation request", async () => {
  const f = await fixture({ fragment: "#parent-pin-reset=malformed" });
  assert.equal(f.immediateFragment, "");
  assert.match(f.next.innerHTML, /cannot be used/);
  const { event } = f.form({ parentPin: "2468", confirmParentPin: "2468" });
  await f.context.__ui.confirmParentPinReset(event);
  assert.equal(f.calls.filter((call) => call.method === "POST").length, 0);
  f.assertLearnerStorage();
});

test("Recovery verifies the password and shows only the server-selected masked email", async () => {
  const f = await fixture();
  f.context.__ui.openParentPinRecovery();
  f.queued.push({ url: "/api/auth/parent-pin-reset-request", body: { ok: true, maskedEmail: "p•••@example.invalid", expiresInMinutes: 15 } });
  const { form, event } = f.form({ password: "Synthetic-Password-Only" });
  form.querySelector('[name="password"]').value = "Synthetic-Password-Only";
  await f.context.__ui.requestParentPinRecovery(event);
  assert.deepEqual(JSON.parse(f.calls.at(-1).body), { password: "Synthetic-Password-Only" });
  assert.match(f.next.innerHTML, /p•••@example\.invalid/);
  assert.match(f.next.innerHTML, /15 minutes/);
  assert.equal(form.querySelector('[name="password"]').value, "");
  f.assertLearnerStorage();
});

test("PIN mismatch and invalid digits cannot send a reset confirmation", async () => {
  const f = await fixture({ fragment: `#parent-pin-reset=${token}` });
  await f.context.__ui.confirmParentPinReset(f.form({ parentPin: "2468", confirmParentPin: "2469" }).event);
  assert.match(f.message.textContent, /do not match/);
  await f.context.__ui.confirmParentPinReset(f.form({ parentPin: "123", confirmParentPin: "123" }).event);
  assert.match(f.message.textContent, /4 to 8 digits/);
  assert.equal(f.calls.filter((call) => call.method === "POST").length, 0);
  f.assertLearnerStorage();
});

test("A failed confirmation preserves saved learner data and does not report success", async () => {
  const f = await fixture({ fragment: `#parent-pin-reset=${token}` });
  f.queued.push({ url: "/api/auth/parent-pin-reset-confirm", ok: false, body: { error: "Try again later", code: "RECOVERY_UNAVAILABLE" } });
  await f.context.__ui.confirmParentPinReset(f.form({ parentPin: "2468", confirmParentPin: "2468" }).event);
  assert.match(f.message.textContent, /Try again later/);
  assert.match(f.next.innerHTML, /Choose a new parent PIN/);
  assert.equal(f.capabilities.has("brightQuestParentCapability"), true);
  f.assertLearnerStorage();
});

test("Expired links return to sign-in without accepting another PIN submission", async () => {
  const f = await fixture({ fragment: `#parent-pin-reset=${token}` });
  f.queued.push({ url: "/api/auth/parent-pin-reset-confirm", ok: false, body: { error: "Expired link", code: "RECOVERY_LINK_INVALID" } });
  await f.context.__ui.confirmParentPinReset(f.form({ parentPin: "2468", confirmParentPin: "2468" }).event);
  assert.match(f.next.innerHTML, /cannot be used/);
  await f.context.__ui.confirmParentPinReset(f.form({ parentPin: "2468", confirmParentPin: "2468" }).event);
  assert.equal(f.calls.filter((call) => call.method === "POST").length, 1);
  f.assertLearnerStorage();
});

test("Successful recovery clears access capabilities but retains every learner record and draft", async () => {
  const f = await fixture({ fragment: `#parent-pin-reset=${token}` });
  f.queued.push({ url: "/api/auth/parent-pin-reset-confirm", body: { ok: true, requiresSignIn: true } });
  await f.context.__ui.confirmParentPinReset(f.form({ parentPin: "2468", confirmParentPin: "2468" }).event);
  assert.deepEqual(JSON.parse(f.calls.at(-1).body), { token, parentPin: "2468" });
  assert.equal(f.capabilities.size, 0);
  assert.equal(f.state.profile, null);
  assert.equal(f.state.selectedRole, "");
  assert.match(f.next.innerHTML, /PIN is updated/);
  assert.match(f.next.innerHTML, /Sign in again/);
  assert.equal(f.next.innerHTML.includes(token), false);
  f.assertLearnerStorage();
});

test("Unavailable recovery and cancelled email links make no reset request", async () => {
  const unavailable = await fixture({ configured: false });
  unavailable.context.__ui.openParentPinRecovery();
  assert.match(unavailable.next.innerHTML, /Email recovery is unavailable/);
  assert.equal(unavailable.calls.filter((call) => call.method === "POST").length, 0);
  unavailable.assertLearnerStorage();

  const cancelled = await fixture({ fragment: `#parent-pin-reset=${token}` });
  await cancelled.next.querySelector("[data-recovery-cancel]").click();
  await cancelled.context.__ui.confirmParentPinReset(cancelled.form({ parentPin: "2468", confirmParentPin: "2468" }).event);
  assert.equal(cancelled.calls.filter((call) => call.method === "POST").length, 0);
  cancelled.assertLearnerStorage();
});

test("Forgot family password is available from login and the parent PIN password check", async () => {
  const f = await fixture({ startupConfig: { enabled: true, familyPasswordRecoveryEnabled: true }, startupSession: { authenticated: false } });
  f.context.__ui.setSession(null);
  const button = f.node("#familyLoginForm").children.find((item) => item.textContent === "Forgot family password?");
  assert.ok(button); assert.equal(button.type, "button"); assert.equal(button.hidden, false);
  await button.click();
  assert.match(f.next.innerHTML, /Reset your family password/); assert.match(f.next.innerHTML, /Back to sign in/);
  await f.next.querySelector("[data-password-recovery-back]").click();
  assert.equal(f.node("#familyAuthScreen").dataset.authView, "gateway");
  f.context.__ui.setSession({ authenticated: true, children: [] }); f.context.__ui.openParentPinRecovery();
  assert.match(f.next.innerHTML, /Forgot family password/);
  await f.next.querySelector("[data-forgot-family-password]").click();
  assert.match(f.next.innerHTML, /Reset your family password/); f.assertLearnerStorage();
});

test("Password link credentials are cleared before config and never appear in markup or device storage", async () => {
  const f = await fixture({ fragment: `#password-reset=${token}` });
  assert.equal(f.immediateFragment, ""); assert.equal(f.calls[0].fragment, ""); assert.equal(f.replacements.length, 1);
  assert.match(f.next.innerHTML, /Choose a new family password/); assert.match(f.next.innerHTML, /autocomplete="new-password"/);
  assert.equal(f.next.innerHTML.includes(token), false); assert.equal(JSON.stringify([...f.capabilities]).includes(token), false);
  f.assertLearnerStorage();
});

test("Valid password requests use the same acknowledgement for registered and unregistered addresses", async () => {
  const views = [];
  for (const email of ["registered@example.invalid", "unregistered@example.invalid"]) {
    const f = await fixture(); f.context.__ui.setSession(null); await f.context.__ui.openFamilyPasswordRecovery();
    f.queued.push({ url: "/api/auth/password-reset-request", body: { ok: true, expiresInMinutes: 15 } });
    const { form, event } = f.form({ email: ` ${email} ` });
    await f.context.__ui.requestFamilyPasswordRecovery(event);
    assert.deepEqual(JSON.parse(f.calls.at(-1).body), { email }); assert.deepEqual(form.fields, {});
    assert.match(f.next.innerHTML, /If an account uses that email address/); assert.match(f.next.innerHTML, /15 minutes/);
    assert.equal(f.next.innerHTML.includes(email), false); views.push(f.next.innerHTML); f.assertLearnerStorage();
  }
  assert.equal(views[0], views[1]);
});

test("Password request validation, unavailable service and rate limiting keep honest retry paths", async () => {
  const invalid = await fixture(); await invalid.context.__ui.openFamilyPasswordRecovery();
  await invalid.context.__ui.requestFamilyPasswordRecovery(invalid.form({ email: "invalid-address" }).event);
  assert.match(invalid.message.textContent, /valid family email/); assert.equal(invalid.calls.filter((call) => call.method === "POST").length, 0);
  const disabled = await fixture({ passwordConfigured: false }); await disabled.context.__ui.openFamilyPasswordRecovery();
  assert.match(disabled.next.innerHTML, /Password recovery is unavailable/); assert.equal(disabled.calls.length, 1);
  for (const [code, error] of [["RECOVERY_UNAVAILABLE", "Temporarily unavailable"], ["RATE_LIMITED", "Too many requests. Try again later."]]) {
    const f = await fixture(); await f.context.__ui.openFamilyPasswordRecovery();
    f.queued.push({ url: "/api/auth/password-reset-request", ok: false, body: { code, error } });
    const { form, event } = f.form({ email: "synthetic@example.invalid" }); await f.context.__ui.requestFamilyPasswordRecovery(event);
    if (code === "RECOVERY_UNAVAILABLE") assert.match(f.next.innerHTML, /Password recovery is unavailable/);
    else { assert.equal(f.message.textContent, error); assert.match(f.next.innerHTML, /data-family-password-recovery/); }
    assert.equal(form.attributes.get("aria-busy"), "false"); assert.doesNotMatch(f.next.innerHTML, /Check for a reset link/); f.assertLearnerStorage();
  }
  invalid.assertLearnerStorage(); disabled.assertLearnerStorage();
});

test("New family passwords enforce signup length and exact confirmation before requesting reset", async () => {
  const f = await fixture({ fragment: `#password-reset=${token}` });
  for (const password of ["1234567", "x".repeat(129)]) {
    await f.context.__ui.confirmFamilyPasswordReset(f.form({ password, confirmPassword: password }).event);
    assert.match(f.message.textContent, /8 to 128 characters/);
  }
  await f.context.__ui.confirmFamilyPasswordReset(f.form({ password: "a".repeat(128), confirmPassword: "b".repeat(128) }).event);
  assert.match(f.message.textContent, /passwords do not match/);
  assert.equal(f.calls.filter((call) => call.method === "POST").length, 0); f.assertLearnerStorage();
});

test("Password confirmation failures retain access and drafts, and expired tokens cannot be submitted twice", async () => {
  for (const code of ["RECOVERY_UNAVAILABLE", "RECOVERY_LINK_INVALID"]) {
    const f = await fixture({ fragment: `#password-reset=${token}` });
    f.queued.push({ url: "/api/auth/password-reset-confirm", ok: false, body: { error: "Synthetic request could not finish", code } });
    const event = f.form({ password: "Synthetic-password", confirmPassword: "Synthetic-password" }).event;
    await f.context.__ui.confirmFamilyPasswordReset(event);
    assert.equal(f.capabilities.has("brightQuestParentCapability"), true); assert.notEqual(f.state.profile, null);
    if (code === "RECOVERY_LINK_INVALID") {
      assert.match(f.next.innerHTML, /password reset link cannot be used/); assert.match(f.next.innerHTML, /Request a new link/);
      await f.context.__ui.confirmFamilyPasswordReset(event); assert.equal(f.calls.filter((call) => call.method === "POST").length, 1);
    } else { assert.equal(f.message.textContent, "Synthetic request could not finish"); assert.match(f.next.innerHTML, /Choose a new family password/); }
    f.assertLearnerStorage();
  }
});

test("Successful password reset clears access, keeps all learner data and asks for normal sign-in", async () => {
  for (const password of ["12345678", " x".repeat(64)]) {
    const f = await fixture({ fragment: `#password-reset=${token}` }); const originalProfiles = JSON.stringify(f.state.profiles);
    f.queued.push({ url: "/api/auth/password-reset-confirm", body: { ok: true, requiresSignIn: true } });
    await f.context.__ui.confirmFamilyPasswordReset(f.form({ password, confirmPassword: password }).event);
    assert.deepEqual(JSON.parse(f.calls.at(-1).body), { token, password });
    assert.equal(f.capabilities.size, 0); assert.equal(f.state.profile, null); assert.equal(f.state.selectedRole, "");
    assert.equal(JSON.stringify(f.state.profiles), originalProfiles); assert.equal(f.next.innerHTML.includes(token), false);
    assert.match(f.next.innerHTML, /family password is updated/); assert.match(f.next.innerHTML, /parent PIN stays the same/);
    await f.next.querySelector("[data-password-recovery-signin]").click();
    assert.equal(f.node("#familyAuthScreen").dataset.authView, "gateway"); f.assertLearnerStorage();
  }
});

test("Malformed, cancelled and cross-purpose links never send the wrong credential reset", async () => {
  const malformed = await fixture({ fragment: "#password-reset=broken" });
  assert.equal(malformed.immediateFragment, ""); assert.match(malformed.next.innerHTML, /password reset link cannot be used/);
  await malformed.context.__ui.confirmFamilyPasswordReset(malformed.form({ password: "Synthetic-password", confirmPassword: "Synthetic-password" }).event);
  const cancelled = await fixture({ fragment: `#password-reset=${token}` });
  await cancelled.next.querySelector("[data-password-reset-cancel]").click();
  await cancelled.context.__ui.confirmFamilyPasswordReset(cancelled.form({ password: "Synthetic-password", confirmPassword: "Synthetic-password" }).event);
  const wrongPasswordPurpose = await fixture({ fragment: `#parent-pin-reset=${token}` });
  await wrongPasswordPurpose.context.__ui.confirmFamilyPasswordReset(wrongPasswordPurpose.form({ password: "Synthetic-password", confirmPassword: "Synthetic-password" }).event);
  const wrongPinPurpose = await fixture({ fragment: `#password-reset=${token}` });
  await wrongPinPurpose.context.__ui.confirmParentPinReset(wrongPinPurpose.form({ parentPin: "1234", confirmParentPin: "1234" }).event);
  for (const f of [malformed, cancelled, wrongPasswordPurpose, wrongPinPurpose]) {
    assert.equal(f.calls.filter((call) => call.method === "POST").length, 0); f.assertLearnerStorage();
  }
});

test("Recovery links arriving during learning pause and save first, keeping the token available after a failed save", async () => {
  for (const purpose of ["password", "parent-pin"]) {
    const f = await fixture(); const steps = [];
    f.context.__ui.bindActiveSession({ family: { id: "synthetic-family" }, activeChildId: "database-child", children: [{ id: "database-child", payload: structuredClone(fixtureProfile) }] });
    f.node("#testScreen").classList.remove("hidden");
    f.node("#exitTestButton").addEventListener("click", () => { steps.push("pause"); f.node("#testScreen").classList.add("hidden"); });
    let canSave = false; f.context.syncProfileToCloud = async () => { steps.push("save"); return canSave; };
    f.context.location.hash = `#${purpose}-reset=${token}`;
    await f.dispatch("hashchange");
    assert.equal(f.context.location.hash, ""); assert.deepEqual(steps, ["pause", "save"]);
    assert.doesNotMatch(f.next.innerHTML, /Choose a new/);
    const notice = f.context.document.body.children.find((node) => node.className === "bq-recovery-retry-notice");
    assert.ok(notice); assert.equal(notice.innerHTML.includes(token), false);
    canSave = true; await notice.querySelector("[data-recovery-retry]").click();
    assert.deepEqual(steps, ["pause", "save", "save"]); assert.equal(notice.removed, true);
    assert.match(f.next.innerHTML, purpose === "password" ? /Choose a new family password/ : /Choose a new parent PIN/);
    assert.equal(f.calls.filter((call) => call.method === "POST").length, 0); f.assertLearnerStorage();
  }
});

test("Both reset confirmations await current learning saves and can retry with the original token after failure", async () => {
  for (const purpose of ["password", "parent-pin"]) {
    const f = await fixture({ fragment: `#${purpose}-reset=${token}` });
    f.context.__ui.bindActiveSession({ family: { id: "synthetic-family" }, activeChildId: "database-child", children: [{ id: "database-child", payload: structuredClone(fixtureProfile) }] });
    let saves = 0; let canSave = false;
    f.context.syncProfileToCloud = async () => { saves += 1; return canSave; };
    const submit = purpose === "password" ? f.context.__ui.confirmFamilyPasswordReset : f.context.__ui.confirmParentPinReset;
    const fields = purpose === "password" ? { password: "Synthetic-password", confirmPassword: "Synthetic-password" } : { parentPin: "2468", confirmParentPin: "2468" };
    await submit(f.form(fields).event);
    assert.equal(saves, 1); assert.equal(f.calls.filter((call) => call.method === "POST").length, 0);
    assert.equal(f.capabilities.size, 2); assert.notEqual(f.state.profile, null);
    assert.match(f.message.textContent, /Reconnect and try again/); assert.equal(f.next.attributes.get("aria-busy"), "false");
    canSave = true;
    f.queued.push({ url: `/api/auth/${purpose}-reset-confirm`, body: { ok: true, requiresSignIn: true } });
    await submit(f.form(fields).event);
    assert.equal(saves, 2); assert.equal(JSON.parse(f.calls.at(-1).body).token, token);
    assert.equal(f.capabilities.size, 0); f.assertLearnerStorage();
  }
});

test("Confirmation keeps cancel and navigation disabled in flight and ignores duplicate submissions", async () => {
  for (const purpose of ["password", "parent-pin"]) {
    const f = await fixture({ fragment: `#${purpose}-reset=${token}` }); f.context.__ui.setSession(null);
    let release, signal;
    const wait = new Promise((resolve) => { release = resolve; }); const started = new Promise((resolve) => { signal = resolve; });
    f.queued.push({ url: `/api/auth/${purpose}-reset-confirm`, body: { ok: true, requiresSignIn: true }, wait, onRequest: signal });
    const submit = purpose === "password" ? f.context.__ui.confirmFamilyPasswordReset : f.context.__ui.confirmParentPinReset;
    const fields = purpose === "password" ? { password: "Synthetic-password", confirmPassword: "Synthetic-password" } : { parentPin: "2468", confirmParentPin: "2468" };
    const pending = submit(f.form(fields).event); await started;
    const cancel = f.next.querySelector(purpose === "password" ? "[data-password-reset-cancel]" : "[data-recovery-cancel]");
    assert.equal(cancel.disabled, true); assert.equal(f.next.attributes.get("aria-busy"), "true");
    const currentView = f.next.innerHTML; await cancel.click(); await submit(f.form(fields).event);
    assert.equal(f.next.innerHTML, currentView); assert.equal(f.capabilities.size, 2); assert.notEqual(f.state.profile, null);
    assert.equal(f.calls.filter((call) => call.method === "POST").length, 1);
    release(); await pending;
    assert.equal(f.next.attributes.get("aria-busy"), "false"); assert.equal(f.capabilities.size, 0);
    assert.match(f.next.innerHTML, purpose === "password" ? /family password is updated/ : /parent PIN is updated/); f.assertLearnerStorage();
  }
});
