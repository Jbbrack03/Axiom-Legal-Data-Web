import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section id="contact" className="container max-w-screen-xl mx-auto px-4 py-32 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight text-balance">
          Join the Next Generation of Legal AI
        </h2>
        
        <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
          Get exclusive early access to our Litigation Response Library dataset and receive your complete TSTR validation report once development is complete.
        </p>

        <div className="pt-8 space-y-4">
          <Link href="/pilot-program">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base md:text-lg px-6 md:px-8 py-4 h-auto w-full max-w-md md:max-w-none md:w-auto"
            >
              <span className="block md:hidden">Join Pilot Program<br />25% Off + Early Access</span>
              <span className="hidden md:block">Join the Pilot Program - Get 25% Off + Early Access</span>
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Limited to 50 pioneering legal tech companies
          </p>
        </div>
      </div>
    </section>
  )
}
