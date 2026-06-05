import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderBannerCarousel() {
  const slides = HOME_CONTENT.banners.map((b, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <div class="banner-slide ${b.bg}"><div>
        <h3>${b.title}</h3><p>${b.text}</p>
        <a href="${b.href}" class="btn btn-light btn-sm">Ver más</a>
      </div></div>
    </div>`).join('');

  const indicators = HOME_CONTENT.banners.map((_, i) =>
    `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${i}" ${i === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${i + 1}"></button>`
  ).join('');

  return `<section class="banner-carousel" aria-label="Promociones"><div class="container">
    <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">${indicators}</div>
      <div class="carousel-inner rounded-4 overflow-hidden">${slides}</div>
    </div>
  </div></section>`;
}
