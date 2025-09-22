import { fetchFromFirebase } from "./firebase"

export interface Question {
  text: string
  options: string[]
  dimension: string
  weight: number // 1 = standard, 2 = important, 3 = very important
  subtype?: string // Optional subtype for more nuanced scoring
}

// Function to get questions from Firebase
export async function getQuestionsFromFirebase(): Promise<Question[]> {
  try {
    return await fetchFromFirebase<Question[]>("/questions")
  } catch (error) {
    console.error("Error fetching questions from Firebase:", error)
    throw new Error("Failed to fetch questions from database")
  }
}

// Function to get a subset of questions for each dimension
export async function getRandomizedQuestions(questionsPerDimension = 5): Promise<Question[]> {
  const questionsData = await getQuestionsFromFirebase()
  const dimensions = ["EI", "SN", "TF", "JP"]

  // Helper to select questions with weight distribution
  const getQuestionsWithWeightDistribution = (dimensionQuestions: Question[]): Question[] => {
    const sorted = [...dimensionQuestions].sort((a, b) => b.weight - a.weight)
    const high = sorted.filter((q) => q.weight === 3).slice(0, 2)
    const medium = sorted.filter((q) => q.weight === 2).slice(0, 2)
    const remainingCount = questionsPerDimension - high.length - medium.length
    const remaining = shuffleArray(
      sorted.filter((q) => !high.includes(q) && !medium.includes(q)),
    ).slice(0, remainingCount)
    return shuffleArray([...high, ...medium, ...remaining])
  }

  // Select and combine questions for all dimensions
  const selectedQuestions = dimensions.flatMap((dim) => {
    const dimQuestions = questionsData.filter((q) => q.dimension === dim)
    return getQuestionsWithWeightDistribution(dimQuestions)
  })

  return shuffleArray(selectedQuestions)
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
