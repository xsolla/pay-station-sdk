import { filterPaymentMethods } from './filter-payment-methods.function';
import { PaymentMethod } from '../../../../core/payment-method.interface';

const mockCard = {
  name: 'Bank card',
} as PaymentMethod;

const mockQiwi = {
  name: 'Qiwi',
} as PaymentMethod;

const paymentMethods: PaymentMethod[] = [mockCard, mockQiwi];

describe('filterPaymentMethods', () => {
  it('Should return qiwi', () => {
    const searchValue = 'qiwi';
    expect(filterPaymentMethods(paymentMethods, searchValue)).toEqual([
      mockQiwi,
    ]);
  });

  it('Should return bank card', () => {
    const searchValue = 'card';
    expect(filterPaymentMethods(paymentMethods, searchValue)).toEqual([
      mockCard,
    ]);
  });

  it('Should return empty array', () => {
    const searchValue = 'paypal';
    expect(filterPaymentMethods(paymentMethods, searchValue)).toEqual([]);
  });

  it('Should return undefined', () => {
    const searchValue = 'paypal';
    expect(filterPaymentMethods(undefined, searchValue)).toBeUndefined();
  });
});
