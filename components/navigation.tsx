"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/axiom-logo.svg" alt="Axiom Legal Data" width={120} height={32} className="h-8 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#methodology"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Methodology
          </a>
          <a href="#pilot" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Pilot Program
          </a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>

          {/* CTA Button */}
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Request Pilot Access
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Menu
          </Button>
        </div>
      </div>
    </nav>
  )
}
