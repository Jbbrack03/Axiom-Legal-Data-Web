import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PilotProgramPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Become a Founding Partner.</h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto text-pretty">
            An exclusive, limited-slot pilot program for innovative legal tech startups.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - The Offer */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">What You Get:</h3>
              <div className="space-y-4">
                {[
                  "A substantial sample dataset tailored to your needs.",
                  "Early access to our generation platform before public launch.",
                  "Direct access to our founding team for support and feedback.",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">What We Ask For:</h3>
              <div className="space-y-4">
                {[
                  "Actionable feedback to help us refine the final product.",
                  "A testimonial upon successful implementation.",
                  "The opportunity to be featured as an official launch partner.",
                ].map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Apply for a Spot.</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  id="fullName"
                  className="bg-input border-border text-white placeholder:text-muted-foreground"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="workEmail" className="block text-sm font-medium text-foreground mb-2">
                  Work Email *
                </label>
                <Input
                  id="workEmail"
                  type="email"
                  className="bg-input border-border text-white placeholder:text-muted-foreground"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-2">
                  Company Name *
                </label>
                <Input
                  id="companyName"
                  className="bg-input border-border text-white placeholder:text-muted-foreground"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                  Role *
                </label>
                <Input
                  id="role"
                  className="bg-input border-border text-white placeholder:text-muted-foreground"
                  placeholder="e.g., CTO, Founder, Head of AI"
                />
              </div>

              <div>
                <label htmlFor="dataNeeds" className="block text-sm font-medium text-foreground mb-2">
                  Briefly describe your data needs. *
                </label>
                <Textarea
                  id="dataNeeds"
                  className="bg-input border-border text-white placeholder:text-muted-foreground min-h-[120px]"
                  placeholder="Tell us about your specific data requirements and use cases..."
                />
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Questions about the pilot program?</h3>
          <p className="text-foreground mb-6">
            Our team is here to help you understand how Axiom Legal Data can transform your practice.
          </p>
          <Link href="mailto:pilot@axiomlegaldata.com?subject=Pilot Program Inquiry">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Contact Our Team
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
