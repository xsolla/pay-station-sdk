import i18next from 'i18next';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';
import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { XpsFinance } from '../../../../core/finance-details/xps-finance.interface';
import { getPriceTextTemplate } from './price-text.template';
import { taxTranslationMap } from './tax-translation-map.const';

const translationMap = new Map<string, string>(taxTranslationMap);

function translateTotalDetails(
  finance: XpsFinance,
  items: CartLine[] = [],
): CartLine[] {
  return items.map((item) => {
    if (!item.key || !translationMap.has(item.key)) {
      return item;
    }

    return {
      ...item,
      title: i18next.t(translationMap.get(item.key)!, {
        percent: item.percents ?? finance.vat?.percent,
      }),
    } as CartLine;
  });
}

export const getTotalDetailsTemplate = (
  finance: XpsFinance,
  cartSummary: CartSummary,
): string => {
  const totalDetailsRows = translateTotalDetails(
    finance,
    cartSummary.totalDetails,
  )?.map((totalDetails) => {
    return `
      <div class="total-details-row">
        <div class="title">${totalDetails.title ?? ''}</div>
        ${getPriceTextTemplate(null, totalDetails.money)}
      </div>`;
  });

  return totalDetailsRows?.join('');
};
