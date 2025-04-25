"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPersonalityTypeByCode } from "@/lib/firebase"

export default function TypeCareerPage() {
  const params = useParams()
  const typeCode = (params.type as string).toUpperCase()

  const [personalityType, setPersonalityType] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchPersonalityType() {
      try {
        const type = await getPersonalityTypeByCode(typeCode)
        if (!type) {
          console.error(`Personality type ${typeCode} not found`)
          setError(true)
        } else {
          setPersonalityType(type)
        }
      } catch (error) {
        console.error(`Error fetching personality type ${typeCode}:`, error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPersonalityType()
  }, [typeCode])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-slate-600">Loading personality type data...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !personalityType) {
    notFound()
  }

  // Career-specific content for each personality type
  const careerContent = {
    workEnvironment: getWorkEnvironment(typeCode),
    strengths: getCareerStrengths(typeCode),
    challenges: getCareerChallenges(typeCode),
    growthAreas: getGrowthAreas(typeCode),
    leadershipStyle: getLeadershipStyle(typeCode),
    teamDynamics: getTeamDynamics(typeCode),
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/careers/personality-types">
              <Button variant="ghost" className="mb-4 text-slate-700 hover:text-slate-800 hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left mr-2"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to All Types
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">{typeCode} Careers</h1>
            <h2 className="text-2xl font-semibold text-slate-700">{personalityType.name}</h2>
            <p className="text-slate-600 mt-2">{personalityType.nickname}</p>
          </div>

          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Career Overview</TabsTrigger>
              <TabsTrigger value="strengths">Professional Strengths</TabsTrigger>
              <TabsTrigger value="development">Career Development</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Career Profile: {typeCode}</h3>
              <p className="mb-6 text-slate-700">{personalityType.description}</p>

              <h4 className="font-semibold text-slate-800 mb-3">Ideal Work Environment</h4>
              <p className="mb-6 text-slate-700">{careerContent.workEnvironment}</p>

              <h4 className="font-semibold text-slate-800 mb-3">Recommended Career Paths</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {personalityType.careers.map((career, index) => (
                  <div key={index} className="bg-slate-50 p-3 rounded-md">
                    <p className="text-slate-700">{career}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-slate-800 mb-3">Famous {typeCode}s in Their Careers</h4>
              <p className="text-slate-700 mb-2">
                These well-known individuals share your personality type and have excelled in their fields:
              </p>
              <div className="flex flex-wrap gap-2">
                {personalityType.famousPeople.map((person, index) => (
                  <span key={index} className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                    {person}
                  </span>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="strengths" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Professional Strengths</h3>
                  <ul className="space-y-3">
                    {personalityType.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check-circle"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-700">{strength}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Leadership Style</h3>
                  <p className="text-slate-700 mb-4">{careerContent.leadershipStyle}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Workplace Challenges</h3>
                  <ul className="space-y-3">
                    {personalityType.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-slate-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-alert-circle"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-slate-700">{weakness}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Team Dynamics</h3>
                  <p className="text-slate-700 mb-4">{careerContent.teamDynamics}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="development" className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Career Development for {typeCode}s</h3>

              <div className="mb-8">
                <h4 className="font-semibold text-slate-800 mb-3">Growth Opportunities</h4>
                <p className="text-slate-700 mb-4">{careerContent.growthAreas}</p>

                <div className="bg-slate-50 p-4 rounded-md">
                  <h5 className="font-semibold text-slate-800 mb-2">Development Strategies</h5>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    {getDevStrategies(typeCode).map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-slate-800 mb-3">Communication in the Workplace</h4>
                <p className="text-slate-700 mb-4">{personalityType.relationships.communication}</p>

                <div className="bg-slate-50 p-4 rounded-md">
                  <h5 className="font-semibold text-slate-800 mb-2">Communication Tips</h5>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    {getCommunicationTips(typeCode).map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Long-term Career Satisfaction</h4>
                <p className="text-slate-700 mb-4">
                  For long-term career satisfaction, {typeCode}s should seek roles that align with their core values:
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {personalityType.values.map((value, index) => (
                    <span key={index} className="bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                      {value}
                    </span>
                  ))}
                </div>

                <p className="text-slate-700">
                  Remember that while your personality type provides valuable insights, your individual experiences,
                  skills, and interests also play crucial roles in finding fulfilling work. Use this information as a
                  starting point for exploration rather than a limitation.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mb-8">
            <Link href="/quiz">
              <Button className="bg-slate-600 hover:bg-slate-700 mr-4">Take the Personality Test</Button>
            </Link>
            <Link href="/careers">
              <Button variant="outline" className="border-slate-600 text-slate-600 hover:bg-slate-50">
                Explore Career Matches
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

// Helper functions to provide career-specific content for each type

function getWorkEnvironment(type: string): string {
  const environments = {
    INTJ: "INTJs thrive in environments that value innovation, intellectual challenge, and independence. They prefer workplaces that are organized, efficient, and free from unnecessary bureaucracy. Ideal settings allow them to implement their strategic vision with minimal micromanagement, providing access to resources for continuous learning and improvement.",
    INTP: "INTPs flourish in environments that encourage theoretical exploration and problem-solving. They need workplaces that offer intellectual freedom, minimal structure, and opportunities to work independently on complex challenges. Ideal settings respect their need for autonomy while providing access to information and resources for continuous learning.",
    ENTJ: "ENTJs excel in dynamic, results-oriented environments that reward leadership and strategic thinking. They thrive in structured organizations with clear hierarchies where they can implement systems and drive toward goals. Ideal settings offer challenges, advancement opportunities, and the authority to make decisions and lead initiatives.",
    ENTP: "ENTPs thrive in innovative, fast-paced environments that welcome new ideas and creative problem-solving. They need workplaces with variety, intellectual stimulation, and flexibility. Ideal settings encourage brainstorming and experimentation, with minimal routine and bureaucracy, allowing them to explore multiple projects simultaneously.",
    INFJ: "INFJs flourish in harmonious, purpose-driven environments that align with their values. They prefer workplaces that are relatively quiet and free from conflict, where they can focus on meaningful work that helps others. Ideal settings offer opportunities for creativity, personal connection, and making a positive difference.",
    INFP: "INFPs thrive in environments that honor their values, creativity, and need for authenticity. They prefer workplaces with a supportive, collaborative atmosphere and minimal hierarchy. Ideal settings offer flexibility, opportunities for personal expression, and meaningful work that aligns with their ideals and contributes to others' wellbeing.",
    ENFJ: "ENFJs excel in collaborative, people-focused environments that value harmony and personal growth. They thrive in workplaces that appreciate their leadership and communication skills. Ideal settings offer opportunities to mentor others, work toward meaningful goals, and create positive change in people's lives.",
    ENFP: "ENFPs flourish in creative, dynamic environments that welcome innovation and personal expression. They need workplaces with variety, flexibility, and supportive colleagues. Ideal settings encourage brainstorming, offer diverse projects, and allow them to connect with others while maintaining independence to explore new possibilities.",
    ISTJ: "ISTJs thrive in structured, stable environments with clear expectations and established procedures. They prefer workplaces that value reliability, precision, and traditional approaches. Ideal settings offer predictability, respect for hierarchy, and opportunities to apply their practical skills to solve concrete problems.",
    ISFJ: "ISFJs excel in supportive, structured environments where they can help others in practical ways. They prefer workplaces with clear expectations, stability, and appreciation for their contributions. Ideal settings offer predictability, harmonious relationships, and opportunities to use their detailed knowledge to support people or organizations.",
    ESTJ: "ESTJs thrive in structured, efficient environments with clear hierarchies and established procedures. They prefer workplaces that value tradition, reliability, and results. Ideal settings offer leadership opportunities, clear metrics for success, and the authority to implement and maintain systems and standards.",
    ESFJ: "ESFJs flourish in harmonious, collaborative environments with clear structures and supportive relationships. They prefer workplaces that value cooperation, tradition, and service to others. Ideal settings offer stability, appreciation for their contributions, and opportunities to organize people and events to meet practical needs.",
    ISTP: "ISTPs thrive in hands-on environments that offer variety and opportunities to solve practical problems. They prefer workplaces with minimal bureaucracy that allow them freedom to approach tasks in their own way. Ideal settings offer technical challenges, tangible results, and the flexibility to work independently with minimal supervision.",
    ISFP: "ISFPs excel in flexible, supportive environments that value creativity and authenticity. They prefer workplaces with minimal conflict and bureaucracy, where they can express their unique perspective. Ideal settings offer hands-on work, aesthetic opportunities, and the freedom to follow their own approach at their own pace.",
    ESTP: "ESTPs flourish in dynamic, action-oriented environments that offer variety and immediate challenges. They prefer workplaces with minimal restrictions that reward quick thinking and practical solutions. Ideal settings offer competitive opportunities, tangible rewards, and the freedom to respond to situations as they arise.",
    ESFP: "ESFPs thrive in lively, people-oriented environments that offer variety and opportunities for social interaction. They prefer workplaces with a positive atmosphere and minimal routine. Ideal settings allow them to use their practical skills to help others, work collaboratively, and enjoy the present moment.",
  }

  return (
    environments[type as keyof typeof environments] ||
    "You thrive in environments that align with your personality preferences, values, and working style. Consider workplaces that support your natural strengths while providing growth opportunities in areas where you may face challenges."
  )
}

function getCareerStrengths(type: string): string[] {
  // This function would return additional career-specific strengths beyond the general strengths
  // For brevity, I'm not implementing the full content here
  return []
}

function getCareerChallenges(type: string): string[] {
  // This function would return additional career-specific challenges beyond the general weaknesses
  // For brevity, I'm not implementing the full content here
  return []
}

function getGrowthAreas(type: string): string {
  const growthAreas = {
    INTJ: "INTJs can enhance their career development by focusing on emotional intelligence and interpersonal skills. Learning to communicate complex ideas in accessible ways, developing patience with different working styles, and practicing active listening can significantly improve team dynamics and leadership effectiveness. Additionally, cultivating flexibility when plans change and becoming more comfortable with ambiguity can help INTJs adapt to today's rapidly changing workplace.",
    INTP: "INTPs can advance their careers by developing implementation skills to complement their theoretical strengths. Focusing on project management techniques, setting concrete deadlines, and practicing clear communication of complex ideas will help translate their innovative thinking into practical results. Additionally, developing emotional intelligence, active listening skills, and an appreciation for different working styles can improve collaboration and leadership potential.",
    ENTJ: "ENTJs can enhance their effectiveness by developing emotional intelligence and a more collaborative leadership approach. Learning to listen actively, show appreciation for different perspectives, and communicate with empathy can improve team dynamics and loyalty. Additionally, practicing patience with processes and people, along with occasional reflection before action, can lead to more sustainable success and prevent burnout in themselves and their teams.",
    ENTP: "ENTPs can advance their careers by developing follow-through and implementation skills. Creating systems for tracking projects, practicing time management, and learning to focus on completing initiatives before starting new ones will help translate their brilliant ideas into tangible accomplishments. Additionally, developing emotional intelligence, active listening, and diplomacy in debates can improve their leadership potential and team relationships.",
    INFJ: "INFJs can enhance their career development by setting clearer boundaries and developing practical implementation skills. Learning to say no when necessary, communicating their needs directly, and breaking idealistic visions into actionable steps will help prevent burnout and increase their impact. Additionally, developing comfort with conflict, practicing data-based decision-making, and building resilience to criticism can strengthen their leadership capabilities.",
    INFP: "INFPs can advance their careers by developing practical implementation skills and more structured work approaches. Creating systems for organization, setting concrete deadlines, and practicing direct communication will help translate their ideals into tangible outcomes. Additionally, building resilience to criticism, developing comfort with conflict, and learning to separate professional feedback from personal value can strengthen their effectiveness in collaborative environments.",
    ENFJ: "ENFJs can enhance their effectiveness by developing boundaries and more analytical decision-making approaches. Learning to prioritize their own needs, becoming comfortable with necessary conflict, and incorporating objective data alongside values in decisions will help prevent burnout and increase their leadership impact. Additionally, delegating more effectively and developing comfort with imperfection can create more sustainable success.",
    ENFP: "ENFPs can advance their careers by developing follow-through and structured work approaches. Creating systems for organization, practicing time management, and learning to complete projects before starting new ones will help translate their innovative ideas into accomplishments. Additionally, developing comfort with routine aspects of work, practicing objective decision-making, and setting realistic expectations can strengthen their professional reputation and effectiveness.",
    ISTJ: "ISTJs can enhance their career development by cultivating adaptability and openness to innovation. Practicing flexibility when procedures change, considering alternative approaches, and developing comfort with ambiguity will help them thrive in rapidly evolving industries. Additionally, developing emotional intelligence, practicing active listening, and working on articulating their valuable insights more assertively can strengthen their leadership potential and team contributions.",
    ISFJ: "ISFJs can advance their careers by developing assertiveness and comfort with change. Learning to express their needs directly, setting clear boundaries, and advocating for their ideas will increase their influence and prevent burnout. Additionally, practicing flexibility when routines change, taking calculated risks, and developing comfort with constructive conflict can help them adapt to evolving workplace demands and take on greater leadership roles.",
    ESTJ: "ESTJs can enhance their effectiveness by developing emotional intelligence and openness to innovation. Learning to listen actively, show appreciation for different perspectives, and communicate with empathy can improve team dynamics and loyalty. Additionally, considering alternative approaches, practicing flexibility when traditional methods aren't working, and developing patience with brainstorming processes can help them lead more effectively in changing environments.",
    ESFJ: "ESFJs can advance their careers by developing assertiveness and independent decision-making skills. Learning to make decisions without seeking consensus, setting clear boundaries, and becoming comfortable with necessary conflict will strengthen their leadership capabilities. Additionally, practicing objectivity in evaluations, developing comfort with change, and building resilience to criticism can help them navigate challenging workplace situations more effectively.",
    ISTP: "ISTPs can enhance their career development by focusing on long-term planning and interpersonal communication. Developing strategic thinking, setting career goals, and creating systems for organization can provide direction to their natural tactical abilities. Additionally, practicing active listening, expressing appreciation more openly, and developing patience with team processes can improve their collaboration skills and leadership potential.",
    ISFP: "ISFPs can advance their careers by developing structure and assertiveness. Creating systems for organization, setting concrete goals, and practicing direct communication will help showcase their valuable contributions more effectively. Additionally, developing comfort with planning ahead, building confidence in their ideas, and learning to separate constructive feedback from personal criticism can strengthen their professional presence and leadership capabilities.",
    ESTP: "ESTPs can enhance their effectiveness by developing long-term planning and follow-through. Creating strategic goals, considering long-term consequences of decisions, and developing systems to track progress will complement their excellent crisis management skills. Additionally, practicing active listening, developing patience with different working styles, and building empathy can improve their team relationships and leadership depth.",
    ESFP: "ESFPs can advance their careers by developing structure and long-term focus. Creating systems for organization, setting concrete goals, and practicing follow-through on less exciting tasks will help them build on their natural people skills. Additionally, considering long-term consequences of decisions, developing comfort with planning ahead, and building skills in objective analysis can strengthen their professional reputation and leadership potential.",
  }

  return (
    growthAreas[type as keyof typeof growthAreas] ||
    "Focus on developing complementary skills that balance your natural preferences. Consider how you might grow by practicing approaches that don't come as naturally to you, while leveraging your inherent strengths in ways that contribute value to your organization and career path."
  )
}

function getLeadershipStyle(type: string): string {
  const leadershipStyles = {
    INTJ: "INTJs lead with strategic vision and intellectual authority. They excel at developing innovative systems, setting high standards, and implementing long-term plans. Their leadership focuses on efficiency, competence, and continuous improvement. They motivate others through logical reasoning and clear direction rather than emotional appeals.",
    INTP: "INTPs lead through intellectual insight and conceptual innovation. They excel at analyzing complex problems, generating creative solutions, and questioning established systems. Their leadership style is non-hierarchical, focusing on exploring possibilities and sharing knowledge. They give team members autonomy while providing conceptual frameworks for decision-making.",
    ENTJ: "ENTJs lead with decisive authority and strategic direction. They excel at organizing resources, implementing systems, and driving toward goals. Their leadership is direct and efficient, focusing on logic, competence, and results. They motivate others through clear expectations, rational arguments, and creating structures for achievement.",
    ENTP: "ENTPs lead through innovation and intellectual stimulation. They excel at generating possibilities, challenging conventions, and adapting to changing circumstances. Their leadership style is energetic and flexible, encouraging debate and creative problem-solving. They motivate others by creating excitement around ideas and fostering an environment of intellectual exploration.",
    INFJ: "INFJs lead with quiet inspiration and visionary insight. They excel at understanding people's potential and creating harmonious environments aligned with meaningful goals. Their leadership style is supportive yet purposeful, focusing on values, growth, and positive impact. They motivate others through personal connection and appealing to shared ideals.",
    INFP: "INFPs lead through authentic values and individual empowerment. They excel at seeing others' potential and creating environments that honor diverse perspectives. Their leadership style is gentle yet principled, focusing on meaning, harmony, and personal growth. They motivate others by modeling authenticity and connecting work to deeper purpose.",
    ENFJ: "ENFJs lead with charismatic inspiration and people development. They excel at understanding others' needs, building consensus, and organizing toward shared goals. Their leadership style is warm and directive, focusing on growth, harmony, and collective achievement. They motivate others through personal connection, encouragement, and creating a sense of shared purpose.",
    ENFP: "ENFPs lead through enthusiasm and possibility thinking. They excel at inspiring others, generating creative solutions, and adapting to changing needs. Their leadership style is energetic and empowering, focusing on innovation, authenticity, and personal growth. They motivate others by creating excitement around ideas and recognizing individual contributions and potential.",
    ISTJ: "ISTJs lead with reliable structure and practical oversight. They excel at maintaining systems, ensuring quality standards, and implementing proven methods. Their leadership style is methodical and consistent, focusing on responsibility, tradition, and attention to detail. They motivate others through clear expectations, logical procedures, and leading by example.",
    ISFJ: "ISFJs lead with dependable support and practical care. They excel at maintaining harmony, attending to details, and preserving valuable traditions. Their leadership style is nurturing yet organized, focusing on stability, service, and meeting concrete needs. They motivate others through personal consideration, creating comfortable environments, and demonstrating loyalty.",
    ESTJ: "ESTJs lead with decisive structure and practical implementation. They excel at organizing resources, maintaining standards, and driving toward concrete results. Their leadership style is direct and efficient, focusing on tradition, responsibility, and clear expectations. They motivate others through logical reasoning, established procedures, and recognition of reliable contributions.",
    ESFJ: "ESFJs lead with interpersonal harmony and practical organization. They excel at building team cohesion, coordinating people, and maintaining supportive structures. Their leadership style is warm and directive, focusing on cooperation, tradition, and meeting group needs. They motivate others through personal encouragement, creating comfortable environments, and recognizing contributions.",
    ISTP: "ISTPs lead with calm competence and practical problem-solving. They excel at troubleshooting crises, optimizing systems, and applying technical expertise. Their leadership style is hands-off yet responsive, focusing on efficiency, adaptability, and tangible results. They motivate others through demonstrating skills, allowing autonomy, and providing practical solutions.",
    ISFP: "ISFPs lead with quiet authenticity and practical support. They excel at adapting to immediate needs, creating harmonious environments, and bringing aesthetic sensibility to projects. Their leadership style is gentle and action-oriented, focusing on values, flexibility, and personal consideration. They motivate others through leading by example, appreciating individual contributions, and creating pleasant work experiences.",
    ESTP: "ESTPs lead with energetic action and practical problem-solving. They excel at responding to immediate challenges, negotiating obstacles, and seizing opportunities. Their leadership style is dynamic and results-oriented, focusing on efficiency, adaptability, and tangible outcomes. They motivate others through enthusiasm, competitive spirit, and finding practical solutions to obstacles.",
    ESFP: "ESFPs lead with enthusiastic engagement and practical support. They excel at energizing teams, responding to immediate needs, and creating positive environments. Their leadership style is spontaneous and people-oriented, focusing on enjoyment, practicality, and interpersonal harmony. They motivate others through optimism, appreciation, and making work experiences more pleasant and engaging.",
  }

  return (
    leadershipStyles[type as keyof typeof leadershipStyles] ||
    "Your leadership style is influenced by your personality preferences, drawing on your natural strengths while requiring development in areas that may be more challenging. Effective leadership involves both leveraging your innate tendencies and developing complementary skills to address diverse situations and team needs."
  )
}

function getTeamDynamics(type: string): string {
  const teamDynamics = {
    INTJ: "In team settings, INTJs contribute strategic vision and analytical problem-solving. They work best with competent colleagues who value efficiency and intellectual discussion. They may need to consciously develop patience with brainstorming processes and appreciation for different working styles. INTJs thrive when given independence to implement their ideas but benefit from collaborators who can help translate their complex concepts for broader audiences.",
    INTP: "In team settings, INTPs contribute innovative thinking and logical analysis. They work best with intellectually curious colleagues who respect independence and value conceptual discussion. They may need to consciously develop follow-through on group projects and attentiveness to practical details. INTPs thrive when given freedom to explore ideas but benefit from collaborators who can help implement their theoretical insights.",
    ENTJ: "In team settings, ENTJs contribute leadership, structure, and strategic direction. They work best with competent, goal-oriented colleagues who value efficiency and clear communication. They may need to consciously develop patience with different working styles and appreciation for the emotional aspects of collaboration. ENTJs thrive when leading initiatives but benefit from team members who can provide attention to interpersonal dynamics and detailed implementation.",
    ENTP: "In team settings, ENTPs contribute innovative ideas and adaptable problem-solving. They work best with intellectually stimulating colleagues who enjoy debate and appreciate creative thinking. They may need to consciously develop follow-through on group commitments and sensitivity to others' need for structure. ENTPs thrive in brainstorming sessions but benefit from collaborators who can help implement their numerous ideas.",
    INFJ: "In team settings, INFJs contribute insightful perspectives and harmonious facilitation. They work best with authentic, purpose-driven colleagues who value meaningful work and respectful communication. They may need to consciously develop comfort with constructive conflict and directness about their own needs. INFJs thrive when connecting work to larger purpose but benefit from team members who can help with practical implementation and objective analysis.",
    INFP: "In team settings, INFPs contribute authentic values and creative approaches. They work best with supportive, open-minded colleagues who respect individuality and share similar values. They may need to consciously develop comfort with structure and directness in communication. INFPs thrive in collaborative environments that honor diverse perspectives but benefit from team members who can help with organization and implementation.",
    ENFJ: "In team settings, ENFJs contribute leadership, harmony, and people development. They work best with appreciative, cooperative colleagues who value personal connection and shared purpose. They may need to consciously develop comfort with necessary conflict and objectivity in evaluations. ENFJs thrive when facilitating group processes but benefit from team members who can provide logical analysis and attention to practical details.",
    ENFP: "In team settings, ENFPs contribute enthusiasm, creativity, and interpersonal connection. They work best with open-minded, appreciative colleagues who enjoy brainstorming and value authenticity. They may need to consciously develop follow-through on commitments and attention to details. ENFPs thrive in collaborative, flexible environments but benefit from team members who can help with organization and implementation.",
    ISTJ: "In team settings, ISTJs contribute reliability, practical knowledge, and attention to detail. They work best with responsible, clear-communicating colleagues who respect procedures and meet deadlines. They may need to consciously develop openness to new approaches and comfort with ambiguity. ISTJs thrive in structured environments but benefit from team members who can provide innovative perspectives and interpersonal facilitation.",
    ISFJ: "In team settings, ISFJs contribute reliability, detailed knowledge, and supportive assistance. They work best with appreciative, considerate colleagues who communicate clearly and maintain harmony. They may need to consciously develop assertiveness about their ideas and comfort with change. ISFJs thrive in cooperative environments but benefit from team members who can provide strategic direction and innovative perspectives.",
    ESTJ: "In team settings, ESTJs contribute organization, practical focus, and clear expectations. They work best with reliable, straightforward colleagues who value efficiency and respect procedures. They may need to consciously develop patience with brainstorming and sensitivity to emotional undercurrents. ESTJs thrive when implementing structured plans but benefit from team members who can provide innovative perspectives and interpersonal insights.",
    ESFJ: "In team settings, ESFJs contribute organization, interpersonal harmony, and practical support. They work best with appreciative, cooperative colleagues who communicate clearly and maintain positive relationships. They may need to consciously develop comfort with necessary conflict and independence in decision-making. ESFJs thrive in collaborative environments but benefit from team members who can provide objective analysis and innovative perspectives.",
    ISTP: "In team settings, ISTPs contribute practical problem-solving and technical expertise. They work best with competent, straightforward colleagues who respect independence and value results over process. They may need to consciously develop patience with planning discussions and attentiveness to interpersonal dynamics. ISTPs thrive when addressing concrete challenges but benefit from team members who can provide strategic direction and interpersonal facilitation.",
    ISFP: "In team settings, ISFPs contribute practical creativity and authentic values. They work best with respectful, appreciative colleagues who maintain harmony and honor individuality. They may need to consciously develop assertiveness about their ideas and comfort with structure. ISFPs thrive in flexible, supportive environments but benefit from team members who can provide organization and strategic direction.",
    ESTP: "In team settings, ESTPs contribute energetic problem-solving and practical negotiation skills. They work best with action-oriented, adaptable colleagues who focus on results and appreciate directness. They may need to consciously develop patience with planning processes and attention to long-term implications. ESTPs thrive when addressing immediate challenges but benefit from team members who can provide strategic vision and interpersonal sensitivity.",
    ESFP: "In team settings, ESFPs contribute enthusiasm, practical assistance, and interpersonal connection. They work best with friendly, appreciative colleagues who maintain positive atmospheres and focus on practical matters. They may need to consciously develop comfort with structure and attention to long-term planning. ESFPs thrive in collaborative, flexible environments but benefit from team members who can provide organization and strategic direction.",
  }

  return (
    teamDynamics[type as keyof typeof teamDynamics] ||
    "In team settings, your personality type influences how you collaborate, communicate, and contribute to group efforts. Understanding your natural preferences can help you leverage your strengths while developing strategies to work effectively with diverse colleagues."
  )
}

function getDevStrategies(type: string): string[] {
  const strategies: Record<string, string[]> = {
    INTJ: [
      "Practice active listening without immediately formulating responses",
      "Join collaborative projects that require interpersonal skills",
      "Ask for feedback on how your communication is received by others",
      "Develop methods to explain complex ideas in accessible language",
      "Schedule time for relationship building alongside task completion",
    ],
    INTP: [
      "Use project management tools to track progress and deadlines",
      "Practice explaining complex concepts in simple, concrete terms",
      "Set specific milestones for theoretical projects",
      "Join collaborative teams to develop interpersonal skills",
      "Volunteer for presentations to practice communication",
    ],
    ENTJ: [
      "Practice active listening without interrupting",
      "Ask for feedback on leadership style from diverse team members",
      "Schedule regular check-ins focused on team wellbeing, not just tasks",
      "Delegate more frequently, even when you could do it faster yourself",
      "Participate in activities that develop emotional intelligence",
    ],
    ENTP: [
      "Use project management tools to track progress and deadlines",
      "Commit to finishing existing projects before starting new ones",
      "Practice diplomatic communication in debates and discussions",
      "Develop routines for handling necessary administrative tasks",
      "Seek feedback on how your communication style affects others",
    ],
    INFJ: [
      "Practice setting and communicating clear boundaries",
      "Develop skills in data analysis and objective decision-making",
      "Join debate or discussion groups to practice handling disagreement",
      "Create concrete action plans with specific milestones",
      "Schedule regular self-care to prevent emotional exhaustion",
    ],
    INFP: [
      "Use organizational systems to track tasks and deadlines",
      "Practice direct communication about needs and expectations",
      "Join structured environments that develop implementation skills",
      "Seek constructive feedback and practice receiving it objectively",
      "Develop skills in project management and practical planning",
    ],
    ENFJ: [
      "Schedule regular personal time and enforce boundaries",
      "Practice making decisions without seeking consensus",
      "Develop skills in data analysis and objective evaluation",
      "Learn to delegate tasks rather than taking on too much",
      "Join activities that require direct feedback and healthy conflict",
    ],
    ENFP: [
      "Use organizational systems to track projects and deadlines",
      "Commit to finishing existing projects before starting new ones",
      "Develop routines for handling necessary administrative tasks",
      "Practice realistic time estimation for projects and commitments",
      "Seek environments that balance structure with creative freedom",
    ],
    ISTJ: [
      "Participate in brainstorming sessions and innovation workshops",
      "Practice considering multiple approaches before selecting one",
      "Join diverse teams to gain exposure to different perspectives",
      "Develop skills in adapting plans when circumstances change",
      "Take courses in emerging technologies or methodologies",
    ],
    ISFJ: [
      "Practice assertive communication about needs and ideas",
      "Take calculated risks with new approaches or responsibilities",
      "Join debate or discussion groups to practice handling disagreement",
      "Develop skills in strategic planning and big-picture thinking",
      "Schedule time for self-care and enforce personal boundaries",
    ],
    ESTJ: [
      "Practice active listening without interrupting",
      "Participate in brainstorming sessions and innovation workshops",
      "Ask for feedback on leadership style from diverse team members",
      "Develop patience with processes that require exploration",
      "Join activities that develop emotional intelligence",
    ],
    ESFJ: [
      "Practice making decisions independently without seeking consensus",
      "Develop skills in objective analysis and data-based evaluation",
      "Learn to set and communicate clear personal boundaries",
      "Join activities that require direct feedback and healthy conflict",
      "Take calculated risks with new approaches or responsibilities",
    ],
    ISTP: [
      "Develop a five-year career plan with specific milestones",
      "Practice active listening and asking follow-up questions",
      "Join collaborative projects that require interpersonal skills",
      "Use organizational systems to track long-term goals",
      "Volunteer for leadership roles to develop strategic thinking",
    ],
    ISFP: [
      "Use organizational systems to track tasks and deadlines",
      "Practice assertive communication about ideas and contributions",
      "Join structured environments that develop planning skills",
      "Volunteer for presentations to build confidence in sharing ideas",
      "Develop skills in strategic thinking and long-term planning",
    ],
    ESTP: [
      "Develop a five-year career plan with specific milestones",
      "Practice considering long-term implications before acting",
      "Use project management tools to track progress and follow-through",
      "Join collaborative teams to develop interpersonal sensitivity",
      "Schedule regular reflection time to evaluate personal growth",
    ],
    ESFP: [
      "Use organizational systems to track tasks and deadlines",
      "Develop skills in strategic planning and long-term thinking",
      "Practice completing routine tasks before moving to more exciting ones",
      "Join structured environments that develop analytical skills",
      "Create specific career goals with concrete action steps",
    ],
  }

  return (
    strategies[type] || [
      "Identify and leverage your natural strengths in workplace settings",
      "Develop complementary skills that balance your personality preferences",
      "Seek feedback from colleagues with different working styles",
      "Find mentors who excel in areas you find challenging",
      "Create a personal development plan with specific, measurable goals",
    ]
  )
}

function getCommunicationTips(type: string): string[] {
  const tips: Record<string, string[]> = {
    INTJ: [
      "Include context and reasoning when giving directions",
      "Schedule regular check-ins with team members",
      "Practice patience when others need to think out loud",
      "Add warmth to communications through small personal touches",
      "Ask for others' input before presenting your solution",
    ],
    INTP: [
      "Start with the main point before diving into details",
      "Check for understanding when explaining complex concepts",
      "Be mindful of others' need for concrete examples",
      "Schedule regular updates on projects you're handling",
      "Practice active listening without immediately problem-solving",
    ],
    ENTJ: [
      "Soften directness with appreciation and encouragement",
      "Ask open-ended questions and listen fully to responses",
      "Allow time for others to process before expecting decisions",
      "Check for understanding and emotional impact of communications",
      "Practice patience with different communication styles",
    ],
    ENTP: [
      "Be mindful of when debate is productive versus stressful",
      "Follow through on commitments made in conversations",
      "Practice focusing on one topic until resolution",
      "Balance challenging ideas with appreciation",
      "Check that others want solutions before problem-solving",
    ],
    INFJ: [
      "Be more direct about expectations and needs",
      "Share your insights and perspectives more frequently",
      "Set clear boundaries in professional relationships",
      "Practice separating constructive criticism from personal rejection",
      "Be specific and concrete when giving feedback",
    ],
    INFP: [
      "Be more direct about expectations and needs",
      "Practice delivering constructive criticism when necessary",
      "Set clear boundaries in professional relationships",
      "Share your valuable perspectives more frequently",
      "Use concrete examples when explaining concepts",
    ],
    ENFJ: [
      "Be direct about your own needs and boundaries",
      "Allow space for necessary conflict and disagreement",
      "Balance focus on harmony with objective evaluation",
      "Practice brevity in communications when appropriate",
      "Check that others want guidance before offering it",
    ],
    ENFP: [
      "Practice focusing on one topic until resolution",
      "Be mindful of others' need for structure and closure",
      "Follow through on commitments made in conversations",
      "Balance enthusiasm with active listening",
      "Check that your communications have been clear and specific",
    ],
    ISTJ: [
      "Include context and reasoning when giving directions",
      "Express appreciation more frequently and specifically",
      "Be open to questions and alternative approaches",
      "Share your valuable knowledge and insights proactively",
      "Practice patience with brainstorming and discussion",
    ],
    ISFJ: [
      "Express your ideas and concerns more directly",
      "Share your valuable knowledge and insights proactively",
      "Practice saying no when necessary",
      "Set clear expectations and boundaries",
      "Separate constructive criticism from personal rejection",
    ],
    ESTJ: [
      "Soften directness with appreciation and encouragement",
      "Ask open-ended questions and listen fully to responses",
      "Be patient with different communication styles",
      "Check for understanding and emotional impact of communications",
      "Allow time for discussion before moving to decisions",
    ],
    ESFJ: [
      "Express your ideas and concerns more directly",
      "Practice delivering necessary criticism constructively",
      "Set clear personal boundaries in professional relationships",
      "Separate disagreement from personal rejection",
      "Balance focus on harmony with objective evaluation",
    ],
    ISTP: [
      "Share your thought process more frequently with others",
      "Check in regularly on team members' needs and concerns",
      "Express appreciation more specifically and frequently",
      "Provide context for your decisions and actions",
      "Practice active listening without immediately problem-solving",
    ],
    ISFP: [
      "Share your ideas and perspectives more frequently",
      "Express concerns directly rather than withdrawing",
      "Provide regular updates on projects you're handling",
      "Practice receiving feedback without taking it personally",
      "Be specific when communicating needs and expectations",
    ],
    ESTP: [
      "Practice active listening without interrupting",
      "Check for emotional impact of direct communications",
      "Provide context for your decisions and actions",
      "Follow through on commitments made in conversations",
      "Balance action focus with relationship maintenance",
    ],
    ESFP: [
      "Focus on one topic until reaching resolution",
      "Provide regular updates on projects you're handling",
      "Balance social conversation with task-focused communication",
      "Practice delivering constructive criticism when necessary",
      "Be specific when communicating expectations",
    ],
  }

  return (
    tips[type] || [
      "Adapt your communication style based on your audience",
      "Practice active listening to understand others' perspectives",
      "Be clear and specific about expectations and deadlines",
      "Check for understanding when conveying important information",
      "Balance task-focused communication with relationship building",
    ]
  )
}
