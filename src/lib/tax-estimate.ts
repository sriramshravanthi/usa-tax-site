export type FilingStatus = "single" | "mfj" | "hoh";

/**
 * Simplified estimator only — not the full IRS bracket/phaseout logic.
 * Standard deductions match published 2024 figures; brackets are the
 * real 2024 single-filer thresholds, scaled for MFJ/HOH as a rough
 * approximation. Ignores state tax, SE tax, AMT, and credit phaseouts.
 */
const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 14600,
  mfj: 29200,
  hoh: 21900,
};

const SINGLE_BRACKETS = [
  { upTo: 11600, rate: 0.1 },
  { upTo: 47150, rate: 0.12 },
  { upTo: 100525, rate: 0.22 },
  { upTo: 191950, rate: 0.24 },
  { upTo: 243725, rate: 0.32 },
  { upTo: 609350, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
];

const BRACKET_SCALE: Record<FilingStatus, number> = {
  single: 1,
  mfj: 2,
  hoh: 1.35,
};

function taxFromBrackets(taxableIncome: number, status: FilingStatus) {
  const scale = BRACKET_SCALE[status];
  let remaining = taxableIncome;
  let lastCap = 0;
  let tax = 0;

  for (const bracket of SINGLE_BRACKETS) {
    const cap = bracket.upTo === Infinity ? Infinity : bracket.upTo * scale;
    const span = Math.min(remaining, cap - lastCap);
    if (span <= 0) break;
    tax += span * bracket.rate;
    remaining -= span;
    lastCap = cap;
    if (remaining <= 0) break;
  }

  return tax;
}

export function estimateRefund({
  status,
  income,
  withheld,
  dependents,
}: {
  status: FilingStatus;
  income: number;
  withheld: number;
  dependents: number;
}) {
  const deduction = STANDARD_DEDUCTION[status];
  const taxableIncome = Math.max(income - deduction, 0);
  const grossTax = taxFromBrackets(taxableIncome, status);
  const childTaxCredit = Math.max(dependents, 0) * 2000;
  const taxAfterCredits = Math.max(grossTax - childTaxCredit, 0);
  const result = withheld - taxAfterCredits;

  return {
    taxableIncome,
    estimatedTax: taxAfterCredits,
    childTaxCredit: Math.min(childTaxCredit, grossTax),
    result,
    isRefund: result >= 0,
  };
}
