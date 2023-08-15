import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { getPriceTextTemplate } from './price-text.template';

export const getShippingTemplate = (cartSummary: CartSummary): string => {
  const shipping = cartSummary.shipping;

  if (!shipping?.length) {
    return '';
  }

  const lines = shipping.map((item) => {
    return `
      <div class"shipping-row">
        <div class="title">${item.title ?? ''}</div>
        ${getPriceTextTemplate(item)}
      </div>
    `;
  });

  return `
    <div class="shipping-rows">
      ${lines.join('')}
    </div>`;
};
