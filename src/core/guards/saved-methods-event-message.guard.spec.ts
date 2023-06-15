import { EventName } from '../../core/event-name.enum';
import { isSavedMethodsEventMessage } from './saved-methods-event-message.guard';

describe('Saved methods event message guard', () => {
  it('Should return true', () => {
    const isSavedMethodMessage = isSavedMethodsEventMessage({
      name: EventName.getSavedMethods,
      data: { methods: [] },
    });

    expect(isSavedMethodMessage).toBeTruthy();
  });
  it('Should return false', () => {
    const isSavedMethodMessage = isSavedMethodsEventMessage({
      name: EventName.initPayment,
    });

    expect(isSavedMethodMessage).toBeFalsy();
  });
});
