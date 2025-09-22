"use client"

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DimensionCards = memo(() => {
  return (
    <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
      <h2 className="text-2xl font-bold text-rose-800 mb-4">Understanding the 16 Personality Types</h2>
      <p className="text-rose-700 mb-4">
        The 16 personality types are based on four key dichotomies that describe how we interact with the world:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-rose-200 bg-white/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-rose-800">Extraversion (E) vs. Introversion (I)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-rose-600">
              Where you focus your attention and get your energy — from the outer world of people and activities
              or your inner world of ideas and impressions.
            </p>
          </CardContent>
        </Card>
        <Card className="border-rose-200 bg-white/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-rose-800">Sensing (S) vs. Intuition (N)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-rose-600">
              How you take in information — focusing on what's real and actual or preferring patterns and
              possibilities.
            </p>
          </CardContent>
        </Card>
        <Card className="border-rose-200 bg-white/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-rose-800">Thinking (T) vs. Feeling (F)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-rose-600">
              How you make decisions — based on objective logic and consistency or values and how actions affect
              others.
            </p>
          </CardContent>
        </Card>
        <Card className="border-rose-200 bg-white/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-rose-800">Judging (J) vs. Perceiving (P)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-rose-600">
              How you deal with the outer world — preferring structure and firm decisions or remaining flexible
              and adaptable.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})

DimensionCards.displayName = "DimensionCards"

export default DimensionCards

