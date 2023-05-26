import { Message } from '../../../core/post-messages-client/message.interface';

export const isEventMessage = (messageData: unknown): messageData is Message =>
  !!(messageData as Message).name;
