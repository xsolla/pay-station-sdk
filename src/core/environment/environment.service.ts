import { singleton } from 'tsyringe';
import {
  headlessCheckoutAppUrl,
  headlessCheckoutSandboxAppUrl,
} from '../../features/headless-checkout/environment';

@singleton()
export class EnvironmentService {
  private _isSandbox = false;

  public set isSandbox(value: boolean) {
    this._isSandbox = value;
  }

  public get isSandbox(): boolean {
    return this._isSandbox;
  }

  public getHeadlessCheckoutAppUrl(): string {
    return this._isSandbox
      ? headlessCheckoutSandboxAppUrl
      : headlessCheckoutAppUrl;
  }
}

