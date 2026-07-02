import { Status } from '../../../../../core/status/status.interface';
import { StatusState } from './status-state.enum';
import { StatusEnum } from '../../../../../core/status/status.enum';
import { TitleClass } from '../../../../../core/status/title-class.enum';

export function getStatusState(status: Status): StatusState | null {
  const isCanceled =
    status.statusState === StatusEnum.canceled ||
    status.isCancelUser ||
    status.titleClass === TitleClass.cancel ||
    status.titleClass === TitleClass.cancelUser;

  if (isCanceled) {
    return StatusState.isCanceled;
  }

  const isProcessing = [
    StatusEnum.processing,
    StatusEnum.created,
    StatusEnum.held,
  ].includes(status.statusState);
  if (isProcessing) {
    return StatusState.isProcessing;
  }

  const isError = status.statusState === StatusEnum.error;

  if (isError) {
    return StatusState.isError;
  }

  const isSuccess =
    status.statusState === StatusEnum.done ||
    status.statusState === StatusEnum.authorized;

  if (isSuccess) {
    return StatusState.isSuccess;
  }
  return null;
}
