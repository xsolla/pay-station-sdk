import * as i18next from 'i18next';
import { singleton } from 'tsyringe';
import { loadDictionaries } from './dictionary-loader.function';
import { Lang } from './lang.enum';
import { LegacyLang } from './legacy-lang.enum';

@singleton()
export class LocalizeService {
  private readonly legacyLocalesMap = new Map<Lang, LegacyLang>([
    [Lang.CN, LegacyLang.ZH_HANS],
    [Lang.TW, LegacyLang.ZH_HANT],
    [Lang.PH, LegacyLang.FIL],
  ]);

  public async initDictionaries(locale: Lang = Lang.EN): Promise<void> {
    // fallback for legacy locale
    if (this.legacyLocalesMap.has(locale)) {
      locale = this.legacyLocalesMap.get(locale) as unknown as Lang;
    }

    await i18next.init({
      lng: locale,
      fallbackLng: Lang.EN,
      supportedLngs: [
        ...Object.values(Lang),
        ...this.legacyLocalesMap.values(),
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
