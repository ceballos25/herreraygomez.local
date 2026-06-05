export function initToastContainer() {
  if (document.getElementById('toast-container')) return;
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  container.style.zIndex = '9999';
  document.body.appendChild(container);
}

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: 'check-circle', error: 'x-circle', warning: 'exclamation-triangle', info: 'info-circle' };
  const colors = { success: 'text-success', error: 'text-danger', warning: 'text-warning', info: 'text-primary' };

  const toast = document.createElement('div');
  toast.className = 'toast show hyg-toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <div class="toast-body d-flex align-items-center gap-2">
      <i class="bi bi-${icons[type]} ${colors[type]} fs-5"></i>
      <span>${message}</span>
      <button type="button" class="btn-close ms-auto" aria-label="Cerrar"></button>
    </div>`;

  container.appendChild(toast);
  toast.querySelector('.btn-close').addEventListener('click', () => toast.remove());
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 4000);
}
