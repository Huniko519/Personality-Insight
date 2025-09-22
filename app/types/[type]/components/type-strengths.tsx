"use client"

import { memo } from "react"

interface TypeStrengthsProps {
  strengths: string[]
}

const TypeStrengths = memo(({ strengths }: TypeStrengthsProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-rose-800 mb-4">Strengths</h3>
      <ul className="space-y-4">
        {strengths.map((strength, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 mt-1 text-rose-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <p className="text-rose-700">{strength}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})

TypeStrengths.displayName = "TypeStrengths"

export default TypeStrengths



