import { ROUTES } from '../../config/constants.js';

export const HOME_CONTENT = {
  hero: {
    badge: 'Tecnología de última generación',
    badgeIcon: 'bi-lightning-charge-fill',
    title: 'El futuro de la <span class="highlight">tecnología</span> está aquí',
    text: 'Descubre hardware premium, periféricos gamer y equipos profesionales. Calidad garantizada, envío rápido y los mejores precios de Colombia.',
    buttons: [
      { label: 'Explorar productos', href: ROUTES.products, class: 'btn-glow', icon: 'bi-arrow-right ms-1' },
      { label: 'Ver GPUs', href: `${ROUTES.products}?category=gpu`, class: 'btn-outline-light-custom' }
    ],
    stats: [
      { value: '500+', label: 'Productos' },
      { value: '10K+', label: 'Clientes' },
      { value: '4.9', label: 'Calificación' }
    ]
  },
  banners: [
    { title: '🔥 Mega Sale Gaming — Hasta 30% OFF', text: 'RTX 4090, teclados mecánicos y más. Oferta por tiempo limitado.', href: `${ROUTES.products}?category=gpu`, bg: 'bg-primary-gradient' },
    { title: '💼 Equipos Profesionales', text: 'MacBooks, ThinkPads y monitores 4K para tu oficina.', href: `${ROUTES.products}?segment=office`, bg: 'bg-dark-gradient' },
    { title: '🚚 Envío Gratis en compras +$500.000', text: 'A todo Colombia. Entrega en 24-48 horas en ciudades principales.', href: ROUTES.products, bg: 'bg-accent' }
  ],
  segments: [
    { id: 'gamer', icon: 'bi-controller', title: 'Mundo Gamer', text: 'GPUs, periféricos, sillas y setups completos para dominar cada partida.', href: `${ROUTES.products}?segment=gamer`, class: 'segment-gamer' },
    { id: 'office', icon: 'bi-briefcase', title: 'Equipos de Oficina', text: 'Laptops profesionales, monitores 4K y accesorios para máxima productividad.', href: `${ROUTES.products}?segment=office`, class: 'segment-office' }
  ],
  benefits: [
    { icon: 'bi-truck', title: 'Envío Express', text: 'Entrega en 24-48h en ciudades principales. Gratis en compras superiores a $500.000.' },
    { icon: 'bi-shield-check', title: 'Garantía Oficial', text: 'Todos nuestros productos cuentan con garantía del fabricante y soporte técnico.' },
    { icon: 'bi-credit-card', title: 'Pago Seguro PSE', text: 'Paga de forma segura con PSE desde tu cuenta bancaria. Integración Openpay certificada.' },
    { icon: 'bi-headset', title: 'Soporte 24/7', text: 'Equipo de expertos disponible por WhatsApp, email y teléfono para ayudarte.' }
  ],
  sections: {
    categories: { title: 'Categorías destacadas', subtitle: 'Encuentra exactamente lo que necesitas', gridId: 'categories-grid' },
    featured: { title: 'Productos destacados', subtitle: 'Lo mejor de nuestra selección', gridId: 'featured-products', link: ROUTES.products },
    new: { title: 'Nuevos ingresos', subtitle: 'Lo último en tecnología', gridId: 'new-products' },
    sale: { title: 'Ofertas especiales', subtitle: 'Aprovecha descuentos exclusivos', gridId: 'sale-products', icon: 'bi-tag-fill text-danger' },
    testimonials: { title: 'Lo que dicen nuestros clientes', subtitle: 'Miles de clientes satisfechos en Colombia', gridId: 'testimonials-slider' },
    newsletter: { title: 'Suscríbete y recibe ofertas exclusivas', subtitle: 'Sé el primero en conocer lanzamientos, descuentos y promociones especiales.' }
  }
};
