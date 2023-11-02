/**
 * Run `buildPaymentFlow` function only when `DOMContentLoaded` to access all the DOM nodes needed.
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
   * To learn more about creating tokens,
   * please read https://developers.xsolla.com/api/pay-station/operation/create-token/
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

  function handleRedirectAction(redirectAction) {
    /**
     * Handle redirect to 3DS secure procedure.
     */
    const url = new URL(redirectAction.data.redirect.redirectUrl);
    const params = Object.entries(redirectAction.data.redirect.data);
    params.forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value);
    });

    /**
     * Open 3DS Secure.
     */
    this.window.location.href = url.toString();
  }

  function renderRequiredFields(requiredFields, formElement) {
    /**
     * It's important to render every required field as a component according to its own type or
     * other specific parameters. In the current case, we could encounter fields of the following types:
     * 'text', 'select', or a 'text' field with the name 'card_number'.
     *
     * Every type is mapped to a suitable component, and then the component is rendered into the DOM.
     */
    requiredFields.forEach((field) => {
      if (field.type === 'text' && field.name === 'card_number') {
        renderCardNumberComponent(formElement, field);
        return;
      }
      if (field.type === 'text') {
        renderTextComponent(formElement, field);
        return;
      }
      if (field.type === 'select') {
        renderSelectComponent(formElement, field);
        return;
      }
    });
  }

  function renderCardNumberComponent(formElement, field) {
    /**
     * You can use <psdk-card-number icon="true" name="field.name"></psdk-card-number> as well
     */
    const input = new PayStationSdk.CardNumberComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderSelectComponent(formElement, field) {
    /**
     * You can use <psdk-select name="field.name"></psdk-select> as well
     */
    const input = new PayStationSdk.SelectComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderTextComponent(formElement, field) {
    /**
     * You can use <psdk-text name="field.name"></psdk-text> as well
     */
    const input = new PayStationSdk.TextComponent();
    input.setAttribute('name', field.name);
    formElement.append(input);
  }

  function renderSubmitButton(formElement) {
    /**
     * Render submit form button.
     * You can use <psdk-submit-button></psdk-submit-button> as well
     */
    const submitButton = new PayStationSdk.SubmitButtonComponent();
    submitButton.setAttribute('text', 'Pay Now');
    formElement.append(submitButton);
  }

  function handle3dsAction(threeDsAction) {
    /**
     * Create 3ds component. It will be handle 3ds verification flow.
     * You can use <psdk-3ds></psdk-3ds> component as well
     */

    const threeDsComponent = new PayStationSdk.ThreeDsComponent();

    threeDsComponent.setAttribute(
      'data-challenge',
      JSON.stringify(threeDsAction.data.data),
    );

    document.getElementById('right-col').append(threeDsComponent);
  }

  function renderStatusComponent(statusElement) {
    /**
     * Create status component. It will be updated once payment status changed.
     * You can use <psdk-status></psdk-status> component as well
     */
    const statusComponent = new PayStationSdk.StatusComponent();
    statusElement.append(statusComponent);
  }

  function clearFormFields(formElement) {
    /**
     * In some cases, we need to remove all form fields that were rendered before.
     * This may be necessary when processing Brazilian credit cards, because
     * they also have a second step with extra fields that need to be filled.
     * To create a fluent user experience, it would be good practice to clear fields already submitted and
     * render new fields in the same place.
     */
    formElement.innerHTML = '';
  }

  function getRequiredFields(fields) {
    /**
     * form.fields provide available fields for selected payment method.
     * You can filter it by `isMandatory` flag to get required fields only
     */
    return fields.filter((field) => field.isMandatory === '1');
  }

  async function initPayStationSdk() {
    /**
     * Call the `init()` method with the provided environment object.
     * The isWebView parameter is required and indicates whether your
     * integration type is a webview or not.
     * You can set sandbox payment mode with `sandbox` parameter
     * Please note that this command executes asynchronously.
     */
    await headlessCheckout.init({
      isWebView: false,
      sandbox: false,
    });

    /**
     * Set styles for secure components
     */
    await headlessCheckout.setSecureComponentStyles(`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

          input {
            padding: 0;
            border: 1px solid grey;
            border-radius: 8px;
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            height: 30px !important;
          }

          input:focus {
            outline: none;
          }
        `);

    /**
     * After the Payments SDK has been initialized, the next step is setting the token.
     * To learn more about creating tokens,
     * please read https://developers.xsolla.com/api/pay-station/operation/create-token/
     */
    await headlessCheckout.setToken(accessToken);

    /**
     * Define payment method id.
     * To get lists of payment methods use psdk-payment-methods.
     * Please see `examples/select-method` for more details
     */
    const creditCardMethodId = 1380;

    /**
     * Initialize payment.
     * `returnUrl` will be opened after payment completed on 3DS secure side.
     */
    const form = await headlessCheckout.form.init({
      paymentMethodId: creditCardMethodId,
      /*
       * This return url means you start current example on localhost with 3000 port.
       * */
      returnUrl: 'http://localhost:3000/return.html',
    });

    /**
     * Retrieving DOM elements to render form fields and display status messages.
     */
    const formElement = document.querySelector('#form-container');
    const statusElement = document.querySelector('#status-container');

    /**
     * Subscribe to payment actions
     */
    headlessCheckout.form.onNextAction((nextAction) => {
      switch (nextAction.type) {
        /**
         * Handle 'show_fields' action.
         */
        case 'show_fields':
          clearFormFields(formElement);
          renderRequiredFields(nextAction.data.fields, formElement);
          renderSubmitButton(formElement);
          break;

        /**
         * Handle 'check_status' action.
         */
        case 'check_status':
          /**
           * Remove unnecessary form fields to render StatusComponent in the same place.
           */
          clearFormFields(formElement);
          renderStatusComponent(statusElement);
          break;

        /**
         * Handle '3DS' action.
         */
        case '3DS':
          handle3dsAction(nextAction);
          break;

        /**
         * Handle 'redirect' action.
         */
        case 'redirect':
          handleRedirectAction(nextAction);
          break;
      }
    });

    const requiredFields = getRequiredFields(form.fields);

    /**
     * Render requried fields
     */
    renderRequiredFields(requiredFields, formElement);

    renderSubmitButton(formElement);
  }

  // initialize sdk
  initPayStationSdk();
}
