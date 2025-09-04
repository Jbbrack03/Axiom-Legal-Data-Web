"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { useState } from "react"

export default function MethodologyPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to Vercel Function
    console.log("Email submitted:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container max-w-screen-xl mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance">
            Our Methodology is Our Moat.
          </h1>

          <p className="text-xl md:text-2xl text-foreground leading-relaxed text-pretty">
            We are currently documenting our proprietary processes for creating legally defensible, high-fidelity
            synthetic data. Our methodology blog, featuring in-depth articles and whitepapers, will launch soon.
          </p>

          <div className="pt-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Notify Me When It's Live
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
