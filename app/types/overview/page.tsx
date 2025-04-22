"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllPersonalityTypes } from "@/lib/personality-types"

export default function PersonalityTypesOverviewPage() {
  const allTypes = getAllPersonalityTypes()

  // Group personality types by category
  const analysts = allTypes.filter((type) => ["INTJ", "INTP", "ENTJ", "ENTP"].includes(type.code))
  const diplomats = allTypes.filter((type) => ["INFJ", "INFP", "ENFJ", "ENFP"].includes(type.code))
  const sentinels = allTypes.filter((type) => ["ISTJ", "ISFJ", "ESTJ", "ESFJ"].includes(type.code))
  const explorers = allTypes.filter((type) => ["ISTP", "ISFP", "ESTP", "ESFP"].includes(type.code))

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types Overview</h1>
            <p className="text-rose-700 text-lg mb-6">
              A comprehensive look at the four temperaments and how they shape our personalities
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/types">
                <Button variant="outline" className="border-rose-600 text-rose-700 hover:bg-rose-100 w-full sm:w-auto">
                  View All Types
                </Button>
              </Link>
              <Link href="/quiz">
                <Button className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto">Take the Personality Test</Button>
              </Link>
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Understanding the 16 Personality Types</h2>
            <p className="text-rose-700 mb-4">
              The 16 personality types are based on four key dichotomies that describe how we interact with the world:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="border-rose-200 bg-white/90">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Extraversion (E) vs. Introversion (I)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-600">
                    Where you focus your attention and get your energy — from the outer world of people and activities
                    or your inner world of ideas and impressions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-rose-200 bg-white/90">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Sensing (S) vs. Intuition (N)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-600">
                    How you take in information — focusing on what's real and actual or preferring patterns and
                    possibilities.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-rose-200 bg-white/90">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Thinking (T) vs. Feeling (F)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-600">
                    How you make decisions — based on objective logic and consistency or values and how actions affect
                    others.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-rose-200 bg-white/90">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Judging (J) vs. Perceiving (P)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-600">
                    How you deal with the outer world — preferring structure and firm decisions or remaining flexible
                    and adaptable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analysts */}
          <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Analysts (NT)</h2>
            <p className="text-rose-700 mb-6">
              Analysts are rational and strategic thinkers who value knowledge, competence, and logic. They are driven
              by a desire to understand complex systems and often excel in fields that require innovation and strategic
              planning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysts.map((type) => (
                <Card key={type.code} className="border-rose-200 bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-rose-800">
                      <Link href={`/types/${type.code}`} className="hover:underline">
                        {type.code}: {type.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600 font-medium mb-2">{type.nickname}</p>
                    <p className="text-rose-600 text-sm">{type.shortDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Diplomats */}
          <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Diplomats (NF)</h2>
            <p className="text-rose-700 mb-6">
              Diplomats are idealistic and empathetic individuals who value authenticity, growth, and harmony. They are
              driven by a desire to help others and often excel in fields that involve understanding people and
              facilitating personal development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diplomats.map((type) => (
                <Card key={type.code} className="border-rose-200 bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-rose-800">
                      <Link href={`/types/${type.code}`} className="hover:underline">
                        {type.code}: {type.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600 font-medium mb-2">{type.nickname}</p>
                    <p className="text-rose-600 text-sm">{type.shortDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sentinels */}
          <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Sentinels (SJ)</h2>
            <p className="text-rose-700 mb-6">
              Sentinels are practical and dutiful individuals who value security, stability, and tradition. They are
              driven by a desire to create order and often excel in fields that require organization, reliability, and
              attention to detail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sentinels.map((type) => (
                <Card key={type.code} className="border-rose-200 bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-rose-800">
                      <Link href={`/types/${type.code}`} className="hover:underline">
                        {type.code}: {type.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600 font-medium mb-2">{type.nickname}</p>
                    <p className="text-rose-600 text-sm">{type.shortDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Explorers */}
          <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Explorers (SP)</h2>
            <p className="text-rose-700 mb-6">
              Explorers are spontaneous and versatile individuals who value freedom, variety, and hands-on experience.
              They are driven by a desire to live in the moment and often excel in fields that require adaptability,
              resourcefulness, and practical problem-solving.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {explorers.map((type) => (
                <Card key={type.code} className="border-rose-200 bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-rose-800">
                      <Link href={`/types/${type.code}`} className="hover:underline">
                        {type.code}: {type.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-600 font-medium mb-2">{type.nickname}</p>
                    <p className="text-rose-600 text-sm">{type.shortDescription}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Discover Your Personality Type</h2>
            <p className="text-rose-700 mb-6">
              Take our comprehensive personality assessment to find out which of the 16 types matches your natural
              preferences and tendencies.
            </p>
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
