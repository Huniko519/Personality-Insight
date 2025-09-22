"use client"

import { memo } from "react"
import { Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface QuizHeaderProps {
  currentQuestion: number
  totalQuestions: number
  elapsedTime: number
  formatTime: (timeInSeconds: number) => string
}

const QuizHeader = memo<QuizHeaderProps>(({ currentQuestion, totalQuestions, elapsedTime, formatTime }) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-rose-800 mb-2">Personality Test</h1>
      <div className="flex justify-center items-center gap-2 mb-4">
        <p className="text-rose-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        <div className="h-4 w-px bg-rose-300 mx-2"></div>
        <div className="flex items-center text-rose-600 bg-white px-3 py-1 rounded-full shadow-sm">
          <Clock className="h-4 w-4 mr-1 text-rose-500" />
          <span className="font-mono">{formatTime(elapsedTime)}</span>
        </div>
      </div>
      <Progress
        value={progress}
        className="h-2 mt-4 bg-rose-200"
        indicatorClassName="bg-rose-600 transition-all duration-500 ease-in-out"
      />
    </div>
  )
})

QuizHeader.displayName = 'QuizHeader'

export { QuizHeader }
