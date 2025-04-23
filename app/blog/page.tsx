import Link from "next/link"
import { promises as fs } from "fs"
import path from "path"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CalendarDays, User, Clock, ArrowRight } from "lucide-react"

// Type definitions
interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  category: string
  image: string
  featured?: boolean
}

// Function to get blog posts data
async function getBlogPosts() {
  const filePath = path.join(process.cwd(), "data/blog/index.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  const data = JSON.parse(fileContents)
  return data.posts as BlogPost[]
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  // Find the featured post
  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0]

  // Get the regular posts (excluding the featured one)
  const regularPosts = blogPosts.filter((post) => post.id !== featuredPost.id)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">PersonaIQ Blog</h1>
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
                    src={featuredPost.image || "/thinking-feeling-classrooms.png"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-rose-600 mb-2">
                    <span className="bg-rose-100 px-3 py-1 rounded-full">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold text-rose-800 mb-3">{featuredPost.title}</h2>
                  <p className="text-rose-700 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-sm text-rose-600 mb-4">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.date}</span>
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Link href={`/blog/${featuredPost.id}`}>
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
            {regularPosts.map((post) => (
              <Card key={post.id} className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={post.image || "/thinking-feeling-classrooms.png"} alt={post.title} className="w-full h-full object-cover" />
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
