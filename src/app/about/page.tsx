import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { ValuesGrid } from "@/components/site/values-grid";
import { GuaranteesGrid } from "@/components/site/guarantees-grid";
import { TeamGrid } from "@/components/site/team-grid";
import { Reveal } from "@/components/site/reveal";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "About Us — Amberly Tax Co.",
  description:
    "Why Amberly Tax Co. exists, what we believe about filing taxes, and who's actually doing the work.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Us"
        title="We started Amberly because filing shouldn't feel like a trap."
        subtitle="Founded by a CPA who got tired of watching clients overpay because nobody explained their options in plain language."
      />

      <section className="py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide text-ember uppercase">
              What we believe
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Four things we won&apos;t compromise on.
            </h2>
          </Reveal>
          <div className="mt-14">
            <ValuesGrid />
          </div>
        </div>
      </section>

      <section className="bg-cream-soft py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide text-ember uppercase">
              Our guarantees
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              We put it in writing.
            </h2>
          </Reveal>
          <div className="mt-14">
            <GuaranteesGrid />
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal className="max-w-2xl">
            <span className="text-sm font-semibold tracking-wide text-ember uppercase">
              The team
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Real preparers, real credentials.
            </h2>
          </Reveal>
          <TeamGrid />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
