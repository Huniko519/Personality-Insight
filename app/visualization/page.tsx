"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { personalityTypes } from "@/lib/personality-types"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { dimensionExplanations } from "@/lib/personality-explanations"

export default function VisualizationPage() {
  const [selectedVisualization, setSelectedVisualization] = useState<string>("type-wheel")
  const [selectedType, setSelectedType] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw visualization based on selection
        if (selectedVisualization === "type-wheel") {
          drawTypeWheel(ctx, canvas.width, canvas.height, selectedType)
        } else if (selectedVisualization === "cognitive-functions") {
          drawCognitiveFunctions(ctx, canvas.width, canvas.height, selectedType)
        } else if (selectedVisualization === "dimension-spectrum") {
          drawDimensionSpectrum(ctx, canvas.width, canvas.height)
        }
      }
    }
  }, [selectedVisualization, selectedType])

  // Function to draw the type wheel
  const drawTypeWheel = (ctx: CanvasRenderingContext2D, width: number, height: number, highlightType: string) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2.5

    // Draw background circle
    ctx.fillStyle = "#fff1f2" // rose-50
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()

    // Draw type segments
    const types = Object.keys(personalityTypes)
    const segmentAngle = (Math.PI * 2) / types.length

    types.forEach((type, index) => {
      const startAngle = index * segmentAngle
      const endAngle = startAngle + segmentAngle

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Fill with color based on type category
      let fillColor = "#fecdd3" // rose-200

      if (type.startsWith("IN"))
        fillColor = "#fda4af" // rose-300
      else if (type.startsWith("EN"))
        fillColor = "#fb7185" // rose-400
      else if (type.startsWith("IS"))
        fillColor = "#f43f5e" // rose-500
      else if (type.startsWith("ES")) fillColor = "#e11d48" // rose-600

      // Highlight selected type
      if (type === highlightType) {
        ctx.fillStyle = "#be123c" // rose-700
      } else {
        ctx.fillStyle = fillColor
      }

      ctx.fill()
      ctx.stroke()

      // Add type label
      const labelRadius = radius * 0.8
      const labelAngle = startAngle + segmentAngle / 2
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      ctx.fillStyle = "#fff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(type, labelX, labelY)
    })

    // Draw center circle
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Add title
    ctx.fillStyle = "#881337" // rose-900
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("MBTI Type Wheel", centerX, centerY)
  }

  // Function to draw cognitive functions visualization
  const drawCognitiveFunctions = (ctx: CanvasRenderingContext2D, width: number, height: number, type: string) => {
    if (!type) {
      // Draw prompt to select a type
      ctx.fillStyle = "#881337" // rose-900
      ctx.font = "bold 18px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Please select a personality type to view cognitive functions", width / 2, height / 2)
      return
    }

    const personalityType = personalityTypes[type]
    if (!personalityType) return

    const functions = personalityType.cognitiveFunctions
    const barHeight = 40
    const barSpacing = 20
    const barWidth = width * 0.7
    const startX = (width - barWidth) / 2
    const startY = 100

    // Draw title
    ctx.fillStyle = "#881337" // rose-900
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${type} Cognitive Functions`, width / 2, 50)

    // Draw function bars
    functions.forEach((func, index) => {
      const y = startY + index * (barHeight + barSpacing)

      // Function strength decreases with position
      const strength = 1 - index * 0.15
      const currentBarWidth = barWidth * strength

      // Draw bar background
      ctx.fillStyle = "#fecdd3" // rose-200
      ctx.fillRect(startX, y, barWidth, barHeight)

      // Draw bar fill based on function position
      let fillColor = "#f43f5e" // rose-500
      if (index === 0) fillColor = "#e11d48" // rose-600
      if (index === 1) fillColor = "#be123c" // rose-700

      ctx.fillStyle = fillColor
      ctx.fillRect(startX, y, currentBarWidth, barHeight)

      // Draw function name
      ctx.fillStyle = "#fff"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(func.name, startX + 10, y + barHeight / 2)

      // Draw function position
      ctx.fillStyle = "#881337" // rose-900
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(["Dominant", "Auxiliary", "Tertiary", "Inferior"][index], startX + barWidth - 10, y + barHeight / 2)
    })

    // Draw explanation
    ctx.fillStyle = "#881337" // rose-900
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const explanationY = startY + 4 * (barHeight + barSpacing) + 40
    ctx.fillText("The cognitive functions represent how your mind processes information", width / 2, explanationY)
    ctx.fillText(
      "and makes decisions. They are listed in order of preference and development.",
      width / 2,
      explanationY + 25,
    )
  }

  // Function to draw dimension spectrum
  const drawDimensionSpectrum = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const dimensions = ["EI", "SN", "TF", "JP"]
    const barHeight = 60
    const barSpacing = 40
    const barWidth = width * 0.8
    const startX = (width - barWidth) / 2
    const startY = 100

    // Draw title
    ctx.fillStyle = "#881337" // rose-900
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("Personality Dimensions Spectrum", width / 2, 50)

    // Draw dimension bars
    dimensions.forEach((dimension, index) => {
      const y = startY + index * (barHeight + barSpacing)

      // Draw bar background
      ctx.fillStyle = "#fecdd3" // rose-200
      ctx.fillRect(startX, y, barWidth, barHeight)

      // Draw center line
      ctx.fillStyle = "#fff"
      ctx.fillRect(startX + barWidth / 2 - 1, y, 2, barHeight)

      // Draw dimension labels
      ctx.fillStyle = "#881337" // rose-900
      ctx.font = "bold 18px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const leftLabel = dimension[0]
      const rightLabel = dimension[1]

      ctx.fillText(leftLabel, startX + barWidth * 0.25, y + barHeight / 2)
      ctx.fillText(rightLabel, startX + barWidth * 0.75, y + barHeight / 2)

      // Draw dimension names
      ctx.font = "16px Arial"
      ctx.fillText(
        dimensionExplanations[dimension as keyof typeof dimensionExplanations].title.split(" vs. ")[0],
        startX + barWidth * 0.25,
        y + barHeight / 2 + 25,
      )
      ctx.fillText(
        dimensionExplanations[dimension as keyof typeof dimensionExplanations].title.split(" vs. ")[1],
        startX + barWidth * 0.75,
        y + barHeight / 2 + 25,
      )
    })

    // Draw explanation
    ctx.fillStyle = "#881337" // rose-900
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const explanationY = startY + 4 * (barHeight + barSpacing) + 20
    ctx.fillText("Each personality type is defined by its position on these four dimensions.", width / 2, explanationY)
    ctx.fillText("Your preferences determine your four-letter type code.", width / 2, explanationY + 25)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Interactive Type Visualization</h1>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Explore personality types through interactive visualizations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <Card className="lg:col-span-1 border-rose-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-rose-800">Visualization Options</CardTitle>
                <CardDescription>Select a visualization type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-rose-700 font-medium mb-2">Visualization Type</label>
                  <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
                    <SelectTrigger className="border-rose-200">
                      <SelectValue placeholder="Select visualization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type-wheel">Type Wheel</SelectItem>
                      <SelectItem value="cognitive-functions">Cognitive Functions</SelectItem>
                      <SelectItem value="dimension-spectrum">Dimension Spectrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-rose-700 font-medium mb-2">Personality Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="border-rose-200">
                      <SelectValue placeholder="Select type (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {Object.keys(personalityTypes).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type} - {personalityTypes[type].name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-rose-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-rose-800">
                  {selectedVisualization === "type-wheel" && "MBTI Type Wheel"}
                  {selectedVisualization === "cognitive-functions" && "Cognitive Functions"}
                  {selectedVisualization === "dimension-spectrum" && "Personality Dimensions"}
                </CardTitle>
                <CardDescription>
                  {selectedVisualization === "type-wheel" && "Visual representation of all 16 personality types"}
                  {selectedVisualization === "cognitive-functions" &&
                    "How different functions stack in a personality type"}
                  {selectedVisualization === "dimension-spectrum" && "The four dimensions that define personality type"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg p-4 flex justify-center">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="max-w-full h-auto border border-rose-200 rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-rose-200 shadow-md mb-8">
            <CardHeader>
              <CardTitle className="text-rose-800">Understanding the Visualizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-rose-800 mb-2">Type Wheel</h3>
                <p className="text-rose-700">
                  The Type Wheel shows all 16 personality types arranged in a circle. Types are grouped by their
                  dominant cognitive functions, with similar types positioned near each other. Select a type to
                  highlight it on the wheel.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-rose-800 mb-2">Cognitive Functions</h3>
                <p className="text-rose-700">
                  This visualization shows the cognitive function stack for a selected personality type. The functions
                  are displayed in order of preference, from dominant to inferior. Each personality type has a unique
                  pattern of cognitive functions that influences how they perceive the world and make decisions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-rose-800 mb-2">Dimension Spectrum</h3>
                <p className="text-rose-700">
                  The Dimension Spectrum shows the four key dimensions that define personality type:
                  Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, and Judging-Perceiving. Your
                  preferences along these dimensions determine your four-letter type code.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
