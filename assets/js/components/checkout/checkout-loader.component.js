import { appendHTML } from '../../utils/mount.js';

export function mountCheckoutLoader() {
  appendHTML(document.body, `
    <div id="checkout-loader" class="d-none" aria-live="polite">
      <div class="checkout-loader-content">
        <div class="spinner-border text-primary mb-3" style="width:3rem;height:3rem;" role="status">
          <span class="visually-hidden">Procesando...</span>
        </div>
        <h5>Procesando tu pago</h5>
        <p class="text-muted mb-0">Conectando con Openpay PSE...</p>
        <p class="text-muted small">No cierres esta ventana</p>
      </div>
    </div>`);
}
