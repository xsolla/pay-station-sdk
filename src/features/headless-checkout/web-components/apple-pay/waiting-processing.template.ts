export const getWaitingProcessingTemplate = (
  title: string,
  description: string,
): string => {
  return `
  <h4>${title}</h4>
  <p>${description}</p>`;
};
