"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { enneagramQuestions, calculateEnneagramType } from "@/lib/enneagram-questions"
import { useAuth } from "@/lib/auth"

export default function EnneagramTestPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Set start time when component mounts
  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  const totalQuestions = enneagramQuestions.length
  const progress = (currentQuestionIndex / totalQuestions) * 100

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [enneagramQuestions[currentQuestionIndex].id]: Number.parseInt(value),
    })
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Calculate time taken to complete the test
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)

    // Calculate Enneagram type
    const result = calculateEnneagramType(answers)

    // Redirect to results page
    router.push(`/enneagram-results?type=${result.primaryType}&time=${timeTaken}`)
  }

  const currentQuestion = enneagramQuestions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestion.id] || 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-rose-50/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-rose-800 mb-2">Enneagram Personality Test</h1>
              <p className="text-rose-600">
                Discover your Enneagram type by answering the following questions honestly.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-rose-600">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-rose-500">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Rate how much you agree with each statement. Answer based on how you typically are, not how you
                        wish to be or think you should be.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Progress value={progress} className="h-2 mb-6 bg-rose-100" indicatorClassName="bg-rose-500" />

              <div className="mb-8">
                <h2 className="text-xl font-medium text-gray-800 mb-4">{currentQuestion.text}</h2>

                <RadioGroup value={currentAnswer.toString()} onValueChange={handleAnswer} className="space-y-3">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-sm text-gray-500">Strongly Disagree</span>
                    <span className="text-sm text-gray-500">Strongly Agree</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`q${currentQuestion.id}-${value}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`q${currentQuestion.id}-${value}`}
                          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-rose-200 bg-white peer-data-[state=checked]:bg-rose-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-rose-500 hover:bg-rose-100 transition-colors"
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <Button
                    onClick={goToNextQuestion}
                    disabled={!currentAnswer}
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!currentAnswer || isSubmitting}
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    {isSubmitting ? "Processing..." : "See Results"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                Your answers will help determine your Enneagram type. Try to answer based on your natural tendencies
                rather than how you think you should respond.
              </p>
              {user ? (
                <p className="mt-2">Your results will be saved to your profile.</p>
              ) : (
                <p className="mt-2">Sign in to save your results and track your personality type over time.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
