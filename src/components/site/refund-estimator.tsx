"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Info, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  estimateFederalTax,
  type FilingStatus,
  type TaxEstimateInput,
} from "@/lib/tax-estimate";

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married, jointly" },
  { value: "hoh", label: "Head of household" },
  { value: "mfs", label: "Married, separately" },
];

const DEFAULT_INPUT: TaxEstimateInput = {
  filingStatus: "single",
  age65Count: 0,
  age50Plus: false,
  wages: 65000,
  seProfit: 0,
  interestOrdDivShortGains: 0,
  ltcgQualifiedDiv: 0,
  otherIncome: 0,
  netInvestmentLoss: 0,
  tips: 0,
  overtime: 0,
  carLoanInterest: 0,
  hsaContribution: 0,
  iraContribution: 0,
  coveredAtWork: false,
  sepContribution: 0,
  seHealthInsurance: 0,
  studentLoanInterest: 0,
  teacherExpenses: 0,
  salt: 0,
  mortgageInterest: 0,
  charity: 0,
  medicalExpenses: 0,
  childrenUnder17: 0,
  otherDependents: 0,
  otherCredits: 0,
  eicChildren: 0,
  age25to64NoChildren: false,
  eicOtherInvestmentIncome: 0,
  eicOverride: 0,
  otherRefundableCredits: 0,
  federalWithheld: 7200,
  estimatedPayments: 0,
};

function currency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function AnimatedCurrency({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const display = useTransform(mv, (v) => currency(Math.round(v)));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [value, mv]);

  return <motion.span>{display}</motion.span>;
}

function PillGroup<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          type="button"
          onClick={() => onChange(opt.value)}
          className={[
            "relative rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
            value === opt.value
              ? "border-ember/40 bg-ink text-cream"
              : "border-ink/10 bg-background text-ink/70 hover:border-ink/25",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function MoneyField({
  label,
  value,
  onChange,
  helper,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helper?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink/40">
          $
        </span>
        <Input
          id={id}
          type="number"
          min={0}
          step={100}
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          placeholder="0"
          className="pl-6"
        />
      </div>
      {helper && <p className="mt-1 text-xs text-ink/45">{helper}</p>}
    </div>
  );
}

function CountField({
  label,
  value,
  onChange,
  helper,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helper?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={0}
        max={10}
        step={1}
        value={value || ""}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        placeholder="0"
        className="mt-1.5"
      />
      {helper && <p className="mt-1 text-xs text-ink/45">{helper}</p>}
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/10 bg-background px-3.5 py-2.5 text-sm text-ink/75">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-ember"
      />
    </label>
  );
}

export function RefundEstimator() {
  const [input, setInput] = useState<TaxEstimateInput>(DEFAULT_INPUT);

  function set<K extends keyof TaxEstimateInput>(key: K, value: TaxEstimateInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const effectiveEicChildren = Math.min(3, input.childrenUnder17);
  const inputForCalc = useMemo(
    () => ({ ...input, eicChildren: input.eicChildren || effectiveEicChildren }),
    [input, effectiveEicChildren]
  );
  const result = useMemo(() => estimateFederalTax(inputForCalc), [inputForCalc]);

  const showChildlessEicToggle = input.childrenUnder17 === 0;

  return (
    <section id="tools" className="relative py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Inputs */}
        <div className="rounded-3xl border border-ink/10 bg-paper p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Tell us about your year
          </h2>
          <p className="mt-1.5 text-sm text-ink/55">
            2025 federal rules — filing status, wages, and what you&apos;ve had
            withheld.
          </p>

          <div className="mt-6">
            <span className="text-sm font-medium text-ink/70">Filing status</span>
            <div className="mt-2.5">
              <PillGroup
                options={STATUS_OPTIONS}
                value={input.filingStatus}
                onChange={(v) => set("filingStatus", v)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MoneyField
              label="Wages (W-2 Box 1)"
              value={input.wages}
              onChange={(v) => set("wages", v)}
            />
            <MoneyField
              label="Self-employed / freelance net profit"
              value={input.seProfit}
              onChange={(v) => set("seProfit", v)}
              helper="After business expenses. Schedule C bottom line."
            />
          </div>

          <div className="mt-5">
            <span className="text-sm font-medium text-ink/70">Dependents</span>
            <div className="mt-2.5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <CountField
                label="Children under 17 with a Social Security number"
                value={input.childrenUnder17}
                onChange={(v) => set("childrenUnder17", v)}
                helper="Up to $2,200 child tax credit each."
              />
              <CountField
                label="Other dependents (17+)"
                value={input.otherDependents}
                onChange={(v) => set("otherDependents", v)}
                helper="$500 credit each."
              />
            </div>
          </div>

          <div className="mt-5">
            <MoneyField
              label="Federal tax withheld so far"
              value={input.federalWithheld}
              onChange={(v) => set("federalWithheld", v)}
              helper="W-2 Box 2, plus any 1099 withholding."
            />
          </div>

          <div className="mt-8">
            <Accordion multiple defaultValue={["new2025"]} className="divide-y divide-ink/10">
              <AccordionItem value="you">
                <AccordionTrigger>You & your household</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-ink/70">
                        People on the return age 65+
                      </span>
                      <div className="mt-2">
                        <PillGroup
                          options={[
                            { value: 0, label: "0" },
                            { value: 1, label: "1" },
                            { value: 2, label: "2" },
                          ]}
                          value={input.age65Count}
                          onChange={(v) => set("age65Count", v)}
                        />
                      </div>
                    </div>
                    {showChildlessEicToggle && (
                      <ToggleField
                        label="No children — are you (or your spouse) age 25–64?"
                        checked={input.age25to64NoChildren}
                        onChange={(v) => set("age25to64NoChildren", v)}
                      />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="income">
                <AccordionTrigger>Investment & other income</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MoneyField
                      label="Interest & ordinary dividends"
                      value={input.interestOrdDivShortGains}
                      onChange={(v) => set("interestOrdDivShortGains", v)}
                    />
                    <MoneyField
                      label="Long-term gains + qualified dividends"
                      value={input.ltcgQualifiedDiv}
                      onChange={(v) => set("ltcgQualifiedDiv", v)}
                      helper="Taxed at 0%, 15%, or 20%."
                    />
                    <MoneyField
                      label="Other taxable income"
                      value={input.otherIncome}
                      onChange={(v) => set("otherIncome", v)}
                      helper="Unemployment, taxable retirement withdrawals, etc."
                    />
                    <MoneyField
                      label="Investment losses this year"
                      value={input.netInvestmentLoss}
                      onChange={(v) => set("netInvestmentLoss", v)}
                      helper="Up to $3,000 usable per year."
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="new2025">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    New 2025 tax breaks
                    <span className="rounded-full bg-ember/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-ember uppercase">
                      New
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MoneyField
                      label="Qualified tips received"
                      value={input.tips}
                      onChange={(v) => set("tips", v)}
                      helper="Up to $25,000 deduction."
                    />
                    <MoneyField
                      label="Overtime premium pay"
                      value={input.overtime}
                      onChange={(v) => set("overtime", v)}
                      helper="Only the extra half of time-and-a-half."
                    />
                    <MoneyField
                      label="New car loan interest"
                      value={input.carLoanInterest}
                      onChange={(v) => set("carLoanInterest", v)}
                      helper="US-assembled personal vehicle, bought after 2024."
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="retirement">
                <AccordionTrigger>Retirement & other deductions</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MoneyField
                      label="Traditional IRA contribution"
                      value={input.iraContribution}
                      onChange={(v) => set("iraContribution", v)}
                    />
                    <MoneyField
                      label="HSA contribution (self-paid)"
                      value={input.hsaContribution}
                      onChange={(v) => set("hsaContribution", v)}
                    />
                    <MoneyField
                      label="Student loan interest paid"
                      value={input.studentLoanInterest}
                      onChange={(v) => set("studentLoanInterest", v)}
                    />
                    <MoneyField
                      label="SEP-IRA / Solo 401(k) contribution"
                      value={input.sepContribution}
                      onChange={(v) => set("sepContribution", v)}
                      helper="Self-employed only."
                    />
                    <MoneyField
                      label="Self-employed health insurance"
                      value={input.seHealthInsurance}
                      onChange={(v) => set("seHealthInsurance", v)}
                    />
                    <MoneyField
                      label="K-12 classroom supplies"
                      value={input.teacherExpenses}
                      onChange={(v) => set("teacherExpenses", v)}
                      helper="Teachers only, up to $300."
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <ToggleField
                      label="Covered by a workplace retirement plan?"
                      checked={input.coveredAtWork}
                      onChange={(v) => set("coveredAtWork", v)}
                    />
                    <ToggleField
                      label="Age 50 or older?"
                      checked={input.age50Plus}
                      onChange={(v) => set("age50Plus", v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="itemized">
                <AccordionTrigger>Itemized deductions</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3 text-xs text-ink/45">
                    Leave at 0 if unsure — we automatically use whichever is
                    bigger, standard or itemized.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MoneyField
                      label="State & local taxes paid"
                      value={input.salt}
                      onChange={(v) => set("salt", v)}
                    />
                    <MoneyField
                      label="Home mortgage interest"
                      value={input.mortgageInterest}
                      onChange={(v) => set("mortgageInterest", v)}
                    />
                    <MoneyField
                      label="Gifts to charity"
                      value={input.charity}
                      onChange={(v) => set("charity", v)}
                    />
                    <MoneyField
                      label="Out-of-pocket medical costs"
                      value={input.medicalExpenses}
                      onChange={(v) => set("medicalExpenses", v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credits">
                <AccordionTrigger>Other credits & payments</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MoneyField
                      label="Other nonrefundable credits"
                      value={input.otherCredits}
                      onChange={(v) => set("otherCredits", v)}
                      helper="Childcare, education, saver's, energy."
                    />
                    <MoneyField
                      label="Other refundable credits"
                      value={input.otherRefundableCredits}
                      onChange={(v) => set("otherRefundableCredits", v)}
                    />
                    <MoneyField
                      label="Estimated tax payments made"
                      value={input.estimatedPayments}
                      onChange={(v) => set("estimatedPayments", v)}
                      helper="Form 1040-ES payments sent this year."
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Result */}
        <motion.div
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-cream"
          layout
        >
          <div className="grain absolute inset-0" />
          <div className="relative">
            <p className="text-sm font-medium text-ink-soft">
              {result.isRefund ? "Estimated refund" : "Estimated amount owed"}
            </p>
            <div
              className={[
                "mt-2 font-display text-5xl font-semibold tabular-nums",
                result.isRefund ? "text-ember" : "text-amber",
              ].join(" ")}
            >
              <AnimatedCurrency value={result.isRefund ? result.refund : result.owe} />
            </div>

            <dl className="mt-8 space-y-3 border-t border-cream/10 pt-6 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Adjusted gross income</dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.agi} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Taxable income</dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.taxableIncome} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">
                  Deduction used ({result.usedItemized ? "itemized" : "standard"})
                </dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.deductionUsed} />
                </dd>
              </div>
              {result.childCreditUsed > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">Child & dependent credit</dt>
                  <dd className="font-medium tabular-nums">
                    <AnimatedCurrency value={result.childCreditUsed} />
                  </dd>
                </div>
              )}
              {result.eic > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">Earned Income Credit</dt>
                  <dd className="font-medium tabular-nums">
                    <AnimatedCurrency value={result.eic} />
                  </dd>
                </div>
              )}
              {result.seTax > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-ink-soft">Self-employment tax</dt>
                  <dd className="font-medium tabular-nums">
                    <AnimatedCurrency value={result.seTax} />
                  </dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Total federal tax</dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.totalTax} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Effective tax rate</dt>
                <dd className="font-medium tabular-nums">
                  {(result.effectiveRate * 100).toFixed(1)}%
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mt-8 flex items-start gap-2 rounded-xl bg-cream/5 p-3.5 text-xs leading-relaxed text-ink-soft">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <span>
              2025 federal rules, including the new 2025 tips, overtime, senior,
              and car-loan-interest deductions. Doesn&apos;t cover state tax,
              AMT, or every credit. Not tax advice — a licensed preparer will
              confirm your exact number.
            </span>
          </div>
          <div className="relative mt-4 flex items-center gap-2 text-xs text-ember">
            <Sparkles className="size-3.5" />
            Now with real 2025 IRS brackets, credits, and the new OBBBA deductions.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
