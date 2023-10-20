import i18next from 'i18next';
import { getTransactionDetailsTemplate } from './transaction-details.template';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';

const invoiceItem = {
  key: 'invoice',
  title: 'Transaction',
  content: '123456789',
} as unknown as CartLine;

const timeItem = {
  key: 'time',
  title: 'Date',
  content: '2023-10-10T10:10:00+03:00',
} as unknown as CartLine;

describe('getTransactionDetailsTemplate', () => {
  it('Should draw transaction invoice', () => {
    spyOn(i18next, 't').and.returnValue('Transaction');
    const template = getTransactionDetailsTemplate([invoiceItem]);
    expect(template).toContain('Transaction');
    expect(template).toContain('№123456789');
  });

  it('Should draw transaction date', () => {
    spyOn(i18next, 't').and.returnValue('Date');
    const template = getTransactionDetailsTemplate([timeItem]);
    expect(template).toContain('Date');
  });
});
