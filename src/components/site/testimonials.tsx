import { Star } from "lucide-react";

import testimonials from "@/data/testimonials.json";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-cream-soft py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-semibold tracking-wide text-ember uppercase">
            Reviews
          </span>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Don&apos;t take our word for it.
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <figure className="flex h-full flex-col rounded-3xl border border-ink/10 bg-paper p-7">
                <div className="flex gap-0.5 text-ember">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-balance font-display text-lg leading-snug text-ink italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/10 pt-4">
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="text-sm text-ink/55">{t.role}</div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
