# Herrera y Gomez — E-Commerce de Tecnología

Plataforma de comercio electrónico premium para venta de hardware, periféricos y tecnología. Desarrollada con HTML5, CSS3, Bootstrap 5 y JavaScript Vanilla.

# Demo: https://herreraygomezlocal-production.up.railway.app/

## Estructura del proyecto

```
/
├── index.html              # Home page
├── products.html           # Catálogo con filtros
├── product-detail.html     # Detalle de producto
├── cart.html               # Carrito de compras
├── checkout.html           # Checkout con PSE
├── success.html            # Confirmación de pago
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── main.js              # Punto de entrada (ES Modules)
│       ├── ARCHITECTURE.md      # Documentación de arquitectura
│       ├── config/              # Constantes, sitio y OpenPay
│       ├── core/                # Bootstrap de la app
│       ├── components/          # UI por dominio (shell, home, catalog, cart…)
│       │   ├── shell/           # Navbar, footer, loading
│       │   ├── home/            # Secciones del inicio
│       │   ├── catalog/         # Catálogo
│       │   ├── cart/            # Carrito
│       │   ├── checkout/        # Checkout PSE
│       │   ├── product/         # Detalle de producto
│       │   ├── success/         # Confirmación de pago
│       │   └── shared/          # Breadcrumb, paginación, headers
│       ├── data/                # Catálogo y contenido estático
│       ├── services/            # Lógica de negocio
│       ├── utils/               # Helpers (formato, imágenes, DOM)
│       ├── ui/                  # UI global (tema, navbar, toast)
│       └── pages/               # Orquestación por página
├── templates/
│   └── page.template.html       # Plantilla shell para nuevas páginas
│   ├── img/
│   └── icons/
├── api/openpay/                 # Backend PHP OpenPay (ver api/README.md)
└── README.md
```

> Ver `assets/js/ARCHITECTURE.md` para la guía completa de módulos y convenciones.

### Mantenimiento centralizado

| Qué cambiar | Archivo |
|-------------|---------|
| Menú, footer, contacto | `assets/js/config/site.config.js` |
| Textos del home (hero, banners) | `assets/js/data/content/home.content.js` |
| Variante navbar/footer por página | `PAGE_LAYOUT` en `site.config.js` |
| Productos del catálogo | `assets/js/data/products.js` |
| Componente de una sección | `assets/js/components/[dominio]/` |
| Credenciales OpenPay (frontend) | `assets/js/config/openpay.config.js` |
| Credenciales OpenPay (backend) | `api/openpay/config.php` |

## Cómo ejecutar el proyecto

### Opción 1: Servidor local con Python (recomendado)

```bash
cd /ruta/al/proyecto
python3 -m http.server 8080
```

Abre en el navegador: **http://localhost:8080**

### Opción 2: Live Server (VS Code / Cursor)

Instala la extensión "Live Server" y abre `index.html` con "Open with Live Server".

### Opción 3: PHP built-in server

```bash
php -S localhost:8080
```

### Opción 4: XAMPP / Laragon / LocalWP

Coloca el proyecto en tu directorio web (`htdocs`, `www`, etc.) y accede vía tu dominio local.

> **Nota:** Usa siempre un servidor HTTP local. Abrir los HTML directamente con `file://` puede causar problemas con fetch, redirecciones y sessionStorage en algunos navegadores.

---

## Flujo de compra (demo)

1. Explora productos en **Inicio** o **Catálogo**
2. Agrega productos al carrito (persiste en LocalStorage)
3. Ve a **Carrito** → ajusta cantidades
4. **Checkout** → completa el formulario
5. Clic en **Pagar con PSE** → simulación sandbox (2 seg de loader)
6. Redirección a **success.html** con confirmación

---

## Configuración OpenPay

Integración **API REST pura** — sin SDK PHP, sin OpenPay.js, sin Composer, sin frameworks.

| Capa | Qué usa |
|------|---------|
| Frontend | `fetch()` → `api/openpay/charge.php` |
| Backend | `cURL` → `https://sandbox-api.openpay.co/v1/{MERCHANT_ID}/pse` |

### Credenciales (solo backend)

Copia `api/openpay/config.example.php` → `config.php`:

```php
return [
    'merchant_id' => 'TU_MERCHANT_ID',
    'private_key' => 'TU_LLAVE_PRIVADA',
    'environment' => 'sandbox', // 'production' en vivo
];
```

La llave privada **nunca** va en JavaScript.

### Frontend

`assets/js/config/openpay.config.js` solo define la URL del proxy:

```javascript
export const OPENPAY_CONFIG = {
  backendUrl: 'api/openpay/charge.php',
  demoMode: false  // true = simula pago sin llamar a OpenPay
};
```

### Obtener credenciales

1. [OpenPay Colombia](https://www.openpay.co/) → Dashboard → Credenciales
2. Copia **Merchant ID** y **Llave privada** en `config.php`

### Backend (`api/openpay/charge.php`)

Un solo archivo PHP con `curl` directo a `POST /v1/{merchant}/pse`. Sin SDK. Ver código en `api/openpay/charge.php`.

### Flujo

```
checkout  →  fetch(charge.php)  →  curl → OpenPay /pse  →  redirect_url
success   →  fetch(charge.php?verify)  →  curl → OpenPay /charges/{id}
```

### Migración del catálogo estático

1. Mueve el array `PRODUCTS` de `products.js` a tu base de datos
2. Reemplaza `ProductCatalog.getAll()` por `fetch('/api/products')`
3. Mantén la misma estructura JSON para compatibilidad con el frontend

### Webhooks OpenPay

Configura en el Dashboard la URL: `https://tudominio.com/api/webhooks/openpay`

OpenPay enviará notificaciones cuando el pago cambie de estado (`charge.succeeded`, `charge.failed`).

---

## Buenas prácticas de seguridad (frontend)

| Práctica | Implementación |
|----------|----------------|
| **Nunca exponer llave privada** | Solo en backend/server-side |
| **Validar en backend** | El frontend valida UX; el backend valida montos y datos |
| **HTTPS obligatorio** | En producción, todo el sitio debe usar SSL |
| **Sanitizar inputs** | Validación frontend + backend |
| **CSP Headers** | Configurar Content-Security-Policy en el servidor |
| **No confiar en LocalStorage** | Precios y stock deben validarse en backend al pagar |
| **CORS restrictivo** | Solo dominios autorizados en la API |
| **Rate limiting** | Limitar intentos de checkout en el backend |
| **Webhooks con verificación** | Validar firma/autenticidad de notificaciones OpenPay |
| **Variables de entorno** | Credenciales en `.env`, nunca en el código |

---

## Funcionalidades incluidas

- Hero moderno, carrusel de banners, categorías
- Catálogo con filtros, búsqueda en tiempo real, paginación
- Detalle de producto con galería, specs y opiniones
- Carrito con LocalStorage, mini carrito, IVA 19%
- Checkout con validaciones y loader
- OpenPay PSE (sandbox simulado + preparado para backend)
- Dark mode, toasts, skeleton loading, lazy loading
- Wishlist y comparador de productos
- WhatsApp flotante, botón volver arriba
- Loading screen, SEO meta tags, accesibilidad
- Diseño responsive mobile-first

## Tecnologías

- HTML5 semántico
- CSS3 (variables, animaciones, dark mode)
- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
- JavaScript ES6+ (módulos globales, async/await)
- Google Fonts (Inter)
- OpenPay API (integración preparada)

## Licencia

Este proyecto es de uso gratuito bajo atribución.

Se permite el uso, modificación y distribución y comercialización del software, siempre y cuando se otorgue el debido crédito a Cristian Ceballos como autor originale del proyecto.

© 2026 Cristian Ceballos. Todos los derechos reservados.
