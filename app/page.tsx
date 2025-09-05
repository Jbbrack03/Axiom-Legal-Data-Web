import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { EnhancedFeatures } from "@/components/enhanced-features"
import { DataPipeline } from "@/components/data-pipeline"
import { CredibilitySection } from "@/components/credibility-section"
import { TechnicalDeepDive } from "@/components/technical-deep-dive"
import { FounderSection } from "@/components/founder-section"
import { FeaturedContent } from "@/components/featured-content"
import { FinalCTA } from "@/components/final-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <EnhancedFeatures />
        <DataPipeline />
        <CredibilitySection />
        <TechnicalDeepDive />
        <FounderSection />
        <FeaturedContent />
        <FinalCTA />
      </main>
    </div>
  )
}
