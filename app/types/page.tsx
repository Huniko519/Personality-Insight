"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getAllPersonalityTypes } from "@/lib/firebase"

export default function TypesPage() {
  const [personalityTypes, setPersonalityTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPersonalityTypes() {
      try {
        const types = await getAllPersonalityTypes()
        setPersonalityTypes(types)
      } catch (error) {
        console.error("Error fetching personality types:", error)
        setPersonalityTypes([])
      } finally {
        setLoading(false)
      }
    }

    fetchPersonalityTypes()
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rose-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-rose-600">Loading personality types...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Types</h1>
            <p className="text-xl text-rose-600 max-w-3xl mx-auto">
              Explore the 16 personality types and discover the unique characteristics, strengths, and potential
              challenges of each type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {personalityTypes.map((type) => (
              <Link href={`/types/${type.code.toLowerCase()}`} key={type.code}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-rose-800">{type.code}</h2>
                      <div className="bg-rose-100 h-10 w-10 rounded-full flex items-center justify-center">
                        <span className="text-rose-600 font-medium">{type.code.charAt(0)}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-rose-700 mb-2">{type.name}</h3>
                    <p className="text-rose-600 mb-4 line-clamp-2">{type.shortDescription || type.nickname}</p>
                    <div className="text-rose-500 text-sm">View details →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">Understanding the Type Code</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-rose-50 p-4 rounded-md">
                <h3 className="font-semibold text-rose-800 mb-2">Extraversion (E) vs. Introversion (I)</h3>
                <p className="text-rose-600">
                  Where you focus your attention and get your energy — the outer world of people and activities or your
                  inner world of ideas and impressions.
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-md">
                <h3 className="font-semibold text-rose-800 mb-2">Sensing (S) vs. Intuition (N)</h3>
                <p className="text-rose-600">
                  How you take in information — focusing on what's real and actual or preferring patterns and
                  possibilities.
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-md">
                <h3 className="font-semibold text-rose-800 mb-2">Thinking (T) vs. Feeling (F)</h3>
                <p className="text-rose-600">
                  How you make decisions — based on objective logic and consistency or based on values and how actions
                  affect others.
                </p>
              </div>
              <div className="bg-rose-50 p-4 rounded-md">
                <h3 className="font-semibold text-rose-800 mb-2">Judging (J) vs. Perceiving (P)</h3>
                <p className="text-rose-600">
                  How you deal with the world — preferring structure and firm decisions or staying open to new
                  information and options.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/quiz">
              <button className="bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Take the Personality Test
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
