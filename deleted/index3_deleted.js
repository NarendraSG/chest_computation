const START_AGE = 22;
const FEE_RATE = 0.0062;
const r = 1 - FEE_RATE;

// Salary growth factors
const GROWTH_BANDS = [
  { from: 22, to: 30, g: 1.0488 },
  { from: 31, to: 40, g: 1.0244 },
  { from: 41, to: Infinity, g: 1.0049 },
];

function geometricSum(first, ratio, n) {
  if (n <= 0) return 0;
  return (first * (1 - Math.pow(ratio, n))) / (1 - ratio);
}

function calculateClosingPensionPrevAge(
  currentAge,
  currentSalary,
  contributionPercent
) {
  if (currentAge - 1 < START_AGE) return 0;

  const targetAge = currentAge - 1;
  const contributionRate = contributionPercent / 100;

  let pension = 0;
  let salaryDivisor = 1;
  let accumulatedYears = 0;

  // Walk salary bands from latest → earliest
  for (let i = GROWTH_BANDS.length - 1; i >= 0; i--) {
    const band = GROWTH_BANDS[i];

    const from = Math.max(band.from, START_AGE);
    const to = Math.min(band.to, targetAge);

    if (from > to) continue;

    const years = to - from + 1;

    const ratio = r / band.g;

    const firstContribution =
      contributionRate * (currentSalary / salaryDivisor);

    pension += geometricSum(
      firstContribution * Math.pow(r, accumulatedYears),
      ratio,
      years
    );

    salaryDivisor *= Math.pow(band.g, years);
    accumulatedYears += years;
  }

  return pension;
}

console.log(calculateClosingPensionPrevAge(35, 50000, 4));
