import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderNewsletter() {
  const { title, subtitle } = HOME_CONTENT.sections.newsletter;
  return `<section class="section-padding" aria-labelledby="newsletter-title"><div class="container">
    <div class="newsletter-section text-center">
      <h3 id="newsletter-title">${title}</h3>
      <p class="mb-4 opacity-75">${subtitle}</p>
      <form class="newsletter-form mx-auto" aria-label="Suscripción newsletter">
        <input type="email" placeholder="Tu correo electrónico" required aria-label="Correo electrónico">
        <button type="submit">Suscribirse</button>
      </form>
    </div>
  </div></section>`;
}
