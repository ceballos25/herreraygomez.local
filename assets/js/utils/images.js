const CATEGORY_COLORS = {
  laptops:     { bg1: '#0a1628', bg2: '#1a2744', accent: '#0066ff' },
  gpu:         { bg1: '#1a0a2e', bg2: '#2d1b4e', accent: '#8b5cf6' },
  monitors:    { bg1: '#0a1a1f', bg2: '#0f2d3d', accent: '#06b6d4' },
  keyboards:   { bg1: '#1a1508', bg2: '#2d2510', accent: '#f59e0b' },
  mouse:       { bg1: '#0a1f15', bg2: '#0f2d1f', accent: '#10b981' },
  processors:  { bg1: '#1f0a0a', bg2: '#2d1515', accent: '#ef4444' },
  storage:     { bg1: '#0f0a1f', bg2: '#1a1535', accent: '#6366f1' },
  headphones:  { bg1: '#1f0a18', bg2: '#2d1025', accent: '#ec4899' },
  chairs:      { bg1: '#1a1008', bg2: '#2d1a0f', accent: '#f97316' },
  accessories: { bg1: '#0a1a18', bg2: '#0f2d28', accent: '#14b8a6' },
  peripherals: { bg1: '#150a1f', bg2: '#251035', accent: '#a855f7' }
};

function svgToDataUri(svg) {
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${base64}`;
}

export function createCategoryImage(categoryId, label) {
  const c = CATEGORY_COLORS[categoryId] || { bg1: '#0f172a', bg2: '#1e293b', accent: '#6366f1' };
  const safeLabel = label.replace(/[<>&'"]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bg1}"/><stop offset="100%" stop-color="${c.bg2}"/>
    </linearGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <circle cx="300" cy="250" r="90" fill="none" stroke="${c.accent}" stroke-width="3" opacity="0.35"/>
    <rect x="210" y="210" width="180" height="110" rx="14" fill="none" stroke="${c.accent}" stroke-width="4" opacity="0.85"/>
    <circle cx="300" cy="265" r="18" fill="${c.accent}" opacity="0.55"/>
    <text x="300" y="390" text-anchor="middle" fill="#94a3b8" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="600">${safeLabel}</text>
    <text x="300" y="420" text-anchor="middle" fill="#64748b" font-family="Arial,Helvetica,sans-serif" font-size="13">Herrera y Gomez</text>
  </svg>`;
  return svgToDataUri(svg);
}

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1587825140708-dfaf60ae4b20?w=900&h=650&fit=crop&q=80';

export const HERO_IMAGE_SVG_FALLBACK = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="500" viewBox="0 0 700 500">
  <defs><linearGradient id="h" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#0a0e17"/><stop offset="50%" stop-color="#1a1f3a"/><stop offset="100%" stop-color="#0f172a"/>
  </linearGradient></defs>
  <rect width="700" height="500" fill="url(#h)" rx="16"/>
  <rect x="100" y="80" width="500" height="300" rx="12" fill="#151b2b" stroke="#0066ff" stroke-width="2"/>
  <rect x="130" y="110" width="440" height="220" rx="4" fill="#0a1628"/>
  <rect x="290" y="390" width="120" height="10" rx="3" fill="#334155"/>
  <text x="350" y="460" text-anchor="middle" fill="#64748b" font-family="Arial,sans-serif" font-size="13">Setup Premium — Herrera y Gomez</text>
</svg>`);

export function buildCategoryImages(categories) {
  const map = {};
  categories.forEach(cat => {
    map[cat.id] = createCategoryImage(cat.id, cat.name);
  });
  map.default = createCategoryImage('default', 'Tecnología');
  return map;
}
