import {
  TextComponentData,
  getTextComponentTemplate,
} from '../text-component/text.compontent.template';

export interface CardNumberComponentData extends TextComponentData {
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
