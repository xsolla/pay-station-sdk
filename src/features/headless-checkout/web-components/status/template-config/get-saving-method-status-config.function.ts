import { StatusState } from './status-state.enum';
import { StatusComponentConfig } from './status.component.config.interface';
import i18next from 'i18next';
import { Status } from '../../../../../core/status/status.interface';
import { cdnIconsUrl } from '../../../environment';

const failedImage = `${cdnIconsUrl}/statuses/failed.png`;
const successImage = `${cdnIconsUrl}/statuses/success.png`;

export function getSavingMethodStatusConfig(
  statusState: StatusState,
  status: Status,
): StatusComponentConfig | null {
  if (statusState === StatusState.isCanceled) {
    return {
      image: failedImage,
      title: i18next.t('saving-status.error.title'),
      description: '',
      showDescription: false,
      isSavePaymentAccount: true,
      status: status.statusState,
      autoCancellation: status.autoCancellation,
    };
  }

  if (statusState === StatusState.isProcessing) {
    return {
      image: null,
      title: i18next.t('saving-status.processing.title'),
      description: i18next.t('saving-status.processing.description'),
      showDescription: true,
      isSavePaymentAccount: true,
      status: status.statusState,
      autoCancellation: status.autoCancellation,
    };
  }

  if (statusState === StatusState.isError) {
    return {
      image: failedImage,
      title: i18next.t('saving-status.error.title'),
      description: '',
      showDescription: false,
      isSavePaymentAccount: true,
      status: status.statusState,
      autoCancellation: status.autoCancellation,
    };
  }

  if (statusState === StatusState.isSuccess) {
    return {
      image: successImage,
      title: i18next.t('saving-status.success.title'),
      description: '',
      showDescription: false,
      isSavePaymentAccount: true,
      status: status.statusState,
      autoCancellation: status.autoCancellation,
    };
  }

  return null;
}
