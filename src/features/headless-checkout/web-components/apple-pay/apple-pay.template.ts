import { TextComponentConfig } from '../text-component/text-component.config.interface';
import { errorsHtmlWrapperClassName } from './errors-html-wrapper-classname.const';

export interface CardNumberComponentData extends TextComponentConfig {
  secureHtml: string;
  isCardIconShown: boolean;
}

export const getApplePayComponentTemplate = (
  secureHtml: string,
  error?: string
): string => {
  return `
  <div>
    ${secureHtml}
  </div>
  <div class='${errorsHtmlWrapperClassName}'>${error ?? ''}</div>`;
};
