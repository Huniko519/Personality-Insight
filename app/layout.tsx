import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { memo } from "react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AuthProvider } from "@/lib/auth"
import "./globals.css"

// Import to ensure Firebase is initialized
import "@/lib/firebase-init"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PersonaIQ - Personality Type Test",
  description: "Discover your personality type and gain valuable insights",
  generator: "Mr. Huniko",
}

// Memoized head component
const HeadContent = memo(() => (
  <head>
    <link rel="icon" href="/favicon.png" />
  </head>
))

HeadContent.displayName = 'HeadContent'

// Memoized body content component
const BodyContent = memo<{ children: React.ReactNode }>(({ children }) => (
  <body className={inter.className}>
    <AuthProvider>
      <ScrollToTop />
      {children}
    </AuthProvider>
  </body>
))

BodyContent.displayName = 'BodyContent'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" webcrx="">
      <HeadContent />
      <BodyContent>{children}</BodyContent>
    </html>
  )
}
