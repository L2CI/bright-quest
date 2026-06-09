(() => {
  const tests = window.BrightQuestInternationalTests || [];
  const gameNames = {
    'intl-1': 'World Rally Drift',
    'intl-2': 'Skyline Balloon Burst',
    'intl-3': 'Logic Lab Battle'
  };

  function getProfile() {
    try { return state.profile; } catch { return null; }
  }

  function latestByLevel() {
    const profile = getProfile();
    return (profile?.attempts || []).reduce((acc, attempt) => {
      acc[attempt.level] = attempt;
      return acc;
    }, {});
  }

  function getStats() {
    const profile = getProfile();
    const attempts = profile?.attempts || [];
    const latest = attempts.at(-1);
    const avg = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + (item.percent || 0), 0) / attempts.length) : 0;
    const best = attempts.reduce((max, item) => Math.max(max, item.percent || 0), 0);
    return {
      name: profile?.name || 'Explorer',
      stars: profile?.stars || 0,
      streak: Math.max(0, Math.min(15, attempts.length * 2 + Object.keys(profile?.trainingCompleted || {}).length)),
      tests: attempts.length,
      latest: latest?.percent || 0,
      avg,
      best,
      training: Object.keys(profile?.trainingCompleted || {}).length
    };
  }

  function clickFirst(selector) {
    document.querySelector(selector)?.click();
  }

  function openWorldArena() {
    const open = () => {
      if (window.openInternationalArena) {
        window.openInternationalArena();
      } else {
        clickFirst('#internationalTestsButton');
      }
    };
    open();
    [0, 160, 480, 720].forEach((delay) => {
      setTimeout(() => {
        if (!document.querySelector('#internationalScreen:not(.hidden)')) open();
      }, delay);
    });
  }

  function openParentPrompt() {
    document.querySelector('#switchProfileButton')?.click();
    setTimeout(() => {
      document.querySelector('[data-role="parent"]')?.click();
      const input = document.querySelector('#modePassword');
      if (input) input.focus();
    }, 120);
  }

  function startMapZone(zone) {
    const actions = {
      maths: () => clickFirst('[data-zone-level="1"]'),
      english: () => window.openGrammarGym ? window.openGrammarGym() : clickFirst('#grammarGymButton'),
      grammar: () => window.openGrammarGym ? window.openGrammarGym() : clickFirst('#academyGrammarButton'),
      reasoning: () => clickFirst('[data-zone-level="4"]'),
      world: openWorldArena,
      arcade: () => window.openGamesList ? window.openGamesList() : clickFirst('#academyGamesButton')
    };
    actions[zone]?.();
  }

  function ensureReferenceDashboard() {
    const dashboard = document.querySelector('#dashboardScreen');
    if (!dashboard) return;
    let ref = dashboard.querySelector('#brightReferenceDashboard');
    if (!ref) {
      ref = document.createElement('section');
      ref.id = 'brightReferenceDashboard';
      ref.className = 'reference-dashboard';
      dashboard.querySelector('.app-header')?.after(ref);
    }
    renderReferenceDashboard(ref);
  }

  function renderReferenceDashboard(ref) {
    const stats = getStats();
    const latest = latestByLevel();
    ref.innerHTML = `
      <header class="reference-topbar">
        <div class="reference-brand-left">
          <div class="reference-star-logo" aria-hidden="true"><span></span></div>
          <div>
            <h3>Learn. Practice. Level Up.</h3>
            <p>An exciting adventure that builds skills, confidence and a love for learning.</p>
          </div>
        </div>
        <div class="reference-title" aria-label="Bright Quest">
          <span class="b">Bright</span> <span class="q">Quest</span>
          <small>Grade 5 Entrance Test Prep Adventure</small>
        </div>
        <div class="reference-quick-actions">
          ${quickAction('star', 'Earn Stars')}
          ${quickAction('bolt', 'Build Streaks')}
          ${quickAction('shield', 'Unlock Badges')}
          ${quickAction('gift', 'Play & Win', 'arcade')}
          ${quickAction('chart', 'Track Progress')}
        </div>
      </header>

      <div class="reference-layout">
        <section class="reference-panel adventure-panel">
          <div class="reference-panel-title green"><span>1</span><strong>Adventure Map</strong><em>Explore • Choose • Conquer</em></div>          <div class="adventure-island">
            <div class="archipelago-art" aria-hidden="true">
              <span class="sea-ring ring-one"></span>
              <span class="landmass land-north"></span>
              <span class="landmass land-west"></span>
              <span class="landmass land-east"></span>
              <span class="landmass land-south"></span>
              <span class="landmass land-tiny-one"></span>
              <span class="landmass land-tiny-two"></span>
              <span class="coast-reef reef-one"></span>
              <span class="coast-reef reef-two"></span>
              <span class="coast-reef reef-three"></span>
              <span class="map-road road-main"></span>
              <span class="map-road road-loop"></span>
              <span class="map-road road-south"></span>
              <span class="map-bridge bridge-one"></span>
              <span class="map-bridge bridge-two"></span>
              <span class="map-bridge bridge-three"></span>
              <span class="map-prop mountain-prop"></span>
              <span class="map-prop forest-prop"></span>
              <span class="map-prop castle-prop"></span>
              <span class="map-prop lab-prop"></span>
              <span class="map-prop arena-prop"></span>
              <span class="map-prop tower-prop"></span>
              <span class="tree-cluster trees-one"></span>
              <span class="tree-cluster trees-two"></span>
              <span class="tree-cluster trees-three"></span>
              <span class="map-boat boat-one"></span>
              <span class="map-boat boat-two"></span>
            </div>
            <div class="student-badge">
              <span class="student-face" aria-hidden="true"></span>
              <div><strong>Hi, ${escapeHtml(stats.name)}!</strong><small>Level ${Math.max(1, stats.tests + 1)}</small><i><b style="width:${Math.min(100, 38 + stats.tests * 8)}%"></b></i></div>
            </div>
            <div class="map-pill star-pill">${stats.stars} stars</div>
            <div class="map-pill streak-pill">${stats.streak} streak</div>
            <button class="island-label label-maths" type="button" data-ref-zone="maths"><span>+x</span><strong>Maths Mountain</strong><small>${scoreText(latest[1])}</small></button>
            <button class="island-label label-english" type="button" data-ref-zone="english"><span>ABC</span><strong>English Forest</strong><small>${scoreText(latest[2])}</small></button>
            <button class="island-label label-grammar" type="button" data-ref-zone="grammar"><span>AB</span><strong>Grammar Gym</strong><small>${stats.training}/25</small></button>
            <button class="island-label label-reason" type="button" data-ref-zone="reasoning"><span>?</span><strong>Reasoning Lab</strong><small>${scoreText(latest[4])}</small></button>
            <button class="island-label label-world" type="button" data-ref-zone="world"><span>INT</span><strong>World Challenge</strong><small>${internationalDone(latest)}/3</small></button>
            <button class="island-label label-arcade" type="button" data-ref-zone="arcade"><span>GO</span><strong>Arcade</strong><small>New games!</small></button>
            <button class="island-progress" type="button" data-parent-jump>My Progress</button>
            <div class="side-quests"><span>Goal</span><span>Quests</span><span>Badges</span></div>
          </div>
          <div class="achievement-strip">
            ${achievement('trophy', 'Super Solver', `${stats.tests} tests`)}
            ${achievement('fire', 'Streak Master', `${stats.streak} days`)}
            ${achievement('clock', 'Time Warrior', 'Beat the clock')}
            ${achievement('gem', 'Perfect Score', `${stats.best}% best`)}
          </div>
        </section>

        <section class="reference-panel academy-panel-ref">
          <div class="reference-panel-title purple"><span>2</span><strong>Training Academy</strong><em>Practice • Improve • Master</em></div>
          <div class="academy-player-strip">
            <span class="student-face" aria-hidden="true"></span>
            <div><strong>Hi, ${escapeHtml(stats.name)}!</strong><small>Level ${Math.max(1, stats.tests + 1)}</small></div>
            <div><b>${stats.stars}</b><small>Stars</small></div>
            <div><b>${stats.streak}</b><small>Day Streak</small></div>
            <div><b>${Math.max(1, 6 - stats.tests)}</b><small>Questions to reward</small></div>
          </div>
          <div class="academy-card-grid-ref">
            ${academyCard('maths', 'Maths Mountain', 'Number speed', '+x', scoreText(latest[1]), 'maths')}
            ${academyCard('english', 'English Forest', 'Reading power', 'ABC', scoreText(latest[2]), 'english')}
            ${academyCard('grammar', 'Grammar Gym', 'Sentence power', 'AB', `${stats.training}/25`, 'grammar')}
            ${academyCard('reason', 'Reasoning Lab', 'Pattern moves', '?', scoreText(latest[4]), 'reasoning')}
            ${academyCard('world', 'International Tests', 'World arena', 'INT', `${internationalDone(latest)}/3`, 'world')}
            ${academyCard('arcade', 'Arcade Rewards', 'New games', 'GO', 'Play', 'arcade')}
          </div>
          <div class="resume-quest-ref">
            <span class="bot-face" aria-hidden="true"></span>
            <div><strong>Resume Your Quest</strong><small>${stats.tests ? 'Next mission is ready' : 'Start your first mission'}</small><i><b style="width:${Math.min(100, 22 + stats.tests * 9)}%"></b></i></div>
            <button class="button button-primary" type="button" data-ref-continue>Continue</button>
          </div>
          <div class="core-tests-ref">
            <div class="games-head-ref"><strong>Core timed tests</strong><span>Existing Bright Quest levels</span></div>
            ${coreTestStrip(latest)}
          </div>
          <div class="progress-dials-ref">
            ${dial('Overall', stats.avg || stats.latest || 0)}
            ${dial('Accuracy', stats.best || stats.avg || 0)}
            ${dial('Speed', Math.min(99, 58 + stats.tests * 4))}
            <div class="dial-card tests"><strong>${stats.tests}</strong><span>Tests Completed</span></div>
          </div>
        </section>

        <section class="reference-panel world-panel-ref">
          <div class="reference-panel-title blue"><span>3</span><strong>World Challenge Arena</strong><em>Test Yourself • Go Global</em></div>
          <div class="world-hero-ref">
            <div><h3>International Tests</h3><p>Challenge yourself with world-class entrance test style.</p></div>
            <span class="big-trophy" aria-hidden="true"></span>
          </div>
          <div class="international-cards-ref">
            ${tests.map((test, index) => internationalCard(test, index, latest[test.level])).join('')}
          </div>
          <div class="reward-games-ref">
            <div class="games-head-ref"><strong>New reward games</strong><span>Unlocked after each international test</span></div>
            ${tests.map((test, index) => gameCard(test, index, !!latest[test.level])).join('')}
          </div>
          <div class="arena-stats-ref">
            <span class="mini-globe" aria-hidden="true"></span>
            <div><b>Rookie Explorer</b><i></i></div>
            <div><b>Global Learner</b><i></i></div>
            <div><b>World Challenger</b><i></i></div>
            <div><b>Champion</b><i></i></div>
          </div>
        </section>
      </div>
    `;
    wireReferenceDashboard(ref);
  }

  function quickAction(type, label, zone = "") {
    return `<button type="button" class="quick-action-ref ${type}" ${zone ? `data-ref-zone="${zone}"` : ""}><span></span><small>${label}</small></button>`;
  }

  function scoreText(attempt) {
    return attempt ? `${attempt.percent}%` : 'New';
  }

  function internationalDone(latest) {
    return tests.filter((test) => latest[test.level]).length;
  }

  function achievement(type, title, copy) {
    return `<div class="achievement ${type}"><span></span><strong>${title}</strong><small>${copy}</small></div>`;
  }

  function academyCard(kind, title, sub, icon, progress, zone) {
    return `<button class="academy-tile-ref ${kind}" type="button" data-ref-zone="${zone}"><span>${icon}</span><strong>${title}</strong><small>${sub}</small><i><b>${progress}</b></i></button>`;
  }

  function dial(label, value) {
    const pct = Math.max(0, Math.min(100, value || 0));
    return `<div class="dial-card" style="--pct:${pct}%"><span>${pct}%</span><strong>${label}</strong><small>${pct >= 75 ? 'Great work!' : 'Keep it up!'}</small></div>`;
  }

  function internationalCard(test, index, attempt) {
    const labels = ['UK Challenge', 'US Challenge', 'Scholarship Stretch'];
    return `
      <article class="intl-card-ref intl-${index + 1}">
        <div class="intl-art-ref"><span></span></div>
        <h4>${escapeHtml(labels[index] || test.name)}</h4>
        <div class="intl-tags"><span>${test.questions.length} Questions</span><span>${test.minutes} mins</span></div>
        <div class="intl-skills"><span>Maths</span><span>English</span><span>Reasoning</span><span>Writing</span></div>
        <div class="intl-bottom"><small>Best Score<br><b>${attempt ? `${attempt.percent}%` : '-'}</b></small><button class="button button-primary" type="button" data-start-world="${escapeAttr(test.level)}">Start</button></div>
      </article>
    `;
  }

  function gameCard(test, index, unlocked) {
    const names = Object.values(gameNames);
    return `<button class="game-card-ref game-${index + 1}" type="button" data-play-world="${escapeAttr(test.level)}" ${unlocked ? '' : 'disabled'}><span></span><strong>${names[index]}</strong><small>${unlocked ? 'Play now' : 'Complete test to unlock'}</small></button>`;
  }

  function coreTestStrip(latest) {
    const levels = (window.BrightQuestData?.levels || []).slice(0, 7);
    return levels.map((level) => {
      const attempt = latest[level.level];
      return `<button class="core-test-chip-ref" type="button" data-core-level="${level.level}"><span>${level.level}</span><strong>${escapeHtml(level.name)}</strong><small>${attempt ? `${attempt.percent}%` : 'New'} / ${level.minutes} mins</small></button>`;
    }).join('');
  }

  function wireReferenceDashboard(ref) {
    ref.querySelectorAll('[data-ref-zone]').forEach((button) => button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      startMapZone(event.currentTarget.dataset.refZone);
    }));
    ref.querySelector('[data-ref-continue]')?.addEventListener('click', () => document.querySelector('#continueButton')?.click());
    ref.querySelectorAll('[data-start-world]').forEach((button) => button.addEventListener('click', () => window.startBrightQuestInternationalTest?.(button.dataset.startWorld)));
    ref.querySelectorAll('[data-play-world]').forEach((button) => button.addEventListener('click', () => window.startBrightQuestInternationalArcade?.(button.dataset.playWorld)));
    ref.querySelectorAll('[data-parent-jump]').forEach((button) => button.addEventListener('click', openParentPrompt));
    ref.querySelectorAll('[data-core-level]').forEach((button) => button.addEventListener('click', () => startLevel(Number(button.dataset.coreLevel))));
  }

  const previousRenderDashboard = window.renderDashboard || renderDashboard;
  if (typeof previousRenderDashboard === 'function' && !window.__referenceDashboardWrapped) {
    window.__referenceDashboardWrapped = true;
    renderDashboard = function referenceRenderDashboard(...args) {
      const result = previousRenderDashboard.apply(this, args);
      requestAnimationFrame(ensureReferenceDashboard);
      return result;
    };
  }

  ensureReferenceDashboard();
})();


