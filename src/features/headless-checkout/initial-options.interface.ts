import { Themes } from '../../core/customization/themes.type';
import { Lang } from '../../core/i18n/lang.enum';

export interface InitialOptions {
  isWebview?: boolean;
  sandbox?: boolean;
  theme?: Themes;
  language?: Lang;
  topLevelDomain?: string;
  isApplePayInstantFlowEnabled?: boolean;
}
