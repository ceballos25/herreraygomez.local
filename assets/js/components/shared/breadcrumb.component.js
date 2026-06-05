export function renderBreadcrumb(items) {
  const lis = items.map((item, i) => {
    const isLast = i === items.length - 1;
    return isLast
      ? `<li class="breadcrumb-item active" aria-current="page">${item.label}</li>`
      : `<li class="breadcrumb-item"><a href="${item.href}">${item.label}</a></li>`;
  }).join('');

  return `<nav aria-label="breadcrumb"><ol class="breadcrumb">${lis}</ol></nav>`;
}
