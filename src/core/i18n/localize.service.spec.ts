import i18next from 'i18next';
import { container } from 'tsyringe';
import { LocalizeService } from './localize.service';

describe('LocalizeService', () => {
  let localizeService: LocalizeService;

  beforeEach(() => {
    container.clearInstances();

    localizeService = container.createChildContainer().resolve(LocalizeService);
  });

  it('Should init dictionaries', async () => {
    await localizeService.initDictionaries();

    expect(i18next.isInitialized).toBe(true);
  });

  it('Should translate', async () => {
    await i18next.init({
      lng: 'en',
      resources: {
        en: {
          translation: {
            hello: 'Hello World!',
          },
        },
      },
    });

    const result = localizeService.translate('hello');

    expect(result).toEqual('Hello World!');
  });
});
