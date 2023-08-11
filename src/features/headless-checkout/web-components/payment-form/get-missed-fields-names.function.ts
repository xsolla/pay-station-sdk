export function getMissedFieldsNames(
  expectedFieldsNames: string[],
  existsControlsNames: Array<string | null>
): string[] {
  const fieldsExistsMap: { [k: string]: boolean } = {};

  for (const name of existsControlsNames) {
    if (name) {
      fieldsExistsMap[name] = true;
    }
  }

  const missedFieldsNames = [];
  for (const name of expectedFieldsNames) {
    if (!fieldsExistsMap[name]) {
      missedFieldsNames.push(name);
    }
  }
  return missedFieldsNames;
}
