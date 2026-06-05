import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderTestimonialsSection() {
  const { title, subtitle, gridId } = HOME_CONTENT.sections.testimonials;
  return `<section class="section-padding" aria-labelledby="testimonials-title"><div class="container">
    <h2 class="section-title text-center" id="testimonials-title">${title}</h2>
    <p class="section-subtitle text-center">${subtitle}</p>
    <div class="testimonials-grid" id="${gridId}"></div>
  </div></section>`;
}
