import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { personalityTypes } from "@/lib/personality-types"
import Header from "@/components/header"
import Footer from "@/components/footer"

export function generateStaticParams() {
  return Object.keys(personalityTypes).map((type) => ({
    type,
  }))
}

export default function TypePage({ params }: { params: { type: string } }) {
  const typeCode = params.type.toUpperCase()
  const personalityType = personalityTypes[typeCode]

  if (!personalityType) {
    notFound()
  }

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
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strengths">Strengths</TabsTrigger>
              <TabsTrigger value="weaknesses">Challenges</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">The {personalityType.name}</h3>
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
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Recommended Careers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalityType.careers.map((career, index) => (
                  <div key={index} className="bg-rose-50 p-3 rounded-md">
                    <p className="text-rose-700">{career}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="relationships" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-rose-800 mb-4">Relationships</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">Communication Style</h4>
                  <p className="text-rose-700">{personalityType.relationships.communication}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">As Friends</h4>
                  <p className="text-rose-700">{personalityType.relationships.asFriends}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">As Partners</h4>
                  <p className="text-rose-700">{personalityType.relationships.asPartners}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-800 mb-2">Best Matches</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {personalityType.compatibility.best.map((type, index) => (
                      <Link href={`/types/${type}`} key={index}>
                        <div className="bg-rose-100 px-3 py-1 rounded-full text-rose-700 hover:bg-rose-200 transition-colors">
                          {type}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
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
                <CardTitle className="text-xl text-rose-800">Cognitive Functions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalityType.cognitiveFunctions.map((func, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index < 2 ? "bg-rose-100 text-rose-700" : "bg-rose-50 text-rose-600"}`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-rose-700 font-medium">{func.name}</p>
                        <p className="text-rose-600 text-sm">{func.description}</p>
                      </div>
                    </div>
                  ))}
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
