import i18next from 'i18next';

export const getCashPaymentInstructionTemplate = (
  paymentMethodName: string,
  instruction?: string,
): string => {
  return `
<div class='cash-payment-instruction'>
    <h2 class='payment-title'>
      ${i18next.t('cash-payment-instruction.title', { paymentMethodName })}
      </h2>
    <p class='payment-description'>
      ${i18next.t('cash-payment-instruction.description')}
    </p>
    <h3 class="payment-title">${i18next.t(
      'cash-payment-instruction.how-to',
    )}</h3>
    <p class='payment-instruction'>
      ${instruction ?? ''}
    </p>
</div>`;
};
