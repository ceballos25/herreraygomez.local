import { APP_CONFIG } from '../config/constants.js';
import { getJSON, setJSON } from '../utils/storage.js';
import { showToast } from '../ui/toast.ui.js';

const KEY = APP_CONFIG.storage.wishlist;

export const WishlistService = {
  getAll: () => getJSON(KEY) || [],

  save(list) {
    setJSON(KEY, list);
    this.updateBadge();
  },

  toggle(productId) {
    const list = this.getAll();
    const idx = list.indexOf(productId);
    if (idx > -1) {
      list.splice(idx, 1);
      showToast('Eliminado de favoritos', 'info');
    } else {
      list.push(productId);
      showToast('Agregado a favoritos', 'success');
    }
    this.save(list);
    return list.includes(productId);
  },

  has: (id) => WishlistService.getAll().includes(id),

  updateBadge() {
    const count = this.getAll().length;
    document.querySelectorAll('.wishlist-badge').forEach(b => {
      b.textContent = count;
      b.classList.toggle('d-none', count === 0);
    });
  }
};
