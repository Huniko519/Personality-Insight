"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const CTASection = memo(() => (
  <div className="text-center">
    <h2 className="text-2xl font-bold text-rose-800 mb-6">Ready to discover your personality type?</h2>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link href="/quiz">
        <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-lg px-8">
          Take the Test
        </Button>
      </Link>
      <Link href="/contact">
        <Button
          size="lg"
          variant="outline"
          className="border-rose-600 text-rose-600 hover:bg-rose-50 text-lg px-8"
        >
          Contact Us
        </Button>
      </Link>
    </div>
  </div>
))

CTASection.displayName = 'CTASection'

export { CTASection }
