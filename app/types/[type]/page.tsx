import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPersonalityTypeByCode } from "@/lib/firebase"

interface PersonalityType {
  code: string
  name: string
  nickname: string
  shortDescription: string
  description: string
  portraitDescription?: string
  poeticDescription?: string
  detailedDescription?: string
  stressResponse?: string
  naturalAbilities?: string
  careerTraits?: string[]
  careerEnvironment?: string
  traits: string[]
  values: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  careerStrengths?: string[]
  careerChallenges?: string[]
  famousPeople: string[]
  compatibility: {
    best: string[]
    good: string[]
  }
  relationships: {
    communication: string
    asFriends: string
    asPartners: string
    loveQuote?: string
    parentQuote?: string
  }
  relationshipStrengths?: string[]
  relationshipWeaknesses?: string[]
  asParents?: string
  personalGrowth?: {
    meaningOfSuccess: string
    strengths: string[]
    problemAreas: string[]
    solutions: string[]
    rulesForSuccess: string[]
  }
  cognitiveFunctions: {
    name: string
    description: string
  }[]
}

export async function generateStaticParams() {
  return [
    { type: "intj" },
    { type: "intp" },
    { type: "entj" },
    { type: "entp" },
    { type: "infj" },
    { type: "infp" },
    { type: "enfj" },
    { type: "enfp" },
    { type: "istj" },
    { type: "isfj" },
    { type: "estj" },
    { type: "esfj" },
    { type: "istp" },
    { type: "isfp" },
    { type: "estp" },
    { type: "esfp" },
  ]
}

async function getPersonalityType(type: string): Promise<PersonalityType | null> {
  try {
    // Get all personality types from the database
    const typeCode = type.toUpperCase()
    const personalityType = await getPersonalityTypeByCode(typeCode)

    if (!personalityType) {
      console.error(`Personality type ${typeCode} not found`)
      return null
    }

    return personalityType
  } catch (error) {
    console.error(`Error fetching personality type ${type}:`, error)
    return null
  }
}

export default async function TypePage({ params }: { params: { type: string } }) {
  const typeCode = params.type.toUpperCase()
  const personalityType = await getPersonalityType(params.type)

  if (!personalityType) {
    notFound()
  }

  // Default quotes if not provided in the data
  const defaultLoveQuote =
    "To love means to open ourselves to the negative as well as the positive - to grief, sorrow, and disappointment as well as to joy, fulfillment, and an intensity of consciousness we did not know was possible before."
  const defaultParentQuote =
    "You are the bows from which your children as living arrows are sent forth... Let your bending in the archer's hand be for gladness; For even as He loves the arrow that flies, so He loves also the bow that is stable."

  // Extract personality traits from type code
  const isIntroverted = typeCode.charAt(0) === "I"
  const isIntuitive = typeCode.charAt(1) === "N"
  const isThinking = typeCode.charAt(2) === "T"
  const isJudging = typeCode.charAt(3) === "J"

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/types">
              <Button variant="ghost" className="mb-4 text-rose-700 hover:text-rose-800 hover:bg-rose-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left mr-2"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to All Types
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-rose-800 mb-2">{typeCode}</h1>
            <h2 className="text-2xl font-semibold text-rose-700">{personalityType.name}</h2>
            <p className="text-rose-600 mt-2">{personalityType.nickname}</p>
          </div>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid grid-cols-8 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portrait">Portrait</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="weaknesses">Challenges</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">{personalityType.name}</h3>
              <p className="mb-4 text-rose-700">{personalityType.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-rose-50 p-4 rounded-md">
                  <h4 className="font-semibold text-rose-800 mb-2">Core Traits</h4>
                  <ul className="list-disc list-inside text-rose-700 space-y-1">
                    {personalityType.traits.map((trait, index) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-md">
                  <h4 className="font-semibold text-rose-800 mb-2">Values</h4>
                  <ul className="list-disc list-inside text-rose-700 space-y-1">
                    {personalityType.values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="portrait" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
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
            </TabsContent>

            <TabsContent value="strengths" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Strengths</h3>
              <ul className="space-y-4">
                {personalityType.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-rose-700">{strength}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="weaknesses" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Challenges</h3>
              <ul className="space-y-4">
                {personalityType.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-alert-circle"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-rose-700">{weakness}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="careers" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Career Path</h3>

              {personalityType.careerTraits && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 mb-3">Career-Related Traits</h4>
                  <ul className="space-y-2">
                    {personalityType.careerTraits.map((trait, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-rose-700">{trait}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {personalityType.careerEnvironment && (
                <div className="mb-6 bg-rose-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-rose-800 mb-2">Ideal Work Environment</h4>
                  <p className="text-rose-700">{personalityType.careerEnvironment}</p>
                </div>
              )}

              {personalityType.careerStrengths && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 mb-3">Career Strengths</h4>
                  <ul className="space-y-2">
                    {personalityType.careerStrengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-rose-700">{strength}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {personalityType.careerChallenges && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 mb-3">Career Challenges</h4>
                  <ul className="space-y-2">
                    {personalityType.careerChallenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-alert-triangle"
                          >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-rose-700">{challenge}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <h4 className="font-semibold text-rose-800 mb-3">Recommended Careers</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalityType.careers.map((career, index) => (
                  <div key={index} className="bg-rose-50 p-3 rounded-md">
                    <p className="text-rose-700">{career}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="relationships" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Relationships</h3>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">As Lovers and Partners</h4>
                  <div className="bg-rose-50 p-4 rounded-lg mb-4 italic text-rose-700 border-l-4 border-rose-300">
                    <p>{personalityType.relationships.loveQuote || defaultLoveQuote}</p>
                  </div>
                  <p className="text-rose-700 mb-3 whitespace-pre-line">{personalityType.relationships.asPartners}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">Compatibility</h4>
                  <p className="text-rose-700 mb-3">
                    Although two well-developed individuals of any type can enjoy a healthy relationship, the {typeCode}
                    's natural partners are those who complement their preferences and cognitive functions.
                  </p>
                  <h5 className="font-medium text-rose-800 mb-2">Best Matches</h5>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {personalityType.compatibility.best.map((type, index) => (
                      <Link href={`/types/${type.toLowerCase()}`} key={index}>
                        <div className="bg-rose-100 px-3 py-1 rounded-full text-rose-700 hover:bg-rose-200 transition-colors">
                          {type}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <h5 className="font-medium text-rose-800 mb-2 mt-3">Good Matches</h5>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {personalityType.compatibility.good.map((type, index) => (
                      <Link href={`/types/${type.toLowerCase()}`} key={index}>
                        <div className="bg-rose-100 px-3 py-1 rounded-full text-rose-700 hover:bg-rose-200 transition-colors">
                          {type}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {personalityType.asParents && (
                  <div>
                    <h4 className="font-semibold text-rose-800 mb-2">As Parents</h4>
                    <div className="bg-rose-50 p-4 rounded-lg mb-4 italic text-rose-700 border-l-4 border-rose-300">
                      <p>{personalityType.relationships.parentQuote || defaultParentQuote}</p>
                    </div>
                    <p className="text-rose-700 whitespace-pre-line">{personalityType.asParents}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">As Friends</h4>
                  <p className="text-rose-700 whitespace-pre-line">{personalityType.relationships.asFriends}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">Communication Style</h4>
                  <p className="text-rose-700 whitespace-pre-line">{personalityType.relationships.communication}</p>
                </div>

                {personalityType.relationshipStrengths && (
                  <div>
                    <h4 className="font-semibold text-rose-800 mb-2">Relationship Strengths</h4>
                    <ul className="space-y-2">
                      {personalityType.relationshipStrengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-rose-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-check"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <p className="text-rose-700">{strength}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {personalityType.relationshipWeaknesses && (
                  <div>
                    <h4 className="font-semibold text-rose-800 mb-2">Relationship Challenges</h4>
                    <ul className="space-y-2">
                      {personalityType.relationshipWeaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-rose-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-alert-triangle"
                            >
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                              <line x1="12" y1="9" x2="12" y2="13" />
                              <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                          </div>
                          <p className="text-rose-700">{weakness}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="growth" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Personal Growth</h3>

              {personalityType.personalGrowth ? (
                <div className="space-y-6">
                  {personalityType.personalGrowth.meaningOfSuccess && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-rose-800 mb-2">What Success Means to {typeCode}</h4>
                      <p className="text-rose-700 mb-4 whitespace-pre-line">
                        {personalityType.personalGrowth.meaningOfSuccess}
                      </p>
                    </div>
                  )}

                  {personalityType.personalGrowth.strengths && personalityType.personalGrowth.strengths.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-rose-800 mb-3">Growth Strengths</h4>
                      <ul className="space-y-2">
                        {personalityType.personalGrowth.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-3 mt-1 text-rose-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-rose-700">{strength}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {personalityType.personalGrowth.problemAreas &&
                    personalityType.personalGrowth.problemAreas.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-3">Potential Problem Areas</h4>
                        <ul className="space-y-2">
                          {personalityType.personalGrowth.problemAreas.map((problem, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-alert-triangle"
                                >
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-rose-700">{problem}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {personalityType.personalGrowth.solutions && personalityType.personalGrowth.solutions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-rose-800 mb-3">Growth Opportunities</h4>
                      <ul className="space-y-2">
                        {personalityType.personalGrowth.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-3 mt-1 text-rose-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-lightbulb"
                              >
                                <line x1="9" y1="18" x2="15" y2="18" />
                                <line x1="10" y1="22" x2="14" y2="22" />
                                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-rose-700">{solution}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {personalityType.personalGrowth.rulesForSuccess &&
                    personalityType.personalGrowth.rulesForSuccess.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 mb-3">Rules for Success</h4>
                        <ul className="space-y-2">
                          {personalityType.personalGrowth.rulesForSuccess.map((rule, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-rose-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-star"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-rose-700">{rule}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <div className="bg-rose-50 p-5 rounded-lg mb-6">
                  <p className="text-rose-700">
                    Growth information for {typeCode}s is currently being developed. Check back soon for personalized
                    growth strategies and development paths tailored to the {typeCode} personality type.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-rose-800 mb-2">General Growth Tips for {typeCode}s:</h4>
                    <ul className="space-y-2 mt-3">
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-lightbulb"
                          >
                            <line x1="9" y1="18" x2="15" y2="18" />
                            <line x1="10" y1="22" x2="14" y2="22" />
                            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                          </svg>
                        </div>
                        <p className="text-rose-700">
                          Recognize and leverage your natural strengths while being mindful of potential blind spots.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-lightbulb"
                          >
                            <line x1="9" y1="18" x2="15" y2="18" />
                            <line x1="10" y1="22" x2="14" y2="22" />
                            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                          </svg>
                        </div>
                        <p className="text-rose-700">
                          Seek balance by developing your less dominant cognitive functions.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-lightbulb"
                          >
                            <line x1="9" y1="18" x2="15" y2="18" />
                            <line x1="10" y1="22" x2="14" y2="22" />
                            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8A6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                          </svg>
                        </div>
                        <p className="text-rose-700">
                          Practice self-awareness and reflection to better understand your patterns and triggers.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="functions" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Cognitive Functions</h3>
              <div className="space-y-5">
                {personalityType.cognitiveFunctions.map((func, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${index < 2 ? "bg-rose-100 text-rose-700" : "bg-rose-50 text-rose-600"}`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-rose-700 font-medium text-lg">{func.name}</p>
                      <p className="text-rose-600">{func.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Famous {typeCode}s</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {personalityType.famousPeople.map((person, index) => (
                    <li key={index} className="text-rose-700">
                      {person}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">At a Glance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                      {isIntroverted ? "I" : "E"}
                    </div>
                    <div>
                      <p className="text-rose-700 font-medium">{isIntroverted ? "Introverted" : "Extraverted"}</p>
                      <p className="text-rose-600 text-sm">
                        {isIntroverted
                          ? "Gains energy from inner world and thoughts"
                          : "Gains energy from external world and people"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                      {isIntuitive ? "N" : "S"}
                    </div>
                    <div>
                      <p className="text-rose-700 font-medium">{isIntuitive ? "Intuitive" : "Sensing"}</p>
                      <p className="text-rose-600 text-sm">
                        {isIntuitive
                          ? "Focuses on patterns, possibilities and future"
                          : "Focuses on concrete facts and details"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                      {isThinking ? "T" : "F"}
                    </div>
                    <div>
                      <p className="text-rose-700 font-medium">{isThinking ? "Thinking" : "Feeling"}</p>
                      <p className="text-rose-600 text-sm">
                        {isThinking
                          ? "Makes decisions based on logic and reason"
                          : "Makes decisions based on values and emotions"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                      {isJudging ? "J" : "P"}
                    </div>
                    <div>
                      <p className="text-rose-700 font-medium">{isJudging ? "Judging" : "Perceiving"}</p>
                      <p className="text-rose-600 text-sm">
                        {isJudging ? "Prefers structure and planning" : "Prefers flexibility and spontaneity"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700">Take the Personality Test</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
