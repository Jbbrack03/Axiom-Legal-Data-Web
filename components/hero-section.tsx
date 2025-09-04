import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
          Build Unbreakable Legal AI, Faster.
        </h1>

        <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          We empower legal tech innovators to train their AI models with high-fidelity, legally defensible synthetic
          data. Build your product with more confidence, without the prohibitive costs and legal risks of sourcing
          real-world data.
        </p>

        <div className="pt-8">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 h-auto">
            Apply for the Pilot Program
          </Button>
        </div>
      </div>
    </section>
  )
}
