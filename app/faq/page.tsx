"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, HelpCircle, BookOpen, Briefcase, Users, Brain, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Loading from "@/components/loading"
import { getFAQCategories } from "@/lib/firebase"

// Icon mapping for dynamic rendering
const iconMap = {
  HelpCircle,
  BookOpen,
  Briefcase,
  Users,
  Brain,
  Mail,
  Info: HelpCircle,
  FileQuestion: HelpCircle,
  MessageCircle: Mail,
  Shield: HelpCircle,
  Settings: HelpCircle,
  Lightbulb: Brain,
  Heart: Users,
  Puzzle: Brain,
  Zap: Brain,
  Star: HelpCircle,
  MessageSquare: Mail,
}

interface FaqCategory {
  id: string
  name: string
  icon: keyof typeof iconMap
  questions: {
    question: string
    answer: string
  }[]
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("general")
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFAQCategories() {
      try {
        setIsLoading(true)
        const categories = await getFAQCategories() as any
        setFaqCategories(categories)
        setIsLoading(false)
      } catch (err) {
        console.error("Error loading FAQ categories:", err)
        setError("Failed to load FAQ categories. Please try again later.")
        setIsLoading(false)
      }
    }

    loadFAQCategories()
  }, [])

  // Filter questions based on search query
  const filteredCategories = searchQuery
    ? faqCategories
        .map((category: FaqCategory) => ({
          ...category,
          questions: category.questions.filter(
            (q: { question: string; answer: string }) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-rose-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <HelpCircle className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-rose-800 mb-2">Something went wrong</h1>
            <p className="text-rose-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-rose-600 hover:bg-rose-700">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-12 max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-rose-800 opacity-80"></div>
          <img src="/workplace-collaboration.jpg" alt="FAQ Banner" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white max-w-3xl">
              Find answers to common questions about personality types, our test, and how to interpret your results
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-rose-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for questions..."
                className="pl-10 border-rose-200 py-6 text-lg shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {searchQuery ? (
            // Search Results
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-rose-800 mb-6 flex items-center">
                <Search className="mr-2 h-5 w-5 text-rose-600" />
                Search Results
              </h2>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div key={category.id} className="mb-8">
                    <div className="flex items-center mb-4">
                      {/* Dynamically render the icon based on the icon name */}
                      {React.createElement(iconMap[category.icon] || iconMap.HelpCircle, {
                        className: "h-6 w-6 text-rose-600 mr-2",
                      })}
                      <h3 className="text-xl font-medium text-rose-800">{category.name}</h3>
                    </div>
                    <Accordion type="single" collapsible className="border-rose-200">
                      {category.questions.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.id}-${index}`}
                          className="border-b border-rose-100"
                        >
                          <AccordionTrigger className="text-rose-800 hover:text-rose-600 py-4">
                            <div className="text-left">{faq.question}</div>
                          </AccordionTrigger>
                          <AccordionContent className="text-rose-700 py-4 px-2">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">No results found</h3>
                  <p className="text-rose-700 mb-6">
                    Try different keywords or browse the categories below to find what you're looking for.
                  </p>
                  <Button onClick={() => setSearchQuery("")} className="bg-rose-600 hover:bg-rose-700">
                    Browse All FAQs
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Tabbed FAQ Categories
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeCategory === category.id
                          ? "bg-rose-100 text-rose-800 shadow-sm"
                          : "bg-rose-100 text-rose-500 hover:bg-rose-200"
                      }`}
                    >
                      {React.createElement(iconMap[category.icon] || iconMap.HelpCircle, { className: "h-4 w-4 mr-2" })}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {faqCategories.map((category) => (
                <div key={category.id} className={activeCategory === category.id ? "block" : "hidden"}>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-6">
                      {React.createElement(iconMap[category.icon] || iconMap.HelpCircle, {
                        className: "h-8 w-8 text-rose-600 mr-3",
                      })}
                      <h2 className="text-2xl font-semibold text-rose-800">{category.name}</h2>
                    </div>

                    <Accordion type="single" collapsible className="border-rose-200">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-rose-100">
                          <AccordionTrigger className="text-rose-800 hover:text-rose-600 py-4">
                            <div className="text-left">{faq.question}</div>
                          </AccordionTrigger>
                          <AccordionContent className="text-rose-700 py-4 px-2">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Still Have Questions */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl shadow-md p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer you were looking for, feel free to reach out to our team directly.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-rose-600 hover:bg-rose-100 hover:text-rose-700">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Learn More</h3>
              <p className="text-rose-700 mb-4">Explore our blog for in-depth articles about personality psychology.</p>
              <Link href="/blog">
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                  Visit Blog
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Brain className="h-10 w-10 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Take the Test</h3>
              <p className="text-rose-700 mb-4">Discover your personality type with our comprehensive assessment.</p>
              <Link href="/quiz">
                <Button className="bg-rose-600 hover:bg-rose-700">Start Test</Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="h-10 w-10 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Explore Types</h3>
              <p className="text-rose-700 mb-4">
                Learn about all 16 personality types and their unique characteristics.
              </p>
              <Link href="/types">
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                  View Types
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
