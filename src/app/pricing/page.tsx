import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { PlanQuiz } from "@/components/site/plan-quiz";
import { PricingGrid } from "@/components/site/pricing-grid";
import { ReferralBanner } from "@/components/site/referral-banner";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Pricing — Amberly Tax Co.",
  description:
    "Transparent, upfront tax filing pricing. No hidden fees, no surprise add-ons.",
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        title="One price, no surprises."
        subtitle="Pick the package that matches your tax situation. Every tier includes e-filing, a real review from a licensed preparer, and no hidden fees."
      />
      <section className="pt-20 pb-4">
        <div className="mx-auto max-w-3xl px-4">
          <PlanQuiz />
        </div>
      </section>
      <PricingGrid />
      <ReferralBanner />
      <CtaSection />
    </>
  );
}
