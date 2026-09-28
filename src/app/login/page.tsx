import type { Metadata } from "next";

import { PageIntro } from "@/components/site/page-intro";
import { LoginForm } from "@/components/site/login-form";

export const metadata: Metadata = {
  title: "Client Login — Amberly Tax Co.",
  description: "Sign in to your Amberly Tax Co. client portal.",
};

export default function LoginPage() {
  return (
    <>
      <PageIntro eyebrow="Client Portal" title="Welcome back." />
      <section className="py-20">
        <div className="px-4">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
