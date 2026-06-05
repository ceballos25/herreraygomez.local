import { mountPage } from '../../utils/mount.js';
import { ROUTES } from '../../config/constants.js';
import { renderBreadcrumb } from '../shared/breadcrumb.component.js';
import { renderCheckoutForm } from './checkout-form.component.js';
import { mountCheckoutLoader } from './checkout-loader.component.js';

export function mountCheckoutPage() {
  mountPage([`
    <section class="checkout-section section-padding">
      <div class="container">
        ${renderBreadcrumb([{ label: 'Carrito', href: ROUTES.cart }, { label: 'Checkout' }])}
        <h1 class="section-title mb-4"><i class="bi bi-credit-card me-2"></i>Finalizar compra</h1>
        <div class="row g-4">
          <div class="col-lg-7">${renderCheckoutForm()}</div>
          <div class="col-lg-5"><div id="checkout-summary"></div></div>
        </div>
      </div>
    </section>`]);
  mountCheckoutLoader();
}
