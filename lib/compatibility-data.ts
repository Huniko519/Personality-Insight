import { getPersonalityTypes } from "@/lib/firebase"

export interface CompatibilityScore {
  score: number // 1-10 scale
  description: string
  strengths: string[]
  challenges: string[]
  advice: string
}

// Add a 'summary' field to the compatibility interface and data
export interface Compatibility {
  score: number
  description: string
  strengths: string[]
  challenges: string[]
  advice: string
  summary: string
}

export type CompatibilityMatrix = Record<string, Record<string, CompatibilityScore>>

// Cache for personality types to avoid multiple fetches
let personalityTypesCache: Record<string, any> | null = null

// Function to get personality types with caching
async function getPersonalityTypesWithCache(): Promise<Record<string, any>> {
  if (personalityTypesCache) {
    return personalityTypesCache
  }

  try {
    const types = await getPersonalityTypes()
    personalityTypesCache = types
    return types
  } catch (error) {
    console.error("Error fetching personality types:", error)
    // Return empty object as fallback
    return {}
  }
}

// Generate compatibility scores based on existing data
export const generateCompatibilityMatrix = async (): Promise<CompatibilityMatrix> => {
  const matrix: CompatibilityMatrix = {}

  try {
    // Get all personality types
    const personalityTypes = await getPersonalityTypesWithCache()
    const types = Object.keys(personalityTypes)

    // For each personality type
    types.forEach((type1) => {
      matrix[type1] = {}

      // Calculate compatibility with every other type
      types.forEach((type2) => {
        const type1Data = personalityTypes[type1]
        const type2Data = personalityTypes[type2]

        if (!type1Data || !type2Data) {
          // Handle missing type data
          matrix[type1][type2] = createDefaultCompatibility(type1, type2)
          return
        }

        // Check if type2 is in best compatibility list of type1
        const isBestMatch = type1Data.compatibility?.best?.includes(type2)
        // Check if type2 is in good compatibility list of type1
        const isGoodMatch = type1Data.compatibility?.good?.includes(type2)

        let score = 5 // Default moderate compatibility

        if (isBestMatch) {
          score = 9 // High compatibility
        } else if (isGoodMatch) {
          score = 7 // Good compatibility
        } else if (type1 === type2) {
          score = 6 // Same type - decent compatibility but can amplify weaknesses
        }

        // Adjust score based on cognitive function compatibility if available
        if (type1Data.cognitiveFunctions && type2Data.cognitiveFunctions) {
          // Types that share some but not all cognitive functions often work well together
          const type1Functions = type1Data.cognitiveFunctions.map((f: any) => f.name)
          const type2Functions = type2Data.cognitiveFunctions.map((f: any) => f.name)
          const sharedFunctions = type1Functions.filter((f: string) => type2Functions.includes(f))

          if (sharedFunctions.length === 2) {
            score += 1 // Bonus for having some common ground but also differences
          }
        }

        // Generate description based on score
        let description = ""
        const strengths: string[] = []
        const challenges: string[] = []
        let advice = ""

        if (score >= 8) {
          description = `${type1} and ${type2} typically have excellent compatibility. They often understand each other's perspectives and complement each other's strengths and weaknesses.`
          strengths.push("Natural understanding of each other's communication style")
          strengths.push("Complementary strengths and weaknesses")
          strengths.push("Similar values and approaches to life")
          challenges.push("May become too comfortable and not challenge each other to grow")
          challenges.push("Could amplify each other's blind spots")
          advice =
            "Focus on using your natural compatibility to build a deep connection, while still challenging each other to grow and develop."
        } else if (score >= 6) {
          description = `${type1} and ${type2} generally have good compatibility. They have enough in common to understand each other, with enough differences to help each other grow.`
          strengths.push("Balance of similarities and differences")
          strengths.push("Opportunity to learn from each other's perspectives")
          strengths.push("Potential for growth through exposure to different approaches")
          challenges.push("May need to work harder to understand each other's viewpoints")
          challenges.push("Could clash on decision-making approaches")
          advice =
            "Appreciate your differences as opportunities for growth rather than sources of conflict. Take time to understand each other's perspectives."
        } else {
          description = `${type1} and ${type2} may face some challenges in compatibility. They approach life from different perspectives, which can lead to misunderstandings but also significant growth.`
          strengths.push("Exposure to very different perspectives")
          strengths.push("Potential for significant personal growth")
          strengths.push("Complementary skills that can create a well-rounded partnership")
          challenges.push("Communication differences may lead to misunderstandings")
          challenges.push("Different priorities and values may cause friction")
          challenges.push("May require more effort to understand each other")
          advice =
            "Focus on clear communication and actively try to understand each other's perspectives. Appreciate the unique strengths each of you brings to the relationship."
        }

        matrix[type1][type2] = {
          score,
          description,
          strengths,
          challenges,
          advice,
        }
      })
    })
  } catch (error) {
    console.error("Error generating compatibility matrix:", error)
    // Return empty matrix as fallback
  }

  return matrix
}

// Create default compatibility data for missing types
function createDefaultCompatibility(type1: string, type2: string): CompatibilityScore {
  return {
    score: 5,
    description: `Compatibility data between ${type1} and ${type2} is not available.`,
    strengths: ["Unique perspectives", "Potential for growth"],
    challenges: ["May need to work on communication", "Different approaches to situations"],
    advice: "Focus on understanding each other's perspectives and communication styles.",
  }
}

// Cache for compatibility matrix to avoid regenerating it
let compatibilityMatrixCache: CompatibilityMatrix | null = null

// Get compatibility matrix with caching
export const getCompatibilityMatrix = async (): Promise<CompatibilityMatrix> => {
  if (compatibilityMatrixCache) {
    return compatibilityMatrixCache
  }

  const matrix = await generateCompatibilityMatrix()
  compatibilityMatrixCache = matrix
  return matrix
}

// Get compatibility between two types
export async function getCompatibilityAsync(type1: string, type2: string): Promise<Compatibility> {
  try {
    const matrix = await getCompatibilityMatrix()

    if (!matrix[type1] || !matrix[type1][type2]) {
      // Return default moderate compatibility if data is missing
      const summary = "Challenging match that requires effort and understanding."
      return {
        score: 5,
        description: `Compatibility data between ${type1} and ${type2} is not available.`,
        strengths: ["Unique perspectives", "Potential for growth"],
        challenges: ["May need to work on communication", "Different approaches to situations"],
        advice: "Focus on understanding each other's perspectives and communication styles.",
        summary,
      }
    }

    const { score, description, strengths, challenges, advice } = matrix[type1][type2]

    // Add a summary based on the score
    let summary = ""
    if (score >= 8) {
      summary = "Excellent compatibility with complementary strengths."
    } else if (score >= 6) {
      summary = "Good compatibility with some areas to work on."
    } else {
      summary = "Challenging match that requires effort and understanding."
    }

    return {
      score,
      description,
      strengths,
      challenges,
      advice,
      summary,
    }
  } catch (error) {
    console.error(`Error getting compatibility for ${type1} and ${type2}:`, error)
    // Return default data if there's an error
    return {
      score: 5,
      description: `Compatibility data between ${type1} and ${type2} is not available.`,
      strengths: ["Unique perspectives", "Potential for growth"],
      challenges: ["May need to work on communication", "Different approaches to situations"],
      advice: "Focus on understanding each other's perspectives and communication styles.",
      summary: "Challenging match that requires effort and understanding.",
    }
  }
}

// Synchronous version for components that can't handle async
// This uses cached data or returns default values
export function getCompatibility(type1: string, type2: string): Compatibility {
  if (!compatibilityMatrixCache || !compatibilityMatrixCache[type1] || !compatibilityMatrixCache[type1][type2]) {
    // Return default moderate compatibility if data is missing
    const summary = "Challenging match that requires effort and understanding."
    return {
      score: 5,
      description: `Compatibility data between ${type1} and ${type2} is not available.`,
      strengths: ["Unique perspectives", "Potential for growth"],
      challenges: ["May need to work on communication", "Different approaches to situations"],
      advice: "Focus on understanding each other's perspectives and communication styles.",
      summary,
    }
  }

  const { score, description, strengths, challenges, advice } = compatibilityMatrixCache[type1][type2]

  // Add a summary based on the score
  let summary = ""
  if (score >= 8) {
    summary = "Excellent compatibility with complementary strengths."
  } else if (score >= 6) {
    summary = "Good compatibility with some areas to work on."
  } else {
    summary = "Challenging match that requires effort and understanding."
  }

  return {
    score,
    description,
    strengths,
    challenges,
    advice,
    summary,
  }
}

// Get compatibility categories for visualization
export const getCompatibilityCategories = async (
  type: string,
): Promise<{ best: string[]; good: string[]; moderate: string[] }> => {
  const best: string[] = []
  const good: string[] = []
  const moderate: string[] = []

  try {
    const matrix = await getCompatibilityMatrix()
    const types = Object.keys(matrix)

    for (const otherType of types) {
      if (!matrix[type] || !matrix[type][otherType]) {
        moderate.push(otherType)
        continue
      }

      const score = matrix[type][otherType].score

      if (score >= 8) {
        best.push(otherType)
      } else if (score >= 6) {
        good.push(otherType)
      } else {
        moderate.push(otherType)
      }
    }
  } catch (error) {
    console.error(`Error getting compatibility categories for ${type}:`, error)
    // Return empty arrays as fallback
  }

  return { best, good, moderate }
}

// Initialize the compatibility matrix cache when the module loads
getCompatibilityMatrix().catch((error) => {
  console.error("Error initializing compatibility matrix:", error)
})
