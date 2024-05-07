import { SendCashPaymentDataStatus } from '../../../../../core/send-cash-payment-data-status.interface';
import i18next from 'i18next';
const closeButtonIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L8.58579 10L6.29289 12.2929C5.90237 12.6834 5.90237 13.3166 6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071L10 11.4142L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L11.4142 10L13.7071 7.70711C14.0976 7.31658 14.0976 6.68342 13.7071 6.29289C13.3166 5.90237 12.6834 5.90237 12.2929 6.29289L10 8.58579L7.70711 6.29289Z" />
</svg>`;
export const getNotifierTemplate = (
  sendStatus: SendCashPaymentDataStatus,
): string => {
  let notification;
  if (sendStatus.status === 'succeed') {
    notification =
      sendStatus.type === 'email'
        ? i18next.t('xsolla-number.notification.success.email')
        : i18next.t('xsolla-number.notification.success.sms');
  } else {
    notification = sendStatus.errors?.length
      ? sendStatus.errors[0]
      : i18next.t('xsolla-number.notification.failed');
  }
  return `
<div class='send-notification send-notification-${sendStatus.status}'>
  <p class='notification-description'>
  ${notification}

  </p>
  <button id='close-notification' class='psdk-close-button'>
  ${closeButtonIcon}
</button>
</div>
`;
};
