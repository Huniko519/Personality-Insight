"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  getPersonalityTypeByCode,
  getCareerDataForType,
  getDevStrategiesForType,
  getCommunicationTipsForType,
} from "@/lib/firebase"

interface CareerContent {
  workEnvironment: string
  strengths: string[]
  challenges: string[]
  growthAreas: string
  leadershipStyle: string
  teamDynamics: string
}

export default function TypeCareerPage() {
  const params = useParams()
  const typeCode = (params.type as string).toUpperCase()

  const [personalityType, setPersonalityType] = useState<any>(null)
  const [careerContent, setCareerContent] = useState<CareerContent | null>(null)
  const [devStrategies, setDevStrategies] = useState<string[]>([])
  const [communicationTips, setCommunicationTips] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Fetch personality type data
        const type = await getPersonalityTypeByCode(typeCode)
        if (!type) {
          console.error(`Personality type ${typeCode} not found`)
          setError(true)
          return
        }

        setPersonalityType(type)

        // Fetch career-specific data
        const careerData = await getCareerDataForType(typeCode)
        if (careerData) {
          setCareerContent(careerData)
        } else {
          // Set default values if no data found
          setCareerContent({
            workEnvironment:
              "You thrive in environments that align with your personality preferences, values, and working style.",
            strengths: [],
            challenges: [],
            growthAreas: "Focus on developing complementary skills that balance your natural preferences.",
            leadershipStyle:
              "Your leadership style is influenced by your personality preferences, drawing on your natural strengths.",
            teamDynamics:
              "In team settings, your personality type influences how you collaborate, communicate, and contribute to group efforts.",
          })
        }

        // Fetch development strategies
        const strategies = await getDevStrategiesForType(typeCode)
        setDevStrategies(strategies)

        // Fetch communication tips
        const tips = await getCommunicationTipsForType(typeCode)
        setCommunicationTips(tips)
      } catch (error) {
        console.error(`Error fetching data for ${typeCode}:`, error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [typeCode])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rose-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-rose-600">Loading personality type data...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !personalityType || !careerContent) {
    notFound()
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/careers/personality-types">
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
            <h1 className="text-4xl font-bold text-rose-800 mb-2">{typeCode} Careers</h1>
            <h2 className="text-2xl font-semibold text-rose-700">{personalityType.name}</h2>
            <p className="text-rose-600 mt-2">{personalityType.nickname}</p>
          </div>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Career Overview</TabsTrigger>
              <TabsTrigger value="strengths">Professional Strengths</TabsTrigger>
              <TabsTrigger value="development">Career Development</TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md border border-rose-100"
            >
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Career Profile: {typeCode}</h3>
              <p className="mb-6 text-rose-700">{personalityType.description}</p>

              <h4 className="font-semibold text-rose-800 mb-3">Ideal Work Environment</h4>
              <p className="mb-6 text-rose-700">{careerContent.workEnvironment}</p>

              <h4 className="font-semibold text-rose-800 mb-3">Recommended Career Paths</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {personalityType.careers.map((career: string, index: number) => (
                  <div key={index} className="bg-rose-50 p-3 rounded-md">
                    <p className="text-rose-700">{career}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-rose-800 mb-3">Famous {typeCode}s in Their Careers</h4>
              <p className="text-rose-700 mb-2">
                These well-known individuals share your personality type and have excelled in their fields:
              </p>
              <div className="flex flex-wrap gap-2">
                {personalityType.famousPeople.map((person: string, index: number) => (
                  <span key={index} className="bg-rose-100 px-3 py-1 rounded-full text-rose-700">
                    {person}
                  </span>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="strengths"
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md border border-rose-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">Professional Strengths</h3>
                  <ul className="space-y-3">
                    {personalityType.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
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

                  <h3 className="text-xl font-semibold text-rose-800 mt-8 mb-4">Leadership Style</h3>
                  <p className="text-rose-700 mb-4">{careerContent.leadershipStyle}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-4">Workplace Challenges</h3>
                  <ul className="space-y-3">
                    {personalityType.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-rose-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
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

                  <h3 className="text-xl font-semibold text-rose-800 mt-8 mb-4">Team Dynamics</h3>
                  <p className="text-rose-700 mb-4">{careerContent.teamDynamics}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="development"
              className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md border border-rose-100"
            >
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Career Development for {typeCode}s</h3>

              <div className="mb-8">
                <h4 className="font-semibold text-rose-800 mb-3">Growth Opportunities</h4>
                <p className="text-rose-700 mb-4">{careerContent.growthAreas}</p>

                <div className="bg-rose-50 p-4 rounded-md">
                  <h5 className="font-semibold text-rose-800 mb-2">Development Strategies</h5>
                  <ul className="list-disc list-inside text-rose-700 space-y-2">
                    {devStrategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-rose-800 mb-3">Communication in the Workplace</h4>
                <p className="text-rose-700 mb-4">
                  {personalityType.relationships?.communication ||
                    "Effective communication is essential for career success."}
                </p>

                <div className="bg-rose-50 p-4 rounded-md">
                  <h5 className="font-semibold text-rose-800 mb-2">Communication Tips</h5>
                  <ul className="list-disc list-inside text-rose-700 space-y-2">
                    {communicationTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-rose-800 mb-3">Long-term Career Satisfaction</h4>
                <p className="text-rose-700 mb-4">
                  For long-term career satisfaction, {typeCode}s should seek roles that align with their core values:
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {personalityType.values?.map((value: string, index: number) => (
                    <span key={index} className="bg-rose-100 px-3 py-1 rounded-full text-rose-700">
                      {value}
                    </span>
                  ))}
                </div>

                <p className="text-rose-700">
                  Remember that while your personality type provides valuable insights, your individual experiences,
                  skills, and interests also play crucial roles in finding fulfilling work. Use this information as a
                  starting point for exploration rather than a limitation.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mb-8">
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700 mr-4">Take the Personality Test</Button>
            </Link>
            <Link href="/careers">
              <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                Explore Career Matches
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
