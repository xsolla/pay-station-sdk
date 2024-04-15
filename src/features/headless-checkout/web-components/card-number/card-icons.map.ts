import { CardType } from './card-type.enum';
import { cdnIconsUrl } from '../../environment';

const iconsPath = `${cdnIconsUrl}/payment-icons`;
const defaultIconPath = `${cdnIconsUrl}/default-payment-icons/default-card.svg`;

export const cardIconsMap = {
  [CardType.AMERICAN_EXPRESS]: `${iconsPath}/american-express.svg`,
  [CardType.CHINA_UNION_PAY]: `${iconsPath}/unionpay.svg`,
  [CardType.DEFAULT_CARD]: defaultIconPath,
  [CardType.DISCOVER]: `${iconsPath}/discover.svg`,
  [CardType.HIPERCARD]: `${iconsPath}/hipercard.svg`,
  [CardType.MAESTRO]: `${iconsPath}/maestro.svg`,
  [CardType.MIR]: `${iconsPath}/mir.svg`,
  [CardType.POSTEPAY]: null,
  [CardType.AURA]: `${iconsPath}/aura.svg`,
  [CardType.DANKORT]: `${iconsPath}/dankort.svg`,
  [CardType.DINERS_CLUBS]: `${iconsPath}/dinersclub.svg`,
  [CardType.ELO]: `${iconsPath}/elo.svg`,
  [CardType.JCB]: `${iconsPath}/jcb.svg`,
  [CardType.MASTERCARD]: `${iconsPath}/mastercard.svg`,
  [CardType.NARANJA]: null,
  [CardType.VISA]: `${iconsPath}/visa.svg`,
};
