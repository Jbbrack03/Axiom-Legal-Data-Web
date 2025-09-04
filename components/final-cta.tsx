import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section id="contact" className="container max-w-screen-xl mx-auto px-4 py-32 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight text-balance">
          Ready to Build the Future of Legal Tech?
        </h2>

        <div className="pt-8">
          <Link href="/pilot-program">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4 h-auto"
            >
              Apply for the Pilot Program
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
