export const drawIf = (
  condition: unknown,
  template: string,
  elseTemplate = '',
): string => {
  if (condition) return template;
  return elseTemplate;
};
