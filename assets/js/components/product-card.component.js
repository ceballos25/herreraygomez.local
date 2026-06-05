import { CatalogService } from '../services/catalog.service.js';
import { CartService } from '../services/cart.service.js';
import { WishlistService } from '../services/wishlist.service.js';
import { CompareService } from '../services/compare.service.js';
import { showQuickView } from './quick-view.component.js';

export function renderProductCard(product, options = {}) {
  const { showActions = true, layout = 'grid' } = options;
  const discount = CatalogService.getDiscountPercent(product);
  const inWishlist = WishlistService.has(product.id);
  const inCompare = CompareService.has(product.id);
  const outOfStock = product.stock <= 0;

  return `
    <article class="product-card ${layout} ${outOfStock ? 'out-of-stock' : ''}" data-product-id="${product.id}">
      <div class="product-card-image">
        ${discount > 0 ? `<span class="badge-discount">-${discount}%</span>` : ''}
        ${product.isNew ? '<span class="badge-new">Nuevo</span>' : ''}
        ${outOfStock ? '<span class="badge-soldout">Agotado</span>' : ''}
        <a href="product-detail.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="300">
        </a>
        ${showActions ? `
          <div class="product-card-actions">
            <button class="btn-action wishlist-btn ${inWishlist ? 'active' : ''}" data-id="${product.id}" aria-label="Favoritos"><i class="bi bi-heart${inWishlist ? '-fill' : ''}"></i></button>
            <button class="btn-action compare-btn ${inCompare ? 'active' : ''}" data-id="${product.id}" aria-label="Comparar"><i class="bi bi-arrow-left-right"></i></button>
            <button class="btn-action quick-view-btn" data-id="${product.id}" aria-label="Vista rápida"><i class="bi bi-eye"></i></button>
            ${!outOfStock ? `<button class="btn-action add-cart-btn" data-id="${product.id}" aria-label="Agregar al carrito"><i class="bi bi-cart-plus"></i></button>` : ''}
          </div>` : ''}
      </div>
      <div class="product-card-body">
        <span class="product-category">${CatalogService.getCategoryName(product.category)}</span>
        <h3 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-rating">${CatalogService.renderStars(product.rating)} <small class="text-muted">(${product.reviews})</small></div>
        <div class="product-price">
          <span class="price-current">${CatalogService.formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${CatalogService.formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        ${!outOfStock
          ? `<small class="text-success"><i class="bi bi-check-circle"></i> En stock (${product.stock})</small>`
          : '<small class="text-danger"><i class="bi bi-x-circle"></i> Agotado</small>'}
      </div>
    </article>`;
}

export function renderProductGrid(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!products.length) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-search display-1 text-muted"></i>
        <h4 class="mt-3">No se encontraron productos</h4>
        <p class="text-muted">Intenta con otros filtros o términos de búsqueda.</p>
      </div>`;
    return;
  }

  container.innerHTML = products.map(p => renderProductCard(p)).join('');
  bindProductCardEvents(container);
}

export function bindProductCardEvents(container) {
  container.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const active = WishlistService.toggle(parseInt(btn.dataset.id, 10));
      btn.classList.toggle('active', active);
      btn.querySelector('i').className = `bi bi-heart${active ? '-fill' : ''}`;
    });
  });

  container.querySelectorAll('.compare-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active', CompareService.toggle(parseInt(btn.dataset.id, 10)));
    });
  });

  container.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      CartService.add(parseInt(btn.dataset.id, 10));
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 600);
    });
  });

  container.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showQuickView(parseInt(btn.dataset.id, 10));
    });
  });
}
