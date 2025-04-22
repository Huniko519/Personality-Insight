"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search, HelpCircle, BookOpen, Briefcase, Users, Brain, Mail } from "lucide-react"

// FAQ data
const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        question: "What is the Myers-Briggs Type Indicator (MBTI)?",
        answer:
          "The Myers-Briggs Type Indicator (MBTI) is a personality assessment based on Carl Jung's theory of psychological types. It categorizes people into 16 distinct personality types based on four dimensions: Extraversion vs. Introversion, Sensing vs. Intuition, Thinking vs. Feeling, and Judging vs. Perceiving. The MBTI helps individuals understand their preferences, strengths, and potential areas for growth.",
      },
      {
        question: "How accurate is the personality test?",
        answer:
          "Our personality test is designed to provide meaningful insights into your psychological preferences. While no personality assessment is 100% accurate, our test is based on established psychological principles and has been refined through extensive research. The accuracy of your results depends on how honestly and thoughtfully you answer the questions. Many people find that their results resonate strongly with their self-perception and experiences.",
      },
      {
        question: "Can my personality type change over time?",
        answer:
          "Your basic personality preferences tend to remain relatively stable throughout life. However, how you express and develop these preferences can change significantly as you grow and mature. Life experiences, personal development, and environmental factors can influence how your personality manifests. Some people may also see different test results at different times due to temporary life circumstances or growing self-awareness.",
      },
      {
        question: "Is one personality type better than others?",
        answer:
          "No, there are no 'better' or 'worse' personality types. Each type has its own unique strengths, challenges, and contributions to make. The value of personality typing is not to label people as superior or inferior, but to foster self-understanding and appreciation for different perspectives and approaches. Every type is valuable and necessary in society.",
      },
    ],
  },
  {
    id: "test",
    name: "About the Test",
    icon: BookOpen,
    questions: [
      {
        question: "How long does the test take to complete?",
        answer:
          "The test typically takes about 10-15 minutes to complete. We've designed it to be comprehensive enough to provide meaningful results while respecting your time. The exact duration depends on how quickly you make decisions and how much you reflect on each question.",
      },
      {
        question: "Do I need to create an account to take the test?",
        answer:
          "No, you don't need to create an account to take the test. Our test is freely available without requiring registration. However, creating an account allows you to save your results, track changes over time, and access additional features like detailed reports and career matching.",
      },
      {
        question: "How should I answer the questions for the most accurate results?",
        answer:
          "Answer the questions based on what feels most natural to you, not how you think you should respond or how others expect you to behave. Consider your preferences in general situations rather than specific contexts. There are no right or wrong answers—the goal is to reflect your genuine preferences. Try not to overthink; your initial reaction is often the most authentic.",
      },
      {
        question: "Can I retake the test?",
        answer:
          "Yes, you can retake the test as many times as you'd like. In fact, taking the test multiple times can sometimes provide additional insights, especially if you're in a period of personal growth or significant life changes. However, we recommend waiting at least a few weeks between tests to avoid being influenced by your previous results.",
      },
    ],
  },
  {
    id: "results",
    name: "Understanding Results",
    icon: Brain,
    questions: [
      {
        question: "What do the four letters in my personality type mean?",
        answer:
          "The four letters represent your preferences on each dimension: E (Extraversion) or I (Introversion) for where you focus your attention; S (Sensing) or N (Intuition) for how you take in information; T (Thinking) or F (Feeling) for how you make decisions; and J (Judging) or P (Perceiving) for how you approach the external world. Together, these four preferences create your unique personality type code.",
      },
      {
        question: "What are cognitive functions?",
        answer:
          "Cognitive functions are the mental processes we use to take in information and make decisions. Each personality type has a unique stack of eight cognitive functions, with the top four being the most conscious and influential. These functions combine one of the perceiving processes (Sensing or Intuition) or one of the judging processes (Thinking or Feeling) with an orientation (Extraverted or Introverted). Understanding cognitive functions provides deeper insights into how different types process information and make decisions.",
      },
      {
        question: "My results don't seem to fit me perfectly. What does this mean?",
        answer:
          "It's common for people to feel that their results don't capture every aspect of their personality. This can happen for several reasons: you might be in a transitional period in your life, you might have developed skills outside your natural preferences, or you might be answering questions based on how you behave in specific contexts rather than your general preferences. Remember that personality type is a framework for understanding, not a rigid box. If your results don't resonate, consider retaking the test or exploring the descriptions of similar types.",
      },
      {
        question: "How can I use my personality type information in daily life?",
        answer:
          "Understanding your personality type can be applied in numerous ways: improving communication by recognizing different styles, making career choices that align with your strengths, developing personal growth strategies that work with your natural tendencies, building more effective teams by leveraging diverse perspectives, and enhancing relationships through greater empathy and appreciation for differences. The key is to use type as a tool for self-awareness and understanding, not as a limitation or excuse.",
      },
    ],
  },
  {
    id: "features",
    name: "Features & Services",
    icon: Briefcase,
    questions: [
      {
        question: "What is the Career Matching feature?",
        answer:
          "Our Career Matching feature analyzes your personality type and identifies career paths that typically align well with your natural strengths, values, and preferences. It provides detailed information about each recommended career, including required skills, work environment, and growth potential. This tool can help you discover new career possibilities or confirm that your current path aligns with your personality type.",
      },
      {
        question: "How does the Printable Report work?",
        answer:
          "The Printable Report feature generates a comprehensive PDF document with detailed insights about your personality type. You can customize which sections to include, such as strengths, challenges, career recommendations, relationship compatibility, and development suggestions. Once generated, you can download the report, print it, or email it to yourself for future reference. This is particularly useful for personal reflection or sharing insights with mentors, coaches, or therapists.",
      },
      {
        question: "What is the Type Visualization tool?",
        answer:
          "The Type Visualization tool provides interactive graphical representations of personality types and their relationships. It includes visualizations like the Type Wheel (showing all 16 types and their relationships), Cognitive Functions (displaying how different functions stack in a personality type), and Dimension Spectrum (illustrating the four dimensions that define personality type). These visualizations help you understand the MBTI system more intuitively and see how different types relate to each other.",
      },
      {
        question: "Are there any premium features available?",
        answer:
          "Yes, we offer premium features for users who want deeper insights and additional tools. These include in-depth personality reports, advanced career matching with personalized recommendations, relationship compatibility analysis, team dynamics assessments, and access to expert webinars and resources. Premium features are available through a subscription or as one-time purchases. Check our pricing page for current offerings and details.",
      },
    ],
  },
  {
    id: "relationships",
    name: "Relationships & Compatibility",
    icon: Users,
    questions: [
      {
        question: "Can personality type predict relationship compatibility?",
        answer:
          "Personality type can provide insights into potential dynamics in relationships, but it doesn't determine compatibility in a simplistic way. While certain type combinations may naturally understand each other better or complement each other's strengths, successful relationships depend on many factors beyond personality type, including shared values, communication skills, and mutual respect. Understanding type differences can help partners appreciate each other's perspectives and navigate potential areas of misunderstanding.",
      },
      {
        question: "What are the best personality type matches for relationships?",
        answer:
          "Rather than prescribing specific 'best matches,' we believe that any two types can form a successful relationship with understanding and effort. That said, some natural affinities exist: types that share some preferences but differ in others often balance each other well. For example, sharing the S/N preference (how you take in information) can create a common worldview, while differing in E/I (extraversion/introversion) can bring complementary energy to the relationship. The key is understanding and respecting differences rather than seeking a 'perfect match.'",
      },
      {
        question: "How can I use personality type to improve my relationships?",
        answer:
          "Understanding personality type can enhance relationships in several ways: it can help you recognize that differences in behavior often reflect different preferences rather than intentional slights; it can provide a neutral language for discussing these differences; it can help you appreciate the unique strengths your partner brings; and it can guide you in adapting your communication style to better connect with others. The goal is not to change yourself or others, but to develop greater understanding and flexibility.",
      },
      {
        question: "Why do I clash with certain personality types?",
        answer:
          "Tension between different types often stems from fundamentally different ways of perceiving the world and making decisions. For example, Sensing types focus on concrete facts while Intuitive types focus on patterns and possibilities; Thinking types prioritize logical analysis while Feeling types prioritize values and people impacts. These differences can lead to misunderstandings when each type assumes their approach is universally valid. Recognizing these differences as legitimate variations rather than flaws can reduce conflict and foster appreciation for diverse perspectives.",
      },
    ],
  },
  {
    id: "contact",
    name: "Contact & Support",
    icon: Mail,
    questions: [
      {
        question: "How can I contact your team with questions?",
        answer:
          "You can reach our support team through our Contact page, where you'll find a form to submit your inquiry. We typically respond within 24-48 hours. For more immediate assistance, check our FAQ section first to see if your question has already been answered.",
      },
      {
        question: "Do you offer consultations or workshops?",
        answer:
          "Yes, we offer both individual consultations and group workshops on personality type applications. Individual consultations can provide personalized insights about your type and specific applications to your life or career. Our workshops cover topics like team dynamics, leadership development, career planning, and relationship enhancement through the lens of personality type. Contact us through our website for more information and pricing.",
      },
      {
        question: "Is there a community forum for discussing personality types?",
        answer:
          "Yes, we host an active online community where users can discuss personality types, share experiences, and ask questions. The forum is moderated by our team to ensure a supportive and informative environment. You can access the community through the 'Community' link in our main navigation after creating a free account.",
      },
      {
        question: "How can I provide feedback about the platform?",
        answer:
          "We welcome feedback to help us improve our platform! You can share your thoughts through the feedback form in your account settings, or by emailing feedback@personalityinsight.com. We regularly review user suggestions and incorporate them into our development roadmap.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("general")

  // Filter questions based on search query
  const filteredCategories = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-12 max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-rose-800 opacity-80"></div>
          <img src="/placeholder.svg?height=400&width=1200" alt="FAQ Banner" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white max-w-3xl">
              Find answers to common questions about personality types, our test, and how to interpret your results
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-rose-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for questions..."
                className="pl-10 border-rose-200 py-6 text-lg shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {searchQuery ? (
            // Search Results
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-rose-800 mb-6 flex items-center">
                <Search className="mr-2 h-5 w-5 text-rose-600" />
                Search Results
              </h2>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div key={category.id} className="mb-8">
                    <div className="flex items-center mb-4">
                      <category.icon className="h-6 w-6 text-rose-600 mr-2" />
                      <h3 className="text-xl font-medium text-rose-800">{category.name}</h3>
                    </div>
                    <Accordion type="single" collapsible className="border-rose-200">
                      {category.questions.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.id}-${index}`}
                          className="border-b border-rose-100"
                        >
                          <AccordionTrigger className="text-rose-800 hover:text-rose-600 py-4">
                            <div className="text-left">{faq.question}</div>
                          </AccordionTrigger>
                          <AccordionContent className="text-rose-700 py-4 px-2">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-rose-800 mb-2">No results found</h3>
                  <p className="text-rose-700 mb-6">
                    Try different keywords or browse the categories below to find what you're looking for.
                  </p>
                  <Button onClick={() => setSearchQuery("")} className="bg-rose-600 hover:bg-rose-700">
                    Browse All FAQs
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Tabbed FAQ Categories
            <div className="mb-12">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeCategory === category.id
                          ? "bg-rose-100 text-rose-800 shadow-sm"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {faqCategories.map((category) => (
                <div key={category.id} className={activeCategory === category.id ? "block" : "hidden"}>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-6">
                      <category.icon className="h-8 w-8 text-rose-600 mr-3" />
                      <h2 className="text-2xl font-semibold text-rose-800">{category.name}</h2>
                    </div>

                    <Accordion type="single" collapsible className="border-rose-200">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-rose-100">
                          <AccordionTrigger className="text-rose-800 hover:text-rose-600 py-4">
                            <div className="text-left">{faq.question}</div>
                          </AccordionTrigger>
                          <AccordionContent className="text-rose-700 py-4 px-2">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Still Have Questions */}
          <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl shadow-md p-8 text-center mt-12">
            <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer you were looking for, feel free to reach out to our team directly.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-rose-600 hover:bg-rose-100 hover:text-rose-700">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Learn More</h3>
              <p className="text-rose-700 mb-4">Explore our blog for in-depth articles about personality psychology.</p>
              <Link href="/blog">
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                  Visit Blog
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Brain className="h-10 w-10 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Take the Test</h3>
              <p className="text-rose-700 mb-4">Discover your personality type with our comprehensive assessment.</p>
              <Link href="/quiz">
                <Button className="bg-rose-600 hover:bg-rose-700">Start Test</Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="h-10 w-10 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-rose-800 mb-2">Explore Types</h3>
              <p className="text-rose-700 mb-4">
                Learn about all 16 personality types and their unique characteristics.
              </p>
              <Link href="/types">
                <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
                  View Types
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
