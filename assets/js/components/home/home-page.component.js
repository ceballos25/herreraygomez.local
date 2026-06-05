import { mountPage } from '../../utils/mount.js';
import { HOME_CONTENT } from '../../data/content/home.content.js';
import { renderHero } from './hero.component.js';
import { renderBannerCarousel } from './banner-carousel.component.js';
import { renderCategoriesSection } from './categories-section.component.js';
import { renderProductsSection } from './products-section.component.js';
import { renderSegments } from './segments.component.js';
import { renderBenefits } from './benefits.component.js';
import { renderTestimonialsSection } from './testimonials-section.component.js';
import { renderNewsletter } from './newsletter.component.js';

export function mountHomePage() {
  const s = HOME_CONTENT.sections;
  return mountPage([
    renderHero(),
    renderBannerCarousel(),
    renderCategoriesSection(),
    renderProductsSection({ ...s.featured, id: 'featured-title', bg: true }),
    renderSegments(),
    renderProductsSection({ ...s.new, id: 'new-title', bg: true }),
    renderProductsSection({ ...s.sale, id: 'sale-title', centered: true, icon: s.sale.icon }),
    renderBenefits(),
    renderTestimonialsSection(),
    renderNewsletter()
  ]);
}
