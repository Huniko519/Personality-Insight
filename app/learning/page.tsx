import Link from "next/link"
import {
  Book,
  Lightbulb,
  Brain,
  Users,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ChevronRight,
  BookOpen,
  Compass,
  Zap,
  Target,
  PenTool,
  Layers,
} from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"

export default async function LearningPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-rose-100 via-rose-50 to-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid-rose-100/50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

          {/* Decorative elements */}
          <div className="absolute top-12 right-12 w-24 h-24 rounded-full bg-rose-200/30 blur-xl"></div>
          <div className="absolute bottom-12 left-12 w-32 h-32 rounded-full bg-rose-200/30 blur-xl"></div>
          <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-rose-400/40"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-rose-400/40"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="animate-fade-in-up">
                <span className="px-3 py-1 text-sm font-medium bg-rose-200 text-rose-800 rounded-full inline-block mb-4">
                  Personality & Education
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-rose-900 mb-4 leading-tight">
                  Learning & <span className="text-rose-600">Teaching</span> Styles
                </h1>
                <div className="h-1 w-20 bg-rose-500 rounded-full mb-6 mx-auto"></div>
                <p className="text-lg text-rose-800 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Discover how personality type influences learning preferences and teaching styles, and how
                  understanding these differences can enhance educational experiences.
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center bg-rose-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Take the Personality Test
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4 sm:px-0 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 -mt-20 relative z-20 border border-rose-100">
            <div className="prose prose-rose max-w-none">
              <div className="flex items-center mb-6">
                <div className="bg-rose-100 p-3 rounded-full mr-4">
                  <GraduationCap className="text-rose-600" size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-rose-800 m-0">Understanding Learning Preferences</h2>
              </div>

              <p className="text-lg leading-relaxed">
                Many of the pioneering studies for the Myers-Briggs Type Indicator® (MBTI®) instrument were done with
                high school and college students. These original studies, plus the ongoing data collected by colleges
                and universities worldwide, have resulted in a wealth of information about how personality affects
                learning and teaching styles.
              </p>

              <div className="my-10 bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg relative">
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-rose-500 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">"</span>
                </div>
                <p className="text-xl font-medium text-rose-800 italic pl-4">
                  "Type can tell us many things about the way people prefer to learn. An understanding of type leads to
                  the appreciation that there are many different and equally valuable ways to learn."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl p-6 shadow-md border border-rose-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-rose-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                  <div className="relative">
                    <div className="bg-rose-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <BookOpen size={24} className="text-rose-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">What is a Learning Style?</h3>
                    <p className="text-gray-700">
                      Think of a "learning style" more as a "learning preference." The word "style" gives the impression
                      that it can be easily changed. For example, today I like this style, tomorrow I may like another.
                      Learning preference, as denoted by personality type, recognizes an innate, natural way of
                      learning.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl p-6 shadow-md border border-rose-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-rose-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                  <div className="relative">
                    <div className="bg-rose-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Target size={24} className="text-rose-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-rose-800 mb-4">Natural Strengths</h3>
                    <p className="text-gray-700">
                      Your learning style does not limit you to one way of learning. What it can do is bring awareness
                      to your natural strengths so that you may utilize them to give your best results. We all have a
                      preferred way of learning—our natural way that makes the most sense to us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pt-16 pb-4 px-4 sm:px-0 max-w-6xl mx-auto">
          <div className="prose prose-rose max-w-none">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-rose-100 p-3 rounded-full">
                <Lightbulb className="text-rose-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-rose-800 m-0">How Personality Type Influences Learning</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-50">
                <p>
                  Type can tell us many things about the way people prefer to learn. An understanding of type leads to
                  the appreciation that there are many different and equally valuable ways to learn. Type can also help
                  you identify some of your strengths and challenges as you approach studying and learning.
                </p>
                <p>
                  All type preferences influence how a young person naturally learns, however Sensing and Intuition
                  preferences seem to play a key role. Sensing and Intuition reflect the ways we pay attention to
                  experiences and perceive what is being learned.
                </p>
                <div className="mt-4 flex justify-end">
                  <div className="bg-rose-50 p-2 rounded-full">
                    <Compass size={20} className="text-rose-500" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-50">
                <p>
                  Students have preferred ways of learning, but so do teachers. And teachers often teach from that
                  vantage point. When teachers and students understand the differences in their teaching and learning
                  styles, communication and learning is enhanced.
                </p>
                <p>
                  A student's interests and ways of learning directly affect how he or she takes in information. This
                  calls on educators to consider different teaching approaches, based on the needs of students.
                </p>
                <div className="mt-4 flex justify-end">
                  <div className="bg-rose-50 p-2 rounded-full">
                    <PenTool size={20} className="text-rose-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-rose-50 p-5 rounded-lg flex flex-col items-center text-center hover:bg-rose-100 transition-colors">
                <Book size={32} className="text-rose-600 mb-3" />
                <span className="text-rose-800 font-medium">Reading & Writing</span>
              </div>
              <div className="bg-rose-50 p-5 rounded-lg flex flex-col items-center text-center hover:bg-rose-100 transition-colors">
                <Users size={32} className="text-rose-600 mb-3" />
                <span className="text-rose-800 font-medium">Group Discussion</span>
              </div>
              <div className="bg-rose-50 p-5 rounded-lg flex flex-col items-center text-center hover:bg-rose-100 transition-colors">
                <Zap size={32} className="text-rose-600 mb-3" />
                <span className="text-rose-800 font-medium">Hands-on Learning</span>
              </div>
              <div className="bg-rose-50 p-5 rounded-lg flex flex-col items-center text-center hover:bg-rose-100 transition-colors">
                <Layers size={32} className="text-rose-600 mb-3" />
                <span className="text-rose-800 font-medium">Visual Learning</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-16 mb-8">
              <div className="bg-rose-100 p-3 rounded-full">
                <Users className="text-rose-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-rose-800 m-0">How might type preferences show up in learning?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-rose-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-rose-100 rounded-full p-3 h-fit">
                    <Users size={24} className="text-rose-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rose-900 text-lg mb-2">Extraversion vs. Introversion</h3>
                    <p className="text-gray-700">
                      Young people who prefer Extraversion might like projects that involve talking with others and
                      being physically engaged with their environment, whereas someone with an Introversion preference
                      might like projects that offer private or quiet time for reflection, where they can process their
                      thoughts internally until they are more developed.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-rose-400 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-rose-700">Extraversion</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-rose-700">Introversion</span>
                      <div className="w-3 h-3 bg-rose-600 rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-rose-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-rose-100 rounded-full p-3 h-fit">
                    <Book size={24} className="text-rose-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rose-900 text-lg mb-2">Sensing vs. Intuition</h3>
                    <p className="text-gray-700">
                      A person who prefers Sensing typically likes clear, detailed instructions, whereas someone who
                      prefers Intuition tends to like a framework so they can do their own original, innovative work.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-rose-400 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-rose-700">Sensing</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-rose-700">Intuition</span>
                      <div className="w-3 h-3 bg-rose-600 rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-rose-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-rose-100 rounded-full p-3 h-fit">
                    <Brain size={24} className="text-rose-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rose-900 text-lg mb-2">Thinking vs. Feeling</h3>
                    <p className="text-gray-700">
                      For students who prefer Thinking, classrooms organized in logical systems help them do better
                      work, whereas one with a Feeling preference tends to do their best learning in a classroom that is
                      warm and friendly with teachers who tune into emotional needs and deal with personal relationship
                      issues.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-rose-400 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-rose-700">Thinking</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-rose-700">Feeling</span>
                      <div className="w-3 h-3 bg-rose-600 rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-rose-100 hover:shadow-lg transition-shadow">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 bg-rose-100 rounded-full p-3 h-fit">
                    <Sparkles size={24} className="text-rose-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rose-900 text-lg mb-2">Judging vs. Perceiving</h3>
                    <p className="text-gray-700">
                      For those who prefer Judging, clear plans and an organized classroom are necessary for them to do
                      their best work, whereas a person with a Perceiving preference likes the flexibility to follow
                      their curiosity and explore a variety of interests and experiences.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-rose-400 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-rose-700">Judging</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-rose-700">Perceiving</span>
                      <div className="w-3 h-3 bg-rose-600 rounded-full ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative pt-16 pb-16 px-4 sm:px-0 mt-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-rose-800"></div>
          <div className="absolute inset-0 bg-pattern-dots-light opacity-10"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent"></div>
          <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-rose-500/20 blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-rose-500/20 blur-xl"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-8 mx-auto w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <GraduationCap size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Discover Your Learning Style</h2>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
              Take our personality assessment to understand your natural learning preferences and discover strategies
              that work best for your personality type.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center bg-white text-rose-700 font-medium px-8 py-4 rounded-lg hover:bg-rose-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Take the Personality Test
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
