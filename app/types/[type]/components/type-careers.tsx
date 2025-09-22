"use client"

import { memo } from "react"

interface TypeCareersProps {
  personalityType: any
}

const TypeCareers = memo(({ personalityType }: TypeCareersProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-rose-800 mb-4">Career Path</h3>
      <p className="text-rose-700">Career information will be implemented here.</p>
    </div>
  )
})

TypeCareers.displayName = "TypeCareers"

export default TypeCareers



