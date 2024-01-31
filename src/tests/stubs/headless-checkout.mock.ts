import { Handler } from '../../core/post-messages-client/handler.type';

export class HeadlessCheckoutMock<T> {
  public events = {
    onCoreEvent: (
      name: string,
      handler: Handler<string>,
      callback: (value: T | null) => void
    ): void => {
      this.addEventListener(callback);
    },
  };
  private readonly listeners: Array<(value: T | null) => void> = [];

  public addEventListener(callback: (value: T | null) => void): void {
    this.listeners.push(callback);
  }

  public emitEvent(value: T | null): void {
    this.listeners.forEach((callback) => callback(value));
  }
}
