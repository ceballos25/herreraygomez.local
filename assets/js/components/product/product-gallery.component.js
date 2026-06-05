export function renderProductGallery(product) {
  const images = product.images || [product.image];
  return `
    <div class="col-lg-6">
      <div class="product-gallery">
        <div class="gallery-main">
          <img src="${product.image}" alt="${product.name}" id="gallery-main-img" class="img-fluid rounded">
        </div>
        <div class="gallery-thumbs">
          ${images.map((img, i) => `
            <button class="gallery-thumb ${i === 0 ? 'active' : ''}" data-src="${img}">
              <img src="${img}" alt="" loading="lazy" width="80" height="80">
            </button>`).join('')}
        </div>
      </div>
    </div>`;
}

export function bindProductGallery() {
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.getElementById('gallery-main-img').src = thumb.dataset.src;
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}
