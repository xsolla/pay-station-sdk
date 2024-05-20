export const timeout = async (delay: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));
