"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

import { getUpcomingDeadlines } from "@/lib/tax-deadlines";

function diff(target: Date, now: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1_000),
  };
}

export function TaxDeadlineCountdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const startTimeout = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(startTimeout);
      clearInterval(id);
    };
  }, []);

  if (!now) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-paper p-8">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Next deadline
        </h2>
      </div>
    );
  }

  const deadlines = getUpcomingDeadlines(now);
  const next = deadlines[0];
  const upcoming = deadlines.slice(1, 4);
  const { days, hours, minutes, seconds } = diff(next.date, now);

  return (
    <div className="rounded-3xl border border-ink/10 bg-paper p-8">
      <div className="flex items-center gap-2 text-ember">
        <CalendarClock className="size-4.5" />
        <h2 className="font-display text-2xl font-semibold text-ink">
          Next deadline
        </h2>
      </div>
      <p className="mt-1.5 text-sm text-ink/55">
        {next.label} —{" "}
        {next.date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
        {[
          { label: "Days", value: days },
          { label: "Hrs", value: hours },
          { label: "Min", value: minutes },
          { label: "Sec", value: seconds },
        ].map((unit) => (
          <div key={unit.label} className="rounded-2xl bg-ink p-4 text-cream">
            <div className="font-display text-3xl font-semibold tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs tracking-wide text-ink-soft uppercase">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {upcoming.length > 0 && (
        <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm">
          {upcoming.map((d) => (
            <li
              key={d.label}
              className="flex items-center justify-between text-ink/60"
            >
              <span>{d.label}</span>
              <span className="font-medium text-ink/80">
                {d.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
