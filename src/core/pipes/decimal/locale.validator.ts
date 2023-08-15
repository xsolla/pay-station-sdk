import { Lang } from '../../i18n/lang.enum';

const specialLocaleMap = new Map<Lang, Lang>([
  [Lang.ZH_HANS, Lang.CN],
  [Lang.ZH_HANT, Lang.CN],
]);

export const localeValidator = (locale: Lang): Lang => {
  if (specialLocaleMap.has(locale)) {
    return specialLocaleMap.get(locale)!;
  }

  return locale;
};
