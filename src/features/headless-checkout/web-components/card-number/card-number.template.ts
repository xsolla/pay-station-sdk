import { getTextComponentTemplate } from '../text-component/text.compontent.template';
import { TextComponentConfig } from '../text-component/text-component.config.interface';

export interface CardNumberComponentData extends TextComponentConfig {
  secureHtml: string;
  isCardIconShown: boolean;
}

export const getCardNumberComponentTemplate = ({
  secureHtml,
  title,
  error,
  tooltip,
  isCardIconShown,
}: CardNumberComponentData): string => {
  const additionalControls = isCardIconShown
    ? '<span class="card-icon"></span>'
    : '';
  return getTextComponentTemplate({
    secureHtml,
    title,
    error,
    tooltip,
    additionalControls,
  });
};
