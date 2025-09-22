"use client"

import { memo } from 'react'
import { Brain, Users, Briefcase } from "lucide-react"

const FEATURES = [
  {
    icon: Brain,
    title: "Cognitive Functions",
    description: "Understand how you process information, make decisions, and interact with the world around you."
  },
  {
    icon: Users,
    title: "Relationship Insights",
    description: "Discover how your personality type influences your relationships and communication style."
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Find career paths and work environments where your natural strengths can shine."
  }
]

export const FeaturesSection = memo(() => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-rose-800 mb-4">Understand Yourself Better</h2>
        <p className="text-xl text-rose-700 max-w-3xl mx-auto">
          Our personality assessment provides deep insights into your psychological preferences and how they shape
          your life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <div key={`feature-${index}`} className="bg-rose-50 rounded-xl p-6 text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
              <feature.icon className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-3">{feature.title}</h3>
            <p className="text-rose-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
))

FeaturesSection.displayName = 'FeaturesSection'
