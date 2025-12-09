import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { DefaultSubmitButtonAttributes } from './default-submit-button/default-submit-button-attributes.enum';

export const getSubmitButtonTemplate = (
  text: string,
  isLoading: boolean,
): string => {
  let attributes = '';
  if (text) {
    attributes += `${DefaultSubmitButtonAttributes.text}='${text}'`;
  }
  if (isLoading) {
    attributes += `${DefaultSubmitButtonAttributes.isLoading}=${
      isLoading && 'true'
    }`;
  }
  return `
    <${WebComponentTagName.DefaultSubmitButtonComponent} ${attributes}></${WebComponentTagName.DefaultSubmitButtonComponent}>
  `;
};
