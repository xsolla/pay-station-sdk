import { FormFieldsStatus } from '../../../core/form/form-fields-status.interface';
import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { formFieldsStatusChangedHandler } from './form-fields-status-changed.handler';

const formFieldsStatus = {} as unknown as FormFieldsStatus;

const mockMessage: Message<FormFieldsStatus> = {
  name: EventName.formFieldsStatusChanged,
  data: formFieldsStatus,
};

describe('formFieldsStatusChangedHandler', () => {
  it('Should handle formFieldsStatusChanged event', () => {
    expect(formFieldsStatusChangedHandler(mockMessage)).toEqual({
      isHandled: true,
      value: formFieldsStatus,
    });
  });

  it('Should not handle not formFieldsStatusChanged event', () => {
    expect(
      formFieldsStatusChangedHandler({ name: EventName.initPayment }),
    ).toBeNull();
  });
});
