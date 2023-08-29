# Web Components

Before creating web components, it is worth familiarizing yourself with the following resource: [https://javascript.info/web-components](https://javascript.info/web-components).

All components are located in `src/features/headless-checkout/web-components`.

### Creating a Component

To create a component, you need to create a directory inside `src/features/headless-checkout/web-components`.

#### Requirements:

1. The component should inherit from `WebComponentAbstract`, and secure components should extend from `SecureComponentAbstract`.
2. The tag name for the component should be added to `src/core/web-components/web-component-tag-name.enum.ts`.
3. The component should be added to `src/core/web-components/web-components.map.ts`. This step is necessary for registering the component using `customElements.define()`.
   Example:
   ```typescript
   export const webComponents: {
     [key in WebComponentName]: CustomElementConstructor;
   } = {
     [WebComponentName.CardNumberComponent]: CardNumberComponent,
     [WebComponentName.SubmitButtonComponent]: SubmitButtonComponent,
   };
   ```
4. Need to export a component from a file `src/web-components.ts`

### Using External Services within Web Components

Since a web component cannot accept constructor arguments, it is advisable to use dependency injection. In this case, you can use the `tsyringe` library.
Here is an example of adding an external service to a web component:

```typescript
import { singleton } from 'tsyringe';

@singleton() // Use the appropriate variant based on the situation
export class PostMessagesClient {
  public headlessAppUrl = headlessCheckoutAppUrl;
  // Some code...
}

export class SubmitButtonComponent extends WebComponentAbstract {
  private readonly postMessagesClient: PostMessagesClient;
  private elementRef!: HTMLButtonElement;

  public constructor() {
    super();
    this.postMessagesClient = container.resolve(PostMessagesClient); // Inject the service
  }

  protected connectedCallback(): void {
    this.postMessagesClient.send({ data: 'message' });
    // Some code...
  }

  protected disconnectedCallback(): void {
    // Some code...
  }
}
```

### Usage on the Partner Side

The partner can use web components after calling the `headlessCheckout.init()` method.

```typescript
import {
  headlessCheckout,
  SubmitButtonComponent,
} from '@xsolla/pay-station-sdk';

headlessCheckout.init({
  isWebView: false,
});

const submitButton = window.document.createElement(new SubmitButtonComponent());
//some code
```

`payment-form.component.html`

```html
<psdk-submit-button text="Pay now"></psdk-submit-button>
```
