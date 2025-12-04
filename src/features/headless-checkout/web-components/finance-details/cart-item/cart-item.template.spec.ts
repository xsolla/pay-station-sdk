import { getCartItemTemplate } from './cart-item.template';
import { CartItem } from '../../../../../core/finance-details/cart-item.interface';

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

const itemWithDiscount: CartItem = {
  ...item,
  priceBeforeDiscount: {
    amount: 1,
    currency: 'USD',
  },
};

const itemWithQuantity: CartItem = {
  ...item,
  quantity: 2,
};

describe('getCartItemTemplate', () => {
  it('Should not draw image', () => {
    expect(getCartItemTemplate(item)).not.toContain('img');
  });

  it('Should draw image', () => {
    expect(getCartItemTemplate(itemWithImage)).toContain('img');
  });

  it('Should draw tax', () => {
    expect(getCartItemTemplate(itemWithTax)).toContain('tax');
  });

  it('Should draw price before discount', () => {
    expect(getCartItemTemplate(itemWithDiscount)).toContain(
      'price-before-discount',
    );
  });

  it('Should draw item quantity', () => {
    expect(getCartItemTemplate(itemWithQuantity)).toContain('2 x');
  });
});
