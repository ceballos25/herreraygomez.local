import { APP_CONFIG } from '../config/constants.js';
import { getJSON, setJSON, remove } from '../utils/storage.js';
import { CatalogService } from './catalog.service.js';
import { formatPrice } from '../utils/format.js';
import { showToast } from '../ui/toast.ui.js';

const { cart: cartKey } = APP_CONFIG.storage;
const { ivaRate } = APP_CONFIG.cart;

export const CART_UPDATED = 'cartUpdated';

function dispatchUpdate(summary) {
  window.dispatchEvent(new CustomEvent(CART_UPDATED, { detail: summary }));
}

function syncWithCatalog(items) {
  items.forEach(item => {
    const product = CatalogService.getById(item.productId);
    if (product) {
      item.name = product.name;
      item.price = product.price;
      item.maxStock = product.stock;
    }
  });
  return items;
}

export const CartService = {
  getItems() {
    const items = getJSON(cartKey) || [];
    return syncWithCatalog(items);
  },

  saveItems(items) {
    setJSON(cartKey, items);
    dispatchUpdate(this.getSummary());
  },

  add(productId, quantity = 1) {
    const product = CatalogService.getById(productId);
    if (!product) { showToast('Producto no encontrado', 'error'); return false; }
    if (product.stock <= 0) { showToast('Producto agotado', 'warning'); return false; }

    const items = this.getItems();
    const existing = items.find(i => i.productId === productId);

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) {
        showToast(`Solo hay ${product.stock} unidades disponibles`, 'warning');
        return false;
      }
      existing.quantity = newQty;
    } else {
      if (quantity > product.stock) {
        showToast(`Solo hay ${product.stock} unidades disponibles`, 'warning');
        return false;
      }
      items.push({ productId: product.id, name: product.name, price: product.price, quantity, maxStock: product.stock });
    }

    this.saveItems(items);
    showToast(`${product.name} agregado al carrito`, 'success');
    return true;
  },

  remove(productId) {
    this.saveItems(this.getItems().filter(i => i.productId !== productId));
    showToast('Producto eliminado del carrito', 'info');
  },

  updateQuantity(productId, quantity) {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) return;

    const items = this.getItems();
    const item = items.find(i => i.productId === productId);
    if (!item) return;

    const product = CatalogService.getById(productId);
    const maxStock = product?.stock ?? item.maxStock;

    item.quantity = qty > maxStock ? maxStock : qty;
    if (qty > maxStock) showToast(`Máximo ${maxStock} unidades disponibles`, 'warning');

    this.saveItems(items);
  },

  clear() {
    remove(cartKey);
    dispatchUpdate(this.getSummary());
  },

  getCount: () => CartService.getItems().reduce((s, i) => s + i.quantity, 0),
  getSubtotal: () => CartService.getItems().reduce((s, i) => s + i.price * i.quantity, 0),
  getIVA: () => Math.round(CartService.getSubtotal() * ivaRate),
  getTotal: () => CartService.getSubtotal() + CartService.getIVA(),
  isEmpty: () => CartService.getItems().length === 0,

  getSummary() {
    return {
      items: this.getItems(),
      count: this.getCount(),
      subtotal: this.getSubtotal(),
      iva: this.getIVA(),
      total: this.getTotal()
    };
  },

  getProductImage(productId) {
    const product = CatalogService.getById(productId);
    return product?.image ?? CatalogService.getCategoryImage('default');
  },

  formatPrice
};

export { CartService as Cart };
