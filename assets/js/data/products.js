export const PRODUCTS = [
  {
    id: 1, name: 'ASUS ROG Strix G16', category: 'laptops', price: 5499000, oldPrice: 6299000,
    stock: 12, rating: 4.8, reviews: 156, featured: true, isNew: true, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588872929459-5586360c1a08?w=800&h=800&fit=crop'
    ],
    description: 'Laptop gaming de alto rendimiento con Intel Core i9-13980HX, NVIDIA RTX 4070 8GB, 16GB DDR5 y SSD 1TB NVMe.',
    specs: { 'Procesador': 'Intel Core i9-13980HX', 'GPU': 'NVIDIA RTX 4070 8GB', 'RAM': '16GB DDR5', 'Almacenamiento': '1TB NVMe SSD', 'Pantalla': '16" QHD 240Hz', 'Peso': '2.3 kg' }
  },
  {
    id: 2, name: 'MacBook Pro 14" M3 Pro', category: 'laptops', price: 8999000, oldPrice: null,
    stock: 8, rating: 4.9, reviews: 289, featured: true, isNew: true, onSale: false,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611186871341-b1ce696e52c9?w=800&h=800&fit=crop'
    ],
    description: 'Potencia profesional con chip Apple M3 Pro, 18GB RAM unificada y pantalla Liquid Retina XDR.',
    specs: { 'Procesador': 'Apple M3 Pro', 'RAM': '18GB Unificada', 'Almacenamiento': '512GB SSD', 'Pantalla': '14.2" Liquid Retina XDR', 'Batería': 'Hasta 18 horas', 'Peso': '1.55 kg' }
  },
  {
    id: 3, name: 'Lenovo ThinkPad X1 Carbon', category: 'laptops', price: 4899000, oldPrice: 5299000,
    stock: 15, rating: 4.7, reviews: 98, featured: false, isNew: false, onSale: true,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1588872929459-5586360c1a08?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1588872929459-5586360c1a08?w=800&h=800&fit=crop'],
    description: 'Ultrabook empresarial con Intel Core i7, 16GB RAM y construcción en fibra de carbono.',
    specs: { 'Procesador': 'Intel Core i7-1365U', 'RAM': '16GB LPDDR5', 'Almacenamiento': '512GB SSD', 'Pantalla': '14" WUXGA IPS', 'Peso': '1.12 kg', 'Seguridad': 'TPM 2.0 + Huella' }
  },
  {
    id: 4, name: 'NVIDIA GeForce RTX 4090', category: 'gpu', price: 7299000, oldPrice: 7999000,
    stock: 5, rating: 4.9, reviews: 412, featured: true, isNew: false, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop'],
    description: 'La tarjeta gráfica más potente del mercado. 24GB GDDR6X, arquitectura Ada Lovelace.',
    specs: { 'GPU': 'NVIDIA RTX 4090', 'VRAM': '24GB GDDR6X', 'CUDA Cores': '16384', 'Boost Clock': '2.52 GHz', 'TDP': '450W', 'Conectores': '3x DisplayPort, 1x HDMI' }
  },
  {
    id: 5, name: 'AMD Radeon RX 7900 XTX', category: 'gpu', price: 4299000, oldPrice: null,
    stock: 9, rating: 4.7, reviews: 234, featured: true, isNew: true, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9b9?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9b9?w=800&h=800&fit=crop'],
    description: 'GPU AMD de última generación con 24GB GDDR6 y soporte FSR 3.0.',
    specs: { 'GPU': 'AMD RX 7900 XTX', 'VRAM': '24GB GDDR6', 'Stream Processors': '6144', 'Boost Clock': '2.5 GHz', 'TDP': '355W', 'Ray Accelerators': '96' }
  },
  {
    id: 6, name: 'Samsung Odyssey G9 49"', category: 'monitors', price: 3899000, oldPrice: 4499000,
    stock: 6, rating: 4.8, reviews: 178, featured: true, isNew: false, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop'],
    description: 'Monitor curvo ultra ancho DQHD 5120x1440, 240Hz, 1ms, HDR1000.',
    specs: { 'Tamaño': '49"', 'Resolución': '5120x1440 DQHD', 'Refresh Rate': '240Hz', 'Panel': 'VA Curvo', 'HDR': 'HDR1000', 'Conectividad': 'DisplayPort 1.4, HDMI 2.1' }
  },
  {
    id: 7, name: 'LG UltraFine 27" 4K', category: 'monitors', price: 2199000, oldPrice: null,
    stock: 20, rating: 4.6, reviews: 87, featured: false, isNew: true, onSale: false,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop'],
    description: 'Monitor profesional 4K IPS con 99% sRGB, ideal para diseño y productividad.',
    specs: { 'Tamaño': '27"', 'Resolución': '3840x2160 4K', 'Panel': 'IPS', 'Color': '99% sRGB', 'Puertos': 'USB-C 96W, HDMI, DP', 'Ajuste': 'Altura, inclinación, rotación' }
  },
  {
    id: 8, name: 'Keychron Q1 Pro', category: 'keyboards', price: 899000, oldPrice: 999000,
    stock: 25, rating: 4.8, reviews: 312, featured: true, isNew: true, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop'],
    description: 'Teclado mecánico premium QMK/VIA, switches Gateron Pro, conexión inalámbrica y aluminio CNC.',
    specs: { 'Layout': '75%', 'Switches': 'Gateron Pro Brown', 'Conexión': 'Bluetooth 5.1 + USB-C', 'Material': 'Aluminio CNC', 'Keycaps': 'PBT Double-shot', 'Batería': '4000mAh' }
  },
  {
    id: 9, name: 'Logitech MX Keys', category: 'keyboards', price: 549000, oldPrice: null,
    stock: 30, rating: 4.7, reviews: 445, featured: false, isNew: false, onSale: false,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c271e33?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1511467687858-23d96c271e33?w=800&h=800&fit=crop'],
    description: 'Teclado inalámbrico premium para productividad con retroiluminación inteligente.',
    specs: { 'Layout': 'Full-size', 'Conexión': 'Bluetooth + USB Unifying', 'Retroiluminación': 'Smart backlight', 'Batería': 'Hasta 5 meses', 'Compatibilidad': 'Windows, Mac, Linux', 'Teclas': 'Scissor switches' }
  },
  {
    id: 10, name: 'Razer DeathAdder V3 Pro', category: 'mouse', price: 649000, oldPrice: 749000,
    stock: 18, rating: 4.9, reviews: 523, featured: true, isNew: false, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop'],
    description: 'Mouse gaming inalámbrico con sensor Focus Pro 30K, 90 horas de batería.',
    specs: { 'Sensor': 'Focus Pro 30K', 'DPI': '30,000', 'Polling Rate': '4000Hz HyperPolling', 'Peso': '63g', 'Batería': '90 horas', 'Conexión': 'HyperSpeed Wireless + USB-C' }
  },
  {
    id: 11, name: 'Logitech G Pro X Superlight 2', category: 'mouse', price: 599000, oldPrice: null,
    stock: 22, rating: 4.8, reviews: 389, featured: true, isNew: true, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7a39b7?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7a39b7?w=800&h=800&fit=crop'],
    description: 'El mouse esports más ligero del mercado. Solo 60g con sensor HERO 2.',
    specs: { 'Sensor': 'HERO 2', 'DPI': '32,000', 'Peso': '60g', 'Polling Rate': '2000Hz', 'Batería': '95 horas', 'Conexión': 'LIGHTSPEED Wireless' }
  },
  {
    id: 12, name: 'Intel Core i9-14900K', category: 'processors', price: 2199000, oldPrice: 2399000,
    stock: 14, rating: 4.7, reviews: 267, featured: true, isNew: true, onSale: true,
    segment: 'both',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880abab0?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1555617981-dac3880abab0?w=800&h=800&fit=crop'],
    description: 'Procesador flagship Intel 14va gen. 24 núcleos, 32 hilos, hasta 6.0 GHz.',
    specs: { 'Núcleos': '24 (8P + 16E)', 'Hilos': '32', 'Frecuencia Base': '3.2 GHz', 'Turbo Max': '6.0 GHz', 'Cache': '36MB Intel Smart Cache', 'TDP': '125W' }
  },
  {
    id: 13, name: 'AMD Ryzen 9 7950X3D', category: 'processors', price: 2499000, oldPrice: null,
    stock: 10, rating: 4.9, reviews: 198, featured: true, isNew: false, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1597872200963-2b34d56e5662?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1597872200963-2b34d56e5662?w=800&h=800&fit=crop'],
    description: 'El mejor procesador para gaming con tecnología 3D V-Cache de 128MB.',
    specs: { 'Núcleos': '16', 'Hilos': '32', 'Frecuencia Base': '4.2 GHz', 'Turbo Max': '5.7 GHz', 'Cache L3': '128MB 3D V-Cache', 'TDP': '120W' }
  },
  {
    id: 14, name: 'Samsung 990 Pro 2TB NVMe', category: 'storage', price: 899000, oldPrice: 1099000,
    stock: 35, rating: 4.8, reviews: 567, featured: true, isNew: false, onSale: true,
    segment: 'both',
    image: 'https://images.unsplash.com/photo-1597872200963-2b34d56e5662?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1597872200963-2b34d56e5662?w=800&h=800&fit=crop'],
    description: 'SSD PCIe 4.0 de máximo rendimiento. Lectura 7450 MB/s, escritura 6900 MB/s.',
    specs: { 'Capacidad': '2TB', 'Interfaz': 'PCIe 4.0 x4 NVMe', 'Lectura': '7450 MB/s', 'Escritura': '6900 MB/s', 'Form Factor': 'M.2 2280', 'TBW': '1200 TB' }
  },
  {
    id: 15, name: 'Corsair Vengeance DDR5 32GB', category: 'storage', price: 649000, oldPrice: null,
    stock: 40, rating: 4.6, reviews: 234, featured: false, isNew: true, onSale: false,
    segment: 'both',
    image: 'https://images.unsplash.com/photo-1562976540-050a8373190a?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1562976540-050a8373190a?w=800&h=800&fit=crop'],
    description: 'Kit RAM DDR5 32GB (2x16GB) 6000MHz CL30 con disipador de aluminio.',
    specs: { 'Capacidad': '32GB (2x16GB)', 'Tipo': 'DDR5', 'Velocidad': '6000MHz', 'Latencia': 'CL30', 'Voltaje': '1.35V', 'Compatibilidad': 'Intel XMP 3.0 / AMD EXPO' }
  },
  {
    id: 16, name: 'Sony WH-1000XM5', category: 'headphones', price: 1299000, oldPrice: 1499000,
    stock: 16, rating: 4.9, reviews: 892, featured: true, isNew: false, onSale: true,
    segment: 'both',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'],
    description: 'Audífonos over-ear con la mejor cancelación de ruido del mercado.',
    specs: { 'Driver': '30mm', 'ANC': 'Procesador V1 + QN1', 'Batería': '30 horas', 'Conexión': 'Bluetooth 5.2 + 3.5mm', 'Peso': '250g', 'Codecs': 'LDAC, AAC, SBC' }
  },
  {
    id: 17, name: 'SteelSeries Arctis Nova Pro', category: 'headphones', price: 1499000, oldPrice: null,
    stock: 11, rating: 4.8, reviews: 345, featured: true, isNew: true, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop'],
    description: 'Audífonos gaming premium con audio Hi-Res, ANC y base GameDAC Gen 2.',
    specs: { 'Driver': '40mm Planar Magnetic', 'Frecuencia': '10-40000 Hz', 'ANC': 'Activas 4 micrófonos', 'Conexión': 'Wireless 2.4GHz + BT', 'Batería': '22 horas', 'Peso': '338g' }
  },
  {
    id: 18, name: 'Secretlab Titan Evo 2024', category: 'chairs', price: 2899000, oldPrice: 3199000,
    stock: 7, rating: 4.8, reviews: 456, featured: true, isNew: true, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&h=800&fit=crop'],
    description: 'Silla gaming ergonómica premium con soporte lumbar magnético 4-way.',
    specs: { 'Material': 'Neo Hybrid Leatherette', 'Peso Máx': '180 kg', 'Altura': '160-190 cm', 'Reclinación': '85° - 165°', 'Brazos': '4D ajustables', 'Base': 'Aluminio reforzado' }
  },
  {
    id: 19, name: 'Herman Miller Aeron', category: 'chairs', price: 5499000, oldPrice: null,
    stock: 4, rating: 4.9, reviews: 678, featured: false, isNew: false, onSale: false,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1580480051773-0e6a8a6a6187?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1580480051773-0e6a8a6a6187?w=800&h=800&fit=crop'],
    description: 'La silla de oficina icónica. Ergonomía de clase mundial para jornadas largas.',
    specs: { 'Material': 'Pellicle Mesh', 'Peso Máx': '159 kg', 'Tallas': 'A, B, C', 'Ajustes': 'PostureFit SL', 'Garantía': '12 años', 'Origen': 'USA' }
  },
  {
    id: 20, name: 'Anker PowerExpand Hub USB-C', category: 'accessories', price: 249000, oldPrice: 299000,
    stock: 50, rating: 4.5, reviews: 1234, featured: false, isNew: false, onSale: true,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd2a1e?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1625948515291-69613efd2a1e?w=800&h=800&fit=crop'],
    description: 'Hub USB-C 7 en 1 con HDMI 4K, USB 3.0, SD/microSD y carga PD 100W.',
    specs: { 'Puertos': 'HDMI 4K, 2x USB-A 3.0, USB-C PD', 'Carga': '100W Power Delivery', 'Lectores': 'SD + microSD', 'Material': 'Aluminio', 'Cable': '15cm integrado', 'Compatibilidad': 'Universal USB-C' }
  },
  {
    id: 21, name: 'Elgato Stream Deck MK.2', category: 'accessories', price: 699000, oldPrice: null,
    stock: 19, rating: 4.7, reviews: 567, featured: true, isNew: false, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&h=800&fit=crop'],
    description: 'Controlador de streaming con 15 teclas LCD personalizables.',
    specs: { 'Teclas': '15 LCD personalizables', 'Conexión': 'USB-C', 'Software': 'Stream Deck App', 'Integraciones': 'OBS, Twitch, Discord', 'Stand': 'Ajustable incluido', 'Dimensiones': '118 x 84 x 25mm' }
  },
  {
    id: 22, name: 'Xbox Elite Wireless Controller Series 2', category: 'peripherals', price: 549000, oldPrice: 649000,
    stock: 24, rating: 4.6, reviews: 789, featured: true, isNew: false, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c72e?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c72e?w=800&h=800&fit=crop'],
    description: 'Control premium con sticks ajustables, triggers adaptativos y 40 horas de batería.',
    specs: { 'Conexión': 'Wireless + Bluetooth + USB-C', 'Batería': '40 horas', 'Personalización': 'Xbox Accessories App', 'Triggers': 'Hair trigger locks', 'Stick': 'Intercambiables', 'Garantía': 'Incluye estuche' }
  },
  {
    id: 23, name: 'HyperX Cloud III Wireless', category: 'peripherals', price: 799000, oldPrice: null,
    stock: 17, rating: 4.7, reviews: 234, featured: false, isNew: true, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1546435770-a8887b5e2612?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1546435770-a8887b5e2612?w=800&h=800&fit=crop'],
    description: 'Headset gaming inalámbrico con DTS Headphone:X y micrófono desmontable.',
    specs: { 'Driver': '53mm', 'Conexión': '2.4GHz Wireless', 'Batería': '120 horas', 'Audio': 'DTS Headphone:X', 'Micrófono': 'Desmontable con ANC', 'Peso': '320g' }
  },
  {
    id: 24, name: 'Dell XPS 15 9530', category: 'laptops', price: 6499000, oldPrice: 6999000,
    stock: 0, rating: 4.7, reviews: 145, featured: false, isNew: false, onSale: true,
    segment: 'office',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67dcc?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67dcc?w=800&h=800&fit=crop'],
    description: 'Laptop premium con Intel Core i7, RTX 4050, pantalla OLED 3.5K InfinityEdge.',
    specs: { 'Procesador': 'Intel Core i7-13700H', 'GPU': 'NVIDIA RTX 4050', 'RAM': '16GB DDR5', 'Almacenamiento': '512GB SSD', 'Pantalla': '15.6" OLED 3.5K', 'Peso': '1.86 kg' }
  },
  {
    id: 25, name: 'NVIDIA GeForce RTX 4060 Ti', category: 'gpu', price: 1899000, oldPrice: 2099000,
    stock: 13, rating: 4.6, reviews: 345, featured: false, isNew: true, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=800&fit=crop'],
    description: 'GPU ideal para gaming 1080p/1440p con DLSS 3 y 8GB GDDR6.',
    specs: { 'GPU': 'NVIDIA RTX 4060 Ti', 'VRAM': '8GB GDDR6', 'CUDA Cores': '4352', 'Boost Clock': '2.54 GHz', 'TDP': '160W', 'DLSS': 'DLSS 3 Frame Generation' }
  },
  {
    id: 26, name: 'ASUS ROG Swift PG27AQDM', category: 'monitors', price: 3299000, oldPrice: null,
    stock: 8, rating: 4.9, reviews: 123, featured: true, isNew: true, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop'],
    description: 'Monitor OLED gaming 27" QHD 240Hz, 0.03ms GtG, G-SYNC Compatible.',
    specs: { 'Tamaño': '27"', 'Resolución': '2560x1440 QHD', 'Panel': 'WOLED', 'Refresh Rate': '240Hz', 'Tiempo Respuesta': '0.03ms GtG', 'HDR': 'HDR10 True Black 400' }
  },
  {
    id: 27, name: 'Razer BlackWidow V4 Pro', category: 'keyboards', price: 799000, oldPrice: 899000,
    stock: 21, rating: 4.7, reviews: 456, featured: false, isNew: false, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop'],
    description: 'Teclado mecánico full-size con Razer Green switches, dial multimedia y Chroma RGB.',
    specs: { 'Switches': 'Razer Green Mechanical', 'Layout': 'Full-size + Dial', 'RGB': 'Razer Chroma per-key', 'Reposamuñecas': 'Magnético incluido', 'Teclas Macro': '5 dedicadas', 'Conexión': 'USB-C detachable' }
  },
  {
    id: 28, name: 'Blue Yeti X USB Mic', category: 'accessories', price: 549000, oldPrice: null,
    stock: 28, rating: 4.6, reviews: 890, featured: false, isNew: false, onSale: false,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=800&fit=crop'],
    description: 'Micrófono USB profesional con medidor LED, 4 patrones de captación.',
    specs: { 'Patrones': 'Cardioide, Omnidireccional, Bidireccional, Estéreo', 'Sample Rate': '24-bit / 48kHz', 'Conexión': 'USB', 'Monitoreo': 'Zero-latency', 'Controles': 'Mute, Gain, Pattern', 'Incluye': 'Soporte de escritorio' }
  },
  {
    id: 29, name: 'Meta Quest 3 128GB', category: 'peripherals', price: 2499000, oldPrice: 2699000,
    stock: 9, rating: 4.8, reviews: 567, featured: true, isNew: true, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1622979135225-d2fe269b5f56?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1622979135225-d2fe269b5f56?w=800&h=800&fit=crop'],
    description: 'Headset VR mixed reality con Snapdragon XR2 Gen 2 y passthrough a color.',
    specs: { 'Procesador': 'Snapdragon XR2 Gen 2', 'Almacenamiento': '128GB', 'Resolución': '2064x2208 por ojo', 'Refresh Rate': '90/120Hz', 'Tracking': 'Inside-out 6DOF', 'Controles': 'Touch Plus incluidos' }
  },
  {
    id: 30, name: 'WD Black SN850X 4TB', category: 'storage', price: 1699000, oldPrice: 1899000,
    stock: 12, rating: 4.7, reviews: 234, featured: false, isNew: true, onSale: true,
    segment: 'gamer',
    image: 'https://images.unsplash.com/photo-1562976540-050a8373190a?w=600&h=600&fit=crop',
    images: ['https://images.unsplash.com/photo-1562976540-050a8373190a?w=800&h=800&fit=crop'],
    description: 'SSD gaming PCIe 4.0 con Game Mode 2.0 para cargas ultrarrápidas.',
    specs: { 'Capacidad': '4TB', 'Interfaz': 'PCIe 4.0 x4 NVMe', 'Lectura': '7300 MB/s', 'Escritura': '6600 MB/s', 'Game Mode': '2.0 activable', 'Disipador': 'Opcional incluido' }
  }
];
