import {
  getRoundUpForYear,
  getPoundUpForYear,
  getMonthlySavingForYear,
  getNoSpendSavingForYear,
  getChestflixSavingForYear,
} from './savingRule.js';

const TotalSavingsWhenAllDisabled = 1760;
const SavingGrowthRate = 0.0049;
const NumberOfTransactionPerDay = 2;
const RoundUpTransactionValue = 0.45;
const PoundUpTransactionValue = 1;
const TaxRate = 0.25;
const NoSpendDayPerMonth = 5;
const NetflixMonthlyPlan = 12.99;

export function calculateProjectedPension(
  currentChestPension,
  currentAge,
  retirementAge,
  growthRateType,
  fundFee,
  platformFee,
  withChest = true,
  savingsRule = {
    roundUp: true,
    poundUp: true,
    monthlySaving: {
      enabled: true,
      savingsPerMonth: 10,
    },
    noSpendSaving: {
      enabled: true,
      savingsPerDay: 10,
    },
    chestflixSaving: true,
  }
) {
  const growthRateMap = {
    Low: 0.0968,
    Medium: 0.1009,
    High: 0.1063,
  };

  const growthRate = growthRateMap[growthRateType];
  if (growthRate === undefined) {
    throw new Error(
      'Invalid growth rate type. Must be "Low", "Medium", or "High".'
    );
  }

  const totalFee = fundFee + platformFee;
  let pension = currentChestPension;
  let chestPensionContribution = getSavings(withChest, savingsRule);
  // const logger = [];

  for (let age = currentAge; age < retirementAge; age++) {
    const pensionDrawdown = 0;
    const annualGrowth = getRound(pension * growthRate);
    const fee = getRound((pension + pensionDrawdown + annualGrowth) * totalFee);

    const closingPension =
      pension + pensionDrawdown + annualGrowth - fee + chestPensionContribution;

    // logger.push({
    //   age,
    //   pension,
    //   pensionDrawdown,
    //   annualGrowth,
    //   fee,
    //   closingPension,
    //   chestPensionContribution,
    // });

    pension = closingPension;
    chestPensionContribution = getRound(
      chestPensionContribution * (1 + SavingGrowthRate)
    );
  }

  // console.table(logger, [
  //   'age',
  //   'pension',
  //   'pensionDrawdown',
  //   'annualGrowth',
  //   'fee',
  //   'chestPensionContribution',
  //   'closingPension',
  // ]);

  return pension;
}

function getSavings(
  withChest,
  savingsRule = {
    roundUp: true,
    poundUp: true,
    monthlySaving: true,
    noSpendSaving: true,
    chestflixSaving: true,
  }
) {
  if (!withChest) return 0;

  let totalSavings = 0;

  totalSavings += savingsRule.roundUp
    ? getRoundUpForYear(
        NumberOfTransactionPerDay,
        RoundUpTransactionValue,
        TaxRate
      )
    : 0;
  totalSavings += savingsRule.poundUp
    ? getPoundUpForYear(
        NumberOfTransactionPerDay,
        PoundUpTransactionValue,
        TaxRate
      )
    : 0;
  totalSavings += savingsRule.monthlySaving.enabled
    ? getMonthlySavingForYear(
        savingsRule.monthlySaving.savingsPerMonth,
        TaxRate
      )
    : 0;
  totalSavings += savingsRule.noSpendSaving.enabled
    ? getNoSpendSavingForYear(
        savingsRule.noSpendSaving.savingsPerDay,
        NoSpendDayPerMonth,
        TaxRate
      )
    : 0;
  totalSavings += savingsRule.chestflixSaving
    ? getChestflixSavingForYear(NetflixMonthlyPlan, TaxRate)
    : 0;

  return totalSavings > 0
    ? getRound(totalSavings)
    : TotalSavingsWhenAllDisabled;
}

function getRound(num) {
  return parseFloat(Number(num).toFixed(2));
}
