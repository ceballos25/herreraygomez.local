import { HOME_CONTENT } from '../../data/content/home.content.js';

export function renderCategoriesSection() {
  const { title, subtitle, gridId } = HOME_CONTENT.sections.categories;
  return `<section class="section-padding" aria-labelledby="categories-title"><div class="container">
    <h2 class="section-title" id="categories-title">${title}</h2>
    <p class="section-subtitle">${subtitle}</p>
    <div class="categories-grid" id="${gridId}"></div>
  </div></section>`;
}
