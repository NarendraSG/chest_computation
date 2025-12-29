import { calculateProjectedPension } from './projectedPensionWithoutChest.js';
// import { calculateProjectedPension } from './projectedPensionWithoutChest-noloop.js';

const testCases = [
  {
    currentChestPension: 200,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: false,
    savingsRule: {
      roundUp: false,
      poundUp: false,
      monthlySaving: {
        enabled: false,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: false,
        savingsPerDay: 1,
      },
      chestflixSaving: false,
    },
    expectedProjectedPension: 2727
  },
  {
    currentChestPension: 0,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: true,
    savingsRule: {
      roundUp: false,
      poundUp: false,
      monthlySaving: {
        enabled: false,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: false,
        savingsPerDay: 1,
      },
      chestflixSaving: false,
    },
    expectedProjectedPension: 65675
  },
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
      poundUp: false,
      monthlySaving: {
        enabled: false,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: false,
        savingsPerDay: 1,
      },
      chestflixSaving: false,
    },
    expectedProjectedPension: 62227
  },
  {
    currentChestPension: 200,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: true,
    savingsRule: {
      roundUp: false,
      poundUp: true,
      monthlySaving: {
        enabled: false,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: false,
        savingsPerDay: 1,
      },
      chestflixSaving: false,
    },
    expectedProjectedPension: 134949
  },
  {
    currentChestPension: 200,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: true,
    savingsRule: {
      roundUp: false,
      poundUp: false,
      monthlySaving: {
        enabled: true,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: false,
        savingsPerDay: 1,
      },
      chestflixSaving: false,
    },
    expectedProjectedPension: 24462
  },
  {
    currentChestPension: 200,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: true,
    savingsRule: {
      roundUp: false,
      poundUp: false,
      monthlySaving: {
        enabled: false,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: true,
        savingsPerDay: 1,
      },
      chestflixSaving: false,
    },
    expectedProjectedPension: 13595
  },
  {
    currentChestPension: 200,
    currentAge: 30,
    retirementAge: 60,
    growthRateType: 'Low',
    fundFee: 0.0008,
    platformFee: 0.0045,
    withChest: true,
    savingsRule: {
      roundUp: false,
      poundUp: false,
      monthlySaving: {
        enabled: false,
        savingsPerMonth: 10,
      },
      noSpendSaving: {
        enabled: false,
        savingsPerDay: 1,
      },
      chestflixSaving: true,
    },
    expectedProjectedPension: 30961
  },
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
    expectedProjectedPension: 255286
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

    console.log(`\nTest Case ${index + 1}:`);
    console.table([{
      'Current Chest Pension': testCase.currentChestPension,
      'Current Age': testCase.currentAge,
      'Retirement Age': testCase.retirementAge,
      'Growth Rate Type': testCase.growthRateType,
      'Growth Rate': result.growthRate,
      'Fund Fee': `${(testCase.fundFee * 100).toFixed(2)}%`,
      'Platform Fee': `${(testCase.platformFee * 100).toFixed(2)}%`,
      'Projected Pension': result.toFixed(2),
      'Expected Pension': testCase.expectedProjectedPension
    }]);
  } catch (error) {
    console.log(`Test Case ${index + 1}: ERROR - ${error.message}`);
    console.log('');
  }
});
