import { ShieldCheck } from "lucide-react";

import badges from "@/data/trust-badges.json";

export function TrustBar() {
  const loop = [...badges, ...badges];

  return (
    <div className="relative border-y border-ink/10 bg-paper py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
      <div className="flex w-max animate-marquee gap-10 will-change-transform">
        {loop.map((badge, i) => (
          <span
            key={`${badge}-${i}`}
            className="flex items-center gap-2 text-sm font-medium whitespace-nowrap text-ink/60"
          >
            <ShieldCheck className="size-4 text-forest" />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
