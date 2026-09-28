"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import articles from "@/data/articles.json";
import { Input } from "@/components/ui/input";
import { RevealGroup, RevealItem } from "@/components/site/reveal";

export function ArticlesGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = articles.filter((article) => {
    const matchesCategory = active === "All" || article.category === active;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={[
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active === category
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/15 text-ink/60 hover:border-ink/30 hover:text-ink",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink/35" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
              className="h-9 pl-9"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-ink/50">
            No guides match that search yet. Try a different term or
            category.
          </p>
        ) : (
          <RevealGroup
            stagger={0.08}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((article) => (
              <RevealItem key={article.title}>
                <article className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-paper p-7 transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(22,36,28,0.25)]">
                  <span className="w-fit rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold tracking-wide text-forest uppercase">
                    {article.category}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink/60">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-ink/45">{article.readTime}</span>
                    <span className="flex items-center gap-1.5 font-semibold text-ink/70 transition-colors group-hover:text-ember">
                      Read
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
