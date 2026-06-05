import { ROUTES } from '../../config/constants.js';
import { CatalogService } from '../../services/catalog.service.js';
import { WishlistService } from '../../services/wishlist.service.js';

export function renderProductInfo(product) {
  const discount = CatalogService.getDiscountPercent(product);
  const inWishlist = WishlistService.has(product.id);

  return `
    <div class="col-lg-6">
      <nav aria-label="breadcrumb"><ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="${ROUTES.home}">Inicio</a></li>
        <li class="breadcrumb-item"><a href="${ROUTES.products}?category=${product.category}">${CatalogService.getCategoryName(product.category)}</a></li>
        <li class="breadcrumb-item active">${product.name}</li>
      </ol></nav>
      <span class="product-category">${CatalogService.getCategoryName(product.category)}</span>
      <h1 class="product-detail-title">${product.name}</h1>
      <div class="product-rating mb-3">${CatalogService.renderStars(product.rating)} <span>${product.rating}</span> <a href="#reviews" class="ms-2">${product.reviews} opiniones</a></div>
      <div class="product-price mb-3">
        <span class="price-current fs-2">${CatalogService.formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old fs-5">${CatalogService.formatPrice(product.oldPrice)}</span>` : ''}
        ${discount > 0 ? `<span class="badge bg-danger ms-2">Ahorras ${discount}%</span>` : ''}
      </div>
      <p class="product-description">${product.description}</p>
      <div class="stock-info mb-3">${product.stock > 0
        ? `<span class="text-success"><i class="bi bi-check-circle-fill"></i> En stock — ${product.stock} unidades</span>`
        : '<span class="text-danger"><i class="bi bi-x-circle-fill"></i> Producto agotado</span>'}</div>
      ${product.stock > 0 ? `
        <div class="add-to-cart-section d-flex gap-3 mb-4">
          <div class="quantity-selector">
            <button class="btn btn-outline-secondary" id="qty-decrease"><i class="bi bi-dash"></i></button>
            <input type="number" id="product-qty" value="1" min="1" max="${product.stock}" class="form-control">
            <button class="btn btn-outline-secondary" id="qty-increase"><i class="bi bi-plus"></i></button>
          </div>
          <button class="btn btn-primary btn-lg flex-grow-1" id="add-to-cart-btn"><i class="bi bi-cart-plus me-2"></i>Agregar al carrito</button>
          <button class="btn btn-outline-secondary btn-lg wishlist-detail-btn" data-id="${product.id}">
            <i class="bi bi-heart${inWishlist ? '-fill' : ''}"></i>
          </button>
        </div>` : ''}
      <div class="product-benefits">
        <div class="benefit-item"><i class="bi bi-truck"></i> Envío gratis en compras +$500.000</div>
        <div class="benefit-item"><i class="bi bi-shield-check"></i> Garantía oficial del fabricante</div>
        <div class="benefit-item"><i class="bi bi-arrow-repeat"></i> Devolución en 30 días</div>
      </div>
    </div>`;
}
