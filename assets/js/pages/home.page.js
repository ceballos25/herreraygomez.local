import { CatalogService } from '../services/catalog.service.js';
import { HERO_IMAGE } from '../utils/images.js';
import { mountHomePage } from '../components/home/home-page.component.js';
import { renderCategoryCard } from '../components/category-card.component.js';
import { renderProductGrid } from '../components/product-card.component.js';
import { renderSkeletonCards } from '../components/skeleton.component.js';
import { renderTestimonialsList } from '../components/home/testimonials-list.component.js';

export const HomePage = {
  init() {
    mountHomePage();
    this.setHeroImage();
    this.loadCategories();
    this.loadFeaturedProducts();
    this.loadNewProducts();
    this.loadSaleProducts();
    renderTestimonialsList();
  },

  setHeroImage() {
    const heroImg = document.querySelector('.hero-visual img');
    if (heroImg) heroImg.src = HERO_IMAGE;
  },

  loadCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;
    container.innerHTML = CatalogService.getCategories().map(renderCategoryCard).join('');
  },

  loadFeaturedProducts() {
    if (!document.getElementById('featured-products')) return;
    renderSkeletonCards('featured-products', 4);
    setTimeout(() => renderProductGrid(CatalogService.getFeatured().slice(0, 8), 'featured-products'), 500);
  },

  loadNewProducts() {
    if (!document.getElementById('new-products')) return;
    renderSkeletonCards('new-products', 4);
    setTimeout(() => renderProductGrid(CatalogService.getNew().slice(0, 4), 'new-products'), 600);
  },

  loadSaleProducts() {
    if (!document.getElementById('sale-products')) return;
    renderSkeletonCards('sale-products', 4);
    setTimeout(() => renderProductGrid(CatalogService.getOnSale().slice(0, 4), 'sale-products'), 700);
  }
};
