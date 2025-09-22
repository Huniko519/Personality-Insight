"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TypeHeaderProps {
  typeCode: string
  personalityType: {
    name: string
    nickname: string
  }
}

const TypeHeader = memo(({ typeCode, personalityType }: TypeHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <Link href="/types">
        <Button variant="ghost" className="mb-4 text-rose-700 hover:text-rose-800 hover:bg-rose-100">
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
            className="lucide lucide-arrow-left mr-2"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to All Types
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-rose-800 mb-2">{typeCode}</h1>
      <h2 className="text-2xl font-semibold text-rose-700">{personalityType.name}</h2>
      <p className="text-rose-600 mt-2">{personalityType.nickname}</p>
    </div>
  )
})

TypeHeader.displayName = "TypeHeader"

export default TypeHeader



