"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ plan }: { plan?: string }) {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center py-14 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="grid size-14 place-items-center rounded-full bg-forest/15 text-forest"
            >
              <CheckCircle2 className="size-7" />
            </motion.div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">
              Message sent
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              A real person on our team will get back to you within one
              business day.
            </p>
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
            {plan && (
              <div className="flex w-fit items-center gap-1.5 rounded-full bg-amber/20 px-3 py-1.5 text-xs font-semibold text-forest">
                <Tag className="size-3.5" />
                Asking about the {plan} plan
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor={nameId}>Name</Label>
                <Input id={nameId} required placeholder="Jordan Lee" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor={emailId}>Email</Label>
                <Input
                  id={emailId}
                  type="email"
                  required
                  placeholder="jordan@email.com"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={messageId}>How can we help?</Label>
              <Textarea
                id={messageId}
                required
                rows={5}
                defaultValue={plan ? `Hi, I'd like to get started with the ${plan} plan. ` : ""}
                placeholder="Tell us a bit about your tax situation..."
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-full bg-ember text-base text-primary-foreground hover:bg-ember-dark sm:w-auto"
            >
              Send message
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
