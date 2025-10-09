import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { HeadlessCheckout } from '../../headless-checkout';
import { RedirectAction } from '../../../../core/actions/redirect/redirect.action.type';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { ReturnListenerComponentAttributes } from './return-listener-component-attributes.enum';

export class ReturnListenerComponent extends WebComponentAbstract {
  protected readonly window: Window;
  protected readonly headlessCheckout: HeadlessCheckout;
  protected readonly postMessagesClient: PostMessagesClient;
  protected popup: Window | null = null;

  public constructor() {
    super();
    this.window = container.resolve(Window);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    super.connectedCallback();
    this.handleReturnLogic();
  }

  protected getHtml(): string {
    return ``;
  }

  private handleReturnLogic(): void {
    this.headlessCheckout.form.onNextAction((nextAction) => {
      if (nextAction.type === 'redirect') {
        this.handleRedirectAction(nextAction);
      }
    });
  }

  private get backUrl(): string {
    const backUrl = this.getAttribute(
      ReturnListenerComponentAttributes.backUrl,
    );
    if (!backUrl) {
      throw new Error('backUrl attribute is required');
    }
    return backUrl;
  }

  private handleRedirectAction(nextAction: RedirectAction): void {
    /**
     * Build PayPal redirect URL with required parameters.
     * The redirect URL contains the PayPal payment page where user will complete the payment.
     * Additional data parameters are appended as query parameters.
     */
    const url = new URL(nextAction.data.redirect.redirectUrl);
    const params = Object.entries(nextAction.data.redirect.data);
    params.forEach((entry) => {
      const [key, value] = entry;
      url.searchParams.append(key, value);
    });

    /**
     * Open PayPal payment page in a new popup window.
     * This allows user to complete payment without leaving the main application.
     */
    this.popup = window.open(url.toString());

    if (!this.popup) {
      console.warn(
        'Popup was blocked by browser. Please allow popups for this site.',
      );
      return;
    }

    /**
     * Listen for messages from the return page.
     * The return page (opened by PayPal after payment completion) will send
     * a postMessage with payment status information back to this parent window.
     */
    window.addEventListener('message', (event: MessageEvent) => {
      const data = event.data as { type?: string; searchParams?: string };
      if (data && typeof data === 'object' && data.type === 'statusUrl' && typeof data.searchParams === 'string') {
        /**
         * Close the PayPal popup window since payment flow is complete
         */
        this.popup?.close();

        /**
         * Build status page URL with payment parameters received from PayPal.
         * These parameters contain payment status, transaction ID, and other details.
         */
        const pathWithParams = `${this.backUrl}${data.searchParams}`;

        /**
         * Clean up SDK resources before navigation
         */
        this.headlessCheckout.destroy();

        /**
         * Navigate to status page to display payment results.
         * Using direct navigation instead of router for simplicity.
         */
        this.window.location.href = pathWithParams;
      }
    });
  }
}
