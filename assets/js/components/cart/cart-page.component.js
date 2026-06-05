import { mountPage } from '../../utils/mount.js';
import { ROUTES } from '../../config/constants.js';

export function mountCartPage() {
  return mountPage([`
    <section class="cart-section section-padding">
      <div class="container">
        <h1 class="section-title mb-4"><i class="bi bi-cart3 me-2"></i>Carrito de compras</h1>
        <div class="row g-4">
          <div class="col-lg-8">
            <div id="cart-items"></div>
            <a href="${ROUTES.products}" class="btn btn-outline-primary mt-3">
              <i class="bi bi-arrow-left me-1"></i> Seguir comprando
            </a>
          </div>
          <div class="col-lg-4"><div id="cart-summary"></div></div>
        </div>
      </div>
    </section>`]);
}
