import i18next from 'i18next';
import { CartItem } from '../../../../core/finance-details/cart-item.interface';
import { getPriceTextTemplate } from './price-text.template';
import { taxTranslationMap } from './tax-translation-map.const';

const cartItemTitleTranslationMap = new Map<string, string>([
  ['checkout', 'finance-details-cart-items-checkout-title'],
]);

const cartItemTaxTranslationMap = new Map<string, string>(taxTranslationMap);

function translateCartItems(items: CartItem[] = []): CartItem[] {
  return items.map((item) => {
    const title =
      !item.title && item.key && cartItemTitleTranslationMap.has(item.key)
        ? i18next.t(cartItemTitleTranslationMap.get(item.key)!)
        : item.title;

    const content =
      item.tax?.key && cartItemTaxTranslationMap.has(item.tax.key)
        ? i18next.t(cartItemTaxTranslationMap.get(item.tax.key)!, {
            percent: item.tax.rate,
          })
        : item.tax?.content;

    return {
      ...item,
      title: title ?? item.title,
      tax: {
        ...item.tax,
        content,
      },
    };
  });
}

function getCartItemImage(item: CartItem): string {
  if (!item.imgSrc) {
    return '';
  }

  return `
    <div class="image-container">
      <img
        class="image"
        src="${item.imgSrc}"
        alt="${item.title}"
      />
    </div>
  `;
}

function getCartItemText(item: CartItem): string {
  const title =
    item.quantity && item.quantity > 1
      ? `${item.quantity} x ${item.title}`
      : item.title;
  const description = item.description?.replace(/\\n/g, '<br/>');
  return `
    <div class="details">
      <div class="title">${title ?? ''}</div>
      <div class="description">${description ?? ''}</div>
      ${item.tax ? getPriceTextTemplate(item.tax, null, 'tax') : ''}
      ${getPriceTextTemplate(null, item.price, 'price')}
      ${
        item.priceBeforeDiscount?.amount
          ? getPriceTextTemplate(
              null,
              item.priceBeforeDiscount,
              'price-before-discount',
            )
          : ''
      }
    </div>
  `;
}

export const getCartItemsTemplate = (cartItems: CartItem[] = []): string => {
  if (!cartItems.length) {
    return '';
  }

  const items = translateCartItems(cartItems);
  const itemLines = items.map((item) => {
    return `
      <div class="cart-item">
        ${getCartItemImage(item)}
        ${getCartItemText(item)}
      </div>
    `;
  });

  return `
    <div class="cart-items">
      ${itemLines.join('')}
    </div>
  `;
};
