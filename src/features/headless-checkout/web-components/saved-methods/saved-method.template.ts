import { cdnIconsUrl } from '../../environment';
import { SavedMethod } from '../../../../core/saved-method.interface';
import { getExpireDate } from './pipes/get-expire-date.pipe';
import { getCutterName } from './pipes/name-cutter.pipe';

const iconsPath = `${cdnIconsUrl}/brand-logos`;
const defaultIconPath = `${cdnIconsUrl}/default-payment-icons/default.svg`;
const deleteIcon = `${cdnIconsUrl}/common-icons/trash-can--line.svg`;

export const getSavedMethodTemplate = (
  method: SavedMethod,
  isDeleteMode?: boolean,
): string => {
  const expireDate = getExpireDate(method.cardExpiryDate);
  const name = getCutterName(method);
  let iconPath: string;

  if (!method.iconName) {
    iconPath = defaultIconPath;
  } else {
    iconPath = `${iconsPath}/${method.iconName}`;
  }

  return `<li class='saved-method' data-payment-method-id='${
    method.pid
  }' data-saved-method-id='${method.id}' data-saved-method-type='${
    method.type
  }'>
    <a tabindex='0' href='${method.id}'>
      <span class='icon'>
        <img src='${iconPath}' alt='${
          method.name
        }' onerror="this.onerror=null; this.src='${defaultIconPath}'">
      </span>
        <span class='name'>${name}</span>
        ${expireDate ? `<span class='expire-date'>${expireDate}</span>` : ''}
        ${
          isDeleteMode
            ? `<button class='psdk-delete-saved-method-button'>
                  <img src='${deleteIcon as string}'>
                </button>`
            : ''
        }
    </a>
</li>`;
};
