import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CalendarDays, User, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"

// Sample blog posts data - in a real app, this would come from a database or CMS
const blogPosts = [
  {
    id: "understanding-mbti",
    title: "Understanding MBTI: The Science Behind Personality Types",
    excerpt:
      "Explore the history and scientific foundations of the Myers-Briggs Type Indicator and how it helps us understand human personality.",
    content: `
      <p>The Myers-Briggs Type Indicator (MBTI) is one of the most widely used personality assessments in the world. Developed by Isabel Briggs Myers and her mother, Katharine Cook Briggs, the MBTI is based on Carl Jung's theory of psychological types, which was published in his 1921 book "Psychological Types."</p>
      
      <h2>The Origins of MBTI</h2>
      
      <p>Katharine Briggs became interested in personality type theory in the 1920s after meeting her daughter Isabel's future husband and noticing how different his personality was from their family's. She began researching and developing her own typology theories, which were later refined when she discovered Jung's work.</p>
      
      <p>Isabel Briggs Myers, with her mother's encouragement, continued developing the indicator during World War II, believing that a knowledge of personality preferences would help women entering the industrial workforce for the first time to identify jobs that would be "most comfortable and effective" for them.</p>
      
      <h2>The Four Dimensions of Personality</h2>
      
      <p>The MBTI identifies four key dimensions of personality:</p>
      
      <ol>
        <li><strong>Extraversion (E) vs. Introversion (I)</strong>: Where you focus your attention and get your energy</li>
        <li><strong>Sensing (S) vs. Intuition (N)</strong>: How you take in information and what you pay attention to</li>
        <li><strong>Thinking (T) vs. Feeling (F)</strong>: How you make decisions</li>
        <li><strong>Judging (J) vs. Perceiving (P)</strong>: How you deal with the outer world</li>
      </ol>
      
      <p>These four dimensions combine to create 16 distinct personality types, each with its own set of characteristics, strengths, and potential areas for growth.</p>
      
      <h2>Scientific Validity and Criticism</h2>
      
      <p>The MBTI has faced criticism from some academic psychologists who question its reliability and validity. Critics point out that the test-retest reliability can be inconsistent, with some individuals receiving different results when taking the test multiple times.</p>
      
      <p>Additionally, the MBTI uses a dichotomous (either/or) approach to personality dimensions, while many psychologists argue that personality traits exist on a spectrum. The Five-Factor Model (Big Five), which is more widely accepted in academic psychology, measures traits on a continuum rather than as binary opposites.</p>
      
      <p>Despite these criticisms, the MBTI remains popular in personal development, career counseling, and organizational settings due to its accessibility and practical applications. Many people find that their MBTI results provide valuable insights into their preferences, strengths, and potential areas for growth.</p>
      
      <h2>Modern Applications</h2>
      
      <p>Today, the MBTI is used in various contexts:</p>
      
      <ul>
        <li>Career development and guidance</li>
        <li>Team building and organizational development</li>
        <li>Leadership training</li>
        <li>Relationship counseling</li>
        <li>Personal growth and self-awareness</li>
        <li>Educational settings to understand learning preferences</li>
      </ul>
      
      <p>Understanding your personality type can help you make more informed decisions about your career, improve your relationships, and develop strategies for personal growth that align with your natural preferences.</p>
      
      <h2>Conclusion</h2>
      
      <p>While the MBTI should not be used as a definitive or limiting label, it can serve as a valuable tool for self-reflection and understanding. By recognizing your preferences and those of others, you can develop greater empathy, improve communication, and appreciate the diversity of human personality.</p>
      
      <p>Remember that personality type is just one aspect of who you are. Your experiences, values, and choices also play significant roles in shaping your identity and behavior.</p>
    `,
    date: "April 15, 2023",
    author: "Dr. Sarah Johnson",
    authorBio:
      "Dr. Sarah Johnson is a clinical psychologist specializing in personality psychology. She has been using the MBTI in her practice for over 15 years and has published several papers on personality type theory.",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "8 min read",
    category: "Psychology",
    tags: ["MBTI", "Personality Psychology", "Carl Jung", "Self-awareness"],
    image: "/placeholder.svg?height=600&width=1200",
    relatedPosts: ["introverts-extraverts", "cognitive-functions", "personal-growth"],
  },
  {
    id: "introverts-extraverts",
    title: "Introverts vs. Extraverts: Understanding the Energy Dimension",
    excerpt:
      "Dive deep into the first dimension of personality type and discover how it shapes our social interactions and energy needs.",
    content: `
      <p>The Extraversion-Introversion dimension is perhaps the most widely recognized aspect of personality type theory. It describes where individuals prefer to focus their attention and how they derive their energy. This fundamental difference influences many aspects of our lives, from how we socialize to how we work and recharge.</p>
      
      <h2>What Defines Extraversion and Introversion?</h2>
      
      <p>Contrary to popular belief, extraversion and introversion are not simply about being "outgoing" versus "shy." Rather, they describe a person's relationship with the external world and where they direct their energy and attention.</p>
      
      <p><strong>Extraverts (E)</strong> tend to:</p>
      <ul>
        <li>Focus their attention outward on people and things</li>
        <li>Gain energy from social interaction and external stimulation</li>
        <li>Process thoughts and ideas by talking them through</li>
        <li>Prefer breadth of experiences and connections</li>
        <li>Act first, reflect later</li>
      </ul>
      
      <p><strong>Introverts (I)</strong> tend to:</p>
      <ul>
        <li>Focus their attention inward on ideas and impressions</li>
        <li>Gain energy from solitude and internal reflection</li>
        <li>Process thoughts and ideas internally before sharing</li>
        <li>Prefer depth in experiences and connections</li>
        <li>Reflect first, act later</li>
      </ul>
      
      <h2>The Neuroscience Behind E/I Differences</h2>
      
      <p>Research suggests that extraversion and introversion may be linked to differences in brain activity and sensitivity to stimulation. Introverts appear to have higher baseline levels of arousal and may be more sensitive to dopamine, meaning they require less external stimulation to feel alert and engaged. Extraverts, on the other hand, may have lower baseline arousal levels and seek out social interaction and stimulating environments to reach their optimal state.</p>
      
      <p>This biological difference helps explain why introverts can feel overwhelmed in highly stimulating environments, while extraverts may feel understimulated and restless in quiet settings.</p>
      
      <h2>The Extraversion-Introversion Spectrum</h2>
      
      <p>While the MBTI presents extraversion and introversion as dichotomous preferences, most people fall somewhere along a spectrum rather than at the extreme ends. Many individuals exhibit both extraverted and introverted behaviors depending on the context, though they typically have a natural preference for one mode over the other.</p>
      
      <p>The concept of "ambiversion" has gained popularity to describe people who fall near the middle of the spectrum and can adapt their behavior based on the situation.</p>
      
      <h2>Common Misconceptions</h2>
      
      <p>Several misconceptions about extraversion and introversion persist:</p>
      
      <ol>
        <li><strong>Introversion equals shyness</strong>: Shyness is about fear of social judgment, while introversion is about energy and attention focus. An introvert can be socially confident but still prefer smaller gatherings and need alone time to recharge.</li>
        <li><strong>Extraverts can't be deep thinkers</strong>: Extraversion doesn't limit intellectual depth; it simply describes how someone processes information and recharges.</li>
        <li><strong>Introverts don't like people</strong>: Many introverts enjoy deep connections and meaningful conversations; they just prefer smaller groups and may need time alone to recharge after socializing.</li>
        <li><strong>Extraversion is better in our society</strong>: While many Western cultures value extraverted traits, both preferences have unique strengths and contributions to make.</li>
      </ol>
      
      <h2>Honoring Your Energy Needs</h2>
      
      <p>Understanding your preference for extraversion or introversion can help you manage your energy more effectively:</p>
      
      <p><strong>For Extraverts:</strong></p>
      <ul>
        <li>Recognize your need for social interaction and external processing</li>
        <li>Build social activities into your schedule, especially during challenging periods</li>
        <li>Find ways to think out loud, such as discussion groups or collaborative work</li>
        <li>Be mindful of introverts' need for space and reflection</li>
      </ul>
      
      <p><strong>For Introverts:</strong></p>
      <ul>
        <li>Honor your need for solitude and reflection</li>
        <li>Schedule alone time to recharge, especially after social events</li>
        <li>Communicate your needs to others to avoid misunderstandings</li>
        <li>Find environments that allow for focus and minimal interruption</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>The extraversion-introversion dimension offers valuable insights into our energy patterns and interaction preferences. By understanding and respecting these differences in ourselves and others, we can create environments that allow everyone to thrive and contribute in their own way.</p>
      
      <p>Remember that while personality preferences are relatively stable, they're not limiting labels. With awareness and intention, both extraverts and introverts can develop skills and strategies to function effectively across a wide range of situations.</p>
    `,
    date: "May 2, 2023",
    author: "Michael Chen",
    authorBio:
      "Michael Chen is a social psychologist and researcher focusing on personality differences in social interactions. He has conducted numerous studies on how extraversion and introversion influence communication patterns and group dynamics.",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "6 min read",
    category: "Personality Insights",
    tags: ["Extraversion", "Introversion", "Social Psychology", "Energy Management"],
    image: "/placeholder.svg?height=600&width=1200",
    relatedPosts: ["understanding-mbti", "cognitive-functions", "relationships-compatibility"],
  },
  {
    id: "four-dimensions",
    title: "The Four Dimensions of Personality: A Comprehensive Guide",
    excerpt:
      "Explore the four key dimensions that define our personality types and how they interact to create our unique psychological preferences.",
    content: `
      <p>The Myers-Briggs Type Indicator (MBTI) identifies four fundamental dimensions of personality that combine to create 16 distinct personality types. Each dimension represents a preference for one mode of functioning over another, and understanding these preferences can provide valuable insights into how we perceive the world, process information, make decisions, and structure our lives.</p>
      
      <h2>Dimension 1: Extraversion (E) vs. Introversion (I)</h2>
      
      <p>This dimension describes where we focus our attention and derive our energy.</p>
      
      <p><strong>Extraversion (E)</strong> preferences include:</p>
      <ul>
        <li>Drawing energy from interaction with people and the external world</li>
        <li>Thinking out loud and processing information externally</li>
        <li>Breadth of interests and connections</li>
        <li>Action-oriented approach to life</li>
        <li>Sociable and expressive communication style</li>
      </ul>
      
      <p><strong>Introversion (I)</strong> preferences include:</p>
      <ul>
        <li>Drawing energy from internal reflection and solitude</li>
        <li>Processing information internally before sharing</li>
        <li>Depth of interests and connections</li>
        <li>Thoughtful, reflective approach to life</li>
        <li>Reserved and considered communication style</li>
      </ul>
      
      <h2>Dimension 2: Sensing (S) vs. Intuition (N)</h2>
      
      <p>This dimension describes how we take in information and what we naturally pay attention to.</p>
      
      <p><strong>Sensing (S)</strong> preferences include:</p>
      <ul>
        <li>Focusing on concrete, tangible information and details</li>
        <li>Trusting information that comes directly from the five senses</li>
        <li>Practical, realistic approach to problems</li>
        <li>Present-oriented perspective</li>
        <li>Step-by-step, sequential learning and working style</li>
      </ul>
      
      <p><strong>Intuition (N)</strong> preferences include:</p>
      <ul>
        <li>Focusing on patterns, connections, and possibilities</li>
        <li>Trusting insights, hunches, and theoretical frameworks</li>
        <li>Innovative, conceptual approach to problems</li>
        <li>Future-oriented perspective</li>
        <li>Holistic, leap-frog learning and working style</li>
      </ul>
      
      <h2>Dimension 3: Thinking (T) vs. Feeling (F)</h2>
      
      <p>This dimension describes how we make decisions and come to conclusions.</p>
      
      <p><strong>Thinking (T)</strong> preferences include:</p>
      <ul>
        <li>Making decisions based on logical analysis and objective criteria</li>
        <li>Valuing consistency, fairness as equality, and truth in decision-making</li>
        <li>Task-oriented approach to situations</li>
        <li>Tendency to analyze and critique to improve</li>
        <li>Direct, straightforward communication style</li>
      </ul>
      
      <p><strong>Feeling (F)</strong> preferences include:</p>
      <ul>
        <li>Making decisions based on values and how they affect people</li>
        <li>Valuing harmony, fairness as individual need, and compassion in decision-making</li>
        <li>People-oriented approach to situations</li>
        <li>Tendency to appreciate and support to maintain connection</li>
        <li>Diplomatic, empathetic communication style</li>
      </ul>
      
      <h2>Dimension 4: Judging (J) vs. Perceiving (P)</h2>
      
      <p>This dimension describes how we approach the external world and deal with structure.</p>
      
      <p><strong>Judging (J)</strong> preferences include:</p>
      <ul>
        <li>Preferring structure, organization, and planning</li>
        <li>Working steadily toward deadlines</li>
        <li>Seeking closure and resolution</li>
        <li>Preferring clear expectations and guidelines</li>
        <li>Finding satisfaction in completing tasks and making decisions</li>
      </ul>
      
      <p><strong>Perceiving (P)</strong> preferences include:</p>
      <ul>
        <li>Preferring flexibility, adaptability, and spontaneity</li>
        <li>Working in bursts of energy, often close to deadlines</li>
        <li>Keeping options open and gathering more information</li>
        <li>Preferring freedom to adapt to changing circumstances</li>
        <li>Finding satisfaction in starting projects and exploring possibilities</li>
      </ul>
      
      <h2>How the Dimensions Interact</h2>
      
      <p>These four dimensions don't exist in isolation; they interact to create a dynamic personality system. For example:</p>
      
      <ul>
        <li>The combination of S/N and T/F influences how you solve problems (ST: practical and logical; SF: practical and people-focused; NT: theoretical and logical; NF: theoretical and people-focused)</li>
        <li>The combination of E/I and J/P affects how you organize your world (EJ: organized and expressive; EP: adaptable and expressive; IJ: organized and reserved; IP: adaptable and reserved)</li>
        <li>The middle two letters (S/N and T/F) form your cognitive functions, which describe your mental processes in greater detail</li>
      </ul>
      
      <h2>Developing Across the Dimensions</h2>
      
      <p>While we each have natural preferences, healthy development involves becoming more balanced and skilled with both sides of each dimension:</p>
      
      <ul>
        <li>Extraverts can develop deeper reflection and internal processing</li>
        <li>Introverts can develop comfort with external engagement and expression</li>
        <li>Sensing types can develop pattern recognition and future thinking</li>
        <li>Intuitive types can develop attention to detail and practical application</li>
        <li>Thinking types can develop consideration of values and people impacts</li>
        <li>Feeling types can develop logical analysis and objective evaluation</li>
        <li>Judging types can develop flexibility and openness to new information</li>
        <li>Perceiving types can develop structure and follow-through</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Understanding the four dimensions of personality type provides a framework for recognizing and appreciating both our own preferences and those of others. This awareness can lead to more effective communication, better team dynamics, more informed career choices, and greater personal development.</p>
      
      <p>Remember that type preferences are not abilities or skills—they simply describe what comes more naturally to us. With awareness and practice, we can develop competence across all dimensions while honoring our authentic preferences.</p>
    `,
    date: "March 28, 2023",
    author: "Dr. Robert Miller",
    authorBio:
      "Dr. Robert Miller is a professor of psychology specializing in personality theory. He has authored three books on the applications of type theory in organizational settings and conducts workshops on personality-based approaches to leadership development.",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "15 min read",
    category: "Psychology",
    tags: ["MBTI", "Personality Dimensions", "Psychological Preferences", "Self-awareness"],
    image: "/placeholder.svg?height=600&width=1200",
    relatedPosts: ["understanding-mbti", "introverts-extraverts", "cognitive-functions"],
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.id === params.slug)

  if (!post) {
    notFound()
  }

  // Find related posts
  const relatedPostsData = post.relatedPosts
    ? post.relatedPosts
        .map((id) => blogPosts.find((p) => p.id === id))
        .filter((p): p is (typeof blogPosts)[0] => p !== undefined)
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
