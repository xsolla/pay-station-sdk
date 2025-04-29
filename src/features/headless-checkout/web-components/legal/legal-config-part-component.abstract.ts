import { container } from 'tsyringe';
import { EventName } from '../../../../core/event-name.enum';
import { Message } from '../../../../core/message.interface';
import { PostMessagesClient } from '../../../../core/post-messages-client/post-messages-client';
import { getLegalComponentConfigHandler } from '../../post-messages-handlers/get-legal-component-config.handler';
import { LegalComponentConfig } from './legal-component.config.interface';
import { LegalPartComponentAbstract } from './legal-part-component.abstract';

export abstract class LegalConfigPartComponentAbstract extends LegalPartComponentAbstract {
  protected readonly postMessagesClient: PostMessagesClient;
  protected config?: LegalComponentConfig;

  public constructor() {
    super();
    this.postMessagesClient = container.resolve(PostMessagesClient);
  }

  protected connectedCallback(): void {
    if (!this.headlessCheckoutSpy.appWasInit) {
      this.headlessCheckoutSpy.listenAppInit(() => this.connectedCallback());
      return;
    }
    this.postMessagesClient.listen(
      EventName.getLegalComponentConfig,
      getLegalComponentConfigHandler,
      (config) => {
        if (config) {
          this.configLoadedHandler(config);
        }
      },
    );

    void this.getLegalComponentConfig();
  }

  protected readonly configLoadedHandler = (
    config: LegalComponentConfig,
  ): void => {
    this.config = config;
    super.render();
    if (this.config) this.listenPings();
  };

  protected async getLegalComponentConfig(): Promise<LegalComponentConfig> {
    const msg: Message = {
      name: EventName.getLegalComponentConfig,
    };

    return this.postMessagesClient.send<LegalComponentConfig>(
      msg,
      getLegalComponentConfigHandler,
    ) as Promise<LegalComponentConfig>;
  }
}
