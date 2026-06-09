import { sdkVersion } from '../../features/headless-checkout/environment';
import { PayStationSdkVersions } from './pay-station-sdk-versions.interface';

const unknownVersion = 'unknown';

let paymentClientCoreVersion = unknownVersion;
let headlessUiVersion = unknownVersion;

export function setPaymentClientCoreVersion(version: string): void {
  paymentClientCoreVersion = version;
}

export function resetPaymentClientCoreVersion(): void {
  paymentClientCoreVersion = unknownVersion;
}

export function setHeadlessUiVersion(version: string): void {
  headlessUiVersion = version;
}

export function resetHeadlessUiVersion(): void {
  headlessUiVersion = unknownVersion;
}

export function getPayStationSdkVersions(): PayStationSdkVersions {
  return {
    'pay-station-sdk': sdkVersion,
    'payment-client-core': paymentClientCoreVersion,
    'headless-ui': headlessUiVersion,
  };
}

export function registerPayStationSdkVersions(window: Window): void {
  window.getPayStationSdkVersions = getPayStationSdkVersions;
}
