import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CalendarDays, User, Clock, ArrowRight } from "lucide-react"

// Sample blog posts data
const blogPosts = [
  {
    id: "understanding-mbti",
    title: "Understanding MBTI: The Science Behind Personality Types",
    excerpt:
      "Explore the history and scientific foundations of the Myers-Briggs Type Indicator and how it helps us understand human personality.",
    date: "April 15, 2023",
    author: "Dr. Sarah Johnson",
    readTime: "8 min read",
    category: "Psychology",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "introverts-extraverts",
    title: "Introverts vs. Extraverts: Understanding the Energy Dimension",
    excerpt:
      "Dive deep into the first dimension of personality type and discover how it shapes our social interactions and energy needs.",
    date: "May 2, 2023",
    author: "Michael Chen",
    readTime: "6 min read",
    category: "Personality Insights",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "career-choices",
    title: "How Your Personality Type Influences Career Choices",
    excerpt:
      "Learn how understanding your personality type can help you find a career path that aligns with your natural strengths and preferences.",
    date: "June 10, 2023",
    author: "Emma Rodriguez",
    readTime: "10 min read",
    category: "Career Development",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "relationships-compatibility",
    title: "Personality Types in Relationships: Finding Compatibility",
    excerpt:
      "Discover how different personality types interact in relationships and strategies for better communication and understanding.",
    date: "July 8, 2023",
    author: "Dr. James Wilson",
    readTime: "9 min read",
    category: "Relationships",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "cognitive-functions",
    title: "Cognitive Functions Explained: The Building Blocks of Personality",
    excerpt:
      "A comprehensive guide to understanding the eight cognitive functions that form the foundation of the MBTI system.",
    date: "August 22, 2023",
    author: "Dr. Sarah Johnson",
    readTime: "12 min read",
    category: "Psychology",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "personal-growth",
    title: "Using Personality Insights for Personal Growth and Development",
    excerpt:
      "Practical strategies for leveraging your personality type awareness to overcome challenges and develop new skills.",
    date: "September 15, 2023",
    author: "Alex Thompson",
    readTime: "7 min read",
    category: "Self-Improvement",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Personality Insight Blog</h1>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Explore articles about personality psychology, self-discovery, and practical applications of type theory
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <Card className="border-rose-200 shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-rose-200 h-64 md:h-auto">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Featured post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-rose-600 mb-2">
                    <span className="bg-rose-100 px-3 py-1 rounded-full">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold text-rose-800 mb-3">
                    The Four Dimensions of Personality: A Comprehensive Guide
                  </h2>
                  <p className="text-rose-700 mb-4">
                    Explore the four key dimensions that define our personality types and how they interact to create
                    our unique psychological preferences.
                  </p>
                  <div className="flex items-center text-sm text-rose-600 mb-4">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span className="mr-4">March 28, 2023</span>
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">Dr. Robert Miller</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>15 min read</span>
                  </div>
                  <Link href="/blog/four-dimensions">
                    <Button className="bg-rose-600 hover:bg-rose-700">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center text-sm text-rose-600 mb-1">
                    <span className="bg-rose-100 px-2 py-0.5 rounded-full">{post.category}</span>
                  </div>
                  <CardTitle className="text-rose-800 text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-700 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-rose-600">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span className="mr-3">{post.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-rose-600 text-rose-600 hover:bg-rose-50 flex items-center justify-center"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-rose-800 mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-rose-700 mb-6 max-w-2xl mx-auto">
              Get the latest articles, personality insights, and exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Button className="bg-rose-600 hover:bg-rose-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
