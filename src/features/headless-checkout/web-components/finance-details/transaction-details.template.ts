import i18next from 'i18next';
import { container } from 'tsyringe';
import { CartLine } from '../../../../core/finance-details/cart-line.interface';
import { DatePipe } from '../../../../core/pipes/date/date.pipe';

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

  const datePipe = container.resolve(DatePipe);

  const lines: string[] = [];
  const items = translateItems(detailsItems);
  const invoiceItem = getItemByKey(items, 'invoice');
  const timeItem = getItemByKey(items, 'time');

  if (invoiceItem?.title && invoiceItem.content) {
    lines.push(`
      <div class="transaction-invoice">
        <div class="title">${invoiceItem.title}</div>
        <div class="content">№${invoiceItem.content}</div>
      </div>
    `);
  }

  if (timeItem?.title && timeItem.content) {
    const localDate = datePipe.transform(timeItem.content);
    lines.push(`
      <div class="transaction-invoice">
        <div class="title">${timeItem.title}</div>
        <div class="content">${localDate}</div>
      </div>
    `);
  }

  return `
    <div class="transaction-details">
      ${lines.join('')}
    </div>
  `;
};
