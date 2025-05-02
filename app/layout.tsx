import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" webcrx="">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
