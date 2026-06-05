export function renderSkeletonCards(containerId, count = 8) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = Array(count).fill('').map(() => `
    <div class="product-card skeleton-card">
      <div class="skeleton skeleton-image"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-price"></div>
    </div>`).join('');
}
