"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Search, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import pros from "@/data/pros.json";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function ProFinder() {
  const zipId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 700);
  }

  return (
    <section className="py-28">
      <div className="mx-auto max-w-3xl px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper p-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink/40" />
            <Input
              id={zipId}
              placeholder="Enter your ZIP code"
              className="h-12 rounded-xl border-transparent bg-cream-soft pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 rounded-xl bg-ember px-6 text-base text-primary-foreground hover:bg-ember-dark"
          >
            <Search className="size-4" />
            Find a pro
          </Button>
        </form>

        <div className="mt-10 min-h-[16rem]">
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-2xl bg-ink/5"
                  />
                ))}
              </motion.div>
            )}

            {status === "done" && (
              <motion.div
                key="results"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                }}
                className="space-y-3"
              >
                {pros.map((pro) => (
                  <motion.div
                    key={pro.name}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-paper p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar size="lg" className="border border-ink/10">
                        <AvatarFallback className="bg-ink font-display text-cream">
                          {initials(pro.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-display text-lg font-semibold text-ink">
                          {pro.name}
                        </div>
                        <div className="text-sm text-ink/60">{pro.specialty}</div>
                        <div className="mt-0.5 text-xs text-ink/45">{pro.location}</div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
                      <div className="flex items-center gap-1 text-sm font-medium text-ink">
                        <Star className="size-3.5 fill-ember text-ember" />
                        {pro.rating}
                        <span className="text-ink/45">({pro.reviews})</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-ink/15"
                      >
                        Book consultation
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
