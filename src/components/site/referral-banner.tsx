import Link from "next/link";
import { Gift } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function ReferralBanner() {
  return (
    <section className="pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-amber/30 bg-amber/10 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber/25 text-forest">
                <Gift className="size-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Refer a friend, you both get $20
                </h3>
                <p className="mt-1 text-sm text-ink/60">
                  When someone you refer files with us, you get a $20 credit
                  and they get $20 off — no limit on how many friends you
                  refer.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className={buttonVariants({
                className: "shrink-0 bg-ink text-cream hover:bg-ink/85",
              })}
            >
              Refer a friend
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
