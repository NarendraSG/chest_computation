export function getRoundUpForYear(
  NumberOfTransactionPerDay,
  RoundUpTransactionValue,
  TaxRate
) {
  return (
    NumberOfTransactionPerDay * RoundUpTransactionValue * 365 * (1 + TaxRate)
  );
}

export function getPoundUpForYear(
  NumberOfTransactionPerDay,
  PoundUpTransactionValue,
  TaxRate
) {
  return (
    NumberOfTransactionPerDay * PoundUpTransactionValue * 365 * (1 + TaxRate)
  );
}

export function getMonthlySavingForYear(savingPerMonth, TaxRate) {
  return savingPerMonth * 12 * (1 + TaxRate);
}

export function getNoSpendSavingForYear(
  noSpentContributionPerDay,
  NoSpendDayPerMonth,
  TaxRate
) {
  return noSpentContributionPerDay * NoSpendDayPerMonth * 12 * (1 + TaxRate);
}

export function getChestflixSavingForYear(NetflixMonthlyPlan, TaxRate) {
  return NetflixMonthlyPlan * 12 * (1 + TaxRate);
}
