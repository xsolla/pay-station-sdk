import { Handler } from './handler.type';
import { Message } from './message.interface';
import { singleton } from 'tsyringe';

@singleton()
export class PostMessagesClient {
  private recipientUrl!: string;
  private recipient!: HTMLIFrameElement;
  private get noRecipient(): boolean {
    return !(this.recipientUrl && this.recipient);
  }

  public constructor(private readonly window: Window) {}

  public init(recipient: HTMLIFrameElement, recipientUrl: string): void {
    this.recipient = recipient;
    this.recipientUrl = recipientUrl;
  }

  public async send<T>(msg: Message, handler: Handler<T>): Promise<T | void> {
    if (this.noRecipient) {
      throw new Error('No recipient for post messages.');
    }

    return new Promise((resolve) => {
      const handlerWrapper = (message: MessageEvent): void => {
        if (this.isSameOrigin(message.origin)) {
          const data = JSON.parse(message.data);
          const handledData: { isHandled: boolean; value?: T } | null =
            handler(data);
          if (handledData) {
            this.window.removeEventListener('message', handlerWrapper);
            if (handledData.value) {
              resolve(handledData.value);
              return;
            }
            resolve();
          }
        }
      };

      this.window.addEventListener('message', handlerWrapper);
      this.sendMessage(msg);
    });
  }

  private sendMessage(message: Message): void {
    this.recipient.contentWindow?.postMessage(
      JSON.stringify(message),
      this.recipientUrl
    );
  }

  private isSameOrigin(messageOrigin: string): boolean {
    const recipientOrigin = new URL(this.recipientUrl).origin;
    return messageOrigin === recipientOrigin;
  }
}
