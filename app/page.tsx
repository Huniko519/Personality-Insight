import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Brain, Briefcase } from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <>
      <HeaderWrapper />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rose-50 to-rose-100 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6">Discover Your Personality Type</h1>
                <p className="text-xl text-rose-700 mb-8">
                  Gain valuable insights into your strengths, challenges, and potential with our comprehensive
                  personality assessment.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/quiz">
                    <Button className="bg-rose-600 hover:bg-rose-700 text-lg px-6 py-3 h-auto">
                      Take the Test
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/types">
                    <Button
                      variant="outline"
                      className="border-rose-600 text-rose-600 hover:bg-rose-50 text-lg px-6 py-3 h-auto"
                    >
                      Explore Types
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/vibrant-personality-spectrum.png"
                  alt="Personality Type Wheel"
                  className="rounded-xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rose-800 mb-4">Understand Yourself Better</h2>
              <p className="text-xl text-rose-700 max-w-3xl mx-auto">
                Our personality assessment provides deep insights into your psychological preferences and how they shape
                your life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-rose-50 rounded-xl p-6 text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Brain className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-rose-800 mb-3">Cognitive Functions</h3>
                <p className="text-rose-700">
                  Understand how you process information, make decisions, and interact with the world around you.
                </p>
              </div>

              <div className="bg-rose-50 rounded-xl p-6 text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-rose-800 mb-3">Relationship Insights</h3>
                <p className="text-rose-700">
                  Discover how your personality type influences your relationships and communication style.
                </p>
              </div>

              <div className="bg-rose-50 rounded-xl p-6 text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Briefcase className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-rose-800 mb-3">Career Guidance</h3>
                <p className="text-rose-700">
                  Find career paths and work environments where your natural strengths can shine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Entrepreneur Section */}
        <section className="py-16 px-4 bg-rose-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-rose-100 text-rose-700 px-4 py-1 rounded-full mb-4">New Feature</div>
                <h2 className="text-3xl font-bold text-rose-800 mb-4">Entrepreneur Personality Types</h2>
                <p className="text-xl text-rose-700 mb-6">
                  Discover how your personality type influences your entrepreneurial style, strengths, and potential
                  challenges in business.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-rose-700">Identify your entrepreneurial strengths</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-rose-700">Understand your business leadership style</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-rose-700">Find business models that align with your type</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-rose-500">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-rose-700">Learn strategies to overcome your challenges</p>
                  </li>
                </ul>
                <Link href="/entrepreneurs">
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Explore Entrepreneur Types
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <img
                  src="/focused-founder.png"
                  alt="Entrepreneur Types"
                  className="rounded-xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rose-800 mb-4">What Our Users Say</h2>
              <p className="text-xl text-rose-700 max-w-3xl mx-auto">
                Thousands of people have gained valuable insights through our personality assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-rose-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rose-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-rose-800">Sarah J.</h4>
                    <p className="text-rose-600 text-sm">INFJ</p>
                  </div>
                </div>
                <p className="text-rose-700">
                  "This assessment helped me understand why I approach problems the way I do. The career suggestions
                  were spot on and helped me find a job that truly fits my personality."
                </p>
              </div>

              <div className="bg-rose-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rose-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-rose-800">Michael T.</h4>
                    <p className="text-rose-600 text-sm">ENTJ</p>
                  </div>
                </div>
                <p className="text-rose-700">
                  "The entrepreneur insights were incredibly valuable for my business. I now understand my leadership
                  style better and have built a team that complements my strengths and weaknesses."
                </p>
              </div>

              <div className="bg-rose-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rose-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-rose-800">Aisha K.</h4>
                    <p className="text-rose-600 text-sm">ISFP</p>
                  </div>
                </div>
                <p className="text-rose-700">
                  "The relationship insights helped me understand patterns in my interactions with others. I've improved
                  my communication with my partner and colleagues significantly."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-rose-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Personality Type?</h2>
            <p className="text-xl mb-8">
              Take our comprehensive assessment and gain valuable insights into your psychological preferences,
              strengths, and potential.
            </p>
            <Link href="/quiz">
              <Button className="bg-white text-rose-600 hover:bg-rose-100 text-lg px-8 py-3 h-auto">
                Start the Test Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
