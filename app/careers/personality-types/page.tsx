import Link from "next/link"
import Image from "next/image"
import { getAllPersonalityTypes } from "@/lib/firebase"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"

export default async function CareerPersonalityTypesPage() {
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
      <div className="bg-gradient-to-b from-rose-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-rose-800">Career Paths by Personality Type</h1>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-rose-600">
            Explore career recommendations tailored to each personality type's natural strengths and preferences.
          </p>

          {personalityTypes.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
              <div className="mb-6">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-rose-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              </div>
              <p className="text-rose-600">Loading personality types...</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
