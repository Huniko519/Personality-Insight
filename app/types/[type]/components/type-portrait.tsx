"use client"

import { memo } from "react"

interface TypePortraitProps {
  typeCode: string
  personalityType: {
    portraitDescription?: string
    poeticDescription?: string
    detailedDescription?: string
    stressResponse?: string
    naturalAbilities?: string
  }
}

const TypePortrait = memo(({ typeCode, personalityType }: TypePortraitProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-rose-800 mb-4">Portrait of an {typeCode}</h3>

      {personalityType.portraitDescription && (
        <div className="mb-6">
          <p className="text-rose-700 mb-4">{personalityType.portraitDescription}</p>
        </div>
      )}

      {personalityType.poeticDescription && (
        <div className="bg-rose-50 p-5 rounded-lg mb-6 italic text-rose-700 border-l-4 border-rose-300">
          <p className="whitespace-pre-line">{personalityType.poeticDescription}</p>
        </div>
      )}

      {personalityType.detailedDescription && (
        <div className="mb-6">
          <h4 className="font-semibold text-rose-800 mb-2">Detailed Description</h4>
          <p className="text-rose-700 mb-4 whitespace-pre-line">{personalityType.detailedDescription}</p>
        </div>
      )}

      {personalityType.stressResponse && (
        <div className="mb-6">
          <h4 className="font-semibold text-rose-800 mb-2">Response to Stress</h4>
          <p className="text-rose-700 mb-4">{personalityType.stressResponse}</p>
        </div>
      )}

      {personalityType.naturalAbilities && (
        <div className="mb-6">
          <h4 className="font-semibold text-rose-800 mb-2">Natural Abilities</h4>
          <p className="text-rose-700 mb-4 whitespace-pre-line">{personalityType.naturalAbilities}</p>
        </div>
      )}
    </div>
  )
})

TypePortrait.displayName = "TypePortrait"

export default TypePortrait



