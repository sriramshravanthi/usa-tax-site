import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { Stats } from "@/components/site/stats";
import { ServicesGrid } from "@/components/site/services-grid";
import { Testimonials } from "@/components/site/testimonials";
import { CtaSection } from "@/components/site/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Stats />
      <ServicesGrid />
      <Testimonials />
      <CtaSection />
    </>
  );
}
