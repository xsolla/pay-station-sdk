import i18next from 'i18next';

export const getSendNumberPanelTemplate = (
  emailControl: string,
  phoneControl: string,
  printUrl?: string,
): string => {
  return `<div class='send-xsolla-number-panel'>
  <div class='phone-control-wrapper'>
    <button id='phone-recipient-button' class='choose-method-button'>${i18next.t(
      'xsolla-number.send-panel.get-xsolla-number',
    )}</button>
    <div class='recipient' id='phone-recipient-container'>
      <div class='wrapper'>${phoneControl}</div>
      <button id='send-sms' class='send-button'>
      <span class='text'>${i18next.t('xsolla-number.send-panel.send')}</span>
      <div class='loader'></div>
</button>
    </div>
  </div>
  <div>
    <a class='choose-method-button' target='_blank' href='${printUrl}'>${i18next.t(
      'xsolla-number.send-panel.print',
    )}</a>
  </div>
  <div class='email-control-wrapper'>
    <button id='email-recipient-button' class='choose-method-button'>${i18next.t(
      'xsolla-number.send-panel.email',
    )}</button>
    <div class='recipient' id='email-recipient-container'>
      <div class='wrapper'>${emailControl}</div>
      <button id='send-email' class='send-button'>
      <span class='text'>${i18next.t('xsolla-number.send-panel.send')}</span>
      <div class='loader'></div></button>
    </div>
  </div>
</div>`;
};
