import { StatusState } from './status-state.enum';
import { Status } from '../../../../../core/status/status.interface';
import { StatusComponentConfig } from './status.component.config.interface';
import failedImage from '../../../../../assets/statuses/failed.png';
import i18next from 'i18next';
import successImage from '../../../../../assets/statuses/success.png';

export function getPaymentStatusConfig(
  statusState: StatusState,
  status: Status
): StatusComponentConfig | null {
  // check cancel before processing since canceled invoice has status state "created"
  if (statusState === StatusState.isCanceled) {
    return {
      image: failedImage,
      title: i18next.t('status.error.title'),
      description: '',
      showDescription: false,
    };
  }

  if (statusState === StatusState.isProcessing) {
    return {
      image: null,
      title: i18next.t('status.processing.title'),
      description: i18next.t('status.processing.description'),
      showDescription: true,
    };
  }

  if (statusState === StatusState.isError) {
    return {
      image: failedImage,
      title: i18next.t('status.error.title'),
      description: '',
      showDescription: false,
    };
  }

  if (statusState === StatusState.isSuccess) {
    return {
      image: successImage,
      title: i18next.t('status.success.title'),
      description: i18next.t('status.success.description', {
        email: status.email,
      }),
      showDescription: !!status.email,
    };
  }

  return null;
}
