# Xsolla Pay Station SDK

- [What is Pay Station SDK?](#what-is-pay-station-sdk)
- [Installing with npm-package](#installing-with-npm-package)
- [General integration scheme](#general-integration-scheme)
- [PaymentSdk library interface](#paymentsdk-library-interface)
- [Pay Station SDK components](#pay-station-sdk-components)
  - [Regular components](#regular-components)
  - [Secure components](#secure-components)
  - [Special components](#special-components)
- [Pay Station SDK supported events](#pay-station-sdk-supported-events)
- [Pay Station SDK supported languages](#pay-station-sdk-supported-languages)
- [Integration guide](#integration-guide)

---

## What is Pay Station SDK?

Pay Station SDK is a fully customizable payment solution that allows you to manage payments in browsers or WebView via Xsolla without using Xsolla Pay Station.

![Client integration scheme](./readme_images/client_web_app.png 'Integration scheme')

The JavaScript SDK is loaded and initialized by the client. It then loads a 0 px iframe containing the Core Library that has access to sensitive user and payment data. This information is encapsulated in the iframe, but neither the client nor their third-party scripts can access this data.

Access to public data is provided through public post messages. The Core Library makes requests to the Payments API, filters responses to remove sensitive data, converts the data into a usable format, and sends it to the client via public post messages.

Inputs are encapsulated in an iframe, preventing the client from accessing the user's input values.

When creating components, the client can use the JavaScript SDK Web Components with or without default styles. Additionally, the SDK events interface can be used to create custom components.

Except for secure inputs, the client has full control over the component's styles, HTML, logic, and order. An iframe containing an input has a wrapper and events interface for complete customization.

## Installing with npm-package

`npm install --save @xsolla/pay-station-sdk`

## General integration scheme

![General integration scheme](./readme_images/general_integration_scheme.png 'General integration scheme')

## PaymentSdk library interface

```typescript
declare const headlessCheckout: {
  /**
   * Load secure Core Iframe.
   * Load components to CustomElementRegistry. https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
   */
  init(environment: { isWebview?: boolean; sandbox?: boolean }): Promise<void>;

  /**
   * Destroys current instance and creates a new one.
   */
  destroy(): void;

  /**
   * Initialize the payment with a token.
   * Reset the form on initialization.
   */
  setToken(token: string): Promise<void>;

  /**
   * Returns available payment methods, excluding quick payment options.
   */
  getRegularMethods(country?: string): Promise<PaymentMethod[]>;

  /**
   * Returns available quick payment options, e.g., Apple Pay, Google Pay.
   */
  getQuickMethods(country?: string): Promise<PaymentMethod[]>;

  /**
   * Returns available payment methods, including quick payment options and saved payment methods.
   */
  getCombinedPaymentMethods(country?: string): Promise<CombinedPaymentMethods>;

  /**
   * Returns user’s saved methods.
   */
  getSavedMethods(): Promise<SavedMethod[]>;

  /**
   * Returns a user’s balance.
   */
  getUserBalance(): Promise<UserBalance>;

  /**
   * Returns financial information about the payment.
   */
  getFinanceDetails(): Promise<FinanceDetails | null>;

  /**
   * Returns available countries.
   */
  getCountryList(): Promise<{
    countryList: CountryResponse['countryList'];
    currentCountry: string;
  }>;

  /**
   * Returns available locales.
   */
  getAvailableLanguages(): Lang[];

  /**
   * Payment form.
   * Only one form can exist on a page at a time.
   */
  form: {
    /**
     * Callback to submit responses listening.
     * Receive the NextAction object with instructions about what action is needed next to complete the payment.
     * Actions:
     * 1. Redirect to external payment system.
     * 2. Process 3D-Secure.
     * 3. Show form errors.
     * 4. Show another form.
     * 5. Check payment status for completion.
     */
    onNextAction: (nextAction: NextAction) => void;

    /**
     * Form statuses:
     * 1. undefined - form is not initialized. Run form.init() to initialize.
     * 2. active - form is ready for user interaction.
     * 3. pending - form is waiting for the initialization and submission processes.
     */
    getStatus(): 'undefined' | 'active' | 'pending';

    /**
     * Initialize the form. Changes the form to the pending status.
     * Most payment methods require redirection to an external payment system.
     * returnUrl setting allows the payment system to redirect to this URL after the payment is completed.
     * accountId setting enables payment with a saved method.
     * isSaveMode setting allows you to save payment methods.
     * @throws InvalidConfiguration if accountId and isSaveMode are both defined.
     */
    init(formConfiguration: {
      paymentMethodId: number;
      returnUrl: string;
      country?: string;
      accountId?: number;
      isSaveMode?: boolean;
    }): Promise<{
      fields: Field[];
      financeDetails: FinanceDetails;
    }>;

    /**
     * Set form status - active.
     * The method activates the payment form to make the form available to a user.
     * Allows you to prepare components before a user can interact with them.
     */
    activate(): void;

    /**
     * Initiate form submit.
     * To get submit action response listen onNextAction events
     */
    submit(): void;
  };

  /**
   * Get the final payment status: Success or Error.
   * Calling this method breaks the previous connection.
   * Use the invoiceId argument after a return from the payment system.
   * @throws UndefinedFormError if you did not pass invoiceId and the initialized form does not exist.
   * @throws BreakConnectionError if the method is called again.
   */
  getStatus(invoiceId?: number): Promise<Status>;

  /**
   * Can be used instead of SDK components for creating custom components.
   * List of events will be added later.
   * Events between an app and Core Iframe.
   */
  events: {
    onCoreEvent: (event: Event) => void;
    send(event: Event): void;
  };
};
```

## Pay Station SDK components

### Regular components

| **Component**         | **Selector**               | **Status** |
| --------------------- | -------------------------- | ---------- |
| Payment Methods       | psdk-payment-methods       | ✅         |
| Saved Methods         | psdk-saved-methods         | ✅         |
| Payment Form Messages | psdk-payment-form-messages | ✅         |
| Checkbox              | psdk-checkbox              | ✅         |
| Select                | psdk-select                | ✅         |
| Apple Pay Button      | psdk-apple-pay             | ✅         |
| Google Pay Button     | psdk-google-pay-button     | ✅         |
| Submit Button         | psdk-submit-button         | ✅         |
| User Balance          | psdk-user-balance          | ✅         |
| Finance Details       | psdk-finance-details       | ✅         |
| Status                | psdk-status                | ✅         |

![Regular SDK web components](./readme_images/sdk_web_components_scheme.png 'Regular SDK web components')

Using SDK components is straightforward: you only need to paste the HTML tag of the component. SDK components are based on Web Components ([learn more](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)), and do not work with older browsers like Internet Explorer 11. But if you want to use them or want total control of HTML, you can implement your own component based on public events instead of using SDK components.

![SDK component state sync](./readme_images/component_state_sync.png 'SDK component state sync')

<hr />

### Secure components

| **Component**         | **Selector**     | **Status** |
| --------------------- | ---------------- | ---------- |
| Text Component        | psdk-text        | ✅         |
| Phone Component       | psdk-phone       | ✅         |
| Card Number Component | psdk-card-number | ✅         |

![SDK secure componentscheme](./readme_images/secure_component_scheme.png 'SDK secure componentscheme')

Secure components have access to sensitive user data, and are encapsulated in iframes. But the input iframe consists of HTML input only and can receive styles for customization. Client have access to other HTML components like errors, borders, title, icons, etc., that exist outside of the iframe (Web Component).

![Customizing secure components](./readme_images/customizing_secure_components.png 'Customizing secure components')

<hr />

### Special components

| **Component**         | **Selector**       | **Status** |
| --------------------- | ------------------ | ---------- |
| Legal                 | psdk-legal         | ✅         |
| LegalTermsComponent   | psdk-legal-terms   | ✅         |
| LegalCookiesComponent | psdk-legal-cookies | ✅         |
| LegalMorComponent     | psdk-legal-mor     | ✅         |
| LegalSupportComponent | psdk-legal-support | ✅         |
| LegalLinksComponent   | psdk-legal-links   | ✅         |
| Payment Form          | psdk-payment-form  | ✅         |
| ThreeDs               | psdk-3ds           | ✅         |
| TotalComponent        | psdk-total         | ✅         |

The `Payment Form` component creates missed payment form components to ensure the client does not omit required payment form components. The client receives a warning message from the SDK, but still allows users to complete the payment.

The `Legal` component contains information about Xsolla's legal documents. The client must include either this component or all related components (`LegalTermsComponent`, `LegalCookiesComponent`, `LegalMorComponent`, `LegalSupportComponent`, `LegalLinksComponent`) to display legal documents in the application in accordance with the agreement with Xsolla. Otherwise, the payment flow is blocked.

The `LegalTermsComponent`, `LegalCookiesComponent`, `LegalMorComponent`, `LegalSupportComponent`, `LegalLinksComponent` components contain information about Xsolla's legal documents. The client must include either all these components or only the `Legal` component to display legal documents in the application in accordance with the agreement with Xsolla. Otherwise, the payment flow is blocked.

The `ThreeDs` component contains the logic required to perform the necessary credit card checks in accordance with the 3DS procedure.

The `TotalComponent` component contains the total amount of the payment. The client must include current component to display total amount in the application. Otherwise, the payment flow is blocked.

## Pay Station SDK supported events

To provide greater flexibility of payment forms, you can send specific `postMessage` events from the payment UI independently. Based on a defined data structure and existing handlers, you can request and process responses about payment method lists, deleted saved methods, etc. You can also create your own handlers to process data as needed. The list of available events and handlers included in the SDK is shown in the table below.

> Refer to the [working example](./examples/events) for detailed information.

<table border="1">
<thead>
<tr>
<th>Handler</th>
<th>Event name (Enum)</th>
<th>Event name (string)</th>
<th>Payload</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>getUserBalanceValueHandler</td>
<td>EventName.getUserBalanceValue</td>
<td>getUserBalanceValue</td>
<td>
<pre>
<code>
{
  name: EventName.getUserBalanceValue;
}
</code>
</pre>
</td>
<td>
Gets the user balance’s value, including amount and currency.
</td>
</tr>
<tr>
<td>submitHandler</td>
<td>EventName.submitForm</td>
<td>submitForm</td>
<td>
<pre>
<code>
{ name: EventName.submitForm; }
</code>
</pre></td>
<td>Submits the payment form.</td>
</tr>
<tr>
<td>setTokenHandler</td>
<td>EventName.initPayment</td>
<td>initPayment</td>
<td>
<pre>
<code>
{
  name: EventName.initPayment;
  data: {
    configuration: {
      token: string;
      isWebView: boolean;
      sandbox: boolean;
    }
  }
}
</code>
</pre>
</td>
<td>Initializes the payment form.</td>
</tr>
<tr>
<td>setSecureComponentStylesHandler</td>
<td>EventName.setSecureComponentStyles</td>
<td>setSecureComponentStyles</td>
<td>
<pre>
<code>
{
  name: EventName.setSecureComponentStyles;
  data: string;
}
</code>
</pre>
</td>
<td>Sets CSS styles for secure components.</td>
</tr>
<tr>
<td>getFinanceDetailsHandler</td>
<td>EventName.financeDetails</td>
<td>financeDetails</td>
<td>
<pre>
<code>
{
  name: EventName.financeDetails;
}
</code>
</pre>
</td>
<td>
Gets generated financial data of the purchase:
purchase composition, country, taxes, etc.
</td>
</tr>
<tr>
<td>getRegularMethodsHandler</td>
<td>EventName.getPaymentMethodsList</td>
<td>getPaymentMethodsList</td>
<td>
<pre>
<code>
{
  name: EventName.getPaymentMethodsList;
  data: {
    country: string | undefined;
    isSaveMethodMode: boolean | undefined;
  }
}
</code>
</pre>
</td>
<td>Returns a list of regular payment methods.</td>
</tr>
<tr>
<td>getQuickMethodsHandler</td>
<td>EventName.getPaymentQuickMethods</td>
<td>getPaymentQuickMethods</td>
<td>
<pre>
<code>
{
  name: EventName.getPaymentQuickMethods;
  data: {
    country?: string | undefined;
  },
}
</code>
</pre>
</td>
<td>Returns a list of quick payment methods.</td>
</tr>
<tr>
<td>getCombinedPaymentMethodsHandler</td>
<td>EventName.getCombinedPaymentMethods</td>
<td>getCombinedPaymentMethods</td>
<td>
<pre>
<code>
{
  name: EventName.getCombinedPaymentMethods;
  data: {
    country?: string | undefined;
  }
}
</code>
</pre>
</td>
<td>
Returns lists of payment methods, including quick payment methods, saved
methods, and others.
</td>
</tr>
<tr>
<td>getSavedMethodsHandler</td>
<td>EventName.getSavedMethods</td>
<td>getSavedMethods</td>
<td>
<pre>
<code>
{
  name: EventName.getSavedMethods;
}
</code>
</pre>
</td>
<td>Returns a list of saved payment methods.</td>
</tr>
<tr>
<td>getUserBalanceHandler</td>
<td>EventName.getUserBalance</td>
<td>getUserBalance</td>
<td>
<pre>
<code>
{
  name: EventName.getUserBalance;
}
</code>
</pre>
</td>
<td>
Returns user balance data to determine whether there are sufficient funds to
complete the payment.
</td>
</tr>
<tr>
<td>getPaymentStatusHandler</td>
<td>EventName.getPaymentStatus</td>
<td>getPaymentStatus</td>
<td>
<pre>
<code>
{
  name: EventName.getPaymentStatus;
  data: {
    url: string;
  }
}
</code>
</pre>
</td>
<td>Returns data on the payment status.</td>
</tr>
<tr>
<td>getCountryListHandler</td>
<td>EventName.getCountryList</td>
<td>getCountryList</td>
<td>
<pre>
<code>
{
  name: EventName.getCountryList;
}
</code>
</pre>
</td>
<td>Returns a list of countries.</td>
</tr>
<tr>
<td>getControlComponentConfigHandler</td>
<td>EventName.getControlComponentConfig</td>
<td>getControlComponentConfig</td>
<td>
<pre>
<code>
{
  name: EventName.getControlComponentConfig;
  data: {
    inputName: string;
  }
}
</code>
</pre>
</td>
<td>Returns the configuration of the payment UI elements’ controls.</td>
</tr>
<tr>
<td>getCashPaymentDataHandler</td>
<td>EventName.getCashPaymentData</td>
<td>getCashPaymentData</td>
<td>
<pre>
<code>
{
  name: EventName.getCashPaymentData;
}
</code>
</pre>
</td>
<td>Returns data on cash payment methods.</td>
</tr>
<tr>
<td>getLegalComponentConfigHandler</td>
<td>EventName.getLegalComponentConfig</td>
<td>getLegalComponentConfig</td>
<td>
<pre>
<code>
{
  name: EventName.getLegalComponentConfig;
}
</code>
</pre>
</td>
<td>Returns the configuration for the legal components.</td>
</tr>
<tr>
<td>deleteSavedMethodHandler</td>
<td>EventName.deleteSavedMethod</td>
<td>deleteSavedMethod</td>
<td>
<pre>
<code>
{
name: EventName.deleteSavedMethod,
  data: {
    paymentMethodId: string | null | undefined;
    savedMethodId: string | null | undefined;
    type: string | null | undefined;
  };
}
</code>
</pre>
</td>
<td>Allows to remove saved payment methods.</td>
</tr>
</tbody>
</table>

In addition to sending `postMessage` events, you can also subscribe to listen to them. The list of events and handlers that can be used for listening and data processing is shown in the table below. The **Response** column shows the raw data received from the `postMessage`.

> Refer to the [working example](./examples/events) for detailed information.

<table border="1">
<thead>
<tr>
<th>Event name (Enum)</th>
<th>Event name (string)</th>
<th>Handler</th>
<th>Response</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>EventName.formFieldsStatusChanged</td>
<td>formFieldsStatusChanged</td>
<td>formFieldsStatusChangedHandler</td>
<td>
<pre>
<code>
{
  name: EventName.formFieldsStatusChanged;
  data: {
    [key: string]: {
      name: string;
      validationStatus: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
      errors: null | {
          [key: string]: {
          [key: string]: unknown;
          message?: string;
        };
      };
      isFocused?: boolean;
      isTouched?: boolean;
    }
  }
}
</code></pre>
</td>
<td>Notifies about changes in the statuses of payment UI fields.</td>
</tr>
<tr>
<td>EventName.error</td>
<td>error</td>
<td>getErrorHandler</td>
<td>
<pre>
<code>
{
    data: {
        error: string
    }
}
</code></pre>
</td>
<td>Notifies about errors occurred during the payment process.</td>
</tr>
<tr>
<td>EventName.financeDetails</td>
<td>financeDetails</td>
<td>getFinanceDetailsHandler</td>
<td>
<pre>
<code>
{
  name: EventName.financeDetails;
  data: {
    purchase: object;
    finance: object;
    cartItems: array;
    cartSummary: object;
    paymentCountry: string;
  }
}
</code>
</pre>
</td>
<td>
Returns data on the purchase, including items, payment country,
and financial details.
</td>
</tr>
<tr>
<td>EventName.updateCreditCardType</td>
<td>updateCreditCardType</td>
<td>updateCreditCardTypeHandler</td>
<td>
<pre>
<code>
{
  name: EventName.updateCreditCardType;
  data: {
    cardType: string;
  }
}
</code>
</pre>
</td>
<td>Updates information about the bank card type.</td>
</tr>
<tr>
<td>EventName.applePayError</td>
<td>applePayError</td>
<td>applePayErrorHandler</td>
<td>
<pre>
<code>
{
    data: null | undefined | {
        error: string
    }
}
</code>
</pre>
</td>
<td>
Notifies about the error occurred during the payment with Apple Pay.
</td>
</tr>
<tr>
<td>EventName.openApplePayPage</td>
<td>openApplePayPage</td>
<td>openApplePayPageHandler</td>
<td>
<pre>
<code>
{
    data: null | undefined | {
        redirectUrl: string
    }
}
</code>
</pre>
</td>
<td>Notifies about opening of the Apple Pay payment page.</td>
</tr>
<tr>
<td>EventName.finishLoadComponent</td>
<td>finishLoadComponent</td>
<td>finishLoadComponentHandler</td>
<td>
<pre>
<code>
{
    data: null | undefined | {
        fieldName: string
    }
}
</code>
</pre>
</td>
<td>
Notifies about completion of the payment form component loading.
</td>
</tr>
<tr>
<td>EventName.formMessagesChanged</td>
<td>formMessagesChanged</td>
<td>getFormMessagesHandler</td>
<td>
<pre>
<code>
{
  data: string[];
}
</code>
</pre>
</td>
<td>Returns payment form events.</td>
</tr>
<tr>
<td>EventName.sendCashPaymentDataStatus</td>
<td>sendCashPaymentDataStatus</td>
<td>sendCashPaymentDataStatusHandler</td>
<td>
<pre>
<code>
{
  data: null | undefined | {
    status: 'succeed' | 'failed';
    type: 'sms' | 'email';
    errors: string[];
  }
}
</code>
</pre>
</td>
<td>Provides data on the payment status when cash methods are used.</td>
</tr>
</tbody>
</table>

## Pay Station SDK supported languages

- Arabic
- Bulgarian
- Burmese (Myanmar)
- Chinese (Simplified)
- Chinese (Traditional)
- Czech
- Dutch
- English
- Filipino (Tagalog)
- French
- German
- Hebrew
- Indonesian
- Italian
- Japanese
- Khmer (Cambodian)
- Korean
- Lao
- Malay
- Nepali
- Polish
- Portuguese
- Romanian
- Russian
- Spanish
- Thai
- Turkish
- Vietnamese

## Integration guide

To start using the Pay Station SDK, include the SDK bundle in your project. You can do this in any convenient way, such as adding the SDK bundle as npm-package.

> A working example can be found [here](./examples/select-method)

Regardless of the SDK adding method chosen, all integration steps are the same:

1. Include the SDK library in your project. It doesn't matter whether you are using an npm-package.
2. Access the `headlessCheckout` object, which contains the Pay Station initialization logic.
3. Initialize the SDK with your environment parameters.
4. Set the access token for the initialized SDK.
5. Place the Pay Station components in the HTML markup.
6. (Optional) Select the Pay Station components as regular HTML tags and subscribe on their events to implement additional logic using callbacks.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <!--
        Link the SDK bundle.
        NOTE: In this example, we use a local build for convenience.
        -->
    <script src="./dist/main.js"></script>
  </head>

  <body>
    <h1>Pay Station SDK</h1>

    <!--
    Define a specific Payments component in the HTML markup, e.g., `psdk-payment-methods`.
    The `country` attribute indicates the country for which the payment methods are being loaded.
    -->
    <psdk-payment-methods country="US"></psdk-payment-methods>

    <!-- Initialization script -->
    <script>
      if (typeof PayStationSdk === 'undefined') {
        alert(`
    It seems SDK library is undefined.
    Please, link PayStationSdk source or create local build (recommended to test purposes only).
            `);
      }
      /**
       * For more information about creating tokens,
       * please read https://developers.xsolla.com/api/pay-station/operation/create-token/
       */
      const accessToken = '';

      if (!accessToken) {
        alert(`No token provided. Please, check the documentation`);
      }
      async function initPayStationSdk() {
        /**
         * The SDK is available under the PayStationSdk namespace.
         * To begin initialization, obtain a reference to the headlessCheckout object.
         */
        const { headlessCheckout } = PayStationSdk;

        /**
         * Call the `init()` method with the provided environment object.
         * The isWebView parameter is required and indicates whether your
         * integration type is a webview.
         * Please note that this command executes asynchronously.
         */
        await headlessCheckout.init({
          isWebView: false,
        });

        /**
         * After the Payments SDK has been initialized, the next step is setting the token.
         * For more information about creating tokens,
         * please read https://developers.xsolla.com/api/pay-station/operation/create-token/
         */
        await headlessCheckout.setToken(accessToken);

        /**
         * To gain more control over Pay Station components,
         * you can access them as regular HTML elements.
         */
        const paymentMethods = document.querySelector('psdk-payment-methods');

        /**
         * To add extra logic to a component, you can subscribe to
         * its events and place your code in a callback function.
         */
        paymentMethods.addEventListener('selectionChange', (e) => {
          console.log(e);
        });
      }

      // run initialization script
      initPayStationSdk();
    </script>
  </body>
</html>
```

## PayPal integration guide

> A working example can be found [here](./examples/paypal)

Integration flow:

1. Add the SDK library to your project. You can use an npm-package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.

- The financial details component will be updated with transaction details once the payment is completed.

1. Initialize the SDK with your environment parameters.
1. Set the access token for the initialized SDK.
1. Initialize the payment form with the PayPal payment method ID and return URL.

- The return URL is used to redirect the user once payment is completed on PayPal’s side.
- `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.

1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps.

- Next action with the `redirect` type informs you that a redirect action is required on your side. You can get the URL to redirect from the action payload.

1. Add the form fields component to the HTML markup.

- Use the form object that was returned by `headlessCheckout.form.init` method to get form fields.
- Use fields with the `isMandatory` flag to get required fields only.
- Use the `<psdk-text>` component to render form fields if required. Email and ZIP fields can only be required for PayPal.

1. Add the `<psdk-submit-button>` form submit button to the HTML markup.
1. Handle next action with the `redirect` type once the submit button is clicked.

- Use action payload to get the URL. Make sure you add query parameters to the URL from action payload data.
- Redirect the user to the PayPal payment system using the generated URL.
- You can redirect to the PayPal URL in the same window or create a new window and keep the payment form in a separate tab. Once payment is completed on PayPal’s side, a user is redirected to `returnUrl`.

1. Add the `<psdk-status>` component to the HTML markup to see the payment status.

## Credit card integration guide

> A working example can be found [here](./examples/credit-card).

Integration flow:

1. Add the SDK library to your project. You can use an npm package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.
   - The financial details component are updated with transaction details once the payment is completed.
1. Initialize the SDK with your environment parameters.
1. Set the access token for the initialized SDK.
1. Initialize the payment form with the Credit Card payment method ID and return URL (necessary for 3-D Secure transactions).
   - The return URL redirects the user once payment is completed on the 3-D Secure’s side.
   - The `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.
1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps:
   - The `NextAction` with the `show_fields` type means that the form needs to render extra fields, e.g., for Brazilian credit cards. You must remove previously added fields and render new fields for this step.
   - 3-D Secure verification can be handled either by the acquirer's built-in mechanism or through an external [MPI](https://en.wikipedia.org/wiki/Merchant_plug-in), which authenticates a cardholder and forwards the result to the acquirer.
   - **3DS via external MPI**: The Next action with the `redirect` type means the form is redirected to complete payment according to the 3DS procedure. See also [Special cases for 3DS via external MPI](#special-cases-for-3ds-via-external-mpi).
   - **3DS via built-in method**: The `NextAction` with the `3DS` type means the user's card must be verified according to the procedure triggered by acquirer. When an additional user action (the challenge flow) is required, the `3DS` event is triggered along with the `data` object. Pass this object to the `ThreeDs` component as the `data-challenge` attribute (refer to the [example](./examples/credit-card)). The component opens a new browser tab where the user can authorize the payment.
1. Add the form fields component to the HTML markup.
   - Use the form object that was returned by `headlessCheckout.form.init` method to get form fields.
   - Use fields with the `isMandatory` flag to get required fields only.
   - Use the `<psdk-text>` component to render form fields if required. For a field named `card_number` you must use the `<psdk-card-number>` component.
1. Add the `<psdk-submit-button>` form submit button to the HTML markup.
1. Add the `<psdk-status>` component to the HTML markup to see the payment status.
1. Create a `return` page.
1. Add the `<psdk-finance-details>`, `<psdk-status>` and `<psdk-legal>` components to the created `return` page to show a payment status.
1. Set accessToken at `headlessCheckout.setToken`. Run `headlessCheckout.init` to initialize the headless checkout library.

### Special cases for 3DS via external MPI

If you embed the payment interface in an iframe, be aware that some ACS providers implement the 3DS challenge flow by performing an additional redirect using:

```js
window.top.location.href = 'redirect_url';
```

When such a provider is loaded inside an iframe, this redirect targets the entire page — not just the iframe — and modern browsers block this behavior for security reasons.

To handle this, redirect the user in a new browser tab for those cases.

> ⚠️ Important: The redirect must be triggered by a trusted user interaction for the new tab to open reliably.

To test this behavior, handle the `isNewWindowRequired` parameter in the `redirect` NextAction payload using the [Japanese test cards](https://developers.xsolla.com/doc/pay-station/testing/test-cards/?tabs=100-Visa_200-Japan&_xm=403441203812630597) with 3-D Secure in the sandbox mode.

> You can find an example of using `isNewWindowRequired` [here](./examples/credit-card).

## Google Pay integration guide

> A working example can be found [here](./examples/google-pay).

Integration flow:

1. Add the SDK library to your project. You can use an npm package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.

- The financial details component are updated with transaction details once the payment is completed.

1. Initialize the SDK with your environment parameters.
1. Set the access token for the initialized SDK.
1. Initialize the payment form with the Google Pay payment method ID and return URL.

- The `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.

1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps.

- The Next action with the `check_status` type means that you need to render the status component.
- The Next action with the `special_button` type means that you need to render the special button component (in our case it is the Google Pay button).

1. Add a form message component to the form - `<psdk-payment-form-messages>`.
1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Add the `<psdk-submit-button>` form submit button to the HTML markup.
1. Create a `return` page.
1. Add the `<psdk-finance-details>`, `<psdk-status>`, and `<psdk-legal>` components to the created `return` page to show a payment status.
1. Set accessToken at `headlessCheckout.setToken`. Run `headlessCheckout.init` to initialize the headless checkout library.

## Apple Pay integration guide

> A working example can be found [here](./examples/apple-pay).

Features of the payment system:

1. An Apple Pay payment can only be made on a supported device.
1. On the `PayStationSdk` side, only the possibility of payment on this device is checked, all necessary data is checked, and a new tab is opened where the payment itself will be made - https://secure.xsolla.com/paystation4/payment/external-pages/apple-pay.
1. For the convenience of users, the `PayStationSdk` the `<psdk-apple-pay>` component is integrated into the `<psdk-submit-button>` component.

Integration flow:

1. Add the SDK library to your project. You can use an npm package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.

- The financial details component are updated with transaction details once the payment is completed.

1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps.

- The Next action with the `check_status` type means that you need to render the status component.
- The Next action with the `hide_form` type informs you that can hide payment form with css.
- The Next action with the `show_errors` type means that you need to show errors messages and payment can't be completed.

1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Initialize the payment form with the Apple-pay payment method ID and return URL.

- The `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.

1. Add the `<psdk-submit-button>` form submit button to the HTML markup.

To configure one-click payment via Apple Pay:

1. Create a request to enable this option. To do so:

   a. Open your Publisher Account and go to the [Support Hub](https://publisher.xsolla.com/0/support-hub) section.

   b. Click **Submit request**.

   c. In the window that opens, fill in the fields:

   - **Summary**. For example, _Apple Pay one-click payment setup_.

   - **Description**. Specify the domain used for opening the payment UI, e.g., `amazing.store.com`.

   - **Project ID**. Select a project ID from the drop-down list. If you want to configure the one-click payment option for multiple projects, specify their IDs in the Description field.

   d. Click **Send**.

2. Wait for your domain association file. This step is performed by Xsolla:

   a. Xsolla registers your domain with Apple.

   b. Xsolla receives the domain association file from Apple.

   c. Xsolla emails you the domain association file and provides instructions on where to upload it.

> Note: To ensure that automatic verification of the domain association file completes successfully, check that it is accessible via network requests.

3. Update the SDK initialization script as shown below:

```typescript
const config: InitialOptions = {
  isWebview: false,
  theme: 'default',
  language: parameters.language,
  topLevelDomain: 'amazing.store.com',
  isApplePayInstantFlowEnabled: true,
};

await initHeadlessCheckoutLib(config);
```

## SDK payment methods integration guide (Barzahlen, Naver, Venmo, etc.)

> A working example can be found [here](./examples/sdk-payment-methods).

Integration flow:

1. Add the SDK library to your project. You can use an npm package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.

- The financial details component are updated with transaction details once the payment is completed.

1. Initialize the SDK with your environment parameters.
1. Set the access token for the initialized SDK.
1. Initialize the payment form with the SDK payment method ID and return URL.

- The `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.

1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps.

- Next action with the `redirect` type informs you that a redirect action is required on your side. You can get the redirect URL from the action payload.

1. Add a form message component to the form - `<psdk-payment-form-messages>`.
1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Add the `<psdk-submit-button>` form submit button to the HTML markup.
1. Create a `return` page.
1. Add the `<psdk-finance-details>`, `<psdk-status>`, and `<psdk-legal>` components to the created `return` page to show a payment status.
1. Set accessToken at `headlessCheckout.setToken`. Run `headlessCheckout.init` to initialize the headless checkout library.

## QR code payment integration guide

> A working example can be found [here](./examples/qr-code).

Integration flow:

1. Add the SDK library to your project. You can use an npm package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.

- The financial details component are updated with transaction details once the payment is completed.

1. Initialize the SDK with your environment parameters.
1. Set the access token for the initialized SDK.
1. Initialize the payment form with the QR code payment method ID and return URL.

- The `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.

1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps.

- The Next action with the `redirect` type informs you that a redirect action is required on your side. You can get the redirect URL from the action payload.
- The Next action with the `show_qr_code` type means that you need to render the QR code component.
- The Next action with the `check_status` type means that you need to render the status component.

1. Add a form message component to the form - `<psdk-payment-form-messages>`.
1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Add the `<psdk-submit-button>` form submit button to the HTML markup.
1. Create a `return` page.
1. Add the `<psdk-finance-details>`, `<psdk-status>`, and `<psdk-legal>` components to the created `return` page to show a payment status.
1. Set accessToken at `headlessCheckout.setToken`. Run `headlessCheckout.init` to initialize the headless checkout library.

## Mobile payment integration guide

> A working example can be found [here](./examples/mobile-payment).

Integration flow:

1. Add the SDK library to your project. You can use an npm package.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Add the `<psdk-finance-details>` component to the HTML markup to show purchase details.

- The financial details component are updated with transaction details once the payment is completed.

1. Initialize the SDK with your environment parameters.
1. Set the access token for the initialized SDK.
1. Initialize the payment form with the QR code payment method ID and return URL.

- The `headlessCheckout.form.init` method returns the form object that can be used for future work with the payment form.

1. Subscribe to events of the `NextActions` form to receive notifications about the next payment flow steps.

- The Next action with the `redirect` type informs you that a redirect action is required on your side. You can get the redirect URL from the action payload.
- The Next action with the `show_mobile_payment_screen` type means that you need to render new submit button.
- The Next action with the `check_status` type means that you need to render the status component.

1. Add a form message component to the form - `<psdk-payment-form-messages>`.
1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Add the `<psdk-submit-button>` form submit button to the HTML markup.
1. Create a `return` page.
1. Add the `<psdk-finance-details>`, `<psdk-status>`, and `<psdk-legal>` components to the created `return` page to show a payment status.
1. Set accessToken at `headlessCheckout.setToken`. Run `headlessCheckout.init` to initialize the headless checkout library.

## Payment via user balance

1. If the user has sufficient virtual balance for full payment, a form for payment by balance will always be returned, regardless of the method passed when initiating the payment form using `headlessCheckout.form.init({...})`.
2. Payment by balance will be reflected in the `<psdk-finance-details>` component.
3. The user balance can also be displayed using the `<psdk-user-balance>` component.
4. The user balance can be obtained using the `headlessCheckout.getUserBalance()` method.

## Saved payment methods

### Save method integration guide

> A working example can be found [here](./examples/save-payment-method).

Integration flow:

1. Add the SDK library to your project. You can use an npm-package or CDN link.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Display methods that can be saved `<psdk-payment-methods save-method-mode='true'></psdk-payment-methods>`.
1. Handle the selection of the payment method with `selectionChange` event.
1. Add a form message component to the form - `<psdk-payment-form-messages>`.
1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Initialize the payment form with the `{ paymentMethodId: ${id}, savePaymentMethod: true, returnUrl: ${returnUrl}}` parameters, where `event.detail.paymentMethodId` is from the `selectionChange` event.
1. Handle the next action event.

### Delete saved method integration guide

> A working example can be found [here](./examples/saved-methods).

Integration flow:

1. Add the SDK library to your project. You can use an npm-package or CDN link.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Display saved methods using the `<psdk-saved-methods>` component.
1. To make the delete saved method button appear, you need to add the `delete-mode='true'` attribute to the `<psdk-saved-methods>` component.
1. Handle the deleted saved method event - `deletedSavedMethodStatus`. This is optional. It can be used to display an informational message.

### Payment via saved method integration guide

> A working example can be found [here](./examples/payment-via-saved-method).

Integration flow:

1. Add the SDK library to your project. You can use an npm-package or CDN link.
1. Access the `headlessCheckout` object that contains the Pay Station initialization logic.
1. Add the `<psdk-legal>` component to the HTML markup to provide links to legal documents.
1. Display saved methods using the `<psdk-saved-methods>` component.
1. Handle the selection of the payment method with the `savedMethodSelected` event.
1. Add a form message component to the form - `<psdk-payment-form-messages>`.
1. Add a payment form component to the form - `<psdk-payment-form>`.
1. Initialize the payment form with the `{ paymentMethodId: ${id}, paymentWithSavedMethod: true, savedMethodId, returnUrl: ${returnUrl}}` parameters, where `paymentMethodId` and `savedMethodId` are from the `savedMethodSelected` of the `event.details` parameter.
1. Handle the next action event.

## Payment country

### Changing country

> A working example can be found [here](./examples/changing-country).

Where can the country value be used?

1. When initializing the form using `headlessCheckout.form.init({ ..., country: ${countryISO} })`.
2. When passing it as an attribute for the `<psdk-payment-methods country="${countryISO}></psdk-payment-methods>` component.

How to get the country value?

1. To get the list of available countries, use the `headlessCheckout.getCountryList()` method.
1. You can use the ready-made component - `<psdk-select type='country'></psdk-select>`. When using this component, you need to listen for the `userCountryChanged` event.

## Localization

### Changing locales

Where can the language value be used?

1. The language value can be used when initializing `headlessCheckout` - `init({ language?: Lang; })`. Lang - `src/core/i18n/lang.enum.ts`.

How can I get the value of the available locale?

1. You can get the list of locales by using the `headlessCheckout.getAvailableLanguages()` method.

## Default styles

## Using default styles

> A working example can be found [here](./examples/default-styles).

1. To use the default styles of the SDK components, you need to connect the style.css file to your HTML document.
2. To use the default styles of the secure components, you need to pass the `theme: 'default'` parameter when initializing `headlessCheckout`.

## Edge cases

### Payment flow with unsupported country

When attempting to make a payment with a selected country that is not supported in the Pay Station SDK, the payment API will return an error message.
You can find an example [here](./examples/unsupported-country).
