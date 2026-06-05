import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderBenefits() {
  const cards = HOME_CONTENT.benefits.map(b => `
    <div class="benefit-card"><i class="bi ${b.icon}"></i><h5>${b.title}</h5><p>${b.text}</p></div>`).join('');

  return `<section class="section-padding" style="background: var(--bg-secondary);" aria-labelledby="benefits-title">
    <div class="container">
      <h2 class="section-title text-center" id="benefits-title">¿Por qué Herrera y Gomez?</h2>
      <p class="section-subtitle text-center">Tu confianza es nuestra prioridad</p>
      <div class="benefits-grid">${cards}</div>
    </div>
  </section>`;
}
