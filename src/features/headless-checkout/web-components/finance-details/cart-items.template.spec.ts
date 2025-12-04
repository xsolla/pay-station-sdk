import i18next from 'i18next';
import { CartItem } from '../../../../core/finance-details/cart-item.interface';
import { getCartItemsTemplate } from './cart-items.template';

const item: CartItem = {
  key: 'key',
  hasDefaultImg: false,
  title: 'title',
  price: {
    amount: 10,
    currency: 'USD',
  },
  description: 'description',
  quantity: 1,
  isBonus: false,
};

const itemCheckout: CartItem = {
  ...item,
  key: 'checkout',
  title: '',
};

describe('getCartItemsTemplate', () => {
  it('Should draw empty items', () => {
    expect(getCartItemsTemplate([])).toEqual('');
  });

  it('Should draw CartItemComponent', () => {
    expect(getCartItemsTemplate([item])).toContain('psdk-cart-item');
  });

  it('Should translate title of item', () => {
    spyOn(i18next, 't').and.returnValue('In-game purchase');

    expect(getCartItemsTemplate([itemCheckout])).toContain(
      encodeURIComponent('In-game purchase'),
    );
  });
});
