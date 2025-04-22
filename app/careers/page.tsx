import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CareersPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Career Insights</h1>
            <p className="text-rose-600 max-w-3xl mx-auto">
              Discover how your personality type influences your career path, work preferences, and professional
              strengths. Explore our resources to find fulfilling career options aligned with your natural tendencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Link href="/careers/personality-types">
              <Card className="h-full border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-rose-800">Personality Types & Careers</CardTitle>
                  <CardDescription className="text-rose-600">
                    Explore detailed career insights for each of the 16 personality types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700 mb-4">
                    Discover how your personality type influences your work style, strengths, and ideal environments.
                    Each type has unique professional attributes that can guide your career development.
                  </p>
                  <div className="flex justify-end">
                    <Button className="bg-rose-600 hover:bg-rose-700">Explore Type Profiles</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/entrepreneurs">
              <Card className="h-full border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-rose-800">Entrepreneur Insights</CardTitle>
                  <CardDescription className="text-rose-600">
                    Understand how personality type influences entrepreneurial success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700 mb-4">
                    Different personality types bring unique strengths to business ownership. Discover your
                    entrepreneurial style, potential challenges, and strategies for leveraging your natural tendencies
                    in business.
                  </p>
                  <div className="flex justify-end">
                    <Button className="bg-rose-600 hover:bg-rose-700">Explore Entrepreneur Types</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">Career Development Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-rose-200 bg-rose-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Workplace Dynamics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700 text-sm">
                    Learn how different personality types interact in professional settings and how to leverage diverse
                    perspectives for team success.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-rose-200 bg-rose-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Leadership Styles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700 text-sm">
                    Discover your natural leadership approach based on your personality type and how to develop a
                    well-rounded leadership style.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-rose-200 bg-rose-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-rose-800">Career Transitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700 text-sm">
                    Find guidance on navigating career changes and identifying new paths that align with your
                    personality preferences and strengths.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Discover Your Career Path</h2>
            <p className="text-rose-600 max-w-3xl mx-auto mb-6">
              Not sure where to start? Take our personality assessment to gain insights into your professional strengths
              and discover career paths where you'll naturally excel.
            </p>
            <Link href="/quiz">
              <Button className="bg-rose-600 hover:bg-rose-700 mr-4">Take the Personality Test</Button>
            </Link>
            <Link href="/visualization">
              <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                Explore Personality Dimensions
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
