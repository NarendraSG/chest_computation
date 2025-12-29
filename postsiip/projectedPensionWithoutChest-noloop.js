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

/**
 * Calculate projected pension using closed-form mathematical formula (no loops/recursion)
 * 
 * Mathematical approach:
 * - Net growth factor per year: g = (1 + growthRate) × (1 - totalFee)
 * - Contribution growth factor: s = (1 + SavingGrowthRate)
 * - Final pension = P₀ × g^n + C₀ × s × g^n × ((1 - (s/g)^n) / (1 - s/g))
 * 
 * Where:
 * - P₀ = initial pension
 * - n = number of years
 * - C₀ = base savings (first year contribution divided by s)
 * - g = net growth factor
 * - s = savings growth factor
 */
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
  const growthRatePercentage = {
    Low: 0.02,
    Medium: 0.05,
    High: 0.08,
  };

  let growthRate = 0;

  if(!withChest){
    growthRate = growthRateMap[growthRateType];
  }else if(isAllSavingsRuleDisabled(savingsRule)){
    growthRate = growthRatePercentage[growthRateType];
  }else{
    growthRate = growthRateMap[growthRateType];
  }
  
  if (growthRate === undefined) {
    throw new Error(
      'Invalid growth rate type. Must be "Low", "Medium", or "High".'
    );
  }

  const totalFee = fundFee + platformFee;
  const numberOfYears = retirementAge - currentAge;
  
  // If no years to compound, return current pension
  if (numberOfYears <= 0) {
    return currentChestPension;
  }

  // Net growth factor per year: pension grows and then fees are deducted
  // Each year: pension_new = pension_old * (1 + growthRate) * (1 - totalFee) + contribution
  const netGrowthFactor = (1 + growthRate) * (1 - totalFee);
  
  // Contribution growth factor
  const savingsGrowthFactor = 1 + SavingGrowthRate;
  
  // Calculate base savings (annual contribution)
  const baseSavings = getBaseSavings(withChest, savingsRule);
  
  // Calculate pension growth without contributions
  const pensionGrowth = currentChestPension * Math.pow(netGrowthFactor, numberOfYears);
  
  // Calculate contribution component using geometric series formula
  let contributionComponent = 0;
  
  if (baseSavings > 0) {
    // Contributions start at baseSavings * savingsGrowthFactor^1 in year 0
    // and grow to baseSavings * savingsGrowthFactor^n in year n-1
    // Each contribution also grows with netGrowthFactor for remaining years
    
    // Using geometric series sum formula:
    // Sum = C₀ × s × g^n × ((1 - (s/g)^n) / (1 - s/g))
    // where s = savingsGrowthFactor, g = netGrowthFactor
    
    const ratio = savingsGrowthFactor / netGrowthFactor;
    
    if (Math.abs(ratio - 1) < 1e-10) {
      // Special case: when s ≈ g, use arithmetic series
      contributionComponent = baseSavings * savingsGrowthFactor * numberOfYears * Math.pow(netGrowthFactor, numberOfYears - 1);
    } else {
      // General case: geometric series
      const geometricSum = (1 - Math.pow(ratio, numberOfYears)) / (1 - ratio);
      contributionComponent = baseSavings * savingsGrowthFactor * Math.pow(netGrowthFactor, numberOfYears) * geometricSum;
    }
  }
  
  const finalPension = pensionGrowth + contributionComponent;
  
  return getRound(finalPension);
}

function getBaseSavings(
  withChest,
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
  if (!withChest) return 0;
  else if(withChest && !savingsRule.roundUp && !savingsRule.poundUp && !savingsRule.monthlySaving.enabled && !savingsRule.noSpendSaving.enabled && !savingsRule.chestflixSaving) return TotalSavingsWhenAllDisabled;

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

  return totalSavings;
}

function getRound(num) {
  return parseFloat(Number(num).toFixed(2));
}

function isAllSavingsRuleDisabled(savingsRule){
  return  !(savingsRule.roundUp || savingsRule.poundUp || savingsRule.monthlySaving.enabled || savingsRule.noSpendSaving.enabled || savingsRule.chestflixSaving)
}

