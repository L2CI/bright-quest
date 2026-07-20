(() => {
  "use strict";

  const BUILD = "mechshift-beacon-dock-004";
  const FORMS = {
    rover: { name: "Rover", label: "Rover form", texture: "rover", charge: 2, speed: 0.0001 },
    lift: { name: "Lift", label: "Lift mech", texture: "lift", charge: 4, speed: 0.000075 },
    bridge: { name: "Bridge", label: "Bridge crawler", texture: "bridge", charge: 4, speed: 0.000085 }
  };
  const MISSIONS = [
    {
      kicker: "Aether City / System 01",
      title: "Reach the Evac Dock",
      instruction: "Drive to the amber rescue beacon.",
      operate: "Load rescue pods",
      form: "rover",
      x: 0.22,
      objective: "Evac dock awaiting Relay-7"
    },
    {
      kicker: "Aether City / System 02",
      title: "Clear the Power Yard",
      instruction: "Head for the six cyan energy racks.",
      operate: "Power lift clamps",
      form: "lift",
      x: 0.54,
      objective: "Power yard blocked by debris"
    },
    {
      kicker: "Aether City / System 03",
      title: "Bridge the Sky Gap",
      instruction: "Reach the storm-side bridge edge.",
      operate: "Deploy bridge route",
      form: "bridge",
      x: 0.84,
      objective: "Sky gap needs a safe route"
    }
  ];

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const dom = {
    start: $("#startScreen"), startButton: $("#startButton"),
    brief: $("#briefScreen"), briefButton: $("#briefContinueButton"),
    challenge: $("#challengeScreen"), challengeBody: $("#challengeBody"),
    challengeKicker: $("#challengeKicker"), challengeTitle: $("#challengeTitle"), challengeStory: $("#challengeStory"),
    challengeClose: $("#challengeCloseButton"), confirm: $("#confirmChallengeButton"), hintButton: $("#hintButton"), hintText: $("#hintText"),
    pause: $("#pauseScreen"), pauseButton: $("#pauseButton"), resume: $("#resumeButton"), restart: $("#restartButton"), motion: $("#motionButton"), sound: $("#soundButton"),
    result: $("#resultScreen"), resultTime: $("#resultTime"), resultStars: $("#resultStars"), playAgain: $("#playAgainButton"),
    missionKicker: $("#missionKicker"), missionTitle: $("#missionTitle"), missionInstruction: $("#missionInstruction"),
    objectiveCount: $("#objectiveCount"), objectiveCopy: $("#objectiveCopy"), objectiveList: $("#objectiveList"),
    operate: $("#operateButton"), operateIcon: $("#operateFormIcon"), captions: $("#captions"), chargeRing: $("#chargeRing"), chargeValue: $("#chargeValue"), formName: $("#formName"), feedback: $("#feedbackBurst")
  };

  const state = {
    started: false,
    control: false,
    paused: false,
    challengeOpen: false,
    mission: 0,
    completed: 0,
    form: "rover",
    charge: 100,
    playerX: 0.11,
    docked: false,
    keys: { left: false, right: false },
    elapsed: 0,
    startedAt: 0,
    timer: null,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    hintLevel: 0,
    mistakes: 0,
    challengeData: null,
    scene: null,
    sprite: null,
    victoryFrame: null
  };

  class MissionScene extends Phaser.Scene {
    constructor() { super("mission"); }

    preload() {
      this.load.image("city", "assets/aether-city-mission-deck.webp");
      this.load.image("rover", "assets/relay7-rover.webp");
      this.load.image("lift", "assets/relay7-lift.webp");
      this.load.image("bridge", "assets/relay7-bridge.webp");
      this.load.image("victory", "assets/mechshift-rescue-keyframe.webp");
    }

    create() {
      state.scene = this;
      this.city = this.add.image(0, 0, "city").setOrigin(0.5);
      this.city.setDepth(0);
      this.sprite = this.add.image(0, 0, "rover").setOrigin(0.5, 0.82).setDepth(3);
      state.sprite = this.sprite;
      this.sprite.setAlpha(0);
      this.victory = this.add.image(0, 0, "victory").setOrigin(0.5).setDepth(10).setAlpha(0).setVisible(false);
      state.victoryFrame = this.victory;
      this.resize({ width: this.scale.width, height: this.scale.height });
      this.scale.on("resize", this.resize, this);
      this.cameras.main.fadeIn(500, 3, 11, 23);
    }

    resize(gameSize) {
      const width = gameSize.width;
      const height = gameSize.height;
      const cover = Math.max(width / this.city.width, height / this.city.height);
      const shortLandscape = width / Math.max(height, 1) > 2;
      this.city.setPosition(width / 2, height * (shortLandscape ? 0.47 : 0.5)).setScale(cover);
      this.victory.setPosition(width / 2, height / 2).setScale(Math.max(width / this.victory.width, height / this.victory.height));
      this.placeVehicle();
    }

    vehicleScale() {
      const width = this.scale.width;
      const height = this.scale.height;
      const viewportScale = Math.min(width / 1360, height / 720);
      if (state.form === "lift") return Math.max(0.12, Math.min(0.29, viewportScale * 0.25));
      if (state.form === "bridge") return Math.max(0.125, Math.min(0.31, viewportScale * 0.26));
      return Math.max(0.13, Math.min(0.32, viewportScale * 0.27));
    }

    placeVehicle() {
      if (!this.sprite) return;
      const shortLandscape = this.scale.width / Math.max(this.scale.height, 1) > 2;
      this.sprite.setPosition(this.scale.width * state.playerX, this.scale.height * (shortLandscape ? 0.72 : 0.79));
      const s = this.vehicleScale();
      if (!this.tweens.isTweening(this.sprite)) this.sprite.setScale(s);
    }

    update(_time, delta) {
      if (!state.started || !state.control || state.paused || state.challengeOpen || state.completed >= 3) return;
      if (state.docked) {
        this.sprite.rotation = Phaser.Math.Linear(this.sprite.rotation, 0, .14);
        this.placeVehicle();
        return;
      }
      const direction = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
      if (direction) {
        const previousX = state.playerX;
        const nextX = Math.max(0.09, Math.min(0.91, previousX + direction * FORMS[state.form].speed * delta));
        const targetX = MISSIONS[state.mission]?.x;
        const crossedBeacon = Number.isFinite(targetX) && ((direction > 0 && previousX < targetX && nextX >= targetX) || (direction < 0 && previousX > targetX && nextX <= targetX));
        state.playerX = crossedBeacon ? targetX : nextX;
        this.sprite.setFlipX(direction < 0);
        if (!state.reducedMotion) this.sprite.rotation = Phaser.Math.Linear(this.sprite.rotation, direction * 0.018, .12);
        if (crossedBeacon) dockAtBeacon();
      } else {
        this.sprite.rotation = Phaser.Math.Linear(this.sprite.rotation, 0, .14);
      }
      this.placeVehicle();
      updateProximity();
    }
  }

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "gameCanvas",
    backgroundColor: "#071b35",
    transparent: false,
    scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
    render: { antialias: true, pixelArt: false, roundPixels: false },
    scene: MissionScene,
    audio: { noAudio: true }
  });

  class RescueAudio {
    constructor() { this.ctx = null; this.muted = false; this.loop = null; this.step = 0; }
    start() {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.ctx.resume();
      if (!this.loop) this.loop = setInterval(() => this.musicTick(), 760);
    }
    tone(freq, duration = .12, type = "sine", volume = .035, slide = 0) {
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), now + duration);
      gain.gain.setValueAtTime(.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now); osc.stop(now + duration + .03);
    }
    musicTick() {
      if (!state.started || state.paused || state.challengeOpen || this.muted) return;
      const notes = [110, 146.83, 164.81, 196, 164.81, 146.83, 123.47, 146.83];
      const freq = notes[this.step++ % notes.length];
      this.tone(freq, .5, "triangle", .014);
      if (this.step % 4 === 0) this.tone(freq * 2, .2, "sine", .009);
    }
    sfx(name) {
      if (name === "transform") { this.tone(140, .22, "sawtooth", .03, 420); setTimeout(() => this.tone(620, .12, "sine", .025), 120); }
      if (name === "move") this.tone(82, .08, "square", .008, -14);
      if (name === "select") this.tone(420, .07, "sine", .018, 90);
      if (name === "wrong") { this.tone(180, .16, "square", .02, -55); setTimeout(() => this.tone(130, .18, "square", .016), 90); }
      if (name === "success") [0, 110, 220].forEach((delay, i) => setTimeout(() => this.tone([392,523.25,659.25][i], .28, "triangle", .03), delay));
      if (name === "victory") [0,120,240,380].forEach((delay, i) => setTimeout(() => this.tone([261.63,392,523.25,783.99][i], .42, "triangle", .04), delay));
    }
    toggle() { this.muted = !this.muted; return this.muted; }
  }
  const audio = new RescueAudio();

  function startMission() {
    audio.start();
    state.started = true;
    state.startedAt = Date.now();
    state.elapsed = 0;
    dom.start.classList.add("hidden");
    dom.brief.classList.remove("hidden");
    state.scene?.tweens.add({ targets: state.sprite, alpha: 1, duration: state.reducedMotion ? 1 : 600, ease: "Sine.Out" });
    startTimer();
    speak("Nimbus: Storm front incoming. Let’s build one safe route through the city.", 4600);
  }

  function takeControl() {
    dom.brief.classList.add("hidden");
    state.control = true;
    updateMissionHud();
    speak("Drive right to the amber Evac Dock beacon. Rover form is ready.", 3800);
  }

  function startTimer() {
    clearInterval(state.timer);
    state.timer = setInterval(() => {
      if (!state.paused && state.started && state.completed < 3) state.elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
    }, 1000);
  }

  function setDrive(direction, pressed) {
    if (!pressed) {
      state.keys[direction] = false;
      document.querySelector(`[data-drive="${direction}"]`)?.classList.remove("pressed");
      return;
    }
    if (!state.control || state.paused || state.challengeOpen || state.docked) {
      if (state.docked) updateProximity();
      return;
    }
    state.keys[direction] = true;
    audio.sfx("move");
    document.body.classList.add("drive-learned");
    document.querySelector(`[data-drive="${direction}"]`)?.classList.add("pressed");
  }

  function releaseDrive() {
    setDrive("left", false);
    setDrive("right", false);
  }

  function dockAtBeacon(announce = true) {
    const mission = MISSIONS[state.mission];
    if (!mission) return;
    state.docked = true;
    state.playerX = mission.x;
    releaseDrive();
    state.scene?.placeVehicle();
    updateProximity();
    audio.sfx("select");
    if (!announce) return;
    const message = state.form === mission.form
      ? `Rescue point reached. Tap ${mission.operate}.`
      : `Rescue point reached. Tap Switch to ${FORMS[mission.form].name}.`;
    speak(message, 3600);
  }

  function selectForm(nextForm, announce = true) {
    if (!FORMS[nextForm] || nextForm === state.form || state.paused || state.challengeOpen || !state.control) return;
    const scene = state.scene;
    const sprite = state.sprite;
    if (!scene || !sprite) return;
    state.form = nextForm;
    state.charge = Math.max(0, state.charge - FORMS[nextForm].charge);
    updateCharge();
    $$(".form-button").forEach((button) => {
      const active = button.dataset.form === nextForm;
      button.classList.toggle("selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    audio.sfx("transform");
    const finalScale = scene.vehicleScale();
    if (state.reducedMotion) {
      sprite.setTexture(FORMS[nextForm].texture).setScale(finalScale);
    } else {
      scene.cameras.main.flash(170, 58, 229, 255, true);
      scene.tweens.killTweensOf(sprite);
      scene.tweens.add({ targets: sprite, scaleX: finalScale * .68, scaleY: finalScale * .68, alpha: .38, angle: sprite.flipX ? 3 : -3, duration: 125, ease: "Quad.In", onComplete: () => {
        sprite.setTexture(FORMS[nextForm].texture);
        scene.tweens.add({ targets: sprite, scaleX: finalScale, scaleY: finalScale, alpha: 1, angle: 0, duration: 245, ease: "Back.Out" });
      }});
    }
    dom.operateIcon.src = `assets/relay7-${nextForm}.webp`;
    burst(innerWidth * state.playerX, innerHeight * .73, ["#4cf4ff", "#ffad37"], 24);
    if (announce) speak(`Transformation complete. ${FORMS[nextForm].label} ready.`, 2200);
    updateProximity();
  }

  function updateCharge() {
    dom.chargeValue.textContent = state.charge;
    dom.chargeRing.style.setProperty("--charge", `${state.charge}%`);
    dom.formName.textContent = FORMS[state.form].label;
  }

  function updateProximity() {
    const mission = MISSIONS[state.mission];
    if (!mission) { dom.operate.classList.add("hidden"); return; }
    const atBeacon = state.docked;
    dom.operate.classList.toggle("hidden", !atBeacon);
    document.body.classList.toggle("near-beacon", atBeacon);
    if (atBeacon) {
      const ready = state.form === mission.form;
      const action = ready ? mission.operate : `Switch to ${FORMS[mission.form].name}`;
      dom.operateIcon.src = `assets/relay7-${mission.form}.webp`;
      dom.operate.querySelector(":scope > span").textContent = action;
      dom.operate.setAttribute("aria-label", action);
      dom.missionInstruction.textContent = ready ? `Ready — tap ${mission.operate}.` : `Tap Switch to ${FORMS[mission.form].name}, then load.`;
      return;
    }
    const direction = state.playerX < mission.x ? "RIGHT" : "LEFT";
    dom.missionInstruction.textContent = `Hold ${direction} — Relay-7 stops at the rescue beacon.`;
  }

  function operate() {
    const mission = MISSIONS[state.mission];
    if (!mission || !state.docked) return;
    if (state.form !== mission.form) {
      selectForm(mission.form, false);
      speak(`${FORMS[mission.form].name} ready. Now tap ${mission.operate}.`, 3000);
      updateProximity();
      return;
    }
    openChallenge(state.mission);
  }

  function shakeVehicle() {
    if (state.reducedMotion || !state.scene || !state.sprite) return;
    state.scene.tweens.add({ targets: state.sprite, x: state.sprite.x + 12, duration: 55, yoyo: true, repeat: 3 });
  }

  function openChallenge(index) {
    state.challengeOpen = true;
    releaseDrive();
    state.hintLevel = 0;
    dom.hintText.textContent = "";
    dom.hintButton.disabled = false;
    dom.challenge.classList.remove("hidden");
    renderChallenge(index);
    audio.sfx("select");
  }

  function closeChallenge() {
    state.challengeOpen = false;
    dom.challenge.classList.add("hidden");
    updateProximity();
  }

  function renderChallenge(index) {
    if (index === 0) renderCapacity();
    if (index === 1) renderPower();
    if (index === 2) renderTimeline();
  }

  function renderCapacity() {
    dom.challengeKicker.textContent = "System 1 / Evac dock";
    dom.challengeTitle.textContent = "Set the passenger capacity";
    dom.challengeStory.innerHTML = `<strong>Three pods hold 8 people each.</strong> Five seats must stay reserved for medics. Find the passenger capacity, then load every waiting group without overfilling a pod.`;
    state.challengeData = {
      answer: "",
      capacities: [6, 6, 7],
      medics: [2, 2, 1],
      groups: [{ id: "g1", value: 2, pod: null }, { id: "g2", value: 4, pod: null }, { id: "g3", value: 4, pod: null }, { id: "g4", value: 3, pod: null }, { id: "g5", value: 6, pod: null }],
      selected: null,
      message: "Select a passenger group, then choose a pod."
    };
    drawCapacity();
  }

  function drawCapacity() {
    const data = state.challengeData;
    dom.challengeBody.innerHTML = `
      <div class="system-equation" aria-label="three times eight minus five"><span class="machine-value">3 pods</span><span>×</span><span class="machine-value">8 seats</span><span>− 5</span><span>= ?</span></div>
      <div class="capacity-console">
        <div class="number-console"><label for="capacityAnswer">Passenger capacity</label><input id="capacityAnswer" inputmode="numeric" pattern="[0-9]*" maxlength="2" value="${data.answer}" aria-label="Passenger capacity" /><small>Enter how many passenger seats remain.</small></div>
        <div class="pod-bay" aria-label="Rescue pod seating">
          ${data.capacities.map((capacity, podIndex) => {
            const groups = data.groups.filter((g) => g.pod === podIndex);
            const used = groups.reduce((sum, g) => sum + g.value, 0);
            const seats = Array.from({ length: 8 }, (_, i) => `<span class="seat ${i < data.medics[podIndex] ? "medic" : i < data.medics[podIndex] + used ? "passenger" : ""}"></span>`).join("");
            return `<button class="pod" type="button" data-pod="${podIndex}"><header><span>Pod ${String.fromCharCode(65 + podIndex)}</span><strong>${used}/${capacity} passengers</strong></header><div class="seat-grid" aria-hidden="true">${seats}</div></button>`;
          }).join("")}
          <div class="passenger-groups" aria-label="Waiting passenger groups">${data.groups.map((g) => `<button class="group-chip ${g.pod !== null ? "assigned" : ""}" type="button" data-group="${g.id}" aria-pressed="${data.selected === g.id}">Group of ${g.value}</button>`).join("")}</div>
          <p class="status-message ${data.message.startsWith("Good") ? "good" : data.message.startsWith("That") ? "bad" : ""}">${data.message}</p>
        </div>
      </div>`;
    const input = $("#capacityAnswer");
    input.addEventListener("input", () => { data.answer = input.value.replace(/\D/g, "").slice(0, 2); input.value = data.answer; });
    $$('[data-group]').forEach((button) => button.addEventListener("click", () => {
      const group = data.groups.find((g) => g.id === button.dataset.group);
      if (group.pod !== null) { group.pod = null; data.message = `Group of ${group.value} returned to the platform.`; data.selected = null; }
      else { data.selected = group.id; data.message = `Group of ${group.value} selected. Choose a pod with enough room.`; }
      audio.sfx("select"); drawCapacity();
    }));
    $$('[data-pod]').forEach((button) => button.addEventListener("click", () => {
      const pod = Number(button.dataset.pod);
      const group = data.groups.find((g) => g.id === data.selected);
      if (!group) { data.message = "That pod is ready. Select a waiting group first."; drawCapacity(); return; }
      const used = data.groups.filter((g) => g.pod === pod).reduce((sum, g) => sum + g.value, 0);
      if (used + group.value > data.capacities[pod]) { data.message = `That would overfill Pod ${String.fromCharCode(65 + pod)}. Try a different group or pod.`; state.mistakes += 1; audio.sfx("wrong"); }
      else { group.pod = pod; data.selected = null; data.message = `Good loading. Pod ${String.fromCharCode(65 + pod)} now carries ${used + group.value}.`; audio.sfx("select"); }
      drawCapacity();
    }));
  }

  function renderPower() {
    dom.challengeKicker.textContent = "System 2 / Power yard";
    dom.challengeTitle.textContent = "Build the lift power plan";
    dom.challengeStory.innerHTML = `<strong>Six racks carry 24 charge units each.</strong> The bridge system must keep 38 units. Find what remains, then power the lift and two stabiliser boosts without draining the reserve.`;
    state.challengeData = {
      answer: "", targets: { lift: null, boostA: null, boostB: null, reserve: null },
      chips: [{ id: "p60", value: 60 }, { id: "p20a", value: 20 }, { id: "p20b", value: 20 }, { id: "p6", value: 6 }, { id: "p4", value: 4 }],
      selected: null, message: "Enter the available charge, then connect power cells to the four sockets."
    };
    drawPower();
  }

  function drawPower() {
    const data = state.challengeData;
    const socket = (id, label, target) => {
      const chip = data.chips.find((c) => c.id === data.targets[id]);
      const value = chip?.value || 0;
      return `<button class="power-meter" type="button" data-power-target="${id}"><span>${label}</span><span class="meter-track"><span style="width:${Math.min(100, value / target * 100)}%"></span></span><strong>${value}/${target}</strong></button>`;
    };
    dom.challengeBody.innerHTML = `
      <div class="system-equation"><span class="machine-value">6 racks</span><span>×</span><span class="machine-value">24 units</span><span>− 38</span><span>= ?</span></div>
      <div class="power-console">
        <div class="rack-bank" aria-label="Six power racks">${Array.from({length:6},() => `<div class="power-rack"><strong>24</strong><small>charge</small></div>`).join("")}</div>
        <section class="power-plan"><h3>Relay-7 distribution board</h3><label class="number-console" style="padding:10px"><span>Available charge</span><input id="powerAnswer" inputmode="numeric" maxlength="3" value="${data.answer}" aria-label="Available charge" /></label><div class="power-meters">${socket("lift","Lift clamps",60)}${socket("boostA","Boost A",20)}${socket("boostB","Boost B",20)}${socket("reserve","Safety reserve",6)}</div><div class="energy-chips">${data.chips.map((chip) => `<button class="energy-chip ${Object.values(data.targets).includes(chip.id) ? "used" : ""}" type="button" data-energy="${chip.id}" aria-pressed="${data.selected === chip.id}">${chip.value} units</button>`).join("")}</div></section>
        <p class="status-message ${data.message.startsWith("Good") ? "good" : data.message.startsWith("That") ? "bad" : ""}">${data.message}</p>
      </div>`;
    const input = $("#powerAnswer");
    input.addEventListener("input", () => { data.answer = input.value.replace(/\D/g, "").slice(0, 3); input.value = data.answer; });
    $$('[data-energy]').forEach((button) => button.addEventListener("click", () => {
      const id = button.dataset.energy;
      const existing = Object.keys(data.targets).find((key) => data.targets[key] === id);
      if (existing) { data.targets[existing] = null; data.message = "Power cell disconnected. Choose another route."; }
      else { data.selected = id; data.message = `${data.chips.find((c) => c.id === id).value}-unit cell selected. Choose a socket.`; }
      audio.sfx("select"); drawPower();
    }));
    $$('[data-power-target]').forEach((button) => button.addEventListener("click", () => {
      const target = button.dataset.powerTarget;
      if (!data.selected) { if (data.targets[target]) data.targets[target] = null; else data.message = "Select an unused power cell first."; drawPower(); return; }
      Object.keys(data.targets).forEach((key) => { if (data.targets[key] === data.selected) data.targets[key] = null; });
      data.targets[target] = data.selected; data.selected = null; data.message = "Good connection. Check every socket against its target."; audio.sfx("select"); drawPower();
    }));
  }

  function renderTimeline() {
    dom.challengeKicker.textContent = "System 3 / Sky gap";
    dom.challengeTitle.textContent = "Program the safe crossing";
    dom.challengeStory.innerHTML = `<strong>The storm closes the route in 11 minutes.</strong> Stabilising the east ramp takes 3 minutes, locking Relay-7 takes 2, and returning with the pods takes 4. Put the actions in a safe order and preserve a time buffer.`;
    state.challengeData = {
      slots: [null, null, null],
      chips: [{ id: "stabilise", label: "Stabilise east ramp", value: 3 }, { id: "lock", label: "Lock bridge form", value: 2 }, { id: "return", label: "Return with pods", value: 4 }, { id: "scan", label: "Repeat full scan", value: 5 }],
      selected: null, message: "Choose an action, then place it into the crossing sequence."
    };
    drawTimeline();
  }

  function drawTimeline() {
    const data = state.challengeData;
    const used = data.slots.filter(Boolean).map((id) => data.chips.find((c) => c.id === id).value).reduce((a,b) => a+b, 0);
    const spare = Math.max(0, 11 - used);
    dom.challengeBody.innerHTML = `
      <div class="timeline-console">
        <section class="storm-timeline"><div class="timeline-track">${Array.from({length:11},(_,i)=>`<span class="minute-cell">${i+1}</span>`).join("")}</div><div class="timeline-slots">${data.slots.map((id,index)=>{const chip=data.chips.find((c)=>c.id===id);return `<button class="timeline-slot" type="button" data-slot="${index}">${chip ? `<span class="timeline-chip">${index+1}. ${chip.label} / ${chip.value} min</span>` : `Step ${index+1}`}</button>`;}).join("")}</div></section>
        <section class="route-actions"><h3>Route actions</h3><p>Every action changes the clock. One is safe but unnecessary.</p>${data.chips.map((chip)=>`<button class="timeline-chip ${data.slots.includes(chip.id)?"placed":""}" type="button" data-action-chip="${chip.id}" aria-pressed="${data.selected===chip.id}">${chip.label} <strong>${chip.value} min</strong></button>`).join("")}<div class="spare-readout"><strong>${data.slots.every(Boolean)?spare:"–"}</strong><small>minutes spare</small></div></section>
        <p class="status-message ${data.message.startsWith("Good") ? "good" : data.message.startsWith("That") ? "bad" : ""}">${data.message}</p>
      </div>`;
    $$('[data-action-chip]').forEach((button)=>button.addEventListener("click",()=>{
      const id=button.dataset.actionChip;
      const existing=data.slots.indexOf(id);
      if(existing>=0){data.slots[existing]=null;data.message="Action removed. Rebuild the safe sequence.";data.selected=null;}
      else{data.selected=id;data.message="Action selected. Choose its sequence slot.";}
      audio.sfx("select");drawTimeline();
    }));
    $$('[data-slot]').forEach((button)=>button.addEventListener("click",()=>{
      const slot=Number(button.dataset.slot);
      if(!data.selected){data.slots[slot]=null;data.message="Slot cleared. Select the action that belongs here.";drawTimeline();return;}
      data.slots=data.slots.map((id)=>id===data.selected?null:id);
      data.slots[slot]=data.selected;data.selected=null;data.message="Good placement. Keep the rescue steps in a safe order.";audio.sfx("select");drawTimeline();
    }));
  }

  function confirmChallenge() {
    const data = state.challengeData;
    let correct = false;
    if (state.mission === 0) {
      const allLoaded = data.groups.every((g) => g.pod !== null);
      const validPods = data.capacities.every((capacity, pod) => data.groups.filter((g) => g.pod === pod).reduce((sum,g)=>sum+g.value,0) <= capacity);
      correct = Number(data.answer) === 19 && allLoaded && validPods;
      if (!correct) data.message = Number(data.answer) !== 19 ? "That capacity does not account for all five medic seats yet." : "That loading plan still leaves a group behind or overfills a pod.";
    }
    if (state.mission === 1) {
      const values = Object.fromEntries(Object.entries(data.targets).map(([key,id]) => [key, data.chips.find((c)=>c.id===id)?.value || 0]));
      correct = Number(data.answer) === 106 && values.lift === 60 && values.boostA === 20 && values.boostB === 20 && values.reserve === 6;
      if (!correct) data.message = Number(data.answer) !== 106 ? "That available-charge total needs both operations: multiply first, then protect the bridge reserve." : "One socket has the wrong cell. Match 60, 20, 20 and 6 to the system targets.";
    }
    if (state.mission === 2) {
      correct = data.slots.join("|") === "stabilise|lock|return";
      if (!correct) data.message = "That route is not safe yet. Stabilise the ramp, lock the bridge, then bring the pods across.";
    }
    if (!correct) {
      state.mistakes += 1; audio.sfx("wrong"); dom.challengeBody.classList.remove("wrong-flash"); void dom.challengeBody.offsetWidth; dom.challengeBody.classList.add("wrong-flash");
      if (state.mission === 0) drawCapacity(); if (state.mission === 1) drawPower(); if (state.mission === 2) drawTimeline();
      return;
    }
    completeSystem();
  }

  function completeSystem() {
    const current = state.mission;
    state.completed += 1;
    state.charge = Math.max(0, state.charge - [6, 10, 12][current]);
    updateCharge();
    audio.sfx("success");
    dom.challengeBody.classList.add("success-flash");
    burst(innerWidth / 2, innerHeight / 2, ["#7cf4a6", "#4cf4ff", "#ffc75c"], 42);
    const messages = ["All 19 passengers are safely assigned. Evac system online!", "Lift clamps powered with six charge units protected. Debris cleared!", "Nine-minute route locked with a two-minute storm buffer. Bridge deploying!"];
    speak(messages[current], 3900);
    updateObjectives();
    setTimeout(() => {
      dom.challenge.classList.add("hidden");
      state.challengeOpen = false;
      if (state.completed >= 3) { beginFinale(); return; }
      state.mission += 1;
      state.docked = false;
      document.body.classList.remove("near-beacon");
      dom.operate.classList.add("hidden");
      updateMissionHud();
      const mission = MISSIONS[state.mission];
      speak(`System restored. Next: ${mission.title}.`, 3000);
    }, state.reducedMotion ? 500 : 1200);
  }

  function showHint() {
    const hints = [
      ["First find every seat: 3 × 8.", "Now remove all 5 medic seats from 24.", "The passenger capacity is 19. The pod free spaces are 6, 6 and 7."],
      ["Six equal racks means 6 × 24 first.", "144 total minus the protected 38 leaves the usable charge.", "106 remains: connect 60 to lift, 20 and 20 to boosts, and 6 to reserve."],
      ["The ramp must be stable before Relay-7 can become the bridge.", "Add 3 + 2 + 4 and compare the total with 11.", "Use Stabilise → Lock bridge → Return. Nine minutes leaves two spare."]
    ];
    const list = hints[state.mission];
    dom.hintText.textContent = list[Math.min(state.hintLevel, list.length - 1)];
    state.hintLevel += 1;
    if (state.hintLevel >= list.length) dom.hintButton.disabled = true;
    audio.sfx("select");
  }

  function updateMissionHud() {
    const mission = MISSIONS[state.mission];
    if (!mission) return;
    dom.missionKicker.textContent = mission.kicker;
    dom.missionTitle.textContent = mission.title;
    dom.missionInstruction.textContent = mission.instruction;
    dom.objectiveCopy.textContent = mission.objective;
    updateProximity();
  }

  function updateObjectives() {
    dom.objectiveCount.textContent = state.completed;
    $$(`#objectiveList li`).forEach((item, index) => {
      item.classList.toggle("complete", index < state.completed);
      item.classList.toggle("active", index === state.completed && state.completed < 3);
    });
  }

  function beginFinale() {
    state.control = false;
    state.docked = false;
    document.body.classList.remove("near-beacon");
    dom.operate.classList.add("hidden");
    audio.sfx("victory");
    const scene = state.scene;
    if (!scene) return showResults();
    state.sprite.setVisible(false);
    scene.victory.setVisible(true);
    scene.tweens.add({ targets: scene.victory, alpha: 1, duration: state.reducedMotion ? 1 : 1100, ease: "Sine.InOut", onComplete: () => {
      burst(innerWidth * .72, innerHeight * .35, ["#4cf4ff", "#ff9d2e", "#ffffff"], 64);
      speak("Aether City is safe. Rescue Commander badge unlocked!", 4400);
      setTimeout(showResults, state.reducedMotion ? 600 : 2400);
    }});
  }

  function showResults() {
    clearInterval(state.timer);
    const minutes = Math.floor(state.elapsed / 60);
    const seconds = state.elapsed % 60;
    dom.resultTime.textContent = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
    dom.resultStars.textContent = state.mistakes <= 2 ? "3" : state.mistakes <= 5 ? "2" : "1";
    dom.result.classList.remove("hidden");
    try {
      localStorage.setItem("brightQuestMechshiftRescueV1", JSON.stringify({ build: BUILD, completedAt: new Date().toISOString(), seconds: state.elapsed, mistakes: state.mistakes, stars: Number(dom.resultStars.textContent) }));
    } catch (_error) { /* Progress still completes if storage is unavailable. */ }
  }

  function togglePause(force) {
    if (!state.started || state.completed >= 3) return;
    const next = typeof force === "boolean" ? force : !state.paused;
    state.paused = next;
    releaseDrive();
    dom.pause.classList.toggle("hidden", !next);
    if (next) game.scene.pause("mission"); else game.scene.resume("mission");
  }

  function toggleMotion() {
    state.reducedMotion = !state.reducedMotion;
    document.body.classList.toggle("reduced-motion", state.reducedMotion);
    dom.motion.textContent = `Reduced motion: ${state.reducedMotion ? "on" : "off"}`;
    dom.motion.setAttribute("aria-pressed", String(state.reducedMotion));
  }

  let captionTimer = 0;
  function speak(message, duration = 2600) {
    clearTimeout(captionTimer);
    dom.captions.textContent = message;
    dom.captions.classList.add("show");
    captionTimer = setTimeout(() => dom.captions.classList.remove("show"), duration);
  }

  function burst(x, y, colors, count) {
    if (state.reducedMotion) return;
    for (let i = 0; i < count; i += 1) {
      const spark = document.createElement("i");
      spark.className = "spark";
      spark.style.left = `${x}px`; spark.style.top = `${y}px`;
      spark.style.setProperty("--spark", colors[i % colors.length]);
      spark.style.setProperty("--dx", `${(Math.random() - .5) * 340}px`);
      spark.style.setProperty("--dy", `${(Math.random() - .8) * 260}px`);
      dom.feedback.appendChild(spark);
      setTimeout(() => spark.remove(), 900);
    }
  }

  function restartMission() { window.location.reload(); }

  dom.startButton.addEventListener("click", startMission);
  dom.briefButton.addEventListener("click", takeControl);
  dom.operate.addEventListener("click", operate);
  dom.challengeClose.addEventListener("click", closeChallenge);
  dom.confirm.addEventListener("click", confirmChallenge);
  dom.hintButton.addEventListener("click", showHint);
  dom.pauseButton.addEventListener("click", () => togglePause());
  dom.resume.addEventListener("click", () => togglePause(false));
  dom.restart.addEventListener("click", restartMission);
  dom.playAgain.addEventListener("click", restartMission);
  dom.motion.addEventListener("click", toggleMotion);
  dom.sound.addEventListener("click", () => {
    audio.start(); const muted = audio.toggle(); dom.sound.setAttribute("aria-pressed", String(muted)); dom.sound.textContent = muted ? "Muted" : "Sound"; speak(muted ? "Sound muted. Captions remain on." : "Sound on.", 1800);
  });
  $$(".form-button").forEach((button) => button.addEventListener("click", () => selectForm(button.dataset.form)));
  $$("[data-drive]").forEach((button) => {
    const direction = button.dataset.drive;
    button.addEventListener("pointerdown", (event) => { event.preventDefault(); button.setPointerCapture?.(event.pointerId); setDrive(direction, true); });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => button.addEventListener(type, () => setDrive(direction, false)));
    button.addEventListener("contextmenu", (event) => event.preventDefault());
  });

  window.addEventListener("keydown", (event) => {
    if (["ArrowLeft","ArrowRight","Space"].includes(event.code)) event.preventDefault();
    if (event.code === "ArrowLeft" || event.code === "KeyA") setDrive("left", true);
    if (event.code === "ArrowRight" || event.code === "KeyD") setDrive("right", true);
    if (event.code === "Digit1") selectForm("rover");
    if (event.code === "Digit2") selectForm("lift");
    if (event.code === "Digit3") selectForm("bridge");
    if (event.code === "Space" && !state.challengeOpen) operate();
    if (event.code === "Escape") state.challengeOpen ? closeChallenge() : togglePause();
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "KeyA") setDrive("left", false);
    if (event.code === "ArrowRight" || event.code === "KeyD") setDrive("right", false);
  });
  window.addEventListener("blur", releaseDrive);
  window.addEventListener("pagehide", releaseDrive);
  document.addEventListener("visibilitychange", () => { if (document.hidden) releaseDrive(); if (document.hidden && state.started && !state.paused && state.completed < 3) togglePause(true); });

  updateCharge();
  document.body.classList.toggle("reduced-motion", state.reducedMotion);
  dom.motion.textContent = `Reduced motion: ${state.reducedMotion ? "on" : "off"}`;
  dom.motion.setAttribute("aria-pressed", String(state.reducedMotion));

  window.__MECHSHIFT_QA__ = {
    build: BUILD,
    getState: () => ({ mission: state.mission, completed: state.completed, form: state.form, playerX: state.playerX, docked: state.docked, challengeOpen: state.challengeOpen }),
    getVisualMetrics: () => ({
      canvas: { width: game.canvas.width, height: game.canvas.height, clientWidth: game.canvas.clientWidth, clientHeight: game.canvas.clientHeight },
      cityScale: { x: state.scene?.city?.scaleX || 0, y: state.scene?.city?.scaleY || 0 },
      vehicleScale: { x: state.scene?.sprite?.scaleX || 0, y: state.scene?.sprite?.scaleY || 0 }
    }),
    start: () => { if (!state.started) startMission(); takeControl(); },
    gotoMission: (index) => { state.mission = Math.max(0, Math.min(2,index)); state.completed = state.mission; state.playerX = MISSIONS[state.mission].x; state.docked = true; state.scene?.placeVehicle(); selectForm(MISSIONS[state.mission].form, false); updateObjectives(); updateMissionHud(); },
    openChallenge: (index) => { state.mission = index; state.completed = index; state.playerX = MISSIONS[index].x; state.docked = true; state.form = MISSIONS[index].form; state.scene?.sprite.setTexture(FORMS[state.form].texture); state.scene?.placeVehicle(); openChallenge(index); },
    solveCurrent: () => {
      if (state.mission === 0) { state.challengeData.answer = "19"; state.challengeData.groups.forEach((g,i) => { g.pod = [0,0,2,2,1][i]; }); }
      if (state.mission === 1) { state.challengeData.answer = "106"; state.challengeData.targets = { lift:"p60",boostA:"p20a",boostB:"p20b",reserve:"p6" }; }
      if (state.mission === 2) state.challengeData.slots = ["stabilise","lock","return"];
      confirmChallenge();
    }
  };
})();
