import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Brain, Users, Briefcase, FileText, BarChart } from "lucide-react"

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50"
        >
          Skip to content
        </a>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-100 to-rose-200 py-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-rose-900 mb-6">Discover Your True Self</h1>
              <p className="text-xl text-rose-700 mb-8">
                Unlock insights about your personality, strengths, and potential with our scientifically designed
                assessment
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/quiz">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-lg px-8 py-6">
                    Start Free Test
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/types">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-rose-600 text-rose-600 hover:bg-rose-50 text-lg px-8 py-6"
                  >
                    Explore Types
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div id="main-content" className="bg-white py-16">
          <div className="container mx-auto px-4">
            {/* Features Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-rose-800 mb-4">Discover What Makes You Unique</h2>
                <p className="text-lg text-rose-600 max-w-2xl mx-auto">
                  Our personality assessment provides deep insights into your natural preferences and behaviors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <Brain className="h-8 w-8 text-rose-600 mb-2" />
                    <CardTitle className="text-rose-800">Understand Yourself</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600">
                      Gain insights into your thinking style, emotional patterns, and natural strengths through our
                      comprehensive assessment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <Users className="h-8 w-8 text-rose-600 mb-2" />
                    <CardTitle className="text-rose-800">Improve Relationships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600">
                      Learn how to better communicate and connect with others by understanding different personality
                      types.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <Briefcase className="h-8 w-8 text-rose-600 mb-2" />
                    <CardTitle className="text-rose-800">Find Career Paths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600">
                      Discover career options that align with your personality type and natural strengths for greater
                      satisfaction.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* New Features Highlight */}
            <section className="mb-20 bg-rose-50 py-12 px-6 rounded-xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-rose-800 mb-4">Powerful New Features</h2>
                <p className="text-lg text-rose-600 max-w-2xl mx-auto">
                  We've added exciting new tools to help you get the most from your personality insights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Briefcase className="h-10 w-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Career Matching</h3>
                  <p className="text-rose-600 mb-4">
                    Find the perfect career path based on your personality type and strengths.
                  </p>
                  <Link href="/careers" className="text-rose-700 font-medium hover:text-rose-900 flex items-center">
                    Explore Careers <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <FileText className="h-10 w-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Printable Reports</h3>
                  <p className="text-rose-600 mb-4">
                    Generate detailed PDF reports with personalized insights and recommendations.
                  </p>
                  <Link href="/reports" className="text-rose-700 font-medium hover:text-rose-900 flex items-center">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <BarChart className="h-10 w-10 text-rose-600 mb-4" />
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">Type Visualization</h3>
                  <p className="text-rose-600 mb-4">
                    Explore interactive visualizations of personality types and their relationships.
                  </p>
                  <Link
                    href="/visualization"
                    className="text-rose-700 font-medium hover:text-rose-900 flex items-center"
                  >
                    View Visualization <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-rose-800 mb-4">What Our Users Say</h2>
                <p className="text-lg text-rose-600 max-w-2xl mx-auto">
                  Thousands of people have gained valuable insights through our personality assessment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-rose-200 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-semibold mr-3">
                        JD
                      </div>
                      <div>
                        <p className="font-medium text-rose-800">Jessica D.</p>
                        <p className="text-sm text-rose-600">Marketing Director</p>
                      </div>
                    </div>
                    <p className="text-rose-700 italic">
                      "The career matching feature helped me find a role that truly aligns with my strengths. I'm much
                      happier in my new position!"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-semibold mr-3">
                        MT
                      </div>
                      <div>
                        <p className="font-medium text-rose-800">Michael T.</p>
                        <p className="text-sm text-rose-600">Software Engineer</p>
                      </div>
                    </div>
                    <p className="text-rose-700 italic">
                      "The detailed report gave me insights about myself I never realized. It's helped me communicate
                      better with my team."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 font-semibold mr-3">
                        SL
                      </div>
                      <div>
                        <p className="font-medium text-rose-800">Sarah L.</p>
                        <p className="text-sm text-rose-600">Teacher</p>
                      </div>
                    </div>
                    <p className="text-rose-700 italic">
                      "I've taken many personality tests, but this one provided the most accurate and helpful insights
                      for my personal growth."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gradient-to-r from-rose-100 to-rose-200 py-16 px-4 rounded-xl">
              <h2 className="text-3xl font-bold text-rose-800 mb-4">Ready to Discover Your Personality Type?</h2>
              <p className="text-lg text-rose-700 mb-8 max-w-2xl mx-auto">
                Take our free assessment and gain valuable insights about yourself in just 10 minutes
              </p>
              <Link href="/quiz">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-lg px-8 py-6">
                  Start Free Test
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
