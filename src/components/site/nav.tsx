"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, ArrowUpRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import navLinks from "@/data/nav.json";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(() => scrollY.get() > 24);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={[
          "flex w-full max-w-6xl items-center justify-between rounded-2xl border transition-all duration-300",
          scrolled
            ? "border-border/70 bg-paper/85 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(22,36,28,0.25)] backdrop-blur-md"
            : "border-transparent bg-transparent px-4 py-4",
        ].join(" ")}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <span className="grid size-8 place-items-center rounded-full bg-ink text-cream transition-transform duration-300 group-hover:rotate-12">
            <span className="font-display italic">A</span>
          </span>
          Amberly Tax Co.
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              className: "text-ink hover:bg-ink/5 hover:text-ink",
            })}
          >
            Client Login
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({
              className: "group bg-ember text-primary-foreground hover:bg-ember-dark",
            })}
          >
            Start Filing
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-ink md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-ink text-cream [&_button]:text-cream"
          >
            <SheetHeader>
              <SheetTitle className="font-display text-cream">
                Amberly Tax Co.
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-base font-medium text-cream/85 transition-colors hover:bg-cream/10 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  }
                />
              ))}
              <SheetClose
                render={
                  <Link
                    href="/contact"
                    className={buttonVariants({
                      className: "mt-4 h-9 bg-ember text-primary-foreground hover:bg-ember-dark",
                    })}
                  >
                    Start Filing
                  </Link>
                }
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
