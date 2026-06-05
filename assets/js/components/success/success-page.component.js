import { mountPage } from '../../utils/mount.js';

export function mountThankYouPage() {
  return mountPage([`
    <section class="success-section" aria-labelledby="thankyou-title">
      <div class="container">
        <div id="success-content">
          <div class="text-center thankyou-loading">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Confirmando pago...</span>
            </div>
            <p class="mt-3 text-muted">Confirmando tu pago con Openpay...</p>
          </div>
        </div>
      </div>
    </section>`]);
}
