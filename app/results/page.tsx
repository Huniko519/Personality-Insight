"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Clock, Share2, BookOpen, Briefcase, Heart, Brain, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SocialShare from "@/components/social-share"
import { getPersonalityTypeByCode, getPersonalityExplanations } from "@/lib/firebase"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")
  const timeParam = searchParams.get("time")

  const [personalityType, setPersonalityType] = useState<any>(null)
  const [explanations, setExplanations] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (typeParam) {
        try {
          setLoading(true)
          setError(null)

          const typeData = await getPersonalityTypeByCode(typeParam)
          if (!typeData) {
            setError("Personality type not found in the database.")
            setLoading(false)
            return
          }
          setPersonalityType(typeData)

          const explanationsData = await getPersonalityExplanations()
          setExplanations(explanationsData)
        } catch (error) {
          console.error("Error fetching personality data:", error)
          setError("Failed to load personality data. Please try again later.")
        } finally {
          setLoading(false)
        }
      } else {
        setError("No personality type specified")
        setLoading(false)
      }
    }

    fetchData()
  }, [typeParam])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-rose-800 mb-4">Analyzing Your Results</h1>
            <p className="text-rose-600 mb-6">Preparing your personality profile...</p>
            <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !personalityType) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-rose-100 p-3 rounded-full">
                <AlertTriangle className="h-12 w-12 text-rose-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-rose-800 mb-4">Results Not Found</h1>
            <p className="text-rose-600 mb-6">{error || "We couldn't find your personality type results."}</p>
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700">Take the Test Again</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Ensure type exists and has a default value
  const typeCode = personalityType?.type || "unknown"

  // Format the completion time if available
  const formattedTime = timeParam
    ? (() => {
        const timeInSeconds = Number.parseInt(timeParam)
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = timeInSeconds % 60
        return `${minutes}m ${seconds}s`
      })()
    : null

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-rose-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-rose-800 mb-2">Your Personality Type</h1>
            <p className="text-rose-600 mb-4">Based on your responses, you are a:</p>
            <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-md border border-rose-200">
              <h2 className="text-3xl font-bold text-rose-700">{typeCode}</h2>
              <p className="text-rose-600">{personalityType?.name || "Personality Type"}</p>
            </div>

            {formattedTime && (
              <div className="mt-4 flex justify-center">
                <div className="flex items-center text-rose-600 bg-white px-4 py-2 rounded-full shadow-sm border border-rose-200">
                  <Clock className="h-4 w-4 mr-2 text-rose-500" />
                  <span>Completed in {formattedTime}</span>
                </div>
              </div>
            )}
          </div>

          <Card className="mb-8 border-rose-200 shadow-lg animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-rose-800">{personalityType?.name || "Personality Type"}</CardTitle>
              <CardDescription className="text-rose-600">{personalityType?.nickname || "Your Type"}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">{personalityType?.description || "No description available."}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-rose-50 p-4 rounded-md border border-rose-200">
                  <h3 className="font-semibold text-rose-800 mb-2">Key Strengths</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {personalityType?.strengths?.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    )) || <li>No strengths data available</li>}
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-md border border-rose-200">
                  <h3 className="font-semibold text-rose-800 mb-2">Potential Challenges</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {personalityType?.challenges?.map((challenge: string, index: number) => (
                      <li key={index}>{challenge}</li>
                    )) || <li>No challenges data available</li>}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-rose-800">Your Personality Dimensions</h3>

                {personalityType?.dimensions &&
                  Array.isArray(personalityType.dimensions) &&
                  personalityType.dimensions.map((dim: any) => (
                    <div key={dim.name} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{dim.left}</span>
                        <span className="text-gray-700">{dim.right}</span>
                      </div>
                      <div className="relative h-6 bg-rose-100 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-rose-500 rounded-full"
                          style={{ width: `${dim.value}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Badge className="bg-white text-rose-700 border-rose-200 shadow-sm z-10">
                            {dim.value < 50 ? dim.leftLetter : dim.rightLetter}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
              <Button
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
                onClick={() => setShowShare(!showShare)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Results
              </Button>
              <div className="flex gap-2">
                <Link href={`/types/${typeCode.toLowerCase()}`}>
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>

          {showShare && (
            <Card className="mb-8 border-rose-200 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Share Your Results</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialShare
                  title={`I'm a ${typeCode} (${personalityType?.name || "Personality Type"})!`}
                  text="I just discovered my personality type. Take the test to find yours!"
                  url={`${window.location.origin}/quiz`}
                />
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="overview" className="animate-fade-in">
            <TabsList className="grid grid-cols-4 mb-6 bg-rose-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="career" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                Career
              </TabsTrigger>
              <TabsTrigger
                value="relationships"
                className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
              >
                Relationships
              </TabsTrigger>
              <TabsTrigger value="growth" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                Growth
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <Card className="border-rose-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-rose-800">
                    <Brain className="h-5 w-5 mr-2" />
                    Cognitive Functions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {explanations?.cognitiveExplanation || "No explanation available."}
                  </p>

                  {personalityType?.cognitiveFunctions && Array.isArray(personalityType.cognitiveFunctions) ? (
                    <div className="space-y-4">
                      {personalityType.cognitiveFunctions.map((func: any, index: number) => (
                        <div key={index} className="bg-rose-50 p-4 rounded-md border border-rose-200">
                          <h4 className="font-semibold text-rose-800">
                            {func.name} ({func.code})
                          </h4>
                          <p className="text-gray-700">{func.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">No cognitive functions data available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="career" className="mt-0">
              <Card className="border-rose-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-rose-800">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Career Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {personalityType?.careerInsights || "No career insights available."}
                  </p>

                  <h3 className="font-semibold text-rose-800 mb-2">Recommended Career Paths</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {personalityType?.recommendedCareers?.map((career: string, index: number) => (
                      <div key={index} className="bg-rose-50 p-2 rounded border border-rose-200 text-gray-700">
                        {career}
                      </div>
                    )) || (
                      <div className="bg-rose-50 p-2 rounded border border-rose-200 text-gray-700">
                        No career data available
                      </div>
                    )}
                  </div>

                  <Link href="/careers">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Explore Career Matches</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relationships" className="mt-0">
              <Card className="border-rose-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-rose-800">
                    <Heart className="h-5 w-5 mr-2" />
                    Relationship Dynamics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {personalityType?.relationshipApproach || "No relationship approach data available."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-rose-50 p-4 rounded-md border border-rose-200">
                      <h3 className="font-semibold text-rose-800 mb-2">Compatible Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {personalityType?.compatibleTypes?.map((type: string, index: number) => (
                          <Link key={index} href={`/types/${type.toLowerCase()}`}>
                            <Badge className="bg-white hover:bg-rose-100 text-rose-700 border-rose-200 cursor-pointer">
                              {type}
                            </Badge>
                          </Link>
                        )) || <span className="text-gray-700">No compatibility data available</span>}
                      </div>
                    </div>
                    <div className="bg-rose-50 p-4 rounded-md border border-rose-200">
                      <h3 className="font-semibold text-rose-800 mb-2">Communication Style</h3>
                      <p className="text-gray-700">
                        {personalityType?.communicationStyle || "No communication style data available"}
                      </p>
                    </div>
                  </div>

                  <Link href="/relationships">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Explore Relationship Compatibility</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth" className="mt-0">
              <Card className="border-rose-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-rose-800">Personal Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {personalityType?.growthOpportunities || "No growth opportunities data available"}
                  </p>

                  <h3 className="font-semibold text-rose-800 mb-2">Development Suggestions</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    {personalityType?.developmentSuggestions?.map((suggestion: string, index: number) => (
                      <li key={index}>{suggestion}</li>
                    )) || <li>No development suggestions available</li>}
                  </ul>

                  <div className="bg-rose-50 p-4 rounded-md border border-rose-200 mb-6">
                    <h3 className="font-semibold text-rose-800 mb-2">Under Stress</h3>
                    <p className="text-gray-700">
                      {personalityType?.underStress || "No stress response data available"}
                    </p>
                  </div>

                  <Link href={`/types/${typeCode.toLowerCase()}`}>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Detailed Growth Path</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  )
}
