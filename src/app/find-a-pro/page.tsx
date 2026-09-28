import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { ProFinder } from "@/components/site/pro-finder";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Find a Tax Pro — Amberly Tax Co.",
  description:
    "Match with a licensed CPA or Enrolled Agent near you, or work with one virtually from anywhere in the U.S.",
};

export default function FindAProPage() {
  return (
    <>
      <PageIntro
        eyebrow="Find a Tax Pro"
        title="Matched with someone who actually gets your situation."
        subtitle="Enter your ZIP code to see licensed preparers near you — or work with any of them virtually, no matter where you live."
      />
      <ProFinder />
      <CtaSection />
    </>
  );
}
