(() => {
  const treasureQuestUrl = "cave-river-quest/";
  const streetSmartUrl = "street-smart-rescue/";

  function openTreasureQuest() {
    window.location.href = treasureQuestUrl;
  }

  function openStreetSmartRescue() {
    window.location.href = streetSmartUrl;
  }

  function kidGameCard() {
    return `
      <article class="game-tile treasure-quest-tile unlocked" data-treasure-quest-card>
        <div class="game-preview treasure-quest-preview" aria-hidden="true">
          <span class="treasure-mini-avatar"></span>
          <span class="treasure-mini-chest one"></span>
          <span class="treasure-mini-chest two"></span>
        </div>
        <p class="eyebrow">3D playable quest</p>
        <h3>Cave River Quest</h3>
        <p>Row a boat through a twisting cave river, unlock iron gates with questions, and claim the Leadership Matrix.</p>
        <button class="button button-primary" type="button" data-open-treasure-quest>Play 3D quest</button>
      </article>
    `;
  }

  function kidStreetSmartCard() {
    return `
      <article class="game-tile street-smart-tile unlocked" data-street-smart-card>
        <div class="game-preview street-smart-preview" aria-hidden="true">
          <span class="street-mini-sun"></span>
          <span class="street-mini-road"></span>
          <span class="street-mini-car"></span>
          <span class="street-mini-police"></span>
          <span class="street-mini-flash one"></span>
          <span class="street-mini-flash two"></span>
        </div>
        <p class="eyebrow">Animated puzzle quest</p>
        <h3>Street Smart Rescue</h3>
        <p>Solve five Grade 4 puzzle riddles after a flashy police stop and help the kid make the safe choice.</p>
        <button class="button button-primary" type="button" data-open-street-smart>Play puzzle quest</button>
      </article>
    `;
  }

  function parentGameCard() {
    return `
      <div class="treasure-parent-card" data-treasure-parent-card>
        <div>
          <p class="eyebrow">3D reward game</p>
          <h4>Cave River Quest</h4>
          <p>Open the new cave-river learning game from the cockpit. It is a reward-game prototype and does not change saved test results.</p>
        </div>
        <button class="button button-soft" type="button" data-open-treasure-quest>Open game</button>
      </div>
    `;
  }

  function parentStreetSmartCard() {
    return `
      <div class="treasure-parent-card street-smart-parent-card" data-street-smart-parent-card>
        <div>
          <p class="eyebrow">Animated puzzle game</p>
          <h4>Street Smart Rescue</h4>
          <p>Open the new road-safety puzzle game. It is standalone and does not change saved test results.</p>
        </div>
        <button class="button button-soft" type="button" data-open-street-smart>Open game</button>
      </div>
    `;
  }

  function injectKidGameLink() {
    const list = document.querySelector("#gamesList");
    if (!list) return;
    if (!list.querySelector("[data-street-smart-card]")) {
      list.insertAdjacentHTML("afterbegin", kidStreetSmartCard());
    }
    if (!list.querySelector("[data-treasure-quest-card]")) {
      list.insertAdjacentHTML("afterbegin", kidGameCard());
    }
  }

  function injectParentGameLink() {
    const recommendation = document.querySelector("#parentRecommendation");
    if (!recommendation) return;
    if (!recommendation.querySelector("[data-treasure-parent-card]")) {
      recommendation.insertAdjacentHTML("beforeend", parentGameCard());
    }
    if (!recommendation.querySelector("[data-street-smart-parent-card]")) {
      recommendation.insertAdjacentHTML("beforeend", parentStreetSmartCard());
    }
  }

  function wrapGlobal(name, after) {
    const original = window[name];
    if (typeof original !== "function" || original.__treasureQuestWrapped) return;

    const wrapped = function wrappedTreasureQuestLauncher(...args) {
      const result = original.apply(this, args);
      after();
      return result;
    };
    wrapped.__treasureQuestWrapped = true;
    window[name] = wrapped;
  }

  function watchForRenders() {
    const gamesList = document.querySelector("#gamesList");
    const parentRecommendation = document.querySelector("#parentRecommendation");

    if (gamesList) {
      new MutationObserver(() => queueMicrotask(injectKidGameLink)).observe(gamesList, { childList: true });
    }

    if (parentRecommendation) {
      new MutationObserver(() => queueMicrotask(injectParentGameLink)).observe(parentRecommendation, { childList: true });
    }
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-treasure-quest]");
    if (trigger) {
      event.preventDefault();
      openTreasureQuest();
      return;
    }

    const streetTrigger = event.target.closest("[data-open-street-smart]");
    if (streetTrigger) {
      event.preventDefault();
      openStreetSmartRescue();
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    wrapGlobal("openGamesList", injectKidGameLink);
    wrapGlobal("renderParentDashboard", injectParentGameLink);
    watchForRenders();
    injectKidGameLink();
    injectParentGameLink();
  });
})();
