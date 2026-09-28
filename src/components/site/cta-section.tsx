import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { MagneticButton } from "@/components/site/magnetic-button";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream">
      <div className="grain absolute inset-0" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <Reveal>
          <h2 className="text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to stop guessing what you owe?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-ink-soft">
            Get matched with a licensed preparer, or run the numbers yourself
            first. Either way, it&apos;s free to start.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton>
              <Link
                href="/contact"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "group h-13 rounded-full bg-ember px-7 text-base text-primary-foreground hover:bg-ember-dark",
                })}
              >
                Start filing free
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </MagneticButton>
            <Link
              href="/find-a-pro"
              className={buttonVariants({
                size: "lg",
                variant: "ghost",
                className:
                  "h-13 rounded-full px-7 text-base text-cream hover:bg-cream/10 hover:text-cream",
              })}
            >
              Talk to a tax pro
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
