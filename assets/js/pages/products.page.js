import { APP_CONFIG } from '../config/constants.js';
import { CatalogService } from '../services/catalog.service.js';
import { mountCatalogPage } from '../components/catalog/catalog-page.component.js';
import { renderProductGrid } from '../components/product-card.component.js';
import { renderSkeletonCards } from '../components/skeleton.component.js';
import { renderPagination, bindPagination } from '../components/shared/pagination.component.js';
import { debounce } from '../utils/dom.js';

export const ProductsPage = {
  currentPage: 1,
  perPage: APP_CONFIG.catalog.perPage,
  filters: { category: 'all', sort: 'featured', query: '', segment: 'all' },

  init() {
    mountCatalogPage();
    this.parseURLParams();
    this.renderFilters();
    this.activateSegmentTab();
    this.loadProducts();
    this.bindFilterEvents();
  },

  parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    this.filters = {
      category: params.get('category') || 'all',
      sort: params.get('sort') || 'featured',
      query: params.get('q') || '',
      segment: params.get('segment') || 'all'
    };
    this.currentPage = parseInt(params.get('page') || '1', 10);
    const searchInput = document.getElementById('catalog-search');
    if (searchInput && this.filters.query) searchInput.value = this.filters.query;
  },

  activateSegmentTab() {
    document.querySelectorAll('.segment-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.segment === this.filters.segment);
    });
  },

  renderFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;
    const cats = CatalogService.getCategories();
    container.innerHTML = `
      <button class="filter-btn ${this.filters.category === 'all' ? 'active' : ''}" data-category="all">Todos</button>
      ${cats.map(c => `
        <button class="filter-btn ${this.filters.category === c.id ? 'active' : ''}" data-category="${c.id}">
          <i class="bi ${c.icon}"></i> ${c.name}
        </button>`).join('')}`;
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = this.filters.sort;
  },

  loadProducts() {
    renderSkeletonCards('products-grid', this.perPage);
    setTimeout(() => {
      const result = CatalogService.filterAndSort({ ...this.filters, page: this.currentPage, perPage: this.perPage });
      renderProductGrid(result.items, 'products-grid');
      this.renderPagination(result);
      this.updateResultsCount(result.total);
    }, 400);
  },

  renderPagination(result) {
    const container = document.getElementById('pagination');
    if (!container) return;
    container.innerHTML = renderPagination({ page: result.page, totalPages: result.totalPages });
    bindPagination(container, result, (page) => {
      this.currentPage = page;
      this.updateURL();
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  updateResultsCount(total) {
    const el = document.getElementById('results-count');
    if (el) el.textContent = `${total} producto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
  },

  updateURL() {
    const params = new URLSearchParams();
    if (this.filters.category !== 'all') params.set('category', this.filters.category);
    if (this.filters.sort !== 'featured') params.set('sort', this.filters.sort);
    if (this.filters.query) params.set('q', this.filters.query);
    if (this.filters.segment !== 'all') params.set('segment', this.filters.segment);
    if (this.currentPage > 1) params.set('page', this.currentPage);
    const qs = params.toString();
    window.history.replaceState({}, '', qs ? `?${qs}` : 'products.html');
  },

  bindFilterEvents() {
    document.getElementById('category-filters')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      this.filters.category = btn.dataset.category;
      this.currentPage = 1;
      this.renderFilters();
      this.updateURL();
      this.loadProducts();
    });

    document.getElementById('sort-select')?.addEventListener('change', (e) => {
      this.filters.sort = e.target.value;
      this.currentPage = 1;
      this.updateURL();
      this.loadProducts();
    });

    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => {
        this.filters.query = searchInput.value.trim();
        this.currentPage = 1;
        this.updateURL();
        this.loadProducts();
      }));
    }

    document.querySelectorAll('.segment-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.filters.segment = btn.dataset.segment;
        this.currentPage = 1;
        document.querySelectorAll('.segment-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.updateURL();
        this.loadProducts();
      });
    });
  }
};
