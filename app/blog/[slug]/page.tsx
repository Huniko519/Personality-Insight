import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, User, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getBlogPost, getBlogPosts } from "@/lib/firebase"

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
  tags?: string[]
  relatedPosts?: string[]
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    console.log("Fetching blog post with slug:", params.slug)
    const post = await getBlogPost(params.slug)

    if (!post) {
      console.error("Blog post not found:", params.slug)
      return notFound()
    }

    console.log("Blog post found:", post.title)

    // Get all blog posts for related posts
    let relatedPostsData: BlogPost[] = []

    if (post.relatedPosts && post.relatedPosts.length > 0) {
      try {
        const allPosts = await getBlogPosts()

        // Find related posts
        relatedPostsData = post.relatedPosts
          .map((id: string) => allPosts.find((p: any) => p.id === id || p.slug === id))
          .filter((p: any): p is BlogPost => p !== undefined)
          .slice(0, 3)
      } catch (error) {
        console.error("Error fetching related posts:", error)
      }
    }

    // Handle different content formats
    let formattedContent
    if (typeof post.content === "string") {
      formattedContent = <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    } else if (Array.isArray(post.content)) {
      formattedContent = post.content.map((section: any, index: number) => (
        <div key={index} className="mb-8">
          {section.heading && <h2 className="text-2xl font-bold text-rose-800 mb-4">{section.heading}</h2>}
          {section.paragraphs &&
            section.paragraphs.map((paragraph: string, pIndex: number) => (
              <p key={pIndex} className="mb-4 text-rose-700">
                {paragraph}
              </p>
            ))}
        </div>
      ))
    } else {
      formattedContent = <p>No content available</p>
    }

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
              <img src={post.image || "/thinking-feeling-classrooms.png"} alt={post.title} className="w-full h-auto" />
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <div className="prose prose-rose max-w-none">{formattedContent}</div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-rose-100">
                  <div className="flex flex-wrap items-center">
                    <span className="text-rose-700 font-medium mr-3">Tags:</span>
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
            {post.authorBio && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                    <img
                      src={post.authorImage || "/thinking-feeling-classrooms.png"}
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
            )}

            {/* Related Articles */}
            {relatedPostsData.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-rose-800 mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPostsData.map((relatedPost) => (
                    <Card key={relatedPost.id} className="border-rose-200 shadow-md hover:shadow-lg transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={relatedPost.image || "/thinking-feeling-classrooms.png"}
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
  } catch (error) {
    console.error("Error in blog post page:", error)
    return notFound()
  }
}
