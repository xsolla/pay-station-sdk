import { CountryCode } from '../../../../core/country/country-code.enum';
import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';
import { getCroatianExchangeRateTemplate } from './croatian-exchange-rate.template';
import { Currency } from '../../../../core/currency/currency.enum';

const financeDetails = {
  paymentCountry: CountryCode.India,
  cartSummary: {
    total: {
      money: {
        currency: Currency.USD,
      },
    },
  },
} as unknown as FinanceDetails;

const financeDetailsCroatia = {
  paymentCountry: CountryCode.Croatia,
  cartSummary: {
    total: {
      money: {
        amount: 1,
        currency: Currency.EUR,
      },
    },
  },
} as unknown as FinanceDetails;

describe('getCroatianExchangeRateTemplate', () => {
  it('Should not draw', () => {
    expect(getCroatianExchangeRateTemplate(financeDetails)).toEqual('');
  });

  it('Should draw for Croatia country and EUR currency', () => {
    const template = getCroatianExchangeRateTemplate(financeDetailsCroatia);
    expect(template).toContain('equal-value');
    expect(template).toContain('details');
  });
});
