import {
  getPayStationSdkVersions,
  registerPayStationSdkVersions,
  resetHeadlessUiVersion,
  resetPaymentClientCoreVersion,
  setHeadlessUiVersion,
  setPaymentClientCoreVersion,
} from './window-versions';

describe('window-versions', () => {
  beforeEach(() => {
    resetPaymentClientCoreVersion();
    resetHeadlessUiVersion();
  });

  it('should return sdk version and unknown payment-client-core version by default', () => {
    expect(getPayStationSdkVersions()['pay-station-sdk']).toBeTruthy();
    expect(getPayStationSdkVersions()['payment-client-core']).toBe('unknown');
  });

  it('should return unknown headless-ui version by default', () => {
    expect(getPayStationSdkVersions()['headless-ui']).toBe('unknown');
  });

  it('should return payment-client-core version after it is set', () => {
    setPaymentClientCoreVersion('1.2.3');

    expect(getPayStationSdkVersions()['payment-client-core']).toBe('1.2.3');
  });

  it('should return headless-ui version after it is set', () => {
    setHeadlessUiVersion('2.0.0');

    expect(getPayStationSdkVersions()['headless-ui']).toBe('2.0.0');
  });

  it('should register getPayStationSdkVersions on window', () => {
    registerPayStationSdkVersions(window);

    expect(window.getPayStationSdkVersions).toBe(getPayStationSdkVersions);
    expect(window.getPayStationSdkVersions?.()['payment-client-core']).toBe(
      'unknown',
    );
    expect(window.getPayStationSdkVersions?.()['headless-ui']).toBe('unknown');
  });

  it('should reset payment-client-core version', () => {
    setPaymentClientCoreVersion('1.2.3');
    resetPaymentClientCoreVersion();

    expect(getPayStationSdkVersions()['payment-client-core']).toBe('unknown');
  });

  it('should reset headless-ui version', () => {
    setHeadlessUiVersion('2.0.0');
    resetHeadlessUiVersion();

    expect(getPayStationSdkVersions()['headless-ui']).toBe('unknown');
  });
});
