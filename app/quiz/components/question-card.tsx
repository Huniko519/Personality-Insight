"use client"

import { memo } from "react"
import { Star, HelpCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface QuestionCardProps {
  question: any
  currentQuestion: number
  totalQuestions: number
  selectedOption: number | null
  onOptionSelect: (value: number) => void
  onPrevious: () => void
  onNext: () => void
  radioGroupKey: number
}

// Memoized weight indicator component
const WeightIndicator = memo<{ weight: number }>(({ weight }) => {
  const renderWeightIndicator = (weight: number) => {
    return Array(weight)
      .fill(0)
      .map((_, i) => <Star key={i} className="h-4 w-4 fill-rose-400 text-rose-400" />)
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div className="flex cursor-help">{renderWeightIndicator(weight)}</div>
        </TooltipTrigger>
        <TooltipContent className="bg-rose-50 border-rose-200">
          <p>
            {weight === 3
              ? "High importance question - strongly influences your result"
              : weight === 2
                ? "Medium importance question"
                : "Standard importance question"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

WeightIndicator.displayName = 'WeightIndicator'

// Memoized question option component
const QuestionOption = memo<{
  option: string
  index: number
  currentQuestion: number
  selectedOption: number | null
  onOptionSelect: (value: number) => void
}>(({ option, index, currentQuestion, selectedOption, onOptionSelect }) => (
  <div
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
))

QuestionOption.displayName = 'QuestionOption'

const QuestionCard = memo<QuestionCardProps>(({
  question,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onOptionSelect,
  onPrevious,
  onNext,
  radioGroupKey
}) => {
  // Map dimension codes to readable names
  const dimensionNames: Record<string, string> = {
    EI: "Extraversion vs. Introversion",
    SN: "Sensing vs. Intuition",
    TF: "Thinking vs. Feeling",
    JP: "Judging vs. Perceiving",
  }

  return (
    <Card className="shadow-xl border-rose-200 bg-white/90 backdrop-blur-sm animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-xl text-rose-800">{question.text}</CardTitle>
            <div className="flex items-center mt-2">
              <WeightIndicator weight={question.weight} />

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
          onValueChange={(value) => onOptionSelect(Number.parseInt(value))}
        >
          {question.options.map((option: string, index: number) => (
            <QuestionOption
              key={index}
              option={option}
              index={index}
              currentQuestion={currentQuestion}
              selectedOption={selectedOption}
              onOptionSelect={onOptionSelect}
            />
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4 px-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400 transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedOption === null}
          className="bg-rose-600 hover:bg-rose-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {currentQuestion < totalQuestions - 1 ? (
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
  )
})

QuestionCard.displayName = 'QuestionCard'

export { QuestionCard }
