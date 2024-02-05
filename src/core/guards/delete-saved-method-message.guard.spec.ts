import { EventName } from '../event-name.enum';
import { isDeleteSavedMethodMessage } from './delete-saved-method-message.guard';

describe('Error event message type guard', () => {
  it('Should return true', () => {
    expect(
      isDeleteSavedMethodMessage({ name: EventName.deleteSavedMethod }),
    ).toBeTruthy();
  });
  it('Should return false', () => {
    expect(isDeleteSavedMethodMessage({})).toBeFalsy();
  });
});
