import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function EntrepreneursPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Entrepreneur Personality Types</h1>
            <p className="text-rose-600 max-w-3xl mx-auto">
              Discover how your personality type influences your entrepreneurial style, strengths, and potential
              challenges. Understanding your natural tendencies can help you build a business that leverages your unique
              abilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-rose-800 mb-4">The 5 Entrepreneur Personality Types</h2>
              <p className="text-rose-700 mb-6">
                Based on research and observation of successful business owners, we can identify five distinct
                entrepreneurial styles. Each brings unique strengths to business ownership and faces different
                challenges.
              </p>

              <Tabs defaultValue="visionary" className="mb-6">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="visionary">Visionary</TabsTrigger>
                  <TabsTrigger value="innovator">Innovator</TabsTrigger>
                  <TabsTrigger value="specialist">Specialist</TabsTrigger>
                  <TabsTrigger value="nurturer">Nurturer</TabsTrigger>
                  <TabsTrigger value="opportunist">Opportunist</TabsTrigger>
                </TabsList>

                <TabsContent value="visionary" className="bg-rose-50/50 p-4 rounded-md">
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">The Visionary Entrepreneur</h3>
                  <p className="text-rose-700 mb-3">
                    Visionaries are big-picture thinkers who excel at setting long-term goals and inspiring others with
                    their ideas. They're natural strategists who can see possibilities others miss.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Strengths:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>Strategic planning</li>
                        <li>Inspiring leadership</li>
                        <li>Seeing future trends</li>
                        <li>Building innovative systems</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Challenges:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>May overlook details</li>
                        <li>Can be impatient with implementation</li>
                        <li>Might struggle with day-to-day operations</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-rose-600 mt-3">
                    <strong>Common MBTI Types:</strong> INTJ, ENTJ, INFJ, ENFJ
                  </p>
                </TabsContent>

                <TabsContent value="innovator" className="bg-rose-50/50 p-4 rounded-md">
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">The Innovator Entrepreneur</h3>
                  <p className="text-rose-700 mb-3">
                    Innovators are creative problem-solvers who excel at developing new products, services, and
                    approaches. They're constantly generating ideas and reimagining possibilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Strengths:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>Creative thinking</li>
                        <li>Adaptability</li>
                        <li>Problem-solving</li>
                        <li>Spotting opportunities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Challenges:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>May struggle with follow-through</li>
                        <li>Can be distracted by new ideas</li>
                        <li>Might resist structure and routine</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-rose-600 mt-3">
                    <strong>Common MBTI Types:</strong> ENTP, INTP, ENFP, INFP
                  </p>
                </TabsContent>

                <TabsContent value="specialist" className="bg-rose-50/50 p-4 rounded-md">
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">The Specialist Entrepreneur</h3>
                  <p className="text-rose-700 mb-3">
                    Specialists build businesses around their specific expertise and technical skills. They excel at
                    delivering high-quality work and solving complex problems in their domain.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Strengths:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>Technical expertise</li>
                        <li>Attention to detail</li>
                        <li>Quality focus</li>
                        <li>Analytical thinking</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Challenges:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>May struggle with delegation</li>
                        <li>Can focus too narrowly</li>
                        <li>Might neglect marketing/sales</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-rose-600 mt-3">
                    <strong>Common MBTI Types:</strong> ISTJ, ISTP, INTJ, INTP
                  </p>
                </TabsContent>

                <TabsContent value="nurturer" className="bg-rose-50/50 p-4 rounded-md">
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">The Nurturer Entrepreneur</h3>
                  <p className="text-rose-700 mb-3">
                    Nurturers build businesses focused on helping others and creating supportive environments. They
                    excel at building relationships and creating loyal customer bases.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Strengths:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>Relationship building</li>
                        <li>Customer service</li>
                        <li>Team development</li>
                        <li>Creating positive culture</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Challenges:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>May avoid necessary conflict</li>
                        <li>Can struggle with tough decisions</li>
                        <li>Might prioritize others over business needs</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-rose-600 mt-3">
                    <strong>Common MBTI Types:</strong> ESFJ, ISFJ, ENFJ, INFJ
                  </p>
                </TabsContent>

                <TabsContent value="opportunist" className="bg-rose-50/50 p-4 rounded-md">
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">The Opportunist Entrepreneur</h3>
                  <p className="text-rose-700 mb-3">
                    Opportunists excel at spotting gaps in the market and moving quickly to capitalize on them. They're
                    adaptable, practical, and focused on tangible results.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Strengths:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>Quick decision-making</li>
                        <li>Adaptability</li>
                        <li>Practical problem-solving</li>
                        <li>Results orientation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-rose-700 mb-1">Challenges:</h4>
                      <ul className="list-disc list-inside text-rose-600 text-sm">
                        <li>May lack long-term vision</li>
                        <li>Can take unnecessary risks</li>
                        <li>Might prioritize short-term gains</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-rose-600 mt-3">
                    <strong>Common MBTI Types:</strong> ESTP, ESFP, ESTJ, ENTJ
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-md">
              <Image
                src="/assets/niko-hukka.png"
                alt="Entrepreneur working on business strategy"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Find Your Entrepreneurial Style</h3>
                <p className="text-rose-100 mb-4">
                  Take our personality assessment to discover your entrepreneurial strengths and potential challenges.
                </p>
                <Link href="/quiz">
                  <Button className="bg-white text-rose-800 hover:bg-rose-100">Take the Test</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">MBTI Types in Business Ownership</h2>
            <p className="text-rose-700 mb-6">
              Your Myers-Briggs personality type can provide valuable insights into your natural entrepreneurial
              tendencies, strengths, and potential blind spots. Understanding these patterns can help you build a
              business that leverages your innate abilities while developing strategies to address challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-rose-800 mb-3">Extraversion (E) vs. Introversion (I)</h3>
                <div className="bg-rose-50 p-4 rounded-md mb-6">
                  <p className="text-rose-700 mb-3">
                    <strong>Extraverted entrepreneurs</strong> often excel at networking, sales, and building business
                    relationships. They typically enjoy the social aspects of business ownership and may build teams
                    quickly.
                  </p>
                  <p className="text-rose-700">
                    <strong>Introverted entrepreneurs</strong> may prefer focused work and deeper connections with fewer
                    clients or team members. They often excel at developing expertise and creating thoughtful business
                    strategies.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-rose-800 mb-3">Sensing (S) vs. Intuition (N)</h3>
                <div className="bg-rose-50 p-4 rounded-md">
                  <p className="text-rose-700 mb-3">
                    <strong>Sensing entrepreneurs</strong> tend to build practical businesses based on proven models.
                    They excel at operational efficiency and delivering consistent quality through established
                    processes.
                  </p>
                  <p className="text-rose-700">
                    <strong>Intuitive entrepreneurs</strong> often create innovative business models or disruptive
                    products. They excel at spotting trends, envisioning possibilities, and adapting to changing
                    markets.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-rose-800 mb-3">Thinking (T) vs. Feeling (F)</h3>
                <div className="bg-rose-50 p-4 rounded-md mb-6">
                  <p className="text-rose-700 mb-3">
                    <strong>Thinking entrepreneurs</strong> typically make decisions based on logic and objective
                    analysis. They excel at strategic planning, negotiation, and maintaining focus on business metrics.
                  </p>
                  <p className="text-rose-700">
                    <strong>Feeling entrepreneurs</strong> often make decisions considering people's needs and values.
                    They excel at building loyal teams, creating positive company cultures, and connecting with
                    customers.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-rose-800 mb-3">Judging (J) vs. Perceiving (P)</h3>
                <div className="bg-rose-50 p-4 rounded-md">
                  <p className="text-rose-700 mb-3">
                    <strong>Judging entrepreneurs</strong> tend to create structured businesses with clear processes and
                    timelines. They excel at planning, meeting deadlines, and creating stable, organized operations.
                  </p>
                  <p className="text-rose-700">
                    <strong>Perceiving entrepreneurs</strong> often build flexible businesses that can adapt quickly to
                    opportunities. They excel at pivoting when needed, handling crises, and maintaining openness to new
                    possibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Building to Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-rose-700 mb-4">
                  The most successful entrepreneurs create business models that leverage their natural strengths while
                  implementing systems to address potential blind spots.
                </p>
                <ul className="list-disc list-inside text-rose-600 text-sm space-y-1">
                  <li>Design roles that play to your preferences</li>
                  <li>Create systems that support your working style</li>
                  <li>Build a brand that reflects your authentic approach</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Complementary Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-rose-700 mb-4">
                  Many successful businesses are built by partners with complementary personality types who balance each
                  other's strengths and weaknesses.
                </p>
                <ul className="list-disc list-inside text-rose-600 text-sm space-y-1">
                  <li>Seek partners with different perspectives</li>
                  <li>Value the strengths of opposite preferences</li>
                  <li>Develop clear communication about differences</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-rose-200 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-rose-800">Strategic Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-rose-700 mb-4">
                  Building a well-rounded team means hiring people who excel in areas where you may have blind spots or
                  less natural interest.
                </p>
                <ul className="list-disc list-inside text-rose-600 text-sm space-y-1">
                  <li>Identify roles that complement your style</li>
                  <li>Appreciate diverse approaches in your team</li>
                  <li>Create culture that values different strengths</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700 mr-4">Take the Personality Test</Button>
            </Link>
            <Link href="/careers/personality-types">
              <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                Explore Career Profiles
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
