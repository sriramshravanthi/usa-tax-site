import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { QuickWins } from "@/components/site/quick-wins";
import { ArticlesGrid } from "@/components/site/articles-grid";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Resources & Guides — Amberly Tax Co.",
  description:
    "Top tax quick wins, deadlines, deductions, and plain-English guides to help you understand your taxes year-round.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Resources"
        title="Tax tips that don't require a dictionary."
        subtitle="Deadlines, deductions, and life-event guides — written the way we'd explain it on a phone call."
      />
      <QuickWins />
      <ArticlesGrid />
      <CtaSection />
    </>
  );
}
