import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { RefundEstimator } from "@/components/site/refund-estimator";
import { DocumentChecklist } from "@/components/site/document-checklist";
import { TaxDeadlineCountdown } from "@/components/site/tax-deadline-countdown";
import { RefundTrackerCard } from "@/components/site/refund-tracker-card";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Tax Tools — Amberly Tax Co.",
  description:
    "Estimate your refund, check what documents you need, track deadlines, and see your refund status — all before you talk to a preparer.",
};

export default function ToolsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tax Tools"
        title="Know roughly what to expect, before you file."
        subtitle="A quick estimate — no account, no signup. When you're ready for the real thing, a licensed preparer double-checks everything."
      />
      <RefundEstimator />
      <section className="relative pb-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold tracking-wide text-ember uppercase">
              Get organized
            </span>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Everything else you need before filing.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <DocumentChecklist />
            <div className="flex flex-col gap-6">
              <TaxDeadlineCountdown />
              <RefundTrackerCard />
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
