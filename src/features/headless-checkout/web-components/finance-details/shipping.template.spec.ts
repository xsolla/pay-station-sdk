import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { getShippingTemplate } from './shipping.template';

const cartSummary = {} as unknown as CartSummary;
const cartSummaryWithShipping = {
  shipping: [
    {
      title: 'title',
    },
  ],
} as unknown as CartSummary;

describe('getShippingTemplate', () => {
  it('Should not draw for empty shipping', () => {
    expect(getShippingTemplate(cartSummary)).toEqual('');
  });

  it('Should draw for Croatia country and EUR currency', () => {
    const template = getShippingTemplate(cartSummaryWithShipping);
    expect(template).toContain('shipping-row');
  });
});
