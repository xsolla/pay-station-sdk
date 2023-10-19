import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { webComponentsFieldsNamesMap } from './web-components-fields-names.map';

export const getWebComponentByFieldName = (
  name: string
): WebComponentTagName => {
  const webComponent: undefined | WebComponentTagName =
    webComponentsFieldsNamesMap[name];

  return webComponent ?? WebComponentTagName.TextComponent;
};
