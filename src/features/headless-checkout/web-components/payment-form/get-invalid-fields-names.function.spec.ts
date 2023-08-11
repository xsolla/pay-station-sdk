import { getInvalidFieldsNames } from './get-invalid-fields-names.function';

const expectedFieldsNames = ['zip', 'email'];

describe('getInvalidFieldsNames', () => {
  it('Should return invalid names', () => {
    const exists = ['zip', 'card'];
    expect(getInvalidFieldsNames(expectedFieldsNames, exists)).toEqual([
      'card',
    ]);
  });

  it('Should return invalid names if duplicates', () => {
    const exists = ['zip', 'zip'];
    expect(getInvalidFieldsNames(expectedFieldsNames, exists)).toEqual(['zip']);
  });

  it('Should not filter empty name fields', () => {
    const exists = ['zip', ''];
    expect(getInvalidFieldsNames(expectedFieldsNames, exists)).toEqual([]);
  });
});
