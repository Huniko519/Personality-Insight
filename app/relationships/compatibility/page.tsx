import Link from "next/link"
import { Heart, Users, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CompatibilityChart from "@/components/compatibility-chart"

export default function CompatibilityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 mb-4">
              Personality Type Compatibility
            </h1>
            <div className="h-1 w-32 bg-rose-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-rose-800 max-w-3xl mx-auto">
              Explore how different personality types interact and complement each other in relationships
            </p>
          </div>

          <div className="prose prose-rose max-w-none mb-12">
            <p className="text-lg leading-relaxed">
              Understanding compatibility between personality types can help you navigate relationships more
              effectively. While no two types are inherently incompatible, some combinations naturally complement each
              other better than others. Explore our interactive compatibility chart to see how different types interact.
            </p>

            <div className="bg-rose-100 rounded-xl p-6 my-8 shadow-sm border border-rose-200">
              <p className="text-rose-900 font-medium text-lg italic">
                "The beauty of personality differences is that they allow us to complement each other's strengths and
                weaknesses. The most successful relationships aren't those with identical personalities, but those where
                both people understand and appreciate their differences."
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-rose-100 p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6 flex items-center">
              <Heart className="h-6 w-6 text-rose-600 mr-2" />
              Interactive Compatibility Chart
            </h2>

            <CompatibilityChart />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md border border-rose-100">
              <h2 className="text-xl font-bold text-rose-800 mb-4">Understanding the Compatibility Scores</h2>
              <p className="text-gray-700 mb-4">Our compatibility scores are based on several factors:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Cognitive function compatibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Communication style similarities and differences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Complementary strengths and weaknesses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Potential for growth and balance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-rose-100">
              <h2 className="text-xl font-bold text-rose-800 mb-4">Important Considerations</h2>
              <p className="text-gray-700 mb-4">While compatibility charts can provide insights, remember:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Individual growth and maturity matter more than type</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Any two types can have a successful relationship with understanding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Differences can lead to growth and complementary strengths</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-500 mr-2">•</span>
                  <span>Communication and respect are key regardless of type</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg p-8 shadow-md mb-12">
            <h2 className="text-2xl font-bold mb-4">Case Studies & Real Examples</h2>
            <p className="mb-6">
              Explore real-world examples of how different personality type combinations navigate relationships,
              including their unique dynamics, challenges, and strategies for success.
            </p>
            <Link
              href="/relationships/case-studies"
              className="inline-flex items-center bg-white text-rose-700 font-medium py-2 px-4 rounded-lg hover:bg-rose-50 transition-colors"
            >
              View Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-rose-50 rounded-xl p-8 border border-rose-200">
            <h2 className="text-2xl font-bold text-rose-800 mb-4 flex items-center">
              <Users className="h-6 w-6 text-rose-600 mr-2" />
              Relationship Tips
            </h2>
            <p className="text-lg text-rose-700 mb-6">
              Looking for specific advice on how to navigate relationships with different personality types? Our
              relationship tips page offers practical guidance for every type combination.
            </p>
            <div className="flex justify-center">
              <Link
                href="/relationships/tips"
                className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
              >
                Get Relationship Tips
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
