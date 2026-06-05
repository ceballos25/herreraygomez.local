import { mountAppShell } from '../components/shell/app-shell.component.js';
import { initLoadingScreen } from '../ui/loading.ui.js';
import { initTheme } from '../ui/theme.ui.js';
import { initNavbar, initBackToTop, initWhatsApp, initNewsletter } from '../ui/navbar.ui.js';
import { initToastContainer } from '../ui/toast.ui.js';
import { initLazyLoading } from '../utils/dom.js';
import { initCartListeners, updateCartUI } from '../components/cart-view.component.js';
import { WishlistService } from '../services/wishlist.service.js';
import { CompareService } from '../services/compare.service.js';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products.page.js';
import { ProductDetailPage } from '../pages/product-detail.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';
import { SuccessPage } from '../pages/success.page.js';
import { PrivacyPage } from '../pages/privacy.page.js';
import { TermsPage } from '../pages/terms.page.js';

const PAGE_REGISTRY = {
  home: HomePage,
  products: ProductsPage,
  'product-detail': ProductDetailPage,
  cart: CartPage,
  checkout: CheckoutPage,
  success: SuccessPage,
  privacy: PrivacyPage,
  terms: TermsPage
};

export function initApp() {
  mountAppShell();
  initLoadingScreen();
  initTheme();
  initToastContainer();
  initNavbar();
  initBackToTop();
  initWhatsApp();
  initNewsletter();
  initCartListeners();
  initLazyLoading();
  updateCartUI();
  WishlistService.updateBadge();
  CompareService.updateBadge();

  const pageKey = document.body.dataset.page;
  const page = PAGE_REGISTRY[pageKey];
  if (page?.init) page.init();
}
