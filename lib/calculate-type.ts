import type { Question } from "./questions"

type Answers = Record<number, number>

interface DimensionScore {
  score1: number // First letter (E, S, T, J)
  score2: number // Second letter (I, N, F, P)
  total: number // Total points possible
  preference: string // The resulting preference (E/I, S/N, T/F, J/P)
  strength: number // Preference strength as a percentage
  confidence: number // Confidence in the result (0-1)
}

export interface PersonalityResult {
  type: string // The four-letter type code
  dimensions: {
    EI: DimensionScore
    SN: DimensionScore
    TF: DimensionScore
    JP: DimensionScore
  }
  confidence: number // Overall confidence in the result (0-1)
}

export function calculatePersonalityType(answers: Answers, questions?: Question[]): string {
  const result = calculateDetailedPersonalityType(answers, questions)
  return result.type
}

export function calculateDetailedPersonalityType(answers: Answers, questions?: Question[]): PersonalityResult {
  // Initialize counters for each dimension
  let eScore = 0
  let iScore = 0
  let sScore = 0
  let nScore = 0
  let tScore = 0
  let fScore = 0
  let jScore = 0
  let pScore = 0

  // Track subtypes for more nuanced scoring
  const subtypeScores: Record<string, { score1: number; score2: number }> = {}

  // Track the total possible points for each dimension
  let eiTotal = 0
  let snTotal = 0
  let tfTotal = 0
  let jpTotal = 0

  // Process each answer
  Object.entries(answers).forEach(([questionIndex, answerValue]) => {
    const qIndex = Number.parseInt(questionIndex)

    // If questions array is provided, use it to determine the dimension and weight
    if (questions && questions[qIndex]) {
      const question = questions[qIndex]
      const dimension = question.dimension
      const weight = question.weight || 1 // Default to weight 1 if not specified
      const subtype = question.subtype || "general"

      // Initialize subtype scores if not already present
      if (!subtypeScores[subtype]) {
        subtypeScores[subtype] = { score1: 0, score2: 0 }
      }

      // Update scores based on the dimension, answer, and weight
      switch (dimension) {
        case "EI":
          eiTotal += weight
          if (answerValue === 0) {
            // Strong E
            eScore += weight
            subtypeScores[subtype].score1 += weight
          } else if (answerValue === 1) {
            // Moderate I
            iScore += weight * 0.7
            subtypeScores[subtype].score2 += weight * 0.7
          } else if (answerValue === 2) {
            // Moderate E
            eScore += weight * 0.7
            subtypeScores[subtype].score1 += weight * 0.7
          } else {
            // Strong I
            iScore += weight
            subtypeScores[subtype].score2 += weight
          }
          break
        case "SN":
          snTotal += weight
          if (answerValue === 0) {
            // Strong S
            sScore += weight
            subtypeScores[subtype].score1 += weight
          } else if (answerValue === 1) {
            // Strong N
            nScore += weight
            subtypeScores[subtype].score2 += weight
          } else if (answerValue === 2) {
            // Moderate N
            nScore += weight * 0.7
            subtypeScores[subtype].score2 += weight * 0.7
          } else {
            // Moderate S
            sScore += weight * 0.7
            subtypeScores[subtype].score1 += weight * 0.7
          }
          break
        case "TF":
          tfTotal += weight
          if (answerValue === 0) {
            // Strong T
            tScore += weight
            subtypeScores[subtype].score1 += weight
          } else if (answerValue === 1) {
            // Strong F
            fScore += weight
            subtypeScores[subtype].score2 += weight
          } else if (answerValue === 2) {
            // Balanced/Moderate
            tScore += weight * 0.5
            fScore += weight * 0.5
            subtypeScores[subtype].score1 += weight * 0.5
            subtypeScores[subtype].score2 += weight * 0.5
          } else {
            // Moderate T
            tScore += weight * 0.7
            subtypeScores[subtype].score1 += weight * 0.7
          }
          break
        case "JP":
          jpTotal += weight
          if (answerValue === 0) {
            // Strong J
            jScore += weight
            subtypeScores[subtype].score1 += weight
          } else if (answerValue === 1) {
            // Strong P
            pScore += weight
            subtypeScores[subtype].score2 += weight
          } else if (answerValue === 2) {
            // Moderate J with P influence
            jScore += weight * 0.6
            pScore += weight * 0.4
            subtypeScores[subtype].score1 += weight * 0.6
            subtypeScores[subtype].score2 += weight * 0.4
          } else {
            // Moderate P with J influence
            pScore += weight * 0.6
            jScore += weight * 0.4
            subtypeScores[subtype].score1 += weight * 0.4
            subtypeScores[subtype].score2 += weight * 0.6
          }
          break
      }
    } else {
      // Fallback to the original logic if questions array is not provided
      // This is for backward compatibility
      if ([0, 4, 8, 12, 16].includes(qIndex)) {
        // E/I questions
        eiTotal += 1
        if (answerValue === 0 || answerValue === 2) {
          eScore += 1
        } else {
          iScore += 1
        }
      } else if ([1, 5, 9, 13, 17].includes(qIndex)) {
        // T/F questions
        tfTotal += 1
        if (answerValue === 0 || answerValue === 3) {
          tScore += 1
        } else {
          fScore += 1
        }
      } else if ([2, 6, 10, 14, 18].includes(qIndex)) {
        // J/P questions
        jpTotal += 1
        if (answerValue === 0 || answerValue === 3) {
          jScore += 1
        } else {
          pScore += 1
        }
      } else if ([3, 7, 11, 15, 19].includes(qIndex)) {
        // S/N questions
        snTotal += 1
        if (answerValue === 0 || answerValue === 3) {
          sScore += 1
        } else {
          nScore += 1
        }
      }
    }
  })

  // Calculate the strength and confidence for each dimension
  const calculateDimensionResult = (
    score1: number,
    score2: number,
    total: number,
    letter1: string,
    letter2: string,
  ): DimensionScore => {
    // Determine the preference
    const preference = score1 >= score2 ? letter1 : letter2

    // Calculate the strength as a percentage
    const maxScore = Math.max(score1, score2)
    const strength = Math.round((maxScore / total) * 100)

    // Calculate confidence based on the difference between scores
    // The bigger the gap, the more confident we are
    const scoreDifference = Math.abs(score1 - score2)
    const relativeDifference = scoreDifference / total

    // Confidence is higher when the difference is larger
    // Using a sigmoid function to map the relative difference to a 0-1 range
    const confidence = 1 / (1 + Math.exp(-10 * (relativeDifference - 0.3)))

    return {
      score1,
      score2,
      total,
      preference,
      strength,
      confidence: Math.min(Math.max(confidence, 0), 1), // Ensure confidence is between 0 and 1
    }
  }

  // Calculate results for each dimension
  const eiResult = calculateDimensionResult(eScore, iScore, eiTotal, "E", "I")
  const snResult = calculateDimensionResult(sScore, nScore, snTotal, "S", "N")
  const tfResult = calculateDimensionResult(tScore, fScore, tfTotal, "T", "F")
  const jpResult = calculateDimensionResult(jScore, pScore, jpTotal, "J", "P")

  // Calculate overall confidence as the average of dimension confidences
  const overallConfidence = (eiResult.confidence + snResult.confidence + tfResult.confidence + jpResult.confidence) / 4

  // Determine the personality type based on the highest scores in each dimension
  const type = `${eiResult.preference}${snResult.preference}${tfResult.preference}${jpResult.preference}`

  // Store the detailed results in localStorage for potential use in results page
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "personality_strengths",
      JSON.stringify({
        eiStrength: eiResult.strength,
        snStrength: snResult.strength,
        tfStrength: tfResult.strength,
        jpStrength: jpResult.strength,
        e: eScore,
        i: iScore,
        s: sScore,
        n: nScore,
        t: tScore,
        f: fScore,
        j: jScore,
        p: pScore,
        confidence: overallConfidence,
      }),
    )
  }

  return {
    type,
    dimensions: {
      EI: eiResult,
      SN: snResult,
      TF: tfResult,
      JP: jpResult,
    },
    confidence: overallConfidence,
  }
}
