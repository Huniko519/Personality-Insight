"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { personalityTypes } from "@/lib/personality-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cognitiveExplanations, typeExplanations, applicationExplanations } from "@/lib/personality-explanations"
import { AlertCircle, CheckCircle, HelpCircle, Info, FileText, Share2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SocialShare } from "@/components/social-share"
import { useTheme } from "next-themes"

interface StrengthData {
  eiStrength: number
  snStrength: number
  tfStrength: number
  jpStrength: number
  e: number
  i: number
  s: number
  n: number
  t: number
  f: number
  j: number
  p: number
  confidence?: number
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const typeCode = searchParams.get("type") || "INFJ" // Default to INFJ if no type provided
  const personalityType = personalityTypes[typeCode]
  const [strengthData, setStrengthData] = useState<StrengthData | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Retrieve strength data from localStorage
    const storedData = localStorage.getItem("personality_strengths")
    if (storedData) {
      try {
        setStrengthData(JSON.parse(storedData))
      } catch (e) {
        console.error("Error parsing strength data:", e)
      }
    }

    // Store the personality type in localStorage for use in reports
    localStorage.setItem("personality_type", typeCode)
  }, [typeCode])

  if (!personalityType) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 py-12 px-4 flex items-center justify-center">
          <Card className="max-w-md mx-auto shadow-lg border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-rose-800 dark:text-rose-200">Invalid Personality Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-rose-700 dark:text-rose-300">
                Sorry, we couldn't find information for the requested personality type.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/quiz" className="w-full">
                <Button className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600">
                  Take the Test Again
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </>
    )
  }

  // Function to render confidence level
  const renderConfidence = (confidence?: number) => {
    if (!confidence) return null

    let label = "Low"
    let color = "text-amber-500"
    let Icon = AlertCircle

    if (confidence > 0.7) {
      label = "High"
      color = "text-green-500"
      Icon = CheckCircle
    } else if (confidence > 0.4) {
      label = "Moderate"
      color = "text-blue-500"
      Icon = Info
    }

    return (
      <div className={`flex items-center ${color} text-sm font-medium`}>
        <Icon className="w-4 h-4 mr-1" />
        <span>{label} Confidence</span>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-rose-800 dark:text-rose-200 mb-2">Your Personality Type</h1>
            <div className="inline-block bg-rose-100 dark:bg-rose-800 px-4 py-2 rounded-full text-rose-800 dark:text-rose-200 font-bold text-2xl">
              {typeCode}
            </div>
            <h2 className="text-2xl font-semibold text-rose-700 dark:text-rose-300 mt-4">{personalityType.name}</h2>
            <p className="text-rose-600 dark:text-rose-400 mt-2">{personalityType.nickname}</p>
            {strengthData?.confidence && (
              <div className="mt-2 flex justify-center">{renderConfidence(strengthData.confidence)}</div>
            )}

            <div className="flex flex-wrap justify-center mt-4 gap-2">
              <Link href="/reports">
                <Button
                  variant="outline"
                  className="border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50 flex items-center"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  variant="outline"
                  className="border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50"
                >
                  View Career Matches
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50 flex items-center"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
            </div>

            {showShareOptions && (
              <div className="mt-4 p-4 bg-white dark:bg-rose-900 rounded-lg border border-rose-200 dark:border-rose-800 inline-block animate-fade-in">
                <SocialShare
                  title={`I'm a ${typeCode} (${personalityType.name})!`}
                  text={`I just discovered I'm a ${typeCode} (${personalityType.name}) personality type! ${personalityType.nickname}`}
                />
              </div>
            )}
          </div>

          {strengthData && (
            <Card className="mb-8 shadow-lg border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800 dark:text-rose-200">Your Preference Strengths</CardTitle>
                <CardDescription className="dark:text-rose-300">
                  How strongly you lean toward each preference based on your answers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Extraversion (E)</span>
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Introversion (I)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 dark:bg-rose-800/50 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500 dark:bg-rose-600 animate-pulse-slow"
                      style={{ width: `${((strengthData.e / (strengthData.e + strengthData.i)) * 100).toFixed(2)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 dark:text-rose-400 mt-1">
                    <span>{(strengthData.e).toFixed(2)} points</span>
                    <span>{(strengthData.i).toFixed(2)} points</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Sensing (S)</span>
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Intuition (N)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 dark:bg-rose-800/50 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500 dark:bg-rose-600 animate-pulse-slow"
                      style={{ width: `${((strengthData.s / (strengthData.s + strengthData.n)) * 100).toFixed(2)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 dark:text-rose-400 mt-1">
                    <span>{(strengthData.s).toFixed(2)} points</span>
                    <span>{(strengthData.n).toFixed(2)} points</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Thinking (T)</span>
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Feeling (F)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 dark:bg-rose-800/50 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500 dark:bg-rose-600 animate-pulse-slow"
                      style={{ width: `${((strengthData.t / (strengthData.t + strengthData.f)) * 100).toFixed(2)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 dark:text-rose-400 mt-1">
                    <span>{(strengthData.t).toFixed(2)} points</span>
                    <span>{(strengthData.f).toFixed(2)} points</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Judging (J)</span>
                    <span className="text-rose-700 dark:text-rose-300 font-medium">Perceiving (P)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 dark:bg-rose-800/50 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500 dark:bg-rose-600 animate-pulse-slow"
                      style={{ width: `${((strengthData.j / (strengthData.j + strengthData.p)) * 100).toFixed(2)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 dark:text-rose-400 mt-1">
                    <span>{(strengthData.j).toFixed(2)} points</span>
                    <span>{(strengthData.p).toFixed(2)} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid grid-cols-8 mb-8 bg-rose-100/80 dark:bg-rose-900/80">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="portrait"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Portrait
              </TabsTrigger>
              <TabsTrigger
                value="strengths"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Strengths
              </TabsTrigger>
              <TabsTrigger
                value="weaknesses"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Challenges
              </TabsTrigger>
              <TabsTrigger
                value="careers"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Careers
              </TabsTrigger>
              <TabsTrigger
                value="relationships"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Relationships
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Growth
              </TabsTrigger>
              <TabsTrigger
                value="cognitive"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
              >
                Functions
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">
                {personalityType.name}
              </h3>
              <p className="mb-4 text-rose-700 dark:text-rose-300">{personalityType.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-md">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Core Traits</h4>
                  <ul className="list-disc list-inside text-rose-700 dark:text-rose-300 space-y-1">
                    {personalityType.traits.map((trait, index) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-md">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Values</h4>
                  <ul className="list-disc list-inside text-rose-700 dark:text-rose-300 space-y-1">
                    {personalityType.values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="portrait"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Portrait of an {typeCode}</h3>

              {personalityType.portraitDescription && (
                <div className="mb-6">
                  <p className="text-rose-700 dark:text-rose-300 mb-4">{personalityType.portraitDescription}</p>
                </div>
              )}

              {personalityType.poeticDescription && (
                <div className="bg-rose-50 dark:bg-rose-900/50 p-5 rounded-lg mb-6 italic text-rose-700 dark:text-rose-300 border-l-4 border-rose-300 dark:border-rose-700">
                  <p className="whitespace-pre-line">{personalityType.poeticDescription}</p>
                </div>
              )}

              {personalityType.detailedDescription && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Detailed Description</h4>
                  <p className="text-rose-700 dark:text-rose-300 mb-4 whitespace-pre-line">
                    {personalityType.detailedDescription}
                  </p>
                </div>
              )}

              {personalityType.stressResponse && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Response to Stress</h4>
                  <p className="text-rose-700 dark:text-rose-300 mb-4">{personalityType.stressResponse}</p>
                </div>
              )}

              {personalityType.naturalAbilities && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Natural Abilities</h4>
                  <p className="text-rose-700 dark:text-rose-300 mb-4 whitespace-pre-line">
                    {personalityType.naturalAbilities}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="strengths"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Your Strengths</h3>
              <ul className="space-y-4">
                {personalityType.strengths.map((strength, index) => (
                  <li
                    key={index}
                    className="flex items-start animate-slide-in-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-rose-700 dark:text-rose-300">{strength}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="weaknesses"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Your Challenges</h3>
              <ul className="space-y-4">
                {personalityType.weaknesses.map((weakness, index) => (
                  <li
                    key={index}
                    className="flex items-start animate-slide-in-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-rose-700 dark:text-rose-300">{weakness}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent
              value="careers"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Career Path</h3>

              {personalityType.careerTraits && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Career-Related Traits</h4>
                  <ul className="space-y-2">
                    {personalityType.careerTraits.map((trait, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-rose-700 dark:text-rose-300">{trait}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {personalityType.careerEnvironment && (
                <div className="mb-6 bg-rose-50 dark:bg-rose-900/50 p-5 rounded-lg">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Ideal Work Environment</h4>
                  <p className="text-rose-700 dark:text-rose-300">{personalityType.careerEnvironment}</p>
                </div>
              )}

              {personalityType.careerStrengths && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Career Strengths</h4>
                  <ul className="space-y-2">
                    {personalityType.careerStrengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-rose-700 dark:text-rose-300">{strength}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {personalityType.careerChallenges && (
                <div className="mb-6">
                  <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Career Challenges</h4>
                  <ul className="space-y-2">
                    {personalityType.careerChallenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-rose-700 dark:text-rose-300">{challenge}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Recommended Careers</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalityType.careers.map((career, index) => (
                  <div
                    key={index}
                    className="bg-rose-50 dark:bg-rose-900/50 p-3 rounded-md animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="text-rose-700 dark:text-rose-300">{career}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/careers">
                  <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600">
                    View Detailed Career Matches
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent
              value="relationships"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Relationships</h3>

              <div className="space-y-6 mb-8">
                {personalityType.relationships && (
                  <>
                    <div>
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">As Lovers and Partners</h4>
                      <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-lg mb-4 italic text-rose-700 dark:text-rose-300 border-l-4 border-rose-300 dark:border-rose-700">
                        <p>
                          {personalityType.relationships.loveQuote ||
                            "Love is not just looking at each other, it's looking in the same direction."}
                        </p>
                      </div>
                      <p className="text-rose-700 dark:text-rose-300 mb-3 whitespace-pre-line">
                        {personalityType.relationships.asPartners}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">As Friends</h4>
                      <p className="text-rose-700 dark:text-rose-300 whitespace-pre-line">
                        {personalityType.relationships.asFriends}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Communication Style</h4>
                      <p className="text-rose-700 dark:text-rose-300 whitespace-pre-line">
                        {personalityType.relationships.communication}
                      </p>
                    </div>
                  </>
                )}

                {personalityType.asParents && (
                  <div>
                    <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">As Parents</h4>
                    <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-lg mb-4 italic text-rose-700 dark:text-rose-300 border-l-4 border-rose-300 dark:border-rose-700">
                      <p>
                        {personalityType.relationships?.parentQuote ||
                          "Children are not a distraction from more important work. They are the most important work."}
                      </p>
                    </div>
                    <p className="text-rose-700 dark:text-rose-300 whitespace-pre-line">{personalityType.asParents}</p>
                  </div>
                )}

                {personalityType.relationshipStrengths && (
                  <div>
                    <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Relationship Strengths</h4>
                    <ul className="space-y-2">
                      {personalityType.relationshipStrengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <p className="text-rose-700 dark:text-rose-300">{strength}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {personalityType.relationshipWeaknesses && (
                  <div>
                    <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Relationship Challenges</h4>
                    <ul className="space-y-2">
                      {personalityType.relationshipWeaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                            <AlertCircle className="h-5 w-5" />
                          </div>
                          <p className="text-rose-700 dark:text-rose-300">{weakness}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent
              value="cognitive"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Cognitive Functions</h3>
              <p className="mb-6 text-rose-700 dark:text-rose-300">{cognitiveExplanations.description}</p>
              <div className="space-y-6">
                {personalityType.cognitiveFunctions.map((func, index) => (
                  <div
                    key={index}
                    className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-md animate-slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          index < 2
                            ? "bg-rose-200 text-rose-800 dark:bg-rose-700 dark:text-rose-100"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-200"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200">{func.name}</h4>
                    </div>
                    <p className="text-rose-700 dark:text-rose-300">{func.description}</p>
                    {cognitiveExplanations.functionDescriptions[
                      func.name.split(" ")[0] as keyof typeof cognitiveExplanations.functionDescriptions
                    ] && (
                      <p className="mt-2 text-rose-600 dark:text-rose-400 text-sm">
                        {
                          cognitiveExplanations.functionDescriptions[
                            func.name.split(" ")[0] as keyof typeof cognitiveExplanations.functionDescriptions
                          ].details
                        }
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 border border-rose-200 dark:border-rose-700 rounded-md bg-rose-50/50 dark:bg-rose-900/30">
                <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Understanding Cognitive Functions
                </h4>
                <div
                  className="text-rose-700 dark:text-rose-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: cognitiveExplanations.details }}
                />
              </div>
              <div className="mt-6 text-center">
                <Link href="/visualization">
                  <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600">
                    View Interactive Visualization
                  </Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent
              value="growth"
              className="bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h3 className="text-xl font-semibold text-rose-800 dark:text-rose-200 mb-4">Personal Growth</h3>

              {personalityType.personalGrowth ? (
                <div className="space-y-6">
                  {personalityType.personalGrowth.meaningOfSuccess && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">
                        What Success Means to {typeCode}
                      </h4>
                      <p className="text-rose-700 dark:text-rose-300 mb-4 whitespace-pre-line">
                        {personalityType.personalGrowth.meaningOfSuccess}
                      </p>
                    </div>
                  )}

                  {personalityType.personalGrowth.strengths && personalityType.personalGrowth.strengths.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Growth Strengths</h4>
                      <ul className="space-y-2">
                        {personalityType.personalGrowth.strengths.map((strength, index) => (
                          <li
                            key={index}
                            className="flex items-start animate-slide-in-left"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-rose-700 dark:text-rose-300">{strength}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {personalityType.personalGrowth.problemAreas &&
                    personalityType.personalGrowth.problemAreas.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Potential Problem Areas</h4>
                        <ul className="space-y-2">
                          {personalityType.personalGrowth.problemAreas.map((problem, index) => (
                            <li
                              key={index}
                              className="flex items-start animate-slide-in-left"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                                <AlertCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-rose-700 dark:text-rose-300">{problem}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {personalityType.personalGrowth.solutions && personalityType.personalGrowth.solutions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Growth Opportunities</h4>
                      <ul className="space-y-2">
                        {personalityType.personalGrowth.solutions.map((solution, index) => (
                          <li
                            key={index}
                            className="flex items-start animate-slide-in-left"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-rose-700 dark:text-rose-300">{solution}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {personalityType.personalGrowth.rulesForSuccess &&
                    personalityType.personalGrowth.rulesForSuccess.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-3">Rules for Success</h4>
                        <ul className="space-y-2">
                          {personalityType.personalGrowth.rulesForSuccess.map((rule, index) => (
                            <li
                              key={index}
                              className="flex items-start animate-slide-in-left"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-rose-700 dark:text-rose-300">{rule}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <div className="bg-rose-50 dark:bg-rose-900/50 p-5 rounded-lg mb-6">
                  <p className="text-rose-700 dark:text-rose-300">
                    Growth information for {typeCode}s is currently being developed. Check back soon for personalized
                    growth strategies and development paths tailored to the {typeCode} personality type.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">
                      General Growth Tips for {typeCode}s:
                    </h4>
                    <ul className="space-y-2 mt-3">
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-rose-700 dark:text-rose-300">
                          Recognize and leverage your natural strengths while being mindful of potential blind spots.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-rose-700 dark:text-rose-300">
                          Seek balance by developing your less dominant cognitive functions.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500 dark:text-rose-400">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className="text-rose-700 dark:text-rose-300">
                          Practice self-awareness and reflection to better understand your patterns and triggers.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="p-4 border border-rose-200 dark:border-rose-700 rounded-md bg-rose-50/50 dark:bg-rose-900/30">
                <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  About Type Development
                </h4>
                <div
                  className="text-rose-700 dark:text-rose-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: typeExplanations.details }}
                />
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Practical Applications</h4>
                <div
                  className="text-rose-700 dark:text-rose-300 text-sm"
                  dangerouslySetInnerHTML={{ __html: applicationExplanations.details }}
                />
              </div>

              <div className="mt-6 text-center">
                <Link href="/reports">
                  <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600">
                    Generate Detailed Development Report
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm animate-slide-in-left">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800 dark:text-rose-200">Compatibility</CardTitle>
                <CardDescription className="dark:text-rose-300">How you interact with other types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Best Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityType.compatibility.best.map((type, index) => (
                        <Link href={`/types/${type}`} key={index}>
                          <div
                            className="bg-rose-100 dark:bg-rose-800 px-3 py-1 rounded-full text-rose-700 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-700 transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {type}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Good Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityType.compatibility.good.map((type, index) => (
                        <Link href={`/types/${type}`} key={index}>
                          <div
                            className="bg-rose-50 dark:bg-rose-900 px-3 py-1 rounded-full text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-700 transition-colors animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {type}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800 dark:text-rose-200">Famous {typeCode}s</CardTitle>
                <CardDescription className="dark:text-rose-300">
                  Notable people who share your personality type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {personalityType.famousPeople.map((person, index) => (
                    <li
                      key={index}
                      className="text-rose-700 dark:text-rose-300 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {person}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center animate-fade-in">
            <Link href="/types">
              <Button
                variant="outline"
                className="mr-4 border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/50"
              >
                Explore All Types
              </Button>
            </Link>
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600">
                Take the Test Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
