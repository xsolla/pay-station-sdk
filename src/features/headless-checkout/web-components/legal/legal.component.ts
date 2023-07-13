import { WebComponentAbstract } from '../../../../core/web-components/web-component.abstract';
import { container } from 'tsyringe';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { legalPingHandler } from './handlers/legal-ping-handler';
import { EventName } from '../../../../core/event-name.enum';
import { HeadlessCheckout } from '../../headless-checkout';
import { legalPongHandler } from './handlers/legal-pong.handler';
import { getLegalComponentTemplate } from './legal.component.tempate';
import { Message } from '../../../../core/message.interface';
import { HeadlessCheckoutSpy } from '../../../../core/headless-checkout-spy/headless-checkout-spy';
import { getLegalComponentConfigHandler } from '../../post-messages-handlers/get-legal-component-config.handler';
import { LegalComponentConfig } from './legal-component.config.interface';

export class LegalComponent extends WebComponentAbstract {
  private readonly postMessagesClient: PostMessagesClient;
  private readonly headlessCheckout: HeadlessCheckout;
  private readonly headlessCheckoutSpy: HeadlessCheckoutSpy;
  private config?: LegalComponentConfig;
  private subscription?: () => void;

  public constructor() {
    super();
    this.headlessCheckoutSpy = container.resolve(HeadlessCheckoutSpy);
    this.headlessCheckout = container.resolve(HeadlessCheckout);
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    void this.getLegalComponentConfig().then(this.configLoadedHandler);
  }

  protected readonly configLoadedHandler = (
    config: LegalComponentConfig
  ): void => {
    this.config = config;

    super.render();

    if (this.config) {
      this.listenPings();
    }
  };

  protected listenPings(): void {
    this.subscription = this.headlessCheckout.events.onCoreEvent(
      EventName.legalComponentPing,
      legalPingHandler,
      this.pongCallback
    );
  }

  protected disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.subscription) {
      this.subscription();
    }
  }

  protected async getLegalComponentConfig(): Promise<LegalComponentConfig> {
    const msg: Message = {
      name: EventName.getLegalComponentConfig,
    };

    return this.postMessagesClient.send<LegalComponentConfig>(
      msg,
      getLegalComponentConfigHandler
    ) as Promise<LegalComponentConfig>;
  }

  protected getHtml(): string {
    if (this.config) {
      return getLegalComponentTemplate(this.config);
    }
    return '';
  }

  private readonly pongCallback = (): void => {
    void this.headlessCheckout.events.send(
      { name: EventName.legalComponentPong },
      legalPongHandler
    );
  };
}
