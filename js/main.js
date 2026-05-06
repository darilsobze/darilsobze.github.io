// ─── Loading Screen ──────────────────────────────────────────────
const loadingItems = [
  { text: "Initializing neural network..." },
  { text: "Skills loading..." },
  { text: "Projects loading..." },
  { text: "Papers loading..." },
  { text: "Experience loading..." },
  { text: "Calibrating graph nodes..." },
  { text: "Rendering skill graph..." },
  { text: "Portfolio ready." }
];

function runLoadingSequence() {
  const container = document.getElementById('loading-items-list');
  loadingItems.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'loading-item pending';
    el.innerHTML = `
      <div class="loading-check-wrapper">
        <svg class="check-ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="94" stroke-dashoffset="94"/></svg>
        <svg class="check-mark hidden" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="#10b981"/>
          <polyline points="10,18 16,24 26,12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="30"/>
        </svg>
      </div>
      <span>${item.text}</span>
    `;
    container.appendChild(el);
  });

  let current = 0;
  const bar = document.getElementById('loading-bar-fill');

  function tickItem() {
    if (current >= loadingItems.length) {
      setTimeout(finishLoading, 400);
      return;
    }
    const items = container.querySelectorAll('.loading-item');
    if (current > 0) {
      const prev = items[current - 1];
      prev.classList.remove('active');
      prev.classList.add('done');
      const ring = prev.querySelector('.check-ring');
      const mark = prev.querySelector('.check-mark');
      ring.classList.add('hidden');
      mark.classList.remove('hidden');
      mark.querySelector('polyline').style.animation = 'drawCheck 0.3s ease forwards';
    }
    const el = items[current];
    el.classList.remove('pending');
    el.classList.add('active');
    const ring = el.querySelector('.check-ring');
    ring.style.animation = 'spinRing 0.8s linear infinite';
    bar.style.width = `${((current + 1) / loadingItems.length) * 100}%`;
    current++;
    setTimeout(tickItem, current === loadingItems.length ? 600 : 350 + Math.random() * 200);
  }

  setTimeout(tickItem, 500);
}

function finishLoading() {
  const items = document.querySelectorAll('.loading-item');
  const lastItem = items[items.length - 1];
  if (lastItem) {
    lastItem.classList.remove('active');
    lastItem.classList.add('done');
    const ring = lastItem.querySelector('.check-ring');
    const mark = lastItem.querySelector('.check-mark');
    if (ring) ring.classList.add('hidden');
    if (mark) {
      mark.classList.remove('hidden');
      mark.querySelector('polyline').style.animation = 'drawCheck 0.3s ease forwards';
    }
  }
  document.getElementById('loading-bar-fill').style.width = '100%';
  setTimeout(() => {
    const screen = document.getElementById('loading-screen');
    screen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    screen.style.opacity = '0';
    screen.style.transform = 'scale(1.05)';
    const app = document.getElementById('app');
    app.style.display = 'block';
    setTimeout(() => {
      app.style.opacity = '1';
      screen.style.display = 'none';
      initGraph();
      setTimeout(revealNowWorking, 800);
    }, 500);
  }, 600);
}

// ─── Mode Toggle ─────────────────────────────────────────────────
let currentMode = 'graph';

function setupModeToggle() {
  const btn = document.getElementById('mode-toggle-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (currentMode === 'graph') switchToPortfolio();
    else switchToGraph();
  });
}

function switchToPortfolio() {
  currentMode = 'portfolio';
  document.getElementById('graph-view').style.display = 'none';
  const pv = document.getElementById('portfolio-view');
  pv.style.display = 'block';
  requestAnimationFrame(() => { pv.style.opacity = '1'; });
  updateToggleBtn();
  renderPortfolio();
  setupScrollSpy();
}

function switchToGraph() {
  currentMode = 'graph';
  const pv = document.getElementById('portfolio-view');
  pv.style.opacity = '0';
  setTimeout(() => { pv.style.display = 'none'; }, 300);
  updateToggleBtn();
  showGraphLoading();
}

function showGraphLoading() {
  const screen = document.getElementById('loading-screen');
  const container = document.getElementById('loading-items-list');
  const bar = document.getElementById('loading-bar-fill');

  container.innerHTML = '';
  bar.style.width = '0%';
  screen.style.transition = '';
  screen.style.opacity = '1';
  screen.style.transform = 'scale(1)';
  screen.style.display = 'flex';

  const items = [
    { text: "Initializing simulation..." },
    { text: "Calibrating graph nodes..." },
    { text: "Rendering skill graph..." }
  ];

  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'loading-item pending';
    el.innerHTML = `
      <div class="loading-check-wrapper">
        <svg class="check-ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="94" stroke-dashoffset="94"/></svg>
        <svg class="check-mark hidden" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="#10b981"/>
          <polyline points="10,18 16,24 26,12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="30" stroke-dashoffset="30"/>
        </svg>
      </div>
      <span>${item.text}</span>
    `;
    container.appendChild(el);
  });

  let current = 0;
  function tick() {
    if (current >= items.length) {
      setTimeout(() => {
        screen.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        screen.style.opacity = '0';
        screen.style.transform = 'scale(1.04)';
        setTimeout(() => {
          screen.style.display = 'none';
          document.getElementById('graph-view').style.display = 'flex';
          if (!graphInstance) initGraph();
        }, 600);
      }, 400);
      return;
    }
    const els = container.querySelectorAll('.loading-item');
    if (current > 0) {
      const prev = els[current - 1];
      prev.classList.remove('active');
      prev.classList.add('done');
      const ring = prev.querySelector('.check-ring');
      const mark = prev.querySelector('.check-mark');
      ring.classList.add('hidden');
      mark.classList.remove('hidden');
      mark.querySelector('polyline').style.animation = 'drawCheck 0.3s ease forwards';
    }
    const el = els[current];
    el.classList.remove('pending');
    el.classList.add('active');
    el.querySelector('.check-ring').style.animation = 'spinRing 0.8s linear infinite';
    bar.style.width = `${((current + 1) / items.length) * 100}%`;
    current++;
    setTimeout(tick, current === items.length ? 500 : 380 + Math.random() * 160);
  }
  setTimeout(tick, 200);
}

function updateToggleBtn() {
  const btn = document.getElementById('mode-toggle-btn');
  if (!btn) return;
  const isGraph = currentMode === 'graph';
  btn.innerHTML = isGraph
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Portfolio Mode`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="6" y1="7" x2="10" y2="10"/><line x1="18" y1="7" x2="14" y2="10"/><line x1="6" y1="17" x2="10" y2="14"/><line x1="18" y1="17" x2="14" y2="14"/></svg> Skill Graph`;
}

// ─── Portfolio Rendering ──────────────────────────────────────────
function renderPortfolio() {
  if (document.getElementById('portfolio-rendered')) return;
  renderHero();
  renderExperience();
  renderProjects();
  renderPapers();
  renderContact();
  document.getElementById('portfolio-view').dataset.rendered = 'true';
  setupScrollAnimations();
}

function renderHero() {
  const el = document.getElementById('section-whoi');
  const d = portfolioData.personal;
  const skillGroups = [
    { label: 'Programming', skills: portfolioData.skills.programming, color: '#00d4ff' },
    { label: 'AI / ML', skills: portfolioData.skills.aiml, color: '#10b981' },
    { label: 'Frameworks', skills: portfolioData.skills.frameworks, color: '#f59e0b' },
    { label: 'Tools', skills: portfolioData.skills.tools, color: '#8b5cf6' }
  ];

  el.innerHTML = `
    <div class="section-inner">
      <div class="hero-grid">
        <div class="hero-left" data-reveal>
          <div class="hero-photo-wrap story-ring" onclick="openStory()" title="View latest LinkedIn posts">
            <div class="hero-photo-ring"></div>
            <img src="${d.photo}" alt="${d.name}" class="hero-photo">
            <div class="hero-story-tap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="white" stroke="none"/>
              </svg>
              <span>View stories</span>
            </div>
          </div>
          <div class="hero-social">
            <a href="mailto:${d.email}" class="social-btn" title="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
            </a>
            <a href="${d.linkedin}" target="_blank" class="social-btn" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="${d.github}" target="_blank" class="social-btn" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>
            </a>
            <a href="tel:${d.phone}" class="social-btn" title="Phone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.91.35 1.85.58 2.81.71a2 2 0 0 1 1.72 2.06z"/></svg>
            </a>
          </div>
        </div>
        <div class="hero-right" data-reveal>
          <div class="hero-badge">Computer Science Student</div>
          <h1 class="hero-name">Daril Vergesse<br><span class="name-accent">Sobze Soffack</span></h1>
          <p class="hero-subtitle">${d.subtitle}</p>
          <p class="hero-bio">${d.bio}</p>
          <div class="hero-meta">
            <div class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              ${d.university}
            </div>
            <div class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Darmstadt, Germany
            </div>
          </div>
          <div class="hero-languages">
            ${d.languages.map(l => `<div class="lang-pill">${l.flag} <strong>${l.lang}</strong> <span>${l.level}</span></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="skills-grid-wrap" data-reveal>
        <h3 class="skills-heading">Technical Skills</h3>
        <div class="skills-grid">
          ${skillGroups.map(g => `
            <div class="skill-group">
              <div class="skill-group-label" style="color:${g.color}">${g.label}</div>
              <div class="skill-tags">
                ${g.skills.map(s => `<span class="skill-tag" style="--tag-color:${g.color}">${s}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

const companyLogoMap = {
  fraunhofer:   'sit-logo-2009.png',
  idat:         'IDAT-logowebp.webp',
  'tu-ta':      'logo-technische-universitaet-darmstadt_0.png',
  studienkreis: 'Studienkreis-Online-Nachhilfe.png'
};

function renderExperience() {
  const el = document.getElementById('section-experience');
  const exp = portfolioData.experience;
  el.innerHTML = `
    <div class="section-inner">
      <div class="section-header" data-reveal>
        <span class="section-eyebrow">Career</span>
        <h2 class="section-title">Experience</h2>
      </div>
      <div class="timeline">
        ${exp.map((e, i) => {
          const logoSrc = companyLogoMap[e.id];
          return `
          <div class="timeline-item" data-reveal style="--delay:${i * 80}ms">
            <div class="timeline-line" style="background:${e.color}"></div>
            <div class="timeline-dot" style="background:${e.color};box-shadow:0 0 12px ${e.color}88"></div>
            <div class="timeline-card glass-card">
              <div class="tl-header">
                <div>
                  <div class="tl-company">
                    ${logoSrc ? `<img src="${logoSrc}" alt="${e.company} logo" class="tl-company-logo">` : ''}
                    <span>${e.company}</span>
                  </div>
                  <div class="tl-role" style="color:${e.color}">${e.role}</div>
                </div>
                <div class="tl-right">
                  <div class="tl-period">${e.period}</div>
                  <div class="tl-location">${e.location}</div>
                  <span class="tl-type-badge" style="--badge-color:${e.color}">${e.type}</span>
                </div>
              </div>
              <ul class="tl-bullets">
                ${e.bullets.map(b => `<li>${b}</li>`).join('')}
              </ul>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderProjects() {
  const el = document.getElementById('section-projects');
  el.innerHTML = `
    <div class="section-inner">
      <div class="section-header" data-reveal>
        <span class="section-eyebrow">Portfolio</span>
        <h2 class="section-title">Projects</h2>
      </div>
      <div class="cards-grid">
        ${portfolioData.projects.map((p, i) => `
          <div class="project-card glass-card" data-reveal style="--delay:${i * 100}ms" onclick="openModal('project','${p.id}')">
            <div class="card-image-wrap">
              <img src="${p.image}" alt="${p.name}" class="card-image">
              <div class="card-image-overlay"></div>
              ${p.event ? `<div class="card-event-badge">${p.event}</div>` : ''}
            </div>
            <div class="card-body">
              <div class="card-tags">
                ${p.tags.slice(0, 3).map(t => `<span class="card-tag">${t}</span>`).join('')}
              </div>
              <h3 class="card-title">${p.name}</h3>
              <p class="card-subtitle">${p.subtitle}</p>
              <p class="card-tagline">${p.tagline}</p>
              <div class="card-footer">
                <span class="card-period">${p.period}</span>
                <div class="card-ext-links">
                  ${p.github ? `
                    <a class="card-ext-btn card-ext-github" href="${p.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="View on GitHub">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      GitHub
                    </a>
                  ` : ''}
                  ${p.demo ? `
                    <a class="card-ext-btn card-ext-demo" href="${p.demo}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="View Demo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
                      Demo
                    </a>
                  ` : `
                    <span class="card-ext-btn card-ext-demo card-ext-disabled" title="Demo coming soon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
                      Demo
                    </span>
                  `}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPapers() {
  const el = document.getElementById('section-papers');
  el.innerHTML = `
    <div class="section-inner">
      <div class="section-header" data-reveal>
        <span class="section-eyebrow">Research</span>
        <h2 class="section-title">Papers</h2>
      </div>
      <div class="cards-grid">
        ${portfolioData.papers.map((p, i) => `
          <div class="paper-card glass-card" data-reveal style="--delay:${i * 100}ms" onclick="openModal('paper','${p.id}')">
            <div class="card-image-wrap">
              <img src="${p.image}" alt="${p.name}" class="card-image">
              <div class="card-image-overlay" style="background:linear-gradient(to top, #030712 40%, transparent)"></div>
            </div>
            <div class="card-body">
              <div class="card-tags">
                ${p.tags.slice(0, 3).map(t => `<span class="card-tag paper-tag">${t}</span>`).join('')}
              </div>
              <h3 class="card-title">${p.name}</h3>
              ${p.subtitle ? `<p class="card-subtitle">${p.subtitle}</p>` : ''}
              <p class="card-tagline">${p.tagline}</p>
              <div class="card-footer">
                <span class="card-period">${p.period}</span>
                ${p.pdf ? `<span class="card-pdf-badge">PDF Available</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderContact() {
  const el = document.getElementById('section-contact');
  const d = portfolioData.personal;
  el.innerHTML = `
    <div class="section-inner">
      <div class="section-header" data-reveal>
        <span class="section-eyebrow">Get in Touch</span>
        <h2 class="section-title">Contact Me</h2>
      </div>
      <div class="contact-grid" data-reveal>
        <div class="contact-info">
          <p class="contact-intro">Whether you have a project idea, want to collaborate on research, or just want to connect — I'm always open to a good conversation.</p>
          <div class="contact-links">
            <a href="mailto:${d.email}" class="contact-link">
              <div class="contact-link-icon" style="background:#00d4ff22;border:1px solid #00d4ff44">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              </div>
              <div>
                <div class="contact-link-label">Email</div>
                <div class="contact-link-value">${d.email}</div>
              </div>
            </a>
            <a href="${d.linkedin}" target="_blank" class="contact-link">
              <div class="contact-link-icon" style="background:#0077b522;border:1px solid #0077b544">
                <svg viewBox="0 0 24 24" fill="#0077b5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <div class="contact-link-label">LinkedIn</div>
                <div class="contact-link-value">linkedin.com/in/darilsobze</div>
              </div>
            </a>
            <a href="${d.github}" target="_blank" class="contact-link">
              <div class="contact-link-icon" style="background:#ffffff11;border:1px solid #ffffff22">
                <svg viewBox="0 0 24 24" fill="#f1f5f9"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>
              </div>
              <div>
                <div class="contact-link-label">GitHub</div>
                <div class="contact-link-value">github.com/darilsobze</div>
              </div>
            </a>
            <a href="tel:${d.phone}" class="contact-link">
              <div class="contact-link-icon" style="background:#10b98122;border:1px solid #10b98144">
                <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.71 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.91.35 1.85.58 2.81.71a2 2 0 0 1 1.72 2.06z"/></svg>
              </div>
              <div>
                <div class="contact-link-label">Phone</div>
                <div class="contact-link-value">${d.phone}</div>
              </div>
            </a>
          </div>
          <div class="contact-activities">
            <div class="activity-badge">⚽ Vice-Captain · SV Kamerun Darmstadt 1999</div>
          </div>
        </div>
        <div class="contact-visual">
          <div class="contact-card-3d">
            <div class="cc-name">${d.name}</div>
            <div class="cc-title">${d.title}</div>
            <div class="cc-divider"></div>
            <div class="cc-info">${d.email}</div>
            <div class="cc-info">${d.phone}</div>
            <div class="cc-initials">${d.initials}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Modal ────────────────────────────────────────────────────────
function openModal(type, id) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  let item;
  if (type === 'project') item = portfolioData.projects.find(p => p.id === id);
  if (type === 'paper') item = portfolioData.papers.find(p => p.id === id);
  if (!item) return;

  const isProject = type === 'project';
  const accentColor = isProject ? '#10b981' : '#f59e0b';

  content.innerHTML = `
    <button class="modal-close-btn" onclick="closeModal()">✕</button>
    <div class="modal-hero">
      <img src="${item.image}" alt="${item.name}" class="modal-image">
      <div class="modal-hero-overlay"></div>
    </div>
    <div class="modal-body">
      <div class="modal-tags">
        ${(item.tags || []).map(t => `<span class="modal-tag" style="border-color:${accentColor}44;color:${accentColor}">${t}</span>`).join('')}
      </div>
      <h2 class="modal-title">${item.name}</h2>
      ${item.subtitle ? `<p class="modal-subtitle">${item.subtitle}</p>` : ''}
      <div class="modal-meta">
        <span>${item.period}</span>
        ${item.role ? `<span>${item.role}</span>` : ''}
        ${item.event ? `<span style="color:${accentColor}">${item.event}</span>` : ''}
      </div>
      <p class="modal-description">${item.description}</p>
      <div class="modal-highlights">
        <h4>Key Highlights</h4>
        <ul>${(item.highlights || []).map(h => `<li>${h}</li>`).join('')}</ul>
      </div>
      <div class="modal-actions">
        ${item.pdf ? `
          <a href="${item.pdf}" target="_blank" class="modal-btn" style="background:${accentColor}22;border:1px solid ${accentColor}55;color:${accentColor}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            ${isProject ? 'View Documentation' : 'Read Full Paper'}
          </a>
        ` : ''}
        ${item.github ? `
          <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-github">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>
        ` : ''}
        ${item.demo ? `
          <a href="${item.demo}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-demo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
            View Demo
          </a>
        ` : `
          ${isProject ? `
            <span class="modal-btn modal-btn-demo-disabled">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
              Demo Soon
            </span>
          ` : ''}
        `}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ─── Now Building Widget ──────────────────────────────────────────
let nwExpanded = false;

function toggleNowWorking() {
  nwExpanded = !nwExpanded;
  const card    = document.getElementById('nw-card');
  const chevron = document.getElementById('nw-chevron');
  if (nwExpanded) {
    card.classList.remove('nw-hidden');
    chevron.classList.remove('is-collapsed');
  } else {
    card.classList.add('nw-hidden');
    chevron.classList.add('is-collapsed');
  }
}

function revealNowWorking() {
  if (!nwExpanded) toggleNowWorking();
}

// ─── Scroll Animations ────────────────────────────────────────────
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

function setupScrollSpy() {
  const sections = ['whoi', 'experience', 'projects', 'papers', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('section-', '');
        navLinks.forEach(l => {
          l.classList.toggle('active', l.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => {
    const el = document.getElementById(`section-${s}`);
    if (el) observer.observe(el);
  });
}

// ─── Nav smooth scroll ────────────────────────────────────────────
function setupNavLinks() {
  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      if (currentMode !== 'portfolio') switchToPortfolio();
      setTimeout(() => {
        const el = document.getElementById(`section-${section}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, currentMode !== 'portfolio' ? 400 : 0);
    });
  });
}

// ─── Navbar scroll ────────────────────────────────────────────────
function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    lastScroll = current;
  }, { passive: true });
}

// ─── LinkedIn Stories ─────────────────────────────────────────────
// LinkedIn blocks iframes — posts are rendered as custom cards.
// Update the `text` field below with your actual post content.
const linkedInStories = [
  {
    originalUrl: 'https://www.linkedin.com/posts/darilsobze_callpilot-hackathon-aiagents-ugcPost-7427280873151963136-4kYv',
    date: 'Feb 2026',
    badge: 'MIT · Hack-Nation AI Hackathon',
    badgeColor: '#f59e0b',
    image: 'callpilot.png',
    duration: 22000,
    text: `🚀 Just shipped <strong>CALLPILOT AI</strong> in 24h at MIT's Hack-Nation AI Hackathon!<br><br>
We built an autonomous AI agent that:<br>
📞 Scans for local service providers<br>
🤖 Makes real phone calls on your behalf<br>
🗓 Books appointments directly into Google Calendar<br><br>
The agent navigates IVR systems, talks naturally with staff, and handles the full scheduling end-to-end — no human needed.<br><br>
<span class="li-hashtags">#CallPilot #AIAgents #Hackathon #MIT #Agentic #RAG</span>`
  },
  {
    originalUrl: 'https://www.linkedin.com/posts/darilsobze_ai-demystified-hackathon-ugcPost-7424171694228942848-KdIY',
    date: 'Jan 2026',
    badge: 'IBM Dev Day Germany',
    badgeColor: '#0f62fe',
    image: 'HR-Orchestrator.png',
    duration: 22000,
    text: `🏆 Presented <strong>HR Orchestrator</strong> at IBM Dev Day Germany — and it was incredible!<br><br>
Built a fully autonomous hiring system powered by <strong>IBM WatsonX ORCHESTRATE</strong> with 3 specialized mini-agents:<br><br>
🔹 <strong>Agent 1</strong> — Posts jobs automatically to Slack<br>
🔹 <strong>Agent 2</strong> — Scores resumes vs job requirements using LLM reasoning<br>
🔹 <strong>Agent 3</strong> — Sends personalized invitation / rejection emails<br><br>
Zero human input required from posting to candidate response. 🤯<br><br>
<span class="li-hashtags">#AI #IBM #WatsonX #HRTech #Agentic #Hackathon</span>`
  }
];

let storyIndex = 0;
let storyTimer = null;

function openStory() {
  storyIndex = 0;
  buildStoryBars();
  showStory(0);
  document.getElementById('story-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStory() {
  clearStoryTimer();
  const overlay = document.getElementById('story-overlay');
  overlay.classList.remove('active');
  overlay.classList.add('closing');
  setTimeout(() => {
    overlay.classList.remove('closing');
    document.body.style.overflow = '';
  }, 380);
}

function buildStoryBars() {
  const container = document.getElementById('story-bars');
  container.innerHTML = linkedInStories.map((_, i) =>
    `<div class="story-bar"><div class="story-bar-fill" id="sbf-${i}"></div></div>`
  ).join('');
}

function showStory(index) {
  clearStoryTimer();
  const story = linkedInStories[index];

  // Render custom post card
  document.getElementById('story-post-card').innerHTML = `
    <div class="li-card-head">
      <img src="Daril-IAS.jpg" alt="Daril" class="li-card-avatar">
      <div class="li-card-author">
        <div class="li-card-name">Daril Vergesse Sobze Soffack</div>
        <div class="li-card-role">AI Engineer · TU Darmstadt</div>
        <div class="li-card-time">${story.date}</div>
      </div>
      <svg class="li-card-logo" viewBox="0 0 24 24" fill="#0077b5" width="26" height="26">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </div>
    <div class="li-card-text">${story.text}</div>
    <div class="li-card-img-wrap">
      <img src="${story.image}" alt="post image" class="li-card-img">
      <div class="li-card-event-badge" style="background:${story.badgeColor}22;border-color:${story.badgeColor}55;color:${story.badgeColor}">
        ${story.badge}
      </div>
    </div>
    <div class="li-card-reactions">
      <span class="li-card-react-icons">👍 🎉 🔥</span>
      <span class="li-card-react-count">${Math.floor(Math.random() * 80 + 120)} reactions</span>
    </div>
    <div class="li-card-divider"></div>
    <div class="li-card-actions">
      <div class="li-card-action"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>Like</div>
      <div class="li-card-action"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Comment</div>
      <div class="li-card-action"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>Repost</div>
    </div>
  `;

  // Update meta
  document.getElementById('story-date-label').textContent = story.date;
  document.getElementById('story-li-link').href = story.originalUrl;

  // Reset all bars
  linkedInStories.forEach((_, i) => {
    const fill = document.getElementById(`sbf-${i}`);
    if (!fill) return;
    fill.style.transition = 'none';
    fill.style.width = i < index ? '100%' : '0%';
  });

  // Animate active bar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const activeFill = document.getElementById(`sbf-${index}`);
      if (activeFill) {
        activeFill.style.transition = `width ${story.duration}ms linear`;
        activeFill.style.width = '100%';
      }
    });
  });

  storyTimer = setTimeout(() => {
    if (index < linkedInStories.length - 1) {
      storyIndex++;
      showStory(storyIndex);
    } else {
      closeStory();
    }
  }, story.duration);
}

function nextStory() {
  if (storyIndex < linkedInStories.length - 1) {
    storyIndex++;
    showStory(storyIndex);
  } else {
    closeStory();
  }
}

function prevStory() {
  if (storyIndex > 0) {
    storyIndex--;
    showStory(storyIndex);
  } else {
    // Replay current
    showStory(0);
  }
}

function clearStoryTimer() {
  if (storyTimer) { clearTimeout(storyTimer); storyTimer = null; }
}

// ─── "Open to opportunities" tap toggle (mobile) ──────────────────
function setupStatusBadge() {
  const badge = document.querySelector('.nav-status-badge');
  if (!badge) return;
  badge.addEventListener('click', (e) => {
    badge.classList.toggle('popup-open');
    e.stopPropagation();
  });
  document.addEventListener('click', () => {
    badge.classList.remove('popup-open');
  });
}

// ─── Init ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  runLoadingSequence();
  setupModeToggle();
  setupNavLinks();
  setupNavbarScroll();
  setupStatusBadge();

  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Close story on overlay background click
  document.getElementById('story-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeStory();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeStory();
    }
    if (e.key === 'ArrowRight') nextStory();
    if (e.key === 'ArrowLeft')  prevStory();
  });
});
