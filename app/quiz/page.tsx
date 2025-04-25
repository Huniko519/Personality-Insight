"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Star, HelpCircle, Clock, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { calculateDetailedPersonalityType } from "@/lib/calculate-type"
import { getRandomizedQuestions } from "@/lib/questions"

export default function QuizPage() {
  const router = useRouter()
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [questionCount, setQuestionCount] = useState(6) // Default number of questions per dimension
  const [radioGroupKey, setRadioGroupKey] = useState(0)

  // Timer state
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  // Format time as MM:SS
  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, [])

  // Initialize timer when questions are loaded
  useEffect(() => {
    if (quizQuestions.length > 0 && !startTime) {
      const now = Math.floor(Date.now() / 1000)
      setStartTime(now)
      setTimerActive(true)
    }
  }, [quizQuestions, startTime])

  // Update timer every second
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerActive && startTime) {
      interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000)
        setElapsedTime(now - startTime)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, startTime])

  useEffect(() => {
    setRadioGroupKey((prevKey) => prevKey + 1)
  }, [currentQuestion])

  // Initialize quiz with randomized questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const questions = await getRandomizedQuestions(questionCount)
        setQuizQuestions(questions)
      } catch (error) {
        console.error("Error loading questions:", error)
        setError("Failed to load questions. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [questionCount])

  const handleNext = () => {
    if (selectedOption !== null) {
      // Save the current answer
      const updatedAnswers = { ...answers, [currentQuestion]: selectedOption }
      setAnswers(updatedAnswers)

      if (currentQuestion < quizQuestions.length - 1) {
        // Move to next question and reset selection
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null) // Reset selection for new question
      } else {
        // Quiz completed, calculate results
        setTimerActive(false) // Stop the timer
        const result = calculateDetailedPersonalityType(updatedAnswers, quizQuestions)
        router.push(`/results?type=${result.type}&time=${elapsedTime}`)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      // First save the current answer before moving to previous question
      if (selectedOption !== null) {
        setAnswers({ ...answers, [currentQuestion]: selectedOption })
      }

      // Move to previous question
      const prevQuestion = currentQuestion - 1
      setCurrentQuestion(prevQuestion)

      // Restore its answer if it exists
      const prevAnswer = answers[prevQuestion]
      setSelectedOption(prevAnswer !== undefined ? prevAnswer : null)
    }
  }

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    getRandomizedQuestions(questionCount)
      .then((questions) => {
        setQuizQuestions(questions)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Error retrying to load questions:", err)
        setError("Failed to load questions. Please try again later.")
        setIsLoading(false)
      })
  }

  // Show loading state while questions are being prepared
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-rose-800 mb-4">Preparing Your Personality Test</h1>
            <p className="text-rose-600 mb-6">Loading your unique set of questions...</p>
            <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Show error state
  if (error || quizQuestions.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-rose-100 p-3 rounded-full">
                <AlertTriangle className="h-12 w-12 text-rose-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-rose-800 mb-4">Error Loading Questions</h1>
            <p className="text-rose-600 mb-6">
              {error || "Unable to load personality test questions. Please try again later."}
            </p>
            <Button onClick={handleRetry} className="bg-rose-600 hover:bg-rose-700">
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const question = quizQuestions[currentQuestion]

  if (!question) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-rose-100 p-3 rounded-full">
                <AlertTriangle className="h-12 w-12 text-rose-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-rose-800 mb-4">Question Not Found</h1>
            <p className="text-rose-600 mb-6">We couldn't load the current question. Please try again.</p>
            <Button onClick={handleRetry} className="bg-rose-600 hover:bg-rose-700">
              Restart Quiz
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  // Map dimension codes to readable names
  const dimensionNames: Record<string, string> = {
    EI: "Extraversion vs. Introversion",
    SN: "Sensing vs. Intuition",
    TF: "Thinking vs. Feeling",
    JP: "Judging vs. Perceiving",
  }

  // Generate stars based on question weight
  const renderWeightIndicator = (weight: number) => {
    return Array(weight)
      .fill(0)
      .map((_, i) => <Star key={i} className="h-4 w-4 fill-rose-400 text-rose-400" />)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-rose-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-rose-800 mb-2">Personality Test</h1>
            <div className="flex justify-center items-center gap-2 mb-4">
              <p className="text-rose-600">
                Question {currentQuestion + 1} of {quizQuestions.length}
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

          <Card className="shadow-xl border-rose-200 bg-white/90 backdrop-blur-sm animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <CardTitle className="text-xl text-rose-800">{question.text}</CardTitle>
                  <div className="flex items-center mt-2">
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <div className="flex cursor-help">{renderWeightIndicator(question.weight)}</div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-rose-50 border-rose-200">
                          <p>
                            {question.weight === 3
                              ? "High importance question - strongly influences your result"
                              : question.weight === 2
                                ? "Medium importance question"
                                : "Standard importance question"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {question.subtype && (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <div className="ml-2 cursor-help">
                              <HelpCircle className="h-4 w-4 text-rose-400" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-rose-50 border-rose-200">
                            <p>Assesses: {question.subtype.replace(/-/g, " ")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 shadow-sm">
                  {dimensionNames[question.dimension]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <RadioGroup
                key={`question-${currentQuestion}-${radioGroupKey}`}
                value={selectedOption !== null ? selectedOption.toString() : undefined}
                onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
              >
                {question.options.map((option: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mb-4 p-4 rounded-md hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all duration-200"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${currentQuestion}-${index}`}
                      className="text-rose-600"
                    />
                    <Label htmlFor={`option-${currentQuestion}-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 pb-4 px-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="bg-rose-600 hover:bg-rose-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  "See Results"
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center text-rose-600 text-sm animate-fade-in">
            <p>Take your time to answer thoughtfully for the most accurate results.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
