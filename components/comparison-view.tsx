"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { personalityTypes } from "@/lib/personality-types"
import { Check, X, AlertTriangle, MessageCircle, Heart, Users, Lightbulb } from "lucide-react"

// Calculate compatibility score between two personality types
const calculateCompatibility = (type1: string, type2: string): number => {
  if (!type1 || !type2) return 50

  // Count matching letters
  let matchCount = 0
  for (let i = 0; i < 4; i++) {
    if (type1[i] === type2[i]) matchCount++
  }

  // Base compatibility on number of matching letters
  // 0 matches: 30%, 1 match: 50%, 2 matches: 70%, 3 matches: 85%, 4 matches: 95%
  const baseScores = [30, 50, 70, 85, 95]

  // Special cases for known good/challenging combinations
  const isIdeal =
    (type1[0] !== type2[0] && type1[1] === type2[1] && type1[2] !== type2[2]) || // Opposite E/I and T/F, same N/S
    (type1 === "INFJ" && type2 === "ENFP") ||
    (type1 === "ENFP" && type2 === "INFJ") ||
    (type1 === "INTJ" && type2 === "ENTP") ||
    (type1 === "ENTP" && type2 === "INTJ")

  const isChallenging =
    (type1[0] === type2[0] && type1[1] !== type2[1] && type1[2] === type2[2]) || // Same E/I and T/F, different N/S
    (type1 === "ESTJ" && type2 === "INFP") ||
    (type1 === "INFP" && type2 === "ESTJ")

  let score = baseScores[matchCount]
  if (isIdeal) score = Math.min(score + 15, 98)
  if (isChallenging) score = Math.max(score - 15, 25)

  return score
}

// Get relationship dynamic description
const getRelationshipDynamic = (type1: string, type2: string): string => {
  if (!type1 || !type2) return "Select two personality types to see their relationship dynamic."

  // Count matching letters
  let matchCount = 0
  for (let i = 0; i < 4; i++) {
    if (type1[i] === type2[i]) matchCount++
  }

  // Determine relationship dynamic based on letter combinations
  if (matchCount === 4)
    return "Mirror - You share the same perspective on the world, which creates strong understanding but may lack growth from differences."

  if (matchCount === 3)
    return "Similar - You have a lot in common, making communication easy, but may need to appreciate your one key difference."

  if (matchCount === 0)
    return "Opposite - You see the world very differently, which can create both fascination and frustration."

  if (type1[0] !== type2[0] && type1[1] === type2[1] && type1[2] !== type2[2])
    return "Complementary - Your differences in extraversion/introversion and thinking/feeling create a balanced dynamic."

  if (type1[0] === type2[0] && type1[1] !== type2[1] && type1[2] === type2[2])
    return "Challenging - You share some core traits but differ in how you perceive the world, which can lead to misunderstandings."

  return "Mixed - Your relationship has both areas of natural understanding and potential challenges."
}

// Get communication tips based on types
const getCommunicationTips = (type1: string, type2: string): string[] => {
  if (!type1 || !type2) return []

  const tips: string[] = []

  // E/I difference
  if (type1[0] !== type2[0]) {
    tips.push(
      `The ${type1[0] === "E" ? type1 : type2} type should give the ${type1[0] === "I" ? type1 : type2} type space for reflection.`,
    )
    tips.push(
      `The ${type1[0] === "I" ? type1 : type2} type should make an effort to engage in social activities with the ${type1[0] === "E" ? type1 : type2} type.`,
    )
  }

  // S/N difference
  if (type1[1] !== type2[1]) {
    tips.push(
      `The ${type1[1] === "S" ? type1 : type2} type should be patient with the ${type1[1] === "N" ? type1 : type2} type's abstract ideas.`,
    )
    tips.push(
      `The ${type1[1] === "N" ? type1 : type2} type should provide concrete examples to the ${type1[1] === "S" ? type1 : type2} type.`,
    )
  }

  // T/F difference
  if (type1[2] !== type2[2]) {
    tips.push(`The ${type1[2] === "T" ? type1 : type2} type should acknowledge emotions, not just logic.`)
    tips.push(`The ${type1[2] === "F" ? type1 : type2} type should present reasoning behind emotional responses.`)
  }

  // J/P difference
  if (type1[3] !== type2[3]) {
    tips.push(`The ${type1[3] === "J" ? type1 : type2} type should be flexible with plans sometimes.`)
    tips.push(`The ${type1[3] === "P" ? type1 : type2} type should respect deadlines and schedules.`)
  }

  return tips
}

// Find common traits between two types
const findCommonTraits = (type1: string, type2: string): string[] => {
  if (!type1 || !type2 || !personalityTypes[type1] || !personalityTypes[type2]) return []

  const traits1 = personalityTypes[type1].traits
  const traits2 = personalityTypes[type2].traits

  return traits1.filter((trait) => traits2.includes(trait))
}

// Find unique traits for each type
const findUniqueTraits = (type1: string, type2: string): { type1: string[]; type2: string[] } => {
  if (!type1 || !type2 || !personalityTypes[type1] || !personalityTypes[type2]) return { type1: [], type2: [] }

  const traits1 = personalityTypes[type1].traits
  const traits2 = personalityTypes[type2].traits

  return {
    type1: traits1.filter((trait) => !traits2.includes(trait)),
    type2: traits2.filter((trait) => !traits1.includes(trait)),
  }
}

export default function ComparisonView() {
  const [type1, setType1] = useState<string>("")
  const [type2, setType2] = useState<string>("")

  const compatibility = calculateCompatibility(type1, type2)
  const relationshipDynamic = getRelationshipDynamic(type1, type2)
  const communicationTips = getCommunicationTips(type1, type2)
  const commonTraits = findCommonTraits(type1, type2)
  const uniqueTraits = findUniqueTraits(type1, type2)

  // Get compatibility color based on score
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-2">First Personality Type</label>
          <Select value={type1} onValueChange={setType1}>
            <SelectTrigger className="border-rose-200">
              <SelectValue placeholder="Select first type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(personalityTypes).map((type) => (
                <SelectItem key={type} value={type}>
                  {type} - {personalityTypes[type].nickname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {type1 && (
            <Card className="mt-4 border-rose-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-rose-800">{type1}</h3>
                  <Badge className="bg-rose-100 text-rose-800">{personalityTypes[type1].nickname}</Badge>
                </div>
                <p className="text-sm text-rose-700 mb-3">{personalityTypes[type1].shortDescription}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-rose-700 mb-2">Second Personality Type</label>
          <Select value={type2} onValueChange={setType2}>
            <SelectTrigger className="border-rose-200">
              <SelectValue placeholder="Select second type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(personalityTypes).map((type) => (
                <SelectItem key={type} value={type}>
                  {type} - {personalityTypes[type].nickname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {type2 && (
            <Card className="mt-4 border-rose-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-rose-800">{type2}</h3>
                  <Badge className="bg-rose-100 text-rose-800">{personalityTypes[type2].nickname}</Badge>
                </div>
                <p className="text-sm text-rose-700 mb-3">{personalityTypes[type2].shortDescription}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {type1 && type2 ? (
        <div className="space-y-6">
          <Card className="border-rose-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-rose-800 mb-2">Compatibility Score</h3>
                <div className="relative w-full max-w-md mx-auto h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute h-full ${getCompatibilityColor(compatibility)} transition-all duration-500`}
                    style={{ width: `${compatibility}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-2xl font-bold text-rose-700">{compatibility}%</div>
                <p className="text-rose-600 mt-1">{relationshipDynamic}</p>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 w-full mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="traits">Traits</TabsTrigger>
                  <TabsTrigger value="communication">Communication</TabsTrigger>
                  <TabsTrigger value="growth">Growth</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-rose-700 flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Strengths of this Pairing
                      </h4>
                      <ul className="space-y-2">
                        {type1[0] !== type2[0] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Balance between{" "}
                              {type1[0] === "E" ? `${type1}'s social energy` : `${type2}'s social energy`} and{" "}
                              {type1[0] === "I" ? `${type1}'s reflective nature` : `${type2}'s reflective nature`}
                            </span>
                          </li>
                        )}
                        {type1[1] === type2[1] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Shared{" "}
                              {type1[1] === "S"
                                ? "practical approach to details"
                                : "appreciation for possibilities and concepts"}
                            </span>
                          </li>
                        )}
                        {type1[2] === type2[2] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Similar{" "}
                              {type1[2] === "T"
                                ? "logical decision-making process"
                                : "value-based approach to decisions"}
                            </span>
                          </li>
                        )}
                        {type1[3] === type2[3] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>
                              Compatible{" "}
                              {type1[3] === "J" ? "structured approach to life" : "flexible and adaptable lifestyle"}
                            </span>
                          </li>
                        )}
                        {commonTraits.length > 0 && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Shared traits: {commonTraits.slice(0, 3).join(", ")}</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-rose-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        Potential Challenges
                      </h4>
                      <ul className="space-y-2">
                        {type1[0] === type2[0] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>
                              Both{" "}
                              {type1[0] === "E"
                                ? "extraverted, may compete for attention"
                                : "introverted, may lack social initiative"}
                            </span>
                          </li>
                        )}
                        {type1[1] !== type2[1] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>
                              Different information processing:{" "}
                              {type1[1] === "S" ? `${type1} focuses on details` : `${type2} focuses on details`} while{" "}
                              {type1[1] === "N" ? `${type1} sees the big picture` : `${type2} sees the big picture`}
                            </span>
                          </li>
                        )}
                        {type1[2] !== type2[2] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>
                              Decision-making differences:{" "}
                              {type1[2] === "T" ? `${type1} prioritizes logic` : `${type2} prioritizes logic`} while{" "}
                              {type1[2] === "F" ? `${type1} considers feelings` : `${type2} considers feelings`}
                            </span>
                          </li>
                        )}
                        {type1[3] !== type2[3] && (
                          <li className="text-gray-700 flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            <span>
                              Lifestyle clash:{" "}
                              {type1[3] === "J" ? `${type1} prefers structure` : `${type2} prefers structure`} while{" "}
                              {type1[3] === "P" ? `${type1} prefers flexibility` : `${type2} prefers flexibility`}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="traits">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-rose-700 text-center">{type1} Unique Traits</h4>
                      <ul className="space-y-1">
                        {uniqueTraits.type1.map((trait, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-rose-700 text-center">Shared Traits</h4>
                      <ul className="space-y-1">
                        {commonTraits.length > 0 ? (
                          commonTraits.map((trait, index) => (
                            <li key={index} className="text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <span>{trait}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-700 text-center italic">No common traits found</li>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-rose-700 text-center">{type2} Unique Traits</h4>
                      <ul className="space-y-1">
                        {uniqueTraits.type2.map((trait, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-rose-50 rounded-lg">
                    <h4 className="font-medium text-rose-700 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      How You Complement Each Other
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {type1[0] !== type2[0] &&
                        `${type1[0] === "E" ? type1 : type2} brings social energy and outward focus, while ${type1[0] === "I" ? type1 : type2} contributes depth and reflection. `}
                      {type1[1] !== type2[1] &&
                        `${type1[1] === "S" ? type1 : type2} provides practical attention to detail, while ${type1[1] === "N" ? type1 : type2} offers innovative big-picture thinking. `}
                      {type1[2] !== type2[2] &&
                        `${type1[2] === "T" ? type1 : type2} brings logical analysis to decisions, while ${type1[2] === "F" ? type1 : type2} ensures values and people are considered. `}
                      {type1[3] !== type2[3] &&
                        `${type1[3] === "J" ? type1 : type2} contributes structure and organization, while ${type1[3] === "P" ? type1 : type2} adds adaptability and spontaneity.`}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="communication">
                  <div className="space-y-6">
                    <div className="p-4 bg-rose-50 rounded-lg">
                      <h4 className="font-medium text-rose-700 mb-3 flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Communication Style Comparison
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{type1[0] === "E" ? "Expressive" : "Reserved"}</span>
                            <span>{type2[0] === "E" ? "Expressive" : "Reserved"}</span>
                          </div>
                          <div className="relative h-2 bg-gray-200 rounded-full">
                            <div
                              className="absolute left-0 h-2 bg-rose-400 rounded-full"
                              style={{ width: "50%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-rose-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type1[0] === "E" ? "75%" : "25%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-blue-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type2[0] === "E" ? "75%" : "25%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Concrete</span>
                            <span>Abstract</span>
                          </div>
                          <div className="relative h-2 bg-gray-200 rounded-full">
                            <div
                              className="absolute left-0 h-2 bg-rose-400 rounded-full"
                              style={{ width: "50%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-rose-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type1[1] === "S" ? "25%" : "75%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-blue-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type2[1] === "S" ? "25%" : "75%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Logical</span>
                            <span>Empathetic</span>
                          </div>
                          <div className="relative h-2 bg-gray-200 rounded-full">
                            <div
                              className="absolute left-0 h-2 bg-rose-400 rounded-full"
                              style={{ width: "50%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-rose-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type1[2] === "T" ? "25%" : "75%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-blue-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type2[2] === "T" ? "25%" : "75%" }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Structured</span>
                            <span>Flexible</span>
                          </div>
                          <div className="relative h-2 bg-gray-200 rounded-full">
                            <div
                              className="absolute left-0 h-2 bg-rose-400 rounded-full"
                              style={{ width: "50%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-rose-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type1[3] === "J" ? "25%" : "75%" }}
                            ></div>
                            <div
                              className="absolute h-4 w-1 bg-blue-600 top-1/2 transform -translate-y-1/2"
                              style={{ left: type2[3] === "J" ? "25%" : "75%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-rose-700 mb-3">Communication Tips</h4>
                      <ul className="space-y-2">
                        {communicationTips.map((tip, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-rose-50 rounded-lg">
                        <h4 className="font-medium text-rose-700 mb-2 flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          What Works Well
                        </h4>
                        <ul className="space-y-1">
                          {type1[0] !== type2[0] && (
                            <li className="text-gray-700 text-sm">
                              Balancing social interaction with quiet reflection
                            </li>
                          )}
                          {type1[1] === type2[1] && (
                            <li className="text-gray-700 text-sm">Shared approach to information gathering</li>
                          )}
                          {type1[2] === type2[2] && (
                            <li className="text-gray-700 text-sm">Similar decision-making processes</li>
                          )}
                          {type1[3] === type2[3] && (
                            <li className="text-gray-700 text-sm">Compatible lifestyle preferences</li>
                          )}
                        </ul>
                      </div>

                      <div className="p-4 bg-rose-50 rounded-lg">
                        <h4 className="font-medium text-rose-700 mb-2 flex items-center">
                          <X className="h-4 w-4 mr-2 text-red-500" />
                          What to Watch Out For
                        </h4>
                        <ul className="space-y-1">
                          {type1[0] === type2[0] && (
                            <li className="text-gray-700 text-sm">
                              Both may {type1[0] === "E" ? "talk over each other" : "avoid initiating conversations"}
                            </li>
                          )}
                          {type1[1] !== type2[1] && (
                            <li className="text-gray-700 text-sm">
                              Misunderstandings due to different information focus
                            </li>
                          )}
                          {type1[2] !== type2[2] && (
                            <li className="text-gray-700 text-sm">Conflicts in decision-making approach</li>
                          )}
                          {type1[3] !== type2[3] && (
                            <li className="text-gray-700 text-sm">Tension between planning and spontaneity</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="growth">
                  <div className="space-y-6">
                    <div className="p-4 bg-rose-50 rounded-lg">
                      <h4 className="font-medium text-rose-700 mb-3 flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Relationship Growth Potential
                      </h4>
                      <p className="text-gray-700 mb-4">
                        This relationship offers opportunities for personal growth through your differences and
                        similarities.
                        {type1[0] !== type2[0] &&
                          ` The contrast between ${type1[0] === "E" ? type1 : type2}'s extraversion and ${type1[0] === "I" ? type1 : type2}'s introversion creates balance.`}
                        {type1[1] !== type2[1] &&
                          ` ${type1[1] === "S" ? type1 : type2} can help ground ${type1[1] === "N" ? type1 : type2}'s ideas, while ${type1[1] === "N" ? type1 : type2} can inspire ${type1[1] === "S" ? type1 : type2} to see new possibilities.`}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-rose-700 mb-2">
                            What {type1} can learn from {type2}
                          </h5>
                          <ul className="space-y-1">
                            {type1[0] !== type2[0] && (
                              <li className="text-gray-700 text-sm">
                                {type1[0] === "E"
                                  ? "Deeper reflection and listening"
                                  : "More comfort with social engagement"}
                              </li>
                            )}
                            {type1[1] !== type2[1] && (
                              <li className="text-gray-700 text-sm">
                                {type1[1] === "S"
                                  ? "Considering future possibilities"
                                  : "Attention to practical details"}
                              </li>
                            )}
                            {type1[2] !== type2[2] && (
                              <li className="text-gray-700 text-sm">
                                {type1[2] === "T" ? "Considering emotional impact" : "More objective analysis"}
                              </li>
                            )}
                            {type1[3] !== type2[3] && (
                              <li className="text-gray-700 text-sm">
                                {type1[3] === "J" ? "Greater flexibility" : "Better organization"}
                              </li>
                            )}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-rose-700 mb-2">
                            What {type2} can learn from {type1}
                          </h5>
                          <ul className="space-y-1">
                            {type1[0] !== type2[0] && (
                              <li className="text-gray-700 text-sm">
                                {type2[0] === "E"
                                  ? "Deeper reflection and listening"
                                  : "More comfort with social engagement"}
                              </li>
                            )}
                            {type1[1] !== type2[1] && (
                              <li className="text-gray-700 text-sm">
                                {type2[1] === "S"
                                  ? "Considering future possibilities"
                                  : "Attention to practical details"}
                              </li>
                            )}
                            {type1[2] !== type2[2] && (
                              <li className="text-gray-700 text-sm">
                                {type2[2] === "T" ? "Considering emotional impact" : "More objective analysis"}
                              </li>
                            )}
                            {type1[3] !== type2[3] && (
                              <li className="text-gray-700 text-sm">
                                {type2[3] === "J" ? "Greater flexibility" : "Better organization"}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-rose-700 mb-3 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Growth Exercises
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-white border border-rose-200 rounded-lg">
                          <h5 className="text-sm font-medium text-rose-700 mb-2">Active Listening</h5>
                          <p className="text-gray-700 text-sm">
                            Practice taking turns speaking for 2 minutes without interruption, then summarizing what the
                            other person said before responding.
                          </p>
                        </div>

                        <div className="p-3 bg-white border border-rose-200 rounded-lg">
                          <h5 className="text-sm font-medium text-rose-700 mb-2">Decision Making</h5>
                          <p className="text-gray-700 text-sm">
                            For important decisions, create a shared process that honors both logical analysis and value
                            considerations.
                          </p>
                        </div>

                        <div className="p-3 bg-white border border-rose-200 rounded-lg">
                          <h5 className="text-sm font-medium text-rose-700 mb-2">Appreciation Practice</h5>
                          <p className="text-gray-700 text-sm">
                            Regularly share what you appreciate about the other person's different perspective or
                            approach.
                          </p>
                        </div>

                        <div className="p-3 bg-white border border-rose-200 rounded-lg">
                          <h5 className="text-sm font-medium text-rose-700 mb-2">Role Switching</h5>
                          <p className="text-gray-700 text-sm">
                            Try approaching a situation from the other person's typical perspective to build empathy and
                            understanding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-rose-200">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100">
                <Users className="h-8 w-8 text-rose-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-rose-800 mb-2">Select Two Personality Types</h3>
            <p className="text-rose-600 max-w-md mx-auto">
              Choose two personality types from the dropdowns above to see their compatibility, relationship dynamics,
              and communication tips.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
