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
import { saveTestResult } from "@/lib/firebase"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const personalityType = searchParams.get("type") || "INFJ"
  const quizTime = searchParams.get("time") ? Number.parseInt(searchParams.get("time") as string) : undefined
  const [showShare, setShowShare] = useState(false)
  const { user } = useAuth()

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
            // You could add more data here like confidence scores, etc.
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
                  {personalityType === "INFJ" && "The Counselor"}
                  {personalityType === "INFP" && "The Mediator"}
                  {personalityType === "INTJ" && "The Architect"}
                  {personalityType === "INTP" && "The Logician"}
                  {personalityType === "ENFJ" && "The Protagonist"}
                  {personalityType === "ENFP" && "The Campaigner"}
                  {personalityType === "ENTJ" && "The Commander"}
                  {personalityType === "ENTP" && "The Debater"}
                  {personalityType === "ISFJ" && "The Defender"}
                  {personalityType === "ISFP" && "The Adventurer"}
                  {personalityType === "ISTJ" && "The Logistician"}
                  {personalityType === "ISTP" && "The Virtuoso"}
                  {personalityType === "ESFJ" && "The Consul"}
                  {personalityType === "ESFP" && "The Entertainer"}
                  {personalityType === "ESTJ" && "The Executive"}
                  {personalityType === "ESTP" && "The Entrepreneur"}
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
                        <p className="text-gray-600 leading-relaxed">
                          {personalityType === "INFJ" &&
                            "INFJs are creative nurturers with a strong sense of personal integrity and a drive to help others realize their potential. Creative and dedicated, they have a talent for helping others with original solutions to their personal challenges."}
                          {personalityType === "INFP" &&
                            "INFPs are imaginative idealists, guided by their own core values and beliefs. To a Mediator, possibilities are paramount; the reality of the moment is only of passing concern. They see potential for a better future, and pursue truth and meaning with their own individual flair."}
                          {personalityType === "INTJ" &&
                            "INTJs are analytical problem-solvers, eager to improve systems and processes with their innovative ideas. They have a talent for seeing possibilities for improvement, whether at work, at home, or in themselves."}
                          {personalityType === "INTP" &&
                            "INTPs are innovative inventors with an unquenchable thirst for knowledge. They are driven by a desire to understand the universe and everything in it. Logical and analytical, they excel at finding solutions to complex problems."}
                          {personalityType === "ENFJ" &&
                            "ENFJs are charismatic and inspiring leaders, able to mesmerize their listeners. They are usually idealistic, with high values and a great sense of integrity. They are natural leaders, sensitive to the needs of others and energetically dedicated to whatever cause they've decided to champion."}
                          {personalityType === "ENFP" &&
                            "ENFPs are people-centered creators with a focus on possibilities and a contagious enthusiasm for new ideas, people and activities. Energetic, warm, and passionate, ENFPs love to help other people explore their creative potential."}
                          {personalityType === "ENTJ" &&
                            "ENTJs are strategic leaders, motivated to organize change. They are quick to see inefficiency and conceptualize new solutions, and enjoy developing long-range plans to accomplish their vision. They excel at logical reasoning and are usually articulate and quick-witted."}
                          {personalityType === "ENTP" &&
                            "ENTPs are inspired innovators, motivated to find new solutions to intellectually challenging problems. They are curious and clever, and seek to understand the people, systems, and principles that surround them."}
                          {personalityType === "ISFJ" &&
                            "ISFJs are industrious caretakers, loyal to traditions and organizations. They are practical, compassionate, and caring, and are motivated to provide for others and protect them from the perils of life."}
                          {personalityType === "ISFP" &&
                            "ISFPs are gentle caretakers who live in the present moment and enjoy their surroundings with cheerful, low-key enthusiasm. They are flexible and spontaneous, and like to go with the flow to enjoy what life has to offer."}
                          {personalityType === "ISTJ" &&
                            "ISTJs are responsible organizers, driven to create and enforce order within systems and institutions. They are neat and orderly, inside and out, and tend to have a procedure for everything they do."}
                          {personalityType === "ISTP" &&
                            "ISTPs are observant artisans with an understanding of mechanics and an interest in troubleshooting. They approach their environments with a flexible logic, looking for practical solutions to the problems at hand."}
                          {personalityType === "ESFJ" &&
                            "ESFJs are conscientious helpers, sensitive to the needs of others and energetically dedicated to their responsibilities. They are highly attuned to their emotional environment and attentive to both the feelings of others and the perception others have of them."}
                          {personalityType === "ESFP" &&
                            "ESFPs are vivacious entertainers who charm and engage those around them. They are spontaneous, energetic, and fun-loving, and take pleasure in the things around them: food, clothes, nature, animals, and especially people."}
                          {personalityType === "ESTJ" &&
                            "ESTJs are hardworking traditionalists, eager to take charge in organizing projects and people. Orderly, rule-abiding, and conscientious, ESTJs like to get things done, and tend to go about projects in a systematic, methodical way."}
                          {personalityType === "ESTP" &&
                            "ESTPs are energetic thrillseekers who are at their best when putting out fires, whether literal or metaphorical. They bring a sense of dynamic energy to their interactions with others and the world around them."}
                        </p>
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
                      <div className="space-y-4">
                        {personalityType === "INFJ" && (
                          <>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Insightful</Badge>
                              <p className="ml-3 text-gray-600">
                                You have an intuitive understanding of people and situations, often knowing things
                                without being able to explain how.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Principled</Badge>
                              <p className="ml-3 text-gray-600">
                                You have strong values and integrity, and you're not easily swayed from your beliefs.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Inspiring</Badge>
                              <p className="ml-3 text-gray-600">
                                You have a talent for bringing out the best in others and helping them reach their
                                potential.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Creative</Badge>
                              <p className="ml-3 text-gray-600">
                                You have a rich inner world and can envision unique solutions to complex problems.
                              </p>
                            </div>
                          </>
                        )}
                        {/* Add strengths for other personality types here */}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="challenges" className="mt-6">
                    <div>
                      <h2 className="text-2xl font-bold text-rose-800 mb-4">Your Challenges</h2>
                      <div className="space-y-4">
                        {personalityType === "INFJ" && (
                          <>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Perfectionism</Badge>
                              <p className="ml-3 text-gray-600">
                                You may set unrealistically high standards for yourself and others, leading to
                                disappointment.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Burnout</Badge>
                              <p className="ml-3 text-gray-600">
                                Your desire to help others can lead you to neglect your own needs and become exhausted.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Overthinking</Badge>
                              <p className="ml-3 text-gray-600">
                                You may spend too much time in your head analyzing situations rather than taking action.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <Badge className="mt-1 bg-rose-100 text-rose-800">Sensitivity</Badge>
                              <p className="ml-3 text-gray-600">
                                You can be deeply affected by criticism and conflict, sometimes taking things too
                                personally.
                              </p>
                            </div>
                          </>
                        )}
                        {/* Add challenges for other personality types here */}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="careers" className="mt-6">
                    <div>
                      <h2 className="text-2xl font-bold text-rose-800 mb-4">Recommended Career Paths</h2>
                      <p className="text-gray-600 mb-6">
                        Based on your personality type, these career paths might be particularly fulfilling for you:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {personalityType === "INFJ" && (
                          <>
                            <div className="bg-rose-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-rose-700 mb-2">Counseling & Psychology</h3>
                              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Therapist</li>
                                <li>Social Worker</li>
                                <li>Psychologist</li>
                                <li>Life Coach</li>
                              </ul>
                            </div>
                            <div className="bg-rose-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-rose-700 mb-2">Education</h3>
                              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Professor</li>
                                <li>School Counselor</li>
                                <li>Special Education Teacher</li>
                              </ul>
                            </div>
                            <div className="bg-rose-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-rose-700 mb-2">Creative Fields</h3>
                              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Writer</li>
                                <li>Editor</li>
                                <li>Filmmaker</li>
                                <li>Musician</li>
                              </ul>
                            </div>
                            <div className="bg-rose-50 p-4 rounded-lg">
                              <h3 className="font-semibold text-rose-700 mb-2">Healthcare</h3>
                              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                                <li>Physician</li>
                                <li>Nurse</li>
                                <li>Alternative Medicine Practitioner</li>
                              </ul>
                            </div>
                          </>
                        )}
                        {/* Add career recommendations for other personality types here */}
                      </div>

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
