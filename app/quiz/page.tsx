"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getRandomizedQuestions } from "@/lib/questions"
import { calculateDetailedPersonalityType } from "@/lib/calculate-type"
import { Badge } from "@/components/ui/badge"
import { Star, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function QuizPage() {
  const router = useRouter()
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [questionCount, setQuestionCount] = useState(6) // Default number of questions per dimension

  // Initialize quiz with randomized questions
  useEffect(() => {
    // Get questions from each dimension
    const randomizedQuestions = getRandomizedQuestions(questionCount)
    setQuizQuestions(randomizedQuestions)
    setIsLoading(false)
  }, [questionCount])

  const handleNext = () => {
    if (selectedOption !== null) {
      // Save the current answer
      const updatedAnswers = { ...answers, [currentQuestion]: selectedOption }
      setAnswers(updatedAnswers)

      if (currentQuestion < quizQuestions.length - 1) {
        // Move to next question and reset selection
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null) // Always reset selection for new questions
      } else {
        // Quiz completed, calculate results
        const result = calculateDetailedPersonalityType(updatedAnswers, quizQuestions)
        router.push(`/results?type=${result.type}`)
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
      setSelectedOption(answers[prevQuestion] !== undefined ? answers[prevQuestion] : null)
    }
  }

  // Show loading state while questions are being prepared
  if (isLoading || quizQuestions.length === 0) {
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

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]

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
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-rose-800 mb-2">Personality Test</h1>
            <p className="text-rose-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
            <Progress value={progress} className="h-2 mt-4 bg-rose-200" indicatorClassName="bg-rose-600" />
          </div>

          <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <CardTitle className="text-xl text-rose-800">{question.text}</CardTitle>
                  <div className="flex items-center mt-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex cursor-help">{renderWeightIndicator(question.weight)}</div>
                        </TooltipTrigger>
                        <TooltipContent>
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
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="ml-2 cursor-help">
                              <HelpCircle className="h-4 w-4 text-rose-400" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Assesses: {question.subtype.replace(/-/g, " ")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                  {dimensionNames[question.dimension]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedOption !== null ? selectedOption.toString() : undefined}
                onValueChange={(value) => setSelectedOption(Number.parseInt(value))}
              >
                {question.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 mb-4 p-3 rounded-md hover:bg-rose-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-rose-600" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-rose-600 text-rose-600 hover:bg-rose-50"
              >
                Previous
              </Button>
              <Button onClick={handleNext} disabled={selectedOption === null} className="bg-rose-600 hover:bg-rose-700">
                {currentQuestion < quizQuestions.length - 1 ? "Next" : "See Results"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
