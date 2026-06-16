(() => {
  const tests = window.BrightQuestInternationalTests || [];
  const zoneMap = [
    { key: 'maths', title: 'Maths Mountain', sub: 'Number speed', icon: '+', action: () => document.querySelector('.academy-zone.maths')?.click() },
    { key: 'english', title: 'English Grammar', sub: '15 minute lesson', icon: 'EG', action: () => { window.location.href = 'english-grammar/'; } },
    { key: 'reasoning', title: 'Reasoning Lab', sub: 'Pattern moves', icon: '?', action: () => document.querySelector('.academy-zone.reasoning')?.click() },
    { key: 'world', title: 'International Tests', sub: '30-question missions', icon: 'INT', action: () => window.openInternationalArena?.() || document.querySelector('#internationalTestsButton')?.click() },
    { key: 'arcade', title: 'Arcade Rewards', sub: 'Games unlocked', icon: 'GO', action: () => document.querySelector('#academyGamesButton')?.click() }
  ];
  const intlGames = {
    'intl-1': { name: 'World Rally Drift', vibe: 'Drift through star gates after UK Challenge.' },
    'intl-2': { name: 'Skyline Balloon Burst', vibe: 'Pop combo balloons after US Challenge.' },
    'intl-3': { name: 'Logic Lab Battle', vibe: 'Dodge glitch blocks after Scholarship Stretch.' }
  };

  function upgradeAcademyMap() {
    const hero = document.querySelector('.academy-hero');
    const map = document.querySelector('.academy-map-art');
    if (!hero || !map) return;
    hero.classList.add('academy-map-merged');
    if (map.querySelector('.academy-map-controls')) return;
    const controls = document.createElement('div');
    controls.className = 'academy-map-controls';
    controls.innerHTML = zoneMap.map((zone) => `
      <button class="map-control map-${zone.key}" type="button" data-map-zone="${zone.key}">
        <span>${zone.icon}</span>
        <strong>${zone.title}</strong>
        <small>${zone.sub}</small>
      </button>
    `).join('');
    map.appendChild(controls);
    controls.querySelectorAll('[data-map-zone]').forEach((button) => {
      const zone = zoneMap.find((item) => item.key === button.dataset.mapZone);
      button.addEventListener('click', () => zone?.action());
    });
  }

  function latestAttempts() {
    try {
      return (state.profile?.attempts || []).reduce((acc, attempt) => {
        acc[attempt.level] = attempt;
        return acc;
      }, {});
    } catch {
      return {};
    }
  }

  function ensureDashboardInternationalSection() {
    const dashboard = document.querySelector('#dashboardScreen');
    const hero = document.querySelector('.academy-hero');
    if (!dashboard || !hero || !tests.length) return;
    let section = dashboard.querySelector('#dashboardInternationalSection');
    if (!section) {
      section = document.createElement('section');
      section.id = 'dashboardInternationalSection';
      section.className = 'dashboard-world-section';
      hero.after(section);
    }
    const latest = latestAttempts();
    section.innerHTML = `
      <div class="world-section-head">
        <div>
          <p class="eyebrow">World Challenge Arena</p>
          <h3>International tests and reward games</h3>
          <p>Three loaded 30-question practice missions. Complete one to unlock its arcade reward.</p>
        </div>
        <button class="button button-primary" type="button" data-open-world>Open arena</button>
      </div>
      <div class="world-test-grid">
        ${tests.map((test, index) => {
          const game = intlGames[test.level] || { name: 'World Arcade', vibe: 'Reward game unlocked after completion.' };
          const attempt = latest[test.level];
          return `
            <article class="world-test-card world-card-${index + 1}">
              <div class="world-card-art" aria-hidden="true"><span class="world-flag"></span><span class="world-prize"></span></div>
              <p class="eyebrow">${escapeHtml(test.challengeLabel || 'International')}</p>
              <h4>${escapeHtml(test.name)}</h4>
              <p>${escapeHtml(test.theme)}</p>
              <div class="world-card-meta">
                <span>${test.questions.length} questions</span>
                <span>${test.minutes} min</span>
                <span>${escapeHtml(game.name)}</span>
              </div>
              <div class="world-card-actions">
                <button class="button button-primary" type="button" data-start-world="${escapeAttr(test.level)}">${attempt ? 'Retry test' : 'Start test'}</button>
                <button class="button button-soft" type="button" data-play-world="${escapeAttr(test.level)}" ${attempt ? '' : 'disabled'}>${attempt ? 'Play game' : 'Game locked'}</button>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
    section.querySelector('[data-open-world]')?.addEventListener('click', () => window.openInternationalArena?.());
    section.querySelectorAll('[data-start-world]').forEach((button) => {
      button.addEventListener('click', () => window.startBrightQuestInternationalTest?.(button.dataset.startWorld));
    });
    section.querySelectorAll('[data-play-world]').forEach((button) => {
      button.addEventListener('click', () => window.startBrightQuestInternationalArcade?.(button.dataset.playWorld));
    });
  }

  function relabelInternationalCards() {
    document.querySelectorAll('.international-card').forEach((card) => {
      if (card.querySelector('.question-loaded-badge')) return;
      const start = card.querySelector('[data-international-test]');
      const level = start?.dataset.internationalTest;
      const test = tests.find((item) => item.level === level);
      const game = intlGames[level];
      const badge = document.createElement('div');
      badge.className = 'question-loaded-badge';
      badge.textContent = test ? `${test.questions.length} questions loaded • ${game?.name || 'Reward game'}` : 'Questions loaded';
      card.insertBefore(badge, card.querySelector('.international-footer'));
    });
  }

  const previousRenderDashboard = window.renderDashboard || renderDashboard;
  if (typeof previousRenderDashboard === 'function' && !window.__worldSectionRenderWrapped) {
    window.__worldSectionRenderWrapped = true;
    renderDashboard = function worldSectionRenderDashboard(...args) {
      const result = previousRenderDashboard.apply(this, args);
      requestAnimationFrame(() => {
        upgradeAcademyMap();
        ensureDashboardInternationalSection();
      });
      return result;
    };
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('#internationalTestsButton, #academyInternationalButton, [data-open-world]')) {
      setTimeout(relabelInternationalCards, 120);
    }
  });

  upgradeAcademyMap();
  ensureDashboardInternationalSection();
  setTimeout(relabelInternationalCards, 140);
})();

