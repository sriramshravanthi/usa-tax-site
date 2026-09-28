"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

import pricing from "@/data/pricing.json";
import { buttonVariants } from "@/components/ui/button";

type TierName = "Simple" | "Standard" | "Self-Employed";
type Scores = Partial<Record<TierName, number>>;

const QUESTIONS: { prompt: string; options: { label: string; scores: Scores }[] }[] = [
  {
    prompt: "How did most of your income come in this year?",
    options: [
      { label: "A W-2 job", scores: { Simple: 2, Standard: 1 } },
      { label: "Freelance, gig, or 1099 work", scores: { "Self-Employed": 3 } },
      { label: "A mix of both", scores: { Standard: 2, "Self-Employed": 1 } },
    ],
  },
  {
    prompt: "Will you itemize deductions (mortgage interest, big donations, medical costs)?",
    options: [
      { label: "Yes, I have deductions to itemize", scores: { Standard: 2, "Self-Employed": 1 } },
      { label: "No, the standard deduction is fine", scores: { Simple: 2 } },
    ],
  },
  {
    prompt: "Do you have dependents, or education/energy credits to claim?",
    options: [
      { label: "Yes", scores: { Standard: 2 } },
      { label: "No", scores: { Simple: 1, "Self-Employed": 1 } },
    ],
  },
];

export function PlanQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [done, setDone] = useState(false);

  function answer(optionScores: Scores) {
    const next: Scores = { ...scores };
    for (const [tier, value] of Object.entries(optionScores) as [TierName, number][]) {
      next[tier] = (next[tier] ?? 0) + value;
    }
    setScores(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setScores({});
    setDone(false);
  }

  const recommendedName = (Object.entries(scores) as [TierName, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];
  const tier = pricing.find((t) => t.name === recommendedName) ?? pricing[1];

  if (done) {
    return (
      <div className="rounded-3xl border border-ember/25 bg-ink p-8 text-cream">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-ember/20 text-ember">
          <Sparkles className="size-5" />
        </div>
        <p className="mt-5 text-sm font-medium text-ink-soft">
          Based on your answers, we&apos;d recommend
        </p>
        <h3 className="mt-1 font-display text-3xl font-semibold text-cream">
          {tier.name} — ${tier.price}
        </h3>
        <p className="mt-2 text-sm text-ink-soft">{tier.tagline}</p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <Link
            href={`/contact?plan=${encodeURIComponent(tier.name)}`}
            className={buttonVariants({
              className: "group bg-ember text-primary-foreground hover:bg-ember-dark",
            })}
          >
            Choose {tier.name}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cream/70 transition-colors hover:text-cream"
          >
            <RotateCcw className="size-3.5" />
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div className="rounded-3xl border border-ink/10 bg-paper p-8">
      <div className="flex items-center justify-between text-xs font-medium text-ink/45">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <span>Not sure which plan fits?</span>
      </div>
      <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
        {question.prompt}
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => answer(opt.scores)}
            className="rounded-xl border border-ink/10 bg-background px-4 py-3.5 text-left text-sm font-medium text-ink/75 transition-colors hover:border-ember/40 hover:bg-ember/5 hover:text-ink"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
