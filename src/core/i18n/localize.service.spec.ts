import i18next, { TFunction } from 'i18next';
import { container } from 'tsyringe';
import { LocalizeService } from './localize.service';
import { Lang } from './lang.enum';

describe('LocalizeService', () => {
  let localizeService: LocalizeService;

  beforeEach(() => {
    localizeService = container.createChildContainer().resolve(LocalizeService);
  });

  it('Should init dictionaries', () => {
    const spy = jest.spyOn(i18next, 'init');

    void localizeService.initDictionaries();

    expect(spy).toHaveBeenCalled();
  });

  it('Should translate', () => {
    const expectedValue = 'Hello World!';
    jest.spyOn(i18next, 't').mockImplementation(() => expectedValue);

    const result = localizeService.translate('hello');

    expect(result).toEqual(expectedValue);
  });

  it('Should change language', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const stub = (): void => {};

    const spy = jest
      .spyOn(i18next, 'changeLanguage')
      .mockResolvedValue(stub as unknown as TFunction);

    void localizeService.changeLang(Lang.EN);

    expect(spy).toHaveBeenCalledWith(Lang.EN);
  });

  it('Should change CN language', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const stub = (): void => {};

    const spy = jest
      .spyOn(i18next, 'changeLanguage')
      .mockResolvedValue(stub as unknown as TFunction);

    void localizeService.changeLang(Lang.CN);

    expect(spy).toHaveBeenCalledWith(Lang.ZH_HANS);
  });
});
