import { EventName } from '../../../core/event-name.enum';
import { Message } from '../../../core/message.interface';
import { getLegalComponentConfigHandler } from './get-legal-component-config.handler';
import { LegalComponentConfig } from '../web-components/legal/legal-component.config.interface';

const mockMessage: Message<{ config: LegalComponentConfig }> = {
  name: EventName.getLegalComponentConfig,
  data: { config: {} as unknown as LegalComponentConfig },
};
describe('getLegalComponentConfigHandler', () => {
  it('Should handle data', () => {
    expect(getLegalComponentConfigHandler(mockMessage)).toEqual({
      isHandled: true,
      value: {} as unknown as LegalComponentConfig,
    });
  });
  it('Should return null', () => {
    expect(
      getLegalComponentConfigHandler({ name: EventName.initPayment }),
    ).toBeNull();
  });
});
