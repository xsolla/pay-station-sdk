/**
 * Run the `buildPaymentFlow` function on `DOMContentLoaded` to access all the DOM nodes needed.
 */
document.addEventListener('DOMContentLoaded', buildPaymentFlow);

function buildPaymentFlow() {
  if (typeof PayStationSdk === 'undefined') {
    alert(payStationSdkUndefinedError);
    throw new Error('PayStationSdk not found');
  }

  /**
   * To learn more about creating tokens,
   * refer to our documentation https://developers.xsolla.com/api/pay-station/operation/create-token/
   */
  const accessToken = '';

  if (!accessToken) {
    alert('No token provided. Please, check the documentation');
    throw new Error('No token provided');
  }

  const { headlessCheckout } = PayStationSdk;

  const formElement = document.querySelector('#form-container');
  const errorsContainer = document.querySelector('#errors-container');
  const statusElement = document.querySelector('#status-container');

  /**
   * AFS error code constant.
   * This error code indicates that the payment was declined by the Anti-Fraud System.
   */
  const AFS_DECLINED_ERROR_CODE = 1092;

  function renderFields(requiredFields) {
    requiredFields.forEach((field) => {
      if (field.type === 'text' && field.name === 'card_number') {
        renderCardNumberComponent(field);
        return;
      }
      if (field.type === 'text') {
        renderTextComponent(field);
        return;
      }
      if (field.type === 'select') {
        renderSelectComponent(field);
        return;
      }
      if (field.type === 'check') {
        renderCheckboxComponent(field);
        return;
      }
    });
  }

  function renderCardNumberComponent(field) {
    const input = new PayStationSdk.CardNumberComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderSelectComponent(field) {
    const input = new PayStationSdk.SelectComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderCheckboxComponent(field) {
    const input = new PayStationSdk.CheckboxComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderTextComponent(field) {
    const input = new PayStationSdk.TextComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderSubmitButton() {
    const submitButton = new PayStationSdk.SubmitButtonComponent();
    submitButton.setAttribute('text', 'Pay Now');
    formElement.append(submitButton);
  }

  function renderStatusComponent() {
    const statusComponent = new PayStationSdk.StatusComponent();
    statusElement.append(statusComponent);
  }

  function clearFormFields() {
    formElement.innerHTML = '';
  }

  function clearErrors() {
    errorsContainer.innerHTML = '';
  }

  /**
   * Handle errors from the payment form.
   * This function specifically checks for AFS declined error (code 1092)
   * and displays appropriate messaging to the user.
   */
  function handleErrors(action) {
    const errors = action.data.errors ?? [];

    clearErrors();

    errors.forEach((error) => {
      const errorElement = document.createElement('div');
      errorElement.classList.add('error');

      if (error.code === AFS_DECLINED_ERROR_CODE) {
        /**
         * AFS declined error - payment was blocked by Anti-Fraud System.
         * In production, you might want to:
         * - Log this for analytics
         * - Show user-friendly message
         * - Suggest alternative payment methods
         * - Contact support link
         */
        errorElement.classList.add('afs-error');
        errorElement.innerHTML = `
          <div class="error-icon">⚠️</div>
          <div class="error-content">
            <strong>Payment Declined by Fraud Protection</strong>
            <p>${error.message}</p>
            <p class="error-hint">
              This payment was blocked by our security system.
              Please try a different payment method or contact support.
            </p>
          </div>
        `;
      } else {
        errorElement.innerHTML = `
          <div class="error-content">
            <strong>Error ${error.code}</strong>
            <p>${error.message}</p>
          </div>
        `;
      }

      errorsContainer.append(errorElement);
    });
  }

  function handle3dsAction(threeDsAction) {
    clearFormFields();

    const threeDsComponent = new PayStationSdk.ThreeDsComponent();
    threeDsComponent.setAttribute(
      'data-challenge',
      JSON.stringify(threeDsAction.data.data),
    );
    threeDsComponent.setAttribute('text', 'Continue');

    document.querySelector('.right-col').append(threeDsComponent);
  }

  function handleRedirectAction(redirectAction) {
    const { redirectUrl, data, method, isNewWindowRequired } =
      redirectAction.data.redirect;
    const isPost = method?.toUpperCase() === 'POST';

    const form = document.createElement('form');
    form.method = isPost ? 'POST' : 'GET';
    form.action = redirectUrl;
    document.body.appendChild(form);

    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    if (isNewWindowRequired) {
      form.target = '_blank';
      clearFormFields();
      const button = document.createElement('button');
      button.innerText = 'Continue';
      button.onclick = () => {
        form.submit();
        clearFormFields();
        renderStatusComponent();
      };
      formElement.append(button);
      return;
    }

    form.submit();
  }

  async function initPayStationSdk() {
    await headlessCheckout.init({
      isWebView: false,
      sandbox: false,
    });

    await headlessCheckout.setSecureComponentStyles(`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
    `);

    await headlessCheckout.setToken(accessToken);

    const creditCardMethodId = 1380;

    const form = await headlessCheckout.form.init({
      paymentMethodId: creditCardMethodId,
      returnUrl: 'http://localhost:3000/pay-station-sdk/examples/return.html',
    });

    /**
     * Subscribe to payment actions. There are two ways an AFS decline surfaces:
     * 1. 'show_errors' - AFS blocks immediately with error code 1092.
     * 2. 'check_status' - AFS blocks after invoice creation and auto-refunds.
     *    The status component resolves to a canceled state once getStatus()
     *    reports the terminal verdict (see PAYMENTS-29021).
     */
    headlessCheckout.form.onNextAction((nextAction) => {
      switch (nextAction.type) {
        case 'show_fields':
          clearFormFields();
          clearErrors();
          renderFields(nextAction.data.fields);
          renderSubmitButton();
          break;

        case 'check_status':
          clearFormFields();
          clearErrors();
          renderStatusComponent();
          break;

        case '3DS':
          handle3dsAction(nextAction);
          break;

        case 'redirect':
          handleRedirectAction(nextAction);
          break;

        case 'show_errors':
          handleErrors(nextAction);
          break;
      }
    });

    renderFields(form.fields);
    renderSubmitButton();
  }

  initPayStationSdk();
}
