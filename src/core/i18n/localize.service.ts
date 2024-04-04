import * as i18next from 'i18next';
import { singleton } from 'tsyringe';
import { loadDictionaries } from './dictionary-loader.function';
import { Lang } from './lang.enum';
import { LegacyLang } from './legacy-lang.enum';

@singleton()
export class LocalizeService {
  public async initDictionaries(locale: Lang = Lang.EN): Promise<void> {
    // fallback for legacy locale
    if (locale === Lang.CN) {
      locale = LegacyLang.ZH_HANS as unknown as Lang;
    }

    if (locale === Lang.TW) {
      locale = LegacyLang.ZH_HANT as unknown as Lang;
    }

    await i18next.init({
      lng: locale,
      fallbackLng: Lang.EN,
      supportedLngs: [
        ...Object.values(Lang),
        LegacyLang.ZH_HANT,
        LegacyLang.ZH_HANS,
      ],
      debug: false,
      resources: loadDictionaries(),
    });
  }

  public translate(key: string): string {
    return i18next.t(key);
  }

  public getAvailableLanguages(): Lang[] {
    return Object.values({ ...Lang });
  }
}
