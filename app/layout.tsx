import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
})

export const metadata: Metadata = {
  title: "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
  description:
    "Empower legal tech innovators to train AI models with high-fidelity, legally defensible synthetic data. Build with confidence, without prohibitive costs and legal risks.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { title: 'Axiom Legal Data Blog RSS Feed', url: '/api/rss' }
      ]
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} ${firaCode.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
