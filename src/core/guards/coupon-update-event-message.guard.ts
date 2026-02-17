import { EventName } from '../event-name.enum';
import { Message } from '../message.interface';
import { AppliedCoupon } from '../coupon/applied-coupon.interface';
import { isEventMessage } from './event-message.guard';

export const isCouponUpdateEventMessage = (
  messageData: unknown,
): messageData is Message<AppliedCoupon | null> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.couponUpdate;
  }

  return false;
};
