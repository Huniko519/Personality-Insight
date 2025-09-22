"use client"

import { memo, useCallback } from "react"

interface VisualizationCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  canvasSize: { width: number; height: number }
  selectedVisualization: string
  handleCanvasMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void
  handleCanvasMouseLeave: () => void
  handleCanvasClick: () => void
}

const VisualizationCanvas = memo(({
  canvasRef,
  canvasSize,
  selectedVisualization,
  handleCanvasMouseMove,
  handleCanvasMouseLeave,
  handleCanvasClick,
}: VisualizationCanvasProps) => {
  const getContainerClass = useCallback(() => {
    switch (selectedVisualization) {
      case "dimension-spectrum":
        return "dimension-spectrum-container"
      case "type-wheel":
        return "type-wheel-container"
      default:
        return "canvas-container"
    }
  }, [selectedVisualization])

  return (
    <div
      className={`bg-white dark:bg-rose-900/50 rounded-lg p-4 flex justify-center ${getContainerClass()}`}
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
})

VisualizationCanvas.displayName = "VisualizationCanvas"

export default VisualizationCanvas
