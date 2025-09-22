"use client"

import { memo } from "react"

const TypeCodeExplanation = memo(() => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-2xl font-bold text-rose-800 mb-6 text-center">Understanding the Type Code</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-rose-50 p-4 rounded-md">
          <h3 className="font-semibold text-rose-800 mb-2">Extraversion (E) vs. Introversion (I)</h3>
          <p className="text-rose-600">
            Where you focus your attention and get your energy — the outer world of people and activities or your
            inner world of ideas and impressions.
          </p>
        </div>
        <div className="bg-rose-50 p-4 rounded-md">
          <h3 className="font-semibold text-rose-800 mb-2">Sensing (S) vs. Intuition (N)</h3>
          <p className="text-rose-600">
            How you take in information — focusing on what's real and actual or preferring patterns and
            possibilities.
          </p>
        </div>
        <div className="bg-rose-50 p-4 rounded-md">
          <h3 className="font-semibold text-rose-800 mb-2">Thinking (T) vs. Feeling (F)</h3>
          <p className="text-rose-600">
            How you make decisions — based on objective logic and consistency or based on values and how actions
            affect others.
          </p>
        </div>
        <div className="bg-rose-50 p-4 rounded-md">
          <h3 className="font-semibold text-rose-800 mb-2">Judging (J) vs. Perceiving (P)</h3>
          <p className="text-rose-600">
            How you deal with the world — preferring structure and firm decisions or staying open to new
            information and options.
          </p>
        </div>
      </div>
    </div>
  )
})

TypeCodeExplanation.displayName = "TypeCodeExplanation"

export default TypeCodeExplanation

