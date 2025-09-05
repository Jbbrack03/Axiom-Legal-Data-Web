import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
          Build Unbreakable Legal AI, Faster
        </h1>

        <p className="text-lg md:text-xl text-primary/80 font-medium mb-2">
          Our TSTR-validated synthetic data is empirically proven to perform under pressure, eliminating the model failures and ethical risks common with other data sources.
        </p>

        <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          Stop paying lawyers $500/hour to generate training data. Build your legal AI tools 10x faster with production-ready synthetic datasets that pass the industry's most rigorous validation standards.
        </p>

        <div className="pt-8">
          <Link href="/pilot-program">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg px-6 md:px-8 py-4 h-auto w-full max-w-md md:max-w-none md:w-auto"
            >
              <span className="block md:hidden">Join Pilot Program<br />25% Off + Early Access</span>
              <span className="hidden md:block">Join the Pilot Program - Get Early Access & 25% Off</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
