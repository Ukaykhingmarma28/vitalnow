import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Stats } from "@/components/stats";
import { TrustSection } from "@/components/trust-section";
import { Faq } from "@/components/faq";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <TrustSection />
      <Faq />
      <CtaSection />
      <Footer />
    </main>
  );
}
