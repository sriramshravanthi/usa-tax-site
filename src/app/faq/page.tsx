import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "FAQ — Amberly Tax Co.",
  description: "Answers to the questions we get asked most before, during, and after filing.",
};

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Questions, answered plainly."
        subtitle="Still not sure? Reach out and a real person will get back to you — not a bot."
      />
      <FaqAccordion />
      <CtaSection />
    </>
  );
}
