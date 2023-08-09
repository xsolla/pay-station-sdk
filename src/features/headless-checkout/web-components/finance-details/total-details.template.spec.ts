import i18next from 'i18next';
import { Currency } from '../../../../core/currency/currency.enum';
import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { XpsFinance } from '../../../../core/finance-details/xps-finance.interface';
import { getTotalDetailsTemplate } from './total-details.template';

const finance = {
  vat: {
    percent: 10,
  },
} as unknown as XpsFinance;
const summary = {
  totalDetails: [
    {
      title: 'title',
      money: {
        amount: 1,
        currency: Currency.USD,
      },
    },
  ],
} as unknown as CartSummary;
const summaryWithVatItem = {
  totalDetails: [
    {
      key: 'vat',
      money: {
        amount: 1,
        currency: Currency.USD,
      },
    },
  ],
} as unknown as CartSummary;

describe('getTotalDetailsTemplate', () => {
  it('Should draw title', () => {
    const template = getTotalDetailsTemplate(finance, summary);
    expect(template).toContain('title');
  });

  it('Should draw vat', () => {
    spyOn(i18next, 't').and.returnValue('vat');
    const template = getTotalDetailsTemplate(finance, summaryWithVatItem);
    expect(template).toContain('vat');
  });
});
