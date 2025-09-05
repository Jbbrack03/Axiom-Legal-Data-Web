import { Brain, Shield, TrendingUp } from "lucide-react"

export function EnhancedFeatures() {
  const features = [
    {
      icon: Brain,
      title: "VLM-Powered Processing",
      subtitle: "Go Beyond Simple OCR",
      description: "Our Vision Language Models understand document structure, layout, and context, capturing nuances that other systems miss.",
      benefits: [
        "Preserves legal document hierarchy and relationships",
        "Understands complex formatting and annotations", 
        "Maintains semantic meaning across document types"
      ]
    },
    {
      icon: Shield,
      title: "PII Shield Protection",
      subtitle: "Train with Zero Risk",
      description: "Our dual-model NER pipeline detects and pseudonymizes all sensitive data, ensuring complete legal and ethical compliance.",
      benefits: [
        "99.9% PII detection accuracy",
        "Safe harbor from privacy violations",
        "Maintains data utility while removing all risk"
      ]
    },
    {
      icon: TrendingUp,
      title: "TSTR Validated Quality",
      subtitle: "Empirically Proven Performance",
      description: "We use the 'Train on Synthetic, Test on Real' methodology to guarantee our data performs on real-world tasks.",
      benefits: [
        "Industry gold-standard validation approach",
        "Benchmarked against LegalBench standards",
        "Published validation reports for transparency"
      ]
    }
  ]

  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Built for AI Innovators
        </h2>
        <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
          Every feature addresses the specific challenges facing legal tech CTOs: speed-to-market, budget constraints, and the risk of using real client data.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div key={index} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
                  <IconComponent className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-primary font-medium">{feature.subtitle}</p>
                </div>
              </div>

              <p className="text-foreground leading-relaxed text-lg">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start space-x-3">
                    <div className="bg-primary/20 rounded-full p-1 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}