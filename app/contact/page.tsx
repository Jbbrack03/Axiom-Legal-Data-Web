import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Clock } from "lucide-react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | Axiom Legal Data',
  description: 'Ready to transform your legal data operations? Contact our team for enterprise solutions, partnerships, or technical support. We\'d love to hear from you.',
  openGraph: {
    title: 'Contact Us - Get in Touch | Axiom Legal Data',
    description: 'Ready to transform your legal data operations? Contact our team for enterprise solutions, partnerships, or technical support.',
    url: 'https://axiomlegaldata.com/contact',
  },
  twitter: {
    title: 'Contact Us - Get in Touch | Axiom Legal Data',
    description: 'Ready to transform your legal data operations? Contact our team for enterprise solutions, partnerships, or technical support.',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-20 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Get in Touch</h1>
          <p className="text-xl text-[#CCD6F6] max-w-2xl mx-auto text-pretty">
            Ready to transform your legal data operations? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#64FFDA]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#64FFDA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <a
                      href="mailto:contact@axiomlegaldata.com"
                      className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors"
                    >
                      contact@axiomlegaldata.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#64FFDA]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#64FFDA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                    <p className="text-[#CCD6F6]">Dallas, Texas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#64FFDA]/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#64FFDA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Business Hours</h3>
                    <div className="text-[#CCD6F6] space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM CST</p>
                      <p>Closed Weekends and US Holidays</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#64FFDA]/5 border border-[#64FFDA]/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Get Started?</h3>
              <p className="text-[#CCD6F6] mb-4">
                Join our exclusive pilot program and be among the first to experience the future of legal data
                management.
              </p>
              <Button asChild className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 font-semibold">
                <a href="/pilot-program">Apply for Pilot Program</a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>
    </div>
  )
}
