"use client"

import { memo } from "react"

interface TypeOverviewProps {
  personalityType: {
    name: string
    description: string
    traits: string[]
    values: string[]
  }
}

const TypeOverview = memo(({ personalityType }: TypeOverviewProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-rose-800 mb-4">{personalityType.name}</h3>
      <p className="mb-4 text-rose-700">{personalityType.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-rose-50 p-4 rounded-md">
          <h4 className="font-semibold text-rose-800 mb-2">Core Traits</h4>
          <ul className="list-disc list-inside text-rose-700 space-y-1">
            {personalityType.traits.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
        <div className="bg-rose-50 p-4 rounded-md">
          <h4 className="font-semibold text-rose-800 mb-2">Values</h4>
          <ul className="list-disc list-inside text-rose-700 space-y-1">
            {personalityType.values.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
})

TypeOverview.displayName = "TypeOverview"

export default TypeOverview



