export function renderSectionHeader({ title, subtitle, id, centered = false, icon = '', link = null, linkLabel = 'Ver todos' }) {
  const align = centered ? 'text-center' : '';
  const linkHtml = link
    ? `<a href="${link}" class="btn btn-outline-primary d-none d-md-inline-flex">${linkLabel} <i class="bi bi-arrow-right ms-1"></i></a>`
    : '';

  const header = centered
    ? `<h2 class="section-title ${align}" ${id ? `id="${id}"` : ''}>${icon ? `<i class="bi ${icon} me-2"></i>` : ''}${title}</h2>
       <p class="section-subtitle ${align}">${subtitle || ''}</p>`
    : `<div class="d-flex justify-content-between align-items-center mb-4">
         <div>
           <h2 class="section-title mb-0" ${id ? `id="${id}"` : ''}>${title}</h2>
           <p class="section-subtitle mb-0">${subtitle || ''}</p>
         </div>
         ${linkHtml}
       </div>`;

  return header;
}
