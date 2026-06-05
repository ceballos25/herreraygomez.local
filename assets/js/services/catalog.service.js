import { CATEGORIES } from '../data/categories.js';
import { PRODUCTS } from '../data/products.js';
import { SAMPLE_REVIEWS } from '../data/reviews.js';
import { buildCategoryImages } from '../utils/images.js';
import { formatPrice, getDiscountPercent, renderStars } from '../utils/format.js';

const categoryImages = buildCategoryImages(CATEGORIES);

function normalizeProducts() {
  PRODUCTS.forEach(product => {
    if (!product.image) {
      product.image = categoryImages[product.category] || categoryImages.default;
    }
    if (!product.images?.length) {
      product.images = [product.image];
    }
  });
}

normalizeProducts();

export const CatalogService = {
  getAll: () => PRODUCTS,
  getCategories: () => CATEGORIES,

  getById(id) {
    return PRODUCTS.find(p => p.id === parseInt(id, 10));
  },

  getByCategory(category) {
    return PRODUCTS.filter(p => p.category === category);
  },

  getFeatured: () => PRODUCTS.filter(p => p.featured),
  getNew: () => PRODUCTS.filter(p => p.isNew),
  getOnSale: () => PRODUCTS.filter(p => p.onSale),

  getBySegment(segment) {
    return PRODUCTS.filter(p => p.segment === segment || p.segment === 'both');
  },

  getRelated(productId, limit = 4) {
    const product = this.getById(productId);
    if (!product) return [];
    return PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, limit);
  },

  getCategoryName(categoryId) {
    return CATEGORIES.find(c => c.id === categoryId)?.name ?? categoryId;
  },

  getCategoryImage(categoryId) {
    return categoryImages[categoryId] || categoryImages.default;
  },

  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      this.getCategoryName(p.category).toLowerCase().includes(q)
    );
  },

  filterAndSort({ category, sort, query, segment, page = 1, perPage = 12 }) {
    let results = query ? this.search(query) : [...PRODUCTS];

    if (category && category !== 'all') results = results.filter(p => p.category === category);
    if (segment && segment !== 'all') {
      results = results.filter(p => p.segment === segment || p.segment === 'both');
    }

    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      name: (a, b) => a.name.localeCompare(b.name),
      newest: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
      featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    };

    results.sort(sorters[sort] || sorters.featured);

    const total = results.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;

    return { items: results.slice(start, start + perPage), total, totalPages, page };
  },

  getReviews: () => SAMPLE_REVIEWS.map((r, i) => ({ ...r, id: i + 1 })),

  formatPrice,
  getDiscountPercent,
  renderStars
};

export { CatalogService as ProductCatalog };
