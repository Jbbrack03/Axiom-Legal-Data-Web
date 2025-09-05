import { Star, Users, FileText, Zap, Award } from "lucide-react"

export function PilotProgramBenefits() {
  const benefits = [
    {
      icon: Zap,
      title: "Early Access",
      description: "Receive the first tranche of our Litigation Response Library dataset before public release."
    },
    {
      icon: Users,
      title: "Direct Founder Access", 
      description: "Work directly with our founder to provide feedback and shape the future of our data offerings."
    },
    {
      icon: FileText,
      title: "Complete Transparency",
      description: "Receive exclusive access to TSTR validation and LegalBench benchmark reports once development is complete."
    },
    {
      icon: Award,
      title: "Preferential Pricing",
      description: "Lock in a 25% lifetime discount on all future datasets."
    }
  ]

  return (
    <section className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-4 border border-primary/20">
              <Star className="w-4 h-4 text-primary" fill="currentColor" />
              <span className="text-sm font-medium text-primary">Exclusive Pilot Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What to Expect in the Pilot Program
            </h2>
            <p className="text-lg text-foreground max-w-2xl mx-auto">
              Join 50 pioneering legal tech companies in shaping the future of synthetic data. This isn't just early access—it's a strategic partnership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="bg-background/30 rounded-xl p-6 border border-primary/10 space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <div className="bg-primary/10 rounded-lg p-2 border border-primary/20">
                      <IconComponent className="w-5 h-5 text-primary" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 text-center">
            <p className="text-sm text-primary font-medium mb-2">Limited Opportunity</p>
            <p className="text-foreground">
              We're accepting only <strong className="text-white">50 companies</strong> to ensure personalized attention and meaningful collaboration.
              <br />
              <span className="text-sm text-muted-foreground">Applications close when we reach capacity.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}