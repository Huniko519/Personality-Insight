"use client"

import { memo } from "react"
import Link from "next/link"

const QuizCTA = memo(() => {
  return (
    <div className="text-center">
      <Link href="/quiz">
        <button className="bg-rose-700 hover:bg-rose-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Take the Personality Test
        </button>
      </Link>
    </div>
  )
})

QuizCTA.displayName = "QuizCTA"

export default QuizCTA

