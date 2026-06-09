export interface PayStationSdkVersions {
  'pay-station-sdk': string;
  'payment-client-core': string;
  'headless-ui': string;
}

declare global {
  interface Window {
    getPayStationSdkVersions?(): PayStationSdkVersions;
  }
}

export {};
