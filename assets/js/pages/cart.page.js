import { mountCartPage } from '../components/cart/cart-page.component.js';
import { renderCartItems, renderCartSummary } from '../components/cart-view.component.js';

export const CartPage = {
  init() {
    mountCartPage();
    renderCartItems('cart-items', { editable: true });
    renderCartSummary('cart-summary');
  }
};
