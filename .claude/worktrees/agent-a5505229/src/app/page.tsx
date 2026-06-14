import { FinalCTA } from "@/components/sections/final-cta";
import { HeroSection } from "@/components/sections/hero";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ServicesSection } from "@/components/sections/services";
import { StorySection } from "@/components/sections/story";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StorySection />
      <PortfolioPreview />
      <FinalCTA />
    </>
  );
}
