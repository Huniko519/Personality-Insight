"use client"

import { memo } from 'react'
import { memoizeLRU } from '@/lib/memoization'
import { Card, CardContent } from '@/components/ui/card'
import { MessageCircle } from 'lucide-react'

// Memoized communication tips calculation
const getCommunicationTips = memoizeLRU((type1: string, type2: string): string[] => {
  if (!type1 || !type2) return []

  try {
    const { getCompatibility } = require('@/lib/compatibility-data')
    const compatibilityData = getCompatibility(type1, type2)
    const advicePoints = compatibilityData.advice.split(". ").filter((point: string) => point.trim().length > 0)
    return advicePoints.length > 0 ? advicePoints : [compatibilityData.advice]
  } catch (error) {
    console.error("Error getting communication tips:", error)
    
    // Fallback tips
    const tips: string[] = []

    // E/I difference
    if (type1[0] !== type2[0]) {
      tips.push(
        `The ${type1[0] === "E" ? type1 : type2} type should give the ${type1[0] === "I" ? type1 : type2} type space for reflection.`
      )
    }

    // S/N difference
    if (type1[1] !== type2[1]) {
      tips.push(
        `The ${type1[1] === "S" ? type1 : type2} type should provide concrete examples, while the ${type1[1] === "N" ? type1 : type2} type should share the bigger picture.`
      )
    }

    // T/F difference
    if (type1[2] !== type2[2]) {
      tips.push(
        `The ${type1[2] === "T" ? type1 : type2} type should consider feelings, while the ${type1[2] === "F" ? type1 : type2} type should acknowledge logical reasoning.`
      )
    }

    // J/P difference
    if (type1[3] !== type2[3]) {
      tips.push(
        `The ${type1[3] === "J" ? type1 : type2} type should allow flexibility, while the ${type1[3] === "P" ? type1 : type2} type should respect deadlines and structure.`
      )
    }

    return tips.length > 0 ? tips : ["Focus on understanding each other's perspectives and communication styles."]
  }
}, 100)

interface CommunicationTipsProps {
  type1: string
  type2: string
}

export const CommunicationTips = memo<CommunicationTipsProps>(({ type1, type2 }) => {
  const tips = getCommunicationTips(type1, type2)

  if (!tips.length) {
    return null
  }

  return (
    <Card className="bg-rose-50 border-rose-200">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <MessageCircle className="h-5 w-5 text-rose-600 mr-2" />
          <h3 className="text-lg font-semibold text-rose-800">Communication Tips</h3>
        </div>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={`tip-${type1}-${type2}-${index}`} className="flex items-start">
              <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0" />
              <p className="text-rose-700 text-sm">{tip}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
})

CommunicationTips.displayName = 'CommunicationTips'
