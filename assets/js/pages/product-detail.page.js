import { ROUTES } from '../config/constants.js';
import { CatalogService } from '../services/catalog.service.js';
import { CartService } from '../services/cart.service.js';
import { WishlistService } from '../services/wishlist.service.js';
import { mountProductDetailPage } from '../components/product/product-detail-page.component.js';
import { renderProductGallery, bindProductGallery } from '../components/product/product-gallery.component.js';
import { renderProductInfo } from '../components/product/product-info.component.js';
import { renderProductSpecs } from '../components/product/product-specs.component.js';
import { renderProductReviews } from '../components/product/product-reviews.component.js';
import { renderProductGrid } from '../components/product-card.component.js';

export const ProductDetailPage = {
  init() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) { window.location.href = ROUTES.products; return; }

    const product = CatalogService.getById(id);
    if (!product) { window.location.href = ROUTES.products; return; }

    mountProductDetailPage();
    this.render(product);
    bindProductGallery();
    this.bindAddToCart(product);
  },

  render(product) {
    document.title = `${product.name} | Herrera y Gomez`;
    document.getElementById('product-detail').innerHTML = renderProductGallery(product) + renderProductInfo(product);

    const specsContainer = document.getElementById('product-specs');
    if (specsContainer) specsContainer.innerHTML = renderProductSpecs(product.specs);

    const reviewsContainer = document.getElementById('product-reviews');
    if (reviewsContainer) reviewsContainer.innerHTML = renderProductReviews(CatalogService.getReviews());

    renderProductGrid(CatalogService.getRelated(product.id), 'related-products');
  },

  bindAddToCart(product) {
    const qtyInput = document.getElementById('product-qty');
    if (!qtyInput) return;

    document.getElementById('qty-decrease')?.addEventListener('click', () => {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
    });
    document.getElementById('qty-increase')?.addEventListener('click', () => {
      qtyInput.value = Math.min(product.stock, parseInt(qtyInput.value, 10) + 1);
    });
    document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
      CartService.add(product.id, parseInt(qtyInput.value, 10));
    });
    document.querySelector('.wishlist-detail-btn')?.addEventListener('click', function () {
      const active = WishlistService.toggle(product.id);
      this.querySelector('i').className = `bi bi-heart${active ? '-fill' : ''}`;
    });
  }
};
