"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const OverviewCTA = memo(() => {
  return (
    <div className="text-center mt-12">
      <h2 className="text-2xl font-bold text-rose-800 mb-4">Discover Your Personality Type</h2>
      <p className="text-rose-700 mb-6">
        Take our comprehensive personality assessment to find out which of the 16 types matches your natural
        preferences and tendencies.
      </p>
      <Link href="/quiz">
        <Button className="bg-rose-600 hover:bg-rose-700">Take the Personality Test</Button>
      </Link>
    </div>
  )
})

OverviewCTA.displayName = "OverviewCTA"

export default OverviewCTA

