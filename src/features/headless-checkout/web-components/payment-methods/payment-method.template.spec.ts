import { PaymentMethod } from '../../../../core/payment-method.interface';
import { getPaymentMethodTemplate } from './payment-method.template';

const mockQiwi = {
  name: 'Qiwi',
  iconName: 'qiwi.svg',
  id: 16,
} as PaymentMethod;

describe('getPaymentMethodTemplate', () => {
  it('Should draw image', () => {
    expect(getPaymentMethodTemplate(mockQiwi)).toContain('img');
  });
});
