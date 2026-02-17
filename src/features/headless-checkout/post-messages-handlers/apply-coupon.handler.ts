import { AppliedCoupon } from '../../../core/coupon/applied-coupon.interface';
import { isCouponUpdateEventMessage } from '../../../core/guards/coupon-update-event-message.guard';
import { Message } from '../../../core/message.interface';
import { Handler } from '../../../core/post-messages-client/handler.type';

export const applyCouponHandler: Handler<AppliedCoupon> = (
  message: Message,
): { isHandled: boolean; value?: AppliedCoupon } | null => {
  if (isCouponUpdateEventMessage(message)) {
    return {
      isHandled: true,
      value: message.data!,
    };
  }
  return null;
};
