import { CartService, CART_UPDATED } from '../services/cart.service.js';
import { CatalogService } from '../services/catalog.service.js';

export function updateCartUI() {
  updateBadge();
  renderMiniCart();
}

export function initCartListeners() {
  window.addEventListener(CART_UPDATED, updateCartUI);
}

export function updateBadge() {
  const count = CartService.getCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('d-none', count === 0);
  });
}

export function renderMiniCart() {
  const dropdown = document.getElementById('mini-cart-items');
  const totalEl = document.getElementById('mini-cart-total');
  if (!dropdown) return;

  const items = CartService.getItems();
  if (!items.length) {
    dropdown.innerHTML = '<p class="text-muted text-center py-3 mb-0">Carrito vacío</p>';
    if (totalEl) totalEl.textContent = CatalogService.formatPrice(0);
    return;
  }

  dropdown.innerHTML = items.slice(0, 4).map(item => `
    <div class="mini-cart-item d-flex align-items-center gap-2 py-2">
      <img src="${CartService.getProductImage(item.productId)}" alt="" width="40" height="40" class="rounded" loading="lazy">
      <div class="flex-grow-1">
        <small class="d-block text-truncate" style="max-width:150px">${item.name}</small>
        <small class="text-muted">${item.quantity} x ${CatalogService.formatPrice(item.price)}</small>
      </div>
    </div>`).join('') + (items.length > 4 ? `<p class="text-muted small text-center mb-0">+${items.length - 4} más</p>` : '');

  if (totalEl) totalEl.textContent = CatalogService.formatPrice(CartService.getTotal());
}

export function renderCartItems(containerId, { editable = true, showImage = true } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = CartService.getItems();

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-cart text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted"></i>
        <h4 class="mt-3">Tu carrito está vacío</h4>
        <p class="text-muted">Explora nuestro catálogo y encuentra la tecnología perfecta.</p>
        <a href="products.html" class="btn btn-primary mt-2">Ver productos</a>
      </div>`;
    return;
  }

  container.innerHTML = items.map(item => {
    const image = CartService.getProductImage(item.productId);
    const lineTotal = item.price * item.quantity;
    return `
      <div class="cart-item" data-product-id="${item.productId}">
        ${showImage ? `<div class="cart-item-image"><img src="${image}" alt="${item.name}" loading="lazy" width="80" height="80"></div>` : ''}
        <div class="cart-item-info flex-grow-1">
          <h6 class="cart-item-name mb-1"><a href="product-detail.html?id=${item.productId}">${item.name}</a></h6>
          <span class="cart-item-price">${CatalogService.formatPrice(item.price)}</span>
        </div>
        ${editable ? `
          <div class="cart-item-qty">
            <button class="btn btn-sm btn-outline-secondary qty-btn" data-action="decrease"><i class="bi bi-dash"></i></button>
            <input type="number" class="form-control form-control-sm qty-input" value="${item.quantity}" min="1" max="${item.maxStock}">
            <button class="btn btn-sm btn-outline-secondary qty-btn" data-action="increase"><i class="bi bi-plus"></i></button>
          </div>
          <button class="btn btn-sm btn-link text-danger cart-remove-btn"><i class="bi bi-trash"></i></button>` : `<span class="cart-item-qty-readonly">x${item.quantity}</span>`}
        <div class="cart-item-total fw-bold">${CatalogService.formatPrice(lineTotal)}</div>
      </div>`;
  }).join('');

  if (editable) bindCartPageEvents(container);
}

function bindCartPageEvents(container) {
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
      const productId = parseInt(item.dataset.productId, 10);
      const input = item.querySelector('.qty-input');
      let qty = parseInt(input.value, 10);
      qty = btn.dataset.action === 'increase' ? qty + 1 : Math.max(1, qty - 1);
      CartService.updateQuantity(productId, qty);
      renderCartItems(container.id);
      renderCartSummary('cart-summary');
    });
  });

  container.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => {
      CartService.updateQuantity(parseInt(input.closest('.cart-item').dataset.productId, 10), input.value);
      renderCartItems(container.id);
      renderCartSummary('cart-summary');
    });
  });

  container.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      CartService.remove(parseInt(btn.closest('.cart-item').dataset.productId, 10));
      renderCartItems(container.id);
      renderCartSummary('cart-summary');
    });
  });
}

export function renderCartSummary(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { subtotal, iva, total, count } = CartService.getSummary();
  container.innerHTML = `
    <div class="cart-summary-card">
      <h5 class="mb-3">Resumen de compra</h5>
      <div class="d-flex justify-content-between mb-2"><span>Productos (${count})</span><span>${CatalogService.formatPrice(subtotal)}</span></div>
      <div class="d-flex justify-content-between mb-2"><span>IVA (19%)</span><span>${CatalogService.formatPrice(iva)}</span></div>
      <hr>
      <div class="d-flex justify-content-between mb-3"><strong>Total</strong><strong class="text-primary fs-5">${CatalogService.formatPrice(total)}</strong></div>
      <a href="checkout.html" class="btn btn-primary w-100 ${CartService.isEmpty() ? 'disabled' : ''}">Proceder al pago <i class="bi bi-arrow-right"></i></a>
    </div>`;
}
