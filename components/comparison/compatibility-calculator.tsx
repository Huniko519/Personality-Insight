"use client"

import { memo } from 'react'
import { memoizeLRU } from '@/lib/memoization'

// Memoized compatibility calculation
const calculateCompatibility = memoizeLRU((type1: string, type2: string): number => {
  if (!type1 || !type2) return 50

  try {
    // Import dynamically to avoid circular dependencies
    const { getCompatibility } = require('@/lib/compatibility-data')
    const compatibilityData = getCompatibility(type1, type2)
    return compatibilityData.score * 10
  } catch (error) {
    console.error("Error calculating compatibility:", error)
    
    // Fallback calculation
    let matchCount = 0
    for (let i = 0; i < 4; i++) {
      if (type1[i] === type2[i]) matchCount++
    }
    
    const baseScores = [30, 50, 70, 85, 95]
    return baseScores[matchCount]
  }
}, 100)

// Memoized relationship dynamic calculation
const getRelationshipDynamic = memoizeLRU((type1: string, type2: string): string => {
  if (!type1 || !type2) return "Select two personality types to see their relationship dynamic."

  try {
    const { getCompatibility } = require('@/lib/compatibility-data')
    const compatibilityData = getCompatibility(type1, type2)
    return compatibilityData.summary
  } catch (error) {
    console.error("Error getting relationship dynamic:", error)
    
    // Fallback logic
    let matchCount = 0
    for (let i = 0; i < 4; i++) {
      if (type1[i] === type2[i]) matchCount++
    }

    if (matchCount === 4) return "Mirror - You share the same perspective on the world, which creates strong understanding but may lack growth from differences."
    if (matchCount === 3) return "Similar - You have a lot in common, making communication easy, but may need to appreciate your one key difference."
    if (matchCount === 0) return "Opposite - You see the world very differently, which can create both fascination and frustration."
    
    if (type1[0] !== type2[0] && type1[1] === type2[1] && type1[2] !== type2[2]) {
      return "Complementary - Your differences in extraversion/introversion and thinking/feeling create a balanced dynamic."
    }
    
    if (type1[0] === type2[0] && type1[1] !== type2[1] && type1[2] === type2[2]) {
      return "Challenging - You share some core traits but differ in how you perceive the world, which can lead to misunderstandings."
    }
    
    return "Mixed - Your relationship has both areas of natural understanding and potential challenges."
  }
}, 100)

interface CompatibilityCalculatorProps {
  type1: string
  type2: string
  onCompatibilityChange: (score: number, dynamic: string) => void
}

export const CompatibilityCalculator = memo<CompatibilityCalculatorProps>(({
  type1,
  type2,
  onCompatibilityChange
}) => {
  // Calculate compatibility when types change
  React.useEffect(() => {
    if (type1 && type2) {
      const score = calculateCompatibility(type1, type2)
      const dynamic = getRelationshipDynamic(type1, type2)
      onCompatibilityChange(score, dynamic)
    }
  }, [type1, type2, onCompatibilityChange])

  return null // This is a utility component, no UI
})

CompatibilityCalculator.displayName = 'CompatibilityCalculator'
