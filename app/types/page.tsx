import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { personalityTypes } from "@/lib/personality-types"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TypesPage() {
  // Group types by category
  const analysts = ["INTJ", "INTP", "ENTJ", "ENTP"]
  const diplomats = ["INFJ", "INFP", "ENFJ", "ENFP"]
  const sentinels = ["ISTJ", "ISFJ", "ESTJ", "ESFJ"]
  const explorers = ["ISTP", "ISFP", "ESTP", "ESFP"]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types</h1>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Explore the 16 personality types based on the Myers-Briggs Type Indicator (MBTI)
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">Analysts (NT)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analysts.map((typeCode) => {
                const type = personalityTypes[typeCode]
                return (
                  <Link href={`/types/${typeCode}`} key={typeCode}>
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm hover:bg-white/100">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-rose-800">{typeCode}</span>
                          <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full">Analyst</span>
                        </CardTitle>
                        <CardDescription className="font-medium text-rose-700">{type.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rose-600 line-clamp-3">{type.shortDescription}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-rose-500 italic">{type.nickname}</p>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">Diplomats (NF)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diplomats.map((typeCode) => {
                const type = personalityTypes[typeCode]
                return (
                  <Link href={`/types/${typeCode}`} key={typeCode}>
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm hover:bg-white/100">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-rose-800">{typeCode}</span>
                          <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full">Diplomat</span>
                        </CardTitle>
                        <CardDescription className="font-medium text-rose-700">{type.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rose-600 line-clamp-3">{type.shortDescription}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-rose-500 italic">{type.nickname}</p>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">Sentinels (SJ)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sentinels.map((typeCode) => {
                const type = personalityTypes[typeCode]
                return (
                  <Link href={`/types/${typeCode}`} key={typeCode}>
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm hover:bg-white/100">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-rose-800">{typeCode}</span>
                          <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full">Sentinel</span>
                        </CardTitle>
                        <CardDescription className="font-medium text-rose-700">{type.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rose-600 line-clamp-3">{type.shortDescription}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-rose-500 italic">{type.nickname}</p>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">Explorers (SP)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {explorers.map((typeCode) => {
                const type = personalityTypes[typeCode]
                return (
                  <Link href={`/types/${typeCode}`} key={typeCode}>
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow border-rose-200 bg-white/90 backdrop-blur-sm hover:bg-white/100">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span className="text-rose-800">{typeCode}</span>
                          <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full">Explorer</span>
                        </CardTitle>
                        <CardDescription className="font-medium text-rose-700">{type.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-rose-600 line-clamp-3">{type.shortDescription}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-rose-500 italic">{type.nickname}</p>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              })}
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
