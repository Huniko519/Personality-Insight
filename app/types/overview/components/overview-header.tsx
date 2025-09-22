"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const OverviewHeader = memo(() => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types Overview</h1>
      <p className="text-rose-700 text-lg mb-6">
        A comprehensive look at the four temperaments and how they shape our personalities
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <Link href="/types">
          <Button variant="outline" className="border-rose-600 text-rose-700 hover:bg-rose-100 w-full sm:w-auto">
            View All Types
          </Button>
        </Link>
        <Link href="/quiz">
          <Button className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto">Take the Personality Test</Button>
        </Link>
      </div>
    </div>
  )
})

OverviewHeader.displayName = "OverviewHeader"

export default OverviewHeader

