"use client"

import { memo } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ErrorStateProps {
  error?: string | null
  onRetry: () => void
}

const QuizErrorState = memo<ErrorStateProps>(({ error, onRetry }) => (
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
        <Button onClick={onRetry} className="bg-rose-600 hover:bg-rose-700">
          Retry
        </Button>
      </div>
    </div>
    <Footer />
  </>
))

QuizErrorState.displayName = 'QuizErrorState'

export { QuizErrorState }
