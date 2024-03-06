import { WebComponentTagName } from '../../../../core/web-components/web-component-tag-name.enum';
import { FieldSettings } from './field-settings.interface';

export const getWebComponent = (field: FieldSettings): WebComponentTagName => {
  if (field.type === 'text' && field.name === 'card_number') {
    return WebComponentTagName.CardNumberComponent;
  }

  if (field.type === 'text' && field.name === 'phone') {
    return WebComponentTagName.PhoneComponent;
  }
  if (field.type === 'text') {
    return WebComponentTagName.TextComponent;
  }

  if (field.type === 'select') {
    return WebComponentTagName.SelectComponent;
  }

  if (field.type === 'check') {
    return WebComponentTagName.CheckboxComponent;
  }

  return WebComponentTagName.TextComponent;
};
