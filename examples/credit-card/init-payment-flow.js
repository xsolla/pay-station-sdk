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

  /**
   * The SDK is available under the PayStationSdk namespace.
   * To begin initialization, obtain a reference to the headlessCheckout object.
   */
  const { headlessCheckout } = PayStationSdk;

  /**
   *  Retrieving DOM elements to render form fields and display status messages.
   */
  const formElement = document.querySelector('#form-container');
  const statusElement = document.querySelector('#status-container');

  let redirectUrl = '';

  function renderFields(requiredFields) {
    /**
     * It is important to render every every required field as a component according to its own type or
     * other specific parameters. In the current case, we could encounter fields of the following types:
     * 'text', 'select', or 'text' with the name 'card_number'.
     *
     * Every type is mapped to a suitable component, and then the component is rendered in the DOM.
     */
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
    /**
     * You can use <psdk-card-number icon="true" name="field.name"></psdk-card-number> as well.
     */
    const input = new PayStationSdk.CardNumberComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderSelectComponent(field) {
    /**
     * You can use <psdk-select name="field.name"></psdk-select> as well.
     */
    const input = new PayStationSdk.SelectComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderCheckboxComponent(field) {
    /**
     * You can use <psdk-checkbox name="field.name"></psdk-checkbox> as well.
     */
    const input = new PayStationSdk.CheckboxComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderTextComponent(field) {
    /**
     * You can use <psdk-text name="field.name"></psdk-text> as well.
     */
    const input = new PayStationSdk.TextComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderSubmitButton() {
    /**
     * Render the submit form button.
     * You can use <psdk-submit-button></psdk-submit-button> as well.
     */
    const submitButton = new PayStationSdk.SubmitButtonComponent();
    submitButton.setAttribute('text', 'Pay Now');
    formElement.append(submitButton);
  }

  function renderRedirectButton() {
    const button = document.createElement('button');
    button.innerText = 'Continue';
    button.onclick = () => {
      window.open(redirectUrl, '_blank');
      clearFormFields();
      renderStatusComponent();
    };
    formElement.append(button);
  }

  function renderStatusComponent() {
    /**
     * Create the status component. It will be updated once a payment status changed.
     * You can use the <psdk-status></psdk-status> component as well.
     */
    const statusComponent = new PayStationSdk.StatusComponent();
    statusElement.append(statusComponent);
  }

  function handleRedirectAction(redirectAction) {
    /**
     * Handle redirect to 3-D Secure procedure.
     */
    const url = new URL(redirectAction.data.redirect.redirectUrl);
    const params = Object.entries(redirectAction.data.redirect.data);
    params.forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value);
    });

    // Show additional step with button to get trusted event and
    // open 3-D Secure in a new tab for specific ACS providers
    if (redirectAction.data.redirect.isNewWindowRequired) {
      redirectUrl = url.toString();

      clearFormFields();
      renderRedirectButton();

      return;
    }

    /**
     * Open 3-D Secure in the same tab.
     */
    this.window.location.href = url.toString();
  }

  function handle3dsAction(threeDsAction) {
    clearFormFields();

    /**
     * Create the 3-D Secure component. It will handle the 3-D Secure verification flow.
     * You can use the <psdk-3ds></psdk-3ds> component as well.
     */
    const threeDsComponent = new PayStationSdk.ThreeDsComponent();

    threeDsComponent.setAttribute(
      'data-challenge',
      JSON.stringify(threeDsAction.data.data),
    );
    // Show additional step with button to get trusted event and
    // open 3-D Secure in a new tab for specific token settings (like is_three_ds_independent_windows)
    threeDsComponent.setAttribute('text', 'Continue');

    document.querySelector('.right-col').append(threeDsComponent);
  }

  function clearFormFields() {
    /**
     * In some cases, we need to remove all form fields that were rendered before.
     * This may be necessary when processing Brazilian credit cards, because
     * they also have a second step with extra fields that need to be filled.
     * To create a fluent user experience, clear submitted fields and
     * render new fields in the same place.
     */
    formElement.innerHTML = '';
  }

  async function initPayStationSdk() {
    /**
     * Call the `init()` method with the provided environment object.
     * The isWebView parameter is required and indicates whether your
     * integration type is a WebView.
     * You can set sandbox payment mode with the `sandbox` parameter.
     * Note that this command executes asynchronously.
     */
    await headlessCheckout.init({
      isWebView: false,
      sandbox: false,
    });

    /**
     * Set styles for secure components.
     */
    await headlessCheckout.setSecureComponentStyles(`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
        `);

    /**
     * After the Payments SDK has been initialized, the next step is setting the token.
     * For more information about creating tokens,
     * refer to our documentation https://developers.xsolla.com/api/pay-station/operation/create-token/
     */
    await headlessCheckout.setToken(accessToken);

    /**
     * Define payment method ID.
     * To get lists of payment methods, use psdk-payment-methods.
     * Refer to `examples/select-method` for more details.
     */
    const creditCardMethodId = 1380;

    /**
     * Initialize payment.
     * `returnUrl` is opened after the payment is completed on 3-D Secure's side.
     */
    const form = await headlessCheckout.form.init({
      paymentMethodId: creditCardMethodId,
      /*
       * This return URL means you start the current example on localhost with the 3000 port.
       * */
      returnUrl: 'http://localhost:3000/pay-station-sdk/examples/return.html',
    });

    /**
     * Subscribe to payment actions.
     */
    headlessCheckout.form.onNextAction((nextAction) => {
      switch (nextAction.type) {
        /**
         * Handle the 'show_fields' action.
         */
        case 'show_fields':
          clearFormFields();
          renderFields(nextAction.data.fields);
          renderSubmitButton();
          break;

        /**
         * Handle the 'check_status' action.
         */
        case 'check_status':
          /**
           * Remove unnecessary form fields to render StatusComponent in the same place.
           */
          clearFormFields();
          renderStatusComponent();
          break;

        /**
         * Handle the '3DS' action.
         */
        case '3DS':
          handle3dsAction(nextAction);
          break;

        /**
         * Handle the 'redirect' action.
         */
        case 'redirect':
          handleRedirectAction(nextAction);
          break;
      }
    });

    /**
     * Render the fields.
     */
    renderFields(form.fields);

    renderSubmitButton();

    /**
     * Listen for the custom 'cardBinCountryChanged' event from the <psdk-card-number> component.
     * If the detected card BIN country is India (IN), the <psdk-checkbox name="allowSubscription"> will be hidden.
     * If the country is not India, the checkbox will be shown again.
     */
    const cardNumberComponent = document.querySelector('psdk-card-number');
    if (cardNumberComponent) {
      cardNumberComponent.addEventListener(
        'cardBinCountryChanged',
        function (event) {
          const country = event.detail && event.detail.cardBinCountry;
          const checkbox = document.querySelector(
            'psdk-checkbox[name="allowSubscription"]',
          );
          if (!checkbox) return;
          checkbox.style.display = country === 'IN' ? 'none' : '';
        },
      );
    }
  }

  // Initialize SDK.
  initPayStationSdk();
}
