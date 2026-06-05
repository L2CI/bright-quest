(() => {
  const iconMap = {
    maths: { mark: '+', label: 'Maths' },
    english: { mark: 'AB', label: 'English' },
    reasoning: { mark: '?', label: 'Logic' },
    world: { mark: 'UK', label: 'World' },
    arcade: { mark: 'GO', label: 'Arcade' }
  };

  function upgradeAcademyCards() {
    document.querySelectorAll('.academy-zone').forEach((button) => {
      if (button.dataset.visualUpgraded === 'true') return;
      button.dataset.visualUpgraded = 'true';
      const type = Object.keys(iconMap).find((key) => button.classList.contains(key)) || 'world';
      const icon = iconMap[type];
      const existing = button.querySelector('span');
      if (existing) {
        existing.classList.add('academy-zone-icon');
        existing.textContent = icon.mark;
      }
      const scene = document.createElement('i');
      scene.className = `academy-card-scene scene-${type}`;
      scene.setAttribute('aria-hidden', 'true');
      button.prepend(scene);
    });
  }

  function upgradeInternationalCards() {
    document.querySelectorAll('.international-card').forEach((card, index) => {
      if (card.dataset.visualUpgraded === 'true') return;
      card.dataset.visualUpgraded = 'true';
      const art = document.createElement('div');
      art.className = `international-card-art art-${index + 1}`;
      art.setAttribute('aria-hidden', 'true');
      art.innerHTML = '<span class="flag"></span><span class="skyline"></span><span class="trophy"></span>';
      card.prepend(art);
    });
  }

  function upgradeParentCockpit() {
    const parent = document.querySelector('#parentScreen');
    if (!parent || parent.dataset.visualUpgraded === 'true') return;
    parent.dataset.visualUpgraded = 'true';
    const banner = document.createElement('section');
    banner.className = 'parent-bright-banner';
    banner.innerHTML = `
      <div>
        <p class="eyebrow">Parent cockpit preview</p>
        <h3>Clear signals first. Details only when opened.</h3>
      </div>
      <div class="parent-banner-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
    `;
    const recommendation = parent.querySelector('#parentRecommendation');
    if (recommendation) recommendation.before(banner);
  }

  function upgradeRoleScreens() {
    document.querySelectorAll('.role-panel, #profileScreen .hero-panel').forEach((panel) => {
      if (panel.dataset.visualUpgraded === 'true') return;
      panel.dataset.visualUpgraded = 'true';
      const mascot = document.createElement('div');
      mascot.className = 'bright-mascot-card';
      mascot.setAttribute('aria-hidden', 'true');
      mascot.innerHTML = '<span class="mascot-star"></span><span class="mascot-spark one"></span><span class="mascot-spark two"></span>';
      panel.prepend(mascot);
    });
  }

  const previousRenderDashboard = window.renderDashboard || renderDashboard;
  if (typeof previousRenderDashboard === 'function' && !window.__brightVisualRenderWrapped) {
    window.__brightVisualRenderWrapped = true;
    renderDashboard = function visualRenderDashboard(...args) {
      const result = previousRenderDashboard.apply(this, args);
      requestAnimationFrame(() => {
        upgradeAcademyCards();
        upgradeInternationalCards();
      });
      return result;
    };
  }

  const previousRenderParentDashboard = window.renderParentDashboard || renderParentDashboard;
  if (typeof previousRenderParentDashboard === 'function' && !window.__brightParentVisualWrapped) {
    window.__brightParentVisualWrapped = true;
    renderParentDashboard = function visualRenderParentDashboard(...args) {
      const result = previousRenderParentDashboard.apply(this, args);
      requestAnimationFrame(() => {
        upgradeParentCockpit();
        document.querySelectorAll('.parent-visual-stat').forEach((stat, index) => {
          stat.style.setProperty('--stat-index', index);
        });
      });
      return result;
    };
  }

  document.addEventListener('click', (event) => {
    if (event.target.closest('#internationalTestsButton, #academyInternationalButton')) {
      setTimeout(upgradeInternationalCards, 80);
    }
  });

  upgradeRoleScreens();
  upgradeAcademyCards();
  upgradeParentCockpit();
  setTimeout(upgradeInternationalCards, 120);
})();
