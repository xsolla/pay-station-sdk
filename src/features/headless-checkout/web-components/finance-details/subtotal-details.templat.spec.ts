import i18next from 'i18next';
import { Currency } from '../../../../core/currency/currency.enum';
import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { XpsFinance } from '../../../../core/finance-details/xps-finance.interface';
import { getSubtotalDetailsTemplate } from './subtotal-details.template';

const finance = {
  vat_user: {
    percent: 10,
  },
} as unknown as XpsFinance;
const summary = {
  subtotalDetails: [
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
  subtotalDetails: [
    {
      key: 'vat',
      title: 'vat',
      money: {
        amount: 1,
        currency: Currency.USD,
      },
    },
  ],
} as unknown as CartSummary;
const summaryWithConvertion = {
  ...summary,
  subtotal: {
    money: {
      amount: 1,
      currency: Currency.USD,
    },
  },
  subtotalPayment: {
    money: {
      amount: 1,
      currency: Currency.EUR,
    },
  },
} as unknown as CartSummary;

describe('getSubtotalDetailsTemplate', () => {
  it('Should draw title', () => {
    const template = getSubtotalDetailsTemplate(finance, summaryWithConvertion);
    expect(template).toContain('title');
  });

  it('Should draw converted price', () => {
    const template = getSubtotalDetailsTemplate(finance, summaryWithConvertion);
    expect(template).toContain('converted-price');
  });

  it('Should draw vat', () => {
    spyOn(i18next, 't').and.returnValue('vat');
    const template = getSubtotalDetailsTemplate(finance, summaryWithVatItem);
    expect(template).toContain('vat');
  });
});
