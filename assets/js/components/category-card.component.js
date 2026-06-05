import { CatalogService } from '../services/catalog.service.js';

export function renderCategoryCard(category) {
  const count = CatalogService.getByCategory(category.id).length;
  return `
    <a href="products.html?category=${category.id}" class="category-card">
      <div class="category-icon"><i class="bi ${category.icon}"></i></div>
      <h5>${category.name}</h5>
      <span class="category-count">${count} productos</span>
    </a>`;
}
