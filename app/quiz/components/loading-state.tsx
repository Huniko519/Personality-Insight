"use client"

import { memo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const QuizLoadingState = memo(() => (
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
))

QuizLoadingState.displayName = 'QuizLoadingState'

export { QuizLoadingState }
