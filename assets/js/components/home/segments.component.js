import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderSegments() {
  const cards = HOME_CONTENT.segments.map(s => `
    <div class="col-md-6"><a href="${s.href}" class="text-decoration-none">
      <div class="segment-section ${s.class}"><div>
        <h3><i class="bi ${s.icon} me-2"></i>${s.title}</h3>
        <p>${s.text}</p>
        <span class="btn btn-light btn-sm">Explorar <i class="bi bi-arrow-right"></i></span>
      </div></div>
    </a></div>`).join('');

  return `<section class="section-padding" aria-label="Segmentos"><div class="container"><div class="row g-4">${cards}</div></div></section>`;
}
