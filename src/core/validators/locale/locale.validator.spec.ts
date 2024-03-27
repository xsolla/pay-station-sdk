import { Lang } from '../../../core/i18n/lang.enum';
import { localeValidator } from './locale.validator';
import { LegacyLang } from '../../i18n/legacy-lang.enum';

describe('localeValidator', () => {
  it('Should map ZH_HANS into CN locale', () => {
    expect(localeValidator(LegacyLang.ZH_HANS)).toEqual(Lang.CN);
  });

  it('Should map ZH_HANT into CN locale', () => {
    expect(localeValidator(LegacyLang.ZH_HANT)).toEqual(Lang.CN);
  });

  it('Should not map other locales', () => {
    expect(localeValidator(Lang.EN)).toEqual(Lang.EN);
  });
});
