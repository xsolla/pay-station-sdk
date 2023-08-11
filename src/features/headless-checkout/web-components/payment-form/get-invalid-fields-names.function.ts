export function getInvalidFieldsNames(
  expectedFieldsNames: string[],
  existsControlsNames: Array<string | null>
): string[] {
  const fieldsExistsCountMap: { [k: string]: number } = {};
  for (const name of existsControlsNames) {
    if (name) {
      const count = fieldsExistsCountMap[name];
      if (!count) {
        fieldsExistsCountMap[name] = 1;
      } else {
        fieldsExistsCountMap[name] = count + 1;
      }
    }
  }

  const invalidFieldNames = [];

  // eslint-disable-next-line prefer-const
  for (let [name, count] of Object.entries(fieldsExistsCountMap)) {
    if (!expectedFieldsNames.some((value) => value === name)) {
      invalidFieldNames.push(name);
    } else if (count > 1) {
      while (count > 1) {
        invalidFieldNames.push(name);
        count--;
      }
    }
  }

  return invalidFieldNames;
}
