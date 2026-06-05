import { mountPage } from '../../utils/mount.js';

export function mountCatalogPage() {
  return mountPage([`
    <header class="catalog-header">
      <div class="container">
        <h1 class="section-title">Catálogo de productos</h1>
        <p class="section-subtitle mb-0">Encuentra la tecnología perfecta para ti</p>
      </div>
    </header>
    <section class="section-padding pt-4">
      <div class="container">
        <div class="segment-tabs">
          <button class="segment-tab active" data-segment="all">Todos</button>
          <button class="segment-tab" data-segment="gamer"><i class="bi bi-controller me-1"></i> Gamer</button>
          <button class="segment-tab" data-segment="office"><i class="bi bi-briefcase me-1"></i> Oficina</button>
        </div>
        <div class="catalog-toolbar">
          <div class="catalog-search-box">
            <i class="bi bi-search"></i>
            <input type="search" id="catalog-search" placeholder="Buscar en tiempo real..." aria-label="Buscar productos">
          </div>
          <div class="d-flex align-items-center gap-3">
            <span id="results-count" class="text-muted small"></span>
            <select id="sort-select" class="form-select form-select-sm" style="width:auto;" aria-label="Ordenar productos">
              <option value="featured">Destacados</option>
              <option value="newest">Más nuevos</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor calificados</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>
        <div class="filter-buttons" id="category-filters" role="group" aria-label="Filtrar por categoría"></div>
        <div class="products-grid" id="products-grid"></div>
        <div id="pagination" class="mt-4"></div>
      </div>
    </section>`]);
}
