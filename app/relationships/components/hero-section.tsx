"use client"

import { memo } from "react"
import Link from "next/link"
import Image from "next/image"

const RelationshipsHeroSection = memo(() => (
  <div className="relative rounded-2xl overflow-hidden mb-16">
    <div className="absolute inset-0 bg-rose-600">
      <Image
        src="/assets/relationship.png"
        alt="Relationships and personality types"
        fill
        className="object-cover mix-blend-overlay opacity-40"
      />
    </div>
    <div className="relative z-10 py-16 px-6 md:px-12 text-white text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Relationships</h1>
      <div className="h-1 w-32 bg-white mx-auto rounded-full mb-6"></div>
      <p className="text-xl max-w-2xl mx-auto mb-8">
        Understanding how personality types influence our interactions with others
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/relationships/compatibility"
          className="bg-white text-rose-600 hover:bg-rose-50 font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          Compatibility Chart
        </Link>
        <Link
          href="/relationships/case-studies"
          className="bg-rose-800 text-white hover:bg-rose-900 font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          Case Studies
        </Link>
      </div>
    </div>
  </div>
))

RelationshipsHeroSection.displayName = 'RelationshipsHeroSection'

export { RelationshipsHeroSection }
