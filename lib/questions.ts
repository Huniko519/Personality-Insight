export interface Question {
  text: string
  options: string[]
  dimension: string
  weight: number // 1 = standard, 2 = important, 3 = very important
  subtype?: string // Optional subtype for more nuanced scoring
}

export const questions: Question[] = [
  // Extraversion (E) vs. Introversion (I) questions
  {
    text: "At a social event, you typically:",
    options: [
      "Interact with many, including strangers",
      "Interact with a few people you know",
      "Observe from the sidelines before engaging",
      "Prefer to have one-on-one conversations",
    ],
    dimension: "EI",
    weight: 3, // Very important question
    subtype: "social-energy",
  },
  {
    text: "After a long day, you prefer to:",
    options: [
      "Attend a social gathering to recharge",
      "Spend quiet time alone to recharge",
      "Hang out with one or two close friends",
      "It depends on the day and my mood",
    ],
    dimension: "EI",
    weight: 3, // Very important question
    subtype: "recharging",
  },
  {
    text: "When meeting new people, you:",
    options: [
      "Easily start and carry conversations",
      "Take time to warm up and observe first",
      "Are selective about who you engage with",
      "Are friendly but reserved until you know them better",
    ],
    dimension: "EI",
    weight: 2, // Important question
    subtype: "social-initiation",
  },
  {
    text: "In group settings, you typically:",
    options: [
      "Take charge and lead discussions",
      "Observe and contribute when you have something valuable to add",
      "Facilitate collaboration between group members",
      "Support the group leader and help implement ideas",
    ],
    dimension: "EI",
    weight: 2, // Important question
    subtype: "group-dynamics",
  },
  {
    text: "In a conversation, you tend to:",
    options: [
      "Speak more than listen",
      "Listen more than speak",
      "Alternate between speaking and listening equally",
      "Dominate the conversation when it's a topic you're passionate about",
    ],
    dimension: "EI",
    weight: 1, // Standard question
    subtype: "communication-style",
  },
  {
    text: "Your idea of a perfect weekend includes:",
    options: [
      "Going to parties or social events with lots of people",
      "Staying home with a book or movie",
      "Spending time with a small group of close friends",
      "A mix of social time and alone time",
    ],
    dimension: "EI",
    weight: 2, // Important question
    subtype: "leisure-preference",
  },
  {
    text: "When working on projects, you prefer to:",
    options: [
      "Collaborate with a team and discuss ideas out loud",
      "Work independently and develop ideas on your own",
      "Start alone and then get feedback from others",
      "Work with one or two people you trust",
    ],
    dimension: "EI",
    weight: 1, // Standard question
    subtype: "work-style",
  },
  {
    text: "When you have a problem, you typically:",
    options: [
      "Talk it through with several people to get different perspectives",
      "Think it through on your own before discussing it with anyone",
      "Discuss it with one trusted friend or advisor",
      "Research solutions before deciding whether to discuss it",
    ],
    dimension: "EI",
    weight: 1, // Standard question
    subtype: "problem-solving",
  },
  {
    text: "How do you feel about public speaking?",
    options: [
      "I enjoy it and feel energized by it",
      "I find it draining but can do it when necessary",
      "I prefer to avoid it whenever possible",
      "I'm comfortable with it if I'm well-prepared",
    ],
    dimension: "EI",
    weight: 2,
    subtype: "public-expression",
  },
  {
    text: "When you're in a new environment, you tend to:",
    options: [
      "Quickly adapt and engage with the surroundings and people",
      "Take time to observe and process before engaging",
      "Focus on one or two familiar aspects or people",
      "Feel uncomfortable until you've had time to adjust",
    ],
    dimension: "EI",
    weight: 2,
    subtype: "adaptation",
  },
  {
    text: "Your phone rings with an unknown number. You:",
    options: [
      "Answer it right away - it might be interesting",
      "Let it go to voicemail and check later",
      "Feel slightly anxious about who it might be",
      "Ignore it completely - if it's important, they'll leave a message",
    ],
    dimension: "EI",
    weight: 1,
    subtype: "social-openness",
  },
  {
    text: "In terms of your social circle, you prefer:",
    options: [
      "A wide network of friends and acquaintances",
      "A small group of close friends",
      "A mix of close friends and casual acquaintances",
      "Just a few very deep relationships",
    ],
    dimension: "EI",
    weight: 2,
    subtype: "relationship-breadth",
  },

  // Sensing (S) vs. Intuition (N) questions
  {
    text: "When learning something new, you prefer:",
    options: [
      "Concrete examples and practical applications",
      "Understanding the underlying theory and concepts",
      "Exploring possibilities and connections",
      "Step-by-step instructions",
    ],
    dimension: "SN",
    weight: 3, // Very important question
    subtype: "learning-style",
  },
  {
    text: "You are more interested in:",
    options: [
      "What is actual and present",
      "What is possible and future-oriented",
      "A balance of both present realities and future possibilities",
      "Concrete facts with some consideration of possibilities",
    ],
    dimension: "SN",
    weight: 3, // Very important question
    subtype: "time-orientation",
  },
  {
    text: "You are more likely to trust:",
    options: [
      "Information from direct experience or proven sources",
      "Your intuition and insights about situations",
      "A combination of facts and intuitive impressions",
      "Established methods with some room for innovation",
    ],
    dimension: "SN",
    weight: 2, // Important question
    subtype: "information-trust",
  },
  {
    text: "You are more interested in understanding:",
    options: [
      "How things work in reality",
      "The meaning and possibilities behind things",
      "Both the practical applications and underlying concepts",
      "Established systems with potential improvements",
    ],
    dimension: "SN",
    weight: 2, // Important question
    subtype: "knowledge-focus",
  },
  {
    text: "When reading, you prefer books that:",
    options: [
      "Describe real events, people, and places in detail",
      "Explore abstract ideas and theoretical concepts",
      "Blend realistic settings with imaginative elements",
      "Provide practical information you can apply",
    ],
    dimension: "SN",
    weight: 1, // Standard question
    subtype: "reading-preference",
  },
  {
    text: "When solving problems, you typically focus on:",
    options: [
      "Practical solutions based on what has worked before",
      "Novel approaches and innovative possibilities",
      "Understanding the root cause before determining a solution",
      "Adapting existing methods to fit the current situation",
    ],
    dimension: "SN",
    weight: 2, // Important question
    subtype: "problem-approach",
  },
  {
    text: "You find it easier to:",
    options: [
      "Work with concrete facts and details",
      "Recognize patterns and interpret meaning",
      "Balance attention to both details and the big picture",
      "Focus on what's practical while considering future implications",
    ],
    dimension: "SN",
    weight: 1, // Standard question
    subtype: "information-processing",
  },
  {
    text: "When planning a trip, you're more interested in:",
    options: [
      "Knowing exactly what activities you'll do and when",
      "Discovering new possibilities and experiences along the way",
      "Having a general outline with room for spontaneity",
      "Researching the history and culture of your destination",
    ],
    dimension: "SN",
    weight: 1, // Standard question
    subtype: "planning-style",
  },
  {
    text: "When describing an event to others, you tend to focus on:",
    options: [
      "The specific details and sequence of what happened",
      "The meaning or significance of what happened",
      "How the event made you and others feel",
      "How the event connects to other experiences",
    ],
    dimension: "SN",
    weight: 2,
    subtype: "communication-focus",
  },
  {
    text: "When starting a new project, you're most concerned with:",
    options: [
      "Understanding the practical steps needed to complete it",
      "Envisioning what the final result could be",
      "How the project fits into the bigger picture",
      "Making sure you have all the necessary resources",
    ],
    dimension: "SN",
    weight: 2,
    subtype: "project-approach",
  },
  {
    text: "You're more impressed by people who are:",
    options: [
      "Practical and reliable",
      "Innovative and visionary",
      "Analytical and logical",
      "Empathetic and supportive",
    ],
    dimension: "SN",
    weight: 1,
    subtype: "value-orientation",
  },
  {
    text: "When faced with a complex situation, you first try to:",
    options: [
      "Break it down into concrete, manageable parts",
      "Understand the underlying patterns or principles",
      "Consider how it affects everyone involved",
      "Look for creative solutions that haven't been tried",
    ],
    dimension: "SN",
    weight: 3,
    subtype: "complexity-approach",
  },

  // Thinking (T) vs. Feeling (F) questions
  {
    text: "When making decisions, you usually:",
    options: [
      "Rely on logic and objective analysis",
      "Consider how others will feel about it",
      "Weigh both facts and personal impact",
      "Trust your gut feeling",
    ],
    dimension: "TF",
    weight: 3, // Very important question
    subtype: "decision-basis",
  },
  {
    text: "When faced with a problem, you typically:",
    options: [
      "Analyze it logically and systematically",
      "Consider how it affects people involved",
      "Brainstorm creative solutions",
      "Rely on past experiences to solve it",
    ],
    dimension: "TF",
    weight: 2, // Important question
    subtype: "problem-focus",
  },
  {
    text: "When giving feedback, you tend to be:",
    options: [
      "Direct and straightforward",
      "Tactful and considerate",
      "Constructive but kind",
      "Detailed and specific",
    ],
    dimension: "TF",
    weight: 2, // Important question
    subtype: "communication-style",
  },
  {
    text: "When resolving conflicts, you tend to:",
    options: [
      "Focus on finding the most logical solution",
      "Prioritize maintaining harmony and relationships",
      "Balance addressing the issue while considering feelings",
      "Avoid conflicts whenever possible",
    ],
    dimension: "TF",
    weight: 3, // Very important question
    subtype: "conflict-resolution",
  },
  {
    text: "When evaluating an idea, you primarily consider:",
    options: [
      "If it makes logical sense and is efficient",
      "How it will impact people and align with values",
      "Both its practicality and its effect on people",
      "If it's innovative and solves the problem",
    ],
    dimension: "TF",
    weight: 2, // Important question
    subtype: "evaluation-criteria",
  },
  {
    text: "In a debate or discussion, you value:",
    options: [
      "Clear logical arguments and objective facts",
      "Understanding different perspectives and finding common ground",
      "Reaching a conclusion that everyone can accept",
      "Exploring all angles of the issue thoroughly",
    ],
    dimension: "TF",
    weight: 1, // Standard question
    subtype: "discussion-approach",
  },
  {
    text: "When someone comes to you with a problem, you first:",
    options: [
      "Analyze the situation and offer solutions",
      "Listen and provide emotional support",
      "Ask questions to better understand their situation",
      "Share similar experiences you've had",
    ],
    dimension: "TF",
    weight: 2, // Important question
    subtype: "support-style",
  },
  {
    text: "You believe the best decisions are based on:",
    options: [
      "Logical analysis and objective criteria",
      "Values and the impact on people involved",
      "A combination of rational analysis and personal values",
      "What has proven effective in similar situations",
    ],
    dimension: "TF",
    weight: 1, // Standard question
    subtype: "decision-philosophy",
  },
  {
    text: "When someone disagrees with you, your first reaction is to:",
    options: [
      "Defend your position with facts and logic",
      "Try to understand their perspective and feelings",
      "Look for common ground or compromise",
      "Reconsider your position to see if you missed something",
    ],
    dimension: "TF",
    weight: 2,
    subtype: "disagreement-response",
  },
  {
    text: "In a workplace setting, you value most:",
    options: [
      "Efficiency, competence, and logical processes",
      "Harmony, cooperation, and positive relationships",
      "Innovation, growth, and continuous improvement",
      "Stability, reliability, and clear expectations",
    ],
    dimension: "TF",
    weight: 2,
    subtype: "workplace-values",
  },
  {
    text: "When watching a movie, you're most likely to appreciate:",
    options: [
      "A coherent plot with logical consistency",
      "Emotional depth and character development",
      "Visual aesthetics and creative storytelling",
      "Realistic details and historical accuracy",
    ],
    dimension: "TF",
    weight: 1,
    subtype: "media-appreciation",
  },
  {
    text: "When making a difficult ethical decision, you primarily consider:",
    options: [
      "What is fair and just according to objective principles",
      "How the decision will affect the well-being of those involved",
      "What aligns with your personal values and beliefs",
      "What has worked best in similar situations in the past",
    ],
    dimension: "TF",
    weight: 3,
    subtype: "ethical-reasoning",
  },

  // Judging (J) vs. Perceiving (P) questions
  {
    text: "When planning a trip, you prefer to:",
    options: [
      "Have a detailed itinerary planned in advance",
      "Have a general idea but leave room for spontaneity",
      "Decide what to do when you get there",
      "Research thoroughly but adapt as needed",
    ],
    dimension: "JP",
    weight: 2, // Important question
    subtype: "planning-preference",
  },
  {
    text: "Your workspace is usually:",
    options: [
      "Organized and structured",
      "Creative chaos but you know where everything is",
      "Minimalist with only essential items",
      "Changes depending on what you're working on",
    ],
    dimension: "JP",
    weight: 2, // Important question
    subtype: "organization-style",
  },
  {
    text: "You prefer work environments that:",
    options: [
      "Are structured with clear expectations",
      "Allow for flexibility and creativity",
      "Balance structure and flexibility",
      "Provide autonomy to work your own way",
    ],
    dimension: "JP",
    weight: 1, // Standard question
    subtype: "work-environment",
  },
  {
    text: "Your approach to deadlines is:",
    options: [
      "Complete work well ahead of time",
      "Work in bursts of energy, often finishing just in time",
      "Create a schedule and try to stick to it",
      "Adapt your approach based on the importance of the task",
    ],
    dimension: "JP",
    weight: 3, // Very important question
    subtype: "time-management",
  },
  {
    text: "Your typical approach to a project is:",
    options: [
      "Create a plan and follow it systematically",
      "Start working and adapt as you go",
      "Outline key milestones but remain flexible on details",
      "Gather all necessary information before beginning",
    ],
    dimension: "JP",
    weight: 3, // Very important question
    subtype: "project-management",
  },
  {
    text: "You feel most comfortable when:",
    options: [
      "Things are decided and plans are set",
      "Options remain open and plans are flexible",
      "You have a backup plan for unexpected changes",
      "You've prepared for multiple possibilities",
    ],
    dimension: "JP",
    weight: 2, // Important question
    subtype: "comfort-zone",
  },
  {
    text: "When it comes to making plans with friends, you prefer:",
    options: [
      "Setting a specific time and activity in advance",
      "Keeping options open until the last minute",
      "Having a general idea but being open to changes",
      "Planning enough to ensure everyone can attend",
    ],
    dimension: "JP",
    weight: 1, // Standard question
    subtype: "social-planning",
  },
  {
    text: "Your approach to a vacation is:",
    options: [
      "Planning activities for each day to make the most of your time",
      "Deciding what to do each day as it comes",
      "Having a few must-see attractions but leaving time for exploration",
      "Researching options but deciding on the spot what feels right",
    ],
    dimension: "JP",
    weight: 1, // Standard question
    subtype: "leisure-planning",
  },
  {
    text: "How do you feel about unexpected changes to your plans?",
    options: [
      "They stress me out and I prefer to avoid them",
      "I enjoy the excitement and new possibilities they bring",
      "I can adapt but prefer some notice",
      "It depends on the nature of the change",
    ],
    dimension: "JP",
    weight: 3,
    subtype: "adaptability",
  },
  {
    text: "When starting a new task, you typically:",
    options: [
      "Create a clear plan with steps and deadlines",
      "Jump right in and figure it out as you go",
      "Gather information first, then decide how to proceed",
      "Think about different approaches before starting",
    ],
    dimension: "JP",
    weight: 2,
    subtype: "task-initiation",
  },
  {
    text: "Your email inbox is usually:",
    options: [
      "Organized with folders and regularly cleared out",
      "Somewhat chaotic with many unread messages",
      "Maintained at inbox zero or close to it",
      "Organized by priority rather than neatness",
    ],
    dimension: "JP",
    weight: 1,
    subtype: "organization-habits",
  },
  {
    text: "When making a major life decision, you prefer to:",
    options: [
      "Research thoroughly and make a firm decision",
      "Keep options open as long as possible",
      "Consider all possibilities before committing",
      "Make a tentative decision but remain open to change",
    ],
    dimension: "JP",
    weight: 3,
    subtype: "decision-commitment",
  },
]

// Function to get a subset of questions for each dimension
export function getRandomizedQuestions(questionsPerDimension = 5) {
  // Group questions by dimension
  const eiQuestions = questions.filter((q) => q.dimension === "EI")
  const snQuestions = questions.filter((q) => q.dimension === "SN")
  const tfQuestions = questions.filter((q) => q.dimension === "TF")
  const jpQuestions = questions.filter((q) => q.dimension === "JP")

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
