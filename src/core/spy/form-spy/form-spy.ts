import { singleton } from 'tsyringe';

@singleton()
export class FormSpy {
  private _formWasInit = false;
  private readonly _callbacks: Array<() => void> = [];

  public set formWasInit(value: boolean) {
    if (this._formWasInit === value) {
      return;
    }
    this._formWasInit = value;
    if (value) {
      this.formWasInitHandler();
    }
  }

  public get formWasInit(): boolean {
    return this._formWasInit;
  }

  public listenFormInit(callback: () => void): void {
    this._callbacks.push(callback);
  }

  private formWasInitHandler(): void {
    this._callbacks.forEach((callback) => callback());
  }
}
