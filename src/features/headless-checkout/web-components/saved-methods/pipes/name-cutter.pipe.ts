import { SavedMethod } from '../../../../../core/saved-method.interface';

const replacerChar = '*';

function findFirstPositionOfNotReplacedChar(value: string): number {
  const replacedCharLastPosition = value.split('').lastIndexOf(replacerChar);
  return replacedCharLastPosition > -1
    ? replacedCharLastPosition + 1
    : replacedCharLastPosition;
}

function getTextForCard(cardNumber: string): string {
  const notReplacedCharFirstPosition =
    findFirstPositionOfNotReplacedChar(cardNumber);
  return notReplacedCharFirstPosition === -1
    ? `${cardNumber}`
    : `•• ${cardNumber.slice(notReplacedCharFirstPosition).trim()}`;
}

function getTextForEmail(email: string): string {
  const firstPositionChar = email.indexOf('*');
  const notReplacedCharFirstPosition =
    findFirstPositionOfNotReplacedChar(email);
  return (
    email.slice(0, firstPositionChar).trim() +
    '••' +
    email.slice(notReplacedCharFirstPosition).trim()
  );
}

export function getCutterName(method: SavedMethod): string {
  if (method.type === 'card') {
    return getTextForCard(method.name);
  }

  if (method.name.includes('@')) {
    return getTextForEmail(method.name);
  }

  return method.name.replace(/\*/g, '•');
}
