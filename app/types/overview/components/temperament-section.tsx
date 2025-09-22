"use client"

import { memo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TemperamentSectionProps {
  title: string
  description: string
  types: any[]
  category: string
}

const TemperamentSection = memo(({ title, description, types, category }: TemperamentSectionProps) => {
  return (
    <div className="mb-12 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-rose-200">
      <h2 className="text-2xl font-bold text-rose-800 mb-4">{title}</h2>
      <p className="text-rose-700 mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {types.map((type) => (
          <Card key={type.code} className="border-rose-200 bg-white/90">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-rose-800">
                <Link href={`/types/${type.code}`} className="hover:underline">
                  {type.code}: {type.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-rose-600 font-medium mb-2">{type.nickname}</p>
              <p className="text-rose-600 text-sm">{type.shortDescription}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
})

TemperamentSection.displayName = "TemperamentSection"

export default TemperamentSection

