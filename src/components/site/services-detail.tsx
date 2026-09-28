import Link from "next/link";
import {
  Briefcase,
  Check,
  FileText,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import services from "@/data/services.json";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const icons: Record<string, LucideIcon> = {
  FileText,
  Briefcase,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Users,
};

export function ServicesDetail() {
  return (
    <div className="divide-y divide-ink/10">
      {services.map((service, i) => {
        const Icon = icons[service.icon] ?? FileText;
        const reversed = i % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 py-20"
          >
            <div className="mx-auto max-w-6xl px-4">
              <Reveal
                className={[
                  "grid grid-cols-1 items-center gap-10 lg:grid-cols-2",
                  reversed ? "lg:[&>*:first-child]:order-2" : "",
                ].join(" ")}
              >
                <div>
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-ink text-cream">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/60">
                    {service.description}
                  </p>
                  <Button
                    size="lg"
                    className="mt-7 h-12 rounded-full bg-ember px-6 text-base text-primary-foreground hover:bg-ember-dark"
                    nativeButton={false}
                    render={
                      <Link
                        href={
                          service.slug === "find-a-tax-pro"
                            ? "/find-a-pro"
                            : `/contact?plan=${encodeURIComponent(service.title)}`
                        }
                      />
                    }
                  >
                    {service.slug === "find-a-tax-pro" ? "Find a pro" : "Get started"}
                  </Button>
                </div>

                <ul className="space-y-3 rounded-3xl border border-ink/10 bg-paper p-7">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-forest" />
                      <span className="text-ink/75">{detail}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
