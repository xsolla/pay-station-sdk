import i18next from 'i18next';

export const getPaymentInfoTemplate = (
  xsollaNumber: string,
  userName: string = '',
): string => {
  return `
<div class='payment-info'>
  <div class="item">
    <div class="title">
      <span>${i18next.t('xsolla-number.info.user-account')}</span>
    </div>
    <div class="content" data-testid="user-account">${userName}</div>
  </div>
  <div class="item">
    <div class="title">
      <span>${i18next.t('xsolla-number.info.xsolla-number')}</span>
    </div>
    <div class="content" data-testid="xsolla-number">${xsollaNumber}</div>
  </div>
</div>`;
};
