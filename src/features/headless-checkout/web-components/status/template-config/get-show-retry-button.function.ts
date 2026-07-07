import { Status } from '../../../../../core/status/status.interface';
import { StatusState } from './status-state.enum';

export function getShowRetryButton(
  statusState: StatusState,
  status: Status,
): boolean {
  if (status.isRetryPaymentEnabled === false) {
    return false;
  }

  if (statusState === StatusState.isProcessing) {
    return !!status.canRepeatProcessingPayment;
  }

  if (
    statusState === StatusState.isCanceled ||
    statusState === StatusState.isError
  ) {
    return !!status.canRepeatPayment;
  }

  return false;
}
