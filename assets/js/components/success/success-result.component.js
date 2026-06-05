import { ROUTES, APP_CONFIG } from '../../config/constants.js';
import { CatalogService } from '../../services/catalog.service.js';

function renderOrderItems(items = []) {
  if (!items.length) return '';
  const rows = items.map(item => `
    <li class="thankyou-item d-flex justify-content-between gap-2 py-2 border-bottom">
      <span>${item.name} <small class="text-muted">×${item.quantity}</small></span>
      <span class="fw-medium">${CatalogService.formatPrice((item.price || 0) * item.quantity)}</span>
    </li>`).join('');
  return `<ul class="list-unstyled thankyou-items mb-0">${rows}</ul>`;
}

function renderShipping(customer) {
  if (!customer?.address) return '';
  return `
    <div class="thankyou-shipping mt-3 pt-3 border-top">
      <h6 class="mb-2"><i class="bi bi-truck me-1"></i> Envío a</h6>
      <p class="mb-0 small text-muted">
        ${customer.address}<br>
        ${customer.city || ''}${customer.state ? `, ${customer.state}` : ''}
        ${customer.postalCode ? ` — ${customer.postalCode}` : ''}
      </p>
    </div>`;
}

export function renderOrderSummary({ orderId, chargeId, order, pending = false }) {
  const customer = order.customer || {};
  const email = customer.email || '';

  return `
    <div class="thankyou-page text-center">
      <div class="success-checkmark"><i class="bi bi-check-circle-fill"></i></div>
      <h2 class="mt-4 mb-2">¡Gracias por tu compra!</h2>
      <p class="text-muted lead">${pending
        ? 'Recibimos tu pago PSE. El banco puede tardar unos minutos en confirmarlo por completo.'
        : `Tu pago fue procesado correctamente${email ? ` — confirmación enviada a <strong>${email}</strong>` : ''}.`}</p>

      <div class="order-details-card mt-4">
        <h5 class="mb-3"><i class="bi bi-receipt me-2"></i>Resumen del pedido</h5>
        <p class="mb-1"><strong>Orden:</strong> <code>${orderId}</code></p>
        <p class="mb-1"><strong>Referencia Openpay:</strong> <code>${chargeId || '—'}</code></p>
        ${order.amount ? `<p class="mb-3"><strong>Total pagado:</strong> <span class="text-primary fs-5">${CatalogService.formatPrice(order.amount)}</span></p>` : ''}
        ${renderOrderItems(order.items)}
        ${renderShipping(customer)}
      </div>

      <div class="thankyou-next-steps mt-4 p-4 rounded text-start">
        <h6 class="mb-3">¿Qué sigue?</h6>
        <ul class="thankyou-steps list-unstyled mb-0">
          <li><i class="bi bi-envelope-check text-primary me-2"></i> Recibirás un correo con los detalles del pedido</li>
          <li><i class="bi bi-box-seam text-primary me-2"></i> Preparamos tu envío en 24–48 horas hábiles</li>
          <li><i class="bi bi-whatsapp text-primary me-2"></i> ¿Dudas? Escríbenos por WhatsApp</li>
        </ul>
      </div>

      <div class="d-flex flex-wrap gap-2 justify-content-center mt-4">
        <a href="${ROUTES.products}" class="btn btn-primary btn-lg">Seguir comprando</a>
        <a href="${ROUTES.home}" class="btn btn-outline-primary btn-lg">Ir al inicio</a>
      </div>
    </div>`;
}

export function renderThankYouPage(props) {
  return renderOrderSummary(props);
}

export function renderPendingPayment(message) {
  return `
    <div class="text-center thankyou-page">
      <i class="bi bi-hourglass-split text-warning display-1"></i>
      <h2 class="mt-3">Pago en proceso</h2>
      <p class="text-muted">${message || 'Tu pago está siendo confirmado por el banco.'}</p>
      <a href="${ROUTES.checkout}" class="btn btn-primary me-2">Reintentar pago</a>
      <a href="https://wa.me/${APP_CONFIG.contact.whatsapp}" class="btn btn-outline-success" target="_blank" rel="noopener">
        <i class="bi bi-whatsapp me-1"></i> Contactar soporte
      </a>
    </div>`;
}

export function renderFailedPayment(message) {
  return `
    <div class="text-center thankyou-page">
      <i class="bi bi-x-circle-fill text-danger display-1"></i>
      <h2 class="mt-3">Pago no completado</h2>
      <p class="text-muted">${message || 'El pago no fue exitoso. Puedes intentar de nuevo.'}</p>
      <a href="${ROUTES.checkout}" class="btn btn-primary">Volver al checkout</a>
    </div>`;
}

export function renderThankYouError(title) {
  return `
    <div class="text-center thankyou-page">
      <i class="bi bi-question-circle text-muted display-1"></i>
      <h2 class="mt-3">${title}</h2>
      <p class="text-muted">Si realizaste el pago, guarda tu comprobante y contáctanos.</p>
      <a href="${ROUTES.home}" class="btn btn-primary">Volver al inicio</a>
    </div>`;
}
