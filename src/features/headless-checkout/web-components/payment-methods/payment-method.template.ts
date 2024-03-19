import { PaymentMethod } from '../../../../core/payment-method.interface';
import { cdnUrl } from '../../environment';
import { cardPid } from './variables';
import arrow from '../../../../assets/icons/arrow-right.svg';

const iconsPath = `${cdnUrl}/paystation4/brand-logos`;
export const getPaymentMethodTemplate = (method: PaymentMethod): string => {
  let iconName: string;

  if (!method.iconName) {
    iconName = method.id === cardPid ? 'card.svg' : 'default.svg';
  } else {
    iconName = method.iconName;
  }
  return `<li class="payment-method" data-method-id="${method.id}">
    <a tabindex="0" href="${method.id}">
      <span class="icon">
        <img src="${iconsPath}/${iconName}" alt="${method.name}">
      </span>
      <span class="name">${method.name}</span>
      <span class="arrow">
        <img src="${arrow as string}">
      </span>
    </a>
</li>`;
};
