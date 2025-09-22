"use client"

import { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight } from "lucide-react"

const caseStudies = [
  {
    title: "The Visionary and the Analyst",
    types: "ENFP + INTJ",
    description: "How an enthusiastic ENFP and a strategic INTJ navigate their differences to build a thriving relationship based on mutual growth and respect.",
    tags: ["Romantic", "Communication", "Growth"],
    image: "/assets/placeholder.png"
  },
  {
    title: "Creative Problem Solvers",
    types: "ENTP + INFJ",
    description: "Exploring how an innovative ENTP and an insightful INFJ collaborate in a professional setting, combining creativity with purpose.",
    tags: ["Professional", "Innovation", "Teamwork"],
    image: "/assets/placeholder.png"
  }
]

// Memoized case study card component
const CaseStudyCard = memo<{
  study: {
    title: string
    types: string
    description: string
    tags: string[]
    image: string
  }
}>(({ study }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-rose-100 group">
    <div className="relative h-48 overflow-hidden">
      <Image
        src={study.image}
        alt={study.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent flex items-end">
        <div className="p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">{study.types}</span>
          </div>
          <h3 className="text-xl font-bold">{study.title}</h3>
        </div>
      </div>
    </div>
    <div className="p-5">
      <p className="text-gray-700 mb-4">{study.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {study.tags.map((tag, index) => (
          <span key={index} className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href="/relationships/case-studies"
        className="flex items-center text-rose-600 hover:text-rose-800 font-medium transition-colors"
      >
        Read full case study <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </div>
))

CaseStudyCard.displayName = 'CaseStudyCard'

const CaseStudiesSection = memo(() => (
  <div className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-rose-800 flex items-center">
        <BookOpen className="h-6 w-6 text-rose-600 mr-3" />
        Featured Case Studies
      </h2>
      <Link
        href="/relationships/case-studies"
        className="text-rose-600 hover:text-rose-800 font-medium flex items-center"
      >
        View all case studies <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {caseStudies.map((study, index) => (
        <CaseStudyCard key={index} study={study} />
      ))}
    </div>
  </div>
))

CaseStudiesSection.displayName = 'CaseStudiesSection'

export { CaseStudiesSection }
