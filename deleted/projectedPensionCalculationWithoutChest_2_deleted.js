let debugg = [];

/**
 * Calculate closing pension position at Retirement age
 *
 * @param {number} currentAge - Current age (N)
 * @param {number} currentSalary - Salary at current age
 * @param {number} contributionPercent - Contribution percentage (P)
 * @param {number} previousYearClosingPension - Closing pension at age N - 1
 * @param {number} growthRate - Pension growth rate (e.g. 0.02, 0.05, 0.08)
 * @param {number} retirementAge - Retirement age (default 60)
 * @returns {number} Closing pension position at retirement
 */
export function calculateProjectedPension(
  currentAge,
  currentSalary,
  contributionPercent,
  previousYearClosingPension,
  growthRate,
  retirementAge = 60
) {
  const OFF_PLATFORM_FEE = -0.0062;
  const SALARY_GROWTH_FACTOR = 0.0049;

  let openingPension = previousYearClosingPension;
  let salaryAtAge = currentSalary;

  for (let age = currentAge; age < retirementAge; age++) {
    // A: Opening pension position
    const A = openingPension;

    // B: Pension drawdown
    const B = 0;

    // C: Annual growth
    const C = getRound(A * growthRate);

    // D: Annual fees
    const D = getRound(OFF_PLATFORM_FEE * (A + B + C));

    // E: Workplace pension contribution
    const E = getRound((contributionPercent / 100) * salaryAtAge);

    // F: Closing pension
    const F = getRound(A + B + C + D + E);

    // console.log(
    //   `Age: ${age}, Salary: ${salaryAtAge.toFixed(
    //     2
    //   )}, Closing Pension: ${F}`
    // );

    // Prepare for next year
    openingPension = F;
    salaryAtAge = getRound(salaryAtAge * (1 + SALARY_GROWTH_FACTOR));

    debugg.push({
      age,
      openingPension,
      annualGrowth: C,
      annualFees: D,
      workplacePensionContribution: E,
      closingPension: F,
    });
  }

  return openingPension;
}

function getRound(x) {
  // return Math.round(x * 100) / 100;
  return Math.ceil(x * 100) / 100;
  // return Math.ceil(x);
}

// const currentAge = 30;
// const currentSalary = 50000;
// const contributionPercent = 4;
// const previousYearClosingPension = 0;
// const retirementAge = 35;

// [2, 5, 8].map((g) => {
//   // console.log('###################################');

//   console.log(
//     `${g}% `,
//     calculateProjectedPension(
//       currentAge,
//       currentSalary,
//       contributionPercent,
//       previousYearClosingPension,
//       g / 100,
//       retirementAge
//     )
//   );

//   // console.table(debugg, [
//   //   'age',
//   //   'openingPension',
//   //   'annualGrowth',
//   //   'annualFees',
//   //   'workplacePensionContribution',
//   //   'closingPension',
//   // ]);

//   // console.log('###################################');
// });
