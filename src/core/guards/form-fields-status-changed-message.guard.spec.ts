import { EventName } from '../event-name.enum';
import { isFormFieldsStatusChangedMessage } from './form-fields-status-changed-message.guard';

describe('FormFieldsStatusChanged event message guard', () => {
  it('Should return true for matched event name', () => {
    const isCorrectEvent = isFormFieldsStatusChangedMessage({
      name: EventName.formFieldsStatusChanged,
    });

    expect(isCorrectEvent).toBeTruthy();
  });

  it('Should return false for different event name', () => {
    const isWrongEvent = isFormFieldsStatusChangedMessage({
      name: EventName.initPayment,
    });

    expect(isWrongEvent).toBeFalsy();
  });

  it('Should return false for message without name', () => {
    const isWrongEvent = isFormFieldsStatusChangedMessage({});
    expect(isWrongEvent).toBeFalsy();
  });
});
