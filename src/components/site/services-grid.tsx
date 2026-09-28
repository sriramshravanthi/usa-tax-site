"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import services from "@/data/services.json";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";

const icons: Record<string, LucideIcon> = {
  FileText,
  Briefcase,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Users,
};

export function ServicesGrid() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide text-ember uppercase">
            Services
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Whatever your tax situation is, there&apos;s a lane for it.
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = icons[service.icon] ?? FileText;
            return (
              <RevealItem key={service.title} className="h-full">
                <Link href={service.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative h-full overflow-hidden rounded-3xl border border-ink/10 bg-paper p-7 shadow-[0_1px_0_rgba(22,36,28,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(22,36,28,0.25)]"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-amber/0 blur-2xl transition-colors duration-500 group-hover:bg-amber/25"
                    />
                    <div className="relative flex size-12 items-center justify-center rounded-2xl bg-ink text-cream transition-colors duration-300 group-hover:bg-ember">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="relative mt-6 font-display text-xl font-semibold text-ink">
                      {service.title}
                    </h3>
                    <p className="relative mt-2.5 text-sm leading-relaxed text-ink/60">
                      {service.description}
                    </p>
                    <div className="relative mt-5 flex items-center gap-1.5 text-sm font-semibold text-ink/70 transition-colors group-hover:text-ember">
                      Learn more
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
