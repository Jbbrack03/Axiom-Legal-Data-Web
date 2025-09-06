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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://axiomlegaldata.com/#organization",
        "name": "Axiom Legal Data",
        "url": "https://axiomlegaldata.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://axiomlegaldata.com/favicon.svg",
          "width": "60",
          "height": "60"
        },
        "description": "Empower legal tech innovators to train AI models with high-fidelity, legally defensible synthetic data. Build with confidence, without prohibitive costs and legal risks.",
        "foundingDate": "2025",
        "industry": "Legal Technology",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "39.8283",
            "longitude": "-98.5795"
          },
          "geoRadius": "6000000"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://axiomlegaldata.com/#website",
        "url": "https://axiomlegaldata.com",
        "name": "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
        "description": "TSTR-validated synthetic legal data for AI training. Stop paying lawyers $500/hour for training data.",
        "publisher": {
          "@id": "https://axiomlegaldata.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://axiomlegaldata.com/blog?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Axiom Legal Data Platform",
        "description": "VLM-powered legal data processing platform for AI training with PII protection and TSTR validation",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web-based",
        "offers": {
          "@type": "Offer",
          "description": "Join our pilot program for early access with preferential pricing",
          "url": "https://axiomlegaldata.com/pilot-program"
        },
        "featureList": [
          "VLM-Powered Processing",
          "PII Shield Protection", 
          "TSTR Validated Quality",
          "Synthetic Legal Data Generation"
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  )
}
