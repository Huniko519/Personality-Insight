"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { calculateDetailedPersonalityType } from "@/lib/calculate-type"
import { getRandomizedQuestions } from "@/lib/questions"
import { QuizHeader } from "./components/quiz-header"
import { QuestionCard } from "./components/question-card"
import { QuizLoadingState } from "./components/loading-state"
import { QuizErrorState } from "./components/error-state"

const QuizPage = memo(() => {
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

  const handleNext = useCallback(() => {
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
  }, [selectedOption, answers, currentQuestion, quizQuestions, router, elapsedTime])

  const handlePrevious = useCallback(() => {
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
  }, [currentQuestion, selectedOption, answers])

  const handleRetry = useCallback(() => {
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
  }, [questionCount])

  const handleOptionSelect = useCallback((value: number) => {
    setSelectedOption(value)
  }, [])

  // Show loading state while questions are being prepared
  if (isLoading) {
    return <QuizLoadingState />
  }

  // Show error state
  if (error || quizQuestions.length === 0) {
    return <QuizErrorState error={error} onRetry={handleRetry} />
  }

  const question = quizQuestions[currentQuestion]

  if (!question) {
    return <QuizErrorState error="Question not found" onRetry={handleRetry} />
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-rose-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <QuizHeader
            currentQuestion={currentQuestion}
            totalQuestions={quizQuestions.length}
            elapsedTime={elapsedTime}
            formatTime={formatTime}
          />

          <QuestionCard
            question={question}
            currentQuestion={currentQuestion}
            totalQuestions={quizQuestions.length}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
            radioGroupKey={radioGroupKey}
          />

          <div className="mt-6 text-center text-rose-600 text-sm animate-fade-in">
            <p>Take your time to answer thoughtfully for the most accurate results.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
})

QuizPage.displayName = 'QuizPage'

export default QuizPage
