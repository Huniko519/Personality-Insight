"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { personalityTypes } from "@/lib/personality-types"
import { careerDatabase } from "@/lib/career-database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Briefcase, Search, Star, ArrowRight } from "lucide-react"

export default function CareersPage() {
  const [selectedType, setSelectedType] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [matchedCareers, setMatchedCareers] = useState<any[]>([])

  // Get all unique categories from career database
  const categories = Array.from(new Set(careerDatabase.map((career) => career.category)))

  useEffect(() => {
    if (selectedType || searchQuery || selectedCategory !== "all") {
      let filtered = [...careerDatabase]

      // Filter by personality type
      if (selectedType) {
        filtered = filtered.filter(
          (career) => career.suitableTypes.includes(selectedType) || career.goodFitTypes.includes(selectedType),
        )
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (career) =>
            career.title.toLowerCase().includes(query) ||
            career.description.toLowerCase().includes(query) ||
            career.skills.some((skill: string) => skill.toLowerCase().includes(query)),
        )
      }

      // Filter by category
      if (selectedCategory !== "all") {
        filtered = filtered.filter((career) => career.category === selectedCategory)
      }

      // Sort by match strength if type is selected
      if (selectedType) {
        filtered.sort((a, b) => {
          const aIsPerfect = a.suitableTypes.includes(selectedType)
          const bIsPerfect = b.suitableTypes.includes(selectedType)

          if (aIsPerfect && !bIsPerfect) return -1
          if (!aIsPerfect && bIsPerfect) return 1
          return 0
        })
      }

      setMatchedCareers(filtered)
    } else {
      // Show some recommended careers by default
      setMatchedCareers(careerDatabase.slice(0, 6))
    }
  }, [selectedType, searchQuery, selectedCategory])

  // Function to determine match strength
  const getMatchStrength = (career: any) => {
    if (!selectedType) return null

    if (career.suitableTypes.includes(selectedType)) {
      return { label: "Excellent Match", stars: 5 }
    } else if (career.goodFitTypes.includes(selectedType)) {
      return { label: "Good Match", stars: 3 }
    }
    return { label: "Possible Match", stars: 1 }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Career Matching</h1>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Find the perfect career path based on your personality type and natural strengths
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-rose-700 font-medium mb-2">Your Personality Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="border-rose-200">
                    <SelectValue placeholder="Select your type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.keys(personalityTypes).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type} - {personalityTypes[type].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-rose-700 font-medium mb-2">Career Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-rose-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-rose-700 font-medium mb-2">Search Careers</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search by title or skills..."
                    className="pl-10 border-rose-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {selectedType && (
            <div className="bg-rose-50 p-4 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-rose-800 mb-2">
                Career Recommendations for {selectedType} - {personalityTypes[selectedType].name}
              </h2>
              <p className="text-rose-700">
                Based on your personality type, we've identified careers that align with your natural strengths and
                preferences.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {matchedCareers.length > 0 ? (
              matchedCareers.map((career, index) => {
                const matchStrength = getMatchStrength(career)
                return (
                  <Card key={index} className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 text-rose-600 mr-2" />
                          <CardTitle className="text-rose-800">{career.title}</CardTitle>
                        </div>
                        {matchStrength && (
                          <div className="bg-rose-100 px-2 py-1 rounded-full text-xs font-medium text-rose-700">
                            {matchStrength.label}
                          </div>
                        )}
                      </div>
                      <CardDescription className="text-rose-600">{career.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-rose-700 mb-4">{career.description}</p>

                      {matchStrength && (
                        <div className="flex mb-3">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < matchStrength.stars ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                      )}

                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-rose-800 mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.slice(0, 3).map((skill: string, i: number) => (
                            <span key={i} className="bg-rose-100 px-2 py-1 rounded-full text-xs text-rose-700">
                              {skill}
                            </span>
                          ))}
                          {career.skills.length > 3 && (
                            <span className="bg-rose-50 px-2 py-1 rounded-full text-xs text-rose-700">
                              +{career.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/careers/${career.id}`}
                        className="text-rose-600 hover:text-rose-800 text-sm font-medium flex items-center"
                      >
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-rose-700 text-lg">
                  No careers match your current filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>

          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Not Sure About Your Type?</h2>
            <p className="text-rose-700 mb-6">
              Take our comprehensive personality test to discover your type and get personalized career recommendations.
            </p>
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700">Take the Test</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
