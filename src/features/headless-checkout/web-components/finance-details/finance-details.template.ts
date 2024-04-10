import { FinanceDetails } from '../../../../core/finance-details/finance-details.interface';
import { getCartItemsTemplate } from './cart-items.template';
import { getCroatianExchangeRateTemplate } from './croatian-exchange-rate.template';
import { getShippingTemplate } from './shipping.template';
import { getSubtotalDetailsTemplate } from './subtotal-details.template';
import { getTransactionDetailsTemplate } from './transaction-details.template';
import { getTotalDetailsTemplate } from './total-details.template';

export const getFinanceDetailsTemplate = (
  financeDetails: FinanceDetails,
): string => {
  return [
    getTransactionDetailsTemplate(
      financeDetails.cartSummary?.transactionDetails,
    ),
    getCartItemsTemplate(financeDetails.cartItems),
    financeDetails.cartItems && '<hr class="divider">',
    getShippingTemplate(financeDetails.cartSummary),
    getSubtotalDetailsTemplate(
      financeDetails.finance,
      financeDetails.cartSummary,
    ),
    getCroatianExchangeRateTemplate(financeDetails),
    getTotalDetailsTemplate(financeDetails.finance, financeDetails.cartSummary),
  ].join('');
};
