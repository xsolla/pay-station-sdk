# Xsolla Pay Station SDK

- [What is Pay Station SDK?](#what-is-pay-station-sdk)
- [Installing with npm-package](#installing-with-npm-package)
- [General integration scheme](#general-integration-scheme)
- [PaymentSdk library interface](#paymentsdk-library-interface)
- [Pay Station SDK components](#pay-station-sdk-components)
  - [Regular components](#regular-components)
  - [Secure components](#secure-components)
  - [Special components](#special-components)
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
declare const HeadlessCheckout: {
  /**
   * Load secure Core Iframe.
   * Load components to CustomElementRegistry. https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
   */
  init(environment: { isWebview: boolean }): Promise<void>;

  /**
   * Initialize the payment with a token.
   * Reset the form on initialization.
   */
  setToken(token: string): Promise<void>;

  /**
   * Get all payment methods, including saved accounts.
   * Use a country token if it hasn't been passed yet.
   * regular - list of available payment methods sorted according to relevance.
   * quick - list of available quick payment methods, e.g., Google and Apple Pay buttons.
   * saved - list of saved user payment accounts.
   * balance - special payment method for users that have an Xsolla balance. Null if the balance is not sufficient for the payment.
   */
  getMethods(country?: string): Promise<{
    regular: PaymentMethod[];
    quick: PaymentMethod[];
    saved: Account[];
    balance: PaymentMethod | null;
  }>;

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
   * Delete saved user account.
   */
  deleteAccount(accountId: number): Promise<void>;

  /**
   * Can be used instead of SDK components for creating custom components.
   * List of events will be added later.
   * Events between an app and Core Iframe.
   */
  events: {
    onCoreEvent: (event: Event) => void;
    send(event: Event): void;
  };

  /**
   * Create an iframe with secure elements like form input and use it for component creation.
   */
  createSecureComponent(name: string): HTMLIFrameElement;
};
```

## Pay Station SDK components

### Regular components

| **Component**         | **Selector**         | **Status** |
| --------------------- | -------------------- | ---------- |
| Apple Pay Button      | ❔                   | 🕑         |
| Checkbox              | ❔                   | 🕑         |
| Delete Account Button | ❔                   | 🕑         |
| Finance Details       | ❔                   | 🕑         |
| Google Pay Button     | ❔                   | 🕑         |
| Payment Form Messages | ❔                   | 🕑         |
| Payment Methods       | psdk-payment-methods | ✅         |
| Receipt               | ❔                   | 🕑         |
| Saved Methods         | ❔                   | 🕑         |
| Select                | ❔                   | 🕑         |
| Status                | ❔                   | 🕑         |
| Submit                | psdk-submit-button   | ✅         |
| User Balance          | ❔                   | 🕑         |

![Regular SDK web components](./readme_images/sdk_web_components_scheme.png 'Regular SDK web components')

Using SDK components is straightforward: you only need to paste the HTML tag of the component. SDK components are based on Web Components ([learn more](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)), and do not work with older browsers like Internet Explorer 11. But if you want to use them or want total control of HTML, you can implement your own component based on public events instead of using SDK components.

![SDK component state sync](./readme_images/component_state_sync.png 'SDK component state sync')

<hr />

### Secure components

| **Component**         | **Selector**     | **Status** |
| --------------------- | ---------------- | ---------- |
| Card Number Component | psdk-card-number | ✅         |
| Phone Component       | ❔               | 🕑         |
| Text Component        | ❔               | 🕑         |

![SDK secure componentscheme](./readme_images/secure_component_scheme.png 'SDK secure componentscheme')

Secure components have access to sensitive user data, and are encapsulated in iframes. But the input iframe consists of HTML input only and can receive styles for customization. Client have access to other HTML components like errors, borders, title, icons, etc., that exist outside of the iframe (Web Component).

![Customizing secure components](./readme_images/customizing_secure_components.png 'Customizing secure components')

<hr />

### Special components

| **Component** | **Selector** | **Status** |
| ------------- | ------------ | ---------- |
| Legal         | ❔           | 🕑         |
| Payment Form  | ❔           | 🕑         |

The `Payment Form` component creates missed payment form components to ensure the client does not omit required payment form components. The client receives a warning message from the SDK, but still allows users to complete the payment.

The `Legal` component contains information about Xsolla's legal documents. Client has to include this component and display legal documents in their application in accordance with their agreement with Xsolla. Otherwise, the payment flow is blocked.

## Pay Station SDK supported languages

- Arabic
- Bulgarian
- Chinese (Simplified)
- Chinese (Traditional)
- Czech
- English
- French
- German
- Hebrew
- Italian
- Japanese
- Korean
- Polish
- Portuguese
- Romanian
- Russian
- Spanish
- Thai
- Turkish
- Vietnamese

## Integration guide

To start using the Pay Station SDK, include the SDK bundle in your project. You can do this in any convenient way, such as adding the SDK bundle as npm-package or simply adding a CDN link in the `<script>` HTML tag.

> A working example can be found [here](./examples/cdn)

Regardless of the SDK adding method chosen, all integration steps are the same:

1. Include the SDK library in your project. It doesn't matter whether you are using an npm-package or a CDN link.
2. Access the `headlessCheckout` object, which contains the Pay Station initialization logic.
3. Initialize the SDK with your environment parameters.
4. Set the access token for the initialized SDK.
5. Place the Pay Station components in the HTML markup.
6. (Optional) Select the Pay Station components as regular HTML tags and subscribe on their events to implement additional logic using callbacks.

```html
<!DOCTYPE html>
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
    Please, link CDN source or create local build (recommended to test purposes only).
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
