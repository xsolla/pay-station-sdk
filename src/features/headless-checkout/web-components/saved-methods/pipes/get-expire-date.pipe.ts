export function getExpireDate(date?: { month: string; year: string }): string {
  if (!date) {
    return '';
  }

  return `${date.month}/${date.year.slice(2)}`;
}
