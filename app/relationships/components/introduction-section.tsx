"use client"

import { memo } from "react"

const IntroductionSection = memo(() => (
  <div className="prose prose-rose max-w-none mb-16">
    <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-rose-900 mb-4">Understanding Relationships Through Type</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Knowing your MBTI® type and that of others in your life can help you appreciate and understand
          differences in relationships, both personally with friends, partners, children, and family and
          professionally with co-workers, team leaders, and managers.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Understanding and applying type theory to relationships can enhance communication, provide people with
          a better understanding of how they deal with conflict, and provide tools for a variety of situations
          including successfully making decisions and engaging in activities together.
        </p>
      </div>
      <div className="md:w-1/2">
        <div className="bg-white p-6 rounded-xl shadow-md border border-rose-100">
          <p className="text-rose-900 font-medium text-lg italic">
            "Type differences in relationships can be a source of growth and/or conflict. However, there are no
            best or more successful combinations of types in relationships. Two people who share all four
            preferences, only one or two, or none at all, can get along well. Type awareness and maturity matter
            more than the number of preferences you have in common."
          </p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg p-8 my-12 shadow-md">
      <p className="font-medium text-xl mt-0 mb-0">
        Understanding and applying type theory to relationships can enhance communication and provide a better
        understanding of conflict.
      </p>
    </div>

    <p className="text-lg text-gray-700">
      In most areas of life, when differences between you and another person are bothersome, you can avoid the
      other person in some way. But when that person is a loved one or close friend, a co-worker or boss, you
      have a lot to lose by walking away.
    </p>

    <p className="text-lg text-gray-700">
      Not every relationship problem is type related, of course, but when it is, knowledge of personality type
      allows you to see differences in a new way, as just different ways of "being." You may still feel
      frustrated or annoyed but understanding those differences can go a long way in working through many
      interpersonal concerns.
    </p>

    <p className="text-lg text-gray-700">
      Instead of labeling a person and putting value judgments on his or her behavior, you can learn to see it
      as behavior reflecting personality type, not something designed to offend you. Many people learn to
      appreciate these differences and may even see them in a humorous light.
    </p>
  </div>
))

IntroductionSection.displayName = 'IntroductionSection'

export { IntroductionSection }
