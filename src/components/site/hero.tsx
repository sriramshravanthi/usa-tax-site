"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/site/magnetic-button";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* Ambient floating color fields */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 24, -12, 0],
            y: [0, -18, 10, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-32 size-[26rem] rounded-full bg-ember/25 blur-[90px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 16, 0],
            y: [0, 16, -14, 0],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-[-8rem] size-[24rem] rounded-full bg-forest/20 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 14, -18, 0],
            y: [0, -10, 14, 0],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10rem] left-1/3 size-[22rem] rounded-full bg-amber/25 blur-[100px]"
        />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink/70 uppercase backdrop-blur-sm"
          >
            <Sparkles className="size-3.5 text-ember" />
            Filing season, without the dread
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-4xl text-balance font-display text-5xl leading-[1.05] font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            Taxes, handled by{" "}
            <span className="relative inline-block italic text-ember">
              humans
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 w-full text-ember/60"
              >
                <motion.path
                  d="M2 9.5C40 2.5 160 2.5 198 9.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                />
              </svg>
            </span>{" "}
            who actually explain what&apos;s going on.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-balance text-lg text-ink/65 sm:text-xl"
          >
            Transparent pricing, licensed CPAs and Enrolled Agents, and a
            refund estimator that tells you something useful before you ever
            pick up the phone.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton>
              <Link
                href="/contact"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "group h-13 rounded-full bg-ember px-7 text-base text-primary-foreground shadow-[0_16px_40px_-14px_rgba(255,90,31,0.55)] hover:bg-ember-dark",
                })}
              >
                Start filing free
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>
            <Link
              href="/tools"
              className="group flex h-13 items-center gap-2 rounded-full border border-ink/15 px-7 text-base font-medium text-ink transition-colors hover:border-ink/30 hover:bg-ink/5"
            >
              Estimate my refund
            </Link>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-sm text-ink/50">
            No credit card required &middot; Free estimate in under 2 minutes
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
