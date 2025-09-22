"use client"

import { memo } from "react"

interface TypeWeaknessesProps {
  weaknesses: string[]
}

const TypeWeaknesses = memo(({ weaknesses }: TypeWeaknessesProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-rose-800 mb-4">Challenges</h3>
      <ul className="space-y-4">
        {weaknesses.map((weakness, index) => (
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
                className="lucide lucide-alert-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-rose-700">{weakness}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})

TypeWeaknesses.displayName = "TypeWeaknesses"

export default TypeWeaknesses



