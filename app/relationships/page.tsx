import Link from "next/link"
import Image from "next/image"
import { Heart, Users, Briefcase, Home, BookOpen, ArrowRight, MessageSquare } from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"

export default async function RelationshipsPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          {/* Hero Section */}
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

          {/* Introduction */}
          <div className="prose prose-rose max-w-none mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-rose-900 mb-4">Understanding Relationships Through Type</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  Knowing your MBTI® type and that of others in your life can help you appreciate and understand
                  differences in relationships, both personally with friends, partners, children, and family and
                  professionally with co-workers, team leaders, and managers.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Understanding and applying type theory to relationships can enhance communication, provide people with
                  a better understanding of how they deal with conflict, and provide tools for a variety of situations
                  including successfully making decisions and engaging in activities together.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-md border border-rose-100">
                  <p className="text-rose-900 font-medium text-lg italic">
                    "Type differences in relationships can be a source of growth and/or conflict. However, there are no
                    best or more successful combinations of types in relationships. Two people who share all four
                    preferences, only one or two, or none at all, can get along well. Type awareness and maturity matter
                    more than the number of preferences you have in common."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg p-8 my-12 shadow-md">
              <p className="font-medium text-xl mt-0 mb-0">
                Understanding and applying type theory to relationships can enhance communication and provide a better
                understanding of conflict.
              </p>
            </div>

            <p className="text-lg text-gray-700">
              In most areas of life, when differences between you and another person are bothersome, you can avoid the
              other person in some way. But when that person is a loved one or close friend, a co-worker or boss, you
              have a lot to lose by walking away.
            </p>

            <p className="text-lg text-gray-700">
              Not every relationship problem is type related, of course, but when it is, knowledge of personality type
              allows you to see differences in a new way, as just different ways of "being." You may still feel
              frustrated or annoyed but understanding those differences can go a long way in working through many
              interpersonal concerns.
            </p>

            <p className="text-lg text-gray-700">
              Instead of labeling a person and putting value judgments on his or her behavior, you can learn to see it
              as behavior reflecting personality type, not something designed to offend you. Many people learn to
              appreciate these differences and may even see them in a humorous light.
            </p>
          </div>

          {/* Relationship Types Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-rose-800 mb-8 flex items-center">
              <span className="bg-rose-100 p-2 rounded-full mr-3">
                <Heart className="h-6 w-6 text-rose-600" />
              </span>
              Relationships and Type
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md border border-rose-100 hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <div className="flex justify-center mb-6">
                  <div className="bg-rose-100 p-4 rounded-full">
                    <Heart className="h-10 w-10 text-rose-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-rose-800 text-center mb-4">For Couples</h3>
                <p className="text-gray-700">
                  The MBTI instrument is popular in premarital counseling, helping new couples identify areas of
                  difference that may cause conflict. The respect created by this awareness can go a long way in
                  weathering married life.
                </p>
                <p className="text-gray-700 mt-4">
                  Perhaps one partner likes to get the household chores completed before doing leisure activities,
                  whereas the other partner may be spontaneous and ready for the next great adventure. This couple
                  likely prefers Judging and Perceiving, respectively.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    href="/relationships/tips"
                    className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
                  >
                    Relationship tips <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-rose-100 hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <div className="flex justify-center mb-6">
                  <div className="bg-rose-100 p-4 rounded-full">
                    <Home className="h-10 w-10 text-rose-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-rose-800 text-center mb-4">For Families</h3>
                <p className="text-gray-700">
                  Knowledge of type preferences can help families negotiate differences in lifestyle, intimacy, division
                  of chores, managing money, and other areas of potential conflict.
                </p>
                <p className="text-gray-700 mt-4">
                  When parents are very different from their children, or when siblings seem like complete opposites,
                  there is potential for misunderstanding. When children know their personality type and parents know
                  theirs, communication is often improved.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    href="/relationships/case-studies"
                    className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
                  >
                    Family case studies <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-rose-100 hover:shadow-lg transition-all hover:translate-y-[-5px]">
                <div className="flex justify-center mb-6">
                  <div className="bg-rose-100 p-4 rounded-full">
                    <Briefcase className="h-10 w-10 text-rose-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-rose-800 text-center mb-4">For Co-workers</h3>
                <p className="text-gray-700">
                  Personality type can help you work better with others and manage your work. When you understand your
                  type preferences, you can approach your work in a manner that best suits your style.
                </p>
                <p className="text-gray-700 mt-4">
                  Knowledge of type can help you better understand the organizational culture of your workplace.
                  Leadership styles, team dynamics, coping with change, and professional development can all be better
                  understood through type awareness.
                </p>
                <div className="mt-6 text-center">
                  <Link
                    href="/careers"
                    className="inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
                  >
                    Workplace dynamics <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Case Studies */}
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
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-rose-100 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/assets/placeholder.png"
                    alt="The Visionary and the Analyst"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">ENFP + INTJ</span>
                      </div>
                      <h3 className="text-xl font-bold">The Visionary and the Analyst</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    How an enthusiastic ENFP and a strategic INTJ navigate their differences to build a thriving
                    relationship based on mutual growth and respect.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">Romantic</span>
                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">Communication</span>
                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">Growth</span>
                  </div>
                  <Link
                    href="/relationships/case-studies"
                    className="flex items-center text-rose-600 hover:text-rose-800 font-medium transition-colors"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-rose-100 group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/assets/placeholder.png"
                    alt="Creative Problem Solvers"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">ENTP + INFJ</span>
                      </div>
                      <h3 className="text-xl font-bold">Creative Problem Solvers</h3>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-700 mb-4">
                    Exploring how an innovative ENTP and an insightful INFJ collaborate in a professional setting,
                    combining creativity with purpose.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">Professional</span>
                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">Innovation</span>
                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded-full">Teamwork</span>
                  </div>
                  <Link
                    href="/relationships/case-studies"
                    className="flex items-center text-rose-600 hover:text-rose-800 font-medium transition-colors"
                  >
                    Read full case study <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility Chart CTA */}
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

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-xl p-8 shadow-md text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-bold mb-3">Get Relationship Insights</h2>
                <p className="max-w-md">
                  Subscribe to our newsletter for tips, case studies, and the latest research on personality types in
                  relationships.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg focus:outline-none text-gray-800 min-w-[250px]"
                />
                <button className="bg-white text-rose-600 hover:bg-rose-100 font-medium py-3 px-6 rounded-lg shadow-md transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
