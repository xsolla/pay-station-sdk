import { CartItem } from '../../../../../core/finance-details/cart-item.interface';
import { getPriceTextTemplate } from '../price-text.template';

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
        referrerpolicy="no-referrer"
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
    <div class="details-wrapper">
      <div class="details">
        <div class="title">${title ?? ''}</div>
        <div class="description">${description ?? ''}</div>
        ${item.tax ? getPriceTextTemplate(item.tax, null, 'tax') : ''}
      </div>
      <div class="price-wrapper">
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
    </div>
  `;
}

export const getCartItemTemplate = (item: CartItem): string => {
  return `
      <div class="cart-item">
        ${getCartItemImage(item)}
        ${getCartItemText(item)}
      </div>
  `;
};
