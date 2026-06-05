import { ROUTES } from './constants.js';

export const SITE = {
  brand: 'Herrera y Gomez',
  brandHtml: 'Herrera <span>y Gomez</span>',
  year: 2024,
  contact: {
    address: 'Cl 48 F Cr 99 B XXIII',
    city: 'Medellín, Antioquia',
    email: 'info@tienda.herreraygomez.com',
    phone: '324 589 4268',
    hours: 'Lun - Sáb: 9:00 - 20:00'
  },
  social: [
    { label: 'Facebook', icon: 'bi-facebook', href: '#' },
    { label: 'Instagram', icon: 'bi-instagram', href: '#' },
    { label: 'Twitter', icon: 'bi-twitter-x', href: '#' },
    { label: 'YouTube', icon: 'bi-youtube', href: '#' }
  ],
  nav: [
    { label: 'Inicio', href: ROUTES.home },
    { label: 'Productos', href: ROUTES.products },
    { label: 'Gamer', href: `${ROUTES.products}?segment=gamer` },
    { label: 'Oficina', href: `${ROUTES.products}?segment=office` },
    { label: 'Contacto', href: '#contacto', pages: ['home'] }
  ],
  footer: {
    description: 'Tu destino premium para tecnología, hardware y periféricos en Colombia. Calidad, confianza y los mejores precios.',
    shopLinks: [
      { label: 'Todos los productos', href: ROUTES.products },
      { label: 'Laptops', href: `${ROUTES.products}?category=laptops` },
      { label: 'Tarjetas gráficas', href: `${ROUTES.products}?category=gpu` },
      { label: 'Monitores', href: `${ROUTES.products}?category=monitors` },
      { label: 'Gaming', href: `${ROUTES.products}?segment=gamer` }
    ],
    helpLinks: [
      { label: 'Envíos y entregas', href: '#' },
      { label: 'Devoluciones', href: '#' },
      { label: 'Garantías', href: '#' },
      { label: 'Preguntas frecuentes', href: '#' },
      { label: 'Contacto', href: '#contacto' }
    ]
  }
};

export const PAGE_LAYOUT = {
  home: { navbar: 'full', footer: 'full', loading: true, floats: true },
  products: { navbar: 'full', footer: 'minimal', loading: true, floats: true },
  'product-detail': { navbar: 'standard', footer: 'minimal', loading: true, floats: true },
  cart: { navbar: 'standard', footer: 'minimal', loading: false, floats: true },
  checkout: { navbar: 'checkout', footer: 'checkout', loading: false, floats: false },
  success: { navbar: 'minimal', footer: 'minimal', loading: false, floats: true }
};

export const DEFAULT_LAYOUT = {
  navbar: 'standard',
  footer: 'minimal',
  loading: false,
  floats: true
};
