import { errorsHtmlWrapperClassName } from './errors-html-wrapper-classname.const';
import { applePayButtonClassName } from './apple-pay-button-classname.const';

export const getApplePayComponentTemplate = (
  secureHtml: string,
  error?: string,
): string => {
  return `
  <div class='${errorsHtmlWrapperClassName}'>${error ?? ''}</div>
  <div class='${applePayButtonClassName}'>
    ${secureHtml}
  </div>`;
};
