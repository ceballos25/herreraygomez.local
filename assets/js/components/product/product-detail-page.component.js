import { mountPage } from '../../utils/mount.js';

export function mountProductDetailPage() {
  return mountPage([`
    <section class="product-detail-section section-padding">
      <div class="container">
        <div class="row g-5" id="product-detail"></div>
        <div class="mt-5">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#specs-tab" type="button">Especificaciones</button></li>
            <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#reviews-tab" type="button" id="reviews">Opiniones</button></li>
          </ul>
          <div class="tab-content pt-4">
            <div class="tab-pane fade show active" id="specs-tab"><div id="product-specs"></div></div>
            <div class="tab-pane fade" id="reviews-tab"><div id="product-reviews"></div></div>
          </div>
        </div>
        <div class="mt-5 pt-4">
          <h3 class="section-title">Productos relacionados</h3>
          <div class="products-grid" id="related-products"></div>
        </div>
      </div>
    </section>`]);
}
