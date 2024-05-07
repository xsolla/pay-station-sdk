import i18next from 'i18next';

export const getPaymentDescription = (paymentMethodName?: string): string => `
<h2 class='payment-title'>
${i18next.t('xsolla-number.payment.title', { paymentMethodName })}</h2>
<p class='payment-description'>
${i18next.t('xsolla-number.payment.description')}
</p>
`;
