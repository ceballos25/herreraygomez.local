import { APP_CONFIG } from '../config/constants.js';
import { CartService } from '../services/cart.service.js';
import { OpenPayService } from '../services/openpay.service.js';
import { mountThankYouPage } from '../components/success/success-page.component.js';
import {
  renderOrderSummary,
  renderFailedPayment,
  renderThankYouError
} from '../components/success/success-result.component.js';
import {
  renderPaymentTimeline,
  renderSuccessFlowShell,
  updatePaymentTimeline,
  hideTimelineAndShowSummary,
  TIMELINE_STEP_COUNT
} from '../components/success/success-timeline.component.js';

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const SuccessPage = {
  async init() {
    mountThankYouPage();
    document.title = 'Confirmando pago | Herrera y Gomez';

    const container = document.getElementById('success-content');
    if (!container) return;

    const params = OpenPayService.parseReturnParams();
    const stored = this.getStoredOrder();
    const chargeId = params.chargeId || stored.chargeId;
    const orderId = params.orderId || stored.orderId;

    if (!chargeId && !orderId) {
      container.innerHTML = renderThankYouError('No encontramos datos de tu pedido');
      return;
    }

    if (params.status === 'failed') {
      container.innerHTML = renderFailedPayment('El banco no confirmó el pago. Intenta nuevamente.');
      return;
    }

    container.innerHTML = renderSuccessFlowShell();
    const timelineSlot = document.getElementById('payment-timeline-slot');
    timelineSlot.innerHTML = renderPaymentTimeline(0);

    try {
      await this.runTimeline(timelineSlot, { chargeId, orderId, params, stored });
    } catch (err) {
      console.error('[Success]', err);
      container.innerHTML = renderThankYouError('Error al confirmar el pago');
    }
  },

  async runTimeline(timelineSlot, { chargeId, orderId, params, stored }) {
    const root = timelineSlot.closest('#success-content');

    await delay(1800);
    updatePaymentTimeline(document.getElementById('payment-timeline-slot'), 1);

    let result = await OpenPayService.verifyPayment(chargeId, orderId);
    let attempts = 0;
    const maxAttempts = 8;

    while (!result.verified && result.status !== 'failed' && attempts < maxAttempts) {
      await delay(2000);
      result = await OpenPayService.verifyPayment(chargeId, orderId);
      attempts++;
    }

    if (result.status === 'failed') {
      root.innerHTML = renderFailedPayment('El banco no confirmó el pago. Intenta nuevamente.');
      return;
    }

    const slot = document.getElementById('payment-timeline-slot');
    updatePaymentTimeline(slot, TIMELINE_STEP_COUNT);
    document.title = '¡Gracias por tu compra! | Herrera y Gomez';
    await delay(1000);

    const order = {
      ...stored,
      amount: result.amount || stored.amount,
      customer: stored.customer,
      items: stored.items
    };

    CartService.clear();
    sessionStorage.removeItem(APP_CONFIG.storage.pendingOrder);
    sessionStorage.setItem(APP_CONFIG.storage.lastOrder, JSON.stringify({
      ...order,
      chargeId: result.chargeId || chargeId,
      orderId: result.orderId || orderId,
      verified: result.verified
    }));

    await hideTimelineAndShowSummary(root, renderOrderSummary({
      orderId: result.orderId || orderId,
      chargeId: result.chargeId || chargeId,
      order,
      pending: !result.verified && result.status === 'in_progress'
    }));
  },

  getStoredOrder() {
    try {
      return JSON.parse(
        sessionStorage.getItem(APP_CONFIG.storage.lastOrder)
        || sessionStorage.getItem(APP_CONFIG.storage.pendingOrder)
        || '{}'
      );
    } catch {
      return {};
    }
  }
};
