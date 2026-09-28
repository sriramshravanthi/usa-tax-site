"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Info, Minus, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { estimateRefund, type FilingStatus } from "@/lib/tax-estimate";

const STATUS_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married, filing jointly" },
  { value: "hoh", label: "Head of household" },
];

function currency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function AnimatedCurrency({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const display = useTransform(mv, (v) => currency(Math.round(v)));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [value, mv]);

  return <motion.span>{display}</motion.span>;
}

export function RefundEstimator() {
  const incomeId = useId();
  const withheldId = useId();

  const [status, setStatus] = useState<FilingStatus>("single");
  const [income, setIncome] = useState(65000);
  const [withheld, setWithheld] = useState(7200);
  const [dependents, setDependents] = useState(0);

  const result = useMemo(
    () => estimateRefund({ status, income, withheld, dependents }),
    [status, income, withheld, dependents]
  );

  return (
    <section id="tools" className="relative py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Inputs */}
        <div className="rounded-3xl border border-ink/10 bg-paper p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Tell us about your year
          </h2>

          <div className="mt-6">
            <span className="text-sm font-medium text-ink/70">
              Filing status
            </span>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={[
                    "relative rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                    status === opt.value
                      ? "border-ember/40 bg-ink text-cream"
                      : "border-ink/10 bg-background text-ink/70 hover:border-ink/25",
                  ].join(" ")}
                >
                  {status === opt.value && (
                    <motion.span
                      layoutId="status-pill"
                      className="absolute inset-0 rounded-xl bg-ink"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor={incomeId}>Annual income</Label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink/40">
                  $
                </span>
                <Input
                  id={incomeId}
                  type="number"
                  min={0}
                  step={1000}
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value) || 0)}
                  className="pl-6"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={withheldId}>Federal tax withheld</Label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink/40">
                  $
                </span>
                <Input
                  id={withheldId}
                  type="number"
                  min={0}
                  step={100}
                  value={withheld}
                  onChange={(e) => setWithheld(Number(e.target.value) || 0)}
                  className="pl-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <span className="text-sm font-medium text-ink/70">
              Dependents
            </span>
            <div className="mt-1.5 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setDependents((d) => Math.max(0, d - 1))}
                aria-label="Decrease dependents"
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center font-display text-lg font-semibold text-ink">
                {dependents}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setDependents((d) => Math.min(10, d + 1))}
                aria-label="Increase dependents"
              >
                <Plus className="size-4" />
              </Button>
            </div>
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
              <AnimatedCurrency value={Math.abs(result.result)} />
            </div>

            <dl className="mt-8 space-y-3 border-t border-cream/10 pt-6 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Taxable income</dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.taxableIncome} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Child tax credit applied</dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.childTaxCredit} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Estimated tax after credits</dt>
                <dd className="font-medium tabular-nums">
                  <AnimatedCurrency value={result.estimatedTax} />
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mt-8 flex items-start gap-2 rounded-xl bg-cream/5 p-3.5 text-xs leading-relaxed text-ink-soft">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Simplified estimate using 2024 standard federal brackets. Doesn&apos;t
            account for state tax, self-employment tax, or every credit.
            Not tax advice — talk to a preparer for your exact number.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
