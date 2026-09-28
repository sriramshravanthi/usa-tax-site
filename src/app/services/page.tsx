import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { ServicesDetail } from "@/components/site/services-detail";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Services — Amberly Tax Co.",
  description:
    "Individual filing, self-employed support, deductions and credits, audit support, tax planning, and preparer matching — all explained plainly.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="Whatever your tax situation is, there's a lane for it."
        subtitle="Six ways we help, from a simple W-2 return to year-round planning."
      />
      <ServicesDetail />
      <CtaSection />
    </>
  );
}
