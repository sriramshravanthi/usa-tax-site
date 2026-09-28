import {
  BadgeCheck,
  LifeBuoy,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import guarantees from "@/data/guarantees.json";
import { RevealGroup, RevealItem } from "@/components/site/reveal";

const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgeCheck,
  LifeBuoy,
  Lock,
};

export function GuaranteesGrid() {
  return (
    <RevealGroup
      stagger={0.08}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {guarantees.map((guarantee) => {
        const Icon = icons[guarantee.icon] ?? ShieldCheck;
        return (
          <RevealItem key={guarantee.title}>
            <div className="flex h-full flex-col rounded-3xl border border-ink/10 bg-paper p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-ember/15 text-ember">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {guarantee.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                {guarantee.description}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
