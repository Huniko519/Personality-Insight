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
  // Get questions from Firebase
  const questionsData = await getQuestionsFromFirebase()

  // Group questions by dimension
  const eiQuestions = questionsData.filter((q) => q.dimension === "EI")
  const snQuestions = questionsData.filter((q) => q.dimension === "SN")
  const tfQuestions = questionsData.filter((q) => q.dimension === "TF")
  const jpQuestions = questionsData.filter((q) => q.dimension === "JP")

  // Ensure we include at least one high-weight question from each dimension
  const getQuestionsWithWeightDistribution = (dimensionQuestions: Question[]) => {
    // Sort by weight (highest first)
    const sortedByWeight = [...dimensionQuestions].sort((a, b) => b.weight - a.weight)

    // Take at least one high-weight (3) question if available
    const highWeightQuestions = sortedByWeight.filter((q) => q.weight === 3).slice(0, 2)

    // Take at least one medium-weight (2) question if available
    const mediumWeightQuestions = sortedByWeight.filter((q) => q.weight === 2).slice(0, 2)

    // Shuffle the remaining questions and take enough to reach questionsPerDimension
    const remainingCount = questionsPerDimension - highWeightQuestions.length - mediumWeightQuestions.length
    const remainingQuestions = shuffleArray(
      sortedByWeight.filter((q) => !highWeightQuestions.includes(q) && !mediumWeightQuestions.includes(q)),
    ).slice(0, remainingCount)

    // Combine and shuffle the final selection
    return shuffleArray([...highWeightQuestions, ...mediumWeightQuestions, ...remainingQuestions])
  }

  // Select questions for each dimension with weight distribution
  const selectedEI = getQuestionsWithWeightDistribution(eiQuestions)
  const selectedSN = getQuestionsWithWeightDistribution(snQuestions)
  const selectedTF = getQuestionsWithWeightDistribution(tfQuestions)
  const selectedJP = getQuestionsWithWeightDistribution(jpQuestions)

  // Combine all selected questions
  const selectedQuestions = [...selectedEI, ...selectedSN, ...selectedTF, ...selectedJP]

  // Shuffle the combined questions for the final quiz order
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
