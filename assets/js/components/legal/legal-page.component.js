import { mountPage } from '../../utils/mount.js';
import { ROUTES } from '../../config/constants.js';
import { renderBreadcrumb } from '../shared/breadcrumb.component.js';

function renderSection({ title, paragraphs }) {
  const body = paragraphs.map(p => `<p>${p}</p>`).join('');
  return `<section class="legal-section"><h2>${title}</h2>${body}</section>`;
}

export function mountLegalPage({ title, date, sections, breadcrumbLabel }) {
  const content = sections.map(renderSection).join('');

  mountPage([`
    <section class="legal-section-wrap section-padding">
      <div class="container">
        ${renderBreadcrumb([{ label: 'Inicio', href: ROUTES.home }, { label: breadcrumbLabel }])}
        <article class="legal-page">
          <header class="legal-page-header">
            <h1 class="section-title">${title}</h1>
            <p class="legal-page-date">Última actualización: ${date}</p>
          </header>
          <div class="legal-page-body">${content}</div>
        </article>
      </div>
    </section>`]);
}
