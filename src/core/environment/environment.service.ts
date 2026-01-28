import { singleton } from 'tsyringe';
import {
  headlessCheckoutAppUrl,
  headlessCheckoutSandboxAppUrl,
  otelCollectorUrl,
  otelCollectorServiceName,
  otelCollectorToken,
  elkUrl,
  environment,
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

  public constructor(private readonly window: Window) {}

  public getHeadlessCheckoutAppUrl(): string {
    let predefinedAppUrl: string | null = null;

    try {
      predefinedAppUrl = this.window.localStorage.getItem(
        'headlessUiDevApiUrl',
      );
    } catch (e: unknown) {
      console.warn('localStorage is not available');
    }

    if (predefinedAppUrl) {
      return predefinedAppUrl;
    }

    return this._isSandbox
      ? headlessCheckoutSandboxAppUrl
      : headlessCheckoutAppUrl;
  }

  public get otelCollectorUrl(): string {
    return otelCollectorUrl;
  }

  public get otelCollectorServiceName(): string {
    return otelCollectorServiceName;
  }

  public get otelCollectorToken(): string {
    return otelCollectorToken;
  }

  public get elkUrl(): string {
    return elkUrl;
  }

  public get environment(): string {
    return environment;
  }
}
