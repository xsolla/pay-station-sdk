import { XsollaNumberComponentConfig } from '../xsolla-number-component.config.interface';
import { getInstructionTemplate } from './get-instruction.template';
import { getPaymentInfoTemplate } from './get-payment-info.template';
import { getSendNumberPanelTemplate } from './get-send-number-panel.template';
import { getPaymentDescription } from './get-payment-description.template';

export const getXsollaNumberComponentTemplate = ({
  emailControl,
  phoneControl,
  paymentMethod,
  xsollaNumber,
  userName,
  printUrl,
  projectName,
}: XsollaNumberComponentConfig): string => {
  let template = '';

  template += getPaymentDescription(paymentMethod);
  if (xsollaNumber) {
    template += getPaymentInfoTemplate(xsollaNumber, userName);
  }
  if (paymentMethod) {
    template += getInstructionTemplate(paymentMethod, projectName);
  }
  template += getSendNumberPanelTemplate(emailControl, phoneControl, printUrl);
  template += `<div id='send-status-container'></div>`;
  return template;
};
