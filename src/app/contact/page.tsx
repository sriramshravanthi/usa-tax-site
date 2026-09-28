import type { Metadata } from "next";
import { Mail, MessageSquare, Phone, type LucideIcon } from "lucide-react";

import { PageIntro } from "@/components/site/page-intro";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import channels from "@/data/contact-channels.json";

export const metadata: Metadata = {
  title: "Contact — Amberly Tax Co.",
  description: "Get in touch with a real person on the Amberly Tax Co. team.",
};

const icons: Record<string, LucideIcon> = { Phone, Mail, MessageSquare };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Talk to a real person."
        subtitle="Questions about pricing, your return, or just not sure where to start? Reach out."
      />

      <section className="py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Other ways to reach us
              </h2>
            </Reveal>
            <RevealGroup stagger={0.08} className="mt-6 space-y-4">
              {channels.map((channel) => {
                const Icon = icons[channel.icon] ?? Mail;
                return (
                  <RevealItem key={channel.title}>
                    <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-paper p-5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-cream">
                        <Icon className="size-4.5" />
                      </div>
                      <div>
                        <div className="font-medium text-ink">{channel.title}</div>
                        <div className="text-sm text-ink/70">{channel.detail}</div>
                        <div className="mt-0.5 text-xs text-ink/45">{channel.note}</div>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          <Reveal delay={0.1}>
            <ContactForm plan={plan} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
