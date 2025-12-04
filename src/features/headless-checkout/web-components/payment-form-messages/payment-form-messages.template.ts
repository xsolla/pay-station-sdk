export const getPaymentFormMessagesTemplate = (messages: string[]): string => {
  const messagesHtml = messages.map(
    (message) => `<p class='form-message'>${message}</p>`,
  );
  return `<div class='payment-form-messages'>${messagesHtml.join('')}</div>`;
};
