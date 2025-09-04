import { Shield, Zap, CheckCircle } from "lucide-react"

export function CorePillars() {
  const pillars = [
    {
      icon: CheckCircle,
      title: "Unimpeachable Quality.",
      description:
        "Our data is rigorously validated using a 'Train on Synthetic, Test on Real' (TSTR) methodology and benchmarked against LegalBench to ensure statistical integrity and real-world performance.",
    },
    {
      icon: Shield,
      title: "Ironclad Legal Defensibility.",
      description:
        "Built with a 'PII Shield' from the ground up. Our robust data sourcing ethics and complete PII redaction provide a safe harbor from legal and privacy risks.",
    },
    {
      icon: Zap,
      title: "Accelerated Development.",
      description:
        "Eliminate the bottleneck of manual data creation or risky data sourcing. Get to market faster with a clean, high-quality dataset ready for immediate use.",
    },
  ]

  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Foundation for Modern Legal AI.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {pillars.map((pillar, index) => {
          const IconComponent = pillar.icon
          return (
            <div key={index} className="text-center space-y-6">
              <div className="flex justify-center">
                <IconComponent className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
              <p className="text-foreground leading-relaxed">{pillar.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
