"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { ContactForm } from "@/components/site/contact-form";

function ContactFormWithPlan() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") ?? undefined;
  return <ContactForm plan={plan} />;
}

export function ContactPlanForm() {
  return (
    <Suspense fallback={<ContactForm />}>
      <ContactFormWithPlan />
    </Suspense>
  );
}
