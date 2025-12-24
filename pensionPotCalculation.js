// PRE-SIIP Pension Pot calculation

// let debugg = [];

/**
 * Calculate closing pension position at current age
 *
 * @param {number} currentAge - Current age (N)
 * @param {number} currentSalary - Salary at current age
 * @param {number} contributionPercent - Contribution percentage (P)
 * @returns {number} Closing pension position at current age
 */
export function estimatedPensionTillAge(
  currentAge,
  currentSalary,
  contributionPercent
) {
  const START_AGE = 22;
  // const SALARY_GROWTH_FACTOR = 1.0488; // 4.88%
  const OFF_PLATFORM_FEE = -0.0062; // 0.62%

  let closingPension = 0;

  for (let age = START_AGE; age < currentAge; age++) {
    // Back-calculate salary for this age
    const salaryFactor = getSalaryGrowthFactorProduct(age, currentAge - 1);
    const salaryAtAge = getRound(currentSalary / salaryFactor);

    // Contribution for this age
    const contribution = getRound((contributionPercent / 100) * salaryAtAge);

    // Opening pension is previous year's closing pension
    const openingPension = closingPension;

    // Annual growth is 0
    const annualGrowth = 0;

    // Annual fees
    const annualFees = getRound(
      OFF_PLATFORM_FEE * (openingPension + annualGrowth)
    );

    // Closing pension calculation
    closingPension = getRound(
      openingPension + annualGrowth + annualFees + contribution
    );

    // debugg.push({
    //   age,
    //   salaryAtAge,
    //   openingPension,
    //   closingPension,
    //   annualFees,
    //   annualGrowth,
    //   contribution,
    // });
  }

  return closingPension;
}

function getSalaryGrowthFactorProduct(start, end) {
  if (start > end) return 1;
  return (
    getSalaryGrowthFactor(start) * getSalaryGrowthFactorProduct(start + 1, end)
  );
}

function getSalaryGrowthFactor(age) {
  if (age <= 30) return 1.0488;
  else if (age <= 40) return 1.0244;
  else return 1.0049;
}

function getRound(x) {
  // return Math.round(x * 100) / 100;
  // return Math.ceil(x * 100) / 100;
  return Math.ceil(x);
}

// console.log(calculateClosingPension(30, 50000, 4));

// console.table(debugg, [
//   'salaryAtAge',
//   'age',
//   'openingPension',
//   'annualGrowth',
//   'annualFees',
//   'contribution',
//   'closingPension',
// ]);
