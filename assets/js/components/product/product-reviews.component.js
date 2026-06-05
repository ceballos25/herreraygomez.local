import { CatalogService } from '../../services/catalog.service.js';

export function renderProductReviews(reviews) {
  return reviews.map(r => `
    <div class="review-item">
      <div class="d-flex justify-content-between"><strong>${r.author}</strong><small class="text-muted">${r.date}</small></div>
      <div class="mb-1">${CatalogService.renderStars(r.rating)}</div>
      <p class="mb-0">${r.comment}</p>
    </div>`).join('');
}
