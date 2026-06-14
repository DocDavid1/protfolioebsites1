import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { FinalCTA } from "@/components/sections/final-cta";
import { HeroSection } from "@/components/sections/hero";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { StatsCounter } from "@/components/sections/stats-counter";
import { StorySection } from "@/components/sections/story";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientsMarquee />
      <ServicesSection />
      <StatsCounter />
      <StorySection />
      <PortfolioPreview />
      <TestimonialsSection />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}
