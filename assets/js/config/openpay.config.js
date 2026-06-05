export const OPENPAY_CONFIG = {
  backendUrl: 'api/openpay/charge.php',
  demoMode: false,
  successPage: 'success.html',

  getRedirectUrl(orderId) {
    const url = new URL(this.successPage, `${window.location.origin}/`);
    if (orderId) url.searchParams.set('order_id', orderId);
    return url.href;
  },

  getCancelUrl() {
    return new URL('checkout.html', window.location.href).href;
  }
};
