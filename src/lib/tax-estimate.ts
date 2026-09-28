export type FilingStatus = "single" | "mfj" | "hoh" | "mfs";

/**
 * 2025 federal tax estimator (Schedule 1-A / OBBBA provisions included).
 * Bracket thresholds, credit amounts, and phase-out ranges below are the
 * published 2025 IRS figures (Rev. Proc. 2024-40, Notice 2024-80, Notice
 * 2025-62/2025-69, Schedule 1-A instructions). Still an illustrative
 * estimate: no state tax, AMT, or every possible credit — not tax advice.
 */
const C = {
  STD_SINGLE_MFS: 15750,
  STD_MFJ: 31500,
  STD_HOH: 23625,
  EXTRA_STD_65_UNMARRIED: 2000,
  EXTRA_STD_65_MARRIED: 1600,

  SS_WAGE_BASE: 176100,
  SE_SS_RATE: 0.124,
  SE_MEDICARE_RATE: 0.029,
  SE_TAXABLE_SHARE: 0.9235,
  SE_MIN: 400,

  EXTRA_MEDICARE_RATE: 0.009,
  EXTRA_MEDICARE_JOINT: 250000,
  EXTRA_MEDICARE_MFS: 125000,
  EXTRA_MEDICARE_OTHER: 200000,

  NIIT_RATE: 0.038,
  NIIT_JOINT: 250000,
  NIIT_MFS: 125000,
  NIIT_OTHER: 200000,

  CAP_LOSS_LIMIT: 3000,
  CAP_LOSS_LIMIT_MFS: 1500,

  HSA_FAMILY_MAX: 8550,
  EDUCATOR_MAX: 300,
  SEP_MAX: 70000,

  IRA_LIMIT: 7000,
  IRA_CATCHUP: 1000,
  IRA_PO_START_SINGLE_HOH: 79000,
  IRA_PO_END_SINGLE_HOH: 89000,
  IRA_PO_START_JOINT: 126000,
  IRA_PO_END_JOINT: 146000,
  IRA_PO_START_MFS: 0,
  IRA_PO_END_MFS: 10000,

  SL_MAX: 2500,
  SL_PO_START_NOTJOINT: 85000,
  SL_PO_END_NOTJOINT: 100000,
  SL_PO_START_JOINT: 170000,
  SL_PO_END_JOINT: 200000,

  MEDICAL_FLOOR: 0.075,
  CHARITY_LIMIT_SHARE: 0.6,

  SALT_CAP: 40000,
  SALT_FLOOR: 10000,
  SALT_PO_START: 500000,
  SALT_PO_RATE: 0.3,
  SALT_CAP_MFS: 20000,
  SALT_FLOOR_MFS: 5000,
  SALT_PO_START_MFS: 250000,

  TIPS_MAX: 25000,
  OT_MAX_NOTJOINT: 12500,
  OT_MAX_JOINT: 25000,
  TIPS_OT_PO_START_NOTJOINT: 150000,
  TIPS_OT_PO_START_JOINT: 300000,
  TIPS_OT_REDUCTION_PER_1000: 100,

  CARLOAN_MAX: 10000,
  CARLOAN_PO_START_NOTJOINT: 100000,
  CARLOAN_PO_START_JOINT: 200000,
  CARLOAN_REDUCTION_PER_1000: 200,

  SENIOR_PER_PERSON: 6000,
  SENIOR_PO_START_NOTJOINT: 75000,
  SENIOR_PO_START_JOINT: 150000,
  SENIOR_PO_RATE: 0.06,

  QBI_RATE: 0.2,
  QBI_LIMIT_NOTJOINT: 197300,
  QBI_LIMIT_JOINT: 394600,
  QBI_RANGE_NOTJOINT: 50000,
  QBI_RANGE_JOINT: 100000,

  GAINS0_SINGLE_MFS: 48350,
  GAINS0_JOINT: 96700,
  GAINS0_HOH: 64750,
  GAINS15_SINGLE: 533400,
  GAINS15_JOINT: 600050,
  GAINS15_HOH: 566700,
  GAINS15_MFS: 300000,
  GAINS_RATE_MID: 0.15,
  GAINS_RATE_TOP: 0.2,

  CTC_PER_CHILD: 2200,
  CREDIT_OTHER_DEPENDENT: 500,
  ACTC_MAX_PER_CHILD: 1700,
  ACTC_RATE: 0.15,
  ACTC_FLOOR: 2500,
  CTC_PO_START_NOTJOINT: 200000,
  CTC_PO_START_JOINT: 400000,
  CTC_REDUCTION_PER_1000: 50,

  EIC_INVESTMENT_LIMIT: 11950,
} as const;

/** [thresholdOver, rate, taxAtStart] per bracket, ascending. */
type Bracket = readonly [number, number, number];

const BRACKETS: Record<FilingStatus, readonly Bracket[]> = {
  single: [
    [0, 0.1, 0],
    [11925, 0.12, 1192.5],
    [48475, 0.22, 5578.5],
    [103350, 0.24, 17651],
    [197300, 0.32, 40199],
    [250525, 0.35, 57231],
    [626350, 0.37, 188769.75],
  ],
  mfj: [
    [0, 0.1, 0],
    [23850, 0.12, 2385],
    [96950, 0.22, 11157],
    [206700, 0.24, 35302],
    [394600, 0.32, 80398],
    [501050, 0.35, 114462],
    [751600, 0.37, 202154.5],
  ],
  hoh: [
    [0, 0.1, 0],
    [17000, 0.12, 1700],
    [64850, 0.22, 7442],
    [103350, 0.24, 15912],
    [197300, 0.32, 38460],
    [250500, 0.35, 55484],
    [626350, 0.37, 187031.5],
  ],
  mfs: [
    [0, 0.1, 0],
    [11925, 0.12, 1192.5],
    [48475, 0.22, 5578.5],
    [103350, 0.24, 17651],
    [197300, 0.32, 40199],
    [250525, 0.35, 57231],
    [375800, 0.37, 101077.25],
  ],
};

/** [phaseInRate, fullCreditAt, maxCredit, shrinkStartNotJoint, shrinkStartJoint, shrinkRate] */
const EIC_TABLE: readonly (readonly [number, number, number, number, number, number])[] = [
  [0.0765, 8490, 649, 10620, 17730, 0.0765],
  [0.34, 12730, 4328, 23350, 30470, 0.1598],
  [0.4, 17880, 7152, 23350, 30470, 0.2106],
  [0.45, 17880, 8046, 23350, 30470, 0.2106],
];

function bracketTax(taxable: number, status: FilingStatus): number {
  const table = BRACKETS[status];
  let row: Bracket = table[0];
  for (const r of table) {
    if (taxable >= r[0]) row = r;
    else break;
  }
  return Math.round(row[2] + (taxable - row[0]) * row[1]);
}

export interface TaxEstimateInput {
  filingStatus: FilingStatus;
  age65Count: number;
  age50Plus: boolean;
  wages: number;
  seProfit: number;
  interestOrdDivShortGains: number;
  ltcgQualifiedDiv: number;
  otherIncome: number;
  netInvestmentLoss: number;
  tips: number;
  overtime: number;
  carLoanInterest: number;
  hsaContribution: number;
  iraContribution: number;
  coveredAtWork: boolean;
  sepContribution: number;
  seHealthInsurance: number;
  studentLoanInterest: number;
  teacherExpenses: number;
  salt: number;
  mortgageInterest: number;
  charity: number;
  medicalExpenses: number;
  childrenUnder17: number;
  otherDependents: number;
  otherCredits: number;
  eicChildren: number;
  age25to64NoChildren: boolean;
  eicOtherInvestmentIncome: number;
  eicOverride: number;
  otherRefundableCredits: number;
  federalWithheld: number;
  estimatedPayments: number;
}

export interface TaxEstimateResult {
  totalIncome: number;
  agi: number;
  seTax: number;
  stdDeduction: number;
  itemizedTotal: number;
  deductionUsed: number;
  usedItemized: boolean;
  bonusDeductions: number;
  qbiDeduction: number;
  taxableIncome: number;
  taxBeforeCredits: number;
  childCreditUsed: number;
  incomeTaxAfterCredits: number;
  extraMedicareTax: number;
  niit: number;
  actc: number;
  eic: number;
  totalTax: number;
  totalPaid: number;
  owe: number;
  refund: number;
  isRefund: boolean;
  effectiveRate: number;
  marginalRate: number;
}

function n(v: number | undefined): number {
  return v || 0;
}

export function estimateFederalTax(input: TaxEstimateInput): TaxEstimateResult {
  const status = input.filingStatus;
  const mfj = status === "mfj";
  const mfs = status === "mfs";
  const hoh = status === "hoh";
  const joint = mfj;
  const age65Count = Math.min(n(input.age65Count), mfj || mfs ? 2 : 1);

  // Self-employment tax
  const seTaxedEarnings = Math.max(0, n(input.seProfit)) * C.SE_TAXABLE_SHARE;
  const seTax =
    seTaxedEarnings >= C.SE_MIN
      ? Math.round(
          Math.min(seTaxedEarnings, Math.max(0, C.SS_WAGE_BASE - n(input.wages))) *
            C.SE_SS_RATE +
            seTaxedEarnings * C.SE_MEDICARE_RATE
        )
      : 0;
  const halfSeTax = Math.round(seTax / 2);

  const capLossLimit = mfs ? C.CAP_LOSS_LIMIT_MFS : C.CAP_LOSS_LIMIT;
  const investmentLossUsed = Math.min(Math.max(0, n(input.netInvestmentLoss)), capLossLimit);

  const totalIncome =
    n(input.wages) +
    n(input.seProfit) +
    n(input.interestOrdDivShortGains) +
    n(input.ltcgQualifiedDiv) +
    n(input.otherIncome) -
    investmentLossUsed;

  // Adjustments
  const hsaDeduction = Math.min(n(input.hsaContribution), C.HSA_FAMILY_MAX);
  const teacherDeduction = Math.min(n(input.teacherExpenses), C.EDUCATOR_MAX);
  const sepDeduction = Math.min(
    n(input.sepContribution),
    C.SEP_MAX,
    Math.max(0, n(input.seProfit) - halfSeTax)
  );
  const seHealthDeduction = Math.min(
    n(input.seHealthInsurance),
    Math.max(0, n(input.seProfit) - halfSeTax - sepDeduction)
  );

  const incomeBeforeIraStudentLoan =
    totalIncome - hsaDeduction - teacherDeduction - sepDeduction - seHealthDeduction - halfSeTax;

  const iraLimit = C.IRA_LIMIT + (input.age50Plus ? C.IRA_CATCHUP : 0);
  const iraPoStart = joint
    ? C.IRA_PO_START_JOINT
    : mfs
      ? C.IRA_PO_START_MFS
      : C.IRA_PO_START_SINGLE_HOH;
  const iraPoEnd = joint
    ? C.IRA_PO_END_JOINT
    : mfs
      ? C.IRA_PO_END_MFS
      : C.IRA_PO_END_SINGLE_HOH;
  const iraAllowed = input.coveredAtWork
    ? incomeBeforeIraStudentLoan >= iraPoEnd
      ? 0
      : Math.min(
          iraLimit,
          Math.max(
            200,
            Math.ceil(
              (iraLimit *
                (1 -
                  Math.max(0, (incomeBeforeIraStudentLoan - iraPoStart) / (iraPoEnd - iraPoStart)))) /
                10
            ) * 10
          )
        )
    : iraLimit;
  const iraDeduction = Math.min(n(input.iraContribution), iraAllowed);

  const incomeBeforeStudentLoan = incomeBeforeIraStudentLoan - iraDeduction;
  const slPoStart = joint ? C.SL_PO_START_JOINT : C.SL_PO_START_NOTJOINT;
  const slPoEnd = joint ? C.SL_PO_END_JOINT : C.SL_PO_END_NOTJOINT;
  const studentLoanDeduction = mfs
    ? 0
    : Math.round(
        Math.min(n(input.studentLoanInterest), C.SL_MAX) *
          (1 -
            Math.min(
              1,
              Math.max(0, (incomeBeforeStudentLoan - slPoStart) / (slPoEnd - slPoStart))
            ))
      );

  const totalAdjustments =
    hsaDeduction +
    teacherDeduction +
    sepDeduction +
    seHealthDeduction +
    iraDeduction +
    studentLoanDeduction +
    halfSeTax;
  const agi = totalIncome - totalAdjustments;

  // Deductions: standard vs itemized
  const stdDeduction =
    (joint ? C.STD_MFJ : hoh ? C.STD_HOH : C.STD_SINGLE_MFS) +
    age65Count * (mfj || mfs ? C.EXTRA_STD_65_MARRIED : C.EXTRA_STD_65_UNMARRIED);

  const medicalDeductible = Math.max(0, n(input.medicalExpenses) - C.MEDICAL_FLOOR * Math.max(0, agi));
  const saltCapDynamic = mfs
    ? Math.max(C.SALT_FLOOR_MFS, C.SALT_CAP_MFS - C.SALT_PO_RATE * Math.max(0, agi - C.SALT_PO_START_MFS))
    : Math.max(C.SALT_FLOOR, C.SALT_CAP - C.SALT_PO_RATE * Math.max(0, agi - C.SALT_PO_START));
  const saltDeductible = Math.min(n(input.salt), saltCapDynamic);
  const charityDeductible = Math.min(n(input.charity), C.CHARITY_LIMIT_SHARE * Math.max(0, agi));
  const itemizedTotal =
    medicalDeductible + saltDeductible + n(input.mortgageInterest) + charityDeductible;

  const deductionUsed = Math.max(stdDeduction, itemizedTotal);
  const usedItemized = itemizedTotal > stdDeduction;

  // New 2025 (OBBBA) bonus deductions
  const tipsOtPoStart = mfj ? C.TIPS_OT_PO_START_JOINT : C.TIPS_OT_PO_START_NOTJOINT;
  const tipsOtReduction = C.TIPS_OT_REDUCTION_PER_1000 * Math.ceil(Math.max(0, agi - tipsOtPoStart) / 1000);
  const tipsDeduction = mfs ? 0 : Math.max(0, Math.min(n(input.tips), C.TIPS_MAX) - tipsOtReduction);
  const otMax = mfj ? C.OT_MAX_JOINT : C.OT_MAX_NOTJOINT;
  const overtimeDeduction = mfs ? 0 : Math.max(0, Math.min(n(input.overtime), otMax) - tipsOtReduction);

  const carLoanPoStart = mfj ? C.CARLOAN_PO_START_JOINT : C.CARLOAN_PO_START_NOTJOINT;
  const carLoanReduction =
    C.CARLOAN_REDUCTION_PER_1000 * Math.ceil(Math.max(0, agi - carLoanPoStart) / 1000);
  const carLoanDeduction = Math.max(0, Math.min(n(input.carLoanInterest), C.CARLOAN_MAX) - carLoanReduction);

  const seniorPoStart = mfj ? C.SENIOR_PO_START_JOINT : C.SENIOR_PO_START_NOTJOINT;
  const seniorDeduction = mfs
    ? 0
    : age65Count * Math.max(0, C.SENIOR_PER_PERSON - C.SENIOR_PO_RATE * Math.max(0, agi - seniorPoStart));

  const bonusDeductions = tipsDeduction + overtimeDeduction + carLoanDeduction + seniorDeduction;

  // Qualified business income (QBI) deduction
  const qbiEligibleProfit = Math.max(0, n(input.seProfit) - halfSeTax - seHealthDeduction - sepDeduction);
  const taxableBeforeQbi = Math.max(0, agi - deductionUsed - bonusDeductions);
  const qbiLimit = mfj ? C.QBI_LIMIT_JOINT : C.QBI_LIMIT_NOTJOINT;
  const qbiRange = mfj ? C.QBI_RANGE_JOINT : C.QBI_RANGE_NOTJOINT;
  const qbiPhaseFrac = Math.min(1, Math.max(0, (taxableBeforeQbi - qbiLimit) / qbiRange));
  const qbiDeduction = Math.round(
    Math.min(
      C.QBI_RATE * qbiEligibleProfit * (1 - qbiPhaseFrac),
      C.QBI_RATE * Math.max(0, taxableBeforeQbi - Math.max(0, n(input.ltcgQualifiedDiv)))
    )
  );

  const taxableIncome = Math.max(0, taxableBeforeQbi - qbiDeduction);

  // Income tax, with long-term gains stacked on top of ordinary income
  const ltcgInTaxable = Math.min(Math.max(0, n(input.ltcgQualifiedDiv)), taxableIncome);
  const ordinaryTaxable = taxableIncome - ltcgInTaxable;
  const ordinaryTax = bracketTax(ordinaryTaxable, status);

  const gains0Limit = mfj ? C.GAINS0_JOINT : hoh ? C.GAINS0_HOH : C.GAINS0_SINGLE_MFS;
  const gains15Limit = mfj
    ? C.GAINS15_JOINT
    : hoh
      ? C.GAINS15_HOH
      : mfs
        ? C.GAINS15_MFS
        : C.GAINS15_SINGLE;

  const gainsAt0 = Math.max(0, Math.min(ltcgInTaxable, gains0Limit - ordinaryTaxable));
  const gainsAt15 = Math.max(
    0,
    Math.min(
      ltcgInTaxable - gainsAt0,
      Math.min(taxableIncome, gains15Limit) - Math.max(ordinaryTaxable, gains0Limit)
    )
  );
  const gainsAt20 = Math.max(0, ltcgInTaxable - gainsAt0 - gainsAt15);
  const gainsTax = Math.round(gainsAt15 * C.GAINS_RATE_MID + gainsAt20 * C.GAINS_RATE_TOP);

  const taxBeforeCredits = ordinaryTax + gainsTax;

  // Credits
  const childDepCreditsBefore =
    n(input.childrenUnder17) * C.CTC_PER_CHILD + n(input.otherDependents) * C.CREDIT_OTHER_DEPENDENT;
  const ctcPoStart = mfj ? C.CTC_PO_START_JOINT : C.CTC_PO_START_NOTJOINT;
  const ctcReduction = C.CTC_REDUCTION_PER_1000 * Math.ceil(Math.max(0, agi - ctcPoStart) / 1000);
  const childDepCreditsAfter = Math.max(0, childDepCreditsBefore - ctcReduction);
  const childCreditUsed = Math.min(childDepCreditsAfter, taxBeforeCredits);
  const otherCreditsUsed = Math.min(n(input.otherCredits), taxBeforeCredits - childCreditUsed);
  const incomeTaxAfterCredits = taxBeforeCredits - childCreditUsed - otherCreditsUsed;

  // Other taxes
  const extraMedicareThreshold = mfj
    ? C.EXTRA_MEDICARE_JOINT
    : mfs
      ? C.EXTRA_MEDICARE_MFS
      : C.EXTRA_MEDICARE_OTHER;
  const extraMedicareTax = Math.round(
    C.EXTRA_MEDICARE_RATE * Math.max(0, n(input.wages) + seTaxedEarnings - extraMedicareThreshold)
  );

  const niitIncome = Math.max(0, n(input.interestOrdDivShortGains)) + Math.max(0, n(input.ltcgQualifiedDiv));
  const niitThreshold = joint ? C.NIIT_JOINT : mfs ? C.NIIT_MFS : C.NIIT_OTHER;
  const niit = Math.round(C.NIIT_RATE * Math.min(niitIncome, Math.max(0, agi - niitThreshold)));

  // Refundable credits
  const earnedIncomeForActc = Math.max(0, n(input.wages) + n(input.seProfit) - halfSeTax);
  const actc = Math.round(
    Math.min(
      childDepCreditsAfter - childCreditUsed,
      n(input.childrenUnder17) * C.ACTC_MAX_PER_CHILD,
      C.ACTC_RATE * Math.max(0, earnedIncomeForActc - C.ACTC_FLOOR)
    )
  );

  const eicChildren = Math.min(3, Math.max(0, Math.floor(n(input.eicChildren))));
  const eicInvestmentIncome =
    Math.max(0, n(input.interestOrdDivShortGains)) +
    Math.max(0, n(input.ltcgQualifiedDiv)) +
    Math.max(0, n(input.eicOtherInvestmentIncome));
  const [phaseInRate, , maxCredit, shrinkNotJoint, shrinkJoint, shrinkRate] = EIC_TABLE[eicChildren];
  const shrinkStart = mfj ? shrinkJoint : shrinkNotJoint;
  const eicByEarned = Math.max(
    0,
    Math.min(phaseInRate * earnedIncomeForActc, maxCredit) -
      shrinkRate * Math.max(0, earnedIncomeForActc - shrinkStart)
  );
  const eicByAgi = Math.max(0, maxCredit - shrinkRate * Math.max(0, agi - shrinkStart));
  const eicRaw = Math.round(Math.min(eicByEarned, eicByAgi));
  const eicCalculated =
    !mfs &&
    earnedIncomeForActc > 0 &&
    eicInvestmentIncome <= C.EIC_INVESTMENT_LIMIT &&
    (eicChildren > 0 || input.age25to64NoChildren)
      ? eicRaw
      : 0;
  const eic = n(input.eicOverride) > 0 ? n(input.eicOverride) : eicCalculated;

  const totalTax = incomeTaxAfterCredits + seTax + extraMedicareTax + niit;
  const totalPaid =
    n(input.federalWithheld) +
    n(input.estimatedPayments) +
    eic +
    actc +
    n(input.otherRefundableCredits);
  const net = totalPaid - totalTax;
  const owe = Math.max(0, -net);
  const refund = Math.max(0, net);
  const effectiveRate = totalIncome <= 0 ? 0 : totalTax / totalIncome;

  let marginalRate = BRACKETS[status][0][1];
  for (const r of BRACKETS[status]) {
    if (ordinaryTaxable >= r[0]) marginalRate = r[1];
    else break;
  }

  return {
    totalIncome,
    agi,
    seTax,
    stdDeduction,
    itemizedTotal,
    deductionUsed,
    usedItemized,
    bonusDeductions,
    qbiDeduction,
    taxableIncome,
    taxBeforeCredits,
    childCreditUsed,
    incomeTaxAfterCredits,
    extraMedicareTax,
    niit,
    actc,
    eic,
    totalTax,
    totalPaid,
    owe,
    refund,
    isRefund: net >= 0,
    effectiveRate,
    marginalRate,
  };
}
