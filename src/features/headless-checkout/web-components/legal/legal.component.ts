import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { EventName } from '../../../../core/event-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { getLegalComponentTemplate } from './legal.component.tempate';
import { Message } from '../../../../core/message.interface';
import { HeadlessCheckoutSpy } from '../../../../core/spy/headless-checkout-spy/headless-checkout-spy';
import { getLegalComponentConfigHandler } from '../../post-messages-handlers/get-legal-component-config.handler';
import { LegalComponentConfig } from './legal-component.config.interface';
import { isEventMessage } from '../../../../core/guards/event-message.guard';
import './legal.component.scss';

export class LegalComponent extends WebComponentAbstract {
  private readonly componentName = 'LegalComponent';
  private readonly postMessagesClient: PostMessagesClient;
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private readonly window: Window;
  private config?: LegalComponentConfig;

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.postMessagesClient = container.resolve(PostMessagesClient);
    this.window = container.resolve(Window);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    void this.getLegalComponentConfig().then(this.configLoadedHandler);
  }

  protected readonly configLoadedHandler = (
    config: LegalComponentConfig,
  ): void => {
    this.config = config;
    super.render();
    if (this.config) {
      this.listenPings();
    }
  };

  protected listenPings(): void {
    this.window.addEventListener('message', this.pingCallback);
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();
    this.window.removeEventListener('message', this.pingCallback);
  }

  protected async getLegalComponentConfig(): Promise<LegalComponentConfig> {
    const msg: Message = {
      name: EventName.getLegalComponentConfig,
    };

    return this.postMessagesClient.send<LegalComponentConfig>(
      msg,
      getLegalComponentConfigHandler,
    ) as Promise<LegalComponentConfig>;
  }

  protected getHtml(): string {
    if (this.config) {
      return getLegalComponentTemplate(this.config);
    }
    return '';
  }

  private readonly pingCallback = (message: MessageEvent): void => {
    const data = this.getJsonOrNull(message?.data);
    if (
      !data ||
      !isEventMessage(data) ||
      data.name !== EventName.requiredComponentPing ||
      (data.data as { componentName: string }).componentName !==
        this.componentName
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
