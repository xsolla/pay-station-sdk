import i18next from 'i18next';
import { CountryCode } from '../../../../core/country/country-code.enum';
import { Currency } from '../../../../core/currency/currency.enum';
import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';

export const getCroatianExchangeRateTemplate = (
  financeDetails: FinanceDetails,
): string => {
  const cartSummary = financeDetails.cartSummary;
  const isCroatia = financeDetails.paymentCountry === CountryCode.Croatia;
  const isEuroCurrency = cartSummary.total.money?.currency === Currency.EUR;
  const croatianCurrencyExchangeRate = 7.5345;

  if (!isCroatia || !isEuroCurrency) {
    return '';
  }

  function getCroatianCurrencyRate(): number {
    const amount = cartSummary.total.money?.amount
      ? cartSummary.total.money?.amount
      : 0;
    const ceilDecimals = 100;

    return (
      Math.ceil(croatianCurrencyExchangeRate * amount * ceilDecimals) /
      ceilDecimals
    );
  }

  return `
    <div class="croatian-exchange-rate-row">
      <div class="equal-value">${i18next.t('finance-details-hrk-equal', {
        value: getCroatianCurrencyRate(),
      })}</div>
      <div class="details">${i18next.t(
        'finance-details-hrk-exchange-rate',
      )}</div>
    </div>`;
};
