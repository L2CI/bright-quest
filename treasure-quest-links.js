(() => {
  const treasureQuestUrl = "treasure-quest/";

  function openTreasureQuest() {
    window.location.href = treasureQuestUrl;
  }

  function kidGameCard() {
    return `
      <article class="game-tile treasure-quest-tile unlocked" data-treasure-quest-card>
        <div class="game-preview treasure-quest-preview" aria-hidden="true">
          <span class="treasure-mini-avatar"></span>
          <span class="treasure-mini-chest one"></span>
          <span class="treasure-mini-chest two"></span>
        </div>
        <p class="eyebrow">Playable prototype</p>
        <h3>Pirate Treasure Map</h3>
        <p>Island quest with a real avatar, answer gates, chests, and touch arrows.</p>
        <button class="button button-primary" type="button" data-open-treasure-quest>Play on this device</button>
      </article>
    `;
  }

  function parentGameCard() {
    return `
      <div class="treasure-parent-card" data-treasure-parent-card>
        <div>
          <p class="eyebrow">Game prototype</p>
          <h4>Pirate Treasure Map</h4>
          <p>Open the new touch game from the cockpit. It is a reward-game prototype and does not change saved test results.</p>
        </div>
        <button class="button button-soft" type="button" data-open-treasure-quest>Open game</button>
      </div>
    `;
  }

  function injectKidGameLink() {
    const list = document.querySelector("#gamesList");
    if (!list || list.querySelector("[data-treasure-quest-card]")) return;
    list.insertAdjacentHTML("afterbegin", kidGameCard());
  }

  function injectParentGameLink() {
    const recommendation = document.querySelector("#parentRecommendation");
    if (!recommendation || recommendation.querySelector("[data-treasure-parent-card]")) return;
    recommendation.insertAdjacentHTML("beforeend", parentGameCard());
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
    if (!trigger) return;
    event.preventDefault();
    openTreasureQuest();
  });

  window.addEventListener("DOMContentLoaded", () => {
    wrapGlobal("openGamesList", injectKidGameLink);
    wrapGlobal("renderParentDashboard", injectParentGameLink);
    watchForRenders();
    injectKidGameLink();
    injectParentGameLink();
  });
})();
