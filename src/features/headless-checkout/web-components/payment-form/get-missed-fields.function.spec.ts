import { getMissedFields } from './get-missed-fields.function';
import { FieldSettings } from './field-settings.interface';

const expectedFields = [
  { name: 'zip', type: 'text' },
  { name: 'email', type: 'text' },
];

describe('getMissedFields', () => {
  it('Should return missed fields', () => {
    const exists: FieldSettings[] = [
      { name: 'zip', type: 'text' },
      { name: 'card', type: 'text' },
    ];
    expect(getMissedFields(expectedFields, exists)).toEqual([
      { name: 'email', type: 'text' },
    ]);
  });
});
