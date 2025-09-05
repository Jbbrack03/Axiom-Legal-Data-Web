import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-32 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
          Stop Spending Millions on Manual Data Creation
        </h1>

        <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          Build your legal AI tools 10x faster with production-ready synthetic data that's legally and ethically vetted. 
          No more paying lawyers $500/hour to generate thousands of training examples.
        </p>

        <div className="pt-8">
          <Link href="/pilot-program">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 h-auto"
            >
              Join the Pilot Program - Get Early Access & 25% Off
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
