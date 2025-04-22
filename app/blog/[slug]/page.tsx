import Link from "next/link"
import { notFound } from "next/navigation"
import { promises as fs } from "fs"
import path from "path"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CalendarDays, User, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"

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
}

interface BlogPostDetail extends BlogPost {
  content: string
  authorBio: string
  authorImage: string
  tags: string[]
  relatedPosts: string[]
}

// Function to get all blog posts metadata
async function getBlogPosts() {
  const filePath = path.join(process.cwd(), "data/blog/index.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  const data = JSON.parse(fileContents)
  return data.posts as BlogPost[]
}

// Function to get a specific blog post by slug
async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const filePath = path.join(process.cwd(), `data/blog/${slug}.json`)
    const fileContents = await fs.readFile(filePath, "utf8")
    return JSON.parse(fileContents) as BlogPostDetail
  } catch (error) {
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Get all blog posts for related posts
  const allPosts = await getBlogPosts()

  // Find related posts
  const relatedPostsData = post.relatedPosts
    ? post.relatedPosts
        .map((id) => allPosts.find((p) => p.id === id))
        .filter((p): p is BlogPost => p !== undefined)
        .slice(0, 3)
    : []

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="text-rose-700 hover:text-rose-800 hover:bg-rose-100">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Articles
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-rose-600 mb-3">
              <span className="bg-rose-100 px-3 py-1 rounded-full">{post.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-rose-800 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-rose-600 mb-6">
              <div className="flex items-center mr-6 mb-2">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-md">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
            <div className="prose prose-rose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-rose-100">
              <div className="flex flex-wrap items-center">
                <span className="text-rose-700 font-medium mr-3">Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share and Save */}
            <div className="mt-6 flex flex-wrap justify-between items-center">
              <div className="flex space-x-2 mb-4 sm:mb-0">
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-600">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-600">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like
                </Button>
              </div>
              <Link href="/quiz">
                <Button className="bg-rose-600 hover:bg-rose-700">Take the Personality Test</Button>
              </Link>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                <img
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-rose-800 mb-2">About {post.author}</h3>
                <p className="text-rose-700">{post.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPostsData.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-rose-800 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPostsData.map((relatedPost) => (
                  <Card key={relatedPost.id} className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-rose-800 mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-rose-600 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                      <Link href={`/blog/${relatedPost.id}`} className="text-rose-600 hover:text-rose-800 text-sm">
                        Read more →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="bg-rose-50 rounded-xl shadow-md p-6 md:p-8 text-center">
            <h2 className="text-xl font-bold text-rose-800 mb-3">Enjoy this article?</h2>
            <p className="text-rose-700 mb-6">
              Subscribe to our newsletter to get more insights about personality psychology delivered to your inbox.
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
