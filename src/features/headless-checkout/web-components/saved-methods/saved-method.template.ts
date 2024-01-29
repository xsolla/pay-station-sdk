import { cdnUrl } from '../../environment';
import { SavedMethod } from '../../../../core/saved-method.interface';
import { getExpireDate } from './pipes/get-expire-date.pipe';
import { getCutterName } from './pipes/name-cutter.pipe';

const iconsPath = `${cdnUrl}/paystation4/brand-logos`;

export const getSavedMethodTemplate = (method: SavedMethod): string => {
  const expireDate = getExpireDate(method.cardExpiryDate);
  const name = getCutterName(method);
  let iconName: string;

  if (!method.iconName) {
    iconName = 'default.svg';
  } else {
    iconName = method.iconName;
  }

  return `<li class='saved-method' data-payment-method-id='${
    method.pid
  }' data-saved-method-id='${method.id}'>
    <a tabindex='0' href='${method.id}'>
      <span class='icon'>
        <img src='${iconsPath}/${iconName}' alt='${method.name}'>
      </span>
        <span class='payment-method-name'>${method.psName}</span>
        <span class='name'>${name}</span>
        ${expireDate ? `<span class='expire-date'>${expireDate}</span>` : ''}
    </a>
</li>`;
};
