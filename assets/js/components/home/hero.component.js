import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderHero() {
  const { hero } = HOME_CONTENT;
  return `<section class="hero-section" aria-label="Banner principal"><div class="container"><div class="row align-items-center g-5">
    <div class="col-lg-6 hero-content">
      <div class="hero-badge"><i class="bi ${hero.badgeIcon}"></i> ${hero.badge}</div>
      <h1 class="hero-title">${hero.title}</h1>
      <p class="hero-text">${hero.text}</p>
      <div class="hero-buttons">${hero.buttons.map(b => `<a href="${b.href}" class="btn ${b.class}">${b.label}${b.icon ? ` <i class="bi ${b.icon}"></i>` : ''}</a>`).join('')}</div>
      <div class="hero-stats">${hero.stats.map(s => `<div class="hero-stat"><strong>${s.value}</strong><span>${s.label}</span></div>`).join('')}</div>
    </div>
    <div class="col-lg-6 hero-visual"><img src="" alt="Setup gaming premium Herrera y Gomez" loading="eager" width="700" height="500"></div>
  </div></div></section>`;
}
