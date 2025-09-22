"use client"

import { memo } from 'react'
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const ENTREPRENEUR_BENEFITS = [
  "Identify your entrepreneurial strengths",
  "Understand your business leadership style",
  "Find business models that align with your type",
  "Learn strategies to overcome your challenges"
]

export const EntrepreneurSection = memo(() => (
  <section className="py-16 px-4 bg-rose-50">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block bg-rose-100 text-rose-700 px-4 py-1 rounded-full mb-4">
            New Feature
          </div>
          <h2 className="text-3xl font-bold text-rose-800 mb-4">
            Entrepreneur Personality Types
          </h2>
          <p className="text-xl text-rose-700 mb-6">
            Discover how your personality type influences your entrepreneurial style, strengths, and potential
            challenges in business.
          </p>
          <ul className="space-y-3 mb-6">
            {ENTREPRENEUR_BENEFITS.map((benefit, index) => (
              <li key={`benefit-${index}`} className="flex items-start">
                <div className="mr-3 mt-1 text-rose-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-rose-700">{benefit}</p>
              </li>
            ))}
          </ul>
          <Link href="/entrepreneurs">
            <Button className="bg-rose-600 hover:bg-rose-700">
              Explore Entrepreneur Types
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex justify-center h-full">
          <Image
            src="/assets/business-people.png"
            alt="Entrepreneur Types"
            width={500}
            height={500}
            className="rounded-full shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
))

EntrepreneurSection.displayName = 'EntrepreneurSection'
