import Link from "next/link"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"
import { getAllPersonalityTypes } from "@/lib/firebase"
import TypesHeader from "./components/types-header"
import TypeCard from "./components/type-card"
import TypeCodeExplanation from "./components/type-code-explanation"
import QuizCTA from "./components/quiz-cta"

export default async function TypesPage() {
  // Fetch personality types on the server
  let personalityTypes = []
  try {
    const types = await getAllPersonalityTypes()
    personalityTypes = types
  } catch (error) {
    console.error("Error fetching personality types:", error)
    personalityTypes = []
  }

  return (
    <>
      <HeaderWrapper />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <TypesHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {personalityTypes.map((type: any) => (
              <TypeCard key={type.code} type={type} />
            ))}
          </div>

          <TypeCodeExplanation />
          <QuizCTA />
        </div>
      </div>
      <Footer />
    </>
  )
}
