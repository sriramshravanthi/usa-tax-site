"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Check, Printer, RotateCcw } from "lucide-react";

import checklist from "@/data/document-checklist.json";

const STORAGE_KEY = "amberly-doc-checklist";
const CHECKLIST_EVENT = "amberly-doc-checklist-change";

function readChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeChecklist(next: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable — checklist just won't persist
  }
  window.dispatchEvent(new Event(CHECKLIST_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHECKLIST_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHECKLIST_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return JSON.stringify(readChecklist());
}

function getServerSnapshot() {
  return "{}";
}

export function DocumentChecklist() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const checked: Record<string, boolean> = useMemo(
    () => JSON.parse(snapshot),
    [snapshot]
  );

  const totalItems = checklist.reduce((n, group) => n + group.items.length, 0);
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = totalItems === 0 ? 0 : Math.round((doneItems / totalItems) * 100);

  function toggle(item: string) {
    const current = readChecklist();
    writeChecklist({ ...current, [item]: !current[item] });
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-paper p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            What to bring
          </h2>
          <p className="mt-1.5 text-sm text-ink/55">
            Check off what you already have. Nothing here is saved anywhere
            but this browser.
          </p>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-semibold text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
          >
            <Printer className="size-3.5" />
            Print
          </button>
          <button
            type="button"
            onClick={() => writeChecklist({})}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-semibold text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs font-medium text-ink/55">
          <span>
            {doneItems} of {totalItems} ready
          </span>
          <span>{pct}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-ember transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-7 space-y-6">
        {checklist.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-semibold tracking-wide text-ink/70 uppercase">
              {group.category}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => {
                const isChecked = !!checked[item];
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggle(item)}
                      aria-pressed={isChecked}
                      className={[
                        "flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors",
                        isChecked
                          ? "border-forest/30 bg-forest/5 text-ink/50 line-through"
                          : "border-ink/10 bg-background text-ink/75 hover:border-ink/25",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                          isChecked
                            ? "border-forest bg-forest text-cream"
                            : "border-ink/25",
                        ].join(" ")}
                      >
                        {isChecked && <Check className="size-3" />}
                      </span>
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
