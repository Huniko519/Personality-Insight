"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const TypeCTA = memo(() => {
  return (
    <div className="text-center">
      <Link href="/quiz">
        <Button className="bg-rose-600 hover:bg-rose-700">Take the Personality Test</Button>
      </Link>
    </div>
  )
})

TypeCTA.displayName = "TypeCTA"

export default TypeCTA



