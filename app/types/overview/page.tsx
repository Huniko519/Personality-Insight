"use client"
import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { getAllPersonalityTypes } from "@/lib/firebase"
import OverviewHeader from "./components/overview-header"
import DimensionCards from "./components/dimension-cards"
import TemperamentSection from "./components/temperament-section"
import OverviewCTA from "./components/overview-cta"

export default function PersonalityTypesOverviewPage() {
  const [allTypes, setAllTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTypes = useCallback(async () => {
    try {
      const types = await getAllPersonalityTypes()
      setAllTypes(types)
    } catch (err) {
      console.error("Error fetching personality types:", err)
      setError("Failed to load personality types from the database. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTypes()
  }, [fetchTypes])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-rose-800 mb-4">Database Error</h1>
            <p className="text-rose-700 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-rose-600 hover:bg-rose-700">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Ensure allTypes is an array before using filter
  const safeAllTypes = Array.isArray(allTypes) ? allTypes : []

  // Group personality types by category
  const analysts = safeAllTypes.filter((type) => ["INTJ", "INTP", "ENTJ", "ENTP"].includes(type.code))
  const diplomats = safeAllTypes.filter((type) => ["INFJ", "INFP", "ENFJ", "ENFP"].includes(type.code))
  const sentinels = safeAllTypes.filter((type) => ["ISTJ", "ISFJ", "ESTJ", "ESFJ"].includes(type.code))
  const explorers = safeAllTypes.filter((type) => ["ISTP", "ISFP", "ESTP", "ESFP"].includes(type.code))

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <OverviewHeader />
          <DimensionCards />

          <TemperamentSection
            title="Analysts (NT)"
            description="Analysts are rational and strategic thinkers who value knowledge, competence, and logic. They are driven by a desire to understand complex systems and often excel in fields that require innovation and strategic planning."
            types={analysts}
            category="analysts"
          />

          <TemperamentSection
            title="Diplomats (NF)"
            description="Diplomats are idealistic and empathetic individuals who value authenticity, growth, and harmony. They are driven by a desire to help others and often excel in fields that involve understanding people and facilitating personal development."
            types={diplomats}
            category="diplomats"
          />

          <TemperamentSection
            title="Sentinels (SJ)"
            description="Sentinels are practical and dutiful individuals who value security, stability, and tradition. They are driven by a desire to create order and often excel in fields that require organization, reliability, and attention to detail."
            types={sentinels}
            category="sentinels"
          />

          <TemperamentSection
            title="Explorers (SP)"
            description="Explorers are spontaneous and versatile individuals who value freedom, variety, and hands-on experience. They are driven by a desire to live in the moment and often excel in fields that require adaptability, resourcefulness, and practical problem-solving."
            types={explorers}
            category="explorers"
          />

          <OverviewCTA />
        </div>
      </div>
      <Footer />
    </>
  )
}
