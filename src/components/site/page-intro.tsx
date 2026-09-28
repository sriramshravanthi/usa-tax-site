"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-40 pb-20 text-cream">
      <div className="grain absolute inset-0" />
      <motion.div
        animate={{ x: [0, 18, -10, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 right-[-6rem] size-80 rounded-full bg-ember/25 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -14, 10, 0], y: [0, 10, -8, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[-8rem] left-[-4rem] size-72 rounded-full bg-amber/20 blur-[100px]"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative mx-auto max-w-4xl px-4 text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber uppercase backdrop-blur-sm"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-5 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-2xl text-balance text-lg text-ink-soft"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div variants={item} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
