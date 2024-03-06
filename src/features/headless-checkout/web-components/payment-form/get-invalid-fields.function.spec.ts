import { getInvalidFields } from './get-invalid-fields.function';

const expectedFields = [
  { name: 'zip', type: 'text' },
  { name: 'email', type: 'text' },
];

describe('getInvalidFields', () => {
  it('Should return invalid fields', () => {
    const exists = [
      { name: 'zip', type: 'text' },
      { name: 'card', type: 'text' },
    ];
    expect(getInvalidFields(expectedFields, exists)).toEqual([
      { name: 'card', type: 'text' },
    ]);
  });

  it('Should return invalid fields if duplicates', () => {
    const exists = [
      { name: 'zip', type: 'text' },
      { name: 'zip', type: 'text' },
    ];
    expect(getInvalidFields(expectedFields, exists)).toEqual([
      { name: 'zip', type: 'text' },
    ]);
  });

  it('Should not filter empty name fields', () => {
    const exists = [
      { name: 'zip', type: 'text' },
      { name: '', type: 'text' },
    ];
    expect(getInvalidFields(expectedFields, exists)).toEqual([]);
  });
});
