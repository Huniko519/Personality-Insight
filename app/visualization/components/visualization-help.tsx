"use client"

import { memo } from "react"
import { BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const VisualizationHelp = memo(() => {
  return (
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
  )
})

VisualizationHelp.displayName = "VisualizationHelp"

export default VisualizationHelp
