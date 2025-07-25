import { loadDictionaries } from './dictionary-loader.function';

describe('DictionaryLoader', () => {
  it('Should load dictionary with 28 languages', () => {
    const supportLangCount = 28;

    const result = loadDictionaries();

    expect(Object.keys(result).length).toBe(supportLangCount);
  });
});
