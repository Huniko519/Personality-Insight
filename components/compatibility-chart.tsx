"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Info, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getCompatibility } from "@/lib/compatibility-data"
import { getPersonalityTypes } from "@/lib/firebase"

export default function CompatibilityChart() {
  const [selectedType1, setSelectedType1] = useState<string>("INFJ")
  const [selectedType2, setSelectedType2] = useState<string>("ENFP")
  const [compatibility, setCompatibility] = useState({
    score: 5,
    description: "Loading compatibility data...",
    strengths: ["Loading..."],
    challenges: ["Loading..."],
    advice: "Loading advice...",
    summary: "Loading summary...",
  })
  const [view, setView] = useState<"chart" | "details">("chart")
  const [isLoading, setIsLoading] = useState(true)
  const [compatibilityMatrix, setCompatibilityMatrix] = useState<Record<string, Record<string, number>>>({})
  const [personalityTypes, setPersonalityTypes] = useState<any>({})
  const [allTypes, setAllTypes] = useState<string[]>([])

  // Load personality types and compatibility data
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)

        // Load personality types
        const types = await getPersonalityTypes()
        setPersonalityTypes(types)

        const typeKeys = Object.keys(types)
        setAllTypes(typeKeys)

        // Now load compatibility data
        await loadAllCompatibilityData(typeKeys)

        // Set initial compatibility
        try {
          const initialCompat = getCompatibility(selectedType1, selectedType2)
          setCompatibility(initialCompat)
        } catch (error) {
          console.error(`Error loading initial compatibility for ${selectedType1} and ${selectedType2}:`, error)
          // Set default compatibility if there's an error
          setCompatibility({
            score: 5,
            description: `Compatibility data between ${selectedType1} and ${selectedType2} is not available.`,
            strengths: ["Unique perspectives", "Potential for growth"],
            challenges: ["May need to work on communication", "Different approaches to situations"],
            advice: "Focus on understanding each other's perspectives and communication styles.",
            summary: "A match with specific strengths and challenges.",
          })
        }
      } catch (error) {
        console.error("Error loading personality types:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Load compatibility data for all types
  async function loadAllCompatibilityData(types: string[]) {
    const matrix: Record<string, Record<string, number>> = {}

    // Initialize the matrix with empty objects
    types.forEach((type) => {
      matrix[type] = {}
    })

    // Load compatibility data for each pair of types
    for (const type1 of types) {
      for (const type2 of types) {
        try {
          const compat = getCompatibility(type1, type2)
          matrix[type1][type2] = compat.score
        } catch (error) {
          console.error(`Error loading compatibility for ${type1} and ${type2}:`, error)
          // Use a default score if there's an error
          matrix[type1][type2] = 5
        }
      }
    }

    setCompatibilityMatrix(matrix)
  }

  // Update compatibility when selected types change
  useEffect(() => {
    if (!selectedType1 || !selectedType2) return

    try {
      const compat = getCompatibility(selectedType1, selectedType2)
      setCompatibility(compat)
    } catch (error) {
      console.error(`Error loading compatibility for ${selectedType1} and ${selectedType2}:`, error)
      // Set default compatibility data if there's an error
      setCompatibility({
        score: 5,
        description: `Compatibility data between ${selectedType1} and ${selectedType2} is not available.`,
        strengths: ["Unique perspectives", "Potential for growth"],
        challenges: ["May need to work on communication", "Different approaches to situations"],
        advice: "Focus on understanding each other's perspectives and communication styles.",
        summary: "A match with specific strengths and challenges.",
      })
    }
  }, [selectedType1, selectedType2])

  // Function to get cell color based on score
  const getCellColor = (score: number) => {
    if (score >= 8)
      return "bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-300 shadow-sm"
    if (score >= 6)
      return "bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 border-yellow-300 shadow-sm"
    return "bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border-red-300 shadow-sm"
  }

  // Function to get score label
  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent"
    if (score >= 6) return "Good"
    return "Challenging"
  }

  // Function to get compatibility summary
  const getCompatibilitySummary = (type1: string, type2: string) => {
    if (compatibilityMatrix[type1] && compatibilityMatrix[type1][type2] !== undefined) {
      const score = compatibilityMatrix[type1][type2]
      if (score >= 8) return "Excellent compatibility with complementary strengths."
      if (score >= 6) return "Good compatibility with some areas to work on."
      return "Challenging match that requires effort and understanding."
    }
    return "A match with specific strengths and challenges."
  }

  if (isLoading && Object.keys(compatibilityMatrix).length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-700 mx-auto mb-4"></div>
          <p className="text-rose-700">Loading compatibility data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="chart" onValueChange={(value) => setView(value as "chart" | "details")}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="chart">Compatibility Chart</TabsTrigger>
          <TabsTrigger value="details">Detailed Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="mt-4">
          <div className="rounded-xl border border-rose-200 shadow-lg bg-white">
            <div className="min-w-max">
              <div className="grid grid-cols-[auto,repeat(16,minmax(55px,1fr))]">
                {/* Header row */}
                <div className="p-3 font-bold text-center bg-gradient-to-r from-rose-100 to-rose-200 border border-rose-300 rounded-tl-lg"></div>
                {allTypes.map((type) => (
                  <div
                    key={type}
                    className="p-2 font-bold text-center bg-gradient-to-r from-rose-100 to-rose-200 border border-rose-300 h-24 flex items-center justify-center"
                  >
                    <span className="text-rose-800">{type}</span>
                  </div>
                ))}

                {/* Data rows */}
                {allTypes.map((type1, rowIndex) => (
                  <React.Fragment key={type1}>
                    <div
                      className={`p-3 font-bold text-center bg-gradient-to-r from-rose-100 to-rose-200 border border-rose-300 ${rowIndex === allTypes.length - 1 ? "rounded-bl-lg" : ""}`}
                    >
                      <span className="text-rose-800">{type1}</span>
                    </div>
                    {allTypes.map((type2, colIndex) => {
                      const compatScore = compatibilityMatrix[type1]?.[type2] || 5
                      const isSelected = selectedType1 === type1 && selectedType2 === type2

                      // Enhanced cell styling
                      let cellStyle = "relative p-2 text-center border transition-all duration-300 "

                      // Base style by score
                      if (compatScore >= 8) {
                        cellStyle += "bg-gradient-to-br from-green-50 to-green-100 border-green-200 "
                      } else if (compatScore >= 6) {
                        cellStyle += "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 "
                      } else {
                        cellStyle += "bg-gradient-to-br from-red-50 to-red-100 border-red-200 "
                      }

                      // Selected state
                      if (isSelected) {
                        cellStyle += "ring-2 ring-rose-500 transform scale-110 z-20 shadow-lg "
                      } else {
                        cellStyle += "hover:transform hover:scale-105 hover:z-10 hover:shadow-md "
                      }

                      // Corner rounding for last cell
                      if (rowIndex === allTypes.length - 1 && colIndex === allTypes.length - 1) {
                        cellStyle += "rounded-br-lg"
                      }

                      return (
                        <div
                          key={`${type1}-${type2}`}
                          className={cellStyle}
                          onClick={() => {
                            setSelectedType1(type1)
                            setSelectedType2(type2)
                            setView("details")
                          }}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                                  <span
                                    className={`text-xl font-bold ${
                                      compatScore >= 8
                                        ? "text-green-700"
                                        : compatScore >= 6
                                          ? "text-yellow-700"
                                          : "text-red-700"
                                    }`}
                                  >
                                    {compatScore}
                                  </span>
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-white bg-opacity-20 flex items-center justify-center">
                                      <span className="sr-only">Selected</span>
                                    </div>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-white border border-rose-200 p-4 shadow-xl rounded-lg max-w-xs"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-base font-medium text-rose-800">
                                    {type1} + {type2}
                                  </p>
                                  <span
                                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                      compatScore >= 8
                                        ? "bg-green-100 text-green-800"
                                        : compatScore >= 6
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {getScoreLabel(compatScore)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{getCompatibilitySummary(type1, type2)}</p>
                                <p className="text-xs text-rose-600 mt-2 italic">Click for details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md border border-rose-100">
              <div className="w-5 h-5 bg-gradient-to-br from-green-50 to-green-100 border border-green-300 mr-2 rounded-md"></div>
              <span className="text-sm font-medium">Excellent (8-10)</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md border border-rose-100">
              <div className="w-5 h-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 mr-2 rounded-md"></div>
              <span className="text-sm font-medium">Good (6-7)</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md border border-rose-100">
              <div className="w-5 h-5 bg-gradient-to-br from-red-50 to-red-100 border border-red-300 mr-2 rounded-md"></div>
              <span className="text-sm font-medium">Challenging (1-5)</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-1">First Personality Type</label>
              <select
                className="w-full p-2 border border-rose-200 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                value={selectedType1}
                onChange={(e) => setSelectedType1(e.target.value)}
              >
                {allTypes.map((type) => (
                  <option key={type} value={type}>
                    {type} - {personalityTypes[type]?.nickname || ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-1">Second Personality Type</label>
              <select
                className="w-full p-2 border border-rose-200 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                value={selectedType2}
                onChange={(e) => setSelectedType2(e.target.value)}
              >
                {allTypes.map((type) => (
                  <option key={type} value={type}>
                    {type} - {personalityTypes[type]?.nickname || ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Card className="mb-6 overflow-hidden border-rose-200 shadow-lg">
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-white">
                  {selectedType1} + {selectedType2}
                </div>
                <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-1">
                  <span className="mr-2 text-white">Compatibility:</span>
                  <span
                    className={`text-lg font-bold px-3 py-1 rounded-full ${
                      compatibility.score >= 8
                        ? "bg-green-100 text-green-800"
                        : compatibility.score >= 6
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {compatibility.score}/10
                  </span>
                </div>
              </div>
            </div>
            <CardContent className="pt-6">
              <p className="text-gray-700 mb-6 text-lg">{compatibility.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                  <h3 className="text-lg font-semibold text-rose-700 mb-3 flex items-center">
                    <div className="bg-rose-100 p-1 rounded-full mr-2">
                      <Info className="h-4 w-4 text-rose-600" />
                    </div>
                    {selectedType1} ({personalityTypes[selectedType1]?.nickname || ""})
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {personalityTypes[selectedType1]?.traits?.slice(0, 4).map((trait: string, index: number) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                  <h3 className="text-lg font-semibold text-rose-700 mb-3 flex items-center">
                    <div className="bg-rose-100 p-1 rounded-full mr-2">
                      <Info className="h-4 w-4 text-rose-600" />
                    </div>
                    {selectedType2} ({personalityTypes[selectedType2]?.nickname || ""})
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {personalityTypes[selectedType2]?.traits?.slice(0, 4).map((trait: string, index: number) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-green-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3">
                <h3 className="text-lg font-semibold text-white">Relationship Strengths</h3>
              </div>
              <CardContent className="pt-6">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {compatibility.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-red-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-3">
                <h3 className="text-lg font-semibold text-white">Potential Challenges</h3>
              </div>
              <CardContent className="pt-6">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {compatibility.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200 shadow-md">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-rose-700 mb-3 flex items-center">
                <Heart className="h-5 w-5 text-rose-600 mr-2" />
                Relationship Advice
              </h3>
              <p className="text-gray-700">{compatibility.advice}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
