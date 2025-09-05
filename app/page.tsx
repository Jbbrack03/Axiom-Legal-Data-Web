import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { EnhancedFeatures } from "@/components/enhanced-features"
import { AnimatedDataPipeline } from "@/components/animated-data-pipeline"
import { CredibilitySection } from "@/components/credibility-section"
import { InteractiveQualityStandard } from "@/components/interactive-quality-standard"
import { FounderSection } from "@/components/founder-section"
import { EnhancedFeaturedContent } from "@/components/enhanced-featured-content"
import { PilotProgramBenefits } from "@/components/pilot-program-benefits"
import { FinalCTA } from "@/components/final-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <EnhancedFeatures />
        <AnimatedDataPipeline />
        <CredibilitySection />
        <InteractiveQualityStandard />
        <FounderSection />
        <EnhancedFeaturedContent />
        <PilotProgramBenefits />
        <FinalCTA />
      </main>
    </div>
  )
}
