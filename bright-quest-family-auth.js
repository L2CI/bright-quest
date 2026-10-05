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
  const cacheOwnerKey = "brightQuestFamilyProfileCacheOwnerV1";
  const recoveryArchiveKey = "brightQuestDeviceProfileRecoveryV1";
  let session = null;
  let hydratedFamilyId = "";
  let hydratedChildren = {};
  let recoveryLink = captureRecoveryLink();
  let recoveryEmail = "";
  let recoveryConfirmationPending = false;
  let recoveryRetryNotice = null;

  const controller = {
    enabled: false,
    experienceUpliftEnabled: false,
    parentPinRecoveryEnabled: false,
    familyPasswordRecoveryEnabled: false,
    openFamilySettings,
    openParent,
    returnToChild,
    logout,
    requestHeaders,
    showGateway
  };
  window.BrightQuestFamilyAuth = controller;

  const forgotPasswordButton = document.createElement("button");
  forgotPasswordButton.type = "button";
  forgotPasswordButton.className = "bq-auth-text-action bq-forgot-password";
  forgotPasswordButton.textContent = "Forgot family password?";
  forgotPasswordButton.dataset.forgotFamilyPassword = "";
  forgotPasswordButton.hidden = true;
  forgotPasswordButton.addEventListener("click", openFamilyPasswordRecovery);
  loginForm?.append(forgotPasswordButton);

  tabs.forEach((tab) => tab.addEventListener("click", () => selectTab(tab.dataset.authTab)));
  landingSignupButton?.addEventListener("click", () => selectTab("signup"));
  loginForm?.addEventListener("submit", handleLogin);
  signupForm?.addEventListener("submit", handleSignup);
  switchProfileButton?.addEventListener("click", interceptLegacyLogout, true);
  parentExitButton?.addEventListener("click", interceptLegacyLogout, true);
  window.addEventListener("hashchange", async () => {
    const link = captureRecoveryLink();
    if (!link.seen) return;
    if (recoveryConfirmationPending) return;
    recoveryLink = link;
    if (controller.enabled) await openRecoveryResetSafely();
  });

  initialise();

  async function initialise() {
    try {
      await initialiseView();
    } catch {
      if (controller.enabled) {
        showGateway();
        showMessage("Bright Quest could not finish opening. Please sign in again.");
      }
    } finally {
      document.body.classList.remove("bq-app-opening");
    }
  }

  async function initialiseView() {
    const config = await api("/api/auth/config", { silent: true });
    controller.experienceUpliftEnabled = Boolean(config?.experienceUpliftEnabled);
    controller.parentPinRecoveryEnabled = Boolean(config?.parentPinRecoveryEnabled);
    controller.familyPasswordRecoveryEnabled = Boolean(config?.familyPasswordRecoveryEnabled);
    document.body.classList.toggle("bq-experience-uplift", controller.experienceUpliftEnabled);
    if (!config?.enabled) {
      if (recoveryLink.seen) {
        const copy = "The recovery service could not be reached. Reopen your email link when the connection is available.";
        if (recoveryLink.purpose === "password") showFamilyPasswordUnavailable(copy);
        else showRecoveryUnavailable(copy);
        return;
      }
      if (!document.querySelector("#dashboardScreen")?.classList.contains("hidden")) {
        renderDashboard();
      }
      return;
    }
    controller.enabled = true;
    forgotPasswordButton.hidden = false;
    const signupTab = document.querySelector('[data-auth-tab="signup"]');
    signupTab?.classList.toggle("hidden", !config.signupEnabled);
    landingSignupButton?.classList.toggle("hidden", !config.signupEnabled);
    document.body.classList.add("bq-family-auth-enabled");
    if (recoveryLink.seen) {
      showRecoveryReset();
      return;
    }
    const current = await api("/api/auth/session", { silent: true });
    if (current?.authenticated) {
      session = current;
      if (window.location.hash === "#parent/evidence") {
        // The session endpoint validates the tab's parent capability and expiry.
        // Returning from a review must not implicitly switch back to the child.
        if (session.parentUnlocked) return returnToParent("evidence");
        if (!hydrateProfiles()) return false;
        return openParent({ skipSave: true });
      }
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
      const locked = await api("/api/auth/parent-lock", { method: "POST", silent: true });
      if (!locked?.ok) {
        showToast("Parent access could not be locked. Check the connection and try Return to child again.");
        return false;
      }
      sessionStorage.removeItem(parentCapabilityKey);
      session.parentUnlocked = false;
      const childSession = await api("/api/auth/session", { silent: true });
      if (!childSession?.authenticated) {
        await openParent({ skipSave: true });
        showMessage("Parent access is locked. Reconnect to continue to your child's learning.");
        return false;
      }
      session = childSession;
    }
    if (!hydrateProfiles()) return false;
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

  async function returnToChild() {
    if (!controller.enabled || !session) return false;
    if (!await preserveActiveWork()) return false;
    const current = await api("/api/auth/session", { silent: true });
    if (!current?.authenticated) {
      showToast("The family session could not be checked. Please reconnect and try again.");
      return false;
    }
    session = current;
    return continueFromSession();
  }

  function hydrateProfiles() {
    const familyId = session.family?.id || "";
    let rawStored = null;
    let rawOwner = null;
    let stored = {};
    let owner = {};
    try {
      rawStored = localStorage.getItem(storageKey);
      rawOwner = localStorage.getItem(cacheOwnerKey);
    } catch { return stopUnsafeHydration(); }
    try { stored = JSON.parse(rawStored || "{}"); } catch { /* Retain malformed original data in the device archive. */ }
    try { owner = JSON.parse(rawOwner || "{}"); } catch { /* A malformed owner cannot prove family ownership. */ }
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) stored = {};
    if (!owner || typeof owner !== "object" || Array.isArray(owner)) owner = {};
    const previous = state.profiles;
    const familyProfiles = {};
    const childMappings = {};
    session.children.forEach((child) => {
      const profileId = child.payload?.id || child.legacyProfileId || child.id;
      const hasPayload = child.payload && typeof child.payload === "object" && !Array.isArray(child.payload);
      let payload = hasPayload ? { ...child.payload } : {
        id: profileId,
        name: child.name,
        stars: child.stars || 0,
        attempts: [],
        trainingCompleted: {},
        writingSamples: []
      };
      if (hasPayload && familyId && typeof mergeCloudProfile === "function") {
        const memoryOwned = hydratedFamilyId === familyId && hydratedChildren[child.id] === profileId;
        const cacheOwned = owner.familyId === familyId && owner.children?.[child.id] === profileId;
        const cached = cacheOwned && stored[profileId]?.id === profileId ? stored[profileId] : null;
        const inMemory = memoryOwned && previous[profileId]?.id === profileId ? previous[profileId] : null;
        const local = cached && inMemory ? mergeCloudProfile(cached, inMemory, true) : inMemory || cached;
        if (local) payload = mergeCloudProfile(local, payload, true);
      }
      payload.id ||= profileId;
      payload.name ||= child.name;
      payload.cloudVersion = child.version;
      familyProfiles[payload.id] = payload;
      childMappings[child.id] = profileId;
    });
    const cacheRetained = familyId && owner.familyId === familyId && Object.keys(stored).length > 0 && Object.entries(stored).every(([profileId, profile]) =>
      profile?.id === profileId && session.children.some((child) => child.payload && typeof child.payload === "object" && !Array.isArray(child.payload) && childMappings[child.id] === profileId && owner.children?.[child.id] === profileId));
    if (rawStored && rawStored !== "{}" && !cacheRetained && !archiveDeviceProfiles(rawStored, rawOwner)) return stopUnsafeHydration();
    state.profiles = familyProfiles;
    hydratedFamilyId = familyId;
    hydratedChildren = childMappings;
    // Bind only the cache just written from this authorised session. If a write
    // fails, the old owner must not label a different family's replacement data.
    try { localStorage.removeItem(cacheOwnerKey); } catch { /* Storage may be unavailable. */ }
    normalizeProfiles();
    try {
      if (familyId && localStorage.getItem(storageKey) === JSON.stringify(state.profiles)) {
        localStorage.setItem(cacheOwnerKey, JSON.stringify({ familyId, children: childMappings }));
      }
    } catch { /* Cloud data remains available; do not infer cache ownership. */ }
    return true;
  }

  function archiveDeviceProfiles(profileCache, ownerMetadata) {
    try {
      const rawArchive = localStorage.getItem(recoveryArchiveKey);
      const archive = rawArchive ? JSON.parse(rawArchive) : { version: 1, entries: [] };
      if (archive?.version !== 1 || !Array.isArray(archive.entries)) return false;
      const identity = deviceArchiveIdentity(profileCache, ownerMetadata);
      if (archive.entries.some((entry) => entry && deviceArchiveIdentity(entry.profileCache, entry.ownerMetadata) === identity)) return true;
      // Keep originals only for device recovery. These entries are never merged
      // into an account or rendered in any family or child screen.
      archive.entries.push({ savedAt: new Date().toISOString(), profileCache, ownerMetadata });
      const serialised = JSON.stringify(archive);
      localStorage.setItem(recoveryArchiveKey, serialised);
      return localStorage.getItem(recoveryArchiveKey) === serialised;
    } catch { return false; }
  }

  function deviceArchiveIdentity(profileCache, ownerMetadata) {
    try {
      const profiles = JSON.parse(profileCache);
      const owner = ownerMetadata === null ? null : JSON.parse(ownerMetadata);
      if (!profiles || typeof profiles !== "object" || Array.isArray(profiles)) throw new Error("Unrecognised cache");
      if (ownerMetadata !== null && (!owner || typeof owner !== "object" || Array.isArray(owner))) throw new Error("Unrecognised owner");
      const comparable = Object.fromEntries(Object.entries(profiles).map(([id, profile]) => {
        if (!profile || typeof profile !== "object" || Array.isArray(profile)) throw new Error("Unrecognised profile");
        return [id, Object.fromEntries(Object.entries(profile).filter(([key]) => key !== "cloudVersion" && key !== "cloudSyncedAt"))];
      }));
      const stable = (value) => Array.isArray(value) ? value.map(stable)
        : value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
      // Compare learning content and complete ownership, but retain the first
      // exact original strings. Routine save acknowledgements add no history.
      return `content:${JSON.stringify(stable({ profiles: comparable, owner }))}`;
    } catch {
      return `original:${JSON.stringify([profileCache, ownerMetadata])}`;
    }
  }

  function stopUnsafeHydration() {
    showAuthOnly();
    showMessage("This device could not keep a safe copy of its earlier learning. Free some browser storage and try signing in again.");
    return false;
  }

  async function preserveActiveWork() {
    const profile = state.profile;
    if (!profile?.id || !session?.family?.id || hydratedFamilyId !== session.family.id) return true;
    const ownedChild = session.children.some((child) => child.id === session.activeChildId && hydratedChildren[child.id] === profile.id && child.payload && typeof child.payload === "object");
    if (!ownedChild || typeof syncProfileToCloud !== "function") return true;
    try {
      if (await syncProfileToCloud(profile)) return true;
    } catch { /* Keep the current view and device copy on a failed save. */ }
    const notice = "Your latest work is still on this device. Reconnect and try again before changing access.";
    if (authScreen.classList.contains("hidden")) showToast(notice);
    else showMessage(notice);
    return false;
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
    if (/^#\/?parent(?:\/|$)/.test(window.location.hash)) window.location.hash = "child/today";
    saveProfiles();
    if (switchProfileButton) switchProfileButton.textContent = session.children.length > 1 ? "Switch child" : "Log out";
    renderDashboard();
    authScreen.classList.add("hidden");
    showScreen("dashboard");
    requestAnimationFrame(() => {
      if (window.BrightQuestChildExperience?.restoreScroll) window.BrightQuestChildExperience.restoreScroll();
      else window.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  function showGateway() {
    if (!controller.enabled) return;
    session = null;
    sessionStorage.removeItem(parentCapabilityKey);
    sessionStorage.removeItem(childCapabilityKey);
    forms.classList.remove("hidden");
    nextStep.classList.add("hidden");
    nextStep.innerHTML = "";
    setAuthView("gateway");
    clearMessage();
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyLoginEmail")?.focus());
  }

  function showCreateChild() {
    setAuthView("create");
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
    // A chooser has no active child access, including after a page reload.
    // Saved records remain in the profile cache or the device recovery archive.
    state.profile = null;
    state.profileId = "";
    state.parentProfileId = "";
    state.selectedRole = "";
    try { localStorage.removeItem("brightQuestActiveProfile"); } catch { /* The server selection still governs access. */ }
    setAuthView("chooser");
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
    if (!await preserveActiveWork()) return;
    const current = await api("/api/auth/session");
    if (!current?.authenticated) return showGateway();
    session = current;
    if (!session.parentUnlocked) {
      openParent();
      return;
    }
    if (!hydrateProfiles()) return false;
    showFamilySettings();
  }

  function showFamilySettings() {
    setAuthView("settings");
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
      if (!hydrateProfiles()) return false;
      showFamilySettings();
    }
  }

  function returnToParent(destination = "overview") {
    if (!hydrateProfiles()) return false;
    state.selectedRole = "parent";
    state.parentProfileId = state.parentProfileId && state.profiles[state.parentProfileId]
      ? state.parentProfileId
      : Object.keys(state.profiles)[0] || "";
    window.location.hash = destination === "evidence" ? "parent/evidence" : "parent/overview";
    renderParentDashboard();
    authScreen.classList.add("hidden");
    showScreen("parent");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  async function selectChild(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    if (!await preserveActiveWork()) { setBusy(form, false); return; }
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

  async function openParent(options = {}) {
    if (!controller.enabled || !session) return;
    if (!options.skipSave && !await preserveActiveWork()) return;
    clearMessage();
    setAuthView("parent");
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
      <div class="bq-auth-secondary-actions"><button class="bq-auth-text-action" type="button" data-forgot-parent-pin>Forgot parent PIN?</button><button class="button button-soft" type="button" data-back-to-child>Back</button></div>
    `;
    nextStep.querySelector("[data-parent-unlock]")?.addEventListener("submit", unlockParent);
    nextStep.querySelector("[data-back-to-child]")?.addEventListener("click", () => continueFromSession());
    nextStep.querySelector("[data-forgot-parent-pin]")?.addEventListener("click", openParentPinRecovery);
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyParentPin")?.focus());
  }

  function captureRecoveryLink() {
    const hash = String(window.location.hash || "");
    const prefix = hash.startsWith("#password-reset=") ? "#password-reset=" : hash.startsWith("#parent-pin-reset=") ? "#parent-pin-reset=" : "";
    if (!prefix) return { seen: false, token: "", purpose: "" };
    const value = hash.slice(prefix.length);
    // Keep the credential only in this closure. Fragments are never sent to the server.
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    return { seen: true, token: /^[a-f0-9]{64}$/i.test(value) ? value : "", purpose: prefix === "#password-reset=" ? "password" : "parent-pin" };
  }

  function showRecoveryReset() {
    if (recoveryLink.purpose === "password") showFamilyPasswordReset();
    else showParentPinReset();
  }

  function pauseTestForRecovery() {
    const testScreen = document.querySelector("#testScreen");
    if (testScreen && !testScreen.classList.contains("hidden")) document.querySelector("#exitTestButton")?.click();
  }

  async function openRecoveryResetSafely() {
    pauseTestForRecovery();
    if (!await preserveActiveWork()) {
      if (!recoveryRetryNotice) {
        recoveryRetryNotice = document.createElement("section");
        recoveryRetryNotice.className = "bq-recovery-retry-notice";
        recoveryRetryNotice.setAttribute("role", "alert");
        recoveryRetryNotice.innerHTML = '<p>Your reset link is ready. Reconnect to save your latest learning before opening it.</p><div><button class="button button-primary" type="button" data-recovery-retry>Retry opening reset link</button><button class="button button-soft" type="button" data-recovery-dismiss>Dismiss</button></div>';
        recoveryRetryNotice.querySelector("[data-recovery-retry]")?.addEventListener("click", openRecoveryResetSafely);
        recoveryRetryNotice.querySelector("[data-recovery-dismiss]")?.addEventListener("click", () => {
          recoveryLink = { seen: false, token: "", purpose: "" };
          recoveryRetryNotice?.remove(); recoveryRetryNotice = null;
        });
        document.body.append(recoveryRetryNotice);
      }
      return false;
    }
    recoveryRetryNotice?.remove(); recoveryRetryNotice = null;
    showRecoveryReset();
    return true;
  }

  function prepareRecoveryView(view = "pin-recovery") {
    pauseTestForRecovery();
    setAuthView(view);
    forms.classList.add("hidden");
    nextStep.classList.remove("hidden");
    clearMessage();
  }

  function openParentPinRecovery() {
    if (!controller.enabled || !session) return showGateway();
    if (!controller.parentPinRecoveryEnabled) return showRecoveryUnavailable();
    prepareRecoveryView();
    nextStep.innerHTML = `
      <p class="eyebrow">Parent access</p>
      <h3>Reset your parent PIN</h3>
      <p>Confirm your family sign-in password. We will send a one-time reset link to the email address registered with this family.</p>
      <form class="bq-auth-form" data-parent-pin-recovery>
        <label for="familyRecoveryPassword">Family account password</label>
        <input id="familyRecoveryPassword" name="password" type="password" autocomplete="current-password" minlength="8" maxlength="128" required />
        <button class="button button-primary" type="submit" data-busy-label="Sending link…">Send reset link</button>
      </form>
      <div class="bq-auth-secondary-actions"><button class="bq-auth-text-action" type="button" data-forgot-family-password>Forgot family password?</button><button class="button button-soft" type="button" data-recovery-back>Back to parent PIN</button></div>
    `;
    nextStep.querySelector("[data-parent-pin-recovery]")?.addEventListener("submit", requestParentPinRecovery);
    nextStep.querySelector("[data-recovery-back]")?.addEventListener("click", openParent);
    nextStep.querySelector("[data-forgot-family-password]")?.addEventListener("click", openFamilyPasswordRecovery);
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyRecoveryPassword")?.focus());
  }

  async function requestParentPinRecovery(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    clearMessage();
    let unavailable = false;
    const result = await api("/api/auth/parent-pin-reset-request", {
      method: "POST",
      body: { password: data.get("password") },
      onError: (error) => { unavailable = error.code === "RECOVERY_UNAVAILABLE"; }
    });
    setBusy(form, false);
    form.querySelector('[name="password"]').value = "";
    if (unavailable) return showRecoveryUnavailable();
    if (!result?.ok) {
      form.querySelector('[name="password"]')?.focus();
      return;
    }
    recoveryEmail = result.maskedEmail || "your registered family email";
    const minutes = Math.max(1, Number(result.expiresInMinutes) || 15);
    nextStep.innerHTML = `
      <span class="bq-recovery-symbol" aria-hidden="true">✉</span>
      <p class="eyebrow">Check your email</p>
      <h3>Your reset link is on its way</h3>
      <p>A one-time link was sent to <strong>${escapeHtml(recoveryEmail)}</strong>. Open it to choose a new parent PIN.</p>
      <p class="bq-recovery-note">The link expires in ${minutes} minutes. If it has not arrived, check your junk folder.</p>
      <div class="bq-auth-secondary-actions"><button class="button button-primary" type="button" data-recovery-back>Back to parent PIN</button><button class="bq-auth-text-action" type="button" data-recovery-again>Request another link</button></div>
    `;
    nextStep.querySelector("[data-recovery-back]")?.addEventListener("click", openParent);
    nextStep.querySelector("[data-recovery-again]")?.addEventListener("click", openParentPinRecovery);
    focusRecoveryHeading();
  }

  function showRecoveryUnavailable(copy = "Email recovery is not available right now. Try again later, or use your existing parent PIN.") {
    prepareRecoveryView();
    nextStep.innerHTML = `<p class="eyebrow">Parent access</p><h3>Email recovery is unavailable</h3><p>${escapeHtml(copy)}</p><div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-recovery-back>${!controller.enabled ? "Try again" : session ? "Back to parent PIN" : "Back to sign in"}</button></div>`;
    nextStep.querySelector("[data-recovery-back]")?.addEventListener("click", () => !controller.enabled ? initialise() : session ? openParent() : showGateway());
    showAuthOnly();
    focusRecoveryHeading();
  }

  function showParentPinReset() {
    prepareRecoveryView();
    if (!recoveryLink.token || recoveryLink.purpose !== "parent-pin") {
      showInvalidRecoveryLink();
      return;
    }
    nextStep.innerHTML = `
      <p class="eyebrow">Restore parent access</p>
      <h3>Choose a new parent PIN</h3>
      <p>Use 4 to 8 digits. After the reset, sign in to your family account and unlock the parent view with your new PIN.</p>
      <form class="bq-auth-form" data-parent-pin-reset>
        <label for="familyResetParentPin">New parent PIN</label>
        <input id="familyResetParentPin" name="parentPin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" minlength="4" maxlength="8" autocomplete="new-password" required />
        <label for="familyResetParentPinConfirm">Confirm new parent PIN</label>
        <input id="familyResetParentPinConfirm" name="confirmParentPin" type="password" inputmode="numeric" pattern="[0-9]{4,8}" minlength="4" maxlength="8" autocomplete="new-password" required />
        <button class="button button-primary" type="submit" data-busy-label="Updating PIN…">Update parent PIN</button>
      </form>
      <div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-recovery-cancel>Cancel</button></div>
    `;
    nextStep.querySelector("[data-parent-pin-reset]")?.addEventListener("submit", confirmParentPinReset);
    nextStep.querySelector("[data-recovery-cancel]")?.addEventListener("click", () => { recoveryLink = { seen: false, token: "" }; showGateway(); });
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyResetParentPin")?.focus());
  }

  async function confirmParentPinReset(event) {
    event.preventDefault();
    if (recoveryConfirmationPending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const parentPin = String(data.get("parentPin") || "");
    const confirmation = String(data.get("confirmParentPin") || "");
    clearMessage();
    if (!/^[0-9]{4,8}$/.test(parentPin)) {
      showMessage("Use 4 to 8 digits for your new parent PIN.");
      form.querySelector('[name="parentPin"]')?.focus();
      return;
    }
    if (parentPin !== confirmation) {
      showMessage("The two PINs do not match. Please enter the same PIN in both fields.");
      form.querySelector('[name="confirmParentPin"]')?.focus();
      return;
    }
    if (!recoveryLink.token || recoveryLink.purpose !== "parent-pin") return showInvalidRecoveryLink();
    setRecoveryConfirmationBusy(form, true);
    if (!await preserveActiveWork()) { setRecoveryConfirmationBusy(form, false); return; }
    let invalidLink = false;
    const result = await api("/api/auth/parent-pin-reset-confirm", {
      method: "POST",
      body: { token: recoveryLink.token, parentPin },
      onError: (error) => { invalidLink = error.code === "RECOVERY_LINK_INVALID"; }
    });
    setRecoveryConfirmationBusy(form, false);
    if (invalidLink) {
      recoveryLink = { seen: true, token: "" };
      showInvalidRecoveryLink();
      return;
    }
    if (!result?.ok) return;
    recoveryLink = { seen: false, token: "" };
    recoveryEmail = "";
    form.reset();
    sessionStorage.removeItem(parentCapabilityKey);
    sessionStorage.removeItem(childCapabilityKey);
    session = null;
    state.profile = null;
    state.profileId = "";
    state.parentProfileId = "";
    state.selectedRole = "";
    nextStep.innerHTML = `<span class="bq-recovery-symbol success" aria-hidden="true">✓</span><p class="eyebrow">Parent access restored</p><h3>Your parent PIN is updated</h3><p>Sign in again, then enter your new PIN to open the parent view.</p><button class="button button-primary" type="button" data-recovery-signin>Sign in to Bright Quest</button>`;
    nextStep.querySelector("[data-recovery-signin]")?.addEventListener("click", showGateway);
    showAuthOnly();
    focusRecoveryHeading();
  }

  function showInvalidRecoveryLink() {
    clearMessage();
    nextStep.innerHTML = `<p class="eyebrow">Parent access</p><h3>This reset link cannot be used</h3><p>It may have expired or already been used. Sign in to your family account, choose Parent, then request a new link from Forgot parent PIN.</p><button class="button button-primary" type="button" data-recovery-signin>Back to sign in</button>`;
    nextStep.querySelector("[data-recovery-signin]")?.addEventListener("click", () => { recoveryLink = { seen: false, token: "" }; showGateway(); });
    showAuthOnly();
    focusRecoveryHeading();
  }

  async function openFamilyPasswordRecovery() {
    if (!await preserveActiveWork()) return;
    if (!controller.enabled || !controller.familyPasswordRecoveryEnabled) return showFamilyPasswordUnavailable();
    prepareRecoveryView("password-recovery");
    nextStep.innerHTML = `
      <p class="eyebrow">Family sign-in</p><h3>Reset your family password</h3>
      <p>Enter the email address you use to sign in. If it matches a family account, we will send a one-time reset link.</p>
      <form class="bq-auth-form" data-family-password-recovery>
        <label for="familyRecoveryEmail">Family email</label>
        <input id="familyRecoveryEmail" name="email" type="email" autocomplete="email" maxlength="254" required />
        <button class="button button-primary" type="submit" data-busy-label="Requesting link…">Send reset link</button>
      </form>
      <div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-password-recovery-back>${session ? "Back to parent PIN" : "Back to sign in"}</button></div>
    `;
    nextStep.querySelector('[name="email"]').value = session?.user?.email || loginForm?.querySelector('[name="email"]')?.value || "";
    nextStep.querySelector("[data-family-password-recovery]")?.addEventListener("submit", requestFamilyPasswordRecovery);
    nextStep.querySelector("[data-password-recovery-back]")?.addEventListener("click", backFromFamilyPasswordRecovery);
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyRecoveryEmail")?.focus());
  }

  function backFromFamilyPasswordRecovery() {
    recoveryLink = { seen: false, token: "", purpose: "" };
    if (session) openParent();
    else showGateway();
  }

  async function requestFamilyPasswordRecovery(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    clearMessage();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Enter a valid family email address.");
      form.querySelector('[name="email"]')?.focus();
      return;
    }
    setBusy(form, true);
    let unavailable = false;
    const result = await api("/api/auth/password-reset-request", {
      method: "POST", body: { email },
      onError: (error) => { unavailable = error.code === "RECOVERY_UNAVAILABLE"; }
    });
    setBusy(form, false);
    if (unavailable) return showFamilyPasswordUnavailable();
    if (!result?.ok) return;
    form.reset();
    nextStep.innerHTML = `
      <span class="bq-recovery-symbol" aria-hidden="true">✉</span><p class="eyebrow">Check your email</p>
      <h3>Check for a reset link</h3><p>If an account uses that email address, a reset link will arrive shortly. Check your junk folder too.</p>
      <p class="bq-recovery-note">The link expires in 15 minutes. Your parent PIN stays the same when you reset your family password.</p>
      <div class="bq-auth-secondary-actions"><button class="button button-primary" type="button" data-password-recovery-back>${session ? "Back to parent PIN" : "Back to sign in"}</button><button class="bq-auth-text-action" type="button" data-password-recovery-again>Try another email</button></div>
    `;
    nextStep.querySelector("[data-password-recovery-back]")?.addEventListener("click", backFromFamilyPasswordRecovery);
    nextStep.querySelector("[data-password-recovery-again]")?.addEventListener("click", openFamilyPasswordRecovery);
    focusRecoveryHeading();
  }

  function showFamilyPasswordUnavailable(copy = "Password recovery is not available right now. Try again later, or sign in with your existing family password.") {
    prepareRecoveryView("password-recovery");
    nextStep.innerHTML = `<p class="eyebrow">Family sign-in</p><h3>Password recovery is unavailable</h3><p>${escapeHtml(copy)}</p><button class="button button-soft" type="button" data-password-recovery-back>${!controller.enabled ? "Try again" : session ? "Back to parent PIN" : "Back to sign in"}</button>`;
    nextStep.querySelector("[data-password-recovery-back]")?.addEventListener("click", () => !controller.enabled ? initialise() : backFromFamilyPasswordRecovery());
    showAuthOnly();
    focusRecoveryHeading();
  }

  function showFamilyPasswordReset() {
    prepareRecoveryView("password-recovery");
    if (!controller.familyPasswordRecoveryEnabled) return showFamilyPasswordUnavailable();
    if (!recoveryLink.token || recoveryLink.purpose !== "password") return showInvalidPasswordLink();
    nextStep.innerHTML = `
      <p class="eyebrow">Restore family sign-in</p><h3>Choose a new family password</h3>
      <p>Use 8 to 128 characters. You will sign in again with this password after the reset.</p>
      <form class="bq-auth-form" data-family-password-reset>
        <label for="familyResetPassword">New family password</label>
        <input id="familyResetPassword" name="password" type="password" autocomplete="new-password" minlength="8" maxlength="128" required />
        <label for="familyResetPasswordConfirm">Confirm new password</label>
        <input id="familyResetPasswordConfirm" name="confirmPassword" type="password" autocomplete="new-password" minlength="8" maxlength="128" required />
        <button class="button button-primary" type="submit" data-busy-label="Updating password…">Update family password</button>
      </form>
      <div class="bq-auth-secondary-actions"><button class="button button-soft" type="button" data-password-reset-cancel>Cancel</button></div>
    `;
    nextStep.querySelector("[data-family-password-reset]")?.addEventListener("submit", confirmFamilyPasswordReset);
    nextStep.querySelector("[data-password-reset-cancel]")?.addEventListener("click", () => { recoveryLink = { seen: false, token: "", purpose: "" }; showGateway(); });
    showAuthOnly();
    requestAnimationFrame(() => document.querySelector("#familyResetPassword")?.focus());
  }

  async function confirmFamilyPasswordReset(event) {
    event.preventDefault();
    if (recoveryConfirmationPending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") || "");
    const confirmation = String(data.get("confirmPassword") || "");
    clearMessage();
    if (password.length < 8 || password.length > 128) {
      showMessage("Use 8 to 128 characters for your new family password.");
      form.querySelector('[name="password"]')?.focus();
      return;
    }
    if (password !== confirmation) {
      showMessage("The two passwords do not match. Please enter the same password in both fields.");
      form.querySelector('[name="confirmPassword"]')?.focus();
      return;
    }
    if (!recoveryLink.token || recoveryLink.purpose !== "password") return showInvalidPasswordLink();
    setRecoveryConfirmationBusy(form, true);
    if (!await preserveActiveWork()) { setRecoveryConfirmationBusy(form, false); return; }
    let invalidLink = false;
    const result = await api("/api/auth/password-reset-confirm", {
      method: "POST", body: { token: recoveryLink.token, password },
      onError: (error) => { invalidLink = error.code === "RECOVERY_LINK_INVALID"; }
    });
    setRecoveryConfirmationBusy(form, false);
    if (invalidLink) {
      recoveryLink = { seen: true, token: "", purpose: "password" };
      return showInvalidPasswordLink();
    }
    if (!result?.ok) return;
    recoveryLink = { seen: false, token: "", purpose: "" };
    form.reset();
    sessionStorage.removeItem(parentCapabilityKey);
    sessionStorage.removeItem(childCapabilityKey);
    session = null;
    state.profile = null;
    state.profileId = "";
    state.parentProfileId = "";
    state.selectedRole = "";
    nextStep.innerHTML = `<span class="bq-recovery-symbol success" aria-hidden="true">✓</span><p class="eyebrow">Family sign-in restored</p><h3>Your family password is updated</h3><p>Sign in with your new password. Your parent PIN stays the same.</p><button class="button button-primary" type="button" data-password-recovery-signin>Sign in to Bright Quest</button>`;
    nextStep.querySelector("[data-password-recovery-signin]")?.addEventListener("click", showGateway);
    showAuthOnly();
    focusRecoveryHeading();
  }

  function showInvalidPasswordLink() {
    clearMessage();
    nextStep.innerHTML = `<p class="eyebrow">Family sign-in</p><h3>This password reset link cannot be used</h3><p>It may have expired or already been used. Request a new link to reset your family password.</p><div class="bq-auth-secondary-actions"><button class="button button-primary" type="button" data-password-new-link>Request a new link</button><button class="button button-soft" type="button" data-password-recovery-signin>Back to sign in</button></div>`;
    nextStep.querySelector("[data-password-new-link]")?.addEventListener("click", () => { recoveryLink = { seen: false, token: "", purpose: "" }; openFamilyPasswordRecovery(); });
    nextStep.querySelector("[data-password-recovery-signin]")?.addEventListener("click", () => { recoveryLink = { seen: false, token: "", purpose: "" }; showGateway(); });
    showAuthOnly();
    focusRecoveryHeading();
  }

  function focusRecoveryHeading() {
    requestAnimationFrame(() => {
      const heading = nextStep.querySelector("h3");
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus();
    });
  }

  function setRecoveryConfirmationBusy(form, busy) {
    recoveryConfirmationPending = busy;
    setBusy(form, busy);
    nextStep.querySelectorAll("input,button").forEach((control) => { control.disabled = busy; });
    nextStep.setAttribute("aria-busy", String(busy));
  }

  async function unlockParent(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(form, true);
    if (!await preserveActiveWork()) { setBusy(form, false); return; }
    const result = await api("/api/auth/parent-unlock", { method: "POST", body: { pin: data.get("pin") } });
    setBusy(form, false);
    if (!result?.ok) return;
    sessionStorage.setItem(parentCapabilityKey, result.parentCapability);
    session = await api("/api/auth/session");
    if (!session?.authenticated) return;
    returnToParent(window.location.hash === "#parent/evidence" ? "evidence" : "overview");
  }

  async function logout() {
    if (!await preserveActiveWork()) return false;
    await api("/api/auth/session", { method: "DELETE", silent: true });
    localStorage.removeItem(storageKey);
    localStorage.removeItem("brightQuestActiveProfile");
    localStorage.removeItem(cacheOwnerKey);
    hydratedFamilyId = "";
    hydratedChildren = {};
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
    if (!await preserveActiveWork()) return;
    if (session.children.length > 1) {
      const result = await api("/api/auth/select-child", { method: "POST", body: { childId: null } });
      if (!result?.ok) return;
      sessionStorage.removeItem(parentCapabilityKey);
      sessionStorage.removeItem(childCapabilityKey);
      session.activeChildId = null;
      session.parentUnlocked = false;
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

  function setAuthView(view) {
    authScreen.dataset.authView = view;
    authScreen.classList.toggle("bq-auth-compact", view !== "gateway");
    if (view === "gateway") {
      authScreen.setAttribute("aria-labelledby", "familyAuthTitle");
      authScreen.removeAttribute("aria-label");
    } else {
      authScreen.removeAttribute("aria-labelledby");
      authScreen.setAttribute("aria-label", ({ chooser: "Choose a child", settings: "Family settings", parent: "Parent access", "pin-recovery": "Reset parent PIN", "password-recovery": "Reset family password" })[view] || "Family account");
    }
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
        options.onError?.(body);
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
