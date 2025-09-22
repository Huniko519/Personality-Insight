"use client"

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface TypeSidebarProps {
  typeCode: string
  personalityType: {
    famousPeople: string[]
  }
  isIntroverted: boolean
  isIntuitive: boolean
  isThinking: boolean
  isJudging: boolean
}

const TypeSidebar = memo(({ typeCode, personalityType, isIntroverted, isIntuitive, isThinking, isJudging }: TypeSidebarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-rose-800">Famous {typeCode}s</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {personalityType.famousPeople.map((person, index) => (
              <li key={index} className="text-rose-700">
                {person}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-rose-200 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-rose-800">At a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                {isIntroverted ? "I" : "E"}
              </div>
              <div>
                <p className="text-rose-700 font-medium">{isIntroverted ? "Introverted" : "Extraverted"}</p>
                <p className="text-rose-600 text-sm">
                  {isIntroverted
                    ? "Gains energy from inner world and thoughts"
                    : "Gains energy from external world and people"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                {isIntuitive ? "N" : "S"}
              </div>
              <div>
                <p className="text-rose-700 font-medium">{isIntuitive ? "Intuitive" : "Sensing"}</p>
                <p className="text-rose-600 text-sm">
                  {isIntuitive
                    ? "Focuses on patterns, possibilities and future"
                    : "Focuses on concrete facts and details"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                {isThinking ? "T" : "F"}
              </div>
              <div>
                <p className="text-rose-700 font-medium">{isThinking ? "Thinking" : "Feeling"}</p>
                <p className="text-rose-600 text-sm">
                  {isThinking
                    ? "Makes decisions based on logic and reason"
                    : "Makes decisions based on values and emotions"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mr-3">
                {isJudging ? "J" : "P"}
              </div>
              <div>
                <p className="text-rose-700 font-medium">{isJudging ? "Judging" : "Perceiving"}</p>
                <p className="text-rose-600 text-sm">
                  {isJudging ? "Prefers structure and planning" : "Prefers flexibility and spontaneity"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

TypeSidebar.displayName = "TypeSidebar"

export default TypeSidebar



