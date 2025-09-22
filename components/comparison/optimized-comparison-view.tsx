"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Check, X, AlertTriangle, Heart, Users, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getPersonalityTypes } from "@/lib/firebase"
import { useDebounce } from "@/hooks/use-debounce"
import { useThrottle } from "@/hooks/use-throttle"
import { TypeSelector } from "./type-selector"
import { CompatibilityCalculator } from "./compatibility-calculator"
import { CommunicationTips } from "./communication-tips"

interface CompatibilityData {
  score: number
  dynamic: string
}

export default function OptimizedComparisonView() {
  // State management with proper initialization
  const [selectedType1, setSelectedType1] = useState<string>("INFJ")
  const [selectedType2, setSelectedType2] = useState<string>("ENFP")
  const [compatibility, setCompatibility] = useState<CompatibilityData>({
    score: 50,
    dynamic: "Select two personality types to see their relationship dynamic."
  })
  const [view, setView] = useState<"chart" | "details">("chart")
  const [isLoading, setIsLoading] = useState(true)
  const [personalityTypes, setPersonalityTypes] = useState<Record<string, any>>({})

  // Memoized values to prevent unnecessary re-renders
  const allTypes = useMemo(() => Object.keys(personalityTypes), [personalityTypes])
  
  const hasValidTypes = useMemo(() => 
    selectedType1 && selectedType2 && selectedType1 !== selectedType2,
    [selectedType1, selectedType2]
  )

  // Debounced type change handlers to prevent excessive calculations
  const debouncedType1Change = useDebounce((type: string) => {
    setSelectedType1(type)
  }, 300)

  const debouncedType2Change = useDebounce((type: string) => {
    setSelectedType2(type)
  }, 300)

  // Throttled compatibility update to prevent excessive API calls
  const throttledCompatibilityUpdate = useThrottle((score: number, dynamic: string) => {
    setCompatibility({ score, dynamic })
  }, 500)

  // Load personality types on mount
  useEffect(() => {
    const loadPersonalityTypes = async () => {
      try {
        setIsLoading(true)
        const types = await getPersonalityTypes()
        setPersonalityTypes(types)
      } catch (error) {
        console.error("Error loading personality types:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPersonalityTypes()
  }, [])

  // Handle compatibility calculation
  const handleCompatibilityChange = useCallback((score: number, dynamic: string) => {
    throttledCompatibilityUpdate(score, dynamic)
  }, [throttledCompatibilityUpdate])

  // Memoized compatibility score color
  const scoreColor = useMemo(() => {
    if (compatibility.score >= 80) return "text-green-600"
    if (compatibility.score >= 60) return "text-yellow-600"
    return "text-red-600"
  }, [compatibility.score])

  // Memoized compatibility badge variant
  const scoreBadgeVariant = useMemo(() => {
    if (compatibility.score >= 80) return "default"
    if (compatibility.score >= 60) return "secondary"
    return "destructive"
  }, [compatibility.score])

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
        <h1 className="text-3xl font-bold text-rose-800 mb-4">Personality Type Comparison</h1>
        <p className="text-rose-700 max-w-2xl mx-auto">
          Compare any two personality types to understand their compatibility, communication styles, and relationship dynamics.
        </p>
      </div>

      {/* Type Selector */}
      <TypeSelector
        selectedType1={selectedType1}
        selectedType2={selectedType2}
        onType1Change={debouncedType1Change}
        onType2Change={debouncedType2Change}
        personalityTypes={personalityTypes}
        isLoading={isLoading}
      />

      {/* Compatibility Calculator (invisible component) */}
      <CompatibilityCalculator
        type1={selectedType1}
        type2={selectedType2}
        onCompatibilityChange={handleCompatibilityChange}
      />

      {/* Results Display */}
      {hasValidTypes && (
        <div className="space-y-6">
          {/* Compatibility Score */}
          <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-rose-600 mr-3" />
                  <h2 className="text-2xl font-bold text-rose-800">Compatibility Score</h2>
                </div>
                <div className="mb-4">
                  <span className={`text-6xl font-bold ${scoreColor}`}>
                    {compatibility.score}%
                  </span>
                </div>
                <Badge variant={scoreBadgeVariant} className="text-lg px-4 py-2">
                  {compatibility.score >= 80 ? "Excellent Match" : 
                   compatibility.score >= 60 ? "Good Match" : "Challenging Match"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Relationship Dynamic */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-rose-600 mr-3" />
                <h3 className="text-xl font-semibold text-rose-800">Relationship Dynamic</h3>
              </div>
              <p className="text-rose-700 leading-relaxed">{compatibility.dynamic}</p>
            </CardContent>
          </Card>

          {/* Communication Tips */}
          <CommunicationTips type1={selectedType1} type2={selectedType2} />

          {/* Detailed Analysis Tabs */}
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <Tabs value={view} onValueChange={(value) => setView(value as "chart" | "details")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chart">Compatibility Chart</TabsTrigger>
                  <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart" className="mt-6">
                  <div className="text-center py-8">
                    <Lightbulb className="h-12 w-12 text-rose-400 mx-auto mb-4" />
                    <p className="text-rose-700">
                      Compatibility chart visualization will be implemented here.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="mt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-rose-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-rose-800 mb-2">Strengths</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-rose-700">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Complementary perspectives
                          </li>
                          <li className="flex items-center text-rose-700">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            Growth opportunities
                          </li>
                        </ul>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-rose-800 mb-2">Challenges</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-rose-700">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                            Communication differences
                          </li>
                          <li className="flex items-center text-rose-700">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                            Different priorities
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {!hasValidTypes && selectedType1 && selectedType2 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
            <p className="text-yellow-800">
              Please select two different personality types to compare.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
