import { Code, Database, Cpu, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TechnicalDeepDive() {
  const techSpecs = [
    {
      icon: Database,
      title: "Multi-Modal Data Sources",
      description: "EDGAR filings, RECAP court documents, and curated legal repositories",
      details: ["SEC 10-K/10-Q filings", "Federal court dockets", "Public legal databases", "Real-time document ingestion"]
    },
    {
      icon: Cpu,
      title: "VLM Architecture",
      description: "Vision Language Models for document understanding beyond simple OCR",
      details: ["Document structure recognition", "Legal context preservation", "Multi-page relationship mapping", "Annotation and margin processing"]
    },
    {
      icon: Lock,
      title: "Dual-Model PII Detection",
      description: "Advanced Named Entity Recognition with privacy-first pseudonymization",
      details: ["99.9% PII detection accuracy", "GDPR/CCPA compliant processing", "Configurable anonymization rules", "Legal privilege protection"]
    },
    {
      icon: Code,
      title: "Quality Assurance Pipeline",
      description: "Multi-stage validation ensuring production-ready output quality",
      details: ["TSTR methodology validation", "LegalBench task benchmarking", "Statistical distribution analysis", "Human expert review cycles"]
    }
  ]

  const datasets = [
    {
      name: "Litigation Response Library",
      description: "Motion responses, discovery requests, and procedural filings",
      status: "Pilot Phase"
    },
    {
      name: "Contract Clause Generator", 
      description: "Commercial agreements, terms, and standardized language",
      status: "In Development"
    },
    {
      name: "Legal Brief Corpus",
      description: "Appellate briefs, memoranda, and legal argumentation",
      status: "Research Phase"
    }
  ]

  return (
    <section className="py-32 bg-background/30">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Axiom Quality Standard
          </h2>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Behind our simple .jsonl output files lies a sophisticated pipeline engineered for uncompromising quality and legal compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {techSpecs.map((spec, index) => {
            const IconComponent = spec.icon
            return (
              <div key={index} className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-xl p-3 border border-primary/20 flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{spec.title}</h3>
                    <p className="text-foreground leading-relaxed mb-4">{spec.description}</p>
                    
                    <ul className="space-y-2">
                      {spec.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2 text-sm">
                          <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-background/50 rounded-2xl p-8 border border-primary/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Specialized Dataset Portfolio
          </h3>
          <p className="text-foreground text-center mb-8 max-w-2xl mx-auto">
            Each dataset is purpose-built for specific legal AI applications, with domain expertise and specialized validation protocols.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {datasets.map((dataset, index) => (
              <div key={index} className="bg-background/30 rounded-xl p-6 border border-primary/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{dataset.name}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    dataset.status === 'Pilot Phase' ? 'bg-primary/20 text-primary' :
                    dataset.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {dataset.status}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{dataset.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/20 text-primary hover:bg-primary/10"
          >
            Request Technical Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}