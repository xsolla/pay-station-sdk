import i18next from 'i18next';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';

const translationMap = new Map<string, string>([
  ['invoice', 'finance-details-transaction-details-invoice'],
  ['time', 'finance-details-transaction-details-time'],
]);

function translateItems(items: CartLine[] = []): CartLine[] {
  return items.map((item) => {
    if (!item.key || !translationMap.has(item.key)) {
      return item;
    }

    return {
      ...item,
      title: i18next.t(translationMap.get(item.key)!),
    } as CartLine;
  });
}

function getItemByKey(items: CartLine[], key: string): CartLine | undefined {
  return items.find((item) => item.key === key);
}

export const getTransactionDetailsTemplate = (
  detailsItems?: CartLine[],
): string => {
  if (!detailsItems?.length) {
    return '';
  }

  const lines: string[] = [];
  const items = translateItems(detailsItems);
  const invoiceItem = getItemByKey(items, 'invoice');
  const timeItem = getItemByKey(items, 'time');

  if (invoiceItem) {
    lines.push(`
      <div class="transaction-invoice">
        <div class="title">${invoiceItem.title}</div>
        <div class="content">${invoiceItem.content}</div>
      </div>
    `);
  }

  if (timeItem) {
    lines.push(`
      <div class="transaction-invoice">
        <div class="title">${timeItem.title}</div>
        <div class="content">${timeItem.content}</div>
      </div>
    `);
  }

  return `
    <div class="transaction-details">
      ${lines.join('')}
    </div>
  `;
};
