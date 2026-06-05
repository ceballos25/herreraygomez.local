import { CatalogService } from '../../services/catalog.service.js';
import { TESTIMONIALS } from '../../data/testimonials.js';

export function renderTestimonialsList(containerId = 'testimonials-slider') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-rating">${CatalogService.renderStars(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.name.charAt(0)}</div>
        <div><strong>${t.name}</strong><small class="d-block text-muted">${t.role}</small></div>
      </div>
    </div>`).join('');
}
