"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Info, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getCompatibility } from "@/lib/compatibility-data"
import { getPersonalityTypes } from "@/lib/firebase"
import { useDebounce } from "@/hooks/use-debounce"
import { useThrottle } from "@/hooks/use-throttle"

interface CompatibilityData {
  score: number
  description: string
  strengths: string[]
  challenges: string[]
  advice: string
  summary: string
}

// Memoized compatibility matrix component
const CompatibilityMatrix = React.memo<{
  matrix: Record<string, Record<string, number>>
  allTypes: string[]
  selectedType1: string
  selectedType2: string
  onTypeSelect: (type: string) => void
}>(({ matrix, allTypes, selectedType1, selectedType2, onTypeSelect }) => {
  const getScoreColor = useCallback((score: number) => {
    if (score >= 8) return "bg-green-500"
    if (score >= 6) return "bg-blue-500"
    if (score >= 4) return "bg-yellow-500"
    return "bg-red-500"
  }, [])

  const getScoreText = useCallback((score: number) => {
    if (score >= 8) return "Excellent"
    if (score >= 6) return "Good"
    if (score >= 4) return "Fair"
    return "Poor"
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300 bg-gray-50"></th>
            {allTypes.map((type) => (
              <th key={type} className="p-2 border border-gray-300 bg-gray-50 text-xs">
                {type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allTypes.map((type1) => (
            <tr key={type1}>
              <td className="p-2 border border-gray-300 bg-gray-50 font-medium text-xs">
                {type1}
              </td>
              {allTypes.map((type2) => {
                const score = matrix[type1]?.[type2] || 5
                const isSelected = (type1 === selectedType1 && type2 === selectedType2) ||
                                 (type1 === selectedType2 && type2 === selectedType1)
                
                return (
                  <td
                    key={`${type1}-${type2}`}
                    className={`p-1 border border-gray-300 cursor-pointer text-center text-xs transition-colors ${
                      isSelected ? 'ring-2 ring-rose-500' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => onTypeSelect(type1 === selectedType1 ? type2 : type1)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`w-6 h-6 rounded ${getScoreColor(score)} flex items-center justify-center text-white text-xs font-bold`}>
                            {score}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{type1} + {type2}: {getScoreText(score)} ({score}/10)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

CompatibilityMatrix.displayName = 'CompatibilityMatrix'

// Memoized compatibility details component
const CompatibilityDetails = React.memo<{
  compatibility: CompatibilityData
  selectedType1: string
  selectedType2: string
}>(({ compatibility, selectedType1, selectedType2 }) => {
  const scoreColor = useMemo(() => {
    if (compatibility.score >= 8) return "text-green-600"
    if (compatibility.score >= 6) return "text-blue-600"
    if (compatibility.score >= 4) return "text-yellow-600"
    return "text-red-600"
  }, [compatibility.score])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-rose-600 mr-3" />
              <h3 className="text-2xl font-bold text-rose-800">Compatibility Score</h3>
            </div>
            <div className="mb-4">
              <span className={`text-5xl font-bold ${scoreColor}`}>
                {compatibility.score}/10
              </span>
            </div>
            <p className="text-rose-700">{compatibility.description}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {compatibility.strengths.map((strength, index) => (
                <li key={index} className="text-rose-700 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-rose-800 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Challenges
            </h4>
            <ul className="space-y-2">
              {compatibility.challenges.map((challenge, index) => (
                <li key={index} className="text-rose-700 flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-rose-800 mb-4">Advice</h4>
          <p className="text-rose-700 leading-relaxed">{compatibility.advice}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-rose-800 mb-4">Summary</h4>
          <p className="text-rose-700 leading-relaxed">{compatibility.summary}</p>
        </CardContent>
      </Card>
    </div>
  )
})

CompatibilityDetails.displayName = 'CompatibilityDetails'

export default function CompatibilityChart() {
  const [selectedType1, setSelectedType1] = useState<string>("INFJ")
  const [selectedType2, setSelectedType2] = useState<string>("ENFP")
  const [compatibility, setCompatibility] = useState<CompatibilityData>({
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

  // Debounced type selection to prevent excessive updates
  const debouncedType1Change = useDebounce((type: string) => {
    setSelectedType1(type)
  }, 300)

  const debouncedType2Change = useDebounce((type: string) => {
    setSelectedType2(type)
  }, 300)

  // Throttled compatibility update
  const throttledCompatibilityUpdate = useThrottle((type1: string, type2: string) => {
    try {
      const compat = getCompatibility(type1, type2)
      setCompatibility(compat)
    } catch (error) {
      console.error(`Error loading compatibility for ${type1} and ${type2}:`, error)
      setCompatibility({
        score: 5,
        description: `Compatibility data between ${type1} and ${type2} is not available.`,
        strengths: ["Unique perspectives", "Potential for growth"],
        challenges: ["May need to work on communication", "Different approaches to situations"],
        advice: "Focus on understanding each other's perspectives and communication styles.",
        summary: "A match with specific strengths and challenges.",
      })
    }
  }, 500)

  // Load personality types and compatibility data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Load personality types
        const types = await getPersonalityTypes()
        setPersonalityTypes(types)

        const typeKeys = Object.keys(types)
        setAllTypes(typeKeys)

        // Load compatibility data for all types
        await loadAllCompatibilityData(typeKeys)

        // Set initial compatibility
        throttledCompatibilityUpdate(selectedType1, selectedType2)
      } catch (error) {
        console.error("Error loading personality types:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Load compatibility data for all types
  const loadAllCompatibilityData = useCallback(async (types: string[]) => {
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
  }, [])

  // Update compatibility when selected types change
  useEffect(() => {
    if (!selectedType1 || !selectedType2) return
    throttledCompatibilityUpdate(selectedType1, selectedType2)
  }, [selectedType1, selectedType2, throttledCompatibilityUpdate])

  // Handle type selection from matrix
  const handleTypeSelect = useCallback((type: string) => {
    if (type === selectedType1) {
      debouncedType2Change(type)
    } else {
      debouncedType1Change(type)
    }
  }, [selectedType1, debouncedType1Change, debouncedType2Change])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-rose-800 mb-4">Compatibility Chart</h1>
        <p className="text-rose-700 max-w-2xl mx-auto">
          Explore compatibility scores between all personality types. Click on any cell to see detailed compatibility information.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={view} onValueChange={(value) => setView(value as "chart" | "details")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Compatibility Matrix</TabsTrigger>
              <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="mt-6">
              <CompatibilityMatrix
                matrix={compatibilityMatrix}
                allTypes={allTypes}
                selectedType1={selectedType1}
                selectedType2={selectedType2}
                onTypeSelect={handleTypeSelect}
              />
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <CompatibilityDetails
                compatibility={compatibility}
                selectedType1={selectedType1}
                selectedType2={selectedType2}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
