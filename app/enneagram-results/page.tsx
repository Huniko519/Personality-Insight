"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Share2, Download, Award, Clock, Info } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import SocialShare from "@/components/social-share"
import { useAuth } from "@/lib/auth"
import { saveTestResult, getEnneagramTypeByNumber } from "@/lib/firebase"

export default function EnneagramResultsPage() {
  const searchParams = useSearchParams()
  const enneagramType = searchParams.get("type") || "1"
  const quizTime = searchParams.get("time") ? Number.parseInt(searchParams.get("time") as string) : undefined
  const [showShare, setShowShare] = useState(false)
  const [typeData, setTypeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Fetch Enneagram type data
  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        setLoading(true)
        const data = await getEnneagramTypeByNumber(enneagramType)
        setTypeData(data)
      } catch (error) {
        console.error("Error fetching Enneagram type data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (enneagramType) {
      fetchTypeData()
    }
  }, [enneagramType])

  // Save result to Firebase if user is logged in
  useEffect(() => {
    const saveResult = async () => {
      if (user && enneagramType) {
        try {
          // Create a result object with the necessary data
          const result = {
            userId: user.uid,
            type: `Enneagram Type ${enneagramType}`,
            date: new Date().toISOString(),
            timeToComplete: quizTime,
            testType: "enneagram",
          }

          await saveTestResult(result)
          console.log("Enneagram test result saved to Firebase")
        } catch (error) {
          console.error("Error saving Enneagram test result:", error)
        }
      }
    }

    saveResult()
  }, [user, enneagramType, quizTime])

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
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Enneagram Type</h1>
                <div className="text-5xl md:text-6xl font-extrabold mb-4">Type {enneagramType}</div>
                <p className="text-lg opacity-90">{loading ? "Loading..." : typeData?.name || "Enneagram Type"}</p>
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
                        title={`I'm an Enneagram Type ${enneagramType}!`}
                        url={`${typeof window !== "undefined" ? window.location.origin : ""}/enneagram-results?type=${enneagramType}`}
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
                      value="growth"
                      className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
                    >
                      Growth
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-rose-800 mb-3">
                          Type {enneagramType}: {loading ? "..." : typeData?.name}
                        </h2>
                        {loading ? (
                          <div className="text-center py-4">
                            <p className="text-gray-600">Loading description...</p>
                          </div>
                        ) : (
                          <p className="text-gray-600 leading-relaxed">
                            {typeData?.description || "No description available for this Enneagram type."}
                          </p>
                        )}
                      </div>

                      {!loading && typeData?.center && (
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-rose-600 mr-2 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-rose-800">{typeData.center} Center</h3>
                              <p className="text-gray-600 text-sm mt-1">
                                {typeData.center === "Heart" &&
                                  "You process information primarily through emotions and feelings."}
                                {typeData.center === "Head" &&
                                  "You process information primarily through thinking and intellect."}
                                {typeData.center === "Gut" &&
                                  "You process information primarily through instinct and gut reactions."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {!loading && typeData?.keywords && typeData.keywords.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-rose-800 mb-3">Key Characteristics</h3>
                          <div className="flex flex-wrap gap-2">
                            {typeData.keywords.map((keyword: string, index: number) => (
                              <Badge key={index} className="bg-rose-100 text-rose-800 hover:bg-rose-200">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {!loading && typeData?.fears && (
                        <div>
                          <h3 className="text-xl font-semibold text-rose-800 mb-3">Core Fears</h3>
                          <p className="text-gray-600">{typeData.fears}</p>
                        </div>
                      )}

                      {!loading && typeData?.desires && (
                        <div>
                          <h3 className="text-xl font-semibold text-rose-800 mb-3">Core Desires</h3>
                          <p className="text-gray-600">{typeData.desires}</p>
                        </div>
                      )}
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
                              <Badge className="mt-1 bg-rose-100 text-rose-800">{index + 1}</Badge>
                              <p className="ml-3 text-gray-600">{strength}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <p className="text-gray-600">
                            No specific strengths data available for Type {enneagramType}. Try viewing the detailed
                            profile for more information.
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
                              <Badge className="mt-1 bg-rose-100 text-rose-800">{index + 1}</Badge>
                              <p className="ml-3 text-gray-600">{weakness}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-rose-50 p-4 rounded-lg">
                          <p className="text-gray-600">
                            No specific challenges data available for Type {enneagramType}. Try viewing the detailed
                            profile for more information.
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="growth" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-rose-800 mb-4">Growth Path</h2>
                        {loading ? (
                          <div className="text-center py-4">
                            <p className="text-gray-600">Loading growth data...</p>
                          </div>
                        ) : (
                          <>
                            {typeData?.growthPath && (
                              <div className="mb-6">
                                <p className="text-gray-600 mb-4">{typeData.growthPath}</p>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {typeData?.integration && (
                                <div className="bg-rose-50 p-4 rounded-lg">
                                  <h3 className="font-semibold text-rose-700 mb-2">Integration (Growth)</h3>
                                  <p className="text-gray-600 text-sm">
                                    When healthy, Type {enneagramType} moves toward Type {typeData.integration}:
                                  </p>
                                  <p className="text-gray-600 text-sm mt-2">{typeData.integrationDescription}</p>
                                </div>
                              )}

                              {typeData?.disintegration && (
                                <div className="bg-rose-50 p-4 rounded-lg">
                                  <h3 className="font-semibold text-rose-700 mb-2">Disintegration (Stress)</h3>
                                  <p className="text-gray-600 text-sm">
                                    Under stress, Type {enneagramType} moves toward Type {typeData.disintegration}:
                                  </p>
                                  <p className="text-gray-600 text-sm mt-2">{typeData.disintegrationDescription}</p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {!loading && typeData?.growthTips && typeData.growthTips.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-rose-800 mb-3">Personal Growth Tips</h3>
                          <div className="space-y-3">
                            {typeData.growthTips.map((tip: string, index: number) => (
                              <div key={index} className="flex items-start">
                                <Badge className="mt-0.5 bg-rose-100 text-rose-800">{index + 1}</Badge>
                                <p className="ml-3 text-gray-600">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">What's Next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/enneagram" className="block">
                      <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition-colors">
                        <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                        <h4 className="font-medium text-rose-700">Learn More</h4>
                        <p className="text-sm text-gray-600 mt-1">Explore the Enneagram system in depth</p>
                      </div>
                    </Link>
                    <Link href="/visualization?type=enneagram-rings" className="block">
                      <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition-colors">
                        <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                        <h4 className="font-medium text-rose-700">Visualization</h4>
                        <p className="text-sm text-gray-600 mt-1">See the Enneagram system visualized</p>
                      </div>
                    </Link>
                    <Link href="/quiz" className="block">
                      <div className="bg-rose-50 p-4 rounded-lg text-center hover:bg-rose-100 transition-colors">
                        <Award className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                        <h4 className="font-medium text-rose-700">MBTI Test</h4>
                        <p className="text-sm text-gray-600 mt-1">Take our MBTI personality test</p>
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
