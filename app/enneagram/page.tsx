"use client"
import Link from "next/link"
import { ArrowRight, Info, BookOpen, Users, Brain, Heart, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function EnneagramPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-rose-200 dark:from-rose-900 dark:to-rose-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-rose-800 dark:text-rose-100 mb-4">
                The Enneagram Personality System
              </h1>
              <p className="text-xl text-rose-700 dark:text-rose-200 max-w-3xl mx-auto">
                Discover your core motivations and unlock your path to personal growth
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/enneagram-test" passHref>
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                    Take the Enneagram Test <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/visualization?type=enneagram-rings" passHref>
                  <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                    Explore the Enneagram <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-rose-200 dark:border-rose-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-rose-800 dark:text-rose-200">Understanding the Enneagram</CardTitle>
                    <CardDescription className="dark:text-rose-300">
                      A powerful tool for self-discovery and personal growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-rose-700 dark:text-rose-300">
                    <p>
                      Do you want to get to know yourself better? The Enneagram system is a widely accepted personality
                      model that offers deep insight into our core driving motivations, opening up exciting
                      possibilities in the prediction and understanding of human behaviour.
                    </p>
                    <p>
                      The Integrative Enneagram unlocks and supports your journey of self-discovery and uncovers the
                      patterns of behaviour that subconsciously drive and motivate us to behave in certain ways. When we
                      make these motivations conscious, we are able to transcend them and develop richer, more
                      supportive ways of being. Working with this model empowers individuals to take the first step of
                      responsibility for their own behaviours and growth, through a greater understanding of why they
                      act and react the way they do.
                    </p>
                    <p>
                      The Enneagram is an archetypal framework consisting of nine Types that offer in-depth insight to
                      is an archetypal framework consisting of nine Types that offer in-depth insight to individuals,
                      groups, and collectives. Consisting of 3 Centers of Intelligence, 9 Enneagram Types, Wings, 27
                      Subtypes, and more, this model offers a rich map to personal development. It does not box people
                      in but rather opens a pathway to self-discovery and greater personal awareness.
                    </p>
                    <p>
                      As a framework, it speaks to the journey of integration in a profound way. It is able to uncover
                      the uniqueness of each individual and his or her journey. It does not only reveal what holds an
                      individual back, you can also gain valuable insights into your journey towards strength and
                      liberation, connecting us to our strengths and higher selves.
                    </p>
                    <p>
                      The Enneagram test is, therefore, a sense-making tool or a framework that enables the development
                      of self-knowledge and meta-awareness.
                    </p>
                    <p>
                      The most effective, accurate, and comprehensive Enneagram personality test for our users, is the
                      iEQ9 developed by Integrative Enneagram Solutions.
                    </p>
                    <div className="bg-rose-50 dark:bg-rose-900/50 p-4 rounded-lg border border-rose-200 dark:border-rose-800 flex items-start">
                      <Info className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-rose-800 dark:text-rose-200 mb-1">Origins of the Enneagram</h4>
                        <p className="text-sm">
                          The word "Enneagram" comes from the Greek words "ennea" meaning "nine" and "grammos" meaning
                          "something written" or "a figure". The Enneagram symbol is composed of a circle with nine
                          equidistant points, each representing one of the nine personality types. Its origin has an
                          ancient history.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 dark:border-rose-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-rose-800 dark:text-rose-200">The Nine Enneagram Types</CardTitle>
                    <CardDescription className="dark:text-rose-300">
                      Each type has unique motivations, fears, and patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            1
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Strict Perfectionist</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Ones are about improvement and 'right action', ensuring things are done correctly. They are
                          principled, with a clear sense of right and wrong and may seem idealistic, self-righteous or
                          judgemental.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            2
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Considerate Helper</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Twos want to meet others' needs in a helpful, supportive way. Warm, giving and
                          people-oriented, they seek affirmation from their relationships and may be sensitive and angry
                          if they feel unappreciated.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            3
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Competitive Achiever</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Threes are 'doers' and tend to be practical, success-oriented and task-driven, and project a
                          polished persona or image. They are competitive and will make sacrifices to achieve their
                          goals and appear successful.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            4
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Intense Creative</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Fours search for meaning, depth and authenticity. They are emotionally sensitive and attuned
                          to their environment; creative and expressive as individuals. They may seem emotionally moody,
                          dramatic and focused on their own needs.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            5
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Quiet Specialist</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Fives are private individuals with an active mental life, observing and exploring how the
                          world works. They struggle to share thoughts and feelings and may seem socially awkward or
                          disinterested.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            6
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Loyal Sceptic</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Sixes easily tune into potential danger and risks, act on a sense of anxiety and think in
                          sceptical ways. They value trust, responsibility and loyalty and need to feel they are safe
                          and belong.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            7
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Enthusiastic Visionary</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Sevens seek variety, stimulation, and are a fun-loving Type, tackling challenges with optimism
                          and engaging with life in a future-oriented way. In groups, they bring creativity, energy and
                          optimism, and easily make friends.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            8
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Active Controller</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Eights are forces of nature, with a strong presence and personality that values being in
                          control. They are guarded but caring and protective of those around them. As they mask any
                          vulnerability with a tough, no-nonsense exterior.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300 mr-2 font-bold">
                            9
                          </span>
                          <h3 className="font-semibold text-rose-800 dark:text-rose-200">The Adaptive Peacemaker</h3>
                        </div>
                        <p className="text-sm text-rose-700 dark:text-rose-300">
                          Nines are diplomatic and attuned to the ideas of others, often as facilitators or mediators in
                          groups. They form the glue between people with their friendly, grounding and stable demeanour.
                        </p>
                      </div>
                    </div>

                    <div className="text-center mt-6">
                      <Link href="/visualization?type=enneagram-rings" passHref>
                        <Button
                          variant="outline"
                          className="border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-800"
                        >
                          Explore the Enneagram Visualization <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 dark:border-rose-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-rose-800 dark:text-rose-200">
                      What can the Enneagram do for me?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-rose-700 dark:text-rose-300">
                    <p>
                      The Enneagram can be used to help us better understand our own personalities and the personalities
                      of others, as well as to develop more self-insight and self-acceptance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2" />
                          <h4 className="font-medium text-rose-800 dark:text-rose-200">Self-Discovery</h4>
                        </div>
                        <p className="text-sm">
                          Gain deeper insights into your core motivations, fears, and patterns of behavior that drive
                          your actions.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <Users className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2" />
                          <h4 className="font-medium text-rose-800 dark:text-rose-200">Better Relationships</h4>
                        </div>
                        <p className="text-sm">
                          Understand how different personality types interact, improving communication and empathy in
                          your relationships.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <Brain className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2" />
                          <h4 className="font-medium text-rose-800 dark:text-rose-200">Personal Growth</h4>
                        </div>
                        <p className="text-sm">
                          Identify your strengths and areas for development, with clear paths for personal and spiritual
                          growth.
                        </p>
                      </div>

                      <div className="p-4 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center mb-2">
                          <Zap className="h-5 w-5 text-rose-600 dark:text-rose-400 mr-2" />
                          <h4 className="font-medium text-rose-800 dark:text-rose-200">Increased Awareness</h4>
                        </div>
                        <p className="text-sm">
                          Develop greater self-awareness and mindfulness of your automatic reactions and habitual
                          patterns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="border-rose-200 dark:border-rose-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-rose-800 dark:text-rose-200">The Three Centers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                      <div className="flex items-center mb-1">
                        <Brain className="h-4 w-4 text-rose-600 dark:text-rose-400 mr-2" />
                        <h4 className="font-medium text-rose-800 dark:text-rose-200">Thinking Center (5, 6, 7)</h4>
                      </div>
                      <p className="text-xs text-rose-700 dark:text-rose-300">
                        These types process information primarily through thinking and intellect.
                      </p>
                    </div>

                    <div className="p-3 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                      <div className="flex items-center mb-1">
                        <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400 mr-2" />
                        <h4 className="font-medium text-rose-800 dark:text-rose-200">Feeling Center (2, 3, 4)</h4>
                      </div>
                      <p className="text-xs text-rose-700 dark:text-rose-300">
                        These types process information primarily through emotions and feelings.
                      </p>
                    </div>

                    <div className="p-3 bg-rose-50 dark:bg-rose-900/50 rounded-lg border border-rose-200 dark:border-rose-800">
                      <div className="flex items-center mb-1">
                        <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400 mr-2" />
                        <h4 className="font-medium text-rose-800 dark:text-rose-200">Instinctive Center (8, 9, 1)</h4>
                      </div>
                      <p className="text-xs text-rose-700 dark:text-rose-300">
                        These types process information primarily through instinct and gut reactions.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-rose-200 dark:border-rose-800 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-rose-800 dark:text-rose-200">Explore the Enneagram</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href="/enneagram-test" passHref>
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                        Take the Enneagram Test
                      </Button>
                    </Link>

                    <Link href="/visualization?type=enneagram-rings" passHref>
                      <Button variant="outline" className="w-full border-rose-300 text-rose-600 hover:bg-rose-50">
                        Interactive Visualization
                      </Button>
                    </Link>

                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((type) => (
                        <Link
                          key={type}
                          href={`/visualization?type=enneagram-rings&enneagramType=${type}`}
                          className="flex items-center justify-center p-2 rounded-md bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/50 dark:hover:bg-rose-800/70 text-rose-700 dark:text-rose-300 text-sm font-medium"
                        >
                          Type {type}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
