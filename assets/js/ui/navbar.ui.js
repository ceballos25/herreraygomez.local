import { APP_CONFIG } from '../config/constants.js';
import { renderMiniCart } from '../components/cart-view.component.js';
import { showToast } from './toast.ui.js';

export function initNavbar() {
  const navbar = document.querySelector('.navbar-main');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    });
  }

  const searchForm = document.getElementById('global-search-form');
  const searchInput = document.getElementById('global-search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput.value.trim();
      window.location.href = q ? `products.html?q=${encodeURIComponent(q)}` : 'products.html';
    });
  }

  renderMiniCart();
  setActiveNavLink();
}

export function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

export function initWhatsApp() {
  const btn = document.getElementById('whatsapp-btn');
  if (!btn) return;
  const { whatsapp, whatsappMessage } = APP_CONFIG.contact;
  btn.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
}

export function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Ingresa un correo válido', 'warning');
        return;
      }
      showToast('¡Gracias por suscribirte a Herrera y Gomez!', 'success');
      form.reset();
    });
  });
}
