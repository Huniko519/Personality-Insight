"use client"

import { memo } from "react"
import Link from "next/link"
import { Heart, Home, Briefcase, ArrowRight } from "lucide-react"

const relationshipTypes = [
  {
    icon: Heart,
    title: "For Couples",
    description: [
      "The MBTI instrument is popular in premarital counseling, helping new couples identify areas of difference that may cause conflict. The respect created by this awareness can go a long way in weathering married life.",
      "Perhaps one partner likes to get the household chores completed before doing leisure activities, whereas the other partner may be spontaneous and ready for the next great adventure. This couple likely prefers Judging and Perceiving, respectively."
    ],
    link: "/relationships/tips",
    linkText: "Relationship tips"
  },
  {
    icon: Home,
    title: "For Families",
    description: [
      "Knowledge of type preferences can help families negotiate differences in lifestyle, intimacy, division of chores, managing money, and other areas of potential conflict.",
      "When parents are very different from their children, or when siblings seem like complete opposites, there is potential for misunderstanding. When children know their personality type and parents know theirs, communication is often improved."
    ],
    link: "/relationships/case-studies",
    linkText: "Family case studies"
  },
  {
    icon: Briefcase,
    title: "For Co-workers",
    description: [
      "Personality type can help you work better with others and manage your work. When you understand your type preferences, you can approach your work in a manner that best suits your style.",
      "Knowledge of type can help you better understand the organizational culture of your workplace. Leadership styles, team dynamics, coping with change, and professional development can all be better understood through type awareness."
    ],
    link: "/careers",
    linkText: "Workplace dynamics"
  }
]

// Memoized relationship type card component
const RelationshipTypeCard = memo<{
  type: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string[]
    link: string
    linkText: string
  }
}>(({ type }) => (
  <div className="bg-white rounded-xl p-8 shadow-md border border-rose-100 hover:shadow-lg transition-all hover:translate-y-[-5px]">
    <div className="flex justify-center mb-6">
      <div className="bg-rose-100 p-4 rounded-full">
        <type.icon className="h-10 w-10 text-rose-600" />
      </div>
    </div>
    <h3 className="text-xl font-semibold text-rose-800 text-center mb-4">{type.title}</h3>
    {type.description.map((desc, index) => (
      <p key={index} className={`text-gray-700 ${index > 0 ? 'mt-4' : ''}`}>
        {desc}
      </p>
    ))}
    <div className="mt-6 text-center">
      <Link
        href={type.link}
        className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
      >
        {type.linkText} <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </div>
))

RelationshipTypeCard.displayName = 'RelationshipTypeCard'

const RelationshipTypesSection = memo(() => (
  <div className="mb-16">
    <h2 className="text-2xl font-bold text-rose-800 mb-8 flex items-center">
      <span className="bg-rose-100 p-2 rounded-full mr-3">
        <Heart className="h-6 w-6 text-rose-600" />
      </span>
      Relationships and Type
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {relationshipTypes.map((type, index) => (
        <RelationshipTypeCard key={index} type={type} />
      ))}
    </div>
  </div>
))

RelationshipTypesSection.displayName = 'RelationshipTypesSection'

export { RelationshipTypesSection }
