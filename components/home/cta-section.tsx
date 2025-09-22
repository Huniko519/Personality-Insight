"use client"

import { memo } from 'react'
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const CTASection = memo(() => (
  <section className="py-16 px-4 bg-rose-600 text-white">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Personality Type?</h2>
      <p className="text-xl mb-8">
        Take our comprehensive assessment and gain valuable insights into your psychological preferences,
        strengths, and potential.
      </p>
      <Link href="/quiz">
        <Button className="bg-white text-rose-600 hover:bg-rose-100 text-lg px-8 py-3 h-auto">
          Start the Test Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  </section>
))

CTASection.displayName = 'CTASection'
