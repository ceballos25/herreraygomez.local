import { SITE } from '../../config/site.config.js';
import { ROUTES } from '../../config/constants.js';

function navLinks(pageKey, variant) {
  const links = variant === 'full' ? SITE.nav : SITE.nav.filter(l => !l.pages || l.pages.includes(pageKey));
  return links.map(l => `<li class="nav-item"><a class="nav-link" href="${l.href}">${l.label}</a></li>`).join('');
}

const searchForm = () => `
  <form class="search-form d-none d-lg-block me-3" id="global-search-form" role="search">
    <i class="bi bi-search search-icon"></i>
    <input type="search" id="global-search-input" placeholder="Buscar productos..." aria-label="Buscar productos">
  </form>`;

const miniCart = () => `
  <div class="dropdown">
    <button class="btn btn-icon" data-bs-toggle="dropdown" aria-label="Carrito de compras">
      <i class="bi bi-cart3"></i><span class="cart-badge d-none">0</span>
    </button>
    <div class="dropdown-menu dropdown-menu-end mini-cart-dropdown">
      <h6 class="mb-2">Mi Carrito</h6>
      <div id="mini-cart-items"></div><hr>
      <div class="d-flex justify-content-between mb-2"><strong>Total:</strong><strong id="mini-cart-total">$0</strong></div>
      <a href="${ROUTES.cart}" class="btn btn-outline-primary btn-sm w-100 mb-1">Ver carrito</a>
      <a href="${ROUTES.checkout}" class="btn btn-primary btn-sm w-100">Checkout</a>
    </div>
  </div>`;

const themeToggle = () => `<button class="btn btn-icon theme-toggle" aria-label="Cambiar tema"><i class="bi bi-moon-fill"></i></button>`;
const cartIconLink = () => `<a href="${ROUTES.cart}" class="btn btn-icon" aria-label="Carrito"><i class="bi bi-cart3"></i><span class="cart-badge d-none">0</span></a>`;

const TEMPLATES = {
  full(pageKey) {
    return `<nav class="navbar navbar-expand-lg navbar-main fixed-top" aria-label="Navegación principal">
      <div class="container">
        <a class="navbar-brand" href="${ROUTES.home}">${SITE.brandHtml}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav mx-auto">${navLinks(pageKey, 'full')}</ul>
          ${searchForm()}
          <div class="nav-actions d-flex align-items-center gap-2">${themeToggle()}${miniCart()}</div>
        </div>
      </div>
    </nav>`;
  },
  standard(pageKey) {
    return `<nav class="navbar navbar-expand-lg navbar-main fixed-top" aria-label="Navegación principal">
      <div class="container">
        <a class="navbar-brand" href="${ROUTES.home}">${SITE.brandHtml}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-label="Abrir menú"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav mx-auto">${navLinks(pageKey, 'standard')}</ul>
          <div class="nav-actions d-flex align-items-center gap-2">${themeToggle()}${pageKey === 'cart' ? cartIconLink() : miniCart()}</div>
        </div>
      </div>
    </nav>`;
  },
  checkout() {
    return `<nav class="navbar navbar-expand-lg navbar-main fixed-top" aria-label="Navegación principal">
      <div class="container">
        <a class="navbar-brand" href="${ROUTES.home}">${SITE.brandHtml}</a>
        <div class="nav-actions d-flex align-items-center gap-2 ms-auto">
          ${themeToggle()}
          <span class="text-muted small d-none d-md-inline"><i class="bi bi-shield-lock text-success"></i> Pago seguro SSL</span>
        </div>
      </div>
    </nav>`;
  },
  minimal() {
    return `<nav class="navbar navbar-expand-lg navbar-main fixed-top" aria-label="Navegación principal">
      <div class="container"><a class="navbar-brand" href="${ROUTES.home}">${SITE.brandHtml}</a></div>
    </nav>`;
  }
};

export function renderNavbar(variant, pageKey) {
  return (TEMPLATES[variant] || TEMPLATES.standard)(pageKey);
}
