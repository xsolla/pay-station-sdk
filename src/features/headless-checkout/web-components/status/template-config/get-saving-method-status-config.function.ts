import { StatusState } from './status-state.enum';
import { StatusComponentConfig } from './status.component.config.interface';
import failedImage from '../../../../../assets/statuses/failed.png';
import i18next from 'i18next';
import successImage from '../../../../../assets/statuses/success.png';

export function getSavingMethodStatusConfig(
  statusState: StatusState
): StatusComponentConfig | null {
  if (statusState === StatusState.isCanceled) {
    return {
      image: failedImage,
      title: i18next.t('saving-status.error.title'),
      description: '',
      showDescription: false,
      isSavePaymentAccount: true,
    };
  }

  if (statusState === StatusState.isProcessing) {
    return {
      image: null,
      title: i18next.t('saving-status.processing.title'),
      description: i18next.t('saving-status.processing.description'),
      showDescription: true,
      isSavePaymentAccount: true,
    };
  }

  if (statusState === StatusState.isError) {
    return {
      image: failedImage,
      title: i18next.t('saving-status.error.title'),
      description: '',
      showDescription: false,
      isSavePaymentAccount: true,
    };
  }

  if (statusState === StatusState.isSuccess) {
    return {
      image: successImage,
      title: i18next.t('saving-status.success.title'),
      description: '',
      showDescription: false,
      isSavePaymentAccount: true,
    };
  }

  return null;
}
