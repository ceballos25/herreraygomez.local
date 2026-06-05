import { SITE } from '../../config/site.config.js';
import { ROUTES } from '../../config/constants.js';

const social = () => SITE.social.map(s => `<a href="${s.href}" aria-label="${s.label}"><i class="bi ${s.icon}"></i></a>`).join('');
const links = items => items.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('');

const TEMPLATES = {
  full() {
    const { contact, footer } = SITE;
    return `<footer class="footer-main" id="contacto"><div class="container"><div class="row g-4">
      <div class="col-lg-4"><div class="footer-brand">${SITE.brandHtml}</div><p class="footer-desc">${footer.description}</p><div class="footer-social">${social()}</div></div>
      <div class="col-6 col-lg-2"><h6 class="footer-title">Tienda</h6><ul class="footer-links">${links(footer.shopLinks)}</ul></div>
      <div class="col-6 col-lg-2"><h6 class="footer-title">Ayuda</h6><ul class="footer-links">${links(footer.helpLinks)}</ul></div>
      <div class="col-lg-4"><h6 class="footer-title">Contacto</h6><ul class="footer-links">
        <li><i class="bi bi-geo-alt me-2"></i>${contact.address}, ${contact.city}</li>
        <li><i class="bi bi-envelope me-2"></i>${contact.email}</li>
        <li><i class="bi bi-telephone me-2"></i>${contact.phone}</li>
        <li><i class="bi bi-clock me-2"></i>${contact.hours}</li>
      </ul><div class="payment-icons"><i class="bi bi-bank2" title="PSE"></i><i class="bi bi-credit-card" title="Tarjetas"></i><i class="bi bi-shield-lock" title="Pago seguro"></i></div></div>
    </div><div class="footer-bottom"><p>&copy; ${SITE.year} ${SITE.brand}. Todos los derechos reservados.</p></div></div></footer>`;
  },
  minimal() {
    return `<footer class="footer-main"><div class="container"><div class="footer-bottom mt-0 border-0">
      <p>&copy; ${SITE.year} ${SITE.brand}. <a href="${ROUTES.home}">Volver al inicio</a></p>
    </div></div></footer>`;
  },
  checkout() {
    return `<footer class="footer-main"><div class="container"><div class="footer-bottom mt-0 border-0">
      <p>&copy; ${SITE.year} ${SITE.brand} — Pago seguro con OpenPay</p>
    </div></div></footer>`;
  },
  none: () => ''
};

export function renderFooter(variant) {
  return (TEMPLATES[variant] || TEMPLATES.minimal)();
}
