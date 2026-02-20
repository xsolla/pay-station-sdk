const getLoaderTemplate = (): string => {
  return `
    <div class="loader"></div>
   `;
};

export const getSubmitButtonTemplate = (
  text: string,
  isLoading: boolean,
): string => {
  return `
    <button data-testid="submit-button">
      ${isLoading ? getLoaderTemplate() : text}
    </button>
  `;
};
