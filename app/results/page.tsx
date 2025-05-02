"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Share2, Download, Award, ArrowRight, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import SocialShare from "@/components/social-share"
import { useAuth } from "@/lib/auth"
import { saveTestResult, getPersonalityTypeByCode } from "@/lib/firebase"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const personalityType = searchParams.get("type") || "INFJ"
  const quizTime = searchParams.get("time") ? Number.parseInt(searchParams.get("time") as string) : undefined
  const [showShare, setShowShare] = useState(false)
  const [typeData, setTypeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Fetch personality type data
  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        setLoading(true)
        const data = await getPersonalityTypeByCode(personalityType)
        setTypeData(data)
      } catch (error) {
        console.error("Error fetching personality type data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (personalityType) {
      fetchTypeData()
    }
  }, [personalityType])

  // Save result to Firebase if user is logged in
  useEffect(() => {
    const saveResult = async () => {
      if (user && personalityType) {
        try {
          // Create a result object with the necessary data
          const result = {
            userId: user.uid,
            type: personalityType,
            date: new Date().toISOString(),
            timeToComplete: quizTime,
          }

          await saveTestResult(result)
          console.log("Test result saved to Firebase")
        } catch (error) {
          console.error("Error saving test result:", error)
        }
      }
    }

    saveResult()
  }, [user, personalityType, quizTime])

  // Format time from seconds to minutes and seconds
  const formatTime = (seconds?: number) => {
    if (!seconds) return "N/A"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-rose-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-8 text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personality Type</h1>
                <div className="text-5xl md:text-6xl font-extrabold mb-4">{personalityType}</div>
                <p className="text-lg opacity-90">
                  {loading ? "Loading..." : typeData?.nickname || "Personality Type"}
                </p>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Clock className="h-5 w-5 text-rose-500 mr-2" />
                    <span className="text-gray-600">
                      Completion time: <span className="font-medium">{formatTime(quizTime)}</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="border-rose-200 text-rose-600 hover:bg-rose-50"
                      onClick={() => setShowShare(!showShare)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {showShare && (
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <SocialShare
                        title={`I'm a ${personalityType} personality type!`}
                        url={`${typeof window !== "undefined" ? window.location.origin : ""}/results?type=${personalityType}`}
                      />
                    </CardContent>
                  </Card>
                )}

                <Tabs defaultValue="overview" className="mt-6">
                  <TabsList className="grid w-full grid-cols-4 bg-rose-100">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="strengths"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Strengths
                    </TabsTrigger>
                    <TabsTrigger
                      value="challenges"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Challenges
                    </TabsTrigger>
                    <TabsTrigger
                      value="careers"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Careers
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-rose-800 mb-3">About {personalityType}</h2>
                        {loading ? (
                          <div className="text-center py-4">
                            <p className="text-gray-600">Loading description...</p>
                          </div>
                        ) : (
                          <p className="text-gray-600 leading-relaxed">
                            {typeData?.description || "No description available for this personality type."}
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-rose-800 mb-3">Your Personality Dimensions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-rose-50 p-4 rounded-lg">
                            <h4 className="font-medium text-rose-700 mb-2">
                              {personalityType.charAt(0) === "E" ? "Extraversion (E)" : "Introversion (I)"}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {personalityType.charAt(0) === "E"
                                ? "You gain energy from social interactions and external activities. You enjoy being around people and tend to think out loud."
                                : "You gain energy from solitary activities and internal reflection. You prefer deep one-on-one conversations and need time alone to recharge."}
                            </p>
                          </div>

                          <div className="bg-rose-50 p-4 rounded-lg">
                            <h4 className="font-medium text-rose-700 mb-2">
                              {personalityType.charAt(1) === "S" ? "Sensing (S)" : "Intuition (N)"}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {personalityType.charAt(1) === "S"
                                ? "You focus on concrete facts and details. You trust information that is tangible and practical, and prefer to work with what is real and present."
                                : "You focus on patterns and possibilities. You trust information that is more abstract or theoretical and enjoy thinking about the future."}
                            </p>
                          </div>

                          <div className="bg-rose-50 p-4 rounded-lg">
                            <h4 className="font-medium text-rose-700 mb-2">
                              {personalityType.charAt(2) === "T" ? "Thinking (T)" : "Feeling (F)"}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {personalityType.charAt(2) === "T"
                                ? "You make decisions based on logic and objective analysis. You value consistency and fairness in your reasoning."
                                : "You make decisions based on personal values and how actions affect others. You strive for harmony and positive interactions."}
                            </p>
                          </div>

                          <div className="bg-rose-50 p-4 rounded-lg">
                            <h4 className="font-medium text-rose-700 mb-2">
                              {personalityType.charAt(3) === "J" ? "Judging (J)" : "Perceiving (P)"}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {personalityType.charAt(3) === "J"
                                ? "You prefer structure, plans, and organization. You like to make decisions and have things settled."
                                : "You prefer flexibility, spontaneity, and keeping options open. You adapt easily to new information and changing circumstances."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="strengths" className="mt-6">
                    <div>
                      <h2 className="text-2xl font-bold text-rose-800 mb-4">Your Strengths</h2>
                      {loading ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600">Loading strengths data...</p>
                        </div>
                      ) : typeData?.strengths && typeData.strengths.length > 0 ? (
                        <div className="space-y-4">
                          {typeData.strengths.map((strength: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">{index}</Badge>
                              <p className="ml-3 text-gray-600">{strength}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <p className="text-gray-600">
                            No specific strengths data available for {personalityType}. Try viewing the detailed profile
                            for more information.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="challenges" className="mt-6">
                    <div>
                      <h2 className="text-2xl font-bold text-rose-800 mb-4">Your Challenges</h2>
                      {loading ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600">Loading challenges data...</p>
                        </div>
                      ) : typeData?.weaknesses && typeData.weaknesses.length > 0 ? (
                        <div className="space-y-4">
                          {typeData.weaknesses.map((weakness: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">{index}</Badge>
                              <p className="ml-3 text-gray-600">{weakness}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <p className="text-gray-600">
                            No specific challenges data available for {personalityType}. Try viewing the detailed
                            profile for more information.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="careers" className="mt-6">
                    <div>
                      <h2 className="text-2xl font-bold text-rose-800 mb-4">Recommended Career Paths</h2>
                      <p className="text-gray-600 mb-6">
                        Based on your personality type, these career paths might be particularly fulfilling for you:
                      </p>

                      {loading ? (
                        <div className="text-center py-8">
                          <p className="text-gray-600">Loading career data...</p>
                        </div>
                      ) : typeData?.careers && typeData.careers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-rose-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-rose-700 mb-2">Recommended Careers</h3>
                            <ul className="text-gray-600 space-y-1 list-disc list-inside">
                              {typeData.careers
                                .slice(0, Math.ceil(typeData.careers.length / 2))
                                .map((career: string, index: number) => (
                                  <li key={index}>{career}</li>
                                ))}
                            </ul>
                          </div>
                          {typeData.careers.length > 1 && (
                            <div className="bg-rose-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-rose-700 mb-2">More Options</h3>
                              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                {typeData.careers
                                  .slice(Math.ceil(typeData.careers.length / 2))
                                  .map((career: string, index: number) => (
                                    <li key={index}>{career}</li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <p className="text-gray-600">
                            No specific career data available for {personalityType}. Try viewing the detailed profile
                            for more information.
                          </p>
                        </div>
                      )}

                      <div className="mt-8 text-center">
                        <Link href="/careers/personality-types">
                          <Button className="bg-rose-600 hover:bg-rose-700">
                            Explore More Career Insights
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">What's Next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href={`/types/${personalityType.toLowerCase()}`} className="block">
                      <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition-colors">
                        <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                        <h4 className="font-medium text-rose-700">Detailed Profile</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Dive deeper into your personality type characteristics
                        </p>
                      </div>
                    </Link>
                    <Link href="/relationships/compatibility" className="block">
                      <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition-colors">
                        <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                        <h4 className="font-medium text-rose-700">Compatibility</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Discover how you interact with other personality types
                        </p>
                      </div>
                    </Link>
                    <Link href="/careers/personality-types" className="block">
                      <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition-colors">
                        <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                        <h4 className="font-medium text-rose-700">Career Matches</h4>
                        <p className="text-sm text-gray-600 mt-1">Find the best career paths for your personality</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
