export const tick = async (delay = 0): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));
