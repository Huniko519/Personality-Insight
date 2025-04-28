import Link from "next/link"
import { Brain, Users, Briefcase, BookOpen, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <div className="absolute inset-0 bg-rose-900 opacity-70"></div>
            <img
              src="/thinking-feeling-classrooms.png"
              alt="Team collaboration"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About PersonaIQ</h1>
              <p className="text-xl text-white max-w-3xl">
                Helping people understand themselves and others through the science of personality
              </p>
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Story</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-rose-700 mb-4">
                PersonaIQ was founded in 2020 by a team of psychologists, data scientists, and designers
                  passionate about making personality psychology accessible and practical for everyone.
                </p>
                <p className="text-rose-700 mb-4">
                  Our journey began when we noticed how transformative personality insights could be in people's lives -
                  from making better career choices to improving relationships and fostering personal growth.
                </p>
                <p className="text-rose-700">
                  What started as a simple personality assessment has grown into a comprehensive platform offering
                  personalized insights, career guidance, relationship compatibility analysis, and educational resources
                  about personality psychology.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src="/thinking-feeling-classrooms.png" alt="Our team" className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Approach</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
              <p className="text-rose-700 max-w-3xl mx-auto">
                PersonaIQ is based on the Myers-Briggs Type Indicator (MBTI), one of the most widely used
                personality assessments in the world, combined with modern psychological research and data science.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-rose-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-rose-800 mb-4">The Science Behind Our Assessment</h3>
                <p className="text-rose-700 mb-4">
                  The MBTI identifies 16 distinct personality types based on four dimensions of personality:
                </p>
                <ul className="list-disc list-inside space-y-2 text-rose-700 mb-6">
                  <li>
                    <strong>Extraversion (E) vs. Introversion (I):</strong> Where you focus your attention and get your
                    energy
                  </li>
                  <li>
                    <strong>Sensing (S) vs. Intuition (N):</strong> How you take in information and what you pay
                    attention to
                  </li>
                  <li>
                    <strong>Thinking (T) vs. Feeling (F):</strong> How you make decisions
                  </li>
                  <li>
                    <strong>Judging (J) vs. Perceiving (P):</strong> How you deal with the outer world
                  </li>
                </ul>
                <p className="text-rose-700">
                  While the MBTI has its critics in academic psychology, we recognize its value as a practical tool for
                  self-awareness and personal development when used appropriately.
                </p>
              </div>

              <div className="bg-rose-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-rose-800 mb-4">Our Methodology</h3>
                <p className="text-rose-700 mb-4">
                  Our assessment goes beyond traditional MBTI questionnaires by incorporating:
                </p>
                <ul className="list-disc list-inside space-y-2 text-rose-700">
                  <li>Advanced psychometric techniques to improve reliability</li>
                  <li>Machine learning algorithms that refine results based on response patterns</li>
                  <li>Nuanced scoring that recognizes the spectrum nature of personality traits</li>
                  <li>Contextual questions that account for different environments and situations</li>
                  <li>Regular updates based on the latest research in personality psychology</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Values</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
              <p className="text-rose-700 max-w-3xl mx-auto">
                These core principles guide everything we do at PersonaIQ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-rose-200 shadow-md">
                <CardHeader className="pb-2">
                  <Brain className="h-8 w-8 text-rose-600 mb-2" />
                  <CardTitle className="text-rose-800">Scientific Integrity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700">
                    We're committed to accuracy, transparency about the strengths and limitations of personality
                    assessments, and staying current with psychological research.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-rose-200 shadow-md">
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-rose-600 mb-2" />
                  <CardTitle className="text-rose-800">Empowering Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700">
                    We believe personality insights should expand possibilities, not limit them. Our goal is to help
                    people leverage their strengths while developing in all areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-rose-200 shadow-md">
                <CardHeader className="pb-2">
                  <Globe className="h-8 w-8 text-rose-600 mb-2" />
                  <CardTitle className="text-rose-800">Celebrating Diversity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700">
                    We honor the unique value of all personality types and strive to create inclusive resources that
                    respect cultural differences in personality expression.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Team</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
              <p className="text-rose-700 max-w-3xl mx-auto">Meet the passionate experts behind PersonaIQ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Founder & Chief Psychologist",
                  image: "/thinking-feeling-classrooms.png",
                  type: "INFJ",
                },
                {
                  name: "Michael Chen",
                  role: "Lead Data Scientist",
                  image: "/thinking-feeling-classrooms.png",
                  type: "INTP",
                },
                {
                  name: "Emma Rodriguez",
                  role: "UX/UI Designer",
                  image: "/thinking-feeling-classrooms.png",
                  type: "ENFP",
                },
                {
                  name: "James Wilson",
                  role: "Content Director",
                  image: "/thinking-feeling-classrooms.png",
                  type: "ENTJ",
                },
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img
                    src={member.image || "/thinking-feeling-classrooms.png"}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-rose-800">{member.name}</h3>
                    <p className="text-rose-600 mb-2">{member.role}</p>
                    <div className="inline-block bg-rose-100 px-3 py-1 rounded-full text-rose-700 text-sm">
                      {member.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-rose-600 text-white rounded-xl shadow-lg p-8 mb-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                "At PersonaIQ, our mission is to help people understand themselves and others better through
                the lens of personality type. We believe that self-awareness is the foundation of personal growth,
                effective communication, and meaningful relationships."
              </p>
              <div className="flex justify-center">
                <Link href="/quiz">
                  <Button className="bg-white text-rose-600 hover:bg-rose-100 text-lg px-8 py-6">
                    Discover Your Type
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Impact</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { icon: Users, number: "2M+", label: "Users Worldwide" },
                { icon: Award, number: "16", label: "Personality Types" },
                { icon: Briefcase, number: "500+", label: "Career Paths Analyzed" },
                { icon: BookOpen, number: "100+", label: "Research Articles" },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <stat.icon className="h-12 w-12 text-rose-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-rose-800 mb-2">{stat.number}</div>
                  <div className="text-rose-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">Ready to discover your personality type?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/quiz">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-lg px-8">
                  Take the Test
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-rose-600 text-rose-600 hover:bg-rose-50 text-lg px-8"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
