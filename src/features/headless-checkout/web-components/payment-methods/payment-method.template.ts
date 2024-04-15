import { PaymentMethod } from '../../../../core/payment-method.interface';
import { cdnIconsUrl } from '../../environment';

const iconsPath = `${cdnIconsUrl}/brand-logos`;
const defaultIconPath = `${cdnIconsUrl}/default-payment-icons/default.svg`;

const arrow = `${cdnIconsUrl}/common-icons/chevron-right--line.svg`;
export const getPaymentMethodTemplate = (method: PaymentMethod): string => {
  let iconPath: string;

  if (!method.iconName) {
    iconPath = defaultIconPath;
  } else {
    iconPath = `${iconsPath}/${method.iconName}`;
  }
  return `<li class='payment-method' data-method-id='${method.id}'>
    <a tabindex='0' href='${method.id}'>
      <span class='icon'>
        <img src='${iconPath}' alt='${
          method.name
        }' onerror="this.onerror=null; this.src='${defaultIconPath}'">
      </span>
      <span class='name'>${method.name}</span>
      <span class='arrow'>
        <img src='${arrow as string}'>
      </span>
    </a>
</li>`;
};
