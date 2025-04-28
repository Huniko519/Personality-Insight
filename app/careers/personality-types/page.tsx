"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAllPersonalityTypes } from "@/lib/firebase"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CareerPersonalityTypesPage() {
  const [personalityTypes, setPersonalityTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPersonalityTypes() {
      try {
        const types = await getAllPersonalityTypes() as any
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
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
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
      <div className="bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-rose-800">Career Paths by Personality Type</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-rose-600">
            Explore career recommendations tailored to each personality type's natural strengths and preferences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalityTypes.map((type: any) => (
              <Link
                href={`/careers/personality-types/${type.code.toLowerCase()}`}
                key={type.code}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-rose-100">
                  <div className="h-40 relative overflow-hidden bg-rose-50">
                    {type.image ? (
                      <Image src={type.image || "/placeholder.svg"} alt={type.name} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-5xl font-bold text-rose-200">{type.code}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-1 group-hover:text-rose-600">{type.code}</h2>
                    <p className="text-rose-600 font-medium">{type.name}</p>
                    <p className="text-rose-500 mt-2 text-sm">View career recommendations →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
