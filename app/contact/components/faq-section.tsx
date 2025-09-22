"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const FAQSection = memo(() => (
  <div className="mt-16 text-center">
    <h2 className="text-2xl font-bold text-rose-800 mb-4">Frequently Asked Questions</h2>
    <p className="text-rose-700 mb-6 max-w-2xl mx-auto">
      Find quick answers to common questions on our FAQ page
    </p>
    <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50" asChild>
      <Link href="/faq">View FAQ</Link>
    </Button>
  </div>
))

FAQSection.displayName = 'FAQSection'

export { FAQSection }
