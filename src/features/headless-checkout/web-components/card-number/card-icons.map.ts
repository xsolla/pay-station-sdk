import { CardType } from './card-type.enum';

import americanExpress from '../../../../assets/icons/payment-icons/american-express.svg';
import chinaUnionPay from '../../../../assets/icons/payment-icons/china-union-pay.svg';
import discover from '../../../../assets/icons/payment-icons/discover.svg';
import hipercard from '../../../../assets/icons/payment-icons/hipercard.svg';
import maestro from '../../../../assets/icons/payment-icons/maestro.svg';
import mir from '../../../../assets/icons/payment-icons/mir.svg';
import aura from '../../../../assets/icons/payment-icons/aura.svg';
import dankort from '../../../../assets/icons/payment-icons/dankort.svg';
import dinersClubs from '../../../../assets/icons/payment-icons/dinersclub.svg';
import elo from '../../../../assets/icons/payment-icons/elo.svg';
import jcb from '../../../../assets/icons/payment-icons/jcb.svg';
import mastercard from '../../../../assets/icons/payment-icons/mastercard.svg';
import naranja from '../../../../assets/icons/payment-icons/naranja.svg';
import visa from '../../../../assets/icons/payment-icons/visa.svg';
import defaultCard from '../../../../assets/icons/payment-icons/default.svg';

export const cardIconsMap = {
  [CardType.AMERICAN_EXPRESS]: americanExpress,
  [CardType.CHINA_UNION_PAY]: chinaUnionPay,
  [CardType.DEFAULT_CARD]: defaultCard,
  [CardType.DISCOVER]: discover,
  [CardType.HIPERCARD]: hipercard,
  [CardType.MAESTRO]: maestro,
  [CardType.MIR]: mir,
  [CardType.POSTEPAY]: null,
  [CardType.AURA]: aura,
  [CardType.DANKORT]: dankort,
  [CardType.DINERS_CLUBS]: dinersClubs,
  [CardType.ELO]: elo,
  [CardType.JCB]: jcb,
  [CardType.MASTERCARD]: mastercard,
  [CardType.NARANJA]: naranja,
  [CardType.VISA]: visa,
};
