"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/axiom-logo.svg" alt="Axiom Legal Data" width={120} height={32} className="h-8 w-auto" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/methodology"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Methodology
          </Link>
          <Link
            href="/pilot-program"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Pilot Program
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>

          <Link href="/pilot-program">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              Apply for the Pilot Program
            </Button>
          </Link>
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
