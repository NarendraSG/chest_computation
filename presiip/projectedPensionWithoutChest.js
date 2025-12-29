let debugg = [];

/**
 * Loop-free projected pension calculation
 * Returns closing pension at (retirementAge - 1)
 */
export function projectedPensionWithoutChest(
  currentAge,
  currentSalary,
  contributionPercent,
  previousYearClosingPension = 0,
  growthRate,
  retirementAge = 60
) {
  const FEE_RATE = 0.0062;
  const SALARY_GROWTH = 0.0049;

  // Number of projection years
  const years = retirementAge - currentAge;
  if (years <= 0) return previousYearClosingPension;

  const alpha = (1 + growthRate) * (1 - FEE_RATE);
  const beta = 1 + SALARY_GROWTH;
  const c = contributionPercent / 100;

  // Edge safety (alpha ≈ beta)
  if (Math.abs(alpha - beta) < 1e-10) {
    return (
      Math.pow(alpha, years) *
      (previousYearClosingPension + c * currentSalary * years)
    );
  }

  return (
    Math.pow(alpha, years) * previousYearClosingPension +
    (c * currentSalary * (Math.pow(alpha, years) - Math.pow(beta, years))) /
      (alpha - beta)
  );
}

// /**
//  * Calculate closing pension position at Retirement age
//  *
//  * @param {number} currentAge - Current age (N)
//  * @param {number} currentSalary - Salary at current age
//  * @param {number} contributionPercent - Contribution percentage (P)
//  * @param {number} previousYearClosingPension - Closing pension at age N - 1
//  * @param {number} growthRate - Pension growth rate (e.g. 0.02, 0.05, 0.08)
//  * @param {number} retirementAge - Retirement age (default 60)
//  * @returns {number} Closing pension position at retirement
//  */
// export function calculateProjectedPension(
//   currentAge,
//   currentSalary,
//   contributionPercent,
//   previousYearClosingPension,
//   growthRate,
//   retirementAge = 60
// ) {
//   const OFF_PLATFORM_FEE = -0.0062;
//   const SALARY_GROWTH_FACTOR = 0.0049;

//   let openingPension = previousYearClosingPension;
//   let salaryAtAge = currentSalary;

//   for (let age = currentAge; age < retirementAge; age++) {
//     // A: Opening pension position
//     const A = openingPension;

//     // B: Pension drawdown
//     const B = 0;

//     // C: Annual growth
//     const C = getRound(A * growthRate);

//     // D: Annual fees
//     const D = getRound(OFF_PLATFORM_FEE * (A + B + C));

//     // E: Workplace pension contribution
//     const E = getRound((contributionPercent / 100) * salaryAtAge);

//     // F: Closing pension
//     const F = getRound(A + B + C + D + E);

//     // console.log(
//     //   `Age: ${age}, Salary: ${salaryAtAge.toFixed(
//     //     2
//     //   )}, Closing Pension: ${F}`
//     // );

//     // Prepare for next year
//     openingPension = F;
//     salaryAtAge = getRound(salaryAtAge * (1 + SALARY_GROWTH_FACTOR));

//     debugg.push({
//       age,
//       openingPension,
//       annualGrowth: C,
//       annualFees: D,
//       workplacePensionContribution: E,
//       closingPension: F,
//     });
//   }

//   return openingPension;
// }

// function getRound(x) {
//   // return Math.round(x * 100) / 100;
//   return Math.ceil(x * 100) / 100;
//   // return Math.ceil(x);
// }
