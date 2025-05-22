export interface EnneagramQuestion {
  id: number
  text: string
  typeCorrelations: {
    [key: string]: number // Maps type number (as string) to correlation strength
  }
}

export const enneagramQuestions: EnneagramQuestion[] = [
  {
    id: 1,
    text: "I tend to be organized and focused on doing things the right way.",
    typeCorrelations: { "1": 3, "3": 1, "5": 1 },
  },
  {
    id: 2,
    text: "I often put others' needs before my own and enjoy helping people.",
    typeCorrelations: { "2": 3, "9": 1, "6": 1 },
  },
  {
    id: 3,
    text: "I am driven to achieve success and recognition for my accomplishments.",
    typeCorrelations: { "3": 3, "1": 1, "8": 1 },
  },
  {
    id: 4,
    text: "I value authenticity and often feel different from others.",
    typeCorrelations: { "4": 3, "5": 1, "9": 1 },
  },
  {
    id: 5,
    text: "I prefer to observe and analyze before engaging with others or situations.",
    typeCorrelations: { "5": 3, "9": 1, "4": 1 },
  },
  {
    id: 6,
    text: "I tend to be cautious and often anticipate potential problems.",
    typeCorrelations: { "6": 3, "1": 1, "5": 1 },
  },
  {
    id: 7,
    text: "I seek new experiences and try to avoid negative emotions.",
    typeCorrelations: { "7": 3, "3": 1, "9": 1 },
  },
  {
    id: 8,
    text: "I am assertive and prefer to be in control of situations.",
    typeCorrelations: { "8": 3, "3": 1, "1": 1 },
  },
  {
    id: 9,
    text: "I value harmony and often avoid conflict.",
    typeCorrelations: { "9": 3, "2": 1, "6": 1 },
  },
  {
    id: 10,
    text: "I have high standards for myself and others.",
    typeCorrelations: { "1": 3, "3": 1, "8": 1 },
  },
  {
    id: 11,
    text: "I am sensitive to others' feelings and needs.",
    typeCorrelations: { "2": 3, "4": 1, "9": 1 },
  },
  {
    id: 12,
    text: "I adapt my behavior to make a good impression on others.",
    typeCorrelations: { "3": 3, "2": 1, "6": 1 },
  },
  {
    id: 13,
    text: "I often feel that something important is missing in my life.",
    typeCorrelations: { "4": 3, "7": 1, "1": 1 },
  },
  {
    id: 14,
    text: "I need time alone to recharge and process information.",
    typeCorrelations: { "5": 3, "4": 1, "9": 1 },
  },
  {
    id: 15,
    text: "I value loyalty and often seek guidance from trusted sources.",
    typeCorrelations: { "6": 3, "2": 1, "1": 1 },
  },
  {
    id: 16,
    text: "I prefer to keep my options open and dislike feeling trapped.",
    typeCorrelations: { "7": 3, "9": 1, "5": 1 },
  },
  {
    id: 17,
    text: "I stand up for myself and others when I perceive injustice.",
    typeCorrelations: { "8": 3, "1": 1, "6": 1 },
  },
  {
    id: 18,
    text: "I tend to go with the flow and avoid making waves.",
    typeCorrelations: { "9": 3, "7": 1, "2": 1 },
  },
  {
    id: 19,
    text: "I notice when things are out of place or done incorrectly.",
    typeCorrelations: { "1": 3, "5": 1, "6": 1 },
  },
  {
    id: 20,
    text: "I feel fulfilled when I'm able to help others.",
    typeCorrelations: { "2": 3, "9": 1, "1": 1 },
  },
  {
    id: 21,
    text: "I am motivated by goals and accomplishing tasks efficiently.",
    typeCorrelations: { "3": 3, "1": 1, "8": 1 },
  },
  {
    id: 22,
    text: "I am drawn to what is unique, deep, or meaningful.",
    typeCorrelations: { "4": 3, "5": 1, "1": 1 },
  },
  {
    id: 23,
    text: "I value knowledge and competence.",
    typeCorrelations: { "5": 3, "1": 1, "3": 1 },
  },
  {
    id: 24,
    text: "I tend to question authority and test others' trustworthiness.",
    typeCorrelations: { "6": 3, "8": 1, "5": 1 },
  },
  {
    id: 25,
    text: "I seek out fun and exciting experiences.",
    typeCorrelations: { "7": 3, "3": 1, "8": 1 },
  },
  {
    id: 26,
    text: "I am protective of those close to me.",
    typeCorrelations: { "8": 3, "2": 1, "6": 1 },
  },
  {
    id: 27,
    text: "I try to maintain peace and avoid disruption.",
    typeCorrelations: { "9": 3, "2": 1, "6": 1 },
  },
  {
    id: 28,
    text: "I feel a strong sense of responsibility and duty.",
    typeCorrelations: { "1": 3, "6": 2, "2": 1 },
  },
  {
    id: 29,
    text: "I am attuned to others' emotional needs.",
    typeCorrelations: { "2": 3, "4": 1, "9": 1 },
  },
  {
    id: 30,
    text: "I am concerned with how others perceive me.",
    typeCorrelations: { "3": 3, "2": 1, "6": 1 },
  },
  {
    id: 31,
    text: "I often feel misunderstood or different from others.",
    typeCorrelations: { "4": 3, "5": 1, "9": 1 },
  },
  {
    id: 32,
    text: "I prefer to observe and gather information before acting.",
    typeCorrelations: { "5": 3, "9": 1, "6": 1 },
  },
  {
    id: 33,
    text: "I am vigilant about potential threats or problems.",
    typeCorrelations: { "6": 3, "1": 1, "5": 1 },
  },
  {
    id: 34,
    text: "I avoid painful feelings by focusing on positive possibilities.",
    typeCorrelations: { "7": 3, "9": 1, "3": 1 },
  },
  {
    id: 35,
    text: "I am direct and assertive in my communication.",
    typeCorrelations: { "8": 3, "3": 1, "1": 1 },
  },
  {
    id: 36,
    text: "I tend to merge with others' agendas rather than assert my own.",
    typeCorrelations: { "9": 3, "2": 1, "6": 1 },
  },
]

// Function to calculate Enneagram type based on answers
export function calculateEnneagramType(answers: { [key: number]: number }): {
  primaryType: string
  score: number
  allScores: { type: string; score: number }[]
} {
  // Initialize scores for each type
  const scores: { [key: string]: number } = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  }

  // Calculate scores based on answers and type correlations
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = enneagramQuestions.find((q) => q.id === Number.parseInt(questionId))
    if (question) {
      Object.entries(question.typeCorrelations).forEach(([type, correlation]) => {
        scores[type] += answerValue * correlation
      })
    }
  })

  // Find the highest scoring type
  let highestScore = 0
  let primaryType = "1" // Default

  Object.entries(scores).forEach(([type, score]) => {
    if (score > highestScore) {
      highestScore = score
      primaryType = type
    }
  })

  // Create sorted array of all scores
  const allScores = Object.entries(scores)
    .map(([type, score]) => ({
      type,
      score,
    }))
    .sort((a, b) => b.score - a.score)

  return {
    primaryType,
    score: highestScore,
    allScores,
  }
}
