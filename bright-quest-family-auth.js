(() => {
  const authScreen = document.querySelector("#familyAuthScreen");
  const forms = document.querySelector("#familyAuthForms");
  const message = document.querySelector("#familyAuthMessage");
  const nextStep = document.querySelector("#familyNextStep");
  const loginForm = document.querySelector("#familyLoginForm");
  const signupForm = document.querySelector("#familySignupForm");
  const landingSignupButton = document.querySelector("#familyLandingSignupButton");
  const tabs = [...document.querySelectorAll("[data-auth-tab]")];
  const parentCapabilityKey = "brightQuestParentCapability";
  const childCapabilityKey = "brightQuestChildCapability";
  let session = null;

  const controller = {
    enabled: false,
    experienceUpliftEnabled: false,
    openFamilySettings,
    openParent,
    logout,
    requestHeaders,
    showGateway
  };
  window.BrightQuestFamilyAuth = controller;

  tabs.forEach((tab) => tab.addEventListener("click", () => selectTab(tab.dataset.authTab)));
  landingSignupButton?.addEventListener("click", () => selectTab("signup"));
  loginForm?.addEventListener("submit", handleLogin);
  signupForm?.addEventListener("submit", handleSignup);
  switchProfileButton?.addEventListener("click", interceptLegacyLogout, true);
  parentExitButton?.addEventListener("click", interceptLegacyLogout, true);

  initialise();

  async function initialise() {
    const config = await api("/api/auth/config", { silent: true });
    controller.experienceUpliftEnabled = Boolean(config?.experienceUpliftEnabled);
    document.body.classList.toggle("bq-experience-uplift", controller.experienceUpliftEnabled);
    if (!config?.enabled) {
      if (!document.querySelector("#dashboardScreen")?.classList.contains("hidden")) {
        requestAnimationFrame(() => renderDashboard());
      }
      return;
    }
    controller.enabled = true;
    const signupTab = document.querySelector('[data-auth-tab="signup"]');
    signupTab?.classList.toggle("hidden", !config.signupEnabled);
    landingSignupButton?.classList.toggle("hidden", !config.signupEnabled);
    document.body.classList.add("bq-family-auth-enabled");
    const current = await api("/api/auth/session", { silent: true });
    if (current?.authenticated) {
      session = current;
      await continueFromSession();
    } else {
      showGateway();
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(loginForm);
    setBusy(loginForm, true);
    clearMessage();
    const result = await api("/api/auth/login", {
      method: "POST",
      body: { email: data.get("email"), password: data.get("password") }
    });
    setBusy(loginForm, false);
    if (!result?.authenticated) return;
    loginForm.reset();
    session = result;
    await continueFromSession();
  }

  async function handleSignup(event) {
    event.preventDefault();
    const data = new FormData(signupForm);
    setBusy(signupForm, true);
    clearMessage();
    const result = await api("/api/auth/signup", {
      method: "POST",
      body: {
        displayName: data.get("displayName"),
        email: data.get("email"),
        password: data.get("password"),
        parentPin: data.get("parentPin"),
        parentConfirmed: data.get("parentConfirmed") === "on",
        website: data.get("website")
      }
    });
    setBusy(signupForm, false);
    if (!result?.authenticated) return;
    signupForm.reset();
    session = result;
    await continueFromSession();
  }

  async function continueFromSession() {
    if (session.parentUnlocked) {
      await api("/api/auth/parent-lock", { method: "POST", silent: true });
      sessionStorage.removeItem(parentCapabilityKey);
      session.parentUnlocked = false;
    }
    hydrateProfiles();
    if (!session.children.length) {
      showCreateChild();
      return;
    }
    if (session.children.length === 1) {
      await enterChild(session.children[0]);
      return;
    }
    if (session.activeChildId) {
      const active = session.children.find((child) => child.id === session.activeChildId);
      if (active) return enterChild(active);
    }
    showChildChooser();
  }

  function hydrateProfiles() {
    const familyProfiles = {};
    session.children.forEach((child) => {
      const payload = child.payload || {
        id: child.legacyProfileId || child.id,
        name: child.name,
        stars: child.stars || 0,
        attempts: [],
        trainingCompleted: {},
        writingSamples: []
      };
      payload.id ||= child.legacyProfileId || child.id;
      payload.name ||= child.name;
      payload.cloudVersion = child.version;
      familyProfiles[payload.id] = payload;
    });
    state.profiles = familyProfiles;
    normalizeProfiles();
  }

  async function enterChild(child) {
    const profileId = child.payload?.id || child.legacyProfileId || child.id;
    const profile = state.profiles[profileId];
    if (!profile) {
      showMessage("This child profile could not be loaded. Please try again.");
      return;
    }
    state.selectedRole = "kid";
    state.profileId = profileId;
    state.profile = profile;
    state.parentProfileId = profileId;
    saveProfiles();
    if (switchProfileButton) switchProfileButton.textContent = session.children.length > 1 ? "Switch child" : "Log out";
    renderDashboard();
    authScreen.classList.add("hidden");
    showScreen("dashboard");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function showGateway() {
    if (!controller.enabled) return;
    session = null;
    sessionStorage.removeItem(parentCapabilityKey);
    sessionStorage.removeItem(childCapabilityKey);
    forms.classList.remove("hidden");
    nextStep.classList.add("hidden");
    nextStep.innerHTML = "";
    clearMessage();
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyLoginEmail")?.focus());
  }

  function showCreateChild() {
    forms.classList.add("hidden");
    nextStep.classList.remove("hidden");
    nextStep.innerHTML = `
      <div class="bq-signup-steps complete-first" aria-label="Signup steps"><strong>1</strong><span>Family created</span><i></i><strong>2</strong><span>Nominate your kid</span></div>
      <p class="eyebrow">Step 2 of 2</p>
      <h3>Nominate your kid</h3>
      <p>Add the first name of the child who will use Bright Quest. Their learning journey stays private inside this family account.</p>
      <form class="bq-auth-form" data-create-child>
        <label for="familyChildName">Child first name</label>
        <input id="familyChildName" name="name" autocomplete="given-name" maxlength="40" required />
        <button class="button button-primary" type="submit">Create their journey</button>
      </form>
      <div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-family-logout>Log out</button></div>
    `;
    nextStep.querySelector("[data-create-child]")?.addEventListener("submit", createChild);
    nextStep.querySelector("[data-family-logout]")?.addEventListener("click", logout);
    showAuthOnly();
  }

  async function createChild(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    const result = await api("/api/auth/children", { method: "POST", body: { name: data.get("name") } });
    setBusy(form, false);
    if (!result?.child) return;
    session = await api("/api/auth/session");
    if (session?.authenticated) await continueFromSession();
  }

  function showChildChooser() {
    forms.classList.add("hidden");
    nextStep.classList.remove("hidden");
    nextStep.innerHTML = `
      <p class="eyebrow">Choose an explorer</p>
      <h3>Who is learning now?</h3>
      <div class="bq-child-list">
        ${session.children.map((child) => `
          <form class="bq-child-choice" data-child-id="${escapeAttr(child.id)}">
            <span class="bq-child-avatar" aria-hidden="true">${escapeHtml(initials(child.name))}</span>
            <div><strong>${escapeHtml(child.name)}</strong><small>Continue adventure</small></div>
            <input name="pin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" aria-label="${escapeAttr(child.name)}'s PIN" placeholder="Child PIN" required />
            <button class="button button-primary" type="submit">Continue</button>
          </form>
        `).join("")}
      </div>
      <div class="bq-auth-secondary-actions">
        <button class="button button-soft" type="button" data-open-parent>Parent Cockpit</button>
        <button class="button button-soft" type="button" data-family-logout>Log out</button>
      </div>
    `;
    nextStep.querySelectorAll("[data-child-id]").forEach((form) => form.addEventListener("submit", selectChild));
    nextStep.querySelector("[data-open-parent]")?.addEventListener("click", openParent);
    nextStep.querySelector("[data-family-logout]")?.addEventListener("click", logout);
    showAuthOnly();
  }

  async function openFamilySettings() {
    if (!controller.enabled || !session) return;
    const current = await api("/api/auth/session");
    if (!current?.authenticated) return showGateway();
    session = current;
    if (!session.parentUnlocked) {
      openParent();
      return;
    }
    hydrateProfiles();
    showFamilySettings();
  }

  function showFamilySettings() {
    const missingPinChildren = session.children.filter((child) => !child.pinSet);
    forms.classList.add("hidden");
    nextStep.classList.remove("hidden");
    nextStep.innerHTML = `
      <p class="eyebrow">Family settings</p>
      <h3>Manage child journeys</h3>
      <p>Child PINs only appear when this family has more than one child. The Parent Cockpit PIN remains separate.</p>
      <div class="bq-family-child-settings">
        ${session.children.map((child) => `
          <form class="bq-child-pin-row" data-set-child-pin="${escapeAttr(child.id)}">
            <span class="bq-child-avatar" aria-hidden="true">${escapeHtml(initials(child.name))}</span>
            <div><strong>${escapeHtml(child.name)}</strong><small>${child.pinSet ? "PIN is set" : "PIN needed before adding another child"}</small></div>
            <input name="pin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" aria-label="New PIN for ${escapeAttr(child.name)}" placeholder="New child PIN" required />
            <button class="button button-soft" type="submit">${child.pinSet ? "Change PIN" : "Set PIN"}</button>
          </form>
        `).join("")}
      </div>
      <div class="bq-family-add-child">
        <p class="eyebrow">Add another child</p>
        <form class="bq-auth-form" data-add-family-child>
          <label for="familyAdditionalChildName">Child first name</label>
          <input id="familyAdditionalChildName" name="name" autocomplete="given-name" maxlength="40" required />
          ${missingPinChildren.length === 1 ? `
            <label for="familyExistingChildPin">Set ${escapeHtml(missingPinChildren[0].name)}'s child PIN</label>
            <input id="familyExistingChildPin" name="existingChildPin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" autocomplete="new-password" required />
          ` : ""}
          <label for="familyAdditionalChildPin">New child's PIN</label>
          <input id="familyAdditionalChildPin" name="pin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" autocomplete="new-password" required />
          <small class="bq-field-hint">Use 4 to 8 digits. Each child uses their own PIN only when choosing between profiles.</small>
          <button class="button button-primary" type="submit" ${missingPinChildren.length > 1 ? "disabled" : ""}>Add child journey</button>
        </form>
      </div>
      <div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-back-to-parent>Back to Parent Cockpit</button></div>
    `;
    nextStep.querySelectorAll("[data-set-child-pin]").forEach((form) => form.addEventListener("submit", updateChildPin));
    nextStep.querySelector("[data-add-family-child]")?.addEventListener("submit", addFamilyChild);
    nextStep.querySelector("[data-back-to-parent]")?.addEventListener("click", returnToParent);
    showAuthOnly();
  }

  async function updateChildPin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    const result = await api("/api/auth/children", {
      method: "PATCH",
      body: { childId: form.dataset.setChildPin, pin: data.get("pin") }
    });
    setBusy(form, false);
    if (!result?.ok) return;
    session = await api("/api/auth/session");
    if (session?.authenticated) showFamilySettings();
  }

  async function addFamilyChild(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    const result = await api("/api/auth/children", {
      method: "POST",
      body: { name: data.get("name"), pin: data.get("pin"), existingChildPin: data.get("existingChildPin") }
    });
    setBusy(form, false);
    if (!result?.child) return;
    session = await api("/api/auth/session");
    if (session?.authenticated) {
      hydrateProfiles();
      showFamilySettings();
    }
  }

  function returnToParent() {
    hydrateProfiles();
    state.selectedRole = "parent";
    state.parentProfileId = state.parentProfileId && state.profiles[state.parentProfileId]
      ? state.parentProfileId
      : Object.keys(state.profiles)[0] || "";
    renderParentDashboard();
    authScreen.classList.add("hidden");
    showScreen("parent");
    window.location.hash = "parent/overview";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  async function selectChild(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    const result = await api("/api/auth/select-child", {
      method: "POST",
      body: { childId: form.dataset.childId, pin: data.get("pin") }
    });
    setBusy(form, false);
    if (!result?.ok) return;
    if (result.childCapability) sessionStorage.setItem(childCapabilityKey, result.childCapability);
    sessionStorage.removeItem(parentCapabilityKey);
    session = await api("/api/auth/session");
    if (session?.authenticated) await continueFromSession();
  }

  function openParent() {
    if (!controller.enabled || !session) return;
    forms.classList.add("hidden");
    nextStep.classList.remove("hidden");
    nextStep.innerHTML = `
      <p class="eyebrow">Parent Cockpit</p>
      <h3>Enter the parent PIN</h3>
      <p>This extra check keeps adult records and family settings separate from the child experience.</p>
      <form class="bq-auth-form" data-parent-unlock>
        <label for="familyParentPin">Parent PIN</label>
        <input id="familyParentPin" name="pin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" autocomplete="current-password" required />
        <button class="button button-primary" type="submit">Open Parent Cockpit</button>
      </form>
      <div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-back-to-child>Back</button></div>
    `;
    nextStep.querySelector("[data-parent-unlock]")?.addEventListener("submit", unlockParent);
    nextStep.querySelector("[data-back-to-child]")?.addEventListener("click", () => continueFromSession());
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyParentPin")?.focus());
  }

  async function unlockParent(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    const result = await api("/api/auth/parent-unlock", { method: "POST", body: { pin: data.get("pin") } });
    setBusy(form, false);
    if (!result?.ok) return;
    sessionStorage.setItem(parentCapabilityKey, result.parentCapability);
    session = await api("/api/auth/session");
    if (!session?.authenticated) return;
    returnToParent();
  }

  async function logout() {
    await api("/api/auth/session", { method: "DELETE", silent: true });
    localStorage.removeItem(storageKey);
    localStorage.removeItem("brightQuestActiveProfile");
    sessionStorage.removeItem(parentCapabilityKey);
    sessionStorage.removeItem(childCapabilityKey);
    state.profiles = {};
    state.profileId = "";
    state.profile = null;
    state.parentProfileId = "";
    showGateway();
  }

  async function interceptLegacyLogout(event) {
    if (!controller.enabled || !session) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (session.children.length > 1) {
      const result = await api("/api/auth/select-child", { method: "POST", body: { childId: null } });
      if (!result?.ok) return;
      sessionStorage.removeItem(parentCapabilityKey);
      sessionStorage.removeItem(childCapabilityKey);
      session.activeChildId = null;
      showChildChooser();
      return;
    }
    logout();
  }

  function showAuthOnly() {
    Object.values(screens).forEach((screen) => screen?.classList.add("hidden"));
    document.querySelector("#bqKidConfirmScreen")?.classList.add("hidden");
    authScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function selectTab(name) {
    tabs.forEach((tab) => tab.setAttribute("aria-pressed", String(tab.dataset.authTab === name)));
    loginForm.classList.toggle("hidden", name !== "login");
    signupForm.classList.toggle("hidden", name !== "signup");
    clearMessage();
    requestAnimationFrame(() => (name === "login" ? document.querySelector("#familyLoginEmail") : document.querySelector("#familySignupName"))?.focus());
  }

  async function api(url, options = {}) {
    try {
      const headers = options.body ? { "content-type": "application/json" } : {};
      const parentCapability = sessionStorage.getItem(parentCapabilityKey);
      const childCapability = sessionStorage.getItem(childCapabilityKey);
      if (parentCapability) headers["x-bq-parent-capability"] = parentCapability;
      if (childCapability) headers["x-bq-child-capability"] = childCapability;
      const response = await fetch(url, {
        method: options.method || "GET",
        credentials: "same-origin",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (!options.silent) showMessage(body.error || "Bright Quest could not complete that request.");
        return null;
      }
      return body;
    } catch {
      if (!options.silent) showMessage("Bright Quest could not connect. Check the connection and try again.");
      return null;
    }
  }

  function requestHeaders() {
    const headers = {};
    const parentCapability = sessionStorage.getItem(parentCapabilityKey);
    const childCapability = sessionStorage.getItem(childCapabilityKey);
    if (parentCapability) headers["x-bq-parent-capability"] = parentCapability;
    if (childCapability) headers["x-bq-child-capability"] = childCapability;
    return headers;
  }

  function setBusy(form, busy) {
    form.querySelectorAll("input,button").forEach((control) => { control.disabled = busy; });
    form.setAttribute("aria-busy", String(busy));
    const submit = form.querySelector('button[type="submit"]');
    if (!submit) return;
    if (busy) {
      submit.dataset.readyLabel = submit.textContent;
      submit.textContent = submit.dataset.busyLabel || "Working...";
    } else if (submit.dataset.readyLabel) {
      submit.textContent = submit.dataset.readyLabel;
    }
  }

  function showMessage(text) {
    message.textContent = text;
    message.classList.remove("hidden");
  }

  function clearMessage() {
    message.textContent = "";
    message.classList.add("hidden");
  }

  function initials(name) {
    return String(name || "?").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/"/g, "&quot;");
  }
})();
