import { OPENPAY_CONFIG } from '../config/openpay.config.js';
import { APP_CONFIG } from '../config/constants.js';

export class OpenPayError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'OpenPayError';
    this.code = code;
  }
}

export const OpenPayService = {
  config: OPENPAY_CONFIG,

  generateOrderId() {
    return `HYG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  },

  validateCustomerData(customer) {
    const errors = [];
    const phone = (customer.phone || '').replace(/\D/g, '');

    if (!customer.firstName?.trim() || customer.firstName.trim().length < 2) errors.push('Nombre requerido');
    if (!customer.lastName?.trim() || customer.lastName.trim().length < 2) errors.push('Apellido requerido');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email || '')) errors.push('Correo electrónico inválido');
    if (!/^\d{10}$/.test(phone)) errors.push('Teléfono inválido (10 dígitos)');
    if (!customer.address?.trim() || customer.address.trim().length < 5) errors.push('Dirección requerida');
    if (!customer.city?.trim() || customer.city.trim().length < 2) errors.push('Ciudad requerida');

    return errors;
  },

  buildPSEPayload(orderData) {
    const { customer, amount, description, iva, orderId } = orderData;
    const phone = (customer.phone || '').replace(/\D/g, '').replace(/^57(\d{10})$/, '$1');
    return {
      amount: Math.round(amount),
      currency: 'COP',
      iva: String(Math.round(iva)),
      description: description.substring(0, 250),
      order_id: orderId,
      redirect_url: this.config.getRedirectUrl(orderId),
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone,
        address: customer.address,
        city: customer.city,
        state: customer.state
      }
    };
  },

  async processPSEPayment(orderData) {
    const errors = this.validateCustomerData(orderData.customer);
    if (errors.length) throw new OpenPayError('VALIDATION_ERROR', errors.join('. '));
    if (orderData.amount <= 0) throw new OpenPayError('INVALID_AMOUNT', 'El monto debe ser mayor a cero');

    const orderId = orderData.orderId || this.generateOrderId();
    const payload = this.buildPSEPayload({ ...orderData, orderId });

    sessionStorage.setItem(APP_CONFIG.storage.pendingOrder, JSON.stringify({
      orderId, amount: orderData.amount, customer: orderData.customer, items: orderData.items, timestamp: Date.now()
    }));

    if (this.config.demoMode) {
      console.warn('[Openpay] Modo demo — no redirige a pasarela real');
      return this.simulatePSEPayment(payload);
    }

    return this.createChargeViaBackend(payload);
  },

  async createChargeViaBackend(payload) {
    try {
      const response = await fetch(this.config.backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      let data;
      try { data = await response.json(); } catch {
        throw new OpenPayError('API_ERROR', 'Respuesta inválida del servidor de pagos');
      }

      if (!response.ok) {
        const msg = data.description || data.message || data.error || 'Error al procesar el pago';
        const code = data.error_code;
        const detail = code ? `${msg} (Openpay ${code})` : msg;
        if (String(msg).includes('YOUR_MERCHANT') || String(msg).includes('config.php')) {
          throw new OpenPayError('CONFIG_ERROR', 'Configura api/openpay/config.php con tus credenciales Openpay.');
        }
        if (code === 1001 && /CheckoutData failed/i.test(msg)) {
          throw new OpenPayError('CHECKOUT_DATA',
            'Openpay rechazó los datos del checkout. Verifica currency COP y campos del customer.');
        }
        if (code === 3013 || code === 1004 || code === 1017 || /not available/i.test(msg)) {
          throw new OpenPayError('PSE_UNAVAILABLE',
            'PSE no habilitado en tu comercio Openpay (error 3013). Escribe a soporte@openpay.co con tu merchant_id para activar PSE en sandbox.');
        }
        throw new OpenPayError(code || 'API_ERROR', detail);
      }

      const pseUrl = data.redirect_url || data.payment_method?.url || data.payment_method?.redirect_url;
      if (!pseUrl) throw new OpenPayError('NO_REDIRECT_URL', 'Openpay no devolvió URL de pago PSE');

      return { success: true, chargeId: data.id, orderId: payload.order_id, redirectUrl: pseUrl, status: data.status, isOpenPayGateway: true };
    } catch (error) {
      if (error instanceof OpenPayError) throw error;
      throw new OpenPayError('NETWORK_ERROR', 'No se pudo conectar con el servidor de pagos (PHP + charge.php).');
    }
  },

  async simulatePSEPayment(payload) {
    await new Promise(r => setTimeout(r, 1500));
    const chargeId = `tr${Date.now()}sandbox`;
    const url = `${this.config.getRedirectUrl()}?id=${chargeId}&order_id=${payload.order_id}&status=completed&simulated=true`;
    return { success: true, chargeId, orderId: payload.order_id, status: 'in_progress', redirectUrl: url, isOpenPayGateway: false };
  },

  parseReturnParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      chargeId: p.get('id') || p.get('charge_id') || p.get('transaction_id') || null,
      orderId: p.get('order_id') || p.get('orderId') || p.get('order') || null,
      status: p.get('status') || null,
      fromOpenPay: p.has('id') || p.has('order_id') || p.has('order') || p.has('status')
    };
  },

  async verifyPayment(chargeId, orderId) {
    if (this.config.demoMode) {
      const pending = sessionStorage.getItem(APP_CONFIG.storage.pendingOrder)
        || sessionStorage.getItem(APP_CONFIG.storage.lastOrder);
      if (!pending) return { verified: false, status: 'not_found', message: 'Pedido no encontrado' };
      const order = JSON.parse(pending);
      if (orderId && order.orderId && order.orderId !== orderId) {
        return { verified: false, status: 'mismatch', message: 'Order ID no coincide' };
      }
      return {
        verified: true,
        status: 'completed',
        chargeId: chargeId || order.chargeId,
        orderId: orderId || order.orderId,
        amount: order.amount,
        customer: order.customer
      };
    }

    try {
      const qs = new URLSearchParams({ action: 'verify' });
      if (chargeId) qs.set('charge_id', chargeId);
      if (orderId) qs.set('order_id', orderId);

      const res = await fetch(`${this.config.backendUrl}?${qs}`);
      const data = await res.json();

      return {
        verified: data.verified === true || data.status === 'completed',
        status: data.status,
        chargeId: data.chargeId || chargeId,
        orderId: data.orderId || orderId,
        amount: data.amount
      };
    } catch {
      return { verified: false, status: 'error', message: 'Error al verificar el pago' };
    }
  },

  configure(newConfig) {
    Object.assign(this.config, newConfig);
  }
};
