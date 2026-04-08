import { isCouponUpdateEventMessage } from '../../../core/guards/coupon-update-event-message.guard';
import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';

export const removeCouponHandler: Handler<void> = (
  message: Message,
): { isHandled: boolean } | null => {
  if (isCouponUpdateEventMessage(message)) {
    return {
      isHandled: true,
    };
  }
  return null;
};
