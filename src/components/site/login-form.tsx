"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { LifeBuoy } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const emailId = useId();
  const passwordId = useId();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-ink/10 bg-paper p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="notice"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center py-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="grid size-14 place-items-center rounded-full bg-amber/20 text-forest"
            >
              <LifeBuoy className="size-7" />
            </motion.div>
            <h2 className="mt-5 font-display text-xl font-semibold text-ink">
              Portal access isn&apos;t live yet
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              This is a preview build, so client accounts aren&apos;t enabled.
              If you&apos;re a real client, reach out and we&apos;ll get you
              sorted directly.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({
                className: "mt-6 h-11 rounded-full bg-ember px-6 text-primary-foreground hover:bg-ember-dark",
              })}
            >
              Contact us instead
            </Link>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Client login
              </h2>
              <p className="mt-1.5 text-sm text-ink/55">
                Sign in to view your return status and documents.
              </p>
            </div>
            <div>
              <Label htmlFor={emailId}>Email</Label>
              <Input
                id={emailId}
                type="email"
                required
                placeholder="you@email.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor={passwordId}>Password</Label>
              <Input
                id={passwordId}
                type="password"
                required
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-full bg-ember text-base text-primary-foreground hover:bg-ember-dark"
            >
              Sign in
            </Button>
            <p className="text-center text-sm text-ink/50">
              Not a client yet?{" "}
              <Link href="/pricing" className="font-medium text-ember hover:underline">
                See pricing
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
