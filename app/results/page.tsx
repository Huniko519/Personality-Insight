"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { personalityTypes } from "@/lib/personality-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  dimensionExplanations,
  cognitiveExplanations,
  typeExplanations,
  applicationExplanations,
} from "@/lib/personality-explanations"
import { AlertCircle, CheckCircle, HelpCircle, Info, FileText } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

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
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <Card className="max-w-md mx-auto shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-rose-800">Invalid Personality Type</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sorry, we couldn't find information for the requested personality type.</p>
            </CardContent>
            <CardFooter>
              <Link href="/quiz" className="w-full">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Take the Test Again</Button>
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
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-rose-800 mb-2">Your Personality Type</h1>
            <div className="inline-block bg-rose-100 px-4 py-2 rounded-full text-rose-800 font-bold text-2xl">
              {typeCode}
            </div>
            <h2 className="text-2xl font-semibold text-rose-700 mt-4">{personalityType.name}</h2>
            <p className="text-rose-600 mt-2">{personalityType.nickname}</p>
            {strengthData?.confidence && (
              <div className="mt-2 flex justify-center">{renderConfidence(strengthData.confidence)}</div>
            )}

            <div className="flex justify-center mt-4 space-x-4">
              <Link href="/reports">
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                  View Career Matches
                </Button>
              </Link>
            </div>
          </div>

          {strengthData && (
            <Card className="mb-8 shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Your Preference Strengths</CardTitle>
                <CardDescription>How strongly you lean toward each preference based on your answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 font-medium">Extraversion (E)</span>
                    <span className="text-rose-700 font-medium">Introversion (I)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500"
                      style={{ width: `${(strengthData.e / (strengthData.e + strengthData.i)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 mt-1">
                    <span>{strengthData.e} points</span>
                    <span>{strengthData.i} points</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 font-medium">Sensing (S)</span>
                    <span className="text-rose-700 font-medium">Intuition (N)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500"
                      style={{ width: `${(strengthData.s / (strengthData.s + strengthData.n)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 mt-1">
                    <span>{strengthData.s} points</span>
                    <span>{strengthData.n} points</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 font-medium">Thinking (T)</span>
                    <span className="text-rose-700 font-medium">Feeling (F)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500"
                      style={{ width: `${(strengthData.t / (strengthData.t + strengthData.f)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 mt-1">
                    <span>{strengthData.t} points</span>
                    <span>{strengthData.f} points</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-rose-700 font-medium">Judging (J)</span>
                    <span className="text-rose-700 font-medium">Perceiving (P)</span>
                  </div>
                  <div className="relative h-4 w-full bg-rose-100 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-rose-500"
                      style={{ width: `${(strengthData.j / (strengthData.j + strengthData.p)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-rose-600 mt-1">
                    <span>{strengthData.j} points</span>
                    <span>{strengthData.p} points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="weaknesses">Challenges</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="cognitive">Cognitive Functions</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">The {personalityType.name}</h3>
              <p className="mb-4 text-rose-700">{personalityType.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
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
            <TabsContent value="strengths" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Your Strengths</h3>
              <ul className="space-y-4">
                {personalityType.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-rose-700">{strength}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="weaknesses" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Your Challenges</h3>
              <ul className="space-y-4">
                {personalityType.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-rose-700">{weakness}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="careers" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Recommended Careers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalityType.careers.map((career, index) => (
                  <div key={index} className="bg-rose-50 p-3 rounded-md">
                    <p className="text-rose-700">{career}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/careers">
                  <Button className="bg-rose-600 hover:bg-rose-700">View Detailed Career Matches</Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="cognitive" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Cognitive Functions</h3>
              <p className="mb-6 text-rose-700">{cognitiveExplanations.description}</p>
              <div className="space-y-6">
                {personalityType.cognitiveFunctions.map((func, index) => (
                  <div key={index} className="bg-rose-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          index < 2 ? "bg-rose-200 text-rose-800" : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-rose-800">{func.name}</h4>
                    </div>
                    <p className="text-rose-700">{func.description}</p>
                    {cognitiveExplanations.functionDescriptions[
                      func.name.split(" ")[0] as keyof typeof cognitiveExplanations.functionDescriptions
                    ] && (
                      <p className="mt-2 text-rose-600 text-sm">
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
              <div className="mt-6 p-4 border border-rose-200 rounded-md bg-rose-50/50">
                <h4 className="font-semibold text-rose-800 mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Understanding Cognitive Functions
                </h4>
                <div
                  className="text-rose-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: cognitiveExplanations.details }}
                />
              </div>
              <div className="mt-6 text-center">
                <Link href="/visualization">
                  <Button className="bg-rose-600 hover:bg-rose-700">View Interactive Visualization</Button>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="development" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Personal Development for {typeCode}</h3>
              <p className="mb-6 text-rose-700">{typeExplanations.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-rose-800 mb-2">Growth Opportunities</h4>
                <div className="bg-rose-50 p-4 rounded-md">
                  <ul className="space-y-3 text-rose-700">
                    {/* Personalized development advice based on type */}
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-rose-500">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p>
                          {typeCode.includes("E")
                            ? dimensionExplanations.EI.development.E
                            : dimensionExplanations.EI.development.I}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-rose-500">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p>
                          {typeCode.includes("S")
                            ? dimensionExplanations.SN.development.S
                            : dimensionExplanations.SN.development.N}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-rose-500">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p>
                          {typeCode.includes("T")
                            ? dimensionExplanations.TF.development.T
                            : dimensionExplanations.TF.development.F}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 text-rose-500">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p>
                          {typeCode.includes("J")
                            ? dimensionExplanations.JP.development.J
                            : dimensionExplanations.JP.development.P}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 border border-rose-200 rounded-md bg-rose-50/50">
                <h4 className="font-semibold text-rose-800 mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  About Type Development
                </h4>
                <div className="text-rose-700 text-sm" dangerouslySetInnerHTML={{ __html: typeExplanations.details }} />
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-rose-800 mb-2">Practical Applications</h4>
                <div
                  className="text-rose-700 text-sm"
                  dangerouslySetInnerHTML={{ __html: applicationExplanations.details }}
                />
              </div>

              <div className="mt-6 text-center">
                <Link href="/reports">
                  <Button className="bg-rose-600 hover:bg-rose-700">Generate Detailed Development Report</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Compatibility</CardTitle>
                <CardDescription>How you interact with other types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-rose-800 mb-2">Best Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityType.compatibility.best.map((type, index) => (
                        <Link href={`/types/${type}`} key={index}>
                          <div className="bg-rose-100 px-3 py-1 rounded-full text-rose-700 hover:bg-rose-200 transition-colors">
                            {type}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rose-800 mb-2">Good Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityType.compatibility.good.map((type, index) => (
                        <Link href={`/types/${type}`} key={index}>
                          <div className="bg-rose-50 px-3 py-1 rounded-full text-rose-700 hover:bg-rose-200 transition-colors">
                            {type}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Famous {typeCode}s</CardTitle>
                <CardDescription>Notable people who share your personality type</CardDescription>
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
          </div>

          <div className="text-center">
            <Link href="/types">
              <Button variant="outline" className="mr-4 border-rose-600 text-rose-600 hover:bg-rose-50">
                Explore All Types
              </Button>
            </Link>
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700">Take the Test Again</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
