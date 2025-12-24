/**
 * Calculate projected pension with chest
 * Returns closing pension at (retirementAge - 1)
 *
 * @param {number} currentAge
 * @param {number} retirementAge
 * @param {number} savingsFromPot - Constant yearly contribution (E)
 * @param {number} growthRate - G (e.g. 0.02, 0.05, 0.08)
 * @param {number} fundFee - H
 * @param {number} platformFee - I (e.g. -0.0062)
 * @returns {number}
 */
export function projectedPensionWithChest(
  currentAge,
  retirementAge,
  savingsFromPot,
  growthRate,
  fundFee,
  platformFee
) {
  // console.log(`Project Pension Wiht Chest

  // ${JSON.stringify({
  //   currentAge,
  //   retirementAge,
  //   savingsFromPot,
  //   growthRate,
  //   fundFee,
  //   platformFee,
  // })}

  // `);

  const years = retirementAge - currentAge;
  if (years <= 0) return 0;

  const alpha = (1 + growthRate) * (1 - (fundFee + platformFee));

  // Safety for alpha ≈ 1
  if (Math.abs(alpha - 1) < 1e-10) {
    return savingsFromPot * years;
  }

  return (savingsFromPot * (Math.pow(alpha, years) - 1)) / (alpha - 1);
}

// const inputs = [
//   {
//     currentAge: 30,
//     retirementAge: 60,
//     savingsFromPot: 1760,
//     growthRate: 0.02,
//     fundFee: 0.0008,
//     platformFee: 0.0045,
//   },
// {
//   currentAge: 30,
//   retirementAge: 40,
//   savingsFromPot: 1760,
//   growthRate: 0.02,
//   fundFee: 0.0008,
//   platformFee: 0.0045,
// },
// {
//   currentAge: 30,
//   retirementAge: 45,
//   savingsFromPot: 1760,
//   growthRate: 0.02,
//   fundFee: 0.0008,
//   platformFee: 0.0045,
// },
// {
//   currentAge: 30,
//   retirementAge: 60,
//   savingsFromPot: 1760,
//   growthRate: 0.02,
//   fundFee: 0.0008,
//   platformFee: 0.0045,
// },
// ];

// inputs.forEach((input) => {
//   const {
//     currentAge,
//     retirementAge,
//     savingsFromPot,
//     growthRate,
//     fundFee,
//     platformFee,
//   } = input;
//   console.log(
//     `Age: ${retirementAge}                  Savings: ${projectedPensionWithChest(
//       currentAge,
//       retirementAge,
//       savingsFromPot,
//       growthRate,
//       fundFee,
//       platformFee
//     )}`
//   );
// });
