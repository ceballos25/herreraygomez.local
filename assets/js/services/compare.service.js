import { APP_CONFIG } from '../config/constants.js';
import { getJSON, setJSON } from '../utils/storage.js';
import { showToast } from '../ui/toast.ui.js';

const KEY = APP_CONFIG.storage.compare;
const MAX = APP_CONFIG.compare.maxItems;

export const CompareService = {
  getAll: () => getJSON(KEY) || [],

  save(list) {
    setJSON(KEY, list);
    this.updateBadge();
  },

  toggle(productId) {
    let list = this.getAll();
    const idx = list.indexOf(productId);

    if (idx > -1) {
      list.splice(idx, 1);
      showToast('Eliminado del comparador', 'info');
    } else {
      if (list.length >= MAX) {
        showToast(`Máximo ${MAX} productos para comparar`, 'warning');
        return list.includes(productId);
      }
      list.push(productId);
      showToast('Agregado al comparador', 'success');
    }
    this.save(list);
    return list.includes(productId);
  },

  has: (id) => CompareService.getAll().includes(id),

  updateBadge() {
    const count = this.getAll().length;
    document.querySelectorAll('.compare-badge').forEach(b => {
      b.textContent = count;
      b.classList.toggle('d-none', count === 0);
    });
  }
};
