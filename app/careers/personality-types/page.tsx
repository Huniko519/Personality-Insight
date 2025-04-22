import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { personalityTypes } from "@/lib/personality-types"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PersonalityTypesCareerPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types & Careers</h1>
            <p className="text-rose-600 max-w-3xl mx-auto">
              Discover how your personality type influences your career preferences, work style, and professional
              strengths. Explore detailed career insights for each of the 16 personality types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(personalityTypes).map(([typeCode, type]) => (
              <Link href={`/careers/personality-types/${typeCode.toLowerCase()}`} key={typeCode}>
                <Card className="h-full border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-rose-800">{typeCode}</span>
                      <span className="text-sm bg-rose-100 text-rose-700 px-2 py-1 rounded-full">{type.name}</span>
                    </CardTitle>
                    <CardDescription className="text-rose-600 font-medium">{type.nickname}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-700 text-sm mb-4">{type.shortDescription}</p>
                    <div className="mt-2">
                      <h4 className="text-xs font-semibold text-rose-600 mb-1">Top Career Matches:</h4>
                      <ul className="text-xs text-rose-700 space-y-1">
                        {type.careers.slice(0, 3).map((career, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-1">•</span> {career}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Understanding Personality Types in Your Career</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-rose-700 mb-3">How Personality Influences Work Style</h3>
                <p className="text-rose-600 mb-4">
                  Your personality type influences how you communicate, solve problems, make decisions, and interact
                  with colleagues. Understanding these preferences can help you find work environments where you'll
                  naturally thrive.
                </p>
                <h3 className="text-xl font-semibold text-rose-700 mb-3">The Four Key Dimensions</h3>
                <ul className="space-y-2 text-rose-600">
                  <li>
                    <span className="font-semibold">Extraversion (E) vs. Introversion (I):</span> How you gain energy
                    and where you focus your attention
                  </li>
                  <li>
                    <span className="font-semibold">Sensing (S) vs. Intuition (N):</span> How you gather information and
                    what details you notice
                  </li>
                  <li>
                    <span className="font-semibold">Thinking (T) vs. Feeling (F):</span> How you make decisions and what
                    factors you consider
                  </li>
                  <li>
                    <span className="font-semibold">Judging (J) vs. Perceiving (P):</span> How you approach structure,
                    planning, and deadlines
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-rose-700 mb-3">Finding Your Ideal Work Environment</h3>
                <p className="text-rose-600 mb-4">
                  Each personality type has different needs in a work environment. Some thrive in collaborative, dynamic
                  settings, while others prefer quiet, independent work. Understanding your preferences can help you
                  identify environments where you'll feel energized rather than drained.
                </p>
                <h3 className="text-xl font-semibold text-rose-700 mb-3">Beyond the Type</h3>
                <p className="text-rose-600">
                  While personality type provides valuable insights, remember that individual experiences, skills, and
                  values also play crucial roles in career satisfaction. Use your personality type as a starting point
                  for exploration, not a rigid limitation. The most fulfilling careers often align with both your
                  personality preferences and your unique strengths and passions.
                </p>
              </div>
            </div>
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
