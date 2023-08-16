import { getMissedFieldsNames } from './get-missed-fields-names.function';

const expectedFieldsNames = ['zip', 'email'];

describe('getMissedFieldsNames', () => {
  it('Should return missed names', () => {
    const exists = ['zip', 'card', ''];
    expect(getMissedFieldsNames(expectedFieldsNames, exists)).toEqual([
      'email',
    ]);
  });
});
