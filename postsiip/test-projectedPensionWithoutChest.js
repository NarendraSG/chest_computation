import { calculateProjectedPension } from './projectedPensionWithoutChest.js';

const testCases = [
  {
    currentChestPension: 200,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: true,
    savingsRule: {
      roundUp: true,
      poundUp: true,
      monthlySaving: {
        enabled: true,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: true,
        savingsPerDay: 1,
      },
      chestflixSaving: true,
    },
  },
];

console.log('=== Projected Pension Without Chest - Test Results ===\n');

testCases.forEach((testCase, index) => {
  try {
    const result = calculateProjectedPension(
      testCase.currentChestPension,
      testCase.currentAge,
      testCase.retirementAge,
      testCase.growthRateType,
      testCase.fundFee,
      testCase.platformFee,
      testCase.withChest,
      testCase.savingsRule
    );

    console.log(`Test Case ${index + 1}:`);
    console.log(`  Current Chest Pension: ${testCase.currentChestPension}`);
    console.log(`  Current Age: ${testCase.currentAge}`);
    console.log(`  Retirement Age: ${testCase.retirementAge}`);
    console.log(`  Growth Rate Type: ${testCase.growthRateType}`);
    console.log(`  Fund Fee: ${(testCase.fundFee * 100).toFixed(2)}%`);
    console.log(`  Platform Fee: ${(testCase.platformFee * 100).toFixed(2)}%`);
    console.log(`  Projected Pension at Retirement: ${result.toFixed(2)}`);
    console.log('');
  } catch (error) {
    console.log(`Test Case ${index + 1}: ERROR - ${error.message}`);
    console.log('');
  }
});
