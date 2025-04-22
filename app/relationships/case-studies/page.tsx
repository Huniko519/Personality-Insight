"use client"

import { BookOpen, ArrowRight, Heart, Lightbulb, MessageSquare, Users, BookMarked } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { caseStudies } from "@/lib/case-studies-data"

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="relative h-64 md:h-80 lg:h-96 w-full mb-12 overflow-hidden">
          {/* Use a placeholder if case-study-header.jpg doesn't exist */}
          <Image
            src="/relationship-roundtable.png"
            alt="Personality relationships case studies"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-rose-900/60 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Relationship Case Studies</h1>
              <div className="h-1 w-40 bg-rose-300 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Real-world examples of how different personality types interact in relationships
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-12 sm:pb-16 md:pb-20">
          <div className="flex items-center justify-center gap-8 mb-12 flex-wrap">
            <div className="flex items-center bg-rose-100 text-rose-800 px-4 py-2 rounded-full">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">9 Case Studies</span>
            </div>
            <div className="flex items-center bg-rose-100 text-rose-800 px-4 py-2 rounded-full">
              <BookMarked className="h-5 w-5 mr-2" />
              <span className="font-medium">Research-Based</span>
            </div>
            <div className="flex items-center bg-rose-100 text-rose-800 px-4 py-2 rounded-full">
              <Heart className="h-5 w-5 mr-2" />
              <span className="font-medium">Real Relationships</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-rose-100 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={study.image || "/placeholder.svg?height=400&width=600&query=personality relationship"}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {study.type1} + {study.type2}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{study.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">{study.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, i) => (
                      <span key={i} className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {}} // This would open the full case study
                    className="flex items-center text-rose-600 hover:text-rose-800 font-medium transition-colors"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-rose-200 mb-16">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 text-rose-600 mr-3" />
              Understanding Our Case Studies
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-gray-700 mb-6">
                  Our case studies are based on real relationships between individuals with different personality types.
                  Each case study explores the dynamics, challenges, and strengths of these relationships, providing
                  insights into how different types interact in various contexts.
                </p>

                <div className="grid md:grid-cols-1 gap-6 mb-6">
                  <div className="bg-rose-50 p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Heart className="h-5 w-5 text-rose-600 mr-2" />
                      <h3 className="font-semibold text-rose-800">Relationship Dynamics</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      We explore how different personality preferences interact to create unique relationship patterns.
                    </p>
                  </div>

                  <div className="bg-rose-50 p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <MessageSquare className="h-5 w-5 text-rose-600 mr-2" />
                      <h3 className="font-semibold text-rose-800">Communication Patterns</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      Each case study highlights communication styles and potential misunderstandings between types.
                    </p>
                  </div>

                  <div className="bg-rose-50 p-5 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-rose-600 mr-2" />
                      <h3 className="font-semibold text-rose-800">Growth Opportunities</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      We identify how each relationship provides opportunities for personal development and growth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden shadow-md">
                <Image src="/thoughtful-couple-chat.png" alt="Relationship dynamics" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Our Research Methodology</h3>
                    <p className="text-sm">
                      Each case study is carefully documented through interviews, observations, and feedback from the
                      individuals involved.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              While these case studies provide valuable insights, remember that individual relationships are influenced
              by many factors beyond personality type. Use these examples as a guide, not as definitive predictions for
              how any two types will interact.
            </p>
          </div>

          <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-xl p-8 shadow-md text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-bold mb-3">Submit Your Story</h2>
                <p className="max-w-md">
                  Have an interesting relationship dynamic with someone of a different personality type? Share your
                  experience and it might become our next case study!
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-white text-rose-600 hover:bg-rose-100 font-medium py-3 px-6 rounded-lg shadow-md transition-colors whitespace-nowrap"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
