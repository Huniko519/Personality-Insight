"use client"

import { memo } from "react"
import Link from "next/link"
import { Users, MessageSquare, ArrowRight } from "lucide-react"

const CompatibilityCTA = memo(() => (
  <div className="bg-white rounded-xl p-8 shadow-md border border-rose-200 mb-16">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
        <h2 className="text-2xl font-bold text-rose-800 mb-4 flex items-center">
          <Users className="h-6 w-6 text-rose-600 mr-2" />
          Explore Compatibility Between Types
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Discover how different personality types interact and complement each other in various relationships.
          Our interactive compatibility chart helps you understand the dynamics between any two personality
          types.
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <div className="bg-rose-100 p-1 rounded-full mr-2 mt-1">
              <MessageSquare className="h-4 w-4 text-rose-600" />
            </div>
            <span className="text-gray-700">See communication strengths and challenges</span>
          </li>
          <li className="flex items-start">
            <div className="bg-rose-100 p-1 rounded-full mr-2 mt-1">
              <MessageSquare className="h-4 w-4 text-rose-600" />
            </div>
            <span className="text-gray-700">Understand potential areas of conflict</span>
          </li>
          <li className="flex items-start">
            <div className="bg-rose-100 p-1 rounded-full mr-2 mt-1">
              <MessageSquare className="h-4 w-4 text-rose-600" />
            </div>
            <span className="text-gray-700">Get tips for building stronger relationships</span>
          </li>
        </ul>
      </div>
      <div className="md:w-1/3 flex justify-center">
        <Link
          href="/relationships/compatibility"
          className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors inline-flex items-center"
        >
          View Compatibility Chart
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
))

CompatibilityCTA.displayName = 'CompatibilityCTA'

export { CompatibilityCTA }
