import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"
import { getBlogPosts } from "@/lib/firebase"
import NewsletterForm from "@/components/newsletter-form"

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
  content: string | any[]
  authorBio?: string
  authorImage?: string
  slug?: string
  featured?: boolean
  tags?: string[]
  relatedPosts?: string[]
}

export default async function BlogPage() {
  // Fetch blog posts on the server
  let blogPosts: BlogPost[] = []
  try {
    const posts = await getBlogPosts()
    blogPosts = Array.isArray(posts) ? posts : []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    blogPosts = []
  }

  // Find featured post
  const featuredPost = blogPosts.find((post) => post.featured === true) || blogPosts[0]

  // Get remaining posts
  const remainingPosts = featuredPost ? blogPosts.filter((post) => post.id !== featuredPost.id) : blogPosts

  return (
    <>
      <HeaderWrapper />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">PersonaIQ Blog</h1>
            <p className="text-xl text-rose-600 max-w-3xl mx-auto">
              Explore the fascinating world of personality psychology and discover insights to better understand
              yourself and others.
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-rose-800 mb-4">No Blog Posts Available</h2>
              <p className="text-rose-600 mb-6">
                We're currently working on adding new content. Please check back soon!
              </p>
              <Link href="/">
                <Button className="bg-rose-600 hover:bg-rose-700">Return to Home</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-rose-800 mb-6">Featured Article</h2>
                  <Card className="overflow-hidden border-rose-200 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/2 h-64 md:h-auto">
                        <img
                          src={featuredPost.image || "/thinking-feeling-classrooms.png"}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center text-sm text-rose-600 mb-2">
                            <span className="bg-rose-100 px-3 py-1 rounded-full">{featuredPost.category}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-rose-800 mb-3">{featuredPost.title}</h3>
                          <p className="text-rose-600 mb-4">{featuredPost.excerpt}</p>
                          <div className="text-sm text-rose-500 mb-4">
                            <span>{featuredPost.date}</span> • <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                        <Link href={`/blog/${featuredPost.id || featuredPost.slug}`}>
                          <Button className="bg-rose-600 hover:bg-rose-700 w-full md:w-auto">Read Article</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* All Posts */}
              <div>
                <h2 className="text-2xl font-bold text-rose-800 mb-6">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingPosts.map((post) => (
                    <Card key={post.id} className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image || "/thinking-feeling-classrooms.png"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-rose-600 mb-2">
                          <span className="bg-rose-100 px-3 py-1 rounded-full">{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-rose-800 mb-2">{post.title}</h3>
                        <p className="text-rose-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="text-sm text-rose-500 mb-4">
                          <span>{post.date}</span> • <span>{post.readTime}</span>
                        </div>
                        <Link href={`/blog/${post.id || post.slug}`}>
                          <Button variant="outline" className="w-full border-rose-300 text-rose-600 hover:bg-rose-50">
                            Read Article
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-rose-800 mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-rose-600 mb-6 max-w-2xl mx-auto">
              Get the latest articles, personality insights, and exclusive content delivered straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
