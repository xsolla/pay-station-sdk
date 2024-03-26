import i18next from 'i18next';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';
import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { XpsFinance } from '../../../../core/finance-details/xps-finance.interface';
import { getPriceTextTemplate } from './price-text.template';
import { taxTranslationMap } from './tax-translation-map.const';

const translationMap = new Map<string, string>([
  ...taxTranslationMap,
  ['fee', 'finance-details-subtotal-details-fee'],
  ['discount', 'finance-details-subtotal-details-discount'],
  ['user-balance', 'finance-details-subtotal-details-user-balance'],
]);

function translateSubtotalDetails(
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
        percent: finance?.vat_user?.percent,
      }),
    } as CartLine;
  });
}

function getSubtotalTitle(cartSummary: CartSummary): string {
  const lines = [];

  if (cartSummary.subtotal) {
    lines.push(
      `<div class="title">${i18next.t('finance-details-subtotal-title')}</div>`,
    );
  }

  if (cartSummary.subtotal && cartSummary.subtotalPayment) {
    const hasConversion =
      cartSummary.subtotal.money?.currency !==
      cartSummary.subtotalPayment.money?.currency;

    const conversionPrice = hasConversion
      ? `${getPriceTextTemplate(
          cartSummary.subtotal,
          null,
          'price converted-price',
        )} <span class="equal-sign">=</span>`
      : '';

    lines.push(`
      <div class="price-container">
        ${conversionPrice}
        ${getPriceTextTemplate(cartSummary.subtotalPayment, null, 'price')}
      </div>
    `);
  }

  return lines?.length
    ? `
    <div class="subtotal-row">
      ${lines.join('')}
    </div>`
    : '';
}

function getSubtotalContent(
  finance: XpsFinance,
  cartSummary: CartSummary,
): string {
  const lines = translateSubtotalDetails(
    finance,
    cartSummary.subtotalDetails,
  ).map((details) => {
    if (!details.money?.amount && !details.content) {
      return '';
    }

    return `
      <div class="subtotal-row">
        <div class="title">${details.title ?? ''}</div>
        ${getPriceTextTemplate(details, null, 'price')}
      </div>`;
  });

  return lines?.join('') ?? '';
}

export const getSubtotalDetailsTemplate = (
  finance: XpsFinance,
  cartSummary: CartSummary,
): string => {
  return [
    getSubtotalTitle(cartSummary),
    getSubtotalContent(finance, cartSummary),
  ].join('');
};
