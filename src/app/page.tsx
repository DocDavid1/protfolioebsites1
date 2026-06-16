import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { FinalCTA } from "@/components/sections/final-cta";
import { HeroSection } from "@/components/sections/hero";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { PricingSection } from "@/components/sections/pricing";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { StatsCounter } from "@/components/sections/stats-counter";
import { StorySection } from "@/components/sections/story";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { WhyUsSection } from "@/components/sections/why-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientsMarquee />
      <ServicesSection />
      <StatsCounter />
      <WhyUsSection />
      <StorySection />
      <PortfolioPreview />
      <TestimonialsSection />
      <PricingSection />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}
