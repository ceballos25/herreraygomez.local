import { CatalogService } from '../services/catalog.service.js';
import { CartService } from '../services/cart.service.js';

export function showQuickView(productId) {
  const product = CatalogService.getById(productId);
  if (!product) return;

  let modal = document.getElementById('quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'modal fade';
    modal.innerHTML = '<div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content" id="quickViewContent"></div></div>';
    document.body.appendChild(modal);
  }

  const discount = CatalogService.getDiscountPercent(product);
  document.getElementById('quickViewContent').innerHTML = `
    <div class="modal-header border-0">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
    </div>
    <div class="modal-body pt-0">
      <div class="row g-4">
        <div class="col-md-6"><img src="${product.image}" alt="${product.name}" class="img-fluid rounded"></div>
        <div class="col-md-6">
          <span class="product-category">${CatalogService.getCategoryName(product.category)}</span>
          <h4>${product.name}</h4>
          <div class="product-rating mb-2">${CatalogService.renderStars(product.rating)} <small>(${product.reviews} opiniones)</small></div>
          <div class="product-price mb-3">
            <span class="price-current fs-4">${CatalogService.formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="price-old">${CatalogService.formatPrice(product.oldPrice)}</span>` : ''}
            ${discount > 0 ? `<span class="badge bg-danger ms-2">-${discount}%</span>` : ''}
          </div>
          <p class="text-muted">${product.description}</p>
          <div class="d-flex gap-2 mt-3">
            ${product.stock > 0
              ? `<button class="btn btn-primary flex-grow-1 quick-add-cart" data-id="${product.id}"><i class="bi bi-cart-plus me-1"></i> Agregar al carrito</button>`
              : '<button class="btn btn-secondary flex-grow-1" disabled>Agotado</button>'}
            <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">Ver detalle</a>
          </div>
        </div>
      </div>
    </div>`;

  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
  modal.querySelector('.quick-add-cart')?.addEventListener('click', () => { CartService.add(product.id); bsModal.hide(); });
}
