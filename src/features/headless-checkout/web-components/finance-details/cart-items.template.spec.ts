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

const itemWithImage = {
  ...item,
  imgSrc: 'imgSrc',
};

const itemWithDiscount: CartItem = {
  ...item,
  priceBeforeDiscount: {
    amount: 1,
    currency: 'USD',
  },
};

const itemWithTax: CartItem = {
  ...item,
  tax: {
    key: 'vat',
    title: 'tax-title',
    money: {
      amount: 1,
      currency: 'USD',
    },
  },
};

const itemWithQuantity: CartItem = {
  ...item,
  quantity: 2,
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

  it('Should not draw image', () => {
    expect(getCartItemsTemplate([item])).not.toContain('img');
  });

  it('Should draw image', () => {
    expect(getCartItemsTemplate([itemWithImage])).toContain('img');
  });

  it('Should draw price before discount', () => {
    expect(getCartItemsTemplate([itemWithDiscount])).toContain(
      'price-before-discount'
    );
  });

  it('Should draw tax', () => {
    expect(getCartItemsTemplate([itemWithTax])).toContain('tax');
  });

  it('Should draw item quantity', () => {
    expect(getCartItemsTemplate([itemWithQuantity])).toContain('2 x');
  });

  it('Should draw checkout item', () => {
    spyOn(i18next, 't').and.returnValue('In-game purchase');
    expect(getCartItemsTemplate([itemCheckout])).toContain('In-game purchase');
  });
});
