import i18next from 'i18next';
import { container } from 'tsyringe';
import { LocalizeService } from './localize.service';

describe('LocalizeService', () => {
  let localizeService: LocalizeService;

  beforeEach(() => {
    container.clearInstances();

    localizeService = container.createChildContainer().resolve(LocalizeService);
  });

  it('Should init dictionaries', () => {
    const spy = spyOn(i18next, 'init');

    void localizeService.initDictionaries();

    expect(spy).toHaveBeenCalled();
  });

  it('Should translate', () => {
    const expectedValue = 'Hello World!';

    spyOn(i18next, 't').and.returnValue(expectedValue);

    const result = localizeService.translate('hello');

    expect(result).toEqual(expectedValue);
  });
});
