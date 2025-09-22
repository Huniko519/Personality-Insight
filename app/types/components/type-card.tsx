"use client"

import { memo } from "react"
import Link from "next/link"

interface TypeCardProps {
  type: {
    code: string
    name: string
    shortDescription?: string
    nickname?: string
  }
}

const TypeCard = memo(({ type }: TypeCardProps) => {
  return (
    <Link href={`/types/${type.code.toLowerCase()}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-rose-800">{type.code}</h2>
            <div className="bg-rose-100 h-10 w-10 rounded-full flex items-center justify-center">
              <span className="text-rose-600 font-medium">{type.code.charAt(0)}</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-rose-700 mb-2">{type.name}</h3>
          <p className="text-rose-600 mb-4 line-clamp-2">{type.shortDescription || type.nickname}</p>
          <div className="text-rose-500 text-sm">View details →</div>
        </div>
      </div>
    </Link>
  )
})

TypeCard.displayName = "TypeCard"

export default TypeCard

