export function getDaysGoneBy(regDate: string): number {
  const pastDate = new Date(regDate);
  const today = new Date();

  // Clear time portion for accurate full-day diff
  pastDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - pastDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
