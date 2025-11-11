import { container } from 'tsyringe';
import { EventName } from '../../../../core/event-name.enum';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { isRequiredComponentPingMessage } from '../../../../core/guards/required-component/required-component-ping-message.guard';

export abstract class LegalPartComponentAbstract extends WebComponentAbstract {
  protected abstract readonly componentName: string;
  protected readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  protected readonly window: Window;

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.window = container.resolve(Window);
  }

  protected abstract getLegalPartHtml(): string;

  protected getHtml(): string {
    const legalPartHtml = this.getLegalPartHtml();
    return legalPartHtml !== '' ? ` ${legalPartHtml} ` : ''; // Return with spaces to prevent collapsing in some browsers
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    this.render();
    this.listenPings();
  }

  protected listenPings(): void {
    this.window.addEventListener('message', this.pingCallback);
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();
    this.window.removeEventListener('message', this.pingCallback);
  }

  private readonly pingCallback = (message: MessageEvent): void => {
    const data = this.getJsonOrNull(message?.data);
    if (
      !isRequiredComponentPingMessage(data) ||
      data.data?.componentName !== this.componentName
    ) {
      return;
    }
    message.source?.postMessage(
      JSON.stringify({
        name: EventName.requiredComponentPong,
        data: { componentName: this.componentName },
      }),
      message.origin as WindowPostMessageOptions,
    );
  };
}
