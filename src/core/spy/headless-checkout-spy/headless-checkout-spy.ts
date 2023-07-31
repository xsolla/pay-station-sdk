import { singleton } from 'tsyringe';

@singleton()
export class HeadlessCheckoutSpy {
  private _appWasInit = false;
  private readonly _callbacks: Array<() => void> = [];

  public set appWasInit(value: boolean) {
    if (this._appWasInit === value) {
      return;
    }
    this._appWasInit = value;
    if (value) {
      this.appWasInitHandler();
    }
  }

  public get appWasInit(): boolean {
    return this._appWasInit;
  }

  public listenAppInit(callback: () => void): void {
    this._callbacks.push(callback);
  }

  private appWasInitHandler(): void {
    this._callbacks.forEach((callback) => callback());
  }
}
