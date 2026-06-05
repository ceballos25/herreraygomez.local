# Arquitectura — Herrera y Gomez

E-commerce 100% basado en **componentes** con ES Modules (sin bundler).

## Principio

Cada pieza de UI es un componente. Los HTML son shells vacíos; todo el markup se monta desde JavaScript.

```
HTML (shell)  →  app-shell  →  page component  →  section components  →  data/services
```

## Estructura de componentes

```
components/
├── shell/                    # Layout global
│   ├── app-shell.component.js
│   ├── navbar.component.js
│   ├── footer.component.js
│   ├── loading-screen.component.js
│   └── floating-buttons.component.js
├── shared/                   # Reutilizables
│   ├── section-header.component.js
│   ├── breadcrumb.component.js
│   └── pagination.component.js
├── home/                     # Página de inicio
│   ├── home-page.component.js      # Orquestador
│   ├── hero.component.js
│   ├── banner-carousel.component.js
│   ├── categories-section.component.js
│   ├── products-section.component.js
│   ├── segments.component.js
│   ├── benefits.component.js
│   ├── testimonials-section.component.js
│   ├── testimonials-list.component.js
│   └── newsletter.component.js
├── catalog/
│   └── catalog-page.component.js
├── cart/
│   └── cart-page.component.js
├── checkout/
│   ├── checkout-page.component.js
│   ├── checkout-form.component.js
│   ├── checkout-summary.component.js
│   └── checkout-loader.component.js
├── product/
│   ├── product-detail-page.component.js
│   ├── product-gallery.component.js
│   ├── product-info.component.js
│   ├── product-specs.component.js
│   └── product-reviews.component.js
├── success/
│   ├── success-page.component.js
│   └── success-result.component.js
├── product-card.component.js   # Tarjeta de producto (catálogo)
├── category-card.component.js
├── cart-view.component.js
├── quick-view.component.js
└── skeleton.component.js
```

## Capas

| Capa | Responsabilidad |
|------|-----------------|
| **config** | Constantes, rutas, layout por página (`site.config.js`) |
| **data/content** | Textos estáticos de componentes (`home.content.js`) |
| **components** | Render HTML + eventos locales |
| **pages** | Monta page component + lógica de negocio |
| **services** | Reglas de negocio, API, storage |
| **ui** | Comportamiento global (tema, toast, navbar events) |

## Flujo de inicio

1. HTML carga `main.js` con `<body data-page="..."><main></main>`
2. `mountAppShell()` — navbar, footer, loading, floats
3. `PAGE_REGISTRY[page].init()` — monta page component en `<main>`
4. Page component compone section components
5. Section components cargan datos vía services

## Agregar un componente

1. Crear `components/[dominio]/mi-componente.component.js`
2. Exportar `renderMiComponente()` o `mountMiComponente()`
3. Usarlo desde el page component o page module

## Agregar una página

1. Crear `components/[dominio]/mi-pagina.component.js` con `mountMiPagina()`
2. Crear `pages/mi-pagina.page.js` que llame al mount + lógica
3. Registrar en `PAGE_REGISTRY` y `PAGE_LAYOUT`
4. HTML shell con `data-page="mi-pagina"`

## Contenido editable

| Qué | Archivo |
|-----|---------|
| Nav, footer, contacto | `config/site.config.js` |
| Textos del home (hero, banners, beneficios) | `data/content/home.content.js` |
| Productos | `data/products.js` |
