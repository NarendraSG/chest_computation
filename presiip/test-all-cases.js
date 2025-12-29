import { estimatedPensionTillAge } from './pensionPotCalculation.js';
import { projectedPensionWithChest } from './projectedPensionWithChest.js';
import { projectedPensionWithoutChest } from './projectedPensionWithoutChest.js';

function computeAll(
  currentAge,
  currentSalary,
  contributionPercent,
  retirementAge,
  savingsFromPot,
  growthRate,
  fundFee,
  platformFee,
  withdrawlRate
) {
  const estimatedPensionVal = estimatedPensionTillAge(
    currentAge,
    currentSalary,
    contributionPercent
  );

  const projectedPensionWithoutChestVal = projectedPensionWithoutChest(
    currentAge,
    currentSalary,
    contributionPercent,
    0,
    growthRate,
    retirementAge
  );

  const projectedPensionWithChestVal =
    projectedPensionWithoutChestVal +
    projectedPensionWithChest(
      currentAge,
      retirementAge,
      savingsFromPot,
      growthRate,
      fundFee,
      platformFee
    );

  const incomeWithoutChest = projectedPensionWithoutChestVal * withdrawlRate;
  const incomeWithChest = projectedPensionWithChestVal * withdrawlRate;

  return {
    estimatedPension: estimatedPensionVal,
    projectedPensionWithChest: projectedPensionWithChestVal,
    projectedPensionWithoutChest: projectedPensionWithoutChestVal,
    incomeWithChest,
    incomeWithoutChest,
  };
}

const inputs = [
  {
    currentAge: 30,
    currentSalary: 50000,
    contributionPercent: 4,
    retirementAge: 60,
    savingsFromPot: 1760,
    growthRate: 0.02,
    fundFee: 0.0008,
    platformFee: 0.0045,
    withdrawlRate: 0.037,
  },
  {
    currentAge: 30,
    currentSalary: 50000,
    contributionPercent: 4,
    retirementAge: 60,
    savingsFromPot: 1760,
    growthRate: 0.05,
    fundFee: 0.0008,
    platformFee: 0.0045,
    withdrawlRate: 0.037,
  },
  {
    currentAge: 30,
    currentSalary: 50000,
    contributionPercent: 4,
    retirementAge: 60,
    savingsFromPot: 1760,
    growthRate: 0.08,
    fundFee: 0.0008,
    platformFee: 0.0045,
    withdrawlRate: 0.037,
  },
];

let outputs = [];

inputs.forEach((input) => {
  const {
    currentAge,
    currentSalary,
    contributionPercent,
    retirementAge,
    savingsFromPot,
    growthRate,
    fundFee,
    platformFee,
    withdrawlRate,
  } = input;

  const {
    estimatedPension,
    projectedPensionWithChest,
    projectedPensionWithoutChest,
    incomeWithChest,
    incomeWithoutChest,
  } = computeAll(
    currentAge,
    currentSalary,
    contributionPercent,
    retirementAge,
    savingsFromPot,
    growthRate,
    fundFee,
    platformFee,
    withdrawlRate
  );

  outputs.push({
    currAge: currentAge,
    currSal: currentSalary,
    contribPercent: contributionPercent,
    retAge: retirementAge,
    gRate: growthRate,
    estPension: fixTwoDigit(estimatedPension),
    projPenWithC: fixTwoDigit(projectedPensionWithChest),
    projPenWithoutC: fixTwoDigit(projectedPensionWithoutChest),
    incomeWithChest: fixTwoDigit(incomeWithChest),
    incomeWithoutChest: fixTwoDigit(incomeWithoutChest),
  });
});

function fixTwoDigit(x) {
  return Number.parseFloat(x).toFixed(2);
}

console.table(outputs, [
  'currAge',
  'currSal',
  'contribPercent',
  'retAge',
  'gRate',
  'estPension',
  'projPenWithC',
  'projPenWithoutC',
  'incomeWithChest',
  'incomeWithoutChest',
]);
