"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { personalityTypes } from "@/lib/personality-types"

export default function PersonalityTypesPage() {
  // Convert the personalityTypes object to an array with code included
  const typesArray = Object.entries(personalityTypes).map(([code, type]) => ({
    code,
    name: type.name,
    nickname: type.nickname,
    shortDescription: type.shortDescription,
  }))

  // Group personality types by category
  const analysts = typesArray.filter((type) => ["INTJ", "INTP", "ENTJ", "ENTP"].includes(type.code))
  const diplomats = typesArray.filter((type) => ["INFJ", "INFP", "ENFJ", "ENFP"].includes(type.code))
  const sentinels = typesArray.filter((type) => ["ISTJ", "ISFJ", "ESTJ", "ESFJ"].includes(type.code))
  const explorers = typesArray.filter((type) => ["ISTP", "ISFP", "ESTP", "ESFP"].includes(type.code))

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types</h1>
            <p className="text-rose-700 text-lg mb-6">
              Explore the 16 personality types and discover their unique traits, strengths, and challenges
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/types/overview">
                <Button variant="outline" className="border-rose-600 text-rose-700 hover:bg-rose-100 w-full sm:w-auto">
                  High-Level Overview
                </Button>
              </Link>
              <Link href="/quiz">
                <Button className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto">Take the Personality Test</Button>
              </Link>
            </div>
          </div>

          {/* Analysts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 border-b border-rose-200 pb-2">Analysts (NT)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analysts.map((type) => (
                <Link href={`/types/${type.code}`} key={type.code}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-rose-800">{type.code}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-rose-700 mb-2">{type.name}</h3>
                      <p className="text-rose-600 text-sm">{type.nickname}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Diplomats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 border-b border-rose-200 pb-2">Diplomats (NF)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diplomats.map((type) => (
                <Link href={`/types/${type.code}`} key={type.code}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-rose-800">{type.code}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-rose-700 mb-2">{type.name}</h3>
                      <p className="text-rose-600 text-sm">{type.nickname}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sentinels */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 border-b border-rose-200 pb-2">Sentinels (SJ)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sentinels.map((type) => (
                <Link href={`/types/${type.code}`} key={type.code}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-rose-800">{type.code}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-rose-700 mb-2">{type.name}</h3>
                      <p className="text-rose-600 text-sm">{type.nickname}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Explorers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 border-b border-rose-200 pb-2">Explorers (SP)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {explorers.map((type) => (
                <Link href={`/types/${type.code}`} key={type.code}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-rose-800">{type.code}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-rose-700 mb-2">{type.name}</h3>
                      <p className="text-rose-600 text-sm">{type.nickname}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

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
