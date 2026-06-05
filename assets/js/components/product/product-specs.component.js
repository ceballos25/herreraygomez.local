export function renderProductSpecs(specs) {
  if (!specs) return '';
  return `<table class="table specs-table"><tbody>${Object.entries(specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>`;
}
