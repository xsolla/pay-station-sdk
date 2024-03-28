import { Lang } from '../../i18n/lang.enum';
import { LegacyLang } from '../../i18n/legacy-lang.enum';

const specialLocaleMap = new Map<LegacyLang, Lang>([
  [LegacyLang.ZH_HANS, Lang.CN],
  [LegacyLang.ZH_HANT, Lang.CN],
]);

export const localeValidator = (locale: LegacyLang | Lang): Lang => {
  if (specialLocaleMap.has(locale as LegacyLang)) {
    return specialLocaleMap.get(locale as LegacyLang)!;
  }

  return locale as Lang;
};
