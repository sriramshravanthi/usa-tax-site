import { TrendingUp } from "lucide-react";

import quickWins from "@/data/quick-wins.json";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";

export function QuickWins() {
  return (
    <section className="border-b border-ink/10 bg-cream-soft py-28">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal className="text-center">
          <span className="text-sm font-semibold tracking-wide text-ember uppercase">
            Start here
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Top 10 tax quick wins.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-ink/60">
            The full guide below has dozens of tips — nobody reads all of it.
            These are the 10 most likely to actually save you real money,
            ranked roughly by dollar impact. Not every one applies to you —
            check &quot;who it&apos;s for&quot; first. Federal tax only; your
            actual savings depend on your income and bracket.
          </p>
        </Reveal>

        <RevealGroup stagger={0.06} className="mt-14 space-y-4">
          {quickWins.map((win) => (
            <RevealItem key={win.rank}>
              <div className="flex gap-5 rounded-3xl border border-ink/10 bg-paper p-6 sm:p-7">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ink font-display text-lg font-semibold text-cream">
                  {win.rank}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {win.title}
                    </h3>
                    <span className="rounded-full bg-amber/20 px-2.5 py-0.5 text-xs font-medium text-forest">
                      {win.whoFor}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {win.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ember">
                    <TrendingUp className="size-4 shrink-0" />
                    {win.impact}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
