import { APP_CONFIG, ROUTES } from '../config/constants.js';
import { CartService } from '../services/cart.service.js';
import { OpenPayService, OpenPayError } from '../services/openpay.service.js';
import { showToast } from '../ui/toast.ui.js';
import { getJSON, setJSON } from '../utils/storage.js';
import { mountCheckoutPage } from '../components/checkout/checkout-page.component.js';
import { mountCheckoutSummary } from '../components/checkout/checkout-summary.component.js';

export const CheckoutPage = {
  form: null,
  isProcessing: false,

  init() {
    mountCheckoutPage();
    this.form = document.getElementById('checkout-form');
    if (!this.form) return;
    if (CartService.isEmpty()) { window.location.href = ROUTES.cart; return; }
    mountCheckoutSummary();
    this.bindEvents();
    this.loadSavedCustomerData();
  },

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.form.querySelectorAll('input, select').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => field.classList.remove('is-invalid'));
    });
  },

  loadSavedCustomerData() {
    const data = getJSON(APP_CONFIG.storage.customer);
    if (!data) return;
    Object.entries(data).forEach(([key, value]) => {
      const field = this.form.querySelector(`[name="${key}"]`);
      if (field && value) field.value = value;
    });
  },

  saveCustomerData(data) {
    setJSON(APP_CONFIG.storage.customer, data);
  },

  validateField(field) {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    const rules = {
      firstName: [v => v.length >= 2, 'Nombre requerido (mín. 2 caracteres)'],
      lastName: [v => v.length >= 2, 'Apellido requerido (mín. 2 caracteres)'],
      email: [v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Correo electrónico inválido'],
      phone: [v => /^\d{10}$/.test(v.replace(/\D/g, '')), 'Celular inválido (10 dígitos)'],
      address: [v => v.length >= 5, 'Dirección requerida (mín. 5 caracteres)'],
      city: [v => v.length >= 2, 'Ciudad requerida'],
      state: [v => v.length >= 2, 'Departamento requerido'],
      postalCode: [v => /^\d{5,6}$/.test(v), 'Código postal inválido'],
      terms: [v => v === true, 'Debes aceptar los términos y condiciones']
    };

    const rule = rules[field.name];
    const valid = rule ? rule[0](value) : (field.required ? String(value).length > 0 : true);
    field.classList.toggle('is-invalid', !valid);
    field.classList.toggle('is-valid', valid && (field.type === 'checkbox' ? field.checked : field.value.trim()));

    if (!valid && rule) {
      let fb = field.parentElement.querySelector('.invalid-feedback');
      if (!fb) { fb = document.createElement('div'); fb.className = 'invalid-feedback'; field.parentElement.appendChild(fb); }
      fb.textContent = rule[1];
    }
    return valid;
  },

  validateForm() {
    let ok = true;
    this.form.querySelectorAll('input[required], select[required]').forEach(f => { if (!this.validateField(f)) ok = false; });
    return ok;
  },

  getFormData() {
    const fd = new FormData(this.form);
    return {
      firstName: fd.get('firstName').trim(),
      lastName: fd.get('lastName').trim(),
      name: `${fd.get('firstName').trim()} ${fd.get('lastName').trim()}`,
      email: fd.get('email').trim(),
      phone: fd.get('phone').replace(/\D/g, ''),
      address: fd.get('address').trim(),
      city: fd.get('city').trim(),
      state: fd.get('state').trim(),
      postalCode: fd.get('postalCode').trim(),
      notes: fd.get('notes')?.trim() || ''
    };
  },

  showLoader(show) {
    document.getElementById('checkout-loader')?.classList.toggle('d-none', !show);
    const btn = document.getElementById('checkout-submit');
    if (btn) {
      btn.disabled = show;
      btn.innerHTML = show ? '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...' : '<i class="bi bi-shield-lock me-2"></i>Pagar con PSE';
    }
    this.isProcessing = show;
  },

  async handleSubmit(e) {
    e.preventDefault();
    if (this.isProcessing) return;
    if (CartService.isEmpty()) { showToast('Tu carrito está vacío', 'warning'); return; }
    if (!this.validateForm()) { showToast('Por favor corrige los errores del formulario', 'error'); return; }

    const customer = this.getFormData();
    this.saveCustomerData(customer);
    const { items, iva, total } = CartService.getSummary();
    const orderId = OpenPayService.generateOrderId();
    const orderData = { orderId, amount: total, iva, description: `Compra Herrera y Gomez - ${items.length} producto(s) - ${orderId}`, customer, items, itemsCount: items.length };

    this.showLoader(true);
    try {
      const result = await OpenPayService.processPSEPayment(orderData);
      if (result.success && result.redirectUrl) {
        sessionStorage.setItem(APP_CONFIG.storage.lastOrder, JSON.stringify({ ...orderData, chargeId: result.chargeId, status: result.status }));
        if (result.isOpenPayGateway) {
          showToast('Redirigiendo a la pasarela Openpay PSE...', 'info');
          window.location.replace(result.redirectUrl);
        } else {
          showToast('Modo demo: simulando pago...', 'info');
          setTimeout(() => { window.location.href = result.redirectUrl; }, 800);
        }
      } else {
        throw new OpenPayError('PAYMENT_FAILED', 'No se pudo iniciar el pago');
      }
    } catch (error) {
      this.showLoader(false);
      showToast(error instanceof OpenPayError ? error.message : 'Error inesperado al procesar el pago', 'error');
      console.error('[Checkout]', error);
    }
  }
};
