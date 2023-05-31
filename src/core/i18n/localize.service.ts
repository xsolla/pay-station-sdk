import i18next from 'i18next';
import { singleton } from 'tsyringe';
import { loadDictionaries } from './dictionary-loader.function';
import { Lang } from './lang.enum';

@singleton()
export class LocalizeService {
  public async initDictionaries(): Promise<void> {
    await i18next.init({
      lng: Lang.EN,
      fallbackLng: Lang.EN,
      supportedLngs: Object.values(Lang),
      debug: false,
      resources: loadDictionaries(),
    });
  }

  public translate(key: string): string {
    return i18next.t(key);
  }

  public async changeLang(lang: Lang): Promise<void> {
    // fallback for legacy locale
    if (lang === Lang.CN) {
      lang = Lang.ZH_HANS;
    }

    await i18next.changeLanguage(lang);
  }
}
