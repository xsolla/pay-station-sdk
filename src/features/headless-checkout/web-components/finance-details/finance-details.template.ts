import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';
import { getCartItemsTemplate } from './cart-items.template';
import { getCroatianExchangeRateTemplate } from './croatian-exchange-rate.template';
import { getShippingTemplate } from './shipping.template';
import { getSubtotalDetailsTemplate } from './subtotal-details.template';
import { getTotalDetailsTemplate } from './total-details.template';
import { getTotalRowTemplate } from './total-row.template';

export const getFinanceDetailsTemplate = (
  financeDetails: FinanceDetails
): string => {
  return [
    getCartItemsTemplate(financeDetails.cartItems),
    getShippingTemplate(financeDetails.cartSummary),
    getSubtotalDetailsTemplate(
      financeDetails.finance,
      financeDetails.cartSummary
    ),
    getTotalRowTemplate(financeDetails.cartSummary),
    getCroatianExchangeRateTemplate(financeDetails),
    getTotalDetailsTemplate(financeDetails.finance, financeDetails.cartSummary),
  ].join('');
};
