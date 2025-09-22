"use client"

import { memo } from "react"

const TypesHeader = memo(() => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types</h1>
      <p className="text-xl text-rose-600 max-w-3xl mx-auto">
        Explore the 16 personality types and discover the unique characteristics, strengths, and potential
        challenges of each type.
      </p>
    </div>
  )
})

TypesHeader.displayName = "TypesHeader"

export default TypesHeader

