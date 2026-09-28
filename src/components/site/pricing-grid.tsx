"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "motion/react";

import pricing from "@/data/pricing.json";
import { buttonVariants } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/site/reveal";

export function PricingGrid() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <RevealGroup
          stagger={0.1}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {pricing.map((tier) => (
            <RevealItem key={tier.name} className="h-full">
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={[
                  "relative flex h-full flex-col rounded-3xl border p-8",
                  tier.featured
                    ? "border-ember/30 bg-ink text-cream shadow-[0_30px_60px_-24px_rgba(255,90,31,0.35)] md:-translate-y-4"
                    : "border-ink/10 bg-paper",
                ].join(" ")}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-ember px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">
                    Most popular
                  </span>
                )}

                <h3
                  className={[
                    "font-display text-2xl font-semibold",
                    tier.featured ? "text-cream" : "text-ink",
                  ].join(" ")}
                >
                  {tier.name}
                </h3>
                <p
                  className={[
                    "mt-1.5 text-sm",
                    tier.featured ? "text-ink-soft" : "text-ink/55",
                  ].join(" ")}
                >
                  {tier.tagline}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span
                    className={[
                      "font-display text-4xl font-semibold",
                      tier.featured ? "text-ember" : "text-ink",
                    ].join(" ")}
                  >
                    ${tier.price}
                  </span>
                  <span
                    className={
                      tier.featured ? "text-ink-soft" : "text-ink/50"
                    }
                  >
                    starting at
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={[
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-ember" : "text-forest",
                        ].join(" ")}
                      />
                      <span
                        className={
                          tier.featured ? "text-cream/85" : "text-ink/70"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?plan=${encodeURIComponent(tier.name)}`}
                  className={buttonVariants({
                    size: "lg",
                    className: [
                      "mt-8 h-12 rounded-full text-base",
                      tier.featured
                        ? "bg-ember text-primary-foreground hover:bg-ember-dark"
                        : "bg-ink text-cream hover:bg-ink/85",
                    ].join(" "),
                  })}
                >
                  Choose {tier.name}
                </Link>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink/45">
          Prices shown are illustrative starting rates for demonstration
          purposes. Your final price depends on the forms your return
          actually needs — you&apos;ll always see it before you pay.
        </p>
      </div>
    </section>
  );
}
