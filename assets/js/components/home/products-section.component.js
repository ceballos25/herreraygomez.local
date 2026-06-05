import { renderSectionHeader } from '../shared/section-header.component.js';

export function renderProductsSection({ title, subtitle, gridId, id, icon, link, bg = false, centered = false }) {
  const header = centered
    ? renderSectionHeader({ title, subtitle, id, centered: true, icon })
    : renderSectionHeader({ title, subtitle, id, link });

  const bgStyle = bg ? ' style="background: var(--bg-secondary);"' : '';
  return `<section class="section-padding"${bgStyle} aria-labelledby="${id || gridId}">
    <div class="container">${header}<div class="products-grid" id="${gridId}"></div></div>
  </section>`;
}
