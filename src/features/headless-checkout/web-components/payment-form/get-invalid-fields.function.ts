import { FieldSettings } from './field-settings.interface';

export function getInvalidFields(
  expectedFieldsNames: FieldSettings[],
  existsControlsNames: FieldSettings[],
): FieldSettings[] {
  const fieldsExistsCountMap: { [k: string]: number } = {};
  for (const { name } of existsControlsNames) {
    if (name) {
      const count = fieldsExistsCountMap[name];
      if (!count) {
        fieldsExistsCountMap[name] = 1;
      } else {
        fieldsExistsCountMap[name] = count + 1;
      }
    }
  }

  const invalidFieldNames: FieldSettings[] = [];

  // eslint-disable-next-line prefer-const
  for (let [name, count] of Object.entries(fieldsExistsCountMap)) {
    const invalidField = existsControlsNames.find(
      (field) => field.name === name,
    );

    if (!invalidField) {
      continue;
    }

    if (!expectedFieldsNames.some((field) => field.name === name)) {
      invalidFieldNames.push(invalidField);
    } else if (count > 1) {
      while (count > 1) {
        invalidFieldNames.push(invalidField);
        count--;
      }
    }
  }

  return invalidFieldNames;
}
