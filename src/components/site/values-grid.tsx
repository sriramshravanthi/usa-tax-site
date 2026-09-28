import {
  BadgeCheck,
  Clock4,
  HandCoins,
  MessageCircleHeart,
  type LucideIcon,
} from "lucide-react";

import values from "@/data/values.json";
import { RevealGroup, RevealItem } from "@/components/site/reveal";

const icons: Record<string, LucideIcon> = {
  MessageCircleHeart,
  BadgeCheck,
  Clock4,
  HandCoins,
};

export function ValuesGrid() {
  return (
    <RevealGroup
      stagger={0.08}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      {values.map((value) => {
        const Icon = icons[value.icon] ?? BadgeCheck;
        return (
          <RevealItem key={value.title}>
            <div className="flex h-full gap-4 rounded-3xl border border-ink/10 bg-paper p-6">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber/20 text-forest">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                  {value.description}
                </p>
              </div>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
