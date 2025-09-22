"use client"

import { memo } from 'react'
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const HeroSection = memo(() => (
  <section className="bg-gradient-to-b from-rose-50 to-rose-100 py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6">
            Discover Your Personality Type
          </h1>
          <p className="text-xl text-rose-700 mb-8">
            Gain valuable insights into your strengths, challenges, and potential with our comprehensive
            personality assessment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700 text-lg px-6 py-3 h-auto">
                Take the Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/types">
              <Button
                variant="outline"
                className="border-rose-600 text-rose-600 hover:bg-rose-50 text-lg px-6 py-3 h-auto"
              >
                Explore Types
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/assets/mbti-circle.png"
            alt="Personality Type Wheel"
            width={500}
            height={500}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
))

HeroSection.displayName = 'HeroSection'
