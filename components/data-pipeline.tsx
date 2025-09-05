import { ArrowRight, Database, Shield, CheckCircle, FileText } from "lucide-react"

export function DataPipeline() {
  const steps = [
    {
      icon: Database,
      title: "Public Sources",
      subtitle: "EDGAR • RECAP",
      description: "Curated legal documents from trusted public repositories"
    },
    {
      icon: FileText,
      title: "VLM Processing",
      subtitle: "Seed Data Refinery",
      description: "Vision Language Models extract structure, context, and legal nuances"
    },
    {
      icon: Shield,
      title: "PII Shield",
      subtitle: "Dual-Model NER",
      description: "Advanced detection and pseudonymization of all sensitive data"
    },
    {
      icon: CheckCircle,
      title: "Quality Gate",
      subtitle: "TSTR Validated",
      description: "Train-on-Synthetic, Test-on-Real methodology ensures performance"
    }
  ]

  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          The Axiom Data Refinery
        </h2>
        <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
          Our sophisticated pipeline transforms raw legal documents into production-ready synthetic datasets with uncompromising quality and privacy protection.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="relative">
                  <div className="bg-primary/10 rounded-2xl p-6 mb-4 border border-primary/20">
                    <IconComponent className="w-8 h-8 text-primary mx-auto" strokeWidth={1.5} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-full w-8">
                      <ArrowRight className="w-6 h-6 text-primary/60 mx-auto" strokeWidth={2} />
                    </div>
                  )}
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm font-medium text-primary">{step.subtitle}</p>
                  <p className="text-sm text-foreground leading-relaxed max-w-48">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="md:hidden mt-6 mb-2">
                    <ArrowRight className="w-6 h-6 text-primary/60 mx-auto rotate-90" strokeWidth={2} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/20 rounded-full px-4 py-2 mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Final Output</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Production-Ready Synthetic Dataset</h3>
            <p className="text-foreground text-lg">
              Clean <code className="bg-primary/20 px-2 py-1 rounded text-sm">.jsonl</code> files ready for immediate AI training and deployment
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}