"use client"

import { memo, useCallback } from "react"
import { Download, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import SocialShare from "@/components/social-share"

interface VisualizationControlsProps {
  selectedVisualization: string
  setSelectedVisualization: (value: string) => void
  selectedType: string
  setSelectedType: (value: string) => void
  selectedEnneagramType: string
  setSelectedEnneagramType: (value: string) => void
  selectedDimension: string
  setSelectedDimension: (value: string) => void
  dimensionValue: number
  setDimensionValue: (value: number) => void
  showShareOptions: boolean
  setShowShareOptions: (value: boolean) => void
  downloadVisualization: () => void
  isLoading: boolean
  isLoadingEnneagram: boolean
  personalityTypes: Record<string, any>
  enneagramTypes: Record<string, any>
}

const VisualizationControls = memo(({
  selectedVisualization,
  setSelectedVisualization,
  selectedType,
  setSelectedType,
  selectedEnneagramType,
  setSelectedEnneagramType,
  selectedDimension,
  setSelectedDimension,
  dimensionValue,
  setDimensionValue,
  showShareOptions,
  setShowShareOptions,
  downloadVisualization,
  isLoading,
  isLoadingEnneagram,
  personalityTypes,
  enneagramTypes,
}: VisualizationControlsProps) => {
  const handleDimensionChange = useCallback((value: string) => {
    setSelectedDimension(value)
    setDimensionValue(50) // Reset slider when changing dimension
  }, [setSelectedDimension, setDimensionValue])

  const handleSliderChange = useCallback((direction: "left" | "right") => {
    if (direction === "left") {
      setDimensionValue(Math.max(0, dimensionValue - 10))
    } else {
      setDimensionValue(Math.min(100, dimensionValue + 10))
    }
  }, [dimensionValue, setDimensionValue])

  const handleDownloadClick = useCallback(() => {
    downloadVisualization()
  }, [downloadVisualization])

  const handleShareClick = useCallback(() => {
    setShowShareOptions(!showShareOptions)
  }, [showShareOptions, setShowShareOptions])

  return (
    <Card className="lg:col-span-1 border-rose-200 dark:border-rose-800 shadow-md animate-slide-in-left">
      <CardHeader>
        <CardTitle className="text-rose-800 dark:text-rose-200">Visualization Options</CardTitle>
        <CardDescription className="dark:text-rose-300">Select a visualization type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-rose-700 dark:text-rose-300 mb-2">
            Visualization Type
          </label>
          <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
            <SelectTrigger className="border-rose-200 dark:border-rose-800 dark:bg-rose-900 dark:text-rose-200">
              <SelectValue placeholder="Select visualization" />
            </SelectTrigger>
            <SelectContent className="dark:bg-rose-900 dark:border-rose-800">
              <SelectItem value="type-wheel">Type Wheel</SelectItem>
              <SelectItem value="cognitive-functions">Cognitive Functions</SelectItem>
              <SelectItem value="dimension-spectrum">Dimension Spectrum</SelectItem>
              <SelectItem value="comparison">Type Comparison</SelectItem>
              <SelectItem value="enneagram-rings">Enneagram Rings</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedVisualization === "enneagram-rings" ? (
          <div>
            <label className="block text-sm font-medium text-rose-700 dark:text-rose-300 mb-2">
              Enneagram Type
            </label>
            <Select value={selectedEnneagramType} onValueChange={setSelectedEnneagramType}>
              <SelectTrigger className="border-rose-200 dark:border-rose-800 dark:bg-rose-900 dark:text-rose-200">
                <SelectValue placeholder="Select type (optional)" />
              </SelectTrigger>
              <SelectContent className="dark:bg-rose-900 dark:border-rose-800">
                <SelectItem value="none">None</SelectItem>
                {!isLoadingEnneagram &&
                  Object.keys(enneagramTypes).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type} - {enneagramTypes[type].name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        ) : selectedVisualization !== "comparison" && selectedVisualization !== "dimension-spectrum" ? (
          <div>
            <label className="block text-sm font-medium text-rose-700 dark:text-rose-300 mb-2">
              Personality Type
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-rose-200 dark:border-rose-800 dark:bg-rose-900 dark:text-rose-200">
                <SelectValue placeholder="Select type (optional)" />
              </SelectTrigger>
              <SelectContent className="dark:bg-rose-900 dark:border-rose-800">
                {selectedVisualization === "cognitive-functions" ? null : (
                  <SelectItem value="none">None</SelectItem>
                )}
                {!isLoading &&
                  Object.keys(personalityTypes).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type} - {personalityTypes[type].name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        ) : selectedVisualization === "dimension-spectrum" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rose-700 dark:text-rose-300 mb-2">
                Select Dimension
              </label>
              <Select value={selectedDimension} onValueChange={handleDimensionChange}>
                <SelectTrigger className="border-rose-200 dark:border-rose-800 dark:bg-rose-900 dark:text-rose-200">
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent className="dark:bg-rose-900 dark:border-rose-800">
                  <SelectItem value="EI">Extraversion vs. Introversion</SelectItem>
                  <SelectItem value="SN">Sensing vs. Intuition</SelectItem>
                  <SelectItem value="TF">Thinking vs. Feeling</SelectItem>
                  <SelectItem value="JP">Judging vs. Perceiving</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-rose-700 dark:text-rose-300 mb-2">
                Adjust Preference
              </label>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-rose-700 dark:text-rose-300">
                  {selectedDimension[0]}
                </div>
                <div className="flex-1 mx-4">
                  <div className="relative h-4 bg-rose-100 dark:bg-rose-800/50 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="absolute h-4 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500 dark:from-rose-400 dark:via-rose-500 dark:to-rose-600 rounded-full"
                      style={{ width: `${dimensionValue}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm font-medium text-rose-700 dark:text-rose-300">
                  {selectedDimension[1]}
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSliderChange("left")}
                  className="border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSliderChange("right")}
                  className="border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="pt-4 border-t border-rose-100 dark:border-rose-800">
          <Button
            onClick={handleDownloadClick}
            variant="outline"
            className="w-full border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-800"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
        </div>

        <div>
          <Button
            onClick={handleShareClick}
            variant="outline"
            className="w-full border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-800"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Visualization
          </Button>

          {showShareOptions && (
            <div className="mt-4 p-3 bg-white dark:bg-rose-900 rounded-md border border-rose-200 dark:border-rose-800 animate-fade-in">
              <SocialShare
                title="Personality Type Visualization"
                text={`Check out this ${selectedVisualization} visualization for ${selectedType === "none" ? "personality types" : selectedType} on PersonaIQ!`}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

VisualizationControls.displayName = "VisualizationControls"

export default VisualizationControls
