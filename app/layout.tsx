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
  description: "Empower legal tech innovators to train AI models with high-fidelity, legally defensible synthetic data. Build with confidence, without prohibitive costs and legal risks.",
  generator: "v0.app",
  metadataBase: new URL('https://axiomlegaldata.com'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { title: 'Axiom Legal Data Blog RSS Feed', url: '/api/rss' }
      ]
    }
  },
  openGraph: {
    title: "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
    description: "TSTR-validated synthetic legal data for AI training. Stop paying lawyers $500/hour for training data.",
    url: 'https://axiomlegaldata.com',
    siteName: 'Axiom Legal Data',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Axiom Legal Data - Legal AI Training Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Axiom Legal Data - Build Unbreakable Legal AI, Faster",
    description: "TSTR-validated synthetic legal data for AI training",
    images: ['/og-image.png'],
  },
  icons: {
    icon: "/favicon.svg",
  },
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
