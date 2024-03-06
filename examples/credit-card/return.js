/**
 * Run the `buildPaymentFlow` function on `DOMContentLoaded` to access all the DOM nodes needed.
 */
document.addEventListener('DOMContentLoaded', buildPaymentFlow);

function buildPaymentFlow() {
  if (typeof PayStationSdk === 'undefined') {
    alert(`
      It seems SDK library is undefined.
      Please, link CDN source or create local build (recommended to test purposes only).
              `);
    throw new Error('PayStationSdk not found');
  }

  /**
   * For more information about creating tokens,
   * refer to our documentation https://developers.xsolla.com/api/pay-station/operation/create-token/
   */
  const accessToken = new URL(window.location.href).searchParams.get('token');

  if (!accessToken) {
    alert('No token provided. Please, check the documentation');
    throw new Error('No token provided');
  }

  /**
   * The SDK is available under the PayStationSdk namespace.
   * To begin initialization, obtain a reference to the headlessCheckout object.
   */
  const { headlessCheckout } = PayStationSdk;

  async function initPayStationSdk() {
    await headlessCheckout.init({
      isWebView: false,
      sandbox: true,
    });

    await headlessCheckout.setToken(accessToken);
  }

  // Initialize SDK.
  initPayStationSdk();
}
