/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

export const headlessCheckoutAppUrl =
  process.env.HEADLESS_UI_URL || 'https://secure.xsolla.com/headless-checkout';
export const headlessCheckoutSandboxAppUrl =
  process.env.HEADLESS_UI_URL ||
  'https://sandbox-secure.xsolla.com/headless-checkout';

export const otelCollectorUrl = process.env.SDK_OTEL_COLLECTOR_URL || '';
export const otelCollectorServiceName =
  process.env.SDK_OTEL_COLLECTOR_SERVICE_NAME || '';
export const otelCollectorToken = process.env.SDK_OTEL_COLLECTOR_TOKEN || '';

export const elkUrl = process.env.SDK_ELK_URL || '';

export const environment = process.env.ENVIRONMENT || 'production';

export const cdnIconsUrl =
  'https://cdn.xsolla.net/headless-checkout-prod/assets/icons';
