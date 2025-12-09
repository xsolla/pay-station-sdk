import i18next from 'i18next';
import { CartItem } from '../../../../core/finance-details/cart-item.interface';
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

export const getCartItemsTemplate = (cartItems: CartItem[] = []): string => {
  if (!cartItems?.length) {
    return '';
  }

  const items = translateCartItems(cartItems);
  const itemLines = items.map((item) => {
    return `<psdk-cart-item data-item='${encodeURIComponent(
      JSON.stringify(item),
    )}'></psdk-cart-item>`;
  });

  return `
    <div class="cart-items ${
      itemLines?.length === 1 ? 'one-item' : 'many-items'
    }">
      ${itemLines.join('')}
    </div>
  `;
};
