import { Award, BarChart3, FileCheck, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CredibilitySection() {
  const proofs = [
    {
      icon: BarChart3,
      title: "TSTR Methodology",
      subtitle: "Industry Gold Standard",
      description: "Train on Synthetic, Test on Real validation proves our data's utility with the same rigor used by leading AI research labs.",
      metrics: [
        "95%+ performance retention vs. real data",
        "Validated across multiple ML architectures", 
        "Published validation reports available"
      ],
      badge: "Transparent"
    },
    {
      icon: Award,
      title: "LegalBench Benchmarked",
      subtitle: "Standardized Legal Reasoning",
      description: "Our models aren't just generating text; they're benchmarked against standardized legal reasoning tasks to ensure real-world capability.",
      metrics: [
        "Tested on 162 legal reasoning tasks",
        "Cross-validated performance metrics",
        "Objective, empirical proof of quality"
      ],
      badge: "Validated"
    },
    {
      icon: FileCheck,
      title: "Complete Validation Reports",
      subtitle: "Don't Just Take Our Word",
      description: "We prove our data's utility with comprehensive testing and will publish detailed validation results for full transparency.",
      metrics: [
        "Detailed TSTR performance analysis",
        "Task-specific benchmark results",
        "Methodology documentation available"
      ],
      badge: "Verifiable"
    }
  ]

  return (
    <section className="py-32">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Don't Just Take Our Word for It
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            We prove our data's quality with objective, empirical validation using industry-standard methodologies. Every claim is backed by verifiable results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {proofs.map((proof, index) => {
            const IconComponent = proof.icon
            return (
              <div key={index} className="bg-background/50 rounded-2xl p-8 border border-primary/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
                    <IconComponent className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {proof.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{proof.title}</h3>
                  <p className="text-primary font-medium mb-4">{proof.subtitle}</p>
                  <p className="text-foreground leading-relaxed">{proof.description}</p>
                </div>

                <ul className="space-y-2">
                  {proof.metrics.map((metric, metricIndex) => (
                    <li key={metricIndex} className="flex items-start space-x-3">
                      <div className="bg-primary/20 rounded-full p-1 mt-1.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm text-foreground">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Get Early Access to Our Validation Reports
          </h3>
          <p className="text-foreground mb-6 max-w-2xl mx-auto">
            Join our pilot program to receive exclusive access to our complete TSTR validation report and LegalBench scores the moment they're published.
          </p>
          <Link href="/pilot-program">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join the Pilot Program
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}