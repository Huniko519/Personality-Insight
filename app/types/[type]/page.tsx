import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPersonalityTypeByCode } from "@/lib/firebase"
import TypeHeader from "./components/type-header"
import TypeTabs from "./components/type-tabs"
import TypeSidebar from "./components/type-sidebar"
import TypeCTA from "./components/type-cta"

interface PersonalityType {
  code: string
  name: string
  nickname: string
  shortDescription: string
  description: string
  portraitDescription?: string
  poeticDescription?: string
  detailedDescription?: string
  stressResponse?: string
  naturalAbilities?: string
  careerTraits?: string[]
  careerEnvironment?: string
  traits: string[]
  values: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  careerStrengths?: string[]
  careerChallenges?: string[]
  famousPeople: string[]
  compatibility: {
    best: string[]
    good: string[]
  }
  relationships: {
    communication: string
    asFriends: string
    asPartners: string
    loveQuote?: string
    parentQuote?: string
  }
  relationshipStrengths?: string[]
  relationshipWeaknesses?: string[]
  asParents?: string
  personalGrowth?: {
    meaningOfSuccess: string
    strengths: string[]
    problemAreas: string[]
    solutions: string[]
    rulesForSuccess: string[]
  }
  cognitiveFunctions: {
    name: string
    description: string
  }[]
}

export async function generateStaticParams() {
  return [
    { type: "intj" },
    { type: "intp" },
    { type: "entj" },
    { type: "entp" },
    { type: "infj" },
    { type: "infp" },
    { type: "enfj" },
    { type: "enfp" },
    { type: "istj" },
    { type: "isfj" },
    { type: "estj" },
    { type: "esfj" },
    { type: "istp" },
    { type: "isfp" },
    { type: "estp" },
    { type: "esfp" },
  ]
}

async function getPersonalityType(type: string): Promise<PersonalityType | null> {
  try {
    // Get all personality types from the database
    const typeCode = type.toUpperCase()
    const personalityType = await getPersonalityTypeByCode(typeCode)

    if (!personalityType) {
      console.error(`Personality type ${typeCode} not found`)
      return null
    }

    return personalityType
  } catch (error) {
    console.error(`Error fetching personality type ${type}:`, error)
    return null
  }
}

export default async function TypePage({ params }: { params: { type: string } }) {
  const typeCode = params.type.toUpperCase()
  const personalityType = await getPersonalityType(params.type)

  if (!personalityType) {
    notFound()
  }

  // Extract personality traits from type code
  const isIntroverted = typeCode.charAt(0) === "I"
  const isIntuitive = typeCode.charAt(1) === "N"
  const isThinking = typeCode.charAt(2) === "T"
  const isJudging = typeCode.charAt(3) === "J"

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <TypeHeader typeCode={typeCode} personalityType={personalityType} />
          <TypeTabs typeCode={typeCode} personalityType={personalityType} />
          <TypeSidebar 
            typeCode={typeCode} 
            personalityType={personalityType}
            isIntroverted={isIntroverted}
            isIntuitive={isIntuitive}
            isThinking={isThinking}
            isJudging={isJudging}
          />
          <TypeCTA />
        </div>
      </div>
      <Footer />
    </>
  )
}
