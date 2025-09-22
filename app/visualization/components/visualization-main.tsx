"use client"

import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VisualizationCanvas from "./visualization-canvas"
import VisualizationInfo from "./visualization-info"

interface VisualizationMainProps {
  selectedVisualization: string
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  canvasSize: { width: number; height: number }
  handleCanvasMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleCanvasMouseLeave: () => void
  handleCanvasClick: () => void
  selectedType: string
  selectedEnneagramType: string
  enneagramTypes: Record<string, any>
  dimensionExplanations: any
  selectedDimension: string
  isLoading: boolean
  isLoadingEnneagram: boolean
}

const VisualizationMain = memo(({
  selectedVisualization,
  canvasRef,
  canvasSize,
  handleCanvasMouseMove,
  handleCanvasMouseLeave,
  handleCanvasClick,
  selectedType,
  selectedEnneagramType,
  enneagramTypes,
  dimensionExplanations,
  selectedDimension,
  isLoading,
  isLoadingEnneagram,
}: VisualizationMainProps) => {
  const getVisualizationTitle = () => {
    switch (selectedVisualization) {
      case "type-wheel":
        return "MBTI Type Wheel"
      case "cognitive-functions":
        return "Cognitive Functions"
      case "dimension-spectrum":
        return "Personality Dimensions"
      case "comparison":
        return "Personality Type Comparison"
      case "enneagram-rings":
        return "Enneagram Personality System"
      default:
        return "Visualization"
    }
  }

  const getVisualizationDescription = () => {
    switch (selectedVisualization) {
      case "type-wheel":
        return "Visual representation of all 16 personality types"
      case "cognitive-functions":
        return "How different functions stack in a personality type"
      case "dimension-spectrum":
        return "The four dimensions that define personality type"
      case "comparison":
        return "Compare traits and compatibility between personality types"
      case "enneagram-rings":
        return "Visual representation of the nine Enneagram personality types"
      default:
        return "Interactive visualization"
    }
  }

  return (
    <Card className="lg:col-span-3 border-rose-200 dark:border-rose-800 shadow-md animate-slide-in-right">
      <CardHeader>
        <CardTitle className="text-rose-800 dark:text-rose-200">
          {getVisualizationTitle()}
        </CardTitle>
        <CardDescription className="dark:text-rose-300">
          {getVisualizationDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || isLoadingEnneagram ? (
          <div className="flex items-center justify-center h-[500px] bg-white rounded-lg border border-slate-200">
            <div className="text-center">
              <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600"></div>
              <p className="mt-4 text-lg text-slate-800 font-medium">Loading Visualization...</p>
            </div>
          </div>
        ) : (
          ["type-wheel", "cognitive-functions", "dimension-spectrum", "enneagram-rings"].includes(
            selectedVisualization,
          ) && (
            <VisualizationCanvas
              canvasRef={canvasRef}
              canvasSize={canvasSize}
              selectedVisualization={selectedVisualization}
              handleCanvasMouseMove={handleCanvasMouseMove}
              handleCanvasMouseLeave={handleCanvasMouseLeave}
              handleCanvasClick={handleCanvasClick}
            />
          )
        )}

        {selectedVisualization === "comparison" && (
          <div className="flex items-center justify-center h-[500px] bg-white rounded-lg border border-slate-200">
            <div className="text-center">
              <p className="text-lg text-slate-800 font-medium">Comparison View Component</p>
              <p className="text-slate-600">This would load the dynamic comparison component</p>
            </div>
          </div>
        )}

        <VisualizationInfo
          selectedVisualization={selectedVisualization}
          selectedType={selectedType}
          selectedEnneagramType={selectedEnneagramType}
          enneagramTypes={enneagramTypes}
          dimensionExplanations={dimensionExplanations}
          selectedDimension={selectedDimension}
        />
      </CardContent>
    </Card>
  )
})

VisualizationMain.displayName = "VisualizationMain"

export default VisualizationMain
