import i18next from 'i18next';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';
import { CartSummary } from '../../../../core/finance-details/cart-summary.interface';
import { XpsFinance } from '../../../../core/finance-details/xps-finance.interface';
import { getPriceTextTemplate } from './price-text.template';

const translationMap = new Map<string, string>([
  ['fee', 'finance-details-subtotal-details-fee'],
  ['discount', 'finance-details-subtotal-details-discount'],
  ['user-balance', 'finance-details-subtotal-details-user-balance'],
  ['vat', 'finance-details-subtotal-details-vat'],
  ['vat-india', 'finance-details-subtotal-details-vat-india'],
  ['vat-ghana', 'finance-details-subtotal-details-vat-ghana'],
  ['sales-tax', 'finance-details-subtotal-details-sales-tax'],
]);

function translateSubtotalDetails(
  finance: XpsFinance,
  items: CartLine[] = [],
): CartLine[] {
  const vatPercent = finance.vat_user?.percent;
  return items.map((item) => {
    if (!item.key || !translationMap.has(item.key)) {
      return item;
    }

    return {
      ...item,
      title: i18next.t(translationMap.get(item.key)!, {
        percent: vatPercent,
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

  return lines.length
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
