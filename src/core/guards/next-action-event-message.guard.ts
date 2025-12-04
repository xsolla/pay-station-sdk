import { NextAction } from '../actions/next-action.interface';
import { EventName } from '../event-name.enum';
import { Message } from '../message.interface';
import { isEventMessage } from './event-message.guard';

export const isNextActionEventMessage = (
  messageData: unknown,
): messageData is Message<NextAction> => {
  if (isEventMessage(messageData)) {
    return messageData.name === EventName.nextAction;
  }

  return false;
};
