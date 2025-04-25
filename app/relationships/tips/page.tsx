import Link from "next/link"
import { Heart, ArrowRight, Search, Lightbulb, MessageCircle, Zap } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RelationshipTipsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 mb-4">
              Relationship Tips by Personality Type
            </h1>
            <div className="h-1 w-32 bg-rose-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-rose-800 max-w-3xl mx-auto">
              Practical advice for navigating relationships with different personality types
            </p>
          </div>

          <div className="prose prose-rose max-w-none mb-12">
            <p className="text-lg leading-relaxed">
              Understanding personality differences can transform your relationships. Whether you're dealing with a
              romantic partner, family member, friend, or colleague, these tips will help you navigate the unique
              dynamics created by different personality types.
            </p>

            <div className="bg-rose-100 rounded-xl p-6 my-8 shadow-sm border border-rose-200">
              <p className="text-rose-900 font-medium text-lg italic">
                "The key to successful relationships isn't finding someone exactly like you, but understanding and
                appreciating your differences. When you recognize how personality influences behavior, you can transform
                potential conflicts into opportunities for growth."
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-rose-100 p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 flex items-center">
              <Heart className="h-6 w-6 text-rose-600 mr-2" />
              General Relationship Tips
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-rose-50 rounded-lg p-6 border border-rose-100">
                <h3 className="text-xl font-semibold text-rose-800 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 text-rose-600 mr-2" />
                  For All Relationships
                </h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>Recognize that differences in behavior often stem from personality, not intent</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>Appreciate the strengths that each personality type brings to the relationship</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>Communicate in a way that respects the other person's preferences</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>Be willing to adapt your approach when interacting with different types</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>Remember that all types can have successful relationships with proper understanding</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50 rounded-lg p-6 border border-rose-100">
                <h3 className="text-xl font-semibold text-rose-800 mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 text-rose-600 mr-2" />
                  Communication Strategies
                </h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>With Thinking types: Be direct, logical, and focus on problem-solving</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>With Feeling types: Acknowledge emotions and show empathy before solutions</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>With Sensing types: Provide specific details and practical examples</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>With Intuitive types: Discuss possibilities and the bigger picture</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>With Judging types: Respect their need for closure and planning</span>
                  </li>
                  <li className="flex">
                    <span className="text-rose-500 mr-2">•</span>
                    <span>With Perceiving types: Allow flexibility and spontaneity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-rose-100 p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 flex items-center">
              <Zap className="h-6 w-6 text-rose-600 mr-2" />
              Tips by Relationship Type
            </h2>

            <Tabs defaultValue="romantic">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="romantic">Romantic</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="work">Work</TabsTrigger>
              </TabsList>

              <TabsContent value="romantic" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">For Introverts with Extraverts</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-rose-700 mb-2">If you're the Introvert:</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Communicate your need for alone time clearly</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Try to participate in social activities occasionally</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Suggest smaller gatherings as a compromise</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Appreciate your partner's ability to connect with others</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-rose-700 mb-2">If you're the Extravert:</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Respect your partner's need for quiet time</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Don't take their need for space personally</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Plan social activities in advance</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Value the depth your partner brings to conversations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">For Thinking with Feeling Types</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-rose-700 mb-2">If you're the Thinking type:</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Express appreciation and affection regularly</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Acknowledge emotions before offering solutions</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Be mindful of how your directness might be perceived</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Value your partner's empathy and emotional intelligence</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-rose-700 mb-2">If you're the Feeling type:</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Try not to take logical analysis as personal criticism</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Appreciate your partner's objective perspective</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Be clear about when you need emotional support vs. solutions</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Recognize that direct communication is often a sign of respect</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">For Judging with Perceiving Types</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-rose-700 mb-2">If you're the Judging type:</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Build flexibility into your plans</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Embrace spontaneity occasionally</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Communicate your need for structure</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Appreciate your partner's adaptability</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-rose-700 mb-2">If you're the Perceiving type:</h4>
                        <ul className="space-y-2">
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Respect deadlines and commitments</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Communicate when plans change</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Recognize your partner's need for closure</span>
                          </li>
                          <li className="flex">
                            <span className="text-rose-500 mr-2">•</span>
                            <span>Value the structure your partner brings</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="family" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Parent-Child Relationships</h3>
                    <div className="space-y-4">
                      <p>
                        When parents and children have different personality types, understanding these differences can
                        significantly improve family dynamics:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Recognize that your child's behavior may be a reflection of their personality type, not
                            defiance
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Adapt your parenting style to complement your child's natural preferences</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Help children understand their own preferences and how they differ from others in the family
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Create family routines that respect both structure-seeking and flexibility-seeking members
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Sibling Relationships</h3>
                    <div className="space-y-4">
                      <p>
                        Siblings often have different personality types, which can lead to both conflict and
                        complementary strengths:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Help siblings understand and appreciate each other's different approaches</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Encourage siblings to leverage their different strengths when working together</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Teach conflict resolution strategies that account for different communication styles
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Avoid comparing siblings based on traits that may be influenced by personality type
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Extended Family Dynamics</h3>
                    <div className="space-y-4">
                      <p>Extended family gatherings can be challenging when multiple personality types interact:</p>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Plan family activities that appeal to both extraverted and introverted family members
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Create spaces for both structured activities and flexible, spontaneous interaction
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Respect different communication styles during family discussions and decision-making
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Acknowledge that family traditions may resonate differently with different personality types
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="work" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Team Dynamics</h3>
                    <div className="space-y-4">
                      <p>Understanding personality types can transform workplace team dynamics:</p>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Assign tasks based on natural strengths related to personality type</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Create diverse teams with complementary personality types</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Adapt communication styles when addressing different team members</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Recognize that conflict often stems from different approaches, not bad intentions</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Manager-Employee Relationships</h3>
                    <div className="space-y-4">
                      <p>Effective managers adapt their leadership style to different personality types:</p>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Provide detailed instructions for Sensing types, big-picture context for Intuitive types
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Give direct feedback to Thinking types, constructive feedback to Feeling types</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>Set clear deadlines for Perceiving types, provide autonomy for Judging types</span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Create quiet work environments for Introverts, collaborative spaces for Extraverts
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Client Relationships</h3>
                    <div className="space-y-4">
                      <p>
                        Adapting to your clients' personality types can significantly improve business relationships:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Tailor presentations to highlight data for Thinking types, people impact for Feeling types
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Provide detailed timelines for Judging types, flexible options for Perceiving types
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Keep meetings focused and efficient for Introverts, allow discussion time for Extraverts
                          </span>
                        </li>
                        <li className="flex">
                          <span className="text-rose-500 mr-2">•</span>
                          <span>
                            Present practical applications for Sensing types, future possibilities for Intuitive types
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-rose-100 p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 flex items-center">
              <Search className="h-6 w-6 text-rose-600 mr-2" />
              Find Tips for Specific Type Combinations
            </h2>

            <p className="mb-6 text-gray-700">
              Looking for advice on how to navigate a relationship with a specific personality type? Check out our
              compatibility tool to get personalized tips for any type combination.
            </p>

            <div className="flex justify-center">
              <Link
                href="/relationships/compatibility"
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
              >
                Go to Compatibility Chart
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Case Studies & Real Examples</h2>
            <p className="mb-6">
              Explore real-world examples of how different personality type combinations navigate relationships,
              including their unique dynamics, challenges, and strategies for success.
            </p>
            <Link
              href="/relationships/case-studies"
              className="inline-flex items-center bg-white text-rose-700 font-medium py-2 px-4 rounded-lg hover:bg-rose-50 transition-colors"
            >
              View Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
