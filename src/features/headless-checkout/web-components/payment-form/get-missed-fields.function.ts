import { FieldSettings } from './field-settings.interface';

export function getMissedFields(
  expectedFieldsNamesAndTypes: FieldSettings[],
  existsControlsNamesAndTypes: FieldSettings[],
): FieldSettings[] {
  const fieldsExistsMap: { [k: string]: boolean } = {};

  for (const field of existsControlsNamesAndTypes) {
    if (field) {
      fieldsExistsMap[field.name] = true;
    }
  }

  const missedFieldsNames = [];
  for (const field of expectedFieldsNamesAndTypes) {
    if (!fieldsExistsMap[field.name]) {
      missedFieldsNames.push(field);
    }
  }
  return missedFieldsNames;
}
