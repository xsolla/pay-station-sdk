import { getShowRetryButton } from './get-show-retry-button.function';
import { StatusState } from './status-state.enum';
import { Status } from '../../../../../core/status/status.interface';
import { StatusEnum } from '../../../../../core/status/status.enum';

describe('getShowRetryButton', () => {
  const baseStatus = {
    statusState: StatusEnum.canceled,
    statusMessage: '',
    group: '',
    autoCancellation: true,
    isRetryPaymentEnabled: true,
    canRepeatPayment: true,
    canRepeatProcessingPayment: true,
  } as Status;

  it('should return false when retry is disabled for project', () => {
    expect(
      getShowRetryButton(StatusState.isCanceled, {
        ...baseStatus,
        isRetryPaymentEnabled: false,
      }),
    ).toBeFalse();
  });

  it('should return true when isRetryPaymentEnabled is undefined', () => {
    expect(
      getShowRetryButton(StatusState.isCanceled, {
        ...baseStatus,
        isRetryPaymentEnabled: undefined,
      }),
    ).toBeTrue();
  });

  it('should return true for canceled status when canRepeatPayment is true', () => {
    expect(getShowRetryButton(StatusState.isCanceled, baseStatus)).toBeTrue();
  });

  it('should return true for error status when canRepeatPayment is true', () => {
    expect(getShowRetryButton(StatusState.isError, baseStatus)).toBeTrue();
  });

  it('should return false for canceled status when canRepeatPayment is false', () => {
    expect(
      getShowRetryButton(StatusState.isCanceled, {
        ...baseStatus,
        canRepeatPayment: false,
      }),
    ).toBeFalse();
  });

  it('should return true for processing status when canRepeatProcessingPayment is true', () => {
    expect(
      getShowRetryButton(StatusState.isProcessing, baseStatus),
    ).toBeTrue();
  });

  it('should return false for processing status when canRepeatProcessingPayment is false', () => {
    expect(
      getShowRetryButton(StatusState.isProcessing, {
        ...baseStatus,
        canRepeatProcessingPayment: false,
      }),
    ).toBeFalse();
  });

  it('should return false for success status', () => {
    expect(getShowRetryButton(StatusState.isSuccess, baseStatus)).toBeFalse();
  });
});
