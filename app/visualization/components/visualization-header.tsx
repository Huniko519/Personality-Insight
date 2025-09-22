"use client"

import { memo } from "react"

const VisualizationHeader = memo(() => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-rose-800 dark:text-rose-200 mb-4">
        Interactive Type Visualization
      </h1>
      <p className="text-xl text-rose-700 dark:text-rose-300 max-w-3xl mx-auto">
        Explore personality types through interactive visualizations
      </p>
    </div>
  )
})

VisualizationHeader.displayName = "VisualizationHeader"

export default VisualizationHeader
