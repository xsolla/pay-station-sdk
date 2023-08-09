import i18next from 'i18next';
import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { getPriceTextTemplate } from './price-text.template';

export const getTotalRowTemplate = (cartSummary: CartSummary): string => {
  return `
    <div class="total-row">
      <div class="title">${i18next.t('finance-details-total-title')}</div>
      ${getPriceTextTemplate(null, cartSummary.total.money)}
    </div>`;
};
