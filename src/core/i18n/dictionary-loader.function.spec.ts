import { loadDictionaries } from './dictionary-loader.function';

describe('DictionaryLoader', () => {
  it('Should load dictionary with 20 languages', () => {
    const supportLangCount = 20;

    const result = loadDictionaries();

    expect(Object.keys(result).length).toBe(supportLangCount);
  });
});
