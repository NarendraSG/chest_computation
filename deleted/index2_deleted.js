/**
 * Returns closing pension at age (currentAge - 1)
 * Loop-free and recursion-free
 */
function calculateClosingPensionPrevAge(
  currentAge,
  currentSalary,
  contributionPercent
) {
  const START_AGE = 22;
  const g = 1.0488; // salary growth factor
  const f = 0.0062; // fee rate

  const r = 1 - f;

  if (currentAge - 1 < START_AGE) return 0;

  const years = currentAge - START_AGE; // N - 22

  const ratio = r / g;

  return (
    ((contributionPercent / 100) *
      currentSalary *
      (1 / g) *
      (1 - Math.pow(ratio, years))) /
    (1 - ratio)
  );
}

console.log(calculateClosingPensionPrevAge(28, 50000, 4));
