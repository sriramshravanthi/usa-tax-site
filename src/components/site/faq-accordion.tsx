import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "@/data/faqs.json";
import { Reveal } from "@/components/site/reveal";

export function FaqAccordion() {
  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <Accordion className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-paper px-6">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={`item-${i}`}
                className="border-ink/10 py-1.5"
              >
                <AccordionTrigger className="py-5 font-display text-lg font-medium text-ink hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-ink/65">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
