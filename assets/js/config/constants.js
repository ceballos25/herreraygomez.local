export const APP_CONFIG = {
  name: 'Herrera y Gomez',
  storage: {
    cart: 'hyg_cart',
    theme: 'hyg_theme',
    wishlist: 'hyg_wishlist',
    compare: 'hyg_compare',
    customer: 'hyg_customer',
    pendingOrder: 'hyg_pending_order',
    lastOrder: 'hyg_last_order'
  },
  cart: {
    ivaRate: 0.19,
    freeShippingMin: 500000
  },
  compare: {
    maxItems: 4
  },
  catalog: {
    perPage: 12
  },
  contact: {
    whatsapp: '573245894268',
    whatsappMessage: 'Hola, necesito información sobre sus productos'
  }
};

export const ROUTES = {
  home: 'index.html',
  products: 'products.html',
  productDetail: 'product-detail.html',
  cart: 'cart.html',
  checkout: 'checkout.html',
  success: 'success.html'
};
