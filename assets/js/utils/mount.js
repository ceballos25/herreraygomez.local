export function getPageRoot() {
  return document.querySelector('main') || document.getElementById('app-root');
}

export function mountHTML(target, html) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;
  el.innerHTML = html;
  return el;
}

export function appendHTML(target, html) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;
  el.insertAdjacentHTML('beforeend', html);
  return el;
}

export function insertBeforeMain(html) {
  const main = getPageRoot();
  if (!main) {
    document.body.insertAdjacentHTML('afterbegin', html);
    return;
  }
  main.insertAdjacentHTML('beforebegin', html);
}

export function insertAfterMain(html) {
  const main = getPageRoot();
  if (!main) {
    document.body.insertAdjacentHTML('beforeend', html);
    return;
  }
  main.insertAdjacentHTML('afterend', html);
}

export function mountPage(sections) {
  const root = getPageRoot();
  if (!root) return null;
  root.innerHTML = sections.filter(Boolean).join('');
  return root;
}
