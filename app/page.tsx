import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CorePillars } from "@/components/core-pillars"
import { FounderSection } from "@/components/founder-section"
import { FeaturedContent } from "@/components/featured-content"
import { FinalCTA } from "@/components/final-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CorePillars />
        <FounderSection />
        <FeaturedContent />
        <FinalCTA />
      </main>
    </div>
  )
}
