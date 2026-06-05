export function renderPagination({ page, totalPages }) {
  if (totalPages <= 1) return '';

  let html = '<nav aria-label="Paginación"><ul class="pagination justify-content-center">';
  html += `<li class="page-item ${page <= 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${page - 1}"><i class="bi bi-chevron-left"></i></a></li>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === page ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  html += `<li class="page-item ${page >= totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${page + 1}"><i class="bi bi-chevron-right"></i></a></li></ul></nav>`;
  return html;
}

export function bindPagination(container, { page, totalPages }, onPageChange) {
  if (!container) return;
  container.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const next = parseInt(link.dataset.page, 10);
      if (next >= 1 && next <= totalPages) onPageChange(next);
    });
  });
}
