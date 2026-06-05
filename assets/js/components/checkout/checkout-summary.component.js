import { CartService } from '../../services/cart.service.js';
import { CatalogService } from '../../services/catalog.service.js';

export function renderCheckoutSummary() {
  const { items, subtotal, iva, total } = CartService.getSummary();
  return `
    <div class="checkout-summary-card">
      <h5 class="mb-3"><i class="bi bi-bag-check me-2"></i>Tu pedido</h5>
      <div class="checkout-items mb-3">${items.map(item => `
        <div class="checkout-item d-flex gap-2 mb-2">
          <img src="${CartService.getProductImage(item.productId)}" alt="" width="50" height="50" class="rounded" loading="lazy">
          <div class="flex-grow-1"><small class="d-block fw-medium">${item.name}</small><small class="text-muted">${item.quantity} x ${CatalogService.formatPrice(item.price)}</small></div>
          <small class="fw-medium">${CatalogService.formatPrice(item.price * item.quantity)}</small>
        </div>`).join('')}</div>
      <hr>
      <div class="d-flex justify-content-between mb-1"><span>Subtotal</span><span>${CatalogService.formatPrice(subtotal)}</span></div>
      <div class="d-flex justify-content-between mb-1"><span>IVA (19%)</span><span>${CatalogService.formatPrice(iva)}</span></div>
      <div class="d-flex justify-content-between mb-3"><span>Envío</span><span class="text-success">Gratis</span></div>
      <hr>
      <div class="d-flex justify-content-between"><strong>Total</strong><strong class="text-primary fs-5">${CatalogService.formatPrice(total)}</strong></div>
      <div class="payment-method-info mt-3 p-3 rounded">
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-bank2 fs-4 text-primary"></i>
          <div><small class="fw-medium d-block">Pago con PSE</small><small class="text-muted">Redirección a pasarela Openpay</small></div>
        </div>
      </div>
    </div>`;
}

export function mountCheckoutSummary() {
  const el = document.getElementById('checkout-summary');
  if (el) el.innerHTML = renderCheckoutSummary();
}
