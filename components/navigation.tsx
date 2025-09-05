"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { X, Menu } from "lucide-react"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-none px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-3 items-center h-16 w-full">
            {/* Mobile Menu Button - Left Section (Mobile Only) */}
            <div className="flex justify-start md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 hover:bg-muted"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Logo - Left Section (Desktop) / Center Section (Mobile) */}
            <div className="flex justify-center md:justify-start">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/axiom-logo.svg" alt="Axiom Legal Data" width={120} height={32} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Navigation Links - Center Section (Desktop Only) */}
            <div className="hidden md:flex items-center justify-center">
              <div className="flex items-center space-x-8">
                <Link
                  href="/blog"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
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
              </div>
            </div>

            {/* CTA Button - Right Section (Desktop) / Hidden (Mobile) */}
            <div className="flex justify-end">
              <div className="hidden md:block">
                <Link href="/pilot-program">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Apply for the Pilot Program
                  </Button>
                </Link>
              </div>
              
              {/* Spacer for mobile layout balance */}
              <div className="md:hidden w-10" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Drawer */}
          <div className="fixed top-0 left-0 z-50 h-full w-80 max-w-sm bg-background border-r shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image 
                    src="/axiom-logo.svg" 
                    alt="Axiom Legal Data" 
                    width={120} 
                    height={32} 
                    className="h-8 w-auto" 
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-6 space-y-4">
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted"
                >
                  Blog
                </Link>
                <Link
                  href="/pilot-program"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted"
                >
                  Pilot Program
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-muted"
                >
                  Contact
                </Link>
              </div>

              {/* CTA Button */}
              <div className="mt-auto p-6 border-t">
                <Link href="/pilot-program" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    variant="outline"
                  >
                    Apply for the Pilot Program
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
