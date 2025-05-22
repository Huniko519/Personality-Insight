"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Info, Download, Share2, ChevronRight, ChevronLeft, BarChart2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import SocialShare from "@/components/social-share"
import { getPersonalityExplanations, getAllPersonalityTypes, getEnneagramTypes } from "@/lib/firebase"

// Use dynamic import with no SSR for the comparison component
const ComparisonView = dynamic(() => import("@/components/comparison-view"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-white rounded-lg border border-slate-200">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600"></div>
        <p className="mt-4 text-lg text-slate-800 font-medium">Loading Comparison View...</p>
      </div>
    </div>
  ),
})

export default function VisualizationPage() {
  const router = useRouter()
  const [selectedVisualization, setSelectedVisualization] = useState<string>("type-wheel")
  const [selectedType, setSelectedType] = useState<string>("none")
  const [personalityTypes, setPersonalityTypes] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 650 })
  const [hoveredType, setHoveredType] = useState<string | null>(null)
  const [typePositions, setTypePositions] = useState<Record<string, { x: number; y: number; radius: number }>>({})
  const [animationFrame, setAnimationFrame] = useState<number | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [selectedDimension, setSelectedDimension] = useState<string>("EI")
  const [dimensionValue, setDimensionValue] = useState<number>(50)
  const [error, setError] = useState<string | null>(null)
  const [dimensionExplanations, setDimensionExplanations] = useState<any>({})

  // Add Enneagram types data and new visualization option
  const [enneagramTypes, setEnneagramTypes] = useState<Record<string, any>>({})
  const [isLoadingEnneagram, setIsLoadingEnneagram] = useState(true)
  const [selectedEnneagramType, setSelectedEnneagramType] = useState<string>("none")
  const [hoveredEnneagramType, setHoveredEnneagramType] = useState<string | null>(null)
  const [enneagramTypePositions, setEnneagramTypePositions] = useState<
    Record<string, { x: number; y: number; radius: number }>
  >({})

  // Read URL parameters to set initial visualization type
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const typeParam = searchParams.get("type")

    if (typeParam) {
      // Set visualization type based on URL parameter
      if (
        typeParam === "type-wheel" ||
        typeParam === "cognitive-functions" ||
        typeParam === "dimension-spectrum" ||
        typeParam === "comparison" ||
        typeParam === "enneagram-rings"
      ) {
        setSelectedVisualization(typeParam)
      }
    }
  }, [])

  // Load personality types
  useEffect(() => {
    const loadTypes = async () => {
      try {
        setIsLoading(true)
        const types = await getAllPersonalityTypes()
        const typesObj: Record<string, any> = {}
        types.forEach((type) => {
          typesObj[type.code] = type
        })
        setPersonalityTypes(typesObj)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading personality types:", error)
        setError("Failed to load personality types. Please try again later.")
        setIsLoading(false)
      }
    }

    loadTypes()
  }, [])

  // Load personality explanations
  useEffect(() => {
    const loadExplanations = async () => {
      try {
        const explanations = await getPersonalityExplanations()
        setDimensionExplanations(explanations.dimensionExplanations || {})
      } catch (error) {
        console.error("Error loading personality explanations:", error)
        setError("Failed to load personality explanations. Please try again later.")
      }
    }

    loadExplanations()
  }, [])

  // Load Enneagram types from Firebase
  useEffect(() => {
    const loadEnneagramTypes = async () => {
      try {
        setIsLoadingEnneagram(true)
        const types = await getEnneagramTypes()
        setEnneagramTypes(types)
        setIsLoadingEnneagram(false)
      } catch (error) {
        console.error("Error loading Enneagram types:", error)
        setError("Failed to load Enneagram types. Please try again later.")
        setIsLoadingEnneagram(false)
      }
    }

    loadEnneagramTypes()
  }, [])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationPhase((prev) => (prev + 0.01) % (Math.PI * 2))
      const frame = requestAnimationFrame(animate)
      setAnimationFrame(frame)
    }

    animate()
    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  useEffect(() => {
    if (
      canvasRef.current &&
      ["type-wheel", "cognitive-functions", "dimension-spectrum", "enneagram-rings"].includes(selectedVisualization) &&
      !isLoading &&
      (Object.keys(personalityTypes).length > 0 || selectedVisualization === "enneagram-rings")
    ) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw visualization based on selection
        if (selectedVisualization === "type-wheel") {
          const positions = drawTypeWheel(
            ctx,
            canvas.width,
            canvas.height,
            selectedType === "none" ? "" : selectedType,
            hoveredType,
            animationPhase,
          )
          setTypePositions(positions)
        } else if (selectedVisualization === "cognitive-functions") {
          drawCognitiveFunctions(
            ctx,
            canvas.width,
            canvas.height,
            selectedType === "none" ? "" : selectedType,
            animationPhase,
          )
        } else if (selectedVisualization === "dimension-spectrum") {
          drawDimensionSpectrum(ctx, canvas.width, canvas.height, animationPhase, selectedDimension, dimensionValue)
        } else if (selectedVisualization === "enneagram-rings") {
          const positions = drawEnneagramRings(
            ctx,
            canvas.width,
            canvas.height,
            selectedEnneagramType === "none" ? "" : selectedEnneagramType,
            hoveredEnneagramType,
            animationPhase,
          )
          setEnneagramTypePositions(positions)
        }
      }
    }
  }, [
    selectedVisualization,
    selectedType,
    hoveredType,
    canvasSize,
    animationPhase,
    selectedDimension,
    dimensionValue,
    isLoading,
    personalityTypes,
    selectedEnneagramType,
    hoveredEnneagramType,
    enneagramTypes,
  ])

  // Handle canvas mouse events
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    if (selectedVisualization !== "type-wheel" && selectedVisualization !== "enneagram-rings") return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (selectedVisualization === "type-wheel") {
      let hovered: string | null = null

      // Check if mouse is over any type segment
      Object.entries(typePositions).forEach(([type, position]) => {
        const dx = x - position.x
        const dy = y - position.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= position.radius) {
          hovered = type
        }
      })

      if (hovered !== hoveredType) {
        setHoveredType(hovered)
        canvas.style.cursor = hovered ? "pointer" : "default"
      }
    } else if (selectedVisualization === "enneagram-rings") {
      let hovered: string | null = null

      // Check if mouse is over any enneagram type
      Object.entries(enneagramTypePositions).forEach(([type, position]) => {
        const dx = x - position.x
        const dy = y - position.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= position.radius) {
          hovered = type
        }
      })

      if (hovered !== hoveredEnneagramType) {
        setHoveredEnneagramType(hovered)
        canvas.style.cursor = hovered ? "pointer" : "default"
      }
    }
  }

  const handleCanvasMouseLeave = () => {
    setHoveredType(null)
    setHoveredEnneagramType(null)
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "default"
    }
  }

  const handleCanvasClick = () => {
    if (selectedVisualization === "type-wheel" && hoveredType) {
      router.push(`/types/${hoveredType}`)
    } else if (selectedVisualization === "enneagram-rings" && hoveredEnneagramType) {
      // You can add navigation to enneagram type details page if you have one
      // For now, just select the type
      setSelectedEnneagramType(hoveredEnneagramType)
    }
  }

  // Function to download the visualization as an image
  const downloadVisualization = () => {
    if (!canvasRef.current && selectedVisualization !== "comparison") return

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `personality-${selectedVisualization}.png`
      link.click()
    } else {
      // For comparison, take a screenshot of the page
      alert("Download functionality for comparison is not available in this preview.")
    }
  }

  // Function to draw the type wheel with enhanced styling
  const drawTypeWheel = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    highlightType: string,
    hoverType: string | null,
    phase: number,
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2.5
    const positions: Record<string, { x: number; y: number; radius: number }> = {}

    // Enhanced color palette
    const bgColor1 = "#fff5f7" // rose-50 lighter
    const bgColor2 = "#ffe4e6" // rose-100
    const gridColor = "rgba(244, 63, 94, 0.08)" // rose-500 with lower opacity
    const textColor = "#881337" // rose-900
    const centerTextColor = "#fff"
    const segmentColors = {
      IN: {
        fill: "#fda4af", // rose-300
        gradient1: "#fecdd3", // rose-200
        gradient2: "#fda4af", // rose-300
      },
      EN: {
        fill: "#fb7185", // rose-400
        gradient1: "#fda4af", // rose-300
        gradient2: "#fb7185", // rose-400
      },
      IS: {
        fill: "#f43f5e", // rose-500
        gradient1: "#fb7185", // rose-400
        gradient2: "#f43f5e", // rose-500
      },
      ES: {
        fill: "#e11d48", // rose-600
        gradient1: "#f43f5e", // rose-500
        gradient2: "#e11d48", // rose-600
      },
      highlight: {
        fill: "#be123c", // rose-700
        gradient1: "#e11d48", // rose-600
        gradient2: "#be123c", // rose-700
      },
      hover: {
        fill: "#9f1239", // rose-800
        gradient1: "#be123c", // rose-700
        gradient2: "#9f1239", // rose-800
      },
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background with enhanced gradient
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5)
    bgGradient.addColorStop(0, bgColor1)
    bgGradient.addColorStop(0.7, bgColor1)
    bgGradient.addColorStop(1, bgColor2)
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Add subtle animated grid pattern
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1

    // Draw radial grid lines with animation
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24 + phase * 0.1
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius * 1.2, centerY + Math.sin(angle) * radius * 1.2)
      ctx.stroke()
    }

    // Draw concentric circles with animation
    for (let r = radius / 4; r <= radius * 1.2; r += radius / 4) {
      const animatedRadius = r + Math.sin(phase * 1.5 + r / 50) * 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, animatedRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Add outer glow effect
    const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius * 1.3)
    outerGlow.addColorStop(0, "rgba(244, 63, 94, 0.05)")
    outerGlow.addColorStop(0.5, "rgba(244, 63, 94, 0.03)")
    outerGlow.addColorStop(1, "rgba(244, 63, 94, 0)")
    ctx.fillStyle = outerGlow
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2)
    ctx.fill()

    // Draw main wheel background
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()

    // Add subtle shadow to main wheel
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
    ctx.shadowBlur = 15
    ctx.shadowOffsetY = 5
    ctx.strokeStyle = "rgba(244, 63, 94, 0.2)"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    // Draw type segments with enhanced styling
    const types = Object.keys(personalityTypes)
    const segmentAngle = (Math.PI * 2) / types.length

    types.forEach((type, index) => {
      const startAngle = index * segmentAngle
      const endAngle = startAngle + segmentAngle

      // Calculate position for this type (for hover detection)
      const midAngle = startAngle + segmentAngle / 2
      const segmentRadius = radius * 0.8
      const x = centerX + segmentRadius * Math.cos(midAngle)
      const y = centerY + segmentRadius * Math.sin(midAngle)
      positions[type] = { x, y, radius: radius / 4 }

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Determine segment color category
      let colorCategory: keyof typeof segmentColors = "IN"

      if (type.startsWith("IN")) colorCategory = "IN"
      else if (type.startsWith("EN")) colorCategory = "EN"
      else if (type.startsWith("IS")) colorCategory = "IS"
      else if (type.startsWith("ES")) colorCategory = "ES"

      // Highlight selected or hovered type
      if (type === highlightType) {
        colorCategory = "highlight"
      } else if (type === hoverType) {
        colorCategory = "hover"
      }

      // Create gradient for segment
      const gradientStartX = centerX + (radius / 2) * Math.cos(midAngle)
      const gradientStartY = centerY + (radius / 2) * Math.sin(midAngle)
      const gradientEndX = centerX + radius * Math.cos(midAngle)
      const gradientEndY = centerY + radius * Math.sin(midAngle)

      const segmentGradient = ctx.createLinearGradient(centerX, centerY, gradientEndX, gradientEndY)
      segmentGradient.addColorStop(0, segmentColors[colorCategory].gradient1)
      segmentGradient.addColorStop(1, segmentColors[colorCategory].gradient2)

      ctx.fillStyle = segmentGradient
      ctx.fill()

      // Add segment border with enhanced styling
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Add subtle inner shadow for depth
      ctx.save()
      ctx.clip()
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      ctx.lineWidth = 0
      ctx.stroke()
      ctx.restore()

      // Add type label with animation and enhanced styling
      const pulseEffect = 1 + Math.sin(phase * 2 + index * 0.3) * 0.03
      const labelRadius = radius * 0.75 * pulseEffect
      const labelAngle = startAngle + segmentAngle / 2
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      // Draw label background for better readability
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 4
      ctx.beginPath()
      ctx.arc(labelX, labelY, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Add subtle border to label background
      ctx.strokeStyle = "rgba(244, 63, 94, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw type text with enhanced styling
      ctx.fillStyle = textColor
      ctx.font = `bold ${type === hoverType || type === highlightType ? "16px" : "14px"} 'Arial', sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(type, labelX, labelY)

      // Add subtle glow effect for highlighted or hovered types
      if (type === highlightType || type === hoverType) {
        ctx.shadowColor = "rgba(244, 63, 94, 0.4)"
        ctx.shadowBlur = 10
        ctx.fillText(type, labelX, labelY)
        ctx.shadowBlur = 0
      }
    })

    // Draw center circle with enhanced styling
    const pulseSize = 1 + Math.sin(phase * 3) * 0.08
    const centerRadius = radius * 0.22 * pulseSize

    // Draw center circle glow
    ctx.shadowColor = "rgba(244, 63, 94, 0.4)"
    ctx.shadowBlur = 15
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerRadius + 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Draw center circle with gradient
    const centerGradient = ctx.createRadialGradient(
      centerX - centerRadius * 0.3,
      centerY - centerRadius * 0.3,
      0,
      centerX,
      centerY,
      centerRadius,
    )
    centerGradient.addColorStop(0, "#fda4af") // rose-300
    centerGradient.addColorStop(0.7, "#f43f5e") // rose-500
    centerGradient.addColorStop(1, "#e11d48") // rose-600

    ctx.fillStyle = centerGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
    ctx.fill()

    // Add highlight to center circle
    ctx.beginPath()
    ctx.arc(centerX - centerRadius * 0.3, centerY - centerRadius * 0.3, centerRadius * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
    ctx.fill()

    // Add title with enhanced styling
    ctx.fillStyle = centerTextColor
    ctx.font = "bold 16px 'Arial', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 3
    ctx.fillText("MBTI", centerX, centerY - 8)
    ctx.fillText("Type Wheel", centerX, centerY + 8)
    ctx.shadowBlur = 0

    // Add instruction text with enhanced styling
    ctx.fillStyle = textColor
    ctx.font = "italic 13px 'Arial', sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Click on a type to view details", centerX, height - 20)

    return positions
  }

  // Function to draw cognitive functions visualization
  const drawCognitiveFunctions = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    type: string,
    phase: number,
  ) => {
    if (!type) {
      // Draw prompt to select a type
      ctx.fillStyle = "#fff1f2" // slate-50
      ctx.fillRect(0, 0, width, height)

      // Add subtle background pattern
      ctx.strokeStyle = "rgba(100, 116, 139, 0.05)" // slate-500 with very low opacity
      ctx.lineWidth = 1

      // Grid pattern
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = 0; y < height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw animated prompt
      const pulseScale = 1 + Math.sin(phase * 3) * 0.05
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.scale(pulseScale, pulseScale)
      ctx.translate(-width / 2, -height / 2)

      // Draw icon
      ctx.fillStyle = "rgba(100, 116, 139, 0.1)" // slate-500 with low opacity
      ctx.beginPath()
      ctx.arc(width / 2, height / 2 - 50, 40, 0, Math.PI * 2)
      ctx.fill()

      // Draw arrow
      ctx.strokeStyle = "rgba(100, 116, 139, 0.6)" // slate-500 with medium opacity
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(width / 2, height / 2 - 70)
      ctx.lineTo(width / 2, height / 2 - 30)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(width / 2 - 10, height / 2 - 40)
      ctx.lineTo(width / 2, height / 2 - 30)
      ctx.lineTo(width / 2 + 10, height / 2 - 40)
      ctx.stroke()

      ctx.restore()

      // Draw text with shadow
      ctx.shadowColor = "rgba(100, 116, 139, 0.3)" // slate-500 with medium opacity
      ctx.fillStyle = "#881337" // slate-900
      ctx.font = "bold 22px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Please select a personality type", width / 2, height / 2 + 10)

      // Draw subtitle with pulsing opacity
      const pulseOpacity = 0.6 + Math.sin(phase * 3) * 0.3
      ctx.shadowBlur = 0
      ctx.fillStyle = `rgba(100, 116, 139, ${pulseOpacity})` // slate-500 with pulsing opacity
      ctx.font = "18px Arial"
      ctx.fillText("to view cognitive functions", width / 2, height / 2 + 45)

      return
    }

    const personalityType = personalityTypes[type]
    if (!personalityType) return

    const functions = personalityType.cognitiveFunctions
    const barHeight = 50
    const barSpacing = 30
    const barWidth = width * 0.7
    const startX = (width - barWidth) / 2
    const startY = 120

    // Colors
    const bgColor = "#fff1f2" // slate-50
    const textColor = "#881337" // slate-900
    const titleColor = "#9f1239" // slate-800
    const barColors = [
      { fill: "#be123c", text: "#ffffff" }, // Dominant - slate-700
      { fill: "#e11d48", text: "#ffffff" }, // Auxiliary - slate-600
      { fill: "#f43f5e", text: "#ffffff" }, // Tertiary - slate-500
      { fill: "#fb7185", text: "#9f1239" }, // Inferior - slate-400
    ]
    const positionLabels = ["Dominant", "Auxiliary", "Tertiary", "Inferior"]
    const positionColors = ["#9f1239", "#be123c", "#e11d48", "#f43f5e"] // slate-800 to slate-500

    // Draw background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Add subtle background pattern
    ctx.strokeStyle = "rgba(100, 116, 139, 0.05)" // slate-500 with very low opacity
    ctx.lineWidth = 1

    // Grid pattern
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += 30) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw title with enhanced styling
    ctx.shadowColor = "rgba(100, 116, 139, 0.3)" // slate-500 with medium opacity
    ctx.shadowBlur = 10
    ctx.shadowOffsetY = 2
    ctx.fillStyle = titleColor
    ctx.font = "bold 28px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${type} Cognitive Functions`, width / 2, 60)
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    // Draw function bars with enhanced styling
    functions.forEach((func: any, index: any) => {
      const y = startY + index * (barHeight + barSpacing)

      // Function strength decreases with position
      const strength = 1 - index * 0.15
      // Animate the bar width with subtle effect
      const animationProgress = Math.sin(phase * 3 + index) * 0.03 + 0.97
      const currentBarWidth = barWidth * strength * animationProgress

      // Draw bar background with rounded corners
      const cornerRadius = barHeight / 2
      ctx.fillStyle = "rgba(226, 232, 240, 0.5)" // slate-200 with opacity

      // Draw rounded rectangle for background
      ctx.beginPath()
      ctx.moveTo(startX + cornerRadius, y)
      ctx.lineTo(startX + barWidth - cornerRadius, y)
      ctx.arc(startX + barWidth - cornerRadius, y + cornerRadius, cornerRadius, -Math.PI / 2, 0, false)
      ctx.lineTo(startX + barWidth, y + barHeight - cornerRadius)
      ctx.arc(startX + barWidth - cornerRadius, y + barHeight - cornerRadius, cornerRadius, 0, Math.PI / 2, false)
      ctx.lineTo(startX + cornerRadius, y + barHeight)
      ctx.arc(startX + cornerRadius, y + barHeight - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false)
      ctx.lineTo(startX, y + cornerRadius)
      ctx.arc(startX + cornerRadius, y + cornerRadius, cornerRadius, Math.PI, (3 * Math.PI) / 2, false)
      ctx.closePath()
      ctx.fill()

      // Draw bar fill with rounded corners
      ctx.fillStyle = barColors[index].fill

      // Calculate end position for the filled part
      const endX = startX + currentBarWidth

      // Draw filled rounded rectangle
      ctx.beginPath()
      ctx.moveTo(startX + cornerRadius, y)
      ctx.lineTo(endX - cornerRadius, y)
      ctx.arc(endX - cornerRadius, y + cornerRadius, cornerRadius, -Math.PI / 2, 0, false)
      ctx.lineTo(endX, y + barHeight - cornerRadius)
      ctx.arc(endX - cornerRadius, y + barHeight - cornerRadius, cornerRadius, 0, Math.PI / 2, false)
      ctx.lineTo(startX + cornerRadius, y + barHeight)
      ctx.arc(startX + cornerRadius, y + barHeight - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false)
      ctx.lineTo(startX, y + cornerRadius)
      ctx.arc(startX + cornerRadius, y + cornerRadius, cornerRadius, Math.PI, (3 * Math.PI) / 2, false)
      ctx.closePath()
      ctx.fill()

      // Add subtle shadow to the bar
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 5
      ctx.shadowOffsetY = 2
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.shadowOffsetY = 0

      // Draw function name with enhanced styling
      ctx.fillStyle = barColors[index].text
      ctx.font = "bold 18px Arial"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(func.name, startX + 20, y + barHeight / 2)

      // Draw position label with badge styling
      const positionWidth = ctx.measureText(positionLabels[index]).width + 30
      const badgeX = startX + barWidth - positionWidth - 15
      const badgeY = y + barHeight / 2 - 12
      const badgeHeight = 24
      const badgeRadius = badgeHeight / 2

      // Draw badge background
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.beginPath()
      ctx.moveTo(badgeX + badgeRadius, badgeY)
      ctx.lineTo(badgeX + positionWidth - badgeRadius, badgeY)
      ctx.arc(badgeX + positionWidth - badgeRadius, badgeY + badgeRadius, badgeRadius, -Math.PI / 2, 0, false)
      ctx.lineTo(badgeX + positionWidth, badgeY + badgeHeight - badgeRadius)
      ctx.arc(
        badgeX + positionWidth - badgeRadius,
        badgeY + badgeHeight - badgeRadius,
        badgeRadius,
        0,
        Math.PI / 2,
        false,
      )
      ctx.lineTo(badgeX + badgeRadius, badgeY + badgeHeight)
      ctx.arc(badgeX + badgeRadius, badgeY + badgeHeight - badgeRadius, badgeRadius, Math.PI / 2, Math.PI, false)
      ctx.lineTo(badgeX, badgeY + badgeRadius)
      ctx.arc(badgeX + badgeRadius, badgeY + badgeRadius, badgeRadius, Math.PI, (3 * Math.PI) / 2, false)
      ctx.closePath()
      ctx.fill()

      // Draw position text
      ctx.fillStyle = positionColors[index]
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(positionLabels[index], badgeX + positionWidth / 2, badgeY + badgeHeight / 2)
    })

    // Draw explanation box
    const boxY = startY + 4 * (barHeight + barSpacing) + 20
    const boxHeight = 80
    const boxWidth = Math.min(600, width * 0.9)
    const boxX = width / 2 - boxWidth / 2

    // Draw box with subtle animation
    const animatedBoxY = boxY + Math.sin(phase * 2) * 3

    // Draw box background
    ctx.fillStyle = "rgba(226, 232, 240, 0.4)" // slate-200 with opacity
    ctx.shadowColor = "rgba(100, 116, 139, 0.2)"
    ctx.shadowBlur = 10

    // Draw rounded box
    const boxRadius = 15
    ctx.beginPath()
    ctx.moveTo(boxX + boxRadius, animatedBoxY)
    ctx.lineTo(boxX + boxWidth - boxRadius, animatedBoxY)
    ctx.arc(boxX + boxWidth - boxRadius, animatedBoxY + boxRadius, boxRadius, -Math.PI / 2, 0, false)
    ctx.lineTo(boxX + boxWidth, animatedBoxY + boxHeight - boxRadius)
    ctx.arc(boxX + boxWidth - boxRadius, animatedBoxY + boxHeight - boxRadius, boxRadius, 0, Math.PI / 2, false)
    ctx.lineTo(boxX + boxRadius, animatedBoxY + boxHeight)
    ctx.arc(boxX + boxRadius, animatedBoxY + boxHeight - boxRadius, boxRadius, Math.PI / 2, Math.PI, false)
    ctx.lineTo(boxX, animatedBoxY + boxRadius)
    ctx.arc(boxX + boxRadius, animatedBoxY + boxRadius, boxRadius, Math.PI, (3 * Math.PI) / 2, false)
    ctx.closePath()
    ctx.fill()

    // Add subtle border
    ctx.strokeStyle = "rgba(100, 116, 139, 0.3)"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.shadowBlur = 0

    // Draw explanation text
    ctx.fillStyle = textColor
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("The cognitive functions represent how your mind processes information", width / 2, animatedBoxY + 25)
    ctx.fillText(
      "and makes decisions. They are listed in order of preference and development.",
      width / 2,
      animatedBoxY + 55,
    )
  }

  // Function to draw dimension spectrum with enhanced visuals
  const drawDimensionSpectrum = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    phase: number,
    activeDimension: string,
    sliderValue: number,
  ) => {
    const dimensions = ["EI", "SN", "TF", "JP"]
    const barHeight = 60
    const barSpacing = 40
    const barWidth = width * 0.8
    const startX = (width - barWidth) / 2
    const startY = 100

    // Enhanced colors for more attractive design
    const bgColor = "#fff5f7" // rose-50
    const textColor = "#881337" // rose-900
    const barColors = {
      active: {
        left: "#fb7185", // rose-400
        right: "#f43f5e", // rose-500
        bg: "#fecdd3", // rose-200
      },
      inactive: {
        left: "#fda4af", // rose-300
        right: "#fda4af", // rose-300
        bg: "#fee2e2", // rose-100
      },
    }
    const highlightColor = "#e11d48" // rose-600

    // Draw background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Add subtle background pattern
    ctx.strokeStyle = "rgba(244, 63, 94, 0.05)"
    ctx.lineWidth = 1

    // Grid pattern
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += 30) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw title
    ctx.fillStyle = textColor
    ctx.font = "bold 28px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.shadowColor = "rgba(244, 63, 94, 0.3)"
    ctx.shadowBlur = 10
    ctx.shadowOffsetY = 2
    ctx.fillText("Personality Dimensions Spectrum", width / 2, 50)
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    // Draw dimension bars
    dimensions.forEach((dimension, index) => {
      const y = startY + index * (barHeight + barSpacing)
      const isActive = dimension === activeDimension

      // Draw bar background
      ctx.fillStyle = isActive ? barColors.active.bg : barColors.inactive.bg

      // Draw rounded rectangle for bar background
      const cornerRadius = barHeight / 2
      ctx.beginPath()
      ctx.moveTo(startX + cornerRadius, y)
      ctx.lineTo(startX + barWidth - cornerRadius, y)
      ctx.arc(startX + barWidth - cornerRadius, y + cornerRadius, cornerRadius, -Math.PI / 2, 0, false)
      ctx.lineTo(startX + barWidth, y + barHeight - cornerRadius)
      ctx.arc(startX + barWidth - cornerRadius, y + barHeight - cornerRadius, cornerRadius, 0, Math.PI / 2, false)
      ctx.lineTo(startX + cornerRadius, y + barHeight)
      ctx.arc(startX + cornerRadius, y + barHeight - cornerRadius, cornerRadius, Math.PI / 2, Math.PI, false)
      ctx.lineTo(startX, y + cornerRadius)
      ctx.arc(startX + cornerRadius, y + cornerRadius, cornerRadius, Math.PI, (3 * Math.PI) / 2, false)
      ctx.closePath()
      ctx.fill()

      // Draw center divider line
      ctx.fillStyle = "#fff"
      ctx.fillRect(startX + barWidth / 2 - 1, y, 2, barHeight)

      // Draw dimension labels
      ctx.fillStyle = textColor
      ctx.font = isActive ? "bold 24px Arial" : "bold 22px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Left label (first letter)
      ctx.fillText(dimension[0], startX + barWidth * 0.25, y + barHeight / 2)

      // Right label (second letter)
      ctx.fillText(dimension[1], startX + barWidth * 0.75, y + barHeight / 2)

      // Draw indicator for active dimension
      if (isActive) {
        const indicatorPos = startX + (barWidth * sliderValue) / 100

        // Draw glow effect
        ctx.shadowColor = "rgba(244, 63, 94, 0.6)"
        ctx.shadowBlur = 15

        // Draw indicator circle
        ctx.fillStyle = "#fff"
        ctx.beginPath()
        ctx.arc(indicatorPos, y + barHeight / 2, 12, 0, Math.PI * 2)
        ctx.fill()

        // Draw indicator border
        ctx.strokeStyle = highlightColor
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.shadowBlur = 0

        // Draw pulse effect
        const pulseSize = 1 + Math.sin(phase * 5) * 0.2
        ctx.strokeStyle = `rgba(225, 29, 72, ${0.5 - Math.sin(phase * 5) * 0.3})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(indicatorPos, y + barHeight / 2, 18 * pulseSize, 0, Math.PI * 2)
        ctx.stroke()
      }
    })

    // Draw explanation box
    const boxY = startY + 4 * (barHeight + barSpacing) + 20
    const boxHeight = 100
    const boxWidth = Math.min(600, width * 0.9)
    const boxX = width / 2 - boxWidth / 2

    // Draw box with subtle animation
    const animatedBoxY = boxY + Math.sin(phase * 2) * 3

    // Draw box background
    ctx.fillStyle = "rgba(254, 205, 211, 0.4)" // rose-200 with opacity
    ctx.shadowColor = "rgba(244, 63, 94, 0.2)"
    ctx.shadowBlur = 10

    // Draw rounded box
    const boxRadius = 15
    ctx.beginPath()
    ctx.moveTo(boxX + boxRadius, animatedBoxY)
    ctx.lineTo(boxX + boxWidth - boxRadius, animatedBoxY)
    ctx.arc(boxX + boxWidth - boxRadius, animatedBoxY + boxRadius, boxRadius, -Math.PI / 2, 0, false)
    ctx.lineTo(boxX + boxWidth, animatedBoxY + boxHeight - boxRadius)
    ctx.arc(boxX + boxWidth - boxRadius, animatedBoxY + boxHeight - boxRadius, boxRadius, 0, Math.PI / 2, false)
    ctx.lineTo(boxX + boxRadius, animatedBoxY + boxHeight)
    ctx.arc(boxX + boxRadius, animatedBoxY + boxHeight - boxRadius, boxRadius, Math.PI / 2, Math.PI, false)
    ctx.lineTo(boxX, animatedBoxY + boxRadius)
    ctx.arc(boxX + boxRadius, animatedBoxY + boxRadius, boxRadius, Math.PI, (3 * Math.PI) / 2, false)
    ctx.closePath()
    ctx.fill()

    // Add subtle border
    ctx.strokeStyle = "rgba(244, 63, 94, 0.3)"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.shadowBlur = 0

    // Get the active dimension explanation
    const activeDimensionInfo = dimensionExplanations[activeDimension as keyof typeof dimensionExplanations]
    const title = activeDimensionInfo.title

    // Draw title
    ctx.fillStyle = textColor
    ctx.font = "bold 18px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(title, width / 2, animatedBoxY + 25)

    // Draw description
    ctx.font = "15px Arial"
    const description = activeDimensionInfo.description

    // Split description into multiple lines
    const words = description.split(" ")
    let line = ""
    let y = animatedBoxY + 55
    const maxWidth = boxWidth - 40

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " "
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, width / 2, y)
        line = words[i] + " "
        y += 22
      } else {
        line = testLine
      }
    }

    ctx.fillText(line, width / 2, y)
  }

  // Function to draw Enneagram Rings
  const drawEnneagramRings = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    highlightType: string,
    hoverType: string | null,
    phase: number,
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const outerRadius = Math.min(width, height) / 2.5
    const innerRadius = outerRadius * 0.6
    const positions: Record<string, { x: number; y: number; radius: number }> = {}

    // Enhanced color palette
    const bgColor = "#fff5f7" // rose-50
    const gridColor = "rgba(244, 63, 94, 0.08)" // rose-500 with lower opacity
    const textColor = "#881337" // rose-900
    const centerTextColor = "#fff"
    const lineColor = "rgba(244, 63, 94, 0.3)" // rose-500 with medium opacity

    // Centers of Intelligence colors
    const centersColors = {
      Instinctive: "rgba(225, 29, 72, 0.2)", // rose-600 with opacity
      Feeling: "rgba(251, 113, 133, 0.2)", // rose-400 with opacity
      Thinking: "rgba(253, 164, 175, 0.2)", // rose-300 with opacity
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background with gradient
    const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, outerRadius * 1.5)
    bgGradient.addColorStop(0, bgColor)
    bgGradient.addColorStop(0.7, bgColor)
    bgGradient.addColorStop(1, "#ffe4e6") // rose-100
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Add subtle animated grid pattern
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1

    // Draw radial grid lines with animation
    for (let i = 0; i < 18; i++) {
      const angle = (i * Math.PI * 2) / 18 + phase * 0.1
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * outerRadius * 1.2, centerY + Math.sin(angle) * outerRadius * 1.2)
      ctx.stroke()
    }

    // Draw concentric circles with animation
    for (let r = outerRadius / 4; r <= outerRadius * 1.2; r += outerRadius / 4) {
      const animatedRadius = r + Math.sin(phase * 1.5 + r / 50) * 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, animatedRadius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw outer glow effect
    const outerGlow = ctx.createRadialGradient(centerX, centerY, outerRadius * 0.9, centerX, centerY, outerRadius * 1.3)
    outerGlow.addColorStop(0, "rgba(244, 63, 94, 0.05)")
    outerGlow.addColorStop(0.5, "rgba(244, 63, 94, 0.03)")
    outerGlow.addColorStop(1, "rgba(244, 63, 94, 0)")
    ctx.fillStyle = outerGlow
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius * 1.3, 0, Math.PI * 2)
    ctx.fill()

    // Draw main outer circle
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
    ctx.fill()

    // Add subtle shadow to main wheel
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
    ctx.shadowBlur = 15
    ctx.shadowOffsetY = 5
    ctx.strokeStyle = "rgba(244, 63, 94, 0.2)"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    // Draw inner circle
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "rgba(244, 63, 94, 0.2)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw Centers of Intelligence regions
    const instinctiveTypes = ["8", "9", "1"]
    const feelingTypes = ["2", "3", "4"]
    const thinkingTypes = ["5", "6", "7"]

    // Draw Instinctive Center (types 8,9,1)
    ctx.beginPath()
    const instStartAngle = ((8 - 1) * Math.PI * 2) / 9 - Math.PI / 2
    const instEndAngle = (1 * Math.PI * 2) / 9 - Math.PI / 2
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, outerRadius, instStartAngle, instEndAngle)
    ctx.closePath()
    ctx.fillStyle = centersColors["Instinctive"]
    ctx.fill()

    // Draw Feeling Center (types 2,3,4)
    ctx.beginPath()
    const feelStartAngle = ((2 - 1) * Math.PI * 2) / 9 - Math.PI / 2
    const feelEndAngle = (4 * Math.PI * 2) / 9 - Math.PI / 2
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, outerRadius, feelStartAngle, feelEndAngle)
    ctx.closePath()
    ctx.fillStyle = centersColors["Feeling"]
    ctx.fill()

    // Draw Thinking Center (types 5,6,7)
    ctx.beginPath()
    const thinkStartAngle = ((5 - 1) * Math.PI * 2) / 9 - Math.PI / 2
    const thinkEndAngle = (7 * Math.PI * 2) / 9 - Math.PI / 2
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, outerRadius, thinkStartAngle, thinkEndAngle)
    ctx.closePath()
    ctx.fillStyle = centersColors["Thinking"]
    ctx.fill()

    // Draw Enneagram symbol (triangle and hexad)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2

    // Draw triangle
    ctx.beginPath()
    const trianglePoints = [3, 6, 9] // Points of the triangle
    const triangleVertices = trianglePoints.map((point) => {
      const angle = ((point - 1) * Math.PI * 2) / 9 - Math.PI / 2
      return {
        x: centerX + innerRadius * 0.8 * Math.cos(angle),
        y: centerY + innerRadius * 0.8 * Math.sin(angle),
      }
    })

    ctx.moveTo(triangleVertices[0].x, triangleVertices[0].y)
    ctx.lineTo(triangleVertices[1].x, triangleVertices[1].y)
    ctx.lineTo(triangleVertices[2].x, triangleVertices[2].y)
    ctx.closePath()
    ctx.stroke()

    // Draw hexad (connecting points 1, 4, 2, 8, 5, 7)
    const hexadPoints = [1, 4, 2, 8, 5, 7]
    const hexadVertices = hexadPoints.map((point) => {
      const angle = ((point - 1) * Math.PI * 2) / 9 - Math.PI / 2
      return {
        x: centerX + innerRadius * 0.8 * Math.cos(angle),
        y: centerY + innerRadius * 0.8 * Math.sin(angle),
      }
    })

    ctx.beginPath()
    ctx.moveTo(hexadVertices[0].x, hexadVertices[0].y)
    for (let i = 1; i < hexadVertices.length; i++) {
      ctx.lineTo(hexadVertices[i].x, hexadVertices[i].y)
    }
    ctx.closePath()
    ctx.stroke()

    // Draw type segments
    const types = Object.keys(enneagramTypes)
    const segmentAngle = (Math.PI * 2) / types.length

    types.forEach((type, index) => {
      // Calculate position for this type (for hover detection)
      const angle = index * segmentAngle - Math.PI / 2 // Start from top (12 o'clock position)
      const midAngle = angle + segmentAngle / 2
      const segmentRadius = (outerRadius + innerRadius) / 2
      const x = centerX + segmentRadius * Math.cos(midAngle)
      const y = centerY + segmentRadius * Math.sin(midAngle)
      positions[type] = { x, y, radius: (outerRadius - innerRadius) / 2 }

      // Draw segment highlight if selected or hovered
      if (type === highlightType || type === hoverType) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, outerRadius, angle, angle + segmentAngle)
        ctx.lineTo(centerX, centerY)
        ctx.closePath()

        // Create gradient for segment
        const gradientStartX = centerX + (innerRadius / 2) * Math.cos(midAngle)
        const gradientStartY = centerY + (innerRadius / 2) * Math.sin(midAngle)
        const gradientEndX = centerX + outerRadius * Math.cos(midAngle)
        const gradientEndY = centerY + outerRadius * Math.sin(midAngle)

        const segmentGradient = ctx.createLinearGradient(centerX, centerY, gradientEndX, gradientEndY)
        segmentGradient.addColorStop(0, "rgba(244, 63, 94, 0.2)")
        segmentGradient.addColorStop(1, "rgba(244, 63, 94, 0.4)")

        ctx.fillStyle = segmentGradient
        ctx.fill()

        // Draw wing connections if a type is selected
        if (type === highlightType) {
          // Get the wing numbers (adjacent types)
          const typeNum = Number.parseInt(type)
          const leftWing = typeNum === 1 ? "9" : (typeNum - 1).toString()
          const rightWing = typeNum === 9 ? "1" : (typeNum + 1).toString()

          // Calculate positions for the wings
          const leftWingAngle = ((Number.parseInt(leftWing) - 1) * Math.PI * 2) / 9 - Math.PI / 2
          const rightWingAngle = ((Number.parseInt(rightWing) - 1) * Math.PI * 2) / 9 - Math.PI / 2

          const leftWingMidAngle = leftWingAngle + segmentAngle / 2
          const rightWingMidAngle = rightWingAngle + segmentAngle / 2

          const leftWingX = centerX + segmentRadius * Math.cos(leftWingMidAngle)
          const leftWingY = centerY + segmentRadius * Math.sin(leftWingMidAngle)

          const rightWingX = centerX + segmentRadius * Math.cos(rightWingMidAngle)
          const rightWingY = centerY + segmentRadius * Math.sin(rightWingMidAngle)

          // Draw wing connections with animation
          const pulseOpacity = 0.6 + Math.sin(phase * 3) * 0.3

          // Left wing connection
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(leftWingX, leftWingY)
          ctx.strokeStyle = `rgba(244, 63, 94, ${pulseOpacity})`
          ctx.lineWidth = 3
          ctx.stroke()

          // Right wing connection
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(rightWingX, rightWingY)
          ctx.strokeStyle = `rgba(244, 63, 94, ${pulseOpacity})`
          ctx.lineWidth = 3
          ctx.stroke()

          // Draw wing labels
          ctx.font = "bold 12px Arial"
          ctx.fillStyle = "#881337"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"

          // Calculate positions for wing labels
          const leftLabelX = (x + leftWingX) / 2
          const leftLabelY = (y + leftWingY) / 2

          const rightLabelX = (x + rightWingX) / 2
          const rightLabelY = (y + rightWingY) / 2

          // Draw wing label backgrounds
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.beginPath()
          ctx.arc(leftLabelX, leftLabelY, 15, 0, Math.PI * 2)
          ctx.fill()

          ctx.beginPath()
          ctx.arc(rightLabelX, rightLabelY, 15, 0, Math.PI * 2)
          ctx.fill()

          // Draw wing labels
          ctx.fillStyle = "#881337"
          ctx.fillText(`${type}w${leftWing}`, leftLabelX, leftLabelY)
          ctx.fillText(`${type}w${rightWing}`, rightLabelX, rightLabelY)

          // Draw growth and stress arrows if a type is selected
          if (enneagramTypes[type].growth && enneagramTypes[type].stress) {
            const growthType = enneagramTypes[type].growth
            const stressType = enneagramTypes[type].stress

            // Calculate positions
            const growthAngle = ((Number.parseInt(growthType) - 1) * Math.PI * 2) / 9 - Math.PI / 2
            const stressAngle = ((Number.parseInt(stressType) - 1) * Math.PI * 2) / 9 - Math.PI / 2

            const growthMidAngle = growthAngle + segmentAngle / 2
            const stressMidAngle = stressAngle + segmentAngle / 2

            const growthX = centerX + segmentRadius * Math.cos(growthMidAngle)
            const growthY = centerY + segmentRadius * Math.sin(growthMidAngle)

            const stressX = centerX + segmentRadius * Math.cos(stressMidAngle)
            const stressY = centerY + segmentRadius * Math.sin(stressMidAngle)

            // Draw growth arrow (green)
            ctx.beginPath()
            ctx.moveTo(x, y)

            // Create a curved line for the growth arrow
            const growthControlX = (x + growthX) / 2 + (Math.random() - 0.5) * 30
            const growthControlY = (y + growthY) / 2 + (Math.random() - 0.5) * 30

            ctx.quadraticCurveTo(growthControlX, growthControlY, growthX, growthY)
            ctx.strokeStyle = "rgba(34, 197, 94, 0.6)" // green-500 with opacity
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw arrowhead for growth
            const growthArrowAngle = Math.atan2(growthY - growthControlY, growthX - growthControlX)
            ctx.beginPath()
            ctx.moveTo(growthX, growthY)
            ctx.lineTo(
              growthX - 10 * Math.cos(growthArrowAngle - Math.PI / 6),
              growthY - 10 * Math.sin(growthArrowAngle - Math.PI / 6),
            )
            ctx.lineTo(
              growthX - 10 * Math.cos(growthArrowAngle + Math.PI / 6),
              growthY - 10 * Math.sin(growthArrowAngle + Math.PI / 6),
            )
            ctx.closePath()
            ctx.fillStyle = "rgba(34, 197, 94, 0.6)"
            ctx.fill()

            // Draw stress arrow (red)
            ctx.beginPath()
            ctx.moveTo(x, y)

            // Create a curved line for the stress arrow
            const stressControlX = (x + stressX) / 2 + (Math.random() - 0.5) * 30
            const stressControlY = (y + stressY) / 2 + (Math.random() - 0.5) * 30

            ctx.quadraticCurveTo(stressControlX, stressControlY, stressX, stressY)
            ctx.strokeStyle = "rgba(239, 68, 68, 0.6)" // red-500 with opacity
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw arrowhead for stress
            const stressArrowAngle = Math.atan2(stressY - stressControlY, stressX - stressControlX)
            ctx.beginPath()
            ctx.moveTo(stressX, stressY)
            ctx.lineTo(
              stressX - 10 * Math.cos(stressArrowAngle - Math.PI / 6),
              stressY - 10 * Math.sin(stressArrowAngle - Math.PI / 6),
            )
            ctx.lineTo(
              stressX - 10 * Math.cos(stressArrowAngle + Math.PI / 6),
              stressY - 10 * Math.sin(stressArrowAngle + Math.PI / 6),
            )
            ctx.closePath()
            ctx.fillStyle = "rgba(239, 68, 68, 0.6)"
            ctx.fill()

            // Draw growth/stress labels
            ctx.font = "bold 12px Arial"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Growth label
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.beginPath()
            ctx.arc((x + growthX) / 2, (y + growthY) / 2, 15, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = "rgba(34, 197, 94, 0.8)"
            ctx.fillText("Growth", (x + growthX) / 2, (y + growthY) / 2)

            // Stress label
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.beginPath()
            ctx.arc((x + stressX) / 2, (y + stressY) / 2, 15, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = "rgba(239, 68, 68, 0.8)"
            ctx.fillText("Stress", (x + stressX) / 2, (y + stressY) / 2)
          }
        }
      }

      // Draw type number with animation and enhanced styling
      const pulseEffect = 1 + Math.sin(phase * 2 + index * 0.3) * 0.03
      const labelRadius = ((outerRadius + innerRadius) / 2) * pulseEffect
      const labelX = centerX + labelRadius * Math.cos(midAngle)
      const labelY = centerY + labelRadius * Math.sin(midAngle)

      // Draw label background for better readability
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 4
      ctx.beginPath()
      ctx.arc(labelX, labelY, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Add subtle border to label background
      ctx.strokeStyle = "rgba(244, 63, 94, 0.3)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw type number with enhanced styling
      ctx.fillStyle = enneagramTypes[type].color
      ctx.font = `bold ${type === hoverType || type === highlightType ? "18px" : "16px"} 'Arial', sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(type, labelX, labelY)

      // Add subtle glow effect for highlighted or hovered types
      if (type === highlightType || type === hoverType) {
        ctx.shadowColor = "rgba(244, 63, 94, 0.4)"
        ctx.shadowBlur = 10
        ctx.fillText(type, labelX, labelY)
        ctx.shadowBlur = 0
      }
    })

    // Draw center circle with enhanced styling
    const pulseSize = 1 + Math.sin(phase * 3) * 0.08
    const centerRadius = innerRadius * 0.3 * pulseSize

    // Draw center circle glow
    ctx.shadowColor = "rgba(244, 63, 94, 0.4)"
    ctx.shadowBlur = 15
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerRadius + 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Draw center circle with gradient
    const centerGradient = ctx.createRadialGradient(
      centerX - centerRadius * 0.3,
      centerY - centerRadius * 0.3,
      0,
      centerX,
      centerY,
      centerRadius,
    )
    centerGradient.addColorStop(0, "#fda4af") // rose-300
    centerGradient.addColorStop(0.7, "#f43f5e") // rose-500
    centerGradient.addColorStop(1, "#e11d48") // rose-600

    ctx.fillStyle = centerGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
    ctx.fill()

    // Add highlight to center circle
    ctx.beginPath()
    ctx.arc(centerX - centerRadius * 0.3, centerY - centerRadius * 0.3, centerRadius * 0.6, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
    ctx.fill()

    // Add title with enhanced styling
    ctx.fillStyle = centerTextColor
    ctx.font = "bold 16px 'Arial', sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
    ctx.shadowBlur = 3
    ctx.fillText("Enneagram", centerX, centerY)
    ctx.shadowBlur = 0

    // Add Centers of Intelligence labels
    ctx.font = "bold 14px 'Arial', sans-serif"

    // Instinctive Center label
    const instLabelAngle = Math.PI * 1.83 // Position for the Instinctive label
    const instLabelX = centerX + (outerRadius + 40) * Math.cos(instLabelAngle)
    const instLabelY = centerY + (outerRadius + 40) * Math.sin(instLabelAngle)
    ctx.fillStyle = "#881337"
    ctx.fillText("Instinctive Center", instLabelX, instLabelY)

    // Feeling Center label
    const feelLabelAngle = Math.PI * 0.5 // Position for the Feeling label
    const feelLabelX = centerX + (outerRadius + 40) * Math.cos(feelLabelAngle)
    const feelLabelY = centerY + (outerRadius + 40) * Math.sin(feelLabelAngle)
    ctx.fillStyle = "#881337"
    ctx.fillText("Feeling Center", feelLabelX, feelLabelY)

    // Thinking Center label
    const thinkLabelAngle = Math.PI * 1.17 // Position for the Thinking label
    const thinkLabelX = centerX + (outerRadius + 40) * Math.cos(thinkLabelAngle)
    const thinkLabelY = centerY + (outerRadius + 40) * Math.sin(thinkLabelAngle)
    ctx.fillStyle = "#881337"
    ctx.fillText("Thinking Center", thinkLabelX, thinkLabelY)

    // Add legend for growth and stress arrows
    if (highlightType) {
      const legendY = height - 60
      const legendX = width - 150

      // Growth arrow legend
      ctx.beginPath()
      ctx.moveTo(legendX, legendY)
      ctx.lineTo(legendX + 30, legendY)
      ctx.strokeStyle = "rgba(34, 197, 94, 0.6)" // green-500 with opacity
      ctx.lineWidth = 2
      ctx.stroke()

      // Growth arrowhead
      ctx.beginPath()
      ctx.moveTo(legendX + 30, legendY)
      ctx.lineTo(legendX + 20, legendY - 5)
      ctx.lineTo(legendX + 20, legendY + 5)
      ctx.closePath()
      ctx.fillStyle = "rgba(34, 197, 94, 0.6)"
      ctx.fill()

      // Growth text
      ctx.fillStyle = "#881337"
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.fillText("Growth Path", legendX + 40, legendY)

      // Stress arrow legend
      ctx.beginPath()
      ctx.moveTo(legendX, legendY + 20)
      ctx.lineTo(legendX + 30, legendY + 20)
      ctx.strokeStyle = "rgba(239, 68, 68, 0.6)" // red-500 with opacity
      ctx.lineWidth = 2
      ctx.stroke()

      // Stress arrowhead
      ctx.beginPath()
      ctx.moveTo(legendX + 30, legendY + 20)
      ctx.lineTo(legendX + 20, legendY + 15)
      ctx.lineTo(legendX + 20, legendY + 25)
      ctx.closePath()
      ctx.fillStyle = "rgba(239, 68, 68, 0.6)"
      ctx.fill()

      // Stress text
      ctx.fillStyle = "#881337"
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.fillText("Stress Path", legendX + 40, legendY + 20)
    }

    return positions
  }

  // Handle dimension slider change
  const handleDimensionChange = (value: string) => {
    setSelectedDimension(value)
    setDimensionValue(50) // Reset slider when changing dimension
  }

  // Handle slider value change
  const handleSliderChange = (direction: "left" | "right") => {
    if (direction === "left") {
      setDimensionValue(Math.max(0, dimensionValue - 10))
    } else {
      setDimensionValue(Math.min(100, dimensionValue + 10))
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-rose-800 dark:text-rose-200 mb-4">Interactive Type Visualization</h1>
            <p className="text-xl text-rose-700 dark:text-rose-300 max-w-3xl mx-auto">
              Explore personality types through interactive visualizations
            </p>
          </div>

          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
              <p>{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-100 text-red-700 hover:bg-red-200"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
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
                      onClick={downloadVisualization}
                      variant="outline"
                      className="w-full border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-800"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>

                  <div>
                    <Button
                      onClick={() => setShowShareOptions(!showShareOptions)}
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

              <Card className="lg:col-span-3 border-rose-200 dark:border-rose-800 shadow-md animate-slide-in-right">
                <CardHeader>
                  <CardTitle className="text-rose-800 dark:text-rose-200">
                    {selectedVisualization === "type-wheel" && "MBTI Type Wheel"}
                    {selectedVisualization === "cognitive-functions" && "Cognitive Functions"}
                    {selectedVisualization === "dimension-spectrum" && "Personality Dimensions"}
                    {selectedVisualization === "comparison" && "Personality Type Comparison"}
                    {selectedVisualization === "enneagram-rings" && "Enneagram Personality System"}
                  </CardTitle>
                  <CardDescription className="dark:text-rose-300">
                    {selectedVisualization === "type-wheel" && "Visual representation of all 16 personality types"}
                    {selectedVisualization === "cognitive-functions" &&
                      "How different functions stack in a personality type"}
                    {selectedVisualization === "dimension-spectrum" &&
                      "The four dimensions that define personality type"}
                    {selectedVisualization === "comparison" &&
                      "Compare traits and compatibility between personality types"}
                    {selectedVisualization === "enneagram-rings" &&
                      "Visual representation of the nine Enneagram personality types"}
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
                      <div
                        className={`bg-white dark:bg-rose-900/50 rounded-lg p-4 flex justify-center ${
                          selectedVisualization === "dimension-spectrum"
                            ? "dimension-spectrum-container"
                            : selectedVisualization === "type-wheel"
                              ? "type-wheel-container"
                              : "canvas-container"
                        }`}
                      >
                        <canvas
                          ref={canvasRef}
                          width={canvasSize.width}
                          height={canvasSize.height}
                          className="max-w-full h-auto border border-rose-200 dark:border-rose-800 rounded-lg shadow-md transition-all duration-300"
                          onMouseMove={handleCanvasMouseMove}
                          onMouseLeave={handleCanvasMouseLeave}
                          onClick={handleCanvasClick}
                        />
                      </div>
                    )
                  )}

                  {selectedVisualization === "comparison" && <ComparisonView />}

                  {selectedVisualization === "type-wheel" && (
                    <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 flex items-start animate-fade-in">
                      <Info className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-rose-700 dark:text-rose-300 text-sm">
                        <strong>Tip:</strong> Click on any personality type in the wheel to view detailed information
                        about that type. Hover over a type to highlight it.
                      </p>
                    </div>
                  )}

                  {selectedVisualization === "cognitive-functions" && selectedType && selectedType !== "none" && (
                    <div className="mt-4 p-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-rose-50 dark:from-rose-900/50 dark:via-rose-900/40 dark:to-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm animate-fade-in">
                      <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-3 text-lg">
                        About {selectedType} Cognitive Functions
                      </h3>
                      <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed">
                        Each personality type has a unique pattern of cognitive functions that influences how they
                        perceive the world and make decisions. The dominant function is the most developed and
                        consciously used, while the inferior function is often less developed.
                      </p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
                          <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
                            Dominant & Auxiliary:
                          </span>
                          <span className="text-rose-600 dark:text-rose-400">
                            These are your primary ways of interacting with the world. They're well-developed and you
                            use them consciously.
                          </span>
                        </div>
                        <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
                          <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
                            Tertiary & Inferior:
                          </span>
                          <span className="text-rose-600 dark:text-rose-400">
                            These functions are less developed and may emerge in times of stress or as areas for
                            personal growth.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedVisualization === "dimension-spectrum" && (
                    <div className="mt-4 p-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-rose-50 dark:from-rose-900/50 dark:via-rose-900/40 dark:to-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm animate-fade-in">
                      <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-3 text-lg">
                        Understanding {selectedDimension[0]} vs {selectedDimension[1]}
                      </h3>
                      <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed">
                        {dimensionExplanations[selectedDimension as keyof typeof dimensionExplanations].description}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
                          <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
                            {selectedDimension[0]}:
                          </span>
                          <span className="text-rose-600 dark:text-rose-400">
                            {dimensionExplanations[selectedDimension as keyof typeof dimensionExplanations].left}
                          </span>
                        </div>
                        <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
                          <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
                            {selectedDimension[1]}:
                          </span>
                          <span className="text-rose-600 dark:text-rose-400">
                            {dimensionExplanations[selectedDimension as keyof typeof dimensionExplanations].right}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedVisualization === "enneagram-rings" &&
                    selectedEnneagramType &&
                    selectedEnneagramType !== "none" && (
                      <div className="mt-4 p-5 bg-gradient-to-r from-rose-50 via-rose-50/80 to-rose-50 dark:from-rose-900/50 dark:via-rose-900/40 dark:to-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800 shadow-sm animate-fade-in">
                        <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-3 text-lg flex items-center">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2">
                            {selectedEnneagramType}
                          </span>
                          {enneagramTypes[selectedEnneagramType].name}
                        </h3>

                        <div className="mb-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100 mr-2">
                            {enneagramTypes[selectedEnneagramType].center} Center
                          </span>
                          {enneagramTypes[selectedEnneagramType].keywords.map((keyword: string, index: number) => (
                            <span
                              key={index}
                              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-900 dark:text-rose-200 mr-2 mb-1"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>

                        <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed">
                          {enneagramTypes[selectedEnneagramType].description}
                        </p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
                            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">Wings:</span>
                            {Object.entries(enneagramTypes[selectedEnneagramType].wings).map(
                              ([wing, description]: [string, any]) => (
                                <div key={wing} className="mb-2">
                                  <span className="text-rose-600 dark:text-rose-400 font-medium">{description}</span>
                                </div>
                              ),
                            )}
                          </div>
                          <div className="p-3 bg-rose-100/50 dark:bg-rose-900/30 rounded-lg">
                            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
                              Growth & Stress:
                            </span>
                            <div className="mb-2">
                              <span className="text-green-600 dark:text-green-400 font-medium">Growth Path: </span>
                              <span className="text-rose-600 dark:text-rose-400">
                                Type {enneagramTypes[selectedEnneagramType].growth} -{" "}
                                {enneagramTypes[enneagramTypes[selectedEnneagramType].growth].name}
                              </span>
                            </div>
                            <div>
                              <span className="text-red-600 dark:text-red-400 font-medium">Stress Path: </span>
                              <span className="text-rose-600 dark:text-rose-400">
                                Type {enneagramTypes[selectedEnneagramType].stress} -{" "}
                                {enneagramTypes[enneagramTypes[selectedEnneagramType].stress].name}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-center">
                          <a
                            href="/enneagram"
                            className="text-rose-600 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-100 underline text-sm"
                          >
                            Learn more about Enneagram Type {selectedEnneagramType}
                          </a>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="border-rose-200 dark:border-rose-800 shadow-md mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-rose-800 dark:text-rose-200">Understanding the Visualizations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Type Wheel</h3>
                <p className="text-rose-700 dark:text-rose-300">
                  The Type Wheel shows all 16 personality types arranged in a circle. Types are grouped by their
                  dominant cognitive functions, with similar types positioned near each other. Select a type to
                  highlight it on the wheel or click directly on a type to view its detailed profile.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Cognitive Functions</h3>
                <p className="text-rose-700 dark:text-rose-300">
                  This visualization shows the cognitive function stack for a selected personality type. The functions
                  are displayed in order of preference, from dominant to inferior. Each personality type has a unique
                  pattern of cognitive functions that influences how they perceive the world and make decisions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Dimension Spectrum</h3>
                <p className="text-rose-700 dark:text-rose-300">
                  The Dimension Spectrum shows the four key dimensions that define personality type:
                  Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, and Judging-Perceiving. Your
                  preferences along these dimensions determine your four-letter type code. Use the interactive controls
                  to explore each dimension in detail.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-2 flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Type Comparison
                </h3>
                <p className="text-rose-700 dark:text-rose-300">
                  The comparison view allows you to select two personality types and see a detailed analysis of their
                  similarities, differences, and compatibility. This is useful for understanding relationship dynamics,
                  team interactions, and personal growth opportunities through complementary traits.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-rose-800 dark:text-rose-200 mb-2">Enneagram Rings</h3>
                <p className="text-rose-700 dark:text-rose-300">
                  The Enneagram is a system of personality typing that describes patterns in how people interpret the
                  world and manage their emotions. The nine Enneagram types are arranged in a circular diagram and
                  grouped into three Centers of Intelligence: Instinctive (Types 8, 9, 1), Feeling (Types 2, 3, 4), and
                  Thinking (Types 5, 6, 7). Each type has two adjacent "wings" that influence their personality, and
                  paths of growth and stress that show how they behave under different conditions.
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
